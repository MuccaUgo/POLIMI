"use strict";
// Content integrity for content.js and the pure functions of study.js (spaced repetition, progress merge,
// number exercises). The rendering itself needs a browser and is checked by hand.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const read = f => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const ctx = {
  window: {},
  document: { readyState: "loading", addEventListener() {} },
  localStorage: { getItem: () => null, setItem() {} },
  console
};
ctx.window.window = ctx.window;
vm.createContext(ctx);
vm.runInContext(read("data.js") + ";window.TOPIC_NAMES = TOPICS.map(t => t.name);", ctx);
vm.runInContext(read("content.js") + ";window.SM_CONTENT = SM_CONTENT;", ctx);
vm.runInContext(read("study.js").replace("(function () {", "(function (window) {").replace(/\}\)\(\);\s*$/, "})(this.window);"), ctx);
const C = ctx.window.SM_CONTENT;
// Objects built inside the vm context have other prototypes; compare them as plain JSON.
const plain = x => JSON.parse(JSON.stringify(x));
const S = ctx.window.SM_STUDY._test;

test("every deck has a sheet, flashcards and a known track", () => {
  const ids = C.DECKS.map(d => d.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate deck id");
  for (const d of C.DECKS) {
    assert.ok(C.SHEETS[d.id] && C.SHEETS[d.id].length > 1500, `${d.id}: missing or thin sheet`);
    assert.ok(["str", "mkt"].includes(d.track), `${d.id}: unknown track`);
    assert.ok(C.CARDS.filter(c => c.m === d.id).length >= 5, `${d.id}: too few flashcards`);
  }
});

test("flashcard and oral ids are unique, so review history cannot collide", () => {
  for (const list of [C.CARDS, C.ORAL]) {
    const ids = list.map(x => x.id);
    assert.equal(new Set(ids).size, ids.length);
  }
  for (const c of C.CARDS) assert.ok(c.q.trim() && c.a.trim(), `empty card in ${c.m}`);
});

test("each written case asks Assess, Apply and Envision, with an outline to compare against", () => {
  for (const c of C.CASES) {
    assert.deepEqual(plain(c.qs.map(q => q.skill)), ["Assess", "Apply", "Envision"], c.id);
    for (const q of c.qs) assert.ok(q.out.length >= 3, `${q.id}: outline too short`);
    for (const t of c.tags) assert.ok(C.DECK_BY_ID[t], `${c.id}: unknown deck ${t}`);
  }
});

test("every deck opens an existing area of the concept browser and quiz bank", () => {
  for (const d of C.DECKS) {
    assert.ok(ctx.window.TOPIC_NAMES.includes(S.TOPIC_OF[d.id]), `${d.id}: no matching topic`);
  }
});

test("spaced repetition: grades move cards through growing intervals", () => {
  assert.deepEqual(plain(S.nextFor(null, 2)), { b: 1, days: 1 });   // new card, Good
  assert.deepEqual(plain(S.nextFor(null, 3)), { b: 2, days: 3 });   // new card, Easy
  assert.deepEqual(plain(S.nextFor({ b: 4 }, 0)), { b: 1, days: 0 }); // Again resets, due today
  assert.deepEqual(plain(S.nextFor({ b: 3 }, 2)), { b: 4, days: 14 });
  assert.equal(S.nextFor({ b: 7 }, 3).b, 7, "the top box is capped");
});

test("merging progress from two devices keeps the newer state of each card", () => {
  const a = { cards: { x: { b: 2, t: 5 }, y: { b: 1, t: 9 } }, log: { "2026-10-22": 3 }, prefs: { newPerDay: 12, t: 1 } };
  const b = { cards: { x: { b: 4, t: 7 } }, log: { "2026-10-22": 5 }, prefs: { newPerDay: 20, t: 2 } };
  const m = S.mergeP(a, b);
  assert.equal(m.cards.x.b, 4);
  assert.equal(m.cards.y.b, 1);
  assert.equal(m.log["2026-10-22"], 5);
  assert.equal(m.prefs.newPerDay, 20);
});

test("number answers accept Italian and English separators", () => {
  assert.ok(S.numCandidates("26,67").includes(26.67));
  assert.ok(S.numCandidates("160,000").includes(160000));
  assert.ok(S.numCandidates("€ 1.234,5").includes(1234.5));
  assert.ok(S.numIsRight("-1.73", { ans: -1.725, tol: 0.02 }));
  assert.ok(S.numIsRight("1.73", { ans: -1.725, tol: 0.02, absOk: true }), "elasticity may be given as an absolute value");
  assert.ok(!S.numIsRight("1.73", { ans: -1.725, tol: 0.02 }));
});

test("every number exercise generates a finite answer that its own checker accepts", () => {
  for (const [key, g] of Object.entries(S.NUMGEN)) {
    for (let i = 0; i < 40; i++) {
      const ex = g.gen();
      assert.ok(Number.isFinite(ex.ans), `${key}: answer is not finite`);
      assert.ok(S.numIsRight(ex.ans.toFixed(2), ex), `${key}: rounded answer rejected`);
    }
  }
});
