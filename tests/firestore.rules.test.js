import { test, before, after, beforeEach } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore';
const enabled = !!process.env.FIRESTORE_EMULATOR_HOST;
let env;
const article = 'dXJNRPRCAkcAg4Z1jG6m';
const profile = name => ({ name, email: `${name}@example.com`, createdAt: serverTimestamp() });
before(async () => {
    if (enabled) env = await initializeTestEnvironment({ projectId:'demo-relax', firestore:{ rules:readFileSync('firestore.rules','utf8') } });
});
beforeEach(async () => { if (enabled) await env.clearFirestore(); });
after(async () => { if (enabled) await env.cleanup(); });
const run = (name, callback) => test(name, { skip: !enabled }, callback);
function client(name) { return env.authenticatedContext(name,{email:`${name}@example.com`}).firestore(); }
run('profiles are private and cannot acquire admin fields', async () => {
    const art = client('Art'), other = client('Other');
    await assertSucceeds(setDoc(doc(art,'users','Art'),profile('Art')));
    await assertSucceeds(getDoc(doc(art,'users','Art')));
    await assertFails(getDoc(doc(other,'users','Art')));
    await assertFails(updateDoc(doc(art,'users','Art'),{admin:true}));
    await assertSucceeds(updateDoc(doc(art,'users','Art'),{name:'Artur'}));
    await assertFails(updateDoc(doc(art,'users','Art'),{email:'spoof@example.com'}));
    await assertFails(setDoc(doc(other,'users','Art'),profile('Other')));
});
run('one like per user; other users and anonymous clients cannot change it', async () => {
    const art = client('Art'), other = client('Other'), anon = env.unauthenticatedContext().firestore();
    const path = ['interactions',article,'likes','Art'];
    await assertSucceeds(setDoc(doc(art,...path),{createdAt:serverTimestamp()}));
    await assertFails(setDoc(doc(art,...path),{createdAt:serverTimestamp()}));
    await assertFails(deleteDoc(doc(other,...path)));
    await assertFails(setDoc(doc(anon,...path),{createdAt:serverTimestamp()}));
    await assertSucceeds(getDocs(collection(anon,'interactions',article,'likes')));
    await assertSucceeds(deleteDoc(doc(art,...path)));
    await assertFails(setDoc(doc(art,'interactions','unknown','likes','Art'),{createdAt:serverTimestamp()}));
});
run('comments require a real author, matching profile name, valid length and server timestamp', async () => {
    const art = client('Art'), anon = env.unauthenticatedContext().firestore();
    await assertSucceeds(setDoc(doc(art,'users','Art'),profile('Art')));
    const content = {authorId:'Art',displayName:'Art',text:'Salut!',createdAt:serverTimestamp()};
    const ref = id => doc(art,'interactions',article,'comments',id);
    await assertSucceeds(setDoc(ref('good'),content));
    await assertFails(setDoc(ref('spoof'),{...content,authorId:'Other'}));
    await assertFails(setDoc(ref('name'),{...content,displayName:'Other'}));
    await assertFails(setDoc(ref('empty'),{...content,text:''}));
    await assertFails(setDoc(ref('long'),{...content,text:'x'.repeat(501)}));
    await assertFails(setDoc(ref('time'),{...content,createdAt:0}));
    await assertFails(setDoc(doc(anon,'interactions',article,'comments','anon'),content));
    await assertFails(updateDoc(ref('good'),{text:'edited'}));
    await assertSucceeds(getDocs(collection(anon,'interactions',article,'comments')));
    await assertFails(setDoc(doc(art,'products','test'),{name:'test'}));
    await assertFails(setDoc(doc(art,'articles',article),{name:'test'}));
});
