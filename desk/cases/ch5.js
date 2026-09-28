/* Chapter 5 — Cash flow statement and segment reporting. */
(function () {
  "use strict";
  const { register, inp, pick, giv, R, S, doc, eur, pct, sum } = DeskCore.dsl;

  const SIGN_NOTE = "Enter inflows as positive and outflows as negative amounts.";
  const bs = (a, b) => `1 Jan ${eur(a)} · 31 Dec ${eur(b)}`;
  const adj = (from, to, asset) => asset ? from - to : to - from;
  // A pair of opening/closing balances that moves by 3–30% (never zero).
  const pair = r => {
    const a = r.step(20000, 400000, 1000);
    return [a, a + (r.chance(0.5) ? 1 : -1) * r.step(Math.max(1000, a * 0.03), a * 0.3, 1000)];
  };

  register({
    id: "fa5-change-in-cash", chapter: 5, level: 1, source: "PDF 5.1", title: "Change in cash",
    original: { open: 26000, cfo: 41000, cfi: -35000, cff: 12000, unknown: "close" },
    gen: r => {
      for (;;) {
        const open = r.step(5000, 200000, 1000), cfo = r.step(-20000, 300000, 1000);
        const cfi = (r.chance(0.15) ? 1 : -1) * r.step(5000, 250000, 1000), cff = r.step(-100000, 150000, 1000);
        if (open + cfo + cfi + cff > 1000) return { open, cfo, cfi, cff, unknown: r.pick(["close", "close", "open", "cff"]) };
      }
    },
    build(p) {
      const { y, open, cfo, cfi, cff, unknown } = p;
      const net = cfo + cfi + cff, close = open + net;
      const lines = [["Operating activities", eur(cfo)], ["Investing activities", eur(cfi)]];
      if (unknown !== "cff") lines.push(["Financing activities", eur(cff)]);
      if (unknown !== "open") lines.push([`Cash at 1 Jan ${y}`, eur(open)]);
      if (unknown !== "close") lines.push([`Cash at 31 Dec ${y}`, eur(close)]);
      const netWhy = unknown === "cff" ? `Closing − opening: ${eur(close)} − ${eur(open)} = ${eur(net)}.` : `${sum([cfo, cfi, cff])} = ${eur(net)}.`;
      return {
        brief: `Complete the cash reconciliation for ${y}. ${SIGN_NOTE}`,
        docs: [doc("report", "Cash flow summary", lines)],
        paper: { sections: [
          S(`Cash flow statement · ${y}`, [
            R("Net cash from operating activities", giv(cfo)),
            R("Net cash from investing activities", giv(cfi)),
            R("Net cash from financing activities", unknown === "cff" ? inp("cff", cff, "Net change − operating − investing.", `${sum([net, -cfo, -cfi])} = ${eur(cff)}.`) : giv(cff)),
            R("Net change in cash", inp("net", net, unknown === "cff" ? "Closing cash − opening cash." : "Sum of the three sections.", netWhy), { total: true }),
            R(`Cash at 1 Jan ${y}`, unknown === "open" ? inp("open", open, "Closing cash − net change.", `${sum([close, -net])} = ${eur(open)}.`) : giv(open)),
            R(`Cash at 31 Dec ${y}`, unknown === "close" ? inp("close", close, "Opening cash + net change.", `${sum([open, net])} = ${eur(close)}.`) : giv(close), { total: true })
          ])
        ] },
        rule: "IAS 7: the three sections — operating, investing, financing — add up to the net change in cash, which reconciles opening and closing cash and cash equivalents."
      };
    }
  });

  register({
    id: "fa5-direct", chapter: 5, level: 1, source: "PDF 5.2", title: "Operating cash flow: direct method",
    original: { rec: 205000, sup: 112000, wag: 48000, tax: 17000 },
    gen: r => { const rec = r.step(100000, 2000000, 1000); return { rec, sup: r.step(rec * 0.35, rec * 0.55, 1000), wag: r.step(rec * 0.1, rec * 0.3, 1000), tax: r.step(2000, rec * 0.05, 500) }; },
    build(p) {
      const { y, rec, sup, wag, tax } = p;
      const cfo = rec - sup - wag - tax;
      return {
        brief: `Present operating cash flow for ${y} with the direct method. ${SIGN_NOTE}`,
        docs: [doc("bank", `Bank summary · ${y}`, [["Collected from customers", eur(rec)], ["Paid to suppliers", eur(sup)], ["Wages paid", eur(wag)], ["Income taxes paid", eur(tax)]])],
        paper: { sections: [
          S("Cash flows from operating activities", [
            R("Receipts from customers", inp("rec", rec, "Money in: positive.", `${eur(rec)} received.`)),
            R("Payments to suppliers", inp("sup", -sup, "Money out: negative.", `${eur(-sup)}.`)),
            R("Payments to employees", inp("wag", -wag, "Money out: negative.", `${eur(-wag)}.`)),
            R("Income taxes paid", inp("tax", -tax, "Taxes paid are operating unless linked to investing or financing.", `${eur(-tax)}.`)),
            R("Net cash from operating activities", inp("cfo", cfo, "Sum of the lines.", `${eur(rec)} − ${eur(sup)} − ${eur(wag)} − ${eur(tax)} = ${eur(cfo)}.`), { total: true })
          ])
        ] },
        rule: "IAS 7 direct method: major classes of gross cash receipts and payments are shown line by line. It starts from cash, not from profit."
      };
    }
  });

  const FLOWS = [
    ["Wages paid", "Operating", -1, 20000, 150000], ["Cash paid to suppliers", "Operating", -1, 30000, 300000], ["Income taxes paid", "Operating", -1, 3000, 40000], ["Office rent paid", "Operating", -1, 5000, 40000],
    ["Purchase of a production machine", "Investing", -1, 20000, 200000], ["Purchase of a patent", "Investing", -1, 5000, 80000], ["Purchase of shares in another company", "Investing", -1, 10000, 150000],
    ["Proceeds from sale of an old delivery van", "Investing", 1, 2000, 30000], ["Proceeds from sale of land", "Investing", 1, 20000, 200000],
    ["Proceeds from a new bank loan", "Financing", 1, 20000, 300000], ["Proceeds from issuing new shares", "Financing", 1, 20000, 300000],
    ["Repayment of a bank loan", "Financing", -1, 10000, 150000], ["Dividends paid to shareholders", "Financing", -1, 5000, 80000]
  ];
  const SECTIONS = ["Operating", "Investing", "Financing"];

  register({
    id: "fa5-classify", chapter: 5, level: 1, title: "Classify cash flows",
    gen: r => {
      const pickN = (sec, n) => r.sample(FLOWS.filter(f => f[1] === sec), n);
      const chosen = [["Cash received from customers", "Operating", 1, 150000, 900000]].concat(pickN("Operating", 2), pickN("Investing", 2), pickN("Financing", 2));
      return { items: r.shuffle(chosen).map(([name, sec, sign, lo, hi]) => ({ name, sec, v: sign * r.step(lo, hi, 1000) })) };
    },
    build(p) {
      const { y, items } = p;
      const tot = sec => items.filter(i => i.sec === sec).reduce((s, i) => s + i.v, 0);
      const list = sec => items.filter(i => i.sec === sec).map(i => eur(i.v)).join(" + ");
      const why = {
        Operating: "It comes from the company's main revenue-producing activities.",
        Investing: "It buys or sells long-term assets or investments.",
        Financing: "It changes the size of the company's equity or borrowings. The course classifies dividends paid here."
      };
      return {
        brief: `Classify each cash flow of ${y} and total the three sections. ${SIGN_NOTE}`,
        docs: [doc("bank", `Bank movements · ${y}`, items.map(i => [i.name, eur(i.v)]))],
        paper: { sections: [
          S("Classification", items.map((it, i) => R(`${it.name} · ${eur(it.v)}`, pick(`s${i}`, SECTIONS, it.sec, "Day-to-day business, long-term assets, or funding?", why[it.sec])))),
          S(`Cash flow statement · ${y}`, SECTIONS.map(sec => R(`Net cash from ${sec.toLowerCase()} activities`, inp(sec.slice(0, 3).toLowerCase(), tot(sec), `Add the ${sec.toLowerCase()} flows with their signs.`, `${list(sec)} = ${eur(tot(sec))}.`), { total: true })))
        ] },
        rule: "IAS 7: operating flows come from the main revenue-producing activities; investing flows from acquiring and disposing of long-term assets; financing flows change equity and borrowings."
      };
    }
  });

  register({
    id: "fa5-indirect", chapter: 5, level: 2, source: "PDF 5.3", title: "Operating cash flow: indirect method",
    original: { NP: 72000, dep: 18000, dRec: 11000, dInv: -6000, dPay: 8000 },
    gen: r => {
      const ch = () => (r.chance(0.5) ? 1 : -1) * r.step(1000, 40000, 1000);
      return { NP: r.step(10000, 500000, 1000), dep: r.step(2000, 100000, 1000), dRec: ch(), dInv: ch(), dPay: ch() };
    },
    build(p) {
      const { y, NP, dep, dRec, dInv, dPay } = p;
      const cfo = NP + dep - dRec - dInv + dPay;
      const move = (name, d) => [name, `${d > 0 ? "increased" : "decreased"} by ${eur(Math.abs(d))}`];
      const wcWhy = (name, d, asset) => {
        const up = d > 0;
        const effect = asset ? (up ? "ties up cash" : "releases cash") : (up ? "keeps cash in the company" : "uses cash");
        return `${name} ${up ? "rose" : "fell"} by ${eur(Math.abs(d))}: that ${effect}, so ${eur(asset ? -d : d)}.`;
      };
      return {
        brief: `Present operating cash flow for ${y} with the indirect method. There are no other adjustments.`,
        docs: [doc("memo", "Controller's notes", [["Net profit", eur(NP)], ["Depreciation", eur(dep)], move("Trade receivables", dRec), move("Inventories", dInv), move("Trade payables", dPay)])],
        paper: { sections: [
          S("Cash flows from operating activities", [
            R("Net profit", giv(NP)),
            R("Depreciation", inp("dep", dep, "A non-cash expense is added back.", `Depreciation reduced profit without any cash leaving: +${eur(dep)}.`)),
            R("(Increase) / decrease in trade receivables", inp("rec", -dRec, "An increase in an asset uses cash: subtract it.", wcWhy("Receivables", dRec, true))),
            R("(Increase) / decrease in inventories", inp("inv", -dInv, "An increase in an asset uses cash: subtract it.", wcWhy("Inventories", dInv, true))),
            R("Increase / (decrease) in trade payables", inp("pay", dPay, "An increase in a liability saves cash: add it.", wcWhy("Payables", dPay, false))),
            R("Net cash from operating activities", inp("cfo", cfo, "Profit + all the adjustments.", `${eur(NP)} + ${eur(dep)} ${dRec > 0 ? "−" : "+"} ${eur(Math.abs(dRec))} ${dInv > 0 ? "−" : "+"} ${eur(Math.abs(dInv))} ${dPay >= 0 ? "+" : "−"} ${eur(Math.abs(dPay))} = ${eur(cfo)}.`), { total: true })
          ])
        ] },
        rule: "Indirect method: start from profit, add back non-cash expenses, then adjust for working capital — increases in operating assets reduce cash, increases in operating liabilities add to it."
      };
    }
  });

  register({
    id: "fa5-three-sections", chapter: 5, level: 2, source: "PDF 5.4", title: "Three cash flow sections",
    original: { cfo: 64000, plant: 90000, sale: 14000, borrow: 50000, repay: 18000, div: 11000, open: 22000 },
    gen: r => {
      for (;;) {
        const v = { cfo: r.step(-10000, 400000, 1000), plant: r.step(10000, 300000, 1000), sale: r.step(0, 50000, 1000), borrow: r.step(0, 250000, 5000), repay: r.step(0, 120000, 1000), div: r.step(0, 60000, 1000), open: r.step(5000, 150000, 1000) };
        if (v.open + v.cfo - v.plant + v.sale + v.borrow - v.repay - v.div > 1000) return v;
      }
    },
    build(p) {
      const { y, cfo, plant, sale, borrow, repay, div, open } = p;
      const cfi = sale - plant, cff = borrow - repay - div, net = cfo + cfi + cff, close = open + net;
      return {
        brief: `Complete the ${y} cash flow statement below operating activities. ${SIGN_NOTE}`,
        docs: [doc("bank", `Bank movements · ${y}`, [["Net cash from operating activities", eur(cfo)], ["Purchase of new plant", eur(plant)], ["Sale of an old machine", eur(sale)], ["New bank loans", eur(borrow)], ["Loan repayments", eur(repay)], ["Dividends paid", eur(div)], [`Cash at 1 Jan ${y}`, eur(open)]])],
        paper: { sections: [
          S("Operating", [R("Net cash from operating activities", giv(cfo), { total: true })]),
          S("Investing", [
            R("Purchase of plant", inp("plant", -plant, "Cash out for a long-term asset.", `${eur(-plant)}.`)),
            R("Proceeds from sale of machine", inp("sale", sale, "Cash in from a long-term asset.", `+${eur(sale)}. The proceeds, not the gain, are the cash flow.`)),
            R("Net cash from investing activities", inp("cfi", cfi, "Sum of the investing lines.", `${eur(sale)} − ${eur(plant)} = ${eur(cfi)}.`), { total: true })
          ]),
          S("Financing", [
            R("New bank loans", inp("borrow", borrow, "Borrowing brings cash in.", `+${eur(borrow)}.`)),
            R("Loan repayments", inp("repay", -repay, "Repaying principal takes cash out.", `${eur(-repay)}.`)),
            R("Dividends paid", inp("div", -div, "Paid to the owners: financing in the course.", `${eur(-div)}.`)),
            R("Net cash from financing activities", inp("cff", cff, "Sum of the financing lines.", `${eur(borrow)} − ${eur(repay)} − ${eur(div)} = ${eur(cff)}.`), { total: true })
          ]),
          S("Reconciliation", [
            R("Net change in cash", inp("net", net, "Operating + investing + financing.", `${sum([cfo, cfi, cff])} = ${eur(net)}.`), { total: true }),
            R(`Cash at 1 Jan ${y}`, giv(open)),
            R(`Cash at 31 Dec ${y}`, inp("close", close, "Opening + net change.", `${sum([open, net])} = ${eur(close)}.`), { total: true, grand: true })
          ])
        ] },
        checks: [
          { label: "Sections − net change", terms: [[1, cfo], [1, "cfi"], [1, "cff"], [-1, "net"]] },
          { label: "Opening + net change − closing", terms: [[1, open], [1, "net"], [-1, "close"]] }
        ],
        rule: "IAS 7: buying and selling long-term assets is investing; borrowing, repaying and paying dividends is financing. The three sections reconcile opening to closing cash."
      };
    }
  });

  register({
    id: "fa5-direct-from-accruals", chapter: 5, level: 2, title: "Direct method from accrual figures",
    gen: r => {
      for (;;) {
        const Rv = r.step(200000, 3000000, 10000);
        const v = {
          Rv, P: r.step(Rv * 0.3, Rv * 0.5, 1000),
          W: r.step(Rv * 0.1, Rv * 0.25, 1000), w0: r.step(1000, 30000, 500), w1: r.step(1000, 30000, 500),
          T: r.step(2000, Rv * 0.05, 500), t0: r.step(0, 30000, 500), t1: r.step(0, 30000, 500)
        };
        [v.rec0, v.rec1] = pair(r);
        [v.pay0, v.pay1] = pair(r);
        const cust = Rv - (v.rec1 - v.rec0), sup = v.P - (v.pay1 - v.pay0), emp = v.W - (v.w1 - v.w0), tax = v.T - (v.t1 - v.t0);
        if (cust > 0 && sup > 0 && emp > 0 && tax > 0) return v;
      }
    },
    build(p) {
      const { y, Rv, rec0, rec1, P, pay0, pay1, W, w0, w1, T, t0, t1 } = p;
      const cust = Rv - (rec1 - rec0), sup = P - (pay1 - pay0), emp = W - (w1 - w0), tax = T - (t1 - t0), cfo = cust - sup - emp - tax;
      const line = (lbl, a, open, close) => `${lbl} ${eur(a)} − (closing ${eur(close)} − opening ${eur(open)})`;
      return {
        brief: `Rebuild the ${y} operating cash flows (direct method) from the income statement and the balance sheet. All purchases are on credit. ${SIGN_NOTE}`,
        docs: [
          doc("report", `Income statement · ${y}`, [["Revenue", eur(Rv)], ["Purchases of goods (all expensed)", eur(P)], ["Wages expense", eur(W)], ["Income tax expense", eur(T)]]),
          doc("report", "Balance sheet extract", [["Trade receivables", bs(rec0, rec1)], ["Trade payables", bs(pay0, pay1)], ["Wages payable", bs(w0, w1)], ["Income tax payable", bs(t0, t1)]])
        ],
        paper: { sections: [
          S("Cash flows from operating activities", [
            R("Receipts from customers", inp("cust", cust, "Revenue − increase in receivables.", `${line("Revenue", Rv, rec0, rec1)} = ${eur(cust)}.`)),
            R("Payments to suppliers", inp("sup", -sup, "Purchases − increase in payables, as an outflow.", `${line("Purchases", P, pay0, pay1)} = ${eur(sup)} paid: ${eur(-sup)}.`)),
            R("Payments to employees", inp("emp", -emp, "Wages expense − increase in wages payable, as an outflow.", `${line("Wages", W, w0, w1)} = ${eur(emp)} paid: ${eur(-emp)}.`)),
            R("Income taxes paid", inp("tax", -tax, "Tax expense − increase in tax payable, as an outflow.", `${line("Tax", T, t0, t1)} = ${eur(tax)} paid: ${eur(-tax)}.`)),
            R("Net cash from operating activities", inp("cfo", cfo, "Sum of the lines.", `${eur(cust)} − ${eur(sup)} − ${eur(emp)} − ${eur(tax)} = ${eur(cfo)}.`), { total: true })
          ])
        ] },
        rule: "Cash = accrual amount adjusted for the change in the related balance: a rising receivable means less cash than revenue; a rising payable means less cash out than the expense."
      };
    }
  });

  register({
    id: "fa5-wc-from-bs", chapter: 5, level: 2, title: "Indirect method from two balance sheets",
    gen: r => {
      const [rec0, rec1] = pair(r), [inv0, inv1] = pair(r), [pay0, pay1] = pair(r);
      return { NP: r.step(10000, 500000, 1000), dep: r.step(5000, 120000, 1000), rec0, rec1, inv0, inv1, pay0, pay1 };
    },
    build(p) {
      const { y, NP, dep, rec0, rec1, inv0, inv1, pay0, pay1 } = p;
      const aR = adj(rec0, rec1, true), aI = adj(inv0, inv1, true), aP = adj(pay0, pay1, false), cfo = NP + dep + aR + aI + aP;
      const whyA = (name, a0, a1) => `${name} went from ${eur(a0)} to ${eur(a1)}: ${a1 > a0 ? "more cash tied up" : "cash released"}, so ${eur(a0 - a1)}.`;
      return {
        brief: `Prepare operating cash flow for ${y} with the indirect method, deriving the working-capital changes from the balance sheet.`,
        docs: [
          doc("report", `Income statement · ${y}`, [["Net profit", eur(NP)], ["Depreciation included in expenses", eur(dep)]]),
          doc("report", "Balance sheet extract", [["Trade receivables", bs(rec0, rec1)], ["Inventories", bs(inv0, inv1)], ["Trade payables", bs(pay0, pay1)]])
        ],
        paper: { sections: [
          S("Cash flows from operating activities", [
            R("Net profit", giv(NP)),
            R("Depreciation", inp("dep", dep, "Add back the non-cash expense.", `+${eur(dep)}.`)),
            R("(Increase) / decrease in trade receivables", inp("rec", aR, "Opening − closing, for an asset.", whyA("Receivables", rec0, rec1))),
            R("(Increase) / decrease in inventories", inp("inv", aI, "Opening − closing, for an asset.", whyA("Inventories", inv0, inv1))),
            R("Increase / (decrease) in trade payables", inp("pay", aP, "Closing − opening, for a liability.", `Payables went from ${eur(pay0)} to ${eur(pay1)}: ${pay1 > pay0 ? "suppliers financed more" : "the company paid down suppliers"}, so ${eur(aP)}.`)),
            R("Net cash from operating activities", inp("cfo", cfo, "Profit + all the adjustments.", `${sum([NP, dep, aR, aI, aP])} = ${eur(cfo)}.`), { total: true })
          ])
        ] },
        rule: "For operating assets the cash effect is opening − closing; for operating liabilities it is closing − opening. Getting the direction right is the whole exercise."
      };
    }
  });

  register({
    id: "fa5-cash-flow-segments", chapter: 5, level: 3, source: "PDF 5.5", title: "Cash flow and segments",
    original: { NP: 95000, dep: 24000, gain: 5000, dRec: 14000, dInv: -7000, dPay: 9000, sale: 18000, capex: 62000, loans: 30000, div: 20000, open: 36000, rA: 420000, rB: 280000, oA: 63000, oB: 21000 },
    gen: r => {
      for (;;) {
        const ch = () => (r.chance(0.5) ? 1 : -1) * r.step(1000, 40000, 1000);
        const sale = r.step(5000, 60000, 1000), gain = r.chance(0.7) ? r.step(1000, 20000, 1000) : -r.step(1000, 10000, 1000);
        const NP = r.step(20000, 500000, 1000);
        const T = r.step(400000, 4000000, 100000), sA = r.step(20, 80, 5), rA = T * sA / 100, rB = T - rA;
        const v = {
          NP, dep: r.step(5000, 120000, 1000), gain, dRec: ch(), dInv: ch(), dPay: ch(), sale, capex: r.step(10000, 300000, 1000),
          loans: r.step(0, 200000, 5000), div: r.step(0, NP * 0.6, 1000), open: r.step(5000, 200000, 1000),
          rA, rB, oA: rA * r.step(2, 25, 0.5) / 100, oB: rB * r.step(-5, 20, 0.5) / 100
        };
        const cfo = v.NP + v.dep - v.gain - v.dRec - v.dInv + v.dPay;
        if (sale - gain > 0 && v.open + cfo + sale - v.capex + v.loans - v.div > 1000) return v;
      }
    },
    build(p) {
      const { y, NP, dep, gain, dRec, dInv, dPay, sale, capex, loans, div, open, rA, rB, oA, oB } = p;
      const cfo = NP + dep - gain - dRec - dInv + dPay, cfi = sale - capex, cff = loans - div, net = cfo + cfi + cff, close = open + net;
      const T = rA + rB;
      const move = (name, d) => [name, `${d > 0 ? "increased" : "decreased"} by ${eur(Math.abs(d))}`];
      return {
        brief: `Prepare the ${y} cash flow statement (indirect method) and the segment ratios. ${SIGN_NOTE} Round percentages to two decimals.`,
        docs: [
          doc("memo", "Controller's notes", [["Net profit", eur(NP)], ["Depreciation", eur(dep)], [gain >= 0 ? "Gain on disposal of a machine" : "Loss on disposal of a machine", eur(Math.abs(gain))], move("Trade receivables", dRec), move("Inventories", dInv), move("Trade payables", dPay)]),
          doc("bank", `Bank movements · ${y}`, [["Machine sold for", eur(sale)], ["New plant bought", eur(capex)], ["New loans", eur(loans)], ["Dividends paid", eur(div)], [`Cash at 1 Jan ${y}`, eur(open)]]),
          doc("report", "Segment report", [["Segment A revenue", eur(rA)], ["Segment B revenue", eur(rB)], ["Segment A operating profit", eur(oA)], ["Segment B operating profit", eur(oB)]])
        ],
        paper: { sections: [
          S("Operating activities", [
            R("Net profit", giv(NP)),
            R("Depreciation", inp("dep", dep, "Non-cash expense: add back.", `+${eur(dep)}.`)),
            R("Gain (−) / loss (+) on disposal", inp("gain", -gain, "The disposal's cash is in investing; remove its profit effect here.", gain >= 0 ? `The ${eur(gain)} gain is not operating cash: subtract it. The ${eur(sale)} proceeds go to investing.` : `The ${eur(-gain)} loss reduced profit without using cash: add it back.`)),
            R("(Increase) / decrease in trade receivables", inp("rec", -dRec, "An asset increase uses cash.", `${eur(-dRec)}.`)),
            R("(Increase) / decrease in inventories", inp("inv", -dInv, "An asset increase uses cash.", `${eur(-dInv)}.`)),
            R("Increase / (decrease) in trade payables", inp("pay", dPay, "A liability increase saves cash.", `${eur(dPay)}.`)),
            R("Net cash from operating activities", inp("cfo", cfo, "Profit + adjustments.", `${sum([NP, dep, -gain, -dRec, -dInv, dPay])} = ${eur(cfo)}.`), { total: true })
          ]),
          S("Investing activities", [
            R("Proceeds from sale of machine", inp("sale", sale, "The cash received, not the gain.", `+${eur(sale)}.`)),
            R("Purchase of plant", inp("capex", -capex, "Cash out for a long-term asset.", `${eur(-capex)}.`)),
            R("Net cash from investing activities", inp("cfi", cfi, "Sum of the lines.", `${eur(sale)} − ${eur(capex)} = ${eur(cfi)}.`), { total: true })
          ]),
          S("Financing activities", [
            R("New loans", inp("loans", loans, "Borrowing brings cash in.", `+${eur(loans)}.`)),
            R("Dividends paid", inp("div", -div, "Paid to the owners.", `${eur(-div)}.`)),
            R("Net cash from financing activities", inp("cff", cff, "Sum of the lines.", `${eur(loans)} − ${eur(div)} = ${eur(cff)}.`), { total: true })
          ]),
          S("Reconciliation", [
            R("Net change in cash", inp("net", net, "Operating + investing + financing.", `${sum([cfo, cfi, cff])} = ${eur(net)}.`), { total: true }),
            R(`Cash at 1 Jan ${y}`, giv(open)),
            R(`Cash at 31 Dec ${y}`, inp("close", close, "Opening + net change.", `${sum([open, net])} = ${eur(close)}.`), { total: true, grand: true })
          ]),
          S("Segment information", [
            R("Revenue", [giv(rA), giv(rB)]),
            R("Operating profit", [giv(oA), giv(oB)]),
            R("Share of total revenue", [
              inp("shA", rA / T * 100, "Segment revenue ÷ total revenue.", `${eur(rA)} ÷ ${eur(T)} = ${pct(rA / T * 100)}.`, { fmt: "pct" }),
              inp("shB", rB / T * 100, "Segment revenue ÷ total revenue.", `${eur(rB)} ÷ ${eur(T)} = ${pct(rB / T * 100)}.`, { fmt: "pct" })
            ]),
            R("Operating margin", [
              inp("mA", oA / rA * 100, "Operating profit ÷ segment revenue.", `${eur(oA)} ÷ ${eur(rA)} = ${pct(oA / rA * 100)}.`, { fmt: "pct" }),
              inp("mB", oB / rB * 100, "Operating profit ÷ segment revenue.", `${eur(oB)} ÷ ${eur(rB)} = ${pct(oB / rB * 100)}.`, { fmt: "pct" })
            ])
          ], ["Segment A", "Segment B"])
        ] },
        checks: [{ label: "Sections − net change", terms: [[1, "cfo"], [1, "cfi"], [1, "cff"], [-1, "net"]] }],
        rule: "A disposal gain is removed from operating cash flow because the whole proceeds are shown in investing. IFRS 8 segment ratios are computed on each segment's own revenue."
      };
    }
  });

  register({
    id: "fa5-full-cfs", chapter: 5, level: 3, title: "Full cash flow statement from the balance sheets",
    gen: r => {
      for (;;) {
        const [rec0, rec1] = pair(r), [inv0, inv1] = pair(r), [pay0, pay1] = pair(r);
        const NP = r.step(20000, 400000, 1000), dep = r.step(10000, 150000, 1000), k = r.step(2000, 60000, 1000);
        const proceeds = k + r.step(-k * 0.5, k * 0.5, 500), X = r.step(10000, 300000, 1000);
        const PPE0 = r.step(dep + k + 50000, 2000000, 1000);
        const L0 = r.step(50000, 800000, 5000), B = r.step(0, 300000, 5000), Rp = r.step(0, Math.min(L0, 200000), 5000);
        const SC0 = r.step(100000, 1000000, 10000), I = r.chance(0.4) ? r.step(10000, 200000, 10000) : 0;
        const RE0 = r.step(20000, 800000, 1000), div = r.step(0, NP * 0.6, 1000), cash0 = r.step(5000, 200000, 1000);
        const v = { NP, dep, k, proceeds, X, PPE0, rec0, rec1, inv0, inv1, pay0, pay1, L0, B, Rp, SC0, I, RE0, div, cash0 };
        const cfo = NP + dep - (proceeds - k) + (v.rec0 - v.rec1) + (v.inv0 - v.inv1) + (v.pay1 - v.pay0);
        const cash1 = cash0 + cfo + proceeds - X + B - Rp + I - div;
        if (cash1 > 1000) return v;
      }
    },
    build(p) {
      const { y, NP, dep, k, proceeds, X, PPE0, rec0, rec1, inv0, inv1, pay0, pay1, L0, B, Rp, SC0, I, RE0, div, cash0 } = p;
      const gain = proceeds - k, PPE1 = PPE0 - dep - k + X, L1 = L0 + B - Rp, SC1 = SC0 + I, RE1 = RE0 + NP - div;
      const aR = rec0 - rec1, aI = inv0 - inv1, aP = pay1 - pay0;
      const cfo = NP + dep - gain + aR + aI + aP, cfi = proceeds - X, cff = B - Rp + I - div, net = cfo + cfi + cff, cash1 = cash0 + net;
      return {
        brief: `Prepare the full ${y} cash flow statement (indirect method). Some flows are not given: derive them from the balance-sheet movements. ${SIGN_NOTE}`,
        docs: [
          doc("report", "Balance sheet extract", [["Property, plant and equipment (net)", bs(PPE0, PPE1)], ["Trade receivables", bs(rec0, rec1)], ["Inventories", bs(inv0, inv1)], ["Trade payables", bs(pay0, pay1)], ["Bank loans", bs(L0, L1)], ["Share capital", bs(SC0, SC1)], ["Retained earnings", bs(RE0, RE1)], ["Cash", bs(cash0, cash1)]]),
          doc("report", `Income statement extract · ${y}`, [["Net profit", eur(NP)], ["Depreciation", eur(dep)], [gain >= 0 ? "Gain on disposal" : "Loss on disposal", eur(Math.abs(gain))]]),
          doc("memo", "Notes", [["Machine sold", `carrying amount ${eur(k)}, proceeds ${eur(proceeds)}`], ["New bank loans raised", eur(B)]], "PPE moved only through purchases, depreciation and the disposal. Share capital changed only through issues for cash; retained earnings only through profit and dividends paid.")
        ],
        paper: { sections: [
          S("Operating activities", [
            R("Net profit", giv(NP)),
            R("Depreciation", inp("dep", dep, "Add back the non-cash charge.", `+${eur(dep)}.`)),
            R("Gain (−) / loss (+) on disposal", inp("gain", -gain, "Remove the disposal's profit effect.", `Proceeds ${eur(proceeds)} − carrying amount ${eur(k)} = ${gain >= 0 ? "gain" : "loss"} of ${eur(Math.abs(gain))}: ${eur(-gain)}.`)),
            R("(Increase) / decrease in trade receivables", inp("rec", aR, "Opening − closing.", `${eur(rec0)} − ${eur(rec1)} = ${eur(aR)}.`)),
            R("(Increase) / decrease in inventories", inp("inv", aI, "Opening − closing.", `${eur(inv0)} − ${eur(inv1)} = ${eur(aI)}.`)),
            R("Increase / (decrease) in trade payables", inp("pay", aP, "Closing − opening.", `${eur(pay1)} − ${eur(pay0)} = ${eur(aP)}.`)),
            R("Net cash from operating activities", inp("cfo", cfo, "Profit + adjustments.", `${sum([NP, dep, -gain, aR, aI, aP])} = ${eur(cfo)}.`), { total: true })
          ]),
          S("Investing activities", [
            R("Proceeds from sale of machine", inp("proc", proceeds, "Cash received for the machine.", `+${eur(proceeds)}.`)),
            R("Purchase of PPE", inp("capex", -X, "Closing PPE − opening PPE + depreciation + carrying amount disposed.", `${eur(PPE1)} − ${eur(PPE0)} + ${eur(dep)} + ${eur(k)} = ${eur(X)} bought: ${eur(-X)}.`)),
            R("Net cash from investing activities", inp("cfi", cfi, "Sum of the lines.", `${eur(proceeds)} − ${eur(X)} = ${eur(cfi)}.`), { total: true })
          ]),
          S("Financing activities", [
            R("New bank loans", inp("borrow", B, "Given in the notes.", `+${eur(B)}.`)),
            R("Loan repayments", inp("repay", -Rp, "Opening loans + new loans − closing loans.", `${eur(L0)} + ${eur(B)} − ${eur(L1)} = ${eur(Rp)} repaid: ${eur(-Rp)}.`)),
            R("Issue of share capital", inp("issue", I, "Closing − opening share capital.", `${eur(SC1)} − ${eur(SC0)} = ${eur(I)}.`)),
            R("Dividends paid", inp("div", -div, "Opening retained earnings + profit − closing retained earnings.", `${eur(RE0)} + ${eur(NP)} − ${eur(RE1)} = ${eur(div)} paid: ${eur(-div)}.`)),
            R("Net cash from financing activities", inp("cff", cff, "Sum of the lines.", `${sum([B, -Rp, I, -div])} = ${eur(cff)}.`), { total: true })
          ]),
          S("Reconciliation", [
            R("Net change in cash", inp("net", net, "Operating + investing + financing.", `${sum([cfo, cfi, cff])} = ${eur(net)}.`), { total: true }),
            R(`Cash at 1 Jan ${y}`, giv(cash0)),
            R(`Cash at 31 Dec ${y}`, inp("close", cash1, "Opening + net change.", `${sum([cash0, net])} = ${eur(cash1)}, which agrees with the balance sheet.`), { total: true, grand: true })
          ])
        ] },
        checks: [{ label: "Your closing cash − balance-sheet cash", terms: [[1, "close"], [-1, cash1]] }],
        rule: "When a flow is not given, a T-account on the balance-sheet line finds it: opening + increases − decreases = closing. The cash flow statement must agree with the change in cash on the balance sheet."
      };
    }
  });
})();
