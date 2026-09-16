"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const context = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
  ";this.bank = JSON.parse(JSON.stringify(QUESTIONS)); this.categories = CATEGORIES;", context);
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

test("expanded bank has complete, unique questions and explanations in all five areas", () => {
  assert.ok(bank.length >= 125);
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
    assert.ok(!titles.has(q.title.toLowerCase()), `Duplicate title: ${q.title}`);
    assert.ok(!prompts.has(q.question.toLowerCase()), `Duplicate prompt: ${q.title}`);
    titles.add(q.title.toLowerCase()); prompts.add(q.question.toLowerCase());
  }
  for (const category of context.categories) assert.ok(bank.filter(q => q.cat === category).length >= 8, category);
});

// Recompute results from scenario inputs, independently of the stored answer labels
// and explanation prose, so a changed key or numerical option cannot silently pass.
const cashCases = [
  ["Cash Collected from Credit Customers", [36000 + 240000 - 54000]],
  ["Cash Paid for Credit Purchases", [28000 + 180000 - 43000]],
  ["From Cost of Sales to Supplier Payments", [220000 + (65000 - 50000) + (30000 - 20000)]],
  ["Indirect Cash Flow with Mixed Adjustments", [120000 + 18000 - 15000 + 8000 - 6000]],
  ["Asset Sale Gain in the Cash Flow Statement", [90000 + 12000 - (30000 - 24000), 30000]],
  ["Asset Sale Loss in the Cash Flow Statement", [40000 + 9000 + (20000 - 14000), 14000]],
  ["Working Capital Releases and Uses of Cash", [80000 + 12000 - 20000 + 9000]],
  ["Building Operating Cash Flow by the Direct Method", [340000 - 190000 - 72000 - 18000]],
  ["Financing Cash Flow and Unpaid Dividends", [100000 + 80000 - 35000 - 12000]],
  ["Reconciling Opening and Closing Cash", [42000 + 95000 - 110000 + 30000 + 3000]],
  ["Insurance Paid Across Two Accounting Years", [9600 / 12 * 3, 9600 / 12 * 9]],
  ["Two Cash Transactions and the Accounting Equation", [120000 + 20000 - 12000, 45000 + 20000 - 12000, 75000]]
];
for (const [title, expected] of cashCases) {
  test(`answer-key arithmetic: ${title}`, () => assert.deepEqual(selectedNumbers(title), expected));
}

const statementCases = [
  ["Sales Returns and Gross Profit", [(250000 - 20000) - (150000 - 12000)]],
  ["From Gross Profit to Operating Profit", [600000 - 360000 - 50000 - 90000 + 10000]],
  ["Recovering an Unreported Operating Cost", [500000 - (72000 / 0.75 + 24000)]],
  ["Gross Margin Is a Percentage of Revenue", [(400000 - 280000) / 400000 * 100, Math.round((400000 - 280000) / 280000 * 10000) / 100]],
  ["Correcting Omitted Depreciation", [(90000 - 10000) * 0.8]],
  ["Reconstructing Closing Raw Materials", [45000 + 180000 - 8000 - 190000]],
  ["Finished Goods and Cost of Sales", [70000 + 330000 - 100000, 480000 - (70000 + 330000 - 100000)]],
  ["A Price Increase and After-Tax Profit", [(10000 * (54 - 50) - 12000) * 0.75]],
  ["Combining Continuing and Discontinued Results", [84000 - 9000 + 15000]],
  ["Avoiding Double-Counted Depreciation", [900000 - 540000 - 110000 - 100000]],
  ["Useful-Life Estimates and Profit Comparisons", [60000 / 4 - 60000 / 6, 3, 60000 / 4, 60000 / 6]],
  ["Combining Segment Gross Margins", [(90000 + 50000) / (300000 + 100000) * 100]],
  ["Reconciling Segment and Group Revenue", [700000 + 500000 - 120000]],
  ["Reconciling a Segment Profit Measure", [70000 + 50000 - 18000 - 12000 - 10000]]
];
for (const [title, expected] of statementCases) {
  test(`answer-key arithmetic: ${title}`, () => assert.deepEqual(selectedNumbers(title), expected));
}

const balanceCases = [
  ["Residual Value and Carrying Amount", [10000, 32000]],
  ["Depreciation Starts When Ready", [4500]],
  ["Two Significant Components", [30000]],
  ["Recoverable Amount and Impairment", [17000, 123000]],
  ["Patent: Economic Life vs Legal Term", [25000, 125000]],
  ["Inventory Write-down by Product", [15000, 1000]],
  ["Periodic Weighted-Average Inventory", [1920, 2880]],
  ["Recording a New Share Issue", [72000, 18000, 54000]],
  ["Retained Earnings Reconciliation", [110000]],
  ["Receivable Allowance Adjustment", [115200, 3300]],
  ["Warranty Provision from Expected Claims", [24000]]
];
for (const [title, expected] of balanceCases) {
  test(`answer-key arithmetic: ${title}`, () => assert.deepEqual(selectedNumbers(title), expected));
}

