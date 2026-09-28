/* PolimiAFC — engine rules with no DOM access: seeded random numbers, map lookups and path-finding. */
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

  // ---------- Maps ----------
  function tileAt(mapId, x, y) {
    const m = W.MAPS[mapId];
    if (y < 0 || y >= m.rows.length || x < 0 || x >= m.rows[0].length) return null;
    return m.rows[y][x];
  }
  function npcAt(state, mapId, x, y) {
    return W.NPCS.find(n => n.map === mapId && npcPos(state, n).x === x && npcPos(state, n).y === y && npcVisible(state, n)) || null;
  }
  function npcPos(state, n) {
    return { x: n.x, y: n.y };
  }
  function npcVisible(state, n) {
    if (typeof n.visible === "function") return n.visible(state);
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
  const api = { rng, tileAt, npcAt, npcPos, npcVisible, walkable, path };
  root.QuestLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
