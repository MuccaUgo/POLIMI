/* Ledger Quest — rules: stats, battles, questions, saving and path-finding. No DOM access. */
(function (root) {
  "use strict";
  const W = root.QuestWorld;

  // ---------- Random numbers ----------
  function rng(seed) {
    let a = seed >>> 0;
    const next = () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const r = {
      next,
      int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
      pick: list => list[Math.floor(next() * list.length)],
      chance: p => next() < p,
      shuffle(list) {
        const out = list.slice();
        for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
        return out;
      }
    };
    return r;
  }

  // ---------- Player ----------
  const XP_TABLE = [0, 0, 20, 50, 95, 155, 230, 320, 430, 560]; // total XP needed for each level
  const MAX_LEVEL = XP_TABLE.length - 1;
  const WEAPONS = { quill: { name: "Quill of Classification", atk: 0 }, iron: { name: "Iron Abacus", atk: 3 } };

  function levelFor(xp) {
    let lv = 1;
    for (let i = 1; i <= MAX_LEVEL; i++) if (xp >= XP_TABLE[i]) lv = i;
    return lv;
  }
  function maxHp(level) { return 24 + 8 * (level - 1); }
  function attack(player) { return 5 + 2 * (player.level - 1) + (WEAPONS[player.weapon] || WEAPONS.quill).atk; }
  function xpToNext(player) { return player.level >= MAX_LEVEL ? 0 : XP_TABLE[player.level + 1] - player.xp; }

  function newPlayer() {
    return { level: 1, xp: 0, hp: maxHp(1), gold: 10, weapon: "quill", items: { tea: 1, balm: 1 } };
  }

  // Adds XP; returns the list of levels gained (with the HP and attack after each).
  function gainXp(player, xp) {
    const gained = [];
    player.xp += xp;
    while (player.level < MAX_LEVEL && player.xp >= XP_TABLE[player.level + 1]) {
      player.level++;
      player.hp = maxHp(player.level);
      gained.push({ level: player.level, maxHp: maxHp(player.level), atk: attack(player) });
    }
    return gained;
  }

  // ---------- Questions ----------
  function classify(tier, r) {
    const pool = W.CLASSIFY.filter(q => q[0] === tier);
    const [, item, answer, why] = r.pick(pool);
    return {
      type: "classify", prompt: item, ask: "Which box does it belong in?",
      options: r.shuffle(W.ELEMENTS).map(label => ({ label, correct: label === answer, consequence: label === answer ? "" : W.TRAPS[`${answer}>${label}`] })),
      explain: why
    };
  }
  function trueFalse(r) {
    const [statement, truth, why] = r.pick(W.TRUE_FALSE);
    return {
      type: "truefalse", prompt: `“${statement}”`, ask: "True or false?",
      options: [
        { label: "True", correct: truth, consequence: truth ? "" : "It sounds plausible, which is exactly how misstatements work." },
        { label: "False", correct: !truth, consequence: truth ? "That one was actually true. Trust the definitions, not the monster." : "" }
      ],
      explain: why
    };
  }
  function oddOne(r) {
    const element = r.pick(Object.keys(W.ODD_ONE_OUT));
    const same = r.shuffle(W.CLASSIFY.filter(q => q[2] === element)).slice(0, 3);
    const odd = r.pick(W.CLASSIFY.filter(q => q[2] !== element));
    const items = r.shuffle(same.concat([odd]));
    return {
      type: "oddone", prompt: W.ODD_ONE_OUT[element], ask: "Pick the odd one out.",
      options: items.map(q => ({
        label: q[1], correct: q === odd,
        consequence: q === odd ? "" : `That one really is ${article(element)} ${element.toLowerCase()}: ${q[3]}`
      })),
      explain: `“${odd[1]}” is ${article(odd[2])} ${odd[2].toLowerCase()}: ${odd[3]}`
    };
  }
  const article = w => /^[AEIOU]/i.test(w) ? "an" : "a";

  function question(kind, r) {
    if (kind === "truefalse") return trueFalse(r);
    if (kind === "oddone") return oddOne(r);
    return classify(+kind.replace("classify", ""), r);
  }

  // Tea of Insight: hides two wrong options (never the last wrong one).
  function teaHides(q, r) {
    const wrong = r.shuffle(q.options.map((o, i) => i).filter(i => !q.options[i].correct));
    const hide = new Set(wrong.slice(0, Math.min(2, wrong.length - 1)));
    return q.options.map((o, i) => hide.has(i));
  }

  // ---------- Battles ----------
  function newBattle(enemyId, r) {
    const def = W.ENEMIES[enemyId];
    return { id: enemyId, def, hp: def.hp, maxHp: def.hp, streak: 0, turns: 0, phase: 0 };
  }
  function battleKind(b, r) {
    if (b.def.boss) return r.pick(b.def.phases[b.phase].kind);
    return r.pick(b.def.kind);
  }
  // Resolves one answer. Returns what happened for the UI to narrate.
  function resolve(b, player, correct, r) {
    b.turns++;
    const out = { correct, damage: 0, hurt: 0, combo: false, phaseChanged: false, won: false, lost: false };
    if (correct) {
      b.streak++;
      out.combo = b.streak >= 3;
      out.damage = Math.round((attack(player) + r.int(0, 2)) * (out.combo ? 1.5 : 1));
      b.hp = Math.max(0, b.hp - out.damage);
      if (b.def.boss) {
        while (b.phase < b.def.phases.length - 1 && b.hp <= b.def.phases[b.phase].until) { b.phase++; out.phaseChanged = true; }
      }
      out.won = b.hp <= 0;
    } else {
      b.streak = 0;
      out.hurt = b.def.training ? 0 : r.int(b.def.atk[0], b.def.atk[1]);
      player.hp = Math.max(0, player.hp - out.hurt);
      out.lost = player.hp <= 0;
    }
    return out;
  }
  function rewards(b, r) {
    return { xp: b.def.xp, gold: r.int(b.def.gold[0], b.def.gold[1]) };
  }

  // Random encounters in tall grass.
  function encounter(player, r) {
    const table = player.level >= 2 ? [["slime", 40], ["bat", 35], ["crab", 25]] : [["slime", 70], ["bat", 30]];
    let roll = r.int(1, 100);
    for (const [id, w] of table) { if ((roll -= w) <= 0) return id; }
    return "slime";
  }
  const ENCOUNTER_RATE = 0.12;

  // ---------- Map helpers ----------
  function tileAt(mapId, x, y) {
    const m = W.MAPS[mapId];
    if (y < 0 || y >= m.rows.length || x < 0 || x >= m.rows[0].length) return null;
    return m.rows[y][x];
  }
  function npcAt(state, mapId, x, y) {
    return W.NPCS.find(n => n.map === mapId && npcPos(state, n).x === x && npcPos(state, n).y === y && npcVisible(state, n)) || null;
  }
  function npcPos(state, n) {
    if (n.id === "guard" && state.flags.guardMoved) return { x: 15, y: 1 };
    return { x: n.x, y: n.y };
  }
  function npcVisible(state, n) {
    if (n.id === "boss") return !state.flags.boss;
    return true;
  }
  function walkable(state, mapId, x, y) {
    const t = tileAt(mapId, x, y);
    if (t == null || W.SOLID.has(t)) return false;
    return !npcAt(state, mapId, x, y);
  }
  // Breadth-first path from (sx,sy) to a walkable (tx,ty); returns the steps as directions, or null.
  function path(state, mapId, sx, sy, tx, ty) {
    if (!walkable(state, mapId, tx, ty)) return null;
    const key = (x, y) => x + "," + y;
    const prev = new Map([[key(sx, sy), null]]);
    const queue = [[sx, sy]];
    const DIRS = [["up", 0, -1], ["down", 0, 1], ["left", -1, 0], ["right", 1, 0]];
    while (queue.length) {
      const [x, y] = queue.shift();
      if (x === tx && y === ty) {
        const steps = [];
        let k = key(tx, ty);
        while (prev.get(k)) { const [p, d] = prev.get(k); steps.unshift(d); k = p; }
        return steps;
      }
      for (const [d, dx, dy] of DIRS) {
        const nx = x + dx, ny = y + dy, k = key(nx, ny);
        if (prev.has(k) || !walkable(state, mapId, nx, ny)) continue;
        prev.set(k, [key(x, y), d]);
        queue.push([nx, ny]);
      }
    }
    return null;
  }

  // ---------- Save ----------
  function newGame() {
    return {
      v: 1, map: "home", x: 4, y: 4, dir: "down", player: newPlayer(),
      flags: { intro: false, tutorial: false, guardMoved: false, boss: false, ending: false, chests: {} },
      stats: { battles: 0, won: 0, answered: 0, correct: 0, steps: 0 }, sound: true, cooldown: 0
    };
  }
  function normalize(save) {
    const base = newGame();
    if (!save || typeof save !== "object" || !W.MAPS[save.map]) return base;
    const out = Object.assign(base, save);
    out.player = Object.assign(newPlayer(), save.player);
    out.player.items = Object.assign({ tea: 0, balm: 0 }, save.player && save.player.items);
    out.flags = Object.assign(newGame().flags, save.flags);
    out.flags.chests = Object.assign({}, save.flags && save.flags.chests);
    out.stats = Object.assign(newGame().stats, save.stats);
    out.player.level = levelFor(out.player.xp);
    out.player.hp = Math.min(Math.max(1, out.player.hp | 0), maxHp(out.player.level));
    return out;
  }

  const api = {
    rng, XP_TABLE, MAX_LEVEL, WEAPONS, levelFor, maxHp, attack, xpToNext, newPlayer, gainXp,
    classify, trueFalse, oddOne, question, teaHides, newBattle, battleKind, resolve, rewards, encounter, ENCOUNTER_RATE,
    tileAt, npcAt, npcPos, npcVisible, walkable, path, newGame, normalize
  };
  root.QuestLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