test("superseded-standard notes are present and never contradict the annexure answers", () => {
  const concepts = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
    ";this.cards = JSON.parse(JSON.stringify(CONCEPTS));", concepts);

  const annotatedCards = [
    "Accrual Principle",
    "Impairment Test",
    "Goodwill",
    "Financial Assets: the Four Categories",
    "FVTPL — Fair Value Through Profit or Loss",
    "Available-for-Sale Financial Assets",
    "Held-to-Maturity Investments",
    "Loans and Receivables"
  ];
  for (const title of annotatedCards) {
    const card = concepts.cards.find(c => c.title === title);
    assert.ok(card, `Missing concept card: ${title}`);
    assert.equal(typeof card.today, "string", `${title}: missing today note`);
    assert.ok(card.today.trim().length > 40, `${title}: today note too short`);
  }

  const annotatedQuestions = {
    "Costs That Cannot Be Matched to Revenues": "B",
    "Purpose of the Impairment Test": "A",
    "Goodwill and the Annual Impairment Test": "B",
    "Where Fair Value Variations Land": "C",
    "Held-to-Maturity Measurement": "A",
    "Valuing Trade Receivables": "B"
  };
  for (const [title, correct] of Object.entries(annotatedQuestions)) {
    const q = question(title);
    assert.equal(typeof q.today, "string", `${title}: missing today note`);
    assert.ok(q.today.trim().length > 40, `${title}: today note too short`);
    // the note is context only: the answer key stays the one taught by the course annexure
    assert.equal(q.correct, correct, `${title}: answer key changed`);
    assert.equal(q.recap, q.expl[q.correct], `${title}: recap no longer matches the correct explanation`);
  }
});

// Cost Accounting: recompute every numeric answer from the scenario inputs.
const costCases = [
  ["Computing the Allocation Coefficient", [(90000 + 50000) / (10000 * 30 + 20000 * 20)]],
  ["Overhead Absorbed per Unit", [
    30 * (90000 + 50000) / (10000 * 30 + 20000 * 20),
    20 * (90000 + 50000) / (10000 * 30 + 20000 * 20)
  ]],
  ["Equivalent Units and Unit Cost", [800 + 400 * 0.5, 25000 / (800 + 400 * 0.5)]],
  ["Valuing the Closing Work in Progress", [
    25000 / (800 + 400 * 0.5) * 0.5,
    400 * (25000 / (800 + 400 * 0.5)) * 0.5
  ]],
  ["Activity Costs in the Textile Case", [
    90000 / 750000 * 700000,
    90000 / 750000 * 50000
  ]],
  ["Unit Cost of Ties under ABC", [
    90000 / 750000 * 300000 + (90000 / 750000 * 50000) / 2,
    (90000 / 750000 * 300000 + (90000 / 750000 * 50000) / 2) / 10000
  ]],
];
for (const [title, expected] of costCases) {
  test(`answer-key arithmetic: ${title}`, () => assert.deepEqual(selectedNumbers(title), expected));
}

// This one's answer is qualitative, so the figures to guard sit in the prompt instead.
test("prompt arithmetic: What ABC Changes for Scarves", () => {
  const prompt = question("What ABC Changes for Scarves").question;
  const proportional = 20 * (90000 + 50000) / (10000 * 30 + 20000 * 20);
  const abc = (90000 / 750000 * 400000 + (90000 / 750000 * 50000) / 2) / 20000;
  assert.match(prompt, new RegExp(`\\u20ac${proportional.toFixed(2)}\\b`), "proportional figure");
  assert.match(prompt, new RegExp(`\\u20ac${abc.toFixed(2)}\\b`), "ABC figure");
});

test("every area belongs to exactly one topic, and the topics cover the bank", () => {
  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
    ";this.json = JSON.stringify({ topics: TOPICS, categories: CATEGORIES, " +
    "conceptCats: CONCEPTS.map(c => c.cat) });", data);
  const { topics, categories, conceptCats } = JSON.parse(data.json);

  assert.deepEqual(topics.map(t => t.name), ["Financial Accounting", "Cost Accounting"]);
  const flat = topics.flatMap(t => t.categories);
  assert.deepEqual(flat, categories, "CATEGORIES must be the topics' areas, in order");
  assert.equal(new Set(flat).size, flat.length, "an area may not appear under two topics");

  for (const cat of new Set([...conceptCats, ...bank.map(q => q.cat)])) {
    assert.ok(categories.includes(cat), `Unknown area: ${cat}`);
  }
  // Both topics must be usable on their own, for both study modes.
  for (const topic of topics) {
    const qs = bank.filter(q => topic.categories.includes(q.cat));
    const cs = conceptCats.filter(c => topic.categories.includes(c));
    assert.ok(qs.length >= 40, `${topic.name}: only ${qs.length} questions`);
    assert.ok(cs.length >= 39, `${topic.name}: only ${cs.length} concept cards`);
  }
});
