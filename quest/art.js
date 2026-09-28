/* Ledger Quest — pixel art. Every sprite is a 16×16 grid of palette letters ('.' is transparent). */
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

  const SAGE = [
    "......kkkk......",
    ".....kvvvvk.....",
    "....kvvvvvvk....",
    "...kvvyvvvvvk...",
    "..kkkkkkkkkkkk..",
    "...kssssssssk...",
    "...kskssssksk...",
    "...keeeeeeeek...",
    "...keeeeeeeek...",
    "..kvkeeeeeekvk..",
    "..kvvkeeeekvvk..",
    "..ksvvvkkvvvsk..",
    "...kvvvvvvvvk...",
    "...kvvvvvvvvk.b.",
    "...kvvvvvvvvkb..",
    "...kkkkkkkkkkb.."
  ];

  // ---------- Enemies (drawn large in battle, small on the map) ----------
  const SLIME = [
    "................",
    "................",
    "................",
    "......kkkk......",
    "....kkllllkk....",
    "...kllllllllk...",
    "..klleelllllk...",
    "..kleekllekllk..",
    ".kllllllllllllk.",
    ".klllllllllllGk.",
    "kllllkkkkkllllGk",
    "klllllllllllllGk",
    "kGllllllllllGGGk",
    ".kGGGGGGGGGGGGk.",
    "..kkkkkkkkkkkk..",
    "................"
  ];
  const BAT = [
    "................",
    "................",
    ".k............k.",
    ".kk....kk....kk.",
    ".kvk..kvvk..kvk.",
    ".kvvk.kvvk.kvvk.",
    ".kvvvkvvvvkvvvk.",
    ".kvvvvkyykvvvvk.",
    ".kvvvvvvvvvvvvk.",
    "..kvvvkxxkvvvk..",
    "..kvvk.kk.kvvk..",
    "...kk......kk...",
    "................",
    "................",
    "................",
    "................"
  ];
  const CRAB = [
    "................",
    "..kk........kk..",
    ".kxxk......kxxk.",
    ".kxk.k....k.kxk.",
    ".kxxk......kxxk.",
    "..kxk.kkkk.kxk..",
    "...kkkxxxxkkk...",
    "...kxekxxkexk...",
    "..kxxxxxxxxxxk..",
    ".kxxxxXXXXxxxxk.",
    ".kxxXXXXXXXXxxk.",
    "..kXXXXXXXXXXk..",
    ".k.kXkkXXkkXk.k.",
    "k..kk..kk..kk..k",
    "................",
    "................"
  ];
  const DUMMY = [
    "......kkkk......",
    ".....kuuuuk.....",
    ".....kukkuk.....",
    ".....kuuuuk.....",
    "......kbbk......",
    "..kkkkkbbkkkkk..",
    "..kuuuuuuuuuuk..",
    "..kkkkkbbkkkkk..",
    "......kuuk......",
    ".....kuuuuk.....",
    ".....kuxxuk.....",
    ".....kuuuuk.....",
    "......kbbk......",
    "......kbbk......",
    "....kkkbbkkk....",
    "....kbbbbbbk...."
  ];
  const BOSS = [
    "..kkkkkkkkkkkk..",
    ".kyyyykrrrrrrk..",
    ".kyyyykrrrrrrk..",
    ".kkkkkkkkkkkkkk.",
    ".kccccckvvvvvvk.",
    ".kceekckvveevvk.",
    ".kckkkckvkkkvvk.",
    ".kkkkkkkkkkkkkk.",
    ".kllllkooookxxk.",
    ".kllllkooookxxk.",
    ".kkkkkkkkkkkkkk.",
    "..kXkXXXXXXkXk..",
    "..kXXkXkkXkXXk..",
    "...kkkkkkkkkk...",
    "..kk........kk..",
    ".kk..........kk."
  ];

  // ---------- Tiles ----------
  const TREE = [
    ".....kkkkkk.....",
    "...kkTTTTTTkk...",
    "..kTTLLTTTTTTk..",
    ".kTTLLTTTTTTTTk.",
    ".kTLLTTTTTTTtTk.",
    "kTTTTTTTTTTTTttk",
    "kTTTTTTTTTtTtttk",
    "kTTTTTTTTTTtttdk",
    "ktTTTTTTTTtttddk",
    ".kttTTTTtttddk..",
    "..kkttttdddkk...",
    "....kkkkkkk.....",
    "......kbBk......",
    "......kbBk......",
    ".....kbbBBk.....",
    "......kkkk......"
  ];
  const ROCK = [
    "................",
    "................",
    "................",
    "................",
    ".....kkkkk......",
    "...kkNNNNNkk....",
    "..kNNNNNnNNNk...",
    "..kNNiNNNnnNk...",
    ".kNNNNNNnnnnnk..",
    ".kNNNNnnnnnnnk..",
    ".knNNnnnnnnnmk..",
    ".knnnnnnnnnmmk..",
    "..kmnnnnnnmmk...",
    "...kkkkkkkkk....",
    "................",
    "................"
  ];
  const FLOWERS = [
    "................",
    "..x.............",
    ".xyx.......f....",
    "..x.......fyf...",
    "..G........f....",
    "..G........G....",
    "................",
    "......a.........",
    ".....aya........",
    "......a.....x...",
    "......G....xyx..",
    "......G.....x...",
    "............G...",
    "..f.............",
    ".fyf............",
    "..G............."
  ];
  const TALL_GRASS = [
    "................",
    "..G.....G.....G.",
    ".GlG...GlG...GlG",
    ".GlG...GlG...GlG",
    "GllG..GllG..GllG",
    "GlGG..GlGG..GlGG",
    "................",
    "....G.....G.....",
    "...GlG...GlG....",
    "...GlG...GlG....",
    "..GllG..GllG....",
    "..GlGG..GlGG....",
    "................",
    ".G.....G.....G..",
    "GlG...GlG...GlG.",
    "GlGG..GlGG..GlGG"
  ];
  const SIGN = [
    "................",
    "................",
    "..kkkkkkkkkkkk..",
    ".kuuuuuuuuuuuuk.",
    ".kuBBBBBBBBBBuk.",
    ".kuuuuuuuuuuuuk.",
    ".kuBBBBBBBBuuuk.",
    ".kuuuuuuuuuuuuk.",
    "..kkkkkkkkkkkk..",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    ".....kkbBkk.....",
    "................",
    "................"
  ];
  const CHEST = [
    "................",
    "................",
    "................",
    "..kkkkkkkkkkkk..",
    ".kBBBBBBBBBBBBk.",
    ".kBuuuuuuuuuuBk.",
    ".kBBBBBBBBBBBBk.",
    ".kkkkkkyykkkkkk.",
    ".kbbbbbyYbbbbbk.",
    ".kbBBBBkkBBBBbk.",
    ".kbBBBBBBBBBBbk.",
    ".kbbbbbbbbbbbbk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
    "................"
  ];
  const CHEST_OPEN = [
    "................",
    "..kkkkkkkkkkkk..",
    ".kBuuuuuuuuuuBk.",
    ".kBBBBBBBBBBBBk.",
    ".kkkkkkkkkkkkkk.",
    ".kzzzzzzzzzzzzk.",
    ".kzzzzzzzzzzzzk.",
    ".kkkkkkkkkkkkkk.",
    ".kbbbbbbbbbbbbk.",
    ".kbBBBBBBBBBBbk.",
    ".kbBBBBBBBBBBbk.",
    ".kbbbbbbbbbbbbk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
    "................"
  ];
  const WELL = [
    "................",
    "...kkkkkkkkkk...",
    "..kRRRRRRRRRRk..",
    ".kRRrrrrrrrrRRk.",
    ".kkkkkkkkkkkkkk.",
    "...kb......bk...",
    "...kb..kk..bk...",
    "...kb..kuk.bk...",
    "..kkkkkkkkkkkk..",
    ".kNNnNNNnNNNnNk.",
    ".knwwwwwwwwwwnk.",
    ".kNwWwwwwWwwwNk.",
    ".knNNnNNNnNNnNk.",
    ".kNNNnNNNNnNNNk.",
    "..kkkkkkkkkkkk..",
    "................"
  ];
  const DOOR = [
    "HhhhhhhhhhhhhhhH",
    "HhhkkkkkkkkkkhhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbBuuBBuuBbkhH",
    "HhkbBuuBBuuBbkhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbBBBBBBykbkhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbBuuBBuuBbkhH",
    "HhkbBuuBBuuBbkhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbBBBBBBBBbkhH",
    "HhkbbbbbbbbbbkhH",
    "kkkkkkkkkkkkkkkk",
    "nnnnnnnnnnnnnnnn"
  ];
  const WALL_WINDOW = [
    "HhhhhhhhhhhhhhhH",
    "HhhhhhhhhhhhhhhH",
    "HhhkkkkkkkkkkhhH",
    "HhhkWWWkkWWWkhhH",
    "HhhkWiWkkWiWkhhH",
    "HhhkWWWkkWWWkhhH",
    "HhhkkkkkkkkkkhhH",
    "HhhkWWWkkWWWkhhH",
    "HhhkWWWkkWWWkhhH",
    "HhhkkkkkkkkkkhhH",
    "HhhbBBBBBBBBbhhH",
    "HhhhhhhhhhhhhhhH",
    "HhhhhhhhhhhhhhhH",
    "HhhhhhhhhhhhhhhH",
    "kkkkkkkkkkkkkkkk",
    "nnnnnnnnnnnnnnnn"
  ];
  const CAVE = [
    "nnnnnnnnnnnnnnnn",
    "nNNnnkkkkkknnNNn",
    "nNnnkkzzzzkknnNn",
    "nnnkzzzzzzzzknnn",
    "nnkzzzzzzzzzzknn",
    "nkzzzzzzzzzzzzkn",
    "nkzzzzzzzzzzzzkn",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk",
    "kzzzzzzzzzzzzzzk"
  ];
  const BED = [
    "kkkkkkkkkkkkkkkk",
    "kBBBBBBBBBBBBBBk",
    "kBeeeeeeeeeeeeBk",
    "kBeeeeeeeeeeeeBk",
    "kBeeeeeeeeeeeeBk",
    "kBkkkkkkkkkkkkBk",
    "kBxxxxxxxxxxxxBk",
    "kBxXxxxxXxxxxxBk",
    "kBxxxxxxxxxxxxBk",
    "kBxxxxXxxxxxXxBk",
    "kBxxxxxxxxxxxxBk",
    "kBxXxxxxxxXxxxBk",
    "kBxxxxxxxxxxxxBk",
    "kBBBBBBBBBBBBBBk",
    "kbkkkkkkkkkkkkbk",
    "kk............kk"
  ];
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
  const SHELF = [
    "kkkkkkkkkkkkkkkk",
    "kbbbbbbbbbbbbbbk",
    "kbxxcckyyvvxxccb",
    "kbxxcckyyvvxxccb",
    "kbxxcckyyvvxxccb",
    "kbbbbbbbbbbbbbbk",
    "kbccvvyyxxkccyyb",
    "kbccvvyyxxkccyyb",
    "kbccvvyyxxkccyyb",
    "kbbbbbbbbbbbbbbk",
    "kbyyxxccvvyyxxkb",
    "kbyyxxccvvyyxxkb",
    "kbyyxxccvvyyxxkb",
    "kbbbbbbbbbbbbbbk",
    "kkkkkkkkkkkkkkkk",
    "................"
  ];
  const COUNTER = [
    "kkkkkkkkkkkkkkkk",
    "kuuuuuuuuuuuuuuk",
    "kuuuuuuuuuuuuuuk",
    "kBBBBBBBBBBBBBBk",
    "kbbbbbbbbbbbbbbk",
    "kbBBBBBBBBBBBBbk",
    "kbBbbbbbbbbbbBbk",
    "kbBbbbbbbbbbbBbk",
    "kbBbbbbbbbbbbBbk",
    "kbBbbbbbbbbbbBbk",
    "kbBbbbbbbbbbbBbk",
    "kbBBBBBBBBBBBBbk",
    "kbbbbbbbbbbbbbbk",
    "kkkkkkkkkkkkkkkk",
    "zzzzzzzzzzzzzzzz",
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
    sage: SAGE, slime: SLIME, bat: BAT, crab: CRAB, dummy: DUMMY, boss: BOSS,
    tree: TREE, rock: ROCK, flowers: FLOWERS, tallGrass: TALL_GRASS, sign: SIGN, chest: CHEST, chestOpen: CHEST_OPEN,
    well: WELL, door: DOOR, wallWindow: WALL_WINDOW, cave: CAVE, bed: BED, table: TABLE, shelf: SHELF, counter: COUNTER, page: PAGE
  };

  // Character colour schemes for the humanoid base.
  const OUTFITS = {
    hero: { H: "#6b3f22", c: "#3a8f8f", C: "#26615f", P: "#3a3450" },
    kid: { H: "#e0a030", c: "#e86fa0", C: "#b44c7a", P: "#3a78c8" },
    farmer: { H: "#8a6238", c: "#c8483a", C: "#8f2f2c", P: "#6b4428" },
    guard: { H: "#adadbb", c: "#55556a", C: "#3a3a4a", P: "#3a3450" },
    merchant: { H: "#2c2c3c", c: "#f4d24c", C: "#c99a1c", P: "#6b4428" },
    innkeeper: { H: "#d64545", c: "#62b04a", C: "#3f8a3c", P: "#6b4428" },
    fisher: { H: "#efe2bd", c: "#3b78c8", C: "#2a4f8a", P: "#6b4428" },
    miner: { H: "#e98a3a", c: "#7c7c8c", C: "#55556a", P: "#3a3450" }
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

  // Deterministic speckle for ground tiles.
  function speckle(ctx, base, dots, seed) {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 16, 16);
    let s = seed;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    dots.forEach(([color, n]) => {
      ctx.fillStyle = color;
      for (let i = 0; i < n; i++) ctx.fillRect(Math.floor(rnd() * 16), Math.floor(rnd() * 16), 1, 1);
    });
  }
  function ground(kind, frame) {
    const cv = makeCanvas(16, 16), ctx = cv.getContext("2d");
    const P = PALETTE;
    if (kind === "grass") speckle(ctx, P.g, [[P.l, 10], [P.G, 8]], 7);
    else if (kind === "path") speckle(ctx, P.p, [[P.P, 12], [P.q, 8]], 11);
    else if (kind === "floor") {
      ctx.fillStyle = P.u; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.B;
      for (let y = 3; y < 16; y += 4) ctx.fillRect(0, y, 16, 1);
      ctx.fillRect(5, 0, 1, 3); ctx.fillRect(11, 4, 1, 3); ctx.fillRect(3, 8, 1, 3); ctx.fillRect(13, 12, 1, 3);
    } else if (kind === "caveFloor") speckle(ctx, P.m, [[P.n, 14], [P.z, 8]], 5);
    else if (kind === "caveWall") {
      speckle(ctx, P.n, [[P.N, 12], [P.m, 14]], 3);
      ctx.fillStyle = P.k; ctx.fillRect(0, 15, 16, 1);
    } else if (kind === "wall") {
      ctx.fillStyle = P.H; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.h; ctx.fillRect(0, 0, 16, 11);
      ctx.fillStyle = P.B; ctx.fillRect(0, 11, 16, 5);
      ctx.fillStyle = P.b; ctx.fillRect(0, 11, 16, 1); ctx.fillRect(0, 15, 16, 1);
    } else if (kind === "mat") {
      ctx.fillStyle = P.u; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.x; ctx.fillRect(1, 3, 14, 10);
      ctx.fillStyle = P.y; ctx.fillRect(3, 5, 10, 6);
      ctx.fillStyle = P.X; ctx.fillRect(5, 7, 6, 2);
    } else if (kind === "water") {
      ctx.fillStyle = P.w; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.W;
      const o = frame ? 4 : 0;
      [[1 + o, 3], [9 - o, 7], [3 + o, 11], [11 - o, 14]].forEach(([x, y]) => ctx.fillRect(x % 16, y, 4, 1));
      ctx.fillStyle = P.i;
      ctx.fillRect((2 + o) % 16, 3, 1, 1); ctx.fillRect((10 - o + 16) % 16, 7, 1, 1);
    } else if (kind === "bridge") {
      ctx.fillStyle = P.B; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.b;
      for (let x = 3; x < 16; x += 4) ctx.fillRect(x, 0, 1, 16);
      ctx.fillStyle = P.k; ctx.fillRect(0, 0, 16, 1); ctx.fillRect(0, 15, 16, 1);
    } else if (kind === "roof") {
      ctx.fillStyle = P.r; ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = P.R;
      for (let y = 3; y < 16; y += 4) ctx.fillRect(0, y, 16, 1);
      for (let y = 0; y < 16; y += 4) for (let x = (y / 4) % 2 ? 0 : 4; x < 16; x += 8) ctx.fillRect(x, y, 1, 3);
    } else if (kind === "fence") {
      speckle(ctx, P.g, [[P.l, 10], [P.G, 8]], 7);
      ctx.fillStyle = P.k; ctx.fillRect(0, 5, 16, 5); ctx.fillRect(2, 2, 4, 12); ctx.fillRect(10, 2, 4, 12);
      ctx.fillStyle = P.u; ctx.fillRect(0, 6, 16, 3); ctx.fillRect(3, 3, 2, 10); ctx.fillRect(11, 3, 2, 10);
    }
    return cv;
  }

  const api = { PALETTE, SPRITES, OUTFITS, paint, ground, makeCanvas };
  root.QuestArt = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
