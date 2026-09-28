/* PolimiAFC — the Financial Analyst's work (AFC Lecture 05, Financial Analysis Part I):
   understanding the context (sources, Form 20-F), reclassifying the balance sheet and the income statement,
   segmental analysis, and the ROE and payout ratio from the Eni example. Loaded after office-logic.js. */
(function (root) {
  "use strict";
  const D = root.OfficeData, O = root.OfficeLogic;
  const Y = D.Y;
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const mln = n => `€${fmt(n)}m`;
  const pct = (a, b) => Math.round(a / b * 10000) / 100;
  const tens = (r, lo, hi) => 10 * r.int(Math.ceil(lo / 10), Math.floor(hi / 10));

  // ---------- Step 2 · Reclassifying the balance sheet ----------
  // Invested capital (fixed assets + NOWC) = coverage (equity + NFP + provisions).
  const BS_CATS = ["Fixed assets", "NOWC", "NFP", "Provisions", "Equity"];
  const BS_SHORT = ["Fixed", "NOWC", "NFP", "Prov.", "Equity"];
  // [label, category, sign inside its block, range (€ million), why]
  const BS_ITEMS = {
    ppe: ["Property, plant and equipment", "Fixed assets", 1, [40000, 60000], "A long-term investment in the business: fixed assets."],
    goodwill: ["Goodwill", "Fixed assets", 1, [1000, 3000], "An intangible with indefinite life, retained for the long term: fixed assets."],
    intangibles: ["Other intangible assets", "Fixed assets", 1, [1000, 4000], "Non-current, used for years: fixed assets."],
    investments: ["Equity investments", "Fixed assets", 1, [5000, 12000], "Stakes in subsidiaries, associates and joint ventures are long-term investments: fixed assets."],
    receivables: ["Trade receivables", "NOWC", 1, [8000, 15000], "Money tied up in the operating cycle: it adds to the net operating working capital."],
    inventories: ["Inventories", "NOWC", 1, [4000, 8000], "Part of the operating cycle: it adds to the net operating working capital."],
    payables: ["Trade payables", "NOWC", -1, [9000, 16000], "Suppliers finance the operating cycle: payables are subtracted inside the NOWC, not counted as financial debt."],
    tax: ["Current tax liabilities", "NOWC", -1, [500, 1500], "Tax payables go with the other payables and are subtracted in the NOWC."],
    bonds: ["Bonds", "NFP", 1, [10000, 20000], "A debt with an explicit interest rate: it's part of the net financial position."],
    bank: ["Bank debts", "NFP", 1, [5000, 12000], "Financial debt with interest: net financial position."],
    leases: ["Lease liabilities", "NFP", 1, [2000, 5000], "Other financial liabilities (leases) count in the net financial position."],
    cash: ["Cash and cash equivalents", "NFP", -1, [5000, 12000], "Cash isn't in the NOWC: it's subtracted from financial debt to get the net financial position."],
    provisions: ["Provisions for liabilities and charges", "Provisions", 1, [8000, 15000], "Provisions are a separate block of the coverage, next to equity and NFP."],
    pensions: ["Pensions and similar obligations", "Provisions", 1, [500, 1500], "Obligations towards employees go with the provisions."],
    equity: ["Shareholders' equity", "Equity", 1, null, "What the shareholders invested and left in the business."]
  };
  function reclassBS(tier, clients, r) {
    for (let tries = 0; tries < 50; tries++) {
      const keys = ["ppe", "receivables", "inventories", "payables", "bonds", "bank", "cash", "provisions"]
        .concat(r.shuffle(["goodwill", "intangibles", "investments", "tax", "leases", "pensions"]).slice(0, 2));
      const v = {};
      keys.forEach(k => { v[k] = tens(r, BS_ITEMS[k][3][0], BS_ITEMS[k][3][1]); });
      const sum = cat => keys.filter(k => BS_ITEMS[k][1] === cat).reduce((s, k) => s + BS_ITEMS[k][2] * v[k], 0);
      const fixed = sum("Fixed assets"), nowc = sum("NOWC"), nfp = sum("NFP"), prov = sum("Provisions");
      const equity = fixed + nowc - nfp - prov;
      if (equity < 15000 || nowc === 0) continue;
      v.equity = equity;
      const all = r.shuffle(keys.concat("equity"));
      const listLines = keys.filter(k => BS_ITEMS[k][1] === "NOWC").map(k => `${BS_ITEMS[k][2] > 0 ? "+" : "−"} ${fmt(v[k])}`).join(" ");
      const nfpLines = keys.filter(k => BS_ITEMS[k][1] === "NFP").map(k => `${BS_ITEMS[k][2] > 0 ? "+" : "−"} ${fmt(v[k])}`).join(" ");
      return {
        type: "reclass", client: "lario", pickup: "inbox", work: "desk", cats: BS_CATS, short: BS_SHORT,
        docKind: `IFRS balance sheet · 31 December ${Y} · € million`,
        brief: "Reclassify the balance sheet: where is the money invested (fixed assets, NOWC), and who paid for it (equity, NFP, provisions)?",
        items: all.map(k => ({ label: BS_ITEMS[k][0], amount: v[k], cat: BS_ITEMS[k][1], why: BS_ITEMS[k][4] })),
        fields: [
          { key: "nowc", label: "Net operating working capital (€m)", answer: nowc, neg: true, why: `Receivables and inventories minus payables: ${listLines} = ${fmt(nowc)}.` },
          { key: "nfp", label: "Net financial position (€m)", answer: nfp, neg: true, why: `Financial debts minus cash: ${nfpLines} = ${fmt(nfp)}. The part of the debt that can't be repaid at once.` },
          { key: "ic", label: "Invested capital (€m)", answer: fixed + nowc, why: `Fixed assets ${fmt(fixed)} + NOWC ${fmt(nowc)} = ${fmt(fixed + nowc)}. Check: equity ${fmt(equity)} + NFP ${fmt(nfp)} + provisions ${fmt(prov)} = ${fmt(equity + nfp + prov)}.` }
        ]
      };
    }
    throw new Error("reclassBS: no valid balance sheet");
  }

  // ---------- Step 2 · Reclassifying the income statement ----------
  function reclassIS(tier, clients, r) {
    const rev = 100 * r.int(600, 900);
    const raw = 10 * Math.round(rev * r.int(45, 55) / 1000);
    const ga = 10 * Math.round(rev * r.int(8, 12) / 1000);
    const staff = 10 * Math.round(rev * r.int(6, 10) / 1000);
    const da = 10 * Math.round(rev * r.int(6, 9) / 1000);
    const fin = tens(r, 500, 1500);
    const extra = r.pick([-1, 1]) * tens(r, 200, 800);
    const va = rev - raw - ga, ebitda = va - staff, ebit = ebitda - da, ebt = ebit - fin, pretax = ebt + extra;
    const tax = 10 * Math.round(pretax * 0.3 / 10), net = pretax - tax;
    return {
      type: "fill", client: "lario", pickup: "inbox", work: "desk",
      doc: { kind: "Income statement", title: `Lario Energia · ${Y} · € million`, lines: r.shuffle([
        ["Total revenues", fmt(rev)], ["Raw materials", fmt(raw)], ["General and administrative expenses", fmt(ga)],
        ["Personnel costs", fmt(staff)], ["Depreciation and amortisation", fmt(da)], ["Net financial expenses", fmt(fin)],
        [extra > 0 ? "Extraordinary gain" : "Extraordinary loss", fmt(Math.abs(extra))], ["Income tax", fmt(tax)]
      ]) },
      brief: "Rebuild the reclassified income statement, from revenues down to net income.",
      fields: [
        { key: "va", label: "Value added (€m)", answer: va, why: `Revenues − raw materials − G&A expenses = ${fmt(rev)} − ${fmt(raw)} − ${fmt(ga)} = ${fmt(va)}: the value the company adds to external resources.` },
        { key: "ebitda", label: "EBITDA (€m)", answer: ebitda, why: `Value added − personnel costs = ${fmt(va)} − ${fmt(staff)} = ${fmt(ebitda)}.` },
        { key: "ebit", label: "EBIT (€m)", answer: ebit, why: `EBITDA − depreciation and amortisation = ${fmt(ebitda)} − ${fmt(da)} = ${fmt(ebit)}: the operating result.` },
        { key: "pretax", label: "Pretax income (€m)", answer: pretax, why: `EBIT − net financial expenses ${extra > 0 ? "+ extraordinary gain" : "− extraordinary loss"} = ${fmt(ebit)} − ${fmt(fin)} ${extra > 0 ? "+" : "−"} ${fmt(Math.abs(extra))} = ${fmt(pretax)}.` },
        { key: "net", label: "Net income (€m)", answer: net, why: `Pretax income − tax = ${fmt(pretax)} − ${fmt(tax)} = ${fmt(net)}.` }
      ]
    };
  }

  // ---------- ROE and payout ratio (the Eni example in Lecture 05) ----------
  function ratio(tier, clients, r) {
    const equity = 100 * r.int(400, 650), prevNet = 10 * r.int(200, 500), net = 10 * r.int(150, 450);
    const div = 10 * r.int(Math.round(prevNet * 0.5 / 10), Math.round(prevNet * 1.4 / 10));
    const roe = pct(net, equity), payout = Math.round(div / prevNet * 100) / 100;
    const answer = payout > 1 ? "More than last year's profit" : "Less than last year's profit";
    return {
      type: "fill", client: "lario", pickup: "inbox", work: "desk",
      doc: { kind: "Key figures", title: `Lario Energia · € million`, lines: [
        [`Net profit ${Y}`, fmt(net)], [`Net profit ${Y - 1}`, fmt(prevNet)], [`Equity ${Y}`, fmt(equity)], [`Dividends paid in ${Y}`, fmt(div)]
      ] },
      brief: "A shareholder asks two numbers: this year's ROE and the payout ratio.",
      fields: [
        { key: "roe", label: `ROE ${Y} (%)`, answer: roe, tol: 0.05, dec: true, why: `Net profit ÷ equity = ${fmt(net)} ÷ ${fmt(equity)} = ${roe.toFixed(2)}%: the return for the shareholders.` },
        { key: "payout", label: "Payout ratio (e.g. 0.64)", answer: payout, tol: 0.01, dec: true, why: `Dividends paid this year ÷ last year's net profit = ${fmt(div)} ÷ ${fmt(prevNet)} = ${payout.toFixed(2)}.` }
      ],
      choice: { label: "So the dividends paid were…", options: ["More than last year's profit", "Less than last year's profit"], answer,
        why: payout > 1 ? "A payout above 1 means the company paid out more than it earned: it can't last for ever." : "A payout below 1: part of last year's profit stayed in the company." }
    };
  }

  // ---------- Segmental analysis ----------
  const SEGMENTS = ["Upstream", "Refining & Marketing", "Renewables"];
  function segment(tier, clients, r) {
    const prev = [tens(r, 20000, 30000), tens(r, 25000, 40000), tens(r, 3000, 7000)];
    const growth = SEGMENTS.map(() => r.int(-12, 25));
    const now = prev.map((p, i) => 10 * Math.round(p * (1 + growth[i] / 100) / 10));
    const total = now.reduce((a, b) => a + b, 0);
    const g = now.map((n, i) => pct(n - prev[i], prev[i]));
    const fastest = SEGMENTS[g.indexOf(Math.max(...g))];
    const pick = r.int(0, 2);
    return {
      type: "fill", client: "lario", pickup: "inbox", work: "desk",
      doc: { kind: "Sales by segment", title: `Lario Energia · € million`, lines: SEGMENTS.map((s, i) => [s, `${fmt(prev[i])} → ${fmt(now[i])}`]) },
      brief: `Segmental analysis: split the results by business (${Y - 1} → ${Y}).`,
      fields: [
        { key: "share", label: `${SEGMENTS[pick]}: share of ${Y} revenues (%)`, answer: pct(now[pick], total), tol: 0.1, dec: true, why: `${fmt(now[pick])} ÷ ${fmt(total)} (total of the three segments) = ${pct(now[pick], total).toFixed(2)}%.` },
        { key: "growth", label: "Renewables: growth (%)", answer: g[2], tol: 0.1, dec: true, neg: true, why: `(${fmt(now[2])} − ${fmt(prev[2])}) ÷ ${fmt(prev[2])} = ${g[2].toFixed(2)}%.` }
      ],
      choice: { label: "Which segment grew fastest?", options: SEGMENTS, answer: fastest, why: `Growth: ${SEGMENTS.map((s, i) => `${s} ${g[i].toFixed(1)}%`).join(", ")}.` }
    };
  }

  // ---------- Step 1 · Understanding the context: the four kinds of source ----------
  const SRC_CATS = ["Financial disclosures", "Industry & economic data", "Non-financial disclosures", "Market data"];
  const SRC_SHORT = ["Financial", "Industry", "Non-fin.", "Market"];
  const SOURCES = [
    ["The consolidated financial statements", 0, "Financial statements schemes are financial disclosures."],
    ["The letter to shareholders", 0, "The shareholder letter is a financial disclosure (it's inside the annual report)."],
    ["Sales by segment in the Form 20-F", 0, "Segmental analysis is part of the financial disclosures."],
    ["The statutory auditors' report", 0, "Listed among the other financial disclosures, with the fact sheet."],
    ["The price of Brent crude over ten years", 1, "A key external factor for the industry: industry and economic data."],
    ["Oil and gas companies ranked by market capitalisation", 1, "A picture of the industry and its competitors: industry and economic data."],
    ["The sustainability report", 2, "Environmental, human capital and governance goals: a non-financial disclosure."],
    ["The country-by-country report", 2, "Country reports are non-financial disclosures."],
    ["ESG indicators", 2, "Environmental, social and governance indicators: non-financial disclosures."],
    ["The share price chart", 3, "The market price of the stock: market data."],
    ["The volume of shares traded", 3, "Trading volume is market data."],
    ["The market value of the company's bonds", 3, "The value of bonds is market data."]
  ];
  function sources(tier, clients, r) {
    for (let tries = 0; tries < 50; tries++) {
      const picked = r.shuffle(SOURCES).slice(0, 5);
      if (new Set(picked.map(p => p[1])).size < 3) continue;
      return {
        type: "reclass", client: "lario", pickup: "inbox", work: "desk", cats: SRC_CATS, short: SRC_SHORT, docKind: "Research pack for the analysis",
        brief: "Step 1, understanding the context: which of the four kinds of public source is each one?",
        items: picked.map(p => ({ label: p[0], cat: SRC_CATS[p[1]], why: p[2] })), fields: []
      };
    }
    return null;
  }

  // ---------- Quick questions (the phone), level 3 ----------
  const L3 = (q, a, w, why) => [3, "lario", q, a, w, why];
  D.CALLS.push(
    L3("In our Form 20-F, where do I look first for what could break the numbers?", "Item 3.D · Risk factors", ["Item 5 · Operating review", "Part III · Financial statements", "The glossary"], "Item 3.D lists the risk factors: what could break the numbers, and by how much."),
    L3("Where does management explain, in its own words, why the numbers moved?", "Item 5 · Operating and financial review", ["Item 3.D · Risk factors", "Part III · Notes", "The auditor's report"], "Item 5 is the operating and financial review."),
    L3("Where are the financial statements, the notes and the auditor's report in the 20-F?", "Part III", ["Item 3.D", "Item 5", "The cover page"], "Part III holds the numbers, with the notes and the auditor's report."),
    L3("We're Italian. Why do we also write a Form 20-F?", "Our shares trade in the US: it's for US investors and the SEC", ["IFRS requires it", "Italian law requires it", "To pay less tax"], "Foreign companies listed in the US file it; the CEO and CFO personally certify it."),
    L3("What's the net financial position?", "Financial debts minus cash and cash equivalents", ["Total liabilities minus cash", "Receivables minus payables", "Equity minus debts"], "Bonds, bank debts and other financial liabilities, minus cash: the debt that can't be repaid at once."),
    L3("Our net financial position is high. Is that bad?", "Not necessarily: fine if the debt funds investments that earn more than it costs", ["Always bad", "Always good", "It doesn't matter at all"], "Debt can fund growth: what counts is the return on the investments against the interest."),
    L3("Does cash go in the net operating working capital?", "No: it's subtracted in the net financial position", ["Yes, it's a current asset", "Only if it's over 1 million", "It goes in equity"], "NOWC is receivables + inventories − payables; cash reduces the NFP."),
    L3("Do trade payables count as financial debt?", "No: they're subtracted inside the NOWC", ["Yes, they're in the NFP", "They're provisions", "They're equity"], "Suppliers finance the operating cycle; only debts with an explicit interest rate go in the NFP."),
    L3("Is reclassifying the statements compulsory under IFRS?", "No: analysts do it to read, highlight and compare", ["Yes, always", "Only for listed companies", "Only in the US"], "Reclassification isn't compulsory: it improves readability and comparability."),
    L3("EBITDA minus depreciation and amortisation gives…", "EBIT, the operating profit", ["Value added", "Net income", "Pretax income"], "EBITDA − D&A = EBIT."),
    L3("In the reclassified income statement, value added is…", "Revenues − raw materials − G&A expenses", ["Revenues − all costs", "EBIT + taxes", "Net income + dividends"], "Value added: what the company adds to the resources bought outside."),
    L3("What does segmental analysis do?", "Splits the results by geographical market or business", ["Splits costs into fixed and variable", "Compares us with competitors", "Splits the profit among shareholders"], "Useful when a group works in several regions or businesses."),
    L3("How do you compute ROE?", "Net profit ÷ equity", ["Net profit ÷ revenues", "EBIT ÷ total assets", "Dividends ÷ equity"], "ROE is the return for the shareholders."),
    L3("Our payout ratio is 1.21. What does it mean?", "We paid out more in dividends than last year's profit", ["We kept 21% of the profit", "Profit grew by 21%", "Debt is 1.21 times equity"], "Payout = dividends ÷ previous year's net profit; above 1, more than was earned."),
    L3("Why do investors care about the independent auditors?", "They state the report gives a true and fair view", ["They set the dividend", "They prepare the budget", "They choose the CEO"], "The external auditors' report is required for listed companies.")
  );

  // ---------- Which statements does a transaction touch? ----------
  // Balance sheet (a date), income statement (the year, accrual), cash flow statement (the year, cash; section),
  // statement of changes in equity (movements in equity other than through profit: owners, reserves).
  // [tier, text, BS, IS, CFS section or null, SCE, why]
  const IMPACTS = [
    [1, "The bakery sells bread for €300, paid in cash", 1, 1, "Operating", 0, "Revenue in the income statement; cash up in the balance sheet and an operating inflow in the cash flow statement."],
    [1, "The bakery sells a catering order for €500, to be paid next month", 1, 1, null, 0, "Revenue now (accrual) and a receivable in the balance sheet; no cash yet, so nothing in the cash flow statement."],
    [1, "A customer pays last month's €500 invoice", 1, 0, "Operating", 0, "The receivable becomes cash: balance sheet and an operating inflow. No new revenue."],
    [1, "The bakery buys a new oven for €8,000, paid in cash", 1, 0, "Investing", 0, "A long-term asset: balance sheet, and an investing outflow. Not an expense today."],
    [1, "Depreciation of the oven for the year: €800", 1, 1, null, 0, "An expense (income statement) and a lower oven value (balance sheet). Depreciation moves no cash."],
    [1, "The bakers' wages for the month are paid: €3,000", 1, 1, "Operating", 0, "An expense of the month, paid in cash: operating outflow."],
    [1, "The bank lends the bakery €10,000", 1, 0, "Financing", 0, "Cash and a loan in the balance sheet, a financing inflow. A loan is never revenue."],
    [1, "The bakery repays €2,000 of the loan", 1, 0, "Financing", 0, "Less cash and less debt; a financing outflow. Repaying principal isn't an expense."],
    [1, "Interest on the loan is paid: €300", 1, 1, "Operating", 0, "Interest is an expense; paid in cash. The course puts interest paid in the operating section."],
    [1, "The owners put €20,000 into the business for new shares", 1, 0, "Financing", 1, "Cash and share capital in the balance sheet, a financing inflow, and a share issue in the changes in equity."],
    [1, "The bakery pays €1,000 of dividends to its owners", 1, 0, "Financing", 1, "Cash down and equity down: a distribution, never an expense. Financing outflow; it appears in the changes in equity."],
    [1, "Flour for €400 arrives on credit and sits in the storeroom", 1, 0, null, 0, "Inventory and a payable: balance sheet only. It becomes an expense when used; no cash has moved yet."],
    [1, "The bakery pays the mill the €400 it owed", 1, 0, "Operating", 0, "The payable is settled with cash: operating outflow. The expense comes when the flour is used."],
    [2, "A customer pays a €200 deposit for a cake to be delivered next month", 1, 0, "Operating", 0, "Cash in and a contract liability; no revenue until delivery."],
    [2, "Rent for the next six months is paid in advance: €6,000", 1, 0, "Operating", 0, "A prepaid expense (asset) and an operating outflow; the expense comes month by month."],
    [2, "December wages are recorded but will be paid in January", 1, 1, null, 0, "This year's expense and a liability; no cash until January."],
    [2, "An impairment test cuts a machine's value by €1,500", 1, 1, null, 0, "An impairment loss (income statement) and a lower asset value (balance sheet). No cash."],
    [2, "The shop building is revalued upwards by €10,000 (revaluation model)", 1, 0, null, 1, "Asset up and a revaluation surplus in equity: it goes through the changes in equity, not the income statement."],
    [2, "An old van is sold for cash at exactly its book value, €3,000", 1, 0, "Investing", 0, "One asset becomes cash: an investing inflow. At book value there's no gain in the income statement."],
    [2, "The shareholders' meeting moves 5% of last year's profit to the legal reserve", 1, 0, null, 1, "A movement between equity items (retained earnings → legal reserve): the changes in equity show it; no cash, no income statement."],
    [2, "New shares are issued at €3 each (nominal €1)", 1, 0, "Financing", 1, "Cash in; €1 per share to share capital and €2 to the share premium reserve. Financing inflow, and a share issue in the changes in equity."]
  ];
  const YESNO = ["Yes", "No"], SECTIONS = ["Operating", "Investing", "Financing", "No cash"];
  function statements(tier, clients, r) {
    const pool = IMPACTS.filter(x => x[0] <= tier);
    const fresh = pool.filter(x => x[0] === tier);
    const [, text, bs, is, cfs, sce, why] = r.pick(fresh.length && r.chance(0.6) ? fresh : pool);
    const yn = v => (v ? "Yes" : "No");
    return {
      type: "reclass", client: "forno", pickup: "inbox", work: "desk", cats: null, typeLabel: "WHICH STATEMENTS?", docKind: "Transaction · which statements?",
      brief: `“${text}.” Which financial statements record it directly?`,
      items: [
        { label: "Balance sheet (position at a date)", cats: YESNO, cat: yn(bs), why },
        { label: "Income statement (revenues and expenses of the year)", cats: YESNO, cat: yn(is), why },
        { label: "Cash flow statement (cash of the year)", cats: SECTIONS, short: ["Operat.", "Invest.", "Financ.", "No cash"], cat: cfs || "No cash", why },
        { label: "Statement of changes in equity (owners and reserves)", cats: YESNO, cat: yn(sce), why }
      ],
      fields: [], note: "Every revenue and expense reaches equity at year end through the profit: the changes in equity here means owners' transactions and movements between reserves."
    };
  }
  O.MAKERS.statements = statements;
  O.MIX[1].push("statements", "statements");
  O.MIX[2].push("statements");
  O.MIX[3].push("statements");

  // ---------- Register the analyst's jobs ----------
  Object.assign(O.MAKERS, { reclassBS, reclassIS, ratio, segment, sources });
  O.MIX[3].push("reclassBS", "reclassBS", "reclassIS", "reclassIS", "ratio", "segment", "sources", "quick");

  const api = { IMPACTS, statements, BS_CATS, BS_ITEMS, SRC_CATS, SOURCES, SEGMENTS, reclassBS, reclassIS, ratio, segment, sources };
  root.OfficeAnalysis = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
