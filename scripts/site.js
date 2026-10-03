export function siteUrl(path = '') {
    const base = import.meta.env.BASE_URL;
    return new URL(base + path.replace(/^\//, ''), window.location.origin).href;
}
export function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
export const defaultAvatar = () => siteUrl('assets/Account/avatar.svg');
