const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const C = require(path.join(__dirname, "..", "calculator.js"));

test("the calculator does + − × ÷ with the usual precedence, brackets and %", () => {
  assert.equal(C.evaluate("9000÷6×3"), 4500);
  assert.equal(C.evaluate("2+3×4"), 14);
  assert.equal(C.evaluate("(2+3)×4"), 20);
  assert.equal(C.evaluate("30000×4%×6÷12"), 600);
  assert.equal(C.evaluate("100−−20"), 120);
  assert.equal(C.evaluate("−5+2"), -3);
  assert.equal(C.evaluate("12436÷16901−1").toFixed(4), "-0.2642");
  assert.equal(C.evaluate("(9000−4500"), 4500, "a bracket left open closes at the end");
  assert.equal(C.evaluate("1,5×2"), 3, "a decimal comma works too");
  assert.equal(C.evaluate("3*4/2-1"), 5, "ASCII operators work too");
});

test("impossible or unfinished expressions give no result instead of an error", () => {
  for (const e of ["", "5÷0", "5+", "×3", "2)(", "abc", "3..4"]) assert.equal(C.evaluate(e), null, e);
});

test("results go into the boxes in a form the game reads back exactly", () => {
  assert.equal(C.forInput(4500), "4500");
  assert.equal(C.forInput(21600 / 110000), "0.1964");
  assert.equal(C.forInput(0.125), "0.1250", "three decimals would be read as a thousands separator");
  assert.equal(C.forInput(-26.4245), "-26.4245");
  assert.equal(C.forInput(1 / 3), "0.3333");
  assert.equal(C.forInput(12.5), "12.5");
});
