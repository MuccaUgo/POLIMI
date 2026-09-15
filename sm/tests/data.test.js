"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const context = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
  ";this.bank = JSON.parse(JSON.stringify(QUESTIONS)); this.cards = JSON.parse(JSON.stringify(CONCEPTS)); this.categories = CATEGORIES;", context);
const bank = JSON.parse(JSON.stringify(context.bank));

function question(title) {
  const matches = bank.filter(q => q.title === title);
  assert.equal(matches.length, 1, `Expected one question: ${title}`);
  return matches[0];
}
function selectedNumbers(title) {
  const q = question(title);
  return (q.options[q.correct].match(/\d[\d,]*(?:\.\d+)?/g) || []).map(n => Number(n.replaceAll(",", "")));
}

test("bank has complete, unique questions and explanations in all five areas", () => {
  assert.ok(bank.length >= 31);
  const titles = new Set(), prompts = new Set();
  for (const q of bank) {
    assert.ok(context.categories.includes(q.cat), q.title);
    for (const field of ["title", "question", "recap"]) {
      assert.equal(typeof q[field], "string", `${q.title}: ${field}`);
      assert.ok(q[field].trim().length > 0, `${q.title}: empty ${field}`);
    }
    assert.deepEqual(Object.keys(q.options).sort(), ["A", "B", "C", "D"]);
    assert.deepEqual(Object.keys(q.expl).sort(), ["A", "B", "C", "D"]);
    assert.ok(["A", "B", "C", "D"].includes(q.correct), q.title);
    const options = Object.values(q.options).map(o => o.trim().toLowerCase());
    assert.equal(new Set(options).size, 4, `${q.title}: duplicate options`);
    for (const letter of "ABCD") {
      assert.ok(q.options[letter].trim().length > 0, q.title);
      assert.ok(q.expl[letter].trim().length > 0, `${q.title}: missing explanation ${letter}`);
    }
    assert.equal(q.recap, q.expl[q.correct], `${q.title}: recap must match the correct explanation`);
    assert.ok(!titles.has(q.title.toLowerCase()), `Duplicate title: ${q.title}`);
    assert.ok(!prompts.has(q.question.toLowerCase()), `Duplicate prompt: ${q.title}`);
    titles.add(q.title.toLowerCase()); prompts.add(q.question.toLowerCase());
  }
  for (const category of context.categories) assert.ok(bank.filter(q => q.cat === category).length >= 2, category);
});

test("concept cards are complete and use declared areas", () => {
  assert.ok(context.cards.length >= 39);
  const seen = new Set();
  for (const c of context.cards) {
    assert.ok(context.categories.includes(c.cat), c.title);
    for (const field of ["title", "meaning", "how", "trap"]) {
      assert.equal(typeof c[field], "string", `${c.title}: ${field}`);
      assert.ok(c[field].trim().length > 0, `${c.title}: empty ${field}`);
    }
    assert.ok(!seen.has(c.title.toLowerCase()), `Duplicate card: ${c.title}`);
    seen.add(c.title.toLowerCase());
  }
});

// Recompute the dilution and valuation answers from the scenario inputs, so a
// changed answer key or option cannot pass silently.
const round2 = n => Math.round(n * 100) / 100;
const numericCases = [
  // €5m injected at €10m pre-money: post-money, and the investor's share of it
  ["Ownership after a Series A", [10 + 5, round2(5 / 15 * 100)]],
  // a 40% founder keeps the pre-money over post-money proportion
  ["Founder Dilution after a Round", [round2(40 * 10 / 15)]],
  // €15m at €45m pre-money: Series B share, and Series A's €15m of a €60m company
  ["A Second Financing Round", [round2(15 / 60 * 100), round2(15 / 60 * 100)]],
  // €160m at €240m pre-money: public share, then a 20% holder after dilution
  ["Dilution at the IPO", [round2(160 / 400 * 100), 20, round2(20 * 240 / 400)]],
  // SV = EV - debt + cash
  ["From Enterprise Value to Shareholder Value", [850 - 300 + 70]]
];
for (const [title, expected] of numericCases) {
  test(`answer-key arithmetic: ${title}`, () => assert.deepEqual(selectedNumbers(title), expected));
}
