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
load("office-study.js");

const reload = s => O.normalizeCareer(JSON.parse(JSON.stringify(s)));
// What the office does when a job is finished (office-ui.js finish()), without the screens.
function finishJob(s, job) {
  if (job.id && !O.markDone(s, job.id)) return null;
  O.reward(s, job, true);
  if (job.type === "posting") O.post(s, job.title, job.lines, "", job.agm ? { year: s.year + 1, q: 1, day: 1 } : null, job.id);
  s.queue = s.queue.filter(j => j.id !== job.id);
  s.carrying = null;
  return O.advance(s);
}
// What resume() does after a reload.
function resume(s, r) {
  if (!s.queue.length && !s.carrying) {
    if (s.phase === "work") {
      if (s.planned === O.dayKey(s)) return O.advance(s);
      s.queue = O.planDay(s, r).jobs; s.planned = O.dayKey(s);
    } else if (s.phase === "close" || s.phase === "agm") return O.advance(s);
  }
  return null;
}

test("an entry with a ref is posted once; old saves are matched on label and date", () => {
  const s = O.newCareer();
  assert.equal(O.post(s, "Office supplies", [["consumables", 300], ["cash", -300]], "", null, "fe:1:3"), true);
  assert.equal(O.post(s, "Office supplies", [["consumables", 300], ["cash", -300]], "", null, "fe:1:3"), false);
  assert.equal(s.ledger.length, 1);
  const old = O.newCareer();
  old.ledger.push({ label: "PolimiAFC S.p.A. is born", lines: [["cash", 100000], ["shareCapital", -100000]], year: 1, q: 1, day: 1 });
  assert.equal(O.firmEvent(old), null, "the memo already in an old save's books isn't handed out again");
});

test("reloading after the day's last job doesn't plan the day again nor post the memo twice", () => {
  const r = L.rng(7);
  let s = O.newCareer();
  s.phase = "work";
  s.queue = O.planDay(s, r).jobs; s.planned = O.dayKey(s);
  const memo = s.queue.find(j => j.type === "posting");
  assert.ok(memo, "day 1 has Giulia's memo");
  for (const job of s.queue.slice()) finishJob(s, job);
  assert.equal(s.phase, "home", "the day moves on together with its last job");
  const ledger = JSON.stringify(s.ledger), xp = s.xp;
  for (let i = 0; i < 3; i++) { s = reload(s); resume(s, r); }
  assert.equal(s.queue.length, 0);
  assert.equal(s.phase, "home");
  assert.equal(JSON.stringify(s.ledger), ledger);
  assert.equal(s.xp, xp);
  assert.equal(finishJob(s, memo), null, "a finished job can't be finished again");
  assert.equal(JSON.stringify(s.ledger), ledger);
});

test("a save from before this fix, stuck at the end of a day, doesn't post the memo again", () => {
  const r = L.rng(3);
  const s = O.newCareer();
  s.phase = "work";
  s.queue = O.planDay(s, r).jobs;
  for (const job of s.queue.slice()) { O.post(s, job.title || "x", job.lines || [], ""); s.queue = s.queue.filter(j => j !== job); }
  const old = JSON.parse(JSON.stringify(s));
  delete old.planned; delete old.done; delete old.closedQ;
  old.phase = "work"; // the old code saved this before moving on
  const back = O.normalizeCareer(old);
  assert.equal(back.planned, "");
  const before = back.ledger.length;
  resume(back, r);
  assert.ok(!back.queue.some(j => j.type === "posting"), "no memo for a day already in the books");
  assert.equal(back.ledger.length, before);
});

test("the quarter close and the client quarter happen once, whatever the reloads", () => {
  const r = L.rng(11);
  let s = O.newCareer();
  s.phase = "work"; s.day = 3;
  s.queue = O.planDay(s, r).jobs; s.planned = O.dayKey(s);
  const jobs = s.queue.slice();
  jobs.forEach((j, i) => { const n = finishJob(s, j); if (i === jobs.length - 1) assert.equal(n, "close"); });
  assert.equal(s.phase, "close");
  s = reload(s);
  const close = s.queue.map(j => j.id);
  s = reload(s);
  assert.deepEqual(s.queue.map(j => j.id), close, "the close memos keep their ids across reloads");
  for (const job of s.queue.slice()) finishJob(s, job);
  assert.equal(s.phase, "home");
  const rev = JSON.stringify(s.clientRev);
  s = reload(s); resume(s, r); s = reload(s); resume(s, r);
  assert.equal(JSON.stringify(s.clientRev), rev, "clients' quarter counted once");
  assert.equal(O.quarterClose(s).length, 0, "nothing left to close for this quarter");
  // A save caught between the last close memo and the client quarter.
  const mid = reload(s); mid.phase = "close"; mid.closedQ = "";
  resume(mid, r);
  assert.equal(mid.phase, "home");
});

test("closing the year twice posts one closing entry and one shareholders' meeting", () => {
  const r = L.rng(21);
  const s = O.newCareer();
  for (let day = 1; day <= 12; day++) {
    s.day = day;
    for (const j of O.planDay(s, r).jobs) { O.reward(s, j, true); if (j.type === "posting") O.post(s, j.title, j.lines, "", null, j.id); }
    if (day % 3 === 0) O.quarterClose(s).forEach(j => O.post(s, j.title, j.lines, "", null, j.id));
  }
  const p1 = O.closeYear(s), p2 = O.closeYear(s);
  assert.equal(p1, p2);
  assert.equal(s.ledger.filter(e => e.label === "Closing entry").length, 1);
  const m = O.agm(s, p1);
  if (m) {
    O.post(s, m.title, m.lines, "", { year: s.year + 1, q: 1, day: 1 }, m.id);
    assert.equal(O.agm(s, p1), null);
  }
});

test("old saves gain the new fields", () => {
  const s = O.normalizeCareer({ mode: "career", rank: "intern", ledger: [], queue: [] });
  assert.deepEqual([s.done, s.planned, s.closedQ], [[], "", ""]);
});

test("the 'rent used' memo gives the figures to work out the amount, also in saves from before", () => {
  const s = O.newCareer();
  s.day = 6;
  const job = O.quarterClose(s).find(j => j.title === "Rent used");
  assert.match(job.memo, /€9,000/);
  assert.match(job.memo, /April to June/);
  assert.match(job.why, /€1,500 a month/);
  const old = JSON.parse(JSON.stringify(s));
  old.queue = [Object.assign({}, job, { memo: "Three more months of the prepaid rent have been used (April to June): adjust the books." })];
  old.carrying = null;
  const back = O.normalizeCareer(old);
  assert.match(back.queue[0].memo, /€9,000/);
  assert.match(back.queue[0].memo, /April to June/);
  assert.deepEqual(back.queue[0].lines, job.lines);
});
