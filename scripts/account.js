import products from '../data/menu.json';
import articles from '../data/articles.json';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, ensureUserProfile, clearProfileCache, authErrorMessage } from './firebase/main.js';
import { siteUrl, defaultAvatar } from './site.js';
const form = document.querySelector('#profile-form');
const name = document.querySelector('#profile-name');
const status = document.querySelector('#account-status');
const signIn = document.querySelector('#account-sign-in');
signIn.href = siteUrl('pages/autentificare.html');
document.querySelector('#account-avatar').src = defaultAvatar();
let user = null, saving = false, stopActivity = () => {};
const activity = document.querySelector('#account-activity');
function renderActivity(profile) {
    const groups = [['productReviews', 'Recenzii la produse', products, 'pages/menu.html?product='], ['articleReviews', 'Comentarii la articole', articles, 'pages/articol.html?id='], ['articleLikes', 'Articole apreciate', articles, 'pages/articol.html?id=']];
    const nodes = groups.map(([field, title, items, path]) => {
        const section = document.createElement('div'), heading = document.createElement('h3'), list = document.createElement('ul');
        const ids = profile[field] || []; heading.textContent = `${title} (${ids.length})`;
        for (const id of ids) {
            const item = items.find(entry => entry.id === id); if (!item) continue;
            const row = document.createElement('li'), link = document.createElement('a');
            link.href = siteUrl(path + encodeURIComponent(id)); link.textContent = item.name; row.append(link); list.append(row);
        }
        if (!ids.length) { const empty = document.createElement('p'); empty.textContent = 'Încă nu ai activitate aici.'; section.append(heading, empty); }
        else section.append(heading, list);
        return section;
    });
    document.querySelector('#activity-lists').replaceChildren(...nodes);
}
onAuthStateChanged(auth, async next => {
    stopActivity();
    user = next; activity.hidden = !user;
    if (user) stopActivity = onSnapshot(doc(db, "users", user.uid), snapshot => { if (snapshot.exists()) renderActivity(snapshot.data()); }, error => { status.textContent = authErrorMessage(error); });
    form.hidden = !user; signIn.hidden = !!user;
    if (!user) { status.textContent = 'Conectează-te pentru a vedea profilul.'; return; }
    document.querySelector('#account-email').textContent = user.email;
    name.value = user.displayName || '';
    try {
        const profile = await ensureUserProfile(user);
        if (auth.currentUser?.uid === next.uid) { name.value = profile.name; status.textContent = ''; }
    } catch (error) { status.textContent = authErrorMessage(error); }
});
form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!user || saving || !form.reportValidity()) return;
    const value = name.value.trim();
    if (!value) { status.textContent = 'Introdu un nume.'; return; }
    saving = true; form.querySelector('button[type="submit"]').disabled = true;
    try {
        await updateDoc(doc(db, 'users', user.uid), { name: value });
        await updateProfile(user, { displayName: value });
        clearProfileCache(user.uid);
        status.textContent = 'Numele a fost salvat.';
    } catch (error) { status.textContent = authErrorMessage(error); }
    finally { saving = false; form.querySelector('button[type="submit"]').disabled = false; }
});
document.querySelector('#sign-out-btn').addEventListener('click', async () => {
    try { await signOut(auth); } catch (error) { status.textContent = authErrorMessage(error); }
});

window.addEventListener('pagehide', () => stopActivity(), { once:true });
