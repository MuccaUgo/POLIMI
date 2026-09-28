/* PolimiAFC — pixel art. Every sprite is a 16×16 grid of palette letters ('.' is transparent). */
(function (root) {
  "use strict";

  const PALETTE = {
    k: "#1c1a2e", z: "#3a3450", e: "#fdfcf5",
    g: "#62b04a", G: "#3f8a3c", l: "#93d46a", d: "#2f6b34",
    t: "#2c6e3f", T: "#4a9a4c", L: "#79c25f",
    b: "#6b4428", B: "#9a6a3c", u: "#c89a5c",
    p: "#dcc28a", P: "#c3a066", q: "#ecdcaa",
    w: "#3b78c8", W: "#72b3ee", i: "#bfe2ff",
    r: "#c8483a", R: "#8f2f2c", o: "#e98a3a",
    h: "#efe2bd", H: "#c9b58a",
    y: "#f4d24c", Y: "#c99a1c",
    s: "#f5caa0", S: "#d89b72",
    n: "#7c7c8c", N: "#adadbb", m: "#55556a",
    v: "#9a5fc6", V: "#6c3c96",
    x: "#d64545", X: "#a02c2c",
    c: "#3a8f8f", C: "#26615f",
    a: "#e86fa0", f: "#fff3a0"
  };

  // ---------- Characters ----------
  // Humanoid base: H hair, c/C clothes, P trousers. Recoloured per character.
  const HERO_DOWN = [
    "................",
    ".....kkkkkk.....",
    "....kHHHHHHk....",
    "...kHHHHHHHHk...",
    "...kHHHHHHHHk...",
    "...kHssssssHk...",
    "...kskssssksk...",
    "...kssssssssk...",
    "....kssSSssk....",
    "...kcckkkkcck...",
    "..ksccccccccsk..",
    "..kskccccccksk..",
    "...kkCCCCCCkk...",
    "....kPPkkPPk....",
    "....kPPk.kPPk...",
    "....kkk...kkk..."
  ];
  const HERO_DOWN2 = HERO_DOWN.slice(0, 13).concat([
    "....kPPkkPPk....",
    "...kPPk..kPPk...",
    "...kkk....kkk..."
  ]);
  const HERO_UP = [
    "................",
    ".....kkkkkk.....",
    "....kHHHHHHk....",
    "...kHHHHHHHHk...",
    "...kHHHHHHHHk...",
    "...kHHHHHHHHk...",
    "...kHHHHHHHHk...",
    "...ksHHHHHHsk...",
    "....kssssssk....",
    "...kcckkkkcck...",
    "..ksccccccccsk..",
    "..kskccccccksk..",
    "...kkCCCCCCkk...",
    "....kPPkkPPk....",
    "....kPPk.kPPk...",
    "....kkk...kkk..."
  ];
  const HERO_UP2 = HERO_UP.slice(0, 13).concat([
    "....kPPkkPPk....",
    "...kPPk..kPPk...",
    "...kkk....kkk..."
  ]);
  const HERO_SIDE = [
    "................",
    ".....kkkkkk.....",
    "....kHHHHHHk....",
    "...kHHHHHHHHk...",
    "...kHHHHHHHHk...",
    "...kHHHHssssk...",
    "...kHHHsssksk...",
    "...kHHssssssk...",
    "....kkssSSsk....",
    "....kcccckk.....",
    "...kccccccsk....",
    "...kcccccksk....",
    "....kCCCCCk.....",
    ".....kPPPk......",
    ".....kPkPk......",
    ".....kkkkk......"
  ];
  const HERO_SIDE2 = HERO_SIDE.slice(0, 13).concat([
    "....kPPkPPk.....",
    "...kPPk.kPPk....",
    "...kkk...kkk...."
  ]);

  const TABLE = [
    "................",
    "................",
    "................",
    "................",
    ".kkkkkkkkkkkkkk.",
    "kuuuuuuuuuuuuuuk",
    "kuuuueeuuuuuuuuk",
    "kuuueeeeuuuuuuuk",
    "kBBBBBBBBBBBBBBk",
    ".kbkkkkkkkkkkbk.",
    ".kbk........kbk.",
    ".kbk........kbk.",
    ".kbk........kbk.",
    ".kkk........kkk.",
    "................",
    "................"
  ];
  const PAGE = [
    "................",
    "....kkkkkkkk....",
    "...kqqqqqqqqk...",
    "...kqkkkkkkqk...",
    "...kqqqqqqqqk...",
    "...kqkkkkqqqk...",
    "...kqqqqqqqqk...",
    "...kqkkkkkkqk...",
    "...kqqqqqqqqk...",
    "...kqkkkqqqqk...",
    "...kqqqqqqqqk...",
    "...kqyyyyyyqk...",
    "...kqqqqqqqqk...",
    "....kkkkkkkk....",
    "................",
    "................"
  ];

  const SPRITES = {
    heroDown: HERO_DOWN, heroDown2: HERO_DOWN2, heroUp: HERO_UP, heroUp2: HERO_UP2, heroSide: HERO_SIDE, heroSide2: HERO_SIDE2,
    table: TABLE, page: PAGE
  };

  // Character colour schemes for the humanoid base.
  const OUTFITS = {
    hero: { H: "#6b3f22", c: "#3a8f8f", C: "#26615f", P: "#3a3450" }
  };

  // Paints a sprite onto a new 16×16 canvas (optionally mirrored and recoloured).
  function paint(rows, opts) {
    opts = opts || {};
    const cv = makeCanvas(16, 16), ctx = cv.getContext("2d");
    rows.forEach((row, y) => {
      for (let x = 0; x < 16; x++) {
        const ch = row[opts.flip ? 15 - x : x];
        if (!ch || ch === ".") continue;
        ctx.fillStyle = (opts.colors && opts.colors[ch]) || PALETTE[ch] || "#ff00ff";
        ctx.fillRect(x, y, 1, 1);
      }
    });
    return cv;
  }
  function makeCanvas(w, h) {
    if (typeof document === "undefined") return null;
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    return cv;
  }

  function ground(kind) {
    const cv = makeCanvas(16, 16), ctx = cv.getContext("2d");
    const P = PALETTE;
    if (kind === "wall") {
      ctx.fillStyle = P.H; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.h; ctx.fillRect(0, 0, 16, 11);
      ctx.fillStyle = P.B; ctx.fillRect(0, 11, 16, 5);
      ctx.fillStyle = P.b; ctx.fillRect(0, 11, 16, 1); ctx.fillRect(0, 15, 16, 1);
    } else if (kind === "mat") {
      ctx.fillStyle = P.u; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.x; ctx.fillRect(1, 3, 14, 10);
      ctx.fillStyle = P.y; ctx.fillRect(3, 5, 10, 6);
      ctx.fillStyle = P.X; ctx.fillRect(5, 7, 6, 2);
    } else {
      ctx.fillStyle = P.u; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.B;
      for (let y = 3; y < 16; y += 4) ctx.fillRect(0, y, 16, 1);
    }
    return cv;
  }

  const api = { PALETTE, SPRITES, OUTFITS, paint, ground, makeCanvas };
  root.QuestArt = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
