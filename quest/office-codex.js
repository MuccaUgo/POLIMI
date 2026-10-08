/* PolimiAFC — the codex: every definition the game uses, grouped by topic. Shown in the CODEX tab
   below the screen (with a search) and in the menu. No DOM access, so it can be tested. */
(function (root) {
  "use strict";
  // [topic, term, definition]
  const CODEX = [
    // ---------- The basics ----------
    ["Basics", "Asset", "A resource the business controls that will bring future benefits: cash, inventory, equipment, money customers owe, rent paid in advance."],
    ["Basics", "Liability", "Something the business owes to others: loans, unpaid suppliers, unpaid wages, taxes due, deposits for goods not yet delivered."],
    ["Basics", "Equity", "What's left for the owners: assets − liabilities. It grows with the owners' contributions and with profit; it shrinks with losses and dividends."],
    ["Basics", "Revenue", "What the business earns from its customers when it delivers goods or services — not when the cash arrives."],
    ["Basics", "Expense", "What the business uses up to earn revenue in the period: wages, rent, energy, depreciation."],
    ["Basics", "Accounting equation", "Assets = liabilities + equity, always. Every transaction changes at least two items and keeps the equation balanced."],
    ["Basics", "Classic traps", "Dividends are not expenses. Deposits are not revenue. Loans are not revenue. Repaying a loan is not an expense. Prepaid rent is an asset. Unpaid wages are a liability."],
    // ---------- Accrual accounting ----------
    ["Accrual accounting", "Accrual principle", "Revenue is recorded when it is earned and expenses when they are used to earn it, whatever the date of the cash."],
    ["Accrual accounting", "Matching principle", "Costs go to the income statement of the year whose revenue they help to earn: materials when the products are sold, equipment through depreciation."],
    ["Accrual accounting", "Cut-off", "At year end each revenue and expense goes to the year it belongs to: work done in December is December's revenue even if billed or paid in January."],
    ["Accrual accounting", "Prepaid expense", "Paid in advance for something not yet used (rent, insurance): an asset, which becomes an expense month by month as it is used."],
    ["Accrual accounting", "Accrued expense", "Used but not yet paid or billed at year end (December gas, December wages, interest): this year's expense and a liability."],
    ["Accrual accounting", "Contract liability", "Cash received before delivering (a deposit, a retainer, a booking paid in advance): a liability until the goods or services are delivered, then revenue."],
    ["Accrual accounting", "Trade receivable", "Money customers owe for goods or services already delivered: an asset. Collecting it is not new revenue."],
    ["Accrual accounting", "Trade payable", "Money owed to suppliers for what they already delivered: a liability. Paying it is not an expense."],
    ["Accrual accounting", "Depreciation", "Spreads the cost of a long-term asset over its useful life. Straight line: (cost − residual value) ÷ useful life each year, × months ÷ 12 in the first year. No cash moves."],
    ["Accrual accounting", "Cost of an asset", "Price plus everything needed to get it ready to use (transport, installation). Running costs after that (cleaning, maintenance) are expenses."],
    ["Accrual accounting", "Impairment (IAS 36)", "If the carrying amount is higher than the recoverable amount — the higher of fair value (less costs to sell) and value in use — the asset is written down and the loss is an expense."],
    ["Accrual accounting", "Inventory and cost of goods sold", "Materials used = opening stock + purchases − closing stock. Products made but not sold are finished goods inventory (an asset); only those sold become cost of goods sold."],
    ["Accrual accounting", "Provision (IAS 37)", "A liability of uncertain timing or amount: recognised when there's a present obligation from a past event, an outflow is probable and it can be estimated reliably."],
    ["Accrual accounting", "Revaluation (IAS 16)", "Under the revaluation model an increase in the value of PPE goes to equity (revaluation surplus), not to revenue. Investment property at fair value (IAS 40): changes go to profit or loss."],
    // ---------- Equity ----------
    ["Equity", "Share capital and premium", "Shares issued above their nominal value: share capital takes the nominal value, the rest goes to the share premium reserve."],
    ["Equity", "Legal reserve", "Italian S.p.A.s set aside 5% of each year's profit until the reserve reaches 20% of share capital (art. 2430 c.c.)."],
    ["Equity", "Dividends", "Approved by the shareholders' meeting, they leave retained earnings and are a liability until paid. Never an expense."],
    ["Equity", "Dividend per share", "The dividend declared ÷ the number of shares. A shareholder receives dividend per share × the shares they own."],
    ["Equity", "Book value per share", "Equity ÷ number of shares: what each share is worth in the books (not its market price)."],
    ["Equity", "Shares changing hands", "When a shareholder sells or gives shares to someone else, the company records nothing: same share capital, same number of shares, same EPS. Only new shares issued by the company enter its books."],
    ["Equity", "Retained earnings", "Past profits kept in the business instead of being paid out: equity."],
    ["Equity", "EPS", "Earnings per share = profit ÷ weighted-average number of shares in the year. Keep all the decimals until the end; round only when you show it."],
    // ---------- The statements ----------
    ["The statements", "The four statements", "Balance sheet: the position on one date. Income statement: revenues and expenses of the year (accrual). Cash flow statement: cash in and out of the year. Statement of changes in equity: how the owners' stake changed."],
    ["The statements", "Balance sheet", "A photo on one date: assets on one side, liabilities and equity on the other. The A, L and E cabinets."],
    ["The statements", "Income statement", "A film of the year: revenues − expenses = profit (accrual logic). The R and X cabinets."],
    ["The statements", "Cash flow statement", "A film of the year's cash, in three sections: operating (the business), investing (long-term assets), financing (banks and shareholders). Their sum is the change in cash."],
    ["The statements", "Indirect method", "Cash from operations from the profit or EBIT: + D&A and other non-cash costs − increase in net working capital − taxes paid − interest paid (the course's convention)."],
    ["The statements", "Statement of changes in equity", "Opening equity + profit + shares issued − dividends ± movements between reserves = closing equity."],
    // ---------- Financial analysis ----------
    ["Financial analysis", "The six steps", "1 Context · 2 Reclassification (and financial planning) · 3 Common size · 4 Indicators · 5 Benchmarking · 6 Interpretation."],
    ["Financial analysis", "Sources", "Financial disclosures, industry and economic data, non-financial disclosures, market data. In a Form 20-F: Item 3.D risks, Item 5 management's review, Part III the statements. Auditors certify the IFRS figures, not the adjusted ones."],
    ["Financial analysis", "Reclassified balance sheet", "Invested capital (fixed assets + NOWC) = coverage (equity + NFP + provisions). Reclassification isn't compulsory: it makes statements readable and comparable."],
    ["Financial analysis", "NOWC", "Net operating working capital = trade receivables + inventories − trade and tax payables. Cash is not in it."],
    ["Financial analysis", "NFP", "Net financial position = bonds + bank debts + leases + other financial liabilities − cash. High isn't necessarily bad, if the debt funds investments that earn more than it costs."],
    ["Financial analysis", "Reclassified income statement", "Revenues − raw materials − G&A = value added; − personnel = EBITDA; − D&A = EBIT; − net financial expenses ± extraordinary items = pretax income; − tax = net income."],
    ["Financial analysis", "Segmental analysis", "Results split by market or by business. Sales are not profits: a big segment can earn little."],
    ["Financial analysis", "Common size", "Vertical: each item as a % of total assets (balance sheet) or of revenues (income statement), same year. Horizontal: each item's change against a base year."],
    ["Financial analysis", "Points vs relative change", "A ratio from 4.97% to 5.22% moves by 0.25 percentage points, or by +5.19% in relative terms (new ÷ old − 1). Say which one."],
    ["Financial analysis", "ROE", "Return on equity = net profit ÷ equity."],
    ["Financial analysis", "ROI", "Return on investment = EBIT ÷ invested capital (debt + equity)."],
    ["Financial analysis", "ROS", "Return on sales = EBIT ÷ revenues (the operating margin)."],
    ["Financial analysis", "Asset turnover", "Revenues ÷ total assets. ROA = ROS × asset turnover."],
    ["Financial analysis", "Leverage formula", "ROE = [ROI + D/E × (ROI − r)] × s, with r = cost of debt and s the share of pretax profit left after taxes. Debt raises ROE only while ROI is above r, and always makes ROE swing more."],
    ["Financial analysis", "Payout ratio", "Dividends paid ÷ the previous year's net profit. Above 1: more dividends than last year's profit."],
    ["Financial analysis", "DSO, DPO, inventory days", "DSO = trade receivables ÷ revenues × 365. DPO = trade payables ÷ purchases × 365. Inventory days = 365 ÷ inventory turnover (COGS ÷ inventory)."],
    ["Financial analysis", "Current ratio", "Current assets ÷ current liabilities: can short-term assets pay short-term debts?"],
    ["Financial analysis", "NFP / EBITDA", "How many years of EBITDA it would take to repay the net financial debt."],
    ["Financial analysis", "Interest coverage", "EBIT ÷ interest expenses: how many times operating profit covers the interest."],
    // ---------- Financial planning ----------
    ["Financial planning", "Equity vs debt", "Debt: a maturity, interest promised by contract, paid first on default, interest deductible (tax shield), covenants but no vote. Equity: no maturity, residual returns, paid last, dividends not deductible, votes. So equity costs more."],
    ["Financial planning", "Raising equity", "Retained earnings, a capital increase (existing shareholders first: the pre-emption right) or a listing (IPO). In Italy most firms grow on retained earnings and bank debt."],
    ["Financial planning", "Match maturity", "Long uses (plants, acquisitions) need long money: equity, bank loans, bonds, leasing. Short, self-liquidating uses (seasonal stock, receivables) need short money: credit lines, factoring."],
    ["Financial planning", "Credit lines", "A ceiling, not a loan: interest only on what is used. Committed: the bank has promised, a small fee on the unused part. Uncommitted: cheaper, but the bank can withdraw it at any time."],
    ["Financial planning", "Factoring", "Selling an invoice for cash before it's paid. Without recourse: a true sale, the factor bears the loss, the receivable leaves the balance sheet (receivables and DSO fall). With recourse: the firm bears the loss, the receivable stays and the advance is a financial debt in the NFP."],
    ["Financial planning", "IFRS 16 leases", "A right-of-use asset and a lease liability. The rent becomes depreciation + interest: EBITDA goes up, net debt goes up, leverage ratios change even though the business doesn't."],
    ["Financial planning", "Bonds", "Face value, coupon, maturity, yield (what you really earn). Investment grade from AAA down to BBB−; below is high yield. Eni: A−."],
    ["Financial planning", "Tax shield", "Interest is deductible: the after-tax cost of debt is r × (1 − tax rate)."],
    // ---------- Consolidation ----------
    ["Consolidation", "Control (IFRS 10)", "Power over the investee, exposure to its variable returns, and the ability to use the power to affect those returns. Control makes a subsidiary: full consolidation."],
    ["Consolidation", "Significant influence (IAS 28)", "Usually 20% or more of the votes, without control: an associate, accounted for with the equity method."],
    ["Consolidation", "Joint venture", "A separate entity under joint control of two or more investors: the equity method."],
    ["Consolidation", "Equity method", "One asset at cost, then each year: + share of the investee's profit − share of its dividends. The share of profit goes to the income statement, the dividends to the cash flow statement."],
    ["Consolidation", "Full consolidation", "Combine 100% of the subsidiary line by line at fair value, offset the parent's investment against the subsidiary's equity, recognise goodwill and non-controlling interests, eliminate intra-group items."],
    ["Consolidation", "Goodwill", "Price paid − the parent's share of the fair value of the net assets acquired (partial goodwill); with NCI at fair value, the whole subsidiary's (full goodwill). Not amortised: tested for impairment every year."],
    ["Consolidation", "Non-controlling interests", "The part of the subsidiary's equity not owned by the parent. Shown within equity, never as a liability."],
    ["Consolidation", "Intra-group eliminations", "Revenues and costs, receivables and payables, and dividends between group companies are eliminated in full, whoever sells and whatever the ownership."],
    ["Consolidation", "Deferred taxes on fair value", "PPE uplifted to fair value: a deferred tax liability = uplift × tax rate (more tax in the future). A liability measured higher gives a deferred tax asset."],
    ["Consolidation", "Negative goodwill", "Price below the fair value of the net assets: first review the estimates, then book the rest as a gain in the income statement."]
  ];
  const TOPICS = [...new Set(CODEX.map(e => e[0]))];
  // Case-insensitive search on the term and the definition.
  function search(q) {
    const t = String(q || "").trim().toLowerCase();
    return t ? CODEX.filter(([topic, term, def]) => (term + " " + def + " " + topic).toLowerCase().includes(t)) : CODEX.slice();
  }
  const api = { CODEX, TOPICS, search };
  root.OfficeCodex = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
