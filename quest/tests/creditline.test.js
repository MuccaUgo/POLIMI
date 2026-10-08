// The credit line with Banca Brera: Giulia draws on it at a quarter close when cash would run low, pays interest
// only on what is used, and pays it back once cash is plentiful again.
const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
global.QuestWorld = load("world.js");
load("logic.js");
load("office-data.js");
const O = load("office-logic.js");

const lean = () => {
  const s = O.newCareer();
  O.post(s, "PolimiAFC is born", [["cash", 10000], ["shareCapital", 10000]], "", { year: 1, q: 1, day: 1 }, "test:born");
  s.year = 2;
  return s;
};
const postAll = (s, jobs) => jobs.forEach(j => O.post(s, j.title, j.lines, "", null, j.id));
const cash = s => O.balances(s).cash;

test("cash that would run low: a draw comes first, once, whatever the reloads", () => {
  const s = lean();
  s.day = 3;
  const jobs = O.quarterClose(s);
  assert.deepEqual(jobs.map(j => j.id.split(":").pop()), ["lineDraw", "rentCash", "staff"]);
  assert.deepEqual(jobs[0].lines, [["cash", 30000], ["creditLine", 30000]], "€10,000 − €13,500 of bills → borrow enough to be back at about €25,000");
  assert.deepEqual(O.quarterClose(s), jobs, "working it out again gives the same close");
  O.post(s, jobs[0].title, jobs[0].lines, "", null, jobs[0].id);
  assert.deepEqual(O.quarterClose(s).map(j => j.id), jobs.slice(1).map(j => j.id), "no second draw after the first one is booked");
  for (const j of jobs.slice(1)) { O.post(s, j.title, j.lines, "", null, j.id); assert.ok(cash(s) >= 0, "never below zero while paying"); }
  assert.equal(cash(s), 26500);
  assert.equal(O.quarterClose(s).length, 0);
  s.closedQ = "2-1";
  assert.equal(O.quarterClose(s).length, 0, "a closed quarter adds nothing");
  assert.equal(O.cfCategory(jobs[0].title), "financing");
});

test("interest only on the part used; a repayment when cash is plentiful", () => {
  const s = lean();
  s.day = 3; postAll(s, O.quarterClose(s)); s.closedQ = "2-1";
  s.day = 6;
  const q2 = O.quarterClose(s);
  const interest = q2.find(j => j.title === "Interest on the credit line");
  assert.deepEqual(interest.lines, [["interest", 450], ["cash", -450]], "€30,000 used × 6% × 3/12, not the whole limit");
  assert.equal(O.cfCategory(interest.title), "operating");
  assert.deepEqual(q2[0].lines, [["cash", 15000], ["creditLine", 15000]], "still short: another draw");
  postAll(s, q2); s.closedQ = "2-2";
  const rep = O.annualReport(s), v = Object.fromEntries(rep.sections.flatMap(x => x.lines).map(l => [l.key, l.answer]));
  assert.equal(v.liabilities, 45000, "the credit line used is a liability");
  assert.equal(v.totalAssets, v.totalEL);
  s.jobsOk["2-2"] = 60; // a great quarter: €90,000 comes in at the next close
  s.day = 9;
  const q3 = O.quarterClose(s);
  assert.equal(q3.find(j => j.title === "Interest on the credit line").lines[0][1], 675);
  const back = q3.find(j => j.title === "Repaying the credit line");
  assert.deepEqual(back.lines, [["creditLine", -45000], ["cash", -45000]]);
  assert.equal(O.cfCategory(back.title), "financing");
  assert.ok(!q3.some(j => j.title === "Drawing on the credit line"));
  postAll(s, q3);
  assert.equal(O.balances(s).creditLine, 0);
  assert.ok(O.trialOK(s));
});
