/* PolimiAFC — exam-level exercises. One generator per recurring pattern of the AFC written exam
   (AFC26_ExamQuestions, Financial Accounting and Consolidation), with fresh numbers every time.
   Each one is a multiple-choice question as in the exam: the wrong options are the results of the typical
   mistakes the official solutions point out, and the solution walks through every step.
   Loaded after office-study.js. */
(function (root) {
  "use strict";
  const O = root.OfficeLogic, ST = root.OfficeStudy, D = root.OfficeData;
  const Y = D.Y;
  const n0 = x => Math.round(x).toLocaleString("en-US");
  const n2 = x => (Math.round(x * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const p2 = x => `${(Math.round(x * 10000) / 100).toFixed(2)}%`;
  const d1 = x => `${(Math.round(x * 10) / 10).toFixed(1)} days`;
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));
  const NONE = "None of the other answers";

  // Builds an exam-style multiple choice: the right answer, up to three "typical mistake" answers,
  // and sometimes "None of the other answers" is the right one (the correct value is left out).
  // The numbers inside an option ("EBIT = 19,200 k€; Revenues = 52,200 k€" → [19200, 52200]).
  const nums = text => (String(text).match(/-?\d[\d,]*(\.\d+)?/g) || []).map(x => Number(x.replace(/,/g, "")));
  // Two options are too close to tell apart if every number is within 2%.
  function tooClose(a, b) {
    const x = nums(a), y = nums(b);
    return x.length === y.length && x.length > 0 && x.every((v, i) => Math.abs(v - y[i]) <= 0.02 * Math.max(1, Math.abs(v)));
  }
  // Scales every number in an option's text, keeping its format ("19,200" → "21,504").
  function scale(text, k) {
    return String(text).replace(/-?\d[\d,]*(\.\d+)?/g, m => {
      const v = Number(m.replace(/,/g, "")) * k, dec = (m.split(".")[1] || "").length;
      return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    });
  }
  function exam(r, spec) {
    const seen = new Set([spec.right]);
    const wrong = [];
    for (const m of spec.mistakes) {
      if (!m.text || /Infinity|NaN|≈ -/.test(m.text) || seen.has(m.text) || tooClose(m.text, spec.right) || wrong.some(w => tooClose(w.text, m.text))) continue;
      seen.add(m.text); wrong.push(m);
      if (wrong.length === 3) break;
    }
    // Too few distinct typical mistakes: add plain calculation slips so there are always four options.
    for (const k of [1.12, 0.88, 1.25, 0.8]) {
      if (wrong.length >= 2) break;
      const text = scale(spec.right, k);
      if (text !== spec.right && !wrong.some(w => w.text === text || tooClose(w.text, text))) wrong.push({ text, why: "a calculation slip somewhere: check each step against the solution." });
    }
    let options;
    if (wrong.length === 3 && r.chance(0.2)) {
      options = wrong.map(m => ({ label: m.text, correct: false, why: `Wrong: ${m.why}` }))
        .concat({ label: NONE, correct: true, why: `Correct: the right result, ${spec.right}, isn't among the options.` });
    } else {
      options = r.shuffle([{ label: spec.right, correct: true, why: "Correct." }].concat(wrong.map(m => ({ label: m.text, correct: false, why: `Wrong: ${m.why}` }))));
      if (options.length < 4) options.push({ label: NONE, correct: false, why: "Wrong: one of the other answers is right." });
    }
    return {
      type: "mcq", brief: spec.brief || "Exam level: work it out on paper, then choose. Wrong options come from typical mistakes.",
      question: spec.question, doc: spec.doc, options, solution: spec.solution, pattern: spec.pattern
    };
  }
  const table = (kind, title, rows) => ({ kind, title, lines: rows.map(([k, v]) => [k, typeof v === "number" ? n2(v) : String(v)]) });

  // ---------- Financial accounting ----------

  // EBIT and revenues from the indirect cash flow statement.
  function ebitFromCfo(r) {
    const cfo = step(r, 10000, 20000, 100), da = step(r, 3000, 6000, 100), dnwc = step(r, -2000, 8000, 100);
    const tax = step(r, 1000, 3000, 100), intr = step(r, 200, 800, 50), div = step(r, 300, 1500, 100);
    const cos = step(r, 20000, 30000, 500), oth = step(r, 1000, 4000, 100), ga = step(r, 3000, 6000, 100);
    const costs = cos + oth + ga;
    const ebit = cfo - da + dnwc + tax + intr;
    const pair = e => `EBIT = ${n0(e)} k€; Revenues = ${n0(e + costs)} k€`;
    return exam(r, {
      pattern: "EBIT from the cash flow statement",
      doc: table("Company A · extract of the statements (k€)", "No deferred taxes", [["Cash flow from operating activities", cfo], ["D&A", da], ["Delta NWC (final − initial)", dnwc], ["Income taxes paid", tax], ["Interests paid", intr], ["Dividends paid", div], ["Cost of sales", cos], ["Other operating expenses", oth], ["G&A expenses", ga]]),
      question: "Which answer is correct?",
      right: pair(ebit),
      mistakes: [
        { text: pair(cfo + da + dnwc + tax + intr), why: "D&A was added back instead of removed: going from CFO back to EBIT, D&A is subtracted." },
        { text: pair(cfo - da - dnwc + tax + intr), why: "the sign of ΔNWC: an increase in NWC absorbed cash, so it's added back to reach EBIT." },
        { text: pair(ebit + div), why: "dividends paid are a financing flow: they're not part of CFO." },
        { text: pair(cfo - da + dnwc), why: "taxes and interest paid are inside CFO: add them back." }
      ],
      solution: [`EBIT = CFO − D&A + ΔNWC + taxes paid + interest paid = ${n0(cfo)} − ${n0(da)} + ${n0(dnwc)} + ${n0(tax)} + ${n0(intr)} = ${n0(ebit)} k€.`, `Revenues = EBIT + cost of sales + other operating + G&A = ${n0(ebit)} + ${n0(costs)} = ${n0(ebit + costs)} k€.`, "Dividends paid are financing: ignore them."]
    });
  }

  // Income statement by nature: EBIT and net financial expenses, with distracting balance sheet data.
  function byNature(r) {
    for (let t = 0; t < 60; t++) {
      const q = step(r, 2000000, 9000000, 500000), price = r.pick([20, 25, 40, 50]), rev = q * price;
      const unpaid = step(r, 100000, Math.round(q * 0.2), 100000);
      const rmI = step(r, 300000, 900000, 100000), rmF = step(r, 300000, 1500000, 100000);
      const used = Math.round(rev * r.int(40, 50) / 100 / 100000) * 100000, purch = used + (rmF - rmI);
      const dfg = step(r, -2000000, 5000000, 500000), rent = step(r, 0, 10000000, 1000000);
      const staff = Math.round(rev * r.int(10, 15) / 100 / 1e6) * 1e6, da = Math.round(rev * r.int(8, 12) / 100 / 1e6) * 1e6, opex = Math.round(rev * r.int(5, 9) / 100 / 1e6) * 1e6;
      const ebit = rev + rent + dfg - used - staff - da - opex;
      const finInc = step(r, 100000, 3000000, 100000), nfe = step(r, 500000, Math.max(500000, Math.round(ebit * 0.4)), 100000);
      if (ebit < 5e6 || ebit - nfe <= 0 || rmF === rmI || dfg === 0 || rent === 0) continue;
      const m = x => `${n2(x / 1e6)} mln €`;
      const pair = (e, n) => `EBIT = ${m(e)}; net financial expenses = ${m(n)}`;
      const ebt = ebit - nfe;
      return exam(r, {
        pattern: "EBIT from an income statement by nature",
        doc: table(`Company B · ${Y} data (€)`, "Panels", [["Units sold", q], ["Of which paid by customers next year", unpaid], ["Price (€/unit)", price], ["Purchases of raw materials", purch], ["Raw materials inventory (initial)", rmI], ["Raw materials inventory (final)", rmF], ["Changes in inventories of finished goods and WIP (f−i)", dfg], ["Income from renting an owned building", rent], ["Cost of personnel", staff], ["D&A", da], ["Other operating expenses", opex], ["Trade receivables (final)", step(r, 1e7, 3e7, 1e6)], ["Trade payables (final)", step(r, 2e7, 6e7, 1e6)], ["Financial expenses", nfe + finInc], ["EBT", ebt]]),
        question: "Compute the operating profit (EBIT) and the net financial expenses.",
        right: pair(ebit, nfe),
        mistakes: [
          { text: pair(ebit - unpaid * price, nfe), why: "units sold but paid next year are still this year's revenue (accrual)." },
          { text: pair(ebit - (rmF - rmI), nfe), why: "raw materials used = purchases − (final − initial inventory), not the purchases." },
          { text: pair(ebit, nfe + finInc), why: "EBIT − EBT gives the NET financial expenses; the gross financial expenses include the financial income." },
          { text: pair(ebit - rent, nfe), why: "rent from an owned building is other operating income: it's inside EBIT." },
          { text: pair(ebit - dfg, nfe), why: "the change in finished goods inventories (f−i) is added in an income statement by nature." }
        ],
        solution: [`Revenues = units × price = ${n0(q)} × €${price} = ${m(rev)} (all units sold this year, paid or not).`, `Raw materials used = ${n0(purch)} − (${n0(rmF)} − ${n0(rmI)}) = ${m(used)}.`, `EBIT = ${m(rev)} + rent ${m(rent)} + ΔFG ${m(dfg)} − RM ${m(used)} − personnel ${m(staff)} − D&A ${m(da)} − other ${m(opex)} = ${m(ebit)}.`, `Net financial expenses = EBIT − EBT = ${m(ebit)} − ${m(ebt)} = ${m(nfe)}. Receivables and payables don't enter the income statement.`]
      });
    }
    throw new Error("byNature");
  }

  // From the margins to D&A and cash flow from operations (quality of operating earnings).
  function qualityOfEarnings(r) {
    const purch = step(r, 20000, 50000, 1000), drm = step(r, 2000, Math.round(purch * 0.5), 1000), rm = purch - drm;
    const share = r.pick([0.25, 0.3, 0.4, 0.5]), cogs = rm / share, gp = step(r, 15000, 40000, 1000), rev = gp + cogs;
    const ros = r.pick([0.1, 0.12, 0.15, 0.18]), em = ros + r.pick([0.03, 0.05, 0.07]), q = r.pick([1.1, 1.2, 1.3, 1.5]);
    const ebit = rev * ros, da = rev * em - ebit, cfo = ebit * q;
    const pair = (d, c) => `D&A = ${n2(d / 1000)} mln €; CFO = ${n2(c / 1000)} mln €`;
    const rmBad = purch + drm, revBad = gp + rmBad / share;
    return exam(r, {
      pattern: "Margins and quality of operating earnings",
      doc: table("Company A · financial data (k€)", "Sweets", [["Gross profit", gp], ["Purchase of raw materials", purch], ["Delta inventories of raw materials (f−i)", drm], ["Income taxes", step(r, 1000, 3000, 100)], ["Net financial expenses", step(r, 200, 900, 50)], ["Raw materials as a share of cost of sales", p2(share)], ["ROS (operating profit margin)", p2(ros)], ["EBITDA margin", p2(em)], ["Quality of operating earnings (CFO ÷ EBIT)", q]]),
      question: "Which answer is correct?",
      right: pair(da, cfo),
      mistakes: [
        { text: pair(revBad * em - revBad * ros, revBad * ros * q), why: "raw materials used = purchases − Δinventories (f−i); adding the change inflates everything." },
        { text: pair(da, ebit / q), why: "quality of operating earnings = CFO ÷ EBIT, so CFO = EBIT × quality, not ÷." },
        { text: pair(gp * em - gp * ros, gp * ros * q), why: "the margins apply to revenues, not to gross profit." }
      ],
      solution: [`Raw materials used = ${n0(purch)} − ${n0(drm)} = ${n0(rm)}; cost of sales = ${n0(rm)} ÷ ${p2(share)} = ${n0(cogs)}.`, `Revenues = gross profit + cost of sales = ${n0(gp)} + ${n0(cogs)} = ${n0(rev)}.`, `EBIT = ${n0(rev)} × ${p2(ros)} = ${n2(ebit)}; EBITDA = × ${p2(em)} = ${n2(rev * em)}; D&A = EBITDA − EBIT = ${n2(da)}.`, `CFO = EBIT × ${q} = ${n2(cfo)} (k€).`]
    });
  }

  // ROE from total assets, liabilities, turnover, margins and taxes (and the inverse: ROS, ROA).
  function ratiosFromAssets(r) {
    for (let t = 0; t < 60; t++) {
      const ta = step(r, 100, 300, 10), tl = step(r, 40, Math.round(ta * 0.7), 10), atr = r.pick([1.25, 1.5, 1.9, 2, 2.5]), tax = r.pick([0.3, 0.35, 0.4]);
      const ros = r.pick([0.08, 0.1, 0.12, 0.15]), fi = r.int(1, 3), fe = r.int(4, 10);
      const eq = ta - tl, rev = ta * atr, ebit = rev * ros, ebt = ebit + fi - fe, np = ebt * (1 - tax);
      if (ebt <= 0) continue;
      const kind = r.pick(["roe", "roe", "ros", "roa"]);
      const base = [["Total assets", ta], ["Total (current + non-current) liabilities", tl], ["Asset turnover ratio", atr], ["Tax rate", p2(tax)], ["Financial income", fi], ["Financial expenses", fe]];
      if (kind === "roe") return exam(r, {
        pattern: "ROE from the ratios",
        doc: table("Company Alpha (mln €)", "No access to the statements", base.concat([["ROS (EBIT margin)", p2(ros)], ["Dividends distributed", r.int(1, 4)]])),
        question: "What is the ROE?", right: `ROE = ${p2(np / eq)}`,
        mistakes: [
          { text: `ROE = ${p2(ebt / eq)}`, why: "taxes were forgotten: net profit = EBT × (1 − tax rate)." },
          { text: `ROE = ${p2(np / ta)}`, why: "equity = total assets − liabilities, not total assets." },
          { text: `ROE = ${p2((ebit * (1 - tax)) / eq)}`, why: "financial income and expenses come between EBIT and EBT." },
          { text: `ROE = ${p2((ebit + fe - fi) * (1 - tax) / eq)}`, why: "financial expenses are subtracted and financial income added, not the reverse." }
        ],
        solution: [`Equity = ${ta} − ${tl} = ${eq}; revenues = ${ta} × ${atr} = ${n2(rev)}.`, `EBIT = ${n2(rev)} × ${p2(ros)} = ${n2(ebit)}; EBT = ${n2(ebit)} + ${fi} − ${fe} = ${n2(ebt)}.`, `Net profit = ${n2(ebt)} × (1 − ${p2(tax)}) = ${n2(np)}; ROE = ${n2(np)} ÷ ${eq} = ${p2(np / eq)}. Dividends don't matter here.`]
      });
      const roe = np / eq;
      if (kind === "ros") return exam(r, {
        pattern: "ROS from net profit",
        doc: table("Company Alfa (mln €)", "Construction", base.concat([["Net profit", n2(np)]])),
        question: "What is the EBIT margin (ROS)?", right: `ROS = ${p2(ros)}`,
        mistakes: [
          { text: `ROS = ${p2(np / (1 - tax) / rev)}`, why: "that's EBT ÷ revenues: add back the net financial expenses to reach EBIT." },
          { text: `ROS = ${p2((np + fe - fi) / rev)}`, why: "taxes were forgotten: EBT = net profit ÷ (1 − tax rate)." },
          { text: `ROS = ${p2(np / rev)}`, why: "that's the net profit margin, not the EBIT margin." }
        ],
        solution: [`Revenues = ${ta} × ${atr} = ${n2(rev)}.`, `EBT = ${n2(np)} ÷ (1 − ${p2(tax)}) = ${n2(ebt)}; EBIT = EBT − ${fi} + ${fe} = ${n2(ebit)}.`, `ROS = ${n2(ebit)} ÷ ${n2(rev)} = ${p2(ros)}.`]
      });
      return exam(r, {
        pattern: "ROA from ROE",
        doc: table("Company Alpha (mln €)", "You know ROE", base.concat([["ROE", p2(roe)]])),
        question: "What is the ROA (EBIT ÷ total assets)?", right: `ROA = ${p2(ebit / ta)}`,
        mistakes: [
          { text: `ROA = ${p2(np / ta)}`, why: "in the course ROA uses EBIT at the numerator (ROA = ROS × ATR)." },
          { text: `ROA = ${p2(ros)}`, why: "that's ROS; ROA = ROS × asset turnover." },
          { text: `ROA = ${p2(np / (1 - tax) / ta)}`, why: "that's EBT ÷ total assets: add back the net financial expenses." }
        ],
        solution: [`Equity = ${eq}; net profit = ROE × equity = ${n2(np)}; EBT = ${n2(np)} ÷ (1 − ${p2(tax)}) = ${n2(ebt)}.`, `EBIT = EBT − ${fi} + ${fe} = ${n2(ebit)}; ROA = EBIT ÷ total assets = ${n2(ebit)} ÷ ${ta} = ${p2(ebit / ta)} (= ROS ${p2(ros)} × ATR ${atr}).`]
      });
    }
    throw new Error("ratiosFromAssets");
  }

  // Rebuilding the income statement upwards from net profit.
  function fromNetProfit(r) {
    const np = step(r, 5000, 12000, 100), tax = step(r, 2000, 6000, 100), fe = step(r, 300, 1200, 50), fi = step(r, 100, fe - 100, 50);
    const da = step(r, 2000, 10000, 500), imp = r.chance(0.5) ? step(r, 500, 2500, 100) : 0, sga = step(r, 8000, 16000, 500), ooe = step(r, 0, 1200, 100), ooi = step(r, 300, 1200, 100), cogs = step(r, 20000, 80000, 500);
    const ebt = np + tax, ebit = ebt + fe - fi, ebitda = ebit + da + imp, gp = ebit + sga + ooe - ooi, rev = gp + cogs;
    const ask = r.pick(["ebitda", "gp"]);
    const rows = [["Other operating income", ooi], ["Other operating expenses", ooe], ["Cost of goods sold", cogs], ["Selling, general & administrative expenses", sga], ["D&A of tangible and intangible assets", da]].concat(imp ? [["Impairment of goodwill", imp]] : []).concat([["Change in trade receivables (f−i)", step(r, 50, 900, 10)], ["Change in trade payables (f−i)", step(r, -900, 900, 10)], ["Financial expenses", fe], ["Financial income", fi], ["Income taxes", tax], ["Net profit", np]]);
    const doc = table(`Company A · ${Y} (k€)`, "From the annual report", rows);
    if (ask === "ebitda") {
      const pair = (a, b) => `EBITDA = ${n0(a)} k€; EBIT = ${n0(b)} k€`;
      return exam(r, {
        pattern: "Income statement from net profit upwards", doc, question: "Which statement is correct?", right: pair(ebitda, ebit),
        mistakes: [
          imp ? { text: pair(ebit + da, ebit), why: "the goodwill impairment is a non-cash cost below EBITDA, like D&A: add it back too." } : null,
          { text: pair(ebitda - (fe - fi), ebt), why: "EBIT = EBT + net financial expenses, not EBT." },
          { text: pair(ebitda - 2 * (fe - fi), ebt - (fe - fi)), why: "net financial expenses are added back to EBT, not subtracted." },
          { text: pair(np + da + imp, np), why: "start from EBT = net profit + income taxes." }
        ].filter(Boolean),
        solution: [`EBT = net profit + taxes = ${n0(np)} + ${n0(tax)} = ${n0(ebt)}.`, `EBIT = EBT + (financial expenses − income) = ${n0(ebt)} + ${n0(fe - fi)} = ${n0(ebit)}.`, `EBITDA = EBIT + D&A${imp ? " + impairment" : ""} = ${n0(ebitda)}. Changes in receivables and payables are cash flow data: ignore them.`]
      });
    }
    const pair = (a, b) => `Gross profit = ${n0(a)} k€; Revenues = ${n0(b)} k€`;
    return exam(r, {
      pattern: "Income statement from net profit upwards", doc, question: "Which statement is correct?", right: pair(gp, rev),
      mistakes: [
        { text: pair(gp + 2 * ooi, rev + 2 * ooi), why: "other operating income raises EBIT, so it's subtracted to go back up to gross profit." },
        { text: pair(ebt + sga + ooe - ooi, ebt + sga + ooe - ooi + cogs), why: "EBIT = EBT + net financial expenses, not EBT." },
        { text: pair(gp + da + imp, rev + da + imp), why: "in a statement by function D&A is already inside COGS and SG&A: don't add it again." },
        { text: pair(gp - ooe, rev - ooe), why: "other operating expenses sit between gross profit and EBIT: add them back." }
      ],
      solution: [`EBT = ${n0(np)} + ${n0(tax)} = ${n0(ebt)}; EBIT = ${n0(ebt)} + ${n0(fe - fi)} = ${n0(ebit)}.`, `Gross profit = EBIT + SG&A + other operating expenses − other operating income = ${n0(ebit)} + ${n0(sga)} + ${n0(ooe)} − ${n0(ooi)} = ${n0(gp)}.`, `Revenues = gross profit + COGS = ${n0(gp)} + ${n0(cogs)} = ${n0(rev)}.`]
    });
  }

  // Net profit and cash flow from operations (income statement by nature + indirect CFO).
  function profitAndCfo(r) {
    const rev = step(r, 50000, 110000, 1000), en = Math.round(rev * r.int(10, 30) / 100 / 1000) * 1000, rm = Math.round(rev * r.int(10, 40) / 100 / 1000) * 1000;
    const st = Math.round(rev * r.int(8, 15) / 100 / 1000) * 1000, da = Math.round(rev * r.int(5, 10) / 100 / 1000) * 1000, imp = step(r, 0, 3000, 500);
    const fi = step(r, 5, 1000, 5), fe = step(r, 50, 6000, 5), tr = r.pick([0.24, 0.3, 0.38]), taxPaid = step(r, 1000, 8000, 500), intPaid = step(r, 40, Math.max(40, fe), 10);
    const dInv = -step(r, 0, 1600, 8), dRec = -step(r, 0, 2100, 100), dPay = step(r, -700, 1400, 100);
    const ebit = rev - en - rm - st - da - imp, ebt = ebit + fi - fe, taxes = ebt * tr, np = ebt - taxes;
    const cfo = ebit + da + imp + dInv + dRec + dPay - intPaid - taxPaid;
    const pair = (a, b) => `Net profit = ${n0(a)} M€; CFO = ${n0(b)} M€`;
    return exam(r, {
      pattern: "Net profit and cash flow from operations",
      doc: table(`Alpha · ${Y} (M€)`, "Power generation", [["Revenues", rev], ["Cost of energy and fuels", en], ["Cost of raw materials consumed", rm], ["Personnel cost", st], ["D&A", da], ["Impairment", imp], ["Financial income (accrued)", fi], ["Financial expenses (accrued)", fe], ["Tax rate", p2(tr)], ["Income taxes paid", taxPaid], ["Interests paid", intPaid], ["Changes in inventories of raw materials (initial − final)", dInv], ["Changes in receivables (initial − final)", dRec], ["Changes in payables (final − initial)", dPay]]),
      question: "Which statement is correct?", right: pair(np, cfo),
      mistakes: [
        { text: pair(ebt - taxPaid, cfo), why: "net profit uses the accrued taxes (EBT × tax rate), not the taxes paid." },
        { text: pair(np, cfo - imp), why: "impairment is non-cash, like D&A: add it back in CFO." },
        { text: pair(np, cfo - 2 * dRec), why: "the change in receivables is already given as (initial − final): add it as it is." },
        { text: pair(np, cfo + taxPaid - taxes), why: "CFO uses the taxes actually paid, not the accrued ones." }
      ],
      solution: [`EBIT = ${n0(rev)} − ${n0(en)} − ${n0(rm)} − ${n0(st)} − ${n0(da)} − ${n0(imp)} = ${n0(ebit)}; EBT = ${n0(ebit)} + ${n0(fi)} − ${n0(fe)} = ${n0(ebt)}.`, `Taxes = ${n0(ebt)} × ${p2(tr)} = ${n0(taxes)}; net profit = ${n0(np)}.`, `CFO = EBIT + D&A + impairment + Δinventories(i−f) + Δreceivables(i−f) + Δpayables(f−i) − interest paid − taxes paid = ${n0(cfo)}.`]
    });
  }

  // NFP / EBITDA from D/E and ROE.
  function nfpEbitda(r) {
    const ebit = step(r, 20, 60, 1), da = step(r, 2, 10, 1), nfe = step(r, 1, 4, 1), taxes = step(r, 3, Math.round((ebit - nfe) * 0.5), 1);
    const cash = step(r, 2, 15, 1), de = r.pick([1.5, 2, 2.5, 2.9, 3.2]), roe = r.pick([0.12, 0.15, 0.18, 0.2]);
    const ni = ebit - nfe - taxes, eq = ni / roe, d = de * eq, nfp = d - cash, ebitda = ebit + da;
    const lt = Math.round(d * r.int(40, 70) / 100);
    const v = x => `NFP / EBITDA ≈ ${n2(x)}`;
    return exam(r, {
      pattern: "NFP / EBITDA",
      doc: table(`Company Gamma · ${Y} (k€)`, "Reclassified statements", [["Cash and cash equivalents", cash], ["Long-term financial debts", lt], ["D&A", da], ["EBIT", ebit], ["Net financial expenses", nfe], ["EBT", ebit - nfe], ["Income taxes", taxes], ["D/E (financial liabilities only)", de], ["ROE", p2(roe)]]),
      question: "NFP / EBITDA is approximately…", right: v(nfp / ebitda),
      mistakes: [
        { text: v(d / ebitda), why: "NFP = financial debts − cash." },
        { text: v(nfp / ebit), why: "EBITDA = EBIT + D&A." },
        { text: v((lt - cash) / ebitda), why: "the long-term debts are only part of D: get total financial debt from D/E × equity." }
      ],
      solution: [`Net income = EBT − taxes = ${n2(ni)}; equity = ${n2(ni)} ÷ ${p2(roe)} = ${n2(eq)}.`, `D = ${de} × ${n2(eq)} = ${n2(d)}; NFP = D − cash = ${n2(nfp)}.`, `EBITDA = ${ebit} + ${da} = ${ebitda}; NFP / EBITDA = ${n2(nfp / ebitda)}.`]
    });
  }

  // DSO from the current ratio.
  function dsoFromCurrentRatio(r) {
    for (let t = 0; t < 60; t++) {
      const inv = step(r, 2, 6, 0.1), cogs = step(r, 60, 100, 1), per = step(r, 5, 12, 0.1), ebit = step(r, 40, 100, 0.1);
      const cl = step(r, 12, 25, 0.1), cash = step(r, 2, 8, 0.1), cfa = step(r, 0, 2, 0.1), cr = r.pick([1.6, 1.89, 2, 2.1, 2.4]);
      const rev = ebit + per + cogs, ca = cr * cl, rec = ca - inv - cash - cfa;
      if (rec <= 3) continue;
      const v = x => `DSO ≈ ${d1(x)}`;
      return exam(r, {
        pattern: "DSO from the current ratio",
        doc: table(`Company Delta · ${Y} (mln €)`, "VAT 0%, no other operating income", [["Inventories", inv], ["Cost of goods sold", cogs], ["Period costs", per], ["D&A", step(r, 10, 30, 1)], ["Interests", step(r, 2, 8, 1)], ["Taxes", step(r, 5, 20, 1)], ["EBIT", ebit], ["Current liabilities", cl], ["Cash and cash equivalents", cash], ["Current financial assets", cfa], ["Current ratio", cr]]),
        question: "DSO (365 days) is approximately…", right: v(rec / rev * 365),
        mistakes: [
          { text: v(rec / (ebit + cogs) * 365), why: "revenues = EBIT + period costs + COGS." },
          { text: v((ca - inv) / rev * 365), why: "receivables = current assets − inventories − cash − current financial assets." },
          { text: v(rec / rev * 360), why: "the question asks for 365 days." }
        ],
        solution: [`Revenues = EBIT + period costs + COGS = ${n2(ebit)} + ${n2(per)} + ${n2(cogs)} = ${n2(rev)}.`, `Current assets = ${cr} × ${n2(cl)} = ${n2(ca)}; receivables = ${n2(ca)} − ${n2(inv)} − ${n2(cash)} − ${n2(cfa)} = ${n2(rec)}.`, `DSO = ${n2(rec)} ÷ ${n2(rev)} × 365 = ${d1(rec / rev * 365)}.`]
      });
    }
    throw new Error("dso");
  }

  // Average cost of financial debt.
  function costOfDebt(r) {
    for (let t = 0; t < 80; t++) {
      const ta = step(r, 150, 400, 10), tpl = r.pick([0.5, 0.6, 0.8, 1, 1.7]), ebit = step(r, 20, 60, 1), roi = r.pick([0.15, 0.18, 0.2, 0.25]);
      const roe = r.pick([0.1, 0.12, 0.15]), fi = step(r, 0, 6, 1), share = r.pick([0.6, 0.7, 0.8, 1]);
      const eq = ta / (1 + tpl), fl = ebit / roi - eq, ni = roe * eq, tax = step(r, 5, 20, 1), ebt = ni + tax, fe = ebit - ebt + fi, ie = fe * share;
      if (fl <= 5 || fe <= 0.5 || fl > ta - eq) continue;
      const v = x => `≈ ${p2(x)}`;
      return exam(r, {
        pattern: "Average cost of financial debt",
        doc: table(`GammaTech · ${Y} (mln €)`, "Electronic devices", [["Total assets", ta], ["Third-party liabilities / equity", tpl], ["EBIT", ebit], ["Income taxes", tax], ["ROE", p2(roe)], ["ROI (EBIT ÷ invested capital)", p2(roi)], ["Financial income", fi], ["Interest expenses as a share of financial expenses", p2(share)]]),
        question: "The average cost of financial debt (interest expenses ÷ financial debt) is…", right: v(ie / fl),
        mistakes: [
          { text: v((fe - fi) * share / fl), why: "use the interest expenses, not the net financial expenses." },
          share < 1 ? { text: v(fe / fl), why: "only the interest expenses count at the numerator, not all financial expenses." } : null,
          { text: v(ie / (ta - eq)), why: "the denominator is the financial debt only, not all third-party liabilities." },
          { text: v(ie / (ebit / roi)), why: "EBIT ÷ ROI is the invested capital (equity + financial debt): subtract equity." }
        ].filter(Boolean),
        solution: [`Equity = ${ta} ÷ (1 + ${tpl}) = ${n2(eq)}; financial debt = EBIT ÷ ROI − equity = ${n2(ebit / roi)} − ${n2(eq)} = ${n2(fl)}.`, `Net profit = ${p2(roe)} × ${n2(eq)} = ${n2(ni)}; EBT = ${n2(ni)} + ${tax} = ${n2(ebt)}.`, `Financial expenses = EBIT − EBT + financial income = ${n2(fe)}; interest = ${p2(share)} × ${n2(fe)} = ${n2(ie)}; cost of debt = ${n2(ie)} ÷ ${n2(fl)} = ${p2(ie / fl)}.`]
      });
    }
    throw new Error("costOfDebt");
  }

  // DSO from NOWC, inventory turnover and DPO.
  function dsoFromNowc(r) {
    for (let t = 0; t < 80; t++) {
      const ebit = step(r, 20000, 60000, 1000), ros = r.pick([0.12, 0.15, 0.16, 0.2]), rev = ebit / ros, itr = r.pick([12, 16, 17.61, 20]);
      const rmC = step(r, 30000, 60000, 1000), rmI = step(r, 2000, 5000, 500), rmF = step(r, 1000, 6000, 500), dpo = r.pick([60, 90, 120]);
      const inv = rev / itr, purch = rmC + rmF - rmI, pay = dpo * purch / 365, nowc = step(r, 5000, 30000, 1);
      const rec = nowc - inv + pay;
      const ca = step(r, 60000, 100000, 1000), cr = r.pick([1.3, 1.5, 1.6]), bank = step(r, 5000, 12000, 1000), bonds = step(r, 3000, 8000, 1000);
      const payWrong = ca / cr - bank - bonds, recWrong = nowc - inv + payWrong;
      if (rec <= 2000 || recWrong <= 0) continue;
      const v = x => `≈ ${Math.round(x)} days`;
      return exam(r, {
        pattern: "DSO from NOWC, ITR and DPO",
        doc: table(`Beta · ${Y} (k€)`, "Customers may pay later", [["Cost of raw materials consumed", rmC], ["EBIT", ebit], ["Current assets", ca], ["Current bank debts", bank], ["Current bonds", bonds], ["Raw materials inventory, 1 Jan", rmI], ["Raw materials inventory, 31 Dec", rmF], ["Current ratio", cr], ["ROS (EBIT margin)", p2(ros)], ["DPO (days, 365)", dpo], ["Inventory turnover (revenues ÷ inventories)", itr], ["NOWC (receivables − payables + inventories)", nowc]]),
        brief: "Trade payables refer only to raw material purchases. Other current liabilities exist but aren't given.",
        question: "How many days does Beta need, on average, to collect from customers (DSO, 365 days)?", right: v(rec / rev * 365),
        mistakes: [
          { text: v(recWrong / rev * 365), why: "payables can't come from current liabilities − financial debts: other current liabilities aren't negligible. Use DPO × purchases ÷ 365." },
          { text: v((nowc - inv + dpo * rmC / 365) / rev * 365), why: "purchases = consumption + (final − initial) inventories of raw materials." },
          { text: v((nowc - inv + dpo * (rmC - rmF + rmI) / 365) / rev * 365), why: "the inventory change has the wrong sign: purchases = consumption + (final − initial)." }
        ],
        solution: [`Revenues = EBIT ÷ ROS = ${n0(rev)}; inventories = ${n0(rev)} ÷ ${itr} = ${n2(inv)}.`, `Purchases = ${n0(rmC)} + (${n0(rmF)} − ${n0(rmI)}) = ${n0(purch)}; payables = ${dpo} × ${n0(purch)} ÷ 365 = ${n2(pay)}.`, `Receivables = NOWC − inventories + payables = ${n2(rec)}; DSO = ${n2(rec)} ÷ ${n0(rev)} × 365 = ${n2(rec / rev * 365)} days.`]
      });
    }
    throw new Error("dsoFromNowc");
  }

  // Budgeted ROE (or ROA) from NPM, tax, net financial expenses, leverage and ROA.
  function budgetRoe(r) {
    const rev = step(r, 300000, 9000000, 1000), npm = r.pick([0.04, 0.05, 0.06]), tax = r.pick([0.25, 0.3, 0.4]), nfe = Math.round(rev * r.int(1, 3) / 100 / 100) * 100;
    const lev = r.pick([2, 2.5, 3, 3.5]), roa = r.pick([0.08, 0.09, 0.1, 0.12]);
    const ni = npm * rev, ebt = ni / (1 - tax), ebit = ebt + nfe, taAssets = ebit / roa, eq = taAssets / (1 + lev);
    const v = x => `ROE ≈ ${p2(x)}`;
    const eqFrom = e => (e / roa) / (1 + lev);
    return exam(r, {
      pattern: "Budgeted ROE",
      doc: table(`BetaTech · budget ${Y + 1} (€)`, "Budget", [["Revenues", rev], ["Net profit margin", p2(npm)], ["Income tax rate", p2(tax)], ["Net financial expenses", nfe], ["Financial leverage (total liabilities ÷ equity)", lev], ["Current ratio", r.pick([1.2, 1.4])], ["ROA (EBIT ÷ total assets)", p2(roa)]]),
      question: "What is the budgeted ROE?", right: v(ni / eq),
      mistakes: [
        { text: v(ni / eqFrom(ni)), why: "ROA uses EBIT, not net income, to get total assets." },
        { text: v(ni / eqFrom(ebt)), why: "EBIT = EBT + net financial expenses." },
        { text: v(ni / (taAssets / lev)), why: "leverage = liabilities ÷ equity, so equity = total assets ÷ (1 + leverage)." }
      ],
      solution: [`Net income = ${p2(npm)} × ${n0(rev)} = ${n2(ni)}; EBT = ${n2(ni)} ÷ (1 − ${p2(tax)}) = ${n2(ebt)}; EBIT = EBT + ${n0(nfe)} = ${n2(ebit)}.`, `Total assets = EBIT ÷ ROA = ${n2(taAssets)}; equity = ${n2(taAssets)} ÷ (1 + ${lev}) = ${n2(eq)}.`, `ROE = ${n2(ni)} ÷ ${n2(eq)} = ${p2(ni / eq)}.`]
    });
  }

  // Net profit margin from DSO, DPO and NOWC.
  function npmFromDays(r) {
    for (let t = 0; t < 80; t++) {
      const purch = step(r, 10000, 30000, 1000), dpo = r.pick([73, 91.25, 146, 182.5]), dso = r.pick([36.5, 54.75, 73]), inv = step(r, 2000, 8000, 500), nowc = step(r, 5000, 20000, 1000);
      const pay = dpo * purch / 365, rec = nowc + pay - inv, rev = rec * 365 / dso;
      const cogs = Math.round(rev * r.int(35, 50) / 100 / 1000) * 1000, sga = Math.round(rev * r.int(15, 30) / 100 / 1000) * 1000, ebit = rev - cogs - sga;
      const tr = r.pick([0.25, 0.3]), ebt = Math.round(ebit * r.int(30, 80) / 100 / 100) * 100, taxes = ebt * tr, ni = ebt - taxes;
      if (rec <= 0 || ebit <= 0 || ebt <= 0) continue;
      const payW = dpo * cogs / 365, revW = (nowc + payW - inv) * 365 / dso;
      const v = x => `NPM ≈ ${p2(x)}`;
      return exam(r, {
        pattern: "NPM from DSO and DPO",
        doc: table(`Delta · ${Y} (M€)`, "Energy", [["DPO (365)", `${dpo} days`], ["DSO (365)", `${dso} days`], ["Inventories", inv], ["Purchases of raw materials", purch], ["NOWC", nowc], ["Cost of goods sold", cogs], ["SG&A", sga], ["D&A (inside COGS)", Math.max(100, Math.round(cogs * r.int(10, 30) / 100 / 100) * 100)], ["Income taxes", taxes], ["Tax rate", p2(tr)]]),
        brief: "No other operating costs or income; costs are paid when incurred, except raw materials.",
        question: "What is the net profit margin?", right: v(ni / rev),
        mistakes: [
          { text: v((ebit - taxes) / rev), why: "net income = EBT − taxes, and EBT = taxes ÷ tax rate (not EBIT)." },
          { text: v(ni / revW), why: "payables = DPO × purchases ÷ 365, not COGS." },
          { text: v(ebit / rev), why: "that's the EBIT margin: NPM uses net income." }
        ],
        solution: [`Payables = ${dpo} × ${n0(purch)} ÷ 365 = ${n2(pay)}; receivables = NOWC + payables − inventories = ${n2(rec)}.`, `Revenues = receivables × 365 ÷ DSO = ${n2(rev)}.`, `EBT = taxes ÷ tax rate = ${n2(ebt)}; net income = ${n2(ni)}; NPM = ${p2(ni / rev)}.`]
      });
    }
    throw new Error("npm");
  }

  // Financial leverage formula: ROE after a change in ROI.
  function leverageShock(r) {
    for (let t = 0; t < 80; t++) {
      const ebit = step(r, 80, 200, 10), d = step(r, 400, 1600, 100), e = step(r, 200, 800, 50), s = r.pick([0.6, 0.7, 0.8]);
      const roi = ebit / (d + e), rTrue = r.int(20, 80) / 1000, roe = (roi + d / e * (roi - rTrue)) * s, drop = r.pick([0.01, 0.02, 0.03]);
      const roi2 = roi - drop, roe2 = (roi2 + d / e * (roi2 - rTrue)) * s;
      const v = x => `ROE ≈ ${p2(x)}`;
      if (roe <= 0) continue;
      return exam(r, {
        pattern: "Financial leverage formula",
        doc: table(`Company ALFA · ${Y} (k€)`, "ROE = [ROI + D/E × (ROI − r)] × s", [["EBIT", ebit], ["Financial liabilities", d], ["Non-financial liabilities", 0], ["Equity", e], ["ROE", p2(roe)], ["s", s]]),
        question: `What would ROE become if ROI fell by ${drop * 100} percentage point${drop === 0.01 ? "" : "s"}?`, right: v(roe2),
        mistakes: [
          { text: v(roe2 / s), why: "don't forget the multiplier s." },
          { text: v(roe * roi2 / roi), why: "ROE doesn't move proportionally to ROI: leverage amplifies the change by (1 + D/E) × s." },
          { text: v(roe - drop), why: "the change in ROE is (1 + D/E) × s times the change in ROI." }
        ],
        solution: [`ROI = ${ebit} ÷ (${d} + ${e}) = ${p2(roi)}.`, `From ROE: r = ROI − (ROE ÷ s − ROI) × E/D = ${p2(rTrue)}.`, `New ROI = ${p2(roi2)}; ROE = [${p2(roi2)} + ${n2(d / e)} × (${p2(roi2)} − ${p2(rTrue)})] × ${s} = ${p2(roe2)}.`]
      });
    }
    throw new Error("leverage");
  }

  // Capital expenditures, carrying amounts and D&A (instalments and the year of purchase).
  function capex(r) {
    const life = r.pick([5, 8, 10, 15]), cost = life * step(r, 10000, 40000, 1000), dep = cost / life, rest = r.pick([0.15, 0.2, 0.3, 0.6]);
    const eq = step(r, 20000, 60000, 5000), eqLife = r.pick([4, 5]), paidNow = r.pick([0.25, 0.4, 0.5]), cfo = step(r, 60000, 200000, 625);
    const capexY = rest * cost + paidNow * eq, carrying = cost - 3 * dep, da2 = dep + eq / eqLife;
    const pair = (c, k) => `Carrying amount end ${Y + 1} = €${n0(c)}; CAPEX ${Y} = €${n0(k)}`;
    return exam(r, {
      pattern: "CAPEX and carrying amounts",
      doc: { kind: `Ceramics Ltd · budget ${Y} (€)`, title: "Investments", lines: [["D&A of the year", n0(dep)], ["Cash flow from operating activities", n0(cfo)]], facts: [
        `The D&A refers only to a line bought on 1 January ${Y - 1}, depreciated flat over ${life} years; ${rest * 100}% of its price is still to be paid in the first months of ${Y}.`,
        `On 31 December ${Y} the company buys equipment for €${n0(eq)} (${eqLife} years, depreciated from ${Y + 1}); ${paidNow * 100}% is paid at purchase, the rest in ${Y + 1}.`] },
      question: "Which statement is correct?", right: pair(carrying, capexY),
      mistakes: [
        { text: pair(cost - 2 * dep, capexY), why: `${Y - 1}, ${Y} and ${Y + 1}: three years of depreciation by the end of ${Y + 1}.` },
        { text: pair(carrying, paidNow * eq), why: `CAPEX counts the cash paid in ${Y} for both assets, including the line's last instalment.` },
        { text: pair(carrying, rest * cost + eq), why: "CAPEX is the cash actually paid in the year, not the full price of the new equipment." }
      ],
      solution: [`Price of the line = D&A × life = €${n0(dep)} × ${life} = €${n0(cost)}; after ${Y - 1}, ${Y} and ${Y + 1}: €${n0(cost)} − 3 × €${n0(dep)} = €${n0(carrying)}.`, `CAPEX ${Y} = ${rest * 100}% × €${n0(cost)} + ${paidNow * 100}% × €${n0(eq)} = €${n0(capexY)}.`, `Also: D&A ${Y + 1} = €${n0(dep)} + €${n0(eq / eqLife)} = €${n0(da2)}; CAPEX coverage ${Y} = CFO ÷ CAPEX = ${p2(cfo / capexY)}.`]
    });
  }

  // Payout ratio from the cash flow statement.
  function payoutFromCash(r) {
    for (let t = 0; t < 80; t++) {
      const cfo = step(r, 80, 200, 10), cov = r.pick([1.25, 1.6, 2]), disp = step(r, 0, 40, 5), shares = step(r, 5000, 20000, 1000), price = r.pick([10, 12, 15]), paid = r.pick([0.6, 0.8, 1]);
      const repaid = step(r, 20, 90, 10), dCash = step(r, 10, 60, 5), ni = step(r, 60, 150, 5), prevShare = r.pick([0.8, 0.9, 1.25]);
      const cfi = disp - cfo / cov, equityIn = shares * price * paid / 1000, div = cfo + cfi - repaid + equityIn - dCash, niPrev = ni * prevShare;
      const fin = step(r, 10, 30, 5);
      if (div <= 5) continue;
      const v = x => `Payout ratio ≈ ${p2(x)}`;
      const divFull = cfo + cfi - repaid + shares * price / 1000 - dCash;
      return exam(r, {
        pattern: "Payout ratio from the cash flow statement",
        doc: { kind: `AABB · ${Y} (k€)`, title: "Payout = dividends ÷ previous year's net income", lines: [["Cash flow from operating activities", cfo], ["CAPEX coverage ratio (CFO ÷ CAPEX)", cov], ["Cash from disposals of assets", disp], ["Interest received (already in CFO)", fin], ["Change in cash and cash equivalents", dCash], ["Net income " + Y, ni]].map(([k, x]) => [k, String(x)]), facts: [
          `${n0(shares)} new shares issued at €${price}; ${paid * 100}% paid by year end.`, `A bank debt of ${repaid} k€ was repaid; no new debt.`, `Net income ${Y - 1} = ${prevShare * 100}% of net income ${Y}.`] },
        question: `What is the payout ratio in ${Y}?`, right: v(div / niPrev),
        mistakes: [
          divFull > 0 ? { text: v(divFull / niPrev), why: "only the share capital actually paid in is a cash inflow." } : null,
          div - fin > 0 ? { text: v((div - fin) / niPrev), why: "interest received is already inside CFO: don't count it again in financing." } : null,
          { text: v(div / ni), why: `the payout divides this year's dividends by last year's net income (${Y - 1}).` }
        ].filter(Boolean),
        solution: [`CAPEX = CFO ÷ coverage = ${n2(cfo / cov)}; investing = ${disp} − ${n2(cfo / cov)} = ${n2(cfi)}.`, `Financing = −${repaid} + ${n2(equityIn)} − dividends; Δcash ${dCash} = ${cfo} + (${n2(cfi)}) + financing → dividends = ${n2(div)}.`, `Net income ${Y - 1} = ${n2(niPrev)}; payout = ${n2(div)} ÷ ${n2(niPrev)} = ${p2(div / niPrev)}.`]
      });
    }
    throw new Error("payout");
  }

  // ---------- Consolidation, exam level ----------

  // Goodwill with fair value adjustments and deferred taxes (full or partial).
  function goodwillMc(r) {
    for (let t = 0; t < 80; t++) {
      const own = r.pick([0.6, 0.7, 0.75, 0.8]), sEq = step(r, 60000, 150000, 1000), N = r.pick([20000, 40000, 50000]), price = Math.round(sEq * (1 + r.int(8, 30) / 100) / N * 100) / 100;
      const inv = own * N * price, a = step(r, 300, 3000, 100), b = step(r, 100, 1500, 100), tx = r.pick([0.25, 0.3, 0.4, 0.5]);
      const surplus = a - b - a * tx + b * tx, full = r.chance(0.6);
      const nci = full ? (1 - own) * N * price : (1 - own) * (sEq + surplus), gw = full ? inv + nci - sEq - surplus : inv - own * (sEq + surplus);
      if (gw <= 0) continue;
      const v = (g, n) => `Goodwill = ${n2(g)}; NCI = ${n2(n)}`;
      const nciOther = full ? (1 - own) * (sEq + surplus) : (1 - own) * N * price;
      return exam(r, {
        pattern: "Goodwill and NCI",
        doc: { kind: "Acquisition data (€)", title: `The parent buys ${own * 100}% of Sub`, lines: [["Price paid for the stake", n2(inv)], ["Sub's equity (book value)", n0(sEq)], ["Sub's shares", n0(N)], ["Market price per share", `€${price}`], ["Fair value − book value, PPE", `+${n0(a)}`], ["Fair value − book value, non-current liabilities", `+${n0(b)}`], ["Tax rate", p2(tx)]], facts: [full ? "NCI measured at fair value (full goodwill)." : "NCI measured at the proportionate share of net assets (partial goodwill)."] },
        question: "Which pair is correct?", right: v(gw, nci),
        mistakes: [
          { text: v(full ? inv + nci - sEq - (a - b) : inv - own * (sEq + a - b), full ? nci : (1 - own) * (sEq + a - b)), why: "the fair value differences create deferred taxes: the net surplus is (PPE uplift − liability uplift) × (1 − tax rate)." },
          { text: v(full ? inv + nci - sEq : inv - own * sEq, full ? nci : (1 - own) * sEq), why: "the net surplus from fair values must be taken out of goodwill." },
          { text: v(full ? inv + nciOther - sEq - surplus : inv - own * (sEq + surplus), nciOther), why: full ? "with NCI at fair value, NCI = shares not owned × market price." : "with the proportionate method, NCI = its share of the net assets at fair value." },
          { text: v(full ? inv - sEq - surplus : inv + nci - (sEq + surplus), nci), why: full ? "full goodwill = price paid + NCI − (equity + net surplus)." : "partial goodwill compares the price only with the parent's share of the net assets." }
        ],
        solution: [`Deferred tax liability = ${n0(a)} × ${p2(tx)} = ${n2(a * tx)}; deferred tax asset = ${n0(b)} × ${p2(tx)} = ${n2(b * tx)}; net surplus = ${n2(surplus)}.`, full ? `NCI (fair value) = ${p2(1 - own)} × ${n0(N)} × €${price} = ${n2(nci)}.` : `NCI (proportionate) = ${p2(1 - own)} × (${n0(sEq)} + ${n2(surplus)}) = ${n2(nci)}.`, full ? `Goodwill = ${n2(inv)} + ${n2(nci)} − ${n0(sEq)} − ${n2(surplus)} = ${n2(gw)}.` : `Goodwill = ${n2(inv)} − ${p2(own)} × (${n0(sEq)} + ${n2(surplus)}) = ${n2(gw)}.`]
      });
    }
    throw new Error("goodwill");
  }

  // Equity method over three years.
  function equityMc(r) {
    const p = r.pick([0.2, 0.25, 0.3, 0.35, 0.4]), cost = step(r, 300000, 900000, 10000);
    const f = [1, 2].map(() => ({ ni: step(r, 50000, 400000, 10000) * (r.chance(0.2) ? -1 : 1) })).map(x => Object.assign(x, { div: x.ni > 0 ? step(r, 0, Math.min(x.ni, 150000), 10000) : 0 }));
    const bv = f.reduce((b, x) => b + p * x.ni - p * x.div, cost);
    const v = (b, is) => `Investment end ${Y + 2} = ${n0(b)}; share of profit ${Y + 2} = ${n0(is)}`;
    const last = f[1];
    return exam(r, {
      pattern: "Equity method",
      doc: { kind: "Equity method ($)", title: `Pumpkin buys ${p * 100}% of Zombie at the end of ${Y}`, lines: [["Price paid", n0(cost)], [`${Y + 1}`, `net income ${n0(f[0].ni)} · dividends ${n0(f[0].div)}`], [`${Y + 2}`, `net income ${n0(last.ni)} · dividends ${n0(last.div)}`]] },
      question: "What does Pumpkin report?", right: v(bv, p * last.ni),
      mistakes: [
        { text: v(f.reduce((b, x) => b + p * x.ni + p * x.div, cost), p * last.ni), why: "dividends received reduce the investment (they're cash in, not extra value)." },
        { text: v(f.reduce((b, x) => b + x.ni - x.div, cost), last.ni), why: "only the investor's share of profit and dividends counts." },
        { text: v(cost, p * last.div), why: "the investment is adjusted every year; the income statement shows the share of profit, not the dividends." }
      ],
      solution: [`Book value(t) = book value(t−1) + ${p * 100}% × net income − ${p * 100}% × dividends.`, `End ${Y + 1}: ${n0(cost + p * f[0].ni - p * f[0].div)}; end ${Y + 2}: ${n0(bv)}.`, `Income statement ${Y + 2}: ${p * 100}% × ${n0(last.ni)} = ${n0(p * last.ni)}. Cash flow statement: +${n0(p * last.div)} of dividends.`]
    });
  }

  // ---------- Theory with a twist (events and their effects) ----------
  function eventsMcq(r) {
    const div = step(r, 3, 10, 1), dep = step(r, 5, 15, 1), cash = step(r, 60, 150, 10);
    return exam(r, {
      pattern: "Effects of events",
      doc: { kind: `Company C · 31 December ${Y} (mln €)`, title: "Next year's events", lines: [["Cash and cash equivalents", String(cash)], ["Net profit (this year)", String(step(r, 8, 20, 1))]], facts: [`Next year the company pays dividends of ${div} (out of this year's profit).`, `Next year's depreciation of PPE is ${dep}.`, "Ignore taxes."] },
      question: "What is the potential effect of these events next year?", right: `Next year's net profit may fall by ${dep}`,
      mistakes: [
        { text: `Next year's net profit may fall by ${div + dep}`, why: "dividends are a distribution of last year's profit, not a cost of next year." },
        { text: `Cash may fall to ${cash - div - dep}`, why: "depreciation is a non-cash cost: only the dividends use cash." },
        { text: `Bank debts may fall by ${div}`, why: "dividends are paid with cash; they don't change the debts." }
      ],
      solution: [`Dividends: this year's profit is distributed (equity down), cash −${div}. No effect on next year's profit.`, `Depreciation: PPE −${dep}, net profit −${dep}. No cash effect.`]
    });
  }

  const FA3 = [ebitFromCfo, byNature, qualityOfEarnings, ratiosFromAssets, fromNetProfit, profitAndCfo, nfpEbitda, dsoFromCurrentRatio, costOfDebt, dsoFromNowc, budgetRoe, npmFromDays, leverageShock, capex, payoutFromCash, eventsMcq];
  const CONS3 = [goodwillMc, equityMc];

  // The exam level of the desks mixes these in with the typed exercises.
  ST.PLAN.fa[3] = ST.PLAN.fa[3].concat(FA3, FA3);
  ST.PLAN.cons[3] = ST.PLAN.cons[3].concat(CONS3, CONS3);

  // A mock exam: financial accounting and consolidation questions, exam style.
  // With a career, the patterns seen longest ago come first, so back-to-back mocks differ.
  function mockExam(r, career) {
    const pickFA = () => O.freshOrder(r, FA3, f => "gen:mock:" + FA3.indexOf(f)).slice(0, 5).map(f => { O.remember("gen:mock:" + FA3.indexOf(f)); return f; });
    const fa = (career ? O.withMemory(career, pickFA) : r.shuffle(FA3).slice(0, 5)).map(f => f(r));
    const cons = [r.pick(CONS3)(r), ST.mcq("cons", 3)(r)];
    const theory = ST.mcq("fa", 3)(r);
    return r.shuffle(fa.concat(cons, [theory])).map((j, i) => Object.assign(j, { mock: true, n: i + 1 }));
  }

  const api = { exam, nums, tooClose, FA3, CONS3, mockExam, NONE, ebitFromCfo, byNature, qualityOfEarnings, ratiosFromAssets, fromNetProfit, profitAndCfo, nfpEbitda, dsoFromCurrentRatio, costOfDebt, dsoFromNowc, budgetRoe, npmFromDays, leverageShock, capex, payoutFromCash, goodwillMc, equityMc, eventsMcq };
  root.OfficeExam = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
