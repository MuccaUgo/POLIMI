/* PolimiAFC — financial analysis, steps 4 and 5 of the course path (Lectures 07–08 and the exercise session
   on benchmarking Eni vs TotalEnergies): the indicators read by four readers (shareholders, the overall company,
   other stakeholders, and liquidity for all actors, on an accrual and a cash basis), the check-up against present
   value with residual income, and benchmarking. The Eni and TotalEnergies figures are those of the slides
   (Annual Reports 2025, € million and $ million).
   Loaded after office-planning.js: it adds its exercises to the financial analysis desk, the analyst's day,
   the exam questions and the phone. */
(function (root) {
  "use strict";
  const D = root.OfficeData, O = root.OfficeLogic, ST = root.OfficeStudy, X = root.OfficeExam;
  const Y = D.Y;
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-US");
  const r2 = x => Math.round(x * 100) / 100;
  const r4 = x => Math.round(x * 10000) / 10000;
  const pct2 = x => Math.round(x * 10000) / 100; // 0.12345 → 12.35 (%)
  const sgn = x => (x > 0 ? "+" : x < 0 ? "−" : "") + fmt(Math.abs(x));
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));
  const round = (x, s) => Math.round(x / s) * s;
  const eur = x => (x < 0 ? "−€" : "€") + fmt(Math.abs(x));

  // ---------- Eni, from the slides of Lectures 07–08 (€ million; [2024, 2025]) ----------
  const ENI = {
    netProfit: [2764, 2758], netProfitPrev: [4860, 2764], dividends: [3113, 3357], equity: [55648, 52787],
    shares: [3167006396, 3024753353], sales: [88797, 82151],
    ebit: [5238, 5010], ebitda: [12838, 12359], totalAssets: [146939, 137069], cffo: [13092, 13330],
    nonFinLiab: [54448, 50080], nonCurFinLiab: [26744, 24576], curFinLiab: [10099, 9626], finLiab: [36843, 34202],
    totalLiab: [91291, 84282], interest: [1499, 1374], pretax: [6489, 5778], taxes: [3725, 3020],
    cash: [8183, 8100], stFinAssets: [6797, 6991], otherCurFinAssets: [1085, 3710], receivables: [16901, 12436],
    currentAssets: [43582, 40862], currentLiab: [37827, 34269], inventories: [6259, 5143], payables: [22092, 20261], purchases: [71114, 67056],
    capex: [8490, 9229],
    ri: { investedCapital: [83175, 76442], k: [0.07, 0.06] }
  };
  const YEARS = [2024, 2025];
  // Sales by segment, regrouped in common meta-categories (exercise session, slide 25). [2023, 2024, 2025]
  const SEGMENTS = {
    years: [2023, 2024, 2025],
    names: ["Exploration & Production", "Gas & Renewables Power", "Refining & Chemicals", "Corporate and other activities"],
    eni: [[55773, 54440, 50367], [57045, 50177, 46398], [23061, 21210, 18179], [1830, 1905, 2073]],
    total: [[6561, 5655, 5590], [39423, 32012, 29683], [101203, 93515, 87207], [89941, 83368, 78716]]
  };

  const fill = (pattern, doc, brief, fields, choice) => ({ type: "fill", pattern, doc, brief, fields, choice });
  const eniDoc = (title, i, rows) => ({ kind: `Eni · Annual Report ${YEARS[i]} (€ million)`, title, lines: rows });

  // ---------- Line 1 · the shareholders (Lecture 07) ----------
  function shareholdersLine(r) {
    if (r.chance(0.35)) return eniShareholders(r);
    for (let t = 0; t < 60; t++) {
      const np = step(r, 200, 2000, 10), eq = step(r, np * 5, np * 25, 50), prev = step(r, np * 0.6, np * 1.4, 10);
      const div = round(prev * r.pick([0.3, 0.4, 0.5, 0.65, 0.8, 1.1, 1.25]), 10), shares = step(r, 1000, 20000, 100);
      const sales = round(np / (r.int(2, 12) / 100), 50);
      const roe = np / eq, po = div / prev, sgr = roe * (1 - po);
      if (Math.abs(pct2(sgr)) < 0.1 || po === 1) continue;
      const fields = [
        { key: "roe", label: `ROE ${Y} (%)`, answer: pct2(roe), dec: true, tol: 0.05, why: `Net profit ÷ equity = ${fmt(np)} ÷ ${fmt(eq)} = ${pct2(roe)}%.` },
        { key: "po", label: `Payout ratio ${Y} (%)`, answer: pct2(po), dec: true, tol: 0.05, why: `Dividends paid in ${Y} ÷ net profit of ${Y - 1} = ${fmt(div)} ÷ ${fmt(prev)} = ${pct2(po)}%. The dividends paid this year distribute last year's profit.` },
        { key: "sgr", label: "Sustainable growth rate (%)", answer: pct2(sgr), dec: true, neg: true, tol: 0.05, why: `ROE × (1 − payout) = ${pct2(roe)}% × (1 − ${pct2(po)}%) = ${pct2(sgr)}%: how fast equity can grow on the profit kept in the firm, with no new shares.` }];
      if (r.chance(0.5)) fields.push({ key: "eps", label: `EPS ${Y} (€ per share)`, answer: r4(np / shares), dec: true, tol: 0.006, why: `Net profit ÷ weighted average number of shares = €${fmt(np)} thousand ÷ ${fmt(shares)} thousand shares = €${r4(np / shares)}.` });
      else fields.push({ key: "npm", label: "Net profit margin (%)", answer: pct2(np / sales), dec: true, tol: 0.05, why: `Net profit ÷ sales from operations = ${fmt(np)} ÷ ${fmt(sales)} = ${pct2(np / sales)}%.` });
      return fill("shareholders' indicators", { kind: "Lario Energia (k€)", title: `What the owners earn, and keep · ${Y}`, lines: [
        [`Net profit ${Y - 1}`, fmt(prev)], [`Net profit ${Y}`, fmt(np)], [`Equity at 31 December ${Y}`, fmt(eq)], [`Dividends paid in ${Y}`, fmt(div)],
        ["Weighted average number of shares (thousand)", fmt(shares)], ["Sales from operations", fmt(sales)]] },
      "The shareholders' line: what do the owners earn, and keep?", fields,
      { label: "With this payout, the firm…", options: ["Keeps part of the profit to grow", "Pays out more than last year's profit: the SGR is negative"], answer: po < 1 ? "Keeps part of the profit to grow" : "Pays out more than last year's profit: the SGR is negative",
        why: po < 1 ? `It pays out ${pct2(po)}% and keeps the rest: equity can grow by ${pct2(sgr)}% a year on its own.` : `A payout of ${pct2(po)}% hands out more than last year's profit: equity can't grow on its own, the SGR is ${pct2(sgr)}%.` });
    }
    throw new Error("shareholdersLine");
  }
  function eniShareholders(r) {
    const i = r.int(0, 1), y = YEARS[i], E = ENI;
    const roe = E.netProfit[i] / E.equity[i], po = E.dividends[i] / E.netProfitPrev[i], sgr = roe * (1 - po), eps = E.netProfit[i] * 1e6 / E.shares[i];
    const fields = [
      { key: "roe", label: `ROE ${y} (%)`, answer: pct2(roe), dec: true, tol: 0.05, why: `${fmt(E.netProfit[i])} ÷ ${fmt(E.equity[i])} = ${pct2(roe)}%.` },
      { key: "po", label: `Payout ratio ${y} (%)`, answer: pct2(po), dec: true, tol: 0.05, why: `Dividends paid in ${y} ÷ net profit of ${y - 1} = ${fmt(E.dividends[i])} ÷ ${fmt(E.netProfitPrev[i])} = ${pct2(po)}%.` },
      { key: "sgr", label: `Sustainable growth rate ${y} (%)`, answer: pct2(sgr), dec: true, neg: true, tol: 0.05, why: `ROE × (1 − payout) = ${pct2(roe)}% × (1 − ${pct2(po)}%) = ${pct2(sgr)}%.` },
      r.chance(0.5)
        ? { key: "eps", label: `EPS ${y} (€ per share)`, answer: r4(eps), dec: true, tol: 0.006, why: `€${fmt(E.netProfit[i])} million ÷ ${E.shares[i].toLocaleString("en-US")} shares = €${r4(eps)}. The weighted average number of shares is in the EPS note (note 34).` }
        : { key: "npm", label: `Net profit margin ${y} (%)`, answer: pct2(E.netProfit[i] / E.sales[i]), dec: true, tol: 0.05, why: `${fmt(E.netProfit[i])} ÷ ${fmt(E.sales[i])} = ${pct2(E.netProfit[i] / E.sales[i])}%: only sales from operations count as revenues.` }];
    return fill("shareholders' indicators · Eni", eniDoc("The shareholders' line", i, [
      [`Net profit ${y - 1} · ${y}`, `${fmt(E.netProfitPrev[i])} · ${fmt(E.netProfit[i])}`], [`Equity at 31 December ${y}`, fmt(E.equity[i])], [`Dividends paid in ${y}`, fmt(E.dividends[i])],
      ["Weighted average number of shares", E.shares[i].toLocaleString("en-US")], ["Sales from operations", fmt(E.sales[i])]]),
    "Lecture 07: Eni through the shareholders' eyes.", fields,
    { label: "Eni's SGR went from +1.79% (2024) to −1.12% (2025). How do you read the change?", options: ["In points: −2.9 pp (a % change across zero has no meaning)", "As a % change: −162.78%", "It barely moved: both are close to zero"], answer: "In points: −2.9 pp (a % change across zero has no meaning)",
      why: "When an indicator changes sign, the relative delta (−162.78% in the slides) has no economic meaning: read the change in percentage points. Same when the base is close to zero." });
  }

  // ---------- Line 2 · the overall company (Lecture 07) ----------
  const DENOM_Q = [
    ["Which of the three is the highest here, and always will be?", "ROCE", "Same EBIT, the smallest denominator: equity + non-current financial liabilities < equity + all financial liabilities < total assets. So ROCE > ROI > ROA."],
    ["Which one puts only the long-term capital at the denominator?", "ROCE", "ROCE: equity + non-current financial liabilities, the long-term invested capital."],
    ["Which one measures the return on all the resources, whoever provided them?", "ROA", "ROA: EBIT ÷ total assets, the whole invested capital."],
    ["Which one measures the return on the capital that is paid for (equity and debts with interest)?", "ROI", "ROI: EBIT ÷ net invested capital = total assets − liabilities without an explicit interest rate = equity + financial liabilities."]];
  function overallCompany(r) {
    let ebit, ta, nfl, eq, ncfl, cfl, label, doc;
    if (r.chance(0.35)) {
      const i = r.int(0, 1), E = ENI;
      [ebit, ta, nfl, eq, ncfl, cfl] = [E.ebit[i], E.totalAssets[i], E.nonFinLiab[i], E.equity[i], E.nonCurFinLiab[i], E.curFinLiab[i]];
      label = "· Eni";
      doc = eniDoc("ROI, ROA and ROCE", i, [["Operating profit (EBIT)", fmt(ebit)], ["Total assets", fmt(ta)], ["Liabilities without an explicit interest rate", fmt(nfl)], ["Equity", fmt(eq)], ["Non-current financial liabilities", fmt(ncfl)], ["Current financial liabilities", fmt(cfl)]]);
    } else {
      eq = step(r, 2000, 8000, 50); ncfl = step(r, 500, 4000, 50); cfl = step(r, 200, 2000, 50); nfl = step(r, 1000, 6000, 50);
      ta = eq + ncfl + cfl + nfl; ebit = round(ta * r.int(4, 14) / 100, 10); label = "";
      doc = { kind: "Lario Energia (k€)", title: `How well is the capital used? · ${Y}`, lines: [["EBIT", fmt(ebit)], ["Total assets", fmt(ta)], ["Liabilities without an explicit interest rate (trade payables, provisions…)", fmt(nfl)], ["Equity", fmt(eq)], ["Non-current financial liabilities", fmt(ncfl)], ["Current financial liabilities", fmt(cfl)]] };
    }
    const nic = ta - nfl, q = r.pick(DENOM_Q);
    return fill("overall company: ROI, ROA, ROCE " + label, doc, "The overall company's line: same EBIT, three denominators.", [
      { key: "nic", label: "Net invested capital", answer: nic, why: `Total assets − liabilities without an explicit interest rate = ${fmt(ta)} − ${fmt(nfl)} = ${fmt(nic)} (= equity + all financial liabilities: ${fmt(eq)} + ${fmt(ncfl)} + ${fmt(cfl)}).` },
      { key: "roi", label: "ROI (%)", answer: pct2(ebit / nic), dec: true, tol: 0.05, why: `EBIT ÷ net invested capital = ${fmt(ebit)} ÷ ${fmt(nic)} = ${pct2(ebit / nic)}%.` },
      { key: "roa", label: "ROA (%)", answer: pct2(ebit / ta), dec: true, tol: 0.05, why: `EBIT ÷ total assets = ${fmt(ebit)} ÷ ${fmt(ta)} = ${pct2(ebit / ta)}%.` },
      { key: "roce", label: "ROCE (%)", answer: pct2(ebit / (eq + ncfl)), dec: true, tol: 0.05, why: `EBIT ÷ (equity + non-current financial liabilities) = ${fmt(ebit)} ÷ ${fmt(eq + ncfl)} = ${pct2(ebit / (eq + ncfl))}%.` }],
    { label: q[0], options: ["ROA", "ROI", "ROCE"], answer: q[1], why: q[2] });
  }

  // Margins, turnover and the quality of operating earnings.
  function margins(r) {
    let sales, ebit, da, ta, cffo, label, doc;
    if (r.chance(0.35)) {
      const i = r.int(0, 1), E = ENI;
      [sales, ebit, da, ta, cffo] = [E.sales[i], E.ebit[i], E.ebitda[i] - E.ebit[i], E.totalAssets[i], E.cffo[i]];
      label = " · Eni";
      doc = eniDoc("Margins and turnover", i, [["Sales from operations", fmt(sales)], ["Operating profit (EBIT)", fmt(ebit)], ["Depreciation and amortisation", fmt(da)], ["Total assets", fmt(ta)], ["Net cash from operating activities (CFFO)", fmt(cffo)]]);
    } else {
      sales = step(r, 5000, 60000, 100); ebit = round(sales * r.int(3, 18) / 100, 10); da = step(r, sales * 0.02, sales * 0.1, 10);
      ta = round(sales / r.pick([0.5, 0.6, 0.8, 1, 1.2, 1.5, 2]), 50); cffo = round(ebit * r.pick([0.7, 0.8, 0.9, 1.2, 1.5, 2.4]), 10); label = "";
      doc = { kind: "Lario Energia (k€)", title: `Margins and turnover · ${Y}`, lines: [["Sales from operations", fmt(sales)], ["EBIT", fmt(ebit)], ["Depreciation and amortisation", fmt(da)], ["Total assets", fmt(ta)], ["Cash flow from operating activities (CFFO)", fmt(cffo)]] };
    }
    const atr = sales / ta, ebitda = ebit + da, qoe = cffo / ebit;
    const fields = [
      { key: "em", label: "EBIT margin (%)", answer: pct2(ebit / sales), dec: true, tol: 0.05, why: `EBIT ÷ sales = ${fmt(ebit)} ÷ ${fmt(sales)} = ${pct2(ebit / sales)}%.` },
      { key: "atr", label: "Asset turnover (times)", answer: r2(atr), dec: true, tol: 0.011, why: `Sales ÷ total assets = ${fmt(sales)} ÷ ${fmt(ta)} = ${r2(atr)}: the sales each euro of assets brings in.` },
      { key: "roa", label: "ROA (%)", answer: pct2(ebit / ta), dec: true, tol: 0.06, why: `EBIT ÷ total assets = ${pct2(ebit / ta)}%, which is also EBIT margin × asset turnover = ${pct2(ebit / sales)}% × ${r2(atr)}.` }];
    let choice;
    if (r.chance(0.5)) {
      fields.push({ key: "qoe", label: "Quality of operating earnings (%)", answer: pct2(qoe), dec: true, tol: 0.5, why: `CFFO ÷ EBIT = ${fmt(cffo)} ÷ ${fmt(ebit)} = ${pct2(qoe)}%: cash value ÷ accrual value.` });
      choice = { label: "So each euro of operating profit brought in…", options: ["More than one euro of cash", "Less than one euro of cash"], answer: qoe > 1 ? "More than one euro of cash" : "Less than one euro of cash",
        why: qoe > 1 ? "Above 100%: EBIT is net of non-cash costs (depreciation, impairments) that CFFO adds back, and working capital may have released cash." : "Below 100%: interest and taxes paid in cash, or working capital that absorbed cash, take part of the operating profit away." };
    } else {
      fields.push({ key: "ebitda", label: "EBITDA margin (%)", answer: pct2(ebitda / sales), dec: true, tol: 0.05, why: `(EBIT + D&A) ÷ sales = (${fmt(ebit)} + ${fmt(da)}) ÷ ${fmt(sales)} = ${pct2(ebitda / sales)}%.` });
      choice = { label: "The gap between the EBITDA margin and the EBIT margin is…", options: ["D&A as a % of sales", "Interest as a % of sales", "Taxes as a % of sales"], answer: "D&A as a % of sales",
        why: `EBITDA − EBIT = D&A: ${pct2(ebitda / sales)}% − ${pct2(ebit / sales)}% = ${r2(pct2(ebitda / sales) - pct2(ebit / sales))} points of sales. Interest and taxes come below EBIT.` };
    }
    return fill("margins and turnover" + label, doc, "Margins, turnover and the cash behind the operating profit.", fields, choice);
  }

  // ---------- Line 3 · other stakeholders: lenders and the State (Lecture 08) ----------
  function otherStakeholders(r) {
    let tl, fd, eq, ebit, int, pretax, tax, label, doc;
    if (r.chance(0.35)) {
      const i = r.int(0, 1), E = ENI;
      [tl, fd, eq, ebit, int, pretax, tax] = [E.totalLiab[i], E.finLiab[i], E.equity[i], E.ebit[i], E.interest[i], E.pretax[i], E.taxes[i]];
      label = " · Eni";
      doc = eniDoc("Debt, interest and taxes", i, [["Total liabilities", fmt(tl)], ["of which debts with an explicit interest rate (incl. leases)", fmt(fd)], ["Equity", fmt(eq)], ["EBIT", fmt(ebit)], ["Interest expenses", fmt(int)], ["Pre-tax profit", fmt(pretax)], ["Income taxes", fmt(tax)]]);
    } else {
      for (let t = 0; t < 60; t++) {
        eq = step(r, 2000, 9000, 50); tl = round(eq * r.pick([0.6, 0.8, 1.3, 1.6, 2.2]), 50); fd = round(tl * r.int(30, 60) / 100, 10);
        ebit = step(r, 300, 2500, 10); int = Math.round(fd * r.int(25, 70) / 1000); pretax = ebit - int + step(r, 0, 300, 10);
        tax = Math.round(pretax * r.int(20, 45) / 100);
        if (int > 0 && ebit / int > 1.2 && pretax > 0) break;
      }
      label = "";
      doc = { kind: "Lario Energia (k€)", title: `Can it carry its debt, and what goes in tax? · ${Y}`, lines: [["Total liabilities", fmt(tl)], ["of which debts with an explicit interest rate", fmt(fd)], ["Equity", fmt(eq)], ["EBIT", fmt(ebit)], ["Interest expenses", fmt(int)], ["Pre-tax profit", fmt(pretax)], ["Income taxes", fmt(tax)]] };
    }
    const de = tl / eq;
    return fill("other stakeholders' indicators" + label, doc, "The line of lenders and the State. Debt here = total liabilities, as in the Eni slides.", [
      { key: "de", label: "Debt to equity (times)", answer: r2(de), dec: true, tol: 0.011, why: `Total liabilities ÷ equity = ${fmt(tl)} ÷ ${fmt(eq)} = ${r2(de)}. Say which debt you use: financial liabilities, total liabilities or the NFP give different ratios.` },
      { key: "icr", label: "Interest coverage ratio (times)", answer: r2(ebit / int), dec: true, tol: 0.011, why: `EBIT ÷ interest expenses = ${fmt(ebit)} ÷ ${fmt(int)} = ${r2(ebit / int)} times.` },
      { key: "kd", label: "Cost of debt (%)", answer: pct2(int / fd), dec: true, tol: 0.05, why: `Interest expenses ÷ debts with an explicit interest rate = ${fmt(int)} ÷ ${fmt(fd)} = ${pct2(int / fd)}%. Trade payables carry no explicit interest: they stay out.` },
      { key: "etr", label: "Effective tax rate (%)", answer: pct2(tax / pretax), dec: true, tol: 0.05, why: `Income taxes ÷ pre-tax profit (EBT) = ${fmt(tax)} ÷ ${fmt(pretax)} = ${pct2(tax / pretax)}%.` }],
    { label: "Which is the dominant source of financing?", options: ["Debt (third parties)", "Equity (the shareholders)"], answer: de > 1 ? "Debt (third parties)" : "Equity (the shareholders)",
      why: `D/E ${de > 1 ? "above" : "below"} 1 (${r2(de)}): ${de > 1 ? "debt" : "equity"} is the dominant source.` });
  }

  // The analyst's leverage formula and the risk / operational efficiency matrix (Lecture 08).
  const QUADRANTS = {
    "Sound": "good operations, light debt",
    "Amplified, risky": "debt multiplies a good return, and would multiply a fall in ROA too",
    "Weak and indebted": "operations don't pay for the debt",
    "Prudent but weak": "little risk, but little to amplify"
  };
  function leverageFormula(r) {
    for (let t = 0; t < 80; t++) {
      const a = step(r, 4000, 20000, 100), deT = r.pick([0.5, 0.8, 1.2, 1.6, 2.2, 3]), eq = round(a / (1 + deT), 50), d = a - eq;
      const ebit = round(a * r.int(3, 14) / 100, 10), int = round(ebit * r.pick([0.1, 0.2, 0.3, 0.4, 0.6]), 5);
      const roa = ebit / a, de = d / eq, icr = ebit / int, roe = (ebit - int) / eq;
      const avgRoa = r.int(4, 12) / 100, avgDe = r.pick([0.8, 1, 1.2, 1.5, 2]);
      if (int <= 0 || Math.abs(roa - avgRoa) < 0.01 || Math.abs(de - avgDe) < 0.2) continue;
      const q = roa > avgRoa ? (de > avgDe ? "Amplified, risky" : "Sound") : (de > avgDe ? "Weak and indebted" : "Prudent but weak");
      return fill("leverage formula and matrix", { kind: "Lario Energia (k€) · no taxes, no financial income", title: `ROE = ROA × (1 − 1/ICR) × (1 + D/E) · ${Y}`, lines: [
        ["Total assets", fmt(a)], ["Total liabilities (D)", fmt(d)], ["Equity (E)", fmt(eq)], ["EBIT", fmt(ebit)], ["Interest expenses (I)", fmt(int)],
        ["Sector average ROA", `${pct2(avgRoa)}%`], ["Sector average D/E", fmt(avgDe)]] },
      "Read ROE through the analyst's formula, then place the firm in the risk / efficiency matrix against the sector averages.", [
        { key: "roa", label: "ROA (%)", answer: pct2(roa), dec: true, tol: 0.05, why: `EBIT ÷ total assets = ${fmt(ebit)} ÷ ${fmt(a)} = ${pct2(roa)}%.` },
        { key: "icr", label: "ICR (times)", answer: r2(icr), dec: true, tol: 0.011, why: `EBIT ÷ I = ${fmt(ebit)} ÷ ${fmt(int)} = ${r2(icr)}.` },
        { key: "de", label: "D/E (times)", answer: r2(de), dec: true, tol: 0.011, why: `${fmt(d)} ÷ ${fmt(eq)} = ${r2(de)}.` },
        { key: "roe", label: "ROE with the formula (%)", answer: pct2(roe), dec: true, neg: true, tol: 0.15, why: `${pct2(roa)}% × (1 − 1/${r2(icr)}) × (1 + ${r2(de)}) = ${pct2(roe)}%, the same as (EBIT − I) ÷ E = ${fmt(ebit - int)} ÷ ${fmt(eq)}: with no taxes and no other financial items the formula is exact.` }],
      { label: "In the risk / efficiency matrix, the firm is…", options: Object.keys(QUADRANTS), answer: q,
        why: `ROA ${pct2(roa)}% ${roa > avgRoa ? "above" : "below"} the sector's ${pct2(avgRoa)}%, D/E ${r2(de)} ${de > avgDe ? "above" : "below"} the sector's ${fmt(avgDe)}: “${q}”, ${QUADRANTS[q]}. The lines are sector averages, not thresholds.` });
    }
    throw new Error("leverageFormula");
  }

  // ---------- Line 4 · liquidity, for all actors (Lecture 08) ----------
  function liquidity(r) {
    let cash, stInv, rec, inv, ca, cl, pay, rev, purch, label, doc;
    if (r.chance(0.35)) {
      const i = r.int(0, 1), E = ENI;
      cash = E.cash[i]; stInv = E.stFinAssets[i] + E.otherCurFinAssets[i]; rec = E.receivables[i]; inv = E.inventories[i]; ca = E.currentAssets[i]; cl = E.currentLiab[i];
      pay = E.payables[i]; rev = E.sales[i]; purch = E.purchases[i]; label = " · Eni";
      doc = eniDoc("Can it pay its bills when they fall due?", i, [["Cash and cash equivalents", fmt(cash)], ["Short-term financial assets", fmt(E.stFinAssets[i])], ["Other current financial assets", fmt(E.otherCurFinAssets[i])], ["Trade and other receivables", fmt(rec)], ["Inventories", fmt(inv)], ["Total current assets", fmt(ca)],
        ["Total current liabilities", fmt(cl)], ["Trade and other payables", fmt(pay)], ["Sales from operations", fmt(rev)], ["Purchases, services and other", fmt(purch)]]);
    } else {
      rev = step(r, 10000, 80000, 100); rec = round(rev * r.int(30, 120) / 365, 10); inv = round(rev / r.pick([4, 6, 8, 10, 12, 16]), 10);
      cash = step(r, 500, 6000, 10); stInv = step(r, 0, 2000, 10); ca = cash + stInv + rec + inv + step(r, 0, 1500, 10);
      purch = round(rev * r.int(50, 80) / 100, 10); pay = round(purch * r.int(40, 130) / 365, 10); cl = pay + step(r, 500, 6000, 10); label = "";
      doc = { kind: "Lario Energia (k€)", title: `Can it pay its bills when they fall due? · ${Y}`, lines: [["Cash and cash equivalents", fmt(cash)], ["Short-term investments", fmt(stInv)], ["Trade receivables", fmt(rec)], ["Inventories", fmt(inv)], ["Total current assets", fmt(ca)],
        ["Total current liabilities", fmt(cl)], ["Trade payables", fmt(pay)], ["Revenues", fmt(rev)], ["Purchases", fmt(purch)]] };
    }
    const quick = cash + stInv + rec, dso = rec / rev * 365, dpo = pay / purch * 365;
    const fields = [{ key: "cr", label: "Current ratio (times)", answer: r2(ca / cl), dec: true, tol: 0.011, why: `Current assets ÷ current liabilities = ${fmt(ca)} ÷ ${fmt(cl)} = ${r2(ca / cl)}. Above 1 is preferable.` }];
    if (r.chance(0.5)) fields.push({ key: "qr", label: "Quick ratio (times)", answer: r2(quick / cl), dec: true, tol: 0.011, why: `(Cash + short-term investments + receivables) ÷ current liabilities = ${fmt(quick)} ÷ ${fmt(cl)} = ${r2(quick / cl)}: inventory is left out.` });
    else fields.push({ key: "itr", label: "Inventory turnover (times)", answer: r2(rev / inv), dec: true, tol: 0.011, why: `Revenues ÷ inventories = ${fmt(rev)} ÷ ${fmt(inv)} = ${r2(rev / inv)}: how many times the inventory is “turned” in the year.` });
    fields.push(
      { key: "dso", label: "DSO (days)", answer: Math.round(dso), tol: 1, why: `Trade receivables ÷ revenues × 365 = ${fmt(rec)} ÷ ${fmt(rev)} × 365 = ${r2(dso)} days. The lower the better.` },
      { key: "dpo", label: "DPO (days)", answer: Math.round(dpo), tol: 1, why: `Trade payables ÷ purchases × 365 = ${fmt(pay)} ÷ ${fmt(purch)} × 365 = ${r2(dpo)} days.` });
    return fill("liquidity indicators" + label, doc, "Liquidity, on an accrual basis: the ratios every reader looks at.", fields,
      { label: "Compare DSO and DPO:", options: ["We collect from customers before we pay suppliers", "We pay suppliers before customers pay us"], answer: dso < dpo ? "We collect from customers before we pay suppliers" : "We pay suppliers before customers pay us",
        why: dso < dpo ? `DSO ${Math.round(dso)} < DPO ${Math.round(dpo)}: suppliers finance the operating cycle, cash comes in before it goes out. (A very high DPO can also signal trouble paying.)` : `DSO ${Math.round(dso)} > DPO ${Math.round(dpo)}: cash goes out before it comes in, and the gap has to be funded.` });
  }

  // Liquidity on a cash basis: can operating cash flow cover the debt and the investments?
  function cashCoverage(r) {
    let cffo, fin, cur, capex, label, doc, extra = null;
    if (r.chance(0.35)) {
      const i = r.int(0, 1), E = ENI;
      [cffo, fin, cur, capex] = [E.cffo[i], E.finLiab[i], E.curFinLiab[i], E.capex[i]]; label = " · Eni";
      doc = eniDoc("Liquidity on a cash basis", i, [["Net cash from operating activities (CFFO)", fmt(cffo)], ["Total financial liabilities (current + non-current)", fmt(fin)], ["Current financial liabilities", fmt(cur)], ["CAPEX (tangible and intangible)", fmt(capex)]]);
      if (i === 1) extra = { label: "In 2025 dividends and buybacks took €5.3 bn more than CFFO − CAPEX left. Eni filled the gap mainly by…", options: ["Selling minority stakes in subsidiaries", "Issuing new shares", "Raising its long-term debt"], answer: "Selling minority stakes in subsidiaries",
        why: "Investments self-financed, distributions not: Eni received €5.07 bn from selling minority interests (a financing inflow), consistent with its deleveraging. Its long-term debt went down." };
    } else {
      cffo = step(r, 1000, 15000, 10); fin = round(cffo * r.pick([1.5, 2, 2.5, 3, 4, 6]), 10); cur = round(fin * r.int(15, 45) / 100, 10); capex = round(cffo * r.pick([0.5, 0.7, 0.9, 1.1, 1.3, 1.6]), 10); label = "";
      doc = { kind: "Lario Energia (k€)", title: `Liquidity on a cash basis · ${Y}`, lines: [["Cash flow from operating activities (CFFO)", fmt(cffo)], ["Total financial liabilities", fmt(fin)], ["Current financial liabilities", fmt(cur)], ["CAPEX", fmt(capex)]] };
    }
    const left = cffo - capex;
    return fill("cash-basis liquidity" + label, doc, "Cash basis: three ratios with CFFO on top and something different to cover below.", [
      { key: "cfd", label: "Cash flow to debt (%)", answer: pct2(cffo / fin), dec: true, tol: 0.05, why: `CFFO ÷ total financial liabilities = ${fmt(cffo)} ÷ ${fmt(fin)} = ${pct2(cffo / fin)}%: about ${r2(fin / cffo)} years of operating cash to repay the financial debt.` },
      { key: "std", label: "Short-term debt coverage (%)", answer: pct2(cffo / cur), dec: true, tol: 0.05, why: `CFFO ÷ current financial liabilities = ${fmt(cffo)} ÷ ${fmt(cur)} = ${pct2(cffo / cur)}%.` },
      { key: "cap", label: "Capex coverage (%)", answer: pct2(cffo / capex), dec: true, tol: 0.05, why: `CFFO ÷ CAPEX = ${fmt(cffo)} ÷ ${fmt(capex)} = ${pct2(cffo / capex)}%.` },
      { key: "left", label: "CFFO − CAPEX", answer: left, neg: true, why: `${fmt(cffo)} − ${fmt(capex)} = ${sgn(left)}: close to the free cash flow, available for debt and shareholders.` }],
    extra || { label: "Can operations pay for this year's investments?", options: ["Yes, with something left for lenders and shareholders", "No: part of the capex needs other money"], answer: left > 0 ? "Yes, with something left for lenders and shareholders" : "No: part of the capex needs other money",
      why: left > 0 ? `Capex coverage ${pct2(cffo / capex)}%: CFFO pays the capex and ${fmt(left)} is left.` : `Capex coverage ${pct2(cffo / capex)}%: the investments need new debt, new equity or the cash already there.` });
  }

  // OPEX or CAPEX?
  const SPEND = [
    ["Crude oil bought for the refinery this month", "OPEX", "A cost of running the business this year: income statement now."],
    ["The year's payroll", "OPEX", "Running costs of the year."],
    ["Electricity for the plants this year", "OPEX", "Used up in the year: an operating expense."],
    ["Maintenance services that keep the pipelines working", "OPEX", "Keeps things working, adds nothing lasting: an expense."],
    ["Consultancy fees for this year's audit", "OPEX", "A service used up in the year."],
    ["Office supplies and coffee", "OPEX", "Consumed in the year."],
    ["Drilling a new production well", "CAPEX", "Used for many years: an asset in the balance sheet, depreciated over its life."],
    ["A 20-year exploration licence", "CAPEX", "An intangible asset, amortised over the licence."],
    ["A new biorefinery unit", "CAPEX", "A plant: balance sheet now, depreciation over its useful life."],
    ["A software platform bought for five years of use", "CAPEX", "An intangible asset used for years."],
    ["Trucks bought for the delivery fleet", "CAPEX", "Tangible assets used for years."],
    ["A new wind farm", "CAPEX", "A long-lived asset: investing cash flow today, depreciation over time."]
  ];
  function opexCapex(r) {
    for (let t = 0; t < 30; t++) {
      const picked = r.shuffle(SPEND.slice()).slice(0, 6);
      if (new Set(picked.map(p => p[1])).size < 2) continue;
      return { type: "reclass", pattern: "OPEX or CAPEX", cats: ["OPEX", "CAPEX"], short: ["OPEX", "CAPEX"], typeLabel: "FINANCIAL ANALYSIS", docKind: "Operational or capital expenditure?",
        brief: "Classify each spending.", note: "OPEX reduces profit today. CAPEX leaves the cash today (investing cash flow) and reduces profit over the asset's useful life, through D&A.",
        items: picked.map(([label, cat, why]) => ({ label, cat, why })), fields: [] };
    }
    throw new Error("opexCapex");
  }

  // Which reader looks at which indicator?
  const READERS = ["Shareholders", "Overall company", "Other stakeholders", "All actors (liquidity)"];
  const INDICATORS = [
    ["ROE = net profit ÷ equity", 0], ["EPS = net profit ÷ weighted average shares", 0], ["Payout = dividends ÷ net profit (t−1)", 0], ["Sustainable growth rate = ROE × (1 − payout)", 0], ["Net profit margin = net profit ÷ sales", 0],
    ["ROI = EBIT ÷ net invested capital", 1], ["ROA = EBIT ÷ total assets", 1], ["ROCE = EBIT ÷ (equity + non-current financial liabilities)", 1], ["EBIT margin = EBIT ÷ sales", 1], ["EBITDA margin = EBITDA ÷ sales", 1], ["Quality of operating earnings = CFFO ÷ EBIT", 1], ["Asset turnover = sales ÷ total assets", 1],
    ["Debt to equity", 2], ["Interest coverage = EBIT ÷ interest", 2], ["Cost of debt = interest ÷ debts with interest", 2], ["Effective tax rate = taxes ÷ pre-tax profit", 2],
    ["Current ratio", 3], ["Quick ratio", 3], ["Inventory turnover = revenues ÷ inventories", 3], ["DSO", 3], ["DPO", 3], ["Cash flow to debt = CFFO ÷ financial liabilities", 3], ["Short-term debt coverage", 3], ["Capex coverage = CFFO ÷ CAPEX", 3]
  ];
  const READER_WHY = ["What do the owners earn, and keep? The shareholders' line.", "How well is the capital invested in operations used? The overall company (mainly managers).", "Can the firm carry its debt, and what goes in tax? Banks, bondholders, the State.", "Can the firm pay its bills when they fall due? Liquidity concerns everyone."];
  function fourReaders(r) {
    for (let t = 0; t < 30; t++) {
      const picked = r.shuffle(INDICATORS.slice()).slice(0, 6);
      if (new Set(picked.map(p => p[1])).size < 3) continue;
      return { type: "reclass", pattern: "four readers", cats: READERS, short: ["Share.", "Company", "Others", "All"], typeLabel: "FINANCIAL ANALYSIS", docKind: "Same accounts, different readers",
        brief: "Which line of the indicators map does each one belong to?",
        items: picked.map(([label, k]) => ({ label, cat: READERS[k], why: READER_WHY[k] })), fields: [] };
    }
    throw new Error("fourReaders");
  }

  // ---------- The check-up: residual income (Lecture 08) ----------
  function residualIncome(r) {
    if (r.chance(0.35)) {
      const E = ENI, ic = E.ri.investedCapital, k = E.ri.k, ri = [0, 1].map(i => E.ebit[i] - k[i] * ic[i]), at6 = E.ebit[0] - 0.06 * ic[0];
      return fill("residual income · Eni", eniDoc("Residual income = EBIT − k × invested capital", 1, [["EBIT 2024 · 2025", `${fmt(E.ebit[0])} · ${fmt(E.ebit[1])}`], ["Invested capital 2024 · 2025", `${fmt(ic[0])} · ${fmt(ic[1])}`], ["k from the Annual Report 2024 · 2025", "7% · 6%"]]),
        "Is Eni creating value? Residual income puts the cost of capital inside an absolute value.", [
          { key: "ri0", label: "RI 2024 (€ million)", answer: Math.round(ri[0]), neg: true, tol: 1, why: `${fmt(E.ebit[0])} − 7% × ${fmt(ic[0])} = ${sgn(Math.round(ri[0]))}: EBIT didn't cover the cost of the capital invested.` },
          { key: "ri1", label: "RI 2025 (€ million)", answer: Math.round(ri[1]), neg: true, tol: 1, why: `${fmt(E.ebit[1])} − 6% × ${fmt(ic[1])} = ${sgn(Math.round(ri[1]))}: EBIT covers the cost of the capital invested.` },
          { key: "at6", label: "RI 2024 with k = 6%, as in note 15 (€ million)", answer: Math.round(at6), neg: true, tol: 1, why: `${fmt(E.ebit[0])} − 6% × ${fmt(ic[0])} = ${sgn(Math.round(at6))}: RI depends on k. Eni's note 15 uses 6% post-tax in both years.` }],
        { label: "From −584 to +423: how do you read the change?", options: ["+€1,007 million: a % change across zero has no meaning", "+172%: residual income grew by more than its whole value", "−172%: it got worse"], answer: "+€1,007 million: a % change across zero has no meaning",
          why: "Read the change in euro. A % change across zero (the slides' “172.48%”) is meaningless." });
    }
    for (let t = 0; t < 60; t++) {
      const ic0 = step(r, 5000, 40000, 100), ic1 = round(ic0 * (1 + r.int(-15, 15) / 100), 100), k0 = r.pick([6, 7, 8, 9, 10]), k1 = r.chance(0.6) ? k0 : r.pick([6, 7, 8, 9, 10]);
      const e0 = round(ic0 * r.int(3, 14) / 100, 10), e1 = round(ic1 * r.int(3, 14) / 100, 10);
      const ri0 = e0 - k0 * ic0 / 100, ri1 = e1 - k1 * ic1 / 100, ch = ri1 - ri0;
      if (!ri0 || !ri1 || !ch) continue;
      const cross = ri0 * ri1 < 0;
      return fill("residual income", { kind: "Lario Energia (k€)", title: `Residual income = EBIT − k × invested capital`, lines: [
        [`EBIT ${Y - 1} · ${Y}`, `${fmt(e0)} · ${fmt(e1)}`], [`Invested capital (equity + financial liabilities) ${Y - 1} · ${Y}`, `${fmt(ic0)} · ${fmt(ic1)}`], [`Cost of capital k ${Y - 1} · ${Y}`, `${k0}% · ${k1}%`]] },
      "Do the operations earn more than the capital they use costs?", [
        { key: "ri0", label: `RI ${Y - 1}`, answer: ri0, neg: true, why: `${fmt(e0)} − ${k0}% × ${fmt(ic0)} = ${sgn(ri0)}.` },
        { key: "ri1", label: `RI ${Y}`, answer: ri1, neg: true, why: `${fmt(e1)} − ${k1}% × ${fmt(ic1)} = ${sgn(ri1)}.` },
        { key: "ch", label: `Change in RI, ${Y} vs ${Y - 1} (k€)`, answer: ch, neg: true, why: `${sgn(ri1)} − (${sgn(ri0)}) = ${sgn(ch)}.${cross ? " RI changed sign: read the change in euro, a % change across zero has no meaning." : ""}` }],
      { label: `In ${Y}, the operations…`, options: ["Earn more than the cost of the capital invested: value created", "Don't cover the cost of the capital invested"], answer: ri1 > 0 ? "Earn more than the cost of the capital invested: value created" : "Don't cover the cost of the capital invested",
        why: ri1 > 0 ? "RI > 0: EBIT is above k × invested capital." : "RI < 0: EBIT is below k × invested capital, even if the profit is positive." });
    }
    throw new Error("residualIncome");
  }

  // ROA or residual income for a decision: the hotel case (Lecture 08, last slide).
  function hotelCase(r) {
    for (let t = 0; t < 80; t++) {
      const ic = step(r, 500000, 3000000, 50000), roa0 = r.int(14, 30) / 100, oi = round(ic * roa0, 1000), k = r.pick([8, 10, 12, 14]);
      const dic = step(r, 100000, 800000, 50000), kind = r.pick(["conflict", "conflict", "conflict", "both", "neither"]);
      const pr = kind === "conflict" ? (k / 100 + oi / ic) / 2 : kind === "both" ? oi / ic + r.int(2, 8) / 100 : k / 100 - r.int(2, 5) / 100;
      const doi = round(dic * pr, 1000);
      const a0 = oi / ic, a1 = (oi + doi) / (ic + dic), ri0 = oi - k * ic / 100, ri1 = oi + doi - k * (ic + dic) / 100;
      if (doi <= 0 || Math.abs(a1 - a0) < 0.001 || ri1 === ri0) continue;
      const roaYes = a1 > a0, riYes = ri1 > ri0;
      const answer = roaYes && riYes ? "Both" : riYes ? "Only a manager evaluated on RI" : roaYes ? "Only a manager evaluated on ROA" : "Neither";
      return fill("ROA vs residual income: the hotel", { kind: "Hotel chain · the San Francisco hotel (€)", title: "Upgrading the rooms", lines: [
        ["Operating income today", fmt(oi)], ["Investment (invested capital) today", fmt(ic)], ["Cost of capital k", `${k}%`],
        ["The upgrade adds to operating income", fmt(doi)], ["The upgrade adds to the investment", fmt(dic)]] },
      "How does the evaluation change if the manager is judged on ROA or on residual income?", [
        { key: "a0", label: "ROA today (%)", answer: pct2(a0), dec: true, tol: 0.05, why: `${fmt(oi)} ÷ ${fmt(ic)} = ${pct2(a0)}%.` },
        { key: "a1", label: "ROA after the upgrade (%)", answer: pct2(a1), dec: true, tol: 0.05, why: `(${fmt(oi)} + ${fmt(doi)}) ÷ (${fmt(ic)} + ${fmt(dic)}) = ${pct2(a1)}%.` },
        { key: "ri0", label: "RI today (€)", answer: ri0, neg: true, why: `${fmt(oi)} − ${k}% × ${fmt(ic)} = ${sgn(ri0)}.` },
        { key: "ri1", label: "RI after the upgrade (€)", answer: ri1, neg: true, why: `${fmt(oi + doi)} − ${k}% × ${fmt(ic + dic)} = ${sgn(ri1)}.` }],
      { label: "Who accepts the upgrade?", options: ["Only a manager evaluated on RI", "Only a manager evaluated on ROA", "Both", "Neither"], answer,
        why: `The upgrade earns ${pct2(doi / dic)}% on its own: ${doi / dic > k / 100 ? "above" : "below"} k = ${k}% (so it ${riYes ? "creates" : "destroys"} value: RI ${riYes ? "rises" : "falls"}), and ${doi / dic > a0 ? "above" : "below"} today's ROA of ${pct2(a0)}% (so ROA ${roaYes ? "rises" : "falls"}).${answer === "Only a manager evaluated on RI" ? " The ratio punishes a good investment: “denominator management”. RI is an absolute value with the cost of capital inside." : ""}` });
    }
    throw new Error("hotelCase");
  }

  // ---------- Step 5 · benchmarking Eni vs TotalEnergies (exercise session) ----------
  function segmentMix(r) {
    const s = r.int(0, 3), y = r.int(0, 2), S = SEGMENTS;
    const eniTot = S.eni.reduce((a, row) => a + row[y], 0), totTot = S.total.reduce((a, row) => a + row[y], 0);
    const e = S.eni[s][y], t = S.total[s][y];
    const upstream = s === 0;
    return fill("segment mix · Eni vs TotalEnergies", { kind: `Sales by segment ${S.years[y]} · Eni (€m) and TotalEnergies ($m)`, title: "Regrouped in common meta-categories", lines: [
      ["", "Eni · TotalEnergies"], ...S.names.map((n, i) => [n, `${fmt(S.eni[i][y])} · ${fmt(S.total[i][y])}`]), ["Sum", `${fmt(eniTot)} · ${fmt(totTot)}`]] },
    `Normalise the figures: what share of each company's sales comes from “${S.names[s]}”? (For TotalEnergies, “Corporate and other activities” holds Marketing & Services.)`, [
      { key: "eni", label: `Eni, share of sales (%)`, answer: pct2(e / eniTot), dec: true, tol: 0.05, why: `${fmt(e)} ÷ ${fmt(eniTot)} = ${pct2(e / eniTot)}%.` },
      { key: "tot", label: `TotalEnergies, share of sales (%)`, answer: pct2(t / totTot), dec: true, tol: 0.05, why: `${fmt(t)} ÷ ${fmt(totTot)} = ${pct2(t / totTot)}%.` }],
    upstream
      ? { label: "Why is TotalEnergies' upstream share of sales so low?", options: ["Most of the oil and gas it extracts goes to its other divisions and is sold there", "Its upstream business is tiny", "It reports in dollars"], answer: "Most of the oil and gas it extracts goes to its other divisions and is sold there",
        why: "The final sale is recorded in LNG, refining, power or marketing: TotalEnergies looks more downstream and customer-facing, Eni more upstream and gas-related." }
      : { label: "Why compare the shares and not the amounts?", options: ["The two firms differ in size and currency (€ vs $)", "Amounts are confidential", "Shares are always more precise"], answer: "The two firms differ in size and currency (€ vs $)",
        why: "Same metric (sales), segments regrouped into common meta-categories, then % shares: the business mix becomes comparable whatever the size and the reporting currency." });
  }

  // Reading the notes: equity-accounted investments that fall while the firm keeps investing.
  function equityInvestments(r) {
    for (let t = 0; t < 80; t++) {
      const open = step(r, 2000, 12000, 50), inv = step(r, 100, 1200, 10), share = step(r, 200, 1500, 10), down = r.chance(0.6);
      const div = down ? share + step(r, 100, 900, 10) : Math.max(0, share - step(r, 50, 600, 10)), fx = down ? -step(r, 0, 800, 10) : step(r, -300, 300, 10);
      const close = open + inv + share - div + fx, ch = close - open;
      if (down ? ch >= 0 : ch <= 0) continue;
      return fill("equity-accounted investments", { kind: "Lario Energia · note on associates and joint ventures (k€)", title: `Equity-accounted investments in ${Y}`, lines: [
        ["Carrying amount, 1 January", fmt(open)], ["New investments (capital paid in)", fmt(inv)], ["Share of the investees' profit", fmt(share)], ["Dividends received", fmt(div)], ["Exchange-rate differences", sgn(fx)]] },
      "Common size says the investments moved. The notes say why.", [
        { key: "close", label: "Carrying amount, 31 December", answer: close, why: `${fmt(open)} + ${fmt(inv)} + ${fmt(share)} − ${fmt(div)} ${fx < 0 ? "−" : "+"} ${fmt(Math.abs(fx))} = ${fmt(close)}. The equity method: + share of profit − dividends.` },
        { key: "ch", label: "Change in the year", answer: ch, neg: true, why: `${fmt(close)} − ${fmt(open)} = ${sgn(ch)}.` }],
      down
        ? { label: "Did Lario stop investing in its associates?", options: ["No: it invested, but dividends received (and FX) took more out", "Yes: a lower value means it sold its stakes"], answer: "No: it invested, but dividends received (and FX) took more out",
          why: `It put in ${fmt(inv)}, and its share of profit was positive, but the dividends (${fmt(div)}) exceeded that share${fx < 0 ? " and the exchange rates took another " + fmt(-fx) : ""}. Eni 2025: €595m invested, dividends €1.51 bn > share of profit €1.16 bn, FX −€1.42 bn.` }
        : { label: "Why did the carrying amount go up?", options: ["Its share of the investees' profit was above the dividends received", "It received more dividends than its share of profit", "Dividends received raise the investment"], answer: "Its share of the investees' profit was above the dividends received",
          why: `Share of profit ${fmt(share)} > dividends ${fmt(div)}, plus new investments of ${fmt(inv)}: like TotalEnergies in 2025.` });
    }
    throw new Error("equityInvestments");
  }

  // ---------- Exam level (multiple choice with the typical mistakes) ----------
  const n0 = x => Math.round(x).toLocaleString("en-US");
  const p2 = x => `${(Math.round(x * 10000) / 100).toFixed(2)}%`;
  const table = (kind, title, rows) => ({ kind, title, lines: rows.map(([k, v]) => [k, typeof v === "number" ? n0(v) : String(v)]) });
  function riExam(r) {
    for (let t = 0; t < 60; t++) {
      const eq = step(r, 200, 900, 10), fl = step(r, 100, 800, 10), nfl = step(r, 100, 600, 10), ta = eq + fl + nfl, ebit = round(ta * r.int(5, 15) / 100, 1), k = r.pick([6, 7, 8, 9, 10, 12]);
      const int = round(fl * r.int(3, 6) / 100, 1), np = Math.round((ebit - int) * 0.7), ic = eq + fl, ri = ebit - k * ic / 100;
      if (np <= 0 || Math.abs(ri) < 3) continue;
      const v = x => `RI = ${n0(x)} mln €`;
      return X.exam(r, {
        pattern: "Residual income",
        doc: table(`Company Delta · ${Y} (mln €)`, "RI = EBIT − k × invested capital", [["Total assets", ta], ["Liabilities without an explicit interest rate", nfl], ["Financial liabilities (current + non-current)", fl], ["Equity", eq], ["EBIT", ebit], ["Net profit", np], ["Cost of capital k", `${k}%`]]),
        question: "What is Delta's residual income?", right: v(ri),
        mistakes: [
          { text: v(ebit - k * ta / 100), why: "the capital charge is on the invested capital (total assets − liabilities without an explicit interest rate), not on all assets." },
          { text: v(np - k * ic / 100), why: "RI uses the operating income, EBIT: the cost of all the capital is already in k × invested capital." },
          { text: v(ebit - k * eq / 100), why: "k is the cost of all the capital invested, equity and financial debt: the invested capital is equity + financial liabilities." }],
        solution: [`Invested capital = ${n0(ta)} − ${n0(nfl)} = ${n0(ic)} (= equity ${n0(eq)} + financial liabilities ${n0(fl)}).`, `RI = ${n0(ebit)} − ${k}% × ${n0(ic)} = ${n0(ri)} mln €: ${ri > 0 ? "value created" : "the operations don't cover the cost of the capital"}.`]
      });
    }
    throw new Error("riExam");
  }
  function roceExam(r) {
    const eq = step(r, 200, 900, 10), ncfl = step(r, 100, 600, 10), cfl = step(r, 50, 300, 10), nfl = step(r, 100, 600, 10), ta = eq + ncfl + cfl + nfl, ebit = round(ta * r.int(5, 15) / 100, 1);
    const v = x => `ROCE ≈ ${p2(x)}`;
    return X.exam(r, {
      pattern: "ROCE, ROI and ROA",
      doc: table(`Company Epsilon · ${Y} (mln €)`, "Three denominators", [["EBIT", ebit], ["Total assets", ta], ["Liabilities without an explicit interest rate", nfl], ["Current financial liabilities", cfl], ["Non-current financial liabilities", ncfl], ["Equity", eq]]),
      question: "What is Epsilon's ROCE?", right: v(ebit / (eq + ncfl)),
      mistakes: [
        { text: v(ebit / (eq + ncfl + cfl)), why: "that's ROI: ROCE leaves the current financial liabilities out (long-term capital only)." },
        { text: v(ebit / ta), why: "that's ROA, on total assets." },
        { text: v(ebit / eq), why: "ROCE's denominator is equity + non-current financial liabilities, not equity alone." }],
      solution: [`Capital employed = equity + non-current financial liabilities = ${n0(eq)} + ${n0(ncfl)} = ${n0(eq + ncfl)}.`, `ROCE = ${n0(ebit)} ÷ ${n0(eq + ncfl)} = ${p2(ebit / (eq + ncfl))}. (ROI = ${p2(ebit / (eq + ncfl + cfl))}, ROA = ${p2(ebit / ta)}.)`]
    });
  }
  function sgrExam(r) {
    for (let t = 0; t < 60; t++) {
      const np = step(r, 20, 120, 1), prev = step(r, 20, 120, 1), eq = step(r, np * 5, np * 20, 5), div = step(r, 5, Math.round(prev * 0.9), 1);
      const roe = np / eq, sgr = roe * (1 - div / prev);
      if (Math.abs(div / prev - div / np) < 0.05 || sgr <= 0.002) continue;
      const v = x => `SGR ≈ ${p2(x)}`;
      return X.exam(r, {
        pattern: "Sustainable growth rate",
        doc: table(`Company Zeta (mln €)`, "SGR = ROE × (1 − payout)", [[`Net profit ${Y - 1}`, prev], [`Net profit ${Y}`, np], [`Equity at 31 December ${Y}`, eq], [`Dividends paid in ${Y}`, div]]),
        question: `What is Zeta's sustainable growth rate for ${Y}?`, right: v(sgr),
        mistakes: [
          { text: v(roe * (1 - div / np)), why: `the payout ratio divides the dividends paid in ${Y} by the profit of ${Y - 1}, the one they distribute.` },
          { text: v(roe * div / prev), why: "ROE × payout is the part paid out; growth comes from the part kept, ROE × (1 − payout)." },
          { text: v(1 - div / prev), why: "that's the retention ratio alone: multiply it by ROE." }],
        solution: [`ROE = ${n0(np)} ÷ ${n0(eq)} = ${p2(roe)}; payout = ${n0(div)} ÷ ${n0(prev)} = ${p2(div / prev)}.`, `SGR = ${p2(roe)} × (1 − ${p2(div / prev)}) = ${p2(sgr)}.`]
      });
    }
    throw new Error("sgrExam");
  }

  // ---------- Theory (past-exam style) ----------
  const T = (level, q, right, wrongs, why) => ["fa", level, q, [[right, true, why]].concat(wrongs.map(([w, y]) => [w, false, y]))];
  ST.MCQ.push(
    T(1, "ROE, EPS, payout ratio, sustainable growth rate and net profit margin are read mainly by…", "The shareholders", [["The banks", "Banks look at debt, interest coverage and liquidity."], ["The State", "The State looks at the tax rate."], ["Suppliers only", "Liquidity concerns all actors; these are the owners' ratios."]], "The shareholders' line: what do the owners earn, and keep?"),
    T(1, "The main risk in using indicators is…", "Abundance: a good analyst selects the right ones and gives a narrative", [["That they are never audited", "Accounting-based indicators come from audited statements."], ["That they only use cash", "They use both accrual and cash data."], ["That there are too few of them", "The opposite: there are too many."]], "Select the right indicators, then tell the story behind them."),
    T(1, "EPS divides net profit by…", "The weighted average number of shares in the year", [["The shares at year end", "The course (and IAS 33) uses the weighted average: Eni's note 34."], ["Equity", "That's ROE."], ["The dividends paid", "No."]], "Eni 2025: €2,758m ÷ 3,024,753,353 shares = €0.91."),
    T(1, "The payout ratio divides the dividends paid in a year by…", "The previous year's net profit", [["The same year's net profit", "Dividends paid this year distribute last year's profit."], ["Equity", "No."], ["Revenues", "No."]], "Eni 2025: 3,357 ÷ 2,764 = 121%."),
    T(1, "The quick ratio differs from the current ratio because it…", "Leaves inventory out", [["Adds long-term assets", "Only current, liquid items."], ["Uses cash flows", "Both are accrual-based."], ["Leaves receivables out", "Receivables stay in: cash + short-term investments + receivables."]], "Quick = (cash + short-term investments + receivables) ÷ current liabilities."),
    T(1, "CAPEX, compared with OPEX, …", "Goes to the balance sheet and reaches the income statement over time, through D&A", [["Reduces this year's profit in full", "That's OPEX."], ["Never leaves the cash", "It leaves the cash today, in the investing cash flow."], ["Is always financed with debt", "Not necessarily."]], "Eni 2025: capex €9.2 bn, D&A €7.3 bn."),
    T(1, "Benchmarking is…", "Comparing with other companies, e.g. in the same industry (sector benchmarking)", [["Reclassifying the balance sheet", "That's step 2."], ["Comparing a company with its own past years", "That's the horizontal analysis."], ["Choosing the dividend", "No."]], "Step 5 of the financial analysis."),
    T(2, "ROI's denominator, the net invested capital, is…", "Total assets − liabilities without an explicit interest rate (= equity + financial liabilities)", [["Total assets", "That's ROA."], ["Equity + non-current financial liabilities", "That's ROCE."], ["Equity only", "That's ROE's denominator."]], "Eni 2025: 137,069 − 50,080 = 86,989; ROI = 5,010 ÷ 86,989 = 5.76%."),
    T(2, "ROA = EBIT margin × …", "Asset turnover", [["Interest coverage", "No: that's in the leverage formula."], ["Payout", "No."], ["Debt to equity", "D/E links ROA to ROE, not EBIT margin to ROA."]], "EBIT/assets = EBIT/sales × sales/assets."),
    T(2, "The cost of debt (r) is…", "Interest expenses ÷ debts with an explicit interest rate", [["Interest expenses ÷ total liabilities", "Trade payables carry no explicit interest."], ["EBIT ÷ interest expenses", "That's the interest coverage ratio."], ["Interest ÷ equity", "No."]], "Eni 2025: 1,374 ÷ 34,202 = 4.02% (loans, bonds and leases)."),
    T(2, "Debt to equity: which “debt”?", "It depends: financial liabilities, total liabilities or the NFP. Say which one you use", [["Always total liabilities", "The slides use it for Eni, but companies compute it differently."], ["Always trade payables", "No."], ["Always the NFP", "One of three options."]], "Same company, different D/E: important when you interpret it."),
    T(2, "A higher DPO is…", "Generally positive (cash stays longer), but it may signal difficulty in paying", [["Always negative", "Not always."], ["Always positive", "It may signal trouble."], ["Irrelevant for liquidity", "It's part of the operating cycle."]], "DPO = trade payables ÷ purchases × 365."),
    T(2, "Why was Zegna rejected as Brunello Cucinelli's benchmark?", "Right competitor, but not listed: no annual report", [["Different accounting period", "That was Burberry (year starting 1 April)."], ["Different governance", "That was Loro Piana."], ["Much bigger", "That was Ferragamo (about 4× the revenues)."]], "The benchmark must have available and comparable data. Tod's was chosen."),
    T(2, "A perfect benchmark…", "Rarely exists: choose the most similar one and accept some differences", [["Always exists in the same industry", "Two specular companies are rare."], ["Must have the same size", "Size is one factor among scale, strategy, product and market."], ["Must use US GAAP", "Ideally the same standards as the firm analysed (IFRS)."]], "Benchmarking is a matter of trade-off."),
    T(2, "To compare Eni's and TotalEnergies' segments you should…", "Pick one comparable metric (sales), regroup the segments into common meta-categories, and use % shares", [["Compare each segment's EBIT in €", "Their segment profit measures differ, and the currencies too."], ["Convert dollars into euro only", "Size would still differ: use shares."], ["Skip segments that don't match", "Reconcile them into meta-categories instead."]], "Consistent metric, reconciled segments, normalised figures."),
    T(3, "Eni 2025: profit flat, yet most indicators improved. Why?", "Many denominators (equity, assets, sales) fell; profit didn't grow", [["Profit grew a lot", "€2,764m → €2,758m: flat."], ["The ratios are wrong", "They're right; read what moved."], ["The tax rate doubled", "It fell."]], "Same company, four readers, different verdicts. Is Eni creating value? That's the check-up."),
    T(3, "Against the six requirements, traditional accounting ratios are weak on…", "Long-term orientation and timeliness", [["Measurability and completeness", "Those are good."], ["Precision only", "Precision is average."], ["Nothing: they're perfect", "They're backward-looking."]], "Good: completeness, measurability. Average: precision. Low: long-term orientation, timeliness. Specific responsibility: depends."),
    T(3, "“Precision”, among the six requirements, means…", "The correlation between the indicators and present value", [["Measuring clearly and univocally", "That's measurability."], ["Allowing timely action", "That's timeliness."], ["Tracing results to managers", "That's specific responsibility."]], "Present value is the ultimate reference goal."),
    T(3, "The three misalignments of ratios like ROA with present value are…", "Ratio vs absolute value, no cost of capital, accrual vs cash flows", [["Too many decimals, rounding, currency", "No."], ["Taxes, inflation, dividends", "No."], ["Size, sector, country", "Those matter for benchmarking."]], "Residual income tries to solve them."),
    T(3, "Residual income (EBIT − k × invested capital) addresses…", "The ratio effect and the missing cost of capital (it's still accrual-based)", [["All accounting problems", "It still uses accrual EBIT."], ["Only the accrual vs cash problem", "It doesn't use cash flows."], ["None: it's a ratio", "It's an absolute value in €."]], "An absolute value with the cost of capital inside."),
    T(3, "A manager judged on ROA (24% today) is offered an investment earning 17.5%, with k = 12%. The manager…", "Rejects it, though it creates value; judged on RI, would accept it", [["Accepts it: ROA goes up", "ROA falls: 17.5% is below 24%."], ["Rejects it: it destroys value", "17.5% > 12%: it creates value."], ["Is indifferent", "ROA falls, RI rises."]], "Denominator management: RI fixes it."),
    T(3, "ROE = ROA × (1 − 1/ICR) × (1 + D/E) reproduces ROE exactly…", "Only with no taxes and no other financial items: it's a reading key", [["Always", "Real companies pay taxes and have other financial items."], ["Only for banks", "No."], ["Only if D/E < 1", "No."]], "D = total liabilities in the proof."),
    T(3, "In the risk / efficiency matrix, high ROA with high D/E is…", "Amplified, risky", [["Sound", "Sound is good ROA with light debt."], ["Weak and indebted", "That's low ROA and high debt."], ["Prudent but weak", "That's low ROA and light debt."]], "Debt multiplies a good return, and a fall in ROA too. The lines are sector averages."),
    T(3, "In 2022 TotalEnergies kept 19.4% of Novatek but withdrew from its board. In its accounts the stake…", "Left the equity method: no significant influence, an other investment (IAS 28)", [["Stayed under the equity method: 19.4% is close to 20%", "Influence is about facts, not only the percentage."], ["Was fully consolidated", "There was never control."], ["Was written off with no reclassification", "It was reclassified."]], "Geopolitics can change the accounting of an investment."),
    T(3, "TotalEnergies has a higher share of current liabilities than Eni. So it's riskier in the short term?", "Not necessarily: they're mainly operating liabilities; short-term borrowings are about 14% of current liabilities at both", [["Yes, always", "Look at the composition first."], ["No: current liabilities never matter", "They matter; their nature matters more."], ["Yes, because it's bigger", "Size isn't the point."]], "85.7% of Total's current liabilities are non-financial."),
    T(3, "Eni 2025: revenues −8%, EBIT only −4%. The safest first reading is…", "Test it: lower impairments and write-offs explain most of it, not better cost control", [["Eni cut costs better than its revenues fell", "Purchases fell only 6%, and their weight on revenues rose (78% → 80.2%)."], ["EBIT is wrong", "No."], ["Revenues don't matter for EBIT", "They do."]], "Non-recurring items may not persist next year.")
  );

  // ---------- The phone ----------
  const L3 = (q, a, w, why) => [3, "lario", q, a, w, why];
  D.CALLS.push(
    L3("Quick: what's ROCE?", "EBIT ÷ (equity + non-current financial liabilities)", ["EBIT ÷ total assets", "Net profit ÷ equity", "EBIT ÷ (equity + all financial liabilities)"], "The long-term capital. ROA uses total assets, ROI equity + all financial liabilities."),
    L3("Our quality of operating earnings is 266%. Good?", "Operations brought in €2.66 of cash per € of EBIT", ["We're losing cash", "EBIT is 2.66 times revenues", "We paid 266% in dividends"], "CFFO ÷ EBIT: non-cash costs are added back, working capital may release cash."),
    L3("Our SGR went from +1.8% to −1.1%. Is it down 163%?", "No: read it in points, −2.9 pp", ["Yes, exactly", "It's up 163%", "It didn't change"], "A % change across zero has no meaning."),
    L3("What's in the quick ratio?", "Cash + short-term investments + receivables, over current liabilities", ["All current assets over current liabilities", "Inventory over current liabilities", "CFFO over debt"], "The acid test leaves inventory out."),
    L3("Our capex coverage is 144%. Meaning?", "Operations paid for the investments 1.44 times", ["We invested 144% of our profit", "Debt is 1.44 times equity", "Capex rose 44%"], "CFFO ÷ CAPEX: what's left is close to the free cash flow."),
    L3("Residual income is negative, but we made a profit. How?", "EBIT doesn't cover the cost of the capital invested", ["It's an error", "Taxes were too high", "Dividends were too high"], "RI = EBIT − k × invested capital: a profit isn't enough to create value."),
    L3("Is TotalEnergies a good benchmark for Eni?", "Yes, with care: same markets and value chain, similar mission, but much bigger", ["No: different country", "Yes: identical in every way", "No: it's not listed"], "Benchmarking is a trade-off; the bigger peer can reveal best practices.")
  );

  // ---------- Where they go ----------
  const NEW = {
    1: [fourReaders, opexCapex, shareholdersLine, liquidity, cashCoverage],
    2: [shareholdersLine, overallCompany, margins, otherStakeholders, liquidity, cashCoverage, residualIncome, segmentMix, equityInvestments, fourReaders],
    3: [overallCompany, otherStakeholders, leverageFormula, residualIncome, hotelCase, segmentMix, margins]
  };
  [1, 2, 3].forEach(l => { ST.PLAN.fa[l] = ST.PLAN.fa[l].concat(NEW[l]); });
  const EXAM = [riExam, roceExam, sgrExam];
  X.FA3.push(...EXAM);
  ST.PLAN.fa[3] = ST.PLAN.fa[3].concat(EXAM, EXAM);
  const wrap = f => (tier, clients, r) => Object.assign(f(r), { client: "lario", pickup: "inbox", work: "desk" });
  Object.assign(O.MAKERS, { fourReaders: wrap(fourReaders), indicatorsLiquidity: wrap(liquidity), residualIncome: wrap(residualIncome), hotelCase: wrap(hotelCase), shareholdersLine: wrap(shareholdersLine), overallCompany: wrap(overallCompany) });
  O.MIX[3].push("fourReaders", "indicatorsLiquidity", "residualIncome", "hotelCase", "shareholdersLine", "overallCompany");

  const api = { ENI, SEGMENTS, READERS, INDICATORS, SPEND, QUADRANTS, shareholdersLine, eniShareholders, overallCompany, margins, otherStakeholders, leverageFormula, liquidity, cashCoverage, opexCapex, fourReaders, residualIncome, hotelCase, segmentMix, equityInvestments, riExam, roceExam, sgrExam };
  root.OfficeIndicators = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
