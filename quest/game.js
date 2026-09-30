/* PolimiAFC — the engine: rendering, controls, dialogue, sound, saving and backups.
   The career itself (the office, the jobs, the books) lives in office-ui.js and the office-*.js rules. */
(function () {
  "use strict";
  const A = window.QuestArt, W = window.QuestWorld, L = window.QuestLogic, UI = window.OfficeUI, OL = window.OfficeLogic, BK = window.SaveBackup;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const TILE = 16, VW = 10, VH = 9;
  const DELTA = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const CAREER_KEY = "afc_career";
  const VERSION = 16; // shown on the title screen; the same number as the service worker cache (sw.js)

  const cv = $("#cv"), ctx = cv.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const rnd = L.rng((Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0);

  let S = null;                 // the saved career
  let busy = true;              // a script, a screen or the menu owns the input
  let frame = 0;
  const hero = { moving: false, t: 0, fromX: 0, fromY: 0, stepOdd: false, queue: [] };
  let held = null;

  // ---------- Storage ----------
  function load(key) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
  function save() { if (S) try { localStorage.setItem(CAREER_KEY, JSON.stringify(S)); } catch (e) {} }
  // The adventure mode was retired: drop its old save.
  try { localStorage.removeItem("quest_save"); } catch (e) {}

  // ---------- Art caches ----------
  const TILE_DEF = {
    "|": ["wall"], "x": ["mat"],
    "_": ["carpet"], "1": ["carpet", "cab1"], "2": ["carpet", "cab2"], "3": ["carpet", "cab3"], "4": ["carpet", "cab4"], "5": ["carpet", "cab5"],
    "d": ["carpet", "deskPC"], "L": ["carpet", "ledger"], "p": ["carpet", "plant"], "q": ["carpet", "coffee"], "i": ["carpet", "inbox"],
    "o": ["carpet", "bossDeskL"], "j": ["carpet", "bossDeskR"], "m": ["carpet", "table"], "v": ["wall", "boardL"], "V": ["wall", "boardR"], "O": ["wall", "officeWindow"]
  };
  const tileCache = {};
  function tileImg(ch) {
    if (tileCache[ch]) return tileCache[ch];
    const def = TILE_DEF[ch] || ["carpet"];
    const c = A.makeCanvas(16, 16), g = c.getContext("2d");
    if (def[0]) g.drawImage(A.ground(def[0]), 0, 0);
    if (def[1]) g.drawImage(A.paint(A.SPRITES[def[1]]), 0, 0);
    return (tileCache[ch] = c);
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
    hurt: () => { tone(160, 0.2, "sawtooth", 0.08); tone(90, 0.25, "square", 0.06, 0.1); },
    coin: () => { tone(988, 0.07, "square", 0.05); tone(1319, 0.14, "square", 0.05, 0.07); },
    level: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.12, "square", 0.06, i * 0.1)),
    ring: () => [0, 0.16, 0.5, 0.66].forEach(t => { tone(1320, 0.1, "square", 0.03, t); tone(1100, 0.1, "square", 0.03, t + 0.08); })
  };
  const N = n => n ? 440 * Math.pow(2, (n - 69) / 12) : 0; // MIDI note to Hz
  const SONGS = {
    office: { bpm: 112, lead: [72, 0, 76, 79, 77, 0, 74, 0, 72, 0, 69, 72, 71, 0, 67, 0, 72, 0, 76, 79, 81, 0, 79, 77, 76, 74, 72, 74, 72, 0, 0, 0], bass: [48, 55, 45, 52, 41, 48, 43, 50, 48, 55, 45, 52, 41, 43, 48, 48] },
    // Interviews and mock exams.
    battle: { bpm: 168, lead: [69, 72, 76, 72, 69, 72, 76, 79, 77, 76, 74, 72, 74, 71, 67, 71, 69, 72, 76, 81, 79, 77, 76, 74, 72, 74, 76, 77, 76, 72, 69, 0], bass: [45, 45, 45, 45, 41, 41, 43, 43, 45, 45, 45, 45, 41, 43, 45, 45] }
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
      if (currentSong !== name || !S || !S.sound) return;
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
    const cam = camera();
    const x0 = Math.floor(cam.x / TILE), y0 = Math.floor(cam.y / TILE);
    for (let y = y0; y <= y0 + VH; y++) {
      for (let x = x0; x <= x0 + VW; x++) {
        const ch = L.tileAt(S.map, x, y);
        if (ch != null) ctx.drawImage(tileImg(ch), x * TILE - cam.x, y * TILE - cam.y);
      }
    }
    // People, sorted by row so nearer ones overlap farther ones.
    const ents = W.NPCS.filter(n => n.map === S.map && L.npcVisible(S, n)).map(n => ({ n, pos: L.npcPos(S, n) }));
    const hp = heroPixel();
    const list = ents.map(e => ({ y: e.pos.y * TILE, draw: () => ctx.drawImage(charImg(e.n.sprite, e.n.outfit, e.n.face || "down", 0), e.pos.x * TILE - cam.x, e.pos.y * TILE - cam.y) }));
    list.push({ y: hp.y, draw: () => ctx.drawImage(charImg("humanoid", "hero", S.dir, hero.moving && hero.t < 8 ? (hero.stepOdd ? 1 : 0) : 0), Math.round(hp.x - cam.x), Math.round(hp.y - cam.y)) });
    list.sort((a, b) => a.y - b.y).forEach(e => e.draw());
    UI.drawOver(ctx, cam, frame);
  }

  // ---------- HUD ----------
  function hud() { if (S) UI.hud(); }

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

  function arrive() {
    S.stats.steps++;
    if (UI.onStep()) { hero.queue = []; return; }
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
    if (!npc && "oj".includes(L.tileAt(S.map, f.x, f.y) || "?")) { // talk across a desk
      const [dx, dy] = DELTA[S.dir];
      npc = L.npcAt(S, S.map, f.x + dx, f.y + dy);
    }
    const t = L.tileAt(S.map, f.x, f.y);
    return script(() => UI.use(npc, t));
  }

  // ---------- Overlays: title screen and backups ----------
  const overlay = $("#overlay");
  function showOverlay(html) { overlay.innerHTML = html; overlay.hidden = false; }
  function hideOverlay() { overlay.hidden = true; overlay.innerHTML = ""; }

  function titleScreen() {
    busy = true;
    S = null;
    held = null; hero.queue = []; hero.moving = false;
    clearTimeout(musicTimer); currentSong = null;
    $("#task").hidden = true;
    $("#tabBody").innerHTML = ""; $("#sheet").hidden = true;
    $("#hudPlace").textContent = "PolimiAFC"; $("#hudStats").innerHTML = "";
    const job = load(CAREER_KEY);
    showOverlay(`<div class="title">
      <h1 class="logo">POLIMI<br>AFC</h1>
      <p class="subtitle">AN ACCOUNTING CAREER</p>
      <p class="version">VERSION ${VERSION}</p>
      <canvas id="titleCv" width="80" height="48"></canvas>
      <div class="mode">
        <p>PolimiAFC S.p.A. · from intern to partner. Keep the clients' books and the firm's own, study at the consolidation and analysis desks, and take mock exams.</p>
        <div class="menu-list">
          ${job ? `<button data-t="cgo">▸ CONTINUE · ${esc((OL.rankFor(OL.normalizeCareer(job)).name || "").toUpperCase())}</button>` : ""}
          <button data-t="cnew">▸ NEW CAREER</button>
        </div>
      </div>
      <div class="menu-list import"><button data-t="import">▸ IMPORT A SAVE</button><button data-t="update">⟳ UPDATE THE GAME</button></div>
      <p class="help">Tap the office to walk and use things. Below the screen: the firm's books and the codex.</p>
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
      if (t === "cnew") {
        if (job && !confirm("Start a new career? Your saved career will be replaced.")) { titleScreen(); return; }
        S = OL.newCareer();
        startWorld();
        await script(UI.begin);
      } else resumeSave(job);
    };
  }
  function resumeSave(data) {
    S = OL.normalizeCareer(data);
    startWorld();
    UI.resume();
  }

  // ---------- Backups: export and import the career ----------
  function describe(d) {
    const c = OL.normalizeCareer(d);
    return `${OL.rankFor(c).name} · day ${c.day}, Q${OL.quarterOf(c.day)} ${OL.calendarYear(c)} · ${c.xp} XP · €${Math.round(c.money).toLocaleString("en-US")}`;
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
  function backupScreen() {
    save();
    const p = BK.pack("career", S);
    const code = BK.toCode(p);
    return new Promise(resolve => {
      showOverlay(`<div class="panel box"><h2>YOUR PERSONNEL FILE</h2>
        <p>Your career: ${esc(describe(S))}</p>
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
        <p class="small">Choose your personnel file, or paste its code.</p>
        <div class="menu-list"><label class="filebtn">▸ CHOOSE A FILE<input type="file" id="bkFile" accept=".json,application/json,text/plain"></label></div>
        <textarea class="code" id="bkCode" rows="3" placeholder="…or paste the code here (PAFC1-…)" aria-label="Save code"></textarea>
        <p class="small bk-msg" id="bkMsg"></p>
        <div class="menu-list"><button data-b="load">▸ LOAD THE CODE</button><button data-m="back">▸ BACK</button></div></div>`);
      const msg = t => { $("#bkMsg").textContent = t; };
      const use = text => {
        let got;
        try { got = BK.parse(text); } catch (e) { SFX.bump(); msg(e.message); return; }
        const existing = load(CAREER_KEY);
        if (existing && !confirm(`Replace your saved career with this one?\n\nNow: ${describe(existing)}\nBackup: ${describe(got.data)}`)) { msg("Nothing changed."); return; }
        const data = OL.normalizeCareer(got.data);
        try { localStorage.setItem(CAREER_KEY, JSON.stringify(data)); } catch (e) { msg("Couldn't store the save on this device."); return; }
        overlay.onclick = null;
        SFX.level();
        resolve();
        resumeSave(data);
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
    UI.menu();
  }

  // ---------- Input ----------
  function pressA() {
    if (!overlay.hidden) return;
    if (!$("#dialog").hidden) { if (dlgResolve) dlgResolve(); return; }
    interact();
  }
  function pressB() {
    if (!overlay.hidden) { const back = overlay.querySelector('[data-m="back"], [data-m="close"]'); if (back) back.click(); return; }
    if (!$("#dialog").hidden) { if (dlgResolve) dlgResolve(); return; }
    openMenu();
  }
  $("#btnMenu").addEventListener("click", () => { ac(); if ($("#dialog").hidden) openMenu(); });
  $("#btnSound").addEventListener("click", () => { if (S) toggleSound(); });
  $("#btnUpdate").addEventListener("click", () => refreshApp());

  // Update to the latest published version: save, fetch every file fresh (bypassing the browser cache),
  // clear this app's offline copy and reload. The saved career is kept.
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
    walkTo(Math.floor(((ev.clientX - r.left) / r.width * 160 + cam.x) / TILE), Math.floor(((ev.clientY - r.top) / r.height * 144 + cam.y) / TILE));
  });
  // Walks to a tile; if it can't be stood on (a desk, a person), walks next to it, faces it and uses it.
  function walkTo(tx, ty) {
    if (busy || !S) return;
    if (tx === S.x && ty === S.y) return;
    if (L.tileAt(S.map, tx, ty) == null) return;
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
  }

  const KEYS = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
  document.addEventListener("keydown", ev => {
    if (ev.target.closest && ev.target.closest("input, select, textarea")) return;
    if (ev.repeat && !KEYS[ev.key]) return;
    const dir = KEYS[ev.key];
    if (dir) { ev.preventDefault(); held = dir; hero.queue = []; if (!busy) tryMove(dir); return; }
    if (["z", "Z", "Enter", " "].includes(ev.key)) {
      ev.preventDefault(); ac();
      if (!overlay.hidden) { const b = overlay.querySelector("[data-t], [data-go]"); if (b) b.click(); return; }
      pressA();
    }
    if (["x", "X", "Escape"].includes(ev.key)) { ev.preventDefault(); pressB(); }
  });
  document.addEventListener("keyup", ev => { if (KEYS[ev.key] === held) held = null; });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { save(); clearTimeout(musicTimer); } else if (S) { const s = currentSong; currentSong = null; music(s); } });
  document.addEventListener("gesturestart", ev => ev.preventDefault());

  // Test hook for automated play-throughs (no effect on normal play).
  window.__quest = { state: () => S, ui: UI };

  UI.install({
    state: () => S, rnd, say, sayAll, ask, closeDialog, script, showOverlay, hideOverlay, overlay, music, save, fade, wait,
    sfx: name => SFX[name] && SFX[name](), tileAt: L.tileAt, isBusy: () => busy, setBusy: v => { busy = v; },
    toTitle: () => { save(); titleScreen(); }, backup: () => backupScreen(), walkTo: (x, y) => { ac(); walkTo(x, y); }
  });
  titleScreen();
  requestAnimationFrame(loop);

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
