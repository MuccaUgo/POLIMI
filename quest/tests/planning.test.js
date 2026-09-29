const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
global.QuestWorld = load("world.js");
const L = load("logic.js");
const D = load("office-data.js");
const O = load("office-logic.js");
load("office-analysis.js");
const S = load("office-study.js");
load("office-exam.js");
const P = load("office-planning.js");

const right = j => j.type === "reclass"
  ? { placed: j.items.map(x => x.cat), values: {} }
  : { values: Object.fromEntries(j.fields.map(f => [f.key, f.answer])), choice: j.choice && j.choice.answer };

test("the Eni figures match the lecture's common size table", () => {
  const pct = x => Math.round(x * 10000) / 100;
  assert.equal(pct(P.ENI.bs["Cash and cash equivalents"][1] / P.ENI.totalAssets[1]), 5.91);
  assert.equal(pct(P.ENI.bs["Cash and cash equivalents"][1] / P.ENI.bs["Cash and cash equivalents"][0] - 1), -1.01);
  assert.equal(pct(P.ENI.bs["Trade and other receivables"][1] / P.ENI.bs["Trade and other receivables"][0] - 1), -26.42);
  assert.equal(pct(P.ENI.bs["Property, plant and equipment"][1] / P.ENI.totalAssets[1]), 36.87);
  assert.equal(pct(P.ENI.is["Profit"][1] / P.ENI.revenues[1]), 3.3);
});

test("every planning and common size exercise is well formed and grades its own answers as right", () => {
  const r = L.rng(17);
  for (const k of ["eniCommonSize", "commonSize", "relativeChange", "matchMaturity", "creditLine", "factoring", "ifrs16", "taxShield", "bond"]) {
    for (let i = 0; i < 200; i++) {
      const j = P[k](r);
      assert.ok(j.pattern, k);
      if (j.type === "reclass") j.items.forEach(it => assert.ok(j.cats.includes(it.cat), k));
      else j.fields.forEach(f => assert.ok(Number.isFinite(f.answer) && f.why, `${k} ${f.key}`));
      if (j.choice) assert.ok(j.choice.options.includes(j.choice.answer), k);
      assert.ok(O.grade(j, right(j)).ok, k);
    }
  }
});

test("the Eni ROE example gives the slides' Delta of 5.19%", () => {
  const r = L.rng(1);
  let seen = false;
  for (let i = 0; i < 200 && !seen; i++) {
    const j = P.relativeChange(r);
    if (j.pattern === "relative change · Eni" && j.fields[0].label.startsWith("ROE")) {
      assert.deepEqual(j.fields.map(f => f.answer), [4.97, 5.22, 5.19]);
      seen = true;
    }
  }
  assert.ok(seen);
});

test("factoring: with recourse the advance is debt and the receivable stays; without, it leaves", () => {
  const r = L.rng(5);
  for (let i = 0; i < 200; i++) {
    const j = P.factoring(r), v = Object.fromEntries(j.fields.map(f => [f.key, f.answer]));
    if (j.choice.answer === "The firm") { assert.equal(v.nfp, v.today); assert.ok(v.rec > 0); }
    else { assert.equal(v.nfp, 0); assert.equal(v.rec, 0); }
  }
});

test("IFRS 16 raises EBITDA by the rent and net debt by the lease liability", () => {
  const r = L.rng(8);
  for (let i = 0; i < 100; i++) {
    const j = P.ifrs16(r), doc = Object.fromEntries(j.doc.lines), num = s => Number(String(s).replace(/,/g, ""));
    const v = Object.fromEntries(j.fields.map(f => [f.key, f.answer]));
    assert.equal(v.ebitda, num(doc["EBITDA (after the lease rent)"]) + num(doc["Yearly lease payment (rent)"]));
    assert.equal(v.nfp, num(doc["Net financial position"]) + num(doc["Lease liability at the start (present value)"]));
  }
});

test("the new work reaches the financial analysis desk, its theory and the analyst's day", () => {
  for (const l of [1, 2, 3]) assert.ok(S.PLAN.fa[l].includes(P.relativeChange));
  assert.ok(S.PLAN.fa[2].includes(P.factoring) && S.PLAN.fa[2].includes(P.ifrs16));
  assert.ok(S.MCQ.filter(q => q[0] === "fa").length >= 25);
  for (const [, , , opts] of S.MCQ) assert.equal(opts.filter(o => o[1]).length, 1);
  const s = O.newCareer(); s.rank = "analyst";
  const r = L.rng(4);
  for (const t of ["commonSize", "eniCommonSize", "factoring", "ifrs16", "matchMaturity"]) {
    const j = O.clientJob(s, r, t);
    assert.equal(j.client, "lario");
    assert.ok(O.grade(j, right(j)).ok, t);
  }
});
