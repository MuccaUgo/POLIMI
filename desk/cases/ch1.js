/* Chapter 1 — Financial reporting and accounting principles: accrual versus cash. */
(function () {
  "use strict";
  const { register, inp, giv, R, S, doc, eur, dt, periodEnd, plural } = DeskCore.dsl;

  const GOODS = ["industrial pumps", "office furniture", "LED panels", "packaging machines", "garden tools", "espresso machines", "bicycle frames"];
  const CUSTOMERS = ["Rossi Retail", "Verdi Hotels", "Bianchi Logistics", "Nord Ovest Trading", "Galli Interiors", "Marino Foods", "Costa Clinics", "Ferri Garden Centres"];
  const PREPAID = [["insurance premium", "Alba Insurance"], ["software subscription", "Nimbus Software"], ["maintenance contract", "Tecnoservice Nord"], ["warehouse rent", "Duomo Properties"], ["security service", "Guardia Security"]];
  const SERVICES = [["electricity", "Lombardia Energia"], ["cleaning services", "Pulito Facility"], ["IT support", "Bitline Support"], ["temporary staff", "Staff Plus Agency"]];
  const years = y => [String(y), String(y + 1)];

  register({
    id: "fa1-credit-sale", chapter: 1, level: 1, source: "PDF 1.1", title: "Credit sale across year-end",
    original: { amount: 18000, day: 28, payDay: 20, payMonth: 1 },
    gen: r => ({ amount: r.step(4000, 80000, 500), day: r.int(10, 30), payDay: r.int(5, 28), payMonth: r.int(1, 2), goods: r.pick(GOODS), customer: r.pick(CUSTOMERS) }),
    build(p) {
      const { y, amount } = p;
      const del = dt(p.day, 12, y), paid = dt(p.payDay, p.payMonth, y + 1);
      return {
        brief: `Goods were delivered in December and paid for in the new year. Record revenue and cash in each year, and the receivable at 31 December ${y}.`,
        docs: [
          doc("invoice", `Sales invoice · ${p.customer}`, [["Goods", p.goods], ["Delivered", del], ["Amount", eur(amount)], ["Payment due", paid]]),
          doc("bank", `Bank statement · ${y + 1}`, [[paid, `Receipt from ${p.customer} ${eur(amount)}`]])
        ],
        paper: { sections: [
          S("Revenue and cash", [
            R("Revenue", [
              inp("rev0", amount, "Revenue belongs to the year the goods are delivered.", `The goods were delivered on ${del}, so ${eur(amount)} is revenue of ${y}.`),
              inp("rev1", 0, "Is anything new delivered in the second year?", `Collecting the invoice in ${y + 1} is not a new sale: revenue is 0.`)
            ]),
            R("Cash received", [
              inp("cash0", 0, "Cash is recorded only when it arrives.", `No cash came in during ${y}.`),
              inp("cash1", amount, "Look at the bank statement.", `The customer paid ${eur(amount)} on ${paid}.`)
            ])
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Trade receivable", inp("rec", amount, "Earned but not yet collected at year-end.", `At 31 December ${y} the ${eur(amount)} is earned but still uncollected.`))
          ])
        ] },
        rule: "Accrual basis: revenue is recognised when control of the goods passes to the customer (IFRS 15), whatever the timing of the cash. Until the customer pays, the amount sits in trade receivables."
      };
    }
  });

  register({
    id: "fa1-prepaid", chapter: 1, level: 1, source: "PDF 1.2", title: "Prepaid expense",
    original: { monthly: 1000, month: 10, months: 12 },
    gen: r => {
      const months = r.pick([12, 12, 12, 6, 24]);
      const [item, supplier] = r.pick(PREPAID);
      return { months, month: r.int(Math.max(2, 14 - months), 12), monthly: r.step(100, 2500, 50), item, supplier };
    },
    build(p) {
      const { y, months, month, monthly } = p;
      const amount = monthly * months, m1 = 13 - month, m2 = Math.min(12, months - m1), later = months - m1 - m2;
      const e1 = monthly * m1, e2 = monthly * m2, prepaid = amount - e1;
      const start = dt(1, month, y);
      return {
        brief: `A service was paid in advance on ${start}. Split its cost between the years and find what is still prepaid at 31 December ${y}.`,
        docs: [
          doc("invoice", `Supplier invoice · ${p.supplier}`, [["Service", p.item], ["Period covered", `${start} – ${periodEnd(month, y, months)}`], ["Amount", eur(amount)], ["Paid on", start]], "The service is consumed evenly over the period.")
        ],
        paper: { sections: [
          S("Expense and cash", [
            R("Expense recognised", [
              inp("exp0", e1, "Monthly cost × the months of cover that fall in the first year.", `${eur(amount)} ÷ ${months} months = ${eur(monthly)} a month. ${plural(m1, "month")} fall in ${y}: ${eur(e1)}.`, { abs: true }),
              inp("exp1", e2, "Monthly cost × the months of cover that fall in the second year.", `${plural(m2, "month")} fall in ${y + 1}: ${eur(monthly)} × ${m2} = ${eur(e2)}.` + (later ? ` The last ${plural(later, "month")} belong to ${y + 2}.` : ""), { abs: true })
            ]),
            R("Cash paid", [
              inp("cash0", amount, "When did the money leave the bank?", `The whole ${eur(amount)} was paid on ${start}.`, { abs: true }),
              inp("cash1", 0, "Is anything paid in the second year?", `Nothing more is paid in ${y + 1}.`, { abs: true })
            ])
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Prepaid expense (asset)", inp("prepaid", prepaid, "Paid but not yet consumed at year-end.", `${eur(amount)} paid − ${eur(e1)} consumed in ${y} = ${eur(prepaid)} still to be consumed.`))
          ])
        ] },
        rule: "Matching: an expense follows the consumption of the service, not the payment. Cash paid for future periods is a prepaid expense, an asset, until it is used up."
      };
    }
  });

  register({
    id: "fa1-customer-advance", chapter: 1, level: 1, title: "Customer deposit before delivery",
    gen: r => ({ price: r.step(10000, 90000, 1000), pct: r.pick([10, 20, 25, 30, 40, 50]), depMonth: r.int(10, 12), depDay: r.int(2, 28), delMonth: r.int(1, 3), delDay: r.int(2, 28), goods: r.pick(GOODS), customer: r.pick(CUSTOMERS) }),
    build(p) {
      const { y, price } = p;
      const dep = price * p.pct / 100, bal = price - dep;
      const depDate = dt(p.depDay, p.depMonth, y), delDate = dt(p.delDay, p.delMonth, y + 1);
      return {
        brief: `A customer paid a deposit in ${y}; the goods are delivered in ${y + 1}. Record revenue and cash in each year and the balance at 31 December ${y}.`,
        docs: [
          doc("contract", `Sales contract · ${p.customer}`, [["Goods", p.goods], ["Contract price", eur(price)], ["Deposit", `${p.pct}% on signing`], ["Delivery", delDate], ["Balance", "Paid on delivery"]]),
          doc("bank", "Bank receipts", [[depDate, `Deposit from ${p.customer} ${eur(dep)}`], [delDate, `Balance from ${p.customer} ${eur(bal)}`]])
        ],
        paper: { sections: [
          S("Revenue and cash", [
            R("Revenue", [
              inp("rev0", 0, "Has anything been delivered yet?", `Nothing is delivered in ${y}: a deposit is not revenue.`),
              inp("rev1", price, "Revenue is the full contract price, at delivery.", `Delivery on ${delDate} transfers control: revenue is the full ${eur(price)}.`)
            ]),
            R("Cash received", [
              inp("cash0", dep, "Contract price × deposit percentage.", `${eur(price)} × ${p.pct}% = ${eur(dep)} received on ${depDate}.`),
              inp("cash1", bal, "The balance paid on delivery.", `${eur(price)} − ${eur(dep)} = ${eur(bal)} received on delivery.`)
            ])
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Contract liability (customer deposit)", inp("liab", dep, "Cash received for goods not yet delivered is owed to the customer.", `The ${eur(dep)} deposit is an obligation to deliver: a contract liability until ${delDate}.`))
          ])
        ] },
        rule: "IFRS 15: revenue is recognised when the performance obligation is satisfied. Cash received before that is a contract liability (deferred revenue), not revenue."
      };
    }
  });

  register({
    id: "fa1-accrued-expense", chapter: 1, level: 1, title: "Accrued expense billed later",
    gen: r => {
      const k = r.pick([2, 3, 3, 4]);
      const [service, supplier] = r.pick(SERVICES);
      return { k, j: r.int(1, k - 1), monthly: r.step(200, 3000, 50), service, supplier, billDay: r.int(3, 12), payDay: r.int(15, 28) };
    },
    build(p) {
      const { y, k, j, monthly } = p;
      const bill = monthly * k, e1 = monthly * j, e2 = bill - e1;
      const startMonth = 13 - j, billMonth = k - j + 1;
      const billDate = dt(p.billDay, billMonth, y + 1), payDate = dt(p.payDay, billMonth, y + 1);
      return {
        brief: `A service used around year-end is billed and paid only in ${y + 1}. Record the expense and cash in each year and the balance at 31 December ${y}.`,
        docs: [
          doc("invoice", `Supplier bill · ${p.supplier}`, [["Service", p.service], ["Period covered", `${dt(1, startMonth, y)} – ${periodEnd(startMonth, y, k)}`], ["Amount", eur(bill)], ["Bill date", billDate], ["Paid on", payDate]], "Usage is even across the period.")
        ],
        paper: { sections: [
          S("Expense and cash", [
            R("Expense recognised", [
              inp("exp0", e1, "Monthly cost × the months of use in the first year.", `${eur(bill)} ÷ ${k} months = ${eur(monthly)} a month. ${plural(j, "month")} of use fall in ${y}: ${eur(e1)}.`, { abs: true }),
              inp("exp1", e2, "Monthly cost × the months of use in the second year.", `${plural(k - j, "month")} of use fall in ${y + 1}: ${eur(e2)}.`, { abs: true })
            ]),
            R("Cash paid", [
              inp("cash0", 0, "Was the bill paid before year-end?", `Nothing is paid in ${y}: the bill arrives only on ${billDate}.`, { abs: true }),
              inp("cash1", bill, "Look at the payment date.", `The whole ${eur(bill)} is paid on ${payDate}.`, { abs: true })
            ])
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Accrued expense (liability)", inp("accrued", e1, "Used before year-end, not yet paid.", `The ${eur(e1)} of service used in ${y} is owed to the supplier at 31 December.`))
          ])
        ] },
        rule: "Accrual: an expense belongs to the period in which the service is consumed. A service used before year-end but billed later is an accrued expense, a liability at the balance-sheet date."
      };
    }
  });

  register({
    id: "fa1-deferred-income", chapter: 1, level: 1, title: "Rent received in advance",
    gen: r => {
      const months = r.pick([12, 12, 6]);
      return { months, month: r.int(Math.max(2, 14 - months), 12), monthly: r.step(500, 4000, 100), tenant: r.pick(CUSTOMERS) };
    },
    build(p) {
      const { y, months, month, monthly } = p;
      const amount = monthly * months, m1 = 13 - month, m2 = months - m1;
      const i1 = monthly * m1, i2 = monthly * m2, start = dt(1, month, y);
      return {
        brief: `The company lets a warehouse and the tenant paid in advance on ${start}. Split the income between the years and find the balance at 31 December ${y}.`,
        docs: [
          doc("contract", `Lease · ${p.tenant}`, [["Rent for the period", eur(amount)], ["Period", `${start} – ${periodEnd(month, y, months)}`], ["Paid in advance on", start]]),
          doc("bank", `Bank statement · ${y}`, [[start, `Rent from ${p.tenant} ${eur(amount)}`]])
        ],
        paper: { sections: [
          S("Income and cash", [
            R("Rental income", [
              inp("inc0", i1, "Monthly rent × months of the lease that fall in the first year.", `${eur(amount)} ÷ ${months} = ${eur(monthly)} a month; ${plural(m1, "month")} in ${y}: ${eur(i1)}.`),
              inp("inc1", i2, "Monthly rent × months of the lease that fall in the second year.", `${plural(m2, "month")} in ${y + 1}: ${eur(i2)}.`)
            ]),
            R("Cash received", [
              inp("cash0", amount, "When did the tenant pay?", `The tenant paid the whole ${eur(amount)} on ${start}.`),
              inp("cash1", 0, "Is anything received in the second year?", `Nothing more is received in ${y + 1}.`)
            ])
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Deferred income (liability)", inp("deferred", amount - i1, "Received but not yet earned.", `${eur(amount)} received − ${eur(i1)} earned = ${eur(amount - i1)} still owed to the tenant as use of the warehouse.`))
          ])
        ] },
        rule: "Income received in advance is not yet earned: it is deferred income, a liability, until the service is provided."
      };
    }
  });

  register({
    id: "fa1-accrual-cash-events", chapter: 1, level: 2, source: "PDF 1.3", title: "Accrual and cash events",
    original: { G: 96000, C1: 70000, C2: 20000, O: 8000 },
    gen: r => {
      const G = r.step(40000, 240000, 2000);
      const C1 = 1000 * Math.round(G * r.pick([0.5, 0.6, 0.65, 0.7, 0.75, 0.8]) / 1000);
      return { G, C1, C2: r.step(1000, G - C1 - 1000, 1000), O: r.step(2000, 25000, 500) };
    },
    build(p) {
      const { y, G, C1, C2, O } = p;
      const rec0 = G - C1, rec1 = rec0 - C2;
      return {
        brief: `Summarise the year's sales on an accrual basis and on a cash basis, then follow the receivables they leave behind.`,
        docs: [
          doc("ledger", `Sales ledger · ${y}`, [[`Goods delivered in ${y}`, eur(G)], ["Collected at delivery", eur(C1)], [`Collected in ${y + 1}`, eur(C2)], ["The balance", "still unpaid"]]),
          doc("bank", `Bank summary · ${y}`, [[`Receipts for ${y} sales`, eur(C1)], [`Receipts for invoices issued in ${y - 1}`, eur(O)]])
        ],
        paper: { sections: [
          S(`Year ${y}`, [
            R("Revenue", inp("rev", G, "Everything delivered in the year, paid or not.", `Revenue is everything delivered in ${y}: ${eur(G)}. Collections do not matter.`)),
            R("Cash received from customers", inp("cash", C1 + O, "All receipts of the year, whichever year the sale belongs to.", `${eur(C1)} collected at delivery + ${eur(O)} on ${y - 1} invoices = ${eur(C1 + O)}. The old invoices are cash of ${y} but revenue of ${y - 1}.`))
          ]),
          S(`Trade receivables from ${y} sales`, [
            R(`At 31 December ${y}`, inp("rec0", rec0, "Delivered − collected.", `${eur(G)} delivered − ${eur(C1)} collected = ${eur(rec0)}.`)),
            R(`At 31 December ${y + 1}`, inp("rec1", rec1, "Subtract what is collected in the second year.", `${eur(rec0)} − ${eur(C2)} collected in ${y + 1} = ${eur(rec1)} still open.`))
          ])
        ] },
        rule: "Revenue follows delivery; cash follows collection. Collecting last year's invoices raises this year's cash but not this year's revenue."
      };
    }
  });

  register({
    id: "fa1-profit-vs-cash", chapter: 1, level: 2, source: "PDF 1.4", title: "Profit versus cash flow",
    original: { R: 150000, Cc: 130000, E: 92000, Cp: 80000 },
    gen: r => {
      const Rv = r.step(60000, 500000, 5000);
      const E = 1000 * Math.round(Rv * r.pick([0.55, 0.6, 0.65, 0.7, 0.75, 0.8]) / 1000);
      return { R: Rv, Cc: Rv - r.step(-20000, 45000, 1000), E, Cp: E - r.step(-15000, 30000, 1000) };
    },
    build(p) {
      const { R: Rv, Cc, E, Cp } = p;
      const profit = Rv - E, cash = Cc - Cp, dRec = Rv - Cc, dPay = E - Cp;
      return {
        brief: "Compare the profit with the cash the same transactions produced, and explain the gap. Sales and purchases are all on credit; ignore tax and every other item.",
        docs: [
          doc("report", "Income statement extract", [["Revenue recognised", eur(Rv)], ["Expenses recognised", eur(E)]]),
          doc("bank", "Bank summary", [["Cash collected from customers", eur(Cc)], ["Cash paid to suppliers", eur(Cp)]])
        ],
        paper: { sections: [
          S("Income statement", [
            R("Revenue", giv(Rv)),
            R("Expenses", giv(E)),
            R("Profit", inp("profit", profit, "Revenue − expenses.", `${eur(Rv)} − ${eur(E)} = ${eur(profit)}.`), { total: true })
          ]),
          S("Cash", [
            R("Collected from customers", giv(Cc)),
            R("Paid to suppliers", giv(Cp)),
            R("Net cash flow", inp("cash", cash, "Cash in − cash out.", `${eur(Cc)} − ${eur(Cp)} = ${eur(cash)}.`), { total: true })
          ]),
          S("Reconciliation", [
            R("Profit − net cash flow", inp("diff", profit - cash, "Subtract the cash flow from the profit.", `${eur(profit)} − ${eur(cash)} = ${eur(profit - cash)}. It equals the change in receivables minus the change in payables.`)),
            R("Change in trade receivables (increase +)", inp("drec", dRec, "Revenue − cash collected.", `${eur(Rv)} − ${eur(Cc)} = ${eur(dRec)}: ${dRec >= 0 ? "part of the sales is still owed by customers" : "customers paid more than this year's sales, so receivables fell"}.`)),
            R("Change in trade payables (increase +)", inp("dpay", dPay, "Expenses − cash paid.", `${eur(E)} − ${eur(Cp)} = ${eur(dPay)}: ${dPay >= 0 ? "part of the expenses is still unpaid" : "the company paid off more than this year's expenses, so payables fell"}.`))
          ])
        ] },
        checks: [{ label: "Gap − (Δ receivables − Δ payables)", terms: [[1, "diff"], [-1, "drec"], [1, "dpay"]] }],
        rule: "Profit and cash differ by the working-capital movements: unpaid sales raise receivables (profit without cash), unpaid expenses raise payables (cash kept despite the cost)."
      };
    }
  });

  register({
    id: "fa1-receivables-rollforward", chapter: 1, level: 2, title: "Receivables roll-forward",
    gen: r => {
      const O = r.step(10000, 80000, 1000), Sv = r.step(80000, 400000, 5000), Cs = r.step(5000, 60000, 1000);
      const close = r.step(8000, Math.min(90000, O + Sv - 20000), 1000);
      return { O, S: Sv, Cs, Col: O + Sv - close };
    },
    build(p) {
      const { y, O, S: Sv, Cs, Col } = p;
      const close = O + Sv - Col;
      return {
        brief: "Roll the trade receivables forward through the year and separate revenue from cash receipts.",
        docs: [
          doc("ledger", `Customer ledger · ${y}`, [["Opening receivables, 1 Jan", eur(O)], ["Sales invoiced on credit", eur(Sv)], ["Cash sales at the counter", eur(Cs)], ["Collections from credit customers", eur(Col)]])
        ],
        paper: { sections: [
          S(`Year ${y}`, [
            R("Revenue", inp("rev", Sv + Cs, "Credit sales and cash sales are both revenue.", `${eur(Sv)} on credit + ${eur(Cs)} in cash = ${eur(Sv + Cs)}.`)),
            R("Cash received from customers", inp("cash", Cs + Col, "Cash sales + collections from credit customers.", `${eur(Cs)} + ${eur(Col)} = ${eur(Cs + Col)}.`))
          ]),
          S("Trade receivables", [
            R(`Opening balance, 1 Jan ${y}`, giv(O)),
            R(`Closing balance, 31 Dec ${y}`, inp("close", close, "Opening + credit sales − collections.", `${eur(O)} + ${eur(Sv)} − ${eur(Col)} = ${eur(close)}. Cash sales never pass through receivables.`), { total: true }),
            R("Change in the year (increase +)", inp("change", close - O, "Closing − opening.", `${eur(close)} − ${eur(O)} = ${eur(close - O)}.`))
          ])
        ] },
        rule: "Receivables roll forward: opening + credit sales − collections = closing. Revenue counts cash and credit sales alike; cash counts only what came in."
      };
    }
  });

  register({
    id: "fa1-yearend-adjustments", chapter: 1, level: 2, title: "Year-end adjustments",
    gen: r => ({ ins: 12 * r.step(100, 1500, 50), mI: r.int(2, 12), loan: r.step(48000, 480000, 12000), rate: r.pick([3, 4, 5, 6]), mL: r.int(2, 12), rent: 12 * r.step(300, 3000, 100), mR: r.int(2, 12), tenant: r.pick(CUSTOMERS) }),
    build(p) {
      const { y, ins, mI, loan, rate, mL, rent, mR } = p;
      const nI = 13 - mI, nL = 13 - mL, nR = 13 - mR;
      const insY = ins * nI / 12, prepaid = ins - insY;
      const intY = loan * rate / 100 * nL / 12;
      const rentY = rent * nR / 12, deferred = rent - rentY;
      const net = rentY - insY - intY;
      return {
        brief: `Three contracts straddle 31 December ${y}. For each, post the amount that belongs in the ${y} income statement and the balance left on the balance sheet.`,
        docs: [
          doc("invoice", "Insurance policy", [["Annual premium", eur(ins)], ["Cover", `${dt(1, mI, y)} – ${periodEnd(mI, y, 12)}`], ["Paid on", dt(1, mI, y)]]),
          doc("contract", "Bank loan agreement", [["Principal", eur(loan)], ["Drawn on", dt(1, mL, y)], ["Interest", `${rate}% a year, paid on each anniversary`], ["First interest payment", dt(1, mL, y + 1)]]),
          doc("contract", `Lease · ${p.tenant}`, [["Annual rent received in advance", eur(rent)], ["Period", `${dt(1, mR, y)} – ${periodEnd(mR, y, 12)}`], ["Received on", dt(1, mR, y)]])
        ],
        paper: { sections: [
          S("Year-end adjustments", [
            R("Insurance premium", [
              inp("insExp", insY, "Premium × months of cover in the year ÷ 12.", `${eur(ins)} × ${nI}/12 = ${eur(insY)}.`, { abs: true }),
              inp("prepaid", prepaid, "The part of the premium that covers next year.", `${eur(ins)} − ${eur(insY)} = ${eur(prepaid)}, a prepaid expense.`)
            ], { sub: "expense · prepaid asset" }),
            R("Loan interest", [
              inp("intExp", intY, "Principal × rate × months since drawdown ÷ 12.", `${eur(loan)} × ${rate}% × ${nL}/12 = ${eur(intY)}. It accrues even though nothing is paid until ${y + 1}.`, { abs: true }),
              inp("accrued", intY, "Interest incurred but not yet paid.", `Nothing has been paid, so the whole ${eur(intY)} is interest payable.`)
            ], { sub: "expense · interest payable" }),
            R("Rent from tenant", [
              inp("rentInc", rentY, "Rent × months of the lease in the year ÷ 12.", `${eur(rent)} × ${nR}/12 = ${eur(rentY)}.`),
              inp("deferred", deferred, "Rent received for next year's months.", `${eur(rent)} − ${eur(rentY)} = ${eur(deferred)}, deferred income.`)
            ], { sub: "income · deferred income" }),
            R("Net effect on profit (income − expenses)", [
              inp("net", net, "Rental income − insurance expense − interest expense.", `${eur(rentY)} − ${eur(insY)} − ${eur(intY)} = ${eur(net)}.`),
              null
            ], { total: true })
          ], [`P&L ${y}`, `31 Dec ${y}`])
        ] },
        rule: "Adjusting entries move each amount into the period it belongs to: prepaid expenses and deferred income push cash into the future; accrued expenses bring unpaid costs into the present."
      };
    }
  });

  register({
    id: "fa1-two-years", chapter: 1, level: 3, source: "PDF 1.5", title: "Two accounting years",
    original: { S: 120000, C: 90000, ins: 24000, mI: 7, W: 40000, Wp: 5000 },
    gen: r => {
      const Sv = r.step(60000, 300000, 5000);
      const W = r.step(20000, Sv * 0.5, 1000);
      return { S: Sv, C: Sv - r.step(5000, Sv * 0.4, 1000), ins: 12 * r.step(500, 3000, 100), mI: r.int(2, 12), W, Wp: r.step(1000, W * 0.25, 500) };
    },
    build(p) {
      const { y, S: Sv, C, ins, mI, W, Wp } = p;
      const n0 = 13 - mI, i0 = ins * n0 / 12, i1 = ins - i0;
      const p0 = Sv - i0 - W, p1 = -i1;
      const out0 = ins + W - Wp, out1 = Wp;
      const cf0 = C - out0, cf1 = Sv - C - Wp;
      return {
        brief: `Prepare profit and cash flow for ${y} and ${y + 1}, and the balances at 31 December ${y}.`,
        docs: [
          doc("ledger", `Activity in ${y}`, [["Services provided and invoiced", eur(Sv)], ["Collected from customers", eur(C)], ["Wages incurred", eur(W)], [`Of which paid in ${y + 1}`, eur(Wp)]]),
          doc("invoice", "Insurance policy", [["Premium paid", eur(ins)], ["Cover", `${dt(1, mI, y)} – ${periodEnd(mI, y, 12)}`], ["Paid on", dt(1, mI, y)]]),
          doc("memo", `Memo · ${y + 1}`, [], `In ${y + 1} the company collects the remaining receivable and pays the remaining wages. There are no other transactions.`)
        ],
        paper: { sections: [
          S("Income statement", [
            R("Revenue", [
              inp("rev0", Sv, "Services provided in the year.", `${eur(Sv)} of services were provided in ${y}.`),
              inp("rev1", 0, "Are new services provided in the second year?", `No new services in ${y + 1}: collecting the receivable is not revenue.`)
            ]),
            R("Insurance expense", [
              inp("ins0", i0, "Premium × months of cover in the first year ÷ 12.", `${eur(ins)} × ${n0}/12 = ${eur(i0)}.`, { abs: true }),
              inp("ins1", i1, "The rest of the cover falls in the second year.", `${eur(ins)} − ${eur(i0)} = ${eur(i1)}.`, { abs: true })
            ]),
            R("Wages expense", [
              inp("wag0", W, "Wages belong to the year the work is done.", `The work was done in ${y}: the whole ${eur(W)} is a ${y} expense.`, { abs: true }),
              inp("wag1", 0, "Paying last year's wages is not a new expense.", `Paying ${eur(Wp)} in ${y + 1} settles a liability; no expense.`, { abs: true })
            ]),
            R("Profit (loss)", [
              inp("p0", p0, "Revenue − expenses.", `${eur(Sv)} − ${eur(i0)} − ${eur(W)} = ${eur(p0)}.`),
              inp("p1", p1, "Only the remaining insurance hits the second year.", `0 − ${eur(i1)} = ${eur(p1)}: a loss, although cash comes in.`)
            ], { total: true })
          ], years(y)),
          S("Cash flows", [
            R("Cash received from customers", [
              inp("in0", C, "Collections in the year.", `${eur(C)} collected in ${y}.`),
              inp("in1", Sv - C, "The remaining receivable.", `${eur(Sv)} − ${eur(C)} = ${eur(Sv - C)} collected in ${y + 1}.`)
            ]),
            R("Cash paid (insurance and wages)", [
              inp("out0", out0, "Full premium + wages paid in the year.", `${eur(ins)} + (${eur(W)} − ${eur(Wp)}) = ${eur(out0)}.`, { abs: true }),
              inp("out1", out1, "The wages left unpaid.", `${eur(Wp)} of wages paid in ${y + 1}.`, { abs: true })
            ]),
            R("Net cash flow", [
              inp("cf0", cf0, "Cash in − cash out.", `${eur(C)} − ${eur(out0)} = ${eur(cf0)}.`),
              inp("cf1", cf1, "Cash in − cash out.", `${eur(Sv - C)} − ${eur(Wp)} = ${eur(cf1)}.`)
            ], { total: true })
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Trade receivables", inp("rec", Sv - C, "Invoiced but not collected.", `${eur(Sv)} − ${eur(C)} = ${eur(Sv - C)}.`)),
            R("Prepaid expenses", inp("pre", i1, "Insurance paid for next year's cover.", `${eur(i1)} of the premium covers ${y + 1}.`)),
            R("Wages payable", inp("pay", Wp, "Wages earned by staff but not yet paid.", `${eur(Wp)} of ${y} wages are paid only in ${y + 1}.`))
          ])
        ] },
        checks: [{ label: `Total profit − total cash over both years`, terms: [[1, "p0"], [1, "p1"], [-1, "cf0"], [-1, "cf1"]] }],
        rule: "Over the life of the transactions profit and cash add up to the same total; the accrual principle only decides which year each amount belongs to."
      };
    }
  });

  register({
    id: "fa1-two-years-advance", chapter: 1, level: 3, title: "Two years with deposits and prepayments",
    gen: r => {
      const Sv = r.step(50000, 250000, 5000);
      const W = r.step(15000, Sv * 0.45, 1000);
      return {
        S: Sv, C: Sv - r.step(5000, Sv * 0.35, 1000), rent: 12 * r.step(400, 2500, 100), mR: r.int(2, 12), W, Wp: r.step(1000, W * 0.25, 500),
        T: r.step(20000, 120000, 1000), pct: r.pick([20, 25, 30, 40, 50]), depMonth: r.int(10, 12), delMonth: r.int(2, 6), customer: r.pick(CUSTOMERS)
      };
    },
    build(p) {
      const { y, S: Sv, C, rent, mR, W, Wp, T, pct } = p;
      const D = T * pct / 100, n0 = 13 - mR;
      const r0 = rent * n0 / 12, r1 = rent - r0;
      const p0 = Sv - r0 - W, p1 = T - r1;
      const in0 = C + D, in1 = Sv - C + T - D, out0 = rent + W - Wp, out1 = Wp;
      return {
        brief: `Prepare profit and cash flow for ${y} and ${y + 1}, and the balances at 31 December ${y}.`,
        docs: [
          doc("ledger", `Activity in ${y}`, [["Services provided and invoiced", eur(Sv)], [`Collected in ${y}`, eur(C)], ["Staff costs incurred", eur(W)], [`Of which paid in ${y + 1}`, eur(Wp)]]),
          doc("contract", "Office lease", [["Annual rent paid in advance", eur(rent)], ["Period", `${dt(1, mR, y)} – ${periodEnd(mR, y, 12)}`], ["Paid on", dt(1, mR, y)]]),
          doc("contract", `Sales contract · ${p.customer}`, [["Contract price", eur(T)], ["Deposit received", `${pct}% in ${["October", "November", "December"][p.depMonth - 10]} ${y}`], ["Delivery and balance", `${["February", "March", "April", "May", "June"][p.delMonth - 2]} ${y + 1}`]]),
          doc("memo", `Memo · ${y + 1}`, [], `In ${y + 1} the company collects the ${y} receivables, pays the remaining staff costs and delivers the contract. There are no other transactions.`)
        ],
        paper: { sections: [
          S("Income statement", [
            R("Revenue", [
              inp("rev0", Sv, "Only what was delivered in the year.", `Services of ${eur(Sv)} were provided in ${y}; the deposit is not revenue.`),
              inp("rev1", T, "The contract is delivered in the second year.", `Delivery in ${y + 1}: the full contract price ${eur(T)}.`)
            ]),
            R("Rent expense", [
              inp("rent0", r0, "Annual rent × months in the first year ÷ 12.", `${eur(rent)} × ${n0}/12 = ${eur(r0)}.`, { abs: true }),
              inp("rent1", r1, "The months that fall in the second year.", `${eur(rent)} − ${eur(r0)} = ${eur(r1)}.`, { abs: true })
            ]),
            R("Staff costs", [
              inp("w0", W, "Costs of work done in the year.", `The whole ${eur(W)} belongs to ${y}.`, { abs: true }),
              inp("w1", 0, "Paying last year's wages is not an expense.", `Paying ${eur(Wp)} in ${y + 1} settles a liability.`, { abs: true })
            ]),
            R("Profit (loss)", [
              inp("p0", p0, "Revenue − expenses.", `${eur(Sv)} − ${eur(r0)} − ${eur(W)} = ${eur(p0)}.`),
              inp("p1", p1, "Revenue − expenses.", `${eur(T)} − ${eur(r1)} = ${eur(p1)}.`)
            ], { total: true })
          ], years(y)),
          S("Cash flows", [
            R("Cash received", [
              inp("in0", in0, "Collections + the deposit.", `${eur(C)} + deposit ${eur(D)} = ${eur(in0)}.`),
              inp("in1", in1, "The rest of the receivables + the contract balance.", `${eur(Sv - C)} + ${eur(T - D)} = ${eur(in1)}.`)
            ]),
            R("Cash paid", [
              inp("out0", out0, "Full rent + staff costs paid in the year.", `${eur(rent)} + (${eur(W)} − ${eur(Wp)}) = ${eur(out0)}.`, { abs: true }),
              inp("out1", out1, "The staff costs left unpaid.", `${eur(Wp)}.`, { abs: true })
            ]),
            R("Net cash flow", [
              inp("cf0", in0 - out0, "Cash in − cash out.", `${eur(in0)} − ${eur(out0)} = ${eur(in0 - out0)}.`),
              inp("cf1", in1 - out1, "Cash in − cash out.", `${eur(in1)} − ${eur(out1)} = ${eur(in1 - out1)}.`)
            ], { total: true })
          ], years(y)),
          S(`Balance sheet at 31 December ${y}`, [
            R("Trade receivables", inp("rec", Sv - C, "Invoiced but not collected.", `${eur(Sv)} − ${eur(C)} = ${eur(Sv - C)}.`)),
            R("Prepaid rent", inp("pre", r1, "Rent paid for next year's months.", `${eur(r1)}.`)),
            R("Contract liability", inp("cl", D, "Deposit for goods not yet delivered.", `${eur(T)} × ${pct}% = ${eur(D)}.`)),
            R("Staff costs payable", inp("wp", Wp, "Costs incurred but unpaid.", `${eur(Wp)}.`))
          ])
        ] },
        checks: [{ label: "Total profit − total cash over both years", terms: [[1, "p0"], [1, "p1"], [-1, "cf0"], [-1, "cf1"]] }],
        rule: "A deposit is cash without revenue (a contract liability); prepaid rent is cash without expense (an asset); unpaid staff costs are expense without cash (a liability)."
      };
    }
  });
})();
