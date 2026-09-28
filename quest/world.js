/* Ledger Quest — the world of Balancia, chapter I: the village of Assetton. Data only. */
(function (root) {
  "use strict";

  // Map legend. Outdoors: . grass  , tall grass  = path  T tree  R rock  f flowers  ~ water  b bridge
  // ^ roof  # wall  D door  F fence  S sign  C chest  W well  M cave mouth.
  // Indoors: | wall  w floor  x exit mat  B bed  t table  k shelf  c counter.  Cave: n rock wall  g floor.
  const SOLID = new Set(["T", "R", "~", "^", "#", "F", "S", "C", "W", "|", "B", "t", "k", "c", "n"]);

  const MAPS = {
    town: {
      name: "Assetton", music: "town", outdoor: true,
      rows: [
        "TTTTTTTTTTTTTTRRMRRTTTTTTTTTTT",
        "TTTTTTTTTTTTTTR.=.RTTTTTTTTTTT",
        "TT..f.....TTTT..=..TT~~,,,,.TT",
        "TT.^^^^^........=....~~,,,,,TT",
        "TT.#####........=....~~,,,C,TT",
        "TT.##D##..f.....=....~~,,,,,TT",
        "TT...=..........=....~~.,,,,TT",
        "TT...======W=========bb=,,,,TT",
        "TTf..=..........=....~~.,,,,TT",
        "TT...=...^^^^^..=..S.~~,,,,,TT",
        "TT...=...#####..=....~~,,,,,TT",
        "TT...=...##D##..=....~~,,R,,TT",
        "TT.C.=.....=....=..f.~~,,,,,TT",
        "TT...=======....=....~~.,,,,TT",
        "TT........^^^^^.=....~~,,,,,TT",
        "TTff......#####.=....~~,,C,,TT",
        "TT..F.F...##D##.=...f~~,,,,,TT",
        "TT..........=...==...~~,,,,,TT",
        "TT...f...............~~,,,,,TT",
        "TT.................RR~~RR,,,TT",
        "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
      ],
      warps: [
        { x: 5, y: 5, to: "home", tx: 4, ty: 6, dir: "up" },
        { x: 11, y: 11, to: "shop", tx: 4, ty: 6, dir: "up" },
        { x: 12, y: 16, to: "inn", tx: 4, ty: 6, dir: "up" },
        { x: 16, y: 0, to: "cave", tx: 4, ty: 7, dir: "up" }
      ]
    },
    home: {
      name: "Your house", music: "home",
      rows: [
        "||||||||||",
        "|kkwwwwwB|",
        "|wwwwwwww|",
        "|wwtwwwww|",
        "|wwwwwwww|",
        "|wwwwwwww|",
        "|wwwwwwww|",
        "||||xx||||"
      ],
      warps: [{ x: 4, y: 7, to: "town", tx: 5, ty: 6, dir: "down" }, { x: 5, y: 7, to: "town", tx: 5, ty: 6, dir: "down" }]
    },
    shop: {
      name: "Debits & Deals", music: "home",
      rows: [
        "||||||||||",
        "|kkkwwkkk|",
        "|wwwwwwww|",
        "|cccccccc|",
        "|wwwwwwww|",
        "|wwwwwwww|",
        "|wwwwwwww|",
        "||||xx||||"
      ],
      warps: [{ x: 4, y: 7, to: "town", tx: 11, ty: 12, dir: "down" }, { x: 5, y: 7, to: "town", tx: 11, ty: 12, dir: "down" }]
    },
    inn: {
      name: "The Balanced Pillow", music: "home",
      rows: [
        "||||||||||",
        "|BwBwwkkk|",
        "|wwwwwwww|",
        "|wwwwcccc|",
        "|wwtwwwww|",
        "|wwwwwwww|",
        "|wwwwwwww|",
        "||||xx||||"
      ],
      warps: [{ x: 4, y: 7, to: "town", tx: 12, ty: 17, dir: "down" }, { x: 5, y: 7, to: "town", tx: 12, ty: 17, dir: "down" }]
    },
    cave: {
      name: "Cave of Confusion", music: "cave",
      rows: [
        "nnnnnnnnnn",
        "nggggggggn",
        "nggggggggn",
        "nggggggggn",
        "nggggggggn",
        "nggggggggn",
        "nggggggggn",
        "nggggggggn",
        "nnnnxnnnnn"
      ],
      warps: [{ x: 4, y: 8, to: "town", tx: 16, ty: 1, dir: "down" }]
    }
  };

  // People. `sprite` is "humanoid" (recoloured hero), "sage" or "boss".
  const NPCS = [
    { id: "abacus", name: "Old Abacus", map: "town", x: 7, y: 6, sprite: "sage" },
    { id: "guard", name: "Guard", map: "town", x: 16, y: 1, sprite: "humanoid", outfit: "guard" },
    { id: "kid", name: "Pip", map: "town", x: 13, y: 13, sprite: "humanoid", outfit: "kid" },
    { id: "farmer", name: "Farmer Bea", map: "town", x: 19, y: 6, sprite: "humanoid", outfit: "farmer" },
    { id: "fisher", name: "Fisher Olo", map: "town", x: 20, y: 18, sprite: "humanoid", outfit: "fisher" },
    { id: "merchant", name: "Merchant Dora", map: "shop", x: 4, y: 2, sprite: "humanoid", outfit: "merchant" },
    { id: "innkeeper", name: "Innkeeper Rolf", map: "inn", x: 6, y: 2, sprite: "humanoid", outfit: "innkeeper" },
    { id: "miner", name: "Miner Gus", map: "cave", x: 7, y: 6, sprite: "humanoid", outfit: "miner" },
    { id: "boss", name: "The Box Mixer", map: "cave", x: 4, y: 2, sprite: "boss" }
  ];

  const CHESTS = [
    { id: "meadow", map: "town", x: 26, y: 4, item: "gold", qty: 30 },
    { id: "garden", map: "town", x: 3, y: 12, item: "tea", qty: 2 },
    { id: "river", map: "town", x: 25, y: 15, item: "balm", qty: 2 }
  ];

  const ITEMS = {
    tea: { name: "Tea of Insight", price: 15, text: "In battle, removes two wrong answers." },
    balm: { name: "Herbal Balm", price: 10, text: "Restores 20 HP." },
    iron: { name: "Iron Abacus", price: 60, text: "A sturdier abacus: +3 attack. Clack clack." }
  };

  // ---------- Questions: the five boxes ----------
  const ELEMENTS = ["Asset", "Liability", "Equity", "Revenue", "Expense"];
  const CLASSIFY = [
    // [tier, item, element, why]
    [1, "Gold coins in the guild's strongbox", "Asset", "Cash is an asset: the guild controls it and can spend it tomorrow."],
    [1, "The blacksmith's anvil", "Asset", "Used for years to forge swords: an asset with future benefits."],
    [1, "A loan from the Dwarven Bank, due in three winters", "Liability", "Owed to the bank and to be repaid: a liability."],
    [1, "Gold the guild founders paid in to start the guild", "Equity", "Money put in by the owners is their stake: equity."],
    [1, "Fees earned forging swords for knights", "Revenue", "Earned from customers: revenue."],
    [1, "Coal burned in the forge this month", "Expense", "Used up this month to earn revenue: an expense."],
    [1, "Bread sold at the market stall", "Revenue", "Selling to customers is revenue."],
    [1, "This month's rent for the market stall", "Expense", "This month's use of the stall is used up: an expense."],
    [1, "Money owed to the miller for flour already delivered", "Liability", "The flour arrived, the payment hasn't: owed to the miller."],
    [2, "Gold a knight still owes for a sword already delivered", "Asset", "A receivable: the right to collect gold from the knight."],
    [2, "Profits the guild kept from past years", "Equity", "Retained earnings belong to the owners: equity."],
    [2, "Taxes owed to the King, due next month", "Liability", "Owed to the Crown: a liability until paid."],
    [2, "The alchemist's rights to a secret recipe", "Asset", "An intangible asset: no body, but future benefits."],
    [2, "Wear and tear on the mill wheel this year", "Expense", "Depreciation: the part of the wheel used up this year is an expense."],
    [2, "Interest earned on gold kept at the Dwarven Bank", "Revenue", "Income earned: it increases profit like revenue (strictly, finance income)."],
    [2, "Iron bars in the storeroom, not yet forged", "Asset", "Inventory: an asset until it is used and sold."],
    [2, "Wages paid to the stable hands for this month", "Expense", "This month's work was used up: an expense."],
    [3, "A traveller's deposit for a sword to be forged next month", "Liability", "Nothing delivered yet: the guild owes the sword (or the gold back). A liability."],
    [3, "Rent paid now for next year's market stall", "Asset", "A prepaid expense: not used yet, so still an asset."],
    [3, "Gold shared out to the guild's owners", "Equity", "A dividend: a distribution to owners. It reduces equity and is never an expense."],
    [3, "Wages the farmhands earned this winter, to be paid in spring", "Liability", "Earned but unpaid at the date: an accrued liability."],
    [3, "Bread that went mouldy and was thrown away", "Expense", "No future value left: whatever it cost is an expense."],
    [3, "A lawsuit from the miller the guild expects to lose, with a reliable estimate", "Liability", "A probable, measurable outflow: a provision, which is a liability."],
    [3, "Horses the guild owns to pull its wagons", "Asset", "Controlled and useful for years: an asset (yes, even horses)."]
  ];

  const TRAPS = {
    "Asset>Liability": "That says the guild owes it, when it owns it.",
    "Asset>Equity": "Equity is the owners' claim on the assets, not a thing the guild holds.",
    "Asset>Revenue": "Owning something isn't earning it.",
    "Asset>Expense": "It still has future value. Expensing it makes profit too low and hides an asset.",
    "Liability>Asset": "A debt turned into a possession: the books look far too rich.",
    "Liability>Equity": "Equity belongs to the owners; this is owed to an outsider.",
    "Liability>Revenue": "Owing isn't earning. Profit would be overstated.",
    "Liability>Expense": "The amount still owed at the date is an obligation: a liability.",
    "Equity>Asset": "Equity is a claim on the assets, not an asset.",
    "Equity>Liability": "The owners' stake has no creditor and no due date.",
    "Equity>Revenue": "Dealings with the owners never pass through profit.",
    "Equity>Expense": "Dealings with the owners never pass through profit — dividends are not expenses.",
    "Revenue>Asset": "The gold received is the asset; the earning itself is revenue.",
    "Revenue>Liability": "Nobody is owed anything: the guild earned it.",
    "Revenue>Equity": "Revenue reaches equity only through profit.",
    "Revenue>Expense": "Wrong side of profit: a swing of twice the amount!",
    "Expense>Asset": "It's used up. The balance sheet would carry a ghost.",
    "Expense>Liability": "The cost of the period is an expense; only an unpaid amount is a liability.",
    "Expense>Equity": "Running costs go through profit: they are expenses.",
    "Expense>Revenue": "Wrong side of profit: a swing of twice the amount!"
  };

  const TRUE_FALSE = [
    ["Dividends paid to the owners are an expense.", false, "Dividends are a distribution of equity to the owners, not a cost of earning revenue."],
    ["A machine is an asset because it will bring future benefits.", true, "That's the definition: a resource controlled, with future economic benefits."],
    ["Equity is what is left for the owners after deducting liabilities from assets.", true, "Equity = Assets − Liabilities: the residual interest."],
    ["The amount still owed to a supplier is a liability.", true, "An obligation to pay: a liability until settled."],
    ["A customer's payment for goods not yet delivered is revenue.", false, "Nothing delivered yet: it's a liability (a contract liability) until delivery."],
    ["Revenue increases equity through profit.", true, "Revenue raises profit, and profit belongs to the owners."],
    ["Buying a cart with cash lowers total assets.", false, "Cash goes down, the cart goes up: one asset swapped for another."],
    ["Money borrowed from the bank is revenue.", false, "It must be repaid: cash up, liability up. No revenue at all."],
    ["Rent paid in advance for next year is an asset today.", true, "A prepaid expense: its benefit is still to come."],
    ["Wages earned by staff but not yet paid are a liability.", true, "Owed to the staff at the date: an accrued liability."],
    ["Gold the owners put into the business is a liability.", false, "Owners' contributions are equity: there is no creditor to repay."],
    ["The coal burned this month is an asset.", false, "It's gone and brings no future benefit: an expense."]
  ];

  const ODD_ONE_OUT = { // pick three of one element and one of another
    Asset: "Which of these is NOT an asset?",
    Liability: "Which of these is NOT a liability?",
    Expense: "Which of these is NOT an expense?",
    Revenue: "Which of these is NOT revenue?"
  };

  const ENEMIES = {
    dummy: { name: "Training Dummy", sprite: "dummy", hp: 15, atk: [0, 0], xp: 4, gold: [0, 0], kind: ["classify1"], training: true },
    slime: { name: "Mixup Slime", sprite: "slime", hp: 12, atk: [3, 5], xp: 7, gold: [3, 6], kind: ["classify1"] },
    bat: { name: "Expense Bat", sprite: "bat", hp: 16, atk: [4, 6], xp: 10, gold: [4, 8], kind: ["classify2", "truefalse"] },
    crab: { name: "Liabili-Crab", sprite: "crab", hp: 22, atk: [5, 8], xp: 14, gold: [6, 10], kind: ["classify2", "classify3"] },
    boss: {
      name: "The Box Mixer", sprite: "boss", hp: 60, atk: [6, 9], xp: 60, gold: [50, 50], boss: true,
      phases: [
        { until: 40, kind: ["classify3"], taunt: "Assets! Liabilities! I'll shuffle them all!" },
        { until: 20, kind: ["truefalse"], taunt: "Fine! Then believe my LIES instead!" },
        { until: 0, kind: ["oddone"], taunt: "Find the odd one out... if you can!" }
      ]
    }
  };

  const LINES = {
    intro: [
      "The Kingdom of Balancia. For centuries, the Great Ledger kept every coin in its proper place.",
      "Then, one tax day, a gust of pure chaos tore it to pages. Now misstatements roam the land.",
      "You wake up in the village of Assetton. Today is your first day as an apprentice accountant."
    ],
    abacusTutorial: [
      "Ah, there you are! I'm Old Abacus, retired royal accountant. Retired... but the Ledger won't fix itself.",
      "Every coin in Balancia belongs in one of five boxes. ASSETS: what we control that brings future benefit. LIABILITIES: what we owe to others. EQUITY: what's left for the owners.",
      "REVENUE: what we earn from customers. EXPENSES: what we use up to earn it.",
      "Monsters around here are made of coins in the wrong box. Put each coin where it belongs and they fall apart. Try it on my training dummy!"
    ],
    abacusAfter: [
      "Splendid! Take this: the Quill of Classification. It's mostly for show, but it does sparkle.",
      "East across the bridge, the Meadow of Mixups is full of slimes. Grow stronger there.",
      "Then face the Box Mixer in the Cave of Confusion to the north. It stole Page I of the Great Ledger. Rest at home when you're hurt!"
    ],
    abacusTips: [
      "Tip: an asset brings a future benefit. If it's all used up, it's an expense.",
      "Tip: a customer's deposit isn't revenue yet. You owe them the goods — that's a liability.",
      "Tip: dividends reduce equity, but they are never an expense. Never! I once got fined for that.",
      "Tip: Tea of Insight removes two wrong answers. Merchant Dora sells it — for revenue, naturally."
    ],
    guardNo: "Halt! Only accountants of level 3 or above may enter the Cave of Confusion. Regulations. I don't write them, I just stand in front of them.",
    guardNoIntro: "Halt! Old Abacus is looking for you, apprentice. He's by your house.",
    guardYes: "Level 3? Your paperwork looks in order. Go on in — and mind the Box Mixer. It mixes boxes.",
    guardAfter: "You beat the Box Mixer! I'll put that in my report. In the right box, of course.",
    kid: [
      "Mum says my piggy bank is an asset. I say it's MY asset. She says that's called equity.",
      "If you lend me a coin, it's your asset and my liability. Friendship is complicated.",
      "The slimes in the meadow are easy if you know your boxes. I don't, so I stay here."
    ],
    farmer: [
      "Careful east of the river: the tall grass is full of Mixup Slimes. They're made of coins in the wrong box.",
      "My plough? Asset: I'll use it for years. The hay my goats ate this month? Expense: gone, like my patience."
    ],
    fisher: [
      "I borrowed a boat from the Dwarven Bank. The boat's my asset; the loan's my liability.",
      "The fish I sell? Revenue. The ones that get away? Just sad."
    ],
    merchant: "Welcome to Debits & Deals! Every sale is revenue — for me. What'll it be?",
    innkeeper: "A bed for the night is 5 gold. Your HP goes up, my revenue goes up. Everybody wins!",
    miner: "The Box Mixer fights in three rounds: first it shuffles items, then it tells lies, then it hides the odd one out. Read carefully!",
    sign: "EAST: Meadow of Mixups (tall grass, slimes). NORTH: Cave of Confusion (guarded). WEST: home, sweet home.",
    bed: "You rest in your own bed. HP fully restored. Nothing like sleeping on an asset.",
    shelf: "A dusty book, \"Debits for Dummies\". Someone underlined: DIVIDENDS ARE NOT AN EXPENSE.",
    table: "A note from Mum: \"Dinner's in the oven. The oven is an asset. Love you.\"",
    shopShelf: "Shelves full of ledgers, quills and suspiciously cheap calculators.",
    innBed: "The guest beds are for paying customers. The innkeeper is watching.",
    well: "You peer into the well. A coin glints at the bottom. Somebody's asset, now nobody's.",
    bossIntro: "BOX MIXER: Assets! Liabilities! Who cares?! I'll put your gold in the expense box and your debts in revenue! CHAOS!",
    bossWin: [
      "The Box Mixer bursts into a shower of neatly sorted coins.",
      "You recovered PAGE I of the Great Ledger!"
    ],
    ending: [
      "OLD ABACUS: You did it! Page I is safe, and the five boxes are back in order.",
      "The next page is hidden in the Forest of Balance, where Assets must always equal Liabilities plus Equity.",
      "But that, apprentice, is a story for another day."
    ],
    faint: "Everything goes dark... Old Abacus drags you home. You lost half your gold. Liabilities, eh?"
  };

  const CODEX = [
    ["Asset", "A resource the business controls that will bring future benefits: cash, inventory, equipment, money customers owe, rent paid in advance."],
    ["Liability", "Something the business owes to others: loans, unpaid suppliers, unpaid wages, taxes due, deposits for goods not yet delivered."],
    ["Equity", "What's left for the owners: Assets − Liabilities. Grows with owners' contributions and profit; shrinks with losses and dividends."],
    ["Revenue", "What the business earns from its customers when it delivers goods or services — not when the cash arrives."],
    ["Expense", "What the business uses up to earn revenue in the period: wages, rent, coal, depreciation."],
    ["Classic traps", "Dividends are not expenses. Deposits are not revenue. Loans are not revenue. Prepaid rent is an asset. Unpaid wages are a liability."]
  ];

  const api = { SOLID, MAPS, NPCS, CHESTS, ITEMS, ELEMENTS, CLASSIFY, TRAPS, TRUE_FALSE, ODD_ONE_OUT, ENEMIES, LINES, CODEX };
  root.QuestWorld = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
