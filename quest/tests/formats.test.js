// The new kinds of work: the consolidation desk's new exercises, true or false, match the terms, put in order,
// explain to the client, office surprises and the Lario case file.
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
load("office-planning.js");
load("office-indicators.js");
const K = load("office-consolidation.js");
load("office-codex.js");
const V = load("office-variety.js");

const right = j => j.type === "truefalse" ? j.statements.map(s => s.truth)
  : j.type === "match" ? j.pairs.map(p => p.def)
  : j.type === "sequence" ? j.steps.slice()
  : j.type === "mcq" ? j.options.find(o => o.correct)
  : j.type === "reclass" ? { placed: j.items.map(x => x.cat), values: Object.fromEntries((j.fields || []).map(f => [f.key, f.answer])) }
  : { values: Object.fromEntries(j.fields.map(f => [f.key, f.answer])), choice: j.choice && j.choice.answer };
const clean = (k, j) => assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(j)), `${k}: a broken figure`);

test("the consolidation desk's new exercises are well formed and grade their own answers right", () => {
  const r = L.rng(41);
  const gens = { investmentType: K.investmentType, combine: K.combineOffset(false), goodwill: K.combineOffset(true), intraGroup: K.intraGroup, fairValueTax: K.fairValueTax, nciGoodwill: K.nciGoodwill, translation: K.translation };
  for (const [k, g] of Object.entries(gens)) {
    for (let i = 0; i < 300; i++) {
      const j = g(r);
      clean(k, j);
      if (j.type === "fill") j.fields.forEach(f => assert.ok(Number.isFinite(f.answer) && f.why && (f.answer >= 0 || f.neg), `${k} ${f.key}`));
      if (j.choice) assert.ok(j.choice.options.includes(j.choice.answer), k);
      assert.ok(O.grade(j, right(j)).ok, k);
    }
  }
  const v = j => Object.fromEntries(j.fields.map(f => [f.key, f.answer]));
  for (let i = 0; i < 200; i++) {
    const n = v(K.nciGoodwill(r));
    assert.ok(n.full > n.part && n.part > 0, "full goodwill above partial");
    const t = K.translation(r), num = s => Number(String(s).replace(/[^0-9.]/g, ""));
    const doc = Object.fromEntries(t.doc.lines), p = num(doc["Profit for the year"]), a = num(doc["Average rate of the year"].split("$")[1]), c = num(doc["Closing rate at 31 December"].split("$")[1]);
    assert.ok(Math.abs(v(t).res - (p / c - p / a)) < 0.01, "translation difference = profit at closing − profit at average rate");
  }
  for (const l of [1, 2, 3]) assert.ok(S.PLAN.cons[l].length >= [7, 10, 13][l - 1], `consolidation desk level ${l}`);
  assert.ok(S.MCQ.filter(q => q[0] === "cons").length >= 26);
});

test("true or false: five statements of both kinds, one slip allowed, not two; a timeout counts what was answered", () => {
  const r = L.rng(5);
  for (const t of ["basics", "analysis", "consolidation"]) {
    assert.ok(V.TF[t].length >= 20, t);
    for (let i = 0; i < 100; i++) {
      const j = V.trueFalse(t, r);
      assert.equal(j.statements.length, 5);
      assert.ok(j.statements.some(s => s.truth) && j.statements.some(s => !s.truth));
      const a = right(j);
      assert.ok(O.grade(j, a).ok);
      const one = a.slice(); one[0] = !one[0];
      assert.ok(O.grade(j, one).ok, "one slip");
      const two = one.slice(); two[1] = !two[1];
      assert.ok(!O.grade(j, two).ok, "two slips");
      const late = [a[0], a[1], a[2], null, null]; late.timeout = true;
      const g = O.grade(j, late);
      assert.ok(!g.ok && g.timeout);
    }
  }
});

