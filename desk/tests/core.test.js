const assert = require("node:assert/strict");
const test = require("node:test");
const load = require("./load");

const C = load();
const TODAY = "2026-09-28";
const num = (ans, extra) => Object.assign({ t: "num", key: "x", ans, fmt: "eur" }, extra);

test("the keypad expression evaluator follows the usual precedence", () => {
  assert.equal(C.evaluate("84000÷7×3"), 36000);
  assert.equal(C.evaluate("(3+4)×2"), 14);
  assert.equal(C.evaluate("−5+2"), -3);
  assert.equal(C.evaluate("5×−3"), -15);
  assert.equal(C.evaluate("64000×5%"), 3200);
  assert.equal(C.evaluate("1,250"), 1250);
  assert.equal(C.evaluate("(120000−24000"), 96000, "an unclosed bracket is closed");
  assert.equal(C.evaluate(".5+1"), 1.5);
  for (const bad of ["", "3×", "4÷0", "()", "2..3", "abc", "3)"]) assert.ok(Number.isNaN(C.evaluate(bad)), bad);
});

test("formatting rounds half away from zero and never shows minus zero", () => {
  assert.equal(C.fmt(1.855, "eps"), "1.86");
  assert.equal(C.fmt(-1.855, "eps"), "−1.86");
  assert.equal(C.fmt(-0.004, "eps"), "0.00");
  assert.equal(C.fmt(1234567, "eur"), "1,234,567");
  assert.equal(C.fmt(2352.5, "eur"), "2,352.50");
  assert.equal(C.fmt(-76000, "eur"), "−76,000");
  assert.equal(C.fmt(22.580645, "pct"), "22.58%");
  assert.equal(C.fmt(7.5, "pct"), "7.5%");
  assert.equal(C.eur(-5000), "−€5,000");
  assert.equal(C.dt(28, 12, 2025), "28 Dec 2025");
  assert.equal(C.periodEnd(10, 2025, 12), "30 Sep 2026");
  assert.equal(C.periodEnd(2, 2024, 1), "29 Feb 2024");
});

test("lines are graded with tolerances by format, signs and percentages", () => {
  assert.ok(C.gradeCell(num(12000), { value: 12000 }).ok);
  assert.ok(C.gradeCell(num(2352.4), { value: 2352 }).ok, "rounding to the euro is fine");
  assert.ok(!C.gradeCell(num(2352), { value: 2353 }).ok);
  assert.ok(!C.gradeCell(num(3952, { tol: 0.01 }), { value: 3952.5 }).ok, "round-to-cents cases are strict");
  assert.ok(C.gradeCell(num(12000, { abs: true }), { value: -12000 }).ok, "expense lines take either sign");
  const flip = C.gradeCell(num(-90000), { value: 90000 });
  assert.ok(!flip.ok && flip.signFlip, "cash-flow lines need their sign");
  assert.ok(C.gradeCell(num(35, { fmt: "pct" }), { value: 0.35 }).ok, "0.35 means 35%");
  assert.ok(C.gradeCell(num(22.580645, { fmt: "pct" }), { value: 22.6 }).ok);
  assert.ok(!C.gradeCell(num(22.580645, { fmt: "pct" }), { value: 22.7 }).ok);
  const empty = C.gradeCell(num(0), null);
  assert.ok(!empty.ok && empty.empty, "a blank is not a zero");
  const choice = { t: "choice", key: "c", options: ["A", "B"], ans: "B" };
  assert.ok(C.gradeCell(choice, { value: "B" }).ok);
  assert.ok(!C.gradeCell(choice, { value: "A" }).ok);
});

test("audit opinions: clean for all right, qualified from 75%, hints score half", () => {
  const kase = { cells: [1, 2, 3, 4].map(i => num(i, { key: "k" + i })) };
  const right = Object.fromEntries(kase.cells.map(c => [c.key, { value: c.ans }]));
  assert.equal(C.audit(kase, right, {}).stars, 3);
  assert.equal(C.audit(kase, right, { k1: true }).stars, 2, "a hint prevents a clean opinion");
  assert.equal(C.audit(kase, Object.assign({}, right, { k1: { value: 9 } }), {}).stars, 2, "3/4 is qualified");
  const r = C.audit(kase, Object.assign({}, right, { k1: { value: 9 } }), { k2: true });
  assert.equal(r.score, 2.5 / 4);
  assert.equal(r.stars, 1);
  assert.equal(r.passed, false);
  assert.equal(r.opinion.short, "Adverse");
});

test("tie-out checks wait for every line and report the difference", () => {
  const check = { label: "x", terms: [[1, "a"], [1, 100], [-1, "b"]] };
  assert.equal(C.evalCheck(check, { a: { value: 50 } }).ready, false);
  assert.deepEqual(JSON.parse(JSON.stringify(C.evalCheck(check, { a: { value: 50 }, b: { value: 150 } }))), { ready: true, diff: 0, ok: true });
  assert.equal(C.evalCheck(check, { a: { value: 50 }, b: { value: 140 } }).diff, 10);
});

