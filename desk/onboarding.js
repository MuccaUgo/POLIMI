/* AFC Closing Desk — "First week at Navigli & Partners": the onboarding path before chapter 1.
   You join an accounting firm and keep the books of five very different clients.
   Pure content and question generators; no DOM access. */
(function (root) {
  "use strict";
  const C = root.DeskCore;
  const { eur } = C;
  const Y = 2026;
  const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const FIRM = "Navigli & Partners";
  const PEOPLE = {
    giulia: { name: "Giulia", role: "Partner", icon: "👩‍💼" },
    marco: { name: "Marco", role: "Senior Accountant", icon: "🧔" },
    client: { name: "A client", role: "", icon: "📞" },
    it: { name: "IT Helpdesk", role: "", icon: "🖥️" }
  };

  // ---------- The five clients ----------
  // Each sentence builder takes an amount and returns a sentence in the client's own business.
  const CLIENTS = [
    {
      id: "lario", name: "Lario Textiles", icon: "🧣", kind: "Manufacturer",
      what: "Makes scarves and sells them to shops on 60-day credit.",
      traits: ["Big inventory: wool, work in progress, finished scarves", "Machines and a factory: lots of non-current assets", "Customers pay late: large trade receivables"],
      revenueWhen: "when the scarves are delivered to the shop",
      creditSale: k => `delivers scarves worth ${eur(k)} to a shop`,
      cashSale: k => `sells scarves for ${eur(k)} at its factory outlet, paid on the spot`,
      deposit: k => `receives a ${eur(k)} deposit from a shop for scarves to be delivered in February ${Y + 1}`,
      service: k => `earns ${eur(k)} for dyeing another company's fabric, paid in cash`,
      material: "wool", equipment: "a knitting machine",
      prepaid: "factory insurance", accrued: k => `used ${eur(k)} of electricity to run the looms`,
      items: [
        [1, "Wool in the storeroom, not yet used", "Asset", "Raw materials are inventory: an asset until they go into production."],
        [2, "Knitting machines in the factory", "Asset", "Property, plant and equipment: used for years to make scarves."],
        [3, "Scarves half-way through production", "Asset", "Work in progress is inventory too: it will become finished scarves and be sold."]
      ]
    },
    {
      id: "forno", name: "Forno Rossi", icon: "🥐", kind: "Bakery (retail)",
      what: "Bakes bread and cakes and sells them at the counter, almost always for cash.",
      traits: ["Revenue and cash arrive together at the till", "Small, perishable inventory: flour, butter, today's bread", "Few receivables — only a couple of catering customers"],
      revenueWhen: "when the customer takes the bread at the counter",
      creditSale: k => `delivers ${eur(k)} of pastries for an office party, invoiced`,
      cashSale: k => `sells ${eur(k)} of bread at the counter, paid on the spot`,
      deposit: k => `receives a ${eur(k)} deposit for a wedding cake for a February ${Y + 1} wedding`,
      service: k => `earns ${eur(k)} for a baking class, paid in cash at the door`,
      material: "flour", equipment: "a new oven",
      prepaid: "oven maintenance contract", accrued: k => `used ${eur(k)} of gas for the ovens`,
      items: [
        [1, "Flour and butter in the storeroom", "Asset", "Ingredients are inventory: an asset until they are baked and sold."],
        [2, "The bakery's ovens", "Asset", "Equipment used for years: property, plant and equipment."],
        [3, "Yesterday's unsold bread, already thrown away", "Expense", "It has no future value left: whatever it cost is an expense, not an asset."]
      ]
    },
    {
      id: "pixel", name: "Pixel Loop", icon: "💻", kind: "Software (subscriptions)",
      what: "Sells access to its app by subscription; many customers pay a year in advance.",
      traits: ["Cash often arrives before the service: large deferred revenue", "Almost no inventory; its key assets are laptops and code", "Funded by investors: large equity, often losses in early years"],
      revenueWhen: "month by month, as customers use the service",
      creditSale: k => `provides ${eur(k)} of December service to business customers, invoiced monthly`,
      cashSale: k => `charges a ${eur(k)} one-off setup fee, paid by card when the setup is done`,
      deposit: k => `receives ${eur(k)} from a customer for a 12-month subscription starting on 1 January ${Y + 1}`,
      service: k => `earns ${eur(k)} for a one-off training session, paid by card`,
      material: "laptops", equipment: "a set of new laptops",
      prepaid: "cloud server plan", accrued: k => `used ${eur(k)} of cloud computing`,
      items: [
        [1, "Laptops used by the developers", "Asset", "Equipment used for several years: property, plant and equipment."],
        [2, "Money paid in by investors for new shares", "Equity", "Investors who buy shares become owners: their money is equity, not a loan."],
        [3, "Annual subscriptions paid upfront, service not yet provided", "Liability", "Deferred revenue: Pixel Loop still owes those months of service. It is a liability until they pass."]
      ]
    },
    {
      id: "hotel", name: "Hotel Lago", icon: "🏨", kind: "Hotel",
      what: "Rents rooms night by night; guests often pay a deposit when they book.",
      traits: ["Revenue is earned night by night as guests stay", "Booking deposits are liabilities until the stay", "A big building and a big mortgage: heavy assets and debt"],
      revenueWhen: "night by night, as guests stay",
      creditSale: k => `hosts a company's staff for ${eur(k)} of nights in December, invoiced to the company`,
      cashSale: k => `checks out a guest who pays ${eur(k)} for their stay`,
      deposit: k => `receives a ${eur(k)} deposit for a February ${Y + 1} stay`,
      service: k => `earns ${eur(k)} for hiring out its garden for a wedding party, paid in cash`,
      material: "bed linen", equipment: "new furniture for ten rooms",
      prepaid: "building insurance", accrued: k => `used ${eur(k)} of laundry services`,
      items: [
        [1, "The hotel building", "Asset", "Property: the building will host guests for decades."],
        [2, "A mortgage on the hotel building", "Liability", "A long-term loan secured on the building: owed to the bank."],
        [3, "Deposits paid by guests for stays next month", "Liability", "The hotel owes those guests a room (or the money back): a liability until they stay."]
      ]
    },
    {
      id: "verdi", name: "Verdi Consulting", icon: "📈", kind: "Consulting (services)",
      what: "Sells consultants' time; it bills clients at the end of each month.",
      traits: ["No inventory: it sells time", "Its biggest cost is salaries", "Work done but not yet billed or paid: large receivables"],
      revenueWhen: "as the consulting work is performed",
      creditSale: k => `completes ${eur(k)} of consulting work in December, billed at month-end`,
      cashSale: k => `runs a one-day workshop for ${eur(k)}, paid at the end of the day`,
      deposit: k => `receives a ${eur(k)} retainer for a project that starts in February ${Y + 1}`,
      service: k => `earns ${eur(k)} for a half-day advisory session, paid on the spot`,
      material: "office supplies", equipment: "office furniture",
      prepaid: "office rent", accrued: k => `used ${eur(k)} of work by freelance consultants`,
      items: [
        [1, "Salaries paid to the consultants this month", "Expense", "Their time was used up this month to serve clients: an expense."],
        [2, "Fees billed to clients and not yet paid", "Asset", "Trade receivables: Verdi has a right to collect that cash."],
        [3, "Hours worked for a client this month, not billed until next month", "Asset", "The work is done, so the revenue is earned; the right to bill it is an asset (unbilled receivable)."]
      ]
    }
  ];
  const clientById = id => CLIENTS.find(c => c.id === id);

  // Points needed to finish a day; a right answer earns one, a wrong one costs one.
  const TARGET = 8;
  const PROBATION_SIZE = 10, PROBATION_PASS = 8;
  const tierFor = points => points < 3 ? 1 : points < 6 ? 2 : 3;

  // Amount options: plausible wrong answers must differ from the right one and from each other.
  function options(r, correct, wrongs, fmt) {
    const seen = new Set([String(correct.value)]);
    const out = [{ label: fmt(correct.value), correct: true, consequence: "" }];
    wrongs.forEach(w => {
      if (w.value == null || !isFinite(w.value) || w.value < 0 || seen.has(String(w.value))) return;
      seen.add(String(w.value));
      out.push({ label: fmt(w.value), correct: false, consequence: w.consequence });
    });
    return r.shuffle(out);
  }
  const choices = (r, list, answer, consequences) => r.shuffle(list.map(label => ({
    label, correct: label === answer, consequence: label === answer ? "" : consequences(label)
  })));

  // ---------- Monday: the five boxes ----------

  const ELEMENTS = ["Asset", "Liability", "Equity", "Revenue", "Expense"];
  const GENERIC = [
    [1, "Cash in the company's bank account", "Asset", "Cash is the most obvious asset: the company controls it and can spend it tomorrow."],
    [1, "A bank loan to repay in three years", "Liability", "The company owes it to the bank: an obligation to pay out cash later."],
    [1, "Capital the owners paid into the company", "Equity", "Money put in by the owners is their claim on the company: equity."],
    [1, "Sales to customers this month", "Revenue", "What the company earns from its customers: revenue."],
    [1, "Electricity used this month", "Expense", "Consumed this month, gone for good: an expense."],
    [1, "Money owed to a supplier for goods already received", "Liability", "The goods are here, the payment is not: the company owes the supplier."],
    [2, "Profits kept in the company from past years", "Equity", "Retained earnings belong to the owners: they are part of equity."],
    [2, "Interest earned on the company's savings account", "Revenue", "Income earned by the company. Strictly it is finance income, but it increases profit just like revenue."],
    [2, "Income tax due to the government next month", "Liability", "Owed to the tax authority: a liability until it is paid."],
    [2, "Depreciation of equipment for the year", "Expense", "The part of the equipment used up this year is an expense, even though no cash leaves."],
    [3, "Insurance paid now for next year's cover", "Asset", "A prepaid expense: the cover has not been used yet, so it is still an asset."],
    [3, "Wages staff earned in December, to be paid in January", "Liability", "At 31 December the company owes that money to the staff: an accrued liability."],
    [3, "Dividends paid to the owners", "Equity", "Dividends are a distribution to the owners: they reduce equity directly and are never an expense."],
    [3, "A lawsuit the company expects to lose, with a reliable estimate", "Liability", "A probable outflow that can be estimated is a provision: a liability."]
  ];
  const ELEMENT_TRAPS = {
    "Asset>Liability": "That would say the company owes it, when in fact it owns it.",
    "Asset>Equity": "Equity is the owners' claim on the assets, not something the company holds.",
    "Asset>Revenue": "Owning something isn't earning it: revenue comes from customers.",
    "Asset>Expense": "Booked as an expense, profit shrinks and the balance sheet forgets something that still has value.",
    "Liability>Asset": "That turns a debt into a possession. The balance sheet would look far too rich.",
    "Liability>Equity": "Equity belongs to the owners; this is owed to someone outside.",
    "Liability>Revenue": "Owing something is not earning it. Profit would be overstated.",
    "Liability>Expense": "The item is something still owed at the date — an obligation, so a liability.",
    "Equity>Asset": "Equity is a claim on the assets, not an asset itself.",
    "Equity>Liability": "The owners' stake has no due date and no creditor: it is equity, the residual.",
    "Equity>Revenue": "Dealings with the owners never go through profit: they go straight to equity.",
    "Equity>Expense": "Dealings with the owners never go through profit. Dividends are not an expense.",
    "Revenue>Asset": "The cash or receivable is the asset; the earning itself is revenue.",
    "Revenue>Liability": "Nobody is owed anything here: the company earned it.",
    "Revenue>Equity": "Revenue reaches equity only through profit, at year-end.",
    "Revenue>Expense": "Wrong side of profit entirely: that's a swing of twice the amount.",
    "Expense>Asset": "It is used up, with no future benefit left. The balance sheet would carry a ghost.",
    "Expense>Liability": "The cost of the period is an expense; only an unpaid amount would sit in liabilities.",
    "Expense>Equity": "Costs of running the business reduce profit: they are expenses.",
    "Expense>Revenue": "Wrong side of profit entirely: that's a swing of twice the amount."
  };

  function monday(tier, r) {
    const inTier = t => t <= tier && (tier === 1 || t >= tier - 1);
    const pool = GENERIC.filter(i => inTier(i[0])).map(i => [null].concat(i.slice(1)));
    CLIENTS.forEach(c => c.items.filter(i => inTier(i[0])).forEach(i => pool.push([c.id].concat(i.slice(1)))));
    const [cid, item, element, why] = r.pick(pool);
    const client = cid ? clientById(cid) : r.pick(CLIENTS);
    return {
      day: "mon", client: client.id, prompt: "Which box does it go in?", context: item, layout: "grid",
      options: choices(r, ELEMENTS, element, label => ELEMENT_TRAPS[`${element}>${label}`]),
      explain: why
    };
  }

  // ---------- Tuesday: the accounting equation ----------

  const EFFECTS = ["Assets ↑ · Liabilities ↑", "Assets ↑ · Equity ↑", "Assets ↓ · Liabilities ↓", "Assets ↓ · Equity ↓", "One asset ↑, another ↓", "Liabilities ↑ · Equity ↓"];
  const DELTA = {
    "Assets ↑ · Liabilities ↑": [1, 1, 0], "Assets ↑ · Equity ↑": [1, 0, 1], "Assets ↓ · Liabilities ↓": [-1, -1, 0],
    "Assets ↓ · Equity ↓": [-1, 0, -1], "One asset ↑, another ↓": [0, 0, 0], "Liabilities ↑ · Equity ↓": [0, 1, -1]
  };
  const TRANSACTIONS = [
    [1, (c, k) => `The owners of ${c.name} pay ${eur(k)} of new capital into the bank.`, "Assets ↑ · Equity ↑", "Cash (an asset) goes up, and so does the owners' stake (equity)."],
    [1, (c, k) => `${c.name} borrows ${eur(k)} from the bank.`, "Assets ↑ · Liabilities ↑", "Cash comes in, and a debt to the bank comes with it."],
    [1, (c, k) => `${c.name} repays ${eur(k)} of its bank loan.`, "Assets ↓ · Liabilities ↓", "Cash goes out and the debt shrinks by the same amount."],
    [1, (c, k) => `${c.name} buys ${c.equipment} for ${eur(k)}, paid in cash.`, "One asset ↑, another ↓", "Cash turns into equipment: one asset swapped for another, totals unchanged."],
    [2, (c, k) => `${c.name} buys ${eur(k)} of ${c.material} on 30-day credit.`, "Assets ↑ · Liabilities ↑", "What was bought goes up, and so does the amount owed to the supplier."],
    [2, (c, k) => `${c.name} pays a supplier ${eur(k)} it already owed.`, "Assets ↓ · Liabilities ↓", "Cash out, debt settled. No new expense: the purchase was recorded when it arrived."],
    [2, (c, k) => `A customer pays ${c.name} the ${eur(k)} invoice they owed.`, "One asset ↑, another ↓", "The receivable becomes cash: one asset swapped for another. It's not new revenue."],
    [2, (c, k) => `${c.name} ${c.service(k)}.`, "Assets ↑ · Equity ↑", "Cash goes up; the revenue increases profit, and profit belongs to equity."],
    [2, (c, k) => `${c.name} pays this month's electricity bill of ${eur(k)} in cash.`, "Assets ↓ · Equity ↓", "Cash goes down; the expense lowers profit, and so equity."],
    [3, (c, k) => `${c.name}'s staff earned ${eur(k)} of wages this month; they are paid next month.`, "Liabilities ↑ · Equity ↓", "No cash moves yet: an expense (equity ↓) and a debt to the staff (liability ↑)."],
    [3, (c, k) => `${c.name} pays its owners a dividend of ${eur(k)}.`, "Assets ↓ · Equity ↓", "Cash leaves and equity falls — directly, not through an expense."],
    [3, (c, k) => `${c.name} ${c.deposit(k)}.`, "Assets ↑ · Liabilities ↑", "Cash comes in, but the service or goods are still owed: a liability, not revenue."],
    [3, (c, k) => `${c.name}'s electricity bill for this month, ${eur(k)}, arrives; it will be paid next month.`, "Liabilities ↑ · Equity ↓", "The expense is this month's (equity ↓) and it's still owed (liability ↑)."]
  ];
  const EFFECT_TRAP = {
    "Assets ↑ · Liabilities ↑": "That would mean something new came in together with a new debt. Is anything owed here?",
    "Assets ↑ · Equity ↑": "That's what earning revenue or receiving the owners' money does. Is that what happened?",
    "Assets ↓ · Liabilities ↓": "That's paying off a debt. Was a debt settled here?",
    "Assets ↓ · Equity ↓": "That's an expense paid in cash, or a dividend. Did money leave for good?",
    "One asset ↑, another ↓": "A swap leaves the totals unchanged. Here something outside the assets moved too.",
    "Liabilities ↑ · Equity ↓": "That's an expense not yet paid. Did the company incur a cost it still owes?"
  };

  function tuesday(tier, r) {
    const pool = TRANSACTIONS.filter(t => t[0] <= tier && (tier === 1 || t[0] >= tier - 1));
    const [, text, effect, why] = r.pick(pool);
    const c = r.pick(CLIENTS);
    const k = r.pick([500, 1000, 1200, 2000, 2500, 5000, 8000]);
    const L = r.step(10000, 40000, 1000), E = r.step(10000, 40000, 1000), A = L + E;
    const [dA, dL, dE] = DELTA[effect];
    const before = { A, L, E }, after = { A: A + dA * k, L: L + dL * k, E: E + dE * k };
    if (tier === 3 && r.chance(0.5)) {
      const ask = r.pick(dA ? ["A", "E"] : ["E", "L"]);
      const names = { A: "total assets", L: "total liabilities", E: "equity" };
      const right = after[ask], was = before[ask], moved = right !== was;
      const wrong = v => ({
        value: v,
        consequence: !moved ? `This transaction leaves ${names[ask]} where it was.`
          : v === was ? "Something did move: every transaction changes at least two items."
          : Math.sign(v - was) !== Math.sign(right - was) ? "Right amount, wrong direction."
          : "Each item moves once, by the amount of the transaction."
      });
      return {
        day: "tue", client: c.id, context: `Before: assets ${eur(A)} = liabilities ${eur(L)} + equity ${eur(E)}. ${text(c, k)}`,
        prompt: `What is ${names[ask]} afterwards?`,
        options: options(r, { value: right }, [wrong(was), wrong(was + k), wrong(was - k), wrong(was + 2 * (right - was))], eur),
        explain: `${why} Afterwards: ${eur(after.A)} = ${eur(after.L)} + ${eur(after.E)}.`, bars: { before, after }
      };
    }
    return {
      day: "tue", client: c.id, context: text(c, k), prompt: "What happens to the equation?", layout: "grid",
      options: choices(r, EFFECTS, effect, label => EFFECT_TRAP[label]), explain: why, bars: { before, after }
    };
  }

  // ---------- Wednesday: revenue is not cash ----------

  function wednesday(tier, r) {
    const c = r.pick(CLIENTS);
    const k = r.pick([400, 800, 1200, 1500, 2400, 3000, 4500]);
    const kind = tier === 1 ? r.pick(["credit", "cash"]) : tier === 2 ? r.pick(["credit", "deposit", "oldInvoice"]) : r.pick(["mix", "deposit", "oldInvoice"]);
    const base = { day: "wed", client: c.id };
    if (kind === "cash") {
      return Object.assign(base, {
        context: `On 10 March ${Y}, ${c.name} ${c.cashSale(k)}.`,
        prompt: `How much revenue does ${c.name} record in ${Y}?`,
        options: options(r, { value: k }, [{ value: 0, consequence: "Delivered and paid: nothing is missing, it's revenue." }, { value: k / 2, consequence: "No reason to split it: the sale is complete." }], eur),
        explain: `Delivered and paid on the same day: revenue and cash happen together. For ${c.name}, revenue is earned ${c.revenueWhen}.`
      });
    }
    if (kind === "credit") {
      const askCash = r.chance(0.5);
      return Object.assign(base, {
        context: `In December ${Y}, ${c.name} ${c.creditSale(k)}. The customer pays on 15 January ${Y + 1}.`,
        prompt: askCash ? `How much cash does ${c.name} receive in ${Y}?` : `How much revenue does ${c.name} record in ${Y}?`,
        options: askCash
          ? options(r, { value: 0 }, [{ value: k, consequence: "That's the revenue. The money only arrives in January." }], eur)
          : options(r, { value: k }, [{ value: 0, consequence: `Waiting for the cash would push ${Y}'s revenue into ${Y + 1}: profit in the wrong year.` }], eur),
        explain: askCash
          ? `Revenue ${eur(k)} in ${Y}, cash 0 in ${Y}. Until January the customer owes the money: a trade receivable.`
          : `The work or goods were delivered in ${Y}, so the revenue is ${Y}'s. At year-end the customer owes ${eur(k)}: a trade receivable.`
      });
    }
    if (kind === "deposit") {
      const context = `On 5 December ${Y}, ${c.name} ${c.deposit(k)}.`;
      if (r.chance(0.5)) {
        return Object.assign(base, {
          context, prompt: `At 31 December ${Y}, what is the ${eur(k)} for ${c.name}?`,
          options: choices(r, ["Revenue", "A liability (owed to the customer)", "A trade receivable", "Equity"], "A liability (owed to the customer)", l => ({
            "Revenue": "Nothing has been provided yet: booking revenue now would be early.",
            "A trade receivable": "A receivable is money owed to the company. Here the customer already paid — the company owes the service.",
            "Equity": "The customer is not an owner; this money comes with an obligation."
          })[l]),
          explain: `${c.name} has the cash but still owes the customer: a contract liability (deferred revenue) until it delivers. Revenue follows ${c.revenueWhen}.`
        });
      }
      return Object.assign(base, {
        context, prompt: `How much revenue does ${c.name} record in ${Y}?`,
        options: options(r, { value: 0 }, [{ value: k, consequence: "Cash in hand isn't revenue: nothing has been provided yet." }], eur),
        explain: `Nothing provided in ${Y}, so no revenue in ${Y}. The ${eur(k)} is a liability until ${c.name} delivers in ${Y + 1}.`
      });
    }
    if (kind === "oldInvoice") {
      return Object.assign(base, {
        context: `In January ${Y}, a customer pays ${c.name} ${eur(k)} for work or goods provided in November ${Y - 1}.`,
        prompt: `How much revenue does this add to ${Y}?`,
        options: options(r, { value: 0 }, [{ value: k, consequence: `That revenue was already ${Y - 1}'s: counting it again doubles it.` }], eur),
        explain: `The revenue belonged to ${Y - 1}, when it was provided. In ${Y} it's only cash: the receivable is collected.`
      });
    }
    const a = r.pick([1000, 1500, 2000, 3000]), b = r.pick([500, 800, 1200, 2500]), d = r.pick([400, 600, 900, 1800]);
    const askCash = r.chance(0.5);
    return Object.assign(base, {
      context: `December ${Y} at ${c.name}:`,
      list: [`(1) ${cap(c.cashSale(a))}.`, `(2) ${cap(c.creditSale(b))}; paid in January.`, `(3) ${cap(c.deposit(d))}.`],
      prompt: askCash ? `How much cash comes in during ${Y}?` : `How much revenue is recorded in ${Y}?`,
      options: askCash
        ? options(r, { value: a + d }, [
          { value: a + b, consequence: "That's the revenue. Item 2 hasn't paid yet, and item 3 did." },
          { value: a, consequence: "The deposit is cash too, even if it isn't revenue." },
          { value: a + b + d, consequence: "Item 2's customer pays only in January." }], eur)
        : options(r, { value: a + b }, [
          { value: a + d, consequence: "That's the cash. Revenue follows delivery, not the money." },
          { value: a, consequence: "Item 2 was provided in December: it's revenue even though it's unpaid." },
          { value: a + b + d, consequence: "The deposit is a liability: nothing provided yet." }], eur),
      explain: askCash
        ? `Cash = ${eur(a)} + ${eur(d)} = ${eur(a + d)}. Revenue would be ${eur(a + b)}: two different questions.`
        : `Revenue = what was provided: ${eur(a)} + ${eur(b)} = ${eur(a + b)}. The deposit waits until ${Y + 1}.`
    });
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  // ---------- Thursday: costs that cross the year ----------

  function thursday(tier, r) {
    const c = r.pick(CLIENTS);
    const kinds = tier === 1 ? ["prepaid", "accrued"] : tier === 2 ? ["prepaid", "accrued", "boxPrepaid", "boxAccrued"] : ["prepaid", "subscription", "boxSubscription", "boxPrepaid", "boxAccrued"];
    const kind = r.pick(kinds);
    const base = { day: "thu", client: c.id };
    if (kind === "prepaid" || kind === "boxPrepaid") {
      const month = tier === 1 ? r.pick([7, 10]) : r.int(2, 12);
      const monthly = r.pick([50, 100, 150, 200, 250]), total = monthly * 12, m = 13 - month, exp = monthly * m;
      const context = `On 1 ${MONTH[month - 1]} ${Y}, ${c.name} pays ${eur(total)} for 12 months of ${c.prepaid}.`;
      if (kind === "boxPrepaid") {
        return Object.assign(base, {
          context, prompt: `At 31 December ${Y}, the unused part is…`,
          options: choices(r, ["A prepaid expense (asset)", "An accrued expense (liability)", "Deferred revenue (liability)", "An expense of the year"], "A prepaid expense (asset)", l => ({
            "An accrued expense (liability)": "Nothing is owed: the company paid in advance, so it's ahead, not behind.",
            "Deferred revenue (liability)": "Deferred revenue is money received in advance. Here the company paid.",
            "An expense of the year": "Next year's months haven't been used yet: expensing them now makes this year look worse."
          })[l]),
          explain: `${12 - m} months of ${c.prepaid} are still to come: ${eur(total - exp)} is a prepaid expense, an asset.`
        });
      }
      return Object.assign(base, {
        context, prompt: `How much is ${Y}'s expense?`,
        options: options(r, { value: exp }, [
          { value: total, consequence: `Expensing all ${eur(total)} charges ${Y} for months that belong to ${Y + 1}.` },
          { value: total - exp, consequence: "That's the part still to come: the prepaid expense." },
          { value: 0, consequence: `${m} months were used in ${Y}: they are ${Y}'s expense.` }], eur),
        explain: `${eur(total)} ÷ 12 = ${eur(monthly)} a month × ${m} months (${MONTH[month - 1]}–December) = ${eur(exp)}. The other ${eur(total - exp)} is a prepaid expense.`
      });
    }
    if (kind === "accrued" || kind === "boxAccrued") {
      const k = r.pick([300, 450, 600, 900, 1200]);
      const context = `In December ${Y}, ${c.name} ${c.accrued(k)}. The invoice arrives on 20 January ${Y + 1}.`;
      if (kind === "boxAccrued") {
        return Object.assign(base, {
          context, prompt: `At 31 December ${Y}, what does ${c.name} show?`,
          options: choices(r, ["An accrued expense (liability)", "A prepaid expense (asset)", "Nothing until the invoice arrives", "Deferred revenue (liability)"], "An accrued expense (liability)", l => ({
            "A prepaid expense (asset)": "Nothing was paid in advance: the company is behind, not ahead.",
            "Nothing until the invoice arrives": "It was used in December. Ignoring it overstates this year's profit.",
            "Deferred revenue (liability)": "Deferred revenue is money received in advance, not a cost owed."
          })[l]),
          explain: `Used in ${Y} and not yet paid: ${eur(k)} is ${Y}'s expense and an accrued expense (liability) at year-end.`
        });
      }
      return Object.assign(base, {
        context, prompt: `How much is ${Y}'s expense for it?`,
        options: options(r, { value: k }, [{ value: 0, consequence: `The paperwork arrives in ${Y + 1}, but it was used in ${Y}: profit would be overstated.` }, { value: k / 2, consequence: "No reason to split it: all of it was used in December." }], eur),
        explain: `Used in December ${Y} → ${Y}'s expense, ${eur(k)}. Unpaid at year-end → an accrued expense (liability).`
      });
    }
    // Revenue received in advance, earned month by month: Pixel Loop's everyday life.
    const p = clientById("pixel");
    const month = r.int(2, 12), monthly = r.pick([100, 200, 300, 400]), total = monthly * 12, m = 13 - month, inc = monthly * m;
    const context = `On 1 ${MONTH[month - 1]} ${Y}, a customer pays ${p.name} ${eur(total)} for a 12-month subscription starting that day.`;
    const sub = Object.assign(base, { client: p.id });
    if (kind === "boxSubscription") {
      return Object.assign(sub, {
        context, prompt: `At 31 December ${Y}, the months not yet provided are…`,
        options: choices(r, ["Deferred revenue (liability)", "A prepaid expense (asset)", "Revenue of the year", "A trade receivable (asset)"], "Deferred revenue (liability)", l => ({
          "A prepaid expense (asset)": "That's the customer's side of the story. Pixel Loop received the money.",
          "Revenue of the year": "Those months of service haven't been provided yet: too early.",
          "A trade receivable (asset)": "The customer owes nothing: they already paid."
        })[l]),
        explain: `${p.name} still owes the customer ${12 - m} months of service: ${eur(total - inc)} is deferred revenue, a liability.`
      });
    }
    return Object.assign(sub, {
      context, prompt: `How much subscription revenue is ${Y}'s?`,
      options: options(r, { value: inc }, [
        { value: total, consequence: `Only ${m} months of service were provided in ${Y}.` },
        { value: total - inc, consequence: "That's the part still owed to the customer: deferred revenue." },
        { value: 0, consequence: `The customer already used ${m} months: that revenue is earned.` }], eur),
      explain: `${eur(total)} ÷ 12 × ${m} months = ${eur(inc)} earned in ${Y}. The rest, ${eur(total - inc)}, is deferred revenue — which is why subscription companies carry big liabilities.`
    });
  }

  // ---------- Friday: the first statements ----------

  function friday(tier, r) {
    const c = r.pick(CLIENTS);
    const cashSale = r.pick([2000, 3000, 4000, 5000]), creditSale = r.pick([1000, 1500, 2000, 2500]);
    const rent = r.pick([800, 1000, 1200]), wagesUnpaid = r.pick([600, 900, 1500]);
    const oldInvoice = tier >= 2 ? r.pick([500, 700, 1100]) : 0, prepaidNext = tier >= 2 ? r.pick([300, 600]) : 0;
    const capital = tier >= 3 ? r.pick([2000, 5000]) : 0;
    const lines = [
      `${cap(c.cashSale(cashSale))}.`,
      `${cap(c.creditSale(creditSale))}; paid next month.`,
      `This month's rent, paid: ${eur(rent)}.`,
      `This month's wages, to be paid next month: ${eur(wagesUnpaid)}.`
    ];
    if (oldInvoice) lines.push(`Collected an invoice from last month: ${eur(oldInvoice)}.`);
    if (prepaidNext) lines.push(`Paid next month's ${c.prepaid} in advance: ${eur(prepaidNext)}.`);
    if (capital) lines.push(`The owners paid in new capital: ${eur(capital)}.`);
    const revenue = cashSale + creditSale, expenses = rent + wagesUnpaid, profit = revenue - expenses;
    const cash = cashSale + oldInvoice + capital - rent - prepaidNext;
    const ask = r.pick(tier === 1 ? ["revenue", "expenses", "profit"] : ["revenue", "expenses", "profit", "cash"]);
    const base = { day: "fri", client: c.id, context: `${c.name}'s month, in five minutes:`, list: r.shuffle(lines) };
    if (ask === "revenue") return Object.assign(base, {
      prompt: "Revenue for the month?",
      options: options(r, { value: revenue }, [
        { value: cashSale, consequence: "The invoiced sale was provided this month: it's revenue even though it's unpaid." },
        { value: cashSale + oldInvoice, consequence: "Collecting last month's invoice is cash, not this month's revenue." },
        { value: revenue + oldInvoice + capital, consequence: "Only what was provided to customers is revenue — not collections or the owners' money." },
        { value: cashSale + creditSale / 2, consequence: "The whole invoiced amount was provided this month." }], eur),
      explain: `Revenue = what was provided to customers: ${eur(cashSale)} + ${eur(creditSale)} = ${eur(revenue)}.`
    });
    if (ask === "expenses") return Object.assign(base, {
      prompt: "Expenses for the month?",
      options: options(r, { value: expenses }, [
        { value: rent, consequence: "Unpaid wages are still this month's cost: the staff worked this month." },
        { value: rent + prepaidNext, consequence: "That's what was paid. Next month's prepayment is an asset, and unpaid wages are an expense." },
        { value: expenses + prepaidNext, consequence: "Next month's prepayment belongs to next month." },
        { value: rent + wagesUnpaid / 2, consequence: "All of this month's wages are this month's expense." }], eur),
      explain: `Expenses = what was used up this month: rent ${eur(rent)} + wages ${eur(wagesUnpaid)} = ${eur(expenses)}.`
    });
    if (ask === "profit") return Object.assign(base, {
      prompt: "Profit for the month?",
      options: options(r, { value: profit }, [
        { value: cash, consequence: "That's the change in cash. Profit uses revenue and expenses, not money in and out." },
        { value: cashSale - rent, consequence: "Only counting paid items is cash accounting: the invoiced sale and the unpaid wages count too." },
        { value: revenue - rent, consequence: "The unpaid wages are an expense of the month." }], eur),
      explain: `Profit = revenue ${eur(revenue)} − expenses ${eur(expenses)} = ${eur(profit)}.`
    });
    return Object.assign(base, {
      prompt: "Change in cash for the month?",
      options: options(r, { value: cash }, [
        { value: profit, consequence: "That's the profit. Cash counts money in and out, whatever it is for." },
        { value: cashSale - rent, consequence: "Collections, advance payments and the owners' capital all move cash too." },
        { value: cash + creditSale, consequence: "The invoiced sale hasn't been paid yet." }], eur),
      explain: `Cash in: ${[cashSale, oldInvoice, capital].filter(Boolean).map(eur).join(" + ")}. Cash out: ${[rent, prepaidNext].filter(Boolean).map(eur).join(" + ")}. Net: ${eur(cash)}.`
    });
  }

  // ---------- The week ----------

  const DAYS = [
    {
      id: "mon", short: "Mon", title: "The five boxes", make: monday,
      briefing: [
        ["giulia", `Welcome to ${FIRM}! I'm Giulia, one of the partners. We keep the books for five clients, and from today so do you. Rule one of this job: every euro goes in the right box.`],
        ["marco", "Hi, I'm Marco. Only five boxes exist. Assets: what the company controls that will bring future benefits. Liabilities: what it owes to outsiders. Equity: what's left for the owners. Revenue: what it earns from customers. Expenses: what it uses up to earn it."],
        ["marco", "My trick: still useful tomorrow? Asset. Owed to someone? Liability. Used up this period? Expense. Your clients are very different — a bakery owns ovens, a software firm owns laptops — but the boxes are the same. Eight points to go home; a wrong answer costs one."]
      ],
      takeaway: "The same five boxes fit every business. What changes is what fills them: Lario's assets are wool and machines, Forno Rossi's are ovens and flour, Pixel Loop's are laptops, Hotel Lago's is a building, Verdi Consulting barely has any — it sells time.",
      email: ["it", "Your password has been reset to “password”. Please change it immediately. (We know you won't.)"]
    },
    {
      id: "tue", short: "Tue", title: "The equation", make: tuesday,
      briefing: [
        ["giulia", "Today, the one equation that pays my salary: Assets = Liabilities + Equity. For every client. After every single transaction."],
        ["marco", "Every transaction moves at least two things, so it stays balanced. Borrow €1,000: cash up, loan up. Buy equipment with cash: one asset up, another down — the totals don't move."],
        ["marco", "Revenue and expenses reach equity through profit: revenue raises it, an expense lowers it. Dividends lower it too, but they are not an expense — they're money handed back to the owners."]
      ],
      takeaway: "The equation never changes, but the mix does: Hotel Lago leans on a mortgage (big liabilities), Pixel Loop on its investors (big equity), Forno Rossi on its own small savings.",
      email: ["client", "Hotel Lago here. The bank asked if our balance sheet “balances”. We said yes. It does, right? Right??"]
    },
    {
      id: "wed", short: "Wed", title: "Revenue is not cash", make: wednesday,
      briefing: [
        ["giulia", "Accrual accounting, the heart of it all: revenue is recorded when the company delivers, not when the money arrives."],
        ["marco", "Delivered in December, paid in January: December's revenue, and until then the customer owes it — a trade receivable. Paid before delivering? Not revenue yet: a liability, because the company still owes the customer."],
        ["marco", "Now the fun part: each client delivers differently. Lario at delivery to the shop. Forno Rossi at the counter. Pixel Loop month by month. Hotel Lago night by night. Verdi as the work is done."]
      ],
      takeaway: "Same rule, five timings. The bakery's revenue and cash arrive together; the manufacturer and the consultants earn first and collect later (receivables); the hotel and the software company often collect first and earn later (liabilities).",
      email: ["client", "Pixel Loop here. We sold €120,000 of annual subscriptions in December. Our investors want to know why that isn't all December revenue. Please explain slowly."]
    },
    {
      id: "thu", short: "Thu", title: "Costs that cross the year", make: thursday,
      briefing: [
        ["giulia", "Same idea for costs: an expense belongs to the period that uses it up, whenever it's paid."],
        ["marco", "A year of insurance paid on 1 October? Three months are this year's expense; the other nine are a prepaid expense, an asset. Something used in December with the invoice in January? December's expense, and at year-end it's owed: an accrued expense, a liability."],
        ["marco", "Mirror image when a company receives money in advance — Pixel Loop's annual subscriptions: deferred revenue, a liability that turns into revenue month by month."]
      ],
      takeaway: "Every client prepays something and forgets an invoice or two. But only Pixel Loop lives on money received in advance: that's why its deferred revenue can be bigger than its revenue for the year.",
      email: ["giulia", "Forno Rossi paid a year of oven maintenance in advance and wants it all as this year's cost “to pay less tax”. You know what to tell them."]
    },
    {
      id: "fri", short: "Fri", title: "Your first statements", make: friday,
      briefing: [
        ["giulia", "Friday! Time to put it together for each client: a small income statement and a cash summary for the month."],
        ["marco", "Profit = revenue − expenses, on an accrual basis. Change in cash = money in − money out, whatever it was for. They're almost never the same number, and that's fine."],
        ["marco", "The classic traps: collecting old invoices is cash, not revenue. Paying in advance is cash, not expense. The owners' money is cash, not revenue."]
      ],
      takeaway: "Profit and cash tell different stories: a profitable consultant can run short of cash waiting for clients to pay, while a subscription start-up can sit on cash and still make a loss.",
      email: ["giulia", "One more thing before the weekend: your probation review. Ten questions, eight right. Marco says you'll be fine. Marco also says the printer is fine."]
    }
  ];

  function question(dayId, points, r) {
    return DAYS.find(d => d.id === dayId).make(tierFor(points), r);
  }

  function probation(seed) {
    const r = C.rng(C.hash("probation:" + seed));
    const qs = [];
    DAYS.forEach(d => { qs.push(d.make(3, r)); qs.push(d.make(r.chance(0.5) ? 2 : 3, r)); });
    return r.shuffle(qs);
  }

  // ---------- Progress ----------

  function emptyState() { return { days: {}, probation: { best: 0, passed: false, tries: 0 } }; }
  function state(progress) {
    if (!progress.onboarding || typeof progress.onboarding !== "object") progress.onboarding = emptyState();
    const s = progress.onboarding;
    if (!s.days || typeof s.days !== "object") s.days = {};
    s.probation = Object.assign({ best: 0, passed: false, tries: 0 }, s.probation);
    return s;
  }
  function dayState(progress, id) {
    const s = state(progress);
    return s.days[id] || (s.days[id] = { points: 0, done: false, answered: 0, correct: 0, briefed: false });
  }
  function dayUnlocked(progress, id) {
    const i = DAYS.findIndex(d => d.id === id);
    return i <= 0 || dayState(progress, DAYS[i - 1].id).done;
  }
  function probationUnlocked(progress) { return DAYS.every(d => dayState(progress, d.id).done); }

  // Records an answer on a day; returns true when this answer finishes the day.
  function answer(progress, id, correct) {
    const d = dayState(progress, id);
    d.answered++;
    if (correct) d.correct++;
    d.points = Math.max(0, d.points + (correct ? 1 : -1));
    if (!d.done && d.points >= TARGET) { d.done = true; return true; }
    return false;
  }
  // Returns true the first time the probation is passed.
  function finishProbation(progress, score) {
    const p = state(progress).probation;
    p.tries++;
    p.best = Math.max(p.best, score);
    const first = score >= PROBATION_PASS && !p.passed;
    if (score >= PROBATION_PASS) p.passed = true;
    return first;
  }
  function currentDay(progress) { return DAYS.find(day => !dayState(progress, day.id).done) || null; }

  const CHEERS = [
    ["marco", "Textbook. Literally — it's in the textbook."],
    ["giulia", "Correct. I'll pretend I'm not impressed."],
    ["marco", "The auditors won't even look up from their laptops."],
    ["marco", "Nailed it. Have a biscuit."],
    ["giulia", "Exactly right. Marco, take notes."],
    ["marco", "Clean. Like a freshly reconciled bank account."]
  ];
  const OOPS = [
    ["marco", "Hmm, not quite. Here's what that would do:"],
    ["giulia", "The auditors would circle that in red:"],
    ["marco", "Easy mistake — I made it in 2011. Here's the damage:"],
    ["marco", "Close, but the balance sheet disagrees:"]
  ];

  const api = {
    FIRM, PEOPLE, CLIENTS, DAYS, TARGET, PROBATION_SIZE, PROBATION_PASS, CHEERS, OOPS, ELEMENTS, EFFECTS, DELTA,
    tierFor, question, probation, clientById, state, dayState, dayUnlocked, probationUnlocked, answer, finishProbation, currentDay, emptyState
  };
  root.DeskOnboarding = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