test("match the terms: four codex terms, the term never written in its own definition", () => {
  const r = L.rng(7);
  for (const t of Object.keys(V.GROUPS)) {
    for (let i = 0; i < 150; i++) {
      const j = V.matchJob(t, r);
      assert.equal(j.pairs.length, 4);
      assert.equal(new Set(j.defs).size, 4);
      assert.deepEqual(j.defs.slice().sort(), j.pairs.map(p => p.def).sort());
      for (const p of j.pairs) assert.ok(!p.def.toLowerCase().includes(p.term.replace(/\s*\(.*?\)/, "").toLowerCase()), `${p.term} leaks into “${p.def}”`);
      assert.ok(O.grade(j, right(j)).ok);
      assert.ok(!O.grade(j, right(j).reverse()).ok);
    }
  }
});

test("put in order: the steps come shuffled and only the right order passes", () => {
  const r = L.rng(9);
  for (const k of Object.keys(V.SEQ)) {
    for (let i = 0; i < 80; i++) {
      const j = V.sequenceJob(k, r);
      assert.ok(j.steps.length >= 4 && j.why);
      assert.notDeepEqual(j.shown, j.steps, "never already in order");
      assert.deepEqual(j.shown.slice().sort(), j.steps.slice().sort());
      const full = V.SEQ[k].steps;
      assert.ok(j.steps.every((s, n) => n === 0 || full.indexOf(s) > full.indexOf(j.steps[n - 1])), "a subset keeps the course's order");
      assert.ok(O.grade(j, right(j)).ok);
      assert.ok(!O.grade(j, j.shown).ok);
    }
  }
});

test("explain to the client: every scenario has one explanation that holds, with its numbers", () => {
  const r = L.rng(13);
  for (const k of Object.keys(V.EXPLAIN)) {
    for (let i = 0; i < 150; i++) {
      const j = V.explain(r, k);
      clean(k, j);
      assert.equal(j.options.length, 3, k);
      assert.equal(j.options.filter(o => o.correct).length, 1, k);
      assert.ok(j.options.every(o => o.why) && j.solution.length && j.client === "lario", k);
      assert.ok(O.grade(j, right(j)).ok, k);
    }
  }
  assert.ok(Object.keys(V.EXPLAIN).length >= 12);
});

test("the Lario case file: five coherent episodes on the same figures, whatever the reloads", () => {
  for (let seed = 1; seed < 300; seed++) {
    const c = V.caseData(seed * 104729);
    assert.deepEqual(V.caseData(seed * 104729), c, "the same seed gives the same company");
    for (const [i, b] of c.bs.entries()) {
      const assets = b.ppe + b.intang + b.inv + b.rec + b.cash, liab = b.pay + b.prov + b.std + b.ltd;
      assert.equal(assets, liab + b.eq, "the balance sheet balances");
      assert.equal(b.ppe + b.intang + b.rec + b.inv - b.pay, b.eq + (b.std + b.ltd - b.cash) + b.prov, "invested capital = coverage");
      assert.ok(c.is[i].ni > 0 && c.is[i].ebit > 0 && b.cash > 0);
    }
    assert.equal(c.bs[1].eq, c.bs[0].eq + c.is[1].ni - c.div, "equity rolls forward: + profit − dividends");
    for (let n = 0; n < V.EPISODES; n++) {
      const e = V.episode(c, n), j = { type: "fill", fields: e.fields, choice: e.choice };
      clean("episode", e);
      assert.ok(O.grade(j, right(j)).ok);
    }
  }
  // On the financial analysis desk: one episode a day, in place of a desk file, advancing only when done.
  const r = L.rng(3);
  let s = O.normalizeCareer(O.newCareer());
  s.activity = "fa"; s.stats.days = 0;
  const seen = [];
  for (let d = 1; d <= 12; d++) {
    s.day = d;
    const jobs = O.planDay(s, r).jobs, ep = jobs.filter(j => j.caseRef);
    assert.equal(ep.length, 1);
    assert.equal(jobs.filter(j => j.track === "fa").length, D.JOBS_PER_DAY, "the day keeps its length");
    seen.push(ep[0].id);
    s = O.normalizeCareer(JSON.parse(JSON.stringify(s))); // a reload before the job is done
    const j = ep[0];
    O.reward(s, j, d % 2 === 0);
    O.reward(s, j, true); // the same job again changes nothing
  }
  assert.deepEqual(seen.slice(0, 6), ["case:1:0", "case:1:1", "case:1:2", "case:1:3", "case:1:4", "case:2:0"]);
  assert.equal(s.cases.n, 3);
  assert.equal(O.normalizeCareer(Object.assign(O.newCareer(), { cases: { n: "x", step: 9 } })).cases, null, "a broken case state is dropped");
});

