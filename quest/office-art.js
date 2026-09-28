/* PolimiAFC — pixel art for the office: cabinets, desks, the company books and the people who work there.
   Sprites are built on a 16×16 grid of palette letters, like the rest of the game. */
(function (root) {
  "use strict";
  const A = root.QuestArt;

  function grid() { return Array.from({ length: 16 }, () => Array(16).fill(".")); }
  function rect(g, x, y, w, h, c) {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < 16 && i >= 0 && i < 16) g[j][i] = c;
  }
  function box(g, x, y, w, h, fill, edge) { rect(g, x, y, w, h, edge || "k"); rect(g, x + 1, y + 1, w - 2, h - 2, fill); }
  function glyph(g, x, y, rows, c) { rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === "#") g[y + j][x + i] = c; })); }
  const rows = g => g.map(r => r.join(""));

  // 3×5 letters for the cabinet labels.
  const LETTERS = {
    A: [".#.", "#.#", "###", "#.#", "#.#"],
    L: ["#..", "#..", "#..", "#..", "###"],
    E: ["###", "#..", "##.", "#..", "###"],
    R: ["##.", "#.#", "##.", "#.#", "#.#"],
    X: ["#.#", "#.#", ".#.", "#.#", "#.#"]
  };

  // A metal filing cabinet with a coloured, lettered label.
  function cabinet(letter, color) {
    const g = grid();
    box(g, 2, 1, 12, 15, "N");
    rect(g, 3, 2, 10, 1, "e");
    box(g, 4, 2, 8, 7, color);
    glyph(g, 6, 3, LETTERS[letter], "e");
    rect(g, 3, 10, 10, 1, "n");
    rect(g, 6, 12, 4, 1, "m");
    rect(g, 6, 13, 4, 1, "k");
    rect(g, 3, 14, 10, 1, "n");
    return rows(g);
  }

  function deskBase(g, left, right, top, front) {
    rect(g, 0, 7, 16, 1, "k");
    rect(g, 0, 8, 16, 3, top);
    rect(g, 0, 11, 16, 1, front);
    rect(g, 0, 12, 16, 1, "k");
    if (left) { rect(g, 0, 7, 1, 6, "k"); rect(g, 1, 13, 2, 3, "b"); rect(g, 1, 15, 2, 1, "k"); }
    if (right) { rect(g, 15, 7, 1, 6, "k"); rect(g, 13, 13, 2, 3, "b"); rect(g, 13, 15, 2, 1, "k"); }
  }

  // Your desk: a monitor, a stack of papers and the phone.
  function deskPC() {
    const g = grid();
    deskBase(g, true, true, "u", "B");
    box(g, 1, 1, 8, 6, "w");
    rect(g, 2, 2, 2, 1, "W"); rect(g, 2, 3, 1, 1, "W");
    rect(g, 4, 7, 2, 1, "m");
    rect(g, 3, 8, 4, 1, "m");
    rect(g, 7, 9, 3, 1, "e"); rect(g, 7, 10, 3, 1, "h");
    rect(g, 11, 6, 4, 2, "x"); rect(g, 11, 5, 1, 1, "x"); rect(g, 14, 5, 1, 1, "x");
    rect(g, 11, 8, 4, 2, "X"); rect(g, 12, 8, 2, 1, "k");
    return rows(g);
  }
  // Giulia's desk, two tiles wide: papers and a nameplate on the left, a lamp on the right.
  function bossDeskL() {
    const g = grid();
    deskBase(g, true, false, "B", "b");
    rect(g, 2, 5, 5, 3, "e"); rect(g, 3, 4, 5, 3, "q"); rect(g, 4, 5, 3, 1, "P");
    rect(g, 9, 6, 5, 2, "y"); rect(g, 9, 7, 5, 1, "Y");
    rect(g, 3, 9, 1, 1, "k"); rect(g, 4, 9, 4, 1, "o");
    return rows(g);
  }
  function bossDeskR() {
    const g = grid();
    deskBase(g, false, true, "B", "b");
    rect(g, 9, 2, 5, 2, "Y"); rect(g, 10, 1, 3, 1, "Y"); rect(g, 11, 4, 1, 3, "k"); rect(g, 10, 7, 3, 1, "k");
    rect(g, 9, 4, 5, 1, "f");
    rect(g, 3, 5, 3, 3, "e"); rect(g, 6, 6, 1, 1, "e"); rect(g, 3, 5, 3, 1, "b");
    return rows(g);
  }
  // The company books: a big ledger on a lectern.
  function ledger() {
    const g = grid();
    rect(g, 6, 10, 4, 4, "b"); rect(g, 6, 10, 1, 4, "k"); rect(g, 9, 10, 1, 4, "k");
    rect(g, 3, 14, 10, 2, "k"); rect(g, 4, 14, 8, 1, "b");
    box(g, 0, 2, 16, 9, "R");
    rect(g, 1, 3, 6, 6, "q"); rect(g, 9, 3, 6, 6, "q");
    rect(g, 7, 3, 2, 7, "X");
    [4, 6, 8].forEach(y => { rect(g, 2, y, 4, 1, "P"); rect(g, 10, y, 4, 1, "P"); });
    rect(g, 12, 4, 1, 1, "c"); rect(g, 12, 6, 1, 1, "c");
    rect(g, 7, 1, 1, 3, "y"); rect(g, 7, 10, 1, 2, "y");
    return rows(g);
  }
  // The inbox: a tray of documents by the door.
  function inbox() {
    const g = grid();
    rect(g, 3, 11, 1, 5, "k"); rect(g, 12, 11, 1, 5, "k");
    rect(g, 3, 1, 10, 7, "k"); rect(g, 4, 2, 8, 6, "e");
    rect(g, 5, 3, 6, 1, "N"); rect(g, 5, 5, 4, 1, "N");
    rect(g, 2, 4, 9, 5, "k"); rect(g, 3, 5, 7, 3, "q"); rect(g, 4, 6, 4, 1, "P");
    box(g, 1, 7, 14, 5, "n");
    rect(g, 2, 8, 12, 1, "N");
    rect(g, 6, 9, 4, 2, "y"); rect(g, 7, 9, 2, 1, "Y");
    return rows(g);
  }
  function coffee() {
    const g = grid();
    box(g, 3, 0, 10, 15, "m");
    rect(g, 4, 1, 8, 1, "z");
    box(g, 5, 2, 6, 4, "c");
    rect(g, 6, 3, 2, 1, "W");
    rect(g, 11, 2, 1, 1, "x");
    rect(g, 7, 7, 2, 2, "k");
    rect(g, 6, 10, 4, 3, "e"); rect(g, 10, 11, 1, 1, "e"); rect(g, 6, 10, 4, 1, "b");
    rect(g, 4, 13, 8, 1, "z");
    rect(g, 3, 15, 10, 1, "k");
    return rows(g);
  }
  function plant() {
    const g = grid();
    box(g, 4, 10, 8, 6, "B");
    rect(g, 5, 11, 6, 1, "u");
    [[7, 1, 2, 3, "T"], [4, 3, 3, 3, "t"], [9, 3, 3, 3, "t"], [2, 5, 4, 3, "T"], [10, 5, 4, 3, "T"], [6, 4, 4, 5, "L"], [5, 8, 6, 2, "t"]]
      .forEach(([x, y, w, h, c]) => rect(g, x, y, w, h, c));
    rect(g, 7, 6, 1, 4, "d");
    return rows(g);
  }
  // Whiteboard with the quarterly chart (two tiles) and an office window.
  function boardL() {
    const g = grid();
    rect(g, 0, 1, 16, 10, "k"); rect(g, 1, 2, 15, 8, "e");
    rect(g, 3, 6, 2, 3, "g"); rect(g, 6, 5, 2, 4, "w"); rect(g, 9, 4, 2, 5, "g"); rect(g, 12, 3, 2, 6, "w");
    rect(g, 2, 9, 14, 1, "n");
    rect(g, 3, 11, 3, 1, "n");
    return rows(g);
  }
  function boardR() {
    const g = grid();
    rect(g, 0, 1, 16, 10, "k"); rect(g, 0, 2, 15, 8, "e");
    [[1, 7], [3, 6], [5, 6], [7, 4], [9, 5], [11, 3], [13, 2]].forEach(([x, y]) => rect(g, x, y, 2, 1, "x"));
    rect(g, 2, 9, 12, 1, "n");
    rect(g, 11, 11, 3, 1, "x"); rect(g, 8, 11, 2, 1, "w");
    return rows(g);
  }
  function officeWindow() {
    const g = grid();
    box(g, 1, 1, 14, 10, "W");
    rect(g, 2, 2, 12, 3, "i");
    rect(g, 3, 3, 3, 1, "e"); rect(g, 9, 2, 4, 1, "e");
    rect(g, 8, 1, 1, 10, "k"); rect(g, 1, 6, 14, 1, "k");
    rect(g, 3, 8, 2, 2, "n"); rect(g, 10, 7, 1, 3, "N"); rect(g, 11, 8, 2, 2, "n"); rect(g, 5, 9, 2, 1, "N");
    rect(g, 1, 11, 14, 1, "e");
    return rows(g);
  }

  Object.assign(A.SPRITES, {
    cab1: cabinet("A", "w"), cab2: cabinet("L", "x"), cab3: cabinet("E", "v"), cab4: cabinet("R", "G"), cab5: cabinet("X", "o"),
    deskPC: deskPC(), bossDeskL: bossDeskL(), bossDeskR: bossDeskR(), ledger: ledger(), inbox: inbox(),
    coffee: coffee(), plant: plant(), boardL: boardL(), boardR: boardR(), officeWindow: officeWindow()
  });

  Object.assign(A.OUTFITS, {
    giulia: { H: "#3a2418", c: "#c8483a", C: "#8f2f2c", P: "#1c1a2e" },
    marco: { H: "#b0602a", c: "#72b3ee", C: "#3b78c8", P: "#55556a" },
    baker: { H: "#8a6238", c: "#fdfcf5", C: "#c9b58a", P: "#3a3450" },
    consultant: { H: "#2c2c3c", c: "#55556a", C: "#3a3a4a", P: "#1c1a2e" },
    hotelier: { H: "#f4d24c", c: "#9a5fc6", C: "#6c3c96", P: "#1c1a2e" },
    coder: { H: "#d64545", c: "#62b04a", C: "#3f8a3c", P: "#3b78c8" }
  });

  // Office carpet.
  const baseGround = A.ground;
  A.ground = function (kind, frame) {
    if (kind !== "carpet") return baseGround(kind, frame);
    const cv = A.makeCanvas(16, 16), ctx = cv.getContext("2d");
    ctx.fillStyle = "#7d86a3"; ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = "#747d9a"; ctx.fillRect(0, 0, 8, 8); ctx.fillRect(8, 8, 8, 8);
    ctx.fillStyle = "#68708c"; ctx.fillRect(0, 15, 16, 1); ctx.fillRect(15, 0, 1, 16);
    return cv;
  };
})(typeof window !== "undefined" ? window : globalThis);
