/* PolimiAFC — shared map data: which tiles block the way, the maps and the people on them, and the codex.
   The office itself (map, Giulia, Marco, clients) is added by office-ui.js. */
(function (root) {
  "use strict";
  const SOLID = new Set(["|"]);
  const MAPS = {};
  const NPCS = [];

  const CODEX = [
    ["Asset", "A resource the business controls that will bring future benefits: cash, inventory, equipment, money customers owe, rent paid in advance."],
    ["Liability", "Something the business owes to others: loans, unpaid suppliers, unpaid wages, taxes due, deposits for goods not yet delivered."],
    ["Equity", "What's left for the owners: Assets − Liabilities. Grows with owners' contributions and profit; shrinks with losses and dividends."],
    ["Revenue", "What the business earns from its customers when it delivers goods or services — not when the cash arrives."],
    ["Expense", "What the business uses up to earn revenue in the period: wages, rent, energy, depreciation."],
    ["Classic traps", "Dividends are not expenses. Deposits are not revenue. Loans are not revenue. Prepaid rent is an asset. Unpaid wages are a liability."]
  ];

  const api = { SOLID, MAPS, NPCS, CODEX };
  root.QuestWorld = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
