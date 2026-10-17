/* PolimiAFC — more work for the consolidation desk, on Lecture 03 (Financial Statements Consolidation) and the
   Lecture 04 exercises: types of investment, combine and offset, intra-group eliminations, fair values and
   deferred taxes (the Mickey/Mouse case), non-controlling interests with full or partial goodwill (Star/Light),
   and the reporting currency among the pre-consolidation adjustments.
   Loaded after office-indicators.js: it adds its exercises and theory to the consolidation desk. */
(function (root) {
  "use strict";
  const D = root.OfficeData, ST = root.OfficeStudy;
  const Y = D.Y;
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-US");
  const r2 = x => Math.round(x * 100) / 100;
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));

  const NAMES = [["Mickey", "Mouse"], ["Star", "Light"], ["Comfy", "Sunny"], ["Lario Energia", "Brina Srl"], ["Alfa", "Beta"]];
  const pair = r => r.pick(NAMES);

  // ---------- Which method for which investee? (Lecture 03, slides 7 and 12) ----------
  const CATS = ["Subsidiary (full consolidation)", "Associate (equity method)", "Joint venture (equity method)", "Other investment"];
  const INVESTEES = [
    ["60% of the voting rights", 0, "More than 50% of the votes usually means control: IFRS 10, full consolidation."],
    ["75% of the shares", 0, "Control: a subsidiary, consolidated line by line."],
    ["40%, the other 60% spread among many shareholders with at most 1% each", 0, "No one else can outvote it: 40% gives control in practice (Lecture 03, case 2)."],
    ["90% of the shares, bought last year", 0, "Control: full consolidation, with 10% of non-controlling interests."],
    ["40%, while another investor holds the other 60%", 1, "The other investor controls it; 40% gives significant influence: an associate, IAS 28 (Lecture 03, case 1)."],
    ["30% and a seat on the board", 1, "Significant influence (20% or more, without control): IAS 28, equity method."],
    ["25% of the votes, no control", 1, "20% or more without control: significant influence, equity method."],
    ["50%, every decision taken unanimously with the other 50% investor by contract", 2, "Joint control of a separate entity: a joint venture (IFRS 11), equity method."],
    ["A separate company run under joint control with two partners", 2, "Joint control: a joint venture, accounted for with the equity method."],
    ["10% of a listed company, no board seat", 3, "No control and no significant influence: an other investment."],
    ["19.4%, after withdrawing its representatives from the board", 3, "Without significant influence the equity method stops (IAS 28): an other investment, as TotalEnergies with Novatek."],
    ["5% bought as a financial investment", 3, "Neither control nor influence: an other investment."]
  ];
  function investmentType(r) {
    for (let t = 0; t < 40; t++) {
      const picked = r.shuffle(INVESTEES.slice()).slice(0, 5);
      if (new Set(picked.map(p => p[1])).size < 3) continue;
      return { type: "reclass", pattern: "type of investment", cats: CATS, short: ["Sub", "Assoc.", "JV", "Other"], typeLabel: "CONSOLIDATION", docKind: "Lario Energia's investments",
        brief: "Which kind of investee is each one, and so which accounting method?", note: "Control → IFRS 10, full consolidation. Significant influence → IAS 28, equity method. Joint control of a separate entity → IFRS 11, equity method.",
        items: picked.map(([label, k, why]) => ({ label, cat: CATS[k], why })), fields: [] };
    }
    throw new Error("investmentType");
  }

  // ---------- Combine and offset (Lecture 03, slides 37–41) ----------
  function combineOffset(goodwill) {
    return r => {
      const [P, S] = pair(r);
      const sPlant = step(r, 100, 900, 10), sOther = step(r, 0, 400, 10), sDebt = step(r, 0, Math.round((sPlant + sOther) * 0.6), 10), sEq = sPlant + sOther - sDebt;
      const price = goodwill ? sEq + step(r, 20, Math.max(30, Math.round(sEq * 0.4)), 10) : sEq;
      const pCash = step(r, 100, 600, 10), pOther = step(r, 300, 1500, 10), pTA = pCash + pOther + price, pEq = step(r, Math.round(pTA * 0.3), Math.round(pTA * 0.7), 10), pDebt = pTA - pEq;
      const agg = pTA + sPlant + sOther, gw = price - sEq, cons = agg - price + gw;
      const fields = [
        { key: "agg", label: "Combined (aggregated) total assets", answer: agg, why: `Combine: add like items. ${P} ${fmt(pTA)} + ${S} ${fmt(sPlant + sOther)} = ${fmt(agg)}.` }];
      if (goodwill) fields.push({ key: "gw", label: "Goodwill", answer: gw, why: `Price paid ${fmt(price)} − ${S}'s equity ${fmt(sEq)} = ${fmt(gw)} (100%, fair values equal to book values).` });
      fields.push(
        { key: "cons", label: "Consolidated total assets", answer: cons, why: `Offset: remove the investment (${fmt(price)})${goodwill ? ` and recognise the goodwill (${fmt(gw)})` : ""}: ${fmt(agg)} − ${fmt(price)}${goodwill ? ` + ${fmt(gw)}` : ""} = ${fmt(cons)}. The subsidiary's assets are no longer counted twice.` },
        { key: "eq", label: "Consolidated equity", answer: pEq, why: `${S}'s equity (${fmt(sEq)}) is offset against the investment: what's left is ${P}'s equity, ${fmt(pEq)}.` });
      return {
        type: "fill", pattern: goodwill ? "combine, offset and goodwill" : "combine and offset",
        doc: { kind: `Balance sheets at 31 December ${Y}`, title: `${P} bought 100% of ${S}`, lines: [["", P, S], ["Plant", "—", fmt(sPlant)], ["Cash", fmt(pCash), "—"], ["Other assets", fmt(pOther), fmt(sOther)], [`Investment in ${S}`, fmt(price), "—"],
          ["Total assets", fmt(pTA), fmt(sPlant + sOther)], ["Equity", fmt(pEq), fmt(sEq)], ["Debt", fmt(pDebt), fmt(sDebt)]],
          facts: [goodwill ? `${P} paid ${fmt(price)}, more than ${S}'s equity. Fair values equal book values; no intra-group transactions.` : `The investment equals ${S}'s equity (the simplest scenario): no non-controlling interests, no intra-group transactions.`] },
        brief: "Full consolidation in its first two steps: combine like items, then offset the investment against the subsidiary's equity.", fields,
        choice: { label: "Why offset the investment?", options: ["It already stands for the subsidiary's assets and liabilities: they'd be counted twice", "Investments are never shown in a balance sheet", "To reduce the group's taxes"], answer: "It already stands for the subsidiary's assets and liabilities: they'd be counted twice",
          why: "We want to show the group as if the parent had bought the subsidiary's assets and liabilities directly." }
      };
    };
  }

  // ---------- Intra-group transactions (Lecture 03, slide 45) ----------
  function intraGroup(r) {
    const [P, S] = pair(r), p = r.pick([60, 70, 75, 80, 85, 90]), x = step(r, 100, 900, 10), y = step(r, 0, x, 10), parentSells = r.chance(0.7);
    const [seller, buyer] = parentSells ? [P, S] : [S, P];
    const pRev = step(r, 2000, 9000, 10) + (parentSells ? x : 0), sRev = step(r, 800, 4000, 10) + (parentSells ? 0 : x);
    const pRec = step(r, 300, 2000, 10) + (parentSells ? y : 0), sRec = step(r, 100, 900, 10) + (parentSells ? 0 : y);
    const withDiv = r.chance(0.4), div = withDiv ? step(r, 50, 500, 10) : 0, divIn = r2(div * p / 100);
    const fields = [
      { key: "rev", label: "Consolidated revenues", answer: pRev + sRev - x, why: `${fmt(pRev)} + ${fmt(sRev)} − ${fmt(x)} intra-group = ${fmt(pRev + sRev - x)}. ${seller}'s revenue and ${buyer}'s cost of ${fmt(x)} both go.` },
      { key: "rec", label: "Consolidated trade receivables", answer: pRec + sRec - y, why: `${fmt(pRec)} + ${fmt(sRec)} − ${fmt(y)} owed inside the group = ${fmt(pRec + sRec - y)}; ${buyer}'s payable of ${fmt(y)} goes too.` }];
    if (withDiv) fields.push({ key: "div", label: `Dividend income eliminated from ${P}'s income statement`, answer: divIn, why: `${S} paid ${fmt(div)}; ${P} booked its ${p}%, ${fmt(divIn)}. Inside the group it's just moving cash: eliminated. (The rest went to the minorities, outside the group.)` });
    return {
      type: "fill", pattern: "intra-group eliminations",
      doc: { kind: `${Y} (k€)`, title: `${P} owns ${p}% of ${S}`, lines: [["", P, S], ["Revenues", fmt(pRev), fmt(sRev)], ["Trade receivables", fmt(pRec), fmt(sRec)]],
        facts: [`${seller} provided services to ${buyer} for ${fmt(x)}, recorded as revenue by ${seller} and as a cost by ${buyer}.`, `At 31 December ${fmt(y)} of it is still unpaid: a receivable for ${seller}, a payable for ${buyer}.`].concat(withDiv ? [`${S} paid dividends of ${fmt(div)} in total during the year.`] : []) },
      brief: "Eliminate the intra-group transactions: the consolidated statements show only what the group did with third parties.", fields,
      choice: { label: "These intra-group amounts are eliminated…", options: ["In full, whatever the stake and whoever sells", `Only for ${P}'s ${p}% share`, "Only when the parent is the seller"], answer: "In full, whatever the stake and whoever sells",
        why: `IFRS 10 eliminates intra-group revenues and costs, receivables and payables, profits on intra-group stock and fixed assets, and dividends, in full: 100% even with a ${p}% stake, whichever company is the seller.` }
    };
  }

  // ---------- Fair values and deferred taxes (the Mickey/Mouse case, Lecture 03 slides 49–56) ----------
  function fairValueTax(r) {
    for (let t = 0; t < 80; t++) {
      const [P, S] = pair(r), cs = step(r, 500, 3000, 100), re = step(r, 100, 1500, 100), eq = cs + re, sPpe = step(r, 500, 3000, 100), pPpe = step(r, 300, 3000, 100);
      const up = step(r, 200, 1500, 100), prov = step(r, 0, 500, 50), tax = r.pick([0.25, 0.3, 0.4, 0.5]);
      const dtl = r2(up * tax), dta = r2(prov * tax), price = eq + up - dtl - prov + dta + step(r, 50, 900, 50);
      const gw = r2(price - eq - up + dtl + prov - dta);
      if (gw <= 0) continue;
      return {
        type: "fill", pattern: "fair value and deferred taxes",
        doc: { kind: `Acquisition on 31 December ${Y}`, title: `${P} buys 100% of ${S} for ${fmt(price)}`, lines: [["", P, S], ["PPE", fmt(pPpe), fmt(sPpe)], ["Common stock", "", fmt(cs)], ["Retained earnings", "", fmt(re)]],
          facts: [`At the acquisition date ${S}'s fair values equal its book values, except the plant (+${fmt(up)}) and the provisions (+${fmt(prov)}, a liability).`, `Tax rate: ${tax * 100}%.`, "The difference between the cost of the investment and the net assets at fair value is goodwill."] },
        brief: "Combine at fair value: recognise the deferred taxes on the surpluses, then compute the goodwill.", fields: [
          { key: "dtl", label: "Deferred tax liability", answer: dtl, why: `Plant uplift × tax rate = ${fmt(up)} × ${tax * 100}% = ${fmt(dtl)}: the higher value will mean more tax in the future.` },
          { key: "dta", label: "Deferred tax asset", answer: dta, why: `Provisions uplift × tax rate = ${fmt(prov)} × ${tax * 100}% = ${fmt(dta)}: a higher liability means less tax in the future.` },
          { key: "ppe", label: "Consolidated PPE", answer: pPpe + sPpe + up, why: `${fmt(pPpe)} + ${fmt(sPpe)} + uplift ${fmt(up)} = ${fmt(pPpe + sPpe + up)}: the subsidiary enters at fair value.` },
          { key: "gw", label: "Goodwill", answer: gw, why: `Price ${fmt(price)} − equity ${fmt(eq)} − plant uplift ${fmt(up)} + DTL ${fmt(dtl)} + provisions uplift ${fmt(prov)} − DTA ${fmt(dta)} = ${fmt(gw)}.` }],
        choice: { label: "The deferred tax liability exists because…", options: ["The plant's higher value will mean more taxable income in the future", "The parent must pay that tax today", "Goodwill is taxed every year"], answer: "The plant's higher value will mean more taxable income in the future",
          why: "Book and fair value differ: a temporary difference that will raise (DTL) or lower (DTA) future taxes. Recognised separately." }
      };
    }
    throw new Error("fairValueTax");
  }

  // ---------- Non-controlling interests: full or partial goodwill (the Star/Light case, Lecture 03 slides 60–63) ----------
  function nciGoodwill(r) {
    for (let t = 0; t < 120; t++) {
      const [P, S] = pair(r), p = r.pick([55, 60, 65, 70, 75, 80]) / 100, bv = step(r, 100, 600, 10), tax = r.pick([0.25, 0.3, 0.4]);
      const items = [["Building", step(r, 20, 150, 5)], ["Land", step(r, 10, 100, 5)], ["Trademark", step(r, 20, 200, 5)]].map(([n, b]) => [n, b, b + step(r, 10, 200, 5)]);
      const sur = items.reduce((s, [, b, f]) => s + f - b, 0), net = r2(sur * (1 - tax));
      const price = Math.round((bv + net) * p * (1 + r.int(5, 40) / 100)), fvNci = Math.round((bv + net) * (1 - p) * (1 + r.int(5, 40) / 100));
      const full = r2(price + fvNci - bv - net), part = r2(price - p * bv - p * net);
      if (part <= 0 || full <= part) continue;
      return {
        type: "fill", pattern: "NCI and goodwill (full vs partial)",
        doc: { kind: "Acquisition (€ million)", title: `${P} buys ${p * 100}% of ${S} for ${fmt(price)}`, lines: [["", "Book value", "Fair value"], ...items.map(([n, b, f]) => [n, fmt(b), fmt(f)])],
          facts: [`${S}'s equity at book value: ${fmt(bv)}. Every other asset and liability is at fair value already.`, `Fair value of the non-controlling interests (${r2((1 - p) * 100)}%): ${fmt(fvNci)}.`, `Tax rate: ${tax * 100}%.`] },
        brief: "Compute the net surpluses, then goodwill with NCI at fair value (full goodwill) and with NCI at their proportionate share (partial goodwill).", fields: [
          { key: "net", label: "Net surpluses, after tax", answer: net, why: `Surpluses ${fmt(sur)} − tax ${tax * 100}% (${fmt(sur * tax)}) = ${fmt(net)}.` },
          { key: "full", label: "Goodwill, full method", answer: full, why: `Price ${fmt(price)} + fair value of NCI ${fmt(fvNci)} − book value of equity ${fmt(bv)} − net surpluses ${fmt(net)} = ${fmt(full)}: the whole subsidiary's goodwill.` },
          { key: "part", label: "Goodwill, partial method", answer: part, why: `Price ${fmt(price)} − ${p * 100}% × ${fmt(bv)} − ${p * 100}% × ${fmt(net)} = ${fmt(part)}: only the part attributable to ${P}.` }],
        choice: { label: "With NCI measured at fair value, the goodwill recognised is…", options: ["The whole subsidiary's, minorities' part included", `Only ${P}'s part`, "Zero: NCI absorb it"], answer: "The whole subsidiary's, minorities' part included",
          why: "Full goodwill: total value (price + fair value of NCI) minus the fair value of the net assets. The partial method keeps only the parent's share." }
      };
    }
    throw new Error("nciGoodwill");
  }

  // ---------- Pre-consolidation: the reporting currency (Lecture 03, slides 33–35) ----------
  function translation(r) {
    for (let t = 0; t < 60; t++) {
      const avg = r.pick([1.05, 1.08, 1.1, 1.12, 1.15, 1.2]), close = r.pick([1, 1.04, 1.06, 1.1, 1.14, 1.18, 1.25]);
      if (avg === close) continue;
      const rev = step(r, 2000, 9000, 100), profit = step(r, 100, Math.round(rev * 0.2), 10), ta = step(r, 3000, 12000, 100), tl = step(r, 1000, Math.round(ta * 0.6), 100);
      const reserve = r2(profit / close - profit / avg);
      return {
        type: "fill", pattern: "translation into the group's currency",
        doc: { kind: `US subsidiary · ${Y} ($ thousand)`, title: "Translating into euro", lines: [["Revenues", fmt(rev)], ["Profit for the year", fmt(profit)], ["Total assets", fmt(ta)], ["Total liabilities", fmt(tl)], ["Average rate of the year", `€1 = $${avg}`], ["Closing rate at 31 December", `€1 = $${close}`]] },
        brief: "Income statement items at the average rate; balance sheet items, except the profit for the year, at the closing rate.", fields: [
          { key: "rev", label: "Revenues in euro (€ thousand)", answer: r2(rev / avg), dec: true, tol: 1, why: `${fmt(rev)} ÷ ${avg} = ${fmt(rev / avg)}: the average rate.` },
          { key: "ta", label: "Total assets in euro (€ thousand)", answer: r2(ta / close), dec: true, tol: 1, why: `${fmt(ta)} ÷ ${close} = ${fmt(ta / close)}: the closing rate.` },
          { key: "res", label: "Translation difference (€ thousand)", answer: reserve, dec: true, neg: true, tol: 1, why: `The profit is in the balance sheet at the average rate (${fmt(profit / avg)}), while at the closing rate it would be ${fmt(profit / close)}: ${fmt(profit / close)} − ${fmt(profit / avg)} = ${fmt(reserve)}.` }],
        choice: { label: "The translation difference goes to…", options: ["A translation reserve in equity", "The income statement, as a gain or a loss", "Goodwill"], answer: "A translation reserve in equity",
          why: "When the rate used for the income statement differs from the balance sheet's, the difference is classified in an equity reserve, the translation reserve." }
      };
    }
    throw new Error("translation");
  }

  // ---------- Theory (past-exam style) ----------
  const T = (level, q, right, wrongs, why) => ["cons", level, q, [[right, true, why]].concat(wrongs.map(([w, y]) => [w, false, y]))];
  ST.MCQ.push(
    T(1, "Why does a group prepare consolidated financial statements?", "To show the group's assets and liabilities as one entity: a single “investment” line hides what the subsidiary owns", [["To pay less tax", "Consolidation isn't about taxes."], ["Because each company can't publish its own statements", "Each company still has its own."], ["To value the parent's shares on the stock exchange", "Not the purpose."]], "Lecture 03: behind the same investment of 100 there could be a plant and inventories, or just cash."),
    T(1, "Combining like items means…", "Adding the parent's and the subsidiaries' assets, liabilities, equity, income, expenses and cash flows, line by line", [["Adding only the parent's share of each item", "Combine takes 100%; the minorities' part shows as NCI."], ["Keeping only the parent's statements", "No."], ["Eliminating every subsidiary's equity", "That's the offset step."]], "Step 2.1 of the consolidation process."),
    T(1, "Money lent by the parent to a subsidiary, in the consolidated statements, is…", "Like a cash transfer between two divisions of one company: eliminated", [["A loan to third parties", "It stays inside the group."], ["Revenue of the parent", "No."], ["Goodwill", "No."]], "Only transactions with third parties remain."),
    T(1, "An investment in an associate is first recognised…", "At cost, then adjusted by the share of profit and dividends", [["At the associate's total equity", "At cost."], ["At zero until dividends arrive", "At cost."], ["Line by line, like a subsidiary", "That's full consolidation."]], "IAS 28: initial recognition at cost."),
    T(2, "A subsidiary closes its year on 30 September, the parent on 31 December. Under IFRS…", "It prepares interim statements at 31 December; if not feasible, a gap of up to three months is allowed, adjusting for significant events", [["It can't be consolidated", "Pre-consolidation adjustments exist for this."], ["Any gap is fine", "At most three months, constant over time."], ["The parent changes its year end", "No."]], "Pre-consolidation adjustment 1.1: closing period."),
    T(2, "Translating a foreign subsidiary's statements, income statement items use…", "The average rate of the year (or the rate on each transaction's date); balance sheet items the closing rate", [["The closing rate for everything", "Not for the income statement."], ["The historical rate for everything", "No."], ["The rate chosen by the subsidiary", "No."]], "Pre-consolidation adjustment 1.3: reporting currency."),
    T(2, "Different rates for the income statement and the balance sheet create a difference that goes to…", "A translation reserve in equity", [["The income statement", "It's not a gain or a loss of the year."], ["Goodwill", "No."], ["Provisions", "No."]], "Lecture 03, slide 35."),
    T(2, "IFRS 10 requires the full elimination of…", "Intra-group revenues and costs, receivables and payables, profits on intra-group inventories and fixed assets, and intra-group dividends", [["Only intra-group dividends", "Everything intra-group."], ["Only transactions where the parent sells", "Whoever sells."], ["Only the parent's share of each transaction", "In full."]], "Transactions between group companies are like transactions between divisions of one company."),
    T(3, "In the years after the acquisition, goodwill is…", "Not amortised, but tested for impairment every year", [["Amortised over five years", "Not under IFRS 3."], ["Written off at once", "No."], ["Revalued to market every year", "No."]], "Past exam (July 2025): goodwill is subject to annual impairment testing."),
    T(3, "With NCI measured at their proportionate share of the net assets, the goodwill recognised is…", "Only the part attributable to the parent", [["The whole subsidiary's", "That's the full method, with NCI at fair value."], ["Always zero", "No."], ["The NCI's part only", "No."]], "Star/Light: full goodwill 130, partial 78."),
    T(3, "The subsidiary's plant is worth 1,000 more than its book value; tax rate 50%. In consolidation…", "Plant +1,000 and a deferred tax liability of 500: the net surplus is 500", [["Plant +1,000 and no tax effect", "The temporary difference creates a DTL."], ["Plant +500 only", "The plant goes to its full fair value."], ["A deferred tax asset of 500", "A higher asset means more tax in the future: a liability."]], "Mickey/Mouse: DTL = uplift × tax rate.")
  );

  // ---------- Where they go ----------
  const NEW = {
    1: [investmentType, combineOffset(false), intraGroup],
    2: [investmentType, combineOffset(true), intraGroup, fairValueTax, translation],
    3: [intraGroup, fairValueTax, nciGoodwill, translation]
  };
  [1, 2, 3].forEach(l => { ST.PLAN.cons[l] = ST.PLAN.cons[l].concat(NEW[l]); });

  const api = { CATS, INVESTEES, investmentType, combineOffset, intraGroup, fairValueTax, nciGoodwill, translation };
  root.OfficeConsolidation = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
