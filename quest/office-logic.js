/* PolimiAFC — career mode rules: jobs, grading, the firm's ledger, days, quarters and the annual report.
   No DOM access, so every rule is testable. */
(function (root) {
  "use strict";
  const D = root.OfficeData;
  const Q = root.QuestLogic; // reuses the seeded random numbers
  const { Y } = D;

  const acct = id => D.ACCOUNTS.find(a => a.id === id);
  const eur = x => (x < 0 ? "−" : "") + "€" + Math.abs(Math.round(x * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const round2 = x => Math.round(x * 100) / 100;

  // ---------- Ranks ----------
  function rankFor(career) { return D.RANKS.find(r => r.id === career.rank) || D.RANKS[0]; }
  function nextRank(career) {
    const i = D.RANKS.findIndex(r => r.id === career.rank);
    return D.RANKS[i + 1] || null;
  }
  // Difficulty tier: 1 intern, 2 junior, 3 financial analyst.
  const TIER = { intern: 1, junior: 2, analyst: 3 };
  const tierOf = career => TIER[career.rank] || 3;
  const XP_MULT = { 1: 1, 2: 1.5, 3: 2 };
  const bonusFor = tier => ({ 1: 5, 2: 8, 3: 11 })[tier] || 5;

  // ---------- Jobs ----------
  let seq = 0;
  const jobId = () => "j" + Date.now().toString(36) + (seq++).toString(36);
  const amountIn = (r, [lo, hi]) => {
    const step = hi >= 100000 ? 10000 : hi >= 10000 ? 500 : hi >= 1000 ? 50 : 10;
    return step * r.int(Math.ceil(lo / step), Math.floor(hi / step));
  };
  const itemsFor = (tier, clients) => D.ITEMS.filter(i => i[1] <= tier && clients.includes(i[0]));
  // Clients with enough documents for a spot-the-error or build job (the listed group has analysis work instead).
  const bookClients = (tier, clients, n) => clients.filter(c => itemsFor(tier, [c]).length >= n);

  function sortJob(tier, clients, r) {
    const pool = itemsFor(tier, clients);
    const fresh = pool.filter(i => i[1] === tier);
    const [client, , kind, item, element, range, why] = r.pick(fresh.length && r.chance(0.6) ? fresh : pool);
    const amount = amountIn(r, range);
    return {
      type: "sort", client, pickup: "inbox", work: "cabinet", answer: element, why,
      doc: { kind, title: `${kind} · ${D.CLIENTS[client].name}`, lines: [["Description", item], ["Amount", eur(amount)]] },
      brief: `File it in the right cabinet: Assets, Liabilities, Equity, Revenue or Expenses.`
    };
  }

  function quickJob(tier, clients, r) {
    const pool = D.CALLS.filter(c => c[0] <= tier && clients.includes(c[1]));
    const fresh = pool.filter(c => c[0] === tier);
    const [level, client, question, answer, wrongs, why] = r.pick(fresh.length && r.chance(0.6) ? fresh : pool);
    return {
      type: "quick", client, pickup: "phone", work: "phone", seconds: level >= 3 ? 22 : tier === 1 ? 15 : 12, why,
      question, options: r.shuffle([answer].concat(wrongs.slice(0, 3))).map(label => ({ label, correct: label === answer })),
      brief: "The phone is ringing! Answer before the client hangs up."
    };
  }

  function spotJob(tier, clients, r) {
    const client = r.pick(bookClients(tier, clients, 5));
    const pool = r.shuffle(itemsFor(tier, [client]));
    const picked = [];
    for (const it of pool) { if (!picked.some(p => p[3] === it[3])) picked.push(it); if (picked.length === 5) break; }
    const wrongAt = r.int(0, picked.length - 1);
    const truth = picked[wrongAt][4];
    const marcoSaid = r.pick(D.ELEMENTS.filter(e => e !== truth));
    const lines = picked.map((it, i) => ({ item: it[3], amount: amountIn(r, it[5]), filed: i === wrongAt ? marcoSaid : it[4], why: it[6] }));
    return {
      type: "spot", client, pickup: "marco", work: "marco", wrongAt, answer: truth, marcoSaid, lines,
      why: `“${picked[wrongAt][3]}” is ${article(truth)} ${truth.toLowerCase()}, not ${article(marcoSaid)} ${marcoSaid.toLowerCase()}. ${picked[wrongAt][6]}`,
      trap: D.TRAPS[`${truth}>${marcoSaid}`],
      brief: "Marco filed these in a hurry. One is in the wrong cabinet: find it and fix it."
    };
  }
  const article = w => /^[AEIOU]/i.test(w) ? "an" : "a";

  function buildJob(tier, clients, r) {
    const client = r.pick(bookClients(tier, clients, 6));
    const pool = r.shuffle(itemsFor(tier, [client]));
    const picked = [];
    for (const it of pool) {
      if (picked.some(p => p[3] === it[3])) continue;
      picked.push(it);
      if (picked.length === 6) break;
    }
    // Make sure there is at least one revenue and one expense line for the profit question.
    const items = picked.map(it => ({ item: it[3], element: it[4], amount: amountIn(r, it[5]), why: it[6] }));
    const revenue = items.filter(i => i.element === "Revenue").reduce((s, i) => s + i.amount, 0);
    const expense = items.filter(i => i.element === "Expense").reduce((s, i) => s + i.amount, 0);
    return {
      type: "build", client, pickup: "inbox", work: "desk", items,
      askProfit: tier >= 2 && revenue > 0 && expense > 0, profit: revenue - expense,
      brief: "Place each item in the right statement and line: the income statement (revenue, expenses) or the balance sheet (assets, liabilities, equity)."
    };
  }

  const ORDER_ITEMS = [
    // [tier, client, text, year offset (0 this year, 1 next year), why]
    [1, "forno", "Bread sold on 12 December, paid at the counter", 0, "Sold in December: this year's revenue."],
    [1, "forno", "Bread sold on 4 January", 1, "Sold in January: next year's revenue."],
    [1, "forno", "Gas used in November, bill paid in November", 0, "Used this year: this year's expense."],
    [1, "forno", "Flour used for January's bread", 1, "Used in January: next year's expense."],
    [1, "forno", "Bakers' December wages, paid on 31 December", 0, "December's work: this year's expense."],
    [1, "forno", "Shop rent for January, paid on 2 January", 1, "January's rent: next year's expense."],
    [1, "forno", "Christmas cakes delivered on 23 December", 0, "Delivered in December: this year's revenue."],
    [2, "forno", "Gas used in December, bill paid on 20 January", 0, "Used in December: this year's expense, even if paid in January (an accrued expense)."],
    [2, "forno", "Rent for January, paid in advance on 28 December", 1, "Paid in December but it's January's rent: next year's expense (a prepaid expense until then)."],
    [2, "forno", "Wedding cake delivered on 3 January, deposit paid on 10 December", 1, "Revenue comes with delivery in January; the deposit is a liability until then."],
    [2, "forno", "Office catering delivered on 30 December, paid on 15 January", 0, "Delivered in December: this year's revenue (a receivable until paid)."],
    [2, "verdi", "Consulting work done in December, billed on 5 January", 0, "The work was done in December: this year's revenue."],
    [2, "verdi", "Retainer received in December for work in February", 1, "The work is done in February: next year's revenue."],
    [2, "verdi", "Staff bonus earned in December, paid in January", 0, "Earned in December: this year's expense (an accrued liability at year-end)."],
    [2, "hotel", "Guests stayed on 30 and 31 December, paid at check-out on 1 January", 0, "The nights were in December: this year's revenue."],
    [2, "hotel", "A July booking paid in full in December", 1, "The stay is in July: next year's revenue."],
    [2, "hotel", "Insurance paid in December for next year", 1, "Next year's cover: next year's expense."]
  ];
  function orderJob(tier, clients, r) {
    for (let tries = 0; tries < 50; tries++) {
      const pool = ORDER_ITEMS.filter(o => o[0] <= tier && clients.includes(o[1]));
      const picked = r.shuffle(pool).slice(0, 4);
      const years = new Set(picked.map(p => p[3]));
      if (years.size === 2 && picked.length === 4) {
        const client = picked[0][1];
        return {
          type: "order", client, pickup: "inbox", work: "desk",
          items: picked.map(p => ({ text: p[2], year: Y + p[3], why: p[4] })), years: [Y, Y + 1],
          brief: `Year-end cut-off at 31 December ${Y}: put each document in the year its revenue or expense belongs to.`
        };
      }
    }
    return orderJob(1, ["forno"], r);
  }

  function fillJob(tier, clients, r) {
    const kinds = D.FILL_TIER[tier].filter(k => k !== "timesheet" || clients.includes("verdi")).filter(k => k !== "hotelNights" || clients.includes("hotel"));
    const kind = r.pick(tier >= 2 && r.chance(0.25) ? D.FILL_TIER[1] : kinds);
    const f = FILLS[kind](r);
    return Object.assign({ type: "fill", pickup: "inbox", work: "desk" }, f);
  }
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const FILLS = {
    stock(r) {
      const lines = [["Flour sacks", r.int(4, 20), 25], ["Butter blocks", r.int(5, 30), 8], ["Sugar packs", r.int(5, 40), 3]];
      const total = lines.reduce((s, l) => s + l[1] * l[2], 0);
      return {
        client: "forno", doc: { kind: "Stock count", title: "Stock count · Forno Rossi · 31 December", lines: lines.map(l => [l[0], `${l[1]} × ${eur(l[2])}`]) },
        brief: "Value the closing inventory and say where it goes.",
        fields: [{ key: "total", label: "Closing inventory (€)", answer: total, why: lines.map(l => `${l[1]} × ${eur(l[2])}`).join(" + ") + ` = ${eur(total)}.` }],
        choice: { label: "It goes in…", options: D.ELEMENTS, answer: "Asset", why: "Unused stock is inventory: an asset until it's used." }
      };
    },
    till(r) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => [d, 10 * r.int(20, 90)]);
      const total = days.reduce((s, d) => s + d[1], 0);
      return {
        client: "forno", doc: { kind: "Till report", title: "Till report · Forno Rossi · one week", lines: days.map(d => [d[0], eur(d[1])]) },
        brief: "Record the week's sales.",
        fields: [{ key: "total", label: "Revenue for the week (€)", answer: total, why: `Sum of the six days: ${eur(total)}.` }],
        choice: { label: "It goes in…", options: D.ELEMENTS, answer: "Revenue", why: "Bread sold to customers is revenue." }
      };
    },
    payslips(r) {
      const a = 10 * r.int(140, 220), b = 10 * r.int(140, 220);
      return {
        client: "forno", doc: { kind: "Payslips", title: "Payslips · Forno Rossi · this month", lines: [["Baker Anna", eur(a)], ["Baker Luca", eur(b)]] },
        brief: "Record this month's staff cost.",
        fields: [{ key: "total", label: "Staff cost for the month (€)", answer: a + b, why: `${eur(a)} + ${eur(b)} = ${eur(a + b)}.` }],
        choice: { label: "It goes in…", options: D.ELEMENTS, answer: "Expense", why: "The bakers' work was used up this month: an expense." }
      };
    },
    supplier(r) {
      const q = r.int(5, 30), p = r.pick([18, 20, 22, 25]), del = r.pick([15, 20, 30]);
      const total = q * p + del;
      return {
        client: "forno", doc: { kind: "Supplier invoice", title: "Invoice · Mulino Adda · due in 30 days", lines: [["Flour sacks", `${q} × ${eur(p)}`], ["Delivery", eur(del)], ["Payment", "in 30 days"]] },
        brief: "Record what the bakery owes the mill.",
        fields: [{ key: "total", label: "Amount owed to the mill (€)", answer: total, why: `${q} × ${eur(p)} + ${eur(del)} delivery = ${eur(total)}.` }],
        choice: { label: "The debt goes in…", options: D.ELEMENTS, answer: "Liability", why: "Unpaid at the date: a trade payable, a liability." }
      };
    },
    prepaid(r) {
      const monthly = 10 * r.int(60, 180), m = r.int(8, 12), paid = monthly * 6, used = monthly * (13 - m);
      const usedMonths = Math.min(6, 13 - m), exp = monthly * usedMonths;
      return {
        client: "forno", doc: { kind: "Rent receipt", title: "Rent receipt · Forno Rossi", lines: [["Paid on", `1 ${MONTHS[m - 1]} ${Y}`], ["Covers", "6 months from that day"], ["Amount", eur(paid)]] },
        brief: `Year-end at 31 December ${Y}: split the rent between this year and next.`,
        fields: [
          { key: "exp", label: `Rent expense for ${Y} (€)`, answer: exp, why: `${eur(paid)} ÷ 6 = ${eur(monthly)} a month × ${usedMonths} months in ${Y} = ${eur(exp)}.` },
          { key: "pre", label: "Prepaid rent at 31 Dec (€)", answer: paid - exp, why: `${eur(paid)} − ${eur(exp)} = ${eur(paid - exp)} still to be used: an asset.` }
        ]
      };
    },
    accrued(r) {
      const bill = 20 * r.int(20, 90);
      return {
        client: "forno", doc: { kind: "Gas bill", title: "Gas bill · Forno Rossi", lines: [["Period", `1 December ${Y} – 31 January ${Y + 1}`], ["Amount", eur(bill)], ["Received", `5 February ${Y + 1}`]] },
        brief: `Year-end at 31 December ${Y}: how much of the bill is this year's, and what is owed at year-end?`,
        fields: [
          { key: "exp", label: `Gas expense for ${Y} (€)`, answer: bill / 2, why: `Half the period (December) is ${Y}'s: ${eur(bill)} ÷ 2 = ${eur(bill / 2)}.` },
          { key: "acc", label: "Accrued liability at 31 Dec (€)", answer: bill / 2, why: `Used in December but not yet billed or paid: ${eur(bill / 2)} owed.` }
        ]
      };
    },
    deposit(r) {
      const price = 10 * r.int(20, 80), pct = r.pick([20, 25, 30, 50]), dep = price * pct / 100;
      return {
        client: "forno", doc: { kind: "Order form", title: "Wedding cake order · Forno Rossi", lines: [["Price", eur(price)], ["Deposit paid 10 Dec", `${pct}% = ${eur(dep)}`], ["Delivery", `12 January ${Y + 1}`]] },
        brief: `Year-end at 31 December ${Y}.`,
        fields: [
          { key: "rev", label: `Revenue for ${Y} (€)`, answer: 0, why: "Nothing delivered in December: no revenue this year." },
          { key: "liab", label: "Contract liability at 31 Dec (€)", answer: dep, why: `The ${eur(dep)} deposit is owed to the customer until the cake is delivered.` }
        ]
      };
    },
    timesheet(r) {
      const h = r.int(20, 120), rate = r.pick([60, 75, 90, 110]);
      return {
        client: "verdi", doc: { kind: "Timesheet", title: "Timesheet · Verdi Consulting · December", lines: [["Hours worked", String(h)], ["Rate", `${eur(rate)}/hour`], ["Invoice", `sent 8 January ${Y + 1}`]] },
        brief: `Year-end at 31 December ${Y}.`,
        fields: [
          { key: "rev", label: `Revenue for ${Y} (€)`, answer: h * rate, why: `${h} × ${eur(rate)} = ${eur(h * rate)}: the work was done in December.` },
          { key: "rec", label: "Still to collect at 31 Dec (€)", answer: h * rate, why: "Nothing billed or paid yet: the whole amount is an (unbilled) receivable." }
        ]
      };
    },
    hotelNights(r) {
      const rate = r.pick([90, 120, 150, 180]), rooms = r.int(2, 8), total = 5 * rate * rooms, dec = 3 * rate * rooms;
      return {
        client: "hotel", doc: { kind: "Group booking", title: "Group booking · Hotel Lago", lines: [["Stay", `29 December ${Y} – 3 January ${Y + 1} (5 nights)`], ["Rooms", String(rooms)], ["Rate", `${eur(rate)} per room per night`], ["Paid", "at check-out"]] },
        brief: "Split the stay's revenue between the two years.",
        fields: [
          { key: "dec", label: `Revenue for ${Y} (€)`, answer: dec, why: `Nights of 29, 30 and 31 December: 3 × ${rooms} rooms × ${eur(rate)} = ${eur(dec)}.` },
          { key: "jan", label: `Revenue for ${Y + 1} (€)`, answer: total - dec, why: `The other 2 nights: ${eur(total - dec)}.` }
        ]
      };
    }
  };

  const MAKERS = { sort: sortJob, quick: quickJob, spot: spotJob, build: buildJob, order: orderJob, fill: fillJob };
  const MIX = {
    1: ["sort", "sort", "quick", "fill", "spot", "order", "build"],
    2: ["sort", "quick", "fill", "fill", "spot", "order", "build"],
    3: ["sort", "quick", "fill", "spot", "build"] // office-analysis.js adds the analyst's jobs
  };

  function clientJob(career, r, forceType) {
    const rank = rankFor(career), tier = tierOf(career);
    const type = forceType || r.pick(MIX[tier]);
    const job = MAKERS[type](tier, rank.clients, r);
    job.id = jobId();
    job.tier = tier;
    return job;
  }

  // ---------- Grading ----------
  function grade(job, answer) {
    if (job.type === "sort") return { ok: answer === job.answer };
    if (job.type === "quick") return { ok: !!answer && answer.correct === true, timeout: answer === "timeout" };
    if (job.type === "mcq") return { ok: !!answer && answer.correct === true };
    if (job.type === "spot") return { ok: answer.line === job.wrongAt && answer.fix === job.answer, foundLine: answer.line === job.wrongAt };
    if (job.type === "build") {
      const right = job.items.map((it, i) => answer.placed[i] === it.element);
      const n = right.filter(Boolean).length;
      const profitOk = !job.askProfit || Math.abs((answer.profit || 0) - job.profit) < 0.5;
      return { ok: n === job.items.length && profitOk, right, n, profitOk };
    }
    if (job.type === "order") {
      const right = job.items.map((it, i) => answer.years[i] === it.year);
      return { ok: right.every(Boolean), right };
    }
    if (job.type === "fill") {
      const right = job.fields.map(f => Math.abs((answer.values[f.key] == null ? NaN : answer.values[f.key]) - f.answer) <= (f.tol || 0.5));
      const choiceOk = !job.choice || answer.choice === job.choice.answer;
      return { ok: right.every(Boolean) && choiceOk, right, choiceOk };
    }
    if (job.type === "posting") return gradePosting(job, answer.lines);
    if (job.type === "reclass") {
      const right = job.items.map((it, i) => answer.placed[i] === it.cat);
      const fieldsRight = (job.fields || []).map(f => Math.abs((answer.values[f.key] == null ? NaN : answer.values[f.key]) - f.answer) <= (f.tol || 0.5));
      return { ok: right.every(Boolean) && fieldsRight.every(Boolean), right, fieldsRight };
    }
    return { ok: false };
  }

  // Postings: a list of [account, change] where change raises (+) or lowers (−) the account's balance.
  const side = type => (type === "A" || type === "X" ? 1 : -1);
  function imbalance(lines) {
    return round2(lines.reduce((s, [id, amt]) => s + side(acct(id).type) * amt, 0));
  }
  function normalizeLines(lines) {
    const map = {};
    lines.forEach(([id, amt]) => { if (id && amt) map[id] = round2((map[id] || 0) + amt); });
    return Object.entries(map).filter(([, v]) => v !== 0).sort((a, b) => a[0].localeCompare(b[0]));
  }
  function gradePosting(job, lines) {
    const got = normalizeLines(lines), want = normalizeLines(job.lines);
    const ok = got.length === want.length && got.every(([id, v], i) => id === want[i][0] && Math.abs(v - want[i][1]) < 0.5);
    return { ok, balanced: imbalance(lines) === 0 };
  }

  // ---------- Rewards ----------
  const XP = { sort: 3, quick: 3, spot: 4, build: 5, order: 4, fill: 4, posting: 4, reclass: 5, mcq: 3, report: 25 };
  function reward(career, job, ok) {
    const base = Math.round(XP[job.type] * (XP_MULT[job.tier] || 1));
    if (ok) {
      career.streak = (career.streak || 0) + 1;
      const bonus = career.streak >= 3 ? Math.min(3, Math.floor((career.streak - 1) / 2)) : 0;
      career.xp += base + bonus;
      career.bonus = (career.bonus || 0) + bonusFor(job.tier) + (bonus ? 2 : 0);
      if (job.client) {
        career.sat[job.client] = Math.min(100, (career.sat[job.client] || 60) + 4);
        const q = quarterKey(career);
        career.jobsOk[q] = (career.jobsOk[q] || 0) + 1;
      }
      return { xp: base + bonus, bonus };
    }
    career.streak = 0;
    career.xp = Math.max(rankFor(career).xp, career.xp - 3);
    if (job.client) career.sat[job.client] = Math.max(0, (career.sat[job.client] || 60) - 6);
    return { xp: -3, bonus: 0 };
  }

  // ---------- Calendar ----------
  const quarterOf = day => Math.ceil(((day - 1) % 12 + 1) / D.DAYS_PER_QUARTER);
  const quarterKey = career => `${career.year}-${quarterOf(career.day)}`;
  const calendarYear = career => Y + career.year - 1;

  // ---------- The firm's ledger ----------
  // `at` overrides the date (the shareholders' meeting belongs to the next year).
  function post(career, label, lines, when, at) {
    const d = at || { year: career.year, q: quarterOf(career.day), day: career.day };
    career.ledger.push({ label, lines: normalizeLines(lines), year: d.year, q: d.q, day: d.day, when: when || "" });
  }
  // Which section of the cash flow statement an entry's cash belongs to.
  function cfCategory(label) {
    if (/is born|bank loan|capital increase|loan repayment|dividend/i.test(label)) return "financing";
    if (/laptop supplier|laptops/i.test(label)) return "investing";
    return "operating";
  }
  function balances(career, filter) {
    const b = {};
    D.ACCOUNTS.forEach(a => { b[a.id] = 0; });
    career.ledger.filter(e => !filter || filter(e)).forEach(e => e.lines.forEach(([id, v]) => { b[id] = round2(b[id] + v); }));
    return b;
  }
  function profitOf(b) {
    const rev = D.ACCOUNTS.filter(a => a.type === "R").reduce((s, a) => s + b[a.id], 0);
    const exp = D.ACCOUNTS.filter(a => a.type === "X").reduce((s, a) => s + b[a.id], 0);
    return { revenue: round2(rev), expenses: round2(exp), profit: round2(rev - exp) };
  }
  function quarterly(career) {
    const out = [];
    for (let y = 1; y <= career.year; y++) for (let q = 1; q <= 4; q++) {
      const flows = balances(career, e => e.year === y && e.q === q && e.label !== "Closing entry");
      const cash = balances(career, e => e.year < y || (e.year === y && e.q <= q)).cash;
      const p = profitOf(flows);
      if (y === career.year && q > quarterOf(career.day)) break;
      out.push({ label: `Q${q} ${Y + y - 1}`, revenue: p.revenue, expenses: p.expenses, profit: p.profit, cash });
    }
    return out;
  }
  function trialOK(career) {
    const b = balances(career);
    return Math.abs(D.ACCOUNTS.reduce((s, a) => s + side(a.type) * b[a.id], 0)) < 0.5;
  }

  // ---------- Firm events ----------
  // The day's memo from Giulia, as a posting job (or null).
  function firmEvent(career) {
    let ev = null;
    if (career.year === 1) ev = D.YEAR_ONE.find(e => e.day === career.day);
    else ev = laterYearEvent(career);
    if (!ev) return null;
    return { id: jobId(), type: "posting", pickup: "giulia", work: "books", title: ev.title, memo: ev.memo, lines: ev.lines, why: ev.why, tier: tierOf(career), nLines: ev.lines.length };
  }
  function laterYearEvent(career) {
    const b = balances(career);
    const d = career.day;
    if (d === 1 && b.wagesPayable > 0) return { title: "Paying December wages", memo: `Pay the December wages we owed: ${eur(b.wagesPayable)}.`, lines: [["wagesPayable", -b.wagesPayable], ["cash", -b.wagesPayable]], why: "Settling a liability: cash down, wages payable down. The expense was already recorded last year." };
    if (d === 2 && b.dividendsPayable > 0) return { title: "Paying the dividend", memo: `Pay the shareholders the dividend approved by the meeting: ${eur(b.dividendsPayable)}.`, lines: [["dividendsPayable", -b.dividendsPayable], ["cash", -b.dividendsPayable]], why: "The dividend became a liability when the meeting approved it; paying it just settles the debt." };
    if (d === 4) return { title: "Office supplies", memo: "Paper, toner and coffee for the year: €400, paid by card.", lines: [["consumables", 400], ["cash", -400]], why: "Used up in the period: an expense." };
    if (d === 6 && b.loan >= 6000) return { title: "Loan repayment", memo: "Repay €6,000 of the Banca Brera loan.", lines: [["loan", -6000], ["cash", -6000]], why: "Repaying principal lowers the debt and the cash. It's not an expense." };
    if (d === 10 && b.loan > 0) { const i = round2(b.loan * 0.04); return { title: "Loan interest", memo: `Pay a year's interest on the loan: 4% on ${eur(b.loan)}.`, lines: [["interest", i], ["cash", -i]], why: `${eur(b.loan)} × 4% = ${eur(i)}: this year's interest expense.` }; }
    if (d === 11) return { title: "December wages", memo: "December wages of €3,000 will be paid on 10 January.", lines: [["wages", 3000], ["wagesPayable", 3000]], why: "December's work is this year's cost; unpaid, it's a liability at year-end." };
    if (d === 12 && b.equipment >= 1500) return { title: "Depreciation", memo: "Record this year's depreciation on the laptops: €1,500.", lines: [["depreciation", 1500], ["equipment", -1500]], why: "The part of the laptops used up this year." };
    return null;
  }

  // The postings to make when a quarter closes.
  function quarterClose(career) {
    const q = quarterOf(career.day);
    const plan = career.year === 1 ? D.QUARTER_CLOSE[q] : [["collect"], ["fees"], ["rentCash"], ["staff", q === 4 ? 6000 : 9000, q === 4 ? "Salaries for October and November" : "Salaries for the quarter"]];
    const jobs = [];
    const thisQ = `${career.year}-${q}`;
    const prevQ = q === 1 ? `${career.year - 1}-4` : `${career.year}-${q - 1}`;
    for (const [kind, amt, text] of plan) {
      let ev = null;
      if (kind === "fees") {
        const F = (career.jobsOk[thisQ] || 0) * D.FEE_PER_JOB;
        if (F > 0) ev = { title: `Invoicing Q${q}`, memo: `Invoice our clients for this quarter's work: ${career.jobsOk[thisQ]} jobs done right × ${eur(D.FEE_PER_JOB)} = ${eur(F)}. They pay next quarter.`, lines: [["receivables", F], ["fees", F]], why: "We did the work this quarter: it's this quarter's revenue, even though the clients pay later. Until then they owe us: trade receivables." };
      } else if (kind === "collect") {
        const F = (career.jobsOk[prevQ] || 0) * D.FEE_PER_JOB;
        if (F > 0) ev = { title: "Clients pay", memo: `The clients paid last quarter's invoices: ${eur(F)}.`, lines: [["cash", F], ["receivables", -F]], why: "Cash comes in and the receivable goes away. No new revenue: it was recorded when we did the work." };
      } else if (kind === "rentCash") {
        ev = { title: "Quarterly rent", memo: `Rent for the quarter paid by bank transfer: ${eur(D.RENT_QUARTER)}.`, lines: [["rent", D.RENT_QUARTER], ["cash", -D.RENT_QUARTER]], why: "This quarter's use of the office: an expense, paid in cash." };
      } else if (kind === "rentUsed") {
        ev = { title: "Rent used", memo: `Three more months of the prepaid rent have been used (${text}): adjust the books.`, lines: [["rent", amt], ["prepaid", -amt]], why: `The prepaid asset is used up month by month: ${eur(amt)} becomes this quarter's expense. No cash moves now.` };
      } else if (kind === "staff") {
        ev = { title: "Salaries", memo: `${text}: ${eur(amt)}, paid.`, lines: [["wages", amt], ["cash", -amt]], why: "The staff's work in the period is an expense; it's paid, so cash goes down." };
      }
      if (ev) jobs.push({ id: jobId(), type: "posting", pickup: "giulia", work: "books", title: ev.title, memo: ev.memo, lines: ev.lines, why: ev.why, tier: tierOf(career), nLines: ev.lines.length, close: true });
    }
    return jobs;
  }

  // ---------- Annual report ----------
  function weightedShares(career) {
    // Year 1: 100,000 shares all year + 20,000 from 1 July. Later years: all 120,000.
    return career.year === 1 ? D.SHARES_START + 20000 * 6 / 12 : D.SHARES_START + 20000;
  }
  function annualReport(career) {
    const b = balances(career);
    const flows = balances(career, e => e.year === career.year && e.label !== "Closing entry");
    const p = profitOf(flows);
    const totalAssets = round2(b.cash + b.receivables + b.prepaid + b.equipment);
    const totalLiab = round2(b.payables + b.wagesPayable + b.loan + b.dividendsPayable);
    const reserves = round2(b.legalReserve + b.retained);
    const totalEq = round2(b.shareCapital + b.sharePremium + reserves + p.profit);
    const eps = round2(p.profit / weightedShares(career));
    const L = (key, label, answer, why, opts) => Object.assign({ key, label, answer, why }, opts);
    // Cash flow statement: every cash movement of the year, by section.
    const cf = { operating: 0, investing: 0, financing: 0 };
    career.ledger.filter(e => e.year === career.year && e.label !== "Closing entry").forEach(e => e.lines.forEach(([id, v]) => { if (id === "cash") cf[cfCategory(e.label)] = round2(cf[cfCategory(e.label)] + v); }));
    const open = balances(career, e => e.year < career.year);
    const dCash = round2(b.cash - open.cash);
    // Statement of changes in equity.
    const eqOf = x => round2(x.shareCapital + x.sharePremium + x.legalReserve + x.retained);
    const openEq = eqOf(open);
    const yearEntries = balances(career, e => e.year === career.year && e.label !== "Closing entry");
    const issues = round2(yearEntries.shareCapital + yearEntries.sharePremium);
    const declared = round2(career.ledger.filter(e => e.year === career.year && /shareholders' meeting/i.test(e.label)).reduce((t, e) => t + e.lines.filter(([id]) => id === "dividendsPayable").reduce((u, [, v]) => u + v, 0), 0));
    return {
      sections: [
        { title: `Income statement ${calendarYear(career)}`, lines: [
          L("fees", "Fee revenue", flows.fees, "Sum of the quarterly invoices."),
          L("wages", "Staff costs", flows.wages, "All salaries of the year, including December's unpaid ones."),
          L("rent", "Rent expense", flows.rent, "Rent paid in cash plus the prepaid rent used up."),
          L("other", "Supplies, depreciation and interest", round2(flows.consumables + flows.depreciation + flows.interest), "Office supplies + depreciation + interest."),
          L("profit", "Profit (loss) for the year", p.profit, "Revenue − all expenses.", { total: true })
        ] },
        { title: `Balance sheet at 31 December ${calendarYear(career)}`, lines: [
          L("cash", "Cash at bank", b.cash, "The balance of the bank account in the ledger."),
          L("receivables", "Trade receivables", b.receivables, "Invoices the clients haven't paid yet."),
          L("prepaid", "Prepaid rent", b.prepaid, "Rent paid for future months."),
          L("equipment", "Equipment (net)", b.equipment, "Cost − depreciation so far."),
          L("totalAssets", "Total assets", totalAssets, "Sum of the assets.", { total: true }),
          L("liabilities", "Total liabilities", totalLiab, "Trade payables + wages payable + bank loan + dividends payable.", { total: true }),
          L("shareCapital", "Share capital", b.shareCapital, "Number of shares × nominal value."),
          L("sharePremium", "Share premium reserve", b.sharePremium, "What shareholders paid above nominal value."),
          L("reserves", "Legal reserve and retained earnings", reserves, "Profits of earlier years kept in the company."),
          L("profitBS", "Profit for the year", p.profit, "The same profit as the income statement, not yet allocated."),
          L("totalEquity", "Total equity", totalEq, "Capital + premium + reserves + profit.", { total: true }),
          L("totalEL", "Total equity and liabilities", round2(totalEq + totalLiab), "Must equal total assets.", { total: true })
        ] },
        { title: `Cash flow statement ${calendarYear(career)}`, lines: [
          L("cfo", "Cash flow from operating activities", cf.operating, "Cash from clients − cash paid for salaries, rent, supplies, interest: the day-to-day business."),
          L("cfi", "Cash flow from investing activities", cf.investing, "Cash paid for long-term assets (the laptops)."),
          L("cff", "Cash flow from financing activities", cf.financing, "Cash from shareholders and banks, minus loan repayments and dividends paid."),
          L("dcash", "Change in cash", dCash, "Operating + investing + financing = cash at the end − cash at the start of the year (the balance sheet).", { total: true })
        ] },
        { title: `Statement of changes in equity ${calendarYear(career)}`, lines: [
          L("eqOpen", "Equity at 1 January", openEq, "Last year's closing equity (capital, premium, reserves)."),
          L("eqIssue", "Shares issued (capital + premium)", issues, "New shares: nominal value to share capital, the excess to the premium reserve."),
          L("eqProfit", "Profit for the year", p.profit, "From the income statement."),
          L("eqDiv", "Dividends declared", -declared, "Approved by the shareholders' meeting this year; they reduce equity (never an expense)."),
          L("eqClose", "Equity at 31 December", totalEq, "Opening + shares issued + profit − dividends: the same total equity as the balance sheet.", { total: true })
        ] },
        { title: "Per share", lines: [
          L("shares", "Weighted-average shares", weightedShares(career), career.year === 1 ? "100,000 all year + 20,000 × 6/12 (issued on 1 July) = 110,000." : "120,000 shares all year.", { fmt: "qty" }),
          L("eps", "Basic EPS (€)", eps, `Profit ÷ weighted-average shares = ${eur(p.profit)} ÷ ${weightedShares(career).toLocaleString("en-US")}.`, { fmt: "eps" })
        ] }
      ],
      profit: p.profit, totalAssets, totalEL: round2(totalEq + totalLiab)
    };
  }
  function gradeReport(report, values) {
    const lines = report.sections.flatMap(s => s.lines);
    const right = lines.map(l => {
      const v = values[l.key];
      const tol = l.fmt === "eps" ? 0.0051 : 0.5;
      return v != null && Math.abs(v - l.answer) <= tol;
    });
    const n = right.filter(Boolean).length;
    return { right, n, total: lines.length, clean: n === lines.length, pass: n >= Math.ceil(lines.length * 0.85) };
  }

  // Closing entry: this year's revenue and expenses move into retained earnings.
  function closeYear(career) {
    const flows = balances(career, e => e.year === career.year && e.label !== "Closing entry");
    const lines = [];
    D.ACCOUNTS.filter(a => a.type === "R" || a.type === "X").forEach(a => { if (flows[a.id]) lines.push([a.id, -flows[a.id]]); });
    const p = profitOf(flows).profit;
    if (p) lines.push(["retained", p]);
    career.ledger.push({ label: "Closing entry", lines: normalizeLines(lines), year: career.year, q: 4, day: 12 });
    return p;
  }
  // The shareholders' meeting: 5% to the legal reserve (up to 20% of capital) and, if profit allows, a dividend.
  function agm(career, profit) {
    if (profit <= 0) return null;
    const b = balances(career);
    const cap = b.shareCapital * 0.2;
    const reserve = round2(Math.min(profit * 0.05, Math.max(0, cap - b.legalReserve)));
    const shares = D.SHARES_START + 20000;
    const dividend = profit >= 8000 ? round2(shares * 0.05) : 0;
    const lines = [["retained", -(reserve + dividend)]];
    if (reserve) lines.push(["legalReserve", reserve]);
    if (dividend) lines.push(["dividendsPayable", dividend]);
    return {
      id: jobId(), type: "posting", pickup: "giulia", work: "books", title: "The shareholders' meeting", tier: tierOf(career), nLines: lines.length, agm: true,
      memo: `The shareholders approved the annual report. Of the ${eur(profit)} profit: 5% to the legal reserve (${eur(reserve)})${dividend ? `, and a dividend of €0.05 per share on ${shares.toLocaleString("en-US")} shares (${eur(dividend)}), to be paid in January` : ""}. The rest stays in retained earnings.`,
      lines, why: `Italian law (art. 2430 c.c.) puts 5% of profit in the legal reserve until it reaches 20% of share capital. ${dividend ? "The declared dividend leaves retained earnings and becomes a liability until it's paid — never an expense." : ""}`
    };
  }

  // ---------- Promotion interviews ----------
  // Never automatic: once you have the experience you may ask Giulia for an interview, whenever you like.
  const INTERVIEW = { questions: 6, pass: 5, waitDays: 3 };
  function interviewStatus(career) {
    const nr = nextRank(career);
    if (!nr) return { state: "top" };
    if (nr.soon) return { state: "soon", rank: nr };
    if (career.xp < nr.xp) return { state: "needXp", rank: nr, missing: nr.xp - career.xp };
    const daysPlayed = (career.year - 1) * 12 + career.day;
    if (career.interviewRetry && daysPlayed < career.interviewRetry) return { state: "wait", rank: nr, days: career.interviewRetry - daysPlayed };
    return { state: "ready", rank: nr };
  }
  // A hard interview: jobs of the next rank's difficulty, one of each kind, answered in a row.
  // What each interview asks, by the rank you're applying for.
  const INTERVIEW_PLAN = {
    junior: ["spot", "fill", "order", "build", "quick", "fill"],
    analyst: ["reclassBS", "reclassIS", "quick", "ratio", "segment", "sources"]
  };
  function planInterview(career, r) {
    const nr = nextRank(career);
    const asIf = Object.assign({}, career, { rank: nr.id });
    return (INTERVIEW_PLAN[nr.id] || INTERVIEW_PLAN.junior).slice(0, INTERVIEW.questions).map(t => {
      const j = clientJob(asIf, r, t);
      j.interview = true;
      if (j.type === "quick") j.seconds = Math.max(10, j.seconds - 6);
      return j;
    });
  }
  function finishInterview(career, score) {
    const daysPlayed = (career.year - 1) * 12 + career.day;
    career.stats.interviews = (career.stats.interviews || 0) + 1;
    if (score >= INTERVIEW.pass) {
      career.rank = nextRank(career).id;
      career.interviewRetry = 0;
      return true;
    }
    career.interviewRetry = daysPlayed + INTERVIEW.waitDays;
    return false;
  }

  // ---------- The day ----------
  function planDay(career, r) {
    const jobs = [];
    const ev = firmEvent(career);
    if (ev) jobs.push(ev);
    for (let i = 0; i < D.JOBS_PER_DAY; i++) jobs.push(clientJob(career, r));
    return { jobs };
  }

  // Clients' businesses: quarterly revenue that grows with how well we serve them.
  function clientQuarter(career) {
    Object.keys(D.CLIENTS).forEach(id => {
      const hist = career.clientRev[id] || (career.clientRev[id] = []);
      const last = hist.length ? hist[hist.length - 1] : D.CLIENTS[id].base;
      const sat = career.sat[id] == null ? 60 : career.sat[id];
      hist.push(Math.round(last * (1 + 0.02 + (sat - 55) / 800) / 100) * 100);
    });
  }

  // ---------- Save ----------
  function newCareer() {
    return {
      v: 1, mode: "career", map: "office", x: 4, y: 6, dir: "up", sound: true, reportTries: 0,
      rank: "intern", xp: 0, money: 0, bonus: 0, streak: 0, day: 1, year: 1, interviewRetry: 0,
      sat: { forno: 60, verdi: 60, hotel: 60, pixel: 60, lario: 60 }, clientRev: {}, jobsOk: {}, ledger: [],
      queue: [], carrying: null, dayDone: 0, exam: false, phase: "intro",
      stats: { jobs: 0, right: 0, days: 0, steps: 0, reports: [] }
    };
  }
  function normalizeCareer(s) {
    const base = newCareer();
    if (!s || typeof s !== "object" || s.mode !== "career") return base;
    const out = Object.assign(base, s);
    out.sat = Object.assign(newCareer().sat, s.sat);
    out.stats = Object.assign(newCareer().stats, s.stats);
    ["clientRev", "jobsOk"].forEach(k => { if (!out[k] || typeof out[k] !== "object") out[k] = {}; });
    ["ledger", "queue"].forEach(k => { if (!Array.isArray(out[k])) out[k] = []; });
    if (out.rank === "accountant") out.rank = "analyst";
    if (!D.RANKS.some(r => r.id === out.rank)) out.rank = "intern";
    return out;
  }

  const api = {
    eur, acct, cfCategory, rankFor, nextRank, tierOf, bonusFor, MIX, INTERVIEW_PLAN, itemsFor, clientJob, MAKERS, FILLS, ORDER_ITEMS, grade, gradePosting, imbalance, normalizeLines, side,
    reward, quarterOf, quarterKey, calendarYear, post, balances, profitOf, quarterly, trialOK, firmEvent, quarterClose,
    weightedShares, annualReport, gradeReport, closeYear, agm, INTERVIEW, interviewStatus, planInterview, finishInterview, planDay, clientQuarter, newCareer, normalizeCareer
  };
  root.OfficeLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
