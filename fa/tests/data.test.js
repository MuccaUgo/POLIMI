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
  assert.ok(bank.length >= 83);
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
