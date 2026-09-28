/* Chapter 3 — Balance sheet: equity and liabilities. */
(function () {
  "use strict";
  const { register, inp, pick, giv, R, S, doc, eur, qty, fmt, dt, plural } = DeskCore.dsl;

  const EVENTS = {
    contribution: { text: k => `Shareholders contribute ${eur(k)} in cash.`, a: 1, l: 0, e: 1, why: "Cash (an asset) and share capital (equity) both rise." },
    loan: { text: k => `The company draws a bank loan of ${eur(k)}.`, a: 1, l: 1, e: 0, why: "Cash rises and so does the debt; equity is untouched." },
    repay: { text: k => `The company repays ${eur(k)} of bank debt in cash.`, a: -1, l: -1, e: 0, why: "Cash and the loan fall together; equity is untouched." },
    credit: { text: k => `The company buys equipment for ${eur(k)} on 60-day credit.`, a: 1, l: 1, e: 0, why: "Equipment rises and so do trade payables; equity is untouched." },
    dividend: { text: k => `The company pays a dividend of ${eur(k)} in cash.`, a: -1, l: 0, e: -1, why: "Cash leaves the company and retained earnings fall by the same amount." }
  };

  register({
    id: "fa3-equation", chapter: 3, level: 1, source: "PDF 3.1", title: "The accounting equation",
    original: { A: 760000, L: 485000, event: "contribution", K: 35000 },
    gen: r => {
      const A = r.step(200000, 2000000, 5000), L = r.step(A * 0.3, A * 0.75, 5000);
      return { A, L, event: r.pick(Object.keys(EVENTS)), K: r.step(5000, Math.min(100000, (A - L) * 0.5, L * 0.5), 5000) };
    },
    build(p) {
      const { A, L, K } = p, ev = EVENTS[p.event];
      const E = A - L, A1 = A + ev.a * K, L1 = L + ev.l * K, E1 = E + ev.e * K;
      return {
        brief: "Find equity from the accounting equation, then update the three totals for one more transaction.",
        docs: [
          doc("report", "Balance sheet totals", [["Total assets", eur(A)], ["Total liabilities", eur(L)]]),
          doc("memo", "Next transaction", [], ev.text(K))
        ],
        paper: { sections: [
          S("Before", [
            R("Equity", inp("e0", E, "Assets − liabilities.", `${eur(A)} − ${eur(L)} = ${eur(E)}.`), { total: true })
          ]),
          S("After the transaction", [
            R("Total assets", inp("a1", A1, "Does the transaction add or remove an asset?", `${ev.why} ${eur(A)} → ${eur(A1)}.`)),
            R("Total liabilities", inp("l1", L1, "Does the transaction create or settle a debt?", `${eur(L)} → ${eur(L1)}.`)),
            R("Equity", inp("e1", E1, "Assets − liabilities after the transaction.", `${eur(A1)} − ${eur(L1)} = ${eur(E1)}.`), { total: true })
          ])
        ] },
        checks: [{ label: "Assets − liabilities − equity", terms: [[1, "a1"], [-1, "l1"], [-1, "e1"]] }],
        rule: "Assets = liabilities + equity after every transaction. Only transactions with the owners (contributions, dividends) or with profit and loss change equity."
      };
    }
  });

  register({
    id: "fa3-soce", chapter: 3, level: 1, source: "PDF 3.2", title: "Statement of changes in equity",
    original: { O: 210000, P: 48000, D: 19000, K: 30000 },
    gen: r => {
      const O = r.step(50000, 900000, 5000);
      const P = r.chance(0.2) ? -r.step(5000, Math.min(60000, O * 0.5), 1000) : r.step(5000, 150000, 1000);
      return { O, P, D: P > 0 ? r.step(0, P * 0.6, 1000) : 0, K: r.chance(0.6) ? r.step(10000, 100000, 5000) : 0 };
    },
    build(p) {
      const { y, O, P, D, K } = p;
      const C = O + P - D + K;
      return {
        brief: `Prepare the statement of changes in equity for ${y}. Enter increases as positive and decreases as negative amounts.`,
        docs: [
          doc("report", `Closing file · ${y}`, [["Equity, 1 January", eur(O)], [P >= 0 ? "Profit for the year" : "Loss for the year", eur(Math.abs(P))], ["Dividends declared and paid", eur(D)], ["New share capital paid in", eur(K)]])
        ],
        paper: { sections: [
          S(`Statement of changes in equity · ${y}`, [
            R("Equity at 1 January", giv(O)),
            R("Profit (loss) for the year", inp("p", P, "A loss reduces equity.", P >= 0 ? `The profit of ${eur(P)} increases retained earnings.` : `The loss of ${eur(-P)} reduces equity: enter ${eur(P)}.`)),
            R("Dividends", inp("d", D ? -D : 0, "Dividends are paid out of equity: enter them as negative.", D ? `Dividends take ${eur(D)} out of equity: ${eur(-D)}. They are a distribution, not an expense.` : "No dividends were declared: 0.")),
            R("Issue of share capital", inp("k", K, "Cash paid in by shareholders.", K ? `Shareholders paid in ${eur(K)}.` : "No new capital: 0.")),
            R("Equity at 31 December", inp("c", C, "Opening + all the movements.", `${eur(O)} ${P >= 0 ? "+" : "−"} ${eur(Math.abs(P))} − ${eur(D)} + ${eur(K)} = ${eur(C)}.`), { total: true }),
            R("Total change in equity", inp("chg", C - O, "Closing − opening.", `${eur(C)} − ${eur(O)} = ${eur(C - O)}.`))
          ])
        ] },
        checks: [{ label: "Opening + movements − closing", terms: [[1, O], [1, "p"], [1, "d"], [1, "k"], [-1, "c"]] }],
        rule: "IAS 1: the statement of changes in equity reconciles opening and closing equity. Profit and new capital increase it; dividends are distributions to owners, never an expense."
      };
    }
  });

  const LIABS = [
    ["Share capital", "Equity"], ["Retained earnings", "Equity"], ["Share premium", "Equity"],
    ["Trade payables", "Current liability"], ["Income tax payable", "Current liability"], ["Bank overdraft", "Current liability"],
    ["Dividends declared, payable in January", "Current liability"], ["Bank loan: instalments due within 12 months", "Current liability"],
    ["December wages still unpaid", "Current liability"],
    ["Bank loan: instalments due after 12 months", "Non-current liability"], ["Bond maturing in 4 years", "Non-current liability"],
    ["Deferred tax liability", "Non-current liability"], ["Post-employment benefits (TFR)", "Non-current liability"],
    ["Warranty provision used after 12 months", "Non-current liability"]
  ];
  const CLASSES = ["Equity", "Current liability", "Non-current liability"];

  register({
    id: "fa3-classify", chapter: 3, level: 1, title: "Classify equity and liabilities",
    gen: r => {
      for (;;) {
        const items = r.sample(LIABS, 7);
        const n = c => items.filter(i => i[1] === c).length;
        if (n("Equity") >= 1 && n("Current liability") >= 2 && n("Non-current liability") >= 2) {
          return { items: items.map(([name, cls]) => ({ name, cls, amount: r.step(5000, 150000, 1000) })) };
        }
      }
    },
    build(p) {
      const { y, items } = p;
      const sum = c => items.filter(i => i.cls === c).reduce((s, i) => s + i.amount, 0);
      const names = c => items.filter(i => i.cls === c).map(i => eur(i.amount)).join(" + ");
      const why = {
        "Equity": "It belongs to the owners, not to a creditor.",
        "Current liability": "It will be settled within 12 months of the reporting date (or is held for trading).",
        "Non-current liability": "It falls due more than 12 months after the reporting date. Deferred tax is always non-current under IAS 1."
      };
      const total = (key, label, c) => R(label, [inp(key, sum(c), `Add the lines you classified as ${c.toLowerCase()}.`, `${names(c)} = ${eur(sum(c))}.`)], { total: true });
      return {
        brief: `Classify each balance at 31 December ${y} and total the three groups of the balance sheet.`,
        docs: [doc("ledger", `Trial balance extract · 31 Dec ${y}`, items.map(i => [i.name, eur(i.amount)]))],
        paper: { sections: [
          S("Classification", items.map((it, i) => R(`${it.name} · ${eur(it.amount)}`, pick(`c${i}`, CLASSES, it.cls, "Owners' claim, or a debt? If a debt, due within 12 months?", why[it.cls])))),
          S("Totals", [
            total("te", "Total equity", "Equity"),
            total("tcl", "Total current liabilities", "Current liability"),
            total("tncl", "Total non-current liabilities", "Non-current liability")
          ])
        ] },
        rule: "IAS 1: a liability is current if it is due within 12 months of the reporting date; otherwise it is non-current. A loan is split between the two by its instalments."
      };
    }
  });

  register({
    id: "fa3-loan", chapter: 3, level: 1, title: "Bank loan: interest and classification",
    gen: r => { const n = r.pick([4, 5, 8, 10]); return { n, L: n * r.step(5000, 60000, 5000), rate: r.pick([2, 3, 4, 5, 6]) }; },
    build(p) {
      const { y, n, L, rate } = p;
      const inst = L / n, interest = L * rate / 100, out = L - inst, ncl = out - inst;
      return {
        brief: `A bank loan was drawn on 1 January ${y}. After the first repayment on 31 December ${y}, record the interest and present the loan on the balance sheet.`,
        docs: [
          doc("contract", "Loan agreement", [["Principal", eur(L)], ["Drawn", dt(1, 1, y)], ["Repayment", `${n} equal annual instalments of principal, each 31 December from ${y}`], ["Interest", `${rate}% on the opening balance, paid each 31 December`]])
        ],
        paper: { sections: [
          S(`Year ${y}`, [
            R("Interest expense", inp("int", interest, "Opening balance × rate.", `${eur(L)} × ${rate}% = ${eur(interest)}.`, { abs: true })),
            R("Loan outstanding at 31 December", inp("out", out, "Principal − the first instalment.", `${eur(L)} ÷ ${n} = ${eur(inst)} repaid; ${eur(L)} − ${eur(inst)} = ${eur(out)}.`))
          ]),
          S(`Balance sheet at 31 December ${y}`, [
            R("Current liability (next instalment)", inp("cur", inst, "The part due within 12 months.", `The ${y + 1} instalment of ${eur(inst)} is due within 12 months.`)),
            R("Non-current liability", inp("ncl", ncl, "The rest of the outstanding balance.", `${eur(out)} − ${eur(inst)} = ${eur(ncl)}.`))
          ])
        ] },
        checks: [{ label: "Current + non-current − outstanding", terms: [[1, "cur"], [1, "ncl"], [-1, "out"]] }],
        rule: "Interest is an expense of the period it accrues in; repayments of principal are not expenses. The loan is split into the instalment due within 12 months (current) and the rest (non-current)."
      };
    }
  });

  const CLAIMS = [["compensation for a delayed product recall", "customers"], ["refunds for a faulty batch of boilers", "buyers"], ["late-delivery penalties", "clients"], ["repairs under a service guarantee", "customers"]];

  register({
    id: "fa3-provision", chapter: 3, level: 2, source: "PDF 3.3", title: "Provision at expected value",
    original: { N: 100, a: [0, 200, 500], pr: [20, 50, 30] },
    gen: r => {
      for (;;) {
        const p1 = r.step(10, 40, 5), p2 = r.step(20, 60, 5), p3 = 100 - p1 - p2;
        if (p3 < 10) continue;
        const [what, who] = r.pick(CLAIMS);
        return { N: r.step(50, 2000, 10), a: [0, r.step(50, 400, 50), r.step(450, 1500, 50)], pr: [p1, p2, p3], what, who };
      }
    },
    build(p) {
      const { y, N, a, pr } = p;
      const ev = a.reduce((s, x, i) => s + x * pr[i] / 100, 0), total = ev * N;
      const what = p.what || "compensation", who = p.who || "customers";
      return {
        brief: `The company must pay ${what} to ${qty(N)} ${who}. Measure the provision at 31 December ${y}. Ignore discounting.`,
        docs: [
          doc("memo", "Legal department estimate", a.map((x, i) => [`${eur(x)} per claim`, `${pr[i]}% probability`]), `The same distribution applies to each of the ${qty(N)} claims.`)
        ],
        paper: { sections: [
          S("Provision", [
            R("Measurement basis", pick("basis", ["Expected value (probability-weighted)", "Most likely outcome", "Maximum possible amount"], "Expected value (probability-weighted)", "A large population of similar obligations.", "With a large population of similar claims, IAS 37 weights every outcome by its probability.")),
            R("Expected payment per claim", inp("ev", ev, "Σ amount × probability.", `${a.map((x, i) => `${eur(x)} × ${pr[i]}%`).join(" + ")} = ${eur(ev)}.`, { tol: 0.01 })),
            R("Total provision", inp("total", total, "Expected payment × number of claims.", `${eur(ev)} × ${qty(N)} = ${eur(total)}.`), { total: true })
          ])
        ] },
        rule: "IAS 37: a provision is the best estimate of the expenditure needed to settle the obligation. For a large population of items that is the expected value; for a single obligation it may be the most likely outcome."
      };
    }
  });

  register({
    id: "fa3-deferred-tax", chapter: 3, level: 2, source: "PDF 3.4", title: "Deferred taxes",
    original: { aCA: 160000, aTB: 120000, pCA: 30000, t: 25 },
    gen: r => { const aTB = r.step(20000, 300000, 1000); return { aTB, aCA: aTB + r.step(4000, 80000, 1000), pCA: r.step(2000, 60000, 1000), t: r.pick([20, 24, 25, 30]) }; },
    build(p) {
      const { y, aCA, aTB, pCA, t } = p;
      const dA = aCA - aTB, dtl = dA * t / 100, dta = pCA * t / 100;
      return {
        brief: `Compute the deferred tax balances at 31 December ${y}. The tax benefit on the provision can be recovered.`,
        docs: [
          doc("report", "Tax working paper", [["Machinery: carrying amount", eur(aCA)], ["Machinery: tax base", eur(aTB)], ["Provision: carrying amount", eur(pCA)], ["Provision: tax base", "nil (deductible only when paid)"], ["Tax rate", `${t}%`]])
        ],
        paper: { sections: [
          S("Machinery", [
            R("Taxable temporary difference", inp("dA", dA, "Carrying amount − tax base.", `${eur(aCA)} − ${eur(aTB)} = ${eur(dA)}: the asset will generate more taxable profit than tax depreciation allows.`)),
            R("Deferred tax liability", inp("dtl", dtl, "Difference × tax rate.", `${eur(dA)} × ${t}% = ${eur(dtl)}.`))
          ]),
          S("Provision", [
            R("Deductible temporary difference", inp("dP", pCA, "Carrying amount − tax base (nil).", `${eur(pCA)} − 0 = ${eur(pCA)}: the expense will be deducted when paid.`)),
            R("Deferred tax asset", inp("dta", dta, "Difference × tax rate.", `${eur(pCA)} × ${t}% = ${eur(dta)}.`))
          ]),
          S("Position", [
            R("Net deferred tax (liability +, asset −)", inp("net", dtl - dta, "DTL − DTA.", `${eur(dtl)} − ${eur(dta)} = ${eur(dtl - dta)}.`), { total: true })
          ])
        ] },
        rule: "IAS 12: a carrying amount above the tax base on an asset creates a deferred tax liability; a liability whose expense is deductible later creates a deferred tax asset, recognised if recoverable. Both are non-current."
      };
    }
  });

  register({
    id: "fa3-warranty", chapter: 3, level: 2, title: "Warranty provision roll-forward",
    gen: r => {
      for (;;) {
        const S0 = r.step(200000, 3000000, 10000), w = r.pick([1, 1.5, 2, 2.5, 3]), close = S0 * w / 100;
        const O = r.step(5000, close * 1.2, 500), U = r.step(1000, O * 0.9, 500);
        if (close - O + U > 0) return { S: S0, w, O, U, c: r.pick([40, 50, 60, 70]) };
      }
    },
    build(p) {
      const { y, S: sales, w, O, U, c } = p;
      const close = sales * w / 100, exp = close - O + U, cur = close * c / 100;
      return {
        brief: `Update the warranty provision at 31 December ${y}, find the expense for the year and split the balance for the balance sheet.`,
        docs: [
          doc("ledger", "Warranty provision account", [[`Balance at 1 Jan ${y}`, eur(O)], [`Claims paid in ${y}`, eur(U)]]),
          doc("memo", "Product manager", [[`Sales in ${y}`, eur(sales)], ["Expected warranty cost", `${w}% of sales`], ["Used within 12 months", `${c}% of the closing provision`]])
        ],
        paper: { sections: [
          S("Warranty provision", [
            R("Opening provision", giv(O)),
            R("Claims paid (used)", giv(-U)),
            R("Charge for the year (expense)", inp("exp", exp, "The balancing figure: closing − opening + claims used.", `${eur(close)} − ${eur(O)} + ${eur(U)} = ${eur(exp)}.`)),
            R("Closing provision", inp("close", close, "Sales × expected warranty cost.", `${eur(sales)} × ${w}% = ${eur(close)}.`), { total: true })
          ]),
          S(`Balance sheet at 31 December ${y}`, [
            R("Current portion", inp("cur", cur, "The share used within 12 months.", `${eur(close)} × ${c}% = ${eur(cur)}.`)),
            R("Non-current portion", inp("ncl", close - cur, "The rest.", `${eur(close)} − ${eur(cur)} = ${eur(close - cur)}.`))
          ])
        ] },
        checks: [{ label: "Opening − used + charge − closing", terms: [[1, O], [-1, U], [1, "exp"], [-1, "close"]] }],
        rule: "IAS 37: claims paid are charged against the provision, not to profit. The expense is the amount needed to bring the provision to its required closing balance."
      };
    }
  });

  register({
    id: "fa3-tax-expense", chapter: 3, level: 2, title: "Current and deferred tax expense",
    gen: r => { const PBT = r.step(50000, 800000, 1000); return { PBT, dTD: r.step(2000, Math.min(60000, PBT * 0.5), 1000), ND: r.chance(0.5) ? r.step(1000, 20000, 1000) : 0, t: r.pick([24, 25, 30]) }; },
    build(p) {
      const { y, PBT, dTD, ND, t } = p;
      const taxable = PBT - dTD + ND, cur = taxable * t / 100, def = dTD * t / 100, tot = cur + def;
      return {
        brief: `Compute the ${y} tax expense and the profit for the year.`,
        docs: [
          doc("report", `Tax computation · ${y}`, [["Profit before tax", eur(PBT)], ["Tax depreciation above book depreciation", eur(dTD)], ["Non-deductible fines", eur(ND)], ["Tax rate", `${t}%`]], "The extra tax depreciation reverses in later years; the fines are never deductible.")
        ],
        paper: { sections: [
          S(`Tax · ${y}`, [
            R("Taxable profit", inp("taxable", taxable, "Profit before tax − extra tax depreciation + non-deductible costs.", `${eur(PBT)} − ${eur(dTD)} + ${eur(ND)} = ${eur(taxable)}.`)),
            R("Current tax", inp("cur", cur, "Taxable profit × rate.", `${eur(taxable)} × ${t}% = ${eur(cur)}.`)),
            R("Deferred tax expense (increase in DTL)", inp("def", def, "Temporary difference created × rate.", `${eur(dTD)} × ${t}% = ${eur(def)}.`)),
            R("Total tax expense", inp("tot", tot, "Current + deferred.", `${eur(cur)} + ${eur(def)} = ${eur(tot)}.` + (ND ? ` It exceeds ${t}% of profit because the fines are never deductible.` : ` Exactly ${t}% of profit before tax.`)), { total: true }),
            R("Profit for the year", inp("np", PBT - tot, "Profit before tax − total tax expense.", `${eur(PBT)} − ${eur(tot)} = ${eur(PBT - tot)}.`), { total: true })
          ])
        ] },
        rule: "IAS 12: tax expense = current tax + deferred tax. Temporary differences move tax between years through deferred tax; permanent differences (like fines) change the effective rate."
      };
    }
  });

  register({
    id: "fa3-el-section", chapter: 3, level: 3, source: "PDF 3.5", title: "Equity and liabilities section",
    original: { SC: 300000, R0: 75000, P: 54000, D: 18000, loan: 140000, loanC: 25000, TP: 62000, war: 24000, warC: 9000, DTL: 11000 },
    gen: r => {
      const P = r.step(10000, 200000, 1000), loan = r.step(40000, 500000, 5000), war = r.step(6000, 60000, 1000), R0 = r.step(10000, 300000, 1000);
      return {
        SC: r.step(100000, 1000000, 10000), R0, P, D: r.step(0, Math.min(P * 0.6, R0), 1000),
        loan, loanC: r.step(5000, loan * 0.3, 5000), TP: r.step(10000, 200000, 1000), war, warC: r.step(1000, war * 0.6, 1000), DTL: r.step(2000, 40000, 1000)
      };
    },
    build(p) {
      const { y, SC, R0, P, D, loan, loanC, TP, war, warC, DTL } = p;
      const res = R0 - D, TE = SC + res + P;
      const loanN = loan - loanC, warN = war - warC, NCL = loanN + warN + DTL, CL = loanC + TP + warC, TL = NCL + CL;
      return {
        brief: `Prepare the equity and liabilities side of the balance sheet at 31 December ${y}.`,
        docs: [
          doc("ledger", `Closing balances · 31 Dec ${y}`, [["Share capital", eur(SC)], ["Reserves at 1 January", eur(R0)], [`Profit for ${y}`, eur(P)], [`Dividends paid in ${y}`, eur(D)], ["Trade payables", eur(TP)], ["Deferred tax liability", eur(DTL)]]),
          doc("contract", "Bank loan", [["Outstanding", eur(loan)], ["Due within 12 months", eur(loanC)]]),
          doc("memo", "Warranty provision", [["Balance", eur(war)], ["Expected to be settled within 12 months", eur(warC)]])
        ],
        paper: { sections: [
          S("Equity", [
            R("Share capital", giv(SC)),
            R("Reserves (after dividends)", inp("res", res, "Opening reserves − dividends paid.", `${eur(R0)} − ${eur(D)} = ${eur(res)}. Dividends come out of reserves, not out of profit or loss.`)),
            R("Profit for the year", inp("p", P, "This year's result.", `${eur(P)}.`)),
            R("Total equity", inp("te", TE, "Capital + reserves + profit.", `${eur(SC)} + ${eur(res)} + ${eur(P)} = ${eur(TE)}.`), { total: true })
          ]),
          S("Non-current liabilities", [
            R("Bank loan (due after 12 months)", inp("loanN", loanN, "Total loan − the current portion.", `${eur(loan)} − ${eur(loanC)} = ${eur(loanN)}.`)),
            R("Warranty provision (after 12 months)", inp("warN", warN, "Total provision − the current portion.", `${eur(war)} − ${eur(warC)} = ${eur(warN)}.`)),
            R("Deferred tax liability", inp("dtl", DTL, "Where does deferred tax always go?", `${eur(DTL)}: IAS 1 never classifies deferred tax as current.`)),
            R("Total non-current liabilities", inp("ncl", NCL, "Sum of the three lines.", `${eur(loanN)} + ${eur(warN)} + ${eur(DTL)} = ${eur(NCL)}.`), { total: true })
          ]),
          S("Current liabilities", [
            R("Bank loan (current portion)", inp("loanC", loanC, "Due within 12 months.", `${eur(loanC)}.`)),
            R("Trade payables", inp("tp", TP, "Normally settled within the operating cycle.", `${eur(TP)}.`)),
            R("Warranty provision (current)", inp("warC", warC, "Expected to be used within 12 months.", `${eur(warC)}.`)),
            R("Total current liabilities", inp("cl", CL, "Sum of the three lines.", `${eur(loanC)} + ${eur(TP)} + ${eur(warC)} = ${eur(CL)}.`), { total: true })
          ]),
          S("Totals", [
            R("Total liabilities", inp("tl", TL, "Non-current + current.", `${eur(NCL)} + ${eur(CL)} = ${eur(TL)}.`), { total: true }),
            R("Total equity and liabilities (= total assets)", inp("tel", TE + TL, "Equity + liabilities; the assets must equal it.", `${eur(TE)} + ${eur(TL)} = ${eur(TE + TL)}.`), { total: true, grand: true })
          ])
        ] },
        checks: [{ label: "Equity + liabilities − total", terms: [[1, "te"], [1, "tl"], [-1, "tel"]] }],
        rule: "IAS 1: equity is shown by component; liabilities are split into current (due within 12 months) and non-current, with loans and provisions divided by timing. Total equity and liabilities equals total assets."
      };
    }
  });

  register({
    id: "fa3-soce-components", chapter: 3, level: 3, title: "Equity by component with a share issue",
    gen: r => {
      for (;;) {
        const v = r.pick([1, 2, 5]), N0 = r.step(50000, 1000000, 10000), N1 = r.step(10000, 300000, 10000);
        const price = v + r.int(1, 12), d = r.pick([0.1, 0.2, 0.25, 0.3, 0.5]), P = r.step(50000, 2000000, 5000);
        const div = d * (N0 + N1);
        if (div < P * 0.8) return { v, N0, N1, price, d, P, SP0: r.step(0, 500000, 5000), RE0: r.step(10000, 900000, 5000), month: r.int(2, 10) };
      }
    },
    build(p) {
      const { y, v, N0, N1, price, d, P, SP0, RE0, month } = p;
      const SC0 = N0 * v, dSC = N1 * v, dSP = N1 * (price - v), div = DeskCore.round(d * (N0 + N1), 2), dRE = P - div;
      const tMove = dSC + dSP + dRE, tClose = SC0 + SP0 + RE0 + tMove;
      return {
        brief: `Prepare the statement of changes in equity for ${y} by component.`,
        docs: [
          doc("ledger", `Equity at 1 Jan ${y}`, [["Share capital", `${qty(N0)} shares of ${eur(v)} nominal = ${eur(SC0)}`], ["Share premium", eur(SP0)], ["Retained earnings", eur(RE0)]]),
          doc("memo", "Board minutes", [["Share issue", `${qty(N1)} new shares at ${eur(price)} each, paid in cash on ${dt(1, month, y)}`], ["Dividend", `${eur(d)} per share on every share outstanding at 31 Dec, paid in December`], [`Profit for ${y}`, eur(P)]])
        ],
        paper: { sections: [
          S(`Equity · ${y}`, [
            R("Share capital", [
              inp("dSC", dSC, "New shares × nominal value.", `${qty(N1)} × ${eur(v)} = ${eur(dSC)}.`),
              inp("SC1", SC0 + dSC, "Opening + movement.", `${eur(SC0)} + ${eur(dSC)} = ${eur(SC0 + dSC)}.`)
            ]),
            R("Share premium", [
              inp("dSP", dSP, "New shares × (issue price − nominal).", `${qty(N1)} × (${eur(price)} − ${eur(v)}) = ${eur(dSP)}.`),
              inp("SP1", SP0 + dSP, "Opening + movement.", `${eur(SP0)} + ${eur(dSP)} = ${eur(SP0 + dSP)}.`)
            ]),
            R("Retained earnings", [
              inp("dRE", dRE, "Profit − dividends.", `${eur(P)} − ${eur(div)} = ${eur(dRE)}.`),
              inp("RE1", RE0 + dRE, "Opening + movement.", `${eur(RE0)} + ${eur(dRE)} = ${eur(RE0 + dRE)}.`)
            ]),
            R("Total equity", [
              inp("tMove", tMove, "Sum of the movements.", `${eur(dSC)} + ${eur(dSP)} + ${eur(dRE)} = ${eur(tMove)}.`),
              inp("tClose", tClose, "Sum of the closing balances.", `${eur(SC0 + dSC)} + ${eur(SP0 + dSP)} + ${eur(RE0 + dRE)} = ${eur(tClose)}.`)
            ], { total: true })
          ], ["Movement", "31 Dec"]),
          S("Memo", [
            R("Dividends paid", inp("div", div, "Dividend per share × shares outstanding at year-end.", `${eur(d)} × ${qty(N0 + N1)} shares = ${eur(div)}.`))
          ])
        ] },
        rule: "Shares issued above nominal value split the proceeds between share capital (nominal) and share premium (the excess). Profit and dividends move retained earnings only."
      };
    }
  });
})();
