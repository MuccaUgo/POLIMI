const assert = require("node:assert/strict");
const test = require("node:test");
const load = require("./load");

const C = load();
const SEEDS = 300;

// The 25 exercises of the course PDF, solved independently of the templates.
const PDF = {
  "fa1-credit-sale": { rev0: 18000, rev1: 0, cash0: 0, cash1: 18000, rec: 18000 },
  "fa1-prepaid": { exp0: 3000, exp1: 9000, cash0: 12000, cash1: 0, prepaid: 9000 },
  "fa1-accrual-cash-events": { rev: 96000, cash: 78000, rec0: 26000, rec1: 6000 },
  "fa1-profit-vs-cash": { profit: 58000, cash: 50000, diff: 8000, drec: 20000, dpay: 12000 },
  "fa1-two-years": { rev0: 120000, rev1: 0, ins0: 12000, ins1: 12000, wag0: 40000, wag1: 0, p0: 68000, p1: -12000, in0: 90000, in1: 30000, out0: 59000, out1: 5000, cf0: 31000, cf1: 25000, rec: 30000, pre: 12000, pay: 5000 },
  "fa2-depreciation": { dep: 12000, acc: 36000, ca: 48000 },
  "fa2-impairment": { basis: "Fair value less costs of disposal", ra: 103000, loss: 12000, rev: 103000 },
  "fa2-receivables": { spec: 1600, gen: 2352, total: 3952, net: 76048 },
  "fa2-inventory": { avg: 10, fifoCogs: 2000, wacCogs: 2200, fifoClose: 1500, wacClose: 1300, fifoRep: 1250, wacRep: 1250 },
  "fa2-asset-section": { machine: 102000, patent: 30000, nca: 132000, stock: 35000, rec: 60800, ca: 107800, ta: 239800 },
  "fa3-equation": { e0: 275000, a1: 795000, l1: 485000, e1: 310000 },
  "fa3-soce": { p: 48000, d: -19000, k: 30000, c: 269000, chg: 59000 },
  "fa3-provision": { basis: "Expected value (probability-weighted)", ev: 250, total: 25000 },
  "fa3-deferred-tax": { dA: 40000, dtl: 10000, dP: 30000, dta: 7500, net: 2500 },
  "fa3-el-section": { res: 57000, p: 54000, te: 411000, loanN: 115000, warN: 15000, dtl: 11000, ncl: 141000, loanC: 25000, tp: 62000, warC: 9000, cl: 96000, tl: 237000, tel: 648000 },
  "fa4-gross-profit": { gp0: 84000, gm0: 35 },
  "fa4-ebitda": { ebitda: 105000, ebit: 70000, margin: 70000 / 310000 * 100 },
  "fa4-by-nature": { dfg: 7000, vop: 187000, used: 88000, ebit: 43000 },
  "fa4-eps": { pbt: 75000, cont: 52500, np: 47500, eps: 1.9 },
  "fa4-complete-is": { gp: 255000, ebit: 111000, ebitda: 131000, pbt: 96000, tax: 28800, cont: 67200, np: 74200, eps: 1.855 },
  "fa5-change-in-cash": { net: 18000, close: 44000 },
  "fa5-direct": { rec: 205000, sup: -112000, wag: -48000, tax: -17000, cfo: 28000 },
  "fa5-indirect": { dep: 18000, rec: -11000, inv: 6000, pay: 8000, cfo: 93000 },
  "fa5-three-sections": { plant: -90000, sale: 14000, cfi: -76000, borrow: 50000, repay: -18000, div: -11000, cff: 21000, net: 9000, close: 31000 },
  "fa5-cash-flow-segments": { dep: 24000, gain: -5000, rec: -14000, inv: 7000, pay: 9000, cfo: 116000, sale: 18000, capex: -62000, cfi: -44000, loans: 30000, div: -20000, cff: 10000, net: 82000, close: 118000, shA: 60, shB: 40, mA: 15, mB: 7.5 }
};

test("chapters 1–5 each have three levels with at least two case types", () => {
  assert.deepEqual(Array.from(C.chapters()), [1, 2, 3, 4, 5]);
  for (const ch of C.chapters()) {
    for (const lv of [1, 2, 3]) assert.ok(C.templates(ch, lv).length >= 2, `chapter ${ch} level ${lv}`);
  }
  assert.ok(C.registry.length >= 50);
});

test("every exercise of the course PDF is a case type, at the PDF's difficulty", () => {
  const levels = { Basic: 1, Intermediate: 2, Advanced: 3 };
  const pdf = C.registry.filter(t => t.source);
  assert.equal(pdf.length, 25);
  assert.deepEqual(Array.from(pdf, t => t.id).sort(), Object.keys(PDF).sort());
  for (const t of pdf) {
    const [, ch, n] = /^PDF (\d+)\.(\d)$/.exec(t.source).map(Number);
    assert.equal(t.chapter, ch, t.id);
    // PDF numbering: exercises 1–2 basic, 3–4 intermediate, 5 advanced.
    assert.equal(t.level, n <= 2 ? levels.Basic : n <= 4 ? levels.Intermediate : levels.Advanced, t.id);
    assert.ok(t.original, t.id);
  }
});

