/* AFC Closing Desk: the page. Screens are rendered from DeskCore; progress stays in this browser. */
(function () {
  "use strict";
  const C = window.DeskCore;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

  // ---------- Storage ----------
  const STORE = "desk_progress", CURRENT = "desk_current";
  function load(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function drop(key) { try { localStorage.removeItem(key); } catch (e) {} }

  const CHAPTERS = {
    1: { short: "Accrual principles", title: "Financial reporting and accounting principles", blurb: "Revenue, expenses and cash in the right year: receivables, prepayments, accruals and customer deposits." },
    2: { short: "Assets", title: "Balance sheet: assets and measurement", blurb: "Depreciation, amortisation, impairment, disposals, receivables, inventory costing and the asset side of the balance sheet." },
    3: { short: "Equity and liabilities", title: "Balance sheet: equity and liabilities", blurb: "The accounting equation, changes in equity, loans, provisions, deferred tax and the equity and liabilities side." },
    4: { short: "Income statement", title: "Income statement and profit formation", blurb: "Gross profit, EBITDA and EBIT, statements by nature and by function, net profit and earnings per share." },
    5: { short: "Cash flow", title: "Cash flow statement and segment reporting", blurb: "Direct and indirect methods, the three sections, flows derived from balance sheets, and segment ratios." }
  };
  const SOON = [
    { n: "6–9", title: "Cost Accounting", text: "Classifications, configurations, overhead allocation, process and job order costing, ABC." },
    { n: "10", title: "Consolidation", text: "Equity method, eliminations, fair value adjustments, goodwill and non-controlling interests." }
  ];
  const DOC_ICONS = { invoice: "🧾", bank: "🏦", memo: "📝", contract: "📄", count: "📦", ledger: "📒", report: "📊" };

  let progress = C.normalize(load(STORE, null));
  let current = load(CURRENT, null);
  if (current && (!current.id || !C.byId[current.id])) current = null;
  let kase = null, cellMap = {}, order = [], active = null;
  const rnd = C.rng((Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0);
  const today = () => C.dayKey(new Date());
  const app = $("#app"), keypad = $("#keypad"), sheet = $("#sheet"), toastEl = $("#toast");

  function persist() { save(STORE, progress); }
  function persistCurrent() { if (current) save(CURRENT, current); else drop(CURRENT); }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  // ---------- Theme ----------
  function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }
  function toggleTheme() {
    const next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("polimi_theme", next); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = next === "dark" ? "#192621" : "#ffffff";
    $$("[data-act=theme]").forEach(b => { b.textContent = isDark() ? "☀️" : "🌙"; });
  }

  function hideToast() { clearTimeout(toast.timer); toastEl.hidden = true; }
  function toast(text) {
    toastEl.textContent = text;
    toastEl.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { toastEl.hidden = true; }, 2600);
  }

  function bar(left, title, sub, right) {
    return `<header class="bar"><div class="bar-inner">${left}<div class="bar-title"><strong>${title}</strong>${sub ? `<span>${sub}</span>` : ""}</div>${right || ""}<button class="icon-btn" data-act="theme" aria-label="Toggle dark mode">${isDark() ? "☀️" : "🌙"}</button></div></header>`;
  }
  const pct = (a, b) => b ? Math.min(100, Math.round(a / b * 100)) : 0;
  const filled = e => !!e && (typeof e.value === "number" ? isFinite(e.value) : e.value != null);

  // ---------- Routing ----------
  function route() {
    closeKeypad();
    closeSheet();
    hideToast();
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "ch" && CHAPTERS[+parts[1]]) renderChapter(+parts[1]);
    else if (parts[0] === "case" && current) renderCase();
    else renderHome();
    window.scrollTo(0, 0);
  }

  // ---------- Home ----------
  function renderHome() {
    const rk = C.rank(progress), streak = C.streak(progress, today());
    const acc = progress.cells.total ? Math.round(progress.cells.correct / progress.cells.total * 100) + "%" : "—";
    const nextText = rk.next ? `${rk.next.at - rk.cleared} more level${rk.next.at - rk.cleared === 1 ? "" : "s"} to ${rk.next.name}` : "You run the closing desk";
    const plan = C.dailyPlan(progress, today());
    persist();
    const dailyDone = plan.items.filter(i => i.stars != null).length;
    const cards = [];
    if (current && !current.audit) {
      const k = C.makeCase(current.id, current.seed);
      const n = k.cells.filter(c => filled(current.entries[c.key])).length;
      cards.push(`<button class="quick-card resume" data-act="resume"><span class="q-icon">✍️</span><span class="q-body"><strong>Resume: ${esc(k.title)}</strong><span class="small">${esc(k.co)} · ${n}/${k.cells.length} lines filled</span></span><span class="chev">›</span></button>`);
    }
    cards.push(dailyDone < plan.items.length
      ? `<button class="quick-card" data-act="daily"><span class="q-icon">🗓️</span><span class="q-body"><strong>Daily close · ${dailyDone}/${plan.items.length}</strong><span class="small">Five mixed cases from the levels you have unlocked</span></span><span class="chev">›</span></button>`
      : `<div class="quick-card"><span class="q-icon">✅</span><span class="q-body"><strong>Daily close done</strong><span class="small">A new set is picked tomorrow</span></span></div>`);
    cards.push(progress.review.length
      ? `<button class="quick-card" data-act="review"><span class="q-icon">🔁</span><span class="q-body"><strong>Re-audit · ${progress.review.length} case${progress.review.length === 1 ? "" : "s"}</strong><span class="small">Cases without a clean opinion, same numbers</span></span><span class="chev">›</span></button>`
      : `<div class="quick-card"><span class="q-icon">🔁</span><span class="q-body"><strong>Re-audit</strong><span class="small">Cases without a clean opinion come back here</span></span></div>`);

    const chapters = C.chapters().map(ch => {
      const info = CHAPTERS[ch] || { short: `Chapter ${ch}`, title: "" };
      const pills = C.LEVELS.map(l => {
        const st = C.levelState(progress, ch, l.n);
        if (st.cleared) return `<span class="lv cleared">${l.name} ✓</span>`;
        if (!st.unlocked) return `<span class="lv locked">${l.name} 🔒</span>`;
        return `<span class="lv">${l.name} ${st.passed}/${st.target}</span>`;
      }).join("");
      return `<a class="chapter-card" href="#/ch/${ch}"><span class="ch-num">${String(ch).padStart(2, "0")}</span><span class="ch-body"><strong>${esc(info.short)}</strong><span class="small">${esc(info.title)}</span><span class="lv-pills">${pills}</span></span><span class="chev">›</span></a>`;
    }).join("");
    const soon = SOON.map(s => `<div class="chapter-card soon"><span class="ch-num">${s.n}</span><span class="ch-body"><strong>${esc(s.title)}</strong><span class="small">${esc(s.text)}</span></span></div>`).join("");

    app.innerHTML = bar(`<a class="back-btn" href="../index.html" aria-label="All courses">‹</a>`, "Closing Desk", "Accounting, Finance &amp; Control") + `
      <main class="wrap" id="main">
        <section class="desk-hero">
          <div class="eyebrow">Your desk</div>
          <h2>${esc(rk.name)}</h2>
          <div class="small">${rk.cleared}/${rk.total} levels cleared · ${esc(nextText)}</div>
          <div class="meter" aria-hidden="true"><span style="width:${pct(rk.cleared, rk.total)}%"></span></div>
          <div class="stats">
            <div><b>${progress.cases}</b><span>cases audited</span></div>
            <div><b>${acc}</b><span>lines right</span></div>
            <div><b>${streak}</b><span>day streak</span></div>
          </div>
        </section>
        <div class="quick">${cards.join("")}</div>
        <div class="section-head"><h3>Financial Accounting</h3><span>Chapters 1–5 · ${C.registry.length} case types</span></div>
        <div class="chapters">${chapters}</div>
        <div class="section-head"><h3>Coming next</h3><span>Same desk, new chapters</span></div>
        <div class="chapters">${soon}</div>
        <details class="howto">
          <summary>How the desk works</summary>
          <ul>
            <li>The decisions are already taken. You get the documents, you prepare the working paper, the auditor checks it.</li>
            <li>Tap a line and type on the keypad. You can type the calculation itself, like <b>84000÷7×3</b> or <b>64000×5%</b>.</li>
            <li>Expenses can be entered with or without the minus. Cash-flow lines, changes and gains or losses need their sign: outflows and decreases are negative.</li>
            <li>A hint halves that line's score. All lines right without hints: <b>unmodified opinion</b> ★★★. At least 75%: <b>qualified</b> ★★. Less: <b>adverse</b> ★.</li>
            <li>Each chapter has three levels. To unlock the next, pass the target number of cases (qualified or better) and meet every case type at least once. Every case gets new numbers.</li>
            <li>The first time a case type from the course PDF comes up, you get its original numbers.</li>
          </ul>
        </details>
      </main>
      <footer class="site-footer"><span>AFC Closing Desk</span><a href="../afc/index.html">AFC Study Hub →</a></footer>`;
  }

  // ---------- Chapter ----------
  function renderChapter(ch) {
    const info = CHAPTERS[ch];
    const levels = C.LEVELS.map(l => {
      const st = C.levelState(progress, ch, l.n);
      const status = st.cleared ? `<span class="status cleared">Cleared ✓</span>` : st.unlocked ? `<span class="status">In progress</span>` : `<span class="status">🔒 Locked</span>`;
      const types = st.templates.map(t => {
        const n = st.types[t.id] || 0;
        return `<li class="${n ? "done" : ""}"><span class="tick">${n ? "✓" : ""}</span><span class="t-name">${esc(t.title)}${t.source ? `<em>${esc(t.source)}</em>` : ""}</span><b>${n ? "×" + n : ""}</b></li>`;
      }).join("");
      const inProgress = current && !current.audit && current.mode && current.mode.type === "level" && current.mode.ch === ch && current.mode.lv === l.n;
      let action;
      if (!st.unlocked) {
        const prev = C.levelState(progress, ch, l.n - 1);
        action = `<p class="lock-note">Clear ${prev.name} first: ${prev.passed}/${prev.target} cases passed, ${prev.covered}/${prev.total} case types met.</p>`;
      } else {
        action = `<button class="primary" data-play="${l.n}">${inProgress ? "Resume the open case" : st.cleared ? "Keep practising" : "Start a case"} <span aria-hidden="true">→</span></button>`;
      }
      return `<section class="card level-card ${st.unlocked ? "" : "locked"}">
        <div class="lv-top"><strong>${l.name}</strong>${status}</div>
        <div class="meter" aria-hidden="true"><span style="width:${pct(st.passed, st.target)}%"></span></div>
        <p class="small">${Math.min(st.passed, st.target)}/${st.target} cases passed · ${st.covered}/${st.total} case types met${st.played ? ` · ${st.played} audited` : ""}</p>
        <ul class="types">${types}</ul>
        ${action}
      </section>`;
    }).join("");
    app.innerHTML = bar(`<a class="back-btn" href="#/" aria-label="Back to the desk">‹</a>`, `Chapter ${ch}`, esc(info.short)) + `
      <main class="wrap" id="main">
        <div class="ch-head"><div class="eyebrow">Chapter ${String(ch).padStart(2, "0")}</div><h2>${esc(info.title)}</h2><p>${esc(info.blurb)}</p></div>
        ${levels}
      </main>`;
  }

  // ---------- Starting cases ----------
  function begin(mode, id, seed) {
    if (current && !current.audit && Object.keys(current.entries || {}).length && !(current.id === id && current.seed === seed)) {
      if (!confirm("You have a case in progress. Discard it and open a new one?")) return;
    }
    current = { mode, id, seed, entries: {}, hints: {}, audit: null };
    persistCurrent();
    kase = null;
    go("#/case");
  }
  function startLevel(ch, lv) {
    const st = C.levelState(progress, ch, lv);
    if (!st.unlocked) return;
    if (current && !current.audit && current.mode && current.mode.type === "level" && current.mode.ch === ch && current.mode.lv === lv) return go("#/case");
    const tpl = C.nextTemplate(progress, ch, lv, rnd, progress.last[`${ch}-${lv}`]);
    begin({ type: "level", ch, lv }, tpl.id, C.seedFor(progress, tpl, rnd));
  }
  function startDaily() {
    const plan = C.dailyPlan(progress, today());
    persist();
    const idx = plan.items.findIndex(i => i.stars == null);
    if (idx < 0) { toast("Daily close complete. See you tomorrow."); return go("#/"); }
    begin({ type: "daily", date: plan.date, idx }, plan.items[idx].tpl, plan.items[idx].seed);
  }
  function startReview() {
    const item = progress.review[0];
    if (!item) { toast("Nothing left to re-audit."); return go("#/"); }
    begin({ type: "review", id: item.id }, item.tpl, item.seed);
  }
  function nextCase() {
    const m = current && current.mode;
    if (!m) return go("#/");
    if (m.type === "level") return startLevel(m.ch, m.lv);
    if (m.type === "daily") return startDaily();
    return startReview();
  }
  function leaveCase() {
    const m = current && current.mode;
    go(m && m.type === "level" ? `#/ch/${m.ch}` : "#/");
  }

  // ---------- Case ----------
  function ensureCase() {
    if (!kase || kase.id !== current.id || kase.seed !== current.seed) kase = C.makeCase(current.id, current.seed);
    cellMap = {};
    order = kase.cells.map(c => c.key);
    kase.cells.forEach(c => { cellMap[c.key] = c; });
    return kase;
  }
  function cellLabel(c) { return c.col ? `${c.row} · ${c.col}` : c.row; }
  function valueText(e, cell) {
    if (!e) return "";
    if (cell.t === "choice") return e.value;
    return typeof e.value === "number" && isFinite(e.value) ? C.fmt(e.value, cell.fmt) : "";
  }
  function pretty(expr) { return String(expr || "").replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−"); }
  const hasOp = expr => /[+×÷−*/()%]/.test(String(expr || "").replace(/^[−-]/, ""));

  function modeText(m) {
    if (!m) return "";
    if (m.type === "daily") return `Daily close ${m.idx + 1}/${C.DAILY_SIZE}`;
    if (m.type === "review") return "Re-audit";
    return C.LEVELS[m.lv - 1].name;
  }

  function renderCase() {
    const k = ensureCase();
    const audited = !!current.audit;
    const res = audited ? C.audit(k, current.entries, current.hints) : null;
    const resMap = {};
    if (res) res.results.forEach(r => { resMap[r.key] = r; });
    const st = C.levelState(progress, k.chapter, k.level);
    const counter = current.mode.type === "review" ? "" : `<span class="pill-count">${Math.min(st.passed, st.target)}/${st.target}</span>`;
    const tpl = C.byId[k.id];
    const chips = [`<span class="chip">Ch. ${k.chapter} · ${C.LEVELS[k.level - 1].name}</span>`];
    if (k.original) chips.push(`<span class="chip pdf">Course PDF ${esc(tpl.source.replace("PDF ", ""))} · original numbers</span>`);
    else if (tpl.source) chips.push(`<span class="chip">Variant of ${esc(tpl.source)}</span>`);

    app.innerHTML = bar(`<button class="back-btn" data-act="leave" aria-label="Leave the case">‹</button>`, esc(k.title), `${esc(k.co)} · ${modeText(current.mode)}`, counter) + `
      <main class="wrap" id="main">
        ${audited ? verdictHTML(res) : ""}
        <section class="case-intro">
          <div class="client">${chips.join("")}</div>
          <h2>${esc(k.co)} · FY ${k.y}</h2>
          <p class="brief">${esc(k.brief)}</p>
        </section>
        <details class="docs" ${audited ? "" : "open"}>
          <summary class="block-title"><h3>Documents on your desk · ${k.docs.length}</h3><span class="toggle"></span></summary>
          ${docsHTML(k.docs)}
        </details>
        <div class="block-title"><h3>Working paper</h3><span class="small">Amounts in EUR</span></div>
        <div class="paper">${k.paper.sections.map(s => sectionHTML(s, resMap, audited)).join("")}</div>
        <div class="checks">${(k.checks || []).map((c, i) => `<div class="check idle" data-check="${i}"></div>`).join("")}</div>
        ${audited ? findingsHTML(res, resMap) : ""}
      </main>
      <div class="dock"><div class="dock-inner">${audited
        ? `<button class="ghost" data-act="leave">${current.mode.type === "level" ? "Chapter" : "Desk"}</button><button class="primary" data-act="next">Next case →</button>`
        : `<span class="dock-info" id="dockInfo"></span><button class="primary" data-act="submit">Submit for audit</button>`}</div></div>`;
    updateChecks();
    updateDock();
  }

  function docsHTML(docs) {
    return docs.map(d => `<article class="doc doc-${esc(d.kind)}">
      <div class="doc-head"><span aria-hidden="true">${DOC_ICONS[d.kind] || "📄"}</span><strong>${esc(d.title)}</strong></div>
      ${d.lines.length ? `<dl>${d.lines.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>` : ""}
      ${d.note ? `<p class="doc-note">${esc(d.note)}</p>` : ""}
    </article>`).join("");
  }

  function sectionHTML(s, resMap, audited) {
    const n = s.cols ? s.cols.length : 1;
    const head = `<div class="wp-head"><span>${esc(s.title)}</span>${s.cols ? s.cols.map(c => `<span class="wp-col">${esc(c)}</span>`).join("") : ""}</div>`;
    const rows = s.rows.map(row => {
      const only = row.cells.length === 1 ? row.cells[0] : null;
      if (only && only.t === "choice") return choiceRowHTML(row, only, resMap, audited);
      const cells = row.cells.map((c, i) => cellHTML(c, resMap, audited, s.cols ? s.cols[i] : "")).join("");
      return `<div class="wp-row${row.total ? " total" : ""}${row.grand ? " grand" : ""}"><div class="wp-label">${esc(row.label)}${row.sub ? `<small>${esc(row.sub)}</small>` : ""}</div>${cells}</div>`;
    }).join("");
    return `<div class="wp-section cols-${n}" style="--n:${n}">${head}${rows}</div>`;
  }

  function cellHTML(cell, resMap, audited, col) {
    const cap = col ? `<i class="cap">${esc(col)}</i>` : "";
    if (!cell) return `<div class="cell blank" aria-hidden="true"></div>`;
    if (cell.t === "given") return `<div class="cell given">${cap}<span class="v">${esc(C.fmt(cell.value, cell.fmt))}</span></div>`;
    return `<button type="button" class="${cellClass(cell, resMap, audited)}" data-cell="${esc(cell.key)}" aria-label="${esc(cellLabel(cellMap[cell.key] || cell))}">${cap}${cellInner(cell, resMap, audited)}</button>`;
  }
  function cellClass(cell, resMap, audited) {
    const e = current.entries[cell.key];
    let cls = "cell input";
    if (filled(e)) cls += " filled";
    else if (e && e.expr) cls += " invalid";
    if (audited) cls += resMap[cell.key].ok ? " ok" : " bad";
    if (!audited && cell.key === active) cls += " active";
    return cls;
  }
  function cellInner(cell, resMap, audited) {
    const e = current.entries[cell.key];
    const dot = current.hints[cell.key] ? `<i class="hint-dot" title="Hint used">💡</i>` : "";
    if (audited) {
      const r = resMap[cell.key];
      if (r.ok) return `${dot}<span class="v">${esc(valueText(e, cell))}</span>`;
      return `${dot}<span class="yours">${filled(e) ? esc(valueText(e, cell)) : "empty"}</span><span class="exp">${esc(C.fmt(cell.ans, cell.fmt))}</span>`;
    }
    if (!e || !e.expr) return `${dot}<span class="ph">tap to enter</span>`;
    const v = filled(e) ? valueText(e, cell) : "?";
    return `${dot}<span class="v">${esc(v)}</span>${hasOp(e.expr) ? `<span class="expr">${esc(pretty(e.expr))}</span>` : ""}`;
  }
  function updateCell(key) {
    const el = app.querySelector(`[data-cell="${CSS.escape(key)}"]`);
    if (!el) return;
    const cell = cellMap[key];
    el.className = cellClass(cell, {}, false);
    const cap = el.querySelector(".cap");
    el.innerHTML = (cap ? cap.outerHTML : "") + cellInner(cell, {}, false);
  }

  function choiceRowHTML(row, cell, resMap, audited) {
    const e = current.entries[cell.key], val = e ? e.value : null;
    const pills = cell.options.map(opt => {
      let cls = "choice";
      if (val === opt) cls += " sel";
      if (audited && opt === cell.ans) cls += " correct";
      else if (audited && val === opt) cls += " wrong";
      return `<button type="button" class="${cls}" data-choice="${esc(cell.key)}" data-opt="${esc(opt)}" aria-pressed="${val === opt}">${esc(opt)}</button>`;
    }).join("");
    return `<div class="wp-row choice-row" data-row="${esc(cell.key)}"><div class="wp-label">${esc(row.label)}</div><div class="choices" role="group" aria-label="${esc(row.label)}">${pills}</div></div>`;
  }

  function updateChecks() {
    (kase.checks || []).forEach((ch, i) => {
      const el = app.querySelector(`[data-check="${i}"]`);
      if (!el) return;
      const r = C.evalCheck(ch, current.entries);
      el.className = "check " + (!r.ready ? "idle" : r.ok ? "ok" : "warn");
      el.innerHTML = `<span aria-hidden="true">⚖️</span><span>${esc(ch.label)}</span><b>${!r.ready ? "fill the lines to check" : r.ok ? "ties ✓" : "off by " + esc(C.fmt(r.diff))}</b>`;
    });
  }
  function updateDock() {
    const info = $("#dockInfo");
    if (!info || !kase) return;
    const n = kase.cells.filter(c => filled(current.entries[c.key])).length;
    info.textContent = `${n}/${kase.cells.length} lines`;
  }

  function verdictHTML(res) {
    const k = kase, st = C.levelState(progress, k.chapter, k.level);
    const stars = "★".repeat(res.stars) + "☆".repeat(3 - res.stars);
    const hints = res.results.filter(r => r.hinted).length;
    const counts = current.mode.type !== "review";
    const events = (current.audit.events || []).map(ev => {
      if (ev.type === "cleared") return `<div class="event">🎉 <span>${esc(ev.name)} cleared in chapter ${ev.ch}!</span></div>`;
      if (ev.type === "unlocked") return `<div class="event">🔓 <span>${esc(ev.name)} is now unlocked.</span><a class="primary" href="#/ch/${ev.ch}">Open</a></div>`;
      if (ev.type === "promoted") return `<div class="event">🏅 <span>Promoted to ${esc(ev.name)}.</span></div>`;
      return "";
    }).join("");
    const progressLine = counts
      ? `<div class="meter" aria-hidden="true"><span style="width:${pct(st.passed, st.target)}%"></span></div><p class="small">${st.name}: ${Math.min(st.passed, st.target)}/${st.target} cases passed · ${st.covered}/${st.total} case types met${res.passed ? "" : " · this case does not count"}</p>`
      : `<p class="small">Re-audits do not count towards levels. ${res.stars === 3 ? "This case leaves the re-audit list." : "It stays on the re-audit list."}</p>`;
    return `<section class="verdict v${res.stars}" aria-live="polite">
      <div class="verdict-top"><span class="stamp">${esc(res.opinion.short)}</span><span class="stars" aria-label="${res.stars} of 3 stars">${stars}</span></div>
      <h2>${esc(res.opinion.name)}</h2>
      <p>${res.correct}/${res.n} lines correct${hints ? ` · ${hints} hint${hints === 1 ? "" : "s"} used` : ""}. ${esc(res.opinion.note)}</p>
      ${progressLine}${events}
    </section>`;
  }

  function findingsHTML(res, resMap) {
    const wrong = kase.cells.filter(c => !resMap[c.key].ok);
    const tag = r => r.empty ? `<span class="tag bad">Missing</span>` : r.signFlip ? `<span class="tag warn">Wrong sign</span>` : `<span class="tag bad">Misstated</span>`;
    const item = (c, showTag) => {
      const r = resMap[c.key], e = current.entries[c.key];
      const nums = r.ok
        ? `<p class="f-nums">Answer: <b>${esc(C.fmt(c.t === "choice" ? null : c.ans, c.fmt) || c.ans)}</b>${r.hinted ? " · hint used" : ""}</p>`
        : `<p class="f-nums">You: <s>${filled(e) ? esc(valueText(e, c)) : "—"}</s> → Correct: <b>${esc(c.t === "choice" ? c.ans : C.fmt(c.ans, c.fmt))}</b></p>`;
      return `<article class="finding${r.ok ? " ok" : ""}"><div class="f-head"><strong>${esc(cellLabel(c))}</strong>${showTag ? (r.ok ? `<span class="tag ok">Correct</span>` : tag(r)) : ""}</div>${nums}<p>${esc(c.why)}</p></article>`;
    };
    return `<div class="block-title"><h3>Audit findings · ${wrong.length}</h3></div>
      ${wrong.length ? wrong.map(c => item(c, true)).join("") : `<p class="small">No findings: every line agrees with the auditor's working.</p>`}
      <div class="rule"><strong>The principle</strong>${esc(kase.rule)}</div>
      <details class="workings"><summary>All the workings (${kase.cells.length} lines)</summary>${kase.cells.map(c => item(c, true)).join("")}</details>`;
  }

  // ---------- Keypad ----------
  const KEYS = [["7", "8", "9", "÷", "back"], ["4", "5", "6", "×", "("], ["1", "2", "3", "−", ")"], ["0", "000", ".", "+", "%"]];
  function buildKeypad() {
    keypad.innerHTML = `<div class="kp-inner">
      <div class="kp-top">
        <div class="kp-info"><div class="kp-label" id="kpLabel"></div><div class="kp-display"><span class="kp-expr" id="kpExpr"></span><span class="kp-value" id="kpValue"></span></div></div>
        <div class="kp-tools"><button type="button" data-k="docs" aria-label="Show the documents">📎</button><button type="button" data-k="hint" id="kpHintBtn">💡 Hint</button></div>
      </div>
      <div class="kp-hint" id="kpHint" hidden></div>
      <div class="kp-grid">${KEYS.map(row => row.map(k => {
        const op = /[÷×−+()%]/.test(k);
        if (k === "back") return `<button type="button" class="key op" data-k="back" aria-label="Delete (hold to clear)">⌫</button>`;
        return `<button type="button" class="key${op ? " op" : ""}${k === "000" ? " small-key" : ""}" data-k="${k}">${k}</button>`;
      }).join("")).join("")}</div>
      <div class="kp-nav"><button type="button" data-k="prev">‹ Prev</button><button type="button" data-k="done">Done</button><button type="button" class="primary" data-k="next">Next ›</button></div>
    </div>`;
  }

  function openCell(key) {
    if (!kase || !cellMap[key]) return;
    if (current.audit) return showWhy(key);
    const cell = cellMap[key];
    if (cell.t === "choice") {
      closeKeypad();
      const row = app.querySelector(`[data-row="${CSS.escape(key)}"]`);
      if (row) { row.scrollIntoView({ block: "center", behavior: "smooth" }); row.classList.remove("flash"); void row.offsetWidth; row.classList.add("flash"); }
      return;
    }
    const prev = active;
    active = key;
    if (prev && prev !== key) updateCell(prev);
    updateCell(key);
    showKeypad();
    refreshKeypad();
    scrollToActive();
  }
  function showKeypad() {
    if (keypad.hidden) {
      keypad.hidden = false;
      document.body.classList.add("kp-open");
    }
    document.documentElement.style.setProperty("--kp-h", keypad.offsetHeight + "px");
  }
  function closeKeypad() {
    const prev = active;
    active = null;
    if (!keypad.hidden) { keypad.hidden = true; document.body.classList.remove("kp-open"); }
    if (prev && kase && current && !current.audit) updateCell(prev);
  }
  function scrollToActive() {
    const el = active && app.querySelector(`[data-cell="${CSS.escape(active)}"]`);
    if (!el) return;
    requestAnimationFrame(() => {
      const kh = keypad.hidden ? 0 : keypad.offsetHeight;
      const hh = ($(".bar") || { offsetHeight: 0 }).offsetHeight;
      const rect = el.getBoundingClientRect();
      const row = el.closest(".wp-row") || el;
      const rowRect = row.getBoundingClientRect();
      const limit = window.innerHeight - kh - 12;
      if (rect.bottom > limit) window.scrollBy({ top: rect.bottom - limit + 24, behavior: "smooth" });
      else if (rowRect.top < hh + 8) window.scrollBy({ top: rowRect.top - hh - 16, behavior: "smooth" });
    });
  }
  function refreshKeypad() {
    if (!active) return;
    const cell = cellMap[active], e = current.entries[active];
    const pos = order.indexOf(active) + 1;
    $("#kpLabel").textContent = `${pos}/${order.length} · ${cellLabel(cell)}`;
    $("#kpExpr").textContent = e && e.expr ? pretty(e.expr) : "";
    const v = e && e.expr ? C.evaluate(e.expr) : NaN;
    $("#kpValue").textContent = e && e.expr ? (isFinite(v) ? (hasOp(e.expr) ? "= " : "") + C.fmt(v, cell.fmt) : "…") : (cell.fmt === "pct" ? "type the % figure" : "");
    const hinted = !!current.hints[active];
    const hint = $("#kpHint");
    hint.hidden = !hinted;
    hint.textContent = hinted ? `💡 ${cell.hint}` : "";
    $("#kpHintBtn").classList.toggle("used", hinted);
    $("#kpHintBtn").textContent = hinted ? "💡 Used" : "💡 Hint";
    const expr = $("#kpExpr");
    expr.scrollLeft = expr.scrollWidth;
    document.documentElement.style.setProperty("--kp-h", keypad.offsetHeight + "px");
  }

  function press(k) {
    if (!active) return;
    const cell = cellMap[active];
    const e = current.entries[active] || { expr: "", value: null };
    let s = e.expr || "";
    if (k === "back") s = s.slice(0, -1);
    else if (k === "clear") s = "";
    else if ("+×÷−".includes(k)) {
      if (k === "−" && (s === "" || /[×÷(]$/.test(s))) s += k;
      else if (!s || s === "−") return;
      else s = s.replace(/[+×÷−]$/, "") + k;
    } else if (k === ".") {
      const lastNum = s.split(/[+×÷−()%]/).pop();
      if (lastNum.includes(".")) return;
      s += lastNum === "" ? "0." : ".";
    } else s += k;
    if (s.length > 40) return;
    e.expr = s;
    const v = C.evaluate(s);
    e.value = isFinite(v) ? v : null;
    if (s) current.entries[active] = e; else delete current.entries[active];
    if (cell) persistCurrent();
    updateCell(active);
    refreshKeypad();
    updateChecks();
    updateDock();
  }

  function move(step) {
    if (!active) return;
    const e = current.entries[active];
    if (e && e.expr && !filled(e)) {
      $("#kpExpr").classList.remove("shake"); void $("#kpExpr").offsetWidth; $("#kpExpr").classList.add("shake");
      return;
    }
    const i = order.indexOf(active) + step;
    if (i < 0) return;
    if (i >= order.length) {
      closeKeypad();
      const submit = app.querySelector("[data-act=submit]");
      if (submit) submit.focus({ preventScroll: true });
      toast(kase.cells.every(c => filled(current.entries[c.key])) ? "All lines filled. Submit for audit when ready." : "Last line reached.");
      return;
    }
    openCell(order[i]);
  }

  function useHint() {
    if (!active || current.hints[active]) return;
    current.hints[active] = true;
    persistCurrent();
    updateCell(active);
    refreshKeypad();
  }

  keypad.addEventListener("click", ev => {
    const b = ev.target.closest("[data-k]");
    if (!b) return;
    const k = b.dataset.k;
    if (k === "back" && press.cleared) { press.cleared = false; return; }
    if (k === "next") move(1);
    else if (k === "prev") move(-1);
    else if (k === "done") closeKeypad();
    else if (k === "hint") useHint();
    else if (k === "docs") openSheet("Documents", docsHTML(kase.docs));
    else press(k);
  });
  // Hold ⌫ to clear the line.
  let holdTimer = null;
  keypad.addEventListener("pointerdown", ev => {
    if (!ev.target.closest("[data-k=back]")) return;
    holdTimer = setTimeout(() => { press("clear"); press.cleared = true; }, 500);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(t => keypad.addEventListener(t, () => clearTimeout(holdTimer)));

  document.addEventListener("keydown", ev => {
    if (!sheet.hidden && ev.key === "Escape") return closeSheet();
    if (!active || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const map = { "*": "×", "x": "×", "/": "÷", "-": "−", "+": "+", "(": "(", ")": ")", "%": "%", ".": ".", ",": ".", "Backspace": "back" };
    let k = /^\d$/.test(ev.key) ? ev.key : map[ev.key];
    if (ev.key === "Enter" || (ev.key === "Tab" && !ev.shiftKey)) { ev.preventDefault(); return move(1); }
    if (ev.key === "Tab" && ev.shiftKey) { ev.preventDefault(); return move(-1); }
    if (ev.key === "Escape") return closeKeypad();
    if (k) { ev.preventDefault(); press(k); }
  });

  // ---------- Sheet ----------
  function openSheet(title, html) {
    sheet.innerHTML = `<div class="sheet-panel" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-head"><strong>${esc(title)}</strong><button class="icon-btn" data-sheet="close" aria-label="Close">✕</button></div><div class="sheet-body">${html}</div></div>`;
    sheet.hidden = false;
    const btn = sheet.querySelector("[data-sheet=close]");
    if (btn) btn.focus({ preventScroll: true });
  }
  function closeSheet() { sheet.hidden = true; sheet.innerHTML = ""; }
  sheet.addEventListener("click", ev => {
    if (ev.target === sheet || ev.target.closest("[data-sheet=close]")) closeSheet();
  });
  function showWhy(key) {
    const c = cellMap[key], e = current.entries[key];
    const r = C.gradeCell(c, e);
    const answer = c.t === "choice" ? c.ans : C.fmt(c.ans, c.fmt);
    const yours = filled(e) ? valueText(e, c) : "—";
    openSheet(cellLabel(c), `<p>${r.ok ? `✅ Your answer <b>${esc(yours)}</b> is right.` : `❌ You entered <b>${esc(yours)}</b>. The auditor's figure is <b>${esc(answer)}</b>.${r.signFlip ? " The amount is right but the sign is not." : ""}`}</p>
      <div class="why-box">${esc(c.why)}</div>
      <p class="small">Hint: ${esc(c.hint)}</p>`);
  }

  // ---------- Submitting ----------
  function submit() {
    const empty = kase.cells.filter(c => !filled(current.entries[c.key])).length;
    if (empty && !confirm(`${empty} line${empty === 1 ? " is" : "s are"} still empty and will count as wrong. Submit for audit anyway?`)) return;
    closeKeypad();
    hideToast();
    const res = C.audit(kase, current.entries, current.hints);
    const events = C.record(progress, kase, res, current.mode, today());
    persist();
    current.audit = { stars: res.stars, events };
    persistCurrent();
    renderCase();
    window.scrollTo(0, 0);
  }

  // ---------- Clicks ----------
  app.addEventListener("click", ev => {
    const t = ev.target.closest("[data-act],[data-cell],[data-choice],[data-play]");
    if (!t) {
      if (active && !ev.target.closest(".keypad")) closeKeypad();
      return;
    }
    if (t.dataset.cell) return openCell(t.dataset.cell);
    if (t.dataset.choice) {
      const key = t.dataset.choice;
      if (current.audit) return showWhy(key);
      current.entries[key] = { value: t.dataset.opt };
      persistCurrent();
      const row = t.closest(".wp-row");
      $$(".choice", row).forEach(b => { const on = b.dataset.opt === t.dataset.opt; b.classList.toggle("sel", on); b.setAttribute("aria-pressed", on); });
      updateChecks();
      updateDock();
      return;
    }
    if (t.dataset.play) {
      const ch = +location.hash.split("/")[2];
      return startLevel(ch, +t.dataset.play);
    }
    const act = t.dataset.act;
    if (act === "theme") toggleTheme();
    else if (act === "resume") go("#/case");
    else if (act === "daily") startDaily();
    else if (act === "review") startReview();
    else if (act === "leave") leaveCase();
    else if (act === "submit") submit();
    else if (act === "next") nextCase();
  });

  window.addEventListener("resize", () => { if (!keypad.hidden) { document.documentElement.style.setProperty("--kp-h", keypad.offsetHeight + "px"); scrollToActive(); } });
  window.addEventListener("hashchange", route);

  buildKeypad();
  route();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
  }
})();
