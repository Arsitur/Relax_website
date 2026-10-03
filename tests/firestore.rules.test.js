import { test, before, after, beforeEach } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, collection, serverTimestamp, writeBatch, arrayUnion, arrayRemove } from 'firebase/firestore';
const enabled = !!process.env.FIRESTORE_EMULATOR_HOST;
let env;
const article = 'dXJNRPRCAkcAg4Z1jG6m', product = 'GuCYd9c5g41M2ADSaeVg';
const profile = name => ({ name, email: `${name}@example.com`, createdAt: serverTimestamp() });
before(async () => { if (enabled) env = await initializeTestEnvironment({projectId:'demo-relax',firestore:{rules:readFileSync('firestore.rules','utf8')}}); });
beforeEach(async () => { if (enabled) await env.clearFirestore(); });
after(async () => { if (enabled) await env.cleanup(); });
const run = (name, callback) => test(name,{skip:!enabled},callback);
function client(name) { return env.authenticatedContext(name,{email:`${name}@example.com`}).firestore(); }
function like(db, uid, add=true) {
    const batch=writeBatch(db),ref=doc(db,'interactions',article,'likes',uid);
    if(add)batch.set(ref,{createdAt:serverTimestamp()});else batch.delete(ref);
    batch.update(doc(db,'users',uid),{articleLikes:(add?arrayUnion:arrayRemove)(article)});
    return batch.commit();
}
function review(db, uid, kind, overrides={}) {
    const isProduct=kind==='product',batch=writeBatch(db),id=isProduct?product:article;
    batch.set(doc(db,isProduct?'productInteractions':'interactions',id,isProduct?'reviews':'comments',uid),{
        authorId:uid,displayName:uid,text:'Foarte bun!',createdAt:serverTimestamp(),...(isProduct?{stars:5}:{}),...overrides,
    });
    batch.update(doc(db,'users',uid),{[isProduct?'productReviews':'articleReviews']:arrayUnion(id)});
    return batch.commit();
}
run('profiles are private; admin, email spoofing and fabricated activity are denied',async()=>{
    const art=client('Art'),other=client('Other');
    await assertSucceeds(setDoc(doc(art,'users','Art'),profile('Art')));
    await assertSucceeds(getDoc(doc(art,'users','Art')));
    await assertFails(getDoc(doc(other,'users','Art')));
    await assertFails(updateDoc(doc(art,'users','Art'),{admin:true}));
    await assertSucceeds(updateDoc(doc(art,'users','Art'),{name:'Artur'}));
    await assertFails(updateDoc(doc(art,'users','Art'),{email:'spoof@example.com'}));
    await assertFails(updateDoc(doc(art,'users','Art'),{productReviews:[product]}));
    await assertFails(updateDoc(doc(art,'users','Art'),{articleLikes:['unknown']}));
    await assertFails(setDoc(doc(other,'users','Art'),profile('Other')));
});
run('like and profile index change atomically; strangers cannot mutate either',async()=>{
    const art=client('Art'),other=client('Other'),anon=env.unauthenticatedContext().firestore();
    await setDoc(doc(art,'users','Art'),profile('Art'));
    await assertSucceeds(like(art,'Art'));
    await assertFails(like(art,'Art'));
    await assertFails(deleteDoc(doc(other,'interactions',article,'likes','Art')));
    await assertFails(deleteDoc(doc(art,'interactions',article,'likes','Art')));
    await assertFails(updateDoc(doc(art,'users','Art'),{articleLikes:[]}));
    await assertSucceeds(getDocs(collection(anon,'interactions',article,'likes')));
    await assertSucceeds(like(art,'Art',false));
    await assertFails(setDoc(doc(anon,'interactions',article,'likes','anon'),{createdAt:serverTimestamp()}));
});
run('article reviews validate author, name, length and time; own review is editable',async()=>{
    const art=client('Art'),other=client('Other'),anon=env.unauthenticatedContext().firestore();
    await setDoc(doc(art,'users','Art'),profile('Art'));
    await assertSucceeds(review(art,'Art','article'));
    await assertSucceeds(review(art,'Art','article',{text:'O actualizare.'}));
    for(const overrides of [{authorId:'Other'},{displayName:'Other'},{text:''},{text:'x'.repeat(501)},{createdAt:0}])
        await assertFails(review(art,'Art','article',overrides));
    await assertFails(updateDoc(doc(other,'interactions',article,'comments','Art'),{text:'Hacked'}));
    await assertSucceeds(getDocs(collection(anon,'interactions',article,'comments')));
    await assertFails(setDoc(doc(art,'products','test'),{name:'test'}));
    await assertFails(setDoc(doc(art,'articles',article),{name:'test'}));
});
run('product review uses valid local id and integer rating; no duplicate or forged review',async()=>{
    const art=client('Art'),other=client('Other'),anon=env.unauthenticatedContext().firestore();
    await setDoc(doc(art,'users','Art'),profile('Art'));
    await assertSucceeds(review(art,'Art','product'));
    await assertSucceeds(review(art,'Art','product',{stars:3,text:'Actualizat'}));
    for(const stars of [0,6,4.5,'5'])await assertFails(review(art,'Art','product',{stars}));
    await assertFails(setDoc(doc(other,'productInteractions',product,'reviews','Art'),{authorId:'Art',displayName:'Art',stars:5,text:'Fake',createdAt:serverTimestamp()}));
    await assertFails(setDoc(doc(art,'productInteractions','unknown','reviews','Art'),{authorId:'Art',displayName:'Art',stars:5,text:'Fake',createdAt:serverTimestamp()}));
    await assertSucceeds(getDocs(collection(anon,'productInteractions',product,'reviews')));
    await assertFails(getDocs(collection(anon,'productInteractions','unknown','reviews')));
});
