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

test("'which statements?' jobs: well formed, and their answers follow the rules of each statement", () => {
  for (const [tier, text, bs, is, cfs, sce] of A.IMPACTS) {
    assert.ok([1, 2].includes(tier), text);
    assert.equal(bs, 1, `${text}: every transaction here changes the balance sheet`);
    assert.ok(cfs === null || ["Operating", "Investing", "Financing"].includes(cfs), text);
    if (sce) assert.equal(is, 0, `${text}: owners' transactions don't go through the income statement`);
  }
  const r = L.rng(8);
  for (let i = 0; i < 200; i++) {
    const j = A.statements(2, ["forno"], r);
    assert.equal(j.items.length, 4);
    const answer = { placed: j.items.map(it => it.cat), values: {} };
    assert.ok(O.grade(j, answer).ok);
    j.items.forEach(it => assert.ok(it.cats.includes(it.cat)));
  }
});

test("the firm's annual report: the cash flow statement explains the change in cash, and changes in equity close to the balance sheet", () => {
  const r = L.rng(21);
  const s = O.newCareer();
  const lines = rep => Object.fromEntries(rep.sections.flatMap(x => x.lines).map(l => [l.key, l.answer]));
  for (let year = 1; year <= 2; year++) {
    s.year = year;
    for (let day = 1; day <= 12; day++) {
      s.day = day;
      for (const job of O.planDay(s, r).jobs) {
        O.reward(s, job, true);
        if (job.type === "posting") O.post(s, job.title, job.lines);
      }
      if (day % 3 === 0) O.quarterClose(s).forEach(j => O.post(s, j.title, j.lines));
    }
    const rep = O.annualReport(s), v = lines(rep);
    assert.ok(Math.abs(v.cfo + v.cfi + v.cff - v.dcash) < 0.01, "operating + investing + financing = change in cash");
    const cashStart = O.balances(s, e => e.year < year).cash;
    assert.ok(Math.abs(v.cash - cashStart - v.dcash) < 0.01);
    assert.ok(Math.abs(v.eqOpen + v.eqIssue + v.eqProfit + v.eqDiv - v.eqClose) < 0.01, "opening + issues + profit − dividends = closing");
    assert.equal(v.eqClose, v.totalEquity);
    if (year === 1) { assert.equal(v.eqOpen, 0); assert.equal(v.eqIssue, 160000); assert.ok(v.cfi < 0); }
    if (year === 2) { assert.equal(v.eqIssue, 0); assert.ok(v.eqDiv < 0, "last year's dividend is declared at this year's meeting"); }
    const profit = O.closeYear(s);
    const meeting = O.agm(s, profit);
    assert.ok(meeting && meeting.agm);
    O.post(s, meeting.title, meeting.lines, "", { year: year + 1, q: 1, day: 1 });
    assert.ok(O.trialOK(s));
  }
  assert.equal(O.cfCategory("A bank loan"), "financing");
  assert.equal(O.cfCategory("Paying the laptop supplier"), "investing");
  assert.equal(O.cfCategory("Quarterly rent"), "operating");
});
