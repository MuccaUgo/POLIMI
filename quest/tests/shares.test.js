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

// Plays a year of the firm's books (memos and quarter closes) and the shareholders' meeting.
function playYear(s, r) {
  for (let day = 1; day <= 12; day++) {
    s.day = day;
    for (const j of O.planDay(s, r).jobs) { O.reward(s, j, true); if (j.type === "posting") O.post(s, j.title, j.lines, "", null, j.id); }
    if (day % 3 === 0) O.quarterClose(s).forEach(j => O.post(s, j.title, j.lines, "", null, j.id));
  }
  const p = O.closeYear(s), m = O.agm(s, p);
  if (m) O.post(s, m.title, m.lines, "", { year: s.year + 1, q: 1, day: 1 }, m.id);
  return m;
}

test("each promotion brings more shares than the one before, and the company's books don't move", () => {
  const order = D.RANKS.map(r => O.SHARE_GRANT[r.id] || 0).slice(1);
  order.forEach((n, i) => { assert.ok(n > 0); if (i) assert.ok(n > order[i - 1]); });
  const s = O.newCareer(), r = L.rng(3);
  playYear(s, r);
  const ledger = JSON.stringify(s.ledger), report = JSON.stringify(O.annualReport(s));
  s.xp = 200;
  assert.equal(O.finishInterview(s, O.INTERVIEW.pass), true);
  assert.equal(s.rank, "junior");
  assert.equal(s.shares, O.SHARE_GRANT.junior);
  assert.equal(O.finishInterview(s, 0), false, "a failed interview gives nothing");
  assert.equal(s.shares, O.SHARE_GRANT.junior);
  assert.equal(JSON.stringify(s.ledger), ledger, "no entry in PolimiAFC's books");
  assert.equal(JSON.stringify(O.annualReport(s)), report, "same report, same EPS");
});

test("no shares before the first promotion, none for ranks already reached", () => {
  const s = O.normalizeCareer({ mode: "career", rank: "analyst", ledger: [], queue: [] });
  assert.equal(s.shares, 0, "an old save keeps its rank and starts with no shares");
  assert.equal(O.myStake(s).shares, 0);
});

test("on dividend day a shareholder works out their part and receives it once", () => {
  const s = O.newCareer(), r = L.rng(5);
  s.rank = "junior"; s.shares = 200;
  const m = playYear(s, r);
  assert.ok(m && m.memo.includes("Your 200 shares will receive €10"), m && m.memo);
  s.year = 2; s.day = 2;
  const j = O.dividendJob(s);
  assert.ok(j, "a dividend job on the payment day");
  assert.equal(j.dividend.amount, 10);
  assert.deepEqual(j.fields.map(f => f.answer), [10, 0.17]);
  const answer = { values: Object.fromEntries(j.fields.map(f => [f.key, f.answer])), choice: j.choice.answer };
  assert.ok(O.grade(j, answer).ok);
  const money = s.money;
  assert.equal(O.receiveDividend(s, j), 10);
  assert.equal(O.receiveDividend(s, j), 0, "paid once");
  assert.equal(s.money, money + 10);
  assert.equal(s.dividends, 10);
  O.markDone(s, j.id);
  assert.equal(O.dividendJob(s), null, "not handed out again after it's done");
  const k = O.myStake(s);
  assert.equal(k.outstanding, 120000);
  assert.ok(Math.abs(k.pct - 200 / 120000 * 100) < 1e-9);
  assert.ok(k.bvps > 1);
});

test("no dividend job without shares, outside the payment day, or in a year with no dividend", () => {
  const s = O.newCareer(), r = L.rng(5);
  playYear(s, r);
  s.year = 2; s.day = 2;
  assert.equal(O.dividendJob(s), null, "no shares");
  s.shares = 200; s.day = 3;
  assert.equal(O.dividendJob(s), null, "not the payment day");
});
