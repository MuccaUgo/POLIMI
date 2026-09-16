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

test("bank has complete, unique questions and explanations in every area", () => {
  assert.ok(bank.length >= 85);
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
  assert.ok(context.cards.length >= 88);
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

test("the two decks are declared as topics that partition the areas", () => {
  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
    ";this.json = JSON.stringify({ topics: TOPICS, categories: CATEGORIES });", data);
  const { topics, categories } = JSON.parse(data.json);

  assert.deepEqual(topics.map(t => t.name), ["Introduction", "The Concept of Strategy"]);
  const flat = topics.flatMap(t => t.categories);
  assert.deepEqual(flat, categories, "CATEGORIES must be the topics' areas, in order");
  assert.equal(new Set(flat).size, flat.length, "an area may not appear under two topics");

  // Each deck has to stand on its own as a study unit.
  for (const topic of topics) {
    const qs = bank.filter(q => topic.categories.includes(q.cat));
    const cs = context.cards.filter(c => topic.categories.includes(c.cat));
    assert.ok(qs.length >= 31, `${topic.name}: only ${qs.length} questions`);
    assert.ok(cs.length >= 39, `${topic.name}: only ${cs.length} concept cards`);
  }
});

test("chapter 1 covers each of its five areas", () => {
  const areas = ["What Strategy Is", "Levels of Strategy", "Strategy Process",
                 "Intended & Emergent", "Vision, Mission & Purpose"];
  for (const area of areas) {
    assert.ok(bank.filter(q => q.cat === area).length >= 8, `${area}: too few questions`);
    assert.ok(context.cards.filter(c => c.cat === area).length >= 6, `${area}: too few cards`);
  }
});

test("the Mintzberg chain and the Starbucks figures are stated as published", () => {
  const chain = context.cards.find(c => c.title === "Intended, Deliberate, Unrealized, Realized");
  assert.ok(chain, "missing the Mintzberg card");
  for (const term of ["unrealized", "deliberate", "emergent", "realized"]) {
    assert.match(chain.how.toLowerCase(), new RegExp(term), `${term} missing from the chain`);
  }
  const case_ = context.cards.find(c => c.title === "The Frappuccino Case");
  assert.ok(case_, "missing the Starbucks card");
  // 7 to 1 vote, then 40 / 50 / 70 drinks a day over three weeks, then >20% of revenues.
  for (const figure of ["7 to 1", "40 drinks", "50 in the second", "70 in the third", "20 percent"]) {
    assert.ok(case_.how.includes(figure) || case_.trap.includes(figure), `${figure} missing`);
  }
});

test("the lecture deep dives are attached to cards and name their source", () => {
  const lectures = new Set([
    "Strategy and its origins",
    "Strategic decisions and Tactical decisions",
    "Strategy: an operational definition"
  ]);
  const deep = context.cards.filter(c => c.deep);
  assert.ok(deep.length >= 10, `only ${deep.length} cards carry a deep dive`);

  for (const c of deep) {
    assert.equal(typeof c.deep.text, "string", `${c.title}: deep.text`);
    assert.ok(c.deep.text.trim().length > 80, `${c.title}: deep dive too short`);
    assert.ok(lectures.has(c.deep.source), `${c.title}: unknown source ${c.deep.source}`);
  }
  // Every lecture has to be reachable from at least one card, or it is not linked to the slides.
  for (const lecture of lectures) {
    assert.ok(deep.some(c => c.deep.source === lecture), `${lecture}: not linked to any card`);
  }
});

test("the cards the slides do not carry are present with their lecture detail", () => {
  const added = [
    "Sun Tzu's Decisive Factors",
    "From Battlefield to Competitive Arena",
    "Tactics",
    "Between Politics and Tactics",
    "Why Business Strategy Is Not War",
    "Strategy Is Made of Strategic Decisions"
  ];
  for (const title of added) {
    const card = context.cards.find(c => c.title === title);
    assert.ok(card, `missing card: ${title}`);
    assert.equal(card.cat, "What Strategy Is", `${title}: wrong area`);
    assert.ok(card.deep, `${title}: should carry its lecture source`);
  }
  // Sun Tzu's list is quoted, so guard a few of the ten factors verbatim.
  const sunTzu = context.cards.find(c => c.title === "Sun Tzu's Decisive Factors");
  for (const factor of ["Invincibility lies in the defense", "Know the enemy and yourself",
                        "Be flexible", "Separate the enemy from his allies"]) {
    assert.ok(sunTzu.how.includes(factor), `missing factor: ${factor}`);
  }
});

test("the deep dives are searchable", () => {
  // conceptSearchText in app.js folds deep.text and deep.source into the search string.
  const app = fs.readFileSync(path.join(__dirname, "../app.js"), "utf8");
  assert.match(app, /c\.deep \? c\.deep\.text \+ " " \+ c\.deep\.source/,
    "concept search must include the deep-dive text");
});
