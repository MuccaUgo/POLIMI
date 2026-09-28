/* PolimiAFC — the study desks. Each morning you choose the day's work: client bookkeeping, the
   consolidation desk or the financial analysis desk. The two desks climb three levels, the third being
   the level of the AFC written exam (the patterns of AFC26_ExamQuestions and the Lecture 04 exercises).
   Loaded after office-logic.js and office-analysis.js. */
(function (root) {
  "use strict";
  const D = root.OfficeData, O = root.OfficeLogic, A = root.OfficeAnalysis;
  const Y = D.Y;
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString("en-US");
  const r2 = x => Math.round(x * 100) / 100;
  const pct2 = x => Math.round(x * 10000) / 100; // 0.12345 → 12.35 (%)
  const step = (r, lo, hi, s) => s * r.int(Math.ceil(lo / s), Math.floor(hi / s));

  const TRACKS = {
    cons: { name: "Consolidation desk", short: "CONSOLIDATION", icon: "🏢" },
    fa: { name: "Financial analysis desk", short: "FIN. ANALYSIS", icon: "📊" }
  };
  const LEVEL_NAMES = { 1: "Level 1 · basics", 2: "Level 2 · practice", 3: "Level 3 · exam level" };
  const ADVANCE = { window: 8, need: 6 };

  // ---------- Multiple-choice theory (past-exam style) ----------
  // [track, level, question, [[option, correct?, why], …]]
  const MCQ = [
    ["cons", 1, "Under the equity method, the investor must…", [
      ["Recognise one asset at cost, then adjust it every year by its share of the investee's profit and dividends, recording the related flows in the income statement and cash flow statement", true, "Complete: the balance sheet, the income statement (share of profit) and the cash flow statement (dividends received) all move."],
      ["Recognise one asset at cost and then amortise it every year", false, "The investment isn't amortised: book value(t) = book value(t−1) + share of profit(t) − share of dividends(t)."],
      ["Recognise one asset and increase it every year by the profit and the dividends", false, "Dividends decrease the investment; a loss decreases it too."],
      ["Recognise one asset and adjust it by profit and dividends, with no effect on the other statements", false, "Incomplete: the share of profit goes to the income statement, the dividends to the cash flow statement."]]],
    ["cons", 1, "Which statement about associates is correct?", [
      ["The investor has significant influence (it takes part in policy decisions) and uses the equity method", true, "IAS 28: significant influence, usually from 20% of the voting rights, equity method."],
      ["The investor has significant influence and uses full consolidation", false, "Full consolidation is for subsidiaries, where there is control."],
      ["Associates are controlled by the investor under IFRS 10", false, "Control makes a subsidiary; an associate is only influenced (IAS 28)."],
      ["The investor directs the investee's activities but has no voting rights", false, "Power without voting rights isn't the definition of an associate."]]],
    ["cons", 1, "Under IAS 28, which holding normally indicates significant influence?", [
      ["20% or more of the voting rights, but not a majority", true, "From 20% up to control: significant influence and the equity method."],
      ["More than 50% of the voting rights", false, "A majority usually means control: a subsidiary."],
      ["Any holding at all", false, "Below 20% there's normally no significant influence."],
      ["Exactly 50%", false, "50% with another partner is typically joint control."]]],
    ["cons", 1, "IFRS 10: which of these is NOT one of the three elements of control?", [
      ["The ability to move the goodwill from consolidation to a revaluation reserve", true, "Not an element of control (and goodwill never goes to a revaluation reserve)."],
      ["Power over the investee", false, "It is one of the three elements."],
      ["Exposure, or rights, to variable returns from the investee", false, "It is one of the three elements."],
      ["The ability to use that power to affect the investor's returns", false, "It is one of the three elements."]]],
    ["cons", 1, "A parent holds 80% of a subsidiary. In full consolidation…", [
      ["100% of the subsidiary's assets and liabilities are combined, and the non-controlling interests are shown separately in equity", true, "Line-by-line for the whole subsidiary; the 20% belonging to others is the NCI, inside equity."],
      ["Only 80% of the assets and liabilities are combined", false, "That would be proportional consolidation, not IFRS 10."],
      ["Only 80% of the subsidiary's net income is included, nothing else", false, "That describes neither method."],
      ["Only the investment appears in the balance sheet", false, "That's the equity method, for associates."]]],
    ["cons", 1, "Which statement about consolidated financial statements is correct?", [
      ["Non-controlling interests are the part of the subsidiary not owned by the parent", true, "Correct definition."],
      ["Their purpose is to show each subsidiary's assets and liabilities separately", false, "They present the group as a single economic entity."],
      ["Their purpose is to compare the subsidiaries' indicators", false, "The purpose is the group's own position and performance."],
      ["None of the other answers", false, "The first answer is correct."]]],
    ["cons", 2, "Joint venture (a separate entity under joint control of two or more investors). Under IAS/IFRS…", [
      ["The equity method can be applied, as for associates", true, "Joint ventures are accounted for, and the equity method can be used."],
      ["Each investor consolidates it line by line, pro quota", false, "Line-by-line with non-controlling interests is only for subsidiaries."],
      ["One investor consolidates it in full", false, "Full consolidation needs control, and here control is joint."],
      ["No investor has to account for it", false, "The investment is always recognised."]]],
    ["cons", 2, "Group Beta: one subsidiary uses euros, IFRS and a Jan–Dec year; the other dollars, US GAAP and a Mar–Feb year. Which is correct?", [
      ["None of the other answers", true, "Pre-consolidation adjustments align periods (interim reports, or a gap of up to three months), accounting policies and currencies."],
      ["It can't be consolidated: different fiscal years", false, "The closing periods are aligned before consolidation."],
      ["It can't be consolidated: different accounting principles", false, "Accounting policies are aligned before consolidation."],
      ["It can't be consolidated: different currencies", false, "The statements are translated into the parent's currency."]]],
    ["cons", 2, "Under IFRS, which statement about consolidation is correct?", [
      ["The excess of the acquisition cost over the fair value of the identifiable net assets is goodwill, tested for impairment every year", true, "IFRS 3: goodwill isn't amortised, it's tested for impairment."],
      ["Intra-group revenues and costs are eliminated only if the parent is the seller", false, "All intra-group transactions are eliminated, whoever sells."],
      ["Non-controlling interests go in current liabilities", false, "NCI are part of equity."],
      ["None of the other answers", false, "The first answer is correct."]]],
    ["cons", 2, "P owns 80% of S. P sold services to S for €500k; €300k is unpaid at year end; S also paid dividends. What is eliminated?", [
      ["All of it: intra-group revenues and costs, receivables and payables, and intra-group dividends", true, "From the group's point of view these are transactions between divisions of the same company."],
      ["Only the €500k of revenues and costs", false, "Receivables and payables are eliminated too."],
      ["Only the €300k still unpaid", false, "Settled or not, an intra-group transaction is eliminated."],
      ["80% of everything, the parent's share", false, "Intra-group items are eliminated in full, whatever the ownership."]]],
    ["cons", 2, "Which of these would be a subsidiary of Pineapple under IFRS 10?", [
      ["Lemon: 100% of the voting rights and the whole board", true, "Power, variable returns and the ability to use the power: all three."],
      ["Apple: 18% of the votes and one board member", false, "No majority and no control."],
      ["Pear: 55% of the votes but nobody on the board", false, "The exam's solution: without board representation it can't use its power."],
      ["Melon: 30% of the shares and two of five board members", false, "Not enough to show control: at most significant influence."]]],
    ["cons", 2, "If the price paid is lower than the fair value of the net assets acquired (negative goodwill)…", [
      ["First review the fair value estimates; any negative difference left is a gain in the income statement", true, "A bargain purchase: after the review, the gain goes to profit or loss."],
      ["It's recorded as a negative asset", false, "There's no negative goodwill asset."],
      ["It goes straight to the revaluation reserve", false, "It goes to the income statement, after the review."],
      ["It's amortised over five years", false, "Nothing is amortised here."]]],
    ["cons", 3, "Fair value of the subsidiary's PPE is above its book value. In consolidation you…", [
      ["Combine the PPE at fair value and recognise a deferred tax liability on the difference", true, "A temporary difference: more tax in the future, so a deferred tax liability (difference × tax rate)."],
      ["Combine at book value and ignore the difference", false, "Items are combined at fair value at the acquisition date."],
      ["Recognise a deferred tax asset", false, "A higher asset value means more future tax: a liability. A liability measured higher gives a deferred tax asset."],
      ["Put the difference straight into goodwill", false, "The surplus is recognised on the asset itself, net of tax; goodwill is what remains."]]],
    ["cons", 3, "Non-controlling interests measured at fair value, rather than at their proportionate share of net assets, give…", [
      ["Full goodwill, the goodwill of the whole subsidiary", true, "NCI at fair value → full goodwill; NCI at the proportionate share → only the parent's goodwill."],
      ["No goodwill at all", false, "Goodwill still arises if the price is above fair value."],
      ["The same goodwill in both cases", false, "Full goodwill is larger: it includes the NCI's part."],
      ["Goodwill inside the NCI, not in assets", false, "Goodwill is always an asset."]]],
    ["cons", 3, "In the offset step of full consolidation…", [
      ["The parent's investment is eliminated against the subsidiary's equity; NCI and goodwill are recognised", true, "Investment out, subsidiary equity out; NCI (if under 100%) and goodwill (if the price is higher) come in."],
      ["Only the subsidiary's equity is eliminated", false, "The investment in the parent's assets is eliminated too."],
      ["Goodwill arises only if ownership is below 100%", false, "Goodwill doesn't depend on the percentage owned."],
      ["The parent's equity is offset against the subsidiary's equity", false, "It's the investment that is offset, not the parent's equity."]]],
    ["fa", 1, "Which sentence on accounting principles is CORRECT?", [
      ["Under the fair value model, a change in an asset's value can go to the income statement or to equity", true, "E.g. investment property to P&L; a PPE revaluation surplus to equity."],
      ["Under the accrual logic, transactions are recorded when cash is received or paid", false, "That's cash accounting; accrual records the economic event."],
      ["The impairment test is not used with the cost model", false, "Assets carried at cost are tested for impairment (IAS 36)."],
      ["Under the fair value model, depreciation is never calculated", false, "Revalued PPE is still depreciated."]]],
    ["fa", 1, "Which is NOT a consequence of the matching principle?", [
      ["Interest on bank loans must be paid at the end of every year", true, "When interest is paid is about cash, not matching."],
      ["Equipment must be depreciated", false, "Depreciation matches its cost to the years it helps earn revenue."],
      ["Buying raw materials for the warehouse doesn't affect EBIT", false, "They become a cost when used: matching."],
      ["Period costs go in the income statement of the year they're incurred", false, "That is matching."]]],
    ["fa", 1, "Which IS a consequence of the matching principle?", [
      ["Buying raw materials for the warehouse doesn't affect EBIT", true, "The cost is matched to the revenue when the materials are used."],
      ["Equipment is recorded among the assets", false, "That's about recognition, not matching."],
      ["Interest on loans is paid every year", false, "That's about cash."],
      ["Indefinite-life intangibles are tested for impairment yearly", false, "That's measurement (IAS 36)."]]],
    ["fa", 1, "The impairment test compares the carrying amount with the recoverable amount, which is…", [
      ["The higher of fair value and value in use", true, "If the recoverable amount is lower, the asset is written down and the loss is an expense."],
      ["The lower of fair value and value in use", false, "It's the higher of the two."],
      ["Always the fair value", false, "Value in use counts too."],
      ["The historical cost", false, "Cost is where the carrying amount starts, not the recoverable amount."]]],
    ["fa", 1, "Under IAS 38, which of these is NOT capitalised as an intangible asset?", [
      ["Advertising costs", true, "Start-up, training and advertising costs go to the income statement."],
      ["A purchased patent", false, "Identifiable, controlled, with future benefits: an intangible."],
      ["Software licences bought", false, "An identifiable intangible."],
      ["Goodwill from an acquisition", false, "Goodwill is an intangible with indefinite life."]]],
    ["fa", 2, "A provision (IAS 37) is recognised when…", [
      ["There's a present obligation from a past event, payment is probable and the amount can be estimated reliably", true, "All three conditions."],
      ["Management expects a bad year", false, "No obligation, no provision."],
      ["Cash has already been paid", false, "Then it's settled, not a provision."],
      ["The amount is certain", false, "A provision is uncertain in timing or amount."]]],
    ["fa", 2, "A PPE revaluation (IAS 16) increases the asset's value. The increase goes…", [
      ["To equity, as a revaluation surplus (unless it reverses an earlier loss)", true, "Increases go to the revaluation surplus; decreases beyond it are expenses."],
      ["To revenue", false, "It isn't earned revenue."],
      ["To goodwill", false, "Goodwill only comes from business combinations."],
      ["Nowhere: PPE can't be revalued", false, "The revaluation model is the allowed treatment."]]],
    ["fa", 2, "Investment property under the fair value model (IAS 40)…", [
      ["Changes in fair value go to profit or loss, and it isn't depreciated", true, "The benchmark treatment for investment property."],
      ["Is depreciated and changes go to equity", false, "That mixes the cost and revaluation models."],
      ["Is always carried at cost", false, "Fair value is encouraged."],
      ["Changes go to the revaluation surplus", false, "For investment property they go to P&L."]]],
    ["fa", 3, "According to the financial leverage formula ROE = [ROI + D/E × (ROI − r)] × s…", [
      ["A higher D/E amplifies the swings of ROE for a given change in ROI", true, "The slope of ROE on ROI is (1 + D/E) × s, whatever the sign of ROI − r."],
      ["Raising D/E always raises ROE", false, "Only if ROI > r; otherwise it lowers ROE."],
      ["If D/E = 0, ROE always equals ROI", false, "ROE = ROI × s, and s is usually below 1."],
      ["The amplification exists only if ROI is above r", false, "The amplification exists either way; its direction depends on ROI − r."]]],
    ["fa", 3, "In the indirect cash flow statement, how do you get from EBIT to cash flow from operating activities?", [
      ["EBIT + D&A − increase in NWC − taxes paid − interest paid", true, "Add back non-cash costs, subtract what the operating cycle absorbed and the cash paid for taxes and interest."],
      ["EBIT − D&A + increase in NWC", false, "Signs reversed: D&A is added back, an NWC increase absorbs cash."],
      ["Net profit + dividends paid", false, "Dividends are a financing flow."],
      ["Revenues − all costs", false, "That's profit, not cash."]]]
  ];
  function mcq(track, level) {
    return (r) => {
      const pool = MCQ.filter(q => q[0] === track && q[1] <= level);
      const fresh = pool.filter(q => q[1] === level);
      const q = r.pick(fresh.length && r.chance(0.6) ? fresh : pool);
      return { type: "mcq", question: q[2], options: r.shuffle(q[3].map(([label, correct, why]) => ({ label, correct, why }))), brief: "Past-exam style: exactly one answer is right. Work by exclusion." };
    };
  }

  // ---------- Consolidation: equity method (Pumpkin/Zombie format) ----------
  function equityMethod(years) {
    return r => {
      const p = r.pick([20, 25, 30, 35, 40]);
      const cost = step(r, 200000, 900000, 10000);
      const flows = Array.from({ length: years }, (_, i) => {
        const ni = (years > 1 && i === 1 && r.chance(0.25) ? -1 : 1) * step(r, 50000, 400000, 10000);
        const div = ni > 0 ? step(r, 0, Math.min(ni, 200000), 10000) : 0;
        return { ni, div };
      });
      let bv = cost;
      const rows = flows.map((f, i) => { bv = bv + p / 100 * f.ni - p / 100 * f.div; return { year: Y + i + 1, bv: r2(bv), share: r2(p / 100 * f.ni), cash: r2(p / 100 * f.div) }; });
      const last = rows[rows.length - 1];
      const lines = [["Stake bought", `${p}% at the end of ${Y}`], ["Price paid", `€${fmt(cost)}`]].concat(flows.map((f, i) => [`${Y + i + 1}`, `net income €${fmt(f.ni)} · dividends €${fmt(f.div)}`]));
      const fields = [];
      if (years > 1) fields.push({ key: "bv1", label: `Investment in associate, end ${Y + 1} (€)`, answer: rows[0].bv, neg: true, why: `${fmt(cost)} + ${p}% × ${fmt(flows[0].ni)} − ${p}% × ${fmt(flows[0].div)} = ${fmt(rows[0].bv)}.` });
      fields.push(
        { key: "bv", label: `Investment in associate, end ${last.year} (€)`, answer: last.bv, neg: true, why: `Book value(t) = book value(t−1) + share of profit − share of dividends = ${fmt(last.bv)}.` },
        { key: "is", label: `Share of profit in the ${last.year} income statement (€)`, answer: last.share, neg: true, why: `${p}% × ${fmt(flows[flows.length - 1].ni)} = ${fmt(last.share)}: only the investor's share.` },
        { key: "cf", label: `Cash inflow from dividends in ${last.year} (€)`, answer: last.cash, why: `${p}% × ${fmt(flows[flows.length - 1].div)} = ${fmt(last.cash)}.` }
      );
      return {
        type: "fill", doc: { kind: "Equity investment", title: "Lario Energia buys into an associate", lines },
        brief: `Lario Energia holds ${p}% of Brina Srl: significant influence, IAS 28, equity method. Prepare its figures.`,
        fields,
        choice: years === 1 ? { label: `With ${p}%, Brina Srl is…`, options: ["An associate (equity method)", "A subsidiary (full consolidation)", "Not recognised at all"], answer: "An associate (equity method)", why: "20% or more without control: significant influence, IAS 28." } : null
      };
    };
  }

  // ---------- Consolidation: full consolidation (Comfy/Sunny format) ----------
  function fullConsolidation(withFV) {
    return r => {
      for (let tries = 0; tries < 100; tries++) {
        const pOwn = r.pick([60, 70, 75, 80, 90]) / 100;
        const sEquity = step(r, 60000, 150000, 1000);
        const sLiab = step(r, 20000, 60000, 1000);
        const N = r.pick([20000, 40000, 50000, 60000, 80000]);
        const price = Math.round(sEquity * (1 + r.int(8, 30) / 100) / N * 100) / 100;
        const inv = r2(pOwn * N * price);
        const a = withFV ? step(r, 200, 3000, 100) : 0;       // fair value uplift on PPE
        const b = withFV ? step(r, 0, 1500, 100) : 0;         // fair value uplift on a liability
        const t = withFV ? r.pick([0.25, 0.3, 0.4, 0.5]) : 0;
        const x = withFV ? step(r, 200, 2000, 100) : 0;       // intra-group receivable/payable
        const proportional = withFV && r.chance(0.35);
        const dtl = r2(a * t), dta = r2(b * t);
        const surplus = r2(a - b - dtl + dta);
        const nci = proportional ? r2((1 - pOwn) * (sEquity + surplus)) : r2((1 - pOwn) * N * price);
        const gw = proportional ? r2(inv - pOwn * (sEquity + surplus)) : r2(inv + nci - sEquity - surplus);
        if (gw <= 0) continue;
        const pOther = step(r, 20000, 80000, 1000), pPpe = step(r, 10000, 60000, 1000);
        const pTA = r2(inv + pOther + pPpe), pLiab = step(r, 10000, 70000, 1000), pEquity = r2(pTA - pLiab);
        if (pEquity <= 0) continue;
        const sPpe = step(r, 30000, sEquity + sLiab - 5000, 1000), sOther = sEquity + sLiab - sPpe;
        const sTA = sEquity + sLiab;
        const consTA = r2(pTA - inv + sTA + a + dta + gw - x);
        const consEL = r2(pEquity + nci + pLiab + sLiab + b + dtl - x);
        if (Math.abs(consTA - consEL) > 0.01) throw new Error("full consolidation does not balance");
        const lines = [
          ["", "Parent", "Sub"],
          ["PPE", fmt(pPpe), fmt(sPpe)],
          ["Investment in Sub", fmt(inv), "—"],
          ["Other assets", fmt(pOther), fmt(sOther)],
          ["Total assets", fmt(pTA), fmt(sTA)],
          ["Equity", fmt(pEquity), fmt(sEquity)],
          ["Liabilities", fmt(pLiab), fmt(sLiab)]
        ];
        const facts = [
          `The parent bought ${pOwn * 100}% of Sub: ${fmt(N)} shares, market price €${price} a share.`,
          proportional ? "NCI measured at their proportionate share of the net assets (partial goodwill)." : "NCI measured at fair value (full goodwill).",
        ];
        if (withFV) facts.push(`Fair value of Sub's PPE: +${fmt(a)} above book value.`, b ? `Fair value of Sub's non-current liabilities: +${fmt(b)} above book value.` : "No fair value difference on liabilities.", `Tax rate ${t * 100}%.`, `Intra-group receivable/payable: ${fmt(x)}.`);
        const fields = [];
        if (withFV) fields.push(
          { key: "dtl", label: "Deferred tax liability (€)", answer: dtl, why: `PPE uplift × tax rate = ${fmt(a)} × ${t * 100}% = ${fmt(dtl)}: more tax in the future.` },
          { key: "dta", label: "Deferred tax asset (€)", answer: dta, why: `Liability uplift × tax rate = ${fmt(b)} × ${t * 100}% = ${fmt(dta)}.` });
        fields.push(
          { key: "nci", label: "Non-controlling interests (€)", answer: nci, why: proportional ? `${r2((1 - pOwn) * 100)}% × (Sub equity ${fmt(sEquity)} + net surplus ${fmt(surplus)}) = ${fmt(nci)}.` : `${r2((1 - pOwn) * 100)}% × ${fmt(N)} shares × €${price} = ${fmt(nci)}.` },
          { key: "gw", label: "Goodwill (€)", answer: gw, why: proportional ? `Price paid ${fmt(inv)} − ${pOwn * 100}% × (${fmt(sEquity)} + ${fmt(surplus)}) = ${fmt(gw)} (partial goodwill).` : `Price paid ${fmt(inv)} + NCI ${fmt(nci)} − Sub equity ${fmt(sEquity)}${withFV ? ` ${surplus >= 0 ? "−" : "+"} net surplus ${fmt(Math.abs(surplus))} (${fmt(a)} − ${fmt(b)} − ${fmt(dtl)} + ${fmt(dta)} = ${fmt(surplus)})` : ""} = ${fmt(gw)} (full goodwill).` },
          { key: "ta", label: "Consolidated total assets (€)", answer: consTA, why: `Parent ${fmt(pTA)} − investment ${fmt(inv)} + Sub ${fmt(sTA)}${withFV ? ` + PPE uplift ${fmt(a)} + DTA ${fmt(dta)}` : ""} + goodwill ${fmt(gw)}${withFV ? ` − intra-group ${fmt(x)}` : ""} = ${fmt(consTA)}. Check: equity ${fmt(pEquity)} + NCI ${fmt(nci)} + liabilities = ${fmt(consEL)}.` });
        return {
          type: "fill", doc: { kind: "Balance sheets at the acquisition date (€)", title: "Lario Energia acquires Sub", lines, facts },
          brief: "Full consolidation (IFRS 10): combine at fair value, offset the investment against Sub's equity, recognise NCI and goodwill, eliminate intra-group balances.",
          fields
        };
      }
      throw new Error("fullConsolidation: no valid case");
    };
  }

  // ---------- Financial analysis: exam reconstructions ----------
  // EBIT and revenues from the indirect cash flow statement (exam Exercise 1 format).
  function ebitFromCfo(r) {
    const cfo = step(r, 10000, 20000, 100), da = step(r, 3000, 6000, 100), dnwc = step(r, -2000, 8000, 100);
    const tax = step(r, 1000, 3000, 100), intr = step(r, 200, 800, 50), div = step(r, 300, 1500, 100);
    const cos = step(r, 20000, 30000, 500), other = step(r, 1000, 4000, 100), ga = step(r, 3000, 6000, 100);
    const ebit = cfo - da + dnwc + tax + intr, rev = ebit + cos + other + ga;
    return {
      type: "fill", doc: { kind: "Extract of the 2025 statements (k€)", title: "Company A · sweets", lines: [
        ["Cash flow from operating activities", fmt(cfo)], ["D&A", fmt(da)], ["Delta NWC (final − initial)", fmt(dnwc)], ["Income taxes paid", fmt(tax)],
        ["Interest paid", fmt(intr)], ["Dividends paid", fmt(div)], ["Cost of sales", fmt(cos)], ["Other operating expenses", fmt(other)], ["G&A expenses", fmt(ga)]] },
      brief: "No deferred taxes. Work back from the cash flow statement (indirect method).",
      fields: [
        { key: "ebit", label: "EBIT (k€)", answer: ebit, why: `CFO ${fmt(cfo)} − D&A ${fmt(da)} + ΔNWC ${fmt(dnwc)} + taxes paid ${fmt(tax)} + interest paid ${fmt(intr)} = ${fmt(ebit)}. Dividends are a financing flow: ignore them.` },
        { key: "rev", label: "Revenues (k€)", answer: rev, why: `EBIT + cost of sales + other operating + G&A = ${fmt(ebit)} + ${fmt(cos)} + ${fmt(other)} + ${fmt(ga)} = ${fmt(rev)}.` }]
    };
  }
  // Income statement by nature (exam Exercise 2 format).
  function byNature(r) {
    for (let tries = 0; tries < 50; tries++) {
      const q = step(r, 200000, 900000, 50000), price = r.pick([80, 120, 150, 250, 300]), rev = q * price;
      const rmI = step(r, 300000, 900000, 50000), rmF = step(r, 300000, 1500000, 50000);
      const used = Math.round(rev * r.int(40, 50) / 100 / 50000) * 50000, purch = used + (rmF - rmI);
      const dfg = step(r, -1000000, 1000000, 100000), other = step(r, 0, 2000000, 100000);
      const staff = Math.round(rev * r.int(10, 14) / 100 / 100000) * 100000, da = Math.round(rev * r.int(8, 12) / 100 / 100000) * 100000;
      const opex = Math.round(rev * r.int(5, 8) / 100 / 100000) * 100000;
      const ebit = rev + other + dfg - used - staff - da - opex;
      const nfe = step(r, 1000000, Math.max(1000000, Math.round(ebit * 0.4)), 100000);
      if (ebit < 5000000 || ebit - nfe <= 0) continue;
      const finInc = step(r, 500000, 3000000, 100000);
      const m = x => fmt(x);
      return {
        type: "fill", doc: { kind: "Company B · 2025 data (€)", title: "Office desks", lines: [
          ["Units sold", fmt(q)], ["Price per unit", `€${price}`], ["Purchases of raw materials", m(purch)], ["Raw materials inventory (initial)", m(rmI)],
          ["Raw materials inventory (final)", m(rmF)], ["Changes in inventories of finished goods and WIP (f−i)", m(dfg)], ["Other operating income", m(other)],
          ["Cost of personnel", m(staff)], ["D&A", m(da)], ["Other operating expenses", m(opex)], ["Trade receivables (final)", m(step(r, 10e6, 30e6, 1e6))],
          ["Trade payables (final)", m(step(r, 20e6, 60e6, 1e6))], ["Financial expenses", m(nfe + finInc)], ["Earnings before taxes (EBT)", m(ebit - nfe)]] },
        brief: "Compute the operating profit and the net financial expenses. Some data are there to distract you.",
        fields: [
          { key: "ebit", label: "EBIT (€)", answer: ebit, why: `Revenues ${m(rev)} + other income ${m(other)} + ΔFG ${m(dfg)} − raw materials used ${m(used)} (purchases − (final − initial)) − personnel ${m(staff)} − D&A ${m(da)} − other ${m(opex)} = ${m(ebit)}.` },
          { key: "nfe", label: "Net financial expenses (€)", answer: nfe, why: `EBIT − EBT = ${m(ebit)} − ${m(ebit - nfe)} = ${m(nfe)}. Receivables and payables don't enter the income statement.` }]
      };
    }
    throw new Error("byNature");
  }
  // Income statement by function, with an accrued cost (exam Exercise 9 format).
  function byFunction(r) {
    const rev = step(r, 20000, 40000, 500), other = step(r, 500, 2000, 100), cos = Math.round(rev * r.int(45, 55) / 100 / 100) * 100;
    const rd = step(r, 1000, 3000, 100), mk = step(r, 1000, 3000, 100), dist = step(r, 300, 1200, 50);
    const gp = rev - cos, ebit = gp - rd - mk - dist + other;
    return {
      type: "fill", doc: { kind: "Income statement by function (k€)", title: `Company A · ${Y}`, lines: [
        ["Revenues", fmt(rev)], ["Other operating income", fmt(other)], ["Financial income", fmt(step(r, 20, 90, 10))], ["Financial interests", fmt(step(r, 50, 200, 10))],
        ["Cost of sales", fmt(cos)], ["R&D expenses", fmt(rd)], ["Marketing expenses", fmt(mk)]] },
      brief: `Not yet in the figures: a 2-year distribution contract signed in January ${Y}. Its cost for ${Y} is ${fmt(dist)} k€, to be paid in June ${Y + 1}.`,
      fields: [
        { key: "gp", label: "Gross profit (k€)", answer: gp, why: `Revenues − cost of sales = ${fmt(rev)} − ${fmt(cos)} = ${fmt(gp)}.` },
        { key: "ebit", label: "EBIT (k€)", answer: ebit, why: `Gross profit − R&D − marketing − distribution ${fmt(dist)} + other operating income = ${fmt(ebit)}.` }],
      choice: { label: `The distribution cost paid in June ${Y + 1} is…`, options: [`An expense of ${Y} (accrual)`, `An expense of ${Y + 1}, when paid`, "Not an expense, only a liability"], answer: `An expense of ${Y} (accrual)`, why: "The service was received this year: accrual logic. Until paid, it's also a payable." }
    };
  }
  // ROE from assets, turnover, margins and taxes (exam Exercises 8 and 10).
  function roeFromAtr(level) {
    return r => {
      for (let tries = 0; tries < 50; tries++) {
        const ta = step(r, 100, 300, 10), tl = step(r, 40, Math.round(ta * 0.7), 10), atr = r.pick([1, 1.25, 1.5, 2]), t = r.pick([0.24, 0.3, 0.35, 0.4]);
        const ros = r.pick([0.08, 0.1, 0.12, 0.15]), fi = r.int(1, 4), fe = r.int(4, 10);
        const eq = ta - tl, rev = ta * atr, ebit = rev * ros, ebt = ebit + fi - fe, np = ebt * (1 - t), roe = pct2(np / eq);
        if (ebt <= 0) continue;
        const fields = [];
        if (level < 3) fields.push(
          { key: "rev", label: "Revenues (mln €)", answer: r2(rev), dec: true, tol: 0.05, why: `Total assets × ATR = ${ta} × ${atr} = ${fmt(rev)}.` },
          { key: "np", label: "Net profit (mln €)", answer: r2(np), dec: true, tol: 0.05, why: `EBIT ${fmt(ebit)} + ${fi} − ${fe} = EBT ${fmt(ebt)}; × (1 − ${t * 100}%) = ${fmt(np)}.` });
        fields.push({ key: "roe", label: "ROE (%)", answer: roe, dec: true, tol: 0.05, why: `Equity = ${ta} − ${tl} = ${eq}. Revenues ${fmt(rev)}, EBIT ${fmt(ebit)} (ROS ${ros * 100}%), EBT ${fmt(ebt)}, net profit ${fmt(np)}. ROE = ${fmt(np)} ÷ ${eq} = ${roe}%.` });
        return {
          type: "fill", doc: { kind: "What you could gather (mln €)", title: "Alpha · renewables", lines: [
            ["Total assets", ta], ["Total liabilities", tl], ["Asset turnover ratio", atr], ["Tax rate", `${t * 100}%`], ["ROS (EBIT margin)", `${ros * 100}%`], ["Financial income", fi], ["Financial expenses", fe]].map(([k, v]) => [k, String(v)]) },
          brief: "No access to the statements: rebuild ROE from the ratios.", fields
        };
      }
      throw new Error("roeFromAtr");
    };
  }
  // ROE with the financial leverage formula.
  function leverage(r) {
    const e = step(r, 200, 800, 50), d = step(r, 200, 1600, 50), ebit = step(r, 60, 240, 10), fc = step(r, 10, Math.round(d * 0.08), 5), s = r.pick([0.6, 0.65, 0.7, 0.75, 0.8]);
    const roi = ebit / (d + e), rr = fc / d, roe = (roi + d / e * (roi - rr)) * s;
    return {
      type: "fill", doc: { kind: "Company data (k€)", title: "Gamma · leverage check", lines: [["EBIT", fmt(ebit)], ["Financial debt (D)", fmt(d)], ["Equity (E)", fmt(e)], ["Financial costs", fmt(fc)], ["s (net profit ÷ EBT, tax effect)", String(s)]] },
      brief: "Use the financial leverage formula: ROE = [ROI + D/E × (ROI − r)] × s, with r = financial costs ÷ D.",
      fields: [
        { key: "roi", label: "ROI (%)", answer: pct2(roi), dec: true, tol: 0.05, why: `EBIT ÷ (D + E) = ${ebit} ÷ ${d + e} = ${pct2(roi)}%.` },
        { key: "roe", label: "ROE (%)", answer: pct2(roe), dec: true, neg: true, tol: 0.05, why: `r = ${fc} ÷ ${d} = ${pct2(rr)}%. ROE = [${pct2(roi)}% + ${r2(d / e)} × (${pct2(roi)}% − ${pct2(rr)}%)] × ${s} = ${pct2(roe)}%.` }],
      choice: { label: "Here, taking on more debt would…", options: ["Raise ROE", "Lower ROE"], answer: roi > rr ? "Raise ROE" : "Lower ROE", why: roi > rr ? "ROI is above the cost of debt r: leverage helps." : "ROI is below the cost of debt r: leverage hurts." }
    };
  }
  // Impairment test at year end (exam June 2021 pattern).
  function impairment(r) {
    const bv0 = step(r, 2000, 8000, 100), n = r.pick([4, 5, 8, 10]), dep = r2(bv0 / n), bv1 = r2(bv0 - dep);
    const fv = r2(bv1 * r.int(20, 90) / 100), viu = r2(bv1 * r.int(40, 130) / 100), rec = Math.max(fv, viu), loss = r2(Math.max(0, bv1 - rec));
    return {
      type: "fill", doc: { kind: "Production line (k€)", title: "Impairment test at 31 December", lines: [["Book value on 1 January", fmt(bv0)], ["Residual useful life", `${n} years, straight line`], ["Fair value at year end", fmt(fv)], ["Value in use at year end", fmt(viu)]] },
      brief: "Depreciate for the year, then run the impairment test (IAS 36).",
      fields: [
        { key: "dep", label: "Depreciation of the year (k€)", answer: dep, why: `${fmt(bv0)} ÷ ${n} = ${fmt(dep)}. Book value at year end: ${fmt(bv1)}.` },
        { key: "rec", label: "Recoverable amount (k€)", answer: rec, why: `The higher of fair value ${fmt(fv)} and value in use ${fmt(viu)} = ${fmt(rec)}.` },
        { key: "loss", label: "Impairment loss (k€, 0 if none)", answer: loss, why: loss ? `${fmt(bv1)} − ${fmt(rec)} = ${fmt(loss)}: an expense in the income statement.` : "The recoverable amount is above the book value: no impairment." }]
    };
  }
  // Net profit and tax rate from the equity section (exam Exercise 15).
  function profitFromEquity(r) {
    const shares = step(r, 50000, 150000, 1000), reserves = step(r, 300000, 900000, 10000), np = step(r, 100000, 400000, 10000);
    const equity = shares + reserves + np, tax = step(r, 20000, Math.round(np * 0.4), 5000), ebt = np + tax;
    const rev = step(r, 1000000, 4000000, 50000), cogs = Math.round(rev * r.int(55, 70) / 100 / 10000) * 10000;
    return {
      type: "fill", doc: { kind: "Foody Ltd · 31 December (k€)", title: "From the equity section", lines: [["Number of shares", `${fmt(shares)} k`], ["Nominal value", "€1 a share"], ["Market price", "€2 a share"], ["Reserves", fmt(reserves)], ["Total equity", fmt(equity)], ["Income taxes", fmt(tax)], ["Revenues", fmt(rev)], ["COGS", fmt(cogs)]] },
      brief: "Last year's profit was fully distributed: this year's profit is still in equity.",
      fields: [
        { key: "np", label: "Net profit (k€)", answer: np, why: `Equity − reserves − share capital (${fmt(shares)} k shares × €1) = ${fmt(equity)} − ${fmt(reserves)} − ${fmt(shares)} = ${fmt(np)}.` },
        { key: "rate", label: "Tax rate (%)", answer: pct2(tax / ebt), dec: true, tol: 0.1, why: `EBT = ${fmt(np)} + ${fmt(tax)} = ${fmt(ebt)}; ${fmt(tax)} ÷ ${fmt(ebt)} = ${pct2(tax / ebt)}%.` },
        { key: "gp", label: "Gross profit (k€)", answer: rev - cogs, why: `Revenues − COGS = ${fmt(rev)} − ${fmt(cogs)} = ${fmt(rev - cogs)}. The market price doesn't enter the equity section.` }]
    };
  }

  // ---------- What each level of each desk hands you ----------
  const wrap = f => (tier, clients, r) => f(r);
  const PLAN = {
    cons: {
      1: [mcq("cons", 1), mcq("cons", 1), equityMethod(1), equityMethod(1)],
      2: [mcq("cons", 2), mcq("cons", 2), equityMethod(2), fullConsolidation(false), fullConsolidation(false)],
      3: [mcq("cons", 3), mcq("cons", 3), equityMethod(2), fullConsolidation(true), fullConsolidation(true)]
    },
    fa: {
      1: [mcq("fa", 1), mcq("fa", 1), r => A.reclassBS(3, [], r), r => A.reclassIS(3, [], r), r => A.ratio(3, [], r), r => A.sources(3, [], r)],
      2: [mcq("fa", 2), mcq("fa", 2), ebitFromCfo, byNature, byFunction, roeFromAtr(2), impairment, r => A.reclassBS(3, [], r)],
      3: [mcq("fa", 3), mcq("fa", 3), ebitFromCfo, byNature, roeFromAtr(3), leverage, impairment, profitFromEquity]
    }
  };
  function studyJob(career, track, r) {
    const level = studyOf(career, track).level;
    const job = r.pick(PLAN[track][level])(r);
    return Object.assign(job, { id: "s" + Date.now().toString(36) + Math.floor(r.next() * 1e6).toString(36), track, level, client: "lario", pickup: "inbox", work: "desk", tier: O.tierOf(career) });
  }

  // ---------- Progress on the desks ----------
  function studyOf(career, track) {
    career.study = career.study || {};
    return career.study[track] || (career.study[track] = { level: 1, hist: [], right: 0, done: 0 });
  }
  // Records a result; returns the new level when the desk levels up.
  function recordStudy(career, job, ok) {
    if (!job.track) return null;
    const st = studyOf(career, job.track);
    st.done++; if (ok) st.right++;
    if (job.level !== st.level) return null;
    st.hist.push(ok ? 1 : 0);
    if (st.hist.length > ADVANCE.window) st.hist.shift();
    if (st.level < 3 && st.hist.length >= ADVANCE.window && st.hist.reduce((a, b) => a + b, 0) >= ADVANCE.need) {
      st.level++; st.hist = [];
      return st.level;
    }
    return null;
  }

  // ---------- The day plan: firm memo + the chosen activity ----------
  const basePlan = O.planDay;
  O.planDay = function (career, r) {
    const act = career.activity;
    if (act !== "cons" && act !== "fa") return basePlan(career, r);
    const jobs = [];
    const ev = O.firmEvent(career);
    if (ev) jobs.push(ev);
    for (let i = 0; i < D.JOBS_PER_DAY; i++) jobs.push(studyJob(career, act, r));
    return { jobs };
  };
  const baseNormalize = O.normalizeCareer;
  O.normalizeCareer = function (s) {
    const out = baseNormalize(s);
    const st = out.study && typeof out.study === "object" ? out.study : {};
    out.study = {};
    ["cons", "fa"].forEach(t => {
      const x = st[t] || {};
      out.study[t] = { level: [1, 2, 3].includes(x.level) ? x.level : 1, hist: Array.isArray(x.hist) ? x.hist.slice(-ADVANCE.window) : [], right: x.right | 0, done: x.done | 0 };
    });
    if (!["books", "cons", "fa"].includes(out.activity)) out.activity = "books";
    return out;
  };

  const api = { TRACKS, LEVEL_NAMES, ADVANCE, MCQ, PLAN, mcq, equityMethod, fullConsolidation, ebitFromCfo, byNature, byFunction, roeFromAtr, leverage, impairment, profitFromEquity, studyJob, studyOf, recordStudy };
  root.OfficeStudy = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
