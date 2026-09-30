const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
global.window = globalThis;
const C = require(path.join(__dirname, "..", "office-codex.js"));

test("the codex: every entry has a topic, a term and a definition, and no term appears twice", () => {
  assert.ok(C.CODEX.length >= 50);
  for (const e of C.CODEX) { assert.equal(e.length, 3); e.forEach(x => assert.ok(typeof x === "string" && x.length > 1, e[1])); }
  const terms = C.CODEX.map(e => e[1].toLowerCase());
  assert.equal(new Set(terms).size, terms.length);
  assert.ok(C.TOPICS.length >= 6);
});

test("the codex covers the course's key terms and finds them by search", () => {
  for (const q of ["common size", "factoring", "IFRS 16", "NOWC", "NFP", "goodwill", "equity method", "EBITDA", "DSO", "cut-off", "depreciation", "impairment", "leverage"])
    assert.ok(C.search(q).length >= 1, q);
  assert.equal(C.search("").length, C.CODEX.length);
  assert.equal(C.search("zzzz-nothing").length, 0);
  assert.ok(C.search("FACTORING").some(e => e[1] === "Factoring"), "the search ignores case");
});
