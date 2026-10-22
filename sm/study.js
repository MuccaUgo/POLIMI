/* Strategy & Marketing Study Hub — deck sheets, spaced-repetition flashcards, written and oral drills,
   number exercises and the study plan. Content comes from content.js (SM_CONTENT).

   Progress is kept in this browser. When the hub runs inside Claude (as an artifact) two extras light up:
   progress syncs to the viewer's account (db capability) and the drills can ask Claude for feedback
   (sample capability). Everywhere else those features stay hidden. */
(function () {
  "use strict";
  var C = window.SM_CONTENT;
  if (!C) return;
  var DECKS = C.DECKS, MOD = C.DECK_BY_ID, COMING = C.COMING, SHEETS = C.SHEETS, CARDS = C.CARDS, CASES = C.CASES, ORAL = C.ORAL, hash = C.hash;

  /* Each deck opens its own area of the concept browser and quiz bank (data.js TOPICS). */
  var TOPIC_OF = {
    intro: "Introduction", strat: "The Concept of Strategy", ext: "External Analysis",
    ca: "Competitive Advantage", int: "Internal Analysis", swot: "SWOT & Alternatives",
    bmc: "Business Model", corp: "Corporate Strategy",
    mk1: "Market Demand", mk2: "Segmentation", mk3: "Targeting & Positioning"
  };
  function hasTopic(name) {
    return typeof TOPICS !== "undefined" && TOPICS.some(function (t) { return t.name === name; });
  }

  /* ---------------- utilities ---------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var dstr = function (d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  var today = function () { return dstr(new Date()); };
  function addDays(s, n) { var p = s.split("-").map(Number); return dstr(new Date(p[0], p[1] - 1, p[2] + n)); }
  function daysBetween(a, b) {
    var x = a.split("-").map(Number), y = b.split("-").map(Number);
    return Math.round((Date.UTC(y[0], y[1] - 1, y[2]) - Date.UTC(x[0], x[1] - 1, x[2])) / 864e5);
  }
  function fmtDate(s, opt) { var p = s.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString("en-GB", opt || { day: "numeric", month: "short" }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function stable(o) {
    if (o === null || typeof o !== "object") return JSON.stringify(o);
    if (Array.isArray(o)) return "[" + o.map(stable).join(",") + "]";
    return "{" + Object.keys(o).sort().map(function (k) { return JSON.stringify(k) + ":" + stable(o[k]); }).join(",") + "}";
  }
  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); }
  function words(s) { s = String(s || "").trim(); return s ? s.split(/\s+/).length : 0; }

  var DEFAULT_EXAM = "2027-01-25";   // assumed until the student sets the real date
  var LECTURES_END = "2026-12-18";   // the course ends in December
  var PROJECT_DEADLINE = "2027-01-07";
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120];

  /* ---------------- state ---------------- */
  var LS_P = "strategos.v1.progress", LS_A = "strategos.v1.answers", LS_UI = "sm_study_ui";
  function lsGet(k) { try { var s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function blankP() { return { v: 1, cards: {}, read: {}, log: {}, newLog: {}, oral: {}, prefs: { newPerDay: 12, examDate: "", t: 0 }, updatedAt: 0 }; }
  function normP(x) {
    var b = blankP(); if (!x || typeof x !== "object") return b;
    ["cards", "read", "log", "newLog", "oral"].forEach(function (k) { b[k] = Object.assign({}, x[k] || {}); });
    b.prefs = Object.assign(b.prefs, x.prefs || {}); b.updatedAt = x.updatedAt || 0; return b;
  }
  function normA(x) { var b = { v: 1, items: {}, updatedAt: 0 }; if (!x || typeof x !== "object") return b; b.items = Object.assign({}, x.items || {}); b.updatedAt = x.updatedAt || 0; return b; }
  function newer(x, y) { return !x ? y : !y ? x : ((y.t || 0) > (x.t || 0) ? y : x); }
  function mergeP(a, b) {
    var o = blankP();
    ["cards", "oral", "read"].forEach(function (k) { [a, b].forEach(function (s) { Object.keys(s[k] || {}).forEach(function (id) { o[k][id] = newer(o[k][id], s[k][id]); }); }); });
    ["log", "newLog"].forEach(function (k) { [a, b].forEach(function (s) { Object.keys(s[k] || {}).forEach(function (d) { o[k][d] = Math.max(o[k][d] || 0, s[k][d]); }); }); });
    o.prefs = ((b.prefs && b.prefs.t) || 0) > ((a.prefs && a.prefs.t) || 0) ? Object.assign({}, b.prefs) : Object.assign({}, a.prefs);
    o.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0); return o;
  }
  function mergeA(a, b) {
    var o = { v: 1, items: {}, updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0) };
    [a, b].forEach(function (s) { Object.keys(s.items || {}).forEach(function (id) { o.items[id] = newer(o.items[id], s.items[id]); }); });
    return o;
  }
  var P = normP(lsGet(LS_P)), A = normA(lsGet(LS_A));
  var UI = Object.assign({ deck: null, pmode: "cases", caseId: null, oralMod: "all", numType: "mixed", revScope: "all", revMode: "due" }, lsGet(LS_UI) || {});
  UI.deck = null; UI.caseId = null;
  function saveUI() { lsSet(LS_UI, { pmode: UI.pmode, oralMod: UI.oralMod, numType: UI.numType, revScope: UI.revScope, revMode: UI.revMode }); }
  function saveP() { P.updatedAt = Date.now(); lsSet(LS_P, P); queueWrite("p"); }
  function saveA() { A.updatedAt = Date.now(); lsSet(LS_A, A); queueWrite("a", 1200); }

  /* ---------------- account sync (only inside Claude) ---------------- */
  var Sync = { on: false, ref: null, timer: {}, writing: {}, dirty: {}, retry: {}, status: "local" };
  function setStatus(s) { Sync.status = s; $$("[data-sx-sync]").forEach(function (el) { el.textContent = syncLabel(); }); }
  function syncLabel() { return Sync.status === "synced" ? "Progress synced to your Claude account" : Sync.status === "syncing" ? "Syncing…" : "Progress saved in this browser"; }
  function claudeUse(name) { var c = window.claude; return c && typeof c.use === "function" ? c.use(name).catch(function () { return null; }) : Promise.resolve(null); }
  function initSync() {
    Promise.all([claudeUse("db"), claudeUse("user")]).then(function (r) {
      var db = r[0], user = r[1]; if (!db || !user) return;
      return user.id().then(function (uid) {
        if (!uid) return;
        try { var col = db.collection("data/users/" + uid); Sync.ref = { p: col.doc("progress"), a: col.doc("answers") }; } catch (e) { return; }
        Sync.on = true; setStatus("syncing");
        document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && Sync.on) pull(); });
        return pull();
      });
    }).catch(function () {});
  }
  function pull() {
    return Promise.all([Sync.ref.p.get(), Sync.ref.a.get()]).then(function (r) {
      var rp = r[0].exists ? normP(r[0].data()) : null, ra = r[1].exists ? normA(r[1].data()) : null;
      var bp = stable(P), ba = stable(A);
      if (rp) P = mergeP(P, rp); if (ra) A = mergeA(A, ra);
      lsSet(LS_P, P); lsSet(LS_A, A);
      var hasP = Object.keys(P.cards).length || Object.keys(P.read).length || P.prefs.t || Object.keys(P.oral).length;
      if (hasP && (!rp || stable(rp) !== stable(P))) queueWrite("p", 300);
      if (Object.keys(A.items).length && (!ra || stable(ra) !== stable(A))) queueWrite("a", 300);
      setStatus("synced");
      if (stable(P) !== bp || stable(A) !== ba) softRender();
    }).catch(onDbError);
  }
  function queueWrite(k, delay) { if (!Sync.on) return; clearTimeout(Sync.timer[k]); Sync.timer[k] = setTimeout(function () { flush(k); }, delay == null ? 1500 : delay); }
  function flush(k) {
    if (!Sync.on) return;
    if (Sync.writing[k]) { Sync.dirty[k] = true; return; }
    Sync.writing[k] = true; Sync.dirty[k] = false; setStatus("syncing");
    Sync.ref[k].set(JSON.parse(JSON.stringify(k === "p" ? P : A))).then(function () {
      Sync.retry[k] = 0; setStatus("synced"); Sync.writing[k] = false; if (Sync.dirty[k]) queueWrite(k, 600);
    }, function (e) {
      Sync.writing[k] = false;
      var code = e && e.code;
      if ((code === "unavailable" || code === "resource_exhausted") && (Sync.retry[k] || 0) < 2) { Sync.retry[k] = (Sync.retry[k] || 0) + 1; queueWrite(k, code === "unavailable" ? 800 + Math.random() * 1500 : 6000); return; }
      onDbError(e);
    });
  }
  function onDbError(e) { var code = e && e.code; if (code !== "unavailable" && code !== "resource_exhausted") Sync.on = false; setStatus("local"); }

  /* ---------------- feedback from Claude (only inside Claude) ---------------- */
  var SAMPLE = null, running = {};
  function initSample() { claudeUse("sample").then(function (s) { SAMPLE = s; softRender(); }); }
  var SAMPLE_MSG = { rate_limited: "Too many requests right now. Try again in a few minutes.", session_expired: "Your session expired. Sign in again, then retry.", refused: "Claude declined this request. Edit your answer and try again.", empty_completion: "No feedback came back. Try again with a shorter answer.", invalid_json: "The feedback came back in an unreadable form. Try again.", prompt_too_large: "Your answer is too long to grade. Shorten it and try again.", upstream_error: "The connection failed. Try again." };
  var HIDE_CODES = ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"];
  function feedbackPrompt(ctx) {
    return 'You are grading an answer for the Politecnico di Milano MSc course "Strategy & Marketing" (strategy: Prof. Vittorio Chiesa; marketing: Gloria Peggiani; textbooks Grant and Kotler). The written exam gives a short case and open questions graded on three skills: Assess (external and/or internal analysis of the competitive scenario), Apply (using the right strategy and marketing tools), Envision (original, rigorous solutions). The oral exam tests applying the concepts to cases.\n\n' +
      (ctx.kind === "oral" ? "ORAL QUESTION" : "CASE") + ":\n" + (ctx.caseText || "") + "\n\nQUESTION (" + ctx.skill + "): " + ctx.q +
      "\n\nWHAT A STRONG ANSWER COVERS (course frameworks and evidence):\n- " + ctx.points.join("\n- ") +
      '\n\nSTUDENT ANSWER:\n"""\n' + ctx.answer + '\n"""\n\nGrade strictly but fairly against the course frameworks. Reward correct use of the course\'s tools with case evidence and a clear conclusion; penalise generic statements and missing judgement. Reply with only a JSON object:\n{"score": integer 0-10, "verdict": "one sentence", "strengths": ["up to 3 short items"], "gaps": ["up to 4 concrete items: what is missing or wrong"], "frameworks_to_add": ["course tools or concepts the answer should use"], "next_step": "one concrete sentence on how to improve"}';
  }
  function askFeedback(key, ctx, onDone) {
    if (!SAMPLE) return;
    if (running[key]) { running[key].abort(); return; }
    var ctl = new AbortController(); running[key] = ctl; softRender();
    SAMPLE.json(feedbackPrompt(ctx), { signal: ctl.signal, modelTier: "default" }).then(function (r) {
      if (!r || typeof r !== "object") throw { code: "invalid_json" };
      var arr = function (x, n) { return (Array.isArray(x) ? x : []).map(String).slice(0, n); };
      onDone({ score: Math.max(0, Math.min(10, parseInt(r.score, 10) || 0)), verdict: String(r.verdict || ""), strengths: arr(r.strengths, 3), gaps: arr(r.gaps, 4), frameworks: arr(r.frameworks_to_add, 5), next: String(r.next_step || "") }, null);
    }).catch(function (e) {
      var code = e && e.code;
      if (HIDE_CODES.indexOf(code) >= 0) { SAMPLE = null; onDone(null, "Feedback from Claude is not available here."); }
      else if (code !== "cancelled") onDone(null, SAMPLE_MSG[code] || SAMPLE_MSG.upstream_error);
    }).then(function () { delete running[key]; softRender(); });
  }
  function fbHTML(fb) {
    if (!fb) return "";
    var list = function (a) { return a && a.length ? "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : '<p class="small">—</p>'; };
    return '<div class="sx-fb"><div class="sx-row sx-between"><span class="eyebrow">Claude\'s feedback</span><span class="sx-score">' + esc(fb.score) + '<span class="small">/10</span></span></div>' +
      "<p>" + esc(fb.verdict) + '</p><div class="sx-grid2"><div><div class="kicker">Strengths</div>' + list(fb.strengths) + '</div><div><div class="kicker">Gaps</div>' + list(fb.gaps) + "</div></div>" +
      (fb.frameworks && fb.frameworks.length ? '<div><div class="kicker">Tools to add</div>' + list(fb.frameworks) + "</div>" : "") +
      (fb.next ? "<p><b>Next:</b> " + esc(fb.next) + "</p>" : "") + "</div>";
  }

  /* ---------------- spaced repetition ---------------- */
  function nextFor(st, g) {
    var b = st ? st.b : 0;
    if (g === 0) return { b: 1, days: 0 };
    if (g === 1) { b = Math.max(1, b); return { b: b, days: Math.max(1, Math.round(INTERVALS[b] / 2)) }; }
    if (g === 2) { b = Math.min(b + 1, 7); return { b: b, days: INTERVALS[b] }; }
    b = Math.min(b + 2, 7); return { b: b, days: INTERVALS[b] };
  }
  function grade(card, g) {
    var st = P.cards[card.id], t = today(), isNew = !st, n = nextFor(st, g);
    P.cards[card.id] = { b: n.b, d: addDays(t, n.days), n: (st ? st.n : 0) + 1, l: (st ? st.l : 0) + (g === 0 ? 1 : 0), t: Date.now() };
    P.log[t] = (P.log[t] || 0) + 1; if (isNew) P.newLog[t] = (P.newLog[t] || 0) + 1;
    saveP();
  }
  function poolFor(scope) {
    var ids = scope === "all" ? DECKS.map(function (m) { return m.id; }) : scope === "str" || scope === "mkt" ? DECKS.filter(function (m) { return m.track === scope; }).map(function (m) { return m.id; }) : [scope];
    return CARDS.filter(function (c) { return ids.indexOf(c.m) >= 0; });
  }
  function stats(scope) {
    var t = today(), pool = poolFor(scope), due = 0, unseen = 0;
    pool.forEach(function (c) { var s = P.cards[c.id]; if (!s) unseen++; else if (s.d <= t) due++; });
    var left = Math.max(0, (P.prefs.newPerDay || 12) - (P.newLog[t] || 0));
    return { due: due, unseen: unseen, newToday: Math.min(unseen, left), total: pool.length };
  }
  function mastery(m) {
    var pool = poolFor(m), s = 0, l = 0;
    pool.forEach(function (c) { var st = P.cards[c.id]; if (!st) return; if (st.b >= 3) s++; else l++; });
    return { solid: s, learning: l, total: pool.length };
  }
  function streak() { var n = 0, d = today(); if (!(P.log[d] > 0)) d = addDays(d, -1); while (P.log[d] > 0) { n++; d = addDays(d, -1); } return n; }
  function buildQueue(scope, mode) {
    var t = today(), pool = poolFor(scope);
    if (mode === "cram") return shuffle(pool);
    var due = shuffle(pool.filter(function (c) { return P.cards[c.id] && P.cards[c.id].d <= t; })).sort(function (a, b) { return P.cards[a.id].d < P.cards[b.id].d ? -1 : 1; });
    var order = DECKS.map(function (m) { return m.id; });
    var fresh = pool.filter(function (c) { return !P.cards[c.id]; }).sort(function (a, b) { return order.indexOf(a.m) - order.indexOf(b.m); }).slice(0, stats(scope).newToday);
    var q = [], step = fresh.length ? Math.max(1, Math.floor((due.length + fresh.length) / fresh.length)) : 1, fi = 0;
    for (var i = 0; i < due.length; i++) { if (fi < fresh.length && i % step === 0) q.push(fresh[fi++]); q.push(due[i]); }
    while (fi < fresh.length) q.push(fresh[fi++]);
    return q;
  }
  var ivLabel = function (d) { return d === 0 ? "now" : d === 1 ? "1 day" : d < 30 ? d + " days" : Math.round(d / 30) + " mo"; };

  /* ---------------- exam and plan dates ---------------- */
  function examInfo() { var date = P.prefs.examDate || DEFAULT_EXAM; return { date: date, assumed: !P.prefs.examDate, days: daysBetween(today(), date) }; }
  function phaseOf(d, exam) { if (d < LECTURES_END) return 1; if (daysBetween(d, exam) > 21) return 2; return 3; }
  var PHASES = { 1: { name: "Keep pace", short: "Follow the lectures; review daily; one written drill a week" }, 2: { name: "Consolidate", short: "Close the gaps; full cases weekly; numbers and oral drills" }, 3: { name: "Exam mode", short: "Timed mock cases; oral simulations; cram weak decks" } };
  function weekPlan() {
    var ex = examInfo(), t = today(), p = t.split("-").map(Number), dow = (new Date(p[0], p[1] - 1, p[2]).getDay() + 6) % 7, ws = addDays(t, -dow);
    var weeks = [], i = 0, drill = 0, full = 0, ordered = [];
    for (var qi = 0; qi < 3; qi++) CASES.forEach(function (c) { ordered.push({ c: c, q: c.qs[qi], qi: qi }); });
    while (ws <= ex.date && i < 30) {
      var we = addDays(ws, 6), ph = phaseOf(ws < t ? t : ws, ex.date), items = [];
      if (i === 0) items.push("Catch up: read sheets 0–3 (Introduction, Strategy, External analysis, Competitive advantage) and start the daily flashcards.");
      else if (i === 1) items.push("Catch up: read sheets 4–7 (Internal analysis, SWOT, Business model, Corporate strategy) and marketing M1–M3.");
      if (ph === 1) {
        if (i >= 2) items.push("After each lecture (strategy and marketing): add the new slides and ask Claude to add the deck; read the new sheet the same day.");
        items.push("Daily: flashcards (about 15–20 minutes) + one Practice 10 on the deck you are studying.");
        var dr = ordered[drill % ordered.length]; drill++;
        items.push("Written drill: <b>" + esc(dr.c.title) + "</b>, question " + (dr.qi + 1) + " (" + dr.q.skill + ").");
        items.push("Weekend: 3 oral questions out loud + 3 number exercises.");
      } else if (ph === 2) {
        var c = CASES[full % CASES.length]; full++;
        items.push("Full case: <b>" + esc(c.title) + "</b>, all three questions, about 25 minutes each.");
        items.push("Re-read the sheets of your weakest decks; clear the Mistakes list.");
        if (ws <= PROJECT_DEADLINE && we >= addDays(PROJECT_DEADLINE, -13)) items.push("Optional group project (L’Oréal Brandstorm or P&amp;G): 15-slide deck due <b>7 Jan 2027</b>.");
        items.push("Daily flashcards continue; one oral question a day.");
      } else {
        var c1 = CASES[full % CASES.length], c2 = CASES[(full + 1) % CASES.length]; full += 2;
        items.push("Two timed mocks: <b>" + esc(c1.title) + "</b> and <b>" + esc(c2.title) + "</b> (written as in the exam, then compared with the outline).");
        items.push("Oral simulation 3× this week: 5 drawn questions in a row, aloud. One Exam Test a day.");
        items.push("Flashcards in “All cards” mode for every deck under 70% solid.");
      }
      weeks.push({ ws: ws, we: we, ph: ph, now: t >= ws && t <= we, html: "<ul>" + items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" });
      ws = addDays(ws, 7); i++;
    }
    return weeks;
  }

  /* ---------------- number exercises ---------------- */
  var R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var f2 = function (x) { return (Math.round(x * 100) / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var fmt = function (x) { return x.toLocaleString("en-GB"); };
  var NUMGEN = {
    dil1: { label: "Dilution · one round", deck: "intro", gen: function () {
      var sp = pick([[50, 30, 20], [40, 40, 20], [60, 40], [34, 33, 33], [70, 30]]), P0 = pick([4, 6, 8, 10, 12, 15, 20]), I = pick([2, 3, 4, 5, 6, 8]), post = P0 + I, ans = sp[0] * P0 / post;
      return { q: "The founders hold " + sp.join("% / ") + "%. A Series A investor puts in <b>€" + I + "m</b> at a <b>€" + P0 + "m pre-money</b> valuation. What stake does the first founder hold after the round?", ans: ans, unit: "%", tol: 0.11,
        sol: "Post-money = " + P0 + " + " + I + " = €" + post + "m<br>Investor = " + I + "/" + post + " = " + f2(I / post * 100) + "%<br>Founder keeps " + sp[0] + "% × " + P0 + "/" + post + " = <b>" + f2(ans) + "%</b>" }; } },
    dil2: { label: "Dilution · two rounds", deck: "intro", gen: function () {
      var P1 = pick([6, 8, 10, 12]), I1 = pick([3, 4, 5, 6]), post1 = P1 + I1, P2 = post1 * pick([2, 3, 4]), I2 = pick([10, 15, 20, 25, 30]), post2 = P2 + I2, a1 = I1 / post1 * 100, ans = a1 * P2 / post2;
      return { q: "Series A: <b>€" + I1 + "m at €" + P1 + "m pre-money</b>. Series B: <b>€" + I2 + "m at €" + P2 + "m pre-money</b>. What is the Series A investor's stake after Series B?", ans: ans, unit: "%", tol: 0.11,
        sol: "After A: " + I1 + "/" + post1 + " = " + f2(a1) + "%<br>Series B post = " + P2 + " + " + I2 + " = €" + post2 + "m → retention " + P2 + "/" + post2 + "<br>" + f2(a1) + "% × " + P2 + "/" + post2 + " = <b>" + f2(ans) + "%</b>" }; } },
    sv: { label: "Shareholder value", deck: "intro", gen: function () {
      var EV = R(8, 40) * 50, D = R(2, 15) * 50, Cs = R(1, 8) * 25, ans = EV - D + Cs;
      return { q: "Enterprise value <b>€" + EV + "m</b>, financial debt <b>€" + D + "m</b>, cash <b>€" + Cs + "m</b>. What is the shareholder (equity) value?", ans: ans, unit: "€m", tol: 0.5, sol: "SV = EV − debt + cash = " + EV + " − " + D + " + " + Cs + " = <b>€" + ans + "m</b>" }; } },
    dol: { label: "Operating leverage", deck: "ext", gen: function () {
      var m = R(2, 9) * 5, Q = R(4, 20) * 1000, FC = Math.round(m * Q * pick([0.3, 0.4, 0.5, 0.6, 0.7, 0.75]) / 1000) * 1000, ans = 1 / (1 - FC / (m * Q));
      return { q: "Unit contribution margin <b>€" + m + "</b>, volume <b>" + fmt(Q) + "</b> units, fixed costs <b>€" + fmt(FC) + "</b>. Compute the degree of operating leverage.", ans: ans, unit: "", tol: 0.02,
        sol: "m·Q = €" + fmt(m * Q) + "; EBIT = " + fmt(m * Q) + " − " + fmt(FC) + " = €" + fmt(m * Q - FC) + "<br>DOL = 1 / (1 − FC/(m·Q)) = <b>" + f2(ans) + "</b><br>So a 10% change in revenue moves EBIT by about " + f2(ans * 10) + "%." }; } },
    learn: { label: "Learning curve", deck: "ca", gen: function () {
      var c = R(20, 80), r = pick([20, 25, 30]), k = R(1, 4), n0 = pick([500, 1000, 2000]), ans = c * Math.pow(1 - r / 100, k);
      return { q: "Unit cost is <b>€" + c + "</b> at a cumulative output of " + fmt(n0) + " units. Costs fall <b>" + r + "%</b> each time cumulative output doubles. What is the unit cost at " + fmt(n0 * Math.pow(2, k)) + " units?", ans: ans, unit: "€", tol: 0.02,
        sol: fmt(n0 * Math.pow(2, k)) + " ÷ " + fmt(n0) + " = 2^" + k + " → " + k + " doubling" + (k > 1 ? "s" : "") + "<br>" + c + " × (1 − " + (r / 100) + ")^" + k + " = <b>€" + f2(ans) + "</b>" }; } },
    cffo: { label: "Value of an advantage", deck: "ca", gen: function () {
      var m = R(4, 20), Q = R(5, 40) * 1000;
      if (Math.random() < 0.5) { var dm = R(1, 4), a1 = dm * Q; return { q: "A firm sells <b>" + fmt(Q) + "</b> units with a margin of €" + m + ". A cost advantage cuts unit cost by <b>€" + dm + "</b> and the price stays the same. What is the increase in cash flow from operations?", ans: a1, unit: "€", tol: 0.5, sol: "Price unchanged → margin lever: ΔCFFO = Δm × Q = " + dm + " × " + fmt(Q) + " = <b>€" + fmt(a1) + "</b>" }; }
      var dq = R(1, 10) * 500, a2 = m * dq;
      return { q: "A differentiation advantage lets a firm keep its price and margin (<b>€" + m + "</b> per unit) while selling <b>" + fmt(dq) + "</b> more units. What is the increase in cash flow from operations?", ans: a2, unit: "€", tol: 0.5, sol: "Price unchanged → volume lever: ΔCFFO = m × ΔQ = " + m + " × " + fmt(dq) + " = <b>€" + fmt(a2) + "</b>" }; } },
    rms: { label: "BCG relative share", deck: "corp", gen: function () {
      var s = R(3, 30), r = R(3, 30); while (r === s) r = R(3, 30);
      var g = pick([1, 2, 3, 12, 15, 18]), ans = s / r, hi = ans > 1, gh = g >= 10, quad = hi && gh ? "Star" : hi ? "Cash cow" : gh ? "Question mark" : "Dog";
      return { q: "A business has a <b>" + s + "%</b> market share; its largest competitor has <b>" + r + "%</b>. The market grows <b>" + g + "%</b> a year. Compute the relative market share (then name the BCG quadrant).", ans: ans, unit: "", tol: 0.02,
        sol: "RMS = " + s + " ÷ " + r + " = <b>" + f2(ans) + "</b> (" + (hi ? "above" : "below") + " 1)<br>Growth " + g + "% is " + (gh ? "high" : "low") + " → <b>" + quad + "</b>" }; } },
    ge: { label: "GE/McKinsey score", deck: "corp", gen: function () {
      var f = shuffle(["Market size", "Growth rate", "Profit margin potential", "Competitive intensity", "Cyclicality", "Learning-curve position"]).slice(0, 4), ws = pick([[40, 30, 20, 10], [30, 30, 20, 20], [35, 25, 25, 15], [25, 25, 25, 25]]), rt = f.map(function () { return R(2, 9); });
      var ans = ws.reduce(function (a, w, i) { return a + w / 100 * rt[i]; }, 0);
      return { q: "Market attractiveness factors (weight × rating 1–10): " + f.map(function (x, i) { return x + " <b>" + ws[i] + "% × " + rt[i] + "</b>"; }).join("; ") + ". Compute the weighted attractiveness score.", ans: ans, unit: "", tol: 0.02,
        sol: f.map(function (x, i) { return (ws[i] / 100) + " × " + rt[i] + " = " + f2(ws[i] / 100 * rt[i]); }).join("<br>") + "<br>Sum = <b>" + f2(ans) + "</b> → " + (ans >= 7 ? "high" : ans >= 4 ? "medium" : "low") + " attractiveness (reading the 1–10 scale in thirds: below 4 low, 4–7 medium, 7+ high)" }; } },
    elas: { label: "Price elasticity", deck: "mk1", gen: function () {
      var P0 = pick([4, 5, 6, 8, 10, 12, 20, 40]), dp = pick([-20, -10, 10, 20]) / 100, P1 = Math.round(P0 * (1 + dp) * 100) / 100, Et = pick([-0.4, -0.6, -0.8, -1.2, -1.5, -2, -2.5]), Q0 = R(4, 40) * 100, Q1 = Math.round(Q0 * (1 + Et * dp)), ans = ((Q1 - Q0) / Q0) / ((P1 - P0) / P0);
      return { q: "When the price moves from <b>€" + P0 + "</b> to <b>€" + P1 + "</b>, monthly sales go from <b>" + fmt(Q0) + "</b> to <b>" + fmt(Q1) + "</b> units. Compute the price elasticity of demand.", ans: ans, unit: "", tol: 0.02, absOk: true,
        sol: "ΔQ/Q = (" + Q1 + " − " + Q0 + ") / " + Q0 + " = " + f2((Q1 - Q0) / Q0 * 100) + "%<br>ΔP/P = (" + P1 + " − " + P0 + ") / " + P0 + " = " + f2((P1 - P0) / P0 * 100) + "%<br>E = <b>" + f2(ans) + "</b> → " + (Math.abs(ans) > 1 ? "elastic (|E| &gt; 1)" : "inelastic (|E| &lt; 1)") }; } },
    mshare: { label: "Market share", deck: "mk1", gen: function () {
      var M = R(20, 90) * 10000, s = R(3, 30), S = Math.round(M * s / 100 / 100) * 100, ans = S / M * 100;
      return { q: "Total market demand is <b>" + fmt(M) + "</b> units a year; the company sells <b>" + fmt(S) + "</b>. What is its market share?", ans: ans, unit: "%", tol: 0.11, sol: "Market share = company sales ÷ total market demand = " + fmt(S) + " ÷ " + fmt(M) + " = <b>" + f2(ans) + "%</b>" }; } },
    funnel: { label: "Market levels", deck: "mk1", gen: function () {
      var pot = R(4, 20) * 500000, q = pick([50, 60, 70, 80]), a = pick([10, 15, 20, 25, 30]), s = pick([20, 30, 40, 50]), qual = pot * q / 100, av = qual * a / 100, serv = Math.round(av * s / 100), pen = Math.round(serv * pick([1, 2, 3, 4, 5, 8]) / 100 / 10) * 10, ans = pen / serv * 100;
      return { q: "Potential market: <b>" + fmt(pot) + "</b> people. " + q + "% are qualified, " + a + "% of the qualified are available, and the company serves " + s + "% of the available market. It has <b>" + fmt(pen) + "</b> customers. What share of the served market has it penetrated?", ans: ans, unit: "%", tol: 0.11,
        sol: "Qualified = " + fmt(pot) + " × " + q + "% = " + fmt(qual) + "<br>Available = × " + a + "% = " + fmt(av) + "<br>Served = × " + s + "% = " + fmt(serv) + "<br>Penetration = " + fmt(pen) + " ÷ " + fmt(serv) + " = <b>" + f2(ans) + "%</b>" }; } }
  };
  function numCandidates(raw) {
    var s = String(raw).replace(/[€%\s]/g, ""), out = [];
    var a = parseFloat(s.replace(/,(?=\d*$)/, ".").replace(/,/g, "")); if (!isNaN(a)) out.push(a);
    var b = parseFloat(s.replace(/[.,]/g, "")); if (!isNaN(b)) out.push(b);
    var c = parseFloat(s.replace(/\./g, "").replace(",", ".")); if (!isNaN(c)) out.push(c);
    return out;
  }
  function numIsRight(raw, cur) {
    return numCandidates(raw).some(function (v) { return Math.abs(v - cur.ans) <= cur.tol || (cur.absOk && Math.abs(Math.abs(v) - Math.abs(cur.ans)) <= cur.tol); });
  }

  /* ================= rendering ================= */
  var REV = null;
  var ORALS = { cur: null, shown: false, timer: null, left: 120, notes: "", fb: null, err: "" };
  var NUM = { cur: null, checked: false, ok: null, val: "" };
  var caseUI = {};
  var visible = null;

  function go(id) {
    if (window.SM_HUB && typeof window.SM_HUB.showSection === "function") window.SM_HUB.showSection(id);
    else { $$(".app-section").forEach(function (s) { s.classList.add("hidden"); }); var el = document.getElementById(id); if (el) el.classList.remove("hidden"); onShow(id); window.scrollTo(0, 0); }
  }
  function onShow(id) {
    visible = id;
    if (id === "home") renderToday();
    else if (id === "decks") renderDecks();
    else if (id === "flashcards") renderFlash();
    else if (id === "drills") renderDrills();
    else if (id === "plan") renderPlan();
  }
  function softRender() {
    var a = document.activeElement;
    if (a && (a.tagName === "TEXTAREA" || a.tagName === "INPUT") && a.closest(".sx-host")) { $$("[data-sx-fbzone]").forEach(function (z) { z.innerHTML = fbZone(z.getAttribute("data-sx-fbzone")); }); return; }
    if (visible) onShow(visible);
    renderToday();
  }
  function trackOptions(sel, allLabel) {
    var o = '<option value="all"' + (sel === "all" ? " selected" : "") + ">" + allLabel + "</option>";
    [["str", "Strategy · Chiesa"], ["mkt", "Marketing · Peggiani"]].forEach(function (tr) {
      o += '<optgroup label="' + tr[1] + '">' + DECKS.filter(function (m) { return m.track === tr[0]; }).map(function (m) { return '<option value="' + m.id + '"' + (sel === m.id ? " selected" : "") + ">Deck " + m.deck + " · " + esc(m.title) + "</option>"; }).join("") + "</optgroup>";
    });
    return o;
  }

  /* ----- Today (top of Home) ----- */
  function renderToday() {
    var host = document.getElementById("todayPanel"); if (!host) return;
    var s = stats("all"), ex = examInfo(), t = today(), ph = phaseOf(t, ex.date), st = streak(), n = s.due + s.newToday;
    var week = weekPlan().filter(function (w) { return w.now; })[0];
    host.innerHTML =
      '<div class="sx-today">' +
        '<div class="sx-today-main"><div class="eyebrow">Today · ' + esc(fmtDate(t, { weekday: "long", day: "numeric", month: "long" })) + '</div>' +
          '<div class="sx-row sx-end"><span class="sx-big">' + n + '</span><strong class="sx-big-label">' + (n === 1 ? "flashcard" : "flashcards") + " to review</strong></div>" +
          '<p class="small">' + s.due + " due · " + s.newToday + " new · " + (P.log[t] || 0) + " reviewed today · streak " + st + (st === 1 ? " day" : " days") + "</p>" +
          '<div class="sx-row">' + (n ? '<button class="primary" data-sx="start-all">Start review <span aria-hidden="true">→</span></button>' : '<button class="ghost" data-section="drills">All done · try a drill <span aria-hidden="true">→</span></button>') +
          '<button class="ghost" data-section="decks">Open decks</button></div>' +
          '<p class="small" data-sx-sync>' + syncLabel() + "</p></div>" +
        '<div class="sx-today-side"><div class="eyebrow">Exam' + (ex.assumed ? " · date not set" : "") + '</div>' +
          '<div class="sx-row sx-end"><span class="sx-big sx-big-sm">' + Math.max(0, ex.days) + '</span><strong class="sx-big-label">days</strong></div>' +
          '<p class="small">' + (ex.assumed ? "Assuming " + esc(fmtDate(ex.date, { day: "numeric", month: "long", year: "numeric" })) + ". Set the real date in Plan." : esc(fmtDate(ex.date, { weekday: "short", day: "numeric", month: "long", year: "numeric" }))) + "</p>" +
          '<div class="eyebrow sx-mt">This week · ' + PHASES[ph].name + '</div><div class="sx-week-now">' + (week ? week.html : PHASES[ph].short) + '</div>' +
          '<button class="ghost sx-sm" data-section="plan">Full plan <span aria-hidden="true">→</span></button></div>' +
      "</div>";
  }

  /* ----- Decks: process maps and sheets ----- */
  function deckRow(m) {
    var ma = mastery(m.id), ps = ma.total ? ma.solid / ma.total * 100 : 0, pl = ma.total ? ma.learning / ma.total * 100 : 0, rd = P.read[m.id] && P.read[m.id].on, tp = TOPIC_OF[m.id];
    return '<div class="sx-deckrow"><span class="sx-deckno">' + esc(m.deck) + '</span><div class="sx-min0"><button class="sx-linkish" data-sx="sheet" data-id="' + m.id + '">' + esc(m.title) + "</button>" + (rd ? ' <span class="sx-read">· read</span>' : "") +
      '<div class="sx-bar" title="' + ma.solid + " solid, " + ma.learning + " learning, " + (ma.total - ma.solid - ma.learning) + ' new"><span class="s" style="width:' + ps + '%"></span><span class="l" style="width:' + pl + '%"></span></div></div>' +
      '<div class="sx-row sx-nowrap"><button class="ghost sx-sm" data-sx="sheet" data-id="' + m.id + '">Sheet</button><button class="ghost sx-sm" data-sx="rev" data-id="' + m.id + '">Cards</button>' +
      (tp && hasTopic(tp) ? '<button class="ghost sx-sm" data-mode="practice10" data-cat="topic:' + esc(tp) + '">Quiz</button>' : "") + "</div></div>";
  }
  function node(id, label, deckLabel) { return '<button class="sx-node" data-sx="sheet" data-id="' + id + '">' + label + "<small>deck " + deckLabel + "</small></button>"; }
  function renderDecks() {
    var host = $("#decksView"); if (!host) return;
    if (UI.deck) { host.innerHTML = sheetView(UI.deck); return; }
    host.innerHTML =
      '<div class="card"><div class="eyebrow">The course on one page</div><h2>The strategic decisions process</h2>' +
      '<p class="small">Every deck is a step of the same process. In the written exam, “Assess” lives in diagnosis, “Apply” uses the tools, “Envision” is formulation and implementation.</p>' +
      '<div class="sx-band"><span><b>Corporate level</b> · which industries, stages and businesses?</span><button class="ghost sx-sm" data-sx="sheet" data-id="corp">Corporate strategy · deck 7</button></div>' +
      '<p class="sx-arrow">↓ business level · how do we compete? ↓</p>' +
      '<div class="sx-process"><div class="sx-phase"><h4>1 · Diagnosis</h4>' + node("ext", "External analysis", "2") + '<div class="sx-node out">→ Key success factors, opportunities &amp; threats</div>' + node("int", "Internal analysis", "4") + '<div class="sx-node out">→ Strategic resources, strengths &amp; weaknesses</div>' + node("ca", "Competitive advantage &amp; grand strategy", "3") + node("bmc", "The business model", "6") + node("swot", "SWOT analysis", "5") + "</div>" +
      '<div class="sx-phase"><h4>2 · Strategy formulation</h4>' + node("swot", "Generation &amp; selection of alternatives", "5") + node("swot", "Repositioning", "5") + '<div class="sx-node out">Roadmap: impact × implementation problems</div></div>' +
      '<div class="sx-phase"><h4>3 · Implementation</h4><div class="sx-node out">Actions implementation</div><div class="sx-node out">Control</div><p class="small">In answers, close every recommendation with actions, timing and KPIs. The recorded lectures add an orientation phase in front (vision, mission, SMART objectives).</p></div></div>' +
      '<div class="sx-band"><span><b>Foundations</b> · goal of the firm, shareholders &amp; stakeholders, governance, what strategy is</span><span class="sx-row"><button class="ghost sx-sm" data-sx="sheet" data-id="intro">Introduction · deck 0</button><button class="ghost sx-sm" data-sx="sheet" data-id="strat">Concept of strategy · deck 1</button></span></div></div>' +
      '<div class="card"><div class="eyebrow">Marketing · Gloria Peggiani</div><h2>The marketing process</h2><p class="small">The same logic as strategy: analyse the context, choose where to play and how to win (STP), then decide how to execute (marketing mix), implement and control.</p>' +
      '<div class="sx-process"><div class="sx-phase"><h4>Strategic marketing · where to play</h4>' + node("mk1", "Context analysis: market demand", "M1") + '<div class="sx-node out">→ with external (deck 2) and internal (deck 4) analysis</div>' + node("mk2", "Segmentation", "M2") + node("mk3", "Targeting &amp; positioning", "M3") + "</div>" +
      '<div class="sx-phase"><h4>Operational marketing · how to execute</h4><div class="sx-node out">Value proposition: marketing mix — product, price, place, promotion (coming)</div><div class="sx-node out">Implementation &amp; control</div></div>' +
      '<div class="sx-phase"><h4>Transversal topics</h4><div class="sx-node out">Digital marketing</div><div class="sx-node out">Consumer behaviour tools, neuromarketing</div><div class="sx-node out">AI in marketing</div></div></div></div>' +
      '<div class="card"><div class="sx-row sx-between"><h3 class="sx-h3">All decks</h3><div class="sx-legend"><span><i class="s"></i>solid (≥ 1 week)</span><span><i class="l"></i>learning</span><span><i></i>new</span></div></div>' +
      '<div class="eyebrow sx-mt">Strategy · Vittorio Chiesa</div>' + DECKS.filter(function (m) { return m.track !== "mkt"; }).map(deckRow).join("") +
      '<div class="eyebrow sx-mt">Marketing · Gloria Peggiani</div>' + DECKS.filter(function (m) { return m.track === "mkt"; }).map(deckRow).join("") + "</div>" +
      '<div class="card"><h3 class="sx-h3">Still to come in the course</h3><p class="small">From the programme. When the slides are out, save them in the S&amp;M folder on Google Drive and ask Claude to add the new decks: your progress is kept.</p>' +
      '<div class="kicker">Strategy</div><div class="sx-coming">' + COMING.strategy.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + '</div><div class="kicker sx-mt">Marketing</div><div class="sx-coming">' + COMING.marketing.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</div></div>";
  }
  function sheetView(id) {
    var m = MOD[id], i = DECKS.indexOf(m), prev = DECKS[i - 1], next = DECKS[i + 1], rd = P.read[id] && P.read[id].on, ma = mastery(id), tp = TOPIC_OF[id];
    var orals = ORAL.filter(function (o) { return o.m === id; }).length, topic = tp && hasTopic(tp);
    return '<div class="sx-row sx-between"><button class="ghost sx-sm" data-sx="decks-home">← All decks</button><span class="small">' + esc(m.file) + "</span></div>" +
      '<div class="card"><div class="eyebrow">Deck ' + esc(m.deck) + " · " + ma.total + " flashcards · " + orals + " oral questions</div><h2>" + esc(m.title) + "</h2>" +
      '<div class="sx-row"><button class="' + (rd ? "ghost" : "primary") + '" data-sx="read" data-id="' + id + '">' + (rd ? "✓ Read" : "Mark as read") + '</button><button class="ghost" data-sx="rev" data-id="' + id + '">Review flashcards</button>' +
      (topic ? '<button class="ghost" data-map-filter="topic:' + esc(tp) + '">Concept cards</button><button class="ghost" data-mode="practice10" data-cat="topic:' + esc(tp) + '">Practice 10</button>' : "") +
      '<button class="ghost" data-sx="oral-deck" data-id="' + id + '">Oral question</button></div>' +
      '<article class="sx-sheet">' + SHEETS[id] + "</article></div>" +
      '<div class="sx-row sx-between">' + (prev ? '<button class="ghost" data-sx="sheet" data-id="' + prev.id + '">← ' + esc(prev.title) + "</button>" : "<span></span>") + (next ? '<button class="ghost" data-sx="sheet" data-id="' + next.id + '">' + esc(next.title) + " →</button>" : "") + "</div>";
  }

  /* ----- Flashcards ----- */
  function renderFlash() {
    var host = $("#flashView"); if (!host) return;
    if (REV && REV.done) { host.innerHTML = flashDone(); return; }
    if (REV) { host.innerHTML = flashCard(); return; }
    var s = stats(UI.revScope), n = UI.revMode === "cram" ? s.total : s.due + s.newToday;
    host.innerHTML = '<div class="card"><div class="eyebrow">Spaced repetition</div><h2>Flashcards</h2>' +
      '<p class="small">Read the question, answer it in your head or out loud, then reveal and grade yourself honestly. Cards you know come back after longer and longer gaps; cards you miss come back today. Unlike the quizzes, nothing is multiple choice: you have to recall the answer, as in the written and oral exam.</p>' +
      '<div class="sx-row sx-end sx-gap">' +
        '<label class="sx-field" for="sx-rev-scope">Decks<select id="sx-rev-scope">' + trackOptions(UI.revScope, "All decks").replace("</option>", '</option><option value="str"' + (UI.revScope === "str" ? " selected" : "") + '>All strategy decks</option><option value="mkt"' + (UI.revScope === "mkt" ? " selected" : "") + ">All marketing decks</option>") + "</select></label>" +
        '<div class="sx-field"><span>Mode</span><div class="pillrow sx-pills"><button class="pill' + (UI.revMode === "due" ? " primary" : "") + '" data-sx="rmode" data-id="due" aria-pressed="' + (UI.revMode === "due") + '">Scheduled</button><button class="pill' + (UI.revMode === "cram" ? " primary" : "") + '" data-sx="rmode" data-id="cram" aria-pressed="' + (UI.revMode === "cram") + '">All cards</button></div></div></div>' +
      '<p class="small">' + (UI.revMode === "cram" ? "All " + s.total + " cards in random order. Grades still update the schedule." : s.due + " due · " + s.newToday + " new today (limit " + P.prefs.newPerDay + "/day, change it in Plan) · " + s.unseen + " not seen yet.") + "</p>" +
      '<div class="sx-row"><button class="primary" data-sx="start-rev"' + (n ? "" : " disabled") + ">Start · " + n + " " + (n === 1 ? "card" : "cards") + "</button></div>" +
      '<p class="small" data-sx-sync>' + syncLabel() + "</p></div>" +
      '<p class="small sx-center">Keyboard: <kbd>Space</kbd> reveal · <kbd>1</kbd>–<kbd>4</kbd> grade</p>';
  }
  function startReview(scope, mode) { var q = buildQueue(scope, mode); if (!q.length) return; REV = { q: q, i: 0, shown: false, done: false, count: 0, again: 0 }; go("flashcards"); }
  function flashCard() {
    var c = REV.q[REV.i], m = MOD[c.m], st = P.cards[c.id], pct = Math.round(REV.i / REV.q.length * 100);
    var g = [0, 1, 2, 3].map(function (k) { return '<button class="sx-grade g' + k + '" data-sx="grade" data-id="' + k + '">' + ["Again", "Hard", "Good", "Easy"][k] + "<small>" + ivLabel(nextFor(st, k).days) + "</small></button>"; }).join("");
    return '<div class="sx-flashwrap"><div class="sx-row sx-between"><button class="ghost sx-sm" data-sx="end-rev">End session</button><span class="small">' + (REV.i + 1) + " / " + REV.q.length + "</span></div>" +
      '<div class="sx-progress"><span style="width:' + pct + '%"></span></div>' +
      '<div class="sx-flash"><div class="sx-flash-head"><span>Deck ' + esc(m.deck) + " · " + esc(m.title) + "</span><span>" + (st ? "box " + st.b : "new") + '</span></div><div class="sx-flash-q">' + c.q + "</div>" +
      (REV.shown ? '<div class="sx-flash-a">' + c.a + "</div>" : "") + "</div>" +
      (REV.shown ? '<div class="sx-grades">' + g + "</div>" : '<div class="sx-center"><button class="primary sx-wide" data-sx="reveal">Show answer</button></div>') + "</div>";
  }
  function flashDone() {
    return '<div class="card sx-center"><div class="eyebrow sx-justify">Session complete</div><span class="sx-big">' + REV.count + '</span><p><strong>cards reviewed</strong></p><p class="small">' + REV.again + ' marked “Again”. Missed cards come back tomorrow so the gap does the work.</p>' +
      '<div class="sx-row sx-justify"><button class="primary" data-sx="rev-home">Done</button><button class="ghost" data-mode="practice10">Practice 10</button><button class="ghost" data-sx="oral-go">Oral question</button></div></div>';
  }
  function doGrade(g) {
    var c = REV.q[REV.i]; grade(c, g); REV.count++;
    if (g === 0) { REV.again++; REV.q.splice(Math.min(REV.q.length, REV.i + 5), 0, c); }
    REV.i++; REV.shown = false; if (REV.i >= REV.q.length) REV.done = true; renderFlash(); renderToday();
  }

  /* ----- Drills: written cases, oral, numbers ----- */
  function renderDrills() {
    var host = $("#drillsView"); if (!host) return;
    var seg = '<div class="pillrow sx-pills" role="group" aria-label="Drill type">' + [["cases", "Written cases"], ["oral", "Oral"], ["numbers", "Numbers"]].map(function (x) { return '<button class="pill' + (UI.pmode === x[0] ? " primary" : "") + '" data-sx="pmode" data-id="' + x[0] + '" aria-pressed="' + (UI.pmode === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>";
    var body = UI.pmode === "oral" ? oralView() : UI.pmode === "numbers" ? numView() : (UI.caseId ? caseView(UI.caseId) : caseList());
    host.innerHTML = '<div class="sx-row sx-between sx-mb"><div><div class="eyebrow">Exam drills</div><h2 class="sx-h2">Write, speak, calculate</h2></div>' + seg + "</div>" + body;
    afterDrills();
  }
  function caseList() {
    var items = CASES.map(function (c) {
      var done = c.qs.filter(function (q) { return A.items[q.id] && words(A.items[q.id].text) > 40; }).length;
      return '<button class="sx-casecard" data-sx="case" data-id="' + c.id + '"><span class="kicker">Decks ' + c.tags.map(function (t) { return MOD[t].deck; }).join(" · ") + '</span><strong>' + esc(c.title) + '</strong><span class="small">' + esc(plain(c.text).slice(0, 150)) + '…</span><span class="sx-row"><span class="sx-chip assess">Assess</span><span class="sx-chip apply">Apply</span><span class="sx-chip envision">Envision</span><span class="small sx-push">' + done + "/3 answered</span></span></button>";
    }).join("");
    return '<p class="small sx-measure">The written exam gives a short case and open questions on three skills: <b>Assess</b> (external and/or internal analysis), <b>Apply</b> (the right tools), <b>Envision</b> (an original, rigorous solution). Write your answer first, then compare it with the model outline' + (SAMPLE ? " or ask Claude to grade it" : "") + ". Your answers are saved.</p><div class=\"sx-caselist\">" + items + "</div>";
  }
  function caseView(id) {
    var c = CASES.filter(function (x) { return x.id === id; })[0];
    var qs = c.qs.map(function (q, i) {
      var it = A.items[q.id] || {}, ui = caseUI[q.id] || {};
      return '<div class="card sx-q"><div class="sx-row"><span class="sx-chip ' + q.skill.toLowerCase() + '">' + q.skill + '</span><span class="small">Question ' + (i + 1) + '</span></div><p class="sx-qtext">' + esc(q.q) + "</p>" +
        '<textarea class="sx-textarea" id="sx-ans-' + q.id + '" data-sx-ans="' + q.id + '" placeholder="Write your answer as in the exam: structured, with case evidence and a clear conclusion.">' + esc(it.text || "") + "</textarea>" +
        '<div class="sx-row sx-between"><span class="small" data-sx-wc="' + q.id + '">' + words(it.text) + ' words</span><div class="sx-row"><button class="ghost sx-sm" data-sx="outline" data-id="' + q.id + '">' + (ui.open ? "Hide" : "Show") + " model outline</button>" + (SAMPLE ? '<button class="primary sx-sm" data-sx="fb-case" data-id="' + q.id + '">' + (running[q.id] ? "Stop" : "Get feedback") + "</button>" : "") + "</div></div>" +
        (ui.open ? '<div class="callout sx-outline"><ul>' + q.out.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>" : "") +
        '<div data-sx-fbzone="' + q.id + '">' + fbZone(q.id) + "</div></div>";
    }).join("");
    return '<div class="sx-row"><button class="ghost sx-sm" data-sx="case-back">← All cases</button></div><div class="card"><div class="eyebrow">Case · decks ' + c.tags.map(function (t) { return MOD[t].deck; }).join(", ") + "</div><h2>" + esc(c.title) + '</h2><div class="sx-casetext">' + c.text + "</div></div>" + qs;
  }
  function fbZone(key) {
    if (key === "oral") { if (running.oral) return '<p class="small">Thinking… Claude is reading your notes.</p>'; if (ORALS.err) return '<p class="sx-ko">' + esc(ORALS.err) + "</p>"; return fbHTML(ORALS.fb); }
    var it = A.items[key] || {}, ui = caseUI[key] || {};
    if (running[key]) return '<p class="small">Thinking… Claude is grading your answer. This can take up to a minute.</p>';
    if (ui.err) return '<p class="sx-ko">' + esc(ui.err) + "</p>";
    return fbHTML(it.fb);
  }
  function drawOral() {
    var pool = ORAL.filter(function (o) { return UI.oralMod === "all" || o.m === UI.oralMod; });
    var w = pool.map(function (o) { var r = P.oral[o.id]; return !r ? 3 : r.r === 2 ? 1 : r.r === 1 ? 3 : 5; });
    var x = Math.random() * w.reduce(function (a, b) { return a + b; }, 0), choice = pool[0];
    for (var i = 0; i < pool.length; i++) { x -= w[i]; if (x <= 0) { choice = pool[i]; break; } }
    if (ORALS.cur && pool.length > 1 && choice === ORALS.cur) choice = pool[(pool.indexOf(choice) + 1) % pool.length];
    clearInterval(ORALS.timer); ORALS = { cur: choice, shown: false, timer: null, left: 120, notes: "", fb: null, err: "" };
  }
  function oralView() {
    var o = ORALS.cur, seen = Object.keys(P.oral).length;
    var head = '<div class="sx-row sx-end sx-gap"><label class="sx-field" for="sx-oral-mod">Decks<select id="sx-oral-mod">' + trackOptions(UI.oralMod, "All decks") + '</select></label><button class="primary" data-sx="draw">' + (o ? "Draw another" : "Draw a question") + '</button><span class="small">' + seen + "/" + ORAL.length + " practised</span></div>";
    if (!o) return head + '<div class="card"><p class="sx-measure">The oral covers the whole course and checks that you can apply the concepts to cases. Draw a question, start the two-minute timer and answer <b>out loud</b>: definition, framework, example from the slides, link to another deck. Then compare with the outline and rate yourself. Questions you miss come up more often.</p></div>';
    var m = MOD[o.m], mm = Math.floor(ORALS.left / 60), ss = pad(ORALS.left % 60);
    return head + '<div class="card sx-mt"><div class="eyebrow">Deck ' + esc(m.deck) + " · " + esc(m.title) + '</div><p class="sx-oralq">' + esc(o.q) + "</p>" +
      '<div class="sx-row sx-gap"><span class="sx-timer" id="sx-oral-timer">' + mm + ":" + ss + '</span><button class="ghost" data-sx="otimer">' + (ORALS.timer ? "Pause" : ORALS.left < 120 ? "Resume" : "Start 2-minute timer") + '</button><button class="' + (ORALS.shown ? "ghost" : "primary") + '" data-sx="oshow">' + (ORALS.shown ? "Hide outline" : "Show outline") + "</button></div>" +
      (ORALS.shown ? '<div class="callout sx-outline"><ul>' + o.pts.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + '</ul></div><div class="sx-row"><span class="small">How did it go?</span><button class="ghost sx-sm" data-sx="orate" data-id="0">Missed it</button><button class="ghost sx-sm" data-sx="orate" data-id="1">Partly</button><button class="ghost sx-sm" data-sx="orate" data-id="2">Nailed it</button></div>' : "") + "</div>" +
      (SAMPLE ? '<div class="card"><label class="sx-field" for="sx-oral-notes">Optional: jot down what you said, and Claude will tell you what an examiner would miss<textarea class="sx-textarea sx-short" id="sx-oral-notes" placeholder="Key points of your spoken answer…">' + esc(ORALS.notes) + '</textarea></label><div class="sx-row"><button class="primary sx-sm" data-sx="fb-oral">' + (running.oral ? "Stop" : "Get feedback") + '</button></div><div data-sx-fbzone="oral">' + fbZone("oral") + "</div></div>" : "");
  }
  function tickOral() {
    ORALS.left--; var el = document.getElementById("sx-oral-timer");
    if (ORALS.left <= 0) { ORALS.left = 0; clearInterval(ORALS.timer); ORALS.timer = null; ORALS.shown = true; renderDrills(); return; }
    if (el) el.textContent = Math.floor(ORALS.left / 60) + ":" + pad(ORALS.left % 60);
  }
  function newNum() { var keys = Object.keys(NUMGEN), k = UI.numType === "mixed" ? pick(keys) : UI.numType; NUM = { cur: Object.assign({ key: k }, NUMGEN[k].gen()), checked: false, ok: null, val: "" }; }
  function checkNum() { if (!NUM.cur) return; var inp = document.getElementById("sx-num-input"), raw = inp ? inp.value : NUM.val; if (!numCandidates(raw).length) return; NUM.val = raw; NUM.checked = true; NUM.ok = numIsRight(raw, NUM.cur); renderDrills(); }
  function numView() {
    if (!NUM.cur) newNum();
    var n = NUM.cur, g = NUMGEN[n.key];
    var opts = '<option value="mixed">Mixed</option>' + Object.keys(NUMGEN).map(function (k) { return '<option value="' + k + '"' + (UI.numType === k ? " selected" : "") + ">" + NUMGEN[k].label + "</option>"; }).join("");
    return '<div class="sx-row sx-end sx-gap"><label class="sx-field" for="sx-num-type">Exercise<select id="sx-num-type">' + opts + '</select></label><button class="ghost" data-sx="num-new">New exercise</button></div>' +
      '<div class="card sx-mt"><div class="eyebrow">' + g.label + " · deck " + esc(MOD[g.deck].deck) + '</div><p class="sx-numq">' + n.q + "</p>" +
      '<div class="sx-row"><input class="searchbox sx-numinput" type="text" inputmode="decimal" id="sx-num-input" value="' + esc(NUM.val) + '" placeholder="Your answer' + (n.unit ? " (" + n.unit + ")" : "") + '" autocomplete="off" aria-label="Your answer"><button class="primary" data-sx="num-check">Check</button>' + (NUM.checked ? "" : '<button class="ghost" data-sx="num-show">Show solution</button>') + "</div>" +
      (NUM.checked && NUM.ok !== null ? '<p class="' + (NUM.ok ? "sx-ok" : "sx-ko") + '">' + (NUM.ok ? "Correct." : "Not quite.") + "</p>" : "") +
      (NUM.checked ? '<div class="sx-sol">' + n.sol + '</div><div class="sx-row"><button class="ghost" data-sx="num-new">Next exercise</button></div>' : "") + "</div>" +
      '<p class="small">Answers are checked to two decimals. Percentages without the % sign.</p>';
  }
  function afterDrills() {
    $$("textarea[data-sx-ans]").forEach(function (ta) {
      var tm;
      ta.addEventListener("input", function () {
        var id = ta.getAttribute("data-sx-ans"), wc = $('[data-sx-wc="' + id + '"]');
        if (wc) wc.textContent = words(ta.value) + " words";
        clearTimeout(tm); tm = setTimeout(function () { A.items[id] = Object.assign({}, A.items[id] || {}, { text: ta.value, t: Date.now() }); saveA(); }, 700);
      });
    });
    var on = document.getElementById("sx-oral-notes"); if (on) on.addEventListener("input", function () { ORALS.notes = on.value; });
    var ni = document.getElementById("sx-num-input"); if (ni) ni.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); checkNum(); } });
  }

  /* ----- Plan ----- */
  function renderPlan() {
    var host = $("#planView"); if (!host) return;
    var ex = examInfo(), weeks = weekPlan();
    var rows = weeks.map(function (w) { return '<div class="sx-week' + (w.now ? " now" : "") + '"><div><div class="small">' + esc(fmtDate(w.ws)) + " – " + esc(fmtDate(w.we)) + '</div><span class="sx-chip">' + PHASES[w.ph].name + "</span>" + (w.now ? ' <span class="sx-chip assess">this week</span>' : "") + '</div><div class="sx-wfocus">' + w.html + "</div></div>"; }).join("");
    host.innerHTML = '<div class="card"><div class="eyebrow">From now to the exam</div><h2>Study plan</h2>' +
      '<div class="sx-row sx-end sx-gap"><label class="sx-field" for="sx-exam-date">Written exam date<input class="searchbox" type="date" id="sx-exam-date" value="' + esc(P.prefs.examDate || "") + '" min="2026-11-01" max="2027-12-31"></label>' +
      '<label class="sx-field" for="sx-new-per-day">New flashcards per day<input type="number" id="sx-new-per-day" value="' + P.prefs.newPerDay + '" min="3" max="40" step="1"></label></div>' +
      '<p class="small">' + (ex.assumed ? "No date set: the plan assumes " + esc(fmtDate(ex.date, { day: "numeric", month: "long", year: "numeric" })) + " (winter session). Enter the real date when the calendar is published." : "Plan built for " + esc(fmtDate(ex.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })) + ".") +
      " Lectures assumed to end around " + esc(fmtDate(LECTURES_END, { day: "numeric", month: "long" })) + ". To be admitted to the oral you need at least 18 in the written exam; final grade = 50% written + 50% oral + project bonus (−2 to +2).</p></div>" +
      '<div class="card"><div class="sx-weeks">' + rows + "</div></div>" +
      '<div class="card"><h3 class="sx-h3">Why the hub works this way</h3><div class="sx-method">' +
        "<div><b>Retrieval, not rereading</b>Flashcards and oral questions make you pull the answer out of memory, which is what fixes it. Read a sheet once, then test yourself.</div>" +
        "<div><b>Spacing</b>Each card comes back just before you would forget it: 1, 3, 7, 14, 30 days. Fifteen minutes a day beats a weekend cram.</div>" +
        "<div><b>Recognition checks</b>Practice 10 and the Exam Test are quick multiple-choice checks with an explanation for every option: good for spotting traps, not a substitute for writing.</div>" +
        "<div><b>Application</b>The written exam is case-based. Every week you write one answer and compare it with the outline" + (SAMPLE ? " or Claude’s grading" : "") + ".</div>" +
        "<div><b>Explaining aloud</b>The oral rewards structure: definition → framework → slide example → link to another deck. Practise it out loud with the timer.</div>" +
      "</div></div>" +
      '<div class="card"><h3 class="sx-h3">Adding new lectures</h3><p class="small sx-measure">More decks are coming (M&amp;A, internationalisation, disruption, and the marketing mix: pricing, branding, communication, distribution). Save the new PDFs in the S&amp;M folder on Google Drive and ask Claude to add the new decks: new sheets, flashcards, concept cards, quiz questions, cases and oral questions are added and your progress is kept. The M3 sheet is built from your notes: send the lecture 3 slides when you have them.</p></div>';
    var ed = document.getElementById("sx-exam-date"); if (ed) ed.addEventListener("change", function () { P.prefs.examDate = ed.value || ""; P.prefs.t = Date.now(); saveP(); renderPlan(); renderToday(); });
    var np = document.getElementById("sx-new-per-day"); if (np) np.addEventListener("change", function () { P.prefs.newPerDay = Math.max(3, Math.min(40, parseInt(np.value, 10) || 12)); P.prefs.t = Date.now(); saveP(); renderPlan(); renderToday(); });
  }

  /* ================= events ================= */
  function onClick(e) {
    // The Decks tab always opens the overview; a sheet is reached from it or from a link.
    if (e.target.closest("#decksBtn")) { UI.deck = null; renderDecks(); return; }
    var t = e.target.closest("[data-sx]"); if (!t) return;
    var act = t.getAttribute("data-sx"), id = t.getAttribute("data-id");
    switch (act) {
      case "sheet": UI.deck = id; go("decks"); return;
      case "decks-home": UI.deck = null; renderDecks(); window.scrollTo(0, 0); return;
      case "read": var on = !(P.read[id] && P.read[id].on); P.read[id] = { on: on, t: Date.now() }; saveP(); renderDecks(); return;
      case "rev": UI.revScope = id; UI.revMode = "due"; saveUI(); REV = null; go("flashcards"); return;
      case "start-all": startReview("all", "due"); return;
      case "start-rev": startReview(UI.revScope, UI.revMode); return;
      case "rmode": UI.revMode = id; saveUI(); renderFlash(); return;
      case "reveal": REV.shown = true; renderFlash(); return;
      case "grade": doGrade(+id); return;
      case "end-rev": REV.done = true; renderFlash(); return;
      case "rev-home": REV = null; renderFlash(); return;
      case "pmode": UI.pmode = id; UI.caseId = null; saveUI(); if (id === "oral" && !ORALS.cur) drawOral(); renderDrills(); return;
      case "oral-go": UI.pmode = "oral"; saveUI(); if (!ORALS.cur) drawOral(); REV = null; go("drills"); return;
      case "oral-deck": UI.oralMod = id; UI.pmode = "oral"; saveUI(); drawOral(); go("drills"); return;
      case "case": UI.caseId = id; renderDrills(); window.scrollTo(0, 0); return;
      case "case-back": UI.caseId = null; renderDrills(); return;
      case "outline": caseUI[id] = Object.assign({}, caseUI[id], { open: !(caseUI[id] && caseUI[id].open) }); renderDrills(); return;
      case "fb-case": {
        var c = CASES.filter(function (x) { return x.qs.some(function (q) { return q.id === id; }); })[0], q = c.qs.filter(function (q) { return q.id === id; })[0];
        var ta = document.getElementById("sx-ans-" + id), text = ta ? ta.value : ((A.items[id] || {}).text || "");
        if (!running[id] && words(text) < 25) { caseUI[id] = Object.assign({}, caseUI[id], { err: "Write at least a few sentences (25+ words) before asking for feedback." }); renderDrills(); return; }
        A.items[id] = Object.assign({}, A.items[id] || {}, { text: text, t: Date.now() });
        caseUI[id] = Object.assign({}, caseUI[id], { err: "" });
        askFeedback(id, { kind: "case", caseText: plain(c.text), skill: q.skill, q: q.q, points: q.out.map(plain), answer: text }, function (fb, err) { if (fb) { A.items[id] = Object.assign({}, A.items[id] || {}, { fb: fb, t: Date.now() }); saveA(); } else caseUI[id] = Object.assign({}, caseUI[id], { err: err }); });
        renderDrills(); return;
      }
      case "draw": drawOral(); renderDrills(); return;
      case "otimer": if (ORALS.timer) { clearInterval(ORALS.timer); ORALS.timer = null; } else ORALS.timer = setInterval(tickOral, 1000); renderDrills(); return;
      case "oshow": ORALS.shown = !ORALS.shown; if (ORALS.timer) { clearInterval(ORALS.timer); ORALS.timer = null; } renderDrills(); return;
      case "orate": P.oral[ORALS.cur.id] = { r: +id, t: Date.now() }; saveP(); drawOral(); renderDrills(); return;
      case "fb-oral": {
        var o = ORALS.cur, notesEl = document.getElementById("sx-oral-notes"), notes = notesEl ? notesEl.value : ""; ORALS.notes = notes;
        if (!running.oral && words(notes) < 15) { ORALS.err = "Jot down at least a few lines (15+ words) first."; renderDrills(); return; }
        ORALS.err = ""; askFeedback("oral", { kind: "oral", caseText: "", skill: "Oral", q: o.q, points: o.pts, answer: notes }, function (fb, err) { if (fb) ORALS.fb = fb; else ORALS.err = err; });
        renderDrills(); return;
      }
      case "num-new": newNum(); renderDrills(); return;
      case "num-check": checkNum(); return;
      case "num-show": NUM.checked = true; NUM.ok = null; renderDrills(); return;
    }
  }
  function onChange(e) {
    var el = e.target;
    if (el.id === "sx-rev-scope") { UI.revScope = el.value; saveUI(); renderFlash(); }
    if (el.id === "sx-oral-mod") { UI.oralMod = el.value; saveUI(); drawOral(); renderDrills(); }
    if (el.id === "sx-num-type") { UI.numType = el.value; saveUI(); newNum(); renderDrills(); }
  }
  function onKey(e) {
    if (visible !== "flashcards" || !REV || REV.done) return;
    var tag = (document.activeElement || {}).tagName; if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (!REV.shown && (e.key === " " || e.key === "Enter")) { e.preventDefault(); REV.shown = true; renderFlash(); return; }
    if (REV.shown && ["1", "2", "3", "4"].indexOf(e.key) >= 0) { e.preventDefault(); doGrade(+e.key - 1); }
  }

  function init() {
    document.body.addEventListener("click", onClick);
    document.body.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    visible = "home";
    renderToday();
    initSync();
    initSample();
  }

  window.SM_STUDY = {
    onShow: onShow,
    // Pure functions, exposed for the tests.
    _test: { nextFor: nextFor, mergeP: mergeP, mergeA: mergeA, numCandidates: numCandidates, numIsRight: numIsRight, NUMGEN: NUMGEN, addDays: addDays, daysBetween: daysBetween, TOPIC_OF: TOPIC_OF }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
