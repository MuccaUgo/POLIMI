/* PolimiAFC — career mode on screen: the office, Giulia and Marco, and every job screen.
   The game engine (game.js) hands over its tools with install(); rules live in office-logic.js. */
(function () {
  "use strict";
  const W = window.QuestWorld, D = window.OfficeData, O = window.OfficeLogic, ST = window.OfficeStudy, X = window.OfficeExam;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const eur = O.eur;
  let E = null;           // the engine
  const S = () => E.state();

  // ---------- The office ----------
  W.MAPS.office = {
    name: "PolimiAFC", music: "office",
    rows: [
      "|OO||OvV||",
      "|12345_Lp|",
      "|________|",
      "|m_____oj|",
      "|________|",
      "|___d____|",
      "|p______q|",
      "|_____i__|",
      "||||xx||||"
    ],
    warps: []
  };
  "12345dLpqiojvVOm".split("").forEach(c => W.SOLID.add(c));
  const SPOT = { inbox: { x: 6, y: 7 }, desk: { x: 4, y: 5 }, books: { x: 7, y: 1 }, door: { x: 4, y: 8 } };
  const CABINETS = ["Assets", "Liabilities", "Equity", "Revenue", "Expenses"];
  const CAB_BLURB = [
    "What the business controls and will still be useful: cash, receivables, stock, machines.",
    "What the business owes to others: suppliers, banks, customers who paid in advance.",
    "The owners' stake: what they put in, plus the profits they left in the business.",
    "What the business earned by delivering goods and services in the period.",
    "What the business used up in the period to earn its revenue."
  ];

  const clientHere = s => {
    if (!s || s.mode !== "career") return null;
    const job = (s.queue || []).find(j => j.pickup === "inbox" && j.client);
    return job ? job.client : null;
  };
  const clientNpc = {
    id: "client", name: "Client", map: "office", x: 7, y: 7, sprite: "humanoid", outfit: "baker",
    visible(s) {
      const c = clientHere(s);
      if (!c) return false;
      this.outfit = D.CLIENTS[c].outfit;
      this.name = D.CLIENTS[c].name;
      return true;
    }
  };
  W.NPCS.push(
    { id: "giulia", name: "Giulia · CEO", map: "office", x: 8, y: 2, sprite: "humanoid", outfit: "giulia" },
    { id: "marco", name: "Marco · Senior", map: "office", x: 2, y: 3, sprite: "humanoid", outfit: "marco" },
    clientNpc
  );

  // ---------- Small helpers ----------
  const TYPE_LABEL = { sort: "FILING", quick: "PHONE CALL", spot: "FIND THE ERROR", build: "BUILD THE STATEMENTS", order: "YEAR-END CUT-OFF", fill: "FILL IN", posting: "THE COMPANY BOOKS", reclass: "ANALYSIS", mcq: "EXAM QUESTION" };
  const levelName = l => l === 3 ? "EXAM LEVEL" : `level ${l}`;
  const WHERE = { cabinet: "the right CABINET", desk: "YOUR DESK", books: "the company BOOKS", marco: "Marco", phone: "your phone" };
  const ELEMENT_SHORT = { Asset: "Asset", Liability: "Liab.", Equity: "Equity", Revenue: "Rev.", Expense: "Exp." };
  const article = w => /^[AEIOU]/i.test(w) ? "an" : "a";
  const clientLine = id => id ? `${D.CLIENTS[id].icon} ${esc(D.CLIENTS[id].name)}` : "🏢 PolimiAFC S.p.A.";
  function docName(job) {
    if (job.type === "posting") return `Memo: ${job.title}`;
    if (job.type === "mcq") return `Exam question · ${ST.TRACKS[job.track].short.toLowerCase()}`;
    if (job.type === "build") return `Year-end file · ${D.CLIENTS[job.client].name}`;
    if (job.type === "order") return `Cut-off pile · ${D.CLIENTS[job.client].name}`;
    if (job.type === "reclass") return `${job.docKind.split(" · ")[0]} · ${D.CLIENTS[job.client].name}`;
    if (job.doc) return `${job.doc.kind} · ${D.CLIENTS[job.client].name}`;
    return TYPE_LABEL[job.type];
  }

  // Reads numbers typed the Italian or the English way: "1.500", "1,500", "0,19", "-300".
  function num(v, decimals) {
    let t = String(v == null ? "" : v).replace(/[€\s]/g, "").replace(/−/g, "-");
    if (!t || t === "-") return null;
    if (decimals) { if (t.includes(",")) t = t.replace(/\./g, "").replace(",", "."); }
    else if (/[.,]/.test(t)) {
      const parts = t.split(/[.,]/);
      const last = parts[parts.length - 1];
      t = parts.length > 1 && last.length !== 3 ? parts.slice(0, -1).join("") + "." + last : parts.join("");
    }
    const n = Number(t);
    return isFinite(n) ? n : null;
  }

  // ---------- Drawing over the map ----------
  function bubble(ctx, x, y, color, mark, frame) {
    const bob = Math.floor(frame / 15) % 2;
    const px = x * 16 + 5, py = y * 16 - 9 - bob;
    ctx.fillStyle = "#1c1a2e"; ctx.fillRect(px - 1, py - 1, 8, 9);
    ctx.fillStyle = color; ctx.fillRect(px, py, 6, 7);
    ctx.fillStyle = "#1c1a2e";
    if (mark === "!") { ctx.fillRect(px + 2, py + 1, 2, 3); ctx.fillRect(px + 2, py + 5, 2, 1); }
    else if (mark === "?") { ctx.fillRect(px + 1, py + 1, 4, 1); ctx.fillRect(px + 4, py + 2, 1, 1); ctx.fillRect(px + 2, py + 3, 2, 1); ctx.fillRect(px + 2, py + 5, 2, 1); }
    else { ctx.fillRect(px + 1, py + 2, 4, 1); ctx.fillRect(px + 2, py + 3, 2, 1); ctx.fillRect(px + 1, py + 4, 4, 1); ctx.fillRect(px + 2, py + 5, 2, 1); }
  }
  // 3×5 pixel letters for the labels over the cabinets.
  const GLYPH = {
    A: [".#.", "#.#", "###", "#.#", "#.#"], B: ["##.", "#.#", "##.", "#.#", "##."], C: [".##", "#..", "#..", "#..", ".##"],
    E: ["###", "#..", "##.", "#..", "###"], H: ["#.#", "#.#", "###", "#.#", "#.#"], I: ["###", ".#.", ".#.", ".#.", "###"],
    L: ["#..", "#..", "#..", "#..", "###"], N: ["##.", "#.#", "#.#", "#.#", "#.#"], S: [".##", "#..", ".#.", "..#", "##."],
    T: ["###", ".#.", ".#.", ".#.", ".#."], ".": ["...", "...", "...", "...", ".#."], " ": ["...", "...", "...", "...", "..."]
  };
  function pixelText(ctx, text, x, y, color) {
    ctx.fillStyle = color;
    [...text].forEach((ch, k) => (GLYPH[ch] || GLYPH[" "]).forEach((row, j) => [...row].forEach((c, i) => { if (c === "#") ctx.fillRect(x + k * 4 + i, y + j, 1, 1); })));
  }
  // The cabinets grouped by statement: A, L, E in the balance sheet; R, X in the income statement.
  function statementLabels(ctx, cam) {
    const y = 9 - cam.y;
    ctx.fillStyle = "#26615f"; ctx.fillRect(16 - cam.x, y, 47, 7);
    ctx.fillStyle = "#8f2f2c"; ctx.fillRect(65 - cam.x, y, 30, 7);
    pixelText(ctx, "BAL. SHEET", 20 - cam.x, y + 1, "#fdfcf5");
    pixelText(ctx, "INC.ST.", 66 - cam.x, y + 1, "#fdfcf5");
  }
  function drawOver(ctx, cam, frame) {
    const s = S();
    if (!s || s.mode !== "career") return;
    statementLabels(ctx, cam);
    if (s.phase === "intro") return;
    const at = (p, color, mark) => bubble(ctx, p.x - cam.x / 16, p.y - cam.y / 16, color, mark, frame);
    const job = s.carrying;
    if (job) {
      if (job.work === "cabinet") [1, 2, 3, 4, 5].forEach(x => at({ x, y: 1 }, "#f4d24c", "?"));
      else if (job.work === "desk") at(SPOT.desk, "#93d46a", "v");
      else if (job.work === "books") at(SPOT.books, "#93d46a", "v");
    } else {
      const has = p => s.queue.some(j => j.pickup === p);
      if (has("inbox")) at(SPOT.inbox, "#f4d24c", "!");
      if (has("marco")) at(npcSpot("marco"), "#f4d24c", "!");
      if (has("giulia")) at(npcSpot("giulia"), "#f4d24c", "!");
      if (s.phase === "report") at(SPOT.books, "#93d46a", "v");
      if (s.phase === "home") { at(SPOT.door, "#93d46a", "v"); at({ x: 5, y: 8 }, "#93d46a", "v"); }
    }
    if (s.queue.some(j => j.pickup === "phone") && (!job || job.work !== "phone")) {
      // The phone rings: little sound waves over the desk.
      if (Math.floor(frame / 20) % 2 === 0) {
        const px = SPOT.desk.x * 16 - cam.x, py = SPOT.desk.y * 16 - cam.y;
        ctx.fillStyle = "#f4d24c";
        ctx.fillRect(px + 10, py + 1, 1, 3); ctx.fillRect(px + 13, py + 0, 1, 4); ctx.fillRect(px + 16, py + 1, 1, 3);
      }
      if (frame % 140 === 0 && !E.isBusy()) E.sfx("ring");
    }
  }
  const npcSpot = id => { const n = W.NPCS.find(n => n.id === id); return { x: n.x, y: n.y }; };

  // ---------- HUD and the task strip ----------
  function hud() {
    const s = S();
    const r = O.rankFor(s);
    document.querySelector("#hudPlace").textContent = `DAY ${s.day} · Q${O.quarterOf(s.day)} ${O.calendarYear(s)}`;
    document.querySelector("#hudStats").innerHTML = `<span>${esc(r.name.replace(" Accountant", "").toUpperCase())}</span><span>XP ${s.xp}</span><span>€${Math.round(s.money).toLocaleString("en-US")}</span>`;
    const task = document.querySelector("#task");
    task.hidden = false;
    task.textContent = taskText(s);
    refreshTab();
  }

  // ---------- Below the screen: BOOKS and CODEX ----------
  let tab = "books";
  try { tab = localStorage.getItem("afc_tab") === "codex" ? "codex" : "books"; } catch (e) {}
  function refreshTab(force) {
    const body = document.querySelector("#tabBody");
    if (!body) return;
    document.querySelectorAll("#tabs [data-tab]").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === tab ? "true" : "false"));
    if (tab === "books") { const s = S(); body.innerHTML = s && s.mode === "career" ? booksHtml(s) : ""; return; }
    // The codex is drawn once, so typing in the search box isn't interrupted.
    if (force || !body.querySelector("#codexQ")) { body.innerHTML = codexHtml(); filterCodex(body, ""); }
  }
  if (typeof document !== "undefined") {
    document.addEventListener("click", ev => {
      const b = ev.target.closest && ev.target.closest("#tabs [data-tab]");
      if (!b) return;
      tab = b.dataset.tab;
      try { localStorage.setItem("afc_tab", tab); } catch (e) {}
      refreshTab(true);
    });
    document.addEventListener("input", ev => { if (ev.target.id === "codexQ") filterCodex(document.querySelector("#tabBody"), ev.target.value); });
  }

  // PolimiAFC's balance sheet and income statement from the books, and how the clients are doing.
  function booksHtml(s) {
    const b = O.balances(s), acc = t => D.ACCOUNTS.filter(a => a.type === t), sum = t => acc(t).reduce((x, a) => x + b[a.id], 0);
    const profit = O.profitOf(b).profit; // revenue and expenses since the last closing entry
    const hide = s.phase === "report"; // no totals while the player writes the annual report
    const row = (name, v, cls = "") => `<div class="row ${cls}"><span>${esc(name)}</span><span>${eur(v)}</span></div>`;
    const lines = t => acc(t).filter(a => b[a.id] || a.type === "A").map(a => row(a.name, b[a.id])).join("");
    const tot = (name, v) => hide ? "" : row(name, v, "tot");
    const year = O.calendarYear(s);
    const clients = O.rankFor(s).clients.map(id => {
      const c = D.CLIENTS[id], hist = (s.clientRev[id] || []).slice(-8), sat = s.sat[id] == null ? 60 : s.sat[id];
      const last = hist[hist.length - 1], prev = hist.length > 1 ? hist[hist.length - 2] : c.base;
      const growth = last ? Math.round((last / prev - 1) * 1000) / 10 : 0, max = Math.max(1, ...hist);
      const spark = hist.length ? `<span class="spark">${hist.map(v => `<i style="height:${Math.max(8, Math.round(v / max * 100))}%"></i>`).join("")}</span>` : "";
      return `<div class="cl"><div class="row"><span>${c.icon} ${esc(c.name)}</span>${spark}</div>
        <div class="row small"><span>Satisfaction ${sat}%</span><span>${last ? `${eur(last)} last quarter (${growth >= 0 ? "+" : ""}${growth}%)` : esc(c.kind)}</span></div></div>`;
    }).join("");
    const done = s.jobsOk[O.quarterKey(s)] || 0;
    return `<div class="bk-h">🏢 POLIMIAFC S.P.A. · BALANCE SHEET TODAY</div>
      ${lines("A")}${tot("Total assets", sum("A"))}
      ${lines("L")}${tot("Total liabilities", sum("L"))}
      ${lines("E")}${hide ? "" : row(`Profit ${year} so far`, profit)}${tot("Total equity", sum("E") + profit)}
      ${tot("Total liabilities and equity", sum("L") + sum("E") + profit)}
      <div class="bk-h">📈 INCOME STATEMENT ${year} · SO FAR</div>
      ${acc("R").map(a => row(a.name, b[a.id])).join("")}${acc("X").filter(a => b[a.id]).map(a => row(a.name, -b[a.id])).join("")}
      ${tot("Profit", profit)}
      ${hide ? `<p class="small">Totals are hidden while you write the annual report.</p>` : ""}
      <div class="bk-h">🤝 CLIENTS</div>${clients}
      <p class="small">This quarter: ${done} job${done === 1 ? "" : "s"} done right → ${eur(done * D.FEE_PER_JOB)} to invoice at the quarter close.</p>`;
  }

  const CX = () => window.OfficeCodex;
  function codexHtml() {
    return `<input id="codexQ" type="search" placeholder="Search: NOWC, factoring, goodwill…" autocomplete="off" enterkeyhint="search">
      <div id="codexList">${CX().TOPICS.map(t => `<div class="cx-t" data-topic="${esc(t)}">${esc(t.toUpperCase())}</div>${CX().CODEX.filter(e => e[0] === t).map(([, term, def]) => `<div class="cx" data-topic="${esc(t)}" data-k="${esc((term + " " + def + " " + t).toLowerCase())}"><b>${esc(term)}</b><span>${esc(def)}</span></div>`).join("")}`).join("")}</div>
      <p class="small" id="codexNone" hidden>Nothing found. Try another word.</p>`;
  }
  function filterCodex(body, q) {
    if (!body) return;
    const t = String(q || "").trim().toLowerCase(), shown = new Set();
    body.querySelectorAll(".cx").forEach(el => { const on = !t || el.dataset.k.includes(t); el.hidden = !on; if (on) shown.add(el.dataset.topic); });
    body.querySelectorAll(".cx-t").forEach(el => { el.hidden = !shown.has(el.dataset.topic); });
    const none = body.querySelector("#codexNone");
    if (none) none.hidden = shown.size > 0;
  }
  function taskText(s) {
    if (s.phase === "intro") return "Your first day!";
    if (s.carrying) return `📄 ${docName(s.carrying)} → ${WHERE[s.carrying.work]}`;
    if (s.phase === "report") return "📘 Year end: write the ANNUAL REPORT at the books";
    if (s.phase === "home") return "✔ All done! Clock out by the door";
    const n = s.queue.length;
    const call = s.queue.some(j => j.pickup === "phone");
    const desk = s.activity === "cons" || s.activity === "fa" ? `${ST.TRACKS[s.activity].icon} ${levelName(ST.studyOf(s, s.activity).level)} · ` : "";
    return `${s.phase === "close" ? "Quarter close · " : desk}${n} job${n === 1 ? "" : "s"} left${call ? " · ☎ ringing!" : " · ! = pick up"}`;
  }

  // ---------- Walking onto the door mat ----------
  function onStep() {
    const s = S();
    if (!s || s.mode !== "career") return false;
    if (E.tileAt(s.map, s.x, s.y) !== "x") return false;
    E.script(async () => {
      if (s.phase === "home") return goHome();
      if (s.phase === "intro") return;
      const left = s.queue.length + (s.carrying ? 1 : 0);
      await E.say(s.phase === "report" ? "Not so fast! The annual report isn't going to write itself. (The company books, by the window.)" :
        `Leaving already? ${left} job${left === 1 ? " is" : "s are"} still waiting. Clients notice these things.`, "Giulia");
      s.y = 7; s.dir = "up";
    });
    return true;
  }

  // ---------- Interacting ----------
  async function use(npc, tile) {
    const s = S();
    if (s.phase === "intro") return begin();
    if (npc && npc.id === "giulia") return giulia();
    if (npc && npc.id === "marco") return marco();
    if (npc && npc.id === "client") return clientTalk(npc);
    if (tile && "12345".includes(tile)) return cabinet(+tile - 1);
    if (tile === "d") return desk();
    if (tile === "L") return books();
    if (tile === "i") return inbox();
    if (tile === "q") return E.say(`☕ ${pick(COFFEE)}`);
    if (tile === "p") return E.say("A ficus. It has survived three audits and one very long budget meeting.");
    if (tile === "v" || tile === "V") return fourStatements();
    if (tile === "O") return E.say("Milan in the rain. Somewhere out there, a client is losing a receipt.");
    if (tile === "m") return E.say("Marco's desk: three calculators, zero plants, one mug that says “I ♥ ACCRUALS”.");
    if (tile === "o" || tile === "j") return E.say("Giulia's desk. Talk to her — she's the one behind it.");
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const COFFEE = [
    "An espresso. The machine says: “Revenue follows the work, not the cash.” Odd machine.",
    "An espresso. Coffee bought for the office is an expense: it's used up today. Very used up.",
    "A cappuccino after 11am. Marco looks at you as if you'd booked a loan as revenue.",
    "An espresso. The capsules in the cupboard are supplies; the one in the machine is now an expense."
  ];

  // The day's jobs are planned once: `planned` remembers for which day, so a reload doesn't plan it again.
  function plan(s, jobs) {
    s.queue = jobs || O.planDay(s, E.rnd).jobs;
    s.planned = O.dayKey(s);
  }
  async function begin() {
    const s = S();
    const g = W.NPCS.find(n => n.id === "giulia");
    await E.sayAll(D.LINES.firstDay, g.name);
    s.phase = "work";
    plan(s);
    hud(); E.save();
    await E.say("Look for the ! marks: that's where work is waiting. Giulia has the first memo: tap her, or tap “Giulia's memo” in the list below the screen.", "Tip");
    await E.say("From tomorrow, every morning you choose the day's work: client bookkeeping, the consolidation desk or the financial analysis desk.", "Tip");
  }
  function resume() {
    const s = S();
    if (s.phase === "intro") return E.script(begin);
    if (!s.queue.length && !s.carrying) {
      if (s.phase === "work") {
        // Today's jobs are all done: move the day on instead of planning it again.
        if (s.planned === O.dayKey(s)) return E.script(() => afterJob());
        if (s.stats.days > 0) return E.script(chooseActivity);
        plan(s);
      } else if (s.phase === "close" || s.phase === "agm") return E.script(() => afterJob());
    }
    hud();
  }

  async function handsFull() {
    const s = S();
    return E.say(`Your hands are full: first take the ${docName(s.carrying)} to ${WHERE[s.carrying.work]}.`);
  }
  function take(job) {
    const s = S();
    s.queue = s.queue.filter(j => j.id !== job.id);
    s.carrying = job;
    E.sfx("select");
    hud();
  }

  async function giulia() {
    const s = S(), who = "Giulia";
    const memo = s.queue.find(j => j.pickup === "giulia");
    const opts = [];
    if (memo) opts.push("Take your memo");
    if (s.phase === "report") opts.push("About the annual report…");
    opts.push("Ask for a promotion interview", "How is the company doing?", "A copy of my personnel file", "Bye");
    const c = opts[await E.ask(memo ? `Giulia: “${memo.close ? "Quarter close. " : ""}${memo.title}: I have a memo for the books.”` : `Giulia: “${pick(D.LINES.giuliaIdle)}”`, opts, who)];
    E.closeDialog();
    if (c === "Take your memo") {
      if (s.carrying) return handsFull();
      take(memo);
      await memoCard(memo);
      return E.say("Take it to the company BOOKS (the big ledger by the window) and record it.", "Tip");
    }
    if (c === "About the annual report…") return E.say("Every figure comes from the books. Take the trial balance, build the income statement and the balance sheet, and don't forget EPS: the shareholders always ask.", who);
    if (c === "How is the company doing?") return dashboard();
    if (c === "Ask for a promotion interview") return interview();
    if (c === "A copy of my personnel file") return personnelFile();
  }

  // The career backup, asked of Giulia: your personnel file, to keep somewhere safe.
  async function personnelFile() {
    const who = "Giulia";
    await E.say("A copy of your personnel file? Sensible. Auditors love a backup, and so do I.", who);
    E.closeDialog();
    await E.backup();
    return E.say("Keep it somewhere safe. If this computer ever melts, bring it back through IMPORT A SAVE on the title screen and you'll be at your desk as if nothing happened.", who);
  }

  async function marco() {
    const s = S(), who = "Marco";
    const job = s.queue.find(j => j.pickup === "marco");
    if (!job) return E.say(pick(D.LINES.marcoIdle), who);
    if (s.carrying) return E.say("Busy? Finish that first, then come and save me from myself.", who);
    await E.say("Hey, can you check these for me? I filed them in a hurry — one's in the wrong cabinet. Don't tell Giulia.", who);
    E.closeDialog();
    take(job);
    return work(job);
  }

  async function clientTalk(npc) {
    const s = S(), c = clientHere(s);
    const lines = {
      forno: "Buongiorno! I dropped my papers in the inbox. There's flour on some of them. Sorry.",
      verdi: "Documents are in the inbox. We bill by the hour, so… no pressure.",
      hotel: "Our papers are in the inbox. Please file them before the summer season!",
      pixel: "Our docs are in the inbox. Also: is a GitHub subscription an asset? Asking for a friend."
    };
    return E.say(lines[c] || "My documents are in the inbox!", npc.name);
  }

  async function inbox() {
    const s = S();
    if (s.carrying) {
      if (s.carrying.pickup !== "inbox") return handsFull();
      const c = await E.ask(`Put the ${docName(s.carrying)} back in the inbox?`, ["Put it back", "Keep it"]);
      if (c === 0) { s.queue.unshift(s.carrying); s.carrying = null; hud(); }
      return;
    }
    const job = s.queue.find(j => j.pickup === "inbox");
    if (!job) return E.say("The inbox is empty. Enjoy it while it lasts.");
    take(job);
    E.closeDialog();
    await docCard(job);
  }

  async function desk() {
    const s = S();
    const call = s.queue.find(j => j.pickup === "phone");
    const job = s.carrying;
    if (call && job && job.work === "desk") {
      const c = await E.ask("The phone is ringing!", ["Answer the phone", `Work on the ${docName(job)}`]);
      E.closeDialog();
      if (c === 1) return work(job);
    }
    if (call) {
      s.queue = s.queue.filter(j => j.id !== call.id);
      E.closeDialog();
      E.sfx("select");
      return work(call);
    }
    if (job && job.work === "desk") { E.closeDialog(); return work(job); }
    if (job) return E.say(`That doesn't go on your desk: take it to ${WHERE[job.work]}.`);
    return E.say(s.queue.length ? "Your desk. Nothing on it yet: pick up work where you see a ! mark." : "Your desk, finally tidy. Suspicious.");
  }

  async function books() {
    const s = S();
    const job = s.carrying;
    if (job && job.work === "books") { E.closeDialog(); return work(job); }
    if (job) return E.say(`The company books are for PolimiAFC's own entries. The ${docName(job)} goes to ${WHERE[job.work]}.`);
    if (s.phase === "report" && !s.queue.length) { E.closeDialog(); return annualReport(); }
    E.closeDialog();
    return companyBooks();
  }

  async function cabinet(i) {
    const s = S(), job = s.carrying;
    if (!job || job.type !== "sort") return E.say(`The ${CABINETS[i].toUpperCase()} cabinet, part of the ${i < 3 ? "BALANCE SHEET (the position on one date)" : "INCOME STATEMENT (the flows of the year)"}. ${CAB_BLURB[i]}`);
    const c = await E.ask(`File “${job.doc.lines[0][1]}” in the ${CABINETS[i].toUpperCase()} cabinet (${i < 3 ? "balance sheet" : "income statement"})?`, ["Yes, file it", "Not yet"]);
    if (c !== 0) return;
    E.closeDialog();
    return finish(job, D.ELEMENTS[i]);
  }

  // ---------- Doing a job ----------
  async function work(job) {
    const answer = await screenFor(job);
    return finish(job, answer);
  }
  let current = null;
  function screenFor(job, ctx) {
    current = job;
    if (job.type === "fill") return fillScreen(job, ctx);
    if (job.type === "spot") return spotScreen(job, ctx);
    if (job.type === "build") return buildScreen(job, ctx);
    if (job.type === "order") return orderScreen(job, ctx);
    if (job.type === "quick") return quickScreen(job, ctx);
    if (job.type === "posting") return postingScreen(job, ctx);
    if (job.type === "reclass") return reclassScreen(job, ctx);
    if (job.type === "mcq") return mcqScreen(job, ctx);
    return Promise.resolve(null);
  }
  async function finish(job, answer) {
    const s = S();
    // A job already finished (possible only after a reload) is never graded, paid or posted again.
    if (job.id && !O.markDone(s, job.id)) { s.carrying = null; hud(); E.save(); return afterJob(); }
    const g = O.grade(job, answer);
    s.stats.jobs++;
    if (g.ok) s.stats.right++;
    const before = O.interviewStatus(s).state;
    const rw = O.reward(s, job, g.ok);
    const newLevel = ST.recordStudy(s, job, g.ok);
    recordPattern(s, job, g.ok);
    if (job.type === "posting") O.post(s, job.title, job.lines, "", job.agm ? { year: s.year + 1, q: 1, day: 1 } : null, job.id);
    s.carrying = null;
    const next = O.advance(s);
    E.sfx(g.ok ? "coin" : "hurt");
    hud(); E.save();
    await resultScreen(job, g, answer, rw);
    if (newLevel) {
      E.sfx("level");
      await E.say(`${ST.TRACKS[job.track].name}: you've reached ${newLevel === 3 ? "the EXAM LEVEL. From now on the files look like the past exams" : `level ${newLevel}. Harder files from tomorrow`}.`, "Giulia");
    }
    const st = O.interviewStatus(s);
    if (before === "needXp" && st.state === "ready") {
      await E.say(`You have enough experience to interview for ${st.rank.name}. It's never automatic: ask me whenever you feel ready.`, "Giulia");
    }
    await afterJob(next);
  }

  // What Giulia says once the queue is empty. The state has already moved on (O.advance, saved with
  // the last job), so this part is only words and screens: a reload here loses nothing and repeats nothing.
  async function afterJob(next) {
    const s = S();
    if (next === undefined) { next = O.advance(s); hud(); E.save(); }
    hud();
    const q = O.quarterOf(s.day);
    if (next === "close") return E.say(`Last day of Q${q}! Before anyone goes home, we close the quarter: invoices, rent, salaries. My memos are waiting.`, "Giulia");
    if (next === "home") return E.say("That's everything for today. Clock out by the door and collect your pay!", "Tip");
    if (next === "closed" || next === "report") await dashboard(`Q${q} ${O.calendarYear(s)} IS CLOSED`);
    if (next === "closed") return E.say("Quarter closed. Clock out by the door!", "Tip");
    if (next === "report") return E.sayAll([
      "Year end! The shareholders want the annual report: income statement, balance sheet and earnings per share.",
      "Take the figures from the company books. If it balances, the coffee's on me. The good one."
    ], "Giulia");
    if (next === "agm") return E.say(`Year ${O.calendarYear(s)} is in the books. Go home, you've earned it.`, "Giulia");
  }

  async function goHome() {
    const s = S();
    const r = O.rankFor(s);
    const pay = r.salary + (s.bonus || 0);
    await payslip(r, s.bonus || 0);
    s.money += pay;
    s.bonus = 0;
    s.stats.days++;
    s.day++;
    let newYear = false;
    if (s.day > 12) { s.day = 1; s.year++; newYear = true; }
    await E.fade(true);
    s.x = 4; s.y = 6; s.dir = "up";
    s.phase = "work";
    s.queue = [];
    hud(); E.save();
    await E.fade(false);
    if (s.stats.days === 1) await E.say("One more thing, now that you're on the payroll: whenever you want a copy of your personnel file, just ask me. Keep it safe, and your career is safe.", "Giulia");
    if (newYear) await E.say(`Happy new year! ${O.calendarYear(s)} starts. The books carry on: last year's balances are this year's opening ones.`, "Giulia");
    else if (O.quarterOf(s.day) !== O.quarterOf(s.day - 1)) await E.say(`A new quarter begins: Q${O.quarterOf(s.day)}.`, "Tip");
    await chooseActivity();
  }

  // Results by exam pattern, to show the weak spots.
  function recordPattern(s, job, ok) {
    if (!job.pattern) return;
    s.patterns = s.patterns || {};
    const p = s.patterns[job.pattern] || (s.patterns[job.pattern] = [0, 0]);
    if (ok) p[0]++;
    p[1]++;
  }

  // A mock exam: eight past-exam style questions in a row, two points each.
  async function mockExam() {
    const s = S();
    const jobs = X.mockExam(E.rnd, s);
    await E.say(`Mock exam: ${jobs.length} questions like the written exam, financial accounting and consolidation. Paper and pen ready. No hints until the end of each question.`, "Giulia");
    E.closeDialog();
    E.music("battle");
    const res = [];
    for (let i = 0; i < jobs.length; i++) {
      const ctx = { mock: true, n: i + 1, of: jobs.length };
      const answer = await screenFor(jobs[i], ctx);
      const g = O.grade(jobs[i], answer);
      res.push(g.ok);
      recordPattern(s, jobs[i], g.ok);
      O.reward(s, Object.assign({}, jobs[i], { client: null }), g.ok);
      E.sfx(g.ok ? "coin" : "hurt");
      await resultScreen(jobs[i], g, answer, null, ctx);
    }
    E.music("office");
    const score = res.filter(Boolean).length, pts = score * 2, max = jobs.length * 2;
    s.mock = s.mock || { runs: 0, best: 0, last: 0 };
    s.mock.runs++; s.mock.last = pts; s.mock.best = Math.max(s.mock.best, pts);
    hud(); E.save();
    E.sfx(score / jobs.length >= 0.75 ? "level" : "blip");
    await screen(`<div class="jhead"><span>📝 MOCK EXAM</span><span>RESULT</span></div>
      <div class="verdict ${score / jobs.length >= 0.6 ? "ok" : "ko"}">${pts}/${max} POINTS</div>
      <ul class="res">${jobs.map((j, i) => `<li class="${res[i] ? "y" : "n"}">${res[i] ? "✔" : "✘"} ${esc(j.pattern || "Theory")}</li>`).join("")}</ul>
      <p class="small">${score / jobs.length >= 0.75 ? "Exam-ready on this set. Keep it up." : score / jobs.length >= 0.5 ? "Close. Practise the ✘ patterns on the desks, then try again." : "Not yet: go back to the desks for the ✘ patterns."} Your weak spots are in the menu.</p>${go("BACK TO THE OFFICE ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
  }

  // Each morning: the day's work. Giulia's memos for the company books arrive whatever you choose.
  async function chooseActivity() {
    const s = S();
    const opts = ["📒 Client bookkeeping", `🏢 Consolidation desk · ${levelName(ST.studyOf(s, "cons").level)}`, `📊 Financial analysis desk · ${levelName(ST.studyOf(s, "fa").level)}`, "📝 Mock exam (8 questions)"];
    const c = await E.ask("Good morning! What's on your plate today? (My memos for the company books come either way.)", opts, "Giulia");
    E.closeDialog();
    if (c === 3) {
      s.activity = "books";
      await mockExam();
      const ev = O.firmEvent(s);
      plan(s, ev ? [ev] : []);
      hud(); E.save();
      if (!s.queue.length) return afterJob();
      return E.say("After the mock exam, just my memo for the books today. Then you can go home.", "Giulia");
    }
    s.activity = ["books", "cons", "fa"][c];
    plan(s);
    hud(); E.save();
    if (s.activity !== "books") await E.say(`${ST.TRACKS[s.activity].name}: the files are in the inbox. Each one climbs towards the level of the written exam.`, "Tip");
  }

  // ---------- Screens ----------
  const overlay = () => E.overlay;
  function screen(html, bind) {
    return new Promise(resolve => {
      E.showOverlay(`<div class="panel box job">${html}</div>`);
      const root = overlay();
      root.scrollTop = 0;
      bind(root, v => { root.onclick = null; root.oninput = null; root.onchange = null; resolve(v); });
    });
  }
  const head = (job, ctx) => `<div class="jhead"><span>${ctx && ctx.mock ? "📝 PAST-EXAM STYLE" : job.track ? `${ST.TRACKS[job.track].icon} ${esc(ST.TRACKS[job.track].short)}` : clientLine(job.client)}</span><span>${ctx && ctx.mock ? `MOCK EXAM ${ctx.n}/${ctx.of}` : ctx && ctx.interview ? `INTERVIEW ${ctx.n}/${ctx.of}` : job.track ? levelName(job.level).toUpperCase() : job.typeLabel || TYPE_LABEL[job.type]}</span></div>`;
  const docHtml = doc => `<div class="doc"><div class="doc-kind">${esc(doc.kind)}</div><div class="doc-title">${esc(doc.title)}</div>
    <table>${doc.lines.map((row, i) => i === 0 && row[0] === "" ? `<tr class="th">${row.map(c => `<th>${esc(c)}</th>`).join("")}</tr>` : `<tr>${row.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>
    ${doc.facts ? `<ul class="facts">${doc.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}</div>`;
  const chips = (group, values, labels) => `<div class="chips" data-g="${group}">${values.map((v, i) => `<button type="button" data-v="${esc(v)}">${esc(labels ? labels[i] : v)}</button>`).join("")}</div>`;
  const numInput = (key, label, neg) => `<label class="fld"><span>${esc(label)}</span><span class="inp">${neg ? `<button type="button" class="neg" data-neg="${key}">±</button>` : ""}<input data-k="${key}" inputmode="decimal" autocomplete="off" enterkeyhint="done" placeholder="${/%/.test(label) ? "%" : /€/.test(label) ? "€" : ""}"></span></label>`;
  // Chip groups: one choice per group, kept in `state`.
  function chipHandler(root, state, ev) {
    const neg = ev.target.closest("[data-neg]");
    if (neg) {
      const inp = root.querySelector(`input[data-k="${neg.dataset.neg}"]`);
      inp.value = inp.value.startsWith("-") ? inp.value.slice(1) : "-" + inp.value;
      return true;
    }
    const b = ev.target.closest(".chips button");
    if (!b) return false;
    const g = b.parentElement;
    g.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    state[g.dataset.g] = b.dataset.v;
    E.sfx("blip");
    return true;
  }
  function nag(root, text) {
    const n = root.querySelector(".nag");
    n.textContent = text;
    n.classList.remove("shake"); void n.offsetWidth; n.classList.add("shake");
    E.sfx("bump");
  }
  const go = (label) => `<p class="nag"></p><button type="button" class="go" data-go>${label || "SUBMIT ▶"}</button>`;

  function docCard(job) {
    let body = "";
    if (job.doc) body = docHtml(job.doc);
    else if (job.type === "build") body = `<div class="doc"><div class="doc-kind">Year-end file</div><div class="doc-title">${job.items.length} items to place</div></div>`;
    else if (job.type === "order") body = `<div class="doc"><div class="doc-kind">Cut-off pile</div><div class="doc-title">${job.items.length} documents from around New Year</div></div>`;
    else if (job.type === "mcq") body = `<div class="doc"><div class="doc-kind">Exam question</div><div class="doc-title">One question, four answers</div></div>`;
    else if (job.type === "reclass") body = `<div class="doc"><div class="doc-kind">${esc(job.docKind)}</div><div class="doc-title">${job.items.length} items to classify</div></div>`;
    return screen(`${head(job)}${body}<p class="brief">${esc(job.brief || "")}</p>
      <p class="where">Take it to <b>${esc(WHERE[job.work])}</b>.</p>${go("GOT IT ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.sfx("blip"); E.hideOverlay(); done(); } };
    });
  }
  function memoCard(job) {
    return screen(`${head(job)}<div class="doc memo"><div class="doc-kind">Memo from Giulia</div><div class="doc-title">${esc(job.title)}</div><p>${esc(job.memo)}</p></div>
      <p class="where">Record it in <b>the company BOOKS</b>.</p>${go("GOT IT ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.sfx("blip"); E.hideOverlay(); done(); } };
    });
  }

  function fillScreen(job, ctx) {
    return screen(`${head(job, ctx)}${docHtml(job.doc)}<p class="brief">${esc(job.brief)}</p>
      ${job.fields.map(f => numInput(f.key, f.label, f.neg)).join("")}
      ${job.choice ? `<div class="lbl">${esc(job.choice.label)}</div>${chips("choice", job.choice.options)}` : ""}${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        const values = {};
        for (const f of job.fields) {
          const v = num(root.querySelector(`input[data-k="${f.key}"]`).value, f.dec);
          if (v == null) return nag(root, "Fill in every amount first.");
          values[f.key] = v;
        }
        if (job.choice && !st.choice) return nag(root, "Choose where it goes.");
        E.hideOverlay();
        done({ values, choice: st.choice });
      };
    });
  }

  function spotScreen(job, ctx) {
    return screen(`${head(job, ctx)}<p class="brief">${esc(job.brief)}</p>
      <div class="chips list" data-g="line">${job.lines.map((l, i) => `<button type="button" data-v="${i}"><span>${esc(l.item)} · ${eur(l.amount)}</span><em>filed as ${esc(l.filed)}</em></button>`).join("")}</div>
      <div class="lbl">It should be…</div>${chips("fix", D.ELEMENTS)}${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        if (st.line == null) return nag(root, "Tap the line that's filed wrong.");
        if (!st.fix) return nag(root, "Choose the right cabinet for it.");
        E.hideOverlay();
        done({ line: +st.line, fix: st.fix });
      };
    });
  }

  function buildScreen(job, ctx) {
    return screen(`${head(job, ctx)}<p class="brief">${esc(job.brief)}</p>
      ${job.items.map((it, i) => `<div class="item"><div>${esc(it.item)} <b>${eur(it.amount)}</b></div>${chips("b" + i, D.ELEMENTS, D.ELEMENTS.map(e => ELEMENT_SHORT[e]))}</div>`).join("")}
      <p class="small">Income statement: revenue and expenses. Balance sheet: assets, liabilities and equity.</p>
      ${job.askProfit ? numInput("profit", "Profit (revenue − expenses) (€)", true) : ""}${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        const placed = job.items.map((_, i) => st["b" + i]);
        if (placed.some(p => !p)) return nag(root, "Place every item first.");
        let profit = null;
        if (job.askProfit) { profit = num(root.querySelector('input[data-k="profit"]').value); if (profit == null) return nag(root, "Work out the profit too."); }
        E.hideOverlay();
        done({ placed, profit });
      };
    });
  }

  function orderScreen(job, ctx) {
    return screen(`${head(job, ctx)}<p class="brief">${esc(job.brief)}</p>
      ${job.items.map((it, i) => `<div class="item"><div>${esc(it.text)}</div>${chips("o" + i, job.years.map(String))}</div>`).join("")}${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        const years = job.items.map((_, i) => st["o" + i] ? +st["o" + i] : null);
        if (years.some(y => y == null)) return nag(root, "Choose a year for every document.");
        E.hideOverlay();
        done({ years });
      };
    });
  }

  function quickScreen(job, ctx) {
    E.sfx("ring");
    return screen(`${head(job, ctx)}<div class="call">☎ <b>${esc(D.CLIENTS[job.client].name)}</b> on the line:</div>
      <p class="question">“${esc(job.question)}”</p>
      <div class="timer"><i></i></div>
      <div class="opts">${job.options.map((o, i) => `<button type="button" data-i="${i}">${esc(o.label)}</button>`).join("")}</div>`, (root, done) => {
      const bar = root.querySelector(".timer i");
      const t0 = Date.now(), total = job.seconds * 1000;
      let over = false;
      const finish = v => { if (over) return; over = true; clearInterval(tick); E.hideOverlay(); done(v); };
      const tick = setInterval(() => {
        const left = Math.max(0, 1 - (Date.now() - t0) / total);
        bar.style.width = (left * 100) + "%";
        bar.parentElement.classList.toggle("low", left < 0.3);
        if (left <= 0) finish("timeout");
      }, 100);
      root.onclick = ev => {
        const b = ev.target.closest("[data-i]");
        if (b) { E.sfx("select"); finish(job.options[+b.dataset.i]); }
      };
    });
  }

  function mcqScreen(job, ctx) {
    return screen(`${head(job, ctx)}${job.pattern ? `<div class="lbl">${esc(job.pattern)}</div>` : ""}<p class="small">${esc(job.brief)}</p>${job.doc ? docHtml(job.doc) : ""}<p class="question">${esc(job.question)}</p>
      <div class="chips list" data-g="a">${job.options.map((o, i) => `<button type="button" data-v="${i}"><span>${"ABCD"[i]}. ${esc(o.label)}</span></button>`).join("")}</div>${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        if (st.a == null) return nag(root, "Choose an answer.");
        E.hideOverlay();
        done(job.options[+st.a]);
      };
    });
  }

  function reclassScreen(job, ctx) {
    return screen(`${head(job, ctx)}<div class="doc"><div class="doc-kind">${esc(job.docKind)}</div></div><p class="brief">${esc(job.brief)}</p>
      ${job.cats ? `<p class="small">${job.cats.map((c, i) => job.short[i] === c ? "" : `<b>${esc(job.short[i])}</b> = ${esc(c)}`).filter(Boolean).join(" · ")}${job.cats.includes("NOWC") ? " · <b>NOWC</b> = net operating working capital · <b>NFP</b> = net financial position" : ""}</p>` : ""}
      ${job.note ? `<p class="small">${esc(job.note)}</p>` : ""}
      ${job.items.map((it, i) => `<div class="item"><div>${esc(it.label)}${it.amount != null ? ` <b>${Math.round(it.amount).toLocaleString("en-US")}</b>` : ""}</div>${chips("c" + i, it.cats || job.cats, it.short || (it.cats ? null : job.short))}</div>`).join("")}
      ${job.fields.map(f => numInput(f.key, f.label, f.neg)).join("")}${go()}`, (root, done) => {
      const st = {};
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        const placed = job.items.map((_, i) => st["c" + i]);
        if (placed.some(p => !p)) return nag(root, "Classify every item first.");
        const values = {};
        for (const f of job.fields) {
          const v = num(root.querySelector(`input[data-k="${f.key}"]`).value, f.dec);
          if (v == null) return nag(root, "Fill in every figure too.");
          values[f.key] = v;
        }
        E.hideOverlay();
        done({ placed, values });
      };
    });
  }

  const ACCOUNT_OPTIONS = `<option value="">Account…</option>` + ["A", "L", "E", "R", "X"].map(t =>
    `<optgroup label="${D.TYPE_NAMES[t]}">${D.ACCOUNTS.filter(a => a.type === t).map(a => `<option value="${a.id}">${esc(a.name)}</option>`).join("")}</optgroup>`).join("");
  function postingScreen(job, ctx) {
    const n = Math.max(2, job.nLines || job.lines.length);
    return screen(`${head(job, ctx)}<div class="doc memo"><div class="doc-kind">Memo from Giulia</div><div class="doc-title">${esc(job.title)}</div><p>${esc(job.memo)}</p></div>
      <div class="lbl">Journal entry · ${n} lines</div>
      ${Array.from({ length: n }, (_, i) => `<div class="pline"><select data-a="${i}">${ACCOUNT_OPTIONS}</select>
        ${chips("d" + i, ["1", "-1"], ["▲ up", "▼ down"])}<input data-amt="${i}" inputmode="decimal" autocomplete="off" placeholder="€ amount"></div>`).join("")}
      <div class="balance" id="bal">Fill in the lines…</div>
      <p class="small">▲ the account's balance goes up, ▼ it goes down. An entry balances when the changes in assets + expenses equal the changes in liabilities + equity + revenue.</p>${go("POST IT ▶")}`, (root, done) => {
      const st = {};
      const read = () => Array.from({ length: n }, (_, i) => {
        const id = root.querySelector(`[data-a="${i}"]`).value;
        const amt = num(root.querySelector(`[data-amt="${i}"]`).value);
        const dir = st["d" + i] ? +st["d" + i] : 0;
        return [id, amt == null || !dir ? null : dir * Math.abs(amt)];
      });
      const refresh = () => {
        const lines = read().filter(([id, v]) => id && v != null);
        const el = root.querySelector("#bal");
        if (!lines.length) { el.textContent = "Fill in the lines…"; el.className = "balance"; return; }
        const off = O.imbalance(lines);
        el.textContent = off === 0 ? "⚖ The entry balances" : `⚖ Off by ${eur(Math.abs(off))}`;
        el.className = "balance " + (off === 0 ? "ok" : "ko");
      };
      root.oninput = refresh; root.onchange = refresh;
      root.onclick = ev => {
        if (chipHandler(root, st, ev)) { refresh(); return; }
        if (!ev.target.closest("[data-go]")) return;
        const lines = read();
        if (lines.some(([id, v]) => (id && v == null) || (!id && v != null))) return nag(root, "Each line needs an account, ▲ or ▼, and an amount.");
        const used = lines.filter(([id]) => id);
        if (used.length < 2) return nag(root, "An entry needs at least two lines.");
        E.hideOverlay();
        done({ lines: used });
      };
    });
  }

  const fieldVal = (f, v) => v == null || isNaN(v) ? "—" : f.dec ? (Math.round(v * 100) / 100).toString() : f.label.includes("€m") ? Math.round(v).toLocaleString("en-US") : eur(v);
  const lineText = ([id, v]) => `${esc(O.acct(id).name)} <b>${v > 0 ? "▲" : "▼"} ${eur(Math.abs(v))}</b>`;
  function resultScreen(job, g, answer, rw, ctx) {
    let body = "";
    const ok = g.ok;
    if (job.type === "sort") {
      const stmt = e => ["Revenue", "Expense"].includes(e) ? "the income statement" : "the balance sheet";
      body = ok ? `<p>${esc(job.why)}</p><p class="small">${esc(job.answer)} → it's reported in <b>${stmt(job.answer)}</b>.</p>` : `<p>You filed it under <b>${esc(answer)}</b>, but it's ${article(job.answer)} <b>${esc(job.answer.toLowerCase())}</b>, reported in <b>${stmt(job.answer)}</b>.</p>
        ${D.TRAPS[`${job.answer}>${answer}`] ? `<p class="cons">${esc(D.TRAPS[`${job.answer}>${answer}`])}</p>` : ""}<p>${esc(job.why)}</p>`;
    } else if (job.type === "quick") {
      const right = job.options.find(o => o.correct).label;
      body = `${g.timeout ? `<p class="cons">Too slow — the client hung up!</p>` : ""}${ok ? "" : `<p>Right answer: <b>${esc(right)}</b>.</p>`}<p>${esc(job.why)}</p>`;
    } else if (job.type === "spot") {
      body = ok ? `<p>${esc(job.why)}</p>` : `<p>The wrong one was <b>${esc(job.lines[job.wrongAt].item)}</b>: Marco filed it as ${esc(job.marcoSaid)}; it should be ${esc(job.answer)}.</p>
        ${job.trap ? `<p class="cons">${esc(job.trap)}</p>` : ""}<p>${esc(job.why)}</p>`;
    } else if (job.type === "build") {
      body = `<ul class="res">${job.items.map((it, i) => `<li class="${g.right[i] ? "y" : "n"}">${g.right[i] ? "✔" : "✘"} ${esc(it.item)} → <b>${esc(it.element)}</b>${g.right[i] ? "" : `<br><small>${esc(it.why)}</small>`}</li>`).join("")}</ul>
        ${job.askProfit ? `<p class="${g.profitOk ? "" : "cons"}">${g.profitOk ? "✔" : "✘"} Profit: <b>${eur(job.profit)}</b> (revenue − expenses).</p>` : ""}`;
    } else if (job.type === "order") {
      body = `<ul class="res">${job.items.map((it, i) => `<li class="${g.right[i] ? "y" : "n"}">${g.right[i] ? "✔" : "✘"} ${esc(it.text)} → <b>${it.year}</b><br><small>${esc(it.why)}</small></li>`).join("")}</ul>`;
    } else if (job.type === "fill") {
      body = `<ul class="res">${job.fields.map((f, i) => `<li class="${g.right[i] ? "y" : "n"}">${g.right[i] ? "✔" : "✘"} ${esc(f.label)}: <b>${fieldVal(f, f.answer)}</b>${g.right[i] ? "" : ` (you wrote ${fieldVal(f, answer.values[f.key])})`}<br><small>${esc(f.why)}</small></li>`).join("")}
        ${job.choice ? `<li class="${g.choiceOk ? "y" : "n"}">${g.choiceOk ? "✔" : "✘"} ${esc(job.choice.label)} <b>${esc(job.choice.answer)}</b><br><small>${esc(job.choice.why)}</small></li>` : ""}</ul>`;
    } else if (job.type === "mcq") {
      body = `<p class="question">${esc(job.question)}</p><ul class="res">${job.options.map((o, i) => `<li class="${o.correct ? "y" : o === answer ? "n" : ""}">${o.correct ? "✔" : o === answer ? "✘" : "·"} ${"ABCD"[i]}. ${esc(o.label)}<br><small>${esc(o.why)}</small></li>`).join("")}</ul>
        ${job.solution ? `<div class="lbl">Solution</div><ol class="sol">${job.solution.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}`;
    } else if (job.type === "reclass") {
      const oneWhy = job.items.every(it => it.why === job.items[0].why);
      body = `<ul class="res">${job.items.map((it, i) => `<li class="${g.right[i] ? "y" : "n"}">${g.right[i] ? "✔" : "✘"} ${esc(it.label)} → <b>${esc(it.cat)}</b>${g.right[i] || oneWhy ? "" : `<br><small>${esc(it.why)}</small>`}</li>`).join("")}${oneWhy ? `<li><small>${esc(job.items[0].why)}</small></li>` : ""}
        ${job.fields.map((f, i) => `<li class="${g.fieldsRight[i] ? "y" : "n"}">${g.fieldsRight[i] ? "✔" : "✘"} ${esc(f.label)}: <b>${fieldVal(f, f.answer)}</b>${g.fieldsRight[i] ? "" : ` (you wrote ${fieldVal(f, answer.values[f.key])})`}<br><small>${esc(f.why)}</small></li>`).join("")}</ul>`;
    } else if (job.type === "posting") {
      body = `<div class="lbl">The right entry</div><ul class="res">${job.lines.map(l => `<li>${lineText(l)}</li>`).join("")}</ul><p>${esc(job.why)}</p>
        ${ok ? "" : `<p class="cons">${g.balanced ? "It balanced, but the accounts or amounts weren't right." : "Your entry didn't even balance!"} Marco fixed the books for you. He sighed loudly.</p>`}`;
    }
    const reward = ctx && (ctx.interview || ctx.mock) ? "" : `<div class="reward">${rw.xp > 0 ? `+${rw.xp} XP` : `${rw.xp} XP`}${ok ? ` · bonus +€${O.bonusFor(job.tier) + (rw.bonus ? 2 : 0)}` : ""}${S().streak >= 3 && ok ? ` · 🔥 streak ${S().streak}` : ""}</div>`;
    return screen(`${head(job, ctx)}<div class="verdict ${ok ? "ok" : "ko"}">${ok ? "✔ WELL DONE!" : "✘ NOT QUITE"}</div>${reward}${body}${go("CONTINUE ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.sfx("blip"); E.hideOverlay(); done(); } };
    });
  }

  function payslip(rank, bonus) {
    const s = S();
    return screen(`<div class="jhead"><span>🏢 PolimiAFC S.p.A.</span><span>PAYSLIP</span></div>
      <div class="doc"><div class="doc-kind">Day ${s.day} · Q${O.quarterOf(s.day)} ${O.calendarYear(s)}</div><div class="doc-title">${esc(rank.name)}</div>
      <table><tr><td>Daily salary</td><td>${eur(rank.salary)}</td></tr><tr><td>Bonus for good work</td><td>${eur(bonus)}</td></tr>
      <tr class="tot"><td>Paid to you</td><td>${eur(rank.salary + bonus)}</td></tr><tr><td>Your savings after today</td><td>${eur(s.money + rank.salary + bonus)}</td></tr></table></div>
      <p class="small">Jobs right: ${s.stats.right}/${s.stats.jobs} in your career. Bonus comes from jobs done right today; a streak adds extra.</p>${go("GO HOME ▶")}`, (root, done) => {
      E.sfx("coin");
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
  }

  // ---------- The company books, the dashboard and the annual report ----------
  function trialBalanceHtml(s) {
    const b = O.balances(s);
    return ["A", "L", "E", "R", "X"].map(t => {
      const acc = D.ACCOUNTS.filter(a => a.type === t);
      const tot = acc.reduce((x, a) => x + b[a.id], 0);
      return `<div class="tb"><div class="tb-h"><span>${D.TYPE_NAMES[t]}</span><span>${eur(tot)}</span></div>
        ${acc.map(a => `<div class="row"><span>${esc(a.name)}</span><span>${eur(b[a.id])}</span></div>`).join("")}</div>`;
    }).join("");
  }
  function companyBooks() {
    const s = S();
    const last = s.ledger.slice(-6).reverse();
    return screen(`<div class="jhead"><span>🏢 PolimiAFC S.p.A.</span><span>THE BOOKS</span></div>
      <p class="small">Balances today. Assets + expenses = liabilities + equity + revenue: ${O.trialOK(s) ? "✔ it balances." : "✘ something is off!"}</p>
      ${trialBalanceHtml(s)}
      <div class="lbl">Latest entries</div>${last.length ? `<ul class="res">${last.map(e => `<li><b>${esc(e.label)}</b> <small>Q${e.q} ${D.Y + e.year - 1}</small><br>${e.lines.map(lineText).join("<br>")}</li>`).join("")}</ul>` : `<p class="small">No entries yet.</p>`}
      ${go("CLOSE ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
  }

  // The whiteboard: the four statements, what each one answers and how they link, with PolimiAFC's own numbers.
  function fourStatements() {
    const s = S();
    const b = O.balances(s), open = O.balances(s, e => e.year < s.year);
    const flows = O.balances(s, e => e.year === s.year && e.label !== "Closing entry");
    const profit = O.profitOf(flows).profit;
    const eq = b.shareCapital + b.sharePremium + b.legalReserve + b.retained + profit;
    const card = (icon, name, q, when, logic, inside, now) => `<div class="stmt"><div class="stmt-h">${icon} ${esc(name)}</div>
      <p><b>${esc(q)}</b></p><p class="small">${esc(when)} · ${esc(logic)}</p><p class="small">${esc(inside)}</p>${now ? `<p class="now">PolimiAFC now: ${now}</p>` : ""}</div>`;
    return screen(`<div class="jhead"><span>🏢 THE WHITEBOARD</span><span>THE FOUR STATEMENTS</span></div>
      ${card("⚖", "Balance sheet", "What do we own and owe, and whose money is it?", "A photo on one date (31 December)", "Accrual logic", "Assets = liabilities + equity. Three of the five cabinets live here: A, L and E.", `total assets ${eur(b.cash + b.receivables + b.prepaid + b.equipment)}`)}
      ${card("📈", "Income statement", "Did we earn more than we used up this year?", "A film of the year", "Accrual logic: revenue when earned, expenses when used", "Revenues − expenses = profit. The R and X cabinets live here.", `profit so far ${eur(profit)}`)}
      ${card("💶", "Cash flow statement", "Where did the cash come from, and where did it go?", "A film of the year", "Cash logic: only when money moves", "Operating (the business), investing (long-term assets), financing (banks and shareholders).", `change in cash this year ${eur(b.cash - open.cash)}`)}
      ${card("🧾", "Statement of changes in equity", "How did the owners' stake change?", "A film of the year", "Opening equity → closing equity", "+ profit, + shares issued, − dividends, and moves between reserves.", `equity ${eur(eq)}`)}
      <div class="lbl">How they link</div>
      <ul class="res"><li>Profit (income statement) → goes into equity (changes in equity) → equity in the balance sheet.</li>
      <li>Operating + investing + financing (cash flow statement) = cash at the end − cash at the start (balance sheet).</li>
      <li>Same event, different statements: selling on credit is revenue (income statement) and a receivable (balance sheet), but no cash yet. Buying a machine is an asset and an investing outflow, not an expense.</li></ul>
      <div class="menu-list"><button type="button" data-dash>▸ SEE THE DASHBOARD</button></div>${go("CLOSE ▶")}`, (root, done) => {
      root.onclick = async ev => {
        if (ev.target.closest("[data-dash]")) { root.onclick = null; E.hideOverlay(); await dashboard(); done(); return; }
        if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); }
      };
    });
  }

  function dashboard(title) {
    const s = S();
    const qs = O.quarterly(s).slice(-8);
    const max = Math.max(1, ...qs.map(q => Math.max(q.revenue, q.expenses)));
    const bars = qs.map(q => `<div class="qcol"><div class="bars"><i class="rev" style="height:${Math.round(q.revenue / max * 100)}%"></i><i class="exp" style="height:${Math.round(q.expenses / max * 100)}%"></i></div>
      <div class="ql">${esc(q.label.split(" ")[0])}</div><div class="qp ${q.profit >= 0 ? "y" : "n"}">${q.profit >= 0 ? "+" : "−"}${Math.round(Math.abs(q.profit) / 100) / 10}k</div></div>`).join("");
    const cur = qs[qs.length - 1];
    const clients = O.rankFor(s).clients.map(id => {
      const c = D.CLIENTS[id], hist = s.clientRev[id] || [];
      const last = hist[hist.length - 1], prev = hist.length > 1 ? hist[hist.length - 2] : c.base;
      const growth = last ? Math.round((last / prev - 1) * 1000) / 10 : 0;
      const sat = s.sat[id] == null ? 60 : s.sat[id];
      return `<div class="client"><span>${c.icon} ${esc(c.name)}</span><span class="satbar"><i style="width:${sat}%"></i></span>
        <span class="small">${last ? `${eur(last)} this quarter (${growth >= 0 ? "+" : ""}${growth}%)` : `${esc(c.kind)} · first quarter running`}</span></div>`;
    }).join("");
    return screen(`<div class="jhead"><span>🏢 PolimiAFC S.p.A.</span><span>DASHBOARD</span></div>
      ${title ? `<div class="verdict ok">${esc(title)}</div>` : ""}
      ${qs.length ? `<div class="chart">${bars}</div><p class="small"><i class="key rev"></i> revenue <i class="key exp"></i> expenses · profit under each quarter</p>
      <div class="row"><span>Cash at bank (${esc(cur.label)})</span><span>${eur(cur.cash)}</span></div>` : ""}
      <div class="lbl">Clients · satisfaction and quarterly revenue</div>${clients}
      <p class="small">Clients grow faster when you serve them well: every job done right raises their satisfaction, and we invoice ${eur(D.FEE_PER_JOB)} for it.</p>
      ${go("CLOSE ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
  }

  async function annualReport() {
    const s = S();
    const report = O.annualReport(s);
    s.reportTries = s.reportTries || 0;
    const lines = report.sections.flatMap(sec => sec.lines);
    const values = await screen(`<div class="jhead"><span>🏢 PolimiAFC S.p.A.</span><span>ANNUAL REPORT ${O.calendarYear(s)}</span></div>
      <p class="brief">Fill in the annual report from the books. Totals must add up; EPS to two decimals.</p>
      <details class="tbwrap"><summary>📒 Trial balance before closing</summary>${trialBalanceHtml(s)}
        <p class="small">Shares: 100,000 from the start; 20,000 more issued on 1 July ${D.Y}.</p></details>
      ${report.sections.map(sec => `<div class="lbl">${esc(sec.title)}</div>${sec.lines.map(l => numInput(l.key, l.label, true).replace("<label class=\"fld\">", `<label class="fld${l.total ? " total" : ""}">`)).join("")}`).join("")}
      ${go("SIGN THE REPORT ▶")}`, (root, done) => {
      root.onclick = ev => {
        if (chipHandler(root, {}, ev)) return;
        if (!ev.target.closest("[data-go]")) return;
        const v = {};
        for (const l of lines) {
          const x = num(root.querySelector(`input[data-k="${l.key}"]`).value, l.fmt === "eps");
          if (x == null) return nag(root, `Fill in “${l.label}”.`);
          v[l.key] = x;
        }
        E.hideOverlay();
        done(v);
      };
    });
    const g = O.gradeReport(report, values);
    s.reportTries++;
    const reveal = g.pass || s.reportTries >= 3;
    const fmt = l => l.fmt === "qty" ? Math.round(l.answer).toLocaleString("en-US") : l.fmt === "eps" ? "€" + l.answer.toFixed(4) : eur(l.answer);
    await screen(`<div class="jhead"><span>🏢 PolimiAFC S.p.A.</span><span>AUDIT</span></div>
      <div class="verdict ${g.pass ? "ok" : "ko"}">${g.clean ? "✔ A CLEAN REPORT!" : g.pass ? "✔ APPROVED, WITH NOTES" : "✘ THE AUDITORS WON'T SIGN"}</div>
      <p>${g.n}/${g.total} lines right.${g.pass ? "" : reveal ? " Third try: here's how it should look." : " Fix the lines marked ✘ and try again."}</p>
      <ul class="res">${lines.map((l, i) => `<li class="${g.right[i] ? "y" : "n"}">${g.right[i] ? "✔" : "✘"} ${esc(l.label)}${reveal ? `: <b>${fmt(l)}</b>${g.right[i] ? "" : `<br><small>${esc(l.why)}</small>`}` : ""}</li>`).join("")}</ul>${go("CONTINUE ▶")}`, (root, done) => {
      E.sfx(g.pass ? "level" : "hurt");
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
    if (!reveal) { O.reward(s, { type: "report", tier: 1 }, false); hud(); return E.say("Take your time. Every figure is in the books.", "Giulia"); }
    // Everything the report changes happens here, at once, and is saved before any words.
    const rw = O.reward(s, { type: "report", tier: O.tierOf(s) }, g.pass);
    if (g.clean) s.bonus = (s.bonus || 0) + 40;
    s.stats.reports.push({ year: O.calendarYear(s), n: g.n, total: g.total, tries: s.reportTries });
    s.reportTries = 0;
    const profit = O.closeYear(s);
    const meeting = O.agm(s, profit);
    s.queue = meeting ? [meeting] : [];
    s.phase = "agm";
    const next = meeting ? null : O.advance(s);
    hud(); E.save();
    const eps = report.sections[2].lines[1].answer;
    await E.sayAll([
      g.clean ? `Perfect! Coffee's on me. ${rw.xp > 0 ? `(+${rw.xp} XP and a €40 bonus.)` : ""}` : g.pass ? `Approved. A few notes from the auditors, but it balances. (+${rw.xp} XP)` : "We'll file it as corrected. Next year, fewer red marks please.",
      `I posted the closing entry: revenue and expenses go to zero, and the ${profit >= 0 ? "profit" : "loss"} of ${eur(profit)} moves into retained earnings. EPS: €${eps.toFixed(2)}.`
    ], "Giulia");
    if (!meeting) return afterJob(next);
    return E.say("Now the shareholders' meeting decides what to do with the profit. My memo is on my desk.", "Giulia");
  }

  // ---------- Interviews ----------
  async function interview() {
    const s = S(), who = "Giulia";
    const st = O.interviewStatus(s);
    if (st.state === "top") return E.say("You're at the top already. There's only my chair left, and it's taken.", who);
    if (st.state === "soon") return E.say(`The next step is ${st.rank.name}. That part of the firm opens soon — new clients, harder files. Keep sharpening your pencil.`, who);
    if (st.state === "needXp") return E.say(`An interview for ${st.rank.name}? Come back with more experience: ${st.missing} XP to go.`, who);
    if (st.state === "wait") return E.say(`Let the last interview settle. Try again in ${st.days} day${st.days === 1 ? "" : "s"}.`, who);
    if (s.carrying) return handsFull();
    const c = await E.ask(`Interview for ${st.rank.name}: ${O.INTERVIEW.questions} hard questions at the new level. You need ${O.INTERVIEW.pass} right. Fail, and you can retry in ${O.INTERVIEW.waitDays} days. Now?`, ["Let's do it", "Not now"], who);
    if (c !== 0) return E.say("Whenever you're ready. The chair isn't going anywhere.", who);
    E.closeDialog();
    E.music("battle");
    const jobs = O.planInterview(s, E.rnd);
    let score = 0;
    for (let i = 0; i < jobs.length; i++) {
      const ctx = { interview: true, n: i + 1, of: jobs.length };
      const answer = await screenFor(jobs[i], ctx);
      const g = O.grade(jobs[i], answer);
      if (g.ok) score++;
      E.sfx(g.ok ? "coin" : "hurt");
      await resultScreen(jobs[i], g, answer, null, ctx);
    }
    E.music("office");
    const passed = O.finishInterview(s, score);
    hud(); E.save();
    if (!passed) return E.say(`${score}/${jobs.length}. Not this time — you need ${O.INTERVIEW.pass}. Keep working and try again in ${O.INTERVIEW.waitDays} days.`, who);
    E.sfx("level");
    const r = O.rankFor(s);
    await screen(`<div class="cert-in"><div class="verdict ok">★ PROMOTED ★</div><p class="big-rank">${esc(r.name.toUpperCase())}</p>
      <div class="row"><span>Interview</span><span>${score}/${jobs.length}</span></div>
      <div class="row"><span>Daily salary</span><span>${eur(r.salary)}</span></div>
      <div class="row"><span>Your clients</span><span>${r.clients.map(id => D.CLIENTS[id].icon).join(" ")}</span></div>
      <p>${esc(r.blurb || "Harder work, better pay.")}</p></div>${go("BACK TO WORK ▶")}`, (root, done) => {
      root.onclick = ev => { if (ev.target.closest("[data-go]")) { E.hideOverlay(); done(); } };
    });
    const prev = D.RANKS[D.RANKS.findIndex(x => x.id === r.id) - 1];
    const fresh = r.clients.filter(c => !prev || !prev.clients.includes(c)).map(c => D.CLIENTS[c].name);
    return E.say(`Congratulations, ${r.name}!${fresh.length ? ` ${fresh.join(" and ")} ${fresh.length === 1 ? "is" : "are"} yours from tomorrow.` : ""}`, who);
  }

  // ---------- The career menu ----------
  function menu() {
    const s = S();
    const r = O.rankFor(s), nr = O.nextRank(s), st = O.interviewStatus(s);
    const acc = s.stats.jobs ? Math.round(s.stats.right / s.stats.jobs * 100) + "%" : "—";
    const pct = nr ? Math.min(100, Math.round((s.xp - r.xp) / Math.max(1, nr.xp - r.xp) * 100)) : 100;
    const next = { top: "You're at the top.", soon: `${nr && nr.name}: opens soon.`, needXp: `${st.missing} XP to an interview for ${nr && nr.name}.`, wait: `Interview retry in ${st.days} day(s).`, ready: `Ready! Ask Giulia for an interview for ${nr && nr.name}.` }[st.state];
    const main = () => E.showOverlay(`<div class="panel box"><h2>POLIMIAFC · YOUR CAREER</h2>
      <div class="row"><span>${esc(r.name)}</span><span>XP ${s.xp}</span></div>
      <div class="xpbar"><i style="width:${pct}%"></i></div><p class="small">${esc(next)}</p>
      <div class="row"><span>Daily salary</span><span>${eur(r.salary)}</span></div>
      <div class="row"><span>Bonus so far today</span><span>${eur(s.bonus || 0)}</span></div>
      <div class="row"><span>Your savings</span><span>${eur(s.money)}</span></div>
      <div class="row"><span>Jobs right</span><span>${s.stats.right}/${s.stats.jobs} (${acc})</span></div>
      ${["cons", "fa"].map(t => { const d = ST.studyOf(s, t); return `<div class="row"><span>${ST.TRACKS[t].icon} ${esc(ST.TRACKS[t].name)}</span><span>${levelName(d.level)} · ${d.right}/${d.done}</span></div>`; }).join("")}
      <div class="menu-list">
        <button data-m="books">▸ COMPANY BOOKS</button>
        <button data-m="dash">▸ DASHBOARD</button>
        <button data-m="weak">▸ EXAM PREP · WEAK SPOTS</button>
        <button data-m="ladder">▸ CAREER LADDER</button>
        <button data-m="codex">▸ CODEX</button>
        <button data-m="title">▸ TITLE SCREEN</button>
        <button data-m="close">▸ BACK TO WORK</button>
      </div></div>`);
    main();
    const root = overlay();
    const end = () => { root.onclick = null; E.hideOverlay(); E.setBusy(false); hud(); E.save(); };
    root.onclick = async ev => {
      const b = ev.target.closest("[data-m]"); if (!b) return;
      E.sfx("select");
      const m = b.dataset.m;
      if (m === "close") return end();
      if (m === "back") return main();
      if (m === "title") { root.onclick = null; E.toTitle(); return; }
      if (m === "books" || m === "dash") {
        root.onclick = null;
        await (m === "books" ? companyBooks() : dashboard());
        return menu();
      }
      if (m === "weak") {
        const rows = Object.entries(s.patterns || {}).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]);
        return E.showOverlay(`<div class="panel box"><h2>EXAM PREP</h2>
          <div class="row"><span>Mock exams</span><span>${s.mock ? `${s.mock.runs} · best ${s.mock.best}/16 · last ${s.mock.last}/16` : "none yet"}</span></div>
          <p class="small">Every past-exam pattern you've met, weakest first. Practise them on the desks (level 3) or in a mock exam.</p>
          ${rows.length ? rows.map(([k, [ok, n]]) => `<div class="row"><span>${ok / n >= 0.75 ? "✔" : ok / n >= 0.5 ? "~" : "✘"} ${esc(k)}</span><span>${ok}/${n}</span></div>`).join("") : `<p class="small">No exam patterns yet: reach level 3 on a desk, or choose a mock exam one morning.</p>`}
          <div class="menu-list"><button data-m="back">▸ BACK</button></div></div>`);
      }
      if (m === "ladder") return E.showOverlay(`<div class="panel box"><h2>CAREER LADDER</h2>
        ${D.RANKS.map(x => `<div class="row"><span>${x.id === s.rank ? "▶ " : ""}${esc(x.name)}${x.soon ? " 🔒" : ""}</span><span>${x.xp} XP · ${eur(x.salary)}/day</span></div>`).join("")}
        <p class="small">Every step up is a job interview with Giulia. It's never automatic: once you have the XP, you choose when to take it. 🔒 = coming soon.</p>
        <div class="menu-list"><button data-m="back">▸ BACK</button></div></div>`);
      if (m === "codex") return E.showOverlay(`<div class="panel box"><h2>CODEX</h2><dl>
        ${CX().CODEX.map(([, t, d]) => `<dt>${esc(t.toUpperCase())}</dt><dd>${esc(d)}</dd>`).join("")}</dl>
        <p class="small">The same codex, with a search, is in the CODEX tab below the screen.</p>
        <div class="menu-list"><button data-m="back">▸ BACK</button></div></div>`);
    };
  }

  window.OfficeUI = {
    install(engine) { E = engine; },
    hud, drawOver, onStep, use, begin, resume, menu, num,
    // for automated play-throughs
    _: { current: () => current, take, work, finish, afterJob, goHome, annualReport, interview, desk, inbox, books, giulia, marco, cabinet }
  };
})();