test("seed 0 reproduces the PDF's numbers and the independent solutions", () => {
  for (const [id, expected] of Object.entries(PDF)) {
    const k = C.makeCase(id, 0);
    assert.ok(k.original, id);
    const got = Object.fromEntries(k.cells.map(c => [c.key, c.ans]));
    assert.deepEqual(Object.keys(got).sort(), Object.keys(expected).sort(), `${id} lines`);
    for (const [key, want] of Object.entries(expected)) {
      if (typeof want === "string") assert.equal(got[key], want, `${id}.${key}`);
      else assert.ok(Math.abs(got[key] - want) < 1e-6, `${id}.${key}: ${got[key]} ≠ ${want}`);
    }
  }
});

test("the PDF's EPS of 1.855 is shown as 1.86 and accepts either rounding", () => {
  const k = C.makeCase("fa4-complete-is", 0);
  const eps = k.cells.find(c => c.key === "eps");
  assert.equal(C.fmt(eps.ans, eps.fmt), "1.86");
  assert.ok(C.gradeCell(eps, { value: 1.86 }).ok);
  assert.ok(C.gradeCell(eps, { value: 1.85 }).ok);
  assert.ok(!C.gradeCell(eps, { value: 1.87 }).ok);
});

test("generated cases are well formed for every case type", () => {
  for (const t of C.registry) {
    for (let seed = 0; seed < SEEDS; seed++) {
      const k = C.makeCase(t.id, seed);
      const where = `${t.id} seed ${seed}`;
      assert.ok(k.brief && k.rule && k.docs.length, where);
      assert.ok(k.cells.length >= 2, where);
      const keys = new Set(k.cells.map(c => c.key));
      assert.equal(keys.size, k.cells.length, `${where}: duplicate keys`);
      const text = JSON.stringify([k.brief, k.docs, k.paper.sections.map(s => [s.title, s.cols, s.rows.map(r => r.label)]), k.cells.map(c => [c.hint, c.why])]);
      assert.ok(!/NaN|undefined|Infinity/.test(text), `${where}: ${text.match(/.{30}(NaN|undefined|Infinity).{30}/)}`);
      for (const c of k.cells) {
        assert.ok(c.hint && c.why, `${where}.${c.key}: hint and explanation`);
        if (c.t === "choice") { assert.ok(c.options.includes(c.ans), `${where}.${c.key}`); continue; }
        assert.ok(Number.isFinite(c.ans), `${where}.${c.key}`);
        if (c.fmt === "eur") assert.ok(Math.abs(c.ans * 100 - Math.round(c.ans * 100)) < 1e-6, `${where}.${c.key}: ${c.ans} has more than two decimals`);
      }
      for (const s of k.paper.sections) {
        for (const r of s.rows) {
          assert.equal(r.cells.length, s.cols ? s.cols.length : 1, `${where}: ${r.label} has the wrong number of cells`);
          r.cells.forEach(c => { if (c && c.t === "given") assert.ok(Number.isFinite(c.value), `${where}: ${r.label}`); });
        }
      }
    }
  }
});

test("the correct answers pass every tie-out check and earn a clean opinion", () => {
  for (const t of C.registry) {
    for (let seed = 0; seed < SEEDS; seed++) {
      const k = C.makeCase(t.id, seed);
      const entries = Object.fromEntries(k.cells.map(c => [c.key, { value: c.ans }]));
      for (const check of k.checks) {
        const r = C.evalCheck(check, entries);
        assert.ok(r.ready && r.ok, `${t.id} seed ${seed}: ${check.label} off by ${r.diff}`);
      }
      assert.equal(C.audit(k, entries, {}).stars, 3);
    }
  }
});

test("cases are deterministic for a seed and vary across seeds", () => {
  for (const t of C.registry) {
    assert.deepEqual(JSON.stringify(C.makeCase(t.id, 42)), JSON.stringify(C.makeCase(t.id, 42)));
    const answers = new Set();
    for (let seed = 1; seed <= 20; seed++) answers.add(JSON.stringify(C.makeCase(t.id, seed).cells.map(c => c.ans)));
    assert.ok(answers.size >= 10, `${t.id} produced only ${answers.size} distinct cases in 20 seeds`);
  }
});

test("generated numbers stay realistic", () => {
  const nonNegative = {
    "fa2-depreciation": ["dep", "acc", "ca"], "fa2-impairment": ["ra", "loss", "rev"], "fa2-asset-section": ["machine", "patent", "stock", "rec", "ta"],
    "fa2-asset-register": ["bCa", "aCa", "mbCa", "ppe"], "fa3-el-section": ["res", "te", "loanN", "warN", "tel"], "fa3-soce": ["c"],
    "fa3-tax-expense": ["taxable", "cur", "np"], "fa3-warranty": ["exp", "close", "cur", "ncl"], "fa4-eps": ["pbt", "np", "eps"],
    "fa4-complete-is": ["ebit", "pbt", "np", "eps"], "fa4-complete-by-nature": ["used", "ebit", "pbt", "np"], "fa5-three-sections": ["close"],
    "fa5-full-cfs": ["close"], "fa5-cash-flow-segments": ["close", "sale"], "fa2-inventory": ["fifoRep", "wacRep"]
  };
  for (const [id, keys] of Object.entries(nonNegative)) {
    for (let seed = 0; seed < SEEDS; seed++) {
      const got = Object.fromEntries(C.makeCase(id, seed).cells.map(c => [c.key, c.ans]));
      for (const key of keys) assert.ok(got[key] >= 0, `${id} seed ${seed}: ${key} = ${got[key]}`);
    }
  }
});
