/* PolimiAFC — career mode data: the firm PolimiAFC S.p.A., its chart of accounts, its first year,
   the ranks, the clients and the content pools for the six kinds of job. Data only. */
(function (root) {
  "use strict";
  const Y = 2026;

  // ---------- The firm's chart of accounts ----------
  // type: A asset, L liability, E equity, R revenue, X expense.
  const ACCOUNTS = [
    { id: "cash", name: "Cash at bank", type: "A" },
    { id: "receivables", name: "Trade receivables", type: "A" },
    { id: "prepaid", name: "Prepaid rent", type: "A" },
    { id: "equipment", name: "Equipment (net)", type: "A" },
    { id: "payables", name: "Trade payables", type: "L" },
    { id: "wagesPayable", name: "Wages payable", type: "L" },
    { id: "loan", name: "Bank loan", type: "L" },
    { id: "dividendsPayable", name: "Dividends payable", type: "L" },
    { id: "shareCapital", name: "Share capital", type: "E" },
    { id: "sharePremium", name: "Share premium reserve", type: "E" },
    { id: "legalReserve", name: "Legal reserve", type: "E" },
    { id: "retained", name: "Retained earnings", type: "E" },
    { id: "fees", name: "Fee revenue", type: "R" },
    { id: "wages", name: "Staff costs", type: "X" },
    { id: "rent", name: "Rent expense", type: "X" },
    { id: "consumables", name: "Office supplies", type: "X" },
    { id: "depreciation", name: "Depreciation", type: "X" },
    { id: "interest", name: "Interest expense", type: "X" }
  ];
  const TYPE_NAMES = { A: "Assets", L: "Liabilities", E: "Equity", R: "Revenue", X: "Expenses" };

  // ---------- Ranks ----------
  const RANKS = [
    { id: "intern", name: "Intern", xp: 0, salary: 60, clients: ["forno"] },
    { id: "junior", name: "Junior Accountant", xp: 100, salary: 90, clients: ["forno", "verdi", "hotel"] },
    { id: "accountant", name: "Accountant", xp: 300, salary: 130, clients: ["forno", "verdi", "hotel", "pixel"], soon: true }
  ];

  const FEE_PER_JOB = 1200; // what PolimiAFC bills a client for each job done right
  const JOBS_PER_DAY = 5;
  const DAYS_PER_QUARTER = 3;
  const SHARES_START = 100000;

  // ---------- Clients ----------
  const CLIENTS = {
    forno: { name: "Forno Rossi", kind: "Bakery", icon: "🥐", outfit: "baker", base: 45000 },
    verdi: { name: "Verdi Consulting", kind: "Consultancy", icon: "📈", outfit: "consultant", base: 80000 },
    hotel: { name: "Hotel Lago", kind: "Hotel", icon: "🏨", outfit: "hotelier", base: 120000 },
    pixel: { name: "Pixel Loop", kind: "Software", icon: "💻", outfit: "coder", base: 60000 }
  };

  // ---------- Items: what arrives on the desk ----------
  // [client, tier (1 intern, 2 junior), document kind, item, element, amount range, why]
  const ITEMS = [
    ["forno", 1, "Bank statement", "Cash in the bakery's bank account", "Asset", [2000, 9000], "Cash is an asset: the bakery controls it and can spend it tomorrow."],
    ["forno", 1, "Till report", "Bread and cakes sold at the counter this week", "Revenue", [800, 3000], "Sales to customers are revenue."],
    ["forno", 1, "Stock count", "Flour and butter in the storeroom", "Asset", [300, 1500], "Ingredients not yet used are inventory: an asset."],
    ["forno", 1, "Purchase invoice", "The new oven, bought this month", "Asset", [4000, 12000], "The oven will bake for years: property, plant and equipment."],
    ["forno", 1, "Gas bill", "Gas used by the ovens this month", "Expense", [200, 700], "Used up this month to bake: an expense."],
    ["forno", 1, "Payslips", "The two bakers' wages for this month", "Expense", [2500, 4200], "This month's work, used up this month: an expense."],
    ["forno", 1, "Loan agreement", "Loan from Banca Brera for the new oven", "Liability", [5000, 15000], "Borrowed money must be repaid: a liability."],
    ["forno", 1, "Supplier invoice", "The mill's invoice for flour, not yet paid", "Liability", [300, 1200], "Owed to the mill: a trade payable."],
    ["forno", 1, "Company deed", "Money the owners put in to open the bakery", "Equity", [10000, 30000], "The owners' contribution is equity."],
    ["forno", 1, "Rent receipt", "Shop rent for this month", "Expense", [900, 1600], "This month's use of the shop is used up: an expense."],
    ["forno", 1, "Vehicle papers", "The delivery van the bakery owns", "Asset", [8000, 20000], "Used for years for deliveries: an asset."],
    ["forno", 2, "Catering invoice", "Catering invoice sent to an office, not yet paid", "Asset", [300, 1500], "The office owes the bakery: a trade receivable, an asset."],
    ["forno", 2, "Order form", "Deposit received for a wedding cake next month", "Liability", [100, 600], "The cake isn't delivered yet: the bakery owes it. A contract liability."],
    ["forno", 2, "Rent receipt", "Shop rent paid now for next quarter", "Asset", [2700, 4800], "Not used yet: a prepaid expense, still an asset."],
    ["forno", 2, "Waste log", "Yesterday's unsold bread, thrown away", "Expense", [40, 150], "No future value left: an expense."],
    ["forno", 2, "Closing file", "Profits kept in the bakery from last year", "Equity", [3000, 12000], "Retained earnings belong to the owners: equity."],
    ["forno", 2, "Board minutes", "Dividend paid to the owners", "Equity", [1000, 5000], "A distribution to the owners reduces equity. It is never an expense."],
    ["verdi", 2, "Invoice", "Fees for a project finished this month", "Revenue", [4000, 15000], "Work delivered to clients: revenue."],
    ["verdi", 2, "Payslips", "Consultants' salaries for this month", "Expense", [8000, 20000], "The consultants' time was used this month: an expense."],
    ["verdi", 2, "Purchase invoice", "Laptops for the consultants", "Asset", [2000, 6000], "Used for several years: equipment, an asset."],
    ["verdi", 2, "Aged receivables", "Fees billed to clients, not yet paid", "Asset", [3000, 12000], "Clients owe Verdi: trade receivables."],
    ["verdi", 2, "Timesheet", "Hours worked this month, billed next month", "Asset", [2000, 8000], "The work is done: the right to bill it is an asset (unbilled receivable)."],
    ["verdi", 2, "Engagement letter", "Retainer received for a project starting next quarter", "Liability", [2000, 6000], "Nothing done yet: Verdi owes the work. A liability."],
    ["verdi", 2, "HR memo", "Year-end bonus owed to staff, paid in January", "Liability", [3000, 9000], "Earned by staff, unpaid at year-end: an accrued liability."],
    ["verdi", 2, "Expense claim", "Train tickets for client visits", "Expense", [100, 600], "Used up to serve clients: an expense."],
    ["hotel", 2, "Property deed", "The hotel building", "Asset", [800000, 1500000], "Property used for decades: an asset."],
    ["hotel", 2, "Bank letter", "Mortgage on the hotel building", "Liability", [300000, 700000], "A long-term loan owed to the bank: a liability."],
    ["hotel", 2, "Night audit", "Room revenue for last night", "Revenue", [2000, 6000], "Rooms provided last night: revenue."],
    ["hotel", 2, "Booking report", "Guest deposits for stays next summer", "Liability", [5000, 20000], "The hotel owes those stays: a contract liability."],
    ["hotel", 2, "Laundry invoice", "Laundry service used this month", "Expense", [600, 2000], "Used up this month: an expense."],
    ["hotel", 2, "Stock count", "Bed linen and towels in the store room", "Asset", [2000, 6000], "Supplies still to be used: an asset."],
    ["hotel", 2, "Fixed asset register", "Depreciation of the hotel furniture this year", "Expense", [3000, 9000], "The part of the furniture used up this year: an expense."]
  ];
  const ELEMENTS = ["Asset", "Liability", "Equity", "Revenue", "Expense"];
  const TRAPS = {
    "Asset>Liability": "That says the client owes it, when the client owns it.",
    "Asset>Equity": "Equity is the owners' claim, not something the business holds.",
    "Asset>Revenue": "Owning something isn't earning it.",
    "Asset>Expense": "It still has future value: expensing it would make profit too low.",
    "Liability>Asset": "A debt filed as a possession: the balance sheet would look far too rich.",
    "Liability>Equity": "It's owed to an outsider, not to the owners.",
    "Liability>Revenue": "Owing isn't earning: profit would be overstated.",
    "Liability>Expense": "The amount still owed at the date is an obligation: a liability.",
    "Equity>Asset": "Equity is a claim on the assets, not an asset.",
    "Equity>Liability": "The owners' stake has no creditor and no due date.",
    "Equity>Revenue": "Dealings with the owners never pass through profit.",
    "Equity>Expense": "Dealings with the owners never pass through profit — dividends are not expenses.",
    "Revenue>Asset": "The cash or receivable is the asset; the earning itself is revenue.",
    "Revenue>Liability": "Nobody is owed anything here: it was earned.",
    "Revenue>Equity": "Revenue reaches equity only through profit, at year-end.",
    "Revenue>Expense": "Wrong side of profit: a swing of twice the amount!",
    "Expense>Asset": "It's used up: the balance sheet would carry a ghost.",
    "Expense>Liability": "The cost of the period is an expense; only an unpaid amount would be a liability.",
    "Expense>Equity": "Running costs go through profit: they are expenses.",
    "Expense>Revenue": "Wrong side of profit: a swing of twice the amount!"
  };

  // ---------- Phone calls: quick questions with a timer ----------
  // [tier, client, question, answer, [wrong options…], why]
  const CALLS = [
    [1, "forno", "I sold €300 of bread today, paid in cash. Is that revenue?", "Yes, revenue of today", ["No, only cash", "No, it's equity", "Only when I bank it"], "Delivered and paid: revenue today, and cash too."],
    [1, "forno", "I bought flour I haven't used yet. Is it a cost already?", "No, it's inventory (an asset)", ["Yes, an expense today", "It's a liability", "It's equity"], "Unused ingredients are inventory: they become a cost when used."],
    [1, "forno", "The bank lent me €5,000. Did I earn €5,000?", "No: cash up, and a liability", ["Yes, it's revenue", "It's equity", "It's an expense"], "A loan must be repaid: no revenue at all."],
    [1, "forno", "I put €2,000 of my own savings into the bakery. What is it?", "Equity", ["Revenue", "A liability", "An expense"], "The owner's contribution is equity."],
    [1, "forno", "My oven will last ten years. Is it an expense this month?", "No, it's an asset", ["Yes, all of it", "It's a liability", "It's equity"], "An asset used for years; only its depreciation becomes a cost, bit by bit."],
    [1, "forno", "I owe the mill €400 for flour. What's that on my balance sheet?", "A liability", ["An asset", "Equity", "Revenue"], "An amount owed to a supplier: a trade payable."],
    [1, "forno", "This month's gas bill is €350. What is it?", "An expense", ["An asset", "Equity", "Revenue"], "Used up this month: an expense."],
    [1, "forno", "Is Assets = Liabilities + Equity always true?", "Always", ["Only at year-end", "Only if there's profit", "Only for big companies"], "Every transaction keeps the equation balanced."],
    [2, "forno", "A customer paid a €200 deposit for a cake I'll bake next month. Revenue now?", "No, a liability until delivery", ["Yes, €200 of revenue", "It's equity", "Half now, half later"], "Nothing delivered: the deposit is a contract liability."],
    [2, "forno", "I paid next quarter's rent today. This month's expense?", "No, it's prepaid (an asset)", ["Yes, all of it", "It's a liability", "It's equity"], "Rent for future months is a prepaid expense until used."],
    [2, "forno", "We paid a €1,000 dividend. Does it lower my profit?", "No, it reduces equity directly", ["Yes, it's an expense", "It's revenue", "It's a liability forever"], "Dividends are distributions, not expenses."],
    [2, "verdi", "We finished a project in December and bill it in January. December revenue?", "Yes, it's December's revenue", ["No, January's", "Only when paid", "It's equity"], "Revenue follows the work, not the invoice or the cash."],
    [2, "verdi", "A client paid a retainer for next quarter's project. Is it revenue?", "No, it's a liability", ["Yes, all of it", "It's equity", "It's an asset"], "The work isn't done: Verdi owes it."],
    [2, "verdi", "Staff earned a bonus in December, paid in January. December expense?", "Yes, and a liability at year-end", ["No, January's", "It's equity", "Only when paid"], "Earned in December: December's expense, still owed at year-end."],
    [2, "hotel", "Guests paid now for rooms next July. Revenue this year?", "No, a liability until they stay", ["Yes, all of it", "Half of it", "It's equity"], "Revenue comes night by night, when the rooms are provided."],
    [2, "hotel", "Our mortgage is €500,000. Is it part of equity?", "No, it's a liability", ["Yes", "It's revenue", "It's an asset"], "Money owed to the bank is a liability."],
    [2, "hotel", "Collecting a guest's unpaid bill from last month: new revenue?", "No, only cash in", ["Yes, revenue today", "It's equity", "It's a liability"], "The revenue was last month's; now the receivable turns into cash."]
  ];

  // ---------- The firm's first year: what Giulia decides, day by day ----------
  // Each entry: day (1–12), memo, lines [account, change]. Amounts that depend on your work use a function.
  const YEAR_ONE = [
    { day: 1, title: "PolimiAFC S.p.A. is born", memo: `PolimiAFC S.p.A. is born! The shareholders subscribe ${SHARES_START.toLocaleString("en-US")} shares at €1 each, paid in cash into our bank account.`, lines: [["cash", 100000], ["shareCapital", 100000]], why: "Cash comes in (asset ↑) and the shareholders' capital is created (equity ↑). It's not revenue: nobody bought a service." },
    { day: 2, title: "New laptops", memo: "I bought three laptops for €4,500 in total. We pay the supplier in 60 days. They should last three years.", lines: [["equipment", 4500], ["payables", 4500]], why: "Equipment (an asset) goes up and so does what we owe the supplier (a liability). No cash has left yet, and it's not an expense: we'll use the laptops for years." },
    { day: 3, title: "Office supplies", memo: "Paper, toner and far too much coffee: €300, paid by card.", lines: [["consumables", 300], ["cash", -300]], why: "Used up in the period: an expense. Cash goes down." },
    { day: 4, title: "Rent in advance", memo: "I paid the rent for April to September in advance: €9,000.", lines: [["prepaid", 9000], ["cash", -9000]], why: "Cash out, but none of the rent has been used yet: it's a prepaid expense, an asset, used up month by month." },
    { day: 5, title: "Paying the laptop supplier", memo: "Please pay the laptop supplier the €4,500 we owe.", lines: [["payables", -4500], ["cash", -4500]], why: "Cash goes down and so does the debt. No expense: the laptops were already recorded." },
    { day: 7, title: "A bank loan", memo: "We borrowed €30,000 from Banca Brera at 4% a year, to repay in five years.", lines: [["cash", 30000], ["loan", 30000]], why: "Cash up, bank loan up. A loan is never revenue: it must be repaid." },
    { day: 8, title: "Capital increase", memo: "Capital increase: 20,000 new shares issued at €3 each (nominal value €1), fully paid on 1 July.", lines: [["cash", 60000], ["shareCapital", 20000], ["sharePremium", 40000]], why: "€60,000 in cash. Share capital only takes the nominal value (20,000 × €1); the extra €2 per share goes to the share premium reserve." },
    { day: 10, title: "Loan interest", memo: "I paid the interest on the loan for July to December: 4% on €30,000 for six months.", lines: [["interest", 600], ["cash", -600]], why: "€30,000 × 4% × 6/12 = €600, an expense of the year. Repaying the loan itself would not be an expense." },
    { day: 11, title: "December wages", memo: "December wages of €3,000 will be paid on 10 January.", lines: [["wages", 3000], ["wagesPayable", 3000]], why: "The work was done in December: it's this year's cost. Unpaid at year-end: wages payable, a liability." },
    { day: 12, title: "Depreciation", memo: "The laptops (€4,500, bought in January) last three years. Record this year's depreciation.", lines: [["depreciation", 1500], ["equipment", -1500]], why: "€4,500 ÷ 3 years = €1,500 a year. The expense goes up and the laptops' net value goes down." }
  ];

  // Quarter closes: what has to be recorded at the end of each quarter (q = 1–4).
  // Fees depend on the jobs you did right that quarter; collections on the previous quarter's fees.
  const QUARTER_CLOSE = {
    1: [["fees"], ["rentCash"], ["staff", 6000, "Your salary for January to March"]],
    2: [["collect"], ["fees"], ["rentUsed", 4500, "April to June"], ["staff", 6000, "Your salary for April to June"]],
    3: [["collect"], ["fees"], ["rentUsed", 4500, "July to September"], ["staff", 9000, "Salaries for July to September (you and the new junior)"]],
    4: [["collect"], ["fees"], ["rentCash"], ["staff", 6000, "Salaries for October and November"]]
  };
  const RENT_QUARTER = 4500;

  // ---------- Fill-in forms ----------
  // Each template builds a form from a random generator. Kept here as descriptions; the maths lives in logic.js.
  const FILL_TIER = { 1: ["stock", "till", "payslips", "supplier"], 2: ["prepaid", "accrued", "deposit", "timesheet", "hotelNights"] };

  // ---------- Order (by period) ----------
  const ORDER_TIER = { 1: ["simple"], 2: ["simple", "accrual"] };

  const LINES = {
    firstDay: [
      "Welcome to PolimiAFC S.p.A.! I'm Giulia, the CEO. We keep the books for our clients — and for ourselves.",
      "I take the decisions: what to buy, whom to hire, when to borrow. You record them, and you record them right.",
      "Clients drop their documents in the INBOX by the door. Pick one up, take it where it belongs, and do the job.",
      "Your desk is where you fill in forms. The phone on it rings too — clients are impatient. The five coloured cabinets are Assets, Liabilities, Equity, Revenue and Expenses.",
      "My memos go in the company BOOKS, the big ledger by the window. At the end of each quarter we close the books together. Ready, intern?"
    ],
    marcoIdle: [
      "Pro tip: if it will still be useful next month, it's probably an asset.",
      "Giulia decides, we record. Last time I decided something, we bought a fax machine.",
      "Revenue follows the work, not the cash. Tattoo that somewhere.",
      "A loan is not revenue. I've seen it happen. It wasn't pretty."
    ],
    giuliaIdle: [
      "Keep the books clean and the shareholders happy. In that order.",
      "Every euro in the right box. That's the whole job, really.",
      "If the annual report balances, I'll buy the coffee. The good one."
    ]
  };

  const api = { Y, ACCOUNTS, TYPE_NAMES, RANKS, FEE_PER_JOB, JOBS_PER_DAY, DAYS_PER_QUARTER, SHARES_START, CLIENTS, ITEMS, ELEMENTS, TRAPS, CALLS, YEAR_ONE, QUARTER_CLOSE, RENT_QUARTER, FILL_TIER, ORDER_TIER, LINES };
  root.OfficeData = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
