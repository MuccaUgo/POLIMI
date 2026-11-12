import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,activeQuestions,isValid,pruneAnswers,toggleChoice,makeRecord,toCSV} from './survey.mjs';
const q=id=>questions.find(x=>x.id===id);
const ids=a=>activeQuestions(a).map(x=>x.id);
test('personal, gift and combined routes are distinct and brand recall is last',()=>{
  assert.ok(ids({route:'personal'}).includes('p_wash'));
  assert.ok(!ids({route:'personal'}).includes('g_age'));
  assert.ok(ids({route:'gift'}).includes('g_age'));
  assert.ok(!ids({route:'gift'}).includes('p_wash'));
  assert.ok(ids({route:'both'}).includes('g_age')&&ids({route:'both'}).includes('p_wash'));
  for(const route of ['personal','gift','both'])assert.equal(ids({route}).at(-1),'brands');
  assert.deepEqual(ids({route:'neither'}),['age','route']);
});
test('detergent barrier is only asked to relevant nonusers',()=>{
  assert.ok(ids({route:'personal',p_wash:['water']}).includes('p_barrier'));
  assert.ok(!ids({route:'personal',p_wash:['beard']}).includes('p_barrier'));
  assert.ok(!ids({route:'gift',p_wash:['water']}).includes('p_barrier'));
});
test('no purchase and unknown purchase skip spending and channel',()=>{
  for(const p_last of ['never','unknown',undefined])assert.ok(!ids({route:'personal',p_last}).includes('p_spend'));
  assert.ok(ids({route:'personal',p_last:'device'}).includes('p_channel'));
});
test('changing route removes stale personal answers and a hidden barrier',()=>{
  const changed=pruneAnswers({age:'25-29',route:'gift',p_wash:['water'],p_barrier:'price',p_last:'device',p_spend:'50-74',g_age:'25-34',brands:'Example'});
  assert.deepEqual(changed,{age:'25-29',route:'gift',g_age:'25-34',brands:'Example'});
  assert.ok(!Object.hasOwn(pruneAnswers({route:'personal',p_wash:['beard'],p_barrier:'price'}),'p_barrier'));
  assert.ok(!Object.hasOwn(pruneAnswers({route:'personal',p_last:'never',p_spend:'50-74'}),'p_spend'));
});
test('exclusive choices cannot coexist with real products',()=>{
  assert.deepEqual(toggleChoice(q('p_wash'),['water','face'],'nothing'),['nothing']);
  assert.deepEqual(toggleChoice(q('p_wash'),['nothing'],'beard'),['beard']);
  assert.equal(isValid(q('p_wash'),['nothing','water']),false);
  assert.equal(isValid(q('p_wash'),[]),false);
  assert.equal(isValid(q('p_wash'),['water','water']),false);
  assert.equal(isValid(q('p_wash'),['untrusted']),false);
});
test('optional recall and malformed saved answers are handled',()=>{
  assert.equal(isValid(q('brands'),undefined),true);
  assert.equal(isValid(q('brands'),'a'.repeat(401)),false);
  assert.equal(isValid(q('route'),'invented'),false);
  assert.deepEqual(pruneAnswers({unexpected:'value',age:{bad:1},route:'personal'}),{route:'personal'});
});
test('CSV exports conditional answers only, quotes user text and neutralizes formulas',()=>{
  const record=makeRecord({age:'25-29',route:'gift',brands:'=SUM(1,2)',p_spend:'75plus'},'colleghi');
  assert.equal(record.mode,'live');
  assert.equal(record.source,'colleghi');
  assert.ok(!Object.hasOwn(record.answers,'p_spend'));
  assert.ok(toCSV(record).includes('"\'=SUM(1,2)"'));
  const quoted=toCSV(makeRecord({route:'gift',brands:'A "B", C\nD'}));
  assert.ok(quoted.includes('"A ""B"", C\nD"'));
  assert.equal(makeRecord({route:'gift'},'<script>').source,'non_indicata');
});
test('all reachable full paths can complete with valid answers',()=>{
  for(const route of ['personal','gift','both','neither']){
    const a={age:'25-29',route};
    for(const item of questions){if(!activeQuestions(a).some(x=>x.id===item.id)||Object.hasOwn(a,item.id))continue;
      a[item.id]=item.type==='text'?'':item.type==='multi'?[item.options[0].value]:item.options[0].value;
    }
    for(const item of activeQuestions(a))assert.ok(isValid(item,a[item.id]),route+': '+item.id);
    assert.deepEqual(pruneAnswers(a),a);
  }
});
