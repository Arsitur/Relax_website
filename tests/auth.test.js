import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const code = readFileSync(new URL('../scripts/firebase/login.js', import.meta.url),'utf8').replace(/^import .*\n/gm,'');
function setup({fail=false}={}) {
    const nodes=new Map(), calls=[];
    const node=key=>{
        if(!nodes.has(key)) nodes.set(key,{value:' art@example.com ',disabled:false,style:{},textContent:'',classList:{add(){},remove(){}},querySelector(s){return node(key+s)},addEventListener(e,cb){this[e]=cb},setAttribute(){},reportValidity(){return true}});
        return nodes.get(key);
    };
    const context={document:{querySelector:node},auth:{},googleProvider:{},console:{error(){}},siteUrl:path=>'https://example.com/Relax_website/'+path,localStorage:{setItem(...args){calls.push(['stored',...args])}},window:{location:{assign(url){calls.push(['redirect',url])}}},authErrorMessage:()=> 'Error',ensureUserProfile:async user=>calls.push(['profile',user.uid]),signInWithPopup:async()=>{if(fail)throw {code:'auth/popup-closed-by-user'};return {user:{uid:'existing'}}},sendSignInLinkToEmail:async(...args)=>{calls.push(['email',...args]);if(fail)throw {code:'auth/network-request-failed'}}};
    vm.runInNewContext(code,context);
    return {node,calls};
}
test('Google also redirects an existing user, with buttons restored',async()=>{
    const {node,calls}=setup();await node('#google-signin-provider').click();
    assert(calls.some(call=>call[0]==='profile'&&call[1]==='existing'));
    assert(calls.some(call=>call[0]==='redirect'&&call[1]==='https://example.com/Relax_website/pages/menu.html'));
    assert.equal(node('#submit-bttn').disabled,false);
});
test('popup/email failures allow retry and preserve email input',async()=>{
    const {node,calls}=setup({fail:true});await node('#google-signin-provider').click();
    assert.equal(node('#google-signin-provider').disabled,false);
    await node('#form').submit({preventDefault(){}});
    assert.equal(node('#submit-bttn').disabled,false);
    assert.equal(node('.email-field-input-sign').value,' art@example.com ');
    assert.equal(calls.find(call=>call[0]==='email')[2],'art@example.com');
    assert(!calls.some(call=>call[0]==='stored'));
});
test('email links target the project subpath and save email only after success',async()=>{
    const {node,calls}=setup();await node('#form').submit({preventDefault(){}});
    assert.equal(calls.find(call=>call[0]==='email')[3].url,'https://example.com/Relax_website/pages/menu.html');
    assert(calls.some(call=>call[0]==='stored'&&call[1]==='emailForSignIn'&&call[2]==='art@example.com'));
});
