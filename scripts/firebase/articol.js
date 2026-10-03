import articles from '../../data/articles.json';
import { auth, db, ensureUserProfile, authErrorMessage } from './main.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, query, limit, orderBy, onSnapshot, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { siteUrl, defaultAvatar } from '../site.js';
import { niceDateFormatting } from '../utils.js';

const id = new URLSearchParams(window.location.search).get('id');
const article = articles.find(item => item.id === id);
const name = document.querySelector('.article-name');
const added = document.querySelector('.added');
const end = document.querySelector('.contents>.end');
if (!article) {
    document.querySelectorAll('.contents .placeholder').forEach(node => node.remove());
    name.style.display = 'block';
    name.textContent = 'Articolul nu a fost găsit';
    added.replaceChildren();
    const back = document.createElement('a');
    back.href = siteUrl('pages/articole.html'); back.textContent = 'Înapoi la articole';
    added.append(back); end.remove();
} else {
    document.title = `Relax | ${article.name}`;
    document.querySelectorAll('.contents .placeholder').forEach(node => node.remove());
    name.textContent = article.name; name.style.display = 'block';
    const date = document.querySelector('.article-date');
    date.textContent = niceDateFormatting(article.datePosted); date.style.display = 'block';
    const image = document.querySelector('.article-img img');
    image.src = siteUrl(article.image); image.alt = article.name;
    document.querySelector('.article-img').style.display = 'block';
    added.replaceChildren(...article.blocks.map(block => {
        const node = document.createElement(block.type === 'heading' ? 'h2' : 'p');
        node.className = block.type === 'heading' ? 'header' : 'paragraph';
        node.textContent = block.text; return node;
    }));
    if (!article.blocks.length) {
        const text = document.createElement('p'); text.className = 'paragraph';
        text.textContent = 'Articolul original nu conținea paragrafe. Conținutul poate fi adăugat în fișierul local de articole.';
        added.append(text);
    }
    document.querySelector('.end>.wrap').style.display = 'flex';
    const form = document.querySelector('#add-comment');
    form.style.display = 'block';
    const textarea = document.querySelector('#text-area-comment');
    const post = document.querySelector('#comment-post-btn');
    const like = document.querySelector('.end .likes');
    const fill = like.querySelector('.fill');
    const count = document.querySelector('#likes-number-count');
    const comments = document.querySelector('.end>div.comments');
    const status = document.querySelector('#interaction-status');
    const words = document.querySelector('#add-comment .max');
    let user = null, hasLike = false, posting = false, liking = false;
    function updateEnabled() {
        textarea.disabled = !user || posting;
        post.disabled = !user || posting;
        like.disabled = !user || liking;
        form.classList.toggle('disabled', !user);
        like.classList.toggle('disabled', !user);
    }
    const unsubscribeAuth = onAuthStateChanged(auth, next => {
        user = next; updateEnabled();
        status.textContent = user ? '' : 'Conectează-te pentru a comenta sau aprecia articolul.';
        hasLike = likeIds.has(user?.uid); fill.classList.toggle('show', hasLike);
        like.setAttribute('aria-pressed', String(hasLike));
    });
    const likeIds = new Set();
    const stopLikes = onSnapshot(collection(db, 'interactions', id, 'likes'), snapshot => {
        likeIds.clear(); snapshot.forEach(item => likeIds.add(item.id));
        count.textContent = snapshot.size;
        hasLike = likeIds.has(user?.uid); fill.classList.toggle('show', hasLike);
        like.setAttribute('aria-pressed', String(hasLike));
    }, error => { status.textContent = authErrorMessage(error); });
    const stopComments = onSnapshot(query(collection(db, 'interactions', id, 'comments'), orderBy('createdAt', 'desc'), limit(100)), snapshot => {
        const nodes = snapshot.docs.map(item => {
            const data = item.data();
            const comment = document.createElement('article-comment');
            comment.setAttribute('name', data.displayName);
            comment.setAttribute('text', data.text);
            comment.setAttribute('img', defaultAvatar());
            comment.setAttribute('date', data.createdAt ? niceDateFormatting(data.createdAt.toMillis()) : 'Acum');
            return comment;
        });
        comments.replaceChildren(...nodes);
        document.querySelector('#nr-of-comments').textContent = snapshot.size === 100 ? '100+' : snapshot.size;
        if (!nodes.length) {
            const empty = document.createElement('p'); empty.textContent = 'Încă nu sunt comentarii.'; comments.append(empty);
        }
    }, error => { comments.replaceChildren(); status.textContent = authErrorMessage(error); });
    textarea.addEventListener('input', () => { words.textContent = `${textarea.value.length}/500`; });
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!user || posting) return;
        const text = textarea.value.trim();
        if (!text || text.length > 500) { status.textContent = 'Scrie un comentariu între 1 și 500 de caractere.'; return; }
        posting = true; updateEnabled();
        try {
            const author = user;
            const profile = await ensureUserProfile(author);
            await addDoc(collection(db, 'interactions', id, 'comments'), { authorId: author.uid, displayName: profile.name, text, createdAt: serverTimestamp() });
            textarea.value = ''; words.textContent = '0/500'; status.textContent = 'Comentariul a fost publicat.';
        } catch (error) { status.textContent = authErrorMessage(error); }
        finally { posting = false; updateEnabled(); }
    });
    like.addEventListener('click', async () => {
        if (!user || liking) return;
        liking = true; updateEnabled();
        const ref = doc(db, 'interactions', id, 'likes', user.uid);
        try {
            if (hasLike) await deleteDoc(ref);
            else await setDoc(ref, { createdAt: serverTimestamp() });
        } catch (error) { status.textContent = authErrorMessage(error); }
        finally { liking = false; updateEnabled(); }
    });
    window.addEventListener('pagehide', () => { unsubscribeAuth(); stopLikes(); stopComments(); }, { once: true });
}
