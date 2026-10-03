import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db, ensureUserProfile, clearProfileCache, authErrorMessage } from './firebase/main.js';
import { siteUrl, defaultAvatar } from './site.js';
const form = document.querySelector('#profile-form');
const name = document.querySelector('#profile-name');
const status = document.querySelector('#account-status');
const signIn = document.querySelector('#account-sign-in');
signIn.href = siteUrl('pages/autentificare.html');
document.querySelector('#account-avatar').src = defaultAvatar();
let user = null, saving = false;
onAuthStateChanged(auth, async next => {
    user = next;
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