function passCase(progress, id, stars = 3, mode = { type: "level" }) {
  const kase = C.makeCase(id, 7);
  const n = kase.cells.length;
  const result = { stars, passed: stars >= 2, n, correct: stars === 3 ? n : Math.ceil(n * 0.8) };
  return C.record(progress, kase, result, mode, TODAY);
}

test("a level clears only after the target number of passes and every case type", () => {
  const p = C.emptyProgress();
  const basic = C.templates(1, 1);
  assert.equal(C.levelState(p, 1, 1).unlocked, true);
  assert.equal(C.levelState(p, 1, 2).unlocked, false);
  for (let i = 0; i < 10; i++) passCase(p, basic[0].id);
  let st = C.levelState(p, 1, 1);
  assert.equal(st.passed, 10);
  assert.equal(st.cleared, false, "one case type repeated ten times is not enough");
  let events = [];
  for (const t of basic.slice(1)) events = events.concat(passCase(p, t.id));
  st = C.levelState(p, 1, 1);
  assert.equal(st.cleared, true);
  assert.equal(C.levelState(p, 1, 2).unlocked, true);
  assert.deepEqual(Array.from(events, e => e.type), ["cleared", "unlocked", "promoted"]);
  assert.equal(C.rank(p).name, "Junior Accountant");
});

test("adverse opinions do not count; re-audits never count", () => {
  const p = C.emptyProgress();
  const id = C.templates(2, 1)[0].id;
  passCase(p, id, 1);
  assert.equal(C.levelState(p, 2, 1).passed, 0);
  assert.equal(C.levelState(p, 2, 1).played, 1);
  assert.equal(p.review.length, 1);
  passCase(p, id, 2, { type: "review" });
  assert.equal(C.levelState(p, 2, 1).passed, 0);
  assert.equal(p.review.length, 1, "a qualified re-audit stays on the list");
  passCase(p, id, 3, { type: "review" });
  assert.equal(p.review.length, 0, "a clean re-audit leaves the list");
  assert.equal(p.cases, 3);
});

test("the next case prefers types not yet met and avoids repeating the last one", () => {
  const p = C.emptyProgress();
  const tpls = C.templates(1, 1);
  const r = C.rng(1);
  tpls.slice(0, -1).forEach(t => passCase(p, t.id));
  for (let i = 0; i < 20; i++) assert.equal(C.nextTemplate(p, 1, 1, r, null).id, tpls[tpls.length - 1].id);
  passCase(p, tpls[tpls.length - 1].id);
  for (let i = 0; i < 20; i++) assert.notEqual(C.nextTemplate(p, 1, 1, r, tpls[0].id).id, tpls[0].id);
});

test("the PDF's own numbers come first, then fresh seeds", () => {
  const p = C.emptyProgress();
  const tpl = C.byId["fa1-credit-sale"];
  const r = C.rng(3);
  assert.equal(C.seedFor(p, tpl, r), 0);
  C.record(p, C.makeCase(tpl.id, 0), { stars: 1, passed: false, n: 5, correct: 0 }, { type: "level" }, TODAY);
  assert.notEqual(C.seedFor(p, tpl, r), 0);
  assert.notEqual(C.seedFor(p, C.byId["fa1-customer-advance"], r), 0, "new case types have no original");
});

test("the daily close is fixed for the day and drawn from unlocked levels", () => {
  const p = C.emptyProgress();
  const plan = C.dailyPlan(p, TODAY);
  assert.equal(plan.items.length, C.DAILY_SIZE);
  assert.ok(plan.items.every(i => C.byId[i.tpl].level === 1));
  assert.equal(new Set(plan.items.map(i => i.tpl)).size, C.DAILY_SIZE);
  assert.deepEqual(JSON.stringify(C.dailyPlan(C.emptyProgress(), TODAY)), JSON.stringify(plan));
  const kase = C.makeCase(plan.items[2].tpl, plan.items[2].seed);
  C.record(p, kase, { stars: 3, passed: true, n: kase.cells.length, correct: kase.cells.length }, { type: "daily", date: TODAY, idx: 2 }, TODAY);
  assert.equal(p.daily.items[2].stars, 3);
  assert.equal(C.levelState(p, kase.chapter, 1).passed, 1, "daily cases count towards their level");
});

test("the streak counts consecutive days, allowing today to be still open", () => {
  const p = C.emptyProgress();
  p.days = { "2026-09-25": 1, "2026-09-26": 2, "2026-09-27": 1 };
  assert.equal(C.streak(p, TODAY), 3);
  p.days[TODAY] = 1;
  assert.equal(C.streak(p, TODAY), 4);
  assert.equal(C.streak(p, "2026-10-05"), 0);
  assert.equal(C.shiftDay("2026-03-01", -1), "2026-02-28");
});

test("saved progress from older or damaged storage is normalised", () => {
  const p = C.normalize({ cases: 4, review: "oops", cells: { total: 3 } });
  assert.equal(p.cases, 4);
  assert.ok(Array.isArray(p.review));
  assert.equal(p.cells.correct, 0);
  assert.equal(C.normalize(null).cases, 0);
});
