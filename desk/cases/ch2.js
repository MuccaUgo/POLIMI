/* Chapter 2 — Balance sheet: assets and measurement. */
(function () {
  "use strict";
  const { register, inp, pick, giv, R, S, doc, eur, qty, fmt, dt, plural, MONTHS } = DeskCore.dsl;

  const MACHINES = ["CNC lathe", "delivery van", "forklift", "server cluster", "packaging line", "injection moulder", "laser cutter"];
  const INTANGIBLES = ["patent", "software licence", "production licence"];

  register({
    id: "fa2-depreciation", chapter: 2, level: 1, source: "PDF 2.1", title: "Straight-line depreciation",
    original: { annual: 12000, life: 7, residual: 0, k: 2 },
    gen: r => {
      const life = r.pick([4, 5, 6, 8, 10]);
      return { life, annual: r.step(1500, 30000, 500), residual: r.chance(0.4) ? r.step(1000, 20000, 1000) : 0, k: r.int(0, life - 2), asset: r.pick(MACHINES) };
    },
    build(p) {
      const { y, annual, life, residual, k } = p;
      const cost = annual * life + residual, n = k + 1, acc = annual * n, ca = cost - acc, end = y + k;
      return {
        brief: `A new ${p.asset} is available for use from 1 January ${y}. Compute its depreciation and its carrying amount at 31 December ${end}.`,
        docs: [
          doc("invoice", "Purchase invoice", [["Asset", p.asset], ["Cost", eur(cost)], ["Available for use", dt(1, 1, y)]]),
          doc("memo", "Fixed-asset policy", [["Method", "Straight-line"], ["Useful life", plural(life, "year")], ["Residual value", eur(residual)]])
        ],
        paper: { sections: [
          S(`${p.asset[0].toUpperCase()}${p.asset.slice(1)}`, [
            R("Cost", giv(cost)),
            R("Annual depreciation", inp("dep", annual, "(Cost − residual value) ÷ useful life.", `(${eur(cost)} − ${eur(residual)}) ÷ ${life} = ${eur(annual)} a year.`)),
            R(`Accumulated depreciation, 31 Dec ${end}`, inp("acc", acc, "Annual charge × full years in use.", `${plural(n, "year")} of use (${y}–${end}): ${eur(annual)} × ${n} = ${eur(acc)}.`)),
            R(`Carrying amount, 31 Dec ${end}`, inp("ca", ca, "Cost − accumulated depreciation.", `${eur(cost)} − ${eur(acc)} = ${eur(ca)}.`), { total: true })
          ])
        ] },
        rule: "IAS 16: the depreciable amount (cost − residual value) is allocated on a systematic basis over the useful life. Carrying amount = cost − accumulated depreciation."
      };
    }
  });

  register({
    id: "fa2-impairment", chapter: 2, level: 1, source: "PDF 2.2", title: "Impairment test",
    original: { ca: 115000, viu: 98000, fv: 103000 },
    gen: r => {
      const ca = r.step(40000, 400000, 1000);
      let viu, fv;
      if (r.chance(0.25)) {
        const ra = ca + r.step(1000, 30000, 1000);
        const other = ra - r.step(2000, 40000, 1000);
        [viu, fv] = r.chance(0.5) ? [ra, other] : [other, ra];
      } else {
        const ra = ca - r.step(2000, ca * 0.3, 1000);
        const other = ra - r.step(1000, 20000, 1000);
        [viu, fv] = r.chance(0.5) ? [ra, other] : [other, ra];
      }
      return { ca, viu, fv, asset: r.pick(["production plant", "bottling line", "warehouse robotics", "printing press"]) };
    },
    build(p) {
      const { ca, viu, fv } = p;
      const ra = Math.max(viu, fv), loss = Math.max(0, ca - ra), revised = ca - loss;
      const basis = viu > fv ? "Value in use" : "Fair value less costs of disposal";
      return {
        brief: `There are signs that the ${p.asset} has lost value. Run the impairment test at year-end.`,
        docs: [
          doc("report", `Impairment review · ${p.asset}`, [["Carrying amount", eur(ca)], ["Value in use (discounted cash flows)", eur(viu)], ["Fair value less costs of disposal", eur(fv)]])
        ],
        paper: { sections: [
          S("Impairment test", [
            R("Recoverable amount is based on", pick("basis", ["Value in use", "Fair value less costs of disposal"], basis, "The recoverable amount is the higher of the two measures.", `${eur(Math.max(viu, fv))} beats ${eur(Math.min(viu, fv))}: the higher of the two is used.`)),
            R("Recoverable amount", inp("ra", ra, "Higher of value in use and fair value less costs of disposal.", `max(${eur(viu)}, ${eur(fv)}) = ${eur(ra)}.`)),
            R("Impairment loss", inp("loss", loss, "Carrying amount − recoverable amount, if positive.", loss > 0 ? `${eur(ca)} − ${eur(ra)} = ${eur(loss)}, charged to the income statement.` : `The recoverable amount ${eur(ra)} exceeds the carrying amount ${eur(ca)}: no impairment, and no write-up either.`)),
            R("Revised carrying amount", inp("rev", revised, "Carrying amount − impairment loss.", `${eur(ca)} − ${eur(loss)} = ${eur(revised)}.`), { total: true })
          ])
        ] },
        rule: "IAS 36: an asset is impaired when its carrying amount exceeds its recoverable amount, the higher of fair value less costs of disposal and value in use. The loss goes to profit or loss."
      };
    }
  });

  register({
    id: "fa2-disposal", chapter: 2, level: 1, title: "Disposal of equipment",
    gen: r => {
      const life = r.pick([4, 5, 6, 8, 10]), annual = r.step(1000, 15000, 500), used = r.int(1, life - 1);
      const ca = annual * (life - used);
      return { life, annual, used, proceeds: Math.max(0, ca + r.step(-ca * 0.5, ca * 0.5, 500)), asset: r.pick(MACHINES) };
    },
    build(p) {
      const { y, life, annual, used, proceeds } = p;
      const cost = annual * life, acc = annual * used, ca = cost - acc, gain = proceeds - ca;
      return {
        brief: `The ${p.asset} is sold on 31 December ${y}. Remove it from the books and find the gain or loss.`,
        docs: [
          doc("ledger", `Fixed-asset card · ${p.asset}`, [["Cost", eur(cost)], ["Useful life", plural(life, "year")], ["Residual value", "nil"], ["Depreciation", "Straight-line"], ["Years in use at the sale date", String(used)]]),
          doc("invoice", "Sales invoice", [["Buyer", "Second-hand dealer"], ["Date", dt(31, 12, y)], ["Price", eur(proceeds)]])
        ],
        paper: { sections: [
          S("Disposal", [
            R("Accumulated depreciation at the sale date", inp("acc", acc, "Annual depreciation × years in use.", `${eur(cost)} ÷ ${life} = ${eur(annual)} a year × ${used} = ${eur(acc)}.`)),
            R("Carrying amount at the sale date", inp("ca", ca, "Cost − accumulated depreciation.", `${eur(cost)} − ${eur(acc)} = ${eur(ca)}.`)),
            R("Gain (+) or loss (−) on disposal", inp("gain", gain, "Proceeds − carrying amount.", `${eur(proceeds)} − ${eur(ca)} = ${eur(gain)}${gain > 0 ? ", a gain" : gain < 0 ? ", a loss" : ""}.`), { total: true })
          ])
        ] },
        rule: "IAS 16: on disposal the asset leaves the balance sheet at its carrying amount; the difference from the proceeds is a gain or loss in profit or loss, not revenue."
      };
    }
  });

  register({
    id: "fa2-intangible", chapter: 2, level: 1, title: "Amortisation of an intangible",
    gen: r => ({ n: r.pick([3, 4, 5]), monthly: r.step(100, 2500, 50), month: r.int(1, 12), item: r.pick(INTANGIBLES) }),
    build(p) {
      const { y, n, monthly, month } = p;
      const cost = monthly * 12 * n, m0 = 13 - month, a0 = monthly * m0, a1 = monthly * 12, ca = cost - a0 - a1;
      return {
        brief: `A ${p.item} was acquired on ${dt(1, month, y)}. Amortise it using whole months and find its carrying amount at 31 December ${y + 1}.`,
        docs: [
          doc("contract", `Acquisition of a ${p.item}`, [["Cost", eur(cost)], ["Available for use", dt(1, month, y)], ["Useful life", plural(n, "year")], ["Method", "Straight-line, whole months, no residual value"]])
        ],
        paper: { sections: [
          S(`${p.item[0].toUpperCase()}${p.item.slice(1)}`, [
            R("Cost", giv(cost)),
            R(`Amortisation ${y}`, inp("a0", a0, "Monthly charge × months from acquisition to year-end.", `${eur(cost)} ÷ ${n * 12} months = ${eur(monthly)} a month × ${m0} months = ${eur(a0)}.`)),
            R(`Amortisation ${y + 1}`, inp("a1", a1, "A full year of the monthly charge.", `${eur(monthly)} × 12 = ${eur(a1)}.`)),
            R(`Carrying amount, 31 Dec ${y + 1}`, inp("ca", ca, "Cost − amortisation to date.", `${eur(cost)} − ${eur(a0)} − ${eur(a1)} = ${eur(ca)}.`), { total: true })
          ])
        ] },
        rule: "IAS 38: an intangible asset with a finite useful life is amortised from the date it is available for use, on a systematic basis over that life."
      };
    }
  });

  register({
    id: "fa2-receivables", chapter: 2, level: 2, source: "PDF 2.3", title: "Net trade receivables",
    original: { G: 80000, s: 2, g: 3 },
    gen: r => ({ G: r.step(20000, 400000, 500), s: r.int(1, 5), g: r.int(2, 6) }),
    build(p) {
      const { y, G, s, g } = p;
      const spec = G * s / 100, gen = (G - spec) * g / 100, total = spec + gen, net = G - total;
      return {
        brief: `Measure trade receivables at 31 December ${y} net of expected credit losses. Round to cents.`,
        docs: [
          doc("report", "Credit control report", [["Gross trade receivables", eur(G)], ["Known to be uncollectible", `${s}% of the gross balance`], ["Expected loss on the rest", `${g}% of the remaining balance`]])
        ],
        paper: { sections: [
          S(`Trade receivables, 31 Dec ${y}`, [
            R("Gross trade receivables", giv(G)),
            R("Specific allowance", inp("spec", spec, "Gross × the uncollectible percentage.", `${eur(G)} × ${s}% = ${eur(spec)}.`, { tol: 0.01 })),
            R("General allowance", inp("gen", gen, "Apply the expected loss to what remains after the specific part.", `(${eur(G)} − ${eur(spec)}) × ${g}% = ${eur(gen)}.`, { tol: 0.01 })),
            R("Total allowance", inp("total", total, "Specific + general.", `${eur(spec)} + ${eur(gen)} = ${eur(total)}.`, { tol: 0.01 })),
            R("Net carrying amount", inp("net", net, "Gross − total allowance.", `${eur(G)} − ${eur(total)} = ${eur(net)}.`, { tol: 0.01 }), { total: true })
          ])
        ] },
        rule: "Receivables are shown net of an allowance for expected credit losses (IFRS 9). The general rate applies to the balance left after the specific write-downs, not to the gross amount."
      };
    }
  });

  register({
    id: "fa2-inventory", chapter: 2, level: 2, source: "PDF 2.4", title: "Inventory: FIFO and weighted average",
    original: { q0: 100, c0: 8, q1: 150, c1: 10, q2: 100, c2: 12, sold: 220, nrv: 1250 },
    gen: r => {
      for (let tries = 0; tries < 5000; tries++) {
        const q0 = r.step(50, 300, 10), q1 = r.step(50, 300, 10), q2 = r.step(50, 300, 10);
        const c0 = r.int(5, 40), falling = r.chance(0.25);
        const c1 = falling ? Math.max(2, c0 - r.int(1, 3)) : c0 + r.int(1, 5);
        const c2 = falling ? Math.max(1, c1 - r.int(1, 3)) : c1 + r.int(1, 5);
        const units = q0 + q1 + q2, cost = q0 * c0 + q1 * c1 + q2 * c2;
        if ((cost * 100) % units !== 0) continue;
        const sold = r.step(units * 0.4, units - 30, 10);
        const avg = cost / units, left = units - sold;
        const fifo = fifoClosing([[q0, c0], [q1, c1], [q2, c2]], left), wac = avg * left;
        const lo = Math.min(fifo, wac), hi = Math.max(fifo, wac);
        const modes = hi - lo >= 20 ? ["below", "between", "above"] : ["below", "above"];
        const mode = r.pick(modes);
        const nrv = mode === "below" ? Math.floor(lo * r.pick([0.8, 0.85, 0.9]) / 10) * 10
          : mode === "above" ? Math.ceil(hi * r.pick([1.05, 1.1, 1.2]) / 10) * 10
          : Math.round((lo + hi) / 20) * 10;
        if (nrv <= 0 || nrv === Math.round(fifo) || nrv === Math.round(wac)) continue;
        return { q0, c0, q1, c1, q2, c2, sold, nrv };
      }
      return { q0: 100, c0: 8, q1: 150, c1: 10, q2: 100, c2: 12, sold: 220, nrv: 1250 };
    },
    build(p) {
      const { y, q0, c0, q1, c1, q2, c2, sold, nrv } = p;
      const layers = [[q0, c0], [q1, c1], [q2, c2]];
      const units = q0 + q1 + q2, cost = q0 * c0 + q1 * c1 + q2 * c2, left = units - sold;
      const fifoClose = fifoClosing(layers, left), fifoCogs = cost - fifoClose;
      const avg = cost / units, wacCogs = avg * sold, wacClose = avg * left;
      const fifoRep = Math.min(fifoClose, nrv), wacRep = Math.min(wacClose, nrv);
      const leftText = fifoLayersText(layers, left);
      return {
        brief: `Value cost of goods sold and closing inventory for ${y} under FIFO and under the periodic weighted average, then apply the lower of cost and net realisable value.`,
        docs: [
          doc("count", `Stock card · ${y}`, [["Opening inventory", `${qty(q0)} units at ${eur(c0)}`], ["Purchase 1", `${qty(q1)} units at ${eur(c1)}`], ["Purchase 2", `${qty(q2)} units at ${eur(c2)}`], ["Units sold", qty(sold)]]),
          doc("report", "Year-end valuation", [["Units left", qty(left)], ["Net realisable value of the closing stock", eur(nrv)]])
        ],
        paper: { sections: [
          S("Inventory valuation", [
            R("Weighted-average unit cost", [null, inp("avg", avg, "Total cost of goods available ÷ total units available.", `${eur(cost)} ÷ ${qty(units)} units = ${eur(avg)} per unit.`, { fmt: "unit" })]),
            R("Cost of goods sold", [
              inp("fifoCogs", fifoCogs, "The oldest units are sold first.", `Goods available ${eur(cost)} − FIFO closing stock ${eur(fifoClose)} = ${eur(fifoCogs)}.`),
              inp("wacCogs", wacCogs, "Units sold × weighted-average unit cost.", `${qty(sold)} × ${eur(avg)} = ${eur(wacCogs)}.`)
            ]),
            R("Closing inventory at cost", [
              inp("fifoClose", fifoClose, "The units left come from the latest purchases.", `${qty(left)} units left: ${leftText} = ${eur(fifoClose)}.`),
              inp("wacClose", wacClose, "Units left × weighted-average unit cost.", `${qty(left)} × ${eur(avg)} = ${eur(wacClose)}.`)
            ]),
            R("Closing inventory reported", [
              inp("fifoRep", fifoRep, "Lower of cost and net realisable value.", `min(${eur(fifoClose)}, NRV ${eur(nrv)}) = ${eur(fifoRep)}.`),
              inp("wacRep", wacRep, "Lower of cost and net realisable value.", `min(${eur(wacClose)}, NRV ${eur(nrv)}) = ${eur(wacRep)}.`)
            ], { total: true })
          ], ["FIFO", "Weighted avg"])
        ] },
        rule: "IAS 2 allows FIFO and weighted average (never LIFO). Inventory is then measured at the lower of cost and net realisable value; any write-down is an expense of the period."
      };
    }
  });

  function fifoClosing(layers, left) {
    let value = 0, need = left;
    for (let i = layers.length - 1; i >= 0 && need > 0; i--) {
      const take = Math.min(need, layers[i][0]);
      value += take * layers[i][1];
      need -= take;
    }
    return value;
  }
  function fifoLayersText(layers, left) {
    const parts = [];
    let need = left;
    for (let i = layers.length - 1; i >= 0 && need > 0; i--) {
      const take = Math.min(need, layers[i][0]);
      parts.push(`${qty(take)} × ${eur(layers[i][1])}`);
      need -= take;
    }
    return parts.join(" + ");
  }

  register({
    id: "fa2-partial-year", chapter: 2, level: 2, title: "Depreciation from mid-year",
    gen: r => ({ life: r.pick([4, 5, 6, 8, 10]), monthly: r.step(100, 2000, 25), residual: r.chance(0.5) ? r.step(1000, 15000, 500) : 0, month: r.int(2, 12), asset: r.pick(MACHINES) }),
    build(p) {
      const { y, life, monthly, residual, month } = p;
      const dep = monthly * 12 * life, cost = dep + residual, m0 = 13 - month, d0 = monthly * m0, d1 = monthly * 12, ca = cost - d0 - d1;
      return {
        brief: `A ${p.asset} became available for use on ${dt(1, month, y)}. Depreciate it by whole months and find its carrying amount at 31 December ${y + 1}.`,
        docs: [
          doc("invoice", "Purchase invoice", [["Asset", p.asset], ["Cost", eur(cost)], ["Available for use", dt(1, month, y)]]),
          doc("memo", "Fixed-asset policy", [["Method", "Straight-line, whole months"], ["Useful life", plural(life, "year")], ["Residual value", eur(residual)]])
        ],
        paper: { sections: [
          S(`${p.asset[0].toUpperCase()}${p.asset.slice(1)}`, [
            R("Depreciable amount", inp("da", dep, "Cost − residual value.", `${eur(cost)} − ${eur(residual)} = ${eur(dep)}.`)),
            R(`Depreciation ${y}`, inp("d0", d0, "Depreciable amount ÷ months of life × months used this year.", `${eur(dep)} ÷ ${life * 12} months = ${eur(monthly)} a month × ${m0} months (${MONTHS[month - 1]}–December) = ${eur(d0)}.`)),
            R(`Depreciation ${y + 1}`, inp("d1", d1, "A full year.", `${eur(monthly)} × 12 = ${eur(d1)}.`)),
            R(`Carrying amount, 31 Dec ${y + 1}`, inp("ca", ca, "Cost − accumulated depreciation.", `${eur(cost)} − ${eur(d0)} − ${eur(d1)} = ${eur(ca)}.`), { total: true })
          ])
        ] },
        rule: "Depreciation starts when the asset is available for use, not on 1 January. The residual value is excluded from the depreciable amount but stays in the carrying amount."
      };
    }
  });

  const STOCK = [
    ["Finished bikes", "Selling costs"], ["Frames in progress", "Costs to complete and sell"], ["Spare wheels", "Selling costs"],
    ["Last season's helmets", "Selling costs"], ["Raw aluminium", "Costs to convert and sell"], ["Demo e-bikes", "Refurbishing and selling costs"]
  ];

  register({
    id: "fa2-nrv-items", chapter: 2, level: 2, title: "Lower of cost and NRV, item by item",
    gen: r => {
      for (;;) {
        const items = r.sample(STOCK, 3).map(([name, costs]) => {
          const cost = r.step(4000, 60000, 500);
          const down = r.chance(0.5);
          const nrv = down ? cost - r.step(500, cost * 0.4, 500) : cost + r.step(500, cost * 0.4, 500);
          const extra = r.step(200, 6000, 100);
          return { name, costs, cost, price: nrv + extra, extra };
        });
        const downs = items.filter(i => i.price - i.extra < i.cost).length;
        if (downs >= 1 && downs <= 2) return { items };
      }
    },
    build(p) {
      const { y, items } = p;
      const rows = [], lines = [];
      let totalCost = 0, totalRep = 0;
      items.forEach((it, i) => {
        const nrv = it.price - it.extra, rep = Math.min(it.cost, nrv);
        totalCost += it.cost; totalRep += rep;
        lines.push([it.name, `cost ${eur(it.cost)} · price ${eur(it.price)} · ${it.costs.toLowerCase()} ${eur(it.extra)}`]);
        rows.push(R(it.name, [
          inp(`nrv${i}`, nrv, "Estimated selling price − costs to complete and sell.", `${eur(it.price)} − ${eur(it.extra)} = ${eur(nrv)}.`),
          inp(`rep${i}`, rep, "Lower of cost and NRV.", `min(cost ${eur(it.cost)}, NRV ${eur(nrv)}) = ${eur(rep)}${nrv < it.cost ? `: written down by ${eur(it.cost - nrv)}` : ": stays at cost"}.`)
        ]));
      });
      rows.push(R("Total inventories", [null, inp("total", totalRep, "Add the reported amounts.", `Sum of the three lines = ${eur(totalRep)}.`)], { total: true }));
      rows.push(R("Write-down expense", [null, inp("wd", totalCost - totalRep, "Total cost − total reported amount.", `${eur(totalCost)} − ${eur(totalRep)} = ${eur(totalCost - totalRep)}.`)]));
      return {
        brief: `Measure each stock line at 31 December ${y} at the lower of cost and net realisable value.`,
        docs: [doc("count", `Stock count · 31 Dec ${y}`, lines)],
        paper: { sections: [S("Inventory by item", rows, ["NRV", "Reported"])] },
        rule: "IAS 2: net realisable value is the estimated selling price less the costs to complete and sell. Compare cost and NRV item by item; a gain on one line never offsets a loss on another."
      };
    }
  });

  register({
    id: "fa2-asset-section", chapter: 2, level: 3, source: "PDF 2.5", title: "Year-end asset section",
    original: { mCost: 120000, mLife: 5, mMonth: 4, pCost: 45000, pLife: 3, pMonth: 1, G: 64000, e: 5, inv: 38000, nrv: 35000, cash: 12000 },
    gen: r => {
      const mLife = r.pick([4, 5, 8, 10]), pLife = r.pick([3, 4, 5]), inv = r.step(10000, 80000, 1000);
      return {
        mLife, mCost: 12 * mLife * r.step(100, 3000, 100), mMonth: r.int(1, 12),
        pLife, pCost: 12 * pLife * r.step(100, 2000, 50), pMonth: r.int(1, 12),
        G: r.step(20000, 200000, 1000), e: r.int(2, 8), inv, nrv: inv + (r.chance(0.6) ? -1 : 1) * r.step(1000, 8000, 500), cash: r.step(2000, 40000, 500),
        asset: r.pick(MACHINES)
      };
    },
    build(p) {
      const { y, mCost, mLife, mMonth, pCost, pLife, pMonth, G, e, inv, nrv, cash } = p;
      const mm = 13 - mMonth, pm = 13 - pMonth;
      const mDep = mCost / (mLife * 12) * mm, machine = mCost - mDep;
      const pAm = pCost / (pLife * 12) * pm, patent = pCost - pAm;
      const rec = G * (100 - e) / 100, stock = Math.min(inv, nrv);
      const nca = machine + patent, ca = stock + rec + cash;
      return {
        brief: `Prepare the asset side of the balance sheet at 31 December ${y}. Use straight-line charges and whole months.`,
        docs: [
          doc("invoice", `Machine · ${p.asset || "machine"}`, [["Cost", eur(mCost)], ["Bought and available", dt(1, mMonth, y)], ["Useful life", plural(mLife, "year")], ["Residual value", "nil"]]),
          doc("contract", "Patent", [["Cost", eur(pCost)], ["Acquired", dt(1, pMonth, y)], ["Useful life", plural(pLife, "year")]]),
          doc("report", "Receivables ageing", [["Gross trade receivables", eur(G)], ["Expected credit loss", `${e}%`]]),
          doc("count", "Stock count", [["Inventory at cost", eur(inv)], ["Net realisable value", eur(nrv)]]),
          doc("bank", `Bank balance · 31 Dec ${y}`, [["Cash and cash equivalents", eur(cash)]])
        ],
        paper: { sections: [
          S("Non-current assets", [
            R("Machine (net)", inp("machine", machine, "Cost − depreciation for the months in use.", `${eur(mCost)} ÷ ${mLife * 12} months × ${mm} months = ${eur(mDep)} depreciation; ${eur(mCost)} − ${eur(mDep)} = ${eur(machine)}.`)),
            R("Patent (net)", inp("patent", patent, "Cost − amortisation for the months held.", `${eur(pCost)} ÷ ${pLife * 12} months × ${pm} months = ${eur(pAm)} amortisation; ${eur(pCost)} − ${eur(pAm)} = ${eur(patent)}.`)),
            R("Total non-current assets", inp("nca", nca, "Machine + patent.", `${eur(machine)} + ${eur(patent)} = ${eur(nca)}.`), { total: true })
          ]),
          S("Current assets", [
            R("Inventories", inp("stock", stock, "Lower of cost and NRV.", `min(${eur(inv)}, ${eur(nrv)}) = ${eur(stock)}.`)),
            R("Trade receivables (net)", inp("rec", rec, "Gross × (1 − expected loss).", `${eur(G)} × ${100 - e}% = ${eur(rec)}.`)),
            R("Cash and cash equivalents", giv(cash)),
            R("Total current assets", inp("ca", ca, "Inventories + receivables + cash.", `${eur(stock)} + ${eur(rec)} + ${eur(cash)} = ${eur(ca)}.`), { total: true })
          ]),
          S("Total", [
            R("Total assets", inp("ta", nca + ca, "Non-current + current.", `${eur(nca)} + ${eur(ca)} = ${eur(nca + ca)}.`), { total: true, grand: true })
          ])
        ] },
        rule: "Each asset is measured under its own standard before it is classified: PPE and intangibles net of depreciation (IAS 16, IAS 38), inventories at the lower of cost and NRV (IAS 2), receivables net of expected losses (IFRS 9)."
      };
    }
  });

  register({
    id: "fa2-asset-register", chapter: 2, level: 3, title: "Fixed-asset register for the year",
    gen: r => {
      const bLife = r.pick([20, 25, 40]), aLife = r.pick([5, 8, 10]), bLifeB = r.pick([4, 5, 8]);
      const aMonthly = r.step(100, 1500, 50), aYears = r.int(1, aLife - 2), sold = r.int(3, 11);
      const aCost = aMonthly * 12 * aLife, aCa = aCost - aMonthly * (12 * aYears + sold);
      return {
        land: r.step(50000, 400000, 10000), bLife, bAnnual: r.step(2000, 20000, 500), bYears: r.int(2, 12),
        aLife, aMonthly, aYears, sold, aProceeds: Math.max(0, aCa + r.step(-aCa * 0.4, aCa * 0.4, 500)),
        bLifeB, bMonthly: r.step(100, 2000, 50), bMonth: r.int(2, 11)
      };
    },
    build(p) {
      const { y, land, bLife, bAnnual, bYears, aLife, aMonthly, aYears, sold, aProceeds, bLifeB, bMonthly, bMonth } = p;
      const bCost = bAnnual * bLife, bOpenAcc = bAnnual * bYears, bCa = bCost - bOpenAcc - bAnnual;
      const aCost = aMonthly * 12 * aLife, aOpenAcc = aMonthly * 12 * aYears, aDep = aMonthly * sold, aCa = aCost - aOpenAcc - aDep, gain = aProceeds - aCa;
      const mbCost = bMonthly * 12 * bLifeB, mbMonths = 13 - bMonth, mbDep = bMonthly * mbMonths, mbCa = mbCost - mbDep;
      const totalDep = bAnnual + aDep + mbDep, ppe = land + bCa + mbCa;
      const soldDate = dt(new Date(y, sold, 0).getDate(), sold, y);
      return {
        brief: `Update the fixed-asset register for ${y}: depreciation, a disposal and a new purchase. All assets use straight-line depreciation with no residual value and whole months.`,
        docs: [
          doc("ledger", `Fixed-asset register · 1 Jan ${y}`, [["Land", `cost ${eur(land)}`], ["Office building", `cost ${eur(bCost)}, accumulated depreciation ${eur(bOpenAcc)}, life ${bLife} years`], ["Machine A", `cost ${eur(aCost)}, accumulated depreciation ${eur(aOpenAcc)}, life ${aLife} years`]]),
          doc("invoice", "Sale of machine A", [["Date", soldDate], ["Proceeds", eur(aProceeds)]]),
          doc("invoice", "Purchase of machine B", [["Cost", eur(mbCost)], ["Available for use", dt(1, bMonth, y)], ["Useful life", plural(bLifeB, "year")]])
        ],
        paper: { sections: [
          S("Land and building", [
            R(`Land, 31 Dec ${y}`, inp("land", land, "Is land depreciated?", `Land has an unlimited life and is not depreciated: it stays at ${eur(land)}.`)),
            R(`Building: depreciation ${y}`, inp("bDep", bAnnual, "Cost ÷ useful life.", `${eur(bCost)} ÷ ${bLife} = ${eur(bAnnual)}.`)),
            R(`Building, 31 Dec ${y}`, inp("bCa", bCa, "Cost − opening accumulated depreciation − this year's charge.", `${eur(bCost)} − ${eur(bOpenAcc)} − ${eur(bAnnual)} = ${eur(bCa)}.`))
          ]),
          S("Machine A (sold)", [
            R(`Depreciation ${y} up to the sale`, inp("aDep", aDep, "Monthly charge × months to the sale date.", `${eur(aCost)} ÷ ${aLife * 12} = ${eur(aMonthly)} a month × ${sold} months = ${eur(aDep)}.`)),
            R("Carrying amount at the sale date", inp("aCa", aCa, "Cost − opening accumulated depreciation − this year's charge.", `${eur(aCost)} − ${eur(aOpenAcc)} − ${eur(aDep)} = ${eur(aCa)}.`)),
            R("Gain (+) or loss (−) on disposal", inp("gain", gain, "Proceeds − carrying amount.", `${eur(aProceeds)} − ${eur(aCa)} = ${eur(gain)}.`))
          ]),
          S("Machine B (bought)", [
            R(`Depreciation ${y}`, inp("mbDep", mbDep, "Monthly charge × months since it became available.", `${eur(mbCost)} ÷ ${bLifeB * 12} = ${eur(bMonthly)} a month × ${mbMonths} months = ${eur(mbDep)}.`)),
            R(`Machine B, 31 Dec ${y}`, inp("mbCa", mbCa, "Cost − this year's depreciation.", `${eur(mbCost)} − ${eur(mbDep)} = ${eur(mbCa)}.`))
          ]),
          S("Totals", [
            R(`Depreciation expense ${y}`, inp("totDep", totalDep, "Building + machine A + machine B.", `${eur(bAnnual)} + ${eur(aDep)} + ${eur(mbDep)} = ${eur(totalDep)}.`), { total: true }),
            R(`Property, plant and equipment, 31 Dec ${y}`, inp("ppe", ppe, "Land + building + machine B (machine A is gone).", `${eur(land)} + ${eur(bCa)} + ${eur(mbCa)} = ${eur(ppe)}.`), { total: true, grand: true })
          ])
        ] },
        rule: "IAS 16: land is not depreciated; depreciation runs until the date of disposal and starts when a new asset is available for use; a disposal removes the whole carrying amount and books a gain or loss."
      };
    }
  });
})();
