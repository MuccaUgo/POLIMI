// Lectures 07–08 (indicators, check-up, residual income) and the exercise session on benchmarking Eni vs TotalEnergies.
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
const X = load("office-exam.js");
load("office-planning.js");
const I = load("office-indicators.js");
const C = load("office-codex.js");

const pct = x => Math.round(x * 10000) / 100;
const r2 = x => Math.round(x * 100) / 100;
const right = j => j.type === "reclass"
  ? { placed: j.items.map(x => x.cat), values: {} }
  : j.type === "mcq" ? j.options.find(o => o.correct)
  : { values: Object.fromEntries(j.fields.map(f => [f.key, f.answer])), choice: j.choice && j.choice.answer };

test("the Eni figures give the slides' indicators, 2024 and 2025", () => {
  const E = I.ENI, both = f => [0, 1].map(f);
  assert.deepEqual(both(i => pct(E.netProfit[i] / E.equity[i])), [4.97, 5.22], "ROE");
  assert.deepEqual(both(i => r2(E.netProfit[i] * 1e6 / E.shares[i])), [0.87, 0.91], "EPS");
  assert.deepEqual(both(i => pct(E.dividends[i] / E.netProfitPrev[i])), [64.05, 121.45], "payout");
  assert.deepEqual(both(i => r2(E.netProfit[i] / E.equity[i] * (1 - E.dividends[i] / E.netProfitPrev[i]) * 100)), [1.79, -1.12], "SGR");
  assert.deepEqual(both(i => pct(E.netProfit[i] / E.sales[i])), [3.11, 3.36], "net profit margin");
  assert.deepEqual(both(i => pct(E.ebit[i] / (E.totalAssets[i] - E.nonFinLiab[i]))), [5.66, 5.76], "ROI");
  assert.deepEqual(both(i => E.totalAssets[i] - E.nonFinLiab[i]), [92491, 86989], "net invested capital");
  assert.deepEqual(both(i => E.equity[i] + E.finLiab[i]), [92491, 86989], "= equity + financial liabilities");
  assert.deepEqual(both(i => pct(E.ebit[i] / E.totalAssets[i])), [3.56, 3.66], "ROA");
  assert.deepEqual(both(i => pct(E.ebit[i] / (E.equity[i] + E.nonCurFinLiab[i]))), [6.36, 6.48], "ROCE");
  assert.deepEqual(both(i => pct(E.ebit[i] / E.sales[i])), [5.9, 6.1], "EBIT margin");
  assert.deepEqual(both(i => pct(E.ebitda[i] / E.sales[i])), [14.46, 15.04], "EBITDA margin");
  assert.deepEqual(both(i => pct(E.cffo[i] / E.ebit[i])), [249.94, 266.07], "quality of operating earnings");
  assert.deepEqual(both(i => r2(E.sales[i] / E.totalAssets[i])), [0.6, 0.6], "asset turnover");
  assert.deepEqual(both(i => r2(E.totalLiab[i] / E.equity[i])), [1.64, 1.6], "D/E");
  assert.deepEqual(both(i => E.totalLiab[i] + E.equity[i]), E.totalAssets, "liabilities + equity = assets");
  assert.deepEqual(both(i => E.curFinLiab[i] + E.nonCurFinLiab[i]), E.finLiab, "current + non-current financial liabilities");
  assert.deepEqual(both(i => r2(E.ebit[i] / E.interest[i])), [3.49, 3.65], "ICR");
  assert.deepEqual(both(i => pct(E.interest[i] / E.finLiab[i])), [4.07, 4.02], "cost of debt");
  assert.deepEqual(both(i => pct(E.taxes[i] / E.pretax[i])), [57.4, 52.27], "effective tax rate");
  assert.deepEqual(both(i => r2(E.currentAssets[i] / E.currentLiab[i])), [1.15, 1.19], "current ratio");
  assert.deepEqual(both(i => E.cash[i] + E.stFinAssets[i] + E.otherCurFinAssets[i] + E.receivables[i]), [32966, 31237], "quick assets");
  assert.deepEqual(both(i => r2((E.cash[i] + E.stFinAssets[i] + E.otherCurFinAssets[i] + E.receivables[i]) / E.currentLiab[i])), [0.87, 0.91], "quick ratio");
  assert.deepEqual(both(i => r2(E.sales[i] / E.inventories[i])), [14.19, 15.97], "inventory turnover");
  assert.deepEqual(both(i => Math.round(E.receivables[i] / E.sales[i] * 365)), [69, 55], "DSO");
  assert.deepEqual(both(i => Math.round(E.payables[i] / E.purchases[i] * 365)), [113, 110], "DPO");
  assert.deepEqual(both(i => pct(E.cffo[i] / E.finLiab[i])), [35.53, 38.97], "cash flow to debt");
  assert.deepEqual(both(i => pct(E.cffo[i] / E.curFinLiab[i])), [129.64, 138.48], "short-term debt coverage");
  assert.deepEqual(both(i => pct(E.cffo[i] / E.capex[i])), [154.2, 144.44], "capex coverage");
  assert.deepEqual(both(i => Math.round(E.ebit[i] - E.ri.k[i] * E.ri.investedCapital[i])), [-584, 423], "residual income");
  assert.equal(Math.round(E.ebit[0] - 0.06 * E.ri.investedCapital[0]), 248, "RI 2024 at 6%");
});