test("office surprises: some mornings, by phone, with a bonus only when right", () => {
  const r = L.rng(17);
  const s = O.normalizeCareer(O.newCareer());
  assert.equal([...Array(50)].map(() => V.surprise(s, r)).filter(Boolean).length, 0, "never on the first day");
  s.stats.days = 5;
  const kinds = {};
  let n = 0;
  for (let d = 0; d < 600; d++) {
    s.activity = ["books", "cons", "fa"][d % 3]; s.rank = d % 2 ? "intern" : "analyst"; s.day = d % 12 + 1; s.year = 1 + Math.floor(d / 12);
    const j = V.surprise(s, r);
    if (!j) continue;
    n++;
    kinds[j.surprise.kind] = (kinds[j.surprise.kind] || 0) + 1;
    assert.equal(j.pickup, "phone");
    assert.equal(j.id, `sp:${s.year}:${s.day}`);
    if (s.activity === "cons") assert.equal(j.surprise.kind, "auditorCons");
    if (j.surprise.kind === "bank") assert.ok(!/Eni/.test(j.pattern), "the bank asks about Lario, not Eni");
    assert.ok(O.grade(j, right(j)).ok, j.surprise.kind);
  }
  assert.ok(n > 80 && n < 170, `about one morning in five (${n}/600)`);
  for (const k of ["auditorCons", "auditorFa", "auditorBasics", "flashcards", "bank", "cfo"]) assert.ok(kinds[k] > 0, k);
  s.activity = "cons";
  let job = null;
  for (let seed = 1; !job; seed++) job = V.surprise(s, L.rng(seed));
  const b0 = s.bonus || 0;
  O.reward(s, job, false);
  assert.equal(s.bonus || 0, b0, "nothing when wrong");
  const rw = O.reward(s, job, true);
  assert.equal(rw.surprise, job.surprise.bonus);
});

test("the new formats reach the client days, both desks and the analyst's day", () => {
  for (const t of ["truefalse", "match", "sequence"]) [1, 2, 3].forEach(l => assert.ok(O.MIX[l].includes(t), `${t} tier ${l}`));
  assert.ok(O.MIX[3].includes("explain"));
  const r = L.rng(21);
  for (const rank of ["intern", "junior", "analyst", "senior"]) {
    const s = O.normalizeCareer(O.newCareer()); s.rank = rank;
    for (const t of ["truefalse", "match", "sequence"].concat(O.tierOf(s) >= 3 ? ["explain"] : [])) {
      for (let i = 0; i < 20; i++) {
        const j = O.clientJob(s, r, t);
        assert.ok(O.rankFor(s).clients.includes(j.client), `${rank} ${t}: a client of this rank`);
        assert.ok(O.grade(j, right(j)).ok, `${rank} ${t}`);
      }
    }
  }
  for (const tr of ["cons", "fa"]) for (const l of [1, 2, 3]) {
    const s = O.normalizeCareer(O.newCareer());
    s.study[tr].level = l;
    for (let i = 0; i < 60; i++) { const j = S.studyJob(s, tr, r); assert.ok(O.grade(j, right(j)).ok, `${tr} ${l} ${j.type}`); }
  }
});
