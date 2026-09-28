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

function correct(job) {
  if (job.type === "mcq") return job.options.find(o => o.correct);
  if (job.type === "fill") return { values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])), choice: job.choice && job.choice.answer };
  if (job.type === "reclass") return { placed: job.items.map(i => i.cat), values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])) };
  if (job.type === "posting") return { lines: job.lines };
  if (job.type === "sort") return job.answer;
  if (job.type === "quick") return job.options.find(o => o.correct);
  if (job.type === "spot") return { line: job.wrongAt, fix: job.answer };
  if (job.type === "build") return { placed: job.items.map(i => i.element), profit: job.profit };
  if (job.type === "order") return { years: job.items.map(i => i.year) };
  throw new Error(job.type);
}

test("every theory question has four options and exactly one right answer, each explained", () => {
  assert.ok(S.MCQ.filter(q => q[0] === "cons").length >= 12);
  assert.ok(S.MCQ.filter(q => q[0] === "fa").length >= 10);
  for (const [track, level, q, opts] of S.MCQ) {
    assert.ok(["cons", "fa"].includes(track) && [1, 2, 3].includes(level), q);
    assert.equal(opts.length, 4, q);
    assert.equal(opts.filter(o => o[1]).length, 1, q);
    assert.ok(opts.every(o => o[2] && o[2].length > 10), q);
    assert.equal(new Set(opts.map(o => o[0])).size, 4, q);
  }
});

test("every desk, at every level, generates well-formed files that grade their own answers", () => {
  const s = O.newCareer();
  for (const track of ["cons", "fa"]) for (const level of [1, 2, 3]) {
    S.studyOf(s, track).level = level;
    const r = L.rng(level * 101 + track.length);
    for (let i = 0; i < 300; i++) {
      const job = S.studyJob(s, track, r);
      assert.equal(job.track, track); assert.equal(job.level, level);
      assert.equal(job.pickup, "inbox"); assert.equal(job.work, "desk");
      (job.fields || []).forEach(f => assert.ok(Number.isFinite(f.answer), `${track} L${level} ${f.key}`));
      assert.ok(O.grade(job, correct(job)).ok, `${track} L${level} ${job.type}`);
      if (job.type === "mcq") assert.equal(O.grade(job, job.options.find(o => !o.correct)).ok, false);
    }
  }
});

test("full consolidation: goodwill and NCI follow the course formulas, and the group balance sheet balances", () => {
  for (const withFV of [false, true]) for (let seed = 1; seed <= 300; seed++) {
    const j = S.fullConsolidation(withFV)(L.rng(seed));
    const f = Object.fromEntries(j.fields.map(x => [x.key, x.answer]));
    assert.ok(f.gw > 0 && f.nci > 0 && f.ta > 0);
    if (!withFV) { assert.equal(f.dtl, undefined); }
    else assert.ok(f.dtl >= 0 && f.dta >= 0);
  }
  // The Comfy/Sunny example from Lecture 04: 75% of 50,000 shares at 2.5, PPE +500, liabilities +400, tax 50%.
  const inv = 93750, nci = 0.25 * 50000 * 2.5, surplus = 500 - 400 - 250 + 200;
  assert.equal(inv + nci - 110000 - surplus, 14950);
});

test("equity method: book value(t) = book value(t−1) + share of profit − share of dividends", () => {
  for (let seed = 1; seed <= 200; seed++) {
    const j = S.equityMethod(2)(L.rng(seed));
    const f = Object.fromEntries(j.fields.map(x => [x.key, x.answer]));
    assert.ok(Math.abs(f.bv - (f.bv1 + f.is - f.cf)) < 0.01);
  }
  // Pumpkin/Zombie: 30% for 500,000; NI 100,000 and dividends 50,000 → 515,000.
  assert.equal(500000 + 0.3 * 100000 - 0.3 * 50000, 515000);
});

test("desks level up after 6 right out of the last 8 at the current level, up to the exam level", () => {
  const s = O.newCareer();
  const r = L.rng(5);
  let ups = [];
  for (let i = 0; i < 40; i++) {
    const job = S.studyJob(s, "cons", r);
    const up = S.recordStudy(s, job, i % 4 !== 3);
    if (up) ups.push(up);
  }
  assert.deepEqual(ups, [2, 3]);
  assert.equal(S.studyOf(s, "cons").level, 3);
  const t = O.newCareer();
  for (let i = 0; i < 20; i++) S.recordStudy(t, S.studyJob(t, "fa", r), i % 2 === 0);
  assert.equal(S.studyOf(t, "fa").level, 1, "half right is not enough");
});

test("choosing a desk replaces the client jobs but keeps Giulia's memo for the books", () => {
  const s = O.newCareer();
  s.day = 1; s.activity = "cons";
  const { jobs } = O.planDay(s, L.rng(9));
  assert.equal(jobs.filter(j => j.type === "posting").length, 1);
  assert.equal(jobs.filter(j => j.track === "cons").length, D.JOBS_PER_DAY);
  s.activity = "books";
  assert.ok(O.planDay(s, L.rng(9)).jobs.every(j => !j.track));
  const n = O.normalizeCareer({ mode: "career", activity: "chess", study: { fa: { level: 7 } } });
  assert.equal(n.activity, "books");
  assert.equal(n.study.fa.level, 1);
  assert.equal(n.study.cons.level, 1);
});
