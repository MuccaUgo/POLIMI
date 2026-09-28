const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
global.QuestWorld = load("world.js");
const L = load("logic.js");
const D = load("office-data.js");
const O = load("office-logic.js");
const A = load("office-analysis.js");

function correct(job) {
  if (job.type === "sort") return job.answer;
  if (job.type === "quick") return job.options.find(o => o.correct);
  if (job.type === "spot") return { line: job.wrongAt, fix: job.answer };
  if (job.type === "build") return { placed: job.items.map(i => i.element), profit: job.profit };
  if (job.type === "order") return { years: job.items.map(i => i.year) };
  if (job.type === "fill") return { values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])), choice: job.choice && job.choice.answer };
  if (job.type === "posting") return { lines: job.lines };
  if (job.type === "reclass") return { placed: job.items.map(i => i.cat), values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])) };
  throw new Error(job.type);
}

test("the Financial Analyst is the third rank, reached by interview, with the listed client", () => {
  const r = D.RANKS[2];
  assert.equal(r.id, "analyst");
  assert.ok(!r.soon);
  assert.ok(r.clients.includes("lario") && D.CLIENTS.lario.listed);
  const s = O.newCareer();
  s.rank = "junior"; s.xp = r.xp;
  assert.equal(O.interviewStatus(s).state, "ready");
  const jobs = O.planInterview(s, L.rng(3));
  assert.deepEqual(jobs.map(j => j.type).sort(), ["fill", "fill", "fill", "quick", "reclass", "reclass"]);
  jobs.forEach(j => assert.ok(O.grade(j, correct(j)).ok));
  assert.equal(O.normalizeCareer({ mode: "career", rank: "accountant" }).rank, "analyst", "old saves map to the new rank");
});

test("reclassified balance sheets always balance: invested capital = equity + NFP + provisions", () => {
  for (let seed = 1; seed <= 300; seed++) {
    const j = A.reclassBS(3, ["lario"], L.rng(seed));
    const by = cat => j.items.filter(i => i.cat === cat);
    const signed = it => A.BS_ITEMS[Object.keys(A.BS_ITEMS).find(k => A.BS_ITEMS[k][0] === it.label)][2] * it.amount;
    const sum = cat => by(cat).reduce((s, it) => s + signed(it), 0);
    const f = Object.fromEntries(j.fields.map(x => [x.key, x.answer]));
    assert.equal(f.nowc, sum("NOWC"));
    assert.equal(f.nfp, sum("NFP"));
    assert.equal(f.ic, sum("Fixed assets") + sum("NOWC"));
    assert.equal(f.ic, sum("Equity") + sum("NFP") + sum("Provisions"));
    assert.ok(sum("Equity") >= 15000);
    assert.ok(j.items.every(i => A.BS_CATS.includes(i.cat)));
    assert.equal(new Set(j.items.map(i => i.label)).size, j.items.length);
  }
});

test("reclassified income statements add up and stay profitable at EBIT", () => {
  for (let seed = 1; seed <= 300; seed++) {
    const j = A.reclassIS(3, ["lario"], L.rng(seed));
    const v = Object.fromEntries(j.fields.map(x => [x.key, x.answer]));
    const doc = Object.fromEntries(j.doc.lines.map(([k, x]) => [k, Number(x.replace(/,/g, ""))]));
    assert.equal(v.va, doc["Total revenues"] - doc["Raw materials"] - doc["General and administrative expenses"]);
    assert.equal(v.ebitda, v.va - doc["Personnel costs"]);
    assert.equal(v.ebit, v.ebitda - doc["Depreciation and amortisation"]);
    assert.equal(v.net, v.pretax - doc["Income tax"]);
    assert.ok(v.ebit > 0);
  }
});

test("ROE, payout and segment jobs match their formulas", () => {
  for (let seed = 1; seed <= 200; seed++) {
    const j = A.ratio(3, ["lario"], L.rng(seed));
    const d = Object.fromEntries(j.doc.lines.map(([k, x]) => [k, Number(x.replace(/,/g, ""))]));
    const vals = Object.values(d);
    const [net, prev, eq, div] = vals;
    assert.ok(Math.abs(j.fields[0].answer - net / eq * 100) < 0.01);
    assert.ok(Math.abs(j.fields[1].answer - div / prev) < 0.006);
    assert.equal(j.choice.answer === "More than last year's profit", j.fields[1].answer > 1);
    const sg = A.segment(3, ["lario"], L.rng(seed));
    assert.ok(sg.choice.options.includes(sg.choice.answer));
    assert.ok(sg.fields[0].answer > 0 && sg.fields[0].answer < 100);
  }
});

test("source sorting always mixes at least three kinds of source", () => {
  for (let seed = 1; seed <= 200; seed++) {
    const j = A.sources(3, ["lario"], L.rng(seed));
    assert.ok(new Set(j.items.map(i => i.cat)).size >= 3);
    assert.ok(j.items.every(i => A.SRC_CATS.includes(i.cat)));
  }
});

test("level-3 phone calls are well formed", () => {
  const calls = D.CALLS.filter(c => c[0] === 3);
  assert.ok(calls.length >= 12);
  for (const [, client, q, a, wrongs] of calls) {
    assert.equal(client, "lario");
    assert.equal(wrongs.length, 3);
    assert.ok(!wrongs.includes(a), q);
    assert.equal(new Set(wrongs).size, 3, q);
  }
});

test("thirty days as a Financial Analyst: every job grades its own answer and the books balance", () => {
  const r = L.rng(11);
  const s = O.newCareer();
  s.rank = "analyst";
  const seen = new Set();
  for (let day = 1; day <= 30; day++) {
    s.day = ((day - 1) % 12) + 1;
    for (const job of O.planDay(s, r).jobs) {
      seen.add(job.type + (job.client || ""));
      assert.ok(O.grade(job, correct(job)).ok, `${job.type} on day ${day}`);
      O.reward(s, job, true);
      if (job.type === "posting") O.post(s, job.title, job.lines);
    }
  }
  assert.ok(seen.has("reclasslario") && seen.has("filllario"), [...seen].join(","));
  assert.ok(O.trialOK(s));
});
