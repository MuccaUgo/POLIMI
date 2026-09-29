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

// The phone calls an intern gets: none comes back before all the others have been heard.
test("no phone call repeats until the whole pool has come round", () => {
  const s = O.newCareer(), r = L.rng(5);
  const pool = D.CALLS.filter(c => c[0] === 1 && O.rankFor(s).clients.includes(c[1])).map(c => c[2]);
  const heard = [];
  for (let i = 0; i < pool.length * 2; i++) heard.push(O.clientJob(s, r, "quick").question);
  assert.equal(new Set(heard.slice(0, pool.length)).size, pool.length);
  assert.equal(new Set(heard.slice(pool.length)).size, pool.length);
});

test("filing jobs use every document before any comes back", () => {
  const s = O.newCareer(), r = L.rng(9);
  const pool = O.itemsFor(1, O.rankFor(s).clients).map(i => i[3]);
  const seen = [];
  for (let i = 0; i < pool.length; i++) seen.push(O.clientJob(s, r, "sort").doc.lines[0][1]);
  assert.equal(new Set(seen).size, pool.length);
});

test("a day never has the same kind of job twice in a row, nor three of a kind", () => {
  const s = O.newCareer(), r = L.rng(3);
  for (const rank of ["intern", "junior", "analyst"]) {
    s.rank = rank;
    for (let d = 0; d < 60; d++) {
      const t = O.dayTypes(s, r, D.JOBS_PER_DAY);
      t.forEach((x, i) => assert.notEqual(x, t[i - 1]));
      t.forEach(x => assert.ok(t.filter(y => y === x).length <= 2));
    }
  }
});

test("the memory survives a save and stays bounded", () => {
  const s = O.newCareer(), r = L.rng(1);
  for (let d = 0; d < 80; d++) O.planDay(s, r);
  assert.ok(s.recent.length > 20 && s.recent.length <= 150);
  const back = O.normalizeCareer(JSON.parse(JSON.stringify(s)));
  assert.deepEqual(back.recent, s.recent);
  assert.deepEqual(O.normalizeCareer(Object.assign(O.newCareer(), { recent: "x" })).recent, []);
});

test("every fill exercise is well formed and grades its own answers as right", () => {
  const r = L.rng(11);
  for (const kind of Object.keys(O.FILLS)) {
    for (let i = 0; i < 40; i++) {
      const j = O.FILLS[kind](r);
      assert.ok(D.CLIENTS[j.client], kind);
      for (const f of j.fields) assert.ok(Number.isFinite(f.answer) && f.why, `${kind} ${f.key}`);
      const job = Object.assign({ type: "fill" }, j);
      const ans = { values: Object.fromEntries(j.fields.map(f => [f.key, f.answer])), choice: j.choice && j.choice.answer };
      assert.ok(O.grade(job, ans).ok, kind);
    }
  }
  for (const t of [1, 2]) D.FILL_TIER[t].forEach(k => assert.ok(O.FILLS[k], k));
});

test("cut-off jobs come from one client and mix the two years", () => {
  const s = O.newCareer(), r = L.rng(4);
  s.rank = "junior";
  for (let i = 0; i < 60; i++) {
    const j = O.clientJob(s, r, "order");
    assert.equal(j.items.length, 4);
    assert.equal(new Set(j.items.map(x => x.year)).size, 2);
    const texts = j.items.map(x => x.text);
    assert.ok(texts.every(t => O.ORDER_ITEMS.find(o => o[2] === t)[1] === j.client));
  }
});

test("the study desks rotate their exercise kinds", () => {
  const s = O.normalizeCareer(O.newCareer()), r = L.rng(2);
  s.study.fa.level = 3;
  const n = new Set(S.PLAN.fa[3]).size;
  for (let i = 0; i < n; i++) S.studyJob(s, "fa", r);
  const gens = s.recent.filter(k => k.startsWith("gen:fa3:"));
  assert.equal(gens.length, n);
});

test("an intern works for more than one client, in every kind of job", () => {
  const s = O.newCareer(), r = L.rng(6);
  assert.ok(O.rankFor(s).clients.length >= 2);
  const seen = {};
  for (let d = 0; d < 40; d++) for (const j of O.planDay(s, r).jobs) if (j.client) (seen[j.type] = seen[j.type] || new Set()).add(j.client);
  for (const t of ["sort", "quick", "fill", "spot", "build", "order"]) assert.ok(seen[t] && seen[t].size >= 2, t);
});
