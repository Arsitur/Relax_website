import { auth, db, authErrorMessage } from './main.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { saveReview } from './interactions.js';
import { niceDateFormatting } from '../utils.js';
import { defaultAvatar } from '../site.js';

export function connectProductReviews(products, update) {
    const form = document.querySelector('#product-review-form');
    const text = form.querySelector('textarea');
    const stars = form.querySelector('select');
    const button = form.querySelector('button');
    const status = document.querySelector('#product-review-status');
    let id = null, user = null, posting = false, stop = () => {}, activeReviews = [], needsPrefill = true;
    const enable = () => { text.disabled = stars.disabled = button.disabled = !user || posting || !id || needsPrefill; };
    const fillOwn = () => {
        const own = activeReviews.find(review => review.authorId === user?.uid);
        text.value = own?.description || ''; stars.value = String(own?.stars || 5);
    };
    const map = snapshot => snapshot.docs.map(record => {
        const data = record.data();
        return { authorId: data.authorId, name: data.displayName, description: data.text, stars: data.stars,
            date: data.createdAt ? niceDateFormatting(data.createdAt.toMillis()) : 'Acum', img: defaultAvatar() };
    });
    const stopAuth = onAuthStateChanged(auth, next => {
        user = next; enable(); fillOwn();
        status.textContent = user ? '' : 'Conectează-te pentru a lăsa o recenzie.';
    });
    // Read each local target once; keep only the open product subscribed live.
    for (const product of products) {
        getDocs(query(collection(db, 'productInteractions', product.id, 'reviews'), orderBy('createdAt', 'desc'), limit(100)))
            .then(snapshot => { if (id !== product.id) update(product.id, map(snapshot)); })
            .catch(error => { if (!id) status.textContent = authErrorMessage(error); });
    }
    const open = event => {
        stop(); id = event.detail; activeReviews = []; needsPrefill = true; fillOwn(); enable();
        status.textContent = user ? 'Se încarcă recenziile…' : 'Conectează-te pentru a lăsa o recenzie.';
        stop = onSnapshot(query(collection(db, 'productInteractions', id, 'reviews'), orderBy('createdAt', 'desc'), limit(100)), snapshot => {
            activeReviews = map(snapshot); update(id, activeReviews);
            if (needsPrefill) {
                fillOwn(); needsPrefill = false; enable();
                status.textContent = user ? 'O recenzie per produs. O poți actualiza aici.' : 'Conectează-te pentru a lăsa o recenzie.';
            }
        }, error => { status.textContent = authErrorMessage(error); });
    };
    document.addEventListener('product-open', open);
    form.addEventListener('submit', async event => {
        event.preventDefault(); if (!user || !id || posting) return;
        const value = text.value.trim();
        if (!value || value.length > 500) { status.textContent = 'Scrie între 1 și 500 de caractere.'; return; }
        const target = id; posting = true; enable();
        try {
            await saveReview('product', target, value, Number(stars.value));
            if (id === target) status.textContent = 'Recenzia a fost salvată.';
        } catch (error) { if (id === target) status.textContent = authErrorMessage(error); }
        finally { posting = false; enable(); }
    });
    window.addEventListener('pagehide', () => { stop(); stopAuth(); document.removeEventListener('product-open', open); }, { once: true });
}
