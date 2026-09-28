/* Chapter 4 — Income statement and profit formation. */
(function () {
  "use strict";
  const { register, inp, pick, giv, R, S, doc, eur, pct, qty, dt, MONTHS, round } = DeskCore.dsl;

  register({
    id: "fa4-gross-profit", chapter: 4, level: 1, source: "PDF 4.1", title: "Gross profit and gross margin",
    original: { R1: 240000, C1: 156000, two: false },
    gen: r => {
      const R0 = r.step(100000, 2000000, 10000), R1 = Math.round(R0 * r.pick([0.9, 1, 1.05, 1.1, 1.2]) / 10000) * 10000;
      const g0 = r.step(20, 60, 0.5), g1 = Math.min(70, Math.max(15, g0 + r.step(-6, 6, 0.5)));
      return { R0, C0: R0 * (100 - g0) / 100, R1, C1: R1 * (100 - g1) / 100, two: true };
    },
    build(p) {
      const { y, R0, C0, R1, C1, two } = p;
      const yrs = two ? [[R0, C0, y - 1], [R1, C1, y]] : [[R1, C1, y]];
      const col = (f) => yrs.map(([Rv, C, yr], i) => f(Rv, C, yr, i));
      return {
        brief: `Compute gross profit and gross margin${two ? " for both years" : ""}. Round percentages to two decimals.`,
        docs: [doc("report", "Income statement extract", [].concat(...yrs.map(([Rv, C, yr]) => [[`Sales revenue ${yr}`, eur(Rv)], [`Cost of sales ${yr}`, eur(C)]])))],
        paper: { sections: [
          S("Gross profit", [
            R("Revenue", col(Rv => giv(Rv))),
            R("Cost of sales", col((Rv, C) => giv(-C))),
            R("Gross profit", col((Rv, C, yr, i) => inp(`gp${i}`, Rv - C, "Revenue − cost of sales.", `${eur(Rv)} − ${eur(C)} = ${eur(Rv - C)}.`)), { total: true }),
            R("Gross margin", col((Rv, C, yr, i) => inp(`gm${i}`, (Rv - C) / Rv * 100, "Gross profit ÷ revenue × 100.", `${eur(Rv - C)} ÷ ${eur(Rv)} = ${pct((Rv - C) / Rv * 100)}.`, { fmt: "pct" })))
          ], yrs.map(x => String(x[2])))
        ] },
        rule: "Gross profit exists only in the income statement by function: revenue − cost of sales. Gross margin expresses it as a percentage of revenue."
      };
    }
  });

  register({
    id: "fa4-ebitda", chapter: 4, level: 1, source: "PDF 4.2", title: "EBITDA and EBIT",
    original: { Rv: 310000, OX: 205000, DA: 28000, IMP: 7000 },
    gen: r => {
      for (;;) {
        const Rv = r.step(200000, 3000000, 10000), EBIT = Rv * r.step(4, 25, 0.5) / 100;
        const DA = r.step(5000, Rv * 0.1, 1000), IMP = r.chance(0.5) ? r.step(1000, 30000, 1000) : 0;
        const OX = Rv - DA - IMP - EBIT;
        if (OX > Rv * 0.4) return { Rv, OX, DA, IMP };
      }
    },
    build(p) {
      const { Rv, OX, DA, IMP } = p;
      const EBITDA = Rv - OX, EBIT = EBITDA - DA - IMP;
      return {
        brief: "Compute EBITDA, EBIT and the EBIT margin. Impairment is excluded from EBITDA. Round the margin to two decimals.",
        docs: [doc("report", "Management accounts", [["Revenue", eur(Rv)], ["Operating expenses excluding D&A and impairment", eur(OX)], ["Depreciation and amortisation", eur(DA)], ["Impairment of plant", eur(IMP)]])],
        paper: { sections: [
          S("Operating result", [
            R("Revenue", giv(Rv)),
            R("Operating expenses (excl. D&A and impairment)", giv(-OX)),
            R("EBITDA", inp("ebitda", EBITDA, "Revenue − cash-type operating expenses.", `${eur(Rv)} − ${eur(OX)} = ${eur(EBITDA)}.`), { total: true }),
            R("Depreciation and amortisation", giv(-DA)),
            R("Impairment", giv(-IMP)),
            R("EBIT", inp("ebit", EBIT, "EBITDA − D&A − impairment.", `${eur(EBITDA)} − ${eur(DA)} − ${eur(IMP)} = ${eur(EBIT)}.`), { total: true }),
            R("EBIT margin", inp("margin", EBIT / Rv * 100, "EBIT ÷ revenue × 100.", `${eur(EBIT)} ÷ ${eur(Rv)} = ${pct(EBIT / Rv * 100)}.`, { fmt: "pct" }))
          ])
        ] },
        rule: "EBITDA is earnings before interest, taxes, depreciation and amortisation (and here impairment); EBIT deducts those non-cash charges. Neither is defined by IFRS, so the policy must be stated."
      };
    }
  });

  register({
    id: "fa4-cogs", chapter: 4, level: 1, title: "Cost of goods sold for a retailer",
    gen: r => {
      for (;;) {
        const Rv = r.step(100000, 2000000, 10000), gm = r.step(20, 55, 0.5), COGS = Rv * (100 - gm) / 100;
        const O = r.step(10000, 200000, 1000), C = r.step(10000, 200000, 1000), P = COGS - O + C;
        if (P > COGS * 0.3) return { Rv, O, C, P };
      }
    },
    build(p) {
      const { y, Rv, O, C, P } = p;
      const COGS = O + P - C, GP = Rv - COGS;
      return {
        brief: `A retailer buys and resells goods. Compute cost of goods sold, gross profit and gross margin for ${y}.`,
        docs: [
          doc("count", "Stock counts", [[`Inventory at 1 Jan ${y}`, eur(O)], [`Inventory at 31 Dec ${y}`, eur(C)]]),
          doc("ledger", `Purchases and sales · ${y}`, [["Purchases of goods for resale", eur(P)], ["Sales revenue", eur(Rv)]])
        ],
        paper: { sections: [
          S(`Year ${y}`, [
            R("Cost of goods sold", inp("cogs", COGS, "Opening inventory + purchases − closing inventory.", `${eur(O)} + ${eur(P)} − ${eur(C)} = ${eur(COGS)}.`)),
            R("Gross profit", inp("gp", GP, "Revenue − cost of goods sold.", `${eur(Rv)} − ${eur(COGS)} = ${eur(GP)}.`), { total: true }),
            R("Gross margin", inp("gm", GP / Rv * 100, "Gross profit ÷ revenue × 100.", `${eur(GP)} ÷ ${eur(Rv)} = ${pct(GP / Rv * 100)}.`, { fmt: "pct" }))
          ])
        ] },
        rule: "Purchases are not the cost of sales: goods still on the shelf at year-end are an asset. Cost of goods sold = opening inventory + purchases − closing inventory."
      };
    }
  });

  register({
    id: "fa4-net-profit", chapter: 4, level: 1, title: "From EBIT to net profit",
    gen: r => {
      for (;;) {
        const EBIT = r.step(20000, 800000, 1000), FI = r.step(0, 20000, 500), FC = r.step(1000, 60000, 1000);
        if (EBIT + FI - FC > 5000) return { EBIT, FI, FC, t: r.pick([24, 25, 30]) };
      }
    },
    build(p) {
      const { y, EBIT, FI, FC, t } = p;
      const PBT = EBIT + FI - FC, tax = PBT * t / 100;
      return {
        brief: `Complete the bottom of the ${y} income statement.`,
        docs: [doc("report", "Closing figures", [["EBIT", eur(EBIT)], ["Finance income", eur(FI)], ["Finance costs", eur(FC)], ["Tax rate on profit before tax", `${t}%`]])],
        paper: { sections: [
          S(`Year ${y}`, [
            R("EBIT", giv(EBIT)),
            R("Finance income", giv(FI)),
            R("Finance costs", giv(-FC)),
            R("Profit before tax", inp("pbt", PBT, "EBIT + finance income − finance costs.", `${eur(EBIT)} + ${eur(FI)} − ${eur(FC)} = ${eur(PBT)}.`), { total: true }),
            R("Income tax expense", inp("tax", tax, "Profit before tax × rate.", `${eur(PBT)} × ${t}% = ${eur(tax)}.`, { abs: true })),
            R("Profit for the year", inp("np", PBT - tax, "Profit before tax − tax.", `${eur(PBT)} − ${eur(tax)} = ${eur(PBT - tax)}.`), { total: true })
          ])
        ] },
        rule: "Below EBIT come the financial items (income and costs) and then income tax; what remains is the profit for the year attributable to shareholders."
      };
    }
  });

  register({
    id: "fa4-by-nature", chapter: 4, level: 2, source: "PDF 4.3", title: "Materials and inventory changes",
    original: { RM0: 17000, P: 92000, RM1: 21000, FG0: 33000, FG1: 40000, Rv: 180000, OX: 56000 },
    gen: r => {
      for (;;) {
        const Rv = r.step(100000, 1500000, 5000), RM0 = r.step(5000, 80000, 1000), RM1 = r.step(5000, 80000, 1000);
        const used = r.step(Rv * 0.25, Rv * 0.45, 1000), P = used - RM0 + RM1;
        const FG0 = r.step(10000, 150000, 1000), FG1 = FG0 + r.step(-30000, 30000, 1000), OX = r.step(Rv * 0.2, Rv * 0.4, 1000);
        if (P > 0 && FG1 > 1000 && FG1 !== FG0) return { RM0, P, RM1, FG0, FG1, Rv, OX };
      }
    },
    build(p) {
      const { y, RM0, P, RM1, FG0, FG1, Rv, OX } = p;
      const used = RM0 + P - RM1, dFG = FG1 - FG0, VoP = Rv + dFG, EBIT = VoP - used - OX;
      return {
        brief: `Prepare the ${y} income statement by nature down to EBIT.`,
        docs: [
          doc("count", "Stock counts", [["Raw materials, 1 Jan", eur(RM0)], ["Raw materials, 31 Dec", eur(RM1)], ["Finished goods and WIP, 1 Jan", eur(FG0)], ["Finished goods and WIP, 31 Dec", eur(FG1)]]),
          doc("ledger", `General ledger · ${y}`, [["Revenue", eur(Rv)], ["Purchases of raw materials", eur(P)], ["Other operating expenses", eur(OX)]])
        ],
        paper: { sections: [
          S(`Income statement by nature · ${y}`, [
            R("Revenue", giv(Rv)),
            R("Change in inventories of finished goods and WIP (increase +)", inp("dfg", dFG, "Closing − opening finished goods and WIP.", `${eur(FG1)} − ${eur(FG0)} = ${eur(dFG)}: ${dFG > 0 ? "production not yet sold is added back" : "goods from earlier years were sold, so the decrease is deducted"}.`)),
            R("Value of production", inp("vop", VoP, "Revenue ± the change in finished goods and WIP.", `${eur(Rv)} ${dFG >= 0 ? "+" : "−"} ${eur(Math.abs(dFG))} = ${eur(VoP)}.`), { total: true }),
            R("Raw materials consumed", inp("used", used, "Opening + purchases − closing raw materials.", `${eur(RM0)} + ${eur(P)} − ${eur(RM1)} = ${eur(used)}.`, { abs: true })),
            R("Other operating expenses", giv(-OX)),
            R("EBIT", inp("ebit", EBIT, "Value of production − materials consumed − other expenses.", `${eur(VoP)} − ${eur(used)} − ${eur(OX)} = ${eur(EBIT)}.`), { total: true })
          ])
        ] },
        rule: "By nature, costs are shown for everything produced, so the change in finished goods and WIP adjusts revenue to the value of production. Materials consumed = opening + purchases − closing."
      };
    }
  });

  register({
    id: "fa4-eps", chapter: 4, level: 2, source: "PDF 4.4", title: "Net profit and EPS",
    original: { EBIT: 86000, FI: 4000, FC: 15000, tax: 22500, disc: -5000, shares: 25000 },
    gen: r => {
      for (;;) {
        const EBIT = r.step(50000, 2000000, 1000), FI = r.step(0, 30000, 1000), FC = r.step(2000, 100000, 1000), PBT = EBIT + FI - FC;
        if (PBT <= 10000) continue;
        const t = r.pick([24, 25, 30]), tax = PBT * t / 100;
        return { EBIT, FI, FC, tax, disc: (r.chance(0.5) ? -1 : 1) * r.step(1000, Math.min(50000, (PBT - tax) * 0.5), 1000), shares: r.step(10000, 1000000, 5000) };
      }
    },
    build(p) {
      const { y, EBIT, FI, FC, tax, disc, shares } = p;
      const PBT = EBIT + FI - FC, cont = PBT - tax, NP = cont + disc, eps = NP / shares;
      return {
        brief: `Complete the ${y} income statement from EBIT and compute basic earnings per share. Round EPS to two decimals.`,
        docs: [doc("report", "Closing figures", [["EBIT", eur(EBIT)], ["Finance income", eur(FI)], ["Finance costs", eur(FC)], ["Tax expense on continuing operations", eur(tax)], [disc < 0 ? "Loss from discontinued operations" : "Profit from discontinued operations", eur(Math.abs(disc))], ["Weighted-average ordinary shares", qty(shares)]])],
        paper: { sections: [
          S(`Year ${y}`, [
            R("EBIT", giv(EBIT)),
            R("Net finance income (costs)", giv(FI - FC)),
            R("Profit before tax", inp("pbt", PBT, "EBIT + finance income − finance costs.", `${eur(EBIT)} + ${eur(FI)} − ${eur(FC)} = ${eur(PBT)}.`), { total: true }),
            R("Income tax expense", giv(-tax)),
            R("Profit from continuing operations", inp("cont", cont, "Profit before tax − tax on continuing operations.", `${eur(PBT)} − ${eur(tax)} = ${eur(cont)}.`)),
            R("Discontinued operations", giv(disc)),
            R("Net profit", inp("np", NP, "Continuing + discontinued (after tax).", `${eur(cont)} ${disc < 0 ? "−" : "+"} ${eur(Math.abs(disc))} = ${eur(NP)}.`), { total: true }),
            R("Basic EPS (€)", inp("eps", eps, "Net profit ÷ weighted-average ordinary shares.", `${eur(NP)} ÷ ${qty(shares)} = €${round(eps, 2).toFixed(2)}.`, { fmt: "eps" }))
          ])
        ] },
        rule: "IFRS 5 presents discontinued operations as a single after-tax line below profit from continuing operations. IAS 33: basic EPS = profit attributable to ordinary shareholders ÷ weighted-average ordinary shares."
      };
    }
  });

  const FUNCTIONS = ["Cost of sales", "Distribution", "Administrative"];
  const EXPENSES = {
    "Cost of sales": ["Raw materials used in production", "Factory workers' wages", "Depreciation of production machinery", "Factory electricity", "Production supervisor's salary"],
    "Distribution": ["Sales staff commissions", "Advertising campaign", "Fuel for delivery vans", "Depreciation of delivery vans", "Trade fair stand"],
    "Administrative": ["CEO and finance team salaries", "Head office rent", "Statutory audit fee", "Accounting software licence", "Legal advice on contracts"]
  };

  register({
    id: "fa4-by-function", chapter: 4, level: 2, title: "Classify expenses by function",
    gen: r => {
      const items = r.shuffle([].concat(...FUNCTIONS.map(f => r.sample(EXPENSES[f], 2).map(name => ({ name, fn: f, amount: f === "Cost of sales" ? r.step(30000, 250000, 1000) : r.step(5000, 90000, 1000) })))));
      const total = items.reduce((s, i) => s + i.amount, 0);
      return { items, Rv: Math.round(total * r.pick([1.15, 1.25, 1.35, 1.5, 1.6]) / 10000) * 10000 };
    },
    build(p) {
      const { y, items, Rv } = p;
      const why = {
        "Cost of sales": "It is a cost of making the goods that were sold.",
        "Distribution": "It is a cost of selling and delivering the goods.",
        "Administrative": "It is a cost of running the company as a whole."
      };
      const cos = items.filter(i => i.fn === "Cost of sales"), total = items.reduce((s, i) => s + i.amount, 0);
      const COS = cos.reduce((s, i) => s + i.amount, 0), GP = Rv - COS, EBIT = Rv - total;
      return {
        brief: `Present the ${y} income statement by function: classify each expense, then compute cost of sales, gross profit and EBIT.`,
        docs: [doc("ledger", `Expense ledger · ${y}`, [["Revenue", eur(Rv)]].concat(items.map(i => [i.name, eur(i.amount)])))],
        paper: { sections: [
          S("Classification", items.map((it, i) => R(`${it.name} · ${eur(it.amount)}`, pick(`f${i}`, FUNCTIONS, it.fn, "Which activity does it serve: making, selling or running the company?", why[it.fn])))),
          S(`Income statement by function · ${y}`, [
            R("Revenue", giv(Rv)),
            R("Cost of sales", inp("cos", COS, "Add the production costs.", `${cos.map(i => eur(i.amount)).join(" + ")} = ${eur(COS)}.`, { abs: true })),
            R("Gross profit", inp("gp", GP, "Revenue − cost of sales.", `${eur(Rv)} − ${eur(COS)} = ${eur(GP)}.`), { total: true }),
            R("EBIT", inp("ebit", EBIT, "Gross profit − distribution − administrative expenses.", `${eur(Rv)} − all expenses ${eur(total)} = ${eur(EBIT)}.`), { total: true })
          ])
        ] },
        rule: "IAS 1 by function: expenses are grouped by the activity they serve — cost of sales, distribution, administration. Depreciation follows the asset's use: factory machines go to cost of sales, delivery vans to distribution."
      };
    }
  });

  register({
    id: "fa4-weighted-shares", chapter: 4, level: 2, title: "Weighted-average shares and EPS",
    gen: r => {
      const N0 = r.step(100000, 2000000, 10000);
      const buy = r.chance(0.4);
      return { N0, N1: r.step(12000, 240000, 12000), mI: r.int(2, 12), N2: buy ? r.step(12000, Math.min(120000, N0 * 0.2), 12000) : 0, mB: r.int(2, 12), NP: r.step(50000, 3000000, 1000) };
    },
    build(p) {
      const { y, N0, N1, mI, N2, mB, NP } = p;
      const oI = 13 - mI, oB = 13 - mB;
      const end = N0 + N1 - N2, W = N0 + N1 * oI / 12 - N2 * oB / 12, eps = NP / W;
      const lines = [["Shares at 1 Jan", qty(N0)], ["New shares issued for cash", `${qty(N1)} on ${dt(1, mI, y)}`]];
      if (N2) lines.push(["Own shares bought back", `${qty(N2)} on ${dt(1, mB, y)}`]);
      lines.push([`Net profit ${y}`, eur(NP)]);
      return {
        brief: `Compute the weighted-average number of ordinary shares and basic EPS for ${y}. Round EPS to two decimals.`,
        docs: [doc("memo", "Share register", lines)],
        paper: { sections: [
          S(`Shares · ${y}`, [
            R("Shares outstanding at 31 Dec", inp("end", end, "Opening + issued − bought back.", `${qty(N0)} + ${qty(N1)}${N2 ? ` − ${qty(N2)}` : ""} = ${qty(end)}.`, { fmt: "qty", tol: 0.5 })),
            R("Weighted-average shares", inp("w", W, "Weight each block of shares by the months it was outstanding.", `${qty(N0)} × 12/12 + ${qty(N1)} × ${oI}/12${N2 ? ` − ${qty(N2)} × ${oB}/12` : ""} = ${qty(W)}.`, { fmt: "qty", tol: 0.5 }), { total: true }),
            R("Basic EPS (€)", inp("eps", eps, "Net profit ÷ weighted-average shares.", `${eur(NP)} ÷ ${qty(W)} = €${round(eps, 2).toFixed(2)}.`, { fmt: "eps" }))
          ])
        ] },
        rule: "IAS 33: shares issued or bought back during the year count only for the part of the year they were outstanding, so EPS uses the time-weighted average, not the year-end number."
      };
    }
  });

  register({
    id: "fa4-complete-is", chapter: 4, level: 3, source: "PDF 4.5", title: "Complete income statement by function",
    original: { Rv: 620000, CoS: 365000, DE: 84000, AE: 51000, DA: 20000, OX: 9000, FI: 3000, FC: 18000, t: 30, disc: 7000, shares: 40000 },
    gen: r => {
      for (;;) {
        const Rv = r.step(300000, 5000000, 10000), CoS = r.step(Rv * 0.45, Rv * 0.65, 1000), DE = r.step(Rv * 0.05, Rv * 0.12, 1000), AE = r.step(Rv * 0.04, Rv * 0.1, 1000);
        const OX = r.step(0, Rv * 0.03, 1000), FI = r.step(0, 20000, 1000), FC = r.step(1000, 80000, 1000);
        const EBIT = Rv - CoS - DE - AE - OX;
        if (EBIT + FI - FC < 20000) continue;
        const d = r.pick([-1, 0, 1]), t = r.pick([24, 25, 30]), cont = (EBIT + FI - FC) * (100 - t) / 100;
        return { Rv, CoS, DE, AE, DA: r.step(2000, (DE + AE) * 0.3, 1000), OX, FI, FC, t, disc: d * r.step(1000, Math.min(50000, cont * 0.5), 1000), shares: r.step(10000, 1000000, 5000) };
      }
    },
    build(p) {
      const { y, Rv, CoS, DE, AE, DA, OX, FI, FC, t, disc, shares } = p;
      const GP = Rv - CoS, EBIT = GP - DE - AE - OX, EBITDA = EBIT + DA, PBT = EBIT + FI - FC, tax = PBT * t / 100, cont = PBT - tax, NP = cont + disc, eps = NP / shares;
      return {
        brief: `Prepare the ${y} income statement by function, with EBITDA and basic EPS. Round EPS to two decimals.`,
        docs: [
          doc("ledger", `Trial balance extract · ${y}`, [["Revenue", eur(Rv)], ["Cost of sales", eur(CoS)], ["Distribution expenses", eur(DE)], ["Administrative expenses", eur(AE)], ["Other operating expenses", eur(OX)], ["Finance income", eur(FI)], ["Finance costs", eur(FC)]]),
          doc("memo", "Notes from the controller", [["D&A included in distribution and administrative expenses", eur(DA)], ["Tax rate on continuing operations", `${t}%`], [disc < 0 ? "Loss from discontinued operations (after tax)" : "Profit from discontinued operations (after tax)", eur(Math.abs(disc))], ["Weighted-average ordinary shares", qty(shares)]])
        ],
        paper: { sections: [
          S(`Income statement by function · ${y}`, [
            R("Revenue", giv(Rv)),
            R("Cost of sales", giv(-CoS)),
            R("Gross profit", inp("gp", GP, "Revenue − cost of sales.", `${eur(Rv)} − ${eur(CoS)} = ${eur(GP)}.`), { total: true }),
            R("Distribution expenses", giv(-DE)),
            R("Administrative expenses", giv(-AE)),
            R("Other operating expenses", giv(-OX)),
            R("EBIT", inp("ebit", EBIT, "Gross profit − the three operating expense lines.", `${eur(GP)} − ${eur(DE)} − ${eur(AE)} − ${eur(OX)} = ${eur(EBIT)}.`), { total: true }),
            R("EBITDA (memo)", inp("ebitda", EBITDA, "EBIT + the D&A hidden in the functions.", `${eur(EBIT)} + ${eur(DA)} = ${eur(EBITDA)}.`)),
            R("Finance income", giv(FI)),
            R("Finance costs", giv(-FC)),
            R("Profit before tax", inp("pbt", PBT, "EBIT + finance income − finance costs.", `${eur(EBIT)} + ${eur(FI)} − ${eur(FC)} = ${eur(PBT)}.`), { total: true }),
            R("Tax on continuing operations", inp("tax", tax, "Profit before tax × rate.", `${eur(PBT)} × ${t}% = ${eur(tax)}.`, { abs: true })),
            R("Profit from continuing operations", inp("cont", cont, "Profit before tax − tax.", `${eur(PBT)} − ${eur(tax)} = ${eur(cont)}.`)),
            R("Discontinued operations", giv(disc)),
            R("Net profit", inp("np", NP, "Continuing + discontinued.", `${eur(cont)} ${disc < 0 ? "−" : "+"} ${eur(Math.abs(disc))} = ${eur(NP)}.`), { total: true, grand: true }),
            R("Basic EPS (€)", inp("eps", eps, "Net profit ÷ weighted-average shares.", `${eur(NP)} ÷ ${qty(shares)} = €${round(eps, 2).toFixed(2)}.`, { fmt: "eps" }))
          ])
        ] },
        rule: "By function, depreciation is spread across the functional lines, so EBITDA must add it back to EBIT. Discontinued operations appear as one after-tax line; EPS uses the net profit."
      };
    }
  });

  register({
    id: "fa4-complete-by-nature", chapter: 4, level: 3, title: "Complete income statement by nature",
    gen: r => {
      for (;;) {
        const Rv = r.step(300000, 4000000, 10000), dFG = r.step(-Rv * 0.04, Rv * 0.04, 1000);
        const RM0 = r.step(10000, 150000, 1000), RM1 = r.step(10000, 150000, 1000), used = r.step(Rv * 0.25, Rv * 0.4, 1000), P = used - RM0 + RM1;
        const PERS = r.step(Rv * 0.15, Rv * 0.28, 1000), SERV = r.step(Rv * 0.05, Rv * 0.12, 1000), OX = r.step(0, Rv * 0.03, 1000);
        const DA = r.step(Rv * 0.02, Rv * 0.06, 1000), IMP = r.chance(0.4) ? r.step(1000, 40000, 1000) : 0;
        const FI = r.step(0, 20000, 1000), FC = r.step(1000, 80000, 1000);
        const EBIT = Rv + dFG - used - PERS - SERV - OX - DA - IMP;
        if (P > 0 && EBIT + FI - FC > 20000) return { Rv, dFG, RM0, P, RM1, PERS, SERV, OX, DA, IMP, FI, FC, t: r.pick([24, 25, 30]), shares: r.step(10000, 1000000, 5000) };
      }
    },
    build(p) {
      const { y, Rv, dFG, RM0, P, RM1, PERS, SERV, OX, DA, IMP, FI, FC, t, shares } = p;
      const used = RM0 + P - RM1, VoP = Rv + dFG, EBITDA = VoP - used - PERS - SERV - OX, EBIT = EBITDA - DA - IMP;
      const PBT = EBIT + FI - FC, tax = PBT * t / 100, NP = PBT - tax, eps = NP / shares;
      return {
        brief: `Prepare the ${y} income statement by nature, from revenue to basic EPS. Round EPS to two decimals.`,
        docs: [
          doc("ledger", `Trial balance extract · ${y}`, [["Revenue", eur(Rv)], ["Purchases of raw materials", eur(P)], ["Personnel costs", eur(PERS)], ["Services", eur(SERV)], ["Other operating expenses", eur(OX)], ["Depreciation and amortisation", eur(DA)], ["Impairment losses", eur(IMP)], ["Finance income", eur(FI)], ["Finance costs", eur(FC)]]),
          doc("count", "Stock counts", [["Raw materials, 1 Jan", eur(RM0)], ["Raw materials, 31 Dec", eur(RM1)], ["Change in finished goods and WIP", `${dFG >= 0 ? "increase" : "decrease"} of ${eur(Math.abs(dFG))}`]]),
          doc("memo", "Controller", [["Tax rate", `${t}%`], ["Weighted-average ordinary shares", qty(shares)]])
        ],
        paper: { sections: [
          S(`Income statement by nature · ${y}`, [
            R("Revenue", giv(Rv)),
            R("Change in finished goods and WIP", giv(dFG)),
            R("Value of production", inp("vop", VoP, "Revenue ± change in finished goods and WIP.", `${eur(Rv)} ${dFG >= 0 ? "+" : "−"} ${eur(Math.abs(dFG))} = ${eur(VoP)}.`), { total: true }),
            R("Raw materials consumed", inp("used", used, "Opening + purchases − closing.", `${eur(RM0)} + ${eur(P)} − ${eur(RM1)} = ${eur(used)}.`, { abs: true })),
            R("Personnel costs", giv(-PERS)),
            R("Services", giv(-SERV)),
            R("Other operating expenses", giv(-OX)),
            R("EBITDA", inp("ebitda", EBITDA, "Value of production − materials − personnel − services − other.", `${eur(VoP)} − ${eur(used)} − ${eur(PERS)} − ${eur(SERV)} − ${eur(OX)} = ${eur(EBITDA)}.`), { total: true }),
            R("Depreciation and amortisation", giv(-DA)),
            R("Impairment losses", giv(-IMP)),
            R("EBIT", inp("ebit", EBIT, "EBITDA − D&A − impairment.", `${eur(EBITDA)} − ${eur(DA)} − ${eur(IMP)} = ${eur(EBIT)}.`), { total: true }),
            R("Net finance income (costs)", giv(FI - FC)),
            R("Profit before tax", inp("pbt", PBT, "EBIT + finance income − finance costs.", `${eur(EBIT)} + ${eur(FI)} − ${eur(FC)} = ${eur(PBT)}.`), { total: true }),
            R("Income tax expense", inp("tax", tax, "Profit before tax × rate.", `${eur(PBT)} × ${t}% = ${eur(tax)}.`, { abs: true })),
            R("Net profit", inp("np", NP, "Profit before tax − tax.", `${eur(PBT)} − ${eur(tax)} = ${eur(NP)}.`), { total: true, grand: true }),
            R("Basic EPS (€)", inp("eps", eps, "Net profit ÷ weighted-average shares.", `${eur(NP)} ÷ ${qty(shares)} = €${round(eps, 2).toFixed(2)}.`, { fmt: "eps" }))
          ])
        ] },
        rule: "By nature, costs are listed by what they are (materials, personnel, services, depreciation). There is no gross profit, and EBITDA is visible directly before depreciation and impairment."
      };
    }
  });
})();
