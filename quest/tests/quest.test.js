const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
global.QuestWorld = require(path.join(__dirname, "..", "world.js"));
const A = require(path.join(__dirname, "..", "art.js"));
const L = require(path.join(__dirname, "..", "logic.js"));
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

test("maps are rectangular, warps land on walkable tiles and lead back", () => {
  const state = L.newGame();
  state.flags.guardMoved = true; state.flags.boss = true;
  for (const [id, m] of Object.entries(W.MAPS)) {
    m.rows.forEach((r, i) => assert.equal(r.length, m.rows[0].length, `${id} row ${i}`));
    for (const w of m.warps) {
      assert.ok(W.MAPS[w.to], `${id} → ${w.to}`);
      assert.ok(L.walkable(state, w.to, w.tx, w.ty), `${id} warp lands on (${w.tx},${w.ty}) in ${w.to}`);
      const back = W.MAPS[w.to].warps.find(b => b.to === id);
      assert.ok(back, `${w.to} leads back to ${id}`);
    }
  }
});

test("everyone and everything can be reached from the village", () => {
  const s = L.newGame();
  s.flags.guardMoved = true;
  const reach = (map, sx, sy, tx, ty) => [[0, 1], [0, -1], [1, 0], [-1, 0]].some(([dx, dy]) => {
    const nx = tx + dx, ny = ty + dy;
    return (nx === sx && ny === sy) || (L.walkable(s, map, nx, ny) && L.path(s, map, sx, sy, nx, ny));
  });
  const start = { town: [5, 6], home: [4, 6], shop: [4, 6], inn: [4, 6], cave: [4, 7] };
  for (const n of W.NPCS) {
    const [sx, sy] = start[n.map];
    const p = L.npcPos(s, n);
    const viaCounter = L.tileAt(n.map, p.x, p.y + 1) === "c" && L.path(s, n.map, sx, sy, p.x, p.y + 2);
    assert.ok(viaCounter || reach(n.map, sx, sy, p.x, p.y), `${n.id} can be reached`);
  }
  for (const c of W.CHESTS) assert.ok(reach(c.map, 5, 6, c.x, c.y), `chest ${c.id} can be reached`);
  assert.ok(L.path(s, "town", 5, 6, 16, 0), "the cave can be entered once the guard steps aside");
  s.flags.guardMoved = false;
  assert.equal(L.path(s, "town", 5, 6, 16, 0), null, "the guard blocks the cave until then");
});

test("every question has one right answer and explains every wrong one", () => {
  const r = L.rng(4);
  for (const kind of ["classify1", "classify2", "classify3", "truefalse", "oddone"]) {
    for (let i = 0; i < 300; i++) {
      const q = L.question(kind, r);
      assert.equal(q.options.filter(o => o.correct).length, 1, kind);
      assert.equal(new Set(q.options.map(o => o.label)).size, q.options.length, `${kind}: distinct options`);
      q.options.filter(o => !o.correct).forEach(o => assert.ok(o.consequence, `${kind}: ${o.label}`));
      assert.ok(q.explain && q.prompt, kind);
      assert.ok(!/undefined|NaN/.test(JSON.stringify(q)), kind);
    }
  }
  for (const [tier, item, el] of W.CLASSIFY) assert.ok(W.ELEMENTS.includes(el) && tier >= 1 && tier <= 3, item);
  assert.equal(W.CLASSIFY.find(q => q[1].startsWith("Gold shared out"))[2], "Equity", "dividends are never an expense");
});

test("the Tea of Insight hides exactly two wrong answers", () => {
  const r = L.rng(9);
  for (let i = 0; i < 200; i++) {
    const q = L.classify(1 + (i % 3), r);
    const hide = L.teaHides(q, r);
    assert.equal(hide.filter(Boolean).length, 2);
    q.options.forEach((o, j) => { if (o.correct) assert.equal(hide[j], false); });
  }
});

test("levels, damage, combos and the boss's three phases", () => {
  const p = L.newPlayer();
  assert.equal(L.maxHp(1), 24);
  const ups = L.gainXp(p, 50);
  assert.deepEqual(Array.from(ups, u => u.level), [2, 3]);
  assert.equal(p.hp, L.maxHp(3));
  assert.equal(L.attack(p), 9);
  p.weapon = "iron";
  assert.equal(L.attack(p), 12);
  const r = L.rng(1);
  const b = L.newBattle("boss", r);
  let phases = [];
  let combo = false;
  while (b.hp > 0) { const out = L.resolve(b, p, true, r); combo = combo || out.combo; if (out.phaseChanged) phases.push(b.phase); }
  assert.ok(combo, "three right answers in a row make a combo");
  assert.deepEqual(phases, [1, 2]);
  const s = L.newBattle("slime", r);
  const before = p.hp;
  const miss = L.resolve(s, p, false, r);
  assert.ok(miss.hurt >= 3 && miss.hurt <= 5 && p.hp === before - miss.hurt);
  const d = L.newBattle("dummy", r);
  assert.equal(L.resolve(d, p, false, r).hurt, 0, "the training dummy never hurts");
});

test("encounters only use level-appropriate monsters", () => {
  const r = L.rng(2), p = L.newPlayer();
  for (let i = 0; i < 300; i++) assert.notEqual(L.encounter(p, r), "crab");
  p.level = 2;
  const seen = new Set(); for (let i = 0; i < 300; i++) seen.add(L.encounter(p, r));
  assert.deepEqual([...seen].sort(), ["bat", "crab", "slime"]);
});

test("saves are normalised safely", () => {
  assert.equal(L.normalize(null).map, "home");
  assert.equal(L.normalize({ map: "nowhere" }).map, "home");
  const s = L.normalize({ map: "town", x: 3, y: 3, player: { xp: 60, hp: 999 }, flags: { boss: true } });
  assert.equal(s.player.level, 3);
  assert.equal(s.player.hp, L.maxHp(3));
  assert.equal(s.flags.boss, true);
  assert.deepEqual(s.flags.chests, {});
});
