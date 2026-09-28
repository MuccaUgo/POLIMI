const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
global.QuestWorld = load("world.js");
const L = load("logic.js");
load("office-data.js");
const O = load("office-logic.js");
const B = load("backup.js");

test("a career survives the trip through a file and through a code", () => {
  const c = O.newCareer();
  c.rank = "junior"; c.xp = 321; c.money = 1234.5; c.day = 7;
  c.ledger.push({ label: "Città di Milano — €", lines: [["cash", 100], ["shareCapital", 100]], year: 1, q: 1, day: 1 });
  const p = B.pack("career", c, new Date("2026-09-28T10:00:00Z"));
  assert.equal(B.fileName(p), "polimiafc-career-2026-09-28.json");
  for (const text of [B.toText(p), B.toCode(p)]) {
    const got = B.parse(text);
    assert.equal(got.kind, "career");
    assert.deepEqual(got.data, JSON.parse(JSON.stringify(c)));
    assert.equal(O.normalizeCareer(got.data).rank, "junior");
  }
});

test("pasted codes may carry spaces and line breaks", () => {
  const p = B.pack("quest", L.newGame());
  const code = B.toCode(p);
  const messy = "  " + code.slice(0, 20) + "\n" + code.slice(20, 50) + " " + code.slice(50) + "\n";
  assert.equal(B.parse(messy).kind, "quest");
});

test("wrong or damaged input is refused with a clear message", () => {
  assert.throws(() => B.parse(""), /Choose a file/);
  assert.throws(() => B.parse("hello"), /doesn't look like/);
  assert.throws(() => B.parse("PAFC1-%%%"), /doesn't look like/);
  assert.throws(() => B.parse(JSON.stringify({ app: "other", kind: "career", data: {} })), /doesn't look like/);
  assert.throws(() => B.parse(JSON.stringify({ app: "polimiafc", kind: "career", data: { mode: "x" } })), /damaged/);
  assert.throws(() => B.parse(JSON.stringify({ app: "polimiafc", kind: "quest", data: { map: 3 } })), /damaged/);
  assert.throws(() => B.pack("chess", {}), /Unknown/);
  const code = B.toCode(B.pack("career", O.newCareer()));
  assert.throws(() => B.parse(code.slice(0, code.length - 12)), /whole code/);
});
