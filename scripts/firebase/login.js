import { signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, googleProvider, ensureUserProfile, authErrorMessage } from './main.js';
import { siteUrl } from '../site.js';
const form = document.querySelector('#form');
const emailField = document.querySelector('.email-field-input-sign');
const submitBtn = document.querySelector('#submit-bttn');
const googleBtn = document.querySelector('#google-signin-provider');
const loading = submitBtn.querySelector('.loading');
const text = submitBtn.querySelector('.text');
const success = document.querySelector('header>.main-text>.succes');
const errorText = document.querySelector('header>.main-text>.error');
const checkmark = submitBtn.querySelector('.checkmark');
let busy = false;
function setBusy(value) {
    busy = value;
    submitBtn.disabled = value;
    googleBtn.disabled = value;
    loading.style.opacity = value ? '1' : '0';
    text.style.display = value ? 'none' : 'block';
    submitBtn.style.pointerEvents = value ? 'none' : 'initial';
    submitBtn.setAttribute('aria-busy', String(value));
}
function clearStatus() { success.classList.remove('show'); errorText.classList.remove('show'); checkmark.classList.remove('show'); }
function showError(error) { console.error(error); errorText.textContent = authErrorMessage(error); errorText.classList.add('show'); }
form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    clearStatus(); setBusy(true);
    try {
        const email = emailField.value.trim();
        await sendSignInLinkToEmail(auth, email, { url: siteUrl('pages/menu.html'), handleCodeInApp: true });
        localStorage.setItem('emailForSignIn', email);
        success.textContent = 'Ți-am trimis un link de conectare. Verifică emailul.';
        success.classList.add('show');
    } catch (error) { showError(error); }
    finally { setBusy(false); }
});
googleBtn.addEventListener('click', async () => {
    if (busy) return;
    clearStatus(); setBusy(true);
    try {
        const { user } = await signInWithPopup(auth, googleProvider);
        await ensureUserProfile(user);
        window.location.assign(siteUrl('pages/menu.html'));
    } catch (error) { showError(error); }
    finally { setBusy(false); }
});