test("the segment mix of Eni and TotalEnergies matches the exercise session", () => {
  const S_ = I.SEGMENTS, share = (rows, s, y) => Math.round(rows[s][y] / rows.reduce((a, r) => a + r[y], 0) * 100);
  assert.deepEqual([0, 1, 2].map(y => S_.eni.reduce((a, r) => a + r[y], 0)), [137709, 127732, 117017]);
  assert.deepEqual([0, 1, 2].map(y => S_.total.reduce((a, r) => a + r[y], 0)), [237128, 214550, 201196]);
  assert.deepEqual([0, 1, 2, 3].map(s => share(S_.eni, s, 2)), [43, 40, 16, 2]);
  assert.deepEqual([0, 1, 2, 3].map(s => share(S_.total, s, 2)), [3, 15, 43, 39]);
});

const GENERATORS = ["shareholdersLine", "eniShareholders", "overallCompany", "margins", "otherStakeholders", "leverageFormula", "liquidity", "cashCoverage", "opexCapex", "fourReaders", "residualIncome", "hotelCase", "segmentMix", "equityInvestments", "riExam", "roceExam", "sgrExam"];
test("every indicators exercise is well formed and grades its own answers as right", () => {
  const r = L.rng(23);
  for (const k of GENERATORS) {
    for (let i = 0; i < 300; i++) {
      const j = I[k](r);
      assert.ok(j.pattern, k);
      if (j.type === "reclass") { j.items.forEach(it => assert.ok(j.cats.includes(it.cat) && it.why, k)); assert.equal(j.short.length, j.cats.length, k); }
      else if (j.type === "mcq") { assert.equal(j.options.filter(o => o.correct).length, 1, k); assert.ok(j.options.length >= 3, k); assert.ok(j.solution.length, k); }
      else {
        j.fields.forEach(f => assert.ok(Number.isFinite(f.answer) && f.why && !/NaN|Infinity|undefined/.test(f.why + f.label), `${k} ${f.key}`));
        j.fields.forEach(f => { if (f.answer < 0) assert.ok(f.neg, `${k} ${f.key} can be negative but has no minus key`); });
        assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(j.doc)), k);
      }
      if (j.choice) assert.ok(j.choice.options.includes(j.choice.answer) && j.choice.why, k);
      assert.ok(O.grade(j, right(j)).ok, k);
    }
  }
});

test("ROCE ≥ ROI ≥ ROA, and the analyst's leverage formula gives the same ROE as (EBIT − I) ÷ E", () => {
  const r = L.rng(9), v = j => Object.fromEntries(j.fields.map(f => [f.key, f.answer]));
  for (let i = 0; i < 200; i++) {
    const a = v(I.overallCompany(r));
    assert.ok(a.roce >= a.roi && a.roi >= a.roa);
    const j = I.leverageFormula(r), b = v(j), doc = Object.fromEntries(j.doc.lines), num = s => Number(String(s).replace(/,/g, ""));
    const e = num(doc["Equity (E)"]), ebit = num(doc.EBIT), int = num(doc["Interest expenses (I)"]);
    assert.ok(Math.abs(b.roe - pct((ebit - int) / e)) < 0.01);
    assert.ok(Math.abs(b.roa * (1 - 1 / b.icr) * (1 + b.de) - b.roe) < 0.15, "the formula from the rounded ratios lands within the tolerance");
  }
});

test("the hotel: the answer follows what happens to ROA and to RI", () => {
  const r = L.rng(31), seen = new Set();
  for (let i = 0; i < 300; i++) {
    const j = I.hotelCase(r), v = Object.fromEntries(j.fields.map(f => [f.key, f.answer]));
    const roa = v.a1 > v.a0, ri = v.ri1 > v.ri0;
    assert.equal(j.choice.answer, roa && ri ? "Both" : ri ? "Only a manager evaluated on RI" : roa ? "Only a manager evaluated on ROA" : "Neither");
    seen.add(j.choice.answer);
  }
  assert.ok(seen.has("Only a manager evaluated on RI") && seen.has("Both") && seen.has("Neither"), "the classic conflict and the other cases all come up");
});

test("the new work reaches the desk levels, the exam, the theory, the phone, the analyst's day and the codex", () => {
  assert.ok(S.PLAN.fa[1].includes(I.fourReaders) && S.PLAN.fa[2].includes(I.residualIncome) && S.PLAN.fa[3].includes(I.hotelCase));
  for (const f of [I.riExam, I.roceExam, I.sgrExam]) { assert.ok(X.FA3.includes(f)); assert.ok(S.PLAN.fa[3].includes(f)); }
  for (const [, , , opts] of S.MCQ) assert.equal(opts.filter(o => o[1]).length, 1);
  assert.ok(S.MCQ.some(q => /Residual income/.test(q[2])) && S.MCQ.some(q => /Zegna/.test(q[2])));
  assert.ok(D.CALLS.some(c => /ROCE/.test(c[2])));
  const r = L.rng(2), mock = X.mockExam(r);
  assert.ok(mock.length >= 8 && mock.every(j => O.grade(j, right(j)).ok));
  const s = O.newCareer(); s.rank = "analyst";
  for (const t of ["fourReaders", "indicatorsLiquidity", "residualIncome", "hotelCase", "shareholdersLine", "overallCompany"]) {
    assert.ok(O.MIX[3].includes(t), t);
    const j = O.clientJob(s, r, t);
    assert.equal(j.client, "lario");
    assert.ok(O.grade(j, right(j)).ok, t);
  }
  for (const q of ["ROCE", "residual income", "quick ratio", "capex coverage", "sustainable growth", "benchmark", "OPEX", "quality of operating earnings", "effective tax rate", "six requirements"])
    assert.ok(C.search(q).length >= 1, q);
});
