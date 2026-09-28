/* PolimiAFC — the engine: rendering, controls, scripts, battles, sound and saving.
   Runs both the Ledger Quest adventure and the career mode (office-ui.js). */
(function () {
  "use strict";
  const A = window.QuestArt, W = window.QuestWorld, L = window.QuestLogic, UI = window.OfficeUI, OL = window.OfficeLogic, BK = window.SaveBackup;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const TILE = 16, VW = 10, VH = 9;
  const DELTA = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const QUEST_KEY = "quest_save", CAREER_KEY = "afc_career";
  const career = () => !!S && S.mode === "career";

  const cv = $("#cv"), ctx = cv.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const rnd = L.rng((Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0);

  let S = null;                 // the saved game
  let busy = true;              // a script, battle or menu owns the input
  let frame = 0;
  const hero = { moving: false, t: 0, fromX: 0, fromY: 0, stepOdd: false, queue: [] };
  let held = null;

  // ---------- Storage ----------
  function load(key) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
  function save() { if (S) try { localStorage.setItem(career() ? CAREER_KEY : QUEST_KEY, JSON.stringify(S)); } catch (e) {} }

  // ---------- Art caches ----------
  const TILE_DEF = {
    ".": ["grass"], ",": ["grass", "tallGrass"], "=": ["path"], "T": ["grass", "tree"], "R": ["grass", "rock"], "f": ["grass", "flowers"],
    "~": ["water"], "b": ["bridge"], "^": ["roof"], "#": [null, "wallWindow"], "D": [null, "door"], "F": ["fence"], "S": ["grass", "sign"],
    "C": ["grass", "chest"], "W": ["grass", "well"], "M": [null, "cave"], "|": ["wall"], "w": ["floor"], "x": ["mat"], "B": ["floor", "bed"],
    "t": ["floor", "table"], "k": ["floor", "shelf"], "c": ["floor", "counter"], "n": ["caveWall"], "g": ["caveFloor"],
    // The PolimiAFC office
    "_": ["carpet"], "1": ["carpet", "cab1"], "2": ["carpet", "cab2"], "3": ["carpet", "cab3"], "4": ["carpet", "cab4"], "5": ["carpet", "cab5"],
    "d": ["carpet", "deskPC"], "L": ["carpet", "ledger"], "p": ["carpet", "plant"], "q": ["carpet", "coffee"], "i": ["carpet", "inbox"],
    "o": ["carpet", "bossDeskL"], "j": ["carpet", "bossDeskR"], "m": ["carpet", "table"], "v": ["wall", "boardL"], "V": ["wall", "boardR"], "O": ["wall", "officeWindow"]
  };
  const tileCache = {};
  function tileImg(ch, variant) {
    const key = ch + ":" + (variant || 0);
    if (tileCache[key]) return tileCache[key];
    const def = TILE_DEF[ch] || ["grass"];
    const c = A.makeCanvas(16, 16), g = c.getContext("2d");
    if (def[0]) g.drawImage(A.ground(def[0], variant), 0, 0);
    let sprite = def[1];
    if (ch === "C" && variant === 1) sprite = "chestOpen";
    if (sprite) g.drawImage(A.paint(A.SPRITES[sprite]), 0, 0);
    return (tileCache[key] = c);
  }
  const spriteCache = {};
  function charImg(kind, outfit, dir, step) {
    const key = [kind, outfit, dir, step].join(":");
    if (spriteCache[key]) return spriteCache[key];
    let rows, flip = false;
    if (kind === "humanoid") {
      const two = step ? "2" : "";
      rows = dir === "up" ? A.SPRITES["heroUp" + two] : dir === "down" ? A.SPRITES["heroDown" + two] : A.SPRITES["heroSide" + two];
      flip = dir === "left";
    } else rows = A.SPRITES[kind];
    return (spriteCache[key] = A.paint(rows, { flip, colors: A.OUTFITS[outfit] }));
  }

  // ---------- Sound ----------
  let audio = null, musicTimer = null, currentSong = null;
  function ac() {
    if (!S || !S.sound) return null;
    if (!audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (audio.state === "suspended") audio.resume();
    return audio;
  }
  function tone(freq, dur, type, vol, when) {
    const a = ac(); if (!a || !freq) return;
    const t0 = a.currentTime + (when || 0);
    const o = a.createOscillator(), g = a.createGain();
    o.type = type || "square"; o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.06, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(a.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const SFX = {
    blip: () => tone(880, 0.05, "square", 0.03),
    select: () => { tone(660, 0.06, "square", 0.05); tone(990, 0.08, "square", 0.05, 0.06); },
    bump: () => tone(110, 0.08, "square", 0.04),
    door: () => { tone(330, 0.08, "triangle", 0.08); tone(220, 0.12, "triangle", 0.08, 0.08); },
    hit: () => { tone(220, 0.08, "sawtooth", 0.07); tone(110, 0.12, "square", 0.06, 0.06); },
    hurt: () => { tone(160, 0.2, "sawtooth", 0.08); tone(90, 0.25, "square", 0.06, 0.1); },
    coin: () => { tone(988, 0.07, "square", 0.05); tone(1319, 0.14, "square", 0.05, 0.07); },
    encounter: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.07, "square", 0.05, i * 0.06)),
    level: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.12, "square", 0.06, i * 0.1)),
    win: () => [784, 784, 784, 1047].forEach((f, i) => tone(f, i === 3 ? 0.4 : 0.1, "square", 0.06, i * 0.12)),
    ring: () => [0, 0.16, 0.5, 0.66].forEach(t => { tone(1320, 0.1, "square", 0.03, t); tone(1100, 0.1, "square", 0.03, t + 0.08); })
  };
  const N = n => n ? 440 * Math.pow(2, (n - 69) / 12) : 0; // MIDI note to Hz
  const SONGS = {
    town: { bpm: 132, lead: [72, 76, 79, 76, 77, 81, 79, 76, 74, 77, 76, 72, 74, 71, 72, 0, 72, 76, 79, 84, 81, 79, 77, 76, 74, 76, 77, 79, 76, 74, 72, 0], bass: [48, 48, 53, 53, 50, 50, 43, 43, 48, 48, 53, 53, 50, 43, 48, 48] },
    home: { bpm: 96, lead: [67, 0, 72, 71, 69, 0, 67, 0, 65, 0, 69, 67, 64, 0, 0, 0, 67, 0, 72, 74, 76, 0, 74, 72, 71, 0, 67, 69, 72, 0, 0, 0], bass: [48, 48, 45, 45, 41, 41, 43, 43, 48, 48, 45, 45, 41, 43, 48, 48] },
    cave: { bpm: 100, lead: [57, 0, 60, 0, 59, 0, 55, 0, 57, 0, 64, 0, 63, 0, 0, 0, 57, 0, 60, 62, 63, 0, 62, 60, 59, 0, 56, 0, 57, 0, 0, 0], bass: [45, 45, 45, 45, 44, 44, 44, 44, 45, 45, 43, 43, 44, 44, 45, 45] },
    battle: { bpm: 168, lead: [69, 72, 76, 72, 69, 72, 76, 79, 77, 76, 74, 72, 74, 71, 67, 71, 69, 72, 76, 81, 79, 77, 76, 74, 72, 74, 76, 77, 76, 72, 69, 0], bass: [45, 45, 45, 45, 41, 41, 43, 43, 45, 45, 45, 45, 41, 43, 45, 45] },
    office: { bpm: 112, lead: [72, 0, 76, 79, 77, 0, 74, 0, 72, 0, 69, 72, 71, 0, 67, 0, 72, 0, 76, 79, 81, 0, 79, 77, 76, 74, 72, 74, 72, 0, 0, 0], bass: [48, 55, 45, 52, 41, 48, 43, 50, 48, 55, 45, 52, 41, 43, 48, 48] },
    boss: { bpm: 176, lead: [64, 64, 67, 64, 70, 69, 67, 64, 63, 63, 66, 63, 69, 67, 66, 63, 64, 67, 71, 76, 75, 71, 67, 64, 65, 64, 63, 62, 63, 66, 64, 0], bass: [40, 40, 40, 40, 39, 39, 39, 39, 40, 40, 43, 43, 39, 39, 40, 40] }
  };
  function music(name) {
    if (currentSong === name) return;
    currentSong = name;
    clearTimeout(musicTimer);
    if (!name || !S || !S.sound) return;
    const song = SONGS[name]; if (!song) return;
    const beat = 60 / song.bpm / 2;
    let i = 0;
    const tick = () => {
      if (currentSong !== name || !S.sound) return;
      const a = ac(); if (!a) return;
      tone(N(song.lead[i % song.lead.length]), beat * 0.9, "square", 0.022);
      if (i % 2 === 0) tone(N(song.bass[(i / 2) % song.bass.length]), beat * 1.8, "triangle", 0.05);
      i++;
      musicTimer = setTimeout(tick, beat * 1000);
    };
    tick();
  }
  function toggleSound() {
    S.sound = !S.sound;
    $("#btnSound").textContent = S.sound ? "SOUND" : "MUTED";
    const song = currentSong; currentSong = null;
    if (S.sound) music(song || W.MAPS[S.map].music); else clearTimeout(musicTimer);
    save();
  }

  // ---------- Rendering ----------
  function camera() {
    const m = W.MAPS[S.map], mw = m.rows[0].length * TILE, mh = m.rows.length * TILE;
    const p = heroPixel();
    const cx = mw <= VW * TILE ? (mw - VW * TILE) / 2 : Math.max(0, Math.min(mw - VW * TILE, p.x + 8 - (VW * TILE) / 2));
    const cy = mh <= VH * TILE ? (mh - VH * TILE) / 2 : Math.max(0, Math.min(mh - VH * TILE, p.y + 8 - (VH * TILE) / 2));
    return { x: Math.round(cx), y: Math.round(cy) };
  }
  function heroPixel() {
    if (!hero.moving) return { x: S.x * TILE, y: S.y * TILE };
    const k = hero.t / TILE;
    return { x: (hero.fromX + (S.x - hero.fromX) * k) * TILE, y: (hero.fromY + (S.y - hero.fromY) * k) * TILE };
  }
  function render() {
    ctx.fillStyle = "#0b0a12";
    ctx.fillRect(0, 0, 160, 144);
    if (!S) return;
    const m = W.MAPS[S.map], cam = camera();
    const x0 = Math.floor(cam.x / TILE), y0 = Math.floor(cam.y / TILE);
    const waterFrame = Math.floor(frame / 40) % 2;
    for (let y = y0; y <= y0 + VH; y++) {
      for (let x = x0; x <= x0 + VW; x++) {
        const ch = L.tileAt(S.map, x, y);
        if (ch == null) continue;
        let variant = 0;
        if (ch === "~") variant = waterFrame;
        if (ch === "C") { const c = chestAt(x, y); variant = c && S.flags.chests[c.id] ? 1 : 0; }
        ctx.drawImage(tileImg(ch, variant), x * TILE - cam.x, y * TILE - cam.y);
      }
    }
    // People, sorted by row so nearer ones overlap farther ones.
    const ents = W.NPCS.filter(n => n.map === S.map && L.npcVisible(S, n)).map(n => ({ n, pos: L.npcPos(S, n) }));
    const hp = heroPixel();
    const list = ents.map(e => ({ y: e.pos.y * TILE, draw: () => drawNpc(e.n, e.pos, cam) }));
    list.push({ y: hp.y, draw: () => ctx.drawImage(charImg("humanoid", "hero", S.dir, hero.moving && hero.t < 8 ? (hero.stepOdd ? 1 : 0) : 0), Math.round(hp.x - cam.x), Math.round(hp.y - cam.y)) });
    list.sort((a, b) => a.y - b.y).forEach(e => e.draw());
    if (career()) UI.drawOver(ctx, cam, frame);
    if (S.map === "cave" && !S.flags.boss) {
      // A faint purple glow in the boss room.
      ctx.fillStyle = `rgba(108,60,150,${0.08 + 0.05 * Math.sin(frame / 20)})`;
      ctx.fillRect(0, 0, 160, 144);
    }
  }
  function drawNpc(n, pos, cam) {
    const bob = Math.floor(frame / 30) % 2;
    const px = pos.x * TILE - cam.x, py = pos.y * TILE - cam.y;
    if (n.sprite === "boss") {
      ctx.drawImage(charImg("boss"), px - 8, py - 16 - bob * 2, 32, 32);
      return;
    }
    const dir = n.face || "down";
    ctx.drawImage(charImg(n.sprite, n.outfit, dir, 0), px, py - (n.sprite === "sage" ? bob : 0));
    if (n.id === "abacus" && !S.flags.tutorial && frame % 60 < 40) {
      ctx.fillStyle = "#1c1a2e"; ctx.fillRect(px + 6, py - 9, 4, 7);
      ctx.fillStyle = "#f4d24c"; ctx.fillRect(px + 7, py - 8, 2, 4); ctx.fillRect(px + 7, py - 3, 2, 1);
    }
  }
  function chestAt(x, y) { return W.CHESTS.find(c => c.map === S.map && c.x === x && c.y === y); }

  // ---------- HUD ----------
  function hud() {
    if (!S) return;
    if (career()) return UI.hud();
    $("#task").hidden = true;
    const p = S.player, max = L.maxHp(p.level);
    $("#hudPlace").textContent = W.MAPS[S.map].name;
    $("#hudStats").innerHTML = `<span>Lv${p.level}</span><span class="hp-mini"><i style="width:${Math.round(p.hp / max * 100)}%"></i></span><span>${p.hp}/${max}</span><span>💰${p.gold}</span>`;
  }

  // ---------- Game loop ----------
  function loop() {
    frame++;
    if (hero.moving) {
      hero.t += 2;
      if (hero.t >= TILE) { hero.moving = false; hero.t = 0; arrive(); }
    }
    render();
    requestAnimationFrame(loop);
  }

  function tryMove(dir) {
    if (busy || hero.moving) return false;
    S.dir = dir;
    const [dx, dy] = DELTA[dir];
    const nx = S.x + dx, ny = S.y + dy;
    if (!L.walkable(S, S.map, nx, ny)) { if (frame % 12 === 0) SFX.bump(); return false; }
    hero.fromX = S.x; hero.fromY = S.y;
    S.x = nx; S.y = ny;
    hero.moving = true; hero.t = 0; hero.stepOdd = !hero.stepOdd;
    return true;
  }

  async function arrive() {
    S.stats.steps++;
    if (S.cooldown > 0) S.cooldown--;
    const warp = (W.MAPS[S.map].warps || []).find(w => w.x === S.x && w.y === S.y);
    if (warp) { hero.queue = []; await changeMap(warp.to, warp.tx, warp.ty, warp.dir); return; }
    if (career() && UI.onStep()) { hero.queue = []; return; }
    if (L.tileAt(S.map, S.x, S.y) === "," && S.flags.tutorial && S.cooldown === 0 && rnd.chance(L.ENCOUNTER_RATE)) {
      hero.queue = [];
      S.cooldown = 4;
      await fight(L.encounter(S.player, rnd));
      return;
    }
    if (S.stats.steps % 15 === 0) save();
    continueWalking();
  }
  function continueWalking() {
    if (busy) return;
    if (hero.queue.length) {
      const next = hero.queue.shift();
      if (typeof next === "function") { next(); return; }
      if (!tryMove(next)) hero.queue = [];
    } else if (held) tryMove(held);
  }

  async function changeMap(to, x, y, dir) {
    busy = true;
    SFX.door();
    await fade(true);
    S.map = to; S.x = x; S.y = y; S.dir = dir;
    music(W.MAPS[to].music);
    hud();
    save();
    await fade(false);
    busy = false;
    if (to === "town" && !S.flags.tutorial) await tutorial();
    continueWalking();
  }
  function fade(on) {
    $("#fade").classList.toggle("on", on);
    return wait(200);
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));

  // ---------- Dialogue ----------
  let dlgResolve = null, typing = null;
  function say(text, who) {
    return new Promise(resolve => {
      busy = true;
      const box = $("#dialog");
      box.hidden = false;
      $("#dlgName").textContent = who || "";
      $("#dlgChoices").innerHTML = "";
      $("#dlgMore").hidden = true;
      const el = $("#dlgText");
      el.textContent = "";
      let i = 0;
      clearInterval(typing);
      typing = setInterval(() => {
        i += 2;
        el.textContent = text.slice(0, i);
        if (i % 6 === 0) SFX.blip();
        if (i >= text.length) { clearInterval(typing); typing = null; $("#dlgMore").hidden = false; }
      }, 22);
      dlgResolve = () => {
        if (typing) { clearInterval(typing); typing = null; el.textContent = text; $("#dlgMore").hidden = false; return; }
        dlgResolve = null;
        resolve();
      };
    });
  }
  async function sayAll(lines, who) { for (const l of lines) await say(l, who); }
  function ask(text, options, who) {
    return new Promise(resolve => {
      busy = true;
      $("#dialog").hidden = false;
      clearInterval(typing); typing = null;
      $("#dlgName").textContent = who || "";
      $("#dlgText").textContent = text;
      $("#dlgMore").hidden = true;
      const box = $("#dlgChoices");
      box.innerHTML = options.map((o, i) => `<button data-i="${i}">▸ ${esc(o)}</button>`).join("");
      dlgResolve = null;
      box.onclick = ev => {
        const b = ev.target.closest("button"); if (!b) return;
        SFX.select();
        box.onclick = null; box.innerHTML = "";
        resolve(+b.dataset.i);
      };
    });
  }
  function closeDialog() { $("#dialog").hidden = true; }
  $("#dialog").addEventListener("click", ev => { if (!ev.target.closest("button") && dlgResolve) dlgResolve(); });

  async function script(fn) {
    busy = true;
    hero.queue = [];
    try { await fn(); } finally { closeDialog(); busy = false; hud(); save(); }
  }

  // ---------- Interactions ----------
  function facing() { const [dx, dy] = DELTA[S.dir]; return { x: S.x + dx, y: S.y + dy }; }
  function interact() {
    if (busy || hero.moving) return;
    const f = facing();
    let npc = L.npcAt(S, S.map, f.x, f.y);
    if (!npc && "coj".includes(L.tileAt(S.map, f.x, f.y) || "?")) { // talk across a counter or a desk
      const [dx, dy] = DELTA[S.dir];
      npc = L.npcAt(S, S.map, f.x + dx, f.y + dy);
    }
    const t = L.tileAt(S.map, f.x, f.y);
    if (career()) return script(() => UI.use(npc, t));
    if (npc) return script(() => talk(npc));
    if (t === "S") return script(() => say(W.LINES.sign, "Signpost"));
    if (t === "W") return script(() => say(W.LINES.well));
    if (t === "C") return script(() => openChest(chestAt(f.x, f.y)));
    if (t === "B") return script(async () => {
      if (S.map === "home") { S.player.hp = L.maxHp(S.player.level); SFX.level(); await say(W.LINES.bed); }
      else await say(W.LINES.innBed);
    });
    if (t === "k") return script(() => say(S.map === "home" ? W.LINES.shelf : W.LINES.shopShelf));
    if (t === "t" && S.map === "home") return script(() => say(W.LINES.table));
  }

  async function openChest(c) {
    if (!c) return;
    if (S.flags.chests[c.id]) return say("The chest is empty. Like a balance sheet after a very bad year.");
    S.flags.chests[c.id] = true;
    SFX.coin();
    if (c.item === "gold") { S.player.gold += c.qty; return say(`You found ${c.qty} gold! Cash: an asset, and now yours.`); }
    S.player.items[c.item] = (S.player.items[c.item] || 0) + c.qty;
    return say(`You found ${c.qty} × ${W.ITEMS[c.item].name}! ${W.ITEMS[c.item].text}`);
  }

  function faceHero(n) {
    const p = L.npcPos(S, n);
    const dx = S.x - p.x, dy = S.y - p.y;
    n.face = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
  }

  async function talk(n) {
    faceHero(n);
    const who = n.name;
    try {
      if (n.id === "abacus") {
        if (!S.flags.tutorial) return tutorial();
        return say(rnd.pick(W.LINES.abacusTips), who);
      }
      if (n.id === "guard") {
        if (S.flags.boss) return say(W.LINES.guardAfter, who);
        if (!S.flags.tutorial) return say(W.LINES.guardNoIntro, who);
        if (S.player.level < 3) return say(`${W.LINES.guardNo} (You're level ${S.player.level}.)`, who);
        if (!S.flags.guardMoved) { await say(W.LINES.guardYes, who); S.flags.guardMoved = true; SFX.select(); }
        return;
      }
      if (n.id === "kid") return say(rnd.pick(W.LINES.kid), who);
      if (n.id === "farmer") return sayAll(W.LINES.farmer, who);
      if (n.id === "fisher") return sayAll(W.LINES.fisher, who);
      if (n.id === "miner") return say(W.LINES.miner, who);
      if (n.id === "merchant") return shop(who);
      if (n.id === "innkeeper") return inn(who);
      if (n.id === "boss") return bossFight();
    } finally { n.face = null; }
  }

  async function tutorial() {
    busy = true;
    const sage = W.NPCS.find(n => n.id === "abacus");
    S.dir = "right";
    faceHero(sage);
    await sayAll(W.LINES.abacusTutorial, sage.name);
    closeDialog();
    const result = await fight("dummy");
    if (result !== "won") return;
    S.flags.tutorial = true;
    await sayAll(W.LINES.abacusAfter, sage.name);
    await say("You got the Quill of Classification! (Press MENU or B any time for your status, items and the Codex.)");
    sage.face = null;
    closeDialog();
    busy = false;
    hud(); save();
  }

  async function shop(who) {
    await say(W.LINES.merchant, who);
    for (;;) {
      const p = S.player;
      const opts = [`Tea of Insight · 15g (you have ${p.items.tea || 0})`, `Herbal Balm · 10g (you have ${p.items.balm || 0})`];
      if (p.weapon !== "iron") opts.push("Iron Abacus · 60g (+3 attack)");
      opts.push("Leave");
      const c = await ask(`You have ${p.gold} gold. What would you like?`, opts, who);
      const pick = opts[c];
      if (pick === "Leave") return say("Come back soon! My revenue thanks you in advance. Well — on delivery.", who);
      const [id, price] = pick.startsWith("Tea") ? ["tea", 15] : pick.startsWith("Herbal") ? ["balm", 10] : ["iron", 60];
      if (p.gold < price) { await say("Not enough gold. I don't do credit — receivables make me nervous.", who); continue; }
      p.gold -= price;
      SFX.coin();
      if (id === "iron") { p.weapon = "iron"; await say("The Iron Abacus! Your attack rises by 3. For you it's an asset; for me, revenue.", who); }
      else { p.items[id] = (p.items[id] || 0) + 1; await say(`One ${W.ITEMS[id].name}. Pleasure doing business!`, who); }
      hud();
    }
  }

  async function inn(who) {
    const c = await ask(W.LINES.innkeeper, ["Rest (5 gold)", "No thanks"], who);
    if (c !== 0) return say("Suit yourself! The pillows will wait.", who);
    if (S.player.gold < 5) return say("Five gold, friend. The pillows don't pay for themselves.", who);
    S.player.gold -= 5;
    S.player.hp = L.maxHp(S.player.level);
    SFX.level();
    return say("You sleep like a balanced ledger. HP fully restored!", who);
  }

  async function bossFight() {
    await say(W.LINES.bossIntro, "The Box Mixer");
    closeDialog();
    const result = await fight("boss");
    if (result !== "won") return;
    S.flags.boss = true;
    await sayAll(W.LINES.bossWin);
    await sayAll(W.LINES.ending);
    closeDialog();
    await chapterComplete();
  }

  // ---------- Battles ----------
  let battleState = null;
  async function fight(enemyId) {
    busy = true;
    held = null;
    const def = W.ENEMIES[enemyId];
    SFX.encounter();
    const fadeEl = $("#fade");
    for (let i = 0; i < 3; i++) { fadeEl.classList.add("flash", "on"); await wait(70); fadeEl.classList.remove("on"); await wait(70); }
    fadeEl.classList.remove("flash");
    music(def.boss ? "boss" : "battle");
    const b = L.newBattle(enemyId, rnd);
    battleState = b;
    S.stats.battles++;
    const root = $("#battle");
    root.hidden = false;
    root.classList.toggle("cave", S.map === "cave");
    const foe = $("#foeCv");
    foe.className = "";
    const fctx = foe.getContext("2d");
    fctx.clearRect(0, 0, 16, 16);
    fctx.drawImage(charImg(def.sprite), 0, 0);
    $("#foeName").textContent = def.name;
    $("#foeLv").textContent = def.boss ? "BOSS" : "";
    updateBars(b);
    await message(def.training ? "Old Abacus sets up the Training Dummy. Classify each item to knock it down!" : def.boss ? "The Box Mixer attacks! Its crates rattle with misplaced coins." : `A wild ${def.name} appears!`);
    let result = null;
    while (!result) {
      const q = L.question(L.battleKind(b, rnd), rnd);
      const choice = await askBattle(q, b);
      if (choice === "fled") { result = "fled"; break; }
      const right = q.options[choice].correct;
      S.stats.answered++;
      if (right) S.stats.correct++;
      const out = L.resolve(b, S.player, right, rnd);
      if (right) { SFX.hit(); foe.classList.remove("hit"); void foe.offsetWidth; foe.classList.add("hit"); }
      else if (out.hurt) { SFX.hurt(); root.classList.remove("hurt"); void root.offsetWidth; root.classList.add("hurt"); }
      updateBars(b);
      await showResult(q, choice, out, def);
      if (out.phaseChanged) await message(`${def.name}: “${def.phases[b.phase].taunt}”`);
      if (out.won) result = "won";
      else if (out.lost) result = "lost";
    }
    if (result === "won") {
      foe.classList.add("gone");
      SFX.win();
      const rw = L.rewards(b, rnd);
      S.stats.won++;
      S.player.gold += rw.gold;
      const ups = L.gainXp(S.player, rw.xp);
      await message(`${def.name} is defeated! +${rw.xp} XP${rw.gold ? `, +${rw.gold} gold` : ""}.`);
      for (const u of ups) { SFX.level(); await message(`LEVEL UP! You are now level ${u.level}. Max HP ${u.maxHp}, attack ${u.atk}.${u.level === 3 ? " The guard by the cave might let you through now." : ""}`); }
    } else if (result === "lost") {
      await message(W.LINES.faint);
    } else {
      await message("You got away! Running from problems: not recommended in accounting.");
    }
    root.hidden = true;
    battleState = null;
    if (result === "lost") {
      S.player.gold = Math.floor(S.player.gold / 2);
      S.player.hp = L.maxHp(S.player.level);
      S.map = "home"; S.x = 4; S.y = 4; S.dir = "down";
    }
    currentSong = null;
    music(W.MAPS[S.map].music);
    busy = false;
    hud(); save();
    return result;
  }

  function updateBars(b) {
    const p = S.player, max = L.maxHp(p.level);
    const set = (el, v, m) => {
      const pct = Math.max(0, Math.round(v / m * 100));
      el.style.width = pct + "%";
      el.parentElement.classList.toggle("low", pct <= 50 && pct > 20);
      el.parentElement.classList.toggle("crit", pct <= 20);
    };
    set($("#foeHp"), b.hp, b.maxHp);
    set($("#meHp"), p.hp, max);
    $("#meLv").textContent = p.level;
    $("#meHpText").textContent = `${p.hp}/${max}`;
    $("#combo").textContent = b.streak >= 2 ? `STREAK ×${b.streak}${b.streak >= 3 ? " · COMBO!" : ""}` : "";
    $("#teaN").textContent = p.items.tea || 0;
    $("#balmN").textContent = p.items.balm || 0;
  }

  function message(text) {
    return new Promise(resolve => {
      $("#bPrompt").textContent = text;
      $("#bAsk").textContent = "";
      $("#bOptions").innerHTML = "";
      $("#bOptions").className = "";
      itemButtons(false);
      const res = $("#bResult");
      res.hidden = false;
      res.innerHTML = `<button id="bNext">CONTINUE ▶</button>`;
      $("#bNext").onclick = () => { SFX.blip(); res.hidden = true; resolve(); };
    });
  }

  function itemButtons(on, b, q, hidden) {
    const p = S.player;
    $("#useTea").disabled = !on || !(p.items.tea > 0) || !q || q.options.length <= 2 || hidden.some(Boolean);
    $("#useBalm").disabled = !on || !(p.items.balm > 0) || p.hp >= L.maxHp(p.level);
    $("#flee").disabled = !on || !b || b.def.boss || b.def.training;
  }

  function askBattle(q, b) {
    return new Promise(resolve => {
      $("#bPrompt").textContent = q.prompt;
      $("#bAsk").textContent = q.ask;
      $("#bResult").hidden = true;
      const box = $("#bOptions");
      let hidden = q.options.map(() => false);
      const draw = () => {
        box.className = q.options.length === 5 ? "five" : "";
        box.innerHTML = q.options.map((o, i) => `<button data-i="${i}" class="${hidden[i] ? "hidden-opt" : ""}">${esc(o.label)}</button>`).join("");
        itemButtons(true, b, q, hidden);
      };
      draw();
      box.onclick = ev => {
        const btn = ev.target.closest("button"); if (!btn) return;
        cleanup(); resolve(+btn.dataset.i);
      };
      $("#useTea").onclick = () => {
        if (!(S.player.items.tea > 0)) return;
        S.player.items.tea--; SFX.select();
        hidden = L.teaHides(q, rnd); draw(); updateBars(b);
      };
      $("#useBalm").onclick = () => {
        if (!(S.player.items.balm > 0)) return;
        S.player.items.balm--; SFX.level();
        S.player.hp = Math.min(L.maxHp(S.player.level), S.player.hp + 20);
        updateBars(b); draw();
      };
      $("#flee").onclick = () => {
        cleanup();
        if (rnd.chance(0.75)) { resolve("fled"); return; }
        const hurt = rnd.int(b.def.atk[0], b.def.atk[1]);
        S.player.hp = Math.max(1, S.player.hp - hurt);
        SFX.hurt(); updateBars(b);
        message(`You trip over a loose ledger and fail to escape! −${hurt} HP.`).then(() => askBattle(q, b).then(resolve));
      };
      function cleanup() { box.onclick = null; $("#useTea").onclick = $("#useBalm").onclick = $("#flee").onclick = null; itemButtons(false); }
    });
  }

  function showResult(q, choice, out, def) {
    return new Promise(resolve => {
      [...$("#bOptions").children].forEach((btn, i) => {
        btn.disabled = true;
        if (q.options[i].correct) btn.classList.add("right");
        else if (i === choice) btn.classList.add("wrong");
      });
      const right = q.options.find(o => o.correct).label;
      const res = $("#bResult");
      res.hidden = false;
      res.innerHTML = out.correct
        ? `<div class="verdict ok">${out.combo ? "COMBO! " : ""}CORRECT! −${out.damage} HP to ${esc(def.name)}</div><p>${esc(q.explain)}</p><button id="bNext">CONTINUE ▶</button>`
        : `<div class="verdict ko">${out.hurt ? `OUCH! −${out.hurt} HP` : "MISSED!"}</div><p class="cons">${esc(q.options[choice].consequence || "")}</p><p>Right answer: <b>${esc(right)}</b>. ${esc(q.explain)}</p><button id="bNext">CONTINUE ▶</button>`;
      res.scrollIntoView({ block: "nearest" });
      $("#bNext").onclick = () => { SFX.blip(); res.hidden = true; resolve(); };
    });
  }

  // ---------- Overlays: title, menu, ending ----------
  const overlay = $("#overlay");
  function showOverlay(html) { overlay.innerHTML = html; overlay.hidden = false; }
  function hideOverlay() { overlay.hidden = true; overlay.innerHTML = ""; }

  function titleScreen() {
    busy = true;
    S = null;
    held = null; hero.queue = []; hero.moving = false;
    clearTimeout(musicTimer); currentSong = null;
    $("#task").hidden = true;
    $("#hudPlace").textContent = "PolimiAFC"; $("#hudStats").innerHTML = "";
    const quest = load(QUEST_KEY), job = load(CAREER_KEY);
    showOverlay(`<div class="title">
      <h1 class="logo">POLIMI<br>AFC</h1>
      <p class="subtitle">AN ACCOUNTING GAME</p>
      <canvas id="titleCv" width="80" height="48"></canvas>
      <div class="mode">
        <h3>CAREER</h3>
        <p>PolimiAFC S.p.A. · from intern to partner. Keep the clients' books and the firm's own.</p>
        <div class="menu-list">
          ${job ? `<button data-t="cgo">▸ CONTINUE · ${esc((OL.rankFor(OL.normalizeCareer(job)).name || "").toUpperCase())}</button>` : ""}
          <button data-t="cnew">▸ NEW CAREER</button>
        </div>
      </div>
      <div class="mode">
        <h3>ADVENTURE</h3>
        <p>Ledger Quest · Chapter I, the Five Boxes. A pixel RPG.</p>
        <div class="menu-list">
          ${quest ? `<button data-t="qgo">▸ CONTINUE</button>` : ""}
          <button data-t="qnew">▸ NEW ADVENTURE</button>
        </div>
      </div>
      <div class="menu-list import"><button data-t="import">▸ IMPORT A SAVE</button><button data-t="update">⟳ UPDATE THE GAME</button></div>
      <p class="help">D-pad or tap to move · A to use · B for the menu</p>
    </div>`);
    const tc = $("#titleCv").getContext("2d");
    tc.imageSmoothingEnabled = false;
    let f = 0;
    const anim = () => {
      if (overlay.hidden || !$("#titleCv")) return;
      f++;
      tc.clearRect(0, 0, 80, 48);
      const hop = Math.abs(Math.sin(f / 12)) * 6;
      tc.drawImage(charImg("humanoid", "hero", "right", Math.floor(f / 10) % 2), 10, 26);
      tc.drawImage(charImg("humanoid", "giulia", "left", 0), 54, 26);
      tc.drawImage(charImg("page"), 32, 6 + Math.sin(f / 15) * 2 - hop / 3);
      requestAnimationFrame(anim);
    };
    anim();
    overlay.onclick = async ev => {
      const b = ev.target.closest("[data-t]"); if (!b) return;
      overlay.onclick = null;
      const t = b.dataset.t;
      if (t === "import") { await importScreen(); return; }
      if (t === "update") { refreshApp(); return; }
      if (t === "cnew" || t === "qnew") {
        const had = t === "cnew" ? job : quest;
        if (had && !confirm(t === "cnew" ? "Start a new career? Your saved career will be replaced." : "Start a new adventure? Your saved adventure will be replaced.")) { titleScreen(); return; }
      }
      if (t === "cnew") {
        S = OL.newCareer();
        startWorld();
        await script(UI.begin);
      } else if (t === "cgo") {
        resumeSave("career", job);
      } else if (t === "qnew") {
        S = L.newGame();
        startWorld();
        await script(async () => {
          await sayAll(W.LINES.intro, "Narrator");
          S.flags.intro = true;
          await say("Head out of the door (down, at the bottom) to meet Old Abacus.", "Tip");
        });
      } else {
        resumeSave("quest", quest);
      }
    };
  }
  function resumeSave(kind, data) {
    if (kind === "career") { S = OL.normalizeCareer(data); startWorld(); UI.resume(); }
    else { S = L.normalize(data); startWorld(); }
  }

  // ---------- Backups: export and import saves ----------
  const saveKey = kind => kind === "career" ? CAREER_KEY : QUEST_KEY;
  function describe(kind, d) {
    if (kind === "career") {
      const c = OL.normalizeCareer(d);
      return `${OL.rankFor(c).name} · day ${c.day}, Q${OL.quarterOf(c.day)} ${OL.calendarYear(c)} · ${c.xp} XP · €${Math.round(c.money).toLocaleString("en-US")}`;
    }
    const q = L.normalize(d);
    return `Level ${q.player.level} · ${q.player.gold} gold · ${W.MAPS[q.map].name}`;
  }
  async function saveFile(p) {
    const name = BK.fileName(p), text = BK.toText(p);
    const blob = new Blob([text], { type: "application/json" });
    try {
      const f = new File([blob], name, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        await navigator.share({ files: [f], title: "PolimiAFC save" });
        return "Shared. On iPhone, “Save to Files” keeps it in the Files app.";
      }
    } catch (e) {
      if (e && e.name === "AbortError") return "Cancelled.";
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return `Downloaded ${name}.`;
  }
  async function copyText(text, area) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      try { area.focus(); area.select(); return document.execCommand("copy"); } catch (e2) { return false; }
    }
  }
  function backupScreen(kind) {
    save();
    const p = BK.pack(kind, S);
    const code = BK.toCode(p);
    return new Promise(resolve => {
      showOverlay(`<div class="panel box"><h2>${kind === "career" ? "YOUR PERSONNEL FILE" : "SAVE BACKUP"}</h2>
        <p>${kind === "career" ? "Your career" : "Your adventure"}: ${esc(describe(kind, S))}</p>
        <p class="small">Keep a copy somewhere safe (the Files app, Notes, iCloud Drive or an email to yourself). To carry on, even on another device, choose IMPORT A SAVE on the title screen.</p>
        <div class="menu-list"><button data-b="file">▸ SAVE AS A FILE</button><button data-b="copy">▸ COPY THE CODE</button></div>
        <textarea class="code" readonly rows="3" aria-label="Save code">${esc(code)}</textarea>
        <p class="small bk-msg" id="bkMsg"></p>
        <div class="menu-list"><button data-m="back">▸ BACK</button></div></div>`);
      const msg = t => { $("#bkMsg").textContent = t; };
      overlay.onclick = async ev => {
        const b = ev.target.closest("[data-b], [data-m]"); if (!b) return;
        SFX.select();
        if (b.dataset.m === "back") { overlay.onclick = null; hideOverlay(); resolve(); return; }
        if (b.dataset.b === "file") msg(await saveFile(p));
        if (b.dataset.b === "copy") msg(await copyText(code, overlay.querySelector("textarea")) ? "Code copied. Paste it into Notes or a message to yourself." : "Couldn't copy automatically: select the code above and copy it.");
      };
    });
  }
  function importScreen() {
    return new Promise(resolve => {
      showOverlay(`<div class="panel box"><h2>IMPORT A SAVE</h2>
        <p class="small">Choose a backup file, or paste a save code. Career and adventure are recognised automatically.</p>
        <div class="menu-list"><label class="filebtn">▸ CHOOSE A FILE<input type="file" id="bkFile" accept=".json,application/json,text/plain"></label></div>
        <textarea class="code" id="bkCode" rows="3" placeholder="…or paste the code here (PAFC1-…)" aria-label="Save code"></textarea>
        <p class="small bk-msg" id="bkMsg"></p>
        <div class="menu-list"><button data-b="load">▸ LOAD THE CODE</button><button data-m="back">▸ BACK</button></div></div>`);
      const msg = t => { $("#bkMsg").textContent = t; };
      const use = text => {
        let got;
        try { got = BK.parse(text); } catch (e) { SFX.bump(); msg(e.message); return; }
        const name = got.kind === "career" ? "career" : "adventure";
        const existing = load(saveKey(got.kind));
        if (existing && !confirm(`Replace your saved ${name} with this one?\n\nNow: ${describe(got.kind, existing)}\nBackup: ${describe(got.kind, got.data)}`)) { msg("Nothing changed."); return; }
        const data = got.kind === "career" ? OL.normalizeCareer(got.data) : L.normalize(got.data);
        try { localStorage.setItem(saveKey(got.kind), JSON.stringify(data)); } catch (e) { msg("Couldn't store the save on this device."); return; }
        overlay.onclick = null;
        SFX.level();
        resolve();
        resumeSave(got.kind, data);
      };
      $("#bkFile").addEventListener("change", ev => {
        const f = ev.target.files && ev.target.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = () => use(String(r.result));
        r.onerror = () => msg("Couldn't read that file.");
        r.readAsText(f);
      });
      overlay.onclick = ev => {
        const b = ev.target.closest("[data-b], [data-m]"); if (!b) return;
        SFX.select();
        if (b.dataset.m === "back") { overlay.onclick = null; resolve(); titleScreen(); return; }
        if (b.dataset.b === "load") use($("#bkCode").value);
      };
    });
  }
  function startWorld() {
    hideOverlay();
    // Ask the browser not to clear the saves when space runs low.
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) {}
    $("#btnSound").textContent = S.sound ? "SOUND" : "MUTED";
    currentSong = null;
    music(W.MAPS[S.map].music);
    hud();
    busy = false;
    save();
  }

  function openMenu() {
    if (busy || hero.moving || !S) return;
    busy = true;
    if (career()) return UI.menu();
    const p = S.player, max = L.maxHp(p.level);
    const acc = S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) + "%" : "—";
    const page = main => showOverlay(`<div class="panel box">${main}</div>`);
    const menu = () => {
      page(`<h2>MENU</h2>
        <div class="row"><span>Level ${p.level}</span><span>HP ${p.hp}/${max}</span></div>
        <div class="row"><span>Attack ${L.attack(p)}</span><span>Gold ${p.gold}</span></div>
        <div class="row"><span>Next level</span><span>${L.xpToNext(p) ? L.xpToNext(p) + " XP" : "MAX"}</span></div>
        <div class="row"><span>Weapon</span><span>${esc(L.WEAPONS[p.weapon].name)}</span></div>
        <div class="row"><span>Battles won</span><span>${S.stats.won}</span></div>
        <div class="row"><span>Answers right</span><span>${acc}</span></div>
        <div class="menu-list">
          <button data-m="items">▸ ITEMS</button>
          <button data-m="codex">▸ CODEX</button>
          <button data-m="quest">▸ QUEST LOG</button>
          <button data-m="backup">▸ SAVE BACKUP</button>
          <button data-m="title">▸ TITLE SCREEN</button>
          <button data-m="close">▸ BACK TO THE GAME</button>
        </div>`);
    };
    menu();
    overlay.onclick = ev => {
      const b = ev.target.closest("[data-m]"); if (!b) return;
      SFX.select();
      const m = b.dataset.m;
      if (m === "close") { overlay.onclick = null; hideOverlay(); busy = false; hud(); save(); return; }
      if (m === "back") return menu();
      if (m === "title") { overlay.onclick = null; save(); titleScreen(); return; }
      if (m === "backup") { overlay.onclick = null; backupScreen("quest").then(() => { busy = false; openMenu(); }); return; }
      if (m === "useBalm") {
        if (p.items.balm > 0 && p.hp < L.maxHp(p.level)) { p.items.balm--; p.hp = Math.min(L.maxHp(p.level), p.hp + 20); SFX.level(); }
        return overlay.onclick({ target: { closest: () => ({ dataset: { m: "items" } }) } });
      }
      if (m === "items") return page(`<h2>ITEMS</h2>
        ${Object.keys(W.ITEMS).filter(id => id !== "iron").map(id => `<div class="row"><span>${esc(W.ITEMS[id].name)} ×${p.items[id] || 0}</span></div><p>${esc(W.ITEMS[id].text)}</p>`).join("")}
        <div class="menu-list">${p.items.balm > 0 && p.hp < L.maxHp(p.level) ? `<button data-m="useBalm">▸ USE A HERBAL BALM</button>` : ""}<button data-m="back">▸ BACK</button></div>`);
      if (m === "codex") return page(`<h2>CODEX · THE FIVE BOXES</h2><dl>${W.CODEX.map(([t, d]) => `<dt>${esc(t.toUpperCase())}</dt><dd>${esc(d)}</dd>`).join("")}</dl><div class="menu-list"><button data-m="back">▸ BACK</button></div>`);
      if (m === "quest") {
        const steps = [
          [S.flags.tutorial, "Meet Old Abacus and beat the Training Dummy"],
          [p.level >= 3, "Reach level 3 in the Meadow of Mixups (east, across the bridge)"],
          [S.flags.guardMoved, "Get past the guard at the Cave of Confusion (north)"],
          [S.flags.boss, "Defeat the Box Mixer and recover Page I"]
        ];
        return page(`<h2>QUEST LOG</h2>${steps.map(([done, t]) => `<div class="row"><span>${done ? "✔" : "□"} ${esc(t)}</span></div>`).join("")}
          <p>Chests found: ${Object.keys(S.flags.chests).length}/${W.CHESTS.length}</p><div class="menu-list"><button data-m="back">▸ BACK</button></div>`);
      }
    };
  }

  function chapterComplete() {
    return new Promise(resolve => {
      busy = true;
      SFX.level();
      const acc = S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0;
      showOverlay(`<div class="panel box cert">
        <h2>CHAPTER I COMPLETE</h2>
        <p class="big">PAGE I OF THE<br>GREAT LEDGER<br>RECOVERED</p>
        <div class="row"><span>Level</span><span>${S.player.level}</span></div>
        <div class="row"><span>Battles won</span><span>${S.stats.won}</span></div>
        <div class="row"><span>Answers right</span><span>${acc}%</span></div>
        <div class="row"><span>Steps walked</span><span>${S.stats.steps}</span></div>
        <p>Next: the Forest of Balance, where Assets = Liabilities + Equity. Coming soon!</p>
        <div class="menu-list"><button data-e="ok">▸ KEEP EXPLORING</button></div>
      </div>`);
      overlay.onclick = ev => {
        if (!ev.target.closest("[data-e]")) return;
        overlay.onclick = null; hideOverlay(); busy = false; resolve();
      };
    });
  }

  // ---------- Input ----------
  function pressA() {
    if (!overlay.hidden) return;
    if (!$("#dialog").hidden) { if (dlgResolve) dlgResolve(); return; }
    if (!$("#battle").hidden) return;
    interact();
  }
  function pressB() {
    if (!overlay.hidden) { const back = overlay.querySelector('[data-m="back"], [data-m="close"]'); if (back) back.click(); return; }
    if (!$("#dialog").hidden) { if (dlgResolve) dlgResolve(); return; }
    openMenu();
  }
  document.querySelectorAll(".dp[data-dir]").forEach(btn => {
    const dir = btn.dataset.dir;
    btn.addEventListener("pointerdown", ev => { ev.preventDefault(); ac(); held = dir; hero.queue = []; btn.classList.add("on"); if (!busy) tryMove(dir); else if (!$("#dialog").hidden && dlgResolve) dlgResolve(); });
    const up = () => { if (held === dir) held = null; btn.classList.remove("on"); };
    ["pointerup", "pointercancel", "pointerleave"].forEach(t => btn.addEventListener(t, up));
  });
  $("#btnA").addEventListener("pointerdown", ev => { ev.preventDefault(); ac(); pressA(); });
  $("#btnB").addEventListener("pointerdown", ev => { ev.preventDefault(); ac(); pressB(); });
  $("#btnMenu").addEventListener("click", () => { ac(); if ($("#dialog").hidden) openMenu(); });
  $("#btnSound").addEventListener("click", () => { if (S) toggleSound(); });
  $("#btnUpdate").addEventListener("click", () => refreshApp());

  // Update to the latest published version: save, fetch every file fresh (bypassing the browser cache),
  // clear this app's offline copy and reload. The saved game is kept.
  async function refreshApp() {
    const btn = $("#btnUpdate");
    if (!navigator.onLine) { btn.textContent = "OFFLINE"; setTimeout(() => { btn.textContent = "⟳ UPDATE"; }, 1500); return; }
    save();
    btn.textContent = "UPDATING…";
    btn.disabled = true;
    try {
      const files = ["./", "index.html", "manifest.json"].concat([...document.querySelectorAll("script[src], link[rel=stylesheet][href]")].map(el => el.getAttribute("src") || el.getAttribute("href")).filter(u => !/^https?:/.test(u)));
      await Promise.all(files.map(f => fetch(f, { cache: "reload" }).catch(() => {})));
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) await reg.update().catch(() => {});
      }
      if (window.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k.startsWith("ledger-quest:")).map(k => caches.delete(k)));
      }
    } catch (e) {}
    location.reload();
  }

  // Tap on the map: walk there, or walk next to a person or object and use it.
  cv.addEventListener("pointerdown", ev => {
    ac();
    if (!$("#dialog").hidden) { if (dlgResolve) dlgResolve(); return; }
    if (busy || !S) return;
    const r = cv.getBoundingClientRect(), cam = camera();
    const tx = Math.floor(((ev.clientX - r.left) / r.width * 160 + cam.x) / TILE);
    const ty = Math.floor(((ev.clientY - r.top) / r.height * 144 + cam.y) / TILE);
    if (tx === S.x && ty === S.y) return;
    const target = L.tileAt(S.map, tx, ty);
    if (target == null) return;
    let steps = L.walkable(S, S.map, tx, ty) ? L.path(S, S.map, S.x, S.y, tx, ty) : null;
    let then = null;
    if (!steps) {
      // Aim for the best neighbour, then face the tapped tile and use it.
      let best = null;
      for (const [d, [dx, dy]] of Object.entries(DELTA)) {
        const nx = tx - dx, ny = ty - dy;
        const p = nx === S.x && ny === S.y ? [] : L.walkable(S, S.map, nx, ny) ? L.path(S, S.map, S.x, S.y, nx, ny) : null;
        if (p && (!best || p.length < best.p.length)) best = { p, d };
      }
      if (!best) return;
      steps = best.p;
      then = () => { S.dir = best.d; interact(); };
    }
    hero.queue = steps.slice();
    if (then) hero.queue.push(then);
    if (!hero.moving) continueWalking();
  });

  const KEYS = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
  document.addEventListener("keydown", ev => {
    if (ev.target.closest && ev.target.closest("input, select, textarea")) return;
    if (ev.repeat && !KEYS[ev.key]) return;
    const dir = KEYS[ev.key];
    if (dir) { ev.preventDefault(); held = dir; hero.queue = []; if (!busy) tryMove(dir); return; }
    if (["z", "Z", "Enter", " "].includes(ev.key)) {
      ev.preventDefault(); ac();
      if (!overlay.hidden) { const b = overlay.querySelector("[data-t], [data-e], [data-go]"); if (b) b.click(); return; }
      if (!$("#battle").hidden) { const n = $("#bNext"); if (n && !$("#bResult").hidden) n.click(); return; }
      pressA();
    }
    if (["x", "X", "Escape"].includes(ev.key)) { ev.preventDefault(); pressB(); }
    if (!$("#battle").hidden && /^[1-5]$/.test(ev.key)) { const b = $(`#bOptions button[data-i="${+ev.key - 1}"]`); if (b && !b.disabled) b.click(); }
  });
  document.addEventListener("keyup", ev => { if (KEYS[ev.key] === held) held = null; });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { save(); clearTimeout(musicTimer); } else if (S) { const s = currentSong; currentSong = null; music(s); } });
  document.addEventListener("gesturestart", ev => ev.preventDefault());

  // Test hook for automated play-throughs (no effect on normal play).
  window.__quest = { state: () => S, battle: () => battleState, fight, changeMap, ui: UI };

  UI.install({
    state: () => S, rnd, say, sayAll, ask, closeDialog, script, showOverlay, hideOverlay, overlay, music, save, fade, wait,
    sfx: name => SFX[name] && SFX[name](), tileAt: L.tileAt, isBusy: () => busy, setBusy: v => { busy = v; },
    toTitle: () => { save(); titleScreen(); }, backup: () => backupScreen("career")
  });
  titleScreen();
  requestAnimationFrame(loop);

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
