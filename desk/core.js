/* AFC Closing Desk: the engine shared by the page and the tests. No DOM access here. */
(function (root) {
  "use strict";

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MINUS = "−";

  // ---------- Random numbers (seeded, so a case can be replayed exactly) ----------

  function rng(seed) {
    let a = seed >>> 0;
    function next() {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    const r = {
      next,
      int(lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); },
      // A random multiple of `s` between lo and hi; falls back to the first multiple above lo.
      step(lo, hi, s) {
        const a0 = Math.ceil(lo / s - 1e-9), b0 = Math.floor(hi / s + 1e-9);
        return round(s * (b0 < a0 ? a0 : r.int(a0, b0)), 6);
      },
      pick(list) { return list[Math.floor(next() * list.length)]; },
      chance(p) { return next() < p; },
      shuffle(list) {
        const out = list.slice();
        for (let i = out.length - 1; i > 0; i--) {
          const j = Math.floor(next() * (i + 1));
          [out[i], out[j]] = [out[j], out[i]];
        }
        return out;
      },
      sample(list, n) { return r.shuffle(list).slice(0, n); }
    };
    return r;
  }

  function hash(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  // ---------- Numbers and dates ----------

  // Rounds half away from zero, correcting for binary representation (1.855 -> 1.86).
  function round(x, dp = 2) {
    const f = Math.pow(10, dp);
    const nudged = x + Math.sign(x) * Number.EPSILON * Math.max(1, Math.abs(x)) * 4;
    return Math.round(Math.abs(nudged) * f) / f * Math.sign(nudged) || 0;
  }

  const formatters = {};
  function group(x, dp) {
    const nf = formatters[dp] || (formatters[dp] = new Intl.NumberFormat("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp }));
    return nf.format(x);
  }
  function decimals(x, max) {
    for (let dp = 0; dp < max; dp++) if (Math.abs(round(x, dp) - x) < 1e-9) return dp;
    return max;
  }

  // Formats a value for the working paper. Kinds: eur, pct, eps, unit, qty.
  function fmt(x, kind = "eur") {
    if (x == null || typeof x !== "number" || !isFinite(x)) return "";
    const shown = round(x, 2);
    const sign = shown < 0 ? MINUS : "";
    if (kind === "pct") { const r = round(Math.abs(x), 2); return sign + group(r, decimals(r, 2)) + "%"; }
    if (kind === "eps") return sign + group(round(Math.abs(x), 2), 2);
    if (kind === "unit") { const r = round(Math.abs(x), 2); return sign + group(r, decimals(r, 2) ? 2 : 0); }
    if (kind === "qty") { const r = round(Math.abs(x), 2); return sign + group(r, decimals(r, 2)); }
    const r = round(Math.abs(x), 2);
    return sign + group(r, Number.isInteger(r) ? 0 : 2);
  }
  function eur(x) { return (round(x, 2) < 0 ? MINUS : "") + "€" + fmt(Math.abs(x), "eur"); }
  function pct(x) { return fmt(x, "pct"); }
  function qty(x) { return fmt(x, "qty"); }
  function dt(day, month, year) { return `${day} ${MONTHS[month - 1].slice(0, 3)} ${year}`; }
  function lastDay(month, year) { return new Date(year, month, 0).getDate(); }
  function addMonths(month, year, n) {
    const idx = year * 12 + (month - 1) + n;
    return { month: (idx % 12) + 1, year: Math.floor(idx / 12) };
  }
  // The last day of a period of `months` months that starts on the 1st of `month`.
  function periodEnd(month, year, months) {
    const e = addMonths(month, year, months - 1);
    return dt(lastDay(e.month, e.year), e.month, e.year);
  }
  function sum(values) {
    return values.map((v, i) => i === 0 ? eur(v) : `${round(v, 2) < 0 ? "−" : "+"} ${eur(Math.abs(v))}`).join(" ");
  }
  function plural(n, word) { return `${n} ${word}${n === 1 ? "" : "s"}`; }

  // ---------- Expressions typed on the keypad ----------

  // Evaluates + − × ÷ ( ) % with the usual precedence. Returns NaN for anything malformed.
  function evaluate(src) {
    let s = String(src == null ? "" : src)
      .replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, "");
    if (!s) return NaN;
    const open = (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
    if (open > 0) s += ")".repeat(open);
    let i = 0;
    const fail = () => { throw new Error("bad expression"); };
    function expr() {
      let v = term();
      while (s[i] === "+" || s[i] === "-") { const op = s[i++]; const w = term(); v = op === "+" ? v + w : v - w; }
      return v;
    }
    function term() {
      let v = factor();
      while (s[i] === "*" || s[i] === "/") { const op = s[i++]; const w = factor(); v = op === "*" ? v * w : v / w; }
      return v;
    }
    function factor() {
      if (s[i] === "-") { i++; return -factor(); }
      if (s[i] === "+") { i++; return factor(); }
      let v;
      if (s[i] === "(") { i++; v = expr(); if (s[i] !== ")") fail(); i++; }
      else {
        const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
        if (!m) fail();
        i += m[0].length;
        v = parseFloat(m[0]);
      }
      while (s[i] === "%") { i++; v /= 100; }
      return v;
    }
    try {
      const v = expr();
      return i === s.length && isFinite(v) ? v : NaN;
    } catch (e) { return NaN; }
  }

  // ---------- Case templates ----------

  const registry = [];
  const byId = {};

  function register(tpl) {
    if (!tpl || !tpl.id || byId[tpl.id]) throw new Error("Duplicate or missing case id: " + (tpl && tpl.id));
    registry.push(tpl);
    byId[tpl.id] = tpl;
  }

  // Building blocks for working papers.
  function inp(key, ans, hint, why, opts) { return Object.assign({ t: "num", key, ans, fmt: "eur", hint, why }, opts); }
  function pick(key, options, ans, hint, why) { return { t: "choice", key, options, ans, hint, why }; }
  function giv(value, fmt) { return { t: "given", value, fmt: fmt || "eur" }; }
  function R(label, cells, opts) { return Object.assign({ label, cells: Array.isArray(cells) ? cells : [cells] }, opts); }
  function S(title, rows, cols) { return { title, rows, cols: cols || null }; }
  function doc(kind, title, lines, note) { return { kind, title, lines: lines || [], note: note || "" }; }

  const COMPANIES = [
    "Alpina Looms S.r.l.", "Brera Optics S.p.A.", "Castello Foods S.r.l.", "Adda Circuits S.p.A.", "Lario Textiles S.r.l.",
    "Navigli Print S.r.l.", "Orobie Metals S.p.A.", "Ticino Ceramics S.r.l.", "Vela Marine S.p.A.", "Monviso Bikes S.r.l.",
    "Garda Kitchens S.r.l.", "Sempione Tools S.p.A.", "Iseo Packaging S.r.l.", "Bergamo Valves S.p.A.", "Mincio Furniture S.r.l.",
    "Olona Lighting S.r.l.", "Serio Plastics S.p.A.", "Lambro Pumps S.r.l."
  ];

  function makeCase(id, seed) {
    const tpl = byId[id];
    if (!tpl) throw new Error("Unknown case " + id);
    seed = seed >>> 0;
    const r = rng((hash(id) ^ Math.imul(seed, 2654435761)) >>> 0);
    const base = { co: r.pick(COMPANIES), y: r.int(2024, 2027) };
    const generated = tpl.gen(r);
    const original = seed === 0 && !!tpl.original;
    const p = Object.assign(base, generated, original ? tpl.original : null, { original });
    const built = tpl.build(p);
    const cells = [];
    built.paper.sections.forEach(section => section.rows.forEach(row => row.cells.forEach((cell, ci) => {
      if (cell && (cell.t === "num" || cell.t === "choice")) {
        cells.push(Object.assign({}, cell, { row: row.label, col: section.cols ? section.cols[ci] : null, section: section.title }));
      }
    })));
    return Object.assign({
      id, seed, chapter: tpl.chapter, level: tpl.level, title: tpl.title, source: tpl.source || null,
      co: p.co, y: p.y, original, checks: []
    }, built, { cells });
  }

  // ---------- Grading ----------

  const TOL = { eur: 0.5, pct: 0.05, eps: 0.0051, unit: 0.0051, qty: 0.001 };

  function gradeCell(cell, entry) {
    const v = entry ? entry.value : null;
    if (cell.t === "choice") return { ok: v != null && v === cell.ans, empty: v == null };
    if (v == null || typeof v !== "number" || !isFinite(v)) return { ok: false, empty: true };
    const tol = (cell.tol != null ? cell.tol : TOL[cell.fmt] != null ? TOL[cell.fmt] : 0.5) + 1e-9;
    const hit = x => Math.abs(x - cell.ans) <= tol;
    if (hit(v) || (cell.abs && hit(-v))) return { ok: true };
    // 0.35 typed for 35% is the same answer.
    if (cell.fmt === "pct" && Math.abs(cell.ans) >= 1 && hit(v * 100)) return { ok: true };
    return { ok: false, signFlip: cell.ans !== 0 && hit(-v) };
  }

  const OPINIONS = {
    3: { name: "Unmodified opinion", short: "Unmodified", note: "Every line is right and no help was needed. A clean audit." },
    2: { name: "Qualified opinion", short: "Qualified", note: "Fairly presented, except for the matters below. The case counts as passed." },
    1: { name: "Adverse opinion", short: "Adverse", note: "The misstatements are material. The case does not count towards the level." }
  };

  // Each line scores 1, or 0.5 if a hint was used. 100% gives 3 stars, 75% or more 2 stars.
  function audit(kase, entries, hints) {
    entries = entries || {};
    hints = hints || {};
    const results = kase.cells.map(cell => Object.assign({ key: cell.key, hinted: !!hints[cell.key] }, gradeCell(cell, entries[cell.key])));
    const n = results.length;
    const correct = results.filter(r => r.ok).length;
    const points = results.reduce((sum, r) => sum + (r.ok ? (r.hinted ? 0.5 : 1) : 0), 0);
    const score = n ? points / n : 0;
    const stars = score >= 1 - 1e-9 ? 3 : score >= 0.75 - 1e-9 ? 2 : 1;
    return { results, n, correct, score, stars, passed: stars >= 2, opinion: OPINIONS[stars] };
  }

  // A live tie-out on the user's own figures, e.g. CFO + CFI + CFF − net change.
  function evalCheck(check, entries) {
    let diff = 0;
    for (const [sign, term] of check.terms) {
      let v = term;
      if (typeof term === "string") {
        const e = entries[term];
        if (!e || typeof e.value !== "number" || !isFinite(e.value)) return { ready: false };
        v = e.value;
      }
      diff += sign * v;
    }
    return { ready: true, diff: round(diff, 2), ok: Math.abs(diff) < 0.5 };
  }

  // ---------- Levels, ranks and progress ----------

  const LEVELS = [
    { n: 1, name: "Basic", target: 10 },
    { n: 2, name: "Intermediate", target: 10 },
    { n: 3, name: "Advanced", target: 6 }
  ];

  const RANKS = [
    { at: 0, name: "Trainee" },
    { at: 1, name: "Junior Accountant" },
    { at: 3, name: "Staff Accountant" },
    { at: 6, name: "Senior Accountant" },
    { at: 9, name: "Reporting Supervisor" },
    { at: 12, name: "Financial Reporting Manager" },
    { at: 15, name: "Financial Controller" }
  ];

  function templates(ch, lv) {
    return registry.filter(t => (ch == null || t.chapter === ch) && (lv == null || t.level === lv));
  }
  function chapters() { return Array.from(new Set(registry.map(t => t.chapter))).sort((a, b) => a - b); }

  function emptyProgress() {
    return { v: 1, levels: {}, seen: {}, cases: 0, passed: 0, clean: 0, cells: { total: 0, correct: 0 }, days: {}, review: [], daily: null, last: {} };
  }
  function normalize(p) {
    const base = emptyProgress();
    if (!p || typeof p !== "object") return base;
    const out = Object.assign(base, p);
    out.cells = Object.assign({ total: 0, correct: 0 }, p.cells);
    if (!Array.isArray(out.review)) out.review = [];
    ["levels", "seen", "days", "last"].forEach(k => { if (!out[k] || typeof out[k] !== "object") out[k] = {}; });
    return out;
  }

  function levelState(progress, ch, lv) {
    const tpls = templates(ch, lv);
    const rec = progress.levels[`${ch}-${lv}`] || { passed: 0, played: 0, types: {} };
    const types = rec.types || {};
    const target = LEVELS[lv - 1].target;
    const covered = tpls.filter(t => (types[t.id] || 0) > 0).length;
    const cleared = tpls.length > 0 && rec.passed >= target && covered === tpls.length;
    const unlocked = lv === 1 || levelState(progress, ch, lv - 1).cleared;
    return { ch, lv, name: LEVELS[lv - 1].name, target, passed: rec.passed || 0, played: rec.played || 0, types, covered, total: tpls.length, templates: tpls, cleared, unlocked };
  }

  function clearedCount(progress) {
    let n = 0;
    chapters().forEach(ch => LEVELS.forEach(l => { if (levelState(progress, ch, l.n).cleared) n++; }));
    return n;
  }
  function levelCount() { return chapters().length * LEVELS.length; }

  function rank(progress) {
    const cleared = clearedCount(progress);
    let i = 0;
    RANKS.forEach((r, idx) => { if (cleared >= r.at) i = idx; });
    const top = Math.min(RANKS.length - 1, i);
    return { name: RANKS[top].name, cleared, next: RANKS[top + 1] || null, total: levelCount() };
  }

  // Templates with the fewest passes come first, so every case type is met before a level can clear.
  function nextTemplate(progress, ch, lv, r, lastId) {
    const st = levelState(progress, ch, lv);
    const count = t => st.types[t.id] || 0;
    const min = Math.min.apply(null, st.templates.map(count));
    let pool = min === 0 ? st.templates.filter(t => count(t) === 0) : st.templates.slice();
    if (pool.length > 1) pool = pool.filter(t => t.id !== lastId);
    return r.pick(pool);
  }

  // The PDF's own numbers are served the first time a PDF case type comes up.
  function seedFor(progress, tpl, r) {
    return tpl.original && !progress.seen[tpl.id] ? 0 : r.int(1, 2147483646);
  }

  function dayKey(d) {
    d = d || new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function shiftDay(key, n) {
    const [y, m, d] = key.split("-").map(Number);
    return dayKey(new Date(y, m - 1, d + n));
  }
  function streak(progress, today) {
    let day = today;
    if (!progress.days[day]) day = shiftDay(day, -1);
    let n = 0;
    while (progress.days[day]) { n++; day = shiftDay(day, -1); }
    return n;
  }

  function unlockedTemplates(progress) {
    const out = [];
    chapters().forEach(ch => LEVELS.forEach(l => {
      const st = levelState(progress, ch, l.n);
      if (st.unlocked) out.push.apply(out, st.templates);
    }));
    return out;
  }

  const DAILY_SIZE = 5;
  function dailyPlan(progress, today) {
    if (progress.daily && progress.daily.date === today) return progress.daily;
    const r = rng(hash("daily:" + today));
    const pool = r.shuffle(unlockedTemplates(progress));
    const items = [];
    for (let i = 0; i < DAILY_SIZE && pool.length; i++) {
      const tpl = pool[i % pool.length];
      items.push({ tpl: tpl.id, seed: r.int(1, 2147483646), stars: null });
    }
    progress.daily = { date: today, items };
    return progress.daily;
  }

  // Records an audited case. Returns events for the UI (level cleared, promotion).
  function record(progress, kase, result, mode, today) {
    const p = progress;
    const rankBefore = rank(p).name;
    const events = [];
    p.cases++;
    if (result.passed) p.passed++;
    if (result.stars === 3) p.clean++;
    p.cells.total += result.n;
    p.cells.correct += result.correct;
    p.days[today] = (p.days[today] || 0) + 1;
    if (kase.original) p.seen[kase.id] = true;

    // Replays from the review queue do not count towards levels: the answers were already seen.
    if (mode.type !== "review") {
      const key = `${kase.chapter}-${kase.level}`;
      const before = levelState(p, kase.chapter, kase.level).cleared;
      const rec = p.levels[key] || (p.levels[key] = { passed: 0, played: 0, types: {} });
      rec.types = rec.types || {};
      rec.played = (rec.played || 0) + 1;
      if (result.passed) {
        rec.passed = (rec.passed || 0) + 1;
        rec.types[kase.id] = (rec.types[kase.id] || 0) + 1;
      }
      if (!before && levelState(p, kase.chapter, kase.level).cleared) {
        events.push({ type: "cleared", ch: kase.chapter, lv: kase.level, name: LEVELS[kase.level - 1].name });
        const next = LEVELS[kase.level];
        if (next && templates(kase.chapter, next.n).length) events.push({ type: "unlocked", ch: kase.chapter, lv: next.n, name: next.name });
      }
    }

    const id = `${kase.id}#${kase.seed}`;
    const at = p.review.findIndex(x => x.id === id);
    if (result.stars === 3) {
      if (at >= 0) p.review.splice(at, 1);
    } else if (at >= 0) {
      p.review[at].stars = result.stars;
    } else {
      p.review.push({ id, tpl: kase.id, seed: kase.seed, stars: result.stars, at: today });
      if (p.review.length > 40) p.review.shift();
    }

    if (mode.type === "daily" && p.daily && p.daily.date === mode.date && p.daily.items[mode.idx]) {
      p.daily.items[mode.idx].stars = result.stars;
    }
    p.last[`${kase.chapter}-${kase.level}`] = kase.id;

    const rankAfter = rank(p).name;
    if (rankAfter !== rankBefore) events.push({ type: "promoted", name: rankAfter });
    return events;
  }

  const api = {
    MONTHS, MINUS, LEVELS, RANKS, OPINIONS, TOL, COMPANIES, DAILY_SIZE,
    rng, hash, round, fmt, eur, pct, qty, dt, periodEnd, lastDay, addMonths, evaluate,
    register, registry, byId, makeCase, templates, chapters,
    gradeCell, audit, evalCheck,
    emptyProgress, normalize, levelState, clearedCount, levelCount, rank, nextTemplate, seedFor,
    dayKey, shiftDay, streak, unlockedTemplates, dailyPlan, record,
    dsl: { register, inp, pick, giv, R, S, doc, eur, pct, qty, fmt, dt, periodEnd, plural, sum, MONTHS, round }
  };
  root.DeskCore = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
