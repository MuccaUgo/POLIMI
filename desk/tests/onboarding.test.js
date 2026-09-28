const assert = require("node:assert/strict");
const test = require("node:test");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const load = require("./load");

const C = load();
const ctx = vm.createContext({ Intl, DeskCore: C });
vm.runInContext(readFileSync(path.join(__dirname, "..", "onboarding.js"), "utf8"), ctx, { filename: "onboarding.js" });
const O = ctx.DeskOnboarding;

function checkQuestion(q, where) {
  assert.ok(q.prompt && q.explain && q.context, `${where}: text`);
  assert.ok(O.clientById(q.client), `${where}: client`);
  assert.ok(q.options.length >= 2, `${where}: at least two options`);
  assert.equal(q.options.filter(o => o.correct).length, 1, `${where}: exactly one right answer`);
  assert.equal(new Set(q.options.map(o => o.label)).size, q.options.length, `${where}: distinct options`);
  q.options.filter(o => !o.correct).forEach(o => assert.ok(o.consequence, `${where}: "${o.label}" explains its consequence`));
  const text = JSON.stringify(q);
  assert.ok(!/NaN|undefined|Infinity|null/.test(text), `${where}: ${text.match(/.{30}(NaN|undefined|Infinity|null).{30}/)}`);
}

test("five clients with distinct business models and five days", () => {
  assert.equal(O.CLIENTS.length, 5);
  assert.equal(new Set(O.CLIENTS.map(c => c.kind)).size, 5);
  assert.deepEqual(Array.from(O.DAYS, d => d.id), ["mon", "tue", "wed", "thu", "fri"]);
  O.DAYS.forEach(d => { assert.ok(d.briefing.length >= 3 && d.takeaway && d.email, d.id); });
});

test("every generated question is well formed at every tier", () => {
  const r = C.rng(11);
  for (const d of O.DAYS) {
    for (const tier of [1, 2, 3]) {
      for (let i = 0; i < 400; i++) checkQuestion(d.make(tier, r), `${d.id} tier ${tier} #${i}`);
    }
  }
});

test("equation questions: the right effect keeps assets = liabilities + equity", () => {
  const r = C.rng(3);
  for (let i = 0; i < 500; i++) {
    const q = O.DAYS[1].make(1 + (i % 3), r);
    const { before, after } = q.bars;
    assert.equal(before.A, before.L + before.E);
    assert.equal(after.A, after.L + after.E, q.context);
    const right = q.options.find(o => o.correct).label;
    if (O.DELTA[right]) {
      const [dA, dL, dE] = O.DELTA[right];
      const k = Math.abs(after.A - before.A) || Math.abs(after.L - before.L) || Math.abs(after.E - before.E);
      assert.deepEqual([after.A - before.A, after.L - before.L, after.E - before.E], [dA * k, dL * k, dE * k].map(x => x || 0), q.context);
    }
  }
});

test("revenue and cost timing answers follow accrual accounting", () => {
  const r = C.rng(8);
  for (let i = 0; i < 600; i++) {
    const q = O.DAYS[2].make(1 + (i % 3), r);
    const right = q.options.find(o => o.correct).label;
    if (/deposit|retainer|subscription starting/.test(q.context) && !q.list) {
      if (/revenue does/.test(q.prompt)) assert.equal(right, "€0", q.context);
      else assert.equal(right, "A liability (owed to the customer)", q.context);
    }
    if (/November/.test(q.context)) assert.equal(right, "€0", "collecting an old invoice is not revenue");
  }
});

test("the week unlocks day by day and the probation needs eight of ten", () => {
  const p = C.emptyProgress();
  assert.equal(O.dayUnlocked(p, "mon"), true);
  assert.equal(O.dayUnlocked(p, "tue"), false);
  let finished = false;
  for (let i = 0; i < O.TARGET - 1; i++) finished = O.answer(p, "mon", true);
  assert.equal(finished, false);
  O.answer(p, "mon", false);
  assert.equal(O.dayState(p, "mon").points, O.TARGET - 2, "a wrong answer costs a point");
  O.answer(p, "mon", true);
  assert.equal(O.answer(p, "mon", true), true);
  assert.equal(O.dayUnlocked(p, "tue"), true);
  assert.equal(O.probationUnlocked(p), false);
  ["tue", "wed", "thu", "fri"].forEach(id => { for (let i = 0; i < O.TARGET; i++) O.answer(p, id, true); });
  assert.equal(O.probationUnlocked(p), true);
  assert.equal(O.finishProbation(p, 7), false);
  assert.equal(O.state(p).probation.passed, false);
  assert.equal(O.finishProbation(p, 8), true);
  assert.equal(O.finishProbation(p, 10), false, "only the first pass is news");
  assert.equal(O.state(p).probation.best, 10);
  const q = O.probation("x");
  assert.equal(q.length, O.PROBATION_SIZE);
  assert.deepEqual(new Set(Array.from(q, x => x.day)).size, 5);
});

test("onboarding progress survives normalisation of stored progress", () => {
  const p = C.emptyProgress();
  O.answer(p, "mon", true);
  const again = C.normalize(JSON.parse(JSON.stringify(p)));
  assert.equal(O.dayState(again, "mon").points, 1);
});
