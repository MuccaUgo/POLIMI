/* PolimiAFC — financial analysis, steps 2 and 3 of the course path (Lectures 05–06):
   common size analysis (vertical and horizontal, relative changes) and financial planning
   (debt vs equity, matching maturities, credit lines, factoring, IFRS 16 leases, bonds, the tax shield).
   The Eni figures are those of the lecture slides (Annual Report 2025, € million).
   Loaded after office-exam.js: it adds its exercises to the financial analysis desk and the analyst's day. */
(function (root) {
  "use strict";
  const D = root.OfficeData, O = root.OfficeLogic, ST = root.OfficeStudy;
  const Y = D.Y;
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-US");
  const r2 = x => Math.round(x * 100) / 100;
  const pct2 = x => Math.round(x * 10000) / 100; // 0.12345 → 12.35 (%)
  const sgn = x => (x > 0 ? "+" : "") + fmt(x);
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));

  // ---------- Eni, from the slides (€ million) ----------
  const ENI = {
    bs: { // [2024, 2025]
      "Cash and cash equivalents": [8183, 8100],
      "Trade and other receivables": [16901, 12436],
      "Inventories": [6259, 5143],
      "Property, plant and equipment": [59864, 50536],
      "Right-of-use assets": [5822, 5184],
      "Intangible assets": [6434, 6022],
      "Equity-accounted investments": [14150, 13155],
      "Short-term debt": [4238, 4929],
      "Trade and other payables": [22092, 20261],
      "Long-term debt": [21570, 20139],
      "Provisions": [15774, 14580],
      "Total shareholders' equity": [55648, 52787]
    },
    totalAssets: [146939, 137069],
    is: {
      "Purchases, services and other": [71114, 67056],
      "Payroll and related costs": [3262, 3229],
      "Depreciation and amortization": [7600, 7349],
      "Operating profit": [5238, 5010],
      "Income taxes": [3725, 3020],
      "Profit": [2764, 2758]
    },
    revenues: [91214, 83629]
  };

  // ---------- Step 3 · common size ----------
  // Vertical and horizontal analysis on Eni's own figures.
  function eniCommonSize(r) {
    const bs = r.chance(0.6);
    const [item, [a, b]] = r.pick(Object.entries(bs ? ENI.bs : ENI.is));
    const onRight = bs && Object.keys(ENI.bs).indexOf(item) >= Object.keys(ENI.bs).indexOf("Short-term debt");
    const [base0, base1] = bs ? ENI.totalAssets : ENI.revenues, baseName = !bs ? "Total revenues" : onRight ? "Total liabilities and equity" : "Total assets";
    const v = pct2(b / base1), h = pct2(b / a - 1), v0 = pct2(a / base0);
    const moved = v > v0 + 0.005 ? "Went up" : v < v0 - 0.005 ? "Went down" : "Stayed the same";
    return {
      type: "fill", pattern: "common size · Eni",
      doc: { kind: `Eni · consolidated ${bs ? "balance sheet" : "income statement"} (€ million)`, title: "Annual Report 2025", lines: [
        ["", "2024 · 2025"], [item, `${fmt(a)} · ${fmt(b)}`], [baseName, `${fmt(base0)} · ${fmt(base1)}`]] },
      brief: `Common size analysis of “${item}”. Vertical: as a % of ${baseName.toLowerCase()} of the same year. Horizontal: the change in 2025 against 2024.`,
      fields: [
        { key: "v", label: "Vertical analysis 2025 (%)", answer: v, dec: true, tol: 0.05, why: `${fmt(b)} ÷ ${fmt(base1)} = ${v}%. The base is ${bs ? `total assets (= total liabilities and equity) for the balance sheet` : "revenues for the income statement"}.` },
        { key: "h", label: "Horizontal analysis 2025 vs 2024 (%)", answer: h, dec: true, neg: true, tol: 0.05, why: `${fmt(b)} ÷ ${fmt(a)} − 1 = ${h}%: 2024 is the base year.` }],
      choice: { label: `Its weight on ${baseName.toLowerCase()} from 2024 to 2025…`, options: ["Went up", "Went down", "Stayed the same"], answer: moved,
        why: `2024: ${fmt(a)} ÷ ${fmt(base0)} = ${v0}%; 2025: ${v}%. The item ${h < 0 ? "fell" : "grew"} by ${Math.abs(h)}%, the base by ${Math.abs(pct2(base1 / base0 - 1))}%: the weight moves with the difference between the two.` }
    };
  }

  // A generated firm over two years: vertical, horizontal, and how the two relate.
  function commonSize(r) {
    const names = ["Property, plant and equipment", "Intangible assets", "Inventories", "Trade receivables", "Cash and cash equivalents"];
    for (let tries = 0; tries < 50; tries++) {
      const y0 = names.map(() => step(r, 200, 3000, 50));
      const y1 = y0.map(x => Math.max(50, Math.round(x * (1 + r.int(-30, 40) / 100) / 50) * 50));
      const t0 = y0.reduce((s, x) => s + x, 0), t1 = y1.reduce((s, x) => s + x, 0);
      const i = r.int(0, names.length - 1), v0 = pct2(y0[i] / t0), v1 = pct2(y1[i] / t1), h = pct2(y1[i] / y0[i] - 1), ht = pct2(t1 / t0 - 1);
      if (Math.abs(v1 - v0) < 0.3 || Math.abs(h - ht) < 1) continue;
      return {
        type: "fill", pattern: "common size",
        doc: { kind: "Balance sheet · assets (k€)", title: `Lario Energia · ${Y - 1} and ${Y}`, lines: [["", `${Y - 1} · ${Y}`], ...names.map((n, k) => [n, `${fmt(y0[k])} · ${fmt(y1[k])}`]), ["Total assets", `${fmt(t0)} · ${fmt(t1)}`]] },
        brief: `Common size analysis of “${names[i]}”.`,
        fields: [
          { key: "v", label: `Vertical analysis ${Y} (% of total assets)`, answer: v1, dec: true, tol: 0.05, why: `${fmt(y1[i])} ÷ ${fmt(t1)} = ${v1}% (it was ${v0}% in ${Y - 1}).` },
          { key: "h", label: `Horizontal analysis ${Y} vs ${Y - 1} (%)`, answer: h, dec: true, neg: true, tol: 0.05, why: `${fmt(y1[i])} ÷ ${fmt(y0[i])} − 1 = ${h}%.` },
          { key: "ht", label: `Total assets, ${Y} vs ${Y - 1} (%)`, answer: ht, dec: true, neg: true, tol: 0.05, why: `${fmt(t1)} ÷ ${fmt(t0)} − 1 = ${ht}%.` }],
        choice: { label: "So its weight on total assets…", options: ["Went up", "Went down"], answer: v1 > v0 ? "Went up" : "Went down",
          why: `The item moved by ${h}%, total assets by ${ht}%: ${h > ht ? "the item grew faster than the total (or fell less), so its weight went up" : "the item grew slower than the total (or fell more), so its weight went down"} (${v0}% → ${v1}%).` }
      };
    }
    throw new Error("commonSize");
  }

  // A change in a ratio: percentage points or relative change? (Lecture 05, the Eni ROE example.)
  function relativeChange(r) {
    if (r.chance(0.4)) {
      const eniRoe = r.chance(0.5);
      const [n0, n1, d0, d1] = eniRoe ? [2764, 2758, 55648, 52787] : [3113, 3357, 4860, 2764];
      const a = n0 / d0, b = n1 / d1, rel = pct2(b / a - 1);
      const name = eniRoe ? "ROE" : "Payout ratio";
      return {
        type: "fill", pattern: "relative change · Eni",
        doc: { kind: "Eni (€ million)", title: eniRoe ? "Net profit and equity" : "Dividends and last year's profit", lines: eniRoe
          ? [["Net profit 2024 · 2025", `${fmt(n0)} · ${fmt(n1)}`], ["Equity 2024 · 2025", `${fmt(d0)} · ${fmt(d1)}`]]
          : [["Dividends paid 2024 · 2025", `${fmt(n0)} · ${fmt(n1)}`], ["Net profit of the year before (2023 · 2024)", `${fmt(d0)} · ${fmt(d1)}`]] },
        brief: `Compute ${name} for both years and its relative change (“Delta”, as in the slides). Keep full precision: don't round the ratios before the Delta.`,
        fields: [
          { key: "a", label: `${name} 2024${eniRoe ? " (%)" : ""}`, answer: eniRoe ? pct2(a) : r2(a), dec: true, tol: eniRoe ? 0.01 : 0.01, why: `${fmt(n0)} ÷ ${fmt(d0)} = ${eniRoe ? pct2(a) + "%" : r2(a)}.` },
          { key: "b", label: `${name} 2025${eniRoe ? " (%)" : ""}`, answer: eniRoe ? pct2(b) : r2(b), dec: true, tol: eniRoe ? 0.01 : 0.01, why: `${fmt(n1)} ÷ ${fmt(d1)} = ${eniRoe ? pct2(b) + "%" : r2(b)}.` },
          { key: "rel", label: "Delta, relative change (%)", answer: rel, dec: true, neg: true, tol: 0.05, why: `${name} 2025 ÷ ${name} 2024 − 1 = ${rel}%.${eniRoe ? ` In percentage points ROE moved only ${r2(pct2(b) - pct2(a))} pp: a relative change and a change in points are different things.` : " A payout above 1 means more dividends than last year's profit."}` }]
      };
    }
    const name = r.pick(["ROE", "ROI", "ROS", "EBITDA margin"]), a = r2(r.int(300, 2500) / 100), b = r2(a + r.pick([-1, 1]) * r.int(20, 400) / 100);
    if (b <= 0) return relativeChange(r);
    const pp = r2(b - a), rel = pct2(b / a - 1);
    return {
      type: "fill", pattern: "relative change",
      doc: { kind: "Lario Energia · indicators", title: `${name}, ${Y - 1} and ${Y}`, lines: [[`${name} ${Y - 1}`, `${fmt(a)}%`], [`${name} ${Y}`, `${fmt(b)}%`]] },
      brief: "How much did it move? In percentage points, and as a relative change.",
      fields: [
        { key: "pp", label: "Change in percentage points", answer: pp, dec: true, neg: true, tol: 0.01, why: `${fmt(b)}% − ${fmt(a)}% = ${fmt(pp)} pp.` },
        { key: "rel", label: "Relative change (%)", answer: rel, dec: true, neg: true, tol: 0.05, why: `${fmt(b)} ÷ ${fmt(a)} − 1 = ${rel}%.` }],
      choice: { label: `A newspaper writes “${name} up ${Math.abs(pp)}%”. Is that right?`, options: ["No: it moved by that many points, not by that %", "Yes, it's the same thing"], answer: "No: it moved by that many points, not by that %",
        why: `${Math.abs(pp)} is the change in percentage points; the relative change is ${rel}%.` }
    };
  }

  // ---------- Financial planning (Lecture 06 Part II) ----------
  const USES = [
    ["A new production plant, used for 20 years", "Long-term funds", "A use that lasts years needs money that stays for years: equity or long-term debt."],
    ["Buying a competitor", "Long-term funds", "An acquisition pays back over many years: long money."],
    ["A new headquarters building", "Long-term funds", "Decades of use: long money."],
    ["A 5-year research programme", "Long-term funds", "Years before it pays back: long money."],
    ["A wind farm with a 25-year permit", "Long-term funds", "A very long use: equity and long-term debt (a bond, a long bank loan)."],
    ["Extra stock for the Christmas peak, sold by January", "Short-term funds", "Months, and it pays itself back when sold: short money (a credit line)."],
    ["Receivables from a big order, collected in 90 days", "Short-term funds", "Self-liquidating in 90 days: short money, or factoring."],
    ["VAT paid in advance, refunded next quarter", "Short-term funds", "A few months: short money."],
    ["Paying suppliers 60 days before the customer pays", "Short-term funds", "A timing gap of the operating cycle: short money."],
    ["Summer stock of ice-cream ingredients", "Short-term funds", "Seasonal working capital: short money."]
  ];
  const SOURCES = [
    ["Profit not paid out as dividends", "Equity", "Retained earnings: equity, with no new shareholders and no issuing costs."],
    ["New shares sold to existing shareholders (pre-emption right)", "Equity", "A capital increase: equity."],
    ["Listing on the stock exchange (IPO)", "Equity", "Shares sold to the market: equity."],
    ["A 7-year term loan from the bank", "Long-term debt", "Repaid over years: long-term debt."],
    ["A bond maturing in five years", "Long-term debt", "Borrowed from the market for years: long-term debt."],
    ["A syndicated loan shared by four banks, 10 years", "Long-term debt", "A very large, long loan: long-term debt."],
    ["A 6-year lease on new machines (IFRS 16)", "Long-term debt", "Under IFRS 16 the lease liability is debt, over the lease term."],
    ["A committed credit line used for a few weeks", "Short-term debt", "Borrow, repay, borrow again within a limit: short-term debt."],
    ["An uncommitted credit line", "Short-term debt", "Short-term, and the bank can withdraw it at any time."],
    ["Factoring of invoices with recourse", "Short-term debt", "The advance is a financial debt until the customer pays."],
    ["Commercial paper due in 3 months", "Short-term debt", "Short-term debt sold to investors."]
  ];
  function matchMaturity(r) {
    const uses = r.chance(0.5);
    const pool = uses ? USES : SOURCES, cats = uses ? ["Long-term funds", "Short-term funds"] : ["Equity", "Long-term debt", "Short-term debt"];
    for (let tries = 0; tries < 30; tries++) {
      const picked = r.shuffle(pool.slice()).slice(0, 5);
      if (new Set(picked.map(p => p[1])).size < cats.length) continue;
      return {
        type: "reclass", pattern: uses ? "match maturity" : "sources of funds", cats, short: uses ? ["Long", "Short"] : ["Equity", "Long D", "Short D"],
        typeLabel: "FINANCIAL PLANNING", docKind: uses ? "The rule: match maturity and risk" : "Equity or debt, long or short?",
        brief: uses ? "Lario Energia needs money for these uses. How should each be funded?" : "Classify each source of funds.",
        note: uses ? "Long uses need long money (equity and long-term debt); short, self-liquidating uses need short money." : null,
        items: picked.map(([label, cat, why]) => ({ label, cat, why })), fields: []
      };
    }
    throw new Error("matchMaturity");
  }

  function creditLine(r) {
    const limit = step(r, 200, 2000, 50), used = step(r, 50, Math.round(limit * 0.9), 10), rate = r.pick([4, 5, 6, 7]), fee = r.pick([0.25, 0.5, 0.75]);
    const committed = r.chance(0.6), interest = r2(used * rate / 100), feeAmt = committed ? r2((limit - used) * fee / 100) : 0;
    return {
      type: "fill", pattern: "credit line",
      doc: { kind: "Credit line (k€, one year)", title: `${committed ? "Committed" : "Uncommitted"} line · Banca Brera → Lario Energia`, lines: [["Limit", fmt(limit)], ["Average amount used", fmt(used)], ["Interest on the used amount", `${rate}%`], ["Fee on the unused amount", committed ? `${fee}%` : "none"]] },
      brief: "What does the line cost for the year?",
      fields: [
        { key: "int", label: "Interest (k€)", answer: interest, dec: true, tol: 0.05, why: `Interest only on what is used: ${fmt(used)} × ${rate}% = ${fmt(interest)}.` },
        { key: "fee", label: "Fee on the unused part (k€)", answer: feeAmt, dec: true, tol: 0.05, why: committed ? `(${fmt(limit)} − ${fmt(used)}) × ${fee}% = ${fmt(feeAmt)}: the price of the bank's promise.` : "Uncommitted: no fee on the unused part." },
        { key: "tot", label: "Total cost (k€)", answer: r2(interest + feeAmt), dec: true, tol: 0.05, why: `${fmt(interest)} + ${fmt(feeAmt)} = ${fmt(interest + feeAmt)}.` }],
      choice: { label: "In a crisis, this line…", options: ["Can be withdrawn by the bank at any time", "Stays available up to the limit"], answer: committed ? "Stays available up to the limit" : "Can be withdrawn by the bank at any time",
        why: committed ? "Committed: the bank has promised. That's why a fee is paid on the unused part." : "Uncommitted: cheaper, but the bank may say no, often exactly in a crisis." }
    };
  }

  function factoring(r) {
    const inv = step(r, 20, 400, 5) * 1000, adv = r.pick([70, 80, 90]), recourse = r.chance(0.5), price = recourse ? r.pick([1, 2]) : r.pick([3, 4]);
    const unpaid = r.chance(0.35), advance = inv * adv / 100, fee = inv * price / 100;
    const kept = unpaid ? (recourse ? 0 : inv - fee) : inv - fee;
    const fields = [
      { key: "today", label: "Cash to the firm today (€)", answer: advance, why: `${adv}% of ${eur(inv)} = ${eur(advance)}, 90 days early.` },
      { key: "nfp", label: "Financial debt added to the NFP today (€)", answer: recourse ? advance : 0, why: recourse ? `With recourse the factor only lends against the invoice: the ${eur(advance)} is a financial debt until the customer pays.` : "Without recourse it is a true sale: no debt." },
      { key: "rec", label: "Trade receivable left on the balance sheet today (€)", answer: recourse ? inv : 0, why: recourse ? "The receivable never leaves the balance sheet." : "The receivable leaves the balance sheet on day one: receivables and DSO fall." }];
    fields.push({ key: "kept", label: unpaid ? "The customer never pays: cash the firm keeps in the end (€)" : "After 90 days the customer pays: cash the firm got in all (€)", answer: kept,
      why: unpaid ? (recourse ? `With recourse the firm gives the ${eur(advance)} back (plus interest) and is left with an unpaid invoice: nothing kept.` : `Without recourse the factor bears the loss: the firm keeps ${eur(inv)} − ${eur(fee)} = ${eur(kept)}, as if the customer had paid.`)
        : `${eur(advance)} today + ${eur(inv - advance - fee)} later = ${eur(kept)}: the invoice minus the factor's ${price}% (${eur(fee)}).` });
    return {
      type: "fill", pattern: "factoring",
      doc: { kind: "Factoring contract", title: `Lario Energia sells an invoice · ${recourse ? "WITH recourse" : "WITHOUT recourse"}`, lines: [["Invoice to the customer", `${eur(inv)}, due in 90 days`], ["Advance paid by the factor today", `${adv}%`], ["Factor's price", `${price}% of the invoice`]] },
      brief: "Selling an invoice before it is paid: follow the cash and the balance sheet.", fields,
      choice: { label: "If the customer never pays, who bears the loss?", options: ["The firm", "The factor"], answer: recourse ? "The firm" : "The factor", why: recourse ? "With recourse the loss comes back to the firm: the factor only lent money." : "Without recourse the factor takes the loss: that's why its price is higher." }
    };
  }
  const eur = x => "€" + fmt(x);

  function ifrs16(r) {
    for (let tries = 0; tries < 50; tries++) {
      const n = r.pick([4, 5, 8, 10]), i = r.pick([4, 5, 6]) / 100, pv = step(r, 100, 1500, 50) * n;
      const pay = Math.round(pv * i / (1 - Math.pow(1 + i, -n)));
      const ebitda = step(r, 800, 4000, 50), da = step(r, 200, Math.round(ebitda * 0.5), 50), nfp = step(r, 500, 5000, 50);
      const dep = pv / n, int1 = r2(pv * i);
      const e1 = ebitda + pay, ebit0 = ebitda - da, ebit1 = ebit0 + pay - dep, nfp1 = nfp + pv;
      const lev0 = nfp / ebitda, lev1 = nfp1 / e1;
      if (Math.abs(lev1 - lev0) < 0.05 || dep % 1) continue;
      return {
        type: "fill", pattern: "IFRS 16 lease",
        doc: { kind: "Lario Energia · before IFRS 16 (k€)", title: "A lease on a fleet of trucks", lines: [["EBITDA (after the lease rent)", fmt(ebitda)], ["D&A", fmt(da)], ["Net financial position", fmt(nfp)],
          ["Yearly lease payment (rent)", fmt(pay)], ["Lease term", `${n} years`], ["Lease liability at the start (present value)", fmt(pv)], ["Interest rate", `${i * 100}%`]] },
        brief: "Apply IFRS 16 to the lease for its first year: the rent disappears from operating costs; a right-of-use asset is depreciated and the lease liability pays interest.",
        fields: [
          { key: "ebitda", label: "EBITDA under IFRS 16 (k€)", answer: e1, why: `The rent leaves operating costs: ${fmt(ebitda)} + ${fmt(pay)} = ${fmt(e1)}. EBITDA goes up.` },
          { key: "ebit", label: "EBIT under IFRS 16 (k€)", answer: ebit1, tol: 1, why: `Old EBIT ${fmt(ebit0)} + rent ${fmt(pay)} − depreciation of the right of use (${fmt(pv)} ÷ ${n} = ${fmt(dep)}) = ${fmt(ebit1)}.` },
          { key: "int", label: "Interest on the lease in year 1 (k€)", answer: int1, dec: true, tol: 0.5, why: `${fmt(pv)} × ${i * 100}% = ${fmt(int1)}: a financial expense, below EBIT.` },
          { key: "nfp", label: "Net financial position at the start (k€)", answer: nfp1, why: `The lease liability is debt: ${fmt(nfp)} + ${fmt(pv)} = ${fmt(nfp1)}.` }],
        choice: { label: "Net debt ÷ EBITDA…", options: ["Goes up", "Goes down"], answer: lev1 > lev0 ? "Goes up" : "Goes down",
          why: `Before ${r2(lev0)}×, after ${fmt(nfp1)} ÷ ${fmt(e1)} = ${r2(lev1)}×. Both EBITDA and net debt rise: the ratios change even though the business doesn't.` }
      };
    }
    throw new Error("ifrs16");
  }

  function taxShield(r) {
    const d = step(r, 500, 5000, 100), rate = r.pick([3, 4, 5, 6, 8]), t = r.pick([24, 27.9, 30]);
    const int = d * rate / 100, shield = r2(int * t / 100), net = r2(rate * (1 - t / 100));
    return {
      type: "fill", pattern: "tax shield",
      doc: { kind: "Lario Energia (k€)", title: "Debt or equity?", lines: [["Bank loan", fmt(d)], ["Interest rate", `${rate}%`], ["Tax rate", `${t}%`]] },
      brief: "Interest is deductible; dividends are not. How much does the debt really cost?",
      fields: [
        { key: "int", label: "Interest for the year (k€)", answer: int, dec: true, tol: 0.05, why: `${fmt(d)} × ${rate}% = ${fmt(int)}.` },
        { key: "shield", label: "Tax saved thanks to the interest (k€)", answer: shield, dec: true, tol: 0.05, why: `${fmt(int)} × ${t}% = ${fmt(shield)}: the tax shield.` },
        { key: "net", label: "After-tax cost of debt (%)", answer: net, dec: true, tol: 0.01, why: `${rate}% × (1 − ${t}%) = ${net}%.` }],
      choice: { label: "Why does equity usually cost more than debt?", options: ["Shareholders are paid last and dividends aren't deductible", "Shares must be repaid at a fixed date", "Equity holders have no vote"], answer: "Shareholders are paid last and dividends aren't deductible",
        why: "Last in line on default and no tax shield: shareholders want a higher return." }
    };
  }

  function bond(r) {
    const face = 1000, c = r.pick([3, 3.5, 4, 4.3, 5, 6]), price = step(r, 940, 1040, 5), coupon = face * c / 100;
    const cy = pct2(coupon / price), ytm = pct2((coupon + face - price) / price);
    const rating = r.pick(["AA", "A−", "BBB", "BBB−", "BB+", "B", "CCC"]), ig = ["AA", "A−", "BBB", "BBB−"].includes(rating);
    return {
      type: "fill", pattern: "bond yield",
      doc: { kind: "Bond", title: `Lario Energia ${c}% · matures in one year`, lines: [["Face value", eur(face)], ["Coupon", `${c}% a year`], ["Market price today", eur(price)], ["Rating (S&P)", rating]] },
      brief: "Buy it today, collect the last coupon and the face value in one year.",
      fields: [
        { key: "cy", label: "Current yield (%)", answer: cy, dec: true, tol: 0.05, why: `Coupon ÷ price = ${fmt(coupon)} ÷ ${fmt(price)} = ${cy}%.` },
        { key: "ytm", label: "Yield to maturity (%)", answer: ytm, dec: true, neg: true, tol: 0.05, why: `(${fmt(coupon)} + ${fmt(face)} − ${fmt(price)}) ÷ ${fmt(price)} = ${ytm}%: what you really earn. ${price < face ? "Bought below face value: the yield is above the coupon." : price > face ? "Bought above face value: the yield is below the coupon." : ""}` }],
      choice: { label: `A ${rating} rating is…`, options: ["Investment grade", "High yield"], answer: ig ? "Investment grade" : "High yield", why: "Investment grade runs from AAA down to BBB−; below it is high yield: riskier, and it pays more. Eni is A−." }
    };
  }

  // ---------- Theory (past-exam style) ----------
  const T = (level, q, right, wrongs, why) => ["fa", level, q, [[right, true, why]].concat(wrongs.map(([w, y]) => [w, false, y]))];
  ST.MCQ.push(
    T(1, "In a vertical common size analysis of the income statement, each item is shown as a % of…", "Revenues of the same year", [["Total assets", "That is the base for the balance sheet."], ["The same item in the base year", "That's the horizontal analysis."], ["Net profit", "Not the base used in the course."]], "Vertical: within its own document and year; revenues for the income statement, total assets for the balance sheet."),
    T(1, "Horizontal common size analysis…", "Shows each year's amounts as a % change from a base year", [["Shows each item as a % of total assets", "That's vertical."], ["Compares the firm with its competitors", "That's benchmarking, step 5."], ["Reclassifies the balance sheet", "That's step 2."]], "Horizontal: growth or decline of each item over time, against a base year."),
    T(1, "On default, who is paid first?", "Lenders (debt), then shareholders", [["Shareholders, then lenders", "Shareholders are last in line."], ["Everyone at the same time, pro rata", "Debt has priority."], ["Whoever holds more shares", "Shares give no priority over debt."]], "Debt has priority; equity takes what's left."),
    T(1, "Which is deductible from taxable income?", "Interest on debt", [["Dividends", "Dividends are paid from after-tax profit."], ["Repayment of the loan's principal", "Repaying principal isn't a cost at all."], ["Share buybacks", "An equity transaction, not a cost."]], "The interest tax shield: one reason debt is cheaper than equity."),
    T(1, "The matching rule of financial planning says…", "Long uses need long money; short uses, short money", [["Always fund everything with equity", "Equity costs more; the rule is about durations."], ["Always fund everything with short-term debt, it's cheaper", "A plant funded with short money must be refinanced again and again: risky."], ["Match the currency of the loan to the shareholders'", "Not the rule taught."]], "A source should last as long as the use it pays for."),
    T(1, "What is a pre-emption right (diritto di opzione)?", "Existing shareholders can buy new shares first, so as not to be diluted", [["The bank's right to be repaid first", "That's priority of debt."], ["The right to sell shares back to the firm", "Not a pre-emption right."], ["A discount on dividends", "No such thing."]], "In a capital increase, existing shareholders come first; if they don't buy, their stake is diluted."),
    T(1, "In Italy most firms grow mainly through…", "Retained earnings and bank debt", [["Listing on the stock exchange", "Listing is the exception, not the rule."], ["Bonds sold to families", "Retail bonds are for large issuers like Eni."], ["Commercial paper", "Not the main source for Italian firms."]], "Lecture 06: listing is the exception, not the rule."),
    T(2, "A committed credit line differs from an uncommitted one because…", "The bank has promised the money, so a fee is paid on the unused part", [["It has no limit", "Both have a limit."], ["It's always cheaper", "Committed costs more: the fee on the unused part."], ["It is long-term debt", "Both are short-term."]], "Uncommitted: cheaper, but it can be withdrawn at any time, often in a crisis."),
    T(2, "Factoring WITHOUT recourse at year end…", "Removes the receivable from the balance sheet: receivables and DSO fall, no debt is added", [["Adds the advance to the net financial position", "That's factoring with recourse."], ["Leaves the receivable on the balance sheet", "That's with recourse."], ["Has no effect on any ratio", "DSO falls even if customers pay no sooner."]], "A true sale: the factor bears the risk and charges more for it."),
    T(2, "Factoring WITH recourse…", "Leaves the receivable on the balance sheet; the advance is a financial debt in the NFP", [["Moves the credit risk to the factor", "With recourse the risk stays with the firm."], ["Lowers DSO", "The receivable stays: DSO doesn't change."], ["Is a true sale", "That's without recourse."]], "The factor only lends against the invoice."),
    T(2, "Under IFRS 16, compared with the old rent treatment…", "EBITDA goes up, and net debt goes up", [["EBITDA goes down, net debt unchanged", "The rent leaves operating costs: EBITDA rises."], ["Nothing changes, it's only disclosure", "Leases come onto the balance sheet."], ["Net profit always goes up", "Depreciation + interest replace the rent; profit can even fall in the early years."]], "Right-of-use asset and lease liability: depreciation + interest instead of rent."),
    T(2, "Eni's ROE goes from 4.97% to 5.22%. The “Delta” of +5.19% in the slides is…", "A relative change of the ratio, not a change in points", [["The change in percentage points", "That's 0.25 pp."], ["The growth of net profit", "Net profit actually fell slightly."], ["An error: it should be 0.25%", "It's a relative change: 5.22 ÷ 4.97 − 1."]], "Relative change: new ÷ old − 1 (with unrounded ROEs)."),
    T(2, "Why does equity usually cost more than debt?", "Shareholders are last in line and dividends aren't deductible", [["Equity must be repaid with interest", "Equity has no maturity and no promised return."], ["Banks charge more for shares", "Banks don't price shares."], ["Because of the rating", "The rating prices debt."]], "More risk and no tax shield: a higher required return."),
    T(3, "A firm sells its receivables without recourse on 30 December. Its DSO at year end…", "Falls, even though customers pay no sooner", [["Rises", "Receivables fall, so DSO falls."], ["Doesn't change", "The receivable left the balance sheet."], ["Falls, and it shows customers pay faster", "The business didn't change: only the financing did."]], "Financing choices move the ratios even when the business doesn't: read the notes."),
    T(3, "Eni 2025: trade receivables −26.4%, revenues −8.3%. The most reasonable first reading is…", "Receivables fell much more than sales: lower prices and working-capital actions (e.g. factoring), to check in the notes", [["Customers stopped paying", "That would raise receivables, not lower them."], ["The vertical analysis must be wrong", "They're two horizontal changes, both right."], ["Revenues and receivables always move together", "They don't: prices, terms and factoring change the relation."]], "The notes (p. 314) cite lower commodity prices and working-capital optimisation."),
    T(3, "A bond has a 4% coupon and trades above its face value. Its yield to maturity is…", "Below 4%", [["Above 4%", "Paying more than face value lowers the return."], ["Exactly 4%", "Only at a price equal to face value."], ["It can't be computed", "Coupon, price and face value are enough."]], "Price above par → yield below the coupon.")
  );

  // ---------- Where they go ----------
  const NEW = { 1: [commonSize, relativeChange, matchMaturity, creditLine], 2: [eniCommonSize, commonSize, relativeChange, factoring, ifrs16, taxShield, creditLine, matchMaturity, bond], 3: [eniCommonSize, relativeChange, factoring, ifrs16, bond, taxShield] };
  [1, 2, 3].forEach(l => { ST.PLAN.fa[l] = ST.PLAN.fa[l].concat(NEW[l]); });
  const wrap = f => (tier, clients, r) => Object.assign(f(r), { client: "lario", pickup: "inbox", work: "desk" });
  Object.assign(O.MAKERS, { commonSize: wrap(commonSize), eniCommonSize: wrap(eniCommonSize), factoring: wrap(factoring), ifrs16: wrap(ifrs16), matchMaturity: wrap(matchMaturity) });
  O.MIX[3].push("commonSize", "eniCommonSize", "factoring", "ifrs16", "matchMaturity");

  const api = { ENI, USES, SOURCES, eniCommonSize, commonSize, relativeChange, matchMaturity, creditLine, factoring, ifrs16, taxShield, bond };
  root.OfficePlanning = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
