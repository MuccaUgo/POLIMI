/* PolimiAFC — more kinds of work, all on the course's own material:
   - TRUE OR FALSE in a hurry (five statements, one slip allowed);
   - MATCH THE TERMS (four codex terms and their definitions);
   - PUT IN ORDER (the reclassified income statement, the six steps, the consolidation steps, the indirect method,
     choosing a benchmark);
   - EXPLAIN TO THE CLIENT (step 6, interpretation: which explanation of the numbers holds);
   - office SURPRISES (a call with a bonus, some mornings);
   - the LARIO CASE FILE: one company in five episodes on the financial analysis desk, the same numbers each day.
   Loaded after office-codex.js and office-consolidation.js. */
(function (root) {
  "use strict";
  const D = root.OfficeData, O = root.OfficeLogic, ST = root.OfficeStudy, CX = root.OfficeCodex, I = root.OfficeIndicators, QL = root.QuestLogic;
  const Y = D.Y;
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-US");
  const r2 = x => Math.round(x * 100) / 100;
  const pct2 = x => Math.round(x * 10000) / 100;
  const p2 = x => `${pct2(x).toFixed(2)}%`;
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));
  const round = (x, s) => Math.round(x / s) * s;
  const eur = x => (x < 0 ? "−€" : "€") + fmt(Math.abs(x));

  // ---------- TRUE OR FALSE ----------
  // [statement, true?, why]
  const TF = {
    basics: [
      ["Assets = liabilities + equity holds after every transaction.", true, "Every transaction changes at least two items and keeps the equation balanced."],
      ["A bank loan received is revenue.", false, "A loan must be repaid: cash up and a liability up. Never revenue."],
      ["Rent paid in December for January is an asset (prepaid) at 31 December.", true, "It covers next year: a prepaid expense, an asset, until January."],
      ["Dividends paid to shareholders are an expense.", false, "A distribution of profit: equity goes down, the income statement doesn't move."],
      ["Depreciation is an expense that moves no cash.", true, "The cash left when the asset was bought; depreciation spreads its cost over the years."],
      ["All the raw materials bought in the year are an expense of the year.", false, "Only what is used is a cost; what is left is inventory, an asset."],
      ["A customer's deposit for a cake delivered next month is a liability today.", true, "A contract liability until the cake is delivered; then revenue."],
      ["Revenue is recognised when the customer pays.", false, "Accrual: when the good or service is delivered, paid or not."],
      ["December's electricity, billed in January, is an expense of December.", true, "Used in December: an accrued expense of this year."],
      ["Repaying the principal of a loan is an expense.", false, "Less cash and less debt: only the interest is an expense."],
      ["The balance sheet shows a position at one date; the income statement shows the flows of a period.", true, "A photo and a film."],
      ["Equity is the cash the company has in the bank.", false, "Equity is assets − liabilities: the owners' claim, not a pile of cash."],
      ["Cost of goods sold = opening inventory + purchases − closing inventory.", true, "What was available minus what is left."],
      ["An impairment loss increases an asset's carrying amount.", false, "It writes the asset down to its recoverable amount: an expense."],
      ["A provision is a liability of uncertain timing or amount.", true, "IAS 37: a present obligation, a probable outflow, a reliable estimate."],
      ["The legal reserve takes 20% of the profit every year.", false, "5% of each year's profit until the reserve reaches 20% of share capital (art. 2430 c.c.)."],
      ["Share premium is what shareholders paid above the nominal value of the shares.", true, "Nominal value goes to share capital, the excess to the share premium reserve."],
      ["EPS divides the profit by the number of shares at year end.", false, "By the weighted average number of shares in the year."],
      ["In the indirect method, depreciation is added back to profit.", true, "A non-cash cost: added back to get to cash from operations."],
      ["In the course, interest paid goes in the investing section of the cash flow statement.", false, "The course puts interest paid in the operating section."],
      ["Buying a machine with cash is an investing outflow, not an expense of the year.", true, "An asset: investing cash flow now, depreciation over its life."],
      ["A sale on credit isn't revenue until the invoice is paid.", false, "Revenue when the goods are delivered; until payment, a receivable."],
      ["The statement of changes in equity shows share issues, dividends and the profit of the year.", true, "The movements in equity, from opening to closing."],
      ["Wages earned in December but unpaid at year end are an asset.", false, "They're owed: a liability (wages payable), and an expense of December."],
      ["Prepaid rent becomes an expense as the months it covers go by.", true, "Each month used moves from the asset to rent expense."],
      ["Under the IAS 16 revaluation model, an increase in the value of PPE is revenue of the year.", false, "It goes to equity, as a revaluation surplus, not to revenue."]
    ],
    analysis: [
      ["Reclassifying the statements is not compulsory under IFRS.", true, "Analysts do it to read, highlight and compare."],
      ["Cash is part of the net operating working capital.", false, "NOWC = receivables + inventories − payables; cash is subtracted in the NFP."],
      ["Invested capital (fixed assets + NOWC) equals equity + NFP + provisions.", true, "The two sides of the reclassified balance sheet."],
      ["In a vertical analysis of the income statement, each item is a % of total assets.", false, "Of revenues; total assets is the base for the balance sheet."],
      ["A ratio going from 4.97% to 5.22% rose by 0.25 percentage points and by about 5% in relative terms.", true, "Points and relative change are different things: say which one."],
      ["In the course, ROA uses net profit at the numerator.", false, "EBIT: ROA = EBIT ÷ total assets."],
      ["With the same EBIT, ROCE's denominator is the smallest of ROCE, ROI and ROA.", true, "Equity + non-current financial liabilities < equity + all financial liabilities < total assets."],
      ["The payout ratio divides the dividends by the same year's profit.", false, "By the previous year's profit: the one they distribute."],
      ["With a payout above 100%, the sustainable growth rate is negative.", true, "SGR = ROE × (1 − payout)."],
      ["A quality of operating earnings above 100% means operating cash was below EBIT.", false, "Above 100%: more cash than operating profit."],
      ["The quick ratio leaves inventory out.", true, "(Cash + short-term investments + receivables) ÷ current liabilities."],
      ["A higher DSO is better for liquidity.", false, "It means customers take longer to pay: the lower the better."],
      ["Cost of debt = interest expenses ÷ debts with an explicit interest rate.", true, "Trade payables carry no explicit interest."],
      ["Trade payables are part of the net financial position.", false, "They're operating: inside the NOWC."],
      ["Under IFRS 16, EBITDA goes up and net debt goes up.", true, "The rent leaves operating costs; the lease liability is debt."],
      ["Factoring without recourse leaves the receivable on the balance sheet.", false, "Without recourse it's a true sale: the receivable leaves."],
      ["Because interest is deductible, the after-tax cost of debt is r × (1 − tax rate).", true, "The tax shield."],
      ["A committed credit line can be withdrawn by the bank at any time.", false, "That's the uncommitted line; the committed one has a fee on the unused part."],
      ["Residual income = EBIT − k × invested capital.", true, "An absolute value with the cost of capital inside."],
      ["A positive net profit always means a positive residual income.", false, "EBIT may not cover k × invested capital."],
      ["When an indicator changes sign, a % change has no meaning.", true, "Read the change in points or in euro."],
      ["Capex coverage = CAPEX ÷ CFFO.", false, "CFFO ÷ CAPEX: can operations pay for the investments?"],
      ["Traditional accounting ratios score low on timeliness and long-term orientation.", true, "Good on completeness and measurability, average on precision."],
      ["A perfect benchmark is usually easy to find in the same industry.", false, "Rarely: benchmarking is a trade-off."],
      ["D/E above 1 means equity is the dominant source of financing.", false, "Above 1, debt dominates."],
      ["The effective tax rate is income taxes ÷ pre-tax profit.", true, "Eni 2025: 52.3%."]
    ],
    consolidation: [
      ["Control (IFRS 10) needs power, exposure to variable returns and the ability to use the power to affect them.", true, "The three elements of control."],
      ["Holding 20% of the votes always means control.", false, "20% or more usually means significant influence: an associate."],
      ["An associate is accounted for with the equity method (IAS 28).", true, "Significant influence → equity method."],
      ["Under the equity method, dividends received increase the investment.", false, "They decrease it: book value + share of profit − dividends."],
      ["Under the equity method, the share of the investee's profit goes to the investor's income statement.", true, "And the dividends to the cash flow statement."],
      ["In full consolidation of an 80% subsidiary, only 80% of its assets are combined.", false, "100% is combined; the other 20% shows as non-controlling interests."],
      ["Non-controlling interests are presented within equity.", true, "Never as a liability."],
      ["Intra-group revenues are eliminated only if the parent is the seller.", false, "In full, whoever sells."],
      ["Intra-group receivables and payables are eliminated in full.", true, "The group can't owe money to itself."],
      ["Under IFRS, goodwill is amortised over five years.", false, "Not amortised: tested for impairment every year."],
      ["Negative goodwill: first review the fair values, then book any remainder as a gain.", true, "In the income statement."],
      ["Fair value uplifts on the subsidiary's assets have no tax effect in consolidation.", false, "They give deferred tax liabilities (assets for higher liabilities)."],
      ["A higher fair value of a liability gives a deferred tax asset.", true, "Less tax in the future."],
      ["A subsidiary with a different year end can never be consolidated.", false, "Interim statements, or a gap of up to three months."],
      ["A foreign subsidiary's balance sheet items are translated at the closing rate.", true, "The income statement at the average rate."],
      ["Translation differences go to the income statement.", false, "To a translation reserve in equity."],
      ["Full goodwill includes the non-controlling interests' part of goodwill.", true, "NCI at fair value."],
      ["A joint venture is accounted for with the equity method.", true, "IFRS 11, joint control of a separate entity."],
      ["Loans from the parent to a subsidiary stay in the consolidated balance sheet.", false, "Eliminated: like a cash transfer between divisions."],
      ["The offset step removes the parent's investment against its share of the subsidiary's equity.", true, "And recognises NCI and goodwill."],
      ["The consolidated statements replace the group companies' own statements.", false, "Each company keeps its own; the group adds the consolidated ones."],
      ["An investment in an associate is first recognised at cost.", true, "Then adjusted every year."]
    ]
  };
  const tfKey = s => "tf:" + s[0].slice(0, 48);
  function trueFalse(topic, r) {
    const pool = TF[topic];
    for (let t = 0; t < 20; t++) {
      const picked = O.freshOrder(r, pool, tfKey).slice(0, 8);
      const five = r.shuffle(picked).slice(0, 5);
      if (five.every(s => s[1]) || five.every(s => !s[1])) continue;
      five.forEach(s => O.remember(tfKey(s)));
      return { type: "truefalse", pattern: `true or false · ${topic}`, topic, seconds: 50,
        statements: five.map(([text, truth, why]) => ({ text, truth, why })),
        brief: "True or false? Five statements, one slip allowed. Quick: the clock is running." };
    }
    throw new Error("trueFalse");
  }

  // ---------- MATCH THE TERMS ----------
  const GROUPS = { basics: ["Basics", "Accrual accounting", "The statements", "Equity"], analysis: ["Financial analysis", "Financial planning", "Indicators", "Benchmarking"], consolidation: ["Consolidation"] };
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // The definition, short, with the term itself hidden.
  function clue(term, def) {
    const base = term.replace(/\s*\(.*?\)\s*/g, " ").trim();
    const words = [term, base].concat(base.split(/,|\s+and\s+|\s*\/\s*/).map(w => w.trim()).filter(w => w.length > 2));
    let text = def;
    for (const w of words.sort((a, b) => b.length - a.length)) {
      const stem = w.replace(/s$/i, "");
      text = text.replace(new RegExp(`\\b${escRe(stem)}(s|es)?\\b`, "gi"), "…");
    }
    const sentences = splitSentences(text);
    let out = sentences[0];
    for (let i = 1; i < sentences.length && out.length < 60; i++) out += " " + sentences[i];
    if (out.length > 170) out = out.slice(0, out.lastIndexOf(" ", 165)) + "…";
    return out;
  }
  // Sentences, without regex lookbehind (older iPhones don't parse it): "4.97%" and "e.g." don't end one.
  function splitSentences(text) {
    const out = [];
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      if (".!?".includes(text[i]) && text[i + 1] === " " && /[A-Z0-9“]/.test(text[i + 2] || "") && !/\b(e\.g|i\.e|c\.c)$/i.test(text.slice(start, i))) { out.push(text.slice(start, i + 1)); start = i + 2; }
    }
    if (start < text.length) out.push(text.slice(start));
    return out;
  }
  function matchJob(topic, r) {
    const pool = CX.CODEX.filter(e => GROUPS[topic].includes(e[0])).map(([, term, def]) => ({ term, def: clue(term, def) })).filter(e => e.def.replace(/…/g, "").trim().length > 25);
    const four = O.freshOrder(r, pool, e => "match:" + e.term).slice(0, 4);
    four.forEach(e => O.remember("match:" + e.term));
    return { type: "match", pattern: `match the terms · ${topic}`, topic, docKind: "Codex flashcards", pairs: r.shuffle(four), defs: r.shuffle(four.map(e => e.def)),
      brief: "Match each term with its definition. The term itself is hidden (…) in the definitions." };
  }

  // ---------- PUT IN ORDER ----------
  const SEQ = {
    is: { title: "The reclassified income statement, from the top", pick: 5, steps: ["Total revenues", "Value added", "EBITDA", "EBIT", "Earnings before tax and extraordinary items", "Pretax income", "Net income"],
      why: "Revenues − raw materials − G&A = value added; − personnel = EBITDA; − D&A = EBIT; − net financial expenses = earnings before tax and extraordinary items; ± extraordinary items = pretax income; − tax = net income." },
    steps: { title: "The six steps of the financial analysis", pick: 6, steps: ["Context", "Reclassification", "Common size", "Indicators", "Benchmarking", "Interpretation"],
      why: "1 Context · 2 Reclassification (and financial planning) · 3 Common size · 4 Indicators · 5 Benchmarking · 6 Interpretation." },
    cons: { title: "Preparing the consolidated statements", pick: 5, steps: ["Align the closing periods", "Align the accounting policies", "Translate into the group's currency", "Combine like items", "Offset the investment against the subsidiary's equity (NCI, goodwill)", "Eliminate the intra-group transactions"],
      why: "First the pre-consolidation adjustments (1.1 closing period, 1.2 accounting policies, 1.3 reporting currency), then the process: 2.1 combine, 2.2 offset, 2.3 eliminate." },
    cfs: { title: "The cash flow statement, indirect method", pick: 5, steps: ["EBIT", "+ Depreciation and amortisation", "± Changes in receivables, inventories and payables", "− Interest and income taxes paid", "= Net cash from operating activities", "− Net cash used in investing activities", "± Net cash from financing activities", "= Net increase (decrease) in cash"],
      why: "From EBIT, add back the non-cash costs, adjust for working capital, take away interest and taxes paid: operating cash; then investing and financing give the change in cash." },
    benchmark: { title: "Choosing a benchmark", pick: 4, steps: ["Understand the context and the company's strategy", "Search competitors by market positioning, in reliable sources", "Check they are a right benchmark: listed, governance, accounting period, size", "Accept the trade-off and choose the most similar"],
      why: "The Brunello Cucinelli project: context, competitors, checks (Zegna not listed, Loro Piana other governance, Burberry other year end, Ferragamo too big), then Tod's." }
  };
  function sequenceJob(key, r) {
    const S = SEQ[key];
    let steps = S.steps;
    if (S.pick < steps.length) {
      const keep = new Set(r.shuffle(steps.map((_, i) => i)).slice(0, S.pick));
      steps = steps.filter((_, i) => keep.has(i));
    }
    let shown;
    do { shown = r.shuffle(steps); } while (shown.every((s, i) => s === steps[i]));
    return { type: "sequence", pattern: `put in order · ${key}`, docKind: S.title, steps, shown, why: S.why,
      brief: `${S.title}: tap the steps in the right order.` };
  }

  // ---------- EXPLAIN TO THE CLIENT (step 6, interpretation) ----------
  const opt = (label, correct, why) => ({ label, correct, why });
  const EXPLAIN = {
    roeUp(r) {
      for (;;) {
        const np0 = step(r, 800, 3000, 10), np1 = round(np0 * (1 - r.int(1, 6) / 100), 10), e0 = step(r, np0 * 12, np0 * 25, 50), e1 = round(e0 * (1 - r.int(8, 20) / 100), 50);
        const a = np0 / e0, b = np1 / e1;
        if (b <= a) continue;
        return { pattern: "ROE and its denominator", q: "Our net profit went down, yet ROE went up. How can that be?",
          doc: [[`Net profit ${Y - 1} · ${Y}`, `${fmt(np0)} · ${fmt(np1)}`], [`Equity ${Y - 1} · ${Y}`, `${fmt(e0)} · ${fmt(e1)}`], [`Dividends and buybacks paid in ${Y}`, fmt(e0 + np1 - e1)]],
          opts: [opt("Equity fell more than profit: dividends and buybacks shrank the denominator", true, `Profit ${p2(np1 / np0 - 1)}, equity ${p2(e1 / e0 - 1)}: the ratio rose because its denominator fell.`),
            opt("The business became more profitable", false, "Profit fell: the business didn't earn more."),
            opt("ROE can't rise when profit falls: there must be an error", false, "It can, whenever equity falls faster than profit (Eni 2025: profit flat, ROE up).")],
          solution: [`ROE ${Y - 1} = ${fmt(np0)} ÷ ${fmt(e0)} = ${p2(a)}; ROE ${Y} = ${fmt(np1)} ÷ ${fmt(e1)} = ${p2(b)}.`, "Many ratios improve because the denominators decrease, not because profit grows: read what moved."] };
      }
    },
    leverage(r) {
      for (;;) {
        const a = step(r, 5000, 20000, 100), ebit = round(a * r.int(7, 14) / 100, 10), rate = r.int(3, 5) / 100;
        const d0 = round(a * r.int(25, 40) / 100, 50), d1 = round(a * r.int(55, 70) / 100, 50);
        const yr = d => { const i = Math.round(d * rate), e = a - d; return { roa: ebit / a, icr: ebit / i, de: d / e, roe: (ebit - i) / e }; };
        const x = yr(d0), z = yr(d1);
        if (z.roe <= x.roe + 0.01) continue;
        return { pattern: "ROE and leverage", q: "Our ROE jumped this year, but our operations are the same. What happened?",
          doc: [["", `${Y - 1}`, `${Y}`], ["ROA", p2(x.roa), p2(z.roa)], ["Interest coverage (ICR)", r2(x.icr).toFixed(2), r2(z.icr).toFixed(2)], ["D/E (total liabilities ÷ equity)", r2(x.de).toFixed(2), r2(z.de).toFixed(2)], ["ROE (no taxes)", p2(x.roe), p2(z.roe)]],
          opts: [opt("More debt: leverage multiplies the same ROA", true, `ROE = ROA × (1 − 1/ICR) × (1 + D/E): ROA is unchanged, D/E went from ${r2(x.de)} to ${r2(z.de)}. Riskier, too: a fall in ROA would be amplified.`),
            opt("Operations became more efficient", false, "ROA didn't move: operations earn the same."),
            opt("Lower taxes", false, "This view has no taxes: the change is in D/E.")],
          solution: [`${Y - 1}: ${p2(x.roa)} × (1 − 1/${r2(x.icr)}) × (1 + ${r2(x.de)}) = ${p2(x.roe)}.`, `${Y}: ${p2(z.roa)} × (1 − 1/${r2(z.icr)}) × (1 + ${r2(z.de)}) = ${p2(z.roe)}.`, "Debt raises ROE while ROA is above the cost of debt."] };
      }
    },
    sgr(r) {
      const prev = step(r, 500, 3000, 10), np = round(prev * (1 + r.int(-10, 10) / 100), 10), eq = step(r, np * 8, np * 20, 50), div = round(prev * r.int(105, 140) / 100, 10);
      const roe = np / eq, po = div / prev;
      return { pattern: "sustainable growth rate", q: "Our profit is positive. Why does the analyst say our sustainable growth rate is negative?",
        doc: [[`Net profit ${Y - 1}`, fmt(prev)], [`Net profit ${Y}`, fmt(np)], [`Equity at 31 December ${Y}`, fmt(eq)], [`Dividends paid in ${Y}`, fmt(div)]],
        opts: [opt("We paid out more than last year's profit: nothing is kept to grow on", true, `Payout ${p2(po)}: SGR = ${p2(roe)} × (1 − ${p2(po)}) = ${p2(roe * (1 - po))}.`),
          opt("We made a loss", false, `Net profit is positive: ROE is ${p2(roe)}.`),
          opt("Our revenues fell", false, "SGR doesn't use revenues: only ROE and the payout.")],
        solution: [`ROE = ${fmt(np)} ÷ ${fmt(eq)} = ${p2(roe)}; payout = ${fmt(div)} ÷ ${fmt(prev)} = ${p2(po)}.`, `SGR = ROE × (1 − payout) = ${p2(roe * (1 - po))}. Eni 2025: payout 121%, SGR −1.12%.`] };
    },
    qoe(r) {
      const ebit = step(r, 2000, 9000, 10), da = round(ebit * r.int(40, 120) / 100, 10), imp = step(r, 0, Math.round(ebit * 0.4), 10), wc = step(r, 100, Math.round(ebit * 0.3), 10), tax = round(ebit * r.int(20, 35) / 100, 10), int = round(ebit * r.int(5, 15) / 100, 10);
      const cffo = ebit + da + imp + wc - tax - int;
      return { pattern: "quality of operating earnings", q: "Our cash from operations is far above our operating profit. Is something wrong?",
        doc: [["EBIT", fmt(ebit)], ["+ Depreciation and amortisation", fmt(da)], ["+ Impairments", fmt(imp)], ["+ Working capital released", fmt(wc)], ["− Income taxes paid", fmt(tax)], ["− Interest paid", fmt(int)], ["= Cash flow from operating activities", fmt(cffo)]],
        opts: [opt("No: EBIT is net of non-cash costs that cash flow adds back, and working capital released cash", true, `Quality of operating earnings = ${fmt(cffo)} ÷ ${fmt(ebit)} = ${p2(cffo / ebit)}. Taxes and interest paid pull the other way.`),
          opt("We borrowed more, and that cash shows up in operations", false, "Borrowing is a financing cash flow, never in CFFO."),
          opt("We sold a plant", false, "A disposal is an investing cash flow.")],
        solution: [`CFFO ÷ EBIT = ${p2(cffo / ebit)}: each euro of operating profit brought in ${fmt(cffo / ebit)} euro of cash.`, "Eni 2025: 266%, with €9.0 bn of D&A and impairments added back."] };
    },
    factoring(r) {
      const rev = step(r, 20000, 60000, 100), rev1 = round(rev * (1 + r.int(-2, 2) / 100), 100), rec0 = round(rev * 90 / 365, 10), f = round(rec0 * r.int(30, 60) / 100, 10), rec1 = round(rev1 * 90 / 365, 10) - f;
      const dso0 = rec0 / rev * 365, dso1 = rec1 / rev1 * 365;
      return { pattern: "DSO and factoring", q: `Our DSO fell from ${Math.round(dso0)} to ${Math.round(dso1)} days. Are customers paying faster?`,
        doc: [[`Revenues ${Y - 1} · ${Y}`, `${fmt(rev)} · ${fmt(rev1)}`], [`Trade receivables at 31 December ${Y - 1} · ${Y}`, `${fmt(rec0)} · ${fmt(rec1)}`], ["Payment terms", "90 days, unchanged"], [`On 28 December ${Y}`, `invoices of ${fmt(f)} sold to a factor without recourse`]],
        opts: [opt("No: we sold receivables without recourse, so they left the balance sheet", true, `Without recourse it's a true sale: receivables fall by ${fmt(f)} and DSO with them, though customers pay no sooner.`),
          opt("Yes: customers pay faster", false, "The payment terms didn't change: only the financing did."),
          opt("Revenues grew", false, "Revenues are flat.")],
        solution: [`DSO = receivables ÷ revenues × 365: ${Math.round(dso0)} → ${Math.round(dso1)} days.`, "Financing choices move the ratios even when the business doesn't: read the notes."] };
    },
    ifrs16(r) {
      const ebitda = step(r, 3000, 12000, 10), rent = round(ebitda * r.int(8, 20) / 100, 10), lease = rent * r.pick([5, 6, 8]), nd = step(r, 2000, 15000, 10);
      return { pattern: "IFRS 16 and EBITDA", q: "EBITDA rose and net debt rose, but our business didn't change. Why?",
        doc: [["", `${Y - 1}`, `${Y}`], ["Sales", "flat", "flat"], ["EBITDA", fmt(ebitda), fmt(ebitda + rent)], ["Net debt", fmt(nd), fmt(nd + lease)], ["Accounting for the office leases", "rent in operating costs", "IFRS 16"]],
        opts: [opt("IFRS 16: the lease rent left operating costs and the lease liability joined net debt", true, `EBITDA +${fmt(rent)} (the rent), net debt +${fmt(lease)} (the lease liability). The business is the same; the ratios change.`),
          opt("Sales grew", false, "Sales are flat."),
          opt("We took a bank loan to expand", false, "No new loan: the extra debt is the lease liability.")],
        solution: ["Under IFRS 16: a right-of-use asset and a lease liability; the rent becomes depreciation + interest.", "EBITDA goes up, net debt goes up, net debt ÷ EBITDA changes too."] };
    },
    riNegative(r) {
      for (;;) {
        const ic = step(r, 10000, 40000, 100), k = r.pick([7, 8, 9, 10]), ebit = round(ic * (k - r.int(1, 3)) / 100, 10), int = round(ebit * 0.2, 10), np = Math.round((ebit - int) * 0.72);
        if (np <= 0) continue;
        return { pattern: "residual income and profit", q: `We made a profit of ${fmt(np)}. Why does the residual income say we don't create value?`,
          doc: [["EBIT", fmt(ebit)], ["Net profit", fmt(np)], ["Invested capital (equity + financial liabilities)", fmt(ic)], ["Cost of capital k", `${k}%`]],
          opts: [opt("EBIT doesn't cover the cost of the capital invested", true, `RI = ${fmt(ebit)} − ${k}% × ${fmt(ic)} = ${fmt(ebit - k * ic / 100)}: the operations earn ${p2(ebit / ic)} on capital that costs ${k}%.`),
            opt("Residual income uses net profit, and ours is negative", false, "RI uses EBIT, and net profit is positive anyway."),
            opt("Residual income is negative whenever a firm has debt", false, "No: it compares EBIT with k × all the capital invested, debt and equity.")],
          solution: [`RI = EBIT − k × invested capital = ${fmt(ebit - k * ic / 100)}.`, "A profit isn't enough: value is created only above the cost of capital."] };
      }
    },
    revenueVsEbit(r) {
      for (;;) {
        const rev0 = step(r, 20000, 80000, 100), d = r.int(6, 12) / 100, rev1 = round(rev0 * (1 - d), 100);
        const pu0 = round(rev0 * 0.78, 10), pu1 = round(pu0 * (1 - d + r.int(2, 3) / 100), 10), other = round(rev0 * r.int(8, 11) / 100, 10);
        const im0 = round(rev0 * r.int(3, 5) / 100, 10), im1 = round(im0 * r.int(5, 30) / 100, 10);
        const e0 = rev0 - pu0 - other - im0, e1 = rev1 - pu1 - other - im1;
        if (e0 <= 0 || e1 <= 0 || e1 >= e0 || e1 / e0 - 1 <= rev1 / rev0 - 1) continue;
        return { pattern: "revenues, costs and EBIT", q: `Revenues fell by ${Math.abs(Math.round((rev1 / rev0 - 1) * 100))}%, EBIT only by ${Math.abs(Math.round((e1 / e0 - 1) * 100))}%. Did we control costs better?`,
          doc: [["", `${Y - 1}`, `${Y}`], ["Revenues", fmt(rev0), fmt(rev1)], ["Purchases, services and other", fmt(pu0), fmt(pu1)], ["Other operating costs", fmt(other), fmt(other)], ["Impairments and write-offs", fmt(im0), fmt(im1)], ["EBIT", fmt(e0), fmt(e1)]],
          opts: [opt("Not really: lower impairments and write-offs held EBIT up; purchases fell less than revenues", true, `Purchases weigh ${p2(pu1 / rev1)} of revenues against ${p2(pu0 / rev0)}; impairments fell from ${fmt(im0)} to ${fmt(im1)}: non-recurring, it may not happen again.`),
            opt("Yes: purchases fell more than revenues", false, `They fell less (${p2(pu1 / pu0 - 1)} against ${p2(rev1 / rev0 - 1)}): their weight on revenues rose.`),
            opt("Prices went up", false, "Revenues fell.")],
          solution: ["Horizontal and vertical analysis together: purchases' weight on revenues rose.", "Eni 2025: revenues −8%, EBIT −4%, thanks to lower impairments and write-offs."] };
      }
    },
    quickRatio(r) {
      for (;;) {
        const cl = step(r, 3000, 12000, 10), inv = round(cl * r.int(50, 90) / 100, 10), rec = round(cl * r.int(25, 50) / 100, 10), cash = round(cl * r.int(5, 20) / 100, 10);
        const cr = (inv + rec + cash) / cl, qr = (rec + cash) / cl;
        if (cr <= 1.05 || qr >= 0.95) continue;
        return { pattern: "current and quick ratio", q: "Our current ratio is above 1, but the bank worries about our quick ratio. Why the difference?",
          doc: [["Inventories", fmt(inv)], ["Trade receivables", fmt(rec)], ["Cash", fmt(cash)], ["Current liabilities", fmt(cl)], ["Current ratio", r2(cr).toFixed(2)], ["Quick ratio", r2(qr).toFixed(2)]],
          opts: [opt("Much of our current assets is inventory, which the quick ratio leaves out", true, `Inventories are ${p2(inv / (inv + rec + cash))} of current assets: without them, (${fmt(rec)} + ${fmt(cash)}) ÷ ${fmt(cl)} = ${r2(qr)}.`),
            opt("Our receivables are overdue", false, "Nothing here says so: the gap between the two ratios is the inventory."),
            opt("The bank counts long-term debt in current liabilities", false, "Both ratios use the same current liabilities.")],
          solution: [`Current ratio = ${fmt(inv + rec + cash)} ÷ ${fmt(cl)} = ${r2(cr)}; quick ratio = ${fmt(rec + cash)} ÷ ${fmt(cl)} = ${r2(qr)}.`] };
      }
    },
    equityInv(r) {
      for (;;) {
        const open = step(r, 2000, 10000, 50), inv = step(r, 100, 800, 10), share = step(r, 200, 1200, 10), div = share + step(r, 100, 800, 10), fx = -step(r, 0, 500, 10), close = open + inv + share - div + fx;
        if (close >= open) continue;
        return { pattern: "equity-accounted investments", q: "Our investments in associates went down although we invested again this year. Did we sell stakes?",
          doc: [["Carrying amount, 1 January", fmt(open)], ["New investments", fmt(inv)], ["Share of the associates' profit", fmt(share)], ["Dividends received", fmt(div)], ["Exchange-rate differences", fx ? "−" + fmt(-fx) : "0"], ["Carrying amount, 31 December", fmt(close)]],
          opts: [opt("No: the dividends received exceeded our share of their profit (plus exchange rates)", true, `${fmt(div)} of dividends against ${fmt(share)} of profit: the equity method lowers the investment by the dividends.`),
            opt("Yes, we sold part of them", false, `There's no disposal: we put in ${fmt(inv)} more.`),
            opt("The associates made losses", false, `Our share of their profit was positive: +${fmt(share)}.`)],
          solution: ["Book value(t) = book value(t−1) + new investments + share of profit − dividends ± FX.", "Eni 2025: invested €595m, dividends €1.51 bn > share of profit €1.16 bn, FX −€1.42 bn."] };
      }
    },
    commonSize(r) {
      for (;;) {
        const t0 = step(r, 20000, 80000, 100), dt = r.int(12, 25) / 100, t1 = round(t0 * (1 - dt), 100), i0 = round(t0 * r.int(8, 20) / 100, 10), di = r.int(2, 8) / 100, i1 = round(i0 * (1 - di), 10);
        if (i1 / t1 <= i0 / t0 + 0.001) continue;
        return { pattern: "common size reading", q: "Our inventories fell this year, yet the common size report shows them weighing more. A mistake?",
          doc: [["", `${Y - 1}`, `${Y}`], ["Inventories", fmt(i0), fmt(i1)], ["Total assets", fmt(t0), fmt(t1)], ["Inventories, % of total assets", p2(i0 / t0), p2(i1 / t1)]],
          opts: [opt("No: total assets fell faster, so the weight of inventories rose", true, `Inventories ${p2(i1 / i0 - 1)}, total assets ${p2(t1 / t0 - 1)}: the weight moves with the difference between the two.`),
            opt("Yes: a smaller item must weigh less", false, "Only if the total falls less than the item."),
            opt("Inventories actually grew", false, `They fell by ${p2(1 - i1 / i0)}.`)],
          solution: ["Vertical: item ÷ total of the same year. Horizontal: item ÷ the same item in the base year − 1."] };
      }
    },
    eps(r) {
      const np0 = step(r, 1000, 5000, 10), np1 = round(np0 * (1 + r.int(-1, 1) / 200), 10), s0 = step(r, 3000, 20000, 100), s1 = round(s0 * (1 - r.int(3, 8) / 100), 100);
      return { pattern: "EPS and the number of shares", q: "Our profit was flat, yet EPS grew. How?",
        doc: [["", `${Y - 1}`, `${Y}`], ["Net profit (k€)", fmt(np0), fmt(np1)], ["Weighted average number of shares (thousand)", fmt(s0), fmt(s1)], ["EPS (€)", (np0 / s0).toFixed(4), (np1 / s1).toFixed(4)]],
        opts: [opt("Fewer shares: buybacks lowered the weighted average number of shares", true, `Shares ${p2(s1 / s0 - 1)}, profit about flat: EPS = profit ÷ weighted average shares rose.`),
          opt("Profit grew", false, "It's flat."),
          opt("We paid a higher dividend", false, "EPS doesn't depend on the dividends.")],
        solution: [`EPS ${Y - 1} = ${fmt(np0)} ÷ ${fmt(s0)} = €${(np0 / s0).toFixed(4)}; EPS ${Y} = €${(np1 / s1).toFixed(4)}.`, "Eni: EPS €0.87 → €0.91 with a flat profit, as the shares went from 3.17 to 3.02 billion."] };
    },
    roaDown(r) {
      for (;;) {
        const ic = step(r, 500000, 3000000, 50000), roa = r.int(18, 28) / 100, oi = round(ic * roa, 1000), k = r.pick([8, 10, 12]), dic = step(r, 200000, 800000, 50000), pr = (k / 100 + roa) / 2, doi = round(dic * pr, 1000);
        const a1 = (oi + doi) / (ic + dic), ri0 = oi - k * ic / 100, ri1 = oi + doi - k * (ic + dic) / 100;
        if (a1 >= roa || ri1 <= ri0) continue;
        return { pattern: "ROA vs residual income", q: "Our new investment made the division's ROA fall. Was it a mistake?",
          doc: [["", "Before", "After"], ["Operating income (€)", fmt(oi), fmt(oi + doi)], ["Invested capital (€)", fmt(ic), fmt(ic + dic)], ["ROA", p2(roa), p2(a1)], ["Cost of capital k", `${k}%`, `${k}%`]],
          opts: [opt("No: it earns more than k, so residual income rises, even if ROA falls", true, `The investment earns ${p2(doi / dic)} > k ${k}%: RI ${fmt(ri0)} → ${fmt(ri1)}. Below today's ROA, so the ratio falls: denominator management.`),
            opt("Yes: a lower ROA always means value is destroyed", false, "ROA falls because the project earns less than today's average, not less than k."),
            opt("Yes: it earns less than the cost of capital", false, `It earns ${p2(doi / dic)}, above k = ${k}%.`)],
          solution: [`RI = operating income − k × invested capital: ${fmt(ri0)} → ${fmt(ri1)}.`, "The hotel case of Lecture 08."] };
      }
    }
  };
  function explain(r, kind) {
    const keys = Object.keys(EXPLAIN), k = kind || O.pickFresh(r, keys, x => "explain:" + x);
    const s = EXPLAIN[k](r);
    return { type: "mcq", typeLabel: "EXPLAIN TO THE CLIENT", docKind: "Question from Lario's CFO", pattern: `explain · ${s.pattern}`, client: "lario",
      brief: "Lario's CFO needs an answer for the board. Which explanation holds, numbers in hand?",
      doc: { kind: "Lario Energia (k€)", title: s.pattern.charAt(0).toUpperCase() + s.pattern.slice(1), lines: s.doc },
      question: `“${s.q}”`, options: r.shuffle(s.opts), solution: s.solution };
  }

  // ---------- The LARIO CASE FILE: five episodes, the same company ----------
  const EPISODES = 5;
  function caseData(seed) {
    const r = QL.rng(seed >>> 0);
    for (let t = 0; t < 400; t++) {
      const rev0 = step(r, 20000, 80000, 100), rev = [rev0, round(rev0 * (1 + r.int(-12, 15) / 100), 100)];
      // The second year follows from the first: the same business, a few points up or down.
      const sh = { rm: r.int(35, 50), ga: r.int(8, 14), staff: r.int(10, 18), da: r.int(3, 7) };
      const is = rev.map((R, y) => Object.fromEntries([["rev", R]].concat(Object.entries(sh).map(([k, v]) => [k, round(R * (v + (y ? r.int(-2, 2) : 0)) / 100, 10)]))));
      const b0 = { ppe: r.int(40, 90), intang: r.int(3, 15), inv: r.int(5, 15), rec: r.int(10, 25), pay: r.int(8, 20), prov: r.int(2, 6), std: r.int(2, 10), ltd: r.int(10, 40) };
      const bs = rev.map((R, y) => Object.fromEntries(Object.entries(b0).map(([k, v]) => [k, round(R * v / 100 * (y ? 1 + r.int(-8, 8) / 100 : 1), 10)])));
      is.forEach((x, i) => {
        x.va = x.rev - x.rm - x.ga; x.ebitda = x.va - x.staff; x.ebit = x.ebitda - x.da;
        x.fin = round((bs[i].std + bs[i].ltd) * r.int(3, 7) / 100, 10); x.ebt = x.ebit - x.fin; x.tax = round(Math.max(0, x.ebt) * r.int(24, 30) / 100, 10); x.ni = x.ebt - x.tax;
      });
      const nca = b => b.ppe + b.intang + b.inv + b.rec, liab = b => b.pay + b.prov + b.std + b.ltd;
      bs[0].cash = step(r, 500, 5000, 10); bs[0].eq = nca(bs[0]) + bs[0].cash - liab(bs[0]);
      const div = is[0].ni > 0 ? round(is[0].ni * r.pick([0.3, 0.5, 0.7]), 10) : 0;
      bs[1].eq = bs[0].eq + is[1].ni - div; bs[1].cash = bs[1].eq + liab(bs[1]) - nca(bs[1]);
      if (is.some(x => x.ebit <= 0 || x.ni <= 0) || bs.some(b => b.cash < 300 || b.eq < 0.2 * (nca(b) + b.cash))) continue;
      const avgRoa = r.int(4, 12) / 100, avgDe = r.pick([0.8, 1, 1.2, 1.5, 2]);
      const roa = is[1].ebit / (nca(bs[1]) + bs[1].cash), de = liab(bs[1]) / bs[1].eq;
      if (Math.abs(roa - avgRoa) < 0.01 || Math.abs(de - avgDe) < 0.15) continue;
      return { is, bs, div, avgRoa, avgDe };
    }
    throw new Error("caseData");
  }
  const YR = [Y - 1, Y];
  const two = (label, f, c) => [label, fmt(f(c.is[0], c.bs[0])), fmt(f(c.is[1], c.bs[1]))];
  const bsLines = c => [["", `${YR[0]}`, `${YR[1]}`], two("Property, plant and equipment", (i, b) => b.ppe, c), two("Intangible assets", (i, b) => b.intang, c), two("Inventories", (i, b) => b.inv, c), two("Trade receivables", (i, b) => b.rec, c), two("Cash and cash equivalents", (i, b) => b.cash, c),
    two("Trade payables", (i, b) => b.pay, c), two("Provisions for employee benefits", (i, b) => b.prov, c), two("Short-term bank debt", (i, b) => b.std, c), two("Bonds (long-term)", (i, b) => b.ltd, c), two("Equity", (i, b) => b.eq, c)];
  const isLines = c => [["", `${YR[0]}`, `${YR[1]}`], two("Revenues", i => i.rev, c), two("Raw materials", i => i.rm, c), two("General and administrative expenses", i => i.ga, c), two("Personnel costs", i => i.staff, c), two("Depreciation and amortisation", i => i.da, c), two("Net financial expenses", i => i.fin, c), two("Income taxes", i => i.tax, c)];
  function episode(c, n) {
    const b = c.bs[1], i1 = c.is[1], i0 = c.is[0], ta = x => x.ppe + x.intang + x.inv + x.rec + x.cash, tl = x => x.pay + x.prov + x.std + x.ltd;
    const head = `Episode ${n + 1} of ${EPISODES}`;
    if (n === 0) {
      const fa = b.ppe + b.intang, nowc = b.rec + b.inv - b.pay, nfp = b.std + b.ltd - b.cash;
      return { title: "Reclassify the balance sheet", doc: bsLines(c), brief: `${head}. Lario Energia hands us two years of statements: this week we analyse them, one step a day. Today: the reclassified balance sheet for ${Y}.`, fields: [
        { key: "fa", label: "Fixed assets", answer: fa, why: `PPE + intangibles = ${fmt(b.ppe)} + ${fmt(b.intang)} = ${fmt(fa)}.` },
        { key: "nowc", label: "NOWC", answer: nowc, neg: true, why: `Receivables + inventories − trade payables = ${fmt(b.rec)} + ${fmt(b.inv)} − ${fmt(b.pay)} = ${fmt(nowc)}. Cash stays out.` },
        { key: "ic", label: "Invested capital", answer: fa + nowc, why: `Fixed assets + NOWC = ${fmt(fa + nowc)}.` },
        { key: "nfp", label: "Net financial position", answer: nfp, neg: true, why: `Short-term bank debt + bonds − cash = ${fmt(b.std)} + ${fmt(b.ltd)} − ${fmt(b.cash)} = ${fmt(nfp)}.` }],
        choice: { label: "Check: invested capital equals…", options: ["Equity + NFP + provisions", "Equity + all liabilities", "Total assets"], answer: "Equity + NFP + provisions",
          why: `${fmt(b.eq)} + ${fmt(nfp)} + ${fmt(b.prov)} = ${fmt(b.eq + nfp + b.prov)} = ${fmt(fa + nowc)}: the coverage side.` } };
    }
    if (n === 1) return { title: "Reclassify the income statement", doc: isLines(c), brief: `${head}. Same Lario figures as yesterday. Today: the reclassified income statement for ${Y}.`, fields: [
      { key: "va", label: "Value added", answer: i1.va, why: `Revenues − raw materials − G&A = ${fmt(i1.rev)} − ${fmt(i1.rm)} − ${fmt(i1.ga)} = ${fmt(i1.va)}.` },
      { key: "ebitda", label: "EBITDA", answer: i1.ebitda, why: `Value added − personnel = ${fmt(i1.va)} − ${fmt(i1.staff)} = ${fmt(i1.ebitda)}.` },
      { key: "ebit", label: "EBIT", answer: i1.ebit, why: `EBITDA − D&A = ${fmt(i1.ebitda)} − ${fmt(i1.da)} = ${fmt(i1.ebit)}.` },
      { key: "ni", label: "Net income", answer: i1.ni, why: `EBIT − net financial expenses − taxes = ${fmt(i1.ebit)} − ${fmt(i1.fin)} − ${fmt(i1.tax)} = ${fmt(i1.ni)}.` }],
      choice: { label: "Value added measures…", options: ["What the company adds to the resources it buys outside", "The profit left to the shareholders", "The cash from operations"], answer: "What the company adds to the resources it buys outside",
        why: "Revenues minus external resources (raw materials, G&A): the value the company adds." } };
    if (n === 2) {
      const it = [["Personnel costs", "staff"], ["Raw materials", "rm"], ["Depreciation and amortisation", "da"]][c.is[0].rev % 3];
      const v0 = pct2(i0[it[1]] / i0.rev), v1 = pct2(i1[it[1]] / i1.rev), h = pct2(i1.rev / i0.rev - 1);
      return { title: "Common size", doc: isLines(c), brief: `${head}. Same Lario figures. Today: common size of the income statement, ${it[0].toLowerCase()} and revenues.`, fields: [
        { key: "v0", label: `${it[0]}, % of revenues ${YR[0]}`, answer: v0, dec: true, tol: 0.05, why: `${fmt(i0[it[1]])} ÷ ${fmt(i0.rev)} = ${v0}%.` },
        { key: "v1", label: `${it[0]}, % of revenues ${YR[1]}`, answer: v1, dec: true, tol: 0.05, why: `${fmt(i1[it[1]])} ÷ ${fmt(i1.rev)} = ${v1}%.` },
        { key: "h", label: `Revenues, ${YR[1]} vs ${YR[0]} (%)`, answer: h, dec: true, neg: true, tol: 0.05, why: `${fmt(i1.rev)} ÷ ${fmt(i0.rev)} − 1 = ${h}%: the horizontal analysis.` }],
        choice: { label: `The weight of ${it[0].toLowerCase()} on revenues…`, options: ["Went up", "Went down", "Stayed the same"], answer: Math.abs(v1 - v0) < 0.005 ? "Stayed the same" : v1 > v0 ? "Went up" : "Went down",
          why: `${v0}% → ${v1}%.` } };
    }
    if (n === 3) {
      const roe = i1.ni / b.eq, roi = i1.ebit / (b.eq + b.std + b.ltd), em = i1.ebit / i1.rev, de = tl(b) / b.eq, cr = (b.inv + b.rec + b.cash) / (b.pay + b.std);
      return { title: "Indicators", doc: bsLines(c).concat([["EBIT", fmt(i0.ebit), fmt(i1.ebit)], ["Net income", fmt(i0.ni), fmt(i1.ni)], ["Revenues", fmt(i0.rev), fmt(i1.rev)]]),
        brief: `${head}. Same Lario figures. Today: the indicators of ${Y}, for the different readers. Current liabilities = trade payables + short-term bank debt.`, fields: [
          { key: "roe", label: "ROE (%)", answer: pct2(roe), dec: true, tol: 0.05, why: `Net income ÷ equity = ${fmt(i1.ni)} ÷ ${fmt(b.eq)} = ${p2(roe)}.` },
          { key: "roi", label: "ROI (%)", answer: pct2(roi), dec: true, tol: 0.05, why: `EBIT ÷ (equity + financial debts) = ${fmt(i1.ebit)} ÷ ${fmt(b.eq + b.std + b.ltd)} = ${p2(roi)}.` },
          { key: "em", label: "EBIT margin (%)", answer: pct2(em), dec: true, tol: 0.05, why: `EBIT ÷ revenues = ${p2(em)}.` },
          { key: "de", label: "D/E, total liabilities ÷ equity (times)", answer: r2(de), dec: true, tol: 0.011, why: `${fmt(tl(b))} ÷ ${fmt(b.eq)} = ${r2(de)}.` },
          { key: "cr", label: "Current ratio (times)", answer: r2(cr), dec: true, tol: 0.011, why: `(Inventories + receivables + cash) ÷ (payables + short-term debt) = ${fmt(b.inv + b.rec + b.cash)} ÷ ${fmt(b.pay + b.std)} = ${r2(cr)}.` }],
        choice: { label: "Which is the dominant source of financing?", options: ["Debt (third parties)", "Equity (the shareholders)"], answer: de > 1 ? "Debt (third parties)" : "Equity (the shareholders)", why: `D/E ${r2(de)}: ${de > 1 ? "above" : "below"} 1.` } };
    }
    const roa0 = i0.ebit / ta(c.bs[0]), roa1 = i1.ebit / ta(b), de = tl(b) / b.eq;
    const q = roa1 > c.avgRoa ? (de > c.avgDe ? "Amplified, risky" : "Sound") : (de > c.avgDe ? "Weak and indebted" : "Prudent but weak");
    return { title: "Benchmark and interpretation", doc: [["", `${YR[0]}`, `${YR[1]}`], ["EBIT", fmt(i0.ebit), fmt(i1.ebit)], ["Total assets", fmt(ta(c.bs[0])), fmt(ta(b))], ["Total liabilities", fmt(tl(c.bs[0])), fmt(tl(b))], ["Equity", fmt(c.bs[0].eq), fmt(b.eq)], ["Sector average ROA", "", p2(c.avgRoa)], ["Sector average D/E", "", fmt(c.avgDe)]],
      brief: `${head}, the last. Lario against its sector: where does it sit in the risk / efficiency matrix?`, fields: [
        { key: "roa0", label: `ROA ${YR[0]} (%)`, answer: pct2(roa0), dec: true, tol: 0.05, why: `${fmt(i0.ebit)} ÷ ${fmt(ta(c.bs[0]))} = ${p2(roa0)}.` },
        { key: "roa1", label: `ROA ${YR[1]} (%)`, answer: pct2(roa1), dec: true, tol: 0.05, why: `${fmt(i1.ebit)} ÷ ${fmt(ta(b))} = ${p2(roa1)}.` }],
      choice: { label: `Against the sector, in ${Y} Lario is…`, options: Object.keys(I.QUADRANTS), answer: q,
        why: `ROA ${p2(roa1)} ${roa1 > c.avgRoa ? "above" : "below"} the sector's ${p2(c.avgRoa)}; D/E ${r2(de)} ${de > c.avgDe ? "above" : "below"} the sector's ${fmt(c.avgDe)}: “${q}”, ${I.QUADRANTS[q]}. Case closed.` } };
  }
  function caseJob(career) {
    const c = career.cases, data = caseData(c.seed), e = episode(data, c.step);
    return { id: `case:${c.n}:${c.step}`, caseRef: { n: c.n, step: c.step }, type: "fill", pattern: `Lario case · ${e.title.toLowerCase()}`, client: "lario", pickup: "inbox", work: "desk",
      doc: { kind: `Lario Energia · case file ${c.n} (k€)`, title: `${e.title} · episode ${c.step + 1}/${EPISODES}`, lines: e.doc }, brief: e.brief, fields: e.fields, choice: e.choice };
  }

  // ---------- Office SURPRISES ----------
  const BONUS = { 1: 15, 2: 25, 3: 35 };
  // An indicators exercise on Lario's own (generated) figures, not on Eni's.
  const lario = (gen, r) => { for (;;) { const j = gen(r); if (!/Eni/.test(j.pattern)) return j; } };
  function surprise(career, r) {
    if (!career.stats || career.stats.days < 1 || !r.chance(0.2)) return null;
    const tier = O.tierOf(career), act = career.activity;
    const kinds = act === "cons" ? ["auditorCons"] : act === "fa" || tier >= 3 ? ["auditorFa", "bank", "cfo"] : ["auditorBasics", "flashcards"];
    const kind = r.pick(kinds);
    const make = {
      auditorCons: () => [trueFalse("consolidation", r), "The group's auditor", "Heads-up: the group's auditor will call this morning with a few true-or-false checks on the consolidation. Get them right and there's a bonus for you."],
      auditorFa: () => [trueFalse("analysis", r), "The auditor", "Heads-up: the auditor will call this morning with a few true-or-false checks. Get them right and there's a bonus for you."],
      auditorBasics: () => [trueFalse("basics", r), "The auditor", "Heads-up: the auditor will call this morning with a few true-or-false checks on the basics. Get them right and there's a bonus for you."],
      flashcards: () => [matchJob("basics", r), "Giulia, from the meeting room", "I'll call you from the meeting room with a quick quiz on the terms, before the auditor comes. A bonus if you get them all."],
      bank: () => [Object.assign(lario(r.pick([I.otherStakeholders, I.liquidity, I.cashCoverage]), r), { client: "lario" }), "Banca Brera", "Banca Brera will phone about Lario Energia's credit line: they want some ratios. Quick and right, and there's a bonus."],
      cfo: () => [explain(r), "Lario's CFO", "Lario's CFO will call before the board meeting and needs an explanation of the numbers. A bonus if it holds."]
    }[kind];
    const [job, who, intro] = O.withMemory(career, make);
    return Object.assign(job, { id: `sp:${career.year}:${career.day}`, pickup: "phone", work: "phone", tier, surprise: { kind, who, intro, bonus: BONUS[tier] || 15 } });
  }

  // ---------- Into the day ----------
  const prevPlan = O.planDay;
  O.planDay = function (career, r) {
    const plan = prevPlan(career, r);
    if (career.activity === "fa") {
      if (!career.cases || career.cases.step >= EPISODES) career.cases = { n: (career.cases ? career.cases.n : 0) + 1, step: 0, seed: r.int(1, 2e9) };
      const job = Object.assign(caseJob(career), { track: "fa", level: ST.studyOf(career, "fa").level, tier: O.tierOf(career) });
      // In place of one of the day's desk files, so the day keeps its length.
      const at = plan.jobs.findIndex(j => j.track === "fa");
      if (at >= 0) plan.jobs.splice(at, 1, job); else plan.jobs.push(job);
    }
    const sp = surprise(career, r);
    if (sp) plan.jobs.push(sp);
    return plan;
  };
  const prevReward = O.reward;
  O.reward = function (career, job, ok) {
    const rw = prevReward(career, job, ok);
    const c = career.cases;
    if (job.caseRef && c && job.caseRef.n === c.n && job.caseRef.step === c.step) c.step++;
    if (ok && job.surprise) { career.bonus = (career.bonus || 0) + job.surprise.bonus; rw.surprise = job.surprise.bonus; }
    return rw;
  };
  const prevNormalize = O.normalizeCareer;
  O.normalizeCareer = function (s) {
    const out = prevNormalize(s), c = out.cases;
    out.cases = c && Number.isInteger(c.n) && c.n > 0 && Number.isInteger(c.step) && c.step >= 0 && c.step <= EPISODES && Number.isFinite(c.seed) ? { n: c.n, step: c.step, seed: c.seed } : null;
    return out;
  };

  // ---------- Where the new formats go ----------
  const forClients = (job, clients, r, phone) => Object.assign(job, { client: r.pick(clients), pickup: phone ? "phone" : "inbox", work: phone ? "phone" : "desk" });
  Object.assign(O.MAKERS, {
    truefalse: (tier, clients, r) => {
      const job = forClients(trueFalse(tier >= 3 ? "analysis" : "basics", r), tier >= 3 && clients.includes("lario") ? ["lario"] : clients, r, true);
      job.brief = `${D.CLIENTS[job.client].name}'s accountant is on the phone, checking five statements. True or false? One slip allowed.`;
      return job;
    },
    match: (tier, clients, r) => forClients(matchJob(tier >= 3 ? "analysis" : "basics", r), tier >= 3 && clients.includes("lario") ? ["lario"] : clients, r),
    sequence: (tier, clients, r) => forClients(sequenceJob(tier >= 3 ? r.pick(["is", "steps", "cfs", "benchmark"]) : "cfs", r), tier >= 3 && clients.includes("lario") ? ["lario"] : clients, r),
    explain: (tier, clients, r) => Object.assign(explain(r), { pickup: "inbox", work: "desk" })
  });
  O.MIX[1].push("truefalse", "match", "sequence");
  O.MIX[2].push("truefalse", "match", "sequence");
  O.MIX[3].push("truefalse", "match", "sequence", "explain", "explain");
  const tf = topic => r => trueFalse(topic, r), mt = topic => r => matchJob(topic, r), sq = key => r => sequenceJob(key, r), sqAny = keys => r => sequenceJob(r.pick(keys), r);
  const NEW = {
    cons: { 1: [tf("consolidation"), mt("consolidation"), sq("cons")], 2: [tf("consolidation"), mt("consolidation"), sq("cons")], 3: [tf("consolidation"), sq("cons")] },
    fa: { 1: [tf("analysis"), mt("analysis"), sq("steps")], 2: [tf("analysis"), mt("analysis"), sqAny(["is", "cfs", "benchmark"]), r => explain(r)], 3: [r => explain(r), r => explain(r), tf("analysis"), sqAny(["is", "cfs", "benchmark", "steps"])] }
  };
  ["cons", "fa"].forEach(t => [1, 2, 3].forEach(l => { ST.PLAN[t][l] = ST.PLAN[t][l].concat(NEW[t][l]); }));

  const api = { TF, GROUPS, SEQ, EXPLAIN, EPISODES, BONUS, clue, trueFalse, matchJob, sequenceJob, explain, caseData, episode, caseJob, surprise };
  root.OfficeVariety = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
