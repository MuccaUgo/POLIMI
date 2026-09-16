// Study data for the Accounting, Finance & Control background topics, generated from the course
// annexures on IFRS financial reporting and on cost accounting.
const TOPICS = [
 { name: "Financial Accounting", categories: ["Principles", "Balance Sheet", "Income Statement", "Cash Flow", "Notes & Reporting"] },
 { name: "Cost Accounting", categories: ["Cost Basics", "Cost Classification", "Cost Configurations", "Allocation Methods"] }
];
const CATEGORIES = TOPICS.reduce(function (all, t) { return all.concat(t.categories); }, []);

const CONCEPTS = [
 {
  "cat": "Principles",
  "title": "Financial Accounting",
  "meaning": "The branch of accounting intended for users outside the organization (external accountability). It refers to mandatory financial reports that companies must prepare and publish according to international and national rules.",
  "how": "Annual reports are the main yearly documents: the accounting year lasts 12 months but may start in different months around the world (January, March, June). Interim reports include quarterly and half-year reports.",
  "trap": "Companies also publish environmental, corporate and social responsibility reports, but those are voluntary. Financial reporting is the part that is mandatory."
 },
 {
  "cat": "Principles",
  "title": "The Four IFRS Financial Statements",
  "meaning": "Under IFRS an annual report must contain four compulsory financial statements: the balance sheet, the income statement, the cash flow statement, and the statement of changes in equity.",
  "how": "Balance sheet = condition of resources and rights at year end. Income statement = revenues and costs of the year. Cash flow statement = cash flows of the year. Statement of changes in equity = variations in equity during the year.",
  "trap": "The notes to the financial statements are compulsory too. They are not an optional appendix: they explain the rules followed and the choices made in preparing the statements."
 },
 {
  "cat": "Principles",
  "title": "Accrual Principle",
  "meaning": "Under the accrual principle, the effects of transactions and other events are recognized when they occur, not when cash is received or paid, and they are reported in the financial statements of the periods to which they relate.",
  "how": "It is the underlying logic of both the income statement and the balance sheet. Revenues are recorded in the financial year in which the accrual event occurs; costs are registered in the year of the revenues they relate to.",
  "trap": "When costs cannot reasonably be related to revenues (for example administrative costs), they are attributed directly to the accounting period in which they are paid.",
  "today": "IAS 1 (paragraphs 27-28) applies accrual accounting to these costs as well: an administrative cost is recognised in the period in which it arises, which is normally the period it covers rather than the period in which the invoice happens to be paid. For most administrative costs the two coincide, which is why the course shortcut works, but the payment date is not the criterion."
 },
 {
  "cat": "Principles",
  "title": "Accrual Event vs Cash Event",
  "meaning": "The accrual event is the moment the transaction takes effect, when the company signs the contract transferring the goods and all the risk included. The cash event is the moment cash or its equivalent is actually received or paid.",
  "how": "Car sales of 1 million reached in December 2013 with cash collected in January 2014: revenue of 1 million is counted in 2013 (accrual), cash in 2013 is 0 and there is a cash inflow of 1 million in 2014.",
  "trap": "The same single transaction generates both an accrual event and a cash event, in different years. Do not treat them as alternative readings of the same figure."
 },
 {
  "cat": "Principles",
  "title": "Fair Value",
  "meaning": "IFRS defines fair value as the amount for which an asset could be exchanged, or a liability settled, between knowledgeable, willing parties in an arm's length transaction. It became relevant as an alternative to the cost method for evaluating assets and liabilities.",
  "how": "It reflects an objective evaluation external to the enterprise, related to the knowledge and estimation of sellers and buyers. Land bought for 500,000 and worth 550,000 after two years stays at 500,000 under cost, and is revalued to 550,000 under fair value.",
  "trap": "Fair value is not the company's own opinion of what an asset is worth: it is anchored to an external, market-based estimate between willing parties."
 },
 {
  "cat": "Principles",
  "title": "Benchmark vs Allowed Treatment",
  "meaning": "When IFRS gives the option to choose between accounting criteria, the preferred one is called the benchmark treatment and the possible alternative is called the allowed treatment.",
  "how": "Benchmark treatment indicates the preferred accounting criteria for a specific category; allowed treatment is the legitimate alternative for that category.",
  "trap": "The allowed treatment is a fully legitimate option, not an irregularity. The notes are what tell the reader which of the two the company actually applied."
 },
 {
  "cat": "Principles",
  "title": "Impairment Test",
  "meaning": "IFRS principles state that companies must review all assets to look for any indication of unrecoverable loss of their value. This assessment is called the impairment test.",
  "how": "The frequency depends on the category of asset. Goodwill, because of its indefinite nature, must be tested every year, and the loss of value is credited in the income statement.",
  "trap": "Impairment is about an unrecoverable loss of value, not about routine wear. Systematic allocation of cost over useful life is depreciation or amortization, which is a different mechanism.",
  "today": "IAS 36 states the test as a comparison: an asset is impaired when its carrying amount exceeds its recoverable amount, the higher of fair value less costs of disposal and value in use. “Credited in the income statement” means charged against profit. The loss also need not be permanent: for assets other than goodwill it can be reversed if the estimates that produced it change."
 },
 {
  "cat": "Balance Sheet",
  "title": "The Balance Sheet",
  "meaning": "The balance sheet describes the circumstances of the enterprise as an entity in a precise moment. It comprises assets, which report the enterprise's resources, and equity and liabilities, which list the rights to those resources held by shareholders and third parties.",
  "how": "Every item is expressed in financial terms. The two sections mirror each other: what the company has, and who has claims over it.",
  "trap": "It is a snapshot at a precise date, not a flow over the year. Flows over the period are what the income statement and the cash flow statement describe."
 },
 {
  "cat": "Balance Sheet",
  "title": "Current vs Noncurrent",
  "meaning": "An entity must present a classified balance sheet, separating assets and liabilities into current and noncurrent.",
  "how": "Current assets are resources retained within the normal operating cycle or within 12 months, such as cash or inventories of material. Current liabilities are those settled within the operating cycle or due within 12 months, such as short-term loans. Everything else is noncurrent, for instance manufacturing machines and equipment.",
  "trap": "The test is the normal operating cycle or the 12-month horizon, not the nature of the item in itself: the same kind of financial asset can sit under current or noncurrent depending on its horizon."
 },
 {
  "cat": "Balance Sheet",
  "title": "Recognition of Assets",
  "meaning": "Assets are identified by the presence of a direct or indirect contribution to companies' financial inflows or their equivalents. The initial recognition of assets under IFRS is at cost.",
  "how": "Subsequent measurement follows one of two alternative models: the cost method or the fair value method. Assets are registered with current monetary values, so items of different periods are summed without adjusting for variations in purchasing power.",
  "trap": "Property rights are not essential for recognition. Enterprises must account for assets retained by leasing when the lease substantially transfers all the risks and benefits."
 },
 {
  "cat": "Balance Sheet",
  "title": "Property, Plant and Equipment (PPE)",
  "meaning": "PPE includes tangible assets retained by the enterprise for long-term use, employed in the production of goods and services or in supporting activities: production machinery, buildings, land, office equipment.",
  "how": "Initial measurement is at cost. Measurement after initial recognition follows either the cost model, where the asset is carried at cost, or the revaluation model, where it is carried at a revalued (fair value) amount.",
  "trap": "With the sole exception of land, PPE must be depreciated, whichever of the two measurement models is applied."
 },
 {
  "cat": "Balance Sheet",
  "title": "Depreciation",
  "meaning": "Depreciation is a noncash expense that reduces the value of an asset as a result of use, age or obsolescence. The decrease in the value of the asset is balanced with a cost in the income statement.",
  "how": "It touches two statements at once: the balance sheet, where the value of PPE decreases, and the income statement, where depreciation appears as a noncash cost. Depreciation begins when the asset is available for use and continues until the asset is derecognized, even if it is idle.",
  "trap": "An idle asset keeps being depreciated. And because depreciation is a noncash cost, it lowers profit without any cash leaving the company."
 },
 {
  "cat": "Balance Sheet",
  "title": "Depreciation Methods",
  "meaning": "The depreciation methods allowed under IFRS are straight-line, declining and usage. The straight-line method is favored by international standards.",
  "how": "With straight-line, companies apportion the value of the asset in equal parts over its useful life. A machine bought for 10,000 with a useful life of 10 years and no residual value generates a yearly depreciation of 10,000 / 10 = 1,000 per year.",
  "trap": "Determining depreciation means defining both the period (useful life) and the method. Land is the exception that is never depreciated."
 },
 {
  "cat": "Balance Sheet",
  "title": "Intangible Assets",
  "meaning": "IFRS defines intangible assets as identifiable nonmonetary assets without physical substance. Their three critical attributes are identifiability, control (the power to obtain benefits from the asset) and the existence of future economic benefits, such as revenues or reduced future costs.",
  "how": "They split into intangibles with a finite life, such as patents, and intangibles with an indefinite life, among which goodwill is of particular interest. Initial measurement is at cost; the benchmark treatment afterwards is cost less any amortization and impairment losses.",
  "trap": "The revaluation model is allowed only if fair value can be determined by reference to an active market (for example milk quotas), and revaluation increases are credited directly to the revaluation reserve under equity."
 },
 {
  "cat": "Balance Sheet",
  "title": "Goodwill",
  "meaning": "Goodwill can occur from mergers and acquisitions when the purchasing value is higher than the fair value of the resources acquired. It is the difference between the acquisition cost and the participation of the purchaser in the fair value of assets less liabilities.",
  "how": "It sits under intangible assets and has an indefinite life, so IFRS requires an impairment test every year. The loss of its value is credited in the income statement.",
  "trap": "Goodwill is not amortized over a useful life like a patent. Its indefinite nature is exactly why it gets the annual impairment test instead.",
  "today": "Under IAS 36 an impairment loss on goodwill reduces the profit of the year and, unlike losses on other assets, can never be reversed in a later period."
 },
 {
  "cat": "Balance Sheet",
  "title": "Financial Assets: the Four Categories",
  "meaning": "IFRS defines financial instruments as contracts that give rise to a financial asset of one entity and a financial liability or equity instrument of another entity. Financial assets can be found under both noncurrent and current assets.",
  "how": "The four categories are: financial assets at fair value through profit or loss (FVTPL), loans and receivables, held-to-maturity investments, and available-for-sale financial assets.",
  "trap": "The category is what drives the measurement rule, so classification is the first thing to settle before asking how an instrument is valued.",
  "today": "These four categories come from IAS 39. IFRS 9 has replaced them since 2018 with three: amortised cost, fair value through other comprehensive income (FVOCI) and fair value through profit or loss (FVTPL), assigned from the business model for holding the asset and from the nature of its cash flows."
 },
 {
  "cat": "Balance Sheet",
  "title": "FVTPL — Fair Value Through Profit or Loss",
  "meaning": "FVTPL includes assets held for trading, such as derivatives, and financial assets acquired or held for the purpose of selling in the short term.",
  "how": "Initial measurement at fair value; subsequent measurement at fair value; the balance of the fair value variation goes to the income statement.",
  "trap": "This is the category where fair value swings hit profit directly. Available-for-sale assets are also measured at fair value, but their variation goes to equity instead.",
  "today": "FVTPL is the one category that carries over to IFRS 9 unchanged in name and in treatment: fair value, with the variation in profit or loss."
 },
 {
  "cat": "Balance Sheet",
  "title": "Available-for-Sale Financial Assets",
  "meaning": "Any nonderivative financial assets designated on initial recognition as available for sale.",
  "how": "Initial measurement at fair value plus transaction costs; subsequent measurement at fair value; the balance of the fair value variation goes to the revaluation reserve.",
  "trap": "Same fair value measurement as FVTPL, opposite destination for the variation: revaluation reserve in equity, not the income statement.",
  "today": "IFRS 9 has dropped this category. Its closest successor is FVOCI, where the variation goes to other comprehensive income; for debt instruments the accumulated amount is recycled to profit or loss on disposal, while for equity instruments it never is."
 },
 {
  "cat": "Balance Sheet",
  "title": "Held-to-Maturity Investments",
  "meaning": "Nonderivative financial assets with fixed or determinable payments that the entity intends to hold to maturity.",
  "how": "Initial measurement at fair value plus transaction costs; subsequent measurement at amortized cost using the effective interest method.",
  "trap": "Because they are carried at amortized cost, there is no fair value variation to allocate either to profit or to reserves.",
  "today": "IFRS 9 no longer uses the intention to hold to maturity as a label. The same instruments now sit in the amortised cost category, reached when the business model is to hold the asset to collect its contractual cash flows and those cash flows are solely payments of principal and interest."
 },
 {
  "cat": "Balance Sheet",
  "title": "Loans and Receivables",
  "meaning": "Nonderivative financial assets with fixed or determinable payments that are not quoted in an active market and are not held for trading. Trade receivables are an important item of this category, usually listed under current assets.",
  "how": "Initial measurement at fair value plus transaction costs; subsequent measurement at amortized cost using the effective interest method.",
  "trap": "What excludes an instrument from this category is being quoted in an active market or being held for trading, not the length of its horizon.",
  "today": "IFRS 9 has absorbed this category into amortised cost. The measurement is unchanged; what has changed is that expected credit losses are recognised from the start, rather than only once a loss event has occurred."
 },
 {
  "cat": "Balance Sheet",
  "title": "Trade Receivables",
  "meaning": "Trade receivables originate from the operating activity of enterprises and account for cash to be received in the face of selling activity.",
  "how": "A company selling products for 100,000 in December, with 50% paid immediately, records revenues of 100,000 in the income statement, trade receivables of 50,000 and cash of 50,000 under assets.",
  "trap": "They are calculated at net realizable value, considering the probability that some customers will not pay. Since a precise calculation is impossible, enterprises use statistical methods based on historical values."
 },
 {
  "cat": "Balance Sheet",
  "title": "Inventories",
  "meaning": "Inventories are assets held in the ordinary course of business: finished goods produced for sale, work in progress generated in the production process, and materials and supplies consumed in production.",
  "how": "They are required to be stated at the lower end between cost and net realizable value. Cost comprises purchase costs (including taxes, transport and handling) net of trade discounts, conversion costs (fixed and variable manufacturing overheads) and other costs to bring inventories to their present location and condition.",
  "trap": "Net realizable value is the estimated selling price in the ordinary course of business less the estimated cost of completion and the estimated costs necessary to make the sale, so it is not simply the market price."
 },
 {
  "cat": "Balance Sheet",
  "title": "FIFO vs Weighted Average",
  "meaning": "The cost evaluation of inventories must take into account the sequence of use of goods. Two methods are allowed by IFRS: first in first out (FIFO) and weighted average.",
  "how": "Under FIFO the goods that leave the firm are those that have been in inventory the longest, so the inventory on hand is assumed to be the latest. Under weighted average the physical flow is ignored and each unit is valued at total costs of goods produced and bought divided by the quantity produced or bought in the period.",
  "trap": "LIFO (last in first out) is not permitted by IFRS: the logic that the goods leaving are those held for the shortest time is considered unrealistic."
 },
 {
  "cat": "Balance Sheet",
  "title": "Equity",
  "meaning": "IFRS defines equity as the residual interest in the assets of the enterprise after deducting all its liabilities. It reports all shareholders' rights.",
  "how": "It is organized in four categories: capital, reserves, profit or loss brought forward, and profit or loss for the year.",
  "trap": "Equity is a residual, not an independent valuation of the company: it follows from assets minus liabilities, and has no direct relation to market capitalization."
 },
 {
  "cat": "Balance Sheet",
  "title": "Capital and Par Value",
  "meaning": "Capital accounts for the portion of equity obtained directly by shareholders' provisions, made at the corporation's foundation or in subsequent periods.",
  "how": "Capital is reported at par (nominal) value, the value stated in the enterprise's charter and at which shares are offered initially. Under IFRS, capital is decreased by receivables from shareholders, shares issued but not fully paid, and treasury shares.",
  "trap": "Par value is unrelated to market value and to the issuing value at which shares may be put on the market in the future."
 },
 {
  "cat": "Balance Sheet",
  "title": "Reserves",
  "meaning": "Reserves are additional shareholders' rights generated during the normal operations of the company. Their types vary with national regulations.",
  "how": "The most common are: share premium reserves, arising when shares are sold above nominal value; the revaluation reserve, from fair value revaluation of assets; profit brought forward, from prior-year profit not distributed as dividends; and other reserves such as legal and statutory ones.",
  "trap": "In a share issue above par, the cash inflow is split in equity: the nominal portion goes to capital, the exceeding portion to the share premium reserve."
 },
 {
  "cat": "Balance Sheet",
  "title": "Liabilities",
  "meaning": "IFRS defines a liability as a present obligation arising from a past event, the settlement of which is expected to lead to an outflow of future economic benefits from the entity.",
  "how": "Among the items reported, three deserve attention: provisions for liabilities and charges, pensions and similar obligations, and financial liabilities.",
  "trap": "The obligation must already exist because of a past event. An intention to spend in the future, with no obligating event behind it, is not a liability."
 },
 {
  "cat": "Balance Sheet",
  "title": "Provisions",
  "meaning": "Provisions are a particular kind of liability characterized by an uncertain timing or amount.",
  "how": "Three conditions must hold for recognition: a present obligation has arisen as a result of a past (obligating) event, the cash outflow is probable (more likely than not), and the amount can be estimated reliably.",
  "trap": "All three conditions are required together. A possible but not probable outflow, or an amount that cannot be reliably estimated, does not produce a provision in the balance sheet."
 },
 {
  "cat": "Balance Sheet",
  "title": "Measuring Provisions",
  "meaning": "Because of their uncertain nature, provisions are based on estimations of the expenditure required to settle the present obligation at the balance sheet date.",
  "how": "One-off events, such as environmental cleanup or the settlement of a lawsuit, are measured at the most likely amount. Recurring events, such as warranties or customer refunds, are measured at a probability-weighted expected value, triangulating historical data with future forecasts.",
  "trap": "Both calculations are made at a discounted present value, using a pretax discount rate reflecting current market assessments of the time value of money and the risks specific to the liability."
 },
 {
  "cat": "Balance Sheet",
  "title": "Pensions: Defined Contribution vs Defined Benefit",
  "meaning": "Pensions and similar obligations account for postemployment benefit plans. IAS/IFRS distinguishes between defined contribution plans and defined benefit plans.",
  "how": "Under a defined contribution plan the enterprise pays fixed contributions into a fund and has no obligation to make further payments if the fund cannot pay all employees' claims. Under a defined benefit plan the company calculates the present value of future obligations, using actuarial assumptions to assess the value.",
  "trap": "The dividing line is where the risk sits: with a defined contribution plan the obligation stops at the contribution, with a defined benefit plan the company carries the future obligation."
 },
 {
  "cat": "Balance Sheet",
  "title": "Financial Liabilities",
  "meaning": "A financial liability is a contractual obligation to deliver cash or another financial asset to another entity under conditions that are potentially unfavorable to the entity.",
  "how": "IFRS recognizes two classes: financial liabilities at FVTPL (initial and subsequent measurement at fair value, variation to the income statement) and other financial liabilities (initial measurement at fair value plus transaction costs, then amortized cost using the effective interest method).",
  "trap": "The FVTPL class mirrors the asset side and includes liabilities held for trading, such as an obligation for securities borrowed in a short sale."
 },
 {
  "cat": "Income Statement",
  "title": "The Income Statement",
  "meaning": "The income statement, also labelled Profit and Loss Account, can be considered the summary of the economic flows that occurred during a reference accounting period.",
  "how": "IFRS requires a minimum set of items: revenue, gains and losses related to financial assets, finance costs, share of the profit or loss of associates and joint ventures, tax expenses, and a single amount for the total of discontinued items.",
  "trap": "It is built on accrual logic, like the balance sheet. Only the cash flow statement is prepared with cash logic."
 },
 {
  "cat": "Income Statement",
  "title": "By Nature vs By Function",
  "meaning": "Income statements can be presented in two different formats: by nature or by function.",
  "how": "The format by nature aggregates costs on the basis of what they are: raw materials and consumables used, employee benefits expense, depreciation and amortization, other operating expenses. The format by function analyses costs by their use in company activities: cost of sales, distribution costs, administrative expenses.",
  "trap": "Gross profit appears in the by-function format, right after revenue less cost of sales. Both formats converge on the same operating profit (EBIT)."
 },
 {
  "cat": "Income Statement",
  "title": "Continuing vs Discontinued Operations",
  "meaning": "Regardless of the format chosen, operations are divided into continuing and discontinuing, allowing the reader to clearly identify which activities will be retained by the company in future years.",
  "how": "The bottom part of the income statement reports revenues and costs from discontinued operations and gains or losses from asset disposals.",
  "trap": "Gains and losses on disposal are calculated as the difference between the selling value and the fair value of the assets at the moment of disposal."
 },
 {
  "cat": "Income Statement",
  "title": "Revenue Recognition",
  "meaning": "Revenues account for the sales of products and services according to the accrual principle. For their recognition under IFRS, property rights are not a sufficient condition.",
  "how": "For sales of goods all these conditions must be satisfied: the seller has transferred significant risks and rights over the goods, has no managerial involvement or control over them, the amount of revenue can be measured reliably, economic benefits are likely to flow to the seller, and related costs can be measured reliably.",
  "trap": "For services, similar conditions apply, but revenues are recognized by reference to the stage of completion of the transaction at the balance sheet date."
 },
 {
  "cat": "Income Statement",
  "title": "Operating Costs",
  "meaning": "Operating costs account for the resources used in the operating activities of the enterprise.",
  "how": "The main categories are: cost of raw materials, supplies and goods for resale, listed as consumption (materials purchased less the changes in inventory); cost of services; depreciation, amortization and changes in value of noncurrent assets; write-offs for durable loss of value recognized with the impairment test; finished goods and WIP variations; and employee benefit expenses including wages, social security contributions, staff indemnity and pension benefits.",
  "trap": "Materials appear as consumption, not as purchases: the inventory variation is what turns one into the other."
 },
 {
  "cat": "Income Statement",
  "title": "Operating Profit (EBIT)",
  "meaning": "The result of operating activities, addressed alternatively as operating profit, operating income or net operating income, and most commonly called earnings before interest and taxes (EBIT).",
  "how": "It is obtained as revenues minus operating costs, and it closes the section of the income statement devoted to operating activities, before any financial item.",
  "trap": "EBIT stops before interest and taxes by construction: finance costs and tax expense belong to the sections below it."
 },
 {
  "cat": "Income Statement",
  "title": "Financial Income and Charges",
  "meaning": "Below the operating section, the income statement lists income and charges related to financial activities.",
  "how": "These include profit from shares of profit of associates, investment revenues, write-off of financial assets from the impairment test, fair value variation of financial activities classified as FVTPL, and finance costs such as financial interests related to bank debt and bonds.",
  "trap": "Adding financial income and subtracting financial expenses to EBIT gives profit before taxes from continuing operations; subtracting taxes gives profit after taxes from continuing operations, and only then discontinued operations lead to net profit."
 },
 {
  "cat": "Income Statement",
  "title": "Assets Held for Sale",
  "meaning": "Discontinuing operations report income or losses due to assets held for sale.",
  "how": "An asset is held for sale when management is committed to a plan to sell, the asset is available for immediate sale, an active program to locate a buyer is initiated, the sale is highly probable within 12 months, the asset is actively marketed at a price reasonable in relation to its fair value, and it is unlikely the plan will be significantly changed or withdrawn.",
  "trap": "Merely intending to sell is not enough: the criteria require a committed plan, active marketing and a highly probable sale within 12 months."
 },
 {
  "cat": "Cash Flow",
  "title": "The Cash Flow Statement",
  "meaning": "The cash flow statement shows the capability of the enterprise to generate cash flow in a specific period.",
  "how": "Contrary to the balance sheet and the income statement, it is prepared with cash logic and not with accrual logic.",
  "trap": "This is the one statement where the accrual principle does not drive the numbers, which is why a profitable company can still show weak cash generation."
 },
 {
  "cat": "Cash Flow",
  "title": "Direct vs Indirect Method",
  "meaning": "IFRS allows two methods for presenting the cash flow statement: the direct method, encouraged by IAS/IFRS, and the indirect method.",
  "how": "The direct method shows each major class of gross cash receipts and gross cash payments. The indirect method starts from accrual results, usually operating profit or net profit, and adjusts them for the effects of noncash transactions.",
  "trap": "The indirect method is often adopted in practice precisely because it highlights the relation between accrual results and financial flows."
 },
 {
  "cat": "Cash Flow",
  "title": "Operating, Investing and Financing Activities",
  "meaning": "Regardless of the method chosen, the cash flow statement is divided into three categories of activities.",
  "how": "Operating activities refer to cash flows generated or employed in the current activities of the company, such as cash received from customers and cash paid to suppliers and employees. Investing activities are the acquisition and disposal of long-term assets and other investments that are not cash equivalents. Financing activities alter the equity capital and borrowing structure of the enterprise.",
  "trap": "Buying a machine is investing, not operating, even though the machine serves day-to-day production."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Notes to the Financial Statements",
  "meaning": "The annual report includes an additional compulsory document that is crucial for understanding the financial statements: the notes.",
  "how": "They must include information about the basis of preparation and the specific accounting policies used, additional information not presented in the four statements but relevant to understanding them, and any information required by IFRS that is not shown on the face of the statements.",
  "trap": "The notes are where the reader discovers which measurement method was adopted when a choice between the cost model and the fair value model was available."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Segmental Reporting",
  "meaning": "IFRS requires enterprises to report financial and descriptive information about their reportable segments, which are operating segments or aggregations of operating segments.",
  "how": "Segments refer either to specific businesses (business segments) or to specific geographical areas (geographical segments). Segmental reporting must include important financial information such as sales, results, assets, liabilities, depreciation and noncash expenses other than depreciation.",
  "trap": "A worked example is the Volkswagen Group 2012 annual report, which splits its income statement into the Automotive and Financial Services divisions."
 },
 {
  "cat": "Cost Basics",
  "title": "Cost and Cost Object",
  "meaning": "Cost is the monetary measure of the resources sacrificed or forgone to achieve a specific objective. That objective is called the cost object.",
  "how": "The cost object can be a product (a T-shirt), a service (a dinner at a restaurant), a project (a cruise ship) or an organizational unit (the production department). Yarn and buttons are costs of the T-shirt; food, wine and waiters are costs of the restaurant service.",
  "trap": "In accounting the word cost is never used as a stand-alone entity. It always carries an adjective — fixed, direct, product — that says which classification is in play."
 },
 {
  "cat": "Cost Basics",
  "title": "What Cost Accounting Is",
  "meaning": "The set of rules and systems devoted to computing and distributing enterprise costs.",
  "how": "It serves three purposes: calculating the costs of products, services and projects for profitability analysis or inventory valuation; assigning costs to organizational units; and supporting short-term decision making, such as make or buy.",
  "trap": "It is one discipline with three purposes, not three separate systems. Which classification you reach for depends on which purpose you are serving."
 },
 {
  "cat": "Cost Basics",
  "title": "Internal Accountability",
  "meaning": "Cost accounting provides information to managers inside the organization, so it supports internal accountability.",
  "how": "Financial accounting is the opposite case: it exists for external accountability, providing information to decision makers outside the company.",
  "trap": "The two are not competing views of the same numbers. They answer to different audiences, which is exactly why one is regulated and the other is not."
 },
 {
  "cat": "Cost Basics",
  "title": "Cost Accounting Is Nonregulated",
  "meaning": "Because it serves internal decision makers, cost accounting is not governed by international accounting standards that enterprises must adopt.",
  "how": "General rules and techniques can be identified, and this is what the discipline teaches. Each enterprise then customizes the approach on the basis of its own needs.",
  "trap": "Nonregulated does not mean there are no rules. What is absent is the obligation to follow a common standard, not method itself."
 },
 {
  "cat": "Cost Basics",
  "title": "Which Classification for Which Purpose",
  "meaning": "The three cost classifications are not interchangeable: each serves a different purpose of cost accounting.",
  "how": "Direct versus indirect and product versus period are used to compute the cost of a product or service and to assign resources to organizational units. Fixed versus variable, along with avoidable versus nonavoidable, supports short-term decision making.",
  "trap": "Reaching for fixed and variable when the question is how to value a product, or for direct and indirect when the question is whether to accept an extra order, is the classic mismatch."
 },
 {
  "cat": "Cost Classification",
  "title": "Direct Costs",
  "meaning": "Costs that can be specifically and exclusively identified with a particular cost object.",
  "how": "Direct material covers the physical components used for realizing a single unit; direct labor covers employees physically involved in realizing one unit, whose time per unit can be identified. Building a cruise ship makes metal, labor and furniture all direct.",
  "trap": "Being direct is not a property of the resource itself. The same resource can be direct or indirect depending on the cost object chosen."
 },
 {
  "cat": "Cost Classification",
  "title": "Indirect Costs and Overhead",
  "meaning": "Costs that cannot be identified specifically and exclusively with a given cost object, because they are caused by two or more cost objects jointly. They are also called overhead (OVH).",
  "how": "Plant depreciation is indirect for a bottle of water: it cannot be associated exclusively with one unit. On large projects the depreciation of fabrication and assembly shops is shared by more than one ship.",
  "trap": "Indirect says nothing about size. Overhead can dominate the cost structure and still be impossible to trace to a single unit."
 },
 {
  "cat": "Cost Classification",
  "title": "The Cost Object Decides",
  "meaning": "Whether a resource is direct or indirect cannot be settled a priori. It depends on the cost object.",
  "how": "A department making T-shirts has one production machine, four direct workers and one supervisor. If the cost object is the T-shirt, only the direct workers are direct. If the cost object is the production department, machine, workers and supervisor are all direct, because the department absorbs them specifically.",
  "trap": "The supervisor is indirect for the product and direct for the department. Same resource, different answer — always ask what the cost object is before classifying."
 },
 {
  "cat": "Cost Classification",
  "title": "Manufacturing and Nonmanufacturing Overhead",
  "meaning": "Overhead splits according to whether it belongs to the production process.",
  "how": "Manufacturing OVH is indirect cost related to production: machine depreciation, energy consumption, machine maintenance. Everything that does not enter the production process is nonmanufacturing OVH, such as marketing, administrative and commercial expenses.",
  "trap": "This split is not cosmetic: it is what decides whether a piece of overhead is a product cost or a period cost."
 },
 {
  "cat": "Cost Classification",
  "title": "Product Costs",
  "meaning": "The value of resources used for producing a product or delivering a service.",
  "how": "They comprise direct materials (raw materials and components traceable to a single product), direct labor (costs incurred in bringing the product into its current condition and location) and manufacturing overheads.",
  "trap": "Manufacturing overhead is a product cost even though it is indirect. Product cost and direct cost are not synonyms."
 },
 {
  "cat": "Cost Classification",
  "title": "Period Costs",
  "meaning": "The value of resources used in activities that cannot be directly associated with the manufacturing activity or service delivery.",
  "how": "Typical examples are selling and marketing expenses, research and development expenses, and administrative and general expenses.",
  "trap": "Period costs are exactly the nonmanufacturing overheads. If you can name a cost as nonmanufacturing OVH, you have already classified it as a period cost."
 },
 {
  "cat": "Cost Classification",
  "title": "How the Two Classifications Meet",
  "meaning": "Direct costs are always product costs. Indirect costs can be either product or period costs.",
  "how": "What settles it for an indirect cost is its contribution to realizing the product: manufacturing overheads are product costs, nonmanufacturing overheads are period costs.",
  "trap": "There is no direct period cost in this scheme. If a cost is traceable to the product, it belongs to the product."
 },
 {
  "cat": "Cost Classification",
  "title": "Variable Costs",
  "meaning": "Resources that vary, in total, directly and proportionately with the variation of volume or, more generally, the level of activity.",
  "how": "Organizing a party in a rented villa, food, drink and entry tickets rise proportionally with the number of guests attending.",
  "trap": "The definition is about the total. Per unit a variable cost is constant, which is the reverse of how a fixed cost behaves."
 },
 {
  "cat": "Cost Classification",
  "title": "Fixed Costs",
  "meaning": "Resources that, in total, do not vary with the volume or activity level. They are also called nonvariable costs.",
  "how": "Renting the villa and hiring the boy band cost the same amount whatever the number of guests who turn up.",
  "trap": "Fixed in total means falling per unit as volume grows. Quoting a fixed cost per unit without saying at what volume is meaningless."
 },
 {
  "cat": "Cost Classification",
  "title": "Semivariable Costs",
  "meaning": "Costs that combine variable- and fixed-cost items in one figure.",
  "how": "A promoter paid a fixed fee plus a commission for every guest brought to the party. In a manufacturing process, utilities are the standard case: a monthly charge as the fixed component plus a part depending on the activity level.",
  "trap": "A semivariable cost is not a cost that happens to sit between the two. It has two identifiable components, and the analysis works by separating them."
 },
 {
  "cat": "Cost Classification",
  "title": "Simulating Costs at Different Volumes",
  "meaning": "The reason the fixed and variable split matters: it lets you estimate total cost at any activity level.",
  "how": "For the party, you compute total cost for different numbers of guests. That tells you whether the party is feasible, and what entry price covers your expenses.",
  "trap": "This is decision support, not product costing. It answers what happens if the volume changes, which the other classifications cannot."
 },
 {
  "cat": "Cost Configurations",
  "title": "The Two Decisions",
  "meaning": "Assigning costs to cost objects involves two decisions: the selection of the cost configuration and the definition of the allocation methodology.",
  "how": "The configuration decides which resources to include in the value of the object. The methodology decides how those resources get onto it.",
  "trap": "They are separate choices made in order. Picking a method before deciding what belongs in the cost is putting the cart before the horse."
 },
 {
  "cat": "Cost Configurations",
  "title": "Prime Cost",
  "meaning": "The configuration associated with a product's direct costs only: direct material and direct labor.",
  "how": "For a T-shirt, prime cost is the value of raw materials and direct labor, and nothing else.",
  "trap": "Precise but incomplete: every indirect resource is left out of the value of the final product."
 },
 {
  "cat": "Cost Configurations",
  "title": "Full Manufacturing Cost",
  "meaning": "The configuration that assigns all product costs to the final product: direct material, direct labor and manufacturing overheads.",
  "how": "On top of prime cost it brings in machine depreciation, energy and electricity, and the supervisors of the production process.",
  "trap": "It stops at the factory gate. Commercial and administrative expenses are nonmanufacturing overhead and stay out."
 },
 {
  "cat": "Cost Configurations",
  "title": "Full Cost",
  "meaning": "The configuration that associates all costs, both product and period, to products.",
  "how": "Everything in full manufacturing cost, plus nonmanufacturing overhead such as commercial and administrative expenses.",
  "trap": "Complete, and for that very reason the least precise: the more shared resources you bring in, the more approximations you introduce."
 },
 {
  "cat": "Cost Configurations",
  "title": "Completeness Against Precision",
  "meaning": "The trade-off behind the choice of configuration, which is a managerial choice rather than a rule.",
  "how": "Prime cost traces costs to the object most precisely but leaves indirect resources out. Full cost considers every resource involved but needs hypotheses to spread shared ones.",
  "trap": "More complete is not more accurate. Adding overhead adds coverage and subjectivity at the same time, and the value of the T-shirt under the two configurations will be very different."
 },
 {
  "cat": "Cost Configurations",
  "title": "Tracing Against Allocating",
  "meaning": "Direct costs are traced to the cost object; indirect costs are allocated to it.",
  "how": "With a good information system in place there is no subjectivity in tracing: if raw material is €3 per T-shirt and labor €2 per T-shirt, the direct cost of one T-shirt is €5. Allocation instead means making a hypothesis about the consumption of joint resources.",
  "trap": "Allocation is the word reserved for indirect costs. Saying a direct cost is allocated hides the fact that it could simply be traced."
 },
 {
  "cat": "Cost Configurations",
  "title": "The Allocation Process",
  "meaning": "The sequence that carries indirect costs onto a cost object.",
  "how": "Calculate the amount of overhead to be allocated; choose an allocation basis, a metric used as a proxy for resource consumption; calculate the value the basis takes in the period; calculate the allocation coefficient by dividing overhead by the total value of the basis; then assign to each product the coefficient multiplied by the value the basis takes for that product.",
  "trap": "The coefficient is computed once, on the total of the basis across all products. Dividing overhead by a single product's basis is the usual slip."
 },
 {
  "cat": "Cost Configurations",
  "title": "Choosing the Allocation Basis",
  "meaning": "A metric used as a proxy for the consumption of the indirect resource being spread.",
  "how": "For production machinery the common bases are the number of units produced or the production time. In job order costing, labor cost or time and machine time are typical.",
  "trap": "The basis is a hypothesis about consumption, not a measurement of it. A different defensible basis gives a different product cost with the same underlying data."
 },
 {
  "cat": "Cost Configurations",
  "title": "Proportional Allocation Worked Through",
  "meaning": "The allocation that apportions indirect costs on proportional criteria, using one basis for the whole overhead pool.",
  "how": "Textile makes ties and scarves on a shared machine. Machine depreciation €90,000 plus machinery supervisor €50,000 gives €140,000 of overhead. Ties: 10,000 units at 30 min each is 300,000 min; scarves: 20,000 units at 20 min each is 400,000 min; 700,000 min in total. The coefficient is €140,000 / 700,000 min = €0.20/min, so each tie absorbs €6 and each scarf €4.",
  "trap": "The per-unit charge follows the basis, not the number of units: scarves are twice as numerous but absorb less overhead each, because each one takes less machine time."
 },
 {
  "cat": "Allocation Methods",
  "title": "The Four Methods, Ranked by Precision",
  "meaning": "Process costing, operation costing, job order costing and activity-based costing all allocate direct and indirect costs, so they can serve full cost and full manufacturing cost configurations. They differ in precision.",
  "how": "Process costing uses proportional criteria for direct material, direct labor and overhead alike. Operation costing traces direct material on cause-effect criteria. Job order costing traces both direct material and direct labor, and allocates overhead proportionally. ABC also allocates overhead on cause-effect criteria.",
  "trap": "The ranking follows how much is traced rather than allocated: process, then operation, then job order, then ABC. Only ABC changes how overhead itself is handled."
 },
 {
  "cat": "Allocation Methods",
  "title": "Process Costing",
  "meaning": "The simplest and least expensive method in terms of data collection and analysis: every cost, direct material, labor and overhead, is allocated with proportional criteria.",
  "how": "The unit cost is the ratio between total costs and the units of output produced.",
  "trap": "Its cheapness is the whole point, and so is its imprecision. Nothing is traced, so two products that consume resources very differently still end up with the same treatment."
 },
 {
  "cat": "Allocation Methods",
  "title": "Equivalent Units",
  "meaning": "The number of finished products a company could have realized using the resources employed for work in progress and finished goods.",
  "how": "Neq = Qc + Qwip x dcWip, where Qc is the completed quantity, Qwip the work in progress quantity and dcWip the degree of completion. Unit cost then divides total costs by Neq rather than by units produced.",
  "trap": "Equivalent units are not a count of physical items. Work in progress enters the figure scaled down by how far it has travelled."
 },
 {
  "cat": "Allocation Methods",
  "title": "Degree of Completion",
  "meaning": "The percentage of total costs a product in process has already absorbed, relative to the total absorbed by a finished product.",
  "how": "It is what qualifies work in progress when costs are computed over a month or a week rather than for a whole finished batch. It converts partial work into equivalent units and values the closing work in progress.",
  "trap": "It measures absorbed cost, not elapsed time or physical progress. A unit halfway through the calendar is not automatically 50% complete."
 },
 {
  "cat": "Allocation Methods",
  "title": "Initial Inventories: Average and FIFO",
  "meaning": "When opening work in progress exists, process costing changes depending on whether products and work in progress are valued at weighted-average cost or FIFO.",
  "how": "Under average cost logic the cost of the initial work in progress is added to the costs incurred in the period, and equivalent units sum the completed units and the ending work in progress. Under FIFO, allocation covers only the resources sustained during the period, so the opening work in progress is subtracted from the equivalent units: Neq = Qc + WIPending x dcEnding - WIPinitial x dcInitial.",
  "trap": "The two methods differ on both sides of the ratio. Changing the equivalent units without asking which costs belong in the numerator is where the confusion starts."
 },
 {
  "cat": "Allocation Methods",
  "title": "Where Process Costing Fits",
  "meaning": "It suits homogenous production, where a few similar products or services are processed on a large scale.",
  "how": "It is typical of enterprises with continuous production processes such as chemicals and oil, and of companies with large batch production where the unit value of the product is usually low.",
  "trap": "When variations in products and processes increase, the equivalence coefficient becomes hard to calculate, and the method stops being the cheap option it was chosen for."
 },
 {
  "cat": "Allocation Methods",
  "title": "Job Order Costing",
  "meaning": "The method that takes the job as the element for cost allocation and tracing. A job is a single unit of a product, such as a machine, or a batch of many units, such as a batch of pencil coils.",
  "how": "Direct material is traced to the job according to consumption; direct labor is traced on the basis of completed operations; overhead is allocated with proportional criteria using an allocation basis such as labor cost or time, or machine time.",
  "trap": "Even here overhead is still allocated proportionally. What job order costing improves on is the tracing of the two direct components, not the treatment of overhead."
 },
 {
  "cat": "Allocation Methods",
  "title": "The Job Order Sheet",
  "meaning": "The document associated with each job across the whole production process, on which incurred costs are registered.",
  "how": "It records direct material, direct labor and overhead, each with date, code, quantity and unit price, building up the total cost of the job as work proceeds.",
  "trap": "The sheet is what makes the method precise and also what makes it time-consuming; information technology has cut the cost of that data collection considerably."
 },
 {
  "cat": "Allocation Methods",
  "title": "Where Job Order Costing Fits",
  "meaning": "It is suggested when direct material and direct labor are significant in their incidence on final product cost.",
  "how": "Enterprises operating with large orders or with small batches have potential benefits. In discrete processes, companies should weigh the benefit of more precise information against the cost of collecting and analysing the data.",
  "trap": "It is not appropriate for continuous cycles, where a job simply cannot be identified. On a large scale with low unit values, the data collection can cost more than the product is worth."
 },
 {
  "cat": "Allocation Methods",
  "title": "Operation Costing",
  "meaning": "A system sitting between job order costing and process costing.",
  "how": "Direct material costs are traced to products as in job order costing, while conversion costs — direct labor plus overhead — are allocated proportionally as in process costing. The unit of analysis is the operation, a homogenous phase within the transformation process; the most frequent bases are the quantity produced and the operation duration.",
  "trap": "Only direct material is traced. Direct labor moves back into the proportionally allocated pool, which is what separates this method from job order costing."
 },
 {
  "cat": "Allocation Methods",
  "title": "Activity-Based Costing",
  "meaning": "The method that puts activities at an intermediate level in the allocation, as a response to spreading indirect costs proportionally through a single allocation basis.",
  "how": "Overhead is first divided among the activities that cause its consumption, then each activity gets its own driver and its own coefficient, and only then is it apportioned to the cost objects.",
  "trap": "The gain is on overhead alone. Direct material and direct labor are traced under job order costing too — ABC is the only method that refuses a single basis for the indirect pool."
 },
 {
  "cat": "Allocation Methods",
  "title": "The Six ABC Steps",
  "meaning": "The sequence ABC follows from overhead to cost object.",
  "how": "Identify the indirect costs to allocate, the cost pool; identify the activities that determine their consumption; divide overhead among those activities; define an activity driver for each, an indicator explaining the consumption of that activity; calculate an allocation coefficient per activity by dividing activity cost by its driver; apportion activity costs to each cost object using those coefficients.",
  "trap": "There are two divisions, not one: overhead is split across activities first, and only then across products. Collapsing them back into a single step is ordinary proportional allocation again."
 },
 {
  "cat": "Allocation Methods",
  "title": "ABC Worked Through",
  "meaning": "The Textile case, allocating the year's machine depreciation of €90,000 with ABC instead of a single basis.",
  "how": "The machine runs two activities: production, 700,000 min in total, and setup, 50,000 min, one setup before ties and one before scarves. Spread over 750,000 min the coefficient is €0.12/min, giving €84,000 to production and €6,000 to setup. Production is then driven by time (€0.12/min) and setup by the number of setups (€6,000 / 2 = €3,000 per setup). Ties take €36,000 + €3,000 = €39,000, or €3.90 a unit; scarves €48,000 + €3,000 = €51,000, or €2.55 a unit.",
  "trap": "Setup cost splits equally because each product needed one setup, not because the volumes are equal. That is precisely what a proportional allocation on machine time would have missed."
 },
 {
  "cat": "Allocation Methods",
  "title": "Where ABC Fits",
  "meaning": "It is suggested when the incidence of overhead is high and those indirect resources are absorbed by heterogeneous activities.",
  "how": "In that situation a single allocation basis cannot provide realistic information on how overhead is consumed, because different activities are driven by different things.",
  "trap": "The choice of activity drivers is arbitrary and usually depends on the data available. ABC narrows the subjectivity of allocation; it does not eliminate it."
 }
];

