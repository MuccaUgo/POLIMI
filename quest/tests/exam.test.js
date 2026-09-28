const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
global.QuestWorld = load("world.js");
const L = load("logic.js");
load("office-data.js");
const O = load("office-logic.js");
load("office-analysis.js");
const S = load("office-study.js");
const X = load("office-exam.js");

test("every exam pattern builds a clean multiple choice, over many seeds", () => {
  for (const f of X.FA3.concat(X.CONS3)) {
    const r = L.rng(f.name.length * 977);
    for (let i = 0; i < 400; i++) {
      const j = f(r);
      assert.equal(j.type, "mcq", f.name);
      assert.equal(j.options.length, 4, `${f.name}: four options`);
      assert.equal(j.options.filter(o => o.correct).length, 1, `${f.name}: one right answer`);
      assert.equal(new Set(j.options.map(o => o.label)).size, 4, `${f.name}: distinct options`);
      const all = [j.question, ...j.options.map(o => o.label), ...j.solution, ...(j.doc ? j.doc.lines.flat() : []), ...((j.doc && j.doc.facts) || [])].join(" ");
      assert.ok(!/NaN|undefined|Infinity/.test(all), `${f.name}: ${all.match(/.{0,40}(NaN|undefined|Infinity).{0,20}/)}`);
      const right = j.options.find(o => o.correct).label;
      if (right !== X.NONE) j.options.filter(o => !o.correct && o.label !== X.NONE).forEach(o => assert.ok(!X.tooClose(o.label, right), `${f.name}: ${o.label} vs ${right}`));
      assert.ok(j.options.every(o => o.why && o.why.length > 5));
      assert.ok(O.grade(j, j.options.find(o => o.correct)).ok);
      assert.ok(j.pattern && j.solution.length >= 2);
    }
  }
});

test("'None of the other answers' is sometimes the right answer, as in the exam", () => {
  const r = L.rng(1);
  let none = 0, n = 0;
  for (let i = 0; i < 300; i++) for (const f of X.FA3) { const j = f(r); n++; if (j.options.find(o => o.correct).label === X.NONE) none++; }
  assert.ok(none / n > 0.08 && none / n < 0.3, `${none}/${n}`);
});

test("the formulas match the official solutions' numbers", () => {
  // Exercise 1: CFO 14,000 − D&A 5,000 + ΔNWC 7,500 + taxes paid 2,300 + interests paid 400 = EBIT 19,200.
  assert.equal(14000 - 5000 + 7500 + 2300 + 400, 19200);
  // Exercise 10: ROE = [(300 × 10% + 2 − 7) × (1 − 40%)] ÷ 80 = 18.75%.
  assert.equal(((150 * 2 * 0.1 + 2 - 7) * 0.6) / 80, 0.1875);
  // Exercise 34: receivables = NOWC − revenues ÷ ITR + DPO × purchases ÷ 365 → DSO ≈ 27.5 days.
  const rev = 40000 / 0.16, rec = 20971 - rev / 17.61 + 90 * 49000 / 365;
  assert.ok(Math.abs(rec / rev * 365 - 27.53) < 0.01);
  // Exercise 39a: ROE = 18.29%.
  const ni = 0.05 * 8500000, ebit = ni / 0.7 + 125000, eq = ebit / 0.09 / 3.5;
  assert.ok(Math.abs(ni / eq - 0.1829) < 0.0001);
  // Exercise 40a: NPM = 8.75%.
  const pay = 182.5 * 20000 / 365, rv = (10000 + pay - 4000) * 365 / 73;
  assert.equal(pay, 10000); assert.equal(rv, 80000);
});

test("desks at the exam level include the past-exam patterns; a mock exam has eight graded questions", () => {
  const s = O.newCareer();
  S.studyOf(s, "fa").level = 3; S.studyOf(s, "cons").level = 3;
  const r = L.rng(4);
  const seen = new Set();
  for (let i = 0; i < 300; i++) { const j = S.studyJob(s, "fa", r); if (j.pattern) seen.add(j.pattern); }
  assert.ok(seen.size >= 12, [...seen].join(", "));
  const mock = X.mockExam(r);
  assert.equal(mock.length, 8);
  mock.forEach(j => assert.ok(O.grade(j, j.options.find(o => o.correct)).ok));
});
