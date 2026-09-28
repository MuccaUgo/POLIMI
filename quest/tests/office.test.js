const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));

global.window = globalThis;
const A = load("art.js");
load("office-art.js");
global.QuestWorld = load("world.js");
const L = load("logic.js");
const D = load("office-data.js");
const O = load("office-logic.js");
load("office-ui.js");
const W = global.QuestWorld;
const UI = globalThis.OfficeUI;

// The right answer for any job, in the shape grade() expects.
function correct(job) {
  if (job.type === "sort") return job.answer;
  if (job.type === "quick") return job.options.find(o => o.correct);
  if (job.type === "spot") return { line: job.wrongAt, fix: job.answer };
  if (job.type === "build") return { placed: job.items.map(i => i.element), profit: job.profit };
  if (job.type === "order") return { years: job.items.map(i => i.year) };
  if (job.type === "fill") return { values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])), choice: job.choice && job.choice.answer };
  if (job.type === "posting") return { lines: job.lines };
  throw new Error(job.type);
}

test("office sprites are 16×16 and use palette colours", () => {
  for (const name of ["cab1", "cab2", "cab3", "cab4", "cab5", "deskPC", "bossDeskL", "bossDeskR", "ledger", "inbox", "coffee", "plant", "boardL", "boardR", "officeWindow"]) {
    const rows = A.SPRITES[name];
    assert.equal(rows.length, 16, name);
    rows.forEach((r, i) => {
      assert.equal(r.length, 16, `${name} row ${i}`);
      for (const ch of r) assert.ok(ch === "." || A.PALETTE[ch], `${name} row ${i}: ${ch}`);
    });
  }
  for (const o of ["giulia", "marco", "baker", "consultant", "hotelier", "coder"]) assert.ok(A.OUTFITS[o], o);
});

test("the office is rectangular and every desk, cabinet and person can be reached", () => {
  const m = W.MAPS.office;
  assert.ok(m.rows.every(r => r.length === m.rows[0].length));
  const s = O.newCareer();
  assert.ok(L.walkable(s, "office", s.x, s.y), "the start tile is free");
  const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  const reachable = (tx, ty) => DIRS.some(([dx, dy]) => {
    const x = tx + dx, y = ty + dy;
    return (x === s.x && y === s.y) || (L.walkable(s, "office", x, y) && L.path(s, "office", s.x, s.y, x, y));
  });
  for (let y = 0; y < m.rows.length; y++) for (let x = 0; x < m.rows[0].length; x++) {
    const t = m.rows[y][x];
    if ("12345dLiq".includes(t)) assert.ok(reachable(x, y), `${t} at ${x},${y}`);
  }
  for (const id of ["giulia", "marco"]) {
    const n = W.NPCS.find(n => n.id === id);
    assert.ok(reachable(n.x, n.y), id);
  }
  assert.ok(L.path(s, "office", s.x, s.y, 4, 8), "the door mat");
});

test("the visiting client only shows up (and only blocks the way) when there is inbox work", () => {
  const s = O.newCareer();
  assert.equal(L.npcAt(s, "office", 7, 7), null);
  s.queue = [{ pickup: "inbox", client: "forno" }];
  assert.equal(L.npcAt(s, "office", 7, 7).id, "client");
});

test("amounts are read the Italian or the English way", () => {
  const n = UI.num;
  assert.equal(n("1.500"), 1500);
  assert.equal(n("1,500"), 1500);
  assert.equal(n("€ 12.5"), 12.5);
  assert.equal(n("2,5"), 2.5);
  assert.equal(n("-4,500"), -4500);
  assert.equal(n("1,234.50"), 1234.5);
  assert.equal(n("0,1964", true), 0.1964);
  assert.equal(n("0.196", true), 0.196);
  assert.equal(n(""), null);
  assert.equal(n("abc"), null);
});

test("two years of perfect work: every job grades, the books balance and the report is clean", () => {
  const r = L.rng(42);
  const s = O.newCareer();
  for (let year = 1; year <= 2; year++) {
    for (let day = 1; day <= 12; day++) {
      s.day = day;
      const { jobs } = O.planDay(s, r);
      assert.equal(jobs.filter(j => j.type !== "posting").length, D.JOBS_PER_DAY);
      const close = day % D.DAYS_PER_QUARTER === 0;
      for (const job of jobs) {
        assert.ok(["inbox", "phone", "marco", "giulia"].includes(job.pickup), job.type);
        assert.ok(["cabinet", "desk", "phone", "marco", "books"].includes(job.work), job.type);
        assert.ok(O.grade(job, correct(job)).ok, `${job.type} grades its own answer`);
        O.reward(s, job, true);
        if (job.type === "posting") {
          assert.equal(O.imbalance(job.lines), 0, job.title);
          O.post(s, job.title, job.lines);
        }
      }
      if (close) {
        for (const job of O.quarterClose(s)) {
          assert.equal(O.imbalance(job.lines), 0, job.title);
          O.post(s, job.title, job.lines);
        }
        O.clientQuarter(s);
      }
      assert.ok(O.trialOK(s), `books balance on day ${day} of year ${year}`);
    }
    const rep = O.annualReport(s);
    assert.ok(Math.abs(rep.totalAssets - rep.totalEL) < 0.5, "assets = equity + liabilities");
    const values = Object.fromEntries(rep.sections.flatMap(x => x.lines).map(l => [l.key, l.answer]));
    assert.ok(O.gradeReport(rep, values).clean);
    const profit = O.closeYear(s);
    assert.equal(profit, rep.profit);
    const b = O.balances(s);
    for (const a of D.ACCOUNTS.filter(a => a.type === "R" || a.type === "X")) assert.equal(b[a.id], 0, `${a.id} closed`);
    const meeting = O.agm(s, profit);
    if (meeting) { assert.equal(O.imbalance(meeting.lines), 0); O.post(s, meeting.title, meeting.lines); }
    assert.ok(O.trialOK(s));
    s.year++;
  }
  assert.ok(s.xp > D.RANKS[1].xp, "a good player earns enough for the junior interview");
});

test("promotion interviews: optional, at the next level, with a wait after a failure", () => {
  const r = L.rng(7);
  const s = O.newCareer();
  assert.equal(O.interviewStatus(s).state, "needXp");
  s.xp = 150;
  assert.equal(O.interviewStatus(s).state, "ready");
  assert.equal(s.rank, "intern", "never promoted automatically");
  const jobs = O.planInterview(s, r);
  assert.equal(jobs.length, O.INTERVIEW.questions);
  jobs.forEach(j => assert.ok(O.grade(j, correct(j)).ok, j.type));
  assert.equal(O.finishInterview(s, O.INTERVIEW.pass - 1), false);
  assert.equal(O.interviewStatus(s).state, "wait");
  s.day += O.INTERVIEW.waitDays;
  assert.equal(O.interviewStatus(s).state, "ready");
  assert.equal(O.finishInterview(s, O.INTERVIEW.pass), true);
  assert.equal(s.rank, "junior");
  s.xp = 10000;
  assert.equal(O.interviewStatus(s).state, "soon", "later ranks are announced but closed");
});

test("saved careers are repaired", () => {
  const fixed = O.normalizeCareer({ mode: "career", rank: "wizard", ledger: "x", sat: null, stats: { jobs: 3 } });
  assert.equal(fixed.rank, "intern");
  assert.deepEqual(Array.from(fixed.ledger), []);
  assert.equal(fixed.stats.jobs, 3);
  assert.equal(fixed.stats.steps, 0);
  assert.equal(O.normalizeCareer({ mode: "adventure" }).mode, "career");
});
