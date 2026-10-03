import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, updateProfile, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, connectFirestoreEmulator } from 'firebase/firestore';
import { siteUrl } from '../site.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAEKdCpxlwkNjqdiwb3evIBART3e23PPRE',
    authDomain: 'relax-9d431.firebaseapp.com',
    projectId: 'relax-9d431',
    storageBucket: 'relax-9d431.firebasestorage.app',
    messagingSenderId: '484049077214',
    appId: '1:484049077214:web:a92208e9323116f52bd34f',
};
const useEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true';
export const app = initializeApp(useEmulators ? { ...firebaseConfig, projectId: 'demo-relax' } : firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
if (useEmulators) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
export const googleProvider = new GoogleAuthProvider();
const profileJobs = new Map();
export function ensureUserProfile(user) {
    if (!profileJobs.has(user.uid)) {
        const job = (async () => {
            const ref = doc(db, 'users', user.uid);
            const snapshot = await getDoc(ref);
            if (snapshot.exists()) return snapshot.data();
            const name = (user.displayName || user.email?.split('@')[0] || 'Utilizator').trim().slice(0, 80);
            await setDoc(ref, { name, email: user.email || '', createdAt: serverTimestamp(), productReviews: [], articleReviews: [], articleLikes: [] });
            if (!user.displayName) await updateProfile(user, { displayName: name });
            return { name, email: user.email || '' };
        })().catch(error => { profileJobs.delete(user.uid); throw error; });
        profileJobs.set(user.uid, job);
    }
    return profileJobs.get(user.uid);
}
export function clearProfileCache(uid) { profileJobs.delete(uid); }
export function authErrorMessage(error) {
    const messages = {
        'auth/popup-closed-by-user': 'Fereastra de conectare a fost închisă. Poți încerca din nou.',
        'auth/popup-blocked': 'Permite fereastra popup pentru conectarea cu Google.',
        'auth/unauthorized-domain': 'Domeniul site-ului trebuie adăugat în Firebase Authentication → Authorized domains.',
        'auth/operation-not-allowed': 'Metoda de autentificare trebuie activată în Firebase Console.',
        'auth/invalid-action-code': 'Linkul de conectare a expirat sau a fost folosit. Cere unul nou.',
        'auth/network-request-failed': 'Conexiunea a eșuat. Verifică internetul și încearcă din nou.',
        'permission-denied': 'Acces refuzat. Verifică regulile Firestore ale proiectului.',
    };
    return messages[error.code] || 'Operația a eșuat. Încearcă din nou.';
}
export async function completeEmailSignIn() {
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    let email = localStorage.getItem('emailForSignIn');
    if (!email) email = window.prompt('Confirmă emailul pentru care ai cerut linkul de conectare:');
    if (!email?.trim()) throw new Error('Emailul este necesar pentru conectare.');
    const result = await signInWithEmailLink(auth, email.trim(), window.location.href);
    localStorage.removeItem('emailForSignIn');
    await ensureUserProfile(result.user);
    window.history.replaceState({}, '', siteUrl('pages/menu.html'));
}
// Every page containing the navigation can complete an email link.
export const emailSignInReady = completeEmailSignIn().catch(error => {
    console.error('Email sign-in:', error);
    const status = document.createElement('p');
    status.className = 'demo-notice';
    status.setAttribute('role', 'alert');
    status.textContent = authErrorMessage(error);
    document.body.prepend(status);
});
onAuthStateChanged(auth, user => {
    if (user) ensureUserProfile(user).catch(error => console.error('Profile:', error));
});