const QUESTIONS = [
 {
  "cat": "Principles",
  "title": "Accrual vs Cash Timing",
  "question": "On 18 December Year 1, a software company signs a contract and delivers a perpetual licence to a client, transferring all significant risks and rights at that moment. The invoice is issued the same day for 240,000, and the client pays in full on 20 January Year 2. The company closes its accounting year on 31 December. How should this transaction be treated?",
  "options": {
   "A": "Revenue of 240,000 in Year 2, when the cash is received, with no entry in Year 1.",
   "B": "Revenue of 240,000 in Year 1 and a cash inflow of 240,000 in Year 2.",
   "C": "Revenue of 120,000 in Year 1 and 120,000 in Year 2, split across the two periods.",
   "D": "Revenue of 240,000 in Year 1 and a cash inflow of 240,000 in Year 1."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This applies cash logic to the income statement. Under the accrual principle revenue is recognized when the transaction takes effect, which here is the December delivery, not when cash arrives.",
   "B": "Correct. The accrual event is December of Year 1, when the licence is delivered and the significant risks and rights are transferred, so revenue belongs to Year 1. The cash event is January of Year 2, so the cash inflow of 240,000 appears in Year 2.",
   "C": "Incorrect. There is no basis for splitting the amount: the transfer of risks and rights happens entirely in December of Year 1, and the payment happens entirely in January of Year 2.",
   "D": "Incorrect. The revenue timing is right but the cash timing is not: no cash is received in Year 1, so the cash inflow cannot be recorded there."
  },
  "recap": "Correct. The accrual event is December of Year 1, when the licence is delivered and the significant risks and rights are transferred, so revenue belongs to Year 1. The cash event is January of Year 2, so the cash inflow of 240,000 appears in Year 2."
 },
 {
  "cat": "Principles",
  "title": "Fair Value vs Cost Model",
  "question": "Company A owns a plot of land initially bought for 800,000. Three years later the market value of the land is 870,000. Land is not depreciated. What is the value in the balance sheet under the two measurement models?",
  "options": {
   "A": "800,000 under the cost method and 870,000 under the fair value method.",
   "B": "870,000 under both methods, since IFRS always requires the market value.",
   "C": "800,000 under both methods, since the revaluation is only recognized on sale.",
   "D": "870,000 under the cost method and 800,000 under the fair value method."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Adopting the cost method, the value of the land remains at 800,000 and the revaluation is not counted. Adopting the fair value method, the land is revalued and included in the balance sheet at 870,000.",
   "B": "Incorrect. IFRS does not always require fair value: it is an alternative to the cost method, and where the option exists the company chooses and discloses its choice in the notes.",
   "C": "Incorrect. This describes only the cost method. Under the fair value method the revaluation is recognized in the balance sheet without waiting for a sale.",
   "D": "Incorrect. The two values are swapped: the cost method keeps the historical 800,000, while the fair value method brings the asset to 870,000."
  },
  "recap": "Correct. Adopting the cost method, the value of the land remains at 800,000 and the revaluation is not counted. Adopting the fair value method, the land is revalued and included in the balance sheet at 870,000."
 },
 {
  "cat": "Principles",
  "title": "Benchmark vs Allowed Treatment",
  "question": "The notes of a company state that, for a category where IFRS permits a choice, management has applied the allowed treatment rather than the benchmark treatment. How should a reader interpret this?",
  "options": {
   "A": "The company has breached IFRS and the statements are not compliant.",
   "B": "The company has applied the preferred IFRS criteria for that category.",
   "C": "The company has applied the legitimate alternative criteria, while the benchmark treatment is the preferred one.",
   "D": "The terminology has no accounting meaning and only concerns internal reporting."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The allowed treatment is one of the options IFRS itself makes available; applying it does not make the financial statements non-compliant.",
   "B": "Incorrect. The preferred criteria is called the benchmark treatment. The allowed treatment is the alternative to it.",
   "C": "Correct. Benchmark treatment indicates the preferred accounting criteria for a specific category, while allowed treatment is the possible legitimate alternative for that category.",
   "D": "Incorrect. The distinction is an IFRS concept about which accounting criteria are preferred and which are permitted alternatives, and the choice must be disclosed in the notes."
  },
  "recap": "Correct. Benchmark treatment indicates the preferred accounting criteria for a specific category, while allowed treatment is the possible legitimate alternative for that category."
 },
 {
  "cat": "Principles",
  "title": "Purpose of the Impairment Test",
  "question": "A manufacturer reviews its assets at year end and finds that a production line has suffered a durable loss of value that will not be recovered. Which mechanism captures this, and how does it differ from depreciation?",
  "options": {
   "A": "The impairment test, which identifies an unrecoverable loss of value; depreciation instead allocates cost systematically over useful life.",
   "B": "Depreciation, which is precisely the tool for unrecoverable losses of value.",
   "C": "The impairment test, which replaces depreciation for the remaining useful life of the asset.",
   "D": "The revaluation model, which is the only way to reduce the carrying value of an asset."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. IFRS requires companies to review all assets for any indication of unrecoverable loss of their value, and this assessment is the impairment test. Depreciation is a different mechanism: it is the systematic reduction of value due to use, age or obsolescence over the asset's useful life.",
   "B": "Incorrect. Depreciation reflects use, age and obsolescence spread across useful life; it is not the instrument for recognizing a specific durable loss of value.",
   "C": "Incorrect. The impairment test does not replace depreciation: an asset that is impaired continues to be depreciated over its remaining useful life.",
   "D": "Incorrect. The revaluation model is a measurement option based on fair value; the specific mechanism for identifying unrecoverable losses is the impairment test."
  },
  "recap": "Correct. IFRS requires companies to review all assets for any indication of unrecoverable loss of their value, and this assessment is the impairment test. Depreciation is a different mechanism: it is the systematic reduction of value due to use, age or obsolescence over the asset's useful life.",
  "today": "IAS 36 puts it as carrying amount against recoverable amount, the higher of fair value less costs of disposal and value in use, and allows the loss to be reversed later for assets other than goodwill."
 },
 {
  "cat": "Principles",
  "title": "Compulsory Documents under IFRS",
  "question": "Which set of documents does IFRS make compulsory within the annual report?",
  "options": {
   "A": "Balance sheet, income statement and cash flow statement only.",
   "B": "Balance sheet, income statement, cash flow statement and statement of changes in equity, plus the notes to the financial statements.",
   "C": "Balance sheet, income statement, cash flow statement, statement of changes in equity and the corporate social responsibility report.",
   "D": "Balance sheet and income statement, with the other documents left to the company's discretion."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This omits the statement of changes in equity, which details variations in equity through the year, and the notes.",
   "B": "Correct. IFRS requires four financial statements — balance sheet, income statement, cash flow statement and statement of changes in equity — and in addition the notes, which explain the rules followed and the choices made in preparing them.",
   "C": "Incorrect. Environmental, corporate and social responsibility reports are published by many enterprises but they are not part of the compulsory financial reporting set.",
   "D": "Incorrect. All four statements are compulsory, not just two, and the notes are compulsory as well."
  },
  "recap": "Correct. IFRS requires four financial statements — balance sheet, income statement, cash flow statement and statement of changes in equity — and in addition the notes, which explain the rules followed and the choices made in preparing them."
 },
 {
  "cat": "Principles",
  "title": "Costs That Cannot Be Matched to Revenues",
  "question": "A company incurs general administrative costs during the year that cannot be reasonably related to any specific revenue. Under the accrual principle, how are they treated?",
  "options": {
   "A": "They are capitalized as an asset until a related revenue is identified.",
   "B": "They are attributed directly to the accounting period in which they are paid.",
   "C": "They are spread evenly over the following five accounting periods.",
   "D": "They are excluded from the income statement and reported only in the notes."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Administrative costs of the period are not resources generating identifiable future inflows, so they are not capitalized as assets waiting for a matching revenue.",
   "B": "Correct. Costs are normally registered in the financial year of the revenues they relate to, but when they cannot be reasonably related to revenues, as with administrative costs, they are attributed directly to the accounting period in which they are paid.",
   "C": "Incorrect. There is no rule spreading unmatched administrative costs across future periods; they belong to the period concerned.",
   "D": "Incorrect. They are ordinary operating costs of the period and appear in the income statement, not only as a note disclosure."
  },
  "recap": "Correct. Costs are normally registered in the financial year of the revenues they relate to, but when they cannot be reasonably related to revenues, as with administrative costs, they are attributed directly to the accounting period in which they are paid.",
  "today": "IAS 1 (paragraphs 27-28) extends accrual accounting to unmatched costs too: they belong to the period they relate to, which is usually but not necessarily the period of payment."
 },
 {
  "cat": "Balance Sheet",
  "title": "Current vs Noncurrent Classification",
  "question": "At year end a company holds: (1) raw material inventories expected to be used in three months, (2) a production machine with a ten-year life, (3) a bank loan due in eight months, (4) a bond repayable in six years. How are these classified?",
  "options": {
   "A": "(1) current asset, (2) noncurrent asset, (3) current liability, (4) noncurrent liability.",
   "B": "(1) noncurrent asset, (2) noncurrent asset, (3) current liability, (4) current liability.",
   "C": "(1) current asset, (2) current asset, (3) noncurrent liability, (4) noncurrent liability.",
   "D": "(1) current asset, (2) noncurrent asset, (3) noncurrent liability, (4) current liability."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Inventories used within the operating cycle or 12 months are current assets; a ten-year production machine is a noncurrent asset; a loan due within 12 months is a current liability; a bond repayable in six years is a noncurrent liability.",
   "B": "Incorrect. Inventories consumed within three months sit clearly within the 12-month horizon, so they are current assets, and a six-year bond is not due within 12 months.",
   "C": "Incorrect. A machine with a ten-year life is retained well beyond the operating cycle, making it noncurrent, and a loan due in eight months falls inside the 12-month horizon.",
   "D": "Incorrect. The two liabilities are inverted: the eight-month loan is current and the six-year bond is noncurrent."
  },
  "recap": "Correct. Inventories used within the operating cycle or 12 months are current assets; a ten-year production machine is a noncurrent asset; a loan due within 12 months is a current liability; a bond repayable in six years is a noncurrent liability."
 },
 {
  "cat": "Balance Sheet",
  "title": "Straight-Line Depreciation",
  "question": "A company buys a machine on 1 January for 24,000, to be used immediately in manufacturing. Its useful life is 8 years and it is worthless at the end of that period. The company applies the straight-line method. What is the yearly depreciation, and what is the net book value at the end of Year 3?",
  "options": {
   "A": "Yearly depreciation 3,000; net book value at the end of Year 3 equal to 15,000.",
   "B": "Yearly depreciation 3,000; net book value at the end of Year 3 equal to 9,000.",
   "C": "Yearly depreciation 8,000; net book value at the end of Year 3 equal to 0.",
   "D": "Yearly depreciation 2,400; net book value at the end of Year 3 equal to 16,800."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Straight-line depreciation apportions the value in equal parts over useful life: 24,000 / 8 = 3,000 per year. After three years the accumulated depreciation is 9,000, so the net book value (written down value) is 24,000 − 9,000 = 15,000.",
   "B": "Incorrect. 9,000 is the accumulated depreciation after three years, not the net book value; the net book value is what remains of the original 24,000 after subtracting it.",
   "C": "Incorrect. This divides by a wrong number of years: the useful life is 8 years, so the annual charge is 3,000, and the asset is not fully depreciated after three years.",
   "D": "Incorrect. 2,400 would correspond to a ten-year useful life; here the useful life is stated as 8 years."
  },
  "recap": "Correct. Straight-line depreciation apportions the value in equal parts over useful life: 24,000 / 8 = 3,000 per year. After three years the accumulated depreciation is 9,000, so the net book value (written down value) is 24,000 − 9,000 = 15,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "Depreciation, Land and Idle Assets",
  "question": "Which statement about depreciation is correct under IFRS?",
  "options": {
   "A": "Depreciation is a cash expense that reduces both profit and cash at the same time.",
   "B": "All items of PPE, land included, must be depreciated over their useful life.",
   "C": "Depreciation stops as soon as an asset becomes idle, and land is never depreciated.",
   "D": "Depreciation continues even if the asset is idle, and land is the exception that is not depreciated."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Depreciation is explicitly a noncash expense: it reduces the value of the asset and profit, but no cash leaves the company for it.",
   "B": "Incorrect. Land is the exception: with the exception of land, PPE must be depreciated.",
   "C": "Incorrect about idle assets. Depreciation begins when the asset is available for use and continues until the asset is derecognized, even if it is idle.",
   "D": "Correct. Depreciation runs from when the asset is available for use until it is derecognized, even during idle periods, and land is the one item of PPE that is not depreciated."
  },
  "recap": "Correct. Depreciation runs from when the asset is available for use until it is derecognized, even during idle periods, and land is the one item of PPE that is not depreciated."
 },
 {
  "cat": "Balance Sheet",
  "title": "Attributes of an Intangible Asset",
  "question": "A company is assessing whether an item qualifies as an intangible asset under IFRS. Which three critical attributes must be present?",
  "options": {
   "A": "Identifiability, control, and the existence of future economic benefits.",
   "B": "Physical substance, identifiability, and a finite useful life.",
   "C": "Legal ownership, an active market, and an indefinite useful life.",
   "D": "Identifiability, legal ownership, and immediate cash generation."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. IFRS defines intangible assets as identifiable nonmonetary assets without physical substance, and their three critical attributes are identifiability, control (the power to obtain benefits from the asset) and the existence of future economic benefits such as revenues or reduced future costs.",
   "B": "Incorrect. Intangible assets are by definition without physical substance, and they may have either a finite or an indefinite life.",
   "C": "Incorrect. An active market matters only for applying the revaluation model, and an indefinite useful life is a possible feature, not a requirement.",
   "D": "Incorrect. What is required is control rather than legal ownership, and the benefits are future economic benefits, which may also take the form of reduced future costs rather than immediate cash."
  },
  "recap": "Correct. IFRS defines intangible assets as identifiable nonmonetary assets without physical substance, and their three critical attributes are identifiability, control (the power to obtain benefits from the asset) and the existence of future economic benefits such as revenues or reduced future costs."
 },
 {
  "cat": "Balance Sheet",
  "title": "Goodwill and the Annual Impairment Test",
  "question": "A group acquires a company paying more than the fair value of the acquired resources net of liabilities. How is the resulting goodwill treated in subsequent years?",
  "options": {
   "A": "It is amortized on a straight-line basis over a maximum of five years.",
   "B": "It is subject to an impairment test every year, and any loss of value is credited in the income statement.",
   "C": "It is revalued annually to fair value with the variation credited to the revaluation reserve.",
   "D": "It remains at its original amount and is only adjusted when the acquired business is sold."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Goodwill has an indefinite life, so it does not follow the amortization logic used for intangibles with a finite life such as patents.",
   "B": "Correct. Goodwill is the difference between acquisition cost and the purchaser's participation in the fair value of assets less liabilities. Because of its indefinite nature, IFRS requires an impairment test every year, and the loss of its value is credited in the income statement.",
   "C": "Incorrect. Goodwill is not routinely revalued upwards to fair value through the revaluation reserve; what IFRS mandates is the annual test for loss of value.",
   "D": "Incorrect. Waiting for a disposal would ignore the compulsory annual impairment test that IFRS requires precisely because the asset has an indefinite life."
  },
  "recap": "Correct. Goodwill is the difference between acquisition cost and the purchaser's participation in the fair value of assets less liabilities. Because of its indefinite nature, IFRS requires an impairment test every year, and the loss of its value is credited in the income statement.",
  "today": "Under IAS 36 the loss is charged against the profit of the year, and goodwill is the one asset whose impairment can never be reversed."
 },
 {
  "cat": "Balance Sheet",
  "title": "Where Fair Value Variations Land",
  "question": "A company holds two portfolios: one of derivatives held for trading (classified at fair value through profit or loss) and one of nonderivative assets designated on initial recognition as available for sale. Both are measured at fair value after acquisition. Where does the balance of the fair value variation go in each case?",
  "options": {
   "A": "To the income statement for both portfolios.",
   "B": "To the revaluation reserve for both portfolios.",
   "C": "To the income statement for the FVTPL portfolio and to the revaluation reserve for the available-for-sale portfolio.",
   "D": "To the revaluation reserve for the FVTPL portfolio and to the income statement for the available-for-sale portfolio."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Only the FVTPL category sends its fair value variation to the income statement; the available-for-sale category does not.",
   "B": "Incorrect. Only the available-for-sale category sends its fair value variation to the revaluation reserve; FVTPL variations hit profit.",
   "C": "Correct. Both categories are measured at fair value after acquisition, but the destination of the variation differs: FVTPL variations go to the income statement, while available-for-sale variations go to the revaluation reserve in equity.",
   "D": "Incorrect. The two destinations are inverted: trading assets at FVTPL affect profit, while available-for-sale assets affect the revaluation reserve."
  },
  "recap": "Correct. Both categories are measured at fair value after acquisition, but the destination of the variation differs: FVTPL variations go to the income statement, while available-for-sale variations go to the revaluation reserve in equity.",
  "today": "Available-for-sale is an IAS 39 category. Under IFRS 9 the equivalent is FVOCI, whose variation goes to other comprehensive income instead of the revaluation reserve."
 },
 {
  "cat": "Balance Sheet",
  "title": "Held-to-Maturity Measurement",
  "question": "A company purchases nonderivative bonds with fixed payments and the firm intention of holding them to maturity. How are they measured, initially and subsequently?",
  "options": {
   "A": "Initially at fair value plus transaction costs, subsequently at amortized cost using the effective interest method.",
   "B": "Initially at fair value, subsequently at fair value with variations to the income statement.",
   "C": "Initially at cost, subsequently at fair value with variations to the revaluation reserve.",
   "D": "Initially at nominal value, subsequently at nominal value until maturity."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Held-to-maturity investments are nonderivative financial assets with fixed or determinable payments to be held to maturity: they are measured initially at fair value plus transaction costs and subsequently at amortized cost using the effective interest method.",
   "B": "Incorrect. This is the treatment of financial assets at fair value through profit or loss, which covers assets held for trading rather than held to maturity.",
   "C": "Incorrect. This mixes the available-for-sale destination for fair value variations with a cost-based initial measurement; held-to-maturity investments are not carried at fair value after acquisition.",
   "D": "Incorrect. Nominal value is not a measurement basis here: the standard requires amortized cost with the effective interest method."
  },
  "recap": "Correct. Held-to-maturity investments are nonderivative financial assets with fixed or determinable payments to be held to maturity: they are measured initially at fair value plus transaction costs and subsequently at amortized cost using the effective interest method.",
  "today": "IFRS 9 has replaced held-to-maturity with the amortised cost category, based on the business model and the nature of the cash flows rather than on the intention to hold. The measurement is the same."
 },
 {
  "cat": "Balance Sheet",
  "title": "Measuring Inventories",
  "question": "At year end a batch of finished goods has a cost of 50,000. Its estimated selling price in the ordinary course of business is 52,000, and the estimated costs necessary to complete and sell it amount to 6,000. At what value must the inventory be stated?",
  "options": {
   "A": "50,000, because cost is always the reference for inventories.",
   "B": "52,000, because the selling price represents the realizable amount.",
   "C": "46,000, because inventories are stated at the lower of cost and net realizable value.",
   "D": "56,000, adding the costs necessary to make the sale to the cost of the goods."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Cost is only one of the two terms of the comparison: inventories must be stated at the lower end between cost and net realizable value.",
   "B": "Incorrect. The selling price is not the net realizable value: the estimated costs of completion and of making the sale must be deducted from it.",
   "C": "Correct. Net realizable value is the estimated selling price less the estimated costs of completion and the estimated costs necessary to make the sale: 52,000 − 6,000 = 46,000. Since 46,000 is lower than the cost of 50,000, inventories are stated at 46,000.",
   "D": "Incorrect. Selling costs are not added to the cost of inventories; they are subtracted from the selling price when computing net realizable value."
  },
  "recap": "Correct. Net realizable value is the estimated selling price less the estimated costs of completion and the estimated costs necessary to make the sale: 52,000 − 6,000 = 46,000. Since 46,000 is lower than the cost of 50,000, inventories are stated at 46,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "FIFO, Weighted Average and LIFO",
  "question": "A company is choosing the cost formula for its inventories under IFRS. Which statement is correct?",
  "options": {
   "A": "FIFO and LIFO are both permitted, while the weighted average method is not.",
   "B": "FIFO and weighted average are permitted, while LIFO is not permitted by IFRS.",
   "C": "Only the weighted average method is permitted, since it ignores the physical flow of goods.",
   "D": "All three methods are permitted, and the choice is free provided it is disclosed in the notes."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This reverses the rule: LIFO is the method IFRS does not permit, while the weighted average method is explicitly allowed.",
   "B": "Correct. IFRS allows two methods, FIFO — where the goods leaving the firm are those that have been in inventory the longest, so the inventory on hand is the latest — and weighted average, where each unit is valued at total costs divided by quantity. LIFO is not permitted because its logic is considered unrealistic.",
   "C": "Incorrect. FIFO is permitted as well; the weighted average method is not the only option available.",
   "D": "Incorrect. The choice is not free across all three: disclosure in the notes does not make LIFO acceptable under IFRS."
  },
  "recap": "Correct. IFRS allows two methods, FIFO — where the goods leaving the firm are those that have been in inventory the longest, so the inventory on hand is the latest — and weighted average, where each unit is valued at total costs divided by quantity. LIFO is not permitted because its logic is considered unrealistic."
 },
 {
  "cat": "Balance Sheet",
  "title": "Recording a Partly Paid Sale",
  "question": "In December of Year X a company sells products for 100,000. Half of the amount is paid immediately, while the remaining half will be collected next year. How is the operation reflected in the financial statements of Year X?",
  "options": {
   "A": "Revenues 50,000 in the income statement, cash 50,000 under assets.",
   "B": "Revenues 100,000 in the income statement, trade receivables 50,000 and cash 50,000 under assets.",
   "C": "Revenues 100,000 in the income statement and cash 100,000 under assets.",
   "D": "Revenues 100,000 in the income statement and trade receivables 100,000 under assets."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This applies cash logic to revenue. Under the accrual principle the whole sale of 100,000 is revenue of Year X, regardless of how much has been collected.",
   "B": "Correct. Revenues of 100,000 are recorded in the income statement, while the balance sheet shows cash of 50,000 for the amount already collected and trade receivables of 50,000 for the amount still to be received.",
   "C": "Incorrect. Only half of the amount has actually been collected, so cash cannot be 100,000; the uncollected half is a receivable.",
   "D": "Incorrect. Half of the amount was paid immediately, so 50,000 is cash and only the remaining 50,000 is a trade receivable."
  },
  "recap": "Correct. Revenues of 100,000 are recorded in the income statement, while the balance sheet shows cash of 50,000 for the amount already collected and trade receivables of 50,000 for the amount still to be received."
 },
 {
  "cat": "Balance Sheet",
  "title": "Valuing Trade Receivables",
  "question": "How are trade receivables measured in the balance sheet, given that some customers may not pay?",
  "options": {
   "A": "At their full nominal amount, since the contractual claim is for the entire sum.",
   "B": "At net realizable value, estimating potential losses with statistical methods based on historical values.",
   "C": "At fair value through profit or loss, with variations credited to the income statement each year.",
   "D": "At the amount actually collected after the balance sheet date."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Carrying receivables at their full nominal amount would ignore the probability that some customers will not pay, which the measurement is required to reflect.",
   "B": "Correct. Trade receivables are calculated at the net realizable value, considering the probability that some customers will not pay in the future. Since a precise calculation cannot be performed, enterprises use statistical methods based on historical values to determine the potential loss.",
   "C": "Incorrect. Trade receivables belong to the loans and receivables category, which is measured at amortized cost, not at fair value through profit or loss.",
   "D": "Incorrect. The balance sheet reflects an estimate made at the reporting date; it does not wait for subsequent collections to determine the value."
  },
  "recap": "Correct. Trade receivables are calculated at the net realizable value, considering the probability that some customers will not pay in the future. Since a precise calculation cannot be performed, enterprises use statistical methods based on historical values to determine the potential loss.",
  "today": "Loans and receivables is an IAS 39 category; under IFRS 9 trade receivables are measured at amortised cost, with expected credit losses recognised from initial recognition."
 },
 {
  "cat": "Balance Sheet",
  "title": "Share Premium Reserve",
  "question": "A company issues 100,000 new shares with a nominal value of 1 each, placing them on the market at 4 each and collecting 400,000 in cash. How is the operation reflected in equity?",
  "options": {
   "A": "400,000 entirely under capital.",
   "B": "100,000 under capital and 300,000 under the share premium reserve.",
   "C": "400,000 entirely under the share premium reserve.",
   "D": "100,000 under capital and 300,000 recognized as revenue in the income statement."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Capital is reported at par (nominal) value, so only the nominal portion of 1 per share can be recorded there.",
   "B": "Correct. Share premium reserves originate when enterprises sell shares at a price higher than the nominal value. The cash inflow of 400,000 is balanced in equity under two items: capital for the nominal portion (100,000 × 1 = 100,000) and the share premium reserve for the exceeding portion (100,000 × 3 = 300,000).",
   "C": "Incorrect. The nominal portion must be recorded under capital; the share premium reserve only takes the amount exceeding nominal value.",
   "D": "Incorrect. Issuing shares above par is a transaction with shareholders that increases equity; the premium is not revenue of the period."
  },
  "recap": "Correct. Share premium reserves originate when enterprises sell shares at a price higher than the nominal value. The cash inflow of 400,000 is balanced in equity under two items: capital for the nominal portion (100,000 × 1 = 100,000) and the share premium reserve for the exceeding portion (100,000 × 3 = 300,000)."
 },
 {
  "cat": "Balance Sheet",
  "title": "Recognizing a Provision",
  "question": "A company is facing a lawsuit. Which combination of conditions must hold for a provision to be recognized in the balance sheet?",
  "options": {
   "A": "A present obligation from a past event, a probable cash outflow, and an amount that can be estimated reliably.",
   "B": "A possible future obligation, a certain cash outflow, and an exact amount already agreed with the counterparty.",
   "C": "A present obligation from a past event and a probable cash outflow, even when the amount cannot be estimated.",
   "D": "Management's intention to settle the matter, regardless of whether an obligating event has occurred."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Provisions are liabilities with uncertain timing or amount, and their recognition requires all three conditions together: a present obligation arising from a past (obligating) event, a cash outflow that is probable (more likely than not), and an amount that can be estimated reliably.",
   "B": "Incorrect. The standard requires a present obligation rather than a merely possible one, and a probable rather than certain outflow; an exact agreed amount is not required, since provisions are by nature uncertain in timing or amount.",
   "C": "Incorrect. Reliable estimation of the amount is one of the necessary conditions; without it, the provision cannot be recognized.",
   "D": "Incorrect. An intention is not sufficient: a liability requires a present obligation arising from a past event."
  },
  "recap": "Correct. Provisions are liabilities with uncertain timing or amount, and their recognition requires all three conditions together: a present obligation arising from a past (obligating) event, a cash outflow that is probable (more likely than not), and an amount that can be estimated reliably."
 },
 {
  "cat": "Balance Sheet",
  "title": "Measuring One-off and Recurring Provisions",
  "question": "A company must set up two provisions: one for the settlement of a single lawsuit, and one for product warranties that recur every year across thousands of items. How are the two amounts measured?",
  "options": {
   "A": "Both at the most likely amount, undiscounted.",
   "B": "The lawsuit at a probability-weighted expected value, the warranties at the most likely amount.",
   "C": "The lawsuit at the most likely amount, the warranties at a probability-weighted expected value, both at discounted present value.",
   "D": "Both at the maximum possible exposure, to respect prudence."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect on two counts: recurring obligations such as warranties use a probability-weighted expected value, and both types of provision are calculated at a discounted present value.",
   "B": "Incorrect. The two measurement bases are inverted: the most likely amount applies to one-off events, while the probability-weighted expected value applies to recurring ones.",
   "C": "Correct. For one-off events such as the settlement of a lawsuit, provisions are measured at the most likely amount. For recurring events such as warranties or customer refunds, they are measured at a probability-weighted expected value, triangulating historical data with future forecasts. Both calculations are made at a discounted present value, using a pretax discount rate reflecting the time value of money and the risks specific to the liability.",
   "D": "Incorrect. The standard points to the most likely amount or the probability-weighted expected value, not to the worst-case exposure."
  },
  "recap": "Correct. For one-off events such as the settlement of a lawsuit, provisions are measured at the most likely amount. For recurring events such as warranties or customer refunds, they are measured at a probability-weighted expected value, triangulating historical data with future forecasts. Both calculations are made at a discounted present value, using a pretax discount rate reflecting the time value of money and the risks specific to the liability."
 },
 {
  "cat": "Balance Sheet",
  "title": "Defined Contribution vs Defined Benefit",
  "question": "Two companies run different postemployment plans. Company X pays fixed contributions into a fund and has no obligation to pay more if the fund cannot cover all employees' claims. Company Y guarantees a determined benefit level to its employees. How do the two plans differ in accounting terms?",
  "options": {
   "A": "X has a defined contribution plan; Y has a defined benefit plan and must calculate the present value of future obligations using actuarial assumptions.",
   "B": "X has a defined benefit plan; Y has a defined contribution plan, since Y's benefits are fixed in advance.",
   "C": "Both are defined contribution plans, since both involve payments to employees after employment.",
   "D": "Neither generates any liability, since postemployment benefits are always handled outside the balance sheet."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Under a defined contribution plan the enterprise pays fixed contributions into a fund and has no obligation to make further payments if the fund lacks the capacity to pay all employees' claims, which is Company X. Companies adopting a defined benefit plan, like Company Y, calculate the present value of future obligations, using actuarial assumptions to assess the value.",
   "B": "Incorrect. The labels are inverted: what is fixed under a defined contribution plan is the contribution paid in, while under a defined benefit plan it is the benefit owed to the employee.",
   "C": "Incorrect. IAS/IFRS explicitly distinguishes the two types precisely because the obligation carried by the company is different.",
   "D": "Incorrect. Pensions and similar obligations are reported among liabilities, and defined benefit plans in particular require measuring the present value of future obligations."
  },
  "recap": "Correct. Under a defined contribution plan the enterprise pays fixed contributions into a fund and has no obligation to make further payments if the fund lacks the capacity to pay all employees' claims, which is Company X. Companies adopting a defined benefit plan, like Company Y, calculate the present value of future obligations, using actuarial assumptions to assess the value."
 },
 {
  "cat": "Income Statement",
  "title": "By Nature vs By Function",
  "question": "An income statement lists, under continuing operations: revenue, other operating income, raw materials and consumables used, employee benefits expense, depreciation and amortization expense, other operating expenses, then operating profit. Which format is being used?",
  "options": {
   "A": "By function, because costs are grouped according to where they are used.",
   "B": "By nature, because costs are aggregated on the basis of what they are.",
   "C": "Neither, because a compliant income statement must always show gross profit.",
   "D": "By nature for costs and by function for revenues, as IFRS requires a mixed presentation."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The by-function format would show items such as cost of sales, distribution costs and administrative expenses, classifying costs by their use in company activities.",
   "B": "Correct. The format by nature aggregates costs on the basis of their nature — raw materials, staffing costs, depreciation and so on — which is exactly the list presented here.",
   "C": "Incorrect. Gross profit is a feature of the by-function format; its absence does not make a by-nature income statement non-compliant.",
   "D": "Incorrect. IFRS does not require a mixed presentation: the company presents its costs either by nature or by function."
  },
  "recap": "Correct. The format by nature aggregates costs on the basis of their nature — raw materials, staffing costs, depreciation and so on — which is exactly the list presented here."
 },
 {
  "cat": "Income Statement",
  "title": "Where Gross Profit Appears",
  "question": "A reader wants to find the gross profit line in a company's income statement but cannot see it. What is the most likely explanation?",
  "options": {
   "A": "The company reports its income statement by nature, a format in which gross profit is not presented.",
   "B": "The company has made a presentation error, since gross profit is compulsory in every format.",
   "C": "The company has no continuing operations during the period.",
   "D": "Gross profit only appears when the company is loss-making."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Gross profit arises in the by-function format, as revenue less cost of sales. In the format by nature, costs are aggregated as raw materials, employee benefits, depreciation and other operating expenses, and the statement proceeds to operating profit without a gross profit subtotal.",
   "B": "Incorrect. Gross profit is not compulsory in both formats: its presence depends on whether costs are presented by function or by nature.",
   "C": "Incorrect. The presence of continuing operations does not determine whether a gross profit subtotal is shown; the chosen cost classification does.",
   "D": "Incorrect. Gross profit has nothing to do with whether the result is positive or negative; it depends on the presentation format."
  },
  "recap": "Correct. Gross profit arises in the by-function format, as revenue less cost of sales. In the format by nature, costs are aggregated as raw materials, employee benefits, depreciation and other operating expenses, and the statement proceeds to operating profit without a gross profit subtotal."
 },
 {
  "cat": "Income Statement",
  "title": "Conditions for Recognizing Revenue on Goods",
  "question": "A manufacturer has shipped goods but retains effective control over them and continues to manage them as if they were its own. Can revenue be recognized?",
  "options": {
   "A": "Yes, because the legal property has been transferred to the buyer.",
   "B": "Yes, because the goods have physically left the company's warehouse.",
   "C": "No, because one of the conditions requires the seller to have no managerial involvement or control over the goods sold.",
   "D": "No, but only if the customer has not yet paid the invoice."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Under IFRS, property rights are explicitly not a sufficient condition for recognizing revenue.",
   "B": "Incorrect. Physical shipment alone does not satisfy the recognition conditions if the seller keeps managerial involvement and control over the goods.",
   "C": "Correct. For sales of goods all the conditions must be satisfied, including that the seller has transferred the significant risks and rights over the goods and has no managerial involvement or control over them, alongside reliable measurement of revenue and costs and the likelihood that economic benefits will flow to the seller.",
   "D": "Incorrect. Payment timing is a cash matter; revenue recognition follows the accrual conditions, not the settlement of the invoice."
  },
  "recap": "Correct. For sales of goods all the conditions must be satisfied, including that the seller has transferred the significant risks and rights over the goods and has no managerial involvement or control over them, alongside reliable measurement of revenue and costs and the likelihood that economic benefits will flow to the seller."
 },
 {
  "cat": "Income Statement",
  "title": "Revenue on Services",
  "question": "A consulting firm signs a multi-year project spanning two accounting years. How are revenues recognized?",
  "options": {
   "A": "Entirely in the year the contract is signed.",
   "B": "Entirely in the final year, when the project is completed and accepted.",
   "C": "By reference to the stage of completion of the transaction at the balance sheet date.",
   "D": "In the year in which the client actually pays each instalment."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Signing the contract does not by itself deliver the service; recognizing everything upfront would not reflect the stage of the work performed.",
   "B": "Incorrect. Deferring all revenue to completion would ignore the portion of the service already rendered at the reporting date.",
   "C": "Correct. For services, conditions similar to those for goods apply, but revenues are recognized by reference to the stage of completion of the transaction at the balance sheet date.",
   "D": "Incorrect. This applies cash logic. Revenue recognition follows the accrual principle, independently of when instalments are collected."
  },
  "recap": "Correct. For services, conditions similar to those for goods apply, but revenues are recognized by reference to the stage of completion of the transaction at the balance sheet date."
 },
 {
  "cat": "Income Statement",
  "title": "Building the Income Statement Down to Profit",
  "question": "A company reports: revenues 800,000; operating costs 620,000; financial incomes 15,000; financial expenses and adjustments 40,000; taxes 45,000; no discontinued operations. What are the EBIT, the profit before taxes and the profit after taxes from continuing operations?",
  "options": {
   "A": "EBIT 180,000; profit before taxes 155,000; profit after taxes 110,000.",
   "B": "EBIT 180,000; profit before taxes 195,000; profit after taxes 150,000.",
   "C": "EBIT 155,000; profit before taxes 180,000; profit after taxes 135,000.",
   "D": "EBIT 140,000; profit before taxes 155,000; profit after taxes 110,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. EBIT is revenues less operating costs: 800,000 − 620,000 = 180,000. Adding financial incomes and subtracting financial expenses gives profit before taxes from continuing operations: 180,000 + 15,000 − 40,000 = 155,000. Subtracting taxes gives profit after taxes: 155,000 − 45,000 = 110,000.",
   "B": "Incorrect. This adds the financial expenses instead of subtracting them, or nets the financial items with the wrong sign; the correct profit before taxes is 155,000.",
   "C": "Incorrect. The two subtotals are swapped: EBIT stops before any financial item, so it is 180,000, and only afterwards do financial incomes and expenses lead to 155,000.",
   "D": "Incorrect. EBIT must not include financial items at all; deducting part of them before EBIT understates it, since revenues less operating costs gives 180,000."
  },
  "recap": "Correct. EBIT is revenues less operating costs: 800,000 − 620,000 = 180,000. Adding financial incomes and subtracting financial expenses gives profit before taxes from continuing operations: 180,000 + 15,000 − 40,000 = 155,000. Subtracting taxes gives profit after taxes: 155,000 − 45,000 = 110,000."
 },
 {
  "cat": "Income Statement",
  "title": "Assets Held for Sale",
  "question": "Management states that it would like to dispose of a division at some point, but no buyer search has started and no plan has been approved. Can the division be presented among discontinued operations as held for sale?",
  "options": {
   "A": "Yes, management's stated intention is sufficient.",
   "B": "No: the criteria require a committed plan, immediate availability for sale, an active program to locate a buyer and a highly probable sale, normally within 12 months.",
   "C": "Yes, provided the division is loss-making.",
   "D": "No, because a division can never be classified as held for sale, only individual assets can."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. An intention is far weaker than the criteria set by IFRS, which require concrete steps and a high probability of sale.",
   "B": "Correct. An asset is held for sale when management is committed to a plan to sell, the asset is available for immediate sale, an active program to locate a buyer is initiated, the sale is highly probable (within 12 months of classification, subject to limited exceptions), the asset is actively marketed at a price reasonable in relation to fair value, and it is unlikely that the plan will be significantly changed or withdrawn.",
   "C": "Incorrect. Profitability is irrelevant to the classification: what matters is whether the held-for-sale criteria are met.",
   "D": "Incorrect. Discontinuing operations typically concern entire business units held for sale, not only individual assets."
  },
  "recap": "Correct. An asset is held for sale when management is committed to a plan to sell, the asset is available for immediate sale, an active program to locate a buyer is initiated, the sale is highly probable (within 12 months of classification, subject to limited exceptions), the asset is actively marketed at a price reasonable in relation to fair value, and it is unlikely that the plan will be significantly changed or withdrawn."
 },
 {
  "cat": "Income Statement",
  "title": "Materials: Purchases vs Consumption",
  "question": "During the year a company purchases raw materials for 500,000. Inventories of raw materials increase by 30,000 over the same period. What figure appears among operating costs in an income statement by nature?",
  "options": {
   "A": "500,000, the amount purchased during the year.",
   "B": "530,000, adding the increase in inventories to the purchases.",
   "C": "470,000, the consumption obtained as purchases less the increase in inventories.",
   "D": "30,000, the variation in inventories alone."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The income statement lists the consumption of materials, not the amount purchased: part of what was bought is still in stock at year end.",
   "B": "Incorrect. Adding the inventory increase moves in the wrong direction: materials that went into stock have not been consumed, so they must be deducted.",
   "C": "Correct. The income statement lists the consumption of materials, computed as materials purchased less the changes in inventory: 500,000 − 30,000 = 470,000.",
   "D": "Incorrect. The inventory variation is only the adjustment applied to purchases, not the operating cost itself."
  },
  "recap": "Correct. The income statement lists the consumption of materials, computed as materials purchased less the changes in inventory: 500,000 − 30,000 = 470,000."
 },
 {
  "cat": "Cash Flow",
  "title": "Direct vs Indirect Method",
  "question": "A company prepares its cash flow statement starting from net profit and adjusting it for the effects of noncash transactions such as depreciation. Which method is being applied, and how does the alternative work?",
  "options": {
   "A": "The indirect method; the direct method would instead show each major class of gross cash receipts and gross cash payments.",
   "B": "The direct method; the indirect method would instead list gross receipts and payments one by one.",
   "C": "The accrual method; the alternative would be the cash method.",
   "D": "Neither: IFRS requires the cash flow statement to start from EBITDA in all cases."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The indirect method obtains generated cash starting from accrual results, usually operating profit or net profit, adjusting for noncash effects. The direct method, which IAS/IFRS encourages, shows each major class of gross cash receipts and gross cash payments.",
   "B": "Incorrect. The two are inverted: starting from net profit and adjusting for noncash items is precisely the indirect method.",
   "C": "Incorrect. Accrual and cash are the two accounting logics behind the statements, not the two presentation methods of the cash flow statement.",
   "D": "Incorrect. IFRS permits both the direct and the indirect method; there is no mandatory single starting point such as EBITDA."
  },
  "recap": "Correct. The indirect method obtains generated cash starting from accrual results, usually operating profit or net profit, adjusting for noncash effects. The direct method, which IAS/IFRS encourages, shows each major class of gross cash receipts and gross cash payments."
 },
 {
  "cat": "Cash Flow",
  "title": "Classifying Cash Flows",
  "question": "During the year a company: (1) collects cash from customers, (2) buys a new production plant, (3) issues new shares. How are these three flows classified in the cash flow statement?",
  "options": {
   "A": "(1) operating, (2) investing, (3) financing.",
   "B": "(1) operating, (2) operating, (3) investing.",
   "C": "(1) investing, (2) financing, (3) operating.",
   "D": "(1) financing, (2) investing, (3) operating."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Operating activities refer to cash flows generated or employed in the current activities of the company, such as cash received from customers. Investing activities are the acquisition and disposal of long-term assets, such as a production plant. Financing activities are those altering the equity capital and borrowing structure, such as a share issue.",
   "B": "Incorrect. Buying a production plant is the acquisition of a long-term asset, which belongs to investing activities rather than operating ones.",
   "C": "Incorrect. Collecting cash from customers is the clearest example of an operating flow, and a share issue alters equity capital, making it a financing flow.",
   "D": "Incorrect. Cash received from customers is operating, not financing, and a share issue is financing, not operating."
  },
  "recap": "Correct. Operating activities refer to cash flows generated or employed in the current activities of the company, such as cash received from customers. Investing activities are the acquisition and disposal of long-term assets, such as a production plant. Financing activities are those altering the equity capital and borrowing structure, such as a share issue."
 },
 {
  "cat": "Cash Flow",
  "title": "The Logic behind the Statement",
  "question": "Why can a company report a solid profit in its income statement and still show weak cash generation in its cash flow statement?",
  "options": {
   "A": "Because the income statement is prepared with cash logic while the cash flow statement uses accrual logic.",
   "B": "Because the income statement follows accrual logic, recognizing revenues and costs when they occur, while the cash flow statement is prepared with cash logic.",
   "C": "Because the two documents must always show the same result, so a difference signals an accounting error.",
   "D": "Because the cash flow statement only covers financing activities."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The logics are inverted: the income statement is one of the statements built on the accrual principle, not on cash.",
   "B": "Correct. The accrual principle is the underlying logic of the income statement and the balance sheet, so revenues and costs are recognized when transactions occur. The cash flow statement, contrary to those two, is prepared with cash logic, which is why profit and cash generation can diverge, for example when sales are made on credit.",
   "C": "Incorrect. The two documents answer different questions and are not expected to coincide; a divergence is normal rather than an error.",
   "D": "Incorrect. The cash flow statement covers operating, investing and financing activities, not financing alone."
  },
  "recap": "Correct. The accrual principle is the underlying logic of the income statement and the balance sheet, so revenues and costs are recognized when transactions occur. The cash flow statement, contrary to those two, is prepared with cash logic, which is why profit and cash generation can diverge, for example when sales are made on credit."
 },
 {
  "cat": "Notes & Reporting",
  "title": "What the Notes Must Disclose",
  "question": "A company had the option to measure a class of assets either at cost or at fair value. Where does a reader find out which model was actually adopted?",
  "options": {
   "A": "In the notes, which must disclose the basis of preparation and the specific accounting policies used.",
   "B": "In the statement of changes in equity, which lists all measurement choices.",
   "C": "Nowhere: the choice of measurement model is internal information and is not disclosed.",
   "D": "In the cash flow statement, under investing activities."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The notes must include information about the basis of preparation of the financial statements and the specific accounting policies used; they highlight, for instance, the measurement method adopted when a choice between the cost model and the fair value model is available.",
   "B": "Incorrect. The statement of changes in equity details the variations occurred in equity during the year, not the full set of accounting policy choices.",
   "C": "Incorrect. Disclosure of accounting policies is compulsory precisely so that readers can interpret the figures correctly.",
   "D": "Incorrect. The cash flow statement reports cash flows by category; it does not disclose measurement policies."
  },
  "recap": "Correct. The notes must include information about the basis of preparation of the financial statements and the specific accounting policies used; they highlight, for instance, the measurement method adopted when a choice between the cost model and the fair value model is available."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Segmental Reporting",
  "question": "The Volkswagen Group 2012 annual report presents its income statement split into the Automotive and Financial Services divisions, each with its own sales revenue, operating profit and profit after tax. What does this represent?",
  "options": {
   "A": "A voluntary marketing disclosure with no basis in IFRS.",
   "B": "Segmental reporting, required by IFRS for reportable segments defined by business or geographical area.",
   "C": "The statement of changes in equity, broken down by division.",
   "D": "A consolidation adjustment required only for automotive companies."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Segmental information is not left to marketing discretion: IFRS requires enterprises to report financial and descriptive information about their reportable segments.",
   "B": "Correct. IFRS requires financial and descriptive information about reportable segments, which are operating segments or aggregations of them referred either to specific businesses (business segments) or to specific geographical areas (geographical segments). Such reporting must include information such as sales, results, assets, liabilities and depreciation, exactly as in the Volkswagen split between Automotive and Financial Services.",
   "C": "Incorrect. What is split by division here is the income statement, and the requirement comes from segmental reporting rules, not from the statement of changes in equity.",
   "D": "Incorrect. Segmental reporting applies across industries wherever reportable segments exist; it is not an automotive-specific rule."
  },
  "recap": "Correct. IFRS requires financial and descriptive information about reportable segments, which are operating segments or aggregations of them referred either to specific businesses (business segments) or to specific geographical areas (geographical segments). Such reporting must include information such as sales, results, assets, liabilities and depreciation, exactly as in the Volkswagen split between Automotive and Financial Services."
 },
 {
  "cat": "Principles",
  "title": "Unpaid Manufacturing Wages at Year End",
  "question": "A manufacturer owes 18,000 for work performed by its production employees in December Year 1. All the related goods were completed and sold in December. The wages will be paid in January Year 2, and none of this amount has yet been recorded. Ignore taxes. What adjustment is required at 31 December Year 1?",
  "options": {
   "A": "Recognize an expense of 18,000 and a wages payable liability of 18,000; cash is unchanged.",
   "B": "Recognize an expense of 18,000 and reduce cash by 18,000.",
   "C": "Make no adjustment until the wages are paid in January.",
   "D": "Recognize an inventory asset of 18,000 and a wages payable liability of 18,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The employees worked in Year 1, and all related goods were sold in Year 1, so the 18,000 belongs in that year's expenses. The unpaid amount creates a liability. Cash does not change until January.",
   "B": "Incorrect. The expense belongs in Year 1, but no cash was paid in December. The corresponding credit is wages payable, not cash.",
   "C": "Incorrect. Waiting until payment would understate both Year 1 expenses and year-end liabilities by 18,000, and overstate Year 1 profit by 18,000.",
   "D": "Incorrect. All goods related to these wages were sold before year end. None of the 18,000 remains in closing inventory; it is a Year 1 expense."
  },
  "recap": "Work performed and consumed in Year 1 creates an expense in Year 1 even if paid later. Record expense 18,000 and wages payable 18,000; the cash payment belongs to Year 2."
 },
 {
  "cat": "Principles",
  "title": "Insurance Paid Across Two Accounting Years",
  "question": "On 1 October Year 1, a company pays 9,600 for general office insurance covering exactly 12 months, from 1 October Year 1 through 30 September Year 2. The insurance service is received evenly each month. The company closes its accounts on 31 December. What are the Year 1 insurance expense and the prepaid insurance asset at year end?",
  "options": {
   "A": "Expense 9,600; prepaid insurance 0.",
   "B": "Expense 2,400; prepaid insurance 7,200.",
   "C": "Expense 7,200; prepaid insurance 2,400.",
   "D": "Expense 0; prepaid insurance 9,600."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The cash payment covers 12 months, but only three months of cover were consumed in Year 1. Expensing the full payment ignores the nine months of future cover.",
   "B": "Correct. Monthly cost is 9,600 / 12 = 800. October through December give an expense of 3 × 800 = 2,400. The remaining nine months form a prepaid asset of 9 × 800 = 7,200.",
   "C": "Incorrect. These amounts reverse the elapsed and unexpired periods. Three months have elapsed at 31 December, and nine months remain.",
   "D": "Incorrect. The policy has already provided three months of cover. Leaving the entire payment as an asset would omit the 2,400 expense and overstate prepaid insurance by 2,400."
  },
  "recap": "Allocate a prepayment to the periods receiving the service. Of the 9,600 paid, 2,400 is Year 1 insurance expense and 7,200 remains an asset for future cover."
 },
 {
  "cat": "Principles",
  "title": "Customer Cash Received Before Any Service",
  "question": "A training company receives 30,000 in December Year 1 under a valid contract to deliver a single workshop in January Year 2. No training or other promised service is provided before 31 December Year 1. Ignore taxes and financing effects. What is the effect of this receipt in Year 1?",
  "options": {
   "A": "Cash increases by 30,000 and revenue increases by 30,000.",
   "B": "A receivable increases by 30,000 and revenue increases by 30,000; cash is unchanged.",
   "C": "Cash increases by 30,000 and a contract liability increases by 30,000; revenue is unchanged.",
   "D": "Cash increases by 30,000 and a contract liability decreases by 30,000; revenue is unchanged."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The cash receipt does not establish that the promised service has been delivered. No workshop revenue has been earned by year end.",
   "B": "Incorrect. Cash has actually been received, so it must increase. There is no unpaid receivable for this amount, and the workshop has not yet generated revenue.",
   "C": "Correct. The 30,000 receipt increases cash and creates an obligation to provide the future workshop. That obligation is a contract liability, sometimes called deferred revenue. Year 1 revenue is zero for this contract.",
   "D": "Incorrect. Receiving the advance creates an obligation rather than settling one. The contract liability increases by 30,000; reducing it would also fail to balance the cash increase."
  },
  "recap": "Customer advances can increase cash without increasing profit. Until the promised workshop is delivered, the 30,000 is a contract liability rather than revenue."
 },
 {
  "cat": "Principles",
  "title": "Collecting Revenue Already Recognized",
  "question": "At 31 December Year 1, a company has a trade receivable of 22,000 for a service fully delivered and correctly recognized as revenue in Year 1. On 10 January Year 2 the customer pays exactly 22,000. Assume no impairment, discount, interest or exchange-rate effect. How does the January collection affect Year 2?",
  "options": {
   "A": "Cash and revenue both increase by 22,000.",
   "B": "Cash and total assets both increase by 22,000; revenue is unchanged.",
   "C": "Cash increases by 22,000 and liabilities decrease by 22,000; revenue is unchanged.",
   "D": "Cash increases by 22,000, trade receivables decrease by 22,000, and neither total assets nor revenue changes."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. The revenue was already recognized in Year 1. Recognizing it again on collection would count the same service twice.",
   "B": "Incorrect. Cash increases by 22,000, but the receivable decreases by the same amount. The collection changes the composition of assets, not total assets.",
   "C": "Incorrect. The customer settles a receivable, which is an asset of the company. Collection does not settle a liability owed by the company.",
   "D": "Correct. One asset becomes another: cash +22,000 and receivables -22,000. The net change in assets is zero, and no new revenue arises from collecting an amount already earned."
  },
  "recap": "Collecting an existing receivable converts it into cash. With no adjustments or fees, total assets and profit are unchanged."
 },
 {
  "cat": "Principles",
  "title": "Two Cash Transactions and the Accounting Equation",
  "question": "A company begins the day with assets of 120,000, liabilities of 45,000 and equity of 75,000. It then receives a new bank loan of 20,000 in cash and pays 12,000 in cash to settle an existing supplier payable at its carrying amount. There are no interest charges, fees, taxes or other transactions. What are the closing totals?",
  "options": {
   "A": "Assets 128,000; liabilities 53,000; equity 75,000.",
   "B": "Assets 128,000; liabilities 45,000; equity 83,000.",
   "C": "Assets 140,000; liabilities 53,000; equity 87,000.",
   "D": "Assets 128,000; liabilities 65,000; equity 63,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Assets become 120,000 + 20,000 - 12,000 = 128,000. Liabilities become 45,000 + 20,000 - 12,000 = 53,000. Neither transaction creates income or expense, so equity remains 75,000. The equation balances: 128,000 = 53,000 + 75,000.",
   "B": "Incorrect. The net cash increase of 8,000 is matched by a net increase in liabilities, not by profit. Borrowing creates a bank debt and paying a previously recorded supplier balance removes a payable.",
   "C": "Incorrect. Assets must reflect the 12,000 cash payment, so they end at 128,000 rather than 140,000. The payment does not create an equity gain.",
   "D": "Incorrect. The supplier payment reduces the existing liability by 12,000. Treating it as a new expense leaves liabilities too high and reduces equity a second time for a cost already recorded."
  },
  "recap": "Borrowing increases assets and liabilities; paying an existing payable reduces both. Here assets rise by 8,000, liabilities rise by 8,000, and equity stays at 75,000."
 },
 {
  "cat": "Principles",
  "title": "A Signed Order Before Delivery",
  "question": "In December a retailer signs a contract to supply standard goods in February. The customer receives no goods or services in December, pays no advance, and owes nothing until delivery. The contract has no separate service obligations and is not onerous. The sales manager wants to recognize revenue in December because the order is legally binding. Which response is correct?",
  "options": {
   "A": "Recognize all revenue in December because a signed contract always completes the accrual event.",
   "B": "Recognize no revenue in December because the promised goods have not been transferred to the customer.",
   "C": "Recognize half the revenue at signing and half at delivery to spread it across both periods.",
   "D": "Recognize revenue only on the eventual cash collection date, regardless of when delivery occurs."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Signing establishes the agreement, but does not by itself satisfy the obligation to supply the goods. The facts specify that nothing has been transferred in December.",
   "B": "Correct. The promise remains unfulfilled at year end. For this simple sale, revenue is recognized when the goods are transferred and the customer obtains control, not merely when the contract is signed.",
   "C": "Incorrect. There is no performance at signing to justify recognizing a portion of revenue. An arbitrary split between contract date and delivery is not an accrual principle.",
   "D": "Incorrect. Cash collection is not the sole revenue trigger. If delivery satisfies the obligation before payment, revenue can be recognized before the cash arrives."
  },
  "recap": "A binding contract and a completed sale are different events. In this case, revenue follows transfer of the promised goods; contract signing alone earns none."
 },
 {
  "cat": "Principles",
  "title": "A Snapshot versus Activity During a Period",
  "question": "A company reports for the year from 1 July Year 1 to 30 June Year 2. A lender wants two different facts: the amount customers still owe on 30 June, and the revenue earned during the whole reporting year. Which pairing provides the correct time perspective?",
  "options": {
   "A": "Both amounts are flows measured from 1 July to 30 June in the cash flow statement.",
   "B": "Both amounts are balances measured only at 30 June in the balance sheet.",
   "C": "Outstanding customer receivables are a balance at 30 June; annual revenue is a flow from 1 July to 30 June.",
   "D": "Outstanding customer receivables are the year's cash receipts; annual revenue is cash held at 30 June."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Unpaid customer amounts are receivable balances at a date, not cash flows. Revenue measures earned activity and may differ from cash received.",
   "B": "Incorrect. The balance sheet can show receivables outstanding at 30 June, but annual revenue describes activity throughout the year and belongs in the income statement.",
   "C": "Correct. Receivables answer how much is still owed at the reporting date. Revenue answers how much was earned during the reporting period. A June year end does not alter this distinction.",
   "D": "Incorrect. Receivables are unpaid customer balances, not collected cash. Revenue is earned over a period, whereas cash held is an asset balance at a date."
  },
  "recap": "The balance sheet shows amounts at a date. The income statement shows revenues and expenses over a period, whether the accounting year ends in June or December."
 },
 {
  "cat": "Principles",
  "title": "Correcting an Owner Contribution Recorded as Revenue",
  "question": "An owner contributes cash to a company as permanent equity capital, with no repayment obligation and no goods or services supplied in exchange. The bookkeeper correctly increases cash but incorrectly records the matching amount as revenue. Ignore taxes and assume no other entry is affected. What happens when this error is corrected?",
  "options": {
   "A": "Cash and total equity both decrease because the receipt is reversed.",
   "B": "A liability increases and total equity decreases because every cash receipt must be repaid.",
   "C": "Revenue and profit remain unchanged because an owner's cash contribution is operating income.",
   "D": "Revenue and profit decrease, contributed capital increases, and cash and total equity remain unchanged."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. The cash contribution really occurred, so the cash entry stays. The correction changes how the increase in equity is described, not the amount of cash or total equity.",
   "B": "Incorrect. The contribution is explicitly permanent equity with no repayment obligation. It is not a loan and does not create a liability.",
   "C": "Incorrect. An owner contribution is a transaction with an owner acting as owner. It increases contributed capital directly and is not revenue from providing goods or services.",
   "D": "Correct. Remove the amount from revenue, reducing reported profit, and record the same amount as contributed capital. The reduced profit component of equity is offset by increased contributed capital, so total equity and cash do not change."
  },
  "recap": "Owner contributions increase equity directly. Correcting a contribution mistakenly booked as revenue reduces profit and increases contributed capital by equal amounts, leaving cash and total equity unchanged."
 },
 {
  "cat": "Balance Sheet",
  "title": "Residual Value and Carrying Amount",
  "question": "A delivery vehicle costs €72,000 and is available for use on 1 January Year 1. Its useful life is six years and its estimated residual value is €12,000. The company uses straight-line depreciation and the cost model. Estimates remain unchanged and there is no impairment. What are annual depreciation and the carrying amount at 31 December Year 4?",
  "options": {
   "A": "Annual depreciation €12,000; carrying amount €24,000.",
   "B": "Annual depreciation €10,000; carrying amount €40,000.",
   "C": "Annual depreciation €14,000; carrying amount €16,000.",
   "D": "Annual depreciation €10,000; carrying amount €32,000."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. €72,000 / 6 ignores the €12,000 residual value. Only €60,000 is depreciable, so the annual charge is €10,000 and four years leave €32,000.",
   "B": "Incorrect. The annual charge is right, but €40,000 is accumulated depreciation after four years. Carrying amount is cost less that charge: €72,000 − €40,000 = €32,000.",
   "C": "Incorrect. This adds residual value to cost: (€72,000 + €12,000) / 6 = €14,000. Residual value must be deducted, giving depreciation of €10,000 and a carrying amount of €32,000.",
   "D": "Correct. Depreciable amount = €72,000 − €12,000 = €60,000. Annual depreciation = €60,000 / 6 = €10,000. After four full years, carrying amount = €72,000 − 4 × €10,000 = €32,000."
  },
  "recap": "Subtract residual value before dividing by useful life. Carrying amount is original cost minus accumulated depreciation: €72,000 − €40,000 = €32,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "Depreciation Starts When Ready",
  "question": "An office machine is purchased and paid for on 1 April for €90,000. Installation is completed on 1 July, when it becomes available for its intended use. Staff first operate it on 1 September. Its residual value is €9,000 and useful life is nine years. Using straight-line depreciation, monthly proration and a 31 December year end, with no impairment, what depreciation is charged in this first year?",
  "options": {
   "A": "€6,750.",
   "B": "€4,500.",
   "C": "€3,000.",
   "D": "€9,000."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. €9,000 × 9/12 = €6,750 starts depreciation at purchase in April. The machine was not available for its intended use until July, so only six months are charged.",
   "B": "Correct. Full-year depreciation = (€90,000 − €9,000) / 9 = €9,000. Depreciation starts on 1 July, when installation is complete: €9,000 × 6/12 = €4,500.",
   "C": "Incorrect. €9,000 × 4/12 = €3,000 starts at first operation in September. Being ready in July is sufficient to start depreciation, even though operation begins later.",
   "D": "Incorrect. €9,000 is the full-year charge. This first year includes only July through December after the machine becomes available, giving €4,500."
  },
  "recap": "Use the available-for-use date. Payment and first actual operation do not determine the start: (€90,000 − €9,000) / 9 × 6/12 = €4,500."
 },
 {
  "cat": "Balance Sheet",
  "title": "Two Significant Components",
  "question": "A machine costing €240,000 is available for use for a full year. Its two significant components are a €180,000 main structure with a 12-year useful life and a €60,000 control unit with a four-year useful life. Both have zero residual value and use straight-line depreciation. There is no impairment. What is the total depreciation for the year?",
  "options": {
   "A": "€20,000.",
   "B": "€60,000.",
   "C": "€30,000.",
   "D": "€15,000."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. €240,000 / 12 = €20,000 incorrectly gives the control unit the main structure's 12-year life. Its own four-year life requires a separate charge.",
   "B": "Incorrect. €240,000 / 4 = €60,000 gives the entire machine the control unit's shorter life. The €180,000 structure must be depreciated over 12 years.",
   "C": "Correct. Depreciate each significant component over its own life: €180,000 / 12 = €15,000 for the structure and €60,000 / 4 = €15,000 for the control unit. Total = €30,000.",
   "D": "Incorrect. €15,000 is the charge for either individual component here. Both components contribute depreciation, so their charges sum to €30,000."
  },
  "recap": "Significant components with different useful lives are depreciated separately. Add €15,000 for the structure and €15,000 for the control unit: €30,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "Recoverable Amount and Impairment",
  "question": "A machine under the cost model has a carrying amount of €140,000 after this year's depreciation. At the impairment test date, its value in use is €123,000, fair value is €130,000 and costs of disposal are €12,000. The machine generates independent cash inflows, and there is no revaluation reserve. What impairment loss and closing carrying amount should be recorded?",
  "options": {
   "A": "Impairment loss €17,000; closing carrying amount €123,000.",
   "B": "Impairment loss €22,000; closing carrying amount €118,000.",
   "C": "Impairment loss €10,000; closing carrying amount €130,000.",
   "D": "No impairment loss; closing carrying amount €140,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Fair value less disposal costs = €130,000 − €12,000 = €118,000. Recoverable amount is the higher of €118,000 and value in use of €123,000, hence €123,000. The loss is €140,000 − €123,000 = €17,000.",
   "B": "Incorrect. €118,000 is fair value less disposal costs, but value in use is higher at €123,000. Recoverable amount uses the higher measure, so the impairment loss is €17,000, not €22,000.",
   "C": "Incorrect. Fair value of €130,000 must first be reduced by disposal costs. The resulting €118,000 is compared with €123,000 value in use, producing a €17,000 impairment loss.",
   "D": "Incorrect. The €140,000 carrying amount exceeds both possible recovery measures. It must be reduced to the higher of them, €123,000, with a €17,000 impairment loss."
  },
  "recap": "Recoverable amount = max(value in use, fair value less disposal costs). Here max(€123,000, €118,000) = €123,000, so impairment is €17,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "Patent: Economic Life vs Legal Term",
  "question": "A separately purchased patent costs €150,000 and is available for use on 1 January. Its remaining legal protection is ten years, but technological change is expected to limit economic benefits to six years. Residual value is zero, benefits are consumed evenly, and the company uses the cost model with no impairment. What are first-year amortisation and the patent's closing carrying amount?",
  "options": {
   "A": "Amortisation €15,000; carrying amount €135,000.",
   "B": "Amortisation €0; carrying amount €150,000.",
   "C": "Amortisation €150,000; carrying amount €0.",
   "D": "Amortisation €25,000; carrying amount €125,000."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. €150,000 / 10 uses the legal term but ignores the shorter six-year period of economic benefit. The six-year useful life gives an annual charge of €25,000.",
   "B": "Incorrect. This patent has a finite useful life and is available for use. It must be amortised; it is not treated as an indefinite-life intangible asset.",
   "C": "Incorrect. The purchased patent provides benefits over six years. Its recognised cost is allocated over that useful life rather than expensed entirely in the first year.",
   "D": "Correct. Useful life is limited by the shorter economic period of six years. Annual amortisation = €150,000 / 6 = €25,000; closing carrying amount = €150,000 − €25,000 = €125,000."
  },
  "recap": "A legal right lasting ten years does not justify a ten-year useful life when benefits last only six. Amortisation is €150,000 / 6 = €25,000 per year."
 },
 {
  "cat": "Balance Sheet",
  "title": "Inventory Write-down by Product",
  "question": "A retailer holds 100 units of Product Alpha costing €90 each and 100 units of unrelated Product Beta costing €70 each. Alpha's estimated selling price is €88 per unit with €8 selling costs; Beta's is €85 with €6 selling costs. Both products are finished and can be assessed separately. What are total closing inventory and the write-down expense?",
  "options": {
   "A": "Inventory €15,900; write-down €100.",
   "B": "Inventory €15,000; write-down €1,000.",
   "C": "Inventory €16,000; write-down €0.",
   "D": "Inventory €15,800; write-down €200."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This totals both products' net realisable values: 100 × €80 + 100 × €79 = €15,900. Beta cannot be increased above its €70 unit cost to offset Alpha's loss.",
   "B": "Correct. Alpha's NRV is €88 − €8 = €80, below its €90 cost, so it is carried at €8,000. Beta's NRV is €85 − €6 = €79, above its €70 cost, so it remains at €7,000. Total inventory = €15,000; original cost €16,000 less €15,000 gives a €1,000 write-down.",
   "C": "Incorrect. Alpha cannot remain at its €90 cost when its NRV is only €80. A €10 reduction for each of 100 Alpha units creates a €1,000 expense, even though Beta remains profitable.",
   "D": "Incorrect. This compares Alpha's €90 cost with its €88 selling price but omits €8 selling costs. Alpha's NRV is €80, so the reduction is €1,000, not €200."
  },
  "recap": "Compare cost with NRV separately for these unrelated products. Alpha is written down to €8,000; Beta stays at its €7,000 cost. Total inventory is €15,000."
 },
 {
  "cat": "Balance Sheet",
  "title": "Periodic Weighted-Average Inventory",
  "question": "A retailer starts the month with 100 identical units costing €12 each, then purchases 200 units at €18 each. It sells 180 units during the month and has no returns or losses. The retailer applies the periodic weighted-average method; net realisable value exceeds cost. What are ending inventory and cost of goods sold?",
  "options": {
   "A": "Ending inventory €2,160; cost of goods sold €2,640.",
   "B": "Ending inventory €1,800; cost of goods sold €2,700.",
   "C": "Ending inventory €1,920; cost of goods sold €2,880.",
   "D": "Ending inventory €2,880; cost of goods sold €1,920."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. This is the FIFO outcome: all 120 remaining units are valued at the latest €18 cost. The specified periodic weighted-average cost is €16 per unit.",
   "B": "Incorrect. (€12 + €18) / 2 = €15 is a simple average that ignores the different quantities purchased. The weighted average is (100 × €12 + 200 × €18) / 300 = €16.",
   "C": "Correct. Goods available cost €1,200 + €3,600 = €4,800 for 300 units, so the periodic average is €16. Ending quantity = 300 − 180 = 120 units: inventory = 120 × €16 = €1,920; cost of goods sold = 180 × €16 = €2,880.",
   "D": "Incorrect. The two figures are reversed. The 180 units sold cost €2,880; the 120 units still held cost €1,920. Together they reconcile to €4,800."
  },
  "recap": "Weight unit costs by quantities: total cost €4,800 / 300 units = €16. The 120 remaining units are worth €1,920, and the 180 sold cost €2,880."
 },
 {
  "cat": "Balance Sheet",
  "title": "Recording a New Share Issue",
  "question": "A company issues 6,000 ordinary shares for cash at €12 each. Each share has a nominal value of €3, all shares are fully paid immediately, and there are no issue costs. What increases arise in cash, share capital and share premium?",
  "options": {
   "A": "Cash €72,000; share capital €18,000; share premium €54,000.",
   "B": "Cash €72,000; share capital €72,000; share premium €0.",
   "C": "Cash €18,000; share capital €18,000; share premium €0.",
   "D": "Cash €72,000; share capital €18,000; share premium €72,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Cash = 6,000 × €12 = €72,000. Share capital uses nominal value: 6,000 × €3 = €18,000. The excess is share premium: 6,000 × (€12 − €3) = €54,000. Total equity increases by €72,000.",
   "B": "Incorrect. Share capital is measured at the stated nominal value, not the entire issue price. Of the €72,000 proceeds, €18,000 is share capital and €54,000 is share premium.",
   "C": "Incorrect. This records only the nominal value and ignores €54,000 received above nominal value. Cash receipts are the full 6,000 × €12 = €72,000.",
   "D": "Incorrect. €72,000 is total cash received, not the premium alone. Adding €72,000 premium to €18,000 capital would overstate equity by €18,000. Premium is €54,000."
  },
  "recap": "Share capital records nominal value; share premium records proceeds above nominal value. €18,000 + €54,000 = the €72,000 cash received."
 },
 {
  "cat": "Balance Sheet",
  "title": "Retained Earnings Reconciliation",
  "question": "Opening retained earnings are €95,000. During the year, the company earns €42,000 profit after tax, declares and pays €18,000 dividends, and transfers €9,000 from retained earnings to a separately presented statutory reserve. It also receives €35,000 from a new share issue. With no other changes, what are closing retained earnings after these entries?",
  "options": {
   "A": "€119,000.",
   "B": "€110,000.",
   "C": "€145,000.",
   "D": "€128,000."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. €95,000 + €42,000 − €18,000 = €119,000 omits the €9,000 transferred out to the separately presented statutory reserve. Closing retained earnings are €110,000.",
   "B": "Correct. Closing retained earnings = €95,000 + €42,000 − €18,000 − €9,000 = €110,000. The €35,000 share issue increases contributed equity, not retained earnings. The reserve transfer changes the composition of equity without reducing total equity.",
   "C": "Incorrect. This adds €35,000 of share issue proceeds to the correct €110,000 retained earnings. Share subscriptions belong in contributed equity rather than accumulated profits.",
   "D": "Incorrect. This adds the €9,000 reserve transfer instead of deducting it: €95,000 + €42,000 − €18,000 + €9,000 = €128,000. The stated transfer is out of retained earnings."
  },
  "recap": "Retained earnings close at €95,000 + €42,000 − €18,000 − €9,000 = €110,000. New share proceeds are separate, and an internal reserve transfer leaves total equity unchanged."
 },
 {
  "cat": "Balance Sheet",
  "title": "Receivable Allowance Adjustment",
  "question": "At year end, gross trade receivables are €120,000: €90,000 in a group with a 2% lifetime expected credit loss rate and €30,000 in a group with a 10% rate. These rates already reflect current conditions and supportable forecasts. Before adjustment, the loss allowance has a €1,500 credit balance. There are no further write-offs. What are net receivables and the additional impairment expense required?",
  "options": {
   "A": "Net receivables €118,500; additional expense €0.",
   "B": "Net receivables €115,200; additional expense €4,800.",
   "C": "Net receivables €113,700; additional expense €4,800.",
   "D": "Net receivables €115,200; additional expense €3,300."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. This keeps only the existing €1,500 allowance. The closing estimate is €90,000 × 2% + €30,000 × 10% = €4,800, so another €3,300 is required.",
   "B": "Incorrect. Net receivables of €115,200 are correct, but €4,800 is the required closing allowance, not the additional expense. Subtract the existing €1,500 balance to obtain €3,300.",
   "C": "Incorrect. Adding a new €4,800 allowance to the existing €1,500 produces €6,300 and double-counts the existing amount. The total closing allowance should be €4,800, giving net receivables of €115,200.",
   "D": "Correct. Required closing allowance = €1,800 + €3,000 = €4,800. Net receivables = €120,000 − €4,800 = €115,200. Additional expense = €4,800 − the existing €1,500 allowance = €3,300."
  },
  "recap": "Distinguish the closing allowance from its adjustment. The required allowance is €4,800, but only €3,300 more is expensed because €1,500 is already recorded."
 },
 {
  "cat": "Balance Sheet",
  "title": "Warranty Provision from Expected Claims",
  "question": "A manufacturer sells 4,000 appliances with an assurance warranty covering defects. For each appliance, mutually exclusive outcomes are estimated as 90% no claim, 8% a minor repair costing €30, and 2% a major repair costing €180. A settlement outflow for the warranty population is probable, estimates are reliable, no claims have yet been settled and discounting is immaterial. What closing warranty provision is required?",
  "options": {
   "A": "€0.",
   "B": "€9,600.",
   "C": "€24,000.",
   "D": "€84,000."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. No claim is the most likely outcome for one appliance, but the large warranty population has a probable outflow. Its expected total cost must be recognised rather than using the most likely individual outcome of zero.",
   "B": "Incorrect. 4,000 × 8% × €30 = €9,600 includes only minor repairs. Major repairs add 4,000 × 2% × €180 = €14,400, bringing the provision to €24,000.",
   "C": "Correct. Expected repair cost per appliance = 90% × €0 + 8% × €30 + 2% × €180 = €6. For 4,000 appliances, the provision is 4,000 × €6 = €24,000.",
   "D": "Incorrect. 4,000 × 10% × (€30 + €180) = €84,000 charges both repair types to all expected claims. The outcomes are mutually exclusive and have separate probabilities: €9,600 + €14,400 = €24,000."
  },
  "recap": "For a large warranty population, weight each mutually exclusive outcome by its probability. Expected cost is €6 per appliance, so 4,000 appliances require a €24,000 provision."
 },
 {
  "cat": "Balance Sheet",
  "title": "Inventory in a Long Operating Cycle",
  "question": "A wine producer has a clearly identifiable normal operating cycle of 24 months. At the reporting date, wine inventory is expected to be sold 18 months later as part of that cycle. A bottling machine will be used for eight years and is not held for sale. In a classified balance sheet, how should these two assets be presented?",
  "options": {
   "A": "Wine inventory: current asset; bottling machine: noncurrent asset.",
   "B": "Wine inventory: noncurrent asset; bottling machine: noncurrent asset.",
   "C": "Wine inventory: current asset; bottling machine: current asset.",
   "D": "Wine inventory: noncurrent asset; bottling machine: current asset."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Inventory expected to be realised in the normal operating cycle is current even when that cycle exceeds 12 months. The machine is held for long-term use across many cycles, so it is noncurrent.",
   "B": "Incorrect. The machine is correctly noncurrent, but the wine belongs to the clearly identified normal operating cycle. The 18-month sale date does not make that inventory noncurrent.",
   "C": "Incorrect. Wine inventory is current, but the machine is not inventory being sold or consumed in the operating cycle. It is equipment used over eight years and is noncurrent.",
   "D": "Incorrect. Both classifications are reversed. Wine realised within the normal operating cycle is current; equipment retained for eight years is noncurrent."
  },
  "recap": "Current classification includes inventory realised within the normal operating cycle, even beyond 12 months. Long-term production equipment remains noncurrent."
 },
 {
  "cat": "Balance Sheet",
  "title": "Forecast Losses Are Not a Provision",
  "question": "A retailer forecasts operating losses next year because of weaker demand. At the reporting date, it has no onerous contracts, no announced restructuring plan and no other present obligation related to those forecast losses. Management wants to recognise a provision now. What is the appropriate treatment?",
  "options": {
   "A": "Recognise the forecast losses as a provision because they are likely.",
   "B": "Do not recognise a provision for future operating losses; consider whether the forecast indicates impairment of existing assets.",
   "C": "Recognise a provision equal to the forecast cash outflow, with no expense until payment.",
   "D": "Recognise the forecast losses as a negative equity reserve instead of an expense."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Probability alone is insufficient. A provision requires a present obligation from a past event; the question specifies that none exists for these future operating losses.",
   "B": "Correct. Forecast losses from future operations do not themselves create a present obligation. They are therefore not provided for, although weaker expected cash flows may indicate that existing assets need an impairment assessment.",
   "C": "Incorrect. Estimating future cash payments does not create a present obligation. In addition, recognising a provision does not generally mean postponing the related expense until cash is paid.",
   "D": "Incorrect. Moving the forecast into an equity reserve does not solve the absence of a present obligation or a current recognised loss. Forecast future operating losses are not recorded this way."
  },
  "recap": "A probable future loss is not enough for a provision: there must be a present obligation. A loss forecast may instead be an indicator that existing assets are impaired."
 },
 {
  "cat": "Balance Sheet",
  "title": "Purchased Licence vs Internal Brand",
  "question": "A company purchases an exclusive software licence that it controls, will use for several years and can measure reliably at cost. It also develops its own brand through advertising and has not acquired that brand from another entity. Which treatment of these two items is appropriate under IAS 38?",
  "options": {
   "A": "Recognise both as intangible assets whenever management expects future sales.",
   "B": "Expense the licence because it lacks physical substance; recognise the internal brand as an asset.",
   "C": "Recognise the qualifying purchased licence as an intangible asset; do not recognise the internally generated brand as an intangible asset.",
   "D": "Recognise neither unless an active market exists for each item."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Expecting future sales does not override the specific prohibition on recognising internally generated brands. The qualifying purchased licence can be recognised, but the internal brand cannot.",
   "B": "Incorrect. Lack of physical substance is a feature of an intangible asset, not a reason to reject the licence. The internally generated brand is the item that cannot be recognised as an intangible asset.",
   "C": "Correct. The purchased licence is an identifiable, controlled resource that meets the stated recognition conditions. IAS 38 does not allow the internally generated brand to be recognised as an intangible asset; advertising expenditure does not create a recognised brand asset.",
   "D": "Incorrect. An active market is relevant to using a revaluation model after recognition. It is not a general condition for initially recognising a qualifying purchased licence at cost, and it would not permit recognition of the internally generated brand."
  },
  "recap": "A qualifying purchased licence can be an intangible asset. Internally generated brands are not recognised as intangible assets, and an active market is not an initial-recognition requirement."
 },
 {
  "cat": "Income Statement",
  "title": "Sales Returns and Gross Profit",
  "question": "A retailer has sales of EUR 250,000 before returns. Customers return goods sold for EUR 20,000, originally costing EUR 12,000; the goods are undamaged and returned to inventory. Cost of sales before these returns is EUR 150,000. Ignore other items. What is gross profit after recording both effects of the returns?",
  "options": {
   "A": "EUR 92,000",
   "B": "EUR 80,000",
   "C": "EUR 112,000",
   "D": "EUR 100,000"
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Net revenue is 250,000 - 20,000 = 230,000. Net cost of sales is 150,000 - 12,000 = 138,000. Gross profit is 230,000 - 138,000 = 92,000.",
   "B": "Incorrect. 250,000 - 20,000 - 150,000 = 80,000 reverses revenue but forgets the EUR 12,000 restored to inventory, which reduces cost of sales.",
   "C": "Incorrect. 250,000 - (150,000 - 12,000) = 112,000 reverses cost of sales but leaves the returned goods in revenue.",
   "D": "Incorrect. 250,000 - 150,000 = 100,000 is gross profit before the returns. The returns reduce it by 20,000 - 12,000 = 8,000."
  },
  "recap": "A sales return reverses the revenue and, for recoverable goods returned to stock, the related cost of sales. Here gross profit falls by EUR 8,000 to EUR 92,000."
 },
 {
  "cat": "Income Statement",
  "title": "From Gross Profit to Operating Profit",
  "question": "In a simplified statement by function, a publisher reports revenue of EUR 600,000, cost of sales of EUR 360,000, distribution costs of EUR 50,000 and administrative costs of EUR 90,000. Other operating income is EUR 10,000. Interest expense is EUR 15,000. Define EBIT here as revenue less operating expenses plus other operating income, before interest and tax. What is EBIT?",
  "options": {
   "A": "EUR 95,000",
   "B": "EUR 110,000",
   "C": "EUR 100,000",
   "D": "EUR 240,000"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. 600,000 - 360,000 - 50,000 - 90,000 + 10,000 - 15,000 = 95,000 includes interest. It is profit before tax under these assumptions, not EBIT.",
   "B": "Correct. Gross profit is 600,000 - 360,000 = 240,000. EBIT is 240,000 - 50,000 - 90,000 + 10,000 = 110,000.",
   "C": "Incorrect. 240,000 - 50,000 - 90,000 = 100,000 omits the EUR 10,000 of other operating income.",
   "D": "Incorrect. 600,000 - 360,000 = 240,000 is gross profit; operating expenses and other operating income must still be included."
  },
  "recap": "Gross profit covers cost of sales. Continue through distribution, administration and other operating items to obtain EBIT: EUR 110,000."
 },
 {
  "cat": "Income Statement",
  "title": "Recovering an Unreported Operating Cost",
  "question": "A simplified statement reports revenue of EUR 500,000 and profit after tax of EUR 72,000. Interest expense is EUR 24,000 and is the only non-operating item. Tax expense equals 25% of positive profit before tax, with no tax adjustments or deferred tax. There are no discontinued operations. What total operating costs are implied?",
  "options": {
   "A": "EUR 404,000",
   "B": "EUR 452,000",
   "C": "EUR 380,000",
   "D": "EUR 410,000"
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. 72,000 / 0.75 = 96,000 is profit before tax. Subtracting it directly from revenue gives 404,000 but wrongly includes interest among operating costs.",
   "B": "Incorrect. 500,000 - 72,000 + 24,000 = 452,000 skips the tax reversal and uses the wrong sign for interest when recovering costs.",
   "C": "Correct. Profit before tax is 72,000 / 0.75 = 96,000. Profit before interest and tax is 96,000 + 24,000 = 120,000. Operating costs are 500,000 - 120,000 = 380,000.",
   "D": "Incorrect. 72,000 x 1.25 = 90,000 does not reverse a 25% tax deduction. Dividing by 0.75 gives 96,000, after which interest must also be added back."
  },
  "recap": "Work backwards: after-tax profit / (1 - tax rate), then add interest, then subtract the resulting operating profit from revenue. Operating costs are EUR 380,000."
 },
 {
  "cat": "Income Statement",
  "title": "Gross Margin Is a Percentage of Revenue",
  "question": "A bicycle parts supplier earns revenue of EUR 400,000 and incurs cost of sales of EUR 280,000. Its sales manager says the gross margin is 42.86% because gross profit is divided by cost of sales. Define gross margin as gross profit / revenue. Which correction is right?",
  "options": {
   "A": "Gross margin is 70%; gross profit is EUR 280,000.",
   "B": "Gross margin is 42.86%; gross profit is EUR 120,000.",
   "C": "Gross margin is 12%; gross profit is EUR 48,000.",
   "D": "Gross margin is 30%; 42.86% is the markup on cost."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. 280,000 / 400,000 = 70% is the cost-of-sales ratio, not gross margin. Gross profit is 400,000 - 280,000 = 120,000.",
   "B": "Incorrect. Gross profit is correctly 120,000, but 120,000 / 280,000 = 42.86% uses cost as the denominator and measures markup.",
   "C": "Incorrect. Gross profit is 120,000, not 48,000. Dividing 120,000 by revenue of 400,000 gives 30%, not 12%.",
   "D": "Correct. Gross profit is 400,000 - 280,000 = 120,000. Gross margin is 120,000 / 400,000 = 30%; markup is 120,000 / 280,000, approximately 42.86%."
  },
  "recap": "The denominator matters: gross margin uses revenue; markup uses cost. The same EUR 120,000 gross profit gives a 30% margin and a 42.86% markup."
 },
 {
  "cat": "Income Statement",
  "title": "Correcting Omitted Depreciation",
  "question": "A service company has provisionally calculated profit before tax of EUR 90,000 but omitted EUR 10,000 of this year's office-equipment depreciation. The full depreciation charge is an expense of this period and is tax-deductible. Tax expense is 20% of profit before tax; there is no deferred tax or other adjustment. What is corrected profit after tax?",
  "options": {
   "A": "EUR 64,000",
   "B": "EUR 72,000",
   "C": "EUR 62,000",
   "D": "EUR 80,000"
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Corrected profit before tax is 90,000 - 10,000 = 80,000. Tax is 80,000 x 20% = 16,000, leaving 64,000.",
   "B": "Incorrect. 90,000 x 80% = 72,000 leaves the omitted depreciation uncorrected.",
   "C": "Incorrect. 72,000 - 10,000 = 62,000 deducts depreciation from provisional after-tax profit without reducing tax by 10,000 x 20% = 2,000.",
   "D": "Incorrect. 90,000 - 10,000 = 80,000 is corrected profit before tax. Tax of 16,000 still needs to be deducted."
  },
  "recap": "A deductible EUR 10,000 depreciation charge reduces after-tax profit by EUR 8,000 when the tax rate is 20%. Corrected profit after tax is EUR 64,000."
 },
 {
  "cat": "Income Statement",
  "title": "Reconstructing Closing Raw Materials",
  "question": "A workshop begins the year with raw materials costing EUR 45,000. It purchases EUR 180,000 and returns EUR 8,000 of those purchases to suppliers. Its records show materials consumed of EUR 190,000. There are no write-downs, losses, freight adjustments or other movements. What closing raw-material inventory reconciles these figures?",
  "options": {
   "A": "EUR 35,000",
   "B": "EUR 27,000",
   "C": "EUR 63,000",
   "D": "EUR 407,000"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. 45,000 + 180,000 - 190,000 = 35,000 ignores the EUR 8,000 returned to suppliers.",
   "B": "Correct. Materials available are 45,000 + 180,000 - 8,000 = 217,000. Closing inventory is 217,000 - 190,000 = 27,000.",
   "C": "Incorrect. The inventory movement is a decrease of 190,000 - (180,000 - 8,000) = 18,000. Adding it to 45,000 gives 63,000 but reverses the direction.",
   "D": "Incorrect. 45,000 + 180,000 - 8,000 + 190,000 = 407,000 adds consumption to inventory. Consumption removes materials, so it must be subtracted."
  },
  "recap": "Opening stock + net purchases - consumption = closing stock. Here EUR 45,000 + EUR 172,000 - EUR 190,000 = EUR 27,000."
 },
 {
  "cat": "Income Statement",
  "title": "Finished Goods and Cost of Sales",
  "question": "A furniture maker starts with finished goods of EUR 70,000 and completes production costing EUR 330,000 during the year. Closing finished goods are EUR 100,000. The production figure already includes all manufacturing costs; there are no inventory losses or other movements. Revenue is EUR 480,000. What are cost of sales and gross profit?",
  "options": {
   "A": "Cost of sales EUR 330,000; gross profit EUR 150,000.",
   "B": "Cost of sales EUR 430,000; gross profit EUR 50,000.",
   "C": "Cost of sales EUR 300,000; gross profit EUR 180,000.",
   "D": "Cost of sales EUR 360,000; gross profit EUR 120,000."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Using production cost of 330,000 as cost of sales ignores the 100,000 - 70,000 = 30,000 increase in finished goods.",
   "B": "Incorrect. 330,000 + 100,000 = 430,000 adds closing inventory and omits opening inventory. Closing goods have not been sold and must be deducted.",
   "C": "Correct. Cost of sales is 70,000 + 330,000 - 100,000 = 300,000. Gross profit is 480,000 - 300,000 = 180,000.",
   "D": "Incorrect. 330,000 + (100,000 - 70,000) = 360,000 treats an inventory increase as extra cost of sales; it should reduce cost of sales."
  },
  "recap": "Goods available for sale less closing finished goods gives cost of sales: EUR 300,000. Subtracting that from revenue gives gross profit of EUR 180,000."
 },
 {
  "cat": "Income Statement",
  "title": "A Price Increase and After-Tax Profit",
  "question": "A supplier sells 10,000 units per year. For next year it raises the selling price from EUR 50 to EUR 54 and expects the same volume. Total cost of sales is unchanged, but an additional advertising campaign costs EUR 12,000. All other operating and financing items are unchanged. Tax expense equals 25% of profit before tax in both profitable years, with no adjustments. How much does profit after tax increase?",
  "options": {
   "A": "EUR 40,000",
   "B": "EUR 28,000",
   "C": "EUR 30,000",
   "D": "EUR 21,000"
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. 10,000 x (54 - 50) = 40,000 is the revenue increase before extra advertising and tax.",
   "B": "Incorrect. 40,000 - 12,000 = 28,000 is the increase before tax. Tax on that increase is 7,000.",
   "C": "Incorrect. 40,000 x 75% = 30,000 taxes the revenue increase but overlooks the advertising expense.",
   "D": "Correct. Revenue increases by 10,000 x 4 = 40,000. Additional before-tax profit is 40,000 - 12,000 = 28,000. After tax, the increase is 28,000 x 75% = 21,000."
  },
  "recap": "For this simplified change, extra after-tax profit = (extra revenue - extra operating expense) x (1 - tax rate) = EUR 21,000."
 },
 {
  "cat": "Income Statement",
  "title": "Combining Continuing and Discontinued Results",
  "question": "A company reports profit after tax from continuing operations of EUR 84,000. A division that meets the definition of a discontinued operation has an after-tax operating loss of EUR 9,000 and an after-tax gain on disposal of EUR 15,000. Both division amounts belong to the current year. With no other items, what is total profit for the year?",
  "options": {
   "A": "EUR 90,000",
   "B": "EUR 108,000",
   "C": "EUR 60,000",
   "D": "EUR 75,000"
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The discontinued result is -9,000 + 15,000 = 6,000. Total profit is 84,000 + 6,000 = 90,000; all amounts are already after tax.",
   "B": "Incorrect. 84,000 + 9,000 + 15,000 = 108,000 treats the division's loss as a gain.",
   "C": "Incorrect. 84,000 - 9,000 - 15,000 = 60,000 treats the disposal gain as a loss.",
   "D": "Incorrect. 84,000 - 9,000 = 75,000 excludes the EUR 15,000 after-tax disposal gain."
  },
  "recap": "Combine the after-tax operating result and disposal result of the discontinued operation, then add the net amount to continuing profit. Do not tax already after-tax figures again."
 },
 {
  "cat": "Income Statement",
  "title": "Avoiding Double-Counted Depreciation",
  "question": "A simplified statement by function shows revenue of EUR 900,000, cost of sales of EUR 540,000, distribution expenses of EUR 110,000 and administrative expenses of EUR 100,000. A note says total depreciation of EUR 60,000 is already included within those three expense lines. There are no other operating items. What is operating profit?",
  "options": {
   "A": "EUR 90,000",
   "B": "EUR 150,000",
   "C": "EUR 210,000",
   "D": "EUR 360,000"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. 900,000 - 540,000 - 110,000 - 100,000 - 60,000 = 90,000 deducts depreciation twice.",
   "B": "Correct. Operating profit is 900,000 - 540,000 - 110,000 - 100,000 = 150,000. The note disaggregates expenses already recognized; it does not add a new expense.",
   "C": "Incorrect. 150,000 + 60,000 = 210,000 adds depreciation back. That does not give operating profit as defined by the listed expenses.",
   "D": "Incorrect. 900,000 - 540,000 = 360,000 is gross profit before distribution and administrative expenses."
  },
  "recap": "A note may explain costs already embedded in the statement. Depreciation disclosed separately must not be subtracted again when it is included in the function-based expense lines."
 },
 {
  "cat": "Cash Flow",
  "title": "Cash Collected from Credit Customers",
  "question": "All sales are on credit. During the year, revenue is EUR 240,000. Trade receivables rise from EUR 36,000 to EUR 54,000. There are no write-offs, customer advances, VAT or other receivable movements. How much cash is collected from customers?",
  "options": {
   "A": "EUR 258,000.",
   "B": "EUR 222,000.",
   "C": "EUR 186,000.",
   "D": "EUR 240,000."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Adding the EUR 18,000 increase reverses its effect: an increase means some revenue has not yet been collected.",
   "B": "Correct. Collections = opening receivables + credit sales - closing receivables = 36,000 + 240,000 - 54,000 = EUR 222,000.",
   "C": "Incorrect. Subtracting closing receivables alone omits the EUR 36,000 due at the beginning of the year.",
   "D": "Incorrect. Revenue equals collections only if receivables do not change under the stated assumptions."
  },
  "recap": "Receivables bridge revenue and cash: collections = opening receivables + credit sales - closing receivables. Here the EUR 18,000 increase leaves collections EUR 18,000 below revenue."
 },
 {
  "cat": "Cash Flow",
  "title": "Cash Paid for Credit Purchases",
  "question": "A retailer buys EUR 180,000 of inventory, all on credit. Trade payables are EUR 28,000 at the beginning of the year and EUR 43,000 at the end. Ignore VAT and assume no other payable movements. What cash amount is paid to inventory suppliers?",
  "options": {
   "A": "EUR 195,000.",
   "B": "EUR 180,000.",
   "C": "EUR 251,000.",
   "D": "EUR 165,000."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Adding the EUR 15,000 increase in payables is backwards: more unpaid purchases mean less cash paid.",
   "B": "Incorrect. This ignores the EUR 15,000 of additional supplier credit outstanding at year end.",
   "C": "Incorrect. Adding opening and closing payables to purchases does not reconcile the liability; closing payables must be deducted.",
   "D": "Correct. Supplier payments = 28,000 + 180,000 - 43,000 = EUR 165,000."
  },
  "recap": "Cash paid to suppliers = opening trade payables + credit purchases - closing trade payables. An increase in payables reduces cash paid relative to purchases."
 },
 {
  "cat": "Cash Flow",
  "title": "From Cost of Sales to Supplier Payments",
  "question": "A retailer has cost of sales of EUR 220,000. Inventory rises from EUR 50,000 to EUR 65,000, while trade payables fall from EUR 30,000 to EUR 20,000. All inventory is bought on credit. Assume no write-downs, VAT or other movements. What are cash payments to suppliers?",
  "options": {
   "A": "EUR 245,000.",
   "B": "EUR 235,000.",
   "C": "EUR 205,000.",
   "D": "EUR 225,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Purchases = 220,000 + 65,000 - 50,000 = EUR 235,000. Payments = 235,000 + 30,000 - 20,000 = EUR 245,000.",
   "B": "Incorrect. EUR 235,000 is purchases, before adding the EUR 10,000 reduction in outstanding supplier debt.",
   "C": "Incorrect. Subtracting the inventory increase from cost of sales gives neither purchases nor payments.",
   "D": "Incorrect. This correctly finds purchases but subtracts the payable reduction instead of adding it."
  },
  "recap": "Use two bridges: purchases = cost of sales + closing inventory - opening inventory; supplier payments = purchases + opening payables - closing payables. The result is EUR 245,000."
 },
 {
  "cat": "Cash Flow",
  "title": "Indirect Cash Flow with Mixed Adjustments",
  "question": "In a simplified operating cash-flow reconciliation, operating profit is EUR 120,000 after depreciation of EUR 18,000. Trade receivables increase by EUR 15,000, inventory decreases by EUR 8,000 and trade payables decrease by EUR 6,000. There are no taxes, interest, disposal gains or other adjustments. What is operating cash flow?",
  "options": {
   "A": "EUR 167,000.",
   "B": "EUR 109,000.",
   "C": "EUR 125,000.",
   "D": "EUR 143,000."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Adding every adjustment misses the signs: increasing receivables and decreasing payables absorb cash.",
   "B": "Incorrect. This incorrectly subtracts the inventory decrease; releasing inventory adds cash in the reconciliation.",
   "C": "Correct. Operating cash flow = 120,000 + 18,000 - 15,000 + 8,000 - 6,000 = EUR 125,000.",
   "D": "Incorrect. This double-counts the EUR 18,000 depreciation add-back."
  },
  "recap": "Add noncash depreciation; deduct an increase in receivables; add a decrease in inventory; deduct a decrease in payables. Here: 120,000 + 18,000 - 15,000 + 8,000 - 6,000 = EUR 125,000."
 },
 {
  "cat": "Cash Flow",
  "title": "Asset Sale Gain in the Cash Flow Statement",
  "question": "Operating profit of EUR 90,000 includes a EUR 6,000 gain on selling an old machine. The machine had a carrying amount of EUR 24,000 and was sold for EUR 30,000 cash. Depreciation expense is EUR 12,000. Assume no working-capital changes, taxes, interest or other adjustments. What are operating cash flow and investing cash inflow from this sale?",
  "options": {
   "A": "Operating EUR 102,000; investing EUR 6,000.",
   "B": "Operating EUR 96,000; investing EUR 30,000.",
   "C": "Operating EUR 96,000; investing EUR 6,000.",
   "D": "Operating EUR 90,000; investing EUR 30,000."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The disposal gain must be removed from operating profit, and the investing inflow is the full proceeds rather than just the gain.",
   "B": "Correct. Operating cash flow = 90,000 + 12,000 - 6,000 = EUR 96,000. The full EUR 30,000 proceeds are an investing inflow.",
   "C": "Incorrect. The operating amount is right, but cash received is EUR 30,000, not the EUR 6,000 accounting gain.",
   "D": "Incorrect. This leaves operating profit unadjusted for depreciation and the disposal gain."
  },
  "recap": "Remove the gain from the operating reconciliation and report the entire asset-sale receipt under investing. A gain measures profit on disposal, not the cash proceeds."
 },
 {
  "cat": "Cash Flow",
  "title": "Asset Sale Loss in the Cash Flow Statement",
  "question": "Operating profit is EUR 40,000 after depreciation of EUR 9,000 and a EUR 6,000 loss on selling equipment. Its carrying amount was EUR 20,000 and cash proceeds were EUR 14,000. Assume no working-capital changes, taxes, interest or other adjustments. What are operating cash flow and the investing inflow?",
  "options": {
   "A": "Operating EUR 55,000; investing EUR 14,000.",
   "B": "Operating EUR 49,000; investing EUR 14,000.",
   "C": "Operating EUR 55,000; investing EUR 20,000.",
   "D": "Operating EUR 43,000; investing EUR 14,000."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Add back depreciation and the disposal loss: 40,000 + 9,000 + 6,000 = EUR 55,000. Investing reports EUR 14,000 received.",
   "B": "Incorrect. This adds back depreciation but leaves the disposal loss in operating cash flow.",
   "C": "Incorrect. The operating amount is right, but carrying amount is not the cash received from the buyer.",
   "D": "Incorrect. This subtracts the loss after adding depreciation; a loss already reduced profit and must be added back."
  },
  "recap": "A disposal loss is added back when reconciling operating profit to operating cash flow. The cash proceeds, EUR 14,000, belong in investing; the EUR 20,000 carrying amount is not a cash flow."
 },
 {
  "cat": "Cash Flow",
  "title": "Working Capital Releases and Uses of Cash",
  "question": "Cash generated from operations before working-capital changes is EUR 80,000. Trade receivables decrease by EUR 12,000, inventories increase by EUR 20,000 and trade payables increase by EUR 9,000. There are no other adjustments. What is the amount after these changes?",
  "options": {
   "A": "EUR 39,000.",
   "B": "EUR 63,000.",
   "C": "EUR 97,000.",
   "D": "EUR 81,000."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Deducting all three movements ignores that collecting receivables and extending supplier credit release cash.",
   "B": "Incorrect. This wrongly deducts the increase in payables instead of adding it.",
   "C": "Incorrect. This treats the inventory increase as a cash release and the receivable decrease as a cash use.",
   "D": "Correct. The calculation is 80,000 + 12,000 - 20,000 + 9,000 = EUR 81,000."
  },
  "recap": "A decrease in operating receivables and an increase in operating payables release cash; an increase in inventory uses cash. The net adjustment here is +EUR 1,000."
 },
 {
  "cat": "Cash Flow",
  "title": "Building Operating Cash Flow by the Direct Method",
  "question": "A company receives EUR 340,000 from customers and pays EUR 190,000 to suppliers, EUR 72,000 to employees and EUR 18,000 in operating income taxes. Separately, depreciation expense is EUR 25,000. There are no other operating cash flows. What is operating cash flow under the direct method?",
  "options": {
   "A": "EUR 35,000.",
   "B": "EUR 85,000.",
   "C": "EUR 60,000.",
   "D": "EUR 78,000."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. This incorrectly deducts noncash depreciation from the cash receipts and payments.",
   "B": "Incorrect. This adds depreciation even though the calculation already starts from actual cash flows.",
   "C": "Correct. Operating cash flow = 340,000 - 190,000 - 72,000 - 18,000 = EUR 60,000. Depreciation is not a payment.",
   "D": "Incorrect. This omits the EUR 18,000 tax payment specified as operating."
  },
  "recap": "With the direct method, add actual operating receipts and subtract actual operating payments. A depreciation adjustment is needed in a profit reconciliation, not in a list of cash receipts and payments."
 },
 {
  "cat": "Cash Flow",
  "title": "Financing Cash Flow and Unpaid Dividends",
  "question": "During the year a company receives EUR 100,000 from a bank loan and EUR 80,000 from issuing shares, and repays EUR 35,000 of loan principal. Dividends of EUR 20,000 are declared, but only EUR 12,000 is paid. The company classifies dividends paid as financing. Ignore interest and all other transactions. What is net financing cash flow?",
  "options": {
   "A": "EUR 133,000 inflow.",
   "B": "EUR 125,000 inflow.",
   "C": "EUR 145,000 inflow.",
   "D": "EUR 203,000 inflow."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Net financing cash flow = 100,000 + 80,000 - 35,000 - 12,000 = EUR 133,000. The unpaid EUR 8,000 is not a cash flow.",
   "B": "Incorrect. This deducts all dividends declared, including the EUR 8,000 not yet paid.",
   "C": "Incorrect. This omits the EUR 12,000 cash dividend payment.",
   "D": "Incorrect. This adds the principal repayment even though it is cash paid to the lender."
  },
  "recap": "Financing cash flow includes cash received from lenders and shareholders, less principal and dividend payments under the policy given. A declaration without payment does not create a cash outflow."
 },
 {
  "cat": "Cash Flow",
  "title": "Reconciling Opening and Closing Cash",
  "question": "Opening cash and cash equivalents are EUR 42,000. During the year, operating activities generate EUR 95,000, investing activities use EUR 110,000 and financing activities generate EUR 30,000. Exchange-rate changes increase the value of foreign-currency cash by EUR 3,000. What is closing cash and cash equivalents?",
  "options": {
   "A": "EUR 57,000.",
   "B": "EUR 60,000.",
   "C": "EUR 18,000.",
   "D": "EUR 54,000."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. This includes the three cash-flow categories but omits the positive EUR 3,000 exchange-rate effect.",
   "B": "Correct. Closing cash = 42,000 + 95,000 - 110,000 + 30,000 + 3,000 = EUR 60,000.",
   "C": "Incorrect. EUR 18,000 is the total change including exchange effects, not the closing balance.",
   "D": "Incorrect. This subtracts the exchange-rate effect, although the question states that it increases the balance."
  },
  "recap": "Closing cash equals opening cash plus operating, investing and financing cash flows, plus the separate exchange-rate effect. Exchange movements help reconcile the balance but are not themselves cash receipts or payments."
 },
 {
  "cat": "Cash Flow",
  "title": "Noncash Equipment Acquisition",
  "question": "A manufacturer acquires equipment for EUR 120,000 by issuing EUR 120,000 of its own shares directly to the equipment supplier. Neither party makes a cash payment. How should this transaction appear in the cash flow statement?",
  "options": {
   "A": "Investing outflow EUR 120,000 and financing inflow EUR 120,000.",
   "B": "Operating outflow EUR 120,000 and financing inflow EUR 120,000.",
   "C": "Investing outflow EUR 120,000 only.",
   "D": "No cash-flow amounts; disclose the noncash investing and financing transaction separately."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. These amounts would invent cash receipts and payments that never occurred.",
   "B": "Incorrect. No operating payment occurred, and equipment acquisition is not an ordinary operating expense.",
   "C": "Incorrect. The company did not pay cash for the equipment, so there is no investing cash outflow.",
   "D": "Correct. Both the asset acquisition and equity issue are noncash; separate disclosure explains them without adding fictitious cash flows."
  },
  "recap": "A transaction can increase both assets and equity without moving cash. An equipment-for-shares exchange is excluded from cash-flow totals and disclosed separately as a noncash investing and financing transaction."
 },
 {
  "cat": "Cash Flow",
  "title": "Transfers Between Cash and Cash Equivalents",
  "question": "A business transfers EUR 25,000 from its demand bank account into a two-month deposit acquired to meet short-term cash commitments. The deposit is readily convertible to a known cash amount and has insignificant value risk, so it qualifies as a cash equivalent. What is the effect on total cash and cash equivalents at the transfer date?",
  "options": {
   "A": "A EUR 25,000 investing cash outflow reduces the total.",
   "B": "A EUR 25,000 financing cash inflow increases the total.",
   "C": "No change in the total and no operating, investing or financing cash flow for the transfer.",
   "D": "A EUR 25,000 operating expense reduces the total."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The deposit remains inside cash and cash equivalents, so the transfer does not reduce their combined balance.",
   "B": "Incorrect. Moving existing cash does not raise new funds from lenders or shareholders.",
   "C": "Correct. The transfer exchanges one component of cash and cash equivalents for another: the combined amount stays unchanged.",
   "D": "Incorrect. Placing cash in a qualifying deposit is neither an expense nor an operating payment outside cash and cash equivalents."
  },
  "recap": "Transfers within cash and cash equivalents are cash-management movements. They change the composition of the balance, not its total, and are not reported as operating, investing or financing cash flows."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Reading a Measurement Policy",
  "question": "A manufacturer's note states that its machinery is measured at historical cost less accumulated depreciation and impairment losses. A reader wants to use the balance-sheet amount as the price the machines could fetch today. Which interpretation is best supported by the disclosed policy?",
  "options": {
   "A": "The carrying amount is necessarily today's market selling price.",
   "B": "The carrying amount must equal the original purchase price because the cost model ignores depreciation.",
   "C": "The carrying amount reflects the stated cost-based policy; it does not by itself establish today's market selling price.",
   "D": "The disclosed policy means any fall in market price is immediately deducted in full."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A cost-based carrying amount is not a quoted selling price. The policy does not say that machinery is remeasured to market value each year.",
   "B": "Incorrect. The policy explicitly subtracts accumulated depreciation and impairment, so carrying amount can differ from original cost.",
   "C": "Correct. The note identifies the basis behind the reported amount. Historical cost after depreciation and impairment does not by itself measure current sale proceeds.",
   "D": "Incorrect. An impairment assessment has its own measurement requirements. This policy does not require every market-price fall to be deducted euro for euro."
  },
  "recap": "Read the measurement policy before interpreting an asset number. A depreciated cost amount and a current market selling price answer different questions."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Useful-Life Estimates and Profit Comparisons",
  "question": "At the start of Year 3, office equipment has a carrying amount of EUR 60,000 and no residual value. Its remaining useful life was four years, but reliable new evidence changes that estimate to six years from the start of Year 3. The note explains that this is a change in estimate, not correction of an error. Using straight-line depreciation, with the whole charge expensed and ignoring tax, how does Year 3 profit compare with keeping the old estimate?",
  "options": {
   "A": "Profit is EUR 15,000 higher; no depreciation is needed after a revision.",
   "B": "Profit is EUR 5,000 lower; depreciation increases to EUR 20,000.",
   "C": "Profit is unchanged because estimate changes only affect future years after Year 3.",
   "D": "Profit is EUR 5,000 higher; Year 3 depreciation falls from EUR 15,000 to EUR 10,000."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Old depreciation was 60,000 / 4 = 15,000, but revising useful life does not remove depreciation. The new annual charge is 60,000 / 6 = 10,000.",
   "B": "Incorrect. The longer remaining life reduces the annual charge to 10,000. Neither 20,000 nor a 5,000 profit decrease follows from the data.",
   "C": "Incorrect. The new estimate applies from the start of Year 3, so Year 3 itself uses 60,000 / 6 = 10,000.",
   "D": "Correct. Old depreciation was 60,000 / 4 = 15,000; the revised charge is 60,000 / 6 = 10,000. Lower expense raises Year 3 profit by 5,000."
  },
  "recap": "The disclosed estimate change raises profit by EUR 5,000 without establishing better operating performance. Apply the revised remaining life from the change date; do not rewrite prior depreciation."
 },
 {
  "cat": "Notes & Reporting",
  "title": "A Debt Conversion Explained in the Notes",
  "question": "A note explains that a material bank loan was converted directly into ordinary shares during the year, with no cash transferred. A reader cannot find a cash repayment for the conversion. Which conclusion is appropriate?",
  "options": {
   "A": "The absence of a repayment cash flow is consistent with a noncash financing transaction; the note explains the change in capital structure.",
   "B": "The cash flow statement must invent an equal loan repayment and share-issue receipt to match the note.",
   "C": "No disclosure is needed because only transactions involving cash matter to financial-statement users.",
   "D": "The conversion proves that the company generated operating revenue equal to the loan amount."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Debt can become equity without a cash payment. Disclosure elsewhere in the financial statements explains this material financing change without presenting a fictitious cash flow.",
   "B": "Incorrect. There was no cash transfer, so recording a repayment and a receipt would create cash flows that did not occur.",
   "C": "Incorrect. Material noncash investing and financing transactions still require relevant disclosure even though they are absent from the cash flow statement.",
   "D": "Incorrect. Exchanging a financing liability for shares changes financing structure; it is not a sale to a customer and does not establish operating revenue."
  },
  "recap": "Notes help explain important noncash changes, including debt converted into equity. A financing change can be real even when there is no related cash receipt or payment."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Combining Segment Gross Margins",
  "question": "A segment note reports external revenue of EUR 300,000 and gross profit of EUR 90,000 for Components, and external revenue of EUR 100,000 and gross profit of EUR 50,000 for Services. These are the only segments, with no intersegment transactions or consolidation adjustments, and both use the same gross-profit definition. What is the group gross margin, defined as total gross profit / total revenue?",
  "options": {
   "A": "40%",
   "B": "35%",
   "C": "80%",
   "D": "30%"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. (30% + 50%) / 2 = 40% gives equal weight to unequal segment revenues. Components has three times the revenue of Services.",
   "B": "Correct. Total gross profit is 90,000 + 50,000 = 140,000. Total revenue is 300,000 + 100,000 = 400,000. Group gross margin is 140,000 / 400,000 = 35%.",
   "C": "Incorrect. 30% + 50% = 80% adds the segment percentages. Percentages must be combined using their revenue weights, not simply added.",
   "D": "Incorrect. 90,000 / 300,000 = 30% is the Components margin only. Including Services increases the group margin to 35%."
  },
  "recap": "Combine the underlying revenue and gross-profit amounts before calculating a group margin. Here the revenue-weighted result is 35%, not the simple average of 40%."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Reconciling Segment and Group Revenue",
  "question": "A group has only two segments. Manufacturing reports revenue of EUR 700,000, including EUR 120,000 of sales to Distribution. Distribution reports revenue of EUR 500,000, entirely from external customers. There are no other revenue adjustments. What consolidated revenue should the segment note reconcile to after eliminating internal sales?",
  "options": {
   "A": "EUR 1,200,000",
   "B": "EUR 960,000",
   "C": "EUR 1,080,000",
   "D": "EUR 580,000"
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. 700,000 + 500,000 = 1,200,000 includes the EUR 120,000 sale within the same group.",
   "B": "Incorrect. 1,200,000 - 2 x 120,000 = 960,000 eliminates the internal revenue twice. It appears once in the revenue total.",
   "C": "Correct. Combined segment revenue is 700,000 + 500,000 = 1,200,000. Deduct the internal sale once: 1,200,000 - 120,000 = 1,080,000.",
   "D": "Incorrect. 700,000 - 120,000 = 580,000 is Manufacturing external revenue only; Distribution also earns EUR 500,000 externally."
  },
  "recap": "Revenue from trading inside the group is eliminated on consolidation. Manufacturing external revenue of EUR 580,000 plus Distribution external revenue of EUR 500,000 gives EUR 1,080,000."
 },
 {
  "cat": "Notes & Reporting",
  "title": "Reconciling a Segment Profit Measure",
  "question": "A note defines the reported segment result as profit before depreciation, central-office costs, interest and tax. The two segments report EUR 70,000 and EUR 50,000 on that basis. The reconciliation lists depreciation of EUR 18,000, central-office costs of EUR 12,000 and interest expense of EUR 10,000, all excluded from the segment figures. There are no other differences. What group profit before tax follows?",
  "options": {
   "A": "EUR 120,000",
   "B": "EUR 90,000",
   "C": "EUR 110,000",
   "D": "EUR 80,000"
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. 70,000 + 50,000 = 120,000 is the total of the specifically defined segment results before all three adjustments.",
   "B": "Incorrect. 120,000 - 18,000 - 12,000 = 90,000 still excludes interest expense of 10,000, which must be deducted to reach profit before tax.",
   "C": "Incorrect. 120,000 - 10,000 = 110,000 deducts only interest and omits depreciation and central-office costs.",
   "D": "Correct. Total segment result is 70,000 + 50,000 = 120,000. Profit before tax is 120,000 - 18,000 - 12,000 - 10,000 = 80,000."
  },
  "recap": "Check the definition of a segment result and follow the reconciliation. Segment totals need not equal group profit before tax; here the excluded expenses reduce EUR 120,000 to EUR 80,000."
 },
 {
  "cat": "Cost Basics",
  "title": "Identifying the Cost Object",
  "question": "A restaurant wants to know what one dinner service costs, and separately what its kitchen department costs to run. In cost accounting terms, what changes between the two questions?",
  "options": {
   "A": "Nothing: the resources consumed are the same, so the costs are the same.",
   "B": "The cost object changes, and with it the classification of several resources as direct or indirect.",
   "C": "Only the cost configuration changes; the classification of each resource is fixed in advance.",
   "D": "The second question belongs to financial accounting rather than cost accounting."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The same resources can be classified differently, and the totals assigned differ, because the objective being costed is not the same.",
   "B": "Correct. Cost is the monetary measure of resources sacrificed to achieve a specific objective, and that objective is the cost object. Change the cost object and resources that were indirect can become direct, as the waiters do when the department rather than the single dinner is being costed.",
   "C": "Incorrect. Direct and indirect cannot be defined a priori for all resources: the classification follows the cost object.",
   "D": "Incorrect. Assigning costs to organizational units is one of the three stated purposes of cost accounting."
  },
  "recap": "Correct. Cost is the monetary measure of resources sacrificed to achieve a specific objective, and that objective is the cost object. Change the cost object and resources that were indirect can become direct, as the waiters do when the department rather than the single dinner is being costed."
 },
 {
  "cat": "Cost Basics",
  "title": "The Purposes of Cost Accounting",
  "question": "Which set correctly lists the purposes that cost accounting serves?",
  "options": {
   "A": "Calculating the cost of products, services and projects; assigning costs to organizational units; supporting short-term decision making.",
   "B": "Preparing the four financial statements, valuing inventory and computing taxable income.",
   "C": "Publishing cost information for investors, lenders and suppliers.",
   "D": "Setting selling prices, negotiating with suppliers and auditing the accounts."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Cost accounting computes and distributes enterprise costs for profitability analysis or inventory valuation, assigns costs to organizational units, and supports short-term decisions such as make or buy.",
   "B": "Incorrect. Preparing the financial statements is financial accounting; inventory valuation is only one use of the first purpose.",
   "C": "Incorrect. Publishing information to outside decision makers is external accountability, which is financial accounting's job.",
   "D": "Incorrect. Auditing is not a purpose of cost accounting, and the list omits the assignment of costs to organizational units."
  },
  "recap": "Correct. Cost accounting computes and distributes enterprise costs for profitability analysis or inventory valuation, assigns costs to organizational units, and supports short-term decisions such as make or buy."
 },
 {
  "cat": "Cost Basics",
  "title": "Who the Information Is For",
  "question": "What distinguishes cost accounting from financial accounting in terms of the decision makers served?",
  "options": {
   "A": "Both serve external decision makers, but cost accounting is more detailed.",
   "B": "Cost accounting serves managers inside the organization; financial accounting serves decision makers outside it.",
   "C": "Cost accounting serves external auditors; financial accounting serves the board.",
   "D": "Both serve internal managers, but financial accounting is prepared more frequently."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Only financial accounting addresses external users; cost accounting supports internal accountability.",
   "B": "Correct. Cost accounting provides information to managers inside the organization, supporting internal accountability, in contrast with financial accounting, which provides information to external decision makers.",
   "C": "Incorrect. Auditors are external users, and they work from the regulated financial statements.",
   "D": "Incorrect. Financial accounting is the one addressed to the outside, and it is the annual and interim reporting that is fixed in frequency."
  },
  "recap": "Correct. Cost accounting provides information to managers inside the organization, supporting internal accountability, in contrast with financial accounting, which provides information to external decision makers."
 },
 {
  "cat": "Cost Basics",
  "title": "What Nonregulated Means",
  "question": "Cost accounting is described as nonregulated. What does that actually imply?",
  "options": {
   "A": "Enterprises may compute costs any way they like, since no rules or techniques exist.",
   "B": "There are no international accounting standards that enterprises must adopt, though general rules and techniques exist and each enterprise customizes them.",
   "C": "It is regulated nationally but not internationally.",
   "D": "It became nonregulated when IFRS replaced the previous national standards."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The absence is of mandatory standards, not of method: general rules and techniques can be identified and are what the discipline teaches.",
   "B": "Correct. Given its aim to support internal decision makers, cost accounting is nonregulated: this does not imply the absence of rules but the absence of international accounting standards to be adopted by enterprises, which then customize the approach to their specific needs.",
   "C": "Incorrect. The point is not a national-international split; there is no mandatory standard to follow at either level.",
   "D": "Incorrect. It is nonregulated because it serves internal decision makers, not as a consequence of any change in external standards."
  },
  "recap": "Correct. Given its aim to support internal decision makers, cost accounting is nonregulated: this does not imply the absence of rules but the absence of international accounting standards to be adopted by enterprises, which then customize the approach to their specific needs."
 },
 {
  "cat": "Cost Basics",
  "title": "Matching the Classification to the Question",
  "question": "A company must decide whether to accept a one-off extra order using spare capacity. Which cost classification is the relevant one, and why?",
  "options": {
   "A": "Direct and indirect, because the order must be traced to a cost object.",
   "B": "Product and period, because only product costs may be charged to the order.",
   "C": "Fixed and variable, because the decision turns on how total cost responds to a change in the activity level.",
   "D": "Prime and full cost, because the configuration determines whether the order is profitable."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Direct and indirect is used to compute the cost of a product or to assign resources to organizational units, not to test a change in volume.",
   "B": "Incorrect. Product and period serves the same costing purpose as direct and indirect, not short-term decision making.",
   "C": "Correct. The distinction between fixed and variable costs, and between avoidable and nonavoidable costs, is the one that supports short-term decision making, because it shows how total cost moves with the activity level.",
   "D": "Incorrect. Prime and full cost are configurations, which say which resources to include in a product's value, not how costs respond to volume."
  },
  "recap": "Correct. The distinction between fixed and variable costs, and between avoidable and nonavoidable costs, is the one that supports short-term decision making, because it shows how total cost moves with the activity level."
 },
 {
  "cat": "Cost Basics",
  "title": "Cost Never Stands Alone",
  "question": "Why does cost accounting insist that the word cost always be qualified by an adjective?",
  "options": {
   "A": "Because the adjective identifies the classification in play, and the same resource is classified differently under different ones.",
   "B": "Because unqualified costs are not deductible for tax purposes.",
   "C": "Because international standards prescribe the terminology to be used.",
   "D": "Because only qualified costs can be entered in the financial statements."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. In accounting the term cost is never used as a stand-alone entity but is always accompanied by an adjective that specifies the type of cost referred to, such as fixed or direct, and a single resource can be direct under one classification and a product cost under another.",
   "B": "Incorrect. Tax treatment is not what drives the terminology of cost accounting.",
   "C": "Incorrect. Cost accounting is nonregulated: no international standard prescribes its terminology.",
   "D": "Incorrect. Cost accounting produces internal information; entry in the financial statements is a separate matter governed by financial accounting."
  },
  "recap": "Correct. In accounting the term cost is never used as a stand-alone entity but is always accompanied by an adjective that specifies the type of cost referred to, such as fixed or direct, and a single resource can be direct under one classification and a product cost under another."
 },
 {
  "cat": "Cost Basics",
  "title": "Costing a Project",
  "question": "In building a cruise ship, the annexure observes that the amount of direct costs is very high. Why is that the case?",
  "options": {
   "A": "Because large projects are exempt from allocating overhead.",
   "B": "Because several resources, such as metal, labor and furniture, can be associated directly with the single unit being built.",
   "C": "Because process costing charges everything proportionally to the single unit.",
   "D": "Because on large projects all overhead is reclassified as period cost."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Overhead still exists on large projects: the depreciation of fabrication and assembly shops is shared across several ships.",
   "B": "Correct. For large projects the amount of direct costs is very high because several resources can be directly associated with one unit: in the construction of cruise ships, metal, labor and furniture are all direct costs.",
   "C": "Incorrect. Process costing suits homogenous, large-scale production, which is the opposite of a one-off ship.",
   "D": "Incorrect. Whether overhead is a product or a period cost depends on whether it is manufacturing overhead, not on the size of the project."
  },
  "recap": "Correct. For large projects the amount of direct costs is very high because several resources can be directly associated with one unit: in the construction of cruise ships, metal, labor and furniture are all direct costs."
 },
 {
  "cat": "Cost Basics",
  "title": "Inventory Valuation as a Purpose",
  "question": "Cost accounting is said to compute the cost of products for profitability analysis or inventory valuation. What does that tell you about its relationship with financial accounting?",
  "options": {
   "A": "That financial accounting has no need for cost information.",
   "B": "That inventory valuation makes cost accounting a regulated discipline.",
   "C": "That cost accounting is a branch of financial accounting.",
   "D": "That although cost accounting serves internal decision makers, the product costs it computes also feed a figure reported externally."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Inventories appear in the balance sheet, and valuing them needs the product cost that cost accounting computes.",
   "B": "Incorrect. Cost accounting remains nonregulated: no international standards govern how enterprises must compute their costs.",
   "C": "Incorrect. The two are distinct, one for internal and one for external accountability.",
   "D": "Correct. Calculating the costs of products, services and projects serves profitability analysis or inventory valuation, so the internal computation feeds a reported figure even though the discipline itself is nonregulated and aimed at managers."
  },
  "recap": "Correct. Calculating the costs of products, services and projects serves profitability analysis or inventory valuation, so the internal computation feeds a reported figure even though the discipline itself is nonregulated and aimed at managers."
 },
 {
  "cat": "Cost Basics",
  "title": "Assigning Costs to Units",
  "question": "A company wants to know what its logistics department costs. Which purpose of cost accounting is being served, and which classifications support it?",
  "options": {
   "A": "Assigning costs to organizational units, supported by the direct/indirect and product/period classifications.",
   "B": "Short-term decision making, supported by the fixed/variable classification.",
   "C": "Inventory valuation, supported by the fixed/variable classification.",
   "D": "External accountability, supported by international accounting standards."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Assigning costs to organizational units is the second stated purpose of cost accounting, and the first two classifications, direct versus indirect and product versus period, are the ones usually adopted to compute a product's cost or to assign resources to organizational units.",
   "B": "Incorrect. Fixed and variable supports short-term decision making, which is a different purpose from costing a unit.",
   "C": "Incorrect. Neither part is right: the purpose here is assigning costs to a unit, and fixed/variable is not the classification used for it.",
   "D": "Incorrect. External accountability is financial accounting's aim; cost accounting is internal and nonregulated."
  },
  "recap": "Correct. Assigning costs to organizational units is the second stated purpose of cost accounting, and the first two classifications, direct versus indirect and product versus period, are the ones usually adopted to compute a product's cost or to assign resources to organizational units."
 },
 {
  "cat": "Cost Classification",
  "title": "The Supervisor in the T-Shirt Department",
  "question": "A production department making T-shirts employs one production machine, four direct workers and one supervisor of the entire production process. How are these resources classified?",
  "options": {
   "A": "All three are indirect costs, whatever the cost object.",
   "B": "All three are direct costs, whatever the cost object.",
   "C": "If the cost object is the T-shirt, only the direct workers are direct; if the cost object is the production department, all three are direct.",
   "D": "If the cost object is the T-shirt, the machine and the workers are direct; the supervisor is always indirect."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Direct workers can be unambiguously assigned to one unit of the final product, so they are direct when the T-shirt is the cost object.",
   "B": "Incorrect. With the T-shirt as the cost object, the machine and the supervisor are shared across units and cannot be assigned exclusively to one.",
   "C": "Correct. The distinction cannot be defined a priori: it depends on the cost object. For the T-shirt only the direct workers can be unambiguously assigned to one unit; for the production department the machine, the workers and the supervisor are all specifically absorbed by the department itself.",
   "D": "Incorrect. The machine is shared across units, so it is indirect for the T-shirt, and the supervisor is direct once the department is the cost object."
  },
  "recap": "Correct. The distinction cannot be defined a priori: it depends on the cost object. For the T-shirt only the direct workers can be unambiguously assigned to one unit; for the production department the machine, the workers and the supervisor are all specifically absorbed by the department itself."
 },
 {
  "cat": "Cost Classification",
  "title": "What Counts as Direct Material and Direct Labor",
  "question": "In the manufacture of laptops, which description matches the annexure's definition of the direct components?",
  "options": {
   "A": "Direct material is every physical component used for one unit; direct labor is the employees physically involved in realizing one unit, whose time per unit can be identified.",
   "B": "Direct material is material bought directly from the manufacturer; direct labor is labor employed on a permanent contract.",
   "C": "Direct material is the most expensive material used; direct labor is the labor of the highest-paid workers.",
   "D": "Direct material is material held in stock; direct labor is labor paid by the hour."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Direct material refers to all the physical components used for realizing a single unit of the final product or service, so that every unit absorbs the same amount; direct labor refers to employees physically involved in realizing one unit, for whom the time spent per unit and therefore the cost absorbed can be identified.",
   "B": "Incorrect. Neither the supplier relationship nor the type of employment contract has any bearing on the classification.",
   "C": "Incorrect. Cost magnitude does not make a resource direct; traceability to one unit does.",
   "D": "Incorrect. Where the material sits and how labor is paid are irrelevant to whether they can be traced to one unit."
  },
  "recap": "Correct. Direct material refers to all the physical components used for realizing a single unit of the final product or service, so that every unit absorbs the same amount; direct labor refers to employees physically involved in realizing one unit, for whom the time spent per unit and therefore the cost absorbed can be identified."
 },
 {
  "cat": "Cost Classification",
  "title": "Plant Depreciation for a Bottle of Water",
  "question": "Why is plant depreciation an indirect cost in the production of bottled water?",
  "options": {
   "A": "Because depreciation is never a manufacturing cost.",
   "B": "Because it is caused jointly by many units and cannot be identified exclusively with one bottle.",
   "C": "Because it is a period cost by definition.",
   "D": "Because it is too small to trace economically."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Machine depreciation is a standard example of manufacturing overhead, which is a production cost.",
   "B": "Correct. Indirect costs are those that cannot be identified specifically and exclusively with a given cost object because they are caused by two or more cost objects jointly, and plant depreciation cannot be associated exclusively with one unit of a water bottle.",
   "C": "Incorrect. Depreciation of production plant is manufacturing overhead, and manufacturing overhead is a product cost, not a period cost.",
   "D": "Incorrect. The reason is joint causation, not the size of the amount."
  },
  "recap": "Correct. Indirect costs are those that cannot be identified specifically and exclusively with a given cost object because they are caused by two or more cost objects jointly, and plant depreciation cannot be associated exclusively with one unit of a water bottle."
 },
 {
  "cat": "Cost Classification",
  "title": "Sorting Overhead",
  "question": "Machine maintenance, energy consumption for the production line, marketing expenses and administrative expenses are all overhead. How do they split?",
  "options": {
   "A": "Machine maintenance and energy are manufacturing overhead; marketing and administrative expenses are nonmanufacturing overhead.",
   "B": "All four are manufacturing overhead, because all four are indirect.",
   "C": "Machine maintenance is manufacturing overhead; energy, marketing and administrative expenses are nonmanufacturing.",
   "D": "All four are nonmanufacturing overhead, because none can be traced to a unit."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Manufacturing overhead is indirect cost related to the production process — machine depreciation, energy consumption and machine maintenance — while all remaining resources that do not enter the production process, such as marketing and administrative and commercial expenses, are nonmanufacturing overhead.",
   "B": "Incorrect. Being indirect is what makes them overhead; whether they enter the production process is what splits them.",
   "C": "Incorrect. Energy consumed by the production process is a listed example of manufacturing overhead.",
   "D": "Incorrect. Untraceability makes a cost indirect, but machine maintenance and production energy still belong to the production process."
  },
  "recap": "Correct. Manufacturing overhead is indirect cost related to the production process — machine depreciation, energy consumption and machine maintenance — while all remaining resources that do not enter the production process, such as marketing and administrative and commercial expenses, are nonmanufacturing overhead."
 },
 {
  "cat": "Cost Classification",
  "title": "What Product Costs Contain",
  "question": "Which combination makes up product costs?",
  "options": {
   "A": "Direct materials and direct labor only.",
   "B": "Direct materials, direct labor and manufacturing overheads.",
   "C": "Direct materials, direct labor, manufacturing overheads and nonmanufacturing overheads.",
   "D": "All costs incurred in the accounting period."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is prime cost, a cost configuration; product costs also include manufacturing overheads.",
   "B": "Correct. Product costs are the value of resources used for producing a product or delivering a service, and they include direct materials, direct labor and manufacturing overheads — the costs associated with manufacturing activities overall but not with a single product.",
   "C": "Incorrect. Nonmanufacturing overheads are period costs; including them gives the full cost configuration, not product cost.",
   "D": "Incorrect. Costs of the period that are not associated with manufacturing are period costs, which is precisely the category product costs excludes."
  },
  "recap": "Correct. Product costs are the value of resources used for producing a product or delivering a service, and they include direct materials, direct labor and manufacturing overheads — the costs associated with manufacturing activities overall but not with a single product."
 },
 {
  "cat": "Cost Classification",
  "title": "Recognising Period Costs",
  "question": "Which of these is a period cost?",
  "options": {
   "A": "The depreciation of the assembly machine.",
   "B": "The energy consumed by the production line.",
   "C": "Research and development expenses.",
   "D": "The components assembled into the finished unit."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Machine depreciation is manufacturing overhead, and manufacturing overhead is a product cost.",
   "B": "Incorrect. Energy consumption in production is a listed example of manufacturing overhead, so it is a product cost.",
   "C": "Correct. Period costs refer to the value of resources used in activities that cannot be directly associated with the manufacturing activity or service delivery, and research and development expenses sit alongside selling, marketing, administrative and general expenses in that category.",
   "D": "Incorrect. Components traceable to a single unit are direct material, which is always a product cost."
  },
  "recap": "Correct. Period costs refer to the value of resources used in activities that cannot be directly associated with the manufacturing activity or service delivery, and research and development expenses sit alongside selling, marketing, administrative and general expenses in that category."
 },
 {
  "cat": "Cost Classification",
  "title": "Can a Direct Cost Be a Period Cost?",
  "question": "How do the direct/indirect and product/period classifications interact?",
  "options": {
   "A": "Direct costs are always product costs, while indirect costs can be either product or period costs.",
   "B": "Direct costs can be either product or period costs, while indirect costs are always period costs.",
   "C": "The two classifications are independent: any combination is possible.",
   "D": "Product costs are always direct and period costs are always indirect."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Direct costs, meaning direct material and direct labor, are always classified as product costs. Indirect costs can be either, depending on their contribution to realizing the product: manufacturing overheads are product costs, nonmanufacturing overheads are period costs.",
   "B": "Incorrect. It inverts the rule: it is the direct costs that are pinned to one category, and indirect costs that can fall either way.",
   "C": "Incorrect. One combination is excluded: a direct cost is never a period cost.",
   "D": "Incorrect. Manufacturing overhead is indirect and still a product cost, so product costs are not always direct."
  },
  "recap": "Correct. Direct costs, meaning direct material and direct labor, are always classified as product costs. Indirect costs can be either, depending on their contribution to realizing the product: manufacturing overheads are product costs, nonmanufacturing overheads are period costs."
 },
 {
  "cat": "Cost Classification",
  "title": "Variable in Total, Constant per Unit",
  "question": "A company's raw material cost is variable. What happens as output volume rises?",
  "options": {
   "A": "Total cost stays the same and the cost per unit falls.",
   "B": "Total cost rises proportionately and the cost per unit stays the same.",
   "C": "Both the total and the cost per unit rise proportionately.",
   "D": "Total cost rises proportionately and the cost per unit rises less than proportionately."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That describes a fixed cost, which does not vary in total while falling per unit as volume grows.",
   "B": "Correct. Variable costs are resources that vary, in total, directly and proportionately with the variation of the volume or activity level, which leaves the amount absorbed by each unit unchanged.",
   "C": "Incorrect. If the total rises in proportion to volume, the amount per unit is by definition constant.",
   "D": "Incorrect. Proportionality in total means a flat per-unit figure, not a rising one."
  },
  "recap": "Correct. Variable costs are resources that vary, in total, directly and proportionately with the variation of the volume or activity level, which leaves the amount absorbed by each unit unchanged."
 },
 {
  "cat": "Cost Classification",
  "title": "The Promoter at the Party",
  "question": "A promoter is paid a fixed amount for the engagement plus a commission for every guest brought to the party. How is this cost classified, and what is the manufacturing equivalent?",
  "options": {
   "A": "Fixed, because the engagement is agreed in advance; the equivalent is factory rent.",
   "B": "Variable, because the commission dominates; the equivalent is raw material.",
   "C": "Semivariable, because it combines fixed and variable items; the equivalent is utilities, with a monthly charge plus a part depending on activity.",
   "D": "Neither, because costs with two components fall outside this classification."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A fixed cost does not vary in total with the activity level, and the commission does vary with the number of guests.",
   "B": "Incorrect. A variable cost varies directly and proportionately in total, which the fixed fee prevents.",
   "C": "Correct. Semivariable costs include a combination of variable- and fixed-cost items, and the promoter's fixed amount plus per-guest commission is the textbook case. In a manufacturing process utilities behave the same way: a monthly charge as the fixed component, plus a variable part depending on the level of activity.",
   "D": "Incorrect. Semivariable is precisely the category provided for costs with both components."
  },
  "recap": "Correct. Semivariable costs include a combination of variable- and fixed-cost items, and the promoter's fixed amount plus per-guest commission is the textbook case. In a manufacturing process utilities behave the same way: a monthly charge as the fixed component, plus a variable part depending on the level of activity."
 },
 {
  "cat": "Cost Configurations",
  "title": "What Prime Cost Includes",
  "question": "Under a prime cost configuration, what is assigned to a T-shirt?",
  "options": {
   "A": "Raw materials and direct labor only.",
   "B": "Raw materials, direct labor and machine depreciation.",
   "C": "Raw materials, direct labor, machine depreciation and administrative expenses.",
   "D": "Raw materials only, since labor is a conversion cost."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Prime cost is associated with a product's direct costs only, material and labor, so the T-shirt carries the value of raw materials and direct labor and nothing else.",
   "B": "Incorrect. Adding manufacturing overhead such as machine depreciation gives the full manufacturing cost configuration.",
   "C": "Incorrect. Adding nonmanufacturing overhead as well gives the full cost configuration.",
   "D": "Incorrect. Direct labor is one of the two direct components and belongs in prime cost."
  },
  "recap": "Correct. Prime cost is associated with a product's direct costs only, material and labor, so the T-shirt carries the value of raw materials and direct labor and nothing else."
 },
 {
  "cat": "Cost Configurations",
  "title": "Full Manufacturing Cost and the Factory Gate",
  "question": "Which costs does the full manufacturing cost configuration assign, and which does it leave out?",
  "options": {
   "A": "It assigns direct material and direct labor, leaving out all overhead.",
   "B": "It assigns all product costs — direct material, direct labor and manufacturing overheads — leaving out nonmanufacturing overheads.",
   "C": "It assigns all costs of the period, leaving out nothing.",
   "D": "It assigns direct material and manufacturing overhead, leaving out direct labor."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is prime cost; full manufacturing cost adds manufacturing overheads.",
   "B": "Correct. Full manufacturing cost assigns all product costs to the final product, which means direct material, direct labor and manufacturing overheads, so the nonmanufacturing overheads that make up period costs stay out.",
   "C": "Incorrect. Assigning all costs, product and period alike, is the full cost configuration.",
   "D": "Incorrect. Direct labor is a product cost and is included."
  },
  "recap": "Correct. Full manufacturing cost assigns all product costs to the final product, which means direct material, direct labor and manufacturing overheads, so the nonmanufacturing overheads that make up period costs stay out."
 },
 {
  "cat": "Cost Configurations",
  "title": "Choosing Between Configurations",
  "question": "A manager argues that the full cost configuration should always be preferred because it is complete. What is the counterargument?",
  "options": {
   "A": "There is none: completeness makes full cost strictly better.",
   "B": "Full cost is less precise, because assigning shared resources to the product requires approximations that prime cost avoids.",
   "C": "Full cost is forbidden by international accounting standards.",
   "D": "Full cost can only be used with activity-based costing."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The selection of the configuration is a managerial choice precisely because there is a trade-off to weigh.",
   "B": "Correct. A prime cost configuration is particularly precise in tracing costs to cost objects but is not complete, since indirect resources are excluded. A full cost configuration is complete but less precise, because of the approximations introduced in assigning the value of shared resources, and the value of the product under the two can differ substantially.",
   "C": "Incorrect. Cost accounting is nonregulated, so no standard forbids a configuration.",
   "D": "Incorrect. All four allocation methods can serve full cost and full manufacturing cost configurations."
  },
  "recap": "Correct. A prime cost configuration is particularly precise in tracing costs to cost objects but is not complete, since indirect resources are excluded. A full cost configuration is complete but less precise, because of the approximations introduced in assigning the value of shared resources, and the value of the product under the two can differ substantially."
 },
 {
  "cat": "Cost Configurations",
  "title": "Traced or Allocated",
  "question": "A company knows the raw material and direct labor absorbed by each unit, and also incurs warehouse rent shared across products. How does each reach the cost object?",
  "options": {
   "A": "Both are allocated, since every cost needs an allocation basis.",
   "B": "Both are traced, since the company has a good information system.",
   "C": "Raw material and direct labor are traced with no subjectivity; the warehouse rent is allocated, which means hypothesising how the joint resource is consumed.",
   "D": "Raw material is traced; direct labor and warehouse rent are allocated."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Allocation is what indirect costs need; direct costs reach the object by tracing.",
   "B": "Incorrect. However good the information system, warehouse rent is jointly caused and cannot be traced to one unit.",
   "C": "Correct. In the presence of direct costs the value of the cost object is defined by tracing, and with a good information system in place there is no subjectivity in apportioning those resources. Indirect costs must instead be allocated, which means making a hypothesis about the consumption of joint resources.",
   "D": "Incorrect. Direct labor is a direct cost and is traced; only in operation and process costing does it fall back into a proportionally allocated pool."
  },
  "recap": "Correct. In the presence of direct costs the value of the cost object is defined by tracing, and with a good information system in place there is no subjectivity in apportioning those resources. Indirect costs must instead be allocated, which means making a hypothesis about the consumption of joint resources."
 },
 {
  "cat": "Cost Configurations",
  "title": "Computing the Allocation Coefficient",
  "question": "Textile produces ties and scarves on a shared machine. Machine depreciation is €90,000 and the machinery supervisor costs €50,000. Ties: 10,000 units at 30 minutes each. Scarves: 20,000 units at 20 minutes each. Machine time is the allocation basis. What is the allocation coefficient?",
  "options": {
   "A": "€0.20 per minute.",
   "B": "€0.47 per minute.",
   "C": "€4.67 per unit.",
   "D": "€0.13 per minute."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Total overhead is €90,000 + €50,000 = €140,000, and the basis totals 300,000 + 400,000 = 700,000 minutes, so the coefficient is €140,000 / 700,000 min = €0.20 per minute.",
   "B": "Incorrect. €0.47 divides the overhead by 300,000 minutes, using only the time absorbed by ties instead of the total across both products.",
   "C": "Incorrect. Dividing €140,000 by the 30,000 units produced ignores the chosen basis, which is machine time rather than units.",
   "D": "Incorrect. €0.13 divides only the €90,000 depreciation by 700,000 minutes, leaving the supervisor's cost out of the overhead pool."
  },
  "recap": "Correct. Total overhead is €90,000 + €50,000 = €140,000, and the basis totals 300,000 + 400,000 = 700,000 minutes, so the coefficient is €140,000 / 700,000 min = €0.20 per minute."
 },
 {
  "cat": "Cost Configurations",
  "title": "Overhead Absorbed per Unit",
  "question": "Continuing the Textile case, with an allocation coefficient of €0.20 per minute and unit production times of 30 minutes for a tie and 20 minutes for a scarf, how much overhead does each product absorb per unit?",
  "options": {
   "A": "€6.00 per tie and €4.00 per scarf.",
   "B": "€4.00 per tie and €6.00 per scarf.",
   "C": "€4.67 per tie and €4.67 per scarf.",
   "D": "€14.00 per tie and €7.00 per scarf."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Each product absorbs the coefficient multiplied by the value the basis takes for it: 30 min x €0.20/min = €6.00 per tie and 20 min x €0.20/min = €4.00 per scarf.",
   "B": "Incorrect. The figures are inverted: the tie takes the longer machine time, so it absorbs more.",
   "C": "Incorrect. An equal charge would follow from spreading overhead by units, ignoring that the two products consume machine time differently.",
   "D": "Incorrect. These divide the whole overhead pool by the units of each product separately, which double-counts the pool."
  },
  "recap": "Correct. Each product absorbs the coefficient multiplied by the value the basis takes for it: 30 min x €0.20/min = €6.00 per tie and 20 min x €0.20/min = €4.00 per scarf."
 },
 {
  "cat": "Cost Configurations",
  "title": "Picking an Allocation Basis",
  "question": "What is an allocation basis, and what follows from the choice?",
  "options": {
   "A": "A metric used as a proxy for resource consumption; a different defensible basis produces a different product cost from the same data.",
   "B": "The total amount of overhead to be spread; the choice does not affect the result.",
   "C": "The list of products sharing the resource; it is fixed by accounting standards.",
   "D": "The proportion of direct costs in the product; it is computed after allocation."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The allocation basis is a metric used as a proxy for the consumption of the resource — for production machinery, typically the number of units produced or the production time. Because it stands in for consumption rather than measuring it, the choice changes the cost attributed to each product.",
   "B": "Incorrect. The overhead to be spread is the numerator of the coefficient; the basis is the denominator, and it very much affects the result.",
   "C": "Incorrect. Cost accounting is nonregulated, and the basis is a managerial choice.",
   "D": "Incorrect. The basis is chosen before the coefficient is computed, and it need not relate to direct costs at all."
  },
  "recap": "Correct. The allocation basis is a metric used as a proxy for the consumption of the resource — for production machinery, typically the number of units produced or the production time. Because it stands in for consumption rather than measuring it, the choice changes the cost attributed to each product."
 },
 {
  "cat": "Cost Configurations",
  "title": "The Order of the Two Decisions",
  "question": "Which pair of decisions does assigning costs to cost objects involve, and in which order?",
  "options": {
   "A": "First the allocation methodology, then the cost configuration.",
   "B": "First the cost configuration, then the allocation methodology.",
   "C": "Only the allocation methodology; the configuration follows automatically.",
   "D": "Only the cost configuration; the methodology is prescribed by the configuration chosen."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Choosing how to move costs before deciding which costs belong in the object leaves the method without a scope.",
   "B": "Correct. The process of assigning costs to cost objects includes two decisions: the selection of the cost configuration, which says which resources to include, and then the definition of the allocation methodology, which says how they reach the object.",
   "C": "Incorrect. Both decisions are made: the configuration is an explicit managerial choice.",
   "D": "Incorrect. Once the configuration is set, a method still has to be chosen among process, operation, job order and activity-based costing."
  },
  "recap": "Correct. The process of assigning costs to cost objects includes two decisions: the selection of the cost configuration, which says which resources to include, and then the definition of the allocation methodology, which says how they reach the object."
 },
 {
  "cat": "Cost Configurations",
  "title": "Steps of the Allocation Process",
  "question": "Which sequence describes the allocation of indirect costs?",
  "options": {
   "A": "Compute overhead; choose an allocation basis; compute the value of the basis in the period; divide overhead by the total value of the basis; multiply the coefficient by each product's basis value.",
   "B": "Compute overhead; divide it equally among products; adjust for the units produced.",
   "C": "Trace overhead to each product; sum the results; check against the total.",
   "D": "Choose an activity driver per activity; compute a coefficient per activity; apportion to products."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The allocation process calculates the amount of indirect cost to be allocated, chooses an allocation basis as a proxy for resource consumption, calculates the value the basis assumes in the period, calculates the allocation coefficient by dividing overhead by the total value of the basis, and finally assigns to each product the coefficient multiplied by the basis value for that product.",
   "B": "Incorrect. Splitting equally ignores the allocation basis, which exists precisely to reflect differing consumption.",
   "C": "Incorrect. Overhead cannot be traced: being untraceable to one cost object is what makes it indirect.",
   "D": "Incorrect. That is the activity-based costing sequence, which inserts activities between the pool and the products."
  },
  "recap": "Correct. The allocation process calculates the amount of indirect cost to be allocated, chooses an allocation basis as a proxy for resource consumption, calculates the value the basis assumes in the period, calculates the allocation coefficient by dividing overhead by the total value of the basis, and finally assigns to each product the coefficient multiplied by the basis value for that product."
 },
 {
  "cat": "Allocation Methods",
  "title": "Ranking the Four Methods",
  "question": "How do process costing, operation costing, job order costing and activity-based costing treat direct material, direct labor and overhead?",
  "options": {
   "A": "Process: all proportional. Operation: direct material on cause-effect, the rest proportional. Job order: both direct components on cause-effect, overhead proportional. ABC: all three on cause-effect.",
   "B": "Process: all on cause-effect. Operation: overhead on cause-effect. Job order: direct material only. ABC: all proportional.",
   "C": "All four trace the direct components and differ only in how they treat overhead.",
   "D": "Process: direct labor on cause-effect. Operation: all proportional. Job order: all on cause-effect. ABC: overhead proportional."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Process costing adopts proportional criteria for all three. Operation costing improves precision by tracing direct material on cause-effect criteria. Job order costing traces both direct material and direct labor on cause-effect criteria and allocates overhead proportionally. ABC also allocates overhead on cause-effect criteria, which makes it the most precise.",
   "B": "Incorrect. It reverses the ranking: process costing is the least precise and ABC the most.",
   "C": "Incorrect. Process costing traces nothing, and operation costing traces only direct material.",
   "D": "Incorrect. Operation costing traces direct material, and ABC is the one method that puts overhead on cause-effect criteria."
  },
  "recap": "Correct. Process costing adopts proportional criteria for all three. Operation costing improves precision by tracing direct material on cause-effect criteria. Job order costing traces both direct material and direct labor on cause-effect criteria and allocates overhead proportionally. ABC also allocates overhead on cause-effect criteria, which makes it the most precise."
 },
 {
  "cat": "Allocation Methods",
  "title": "Equivalent Units and Unit Cost",
  "question": "Over a period a company completes 800 units and leaves 400 units of work in progress at 50% of completion. Materials and conversion costs entering the process amount to €25,000. There is no opening inventory. What are the equivalent units and the cost per equivalent unit?",
  "options": {
   "A": "1,200 equivalent units; €20.83 per equivalent unit.",
   "B": "1,000 equivalent units; €25.00 per equivalent unit.",
   "C": "800 equivalent units; €31.25 per equivalent unit.",
   "D": "600 equivalent units; €41.67 per equivalent unit."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Counting the work in progress at its full physical quantity ignores the degree of completion, which scales it down.",
   "B": "Correct. Neq = Qc + Qwip x dcWip = 800 + 400 x 0.5 = 1,000 equivalent units, and the unit cost is total cost divided by equivalent units: €25,000 / 1,000 = €25.00 per equivalent unit.",
   "C": "Incorrect. Dropping the work in progress altogether charges the whole cost to the completed units, although resources were absorbed by the unfinished ones too.",
   "D": "Incorrect. 600 corresponds to no step in the calculation; the completed quantity alone is 800."
  },
  "recap": "Correct. Neq = Qc + Qwip x dcWip = 800 + 400 x 0.5 = 1,000 equivalent units, and the unit cost is total cost divided by equivalent units: €25,000 / 1,000 = €25.00 per equivalent unit."
 },
 {
  "cat": "Allocation Methods",
  "title": "Valuing the Closing Work in Progress",
  "question": "Continuing that case, with a cost of €25.00 per equivalent unit and 400 units of work in progress at 50% of completion, what is each unfinished unit worth and what is the closing work in progress worth in total?",
  "options": {
   "A": "€12.50 per unit and €5,000 in total.",
   "B": "€25.00 per unit and €10,000 in total.",
   "C": "€12.50 per unit and €10,000 in total.",
   "D": "€50.00 per unit and €20,000 in total."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. A unit in progress has absorbed the share of resources given by its degree of completion: €25.00 x 0.5 = €12.50 each, so 400 units are worth €5,000 in total.",
   "B": "Incorrect. Valuing unfinished units at the full equivalent-unit cost would treat them as complete.",
   "C": "Incorrect. The per-unit figure is right but the total must apply it to the 400 physical units: 400 x €12.50 = €5,000.",
   "D": "Incorrect. This multiplies rather than scales by the degree of completion; a half-finished unit absorbs less, not more."
  },
  "recap": "Correct. A unit in progress has absorbed the share of resources given by its degree of completion: €25.00 x 0.5 = €12.50 each, so 400 units are worth €5,000 in total."
 },
 {
  "cat": "Allocation Methods",
  "title": "Average Cost Against FIFO",
  "question": "When opening work in progress exists, what distinguishes the weighted-average approach from FIFO in process costing?",
  "options": {
   "A": "Nothing: the equivalent units are computed identically.",
   "B": "Under average cost the initial work in progress is added to the period's costs; under FIFO allocation covers only resources sustained during the period, so the opening work in progress is subtracted from the equivalent units.",
   "C": "FIFO values the closing work in progress at zero.",
   "D": "Average cost applies only where there is no closing work in progress."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The equivalent-unit formulas differ precisely in the treatment of the opening work in progress.",
   "B": "Correct. In the case of average cost logic the unit cost is determined including the cost of the initial work in progress as resources added to the material and conversion costs used in the period, over equivalent units summing ending work in progress and completed units. Using the FIFO approach, allocation is done only for resources sustained during the period, so the equivalent units become Qc + WIPending x dcEnding - WIPinitial x dcInitial.",
   "C": "Incorrect. Closing work in progress is valued by its degree of completion under either approach.",
   "D": "Incorrect. Both approaches exist to handle periods with inventories at both ends."
  },
  "recap": "Correct. In the case of average cost logic the unit cost is determined including the cost of the initial work in progress as resources added to the material and conversion costs used in the period, over equivalent units summing ending work in progress and completed units. Using the FIFO approach, allocation is done only for resources sustained during the period, so the equivalent units become Qc + WIPending x dcEnding - WIPinitial x dcInitial."
 },
 {
  "cat": "Allocation Methods",
  "title": "Where Process Costing Belongs",
  "question": "In which setting is process costing the appropriate method?",
  "options": {
   "A": "In enterprises building one-off units to customer order, such as cruise ships.",
   "B": "Wherever overhead is a large share of total cost and is absorbed by heterogeneous activities.",
   "C": "In homogenous production, such as continuous processes in chemicals and oil, or large batch production where the unit value is low.",
   "D": "Wherever direct material and direct labor are the most significant elements of product cost."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. One-off units are jobs, which is the setting for job order costing.",
   "B": "Incorrect. High overhead absorbed by heterogeneous activities is the case for activity-based costing.",
   "C": "Correct. Process costing is appropriate with homogenous productions, where a few similar products or services are processed on a large scale. It is often used in enterprises with continuous production processes such as chemicals and oil, or in companies with large batch production where the unit value of the product is usually low.",
   "D": "Incorrect. Significant direct material and direct labor is the argument for job order costing, which traces both."
  },
  "recap": "Correct. Process costing is appropriate with homogenous productions, where a few similar products or services are processed on a large scale. It is often used in enterprises with continuous production processes such as chemicals and oil, or in companies with large batch production where the unit value of the product is usually low."
 },
 {
  "cat": "Allocation Methods",
  "title": "How Job Order Costing Handles the Three Components",
  "question": "Under job order costing, how do direct material, direct labor and overhead reach the job?",
  "options": {
   "A": "All three are traced to the job from the job order sheet.",
   "B": "Direct material is traced according to consumption; direct labor is traced on the basis of completed operations; overhead is allocated proportionally using a basis such as labor time or machine time.",
   "C": "Direct material is traced; direct labor and overhead are allocated proportionally as conversion costs.",
   "D": "All three are allocated proportionally, using the number of jobs as the basis."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Overhead is jointly caused and cannot be traced; the sheet records it as an allocated amount.",
   "B": "Correct. Across the production process each job carries a sheet on which costs are registered: direct material costs are traced to the job according to consumption, direct labor costs on the basis of completed operations, and overhead is allocated with proportional criteria using an allocation basis, typically labor costs or time and machine time.",
   "C": "Incorrect. Treating direct labor as part of a proportionally allocated conversion cost is operation costing, not job order costing.",
   "D": "Incorrect. Allocating everything proportionally is process costing."
  },
  "recap": "Correct. Across the production process each job carries a sheet on which costs are registered: direct material costs are traced to the job according to consumption, direct labor costs on the basis of completed operations, and overhead is allocated with proportional criteria using an allocation basis, typically labor costs or time and machine time."
 },
 {
  "cat": "Allocation Methods",
  "title": "When Job Order Costing Does Not Work",
  "question": "Why is job order costing inappropriate for enterprises operating with continuous cycles?",
  "options": {
   "A": "Because overhead cannot be allocated in a continuous process.",
   "B": "Because continuous processes have no direct material.",
   "C": "Because the job — a single unit or a batch of units — cannot be identified.",
   "D": "Because international standards reserve it for discrete manufacturing."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Overhead is allocated proportionally in every method, continuous processes included.",
   "B": "Incorrect. Continuous processes consume direct material; what they lack is an identifiable job to charge it to.",
   "C": "Correct. Job order costing takes the job as the element for cost allocation and tracing, a job being a single unit of a product or a batch of many units. This method is not appropriate in enterprises that operate with continuous cycles, because of the impossibility of identifying the job.",
   "D": "Incorrect. Cost accounting is nonregulated: no standard reserves a method for a type of production."
  },
  "recap": "Correct. Job order costing takes the job as the element for cost allocation and tracing, a job being a single unit of a product or a batch of many units. This method is not appropriate in enterprises that operate with continuous cycles, because of the impossibility of identifying the job."
 },
 {
  "cat": "Allocation Methods",
  "title": "What Operation Costing Traces",
  "question": "Operation costing is described as sitting between job order costing and process costing. What does it trace and what does it allocate?",
  "options": {
   "A": "It traces direct material to products, and allocates conversion costs — direct labor plus overhead — proportionally, with the operation as the unit of analysis.",
   "B": "It traces direct labor and allocates direct material and overhead.",
   "C": "It traces direct material and direct labor, and allocates overhead by activity driver.",
   "D": "It allocates everything proportionally but computes a separate coefficient per product."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. In operation costing direct material costs are traced to products as in job order costing, while conversion costs, meaning direct labor plus overhead, are allocated proportionally as in process costing. The unit of analysis is the operation, a homogenous phase within the transformation process, and the most frequent bases are the quantity produced and the operation duration.",
   "B": "Incorrect. It is direct material that is traced; direct labor falls into the conversion cost pool.",
   "C": "Incorrect. Tracing both direct components is job order costing, and driver-based overhead allocation is ABC.",
   "D": "Incorrect. Allocating everything proportionally describes process costing, and operation costing traces direct material."
  },
  "recap": "Correct. In operation costing direct material costs are traced to products as in job order costing, while conversion costs, meaning direct labor plus overhead, are allocated proportionally as in process costing. The unit of analysis is the operation, a homogenous phase within the transformation process, and the most frequent bases are the quantity produced and the operation duration."
 },
 {
  "cat": "Allocation Methods",
  "title": "Why Activity-Based Costing Appeared",
  "question": "What problem in traditional methods was ABC introduced to address?",
  "options": {
   "A": "The impossibility of tracing direct material to products.",
   "B": "The allocation of indirect costs through a proportional method using a single allocation basis.",
   "C": "The absence of any way to value work in progress.",
   "D": "The cost of maintaining a job order sheet for every unit."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Direct material is already traced under job order and operation costing; ABC changes nothing there.",
   "B": "Correct. ABC appeared during the 1980s as a solution to the problems in traditional methods, and in particular to the allocation of indirect costs through a proportional method using a unique allocation basis. It puts activities at an intermediate level so that each has its own driver.",
   "C": "Incorrect. Equivalent units and the degree of completion handle work in progress, within process costing.",
   "D": "Incorrect. ABC does not replace the job order sheet; it changes how the overhead pool is spread."
  },
  "recap": "Correct. ABC appeared during the 1980s as a solution to the problems in traditional methods, and in particular to the allocation of indirect costs through a proportional method using a unique allocation basis. It puts activities at an intermediate level so that each has its own driver."
 },
 {
  "cat": "Allocation Methods",
  "title": "The ABC Sequence",
  "question": "Which sequence describes activity-based costing?",
  "options": {
   "A": "Identify the overhead pool; identify the activities that determine its consumption; divide overhead among the activities; define an activity driver for each; compute a coefficient per activity; apportion activity costs to the cost objects.",
   "B": "Identify the overhead pool; choose one allocation basis; compute a coefficient; apportion to the cost objects.",
   "C": "Trace direct material and direct labor to activities; allocate overhead to products.",
   "D": "Compute equivalent units per activity; divide total costs by them; apportion to the cost objects."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. ABC identifies the indirect costs to allocate as a cost pool, identifies the activities that determine the consumption of overhead, divides overhead among those activities, defines activity drivers as indicators explaining the consumption of each activity, calculates an allocation coefficient per activity by dividing activity cost by its driver, and apportions activity costs to each cost object using those coefficients.",
   "B": "Incorrect. That is the traditional proportional allocation ABC was designed to improve on, with a single basis and no intermediate activities.",
   "C": "Incorrect. ABC does not route the direct components through activities; it is a treatment of overhead.",
   "D": "Incorrect. Equivalent units belong to process costing and have no role in ABC."
  },
  "recap": "Correct. ABC identifies the indirect costs to allocate as a cost pool, identifies the activities that determine the consumption of overhead, divides overhead among those activities, defines activity drivers as indicators explaining the consumption of each activity, calculates an allocation coefficient per activity by dividing activity cost by its driver, and apportions activity costs to each cost object using those coefficients."
 },
 {
  "cat": "Allocation Methods",
  "title": "Activity Costs in the Textile Case",
  "question": "Textile allocates the year's machine depreciation of €90,000 using ABC. The machine performs production, 700,000 minutes in the year, and setup, 50,000 minutes in the year. Time is used to divide overhead across the two activities. How much cost goes to each activity?",
  "options": {
   "A": "€84,000 to production and €6,000 to setup.",
   "B": "€45,000 to each activity.",
   "C": "€90,000 to production and nothing to setup.",
   "D": "€36,000 to production and €54,000 to setup."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The two activities together take 700,000 + 50,000 = 750,000 minutes, so the coefficient is €90,000 / 750,000 min = €0.12 per minute. Production then receives €0.12 x 700,000 = €84,000 and setup €0.12 x 50,000 = €6,000.",
   "B": "Incorrect. Splitting equally between activities ignores the time each one absorbs, which is the basis chosen for this step.",
   "C": "Incorrect. Setup is one of the two activities the machine performs and absorbs part of its depreciation.",
   "D": "Incorrect. The amounts are the wrong way round and do not follow from the 700,000 to 50,000 split of machine time."
  },
  "recap": "Correct. The two activities together take 700,000 + 50,000 = 750,000 minutes, so the coefficient is €90,000 / 750,000 min = €0.12 per minute. Production then receives €0.12 x 700,000 = €84,000 and setup €0.12 x 50,000 = €6,000."
 },
 {
  "cat": "Allocation Methods",
  "title": "Unit Cost of Ties under ABC",
  "question": "Continuing the Textile case: production cost is driven by time at €0.12 per minute, and the €6,000 setup pool is driven by the number of setups, of which there were two, one per product. Ties take 300,000 minutes of production and 10,000 units are made. What is the total and unit cost of ties?",
  "options": {
   "A": "€36,000 in total and €3.60 per tie.",
   "B": "€39,000 in total and €3.90 per tie.",
   "C": "€42,000 in total and €4.20 per tie.",
   "D": "€45,000 in total and €4.50 per tie."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. €36,000 is the production component alone; the setup activity has still to be charged.",
   "B": "Correct. Production gives €0.12/min x 300,000 min = €36,000, and setup gives €6,000 / 2 setups = €3,000 per setup x 1 setup = €3,000. The total is €39,000, and over 10,000 units that is €3.90 per tie.",
   "C": "Incorrect. €42,000 would charge ties a share of setup based on their production time rather than on the one setup they required.",
   "D": "Incorrect. €45,000 corresponds to half the depreciation, which is neither the activity split nor the driver-based result."
  },
  "recap": "Correct. Production gives €0.12/min x 300,000 min = €36,000, and setup gives €6,000 / 2 setups = €3,000 per setup x 1 setup = €3,000. The total is €39,000, and over 10,000 units that is €3.90 per tie."
 },
 {
  "cat": "Allocation Methods",
  "title": "What ABC Changes for Scarves",
  "question": "In the Textile case, a scarf absorbs €4.00 of overhead under proportional allocation on machine time but €2.55 under ABC. What explains the difference?",
  "options": {
   "A": "ABC uses a larger overhead pool, so each product absorbs a different amount.",
   "B": "ABC excludes setup cost from product cost altogether.",
   "C": "Proportional allocation charges setup in proportion to machine time, whereas ABC charges it by the number of setups, and scarves needed only one despite their higher volume.",
   "D": "The two figures cover different periods and are not comparable."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Under ABC the pool being spread here is smaller, the €90,000 depreciation, and in any case the pool size is not what redistributes cost between the products.",
   "B": "Incorrect. ABC charges setup explicitly: it becomes its own activity with its own driver.",
   "C": "Correct. A single basis spreads everything on machine time, so the 20,000 scarves carry a share of setup proportional to their 400,000 minutes. ABC gives setup its own driver, the number of setups, and each product required exactly one, so the €3,000 per setup is spread over 20,000 scarves rather than 10,000 ties.",
   "D": "Incorrect. Both figures cover the same year and the same resources; only the allocation logic differs."
  },
  "recap": "Correct. A single basis spreads everything on machine time, so the 20,000 scarves carry a share of setup proportional to their 400,000 minutes. ABC gives setup its own driver, the number of setups, and each product required exactly one, so the €3,000 per setup is spread over 20,000 scarves rather than 10,000 ties."
 },
 {
  "cat": "Allocation Methods",
  "title": "When ABC Is Worth It",
  "question": "Under what conditions is activity-based costing suggested, and what limitation remains?",
  "options": {
   "A": "When overhead is high and absorbed by heterogeneous activities; the choice of activity drivers is still arbitrary and depends on available data.",
   "B": "When direct material dominates the cost structure; no limitation remains, since ABC is exact.",
   "C": "When production is homogenous and large scale; the limitation is that work in progress cannot be valued.",
   "D": "When the enterprise operates continuous cycles; the limitation is the cost of the job order sheet."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. ABC is more precise and its use is suggested when the incidence of overhead is high and those indirect resources are absorbed for heterogeneous activities, since a single allocation basis would not give realistic information on overhead consumption. The choice of activity drivers, however, is arbitrary and usually depends on the data available.",
   "B": "Incorrect. Where direct material dominates, operation costing is the natural fit, and ABC narrows subjectivity rather than removing it.",
   "C": "Incorrect. Homogenous large-scale production is the case for process costing.",
   "D": "Incorrect. Continuous cycles are where job order costing fails; the job order sheet is not part of ABC."
  },
  "recap": "Correct. ABC is more precise and its use is suggested when the incidence of overhead is high and those indirect resources are absorbed for heterogeneous activities, since a single allocation basis would not give realistic information on overhead consumption. The choice of activity drivers, however, is arbitrary and usually depends on the data available."
 },
 {
  "cat": "Allocation Methods",
  "title": "Two Divisions, Not One",
  "question": "What structurally separates ABC from a traditional proportional allocation of overhead?",
  "options": {
   "A": "ABC applies the allocation coefficient twice to the same basis.",
   "B": "ABC divides overhead across activities first and only then across cost objects, using a driver per activity instead of one basis for the whole pool.",
   "C": "ABC traces overhead directly to cost objects, so no coefficient is needed.",
   "D": "ABC computes a separate overhead pool for each cost object before allocating."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The two steps use different bases: the split across activities, then each activity's own driver.",
   "B": "Correct. Traditional methods take the cost pool, apply one allocation basis and one coefficient, and reach the cost objects. ABC inserts activities in between: overhead is divided across activities, each activity gets its own driver and coefficient, and only then are activity costs apportioned to the cost objects.",
   "C": "Incorrect. Overhead remains indirect and is still allocated; ABC changes the route, not the nature of the cost.",
   "D": "Incorrect. The pool is the overhead to be allocated, defined before the split across activities, not per cost object."
  },
  "recap": "Correct. Traditional methods take the cost pool, apply one allocation basis and one coefficient, and reach the cost objects. ABC inserts activities in between: overhead is divided across activities, each activity gets its own driver and coefficient, and only then are activity costs apportioned to the cost objects."
 }
];
