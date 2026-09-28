const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const load = f => require(path.join(__dirname, "..", f));
global.window = globalThis;
const A = load("art.js");
load("office-art.js");
global.QuestWorld = load("world.js");
const L = load("logic.js");
load("office-data.js");
load("office-logic.js");
load("office-ui.js");
const W = global.QuestWorld;

test("every sprite is 16×16 and uses palette colours", () => {
  for (const [name, rows] of Object.entries(A.SPRITES)) {
    assert.equal(rows.length, 16, name);
    rows.forEach((r, i) => {
      assert.equal(r.length, 16, `${name} row ${i}`);
      for (const ch of r) assert.ok(ch === "." || A.PALETTE[ch], `${name} row ${i}: ${ch}`);
    });
  }
});

test("the seeded random numbers are reproducible and in range", () => {
  const a = L.rng(7), b = L.rng(7);
  for (let i = 0; i < 100; i++) {
    const x = a.int(3, 9);
    assert.equal(x, b.int(3, 9));
    assert.ok(x >= 3 && x <= 9);
  }
  assert.deepEqual(Array.from(L.rng(1).shuffle([1, 2, 3, 4]).sort()), [1, 2, 3, 4]);
});

test("only the office is left: paths go around desks and people", () => {
  assert.deepEqual(Object.keys(W.MAPS), ["office"]);
  const s = { mode: "career", queue: [] };
  assert.equal(L.walkable(s, "office", 0, 0), false, "walls block");
  assert.equal(L.walkable(s, "office", 8, 2), false, "Giulia blocks");
  const steps = L.path(s, "office", 4, 6, 7, 2);
  assert.ok(Array.isArray(steps) && steps.length >= 5);
  let x = 4, y = 6;
  const D = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  for (const d of steps) { x += D[d][0]; y += D[d][1]; assert.ok(L.walkable(s, "office", x, y), `${x},${y}`); }
  assert.deepEqual([x, y], [7, 2]);
  assert.equal(L.path(s, "office", 4, 6, 0, 0), null);
});
