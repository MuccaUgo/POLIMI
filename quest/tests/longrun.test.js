// Ten years of a career, played the way the office screens play it (start of the day, jobs, quarter closes,
// the annual report, the shareholders' meeting, payday, interviews) by players of different skill, with
// page reloads at random moments. Every day the books must balance and nothing may be booked twice.
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
const ST = load("office-study.js");
load("office-exam.js");
load("office-planning.js");

function correct(job) {
  if (job.type === "sort") return job.answer;
  if (job.type === "quick" || job.type === "mcq") return job.options.find(o => o.correct);
  if (job.type === "spot") return { line: job.wrongAt, fix: job.answer };
  if (job.type === "build") return { placed: job.items.map(i => i.element), profit: job.profit };
  if (job.type === "order") return { years: job.items.map(i => i.year) };
  if (job.type === "fill") return { values: Object.fromEntries(job.fields.map(f => [f.key, f.answer])), choice: job.choice && job.choice.answer };
  if (job.type === "posting") return { lines: job.lines };
  if (job.type === "reclass") return { placed: job.items.map(i => i.cat), values: Object.fromEntries((job.fields || []).map(f => [f.key, f.answer])) };
  throw new Error(job.type);
}

function career({ seed, years, skill, reloads }) {
  const r = L.rng(seed), rnd = () => r.next();
  let s = O.normalizeCareer(O.newCareer());
  const problems = [], years_ = [];
  const fail = m => { if (problems.length < 10) problems.push(`year ${s.year} day ${s.day} (${s.phase}): ${m}`); };
  const plan = jobs => {
    s.queue = jobs || O.planDay(s, r).jobs;
    const dj = O.dividendJob(s);
    if (dj && !s.queue.some(j => j.id === dj.id)) s.queue.push(dj);
    s.planned = O.dayKey(s);
  };
  const startDay = () => {
    const a = rnd();
    if (s.stats.days > 0 && a < 0.08) { s.activity = "books"; const ev = O.firmEvent(s); return plan(ev ? [ev] : []); } // a mock-exam morning
    s.activity = a < 0.55 ? "books" : a < 0.78 ? "cons" : "fa";
    plan();
  };
  const finish = job => {
    if (!O.markDone(s, job.id)) return fail("a finished job came back");
    if (!O.grade(job, correct(job)).ok) fail(`a ${job.type} job rejects its own right answer`);
    const ok = rnd() < skill;
    O.reward(s, job, ok);
    ST.recordStudy(s, job, ok);
    if (job.type === "posting") O.post(s, job.title, job.lines, "", job.agm ? { year: s.year + 1, q: 1, day: 1 } : null, job.id);
    O.receiveDividend(s, job);
    s.queue = s.queue.filter(j => j.id !== job.id);
    O.advance(s);
  };
  const report = () => {
    const rep = O.annualReport(s), v = Object.fromEntries(rep.sections.flatMap(x => x.lines).map(l => [l.key, l.answer]));
    const near = (a, b) => Math.abs(a - b) < 0.6;
    if (!near(v.totalAssets, v.totalEL)) fail("the balance sheet doesn't balance");
    if (!near(v.cfo + v.cfi + v.cff, v.dcash)) fail("cash flows don't explain the change in cash");
    if (!near(v.eqOpen + v.eqIssue + v.eqProfit + v.eqDiv, v.eqClose) || !near(v.eqClose, v.totalEquity)) fail("the changes in equity don't close");
    if (Math.abs(v.eps - v.profit / v.shares) > 0.00006) fail(`EPS ${v.eps} is not profit ÷ shares`);
    if (!O.gradeReport(rep, v).clean) fail("the report's own figures don't pass");
    O.reward(s, { type: "report", tier: O.tierOf(s) }, true);
    const profit = O.closeYear(s), meeting = O.agm(s, profit);
    years_.push({ profit, cash: v.cash });
    s.queue = meeting ? [meeting] : []; s.phase = "agm";
    if (!meeting) O.advance(s);
  };
  const endOfDay = () => {
    if (!O.trialOK(s)) fail("trial balance off");
    const refs = s.ledger.filter(e => e.ref).map(e => e.ref);
    if (new Set(refs).size !== refs.length) fail("an entry was booked twice");
    if (Object.values(O.balances(s)).some(v => !Number.isFinite(v)) || !Number.isFinite(s.money)) fail("a figure is not a number");
    if (O.interviewStatus(s).state === "ready") {
      const jobs = O.planInterview(s, r), before = s.ledger.length, shares = s.shares;
      jobs.forEach(j => { if (!O.grade(j, correct(j)).ok) fail("an interview question rejects its right answer"); });
      if (O.finishInterview(s, jobs.filter(() => rnd() < skill).length)) {
        if (s.shares - shares !== O.SHARE_GRANT[s.rank]) fail("wrong share grant");
        if (s.ledger.length !== before) fail("a share grant touched the books");
      }
    }
    s.money += O.rankFor(s).salary + (s.bonus || 0); s.bonus = 0; // payday
    s.stats.days++; s.day++;
    if (s.day > 12) { s.day = 1; s.year++; }
    s.phase = "work"; s.queue = [];
  };
  s.phase = "work"; plan();
  for (let guard = 0; s.year <= years; guard++) {
    if (guard > 50000) { fail("the career never ends"); break; }
    if (rnd() < reloads) s = O.normalizeCareer(JSON.parse(JSON.stringify(s))); // a reload, then what resume() does
    if (!s.queue.length) {
      if (s.phase === "work") { if (s.planned === O.dayKey(s)) O.advance(s); else { startDay(); continue; } }
      else if (s.phase === "close" || s.phase === "agm") O.advance(s);
    }
    if (s.queue.length) finish(s.queue[0]);
    else if (s.phase === "report") report();
    else if (s.phase === "home") endOfDay();
    else { fail("stuck: nothing to do and no way on"); break; }
  }
  return { s, problems, years: years_ };
}

for (const skill of [0.5, 0.85, 0.99]) {
  test(`ten years for a player who gets ${skill * 100}% right, with frequent reloads: books, reports and saves hold up`, () => {
    for (const seed of [1, 2]) {
      const { s, problems, years } = career({ seed, years: 10, skill, reloads: 0.3 });
      assert.deepEqual(problems, [], `seed ${seed}`);
      assert.equal(years.length, 10, "ten annual reports");
      assert.ok(JSON.stringify(s).length < 150 * 1024, "the save stays small");
      assert.ok(s.recent.length <= 150 && s.done.length <= 80, "the memories stay bounded");
      assert.equal(new Set(s.divPaid).size, s.divPaid.length, "each dividend paid once");
      // A good player keeps the firm solvent. (A weaker player can drive the cash below zero over the years: a known
      // issue of the game's economy, still to be decided.)
      if (skill >= 0.85) assert.ok(years.every(y => y.cash >= 0), `seed ${seed}: cash below zero`);
    }
  });
}
