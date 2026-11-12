import test from 'node:test';
import assert from 'node:assert/strict';
import {sendAnswers} from './submission.mjs';
const record={id:crypto.randomUUID(),mode:'test'};
test('receipt is accepted only after the server confirms the correct record',async()=>{
 const calls=[];const receipt=await sendAnswers(record,{fetchImpl:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return Response.json(calls.length===1?{token:'test-token'}:{receipt:record.id,mode:'test',received_at:new Date().toISOString()})}});
 assert.equal(receipt.receipt,record.id);assert.equal(calls.length,2);assert.equal(calls[1].body.id,record.id);assert.equal(calls[1].body.token,'test-token');
});
test('network and server failures never return a successful receipt',async()=>{
 await assert.rejects(()=>sendAnswers(record,{fetchImpl:async()=>{throw Error('offline')}}),/non confermato/);
 await assert.rejects(()=>sendAnswers(record,{fetchImpl:async()=>Response.json({error:'La raccolta è in pausa.'},{status:409})}),/in pausa/);
});
test('mismatched server confirmations are rejected',async()=>{
 let count=0;await assert.rejects(()=>sendAnswers(record,{fetchImpl:async()=>Response.json(++count===1?{token:'t'}:{receipt:'different',mode:'test',received_at:'now'})}),/correttamente/);
});
