import { auth, db, ensureUserProfile } from './main.js';
import { doc, writeBatch, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';

// Content stays local. Public records contain only the user interaction;
// private profile arrays contain stable local target IDs, never menu/article copies.
export async function saveReview(kind, targetId, text, stars) {
    const user = auth.currentUser;
    if (!user) throw new Error('Autentificarea este necesară.');
    const profile = await ensureUserProfile(user);
    const isProduct = kind === 'product';
    const field = isProduct ? 'productReviews' : 'articleReviews';
    const ref = doc(db, isProduct ? 'productInteractions' : 'interactions', targetId, isProduct ? 'reviews' : 'comments', user.uid);
    const record = { authorId: user.uid, displayName: profile.name, text: text.trim(), createdAt: serverTimestamp() };
    if (isProduct) record.stars = Number(stars);
    const batch = writeBatch(db);
    batch.set(ref, record);
    batch.update(doc(db, 'users', user.uid), { [field]: arrayUnion(targetId) });
    await batch.commit();
}
export async function setArticleLike(targetId, enabled) {
    const user = auth.currentUser;
    if (!user) throw new Error('Autentificarea este necesară.');
    await ensureUserProfile(user);
    const batch = writeBatch(db);
    const ref = doc(db, 'interactions', targetId, 'likes', user.uid);
    if (enabled) batch.set(ref, { createdAt: serverTimestamp() });
    else batch.delete(ref);
    batch.update(doc(db, 'users', user.uid), { articleLikes: (enabled ? arrayUnion : arrayRemove)(targetId) });
    await batch.commit();
}
