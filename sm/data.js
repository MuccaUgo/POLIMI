// Strategy & Marketing study data, generated from the course decks by V. Chiesa,
// MSc Management Engineering: the Introduction and chapter 1, The Concept of Strategy.
const TOPICS = [
 { name: "Introduction", categories: ["The Company", "Legal Forms", "Ownership & Evolution", "Value & Objectives", "Governance & ESG"] },
 { name: "The Concept of Strategy", categories: ["What Strategy Is", "Levels of Strategy", "Strategy Process", "Intended & Emergent", "Vision, Mission & Purpose"] },
 { name: "External Analysis", categories: ["External Analysis", "STEEP", "Five Forces", "Substitutes, Buyers & Suppliers", "Complements & Competitors"],
   note: "Chapter 2 \u2014 the course has covered the external-analysis overview and STEEP. Five Forces, competitor analysis, profit pool mapping, customer analysis, key success factors, and opportunities and threats are next." }
];
const CATEGORIES = TOPICS.reduce(function (all, t) { return all.concat(t.categories); }, []);

// The 28-part memory map mirrors the student's "Things to Remember" notes.
// Each block opens the most relevant area in the concept browser.
const STUDY_MAP = [
 {
  "name": "Introduction",
  "subtitle": "10 blocks · covered in class",
  "blocks": [
   { "title": "What is a company?", "summary": "The profit-oriented organisation as the course's unit of analysis.", "filter": "The Company", "status": "covered" },
   { "title": "How do we measure a company?", "summary": "Market capitalisation, revenues and employees tell different stories about size.", "filter": "The Company", "status": "covered" },
   { "title": "Company boundaries and general trends", "summary": "Product scope, vertical integration, outsourcing and internationalisation.", "filter": "The Company", "status": "covered" },
   { "title": "Legal form and ownership", "summary": "Limited or unlimited liability; private or public ownership.", "filter": "Legal Forms", "status": "covered" },
   { "title": "Foundation, financing rounds and dilution", "summary": "Pre-money, post-money and how new shares change ownership percentages.", "filter": "Ownership & Evolution", "status": "covered" },
   { "title": "IPO and takeovers", "summary": "Primary, secondary and mixed IPOs; friendly and hostile takeovers.", "filter": "Ownership & Evolution", "status": "covered" },
   { "title": "Shareholder value", "summary": "Discounted cash flows, enterprise value, equity value and net debt.", "filter": "Value & Objectives", "status": "covered" },
   { "title": "Stakeholder value and CSR", "summary": "Stakeholders, long-term value creation and the CSR pyramid.", "filter": "Value & Objectives", "status": "covered" },
   { "title": "Corporate governance", "summary": "Governance bodies and the traditional, one-tier and two-tier systems.", "filter": "Governance & ESG", "status": "covered" },
   { "title": "ESG", "summary": "Environmental, social and governance dimensions of performance.", "filter": "Governance & ESG", "status": "covered" }
  ]
 },
 {
  "name": "The Concept of Strategy",
  "subtitle": "10 blocks · covered in class",
  "blocks": [
   { "title": "What is strategy and why is it important?", "summary": "Goal-directed action, competitive advantage, decision support and coordination.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Strategic decisions", "summary": "Long-term, difficult to reverse and demanding large resources.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Levels of strategy and SBU", "summary": "Corporate, business and functional levels, plus the strategic business unit.", "filter": "Levels of Strategy", "status": "covered" },
   { "title": "Strategic decision process", "summary": "Orientation, analysis, choice, implementation and control.", "filter": "Strategy Process", "status": "covered" },
   { "title": "Strategy links two environments", "summary": "Match internal resources and capabilities with the external environment.", "filter": "Strategy Process", "status": "covered" },
   { "title": "Elements of a successful strategy", "summary": "Clear goals, understanding the environment, resources and effective implementation.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Approaches to strategy", "summary": "Intended top-down strategy, emergent bottom-up strategy and their combination.", "filter": "Intended & Emergent", "status": "covered" },
   { "title": "Vision and mission", "summary": "Where the organisation is going and what it does now, including the business-strategy reading.", "filter": "Vision, Mission & Purpose", "status": "covered" },
   { "title": "Purpose", "summary": "Why the company exists beyond the products it sells.", "filter": "Vision, Mission & Purpose", "status": "covered" },
   { "title": "Culture and values", "summary": "Norms, artefacts, founder imprinting, groupthink and core rigidity.", "filter": "Vision, Mission & Purpose", "status": "covered" }
  ]
 },
 {
  "name": "External Analysis",
  "subtitle": "8 blocks · covered through STEEP",
  "blocks": [
   { "title": "Purpose and structure of external analysis", "summary": "Study the business area from the standpoint of the average competitor.", "filter": "External Analysis", "status": "covered" },
   { "title": "STEEP analysis", "summary": "Scan social, technological, economic, ecological and political forces.", "filter": "STEEP", "status": "covered" },
   { "title": "Porter's Five Forces", "summary": "Assess industry attractiveness through rivalry, entrants, substitutes, buyers and suppliers.", "filter": "Five Forces", "status": "next" },
   { "title": "Competitor analysis", "summary": "Competitive intelligence, direct rivals and strategic groups.", "filter": "Complements & Competitors", "status": "next" },
   { "title": "Profit pool mapping", "summary": "Locate where revenues and profits accumulate along the value chain.", "filter": "Complements & Competitors", "status": "next" },
   { "title": "Customers and market demand", "summary": "Analyse demand, segmentation, customer needs and buyer behaviour.", "filter": "Substitutes, Buyers & Suppliers", "status": "next" },
   { "title": "Key success factors", "summary": "Identify the conditions firms must meet to compete successfully in the industry.", "filter": "External Analysis", "status": "next" },
   { "title": "Opportunities and threats", "summary": "Conclude the external side of SWOT with industry-wide opportunities and threats.", "filter": "External Analysis", "status": "next" }
  ]
 }
];

const CONCEPTS = [
 {
  "cat": "The Company",
  "title": "What Is a Company",
  "meaning": "A company can take many forms: a small business, a large corporation, a public sector organization or a not-for-profit organization. The unit of analysis in this course is the profit-oriented organization responsible for its economic and financial results.",
  "how": "When a case describes an entity, first place it: is it profit-oriented and accountable for its own economic and financial performance? That is the object the course analyses.",
  "trap": "Restricting the analysis to profit-oriented organizations is a choice of scope, not a claim that other forms are unimportant."
 },
 {
  "cat": "The Company",
  "title": "Measuring the Size of a Company",
  "meaning": "There is no single indicator of company size. The main ones used are market capitalization, revenues and number of employees.",
  "how": "The ranking of the largest companies changes depending on the indicator: the leaders by market cap are not the same as the leaders by revenues or by employees. The market cap of the big tech companies is comparable with the GDP of European countries.",
  "trap": "Quoting one ranking as if it were the ranking hides the choice of indicator. Always say by what measure a company is large."
 },
 {
  "cat": "The Company",
  "title": "Scope of Output: Single Product or Portfolio",
  "meaning": "A company can realize a single output or a portfolio of outputs. This is one of the structural choices that define what the company is.",
  "how": "Ask what the firm sells: one product or service line, or a set of different ones addressed to different needs and markets.",
  "trap": "A wide portfolio is not automatically a strength: it is a choice with consequences for focus, coordination and resource allocation."
 },
 {
  "cat": "The Company",
  "title": "Scope of Activities: Embody or Outsource",
  "meaning": "A company can embody many activities internally or outsource many of them. This defines how much of the value chain sits inside the firm.",
  "how": "Compare the activities the firm performs itself with those bought from third parties; the smartphone and the car industries are used in the course as contrasting illustrations.",
  "trap": "Outsourcing is not simply cost cutting: it changes which capabilities the firm retains and which it depends on others for."
 },
 {
  "cat": "The Company",
  "title": "Geographic Scope and Internationalization",
  "meaning": "A company can serve a single geographical market or several countries. Serving several countries is internationalization.",
  "how": "Look at where revenues come from and where activities are located; globalisation has pushed a growing number of firms across borders.",
  "trap": "Selling abroad and being organized as a global company are different degrees of the same dimension; do not treat exporting as full internationalization."
 },
 {
  "cat": "The Company",
  "title": "From Conglomerate to Focus: the Eni Case",
  "meaning": "The scope of a company is not fixed. Eni in the 1980s spanned energy, engineering, chemicals, construction and perforation, mechanical components, textile machines, non-ferrous ores, clothing and newspapers.",
  "how": "Eni today is organized around Exploration & Production, energy transition businesses (Plenitude and Enilive) and long-term opportunity technology: far fewer, far more related businesses.",
  "trap": "The case shows scope changing over decades in a deliberate direction; it is about refocusing, not merely shrinking."
 },
 {
  "cat": "The Company",
  "title": "Integration and Brand Portfolio: EssilorLuxottica",
  "meaning": "EssilorLuxottica is a leader in the design, manufacture and distribution of fashion, luxury and sports eyewear, combining a wide brand portfolio with control of production and retail.",
  "how": "Its portfolio includes proprietary brands such as Ray-Ban, Oakley, Vogue Eyewear, Persol, Oliver Peoples, Arnette, Costa del Mar and Alain Mikli, plus licensed brands including Giorgio Armani, Burberry, Bulgari, Chanel, Coach, Dolce&Gabbana, Ferrari, Michael Kors, Prada, Ralph Lauren, Tiffany & Co., Valentino and Versace. It runs a global network of nearly 20,000 shops, and the merger with Essilor integrated lens production.",
  "trap": "Proprietary brands and licensed brands are not the same thing: the firm owns the first and operates the second under contract."
 },
 {
  "cat": "The Company",
  "title": "Globalisation and Global Companies",
  "meaning": "Globalisation is the background trend that pushes firms to operate across several countries, reshaping competition, supply chains and organization.",
  "how": "A global company serves several geographical markets and organizes its activities across them, rather than replicating a national business abroad.",
  "trap": "Global reach changes the set of stakeholders a firm answers to, adding regulators, communities and labour markets in every country it enters."
 },
 {
  "cat": "Legal Forms",
  "title": "The Company as a Legal Entity",
  "meaning": "A company is a legal entity: a legal construct, essentially a contract, through which the law allows a group of natural persons to act as if they were a single artificial person for certain purposes.",
  "how": "The legal form is the nature of that contract. Two dimensions define it: limited or unlimited liability, and private or public status.",
  "trap": "The legal entity is separate from the people behind it; this separation is the point of the construct, not a technicality."
 },
 {
  "cat": "Legal Forms",
  "title": "Unlimited Company",
  "meaning": "A company, with or without share capital, whose members or shareholders do not benefit from limited liability should the company ever go into formal liquidation.",
  "how": "Members remain exposed beyond their contribution if the company is wound up. In exchange, unlimited companies are exempted from filing accounts with the Registrar of Companies for public disclosure.",
  "trap": "The exemption from public disclosure is the flip side of unlimited exposure: less protection for members, less information for outsiders."
 },
 {
  "cat": "Legal Forms",
  "title": "Private Company Limited by Guarantee",
  "meaning": "A company that does not have share capital, but is guaranteed by its members, who agree to pay a fixed amount in the event of the company's liquidation.",
  "how": "Charitable organisations are often incorporated using this form of limited liability, since there are no shares and no shareholders seeking a return on capital.",
  "trap": "No share capital does not mean no limited liability: the members' exposure is capped at the guaranteed amount."
 },
 {
  "cat": "Legal Forms",
  "title": "Private Company Limited by Shares",
  "meaning": "A company that has shareholders with limited liability and whose shares may not be offered to the general public.",
  "how": "Shareholders of private companies limited by shares are often bound to offer their shares to their fellow shareholders before selling them to a third party.",
  "trap": "The restriction is on offering shares to the public and on freely transferring them, not on having shareholders or raising equity privately."
 },
 {
  "cat": "Legal Forms",
  "title": "Public Limited Company",
  "meaning": "A company that can be publicly traded on a stock exchange. It is similar to the U.S. Corporation (Corp.) and the German Aktiengesellschaft (AG).",
  "how": "Public companies have access to the financial markets and can raise money for expansion and other projects by selling stock or bonds.",
  "trap": "Access to public markets comes with disclosure obligations, market valuation and stronger governance requirements; it is not only a funding advantage."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Shareholders' Objectives",
  "meaning": "Shareholders pursue two distinct objectives: earning money by selling the stock when the share price appreciates, and having power and controlling the company.",
  "how": "Identify which objective drives a shareholder in a case: a financial investor seeking appreciation behaves differently from one seeking control.",
  "trap": "The two objectives can conflict, for example when an offer maximises price but removes control from existing owners."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Initial Public Offering (IPO)",
  "meaning": "An IPO is the operation through which a company's shares are offered on a public market for the first time.",
  "how": "It can be primary, through a capital increase where new shares are issued and the cash goes to the company, or secondary, through the sale of shares of the current shareholders where the cash goes to the sellers. A mixed IPO combines both.",
  "trap": "Primary and secondary differ in who receives the money: the company in the first case, the selling shareholders in the second."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Takeovers: Friendly and Hostile",
  "meaning": "A takeover is the acquisition of control of a company. It can be friendly or hostile.",
  "how": "A friendly takeover is agreed with the target's board; a hostile one proceeds against the board's wishes through a takeover bid addressed to shareholders.",
  "trap": "Hostility refers to the board's position, not to the price offered: a hostile bid can be generous and a friendly one modest."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "The Stages of an Organisation's Evolution",
  "meaning": "A company evolves through distinct stages: foundation, financing rounds and IPO. Each stage changes not only its size, but also its ownership structure, governance model and strategic priorities.",
  "how": "Place a case on this path: who owns the company, who decides, and what the firm is optimising for at that point.",
  "trap": "The overall movement is a transition from entrepreneurial control to shared ownership and public accountability, so governance requirements rise along the way."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Foundation and Initial Ownership",
  "meaning": "At foundation the firm is established as a legal entity, and ownership rights are allocated among the founders.",
  "how": "Founders define the initial ownership structure, allocate equity among themselves and set the first decision-making rules, for example 40% / 40% / 20% between three co-founders.",
  "trap": "The initial split also fixes the first decision rules; it is a governance choice as much as an economic one."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Financing Rounds and Dilution",
  "meaning": "When external investors enter the company by injecting capital, the company issues new shares. This supports growth, but dilutes existing shareholders and may reduce founders' control.",
  "how": "After a round, existing shareholders usually own a smaller percentage of a larger company: their stake in percent falls while the value behind it may rise.",
  "trap": "Dilution is mechanical, not a penalty: it follows from issuing new shares, and says nothing on its own about whether value was created."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Pre-money and Post-money Valuation",
  "meaning": "Pre-money valuation is the value of the company before the new investment; post-money valuation is the pre-money valuation plus the new capital injected.",
  "how": "Post-money = pre-money + investment. With €10m pre-money and €5m injected, the post-money valuation is €15m.",
  "trap": "The investor's percentage is always computed on the post-money figure, because the injected cash is by then part of the company."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Computing Ownership after a Round",
  "meaning": "The arithmetic of a financing round follows two formulas: new investor ownership = investment / post-money valuation, and existing shareholders' retention = pre-money valuation / post-money valuation.",
  "how": "With €5m injected at €10m pre-money, the investor gets 5/15 = 33.33% and every existing holder keeps 10/15 = two thirds of their previous stake, so a 40% founder goes to 26.67% and a 20% founder to 13.33%.",
  "trap": "Retention applies uniformly to all existing shareholders; they are all diluted in the same proportion, not by the same number of percentage points."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Dilution Is Not Necessarily Negative",
  "meaning": "Dilution reduces the percentage owned but usually accompanies an increase in the value of the company.",
  "how": "After Series A at €10m pre-money and Series B at €45m pre-money, a founder moves from 40% to 26.67% and then to 20%, while the company grows from €10m to €60m post-money.",
  "trap": "Comparing percentages across rounds without looking at valuations is the classic error: founders own a smaller share of a potentially much more valuable company."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "IPO and the Cap Table",
  "meaning": "The IPO is the transition from a privately held company to a publicly traded one, and it reshapes the ownership table.",
  "how": "In a primary IPO raising €160m at €240m pre-money, the post-money valuation is €400m, public shareholders receive 160/400 = 40%, and every existing shareholder is diluted by 40%: a 20% holder goes to 12%, a 25% holder to 15%.",
  "trap": "The company gains access to public markets but also becomes subject to market valuation, disclosure obligations and stronger governance requirements."
 },
 {
  "cat": "Value & Objectives",
  "title": "Shareholder Value",
  "meaning": "The dominant view is that the objective of a company is to create value for its shareholders. Shareholder value is the sum of the net cash flows to shareholders, discounted at the cost of equity capital.",
  "how": "SV = Σ NCF_t / (1 + re)^t, where NCF_t is the net cash flow at year t for the shareholders, equal to dividends plus the share price at the time of sale minus capital injections, and re is the cost of equity capital.",
  "trap": "Capital injected by shareholders is subtracted in the net cash flow: money they put in is not a return to them."
 },
 {
  "cat": "Value & Objectives",
  "title": "Shareholder Value vs Enterprise Value",
  "meaning": "Enterprise value and shareholder value are different quantities, separated by net debt.",
  "how": "The shareholder value equals the enterprise value less net debt, where net debt is debt less cash. Therefore SV = EV − debt + cash.",
  "trap": "Cash increases shareholder value for a given enterprise value, because it reduces net debt; forgetting the cash term is the usual slip."
 },
 {
  "cat": "Value & Objectives",
  "title": "Stock Market Value as a Proxy",
  "meaning": "The stock market value of a listed company is used as a proxy of its shareholder value, but only a proxy.",
  "how": "It is a proxy rather than a measure because the stock market is affected by bubbles, fads and speculation.",
  "trap": "Treating market capitalization as if it were the intrinsic shareholder value ignores exactly the distortions that make it approximate."
 },
 {
  "cat": "Value & Objectives",
  "title": "The Company in Its Ecosystem",
  "meaning": "A company is a living organism inside a complex ecosystem, exchanging resources with shareholders on one side and a range of stakeholders on the other.",
  "how": "Shareholders provide equity; stakeholders include labour and management, suppliers of materials, components and technologies, the financial system providing loans, consultants and third parties, consumers in B2C and B2B, society and community, and government, authorities and public services setting laws, regulations and taxes.",
  "trap": "Stakeholders are not only those inside the firm: regulators, communities and the financial system belong to the same ecosystem."
 },
 {
  "cat": "Value & Objectives",
  "title": "The Stakeholder Perspective",
  "meaning": "The shareholder perspective alone looks incomplete. Under the stakeholder perspective, corporations should be socially responsible and serve the broader public interest as well as the shareholder interest.",
  "how": "Stakeholders can have different objectives, in some cases even in contrast with each other. This holds particularly true for public limited companies, which live in the most complicated ecosystem with a huge number of shareholders and stakeholders.",
  "trap": "The stakeholder view does not replace shareholder value; it says shareholder value is not sufficient as the whole objective."
 },
 {
  "cat": "Value & Objectives",
  "title": "Partnership of Value Creation",
  "meaning": "The value of a business is increasingly measured by a combination of financial success, usefulness to society and satisfaction of employees, with shareholders, managers and other stakeholders engaged in a partnership of value creation.",
  "how": "In a long-term view the dependence runs both ways: stakeholders are vulnerable when management fails to create shareholder value, and without stakeholder value there can be no shareholder value in the long term. The emphasis falls on the maximisation of long-term cash flows.",
  "trap": "This is an argument about the long term: short-term shareholder returns can be raised in ways that destroy the stakeholder relationships the firm depends on."
 },
 {
  "cat": "Value & Objectives",
  "title": "Why a Stakeholder Impact Analysis",
  "meaning": "Several events eroded the public's trust in business and capitalism, made relationships with stakeholders more critical and reinforced their role.",
  "how": "The course points to accounting scandals (Enron, Arthur Andersen, WorldCom, Tyco, Parmalat), the Global Financial Crisis, and other black swan events such as 9/11, the Fukushima nuclear disaster, the fall of the Berlin wall with the collapse of the Soviet Union, and the pandemic.",
  "trap": "The argument is historical: stakeholder analysis gained weight because trust was damaged by concrete failures, not because of an abstract preference."
 },
 {
  "cat": "Value & Objectives",
  "title": "The Pyramid of Corporate Social Responsibility",
  "meaning": "The course presents the pyramid of corporate social responsibility (Rothaermel, 2015) as the framework ordering the responsibilities a company carries, from economic responsibilities at the base up through legal and ethical ones to philanthropic responsibilities at the top.",
  "how": "The layered shape makes the point that the higher responsibilities rest on the lower ones: a firm that is not economically viable and legally compliant cannot sustain the levels above.",
  "trap": "The pyramid ranks responsibilities without licensing a firm to stop at the bottom layer; it is a structure of expectations, not a menu."
 },
 {
  "cat": "Governance & ESG",
  "title": "Corporate Governance: Definition",
  "meaning": "Corporate governance refers to the set of systems, principles and processes by which a company is governed.",
  "how": "They provide the guidelines as to how the company can be directed or controlled in order to fulfill its goals and objectives, add value, and be beneficial for all stakeholders in the long term.",
  "trap": "Governance is about direction and control together; reducing it to compliance checks misses the first half."
 },
 {
  "cat": "Governance & ESG",
  "title": "Extraordinary Decisions of the Shareholders Assembly",
  "meaning": "Some decisions are reserved to the shareholders assembly rather than delegated to the board.",
  "how": "The extraordinary decisions of the shareholders assembly are the bond issue, the capital increase and the change of the statute.",
  "trap": "These are exactly the decisions that alter the capital structure or the constitution of the company, which is why they sit with the owners."
 },
 {
  "cat": "Governance & ESG",
  "title": "The Traditional Governance Model",
  "meaning": "In the traditional model the shareholders meeting sits at the top and appoints the bodies that direct and control the company.",
  "how": "The shareholders meeting hires and fires members and reviews decisions of the Board of Directors, which includes shareholder representatives, stakeholder representatives and the CEO, and may include executive managers; the board approves the financial statement and decides upon dividends. A Board of Supervisors made of independent members checks that the decisions undertaken by management comply with normative and statutory requirements, and a committee of independent auditors checks the financial statements.",
  "trap": "Direction and supervision are assigned to distinct bodies; conflating the board of directors with the board of supervisors loses the control mechanism."
 },
 {
  "cat": "Governance & ESG",
  "title": "The Two-Tier System",
  "meaning": "The two-tier system, found in the Netherlands and Germany, separates supervision and management into two distinct boards.",
  "how": "The shareholders meeting appoints a Supervisory Board made of shareholder representatives, stakeholder representatives and non-executive directors, which hires and fires the members of the Management Board, reviews its decisions and approves the financial statements. The Management Board is made of the CEO and the company executives. A committee of independent auditors checks the financial statements.",
  "trap": "The supervisory board is not a second executive layer: it appoints and monitors the managers rather than running operations."
 },
 {
  "cat": "Governance & ESG",
  "title": "The One-Tier System",
  "meaning": "The one-tier system, found in the U.S. and the U.K., places direction and supervision inside a single board.",
  "how": "The shareholders meeting appoints a Board of Directors including shareholder representatives, executive and non-executive directors, the CEO and a control committee. Non-executives are more numerous than executives, and some non-executive members act as supervisors. A committee of independent auditors checks the financial statements.",
  "trap": "Having one board does not mean having no supervision: the supervisory function is carried by the non-executive majority inside the board."
 },
 {
  "cat": "Governance & ESG",
  "title": "Governance Failure: the Volkswagen Diesel Scandal",
  "meaning": "Volkswagen admitted installing software in engines over several years so they passed laboratory emission tests but emitted dangerous nitrogen oxides when on the road.",
  "how": "Chief executive Martin Winterkorn resigned insisting he knew nothing of the cheating, which analysts feared could cost billions in fines, lawsuits and recall costs. Governance experts argued the cheating was predictable because of lax boardroom controls and a peculiar corporate culture, and warnings about VW's governance had been raised for years. Even before the scandal, VW shares traded at a discount to other carmakers partly because of governance concerns.",
  "trap": "The market had already priced the governance weakness before the scandal broke, which is the point: governance quality is not only an ethical matter but a valuation one."
 },
 {
  "cat": "Governance & ESG",
  "title": "Board Independence and Diversity at Volkswagen",
  "meaning": "A key weakness at VW was the lack of diversity of opinion and expertise on its supervisory board, the body responsible for hiring and firing executives, advising management and monitoring their actions.",
  "how": "The 20-member council of directors was equally divided between shareholder and worker representatives, but 17 of the 20 members were German or Austrian and the board had only one truly independent voice. Many of the remaining directors represented the three largest shareholders: the Porsche and Piëch families, the State of Lower Saxony and Qatar. External investors held only 12% of the voting shares and therefore could not change anything.",
  "trap": "Formal balance is not independence: seats were evenly split between shareholders and workers, yet the board still lacked independent, relevantly skilled voices."
 },
 {
  "cat": "Governance & ESG",
  "title": "ESG",
  "meaning": "Environmental, social and corporate governance (ESG) is a framework designed to be integrated into an organization's strategy to create enterprise value by expanding the organizational objectives to include the identification, assessment and management of sustainability-related risks and opportunities in respect to all organizational stakeholders and the environment.",
  "how": "The environmental aspect focuses on preserving the natural world: climate change, greenhouse gas emissions, biodiversity loss, deforestation, pollution, energy efficiency and water management. The social aspect focuses on people and relationships: gender and diversity, equity and inclusion, customer satisfaction and employee engagement. The governance aspect focuses on enhancing corporate governance: board composition, cybersecurity practices, management structure, executive compensation and preventing bribery and corruption.",
  "trap": "ESG is framed as a way of creating enterprise value by managing risks and opportunities, not as a set of obligations separate from strategy."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Goal Behind the Strategy",
  "meaning": "The goal of a company should be to maximize long term cash flows, which allows it to achieve a combination of value creation for both shareholders and stakeholders.",
  "how": "This is the reference point everything else in the chapter serves: strategy exists to reach that long-term goal, not to win any single period.",
  "trap": "Shareholders and stakeholders are joined here, not opposed. The phrase is a combination of value creation for both, which is why the horizon has to be long term."
 },
 {
  "cat": "What Strategy Is",
  "title": "Strategos: the Military Origin",
  "meaning": "«Strategy» comes from the Greek word «Strategos», which means generalship.",
  "how": "It is the art of war, especially the planning of movements of troops, ships, aircraft and so on into favourable positions.",
  "trap": "The military root is about positioning before the battle, not about fighting it. That is the sense carried into business: choosing where to be, not only how hard to push.",
  "deep": {
  "text": "Strategos means generalship, and more literally to command, to lead. The lecture stresses that strategy did not originate in management: it is far older and comes from the military world. The first seminal work on it is Sun Tzu's The Art of War, around 500 B.C. It also warns that strategy risks looking «fuzzy» precisely because the word is now used everywhere, from corporate settings down to everyday personal plans, which is why an operational definition is needed at all.",
  "source": "Strategy and its origins"
 }
 },
 {
  "cat": "What Strategy Is",
  "title": "Five Ways of Saying the Same Thing",
  "meaning": "The classic definitions all circle competitive advantage from different angles.",
  "how": "Ken Ohmae: business strategy is about competitive advantage, a sustainable edge over competitors. Peter Drucker: a firm's theory about how to gain competitive advantages. Michael Porter: competitive strategy is about being different, delivering a unique mix of value. Bruce Henderson: a deliberate search for a plan of action that will develop a business's competitive advantage. Henry Mintzberg: a pattern in a stream of decisions.",
  "trap": "Mintzberg's is the odd one out: a pattern in a stream of decisions is observed after the fact, while the others describe something deliberately searched for or planned. That tension returns later as intended versus emergent strategy.",
  "deep": {
  "text": "The lecture gives two of these quotes in full, with their sources. Ken Ohmae, The Mind of the Strategist (1983): “What business strategy is all about is, in a word, competitive advantage... The sole purpose of strategic planning is to enable a company to gain, as efficiently as possible, a sustainable edge over its competitors. Strategy thus implies an attempt to alter a company's strength relative to that of its competitors in the most efficient way.” Bruce Henderson, The Origin of Strategy (1989): “Strategy is a deliberate search for a plan of action that will develop a business's competitive advantage and compound it... The differences between you and your competitors are the basis for your advantage... The objective is to enlarge the scope of your advantage, which can only happen at someone else's expense.”",
  "source": "Strategy: an operational definition"
 }
 },
 {
  "cat": "What Strategy Is",
  "title": "Strategy as Goal-Directed Action",
  "meaning": "Strategy is a set of goal-directed actions a firm takes to gain and sustain superior performance relative to competitors.",
  "how": "Three parts hold it together: the actions are goal-directed, performance is measured relative to competitors, and the aim is both to gain and to sustain it.",
  "trap": "Superior performance is relative. A firm improving in absolute terms while its rivals improve faster has no competitive advantage."
 },
 {
  "cat": "What Strategy Is",
  "title": "Strategy as an Integrated Plan",
  "meaning": "Strategy is an integrated, comprehensive plan.",
  "how": "It identifies the scope and the direction of the organisation, integrates a coherent set of strategic decisions, and is aimed at obtaining long term performance superior to competitors, which is competitive advantage.",
  "trap": "The word that carries the weight is coherent: a list of individually sensible decisions that do not fit together is not a strategy.",
  "deep": {
  "text": "The lecture reaches this definition as the answer to its own leading question, how to define strategy operationally, and words the third element as an integrated and consistent set of strategic decisions. It also makes explicit that the superiority is measured with reference to the goals identified, not in the abstract. The definition matters because it sets the boundaries of the discussion: strategy is far from fuzzy once it is tied to advantage and, more broadly, to performance.",
  "source": "Strategy: an operational definition"
 }
 },
 {
  "cat": "What Strategy Is",
  "title": "What Makes a Decision Strategic",
  "meaning": "A strategic decision is one that has long term effects, has non-reversible effects, and requires large amounts of resources.",
  "how": "All three together: a cheap decision that is easily undone is not strategic, however long it lasts.",
  "trap": "Non-reversible is the criterion people drop. It is what makes the decision worth analysing carefully in advance rather than correcting later.",
  "deep": {
  "text": "The lecture builds the criteria from an everyday example: enrolling in a two-year MSc against skipping a lecture. Enrolling acts on the long term, requires significant resources of time, money and effort, has multi-dimensional, transversal and deep impacts — knowledge, but also people met and friendships made — and is hardly reversible once the course is under way. The same logic runs at company level: investing in a new plant is strategic, scheduling a day's shift work is not. The full definition it arrives at is wider than the three criteria on the slide: a strategic decision has long term, significant, multi-dimensional and non-reversible effects on the final goal of the organization; it usually requires large amounts of resources; and it usually requires top management involvement.",
  "source": "Strategic decisions and Tactical decisions"
 }
 },
 {
  "cat": "What Strategy Is",
  "title": "Why Strategy Is Important",
  "meaning": "Strategy earns its place for two organisational reasons, beyond the content of any particular plan.",
  "how": "As decision support it constrains decision alternatives and integrates the knowledge of different individuals. As a coordinating device it coordinates the actions of different parts of the organisation and defines messages that are easy to communicate.",
  "trap": "Constraining alternatives is a benefit, not a cost. A strategy that leaves every option open coordinates nothing."
 },
 {
  "cat": "What Strategy Is",
  "title": "Common Elements in Successful Strategy",
  "meaning": "Grant's account of what successful strategies have in common.",
  "how": "Successful strategy rests on effective implementation, which in turn rests on three foundations: simple, consistent, long-term goals; profound understanding of the competitive environment; and objective appraisal of resources.",
  "trap": "Effective implementation sits between the three foundations and success: the foundations do not deliver on their own. Note also that the goals are required to be simple, not sophisticated."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Corporate Strategy",
  "meaning": "Corporate strategy defines in which industries and markets the company is going to compete.",
  "how": "In Grant's scheme it answers the question of industry attractiveness: which industries should we be in?",
  "trap": "It is about the choice of arena, not about how to win inside it. Deciding to enter a market is corporate; deciding how to beat rivals there is not."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Business Strategy",
  "meaning": "Business strategy is concerned with how the company competes within a particular industry or market.",
  "how": "It answers the question of comparative advantage: how should we compete?",
  "trap": "The two levels are often confused because both use the word competition. Corporate strategy picks the game; business strategy plays it.",
  "deep": {
  "text": "The lecture states the aim precisely: business strategy aims at creating a sustainable competitive advantage, meaning performance superior to competitors, within a given industry or business area. It does that by formulating the objectives and the strategic plan that a Strategic Business Unit will follow and implement within the Business Area it covers. The link with the level above is explicit: each SBU receives general goals and resources, or a budget to reach them, from the corporate strategy, and formulates its business strategy accordingly.",
  "source": "Business Strategy: vision and mission"
 }
 },
 {
  "cat": "Levels of Strategy",
  "title": "The Question Both Levels Answer",
  "meaning": "Both levels serve one underlying question: how do we make money, in the sense of earning a rate of return above the cost of capital.",
  "how": "That question splits in two. Industry attractiveness, which industries should we be in, is corporate strategy. Comparative advantage, how should we compete, is business strategy.",
  "trap": "The benchmark is the cost of capital, not zero. A positive profit that does not cover the cost of capital is not the return the scheme is asking for."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Functional Strategies",
  "meaning": "Functional strategies are the elaboration and implementation of business strategies through individual functions.",
  "how": "Under each business unit strategy sit R&D, production, HR, finance and sales & marketing strategies.",
  "trap": "They implement rather than choose. A functional strategy that is not the elaboration of a business strategy above it is drifting on its own."
 },
 {
  "cat": "Levels of Strategy",
  "title": "The Hierarchy of Levels",
  "meaning": "The three levels nest: corporate strategy at the top, a strategy for each SBU below it, and the functional strategies within each SBU.",
  "how": "A company with three business units has one corporate strategy, three business strategies, and a full set of functional strategies under each of them.",
  "trap": "The functional strategies repeat per business unit. R&D in SBU A answers to SBU A's business strategy, not directly to the corporate one."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Strategic Business Unit",
  "meaning": "An SBU carries out a defined group of products, which are aimed at a specific group of customers.",
  "how": "It has its own competitors; it can be managed separately from the rest of the company; it can stand alone; and it has distinct objectives, is a profit centre, and has a manager responsible for its strategy and performance.",
  "trap": "A product line is not automatically an SBU. The test is whether it could stand alone, with its own competitors and its own responsible manager."
 },
 {
  "cat": "Levels of Strategy",
  "title": "The SBU as a Profit Centre",
  "meaning": "Being a profit centre with a manager responsible for its strategy and performance is part of the definition, not an administrative detail.",
  "how": "It is what makes business strategy accountable: someone owns the result of how that unit competes.",
  "trap": "A unit measured only on cost or volume is not a profit centre, so it cannot carry a business strategy in this sense."
 },
 {
  "cat": "Strategy Process",
  "title": "The Strategic Decisions Process",
  "meaning": "The process that turns analysis into action, running from two sides towards the centre and then downwards.",
  "how": "External analysis produces key success factors; internal analysis produces strategic resources. They meet at competitive advantage and grand strategy, supported by a SWOT analysis. Then comes the generation and selection of strategic alternatives, implementation and control.",
  "trap": "The two analyses run in parallel and meet; neither comes first. Reading the diagram as a single left-to-right sequence loses that.",
  "deep": {
  "text": "At business level the lecture names five macro-phases rather than three: Orientation, also called direction setting; Analysis or Diagnosis; Decision-making; Implementation; and Control or Monitoring. Orientation comes before any analysis and is where vision, mission and strategic objectives translate the corporate goals into the specific business area. Decision-making then splits into generating strategic alternatives and assessing and selecting them.",
  "source": "Business Strategy: strategic alternatives"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "The Three Phases",
  "meaning": "The process groups into three phases.",
  "how": "Diagnosis covers external and internal analysis and the SWOT. Strategy formulation is the generation and selection of strategic alternatives. Actions implementation covers implementation and control.",
  "trap": "SWOT belongs to diagnosis, not to formulation. It describes the situation; it does not choose the alternative.",
  "deep": {
  "text": "The five macro-phases of the business-level process map onto these three: Orientation is added in front, Analysis or Diagnosis matches diagnosis, Decision-making matches strategy formulation, and Implementation and Control are the two halves of actions implementation. If a question asks how many phases the process has, the answer depends on which of the two presentations is being used.",
  "source": "Business Strategy: strategic alternatives"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "External Analysis and Key Success Factors",
  "meaning": "The outward-facing half of the diagnosis.",
  "how": "External analysis identifies the key success factors of the arena and yields the opportunities and threats of the SWOT.",
  "trap": "Key success factors belong to the industry, not to the firm. What the firm has is a resource; what the industry demands is a key success factor.",
  "deep": {
  "text": "The lecture adds the standpoint, which is the part most often got wrong: in external strategy analysis the point of view is that of the average generic player in the business area, not of your own company. Opportunities and threats are therefore industry-wise, not firm-wise, and should apply to any competitor operating in the industry.",
  "source": "Business Strategy: objectives, boundary & strategy analysis"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "Internal Analysis and Strategic Resources",
  "meaning": "The inward-facing half of the diagnosis.",
  "how": "Internal analysis identifies the strategic resources of the firm and yields the strengths and weaknesses of the SWOT.",
  "trap": "Strengths and weaknesses are internal by definition. A hostile market is a threat, never a weakness.",
  "deep": {
  "text": "Internal strategy analysis focuses on one specific company in the business area and compares it with its main direct competitors, by means of benchmarking, to disclose the firm-specific characteristics that give it an edge or the negative gaps it has to fill. Strengths and weaknesses are therefore the possible sources of competitive advantage or disadvantage.",
  "source": "Business Strategy: objectives, boundary & strategy analysis"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "SWOT as the Meeting Point",
  "meaning": "SWOT analysis is where the external and internal halves of the diagnosis come together.",
  "how": "Opportunities and threats arrive from the external side, strengths and weaknesses from the internal side, and the combination frames competitive advantage.",
  "trap": "SWOT is a summary of the diagnosis, not an analysis in itself. Its content is only as good as the two analyses feeding it.",
  "deep": {
  "text": "The lecture calls the SWOT the core of the business-level formulation process, because the business strategy itself arises from it. Crossing the four elements is what produces the content: which strengths to leverage to exploit an opportunity, which strengths to use to defend against a threat, and which weaknesses stop the firm taking advantage of an opportunity or intensify the effect of a threat.",
  "source": "Business Strategy: strategic alternatives"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "The Grand Strategy",
  "meaning": "At the centre of the process sits competitive advantage and the grand strategy, described as the business model.",
  "how": "It is what the diagnosis converges on and what the strategic alternatives are generated from.",
  "trap": "The grand strategy is the output of the diagnosis and the input to formulation. It is not the implementation plan, which comes further down."
 },
 {
  "cat": "Strategy Process",
  "title": "Repositioning and Control",
  "meaning": "The process is a loop, not a line.",
  "how": "Control follows implementation, and repositioning feeds back into the diagnosis, so the analysis is revisited rather than performed once.",
  "trap": "Without the feedback the scheme would describe a one-off exercise. Repositioning is what makes it a process.",
  "deep": {
  "text": "The lecture makes the loop concrete. Monitoring is usually run annually and executed as a control step corresponding to budgeting variance analysis, quantifying any delta between expected and achieved performance and identifying its cause. The outcome either confirms the long-term goals set in the orientation phase or triggers a strategic re-planning, which may require new objectives and even a new vision, mission and SWOT.",
  "source": "Business Strategy: strategic alternatives"
 }
 },
 {
  "cat": "Strategy Process",
  "title": "Strategy as a Link Between Two Environments",
  "meaning": "Strategy is what connects the internal environment of the firm to the external environment it operates in.",
  "how": "The internal side is goals & values, resources & capabilities, and structure & systems. The external side is the economic and social context, business areas, competitors, customers and suppliers.",
  "trap": "Goals and values sit on the internal side. They are something the firm brings, not something the environment imposes."
 },
 {
  "cat": "Intended & Emergent",
  "title": "The Top-Down Approach",
  "meaning": "The top down strategic approach produces the intended strategy.",
  "how": "Strategy is formulated at the top as a strategic plan and passed down the organisation for implementation.",
  "trap": "Intended is not the same as realized. What is planned at the top is only the starting point of what actually happens."
 },
 {
  "cat": "Intended & Emergent",
  "title": "The Bottom-Up Approach",
  "meaning": "The bottom up strategic approach produces the emergent strategy.",
  "how": "Strategy arises from decisions and initiatives taken lower in the organisation, which accumulate into a pattern.",
  "trap": "Emergent does not mean accidental or unmanaged. It is a pattern in a stream of decisions, which is precisely Mintzberg's definition of strategy."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Intended, Deliberate, Unrealized, Realized",
  "meaning": "Mintzberg's four terms describe what happens to a plan on its way to reality.",
  "how": "The intended strategy splits: part of it is never carried out and becomes unrealized strategy, while the part that is carried out is the deliberate strategy. The deliberate strategy joins the emergent strategy coming from below, and together they form the realized strategy.",
  "trap": "Deliberate is the surviving part of the intended, not a synonym for it. And realized strategy has two sources, so it matches neither the plan nor the emergent pattern alone."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Strategy as a Combination",
  "meaning": "In reality strategy is a combination of planned, top down strategy and emergent strategy.",
  "how": "The top down strategic plan and the bottom up emergent strategy both flow into what the company actually does.",
  "trap": "The two approaches are not a choice between alternatives. Treating the plan as the whole strategy ignores half of where the realized strategy comes from."
 },
 {
  "cat": "Intended & Emergent",
  "title": "A Pattern in a Stream of Decisions",
  "meaning": "Mintzberg's definition of strategy.",
  "how": "It describes strategy as something identifiable in what an organisation has actually done, rather than only in what it declared it would do.",
  "trap": "This definition makes strategy observable after the fact. Under it, a company with no plan can still have a strategy, and a company with a plan it never followed may not."
 },
 {
  "cat": "Intended & Emergent",
  "title": "The Frappuccino Case",
  "meaning": "The Starbucks example of an emergent strategy, from Rothaermel.",
  "how": "Diana, a store manager in southern California, received repeated requests for an iced beverage sold by a local competitor. Headquarters said no: the executive committee voted the idea down 7 to 1, and CEO Howard Schultz commented “We do coffee, we don't do iced drinks”. Diana developed the drink and sold it in her store anyway, keeping careful sales records: 40 drinks a day in the first week, 50 in the second, 70 in the third. Those numbers persuaded the executive team to approve the drink for all stores. It is the Frappuccino, at one point more than 20 percent of Starbucks' total revenues.",
  "trap": "The initiative was rejected by the formal process and succeeded anyway, which is the point: the realized strategy came from the bottom. What changed the committee's mind was the evidence Diana had collected, not the idea itself, which they had already tasted and refused."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Vision",
  "meaning": "The vision is the future “dream”: where we are going.",
  "how": "The vision statement expresses the aspirations of a company, what an organisation wants to accomplish, what it wishes to be like in some years' time.",
  "trap": "Vision looks forward. A statement describing what the company does today is a mission, however ambitious its wording.",
  "deep": {
  "text": "At business-strategy level the lecture gives vision a different and narrower meaning: the long term view on the best possible evolution of the business area the company operates in, describing how the industry will positively evolve and drawing a path that the company and its competitors may follow. In that sense it is also called industry foresight, and being about the industry it can be shared with competitors. That is not the slide's definition, where vision is the company's own future dream. Keep the two apart and notice which level the question is asking about.",
  "source": "Business Strategy: vision and mission"
 }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Mission",
  "meaning": "The mission is a company's present business scope: who we are and what we do.",
  "how": "The mission statement broadly defines what a company does, and the means by which the vision is accomplished. It covers what business the organization is in, and what it is not, both now and projecting into the future.",
  "trap": "Mission is the means, vision is the end. The mission is also what the company is not in, which is the part usually left out.",
  "deep": {
  "text": "At business-strategy level the lecture defines mission as the strategic role a given company wishes to play within the path set by the vision, also called strategic intent. On that reading the mission is firm-specific while the vision is industry-specific, which is the opposite emphasis from the slide, where mission is the present business scope and vision the company's own aspiration.",
  "source": "Business Strategy: vision and mission"
 }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Airbus: Vision and Mission",
  "meaning": "The traditional pairing, shown on one company.",
  "how": "Vision: to be the world's leading aerospace company. Mission: manufacturing the world's largest aircraft with passengers at heart and airlines in mind.",
  "trap": "The vision names a position to reach; the mission names the activity and for whom. Neither says why the company exists, which is what purpose adds."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Purpose",
  "meaning": "A more recent concept: the long-term and normative aspiration that identifies why an organization exists and pushes it to take actions that are meaningful and impactful for its stakeholders.",
  "how": "It requires an organization to adopt an outward-looking perspective and to look at things from the eyes of its stakeholders. To become an organizational purpose, a statement has to be authentic and shared.",
  "trap": "Purpose is not a more inspiring mission. Mission says what the company does, vision what it wants to become, purpose why it exists at all."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What Purpose Demands",
  "meaning": "Purpose sets a higher bar than a well-written statement.",
  "how": "It means the company does not just sell products but solves problems, addresses societal needs and makes a positive impact. The statement has to be authentic and shared to count as an organizational purpose.",
  "trap": "Authentic and shared are conditions, not decoration. A purpose announced by management and not recognised inside the company does not qualify."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Mission, Vision and Purpose Side by Side",
  "meaning": "The three answer three different questions.",
  "how": "Mission: what business the organization is in, and what it is not, both now and projecting into the future. Vision: what the organization wishes to be like in some years' time. Purpose: why the company exists, with a broader and outward-oriented perspective.",
  "trap": "Purpose is the only one that is not about what the company does, will do or wants to be."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Disney: All Three",
  "meaning": "One company stated at all three levels.",
  "how": "Mission: using its portfolio of brands to differentiate its content, services and consumer products, seeking to develop the most creative, innovative and profitable entertainment experiences and related products in the world. Vision: to be one of the leading producers and providers of entertainment and information. Purpose: promote and spread happiness.",
  "trap": "The purpose is the shortest and mentions no product at all. That is what outward-oriented looks like in practice."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Purpose Statements in Practice",
  "meaning": "Examples of how companies word a purpose.",
  "how": "Tata: improve the quality of life of the communities we serve. Nike: bring inspiration and innovation in every athlete in the world. Unilever: making sustainable living commonplace. Tencent: enhance people's quality of life through internet services. ING: empowering people to stay a step ahead in life and in business. Ford: to help build a better world, where every person is free to move and pursue their dreams. LEGO: inspire and develop children to think creatively, reason systematically and release their potential. Walmart: saving people money so they can live better. Tesla: accelerate the world transition to sustainable energy. Kellogg: nourishing families so they can flourish and thrive.",
  "trap": "Almost none of them names the product. Tesla says energy rather than cars, Walmart says saving money rather than retail."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Organisational Culture",
  "meaning": "Organisational culture describes the collectively shared values and norms of the firm.",
  "how": "Employees learn about an organisation's culture through socialisation.",
  "trap": "Culture is collectively shared. An individual manager's preferences are not the culture, however senior."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Organisational Values",
  "meaning": "Organisational values define what is important.",
  "how": "They include the ethical standards, beliefs and norms that define the appropriate employee attitude and govern the behaviour of individuals within a firm.",
  "trap": "Values are meant to govern behaviour, not to describe aspirations. That is the test for whether a stated value is real."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Culture Expressed in Artifacts",
  "meaning": "Corporate culture finds its expression in artifacts.",
  "how": "These are the design and layout of physical space, symbols such as the type of clothing, vocabulary and language, the stories told, and the events celebrated. An open playful office and a floor of identical cubicles are two different cultures made visible.",
  "trap": "Artifacts are where culture becomes observable, but they are the expression, not the culture itself. Redecorating does not change shared values."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Founder Imprinting and Groupthink",
  "meaning": "Organisational culture comes from founder imprinting, which often persists decades after his or her departure.",
  "how": "The risk that follows is groupthink, where the shared way of seeing things suppresses dissent.",
  "trap": "The persistence is the point: a culture can outlast the person who set it and the conditions that made it appropriate."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Culture as Asset and as Liability",
  "meaning": "Culture is one of the strongest assets a company has, but it can also become its strongest liability.",
  "how": "In that second form it is called core rigidity, and it leads to the need for cultural change, which often means new leaders and a change of management.",
  "trap": "It is the same culture in both roles. The strength that made it an asset is what makes it hard to change when conditions move."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Google Core Values",
  "meaning": "The example of stated core values.",
  "how": "Focus on the user and all else will follow. It's best to do one thing really, really well. Fast is better than slow. Democracy on the web works.",
  "trap": "They are phrased as operating rules for decisions, not as adjectives. That is what makes them usable as values rather than slogans."
 },
 {
  "cat": "What Strategy Is",
  "title": "Sun Tzu's Decisive Factors",
  "meaning": "The Art of War, around 500 B.C., is the first seminal work on strategy, and it sets out ten decisive factors for victory that a good strategy should take into account.",
  "how": "Invincibility lies in the defense, the possibility of victory in the attack. Know the enemy and yourself. Strike only when the situation assures victory. Strike the enemy when he is least prepared. Weigh the situation before moving. Be flexible. Recognize the hazard and the weather. Deceive the enemy. Surprise the enemy. Separate the enemy from his allies.",
  "trap": "Many of these are still business rules today: analysing the competitive arena, planning and acting, being flexible, creative and innovative, and partnering to create alliances. The point of the list is the continuity, not the antiquity.",
  "deep": {
   "text": "The lecture reviews the ten factors in brief and draws the parallel explicitly, noting how many of these military factors represent business rules managers still consider today.",
   "source": "Strategy and its origins"
  }
 },
 {
  "cat": "What Strategy Is",
  "title": "From Battlefield to Competitive Arena",
  "meaning": "How strategy moved from the military world into management, term by term.",
  "how": "The battlefield became the competitive arena; the enemies to fight became the competitors; the army became the company, with its assets and resources as the weapons the war is fought with; and the general became the entrepreneur or manager leading the company towards success.",
  "trap": "The parallelism is a mapping, not a metaphor to be pushed: business strategy no longer aims at crushing or annihilating the opponent, which is where the analogy stops.",
  "deep": {
   "text": "Out of that parallelism the field came to be called Strategic Management, which couples strategy with the roles of the executives in charge of formulating, planning and driving it. The lecture also notes that strategy still finds strong application in its original military context.",
   "source": "Strategy and its origins"
  }
 },
 {
  "cat": "What Strategy Is",
  "title": "Tactics",
  "meaning": "Tactics are the short-term, operational decisions performed on a daily basis to pursue and implement a broader strategy.",
  "how": "In strategy you set long term objectives and plan how to achieve them; tactics are how you concretize and implement that strategy through daily action. In the military parallel, a commander's strategy aims at winning the war, his tactics at winning the single battle with the resources allotted by the strategy level.",
  "trap": "Tactics are not small strategy. They operate inside resources the strategy has already allocated, which is why a tactical decision is reversible and a strategic one is not.",
  "deep": {
   "text": "The lecture pairs each strategic decision with its tactical twin to make the line visible: attending a two-year MSc against skipping a lecture, buying a car against washing it, buying a house against maintaining it, investing in a new plant against scheduling a day's shift work.",
   "source": "Strategic decisions and Tactical decisions"
  }
 },
 {
  "cat": "What Strategy Is",
  "title": "Between Politics and Tactics",
  "meaning": "The military way of looking at strategy places it in the space between politics and tactics.",
  "how": "Politics is derived from a purpose or cause. Strategy incorporates that purpose and is concerned with how to achieve the policy or goal with the means available. Tactics are the particular movements and actions while engaged in battle.",
  "trap": "Strategy is the middle term, not the top one. It does not set the purpose — it receives it from the level above and works out how to reach it with the means at hand.",
  "deep": {
   "text": "Business strategy keeps the majority of these characteristics and then explores their company and management-related aspects, competition and advantage in particular.",
   "source": "Strategy: an operational definition"
  }
 },
 {
  "cat": "What Strategy Is",
  "title": "Why Business Strategy Is Not War",
  "meaning": "Where the military analogy stops.",
  "how": "Business strategy does not aim at crushing or annihilating opponents. It assumes instead that you have a goal, that you have resources to reach it, and that you operate in a context where other entities have their own goals, which overlap and compete with yours.",
  "trap": "Advantage in business is relative and can be enlarged, but as Henderson puts it, only at someone else's expense. That is competition, not annihilation.",
  "deep": {
   "text": "The lecture closes on this: strategy is far from being fuzzy, because it is and will remain fundamentally related to the notion of advantage and, in a broader sense, to performance.",
   "source": "Strategy: an operational definition"
  }
 },
 {
  "cat": "What Strategy Is",
  "title": "Strategy Is Made of Strategic Decisions",
  "meaning": "The move that makes strategy definable: place it in the realm of decisions.",
  "how": "Strategy is defined and made of a set of strategic decisions, which is why defining a strategic decision comes first and defining strategy follows from it. The plan is then integrated and comprehensive because that set is consistent.",
  "trap": "This is the reason the criteria for a strategic decision are worth memorising: they are the building block the whole definition of strategy rests on, not a side classification.",
  "deep": {
   "text": "The lectures follow exactly this order — first the origins, then what makes a decision strategic as opposed to tactical, and only then the operational definition of strategy as a whole.",
   "source": "Strategic decisions and Tactical decisions"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "The Business Strategy Formulation Process",
  "meaning": "The sequence of logical steps and building blocks through which a business strategy is formulated, grouped into five macro-phases.",
  "how": "Orientation, or direction setting; Analysis or Diagnosis; Decision-making; Implementation; and Control, also called Monitoring. Orientation translates the corporate goals and directions into the specific business area, through vision, mission and strategic objectives.",
  "trap": "Orientation is a phase in its own right and comes before any analysis. Starting from the SWOT skips the step that sets what the analysis is for.",
  "deep": {
   "text": "The lecture presents it as the process an SBU follows after receiving general goals and a budget from the corporate strategy.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "From Corporate Goals to the SBU",
  "meaning": "How the two levels of strategy connect in practice.",
  "how": "Each SBU receives general goals and resources, or a budget to reach those goals, from the corporate strategy, and formulates its business strategy accordingly. The first step of orientation is precisely translating those corporate goals and directions into the specific business area.",
  "trap": "The business strategy is not formulated in a vacuum: its goals and its budget are both handed down. What the SBU decides is how to reach them within the business area it covers.",
  "deep": {
   "text": "This is what makes the business level answer 'how should we compete' while the corporate level has already answered 'which industries should we be in'.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "The Abell Cube",
  "meaning": "A way of defining the boundaries of the business area an SBU will cover, giving a three-dimensional definition of the business.",
  "how": "The three axes are customer groups, answering who the competitors in the industry serve; customer functions, meaning what customer needs the offer satisfies; and the alternative technologies available to provide those functions through different products and services. Their intersection creates a space, or cube, that delimits the business area.",
  "trap": "It defines the arena, not the firm. Two competitors in the same Abell space are in the same business area even if their products look nothing alike, because the cube is built on needs served and technologies used.",
  "deep": {
   "text": "The lecture places the Abell Cube at the end of orientation: the business area definition is the input to the analysis or diagnosis macro-phase.",
   "source": "Business Strategy: objectives, boundary & strategy analysis"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Whose Point of View in External Analysis",
  "meaning": "External strategy analysis takes the standpoint of the average generic player in the business area, not of your own company.",
  "how": "It looks for the overall trends and phenomena that may constitute an opportunity or a threat for all competitors operating in the industry.",
  "trap": "Opportunities and threats are industry-wise, not firm-wise. Writing “our brand is weak against this trend” into the external analysis mixes the two perspectives and empties the distinction.",
  "deep": {
   "text": "The lecture is explicit that the considerations drawn should apply to the average player in the industry, not just to a specific company.",
   "source": "Business Strategy: objectives, boundary & strategy analysis"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Internal Analysis by Benchmarking",
  "meaning": "Internal strategy analysis focuses on one specific company in the business area and compares it with its main direct competitors.",
  "how": "The comparison is done by benchmarking, and it discloses the firm-specific characteristics that give the company an edge on competition, or the negative gaps it has to fill.",
  "trap": "Strengths and weaknesses are the possible sources of competitive advantage or disadvantage. A characteristic shared by every competitor is neither: with no gap against rivals there is no advantage to be had.",
  "deep": {
   "text": "The lecture pairs this with the external analysis as the two complementary perspectives whose thoughtful combination feeds the rest of the formulation process.",
   "source": "Business Strategy: objectives, boundary & strategy analysis"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Crossing the Four SWOT Elements",
  "meaning": "What the SWOT produces once the two analyses are combined.",
  "how": "Crossing external opportunities and threats with internal strengths and weaknesses lets the company see which strengths to leverage to exploit an opportunity, which strengths to use to defend against a threat, and which weaknesses stop it taking advantage of an opportunity or intensify the effect of a threat.",
  "trap": "The value is in the crossings, not in the four lists. A SWOT presented as four columns has stopped before the step that generates the strategy.",
  "deep": {
   "text": "The lecture calls the SWOT the core of the business-level formulation process, since the business strategy of the company arises from these combined perspectives.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Generating Strategic Alternatives",
  "meaning": "The first step of the decision-making macro-phase, where the SWOT is turned into a set of possible strategic alternatives.",
  "how": "Exploiting an opportunity with a strength is itself a strategic decision: it is long term, it requires large investments and resources, it is cross-functional and it is hardly reversible. The overall set of such decisions is what constitutes the company's business strategy.",
  "trap": "This is where the criteria for a strategic decision come back. An alternative generated from the SWOT that fails those criteria is a tactical choice, not a business strategy.",
  "deep": {
   "text": "The lecture presents this as the bridge from diagnosis to decision-making: the business strategy basically emerges from the SWOT.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Assessing and Selecting Alternatives",
  "meaning": "Not all strategic alternatives can be implemented, because resources are limited or because some are mutually exclusive.",
  "how": "They are assessed on their consistency with the vision, mission and goals, on the resources available in terms of budget, and on their possible contribution to the ultimate goal, which is value creation by means of competitive advantage. The assessment can use scenario analysis, economic and financial forecasts and sensitivity analysis.",
  "trap": "The tools inform the choice but do not make it: this is the heart of the decision-making role, and it is the entrepreneur's or manager's strategic and entrepreneurial acumen that determines which decision reaches the goals.",
  "deep": {
   "text": "The lecture labels this step Strategic alternatives assessment and selection; once one or more are selected they are embodied in the company's business strategy and the decision-making phase ends.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Implementation Through Tactics",
  "meaning": "How a selected strategy gets executed.",
  "how": "The strategy is executed by means of a number of consistent tactical choices, chained to one another, that should lead to achieving the overall strategic objectives. Execution gets strategy down to the basics and encompasses decisions in each given function or unit.",
  "trap": "The tactical choices have to be consistent and chained. A set of individually reasonable tactics that do not compose is how an implementation drifts away from the strategy it was meant to carry out.",
  "deep": {
   "text": "To support execution managers may resort to different models; the framework widely employed is the business model, which considers the implications of a company's business strategy on a unified set of building blocks and parameters.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "Monitoring and Variance Analysis",
  "meaning": "The last macro-phase, where results obtained are confronted with the goals planned.",
  "how": "It is usually executed through a control step corresponding to budgeting variance analysis, which quantifies any delta between expected and achieved performance and identifies the cause of the positive or negative variance. It is normally run annually.",
  "trap": "Its outcome is not only a score. It either confirms the long-term goals set in orientation or triggers a strategic re-planning, which may require new objectives and even a new vision, mission and SWOT.",
  "deep": {
   "text": "The monitoring macro-phase closes the business strategy formulation process, and the possible re-planning is what sends it back to the beginning.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Strategy Process",
  "title": "The Process Is Not a Waterfall",
  "meaning": "The formulation process is presented as linear, but that is an idealisation.",
  "how": "A strictly linear, waterfall sequence only happens in ideal conditions, where no feedback or feedforward is needed. In real cases one may have to go back to a step, jump another, and so on.",
  "trap": "The requirement is coverage, not order: what matters is that all the steps are considered at least once and lead to a strategy that achieves competitive advantage in the company's business.",
  "deep": {
   "text": "The lecture closes on this caveat, immediately after presenting the five macro-phases in sequence.",
   "source": "Business Strategy: strategic alternatives"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Vision as Industry Foresight",
  "meaning": "At business-strategy level, the vision is the long term view on the best possible evolution of the business area the company operates in, or will operate in.",
  "how": "It describes how the industry will positively evolve and draws a path that the company, as well as other competitors, may follow. For this reason it is also known as industry foresight.",
  "trap": "On this reading the vision is industry-specific and can be shared with competitors. That is the opposite of the intuition that a vision is what makes a company unique.",
  "deep": {
   "text": "The lecture notes that vision and mission are often unclearly defined by companies: sometimes you find one and not the other, or they overlap and their boundaries blur. Both are essential and play complementary roles in formulation.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Mission as Strategic Intent",
  "meaning": "At business-strategy level, the mission is the strategic role a given company wishes to play within the path set by the vision.",
  "how": "It is also known as strategic intent. Where the vision is industry-specific, the mission is firm-specific: it tells the company how to develop its strategy according to the trends foreseen by the vision.",
  "trap": "Vision first, mission second. The mission only makes sense inside a path the vision has already drawn, which is why a mission stated without a vision has nothing to position itself against.",
  "deep": {
   "text": "Together vision and mission have a long-term motivational role, but the lecture stresses they are not enough to set boundaries and targets, which is why strategic objectives are introduced next.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Microsoft: Foresight and Intent",
  "meaning": "The example used to separate the two.",
  "how": "Microsoft's vision in the late 1980s is given as «A chicken in every oven, and a computer in every house». Behind it sat two ideas: that wealth would spread, letting more people satisfy basic needs, and that the resulting surplus would go to more refined needs met by consumer electronics, personal computers among them. The mission that followed might have been “to become the leader in the personal computers business area”.",
  "trap": "The vision was a claim about the industry's evolution, and it differed from competitors who believed computers would stay in the corporate world rather than reach individual homes. Apparently naive, it set the path the strategy followed.",
  "deep": {
   "text": "The lecture uses the pair precisely to show that the vision could have been shared by others in the industry, while the role of becoming the leader in personal computers is Microsoft's alone.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Two Readings of Vision and Mission",
  "meaning": "The chapter carries two different definitions of the same two words, and they are not interchangeable.",
  "how": "In the general definitions, vision is the company's own future dream, what it wishes to be like in some years' time, and mission is its present business scope, who we are and what we do, the means by which the vision is accomplished. In the business-strategy process, vision is industry foresight, a view on how the business area will evolve, and mission is strategic intent, the role the firm wants to play within that path.",
  "trap": "The tell is what the statement is about. If it describes the industry's future, it is vision in the business-strategy sense; if it describes the company's own future, it is vision in the general sense. Check which part of the chapter a question is drawing on before answering.",
  "deep": {
   "text": "The lecture introduces its pair while building the orientation phase of the business strategy formulation process, not while defining corporate identity, which is where the general definitions sit.",
   "source": "Business Strategy: vision and mission"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Strategic Objectives",
  "meaning": "The third concept of the orientation phase, introduced because vision and mission are not enough.",
  "how": "Vision and mission have a long-term motivational role, but they do not set the boundaries and targets for strategy formulation. Strategic objectives, or goals, steer the whole process — analysis, decision-making, implementation and above all control.",
  "trap": "Objectives are what make control possible. Without them the monitoring phase has nothing to compare results against, which is why the lecture says they matter above all there.",
  "deep": {
   "text": "They are described as the means to get the mission down to earth, translating it into a set of measurable and quantifiable milestones.",
   "source": "Business Strategy: objectives, boundary & strategy analysis"
  }
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "SMART Objectives",
  "meaning": "The five features a strategic objective must have, collected in a mnemonic acronym.",
  "how": "Specific, so that it is relatable to what it focuses on and conveys a clear message on what is to be achieved. Measurable, quantifiable through one or more clear indicators, since you cannot improve what you cannot measure. Appropriate, or aligned, meaning consistent with the company's overarching vision and mission. Realistic: goal setting theory tells managers to set objectives that are challenging but perceived as neither impossible nor too easy, because both extremes demotivate. Timely, related to a clear deadline.",
  "trap": "Realistic does not mean easy. The requirement is challenging but attainable, and an objective that is too easy demotivates just as an impossible one does.",
  "deep": {
   "text": "The lecture presents SMART objectives as the means to get the mission down to earth, translating it into measurable and quantifiable milestones.",
   "source": "Business Strategy: objectives, boundary & strategy analysis"
  }
 },
 {
  "cat": "External Analysis",
  "title": "The Five Lenses of External Analysis",
  "meaning": "The deck organises the analysis of the external environment into five questions, each with its own tool.",
  "how": "Understanding the big picture: STEEP analysis. Understanding the industry: Porter's five forces model. Understanding the competitors: competitor analysis. Understanding the supply chain: profit pool mapping. Understanding the customers: market demand analysis, customer segmentation and buyer analysis.",
  "trap": "They are five different levels of zoom, not alternatives. STEEP looks outside the industry entirely, five forces looks at the industry, and the last three look inside it at specific actors."
 },
 {
  "cat": "External Analysis",
  "title": "Where External Analysis Sits",
  "meaning": "External analysis is one half of the diagnosis in the strategic decisions process.",
  "how": "It feeds the key success factors, and through them the opportunities and threats of the SWOT, which meet the strategic resources and the strengths and weaknesses coming from internal analysis.",
  "trap": "Its standpoint is the industry, not your firm. Everything it produces should hold for any competitor in the business area."
 },
 {
  "cat": "External Analysis",
  "title": "Attractiveness of the Business Area",
  "meaning": "What the industry-level analysis is ultimately measuring.",
  "how": "The attractiveness of a business area is the average profitability and growth of the companies operating in it, both current and future.",
  "trap": "Average and future, not yours and today. A firm can do well in an unattractive industry and badly in an attractive one; attractiveness is a property of the arena."
 },
 {
  "cat": "External Analysis",
  "title": "The Outcome of External Analysis",
  "meaning": "External analysis leads to three outputs.",
  "how": "Key success factors, opportunities and threats. The first is about what it takes to succeed in the arena, the other two are the external half of the SWOT.",
  "trap": "Key success factors are not opportunities. They are the prerequisites for success in the industry, which every competitor faces."
 },
 {
  "cat": "External Analysis",
  "title": "Key Success Factors: the Two Questions",
  "meaning": "Key success factors are the prerequisites for success in a business area, and they come from crossing two analyses.",
  "how": "The analysis of demand asks what customers want: who are our customers, and what do they want. The analysis of competition asks how the firm survives competition: what drives competition, what are the main dimensions of competition, and how intense it is. Their intersection gives the key success factors.",
  "trap": "Demand alone is not enough. What customers want tells you what to offer; how competition works tells you what it takes to still be there next year."
 },
 {
  "cat": "External Analysis",
  "title": "Key Success Factors in Three Industries",
  "meaning": "The worked comparison used to show how the two questions combine.",
  "how": "Airlines: customers want low price, and comfort in the business segment; competition is a commodity product with excess capacity, price competition, exit barriers, bargaining power of suppliers and customers, service differentiation and loyalty. The KSFs split by segment — economy needs lean and efficient processes and low operational costs, business needs on-board services. Steel: customers want low price, product consistency and reliability in special steel; competition is a commodity with excess capacity, price competition, high fixed costs and exit barriers; KSFs are access to raw materials at low cost, low cost location, large scale production, and customization for specific applications. Fashion clothing: customers want diversity of style, garment, type and colour, and demand is price sensitive; competition has low barriers to entry, low concentration and buying power of retail chains; KSFs are speed of response to changing fashion and style, and a fast delivery process.",
  "trap": "The same industry can have different KSFs by segment, as the airline economy and business cases show. A single list per industry hides that."
 },
 {
  "cat": "External Analysis",
  "title": "Opportunities and Threats in an Industry",
  "meaning": "The worked example on the airline industry.",
  "how": "Opportunities: market growth, especially in the tourism sector; expansion of the Western countries market; space for increasing the frequency of the most profitable routes. Threats: regulatory issues concerning security; inclusion of aviation in the emission trading scheme for CO2; oil price fluctuation.",
  "trap": "Every item is industry-wide. None of them names a particular airline, which is the test of whether something belongs in the external half of the SWOT."
 },
 {
  "cat": "External Analysis",
  "title": "Market Segmentation in Practice",
  "meaning": "The airline example of dividing customers into segments with different behaviour.",
  "how": "Regular travellers fly for personal reasons, holidays and visiting family, include older consumers with time and money, are price sensitive and may be loyal to one airline to accumulate frequent-flier points. Business travellers have the choice of airline made organisation-wide rather than by the individual, fly business class and tend to be loyal to few airlines. Budget conscious travellers are infrequent, perceive little difference between airlines and are highly price sensitive.",
  "trap": "The business segment is the one where the buyer and the user are different people, which is why loyalty schemes work differently there."
 },
 {
  "cat": "STEEP",
  "title": "The STEEP Framework",
  "meaning": "A model for an educated approach to covering the important context factors — the «big picture» outside the industry.",
  "how": "Variables are grouped into five categories: Social, Technological, Economic, Ecological and Political.",
  "trap": "STEEP sits outside the industry. A factor specific to your competitors belongs to the five forces, not here."
 },
 {
  "cat": "STEEP",
  "title": "What Goes in Each STEEP Category",
  "meaning": "The variables the deck lists under each heading.",
  "how": "Political and legal: monopolies legislation, taxation policies, foreign trade regulations, tariffs, political stability. Economic: growth rates, interest rates, exchange rates, price stability or inflation, employment level. Socio-cultural: demographic trends, income distribution, social mobility, lifestyle changes, levels of education, consumer activism, urbanisation. Ecological: environmental protection laws, compliance with environmental protocols, decommissioning costs, energy provision. Technological: breakthroughs and connectedness.",
  "trap": "Ecological and Economic both start with E, and the split matters: environmental protection laws are ecological, exchange rates are economic."
 },
 {
  "cat": "STEEP",
  "title": "How a STEEP Analysis Is Carried Out",
  "meaning": "The practical method behind the framework.",
  "how": "Identify each possible factor; give each one a probability of occurrence in per cent and a rating for its impact in the coming three to five years, on a scale where -5 is terrible and +5 is fantastic. Factors are then recorded with their impact and the planned response.",
  "trap": "The horizon is three to five years and the rating is signed. A factor with a large negative rating and a high probability is what the plot is designed to make impossible to ignore."
 },
 {
  "cat": "STEEP",
  "title": "Plotting Threats and Opportunities",
  "meaning": "How the rated factors are read together.",
  "how": "Factors are plotted with probability of change on the vertical axis, from 0 to 100 per cent, against impact on the horizontal axis from -5 to +5. Negative impacts fall on the threats side, positive ones on the opportunities side.",
  "trap": "Position combines two things. A catastrophic impact with a 5 per cent probability and a mild impact that is nearly certain sit in very different places, and the chart exists to keep both visible."
 },
 {
  "cat": "STEEP",
  "title": "Socio-cultural Change",
  "meaning": "The lifestyle trends the deck singles out.",
  "how": "Sedentary lifestyle and physical inactivity; women at work; ethical living; healthy living; eating outside; attitudes to work and leisure, covering quality of life, home working and distance working; levels of education; and consumer activism through class actions and media campaigns.",
  "trap": "Consumer activism is listed as a socio-cultural variable, not a political one: it is behaviour, not regulation."
 },
 {
  "cat": "STEEP",
  "title": "Urbanisation",
  "meaning": "One of the socio-cultural trends, developed with its numbers.",
  "how": "1.5 million people migrate to cities every week. Cities generate 85 per cent of the world's GDP. They elevate living standards: 500 million Chinese people were lifted out of poverty in less than 30 years, becoming the country's booming middle class, thanks to developing cities. Cities stay at the heart of economic development because they harness economies of scale and add value by attracting talent and ideas, sharing knowledge and supporting business development.",
  "trap": "The mechanism given is economies of scale plus the concentration of talent and knowledge, not simply population density."
 },
 {
  "cat": "STEEP",
  "title": "Demographics",
  "meaning": "The population trends and what follows from them.",
  "how": "World population is projected to rise by 60-70 million people a year, passing 8 billion in 2024. Emerging or developing countries produce 97 per cent of that growth. In developed economies people live longer and have fewer children, and people over 65 are the fastest growing segment. Inequality is rising rapidly: the world's 8 richest people own as much wealth as the poorest half of the population. The shift will disrupt the traditional life cycle of education, work and employment, and the ageing population directly influences healthcare spending.",
  "trap": "Growth and ageing are happening in different places. The 97 per cent figure sits in emerging countries while the ageing segment grows in developed ones."
 },
 {
  "cat": "STEEP",
  "title": "The Global Economic Power Shift",
  "meaning": "The economic trend and the figures given for it.",
  "how": "The world's economic centre of gravity is shifting back to Asia, with 2.2 billion new middle class consumers expected by 2030, especially in Asia, Latin America and Africa. Many emerging markets declined when commodity prices dropped. BRICS potential looks volatile: Brazil grew 4.0 per cent in 2024 and 2.4 per cent in 2025, South Africa 0.6 and 1.1 per cent, China is slowing to 4.6 and 4.8 per cent, India still shows 6.8 and 6.6 per cent, and Russian GDP fell 2.1 per cent in 2022 and was 0.6 per cent in 2025.",
  "trap": "Volatile is the word the deck uses, and the figures show why: within the same group, India grows above 6 per cent while South Africa stays near 1."
 },
 {
  "cat": "STEEP",
  "title": "Climate Change and Resource Scarcity",
  "meaning": "The ecological trend, stated as a constraint on the current model.",
  "how": "The planet is no longer able to support current models of production and consumption. Rising temperatures are predicted to lead to significant and potentially irreversible environmental changes, and pressure on natural resources is expected to increase dramatically. A growing global population means a 35 per cent increase in food demand by 2030, a 40 per cent increase for water and 50 per cent for energy. In Africa, climate change is expected to reduce agricultural productivity by a third over the next 60 years.",
  "trap": "The deck links the two explicitly: climate change and resource scarcity are presented as one connected reality, not two separate trends."
 },
 {
  "cat": "STEEP",
  "title": "Technological Disruption",
  "meaning": "The technologies the deck lists as disruptive.",
  "how": "Artificial intelligence, the Internet of Things, cloud technology, advanced robotics, autonomous and near-autonomous vehicles, next generation genomics, energy storage, 3D printing, advanced materials, advanced oil and gas exploration and recovery, and renewable energy.",
  "trap": "The list mixes digital and physical technologies. Energy storage and advanced materials sit alongside AI, because the criterion is disruptive potential, not whether something is software."
 },
 {
  "cat": "Five Forces",
  "title": "Porter's Five Competitive Forces",
  "meaning": "A model of industry structure, referred to a specific business area.",
  "how": "The five forces are existing competitors, the threat of new entrants, the threat of substitutes, the bargaining power of buyers and the bargaining power of suppliers.",
  "trap": "The model applies to a business area, not to a company and not to a whole sector. Changing the boundaries of the business area changes the answer."
 },
 {
  "cat": "Five Forces",
  "title": "The Model's Three Assumptions",
  "meaning": "What the five forces model takes as given.",
  "how": "Competition is driven by industry structure. The attractiveness of a business area is inversely proportional to the level of competition in the competitive environment. And competition goes well beyond established players, which is the concept of extended rivalry.",
  "trap": "Attractiveness moves inversely with competition, so a force being strong is bad news for profitability. Extended rivalry is why four of the five forces are not your direct competitors."
 },
 {
  "cat": "Five Forces",
  "title": "Intensity of Internal Rivalry",
  "meaning": "The force of direct competition among existing competitors.",
  "how": "Its structural determinants are concentration, industry growth, product differentiation, the impact of fixed costs, excess capacity, switching costs and exit barriers.",
  "trap": "Growth and rivalry move in opposite directions: a growing industry lets everyone expand without taking share from anyone, which is what keeps rivalry down."
 },
 {
  "cat": "Five Forces",
  "title": "Exit Barriers",
  "meaning": "What keeps a company in a business area it would otherwise leave.",
  "how": "Common exit barriers are specialized assets; fixed costs of exit such as labour agreements; strategic interrelationships, meaning relationships of mutual dependence between one business and other parts of a company's operations, such as shared facilities and access to financial markets; emotional barriers such as career concerns and loyalty to employees; and government and social restrictions.",
  "trap": "The higher the exit barriers, the less profitable the arena, other things being equal, because competitors might stay in even when they are making no profit."
 },
 {
  "cat": "Five Forces",
  "title": "Threat of New Entrants",
  "meaning": "The force of potential rather than actual competition.",
  "how": "It depends on two things: the entry barriers protecting the arena, and the incumbents' expected reactions, meaning a credible threat of retaliation.",
  "trap": "Potential competition counts even when nobody enters. The threat alone disciplines the prices incumbents can charge."
 },
 {
  "cat": "Five Forces",
  "title": "Entry Barriers",
  "meaning": "What makes entering a business area a costly decision.",
  "how": "Economies of scale, capital requirements, brand identity, switching costs, access to distribution channels, legislation or government actions, and cost advantages independent of size — which include proprietary product technology, favourable access to raw materials, favourable location, the learning curve and government subsidies.",
  "trap": "The higher the entry barriers, the more profitable the arena for those already inside, because the threat of external competitors is limited. Entry is not easy even in the digital era."
 },
 {
  "cat": "Five Forces",
  "title": "Absolute Cost Advantages",
  "meaning": "The cost advantages that do not come from being big.",
  "how": "They are listed as cost advantages independent of size: proprietary product technology, favourable access to raw materials, favourable location, the learning curve and government subsidies. De Beers in diamonds and Gazprom in gas are the examples given for favourable access to raw materials.",
  "trap": "These are separate from economies of scale. A new entrant could match an incumbent's volume and still not match its access to the raw material."
 },
 {
  "cat": "Five Forces",
  "title": "The Ryanair Price War",
  "meaning": "The case used to show what a credible threat of retaliation looks like.",
  "how": "In April 1986 Ryanair, a small Irish airline founded by Cathal and Declan Ryan, announced it would run the Dublin-London route, having in its first year flown only Waterford to Gatwick with a 14-seat plane. Aer Lingus and British Airways sold tickets at €300; Ryanair proposed €140. In May 1986, before Ryanair even started, the incumbents cut to €130. Each time Ryanair matched, they cut again; by 1989 tickets could be found at €100. Ryanair's flights and passengers grew steadily but it made significant losses.",
  "trap": "The incumbents' stated objective was not only to block Ryanair but to discourage other potential entrants from following. The retaliation is aimed at the ones who have not entered yet."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Substitutes",
  "meaning": "Products provided by other industries that perform the same function as the product of the industry.",
  "how": "The examples given are short haul airline routes against high speed trains, airlines against web conferencing, tablets against laptops, and aluminium against steel.",
  "trap": "A substitute comes from another industry and satisfies the same need. A cheaper version of the same product is a direct competitor, not a substitute."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Abell's Model and the Space of Competition",
  "meaning": "The tool used to identify substitutes by representing the space of competition.",
  "how": "Its three dimensions are customers, customers' needs and products. It identifies two forms of competition: direct competition, meaning same customers, same needs and same products, which are the existing competitors of Porter's model; and indirect competition, meaning same customers, same needs but different products, which are the substitutes.",
  "trap": "The difference between the two forms is one dimension only — the product. Same customers and same needs are common to both."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Why Substitutes Cap Profits",
  "meaning": "The mechanism through which substitutes affect an industry.",
  "how": "They limit the potential return of an industry by placing a ceiling on the prices companies in the industry can profitably charge. The competition from substitutes is a function of switching costs, the substitute's price against the industry's price, and the substitute's quality and performance against the industry's.",
  "trap": "The ceiling exists whether or not customers actually switch. The possibility is enough to constrain pricing."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "The Substitutes Matrix",
  "meaning": "How to read a substitute's threat from its price and its performance.",
  "how": "With performance of the substitute on one axis, worse or better, and its price on the other, favourable or unfavourable: a substitute with a favourable price and better performance is a big threat. A favourable price with worse performance calls for monitoring the improvement of performance. An unfavourable price with better performance calls for monitoring the reduction of the price. An unfavourable price with worse performance calls for monitoring both the reduction of price and the improvement of performance.",
  "trap": "Only one cell is an immediate threat. The other three are watch instructions, and what to watch is precisely the dimension the substitute is currently losing on."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Bargaining Power of Buyers",
  "meaning": "The force exercised downstream, by the industry's customers.",
  "how": "It depends on relative concentration, the product's features and the buyer's characteristics. The analysis has to include both the buyers and the ultimate customers.",
  "trap": "Buyers and ultimate customers can be different parties with different power, which is why the deck insists both are analysed."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Buyer Power in B2B",
  "meaning": "How the three determinants work when the buyer is another business.",
  "how": "Relative concentration: buyers' power is higher if their business area is more concentrated than that of the suppliers. Product's features: power increases if product differentiation is low and switching costs are low. Buyer's characteristics: power increases if buyers are able to integrate themselves backward and if they have clear information about the product.",
  "trap": "Concentration is relative, not absolute. What matters is the comparison between the two business areas, not how concentrated the buyers are on their own."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Buyer Power in B2C",
  "meaning": "How buyer power works when the buyer is a consumer.",
  "how": "It increases if product differentiation is low, if information about the product is easily available, and if switching costs are low.",
  "trap": "Backward integration drops out, because an individual consumer cannot credibly threaten to make the product themselves."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Bargaining Power of Suppliers",
  "meaning": "The force exercised upstream, described as upstream competition.",
  "how": "Its structural determinants are dual to those influencing the bargaining power of buyers. Suppliers' power is higher if their business area is more concentrated than that of the buyers; it increases if product or service differentiation is high and switching costs are high; and it increases if their customers are not able to integrate backward and do not have clear information about the products.",
  "trap": "Because the determinants are dual, the same variable pushes the two forces in opposite directions: high differentiation raises supplier power and lowers buyer power."
 },
 {
  "cat": "Complements & Competitors",
  "title": "The Sixth Force: Complements",
  "meaning": "An addition to Porter's five forces.",
  "how": "A complement is a product or service that adds value to the industry's product offering. Complements increase the demand for the primary product, enhancing the profit potential for the industry. Complementors are the companies offering them.",
  "trap": "A complement raises demand for your product; a substitute replaces it. Same neighbouring industry, opposite effect."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Complementors in Practice",
  "meaning": "The examples the deck gives.",
  "how": "In the video game industry the producers of software, meaning games, are complementors to the producers of hardware, the consoles. In the smartphone industry, app developers are complementors. In the electric vehicle industry, the developers of charging stations are complementors.",
  "trap": "The relationship runs both ways: consoles are equally complementors to games. Which side you call the primary product depends on whose industry is being analysed."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Installed Base and Network Effects",
  "meaning": "Why complements can become self-reinforcing.",
  "how": "The number of users of a particular technology is referred to as the installed base. Network effects also arise when complementary goods are important: many products are desirable or functional only if a set of complementary goods is available, and there is a self-reinforcing cycle of installed base and availability of complementary goods.",
  "trap": "The cycle runs both ways and can therefore run backwards. A shrinking installed base makes complements less worth producing, which shrinks it further."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Porter's Attractiveness Profile",
  "meaning": "A way of summarising the five forces on one chart, present and future.",
  "how": "Each force — intensity of rivalry among industry competitors, risk of entry by potential competitors, bargaining power of buyers, bargaining power of suppliers, and availability and similarity of substitute value propositions — is rated from highly unattractive to highly attractive, with a solid line for the present and a dashed line for the future.",
  "trap": "The two lines are the point of the chart. A profile that is attractive today and shifting towards unattractive tomorrow is a different investment case from a stable one."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Dynamics of Industry Profitability",
  "meaning": "Industry profitability changes over time, generating threats and opportunities.",
  "how": "As the industry reaches maturity its growth rate declines, resulting in intensified rivalry and declining profits. An acquisition can introduce a very different player to the industry. Technological innovation creates space for new entrants or substitutes. A reduction in the number of suppliers reduces bargaining power towards them.",
  "trap": "Each of these acts on one of the forces. The five forces are a snapshot; this is what moves it."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Competitor Analysis",
  "meaning": "The lens aimed at specific rivals rather than at the industry as a whole.",
  "how": "Its three purposes are to forecast competitors' future strategies and decisions, to predict competitors' reaction to a firm's strategic initiatives, and to determine how competitors' behaviour can be influenced. Its three sections are understanding how rivals compete at present, forecasting how a competitor might change its strategy, and understanding the perception competitors have of the industry.",
  "trap": "The third purpose is the most easily forgotten: the analysis is not only about anticipating rivals but about influencing what they do."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Competitive Intelligence",
  "meaning": "The systematic collection and analysis of public information about rivals, for informing decision making.",
  "how": "Its main sources are annual reports and company profiles, product brochures, fairs and exhibitions, press releases and articles published in the media, suppliers, customers and the business community.",
  "trap": "The definition says public information. Suppliers and customers are listed as sources because they talk to rivals too, not because anything confidential is involved."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Strategic Groups",
  "meaning": "A way of segmenting an industry by the strategies of its member firms.",
  "how": "Where segmentation analysis concentrates on the characteristics of markets as the basis for disaggregating industries, strategic group analysis segments an industry on the basis of the strategies of the member firms. A strategic group is the group of firms in an industry following the same or a similar strategy along the strategic dimensions. Selecting the most important strategic dimensions and locating each firm along them identifies groups with similar approaches to competing.",
  "trap": "Segmentation divides the market, strategic groups divide the competitors. The two answer different questions and use different axes."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Reading a Strategic Group Map",
  "meaning": "What a map of strategic groups adds beyond the picture.",
  "how": "Competitive rivalry is strongest between firms within the same strategic group. The external environment affects strategic groups differently, and so do the five competitive forces. Some strategic groups are more profitable than others.",
  "trap": "In the U.S. airline map, prices charged against routes serviced separates a low-cost point-to-point group from a differentiated hub-and-spoke group, divided by a mobility barrier — the obstacle to moving from one group to the other."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Profit Pool Mapping",
  "meaning": "The lens aimed at the supply chain: the vertical structure of profitability.",
  "how": "Return on capital varies throughout the value chain, and the map plots operating margin against each stage's share of industry revenue. In the automotive example, auto manufacturing and new car dealers run at low single-digit margins on a large share of revenue, while leasing reaches above 20 per cent and service and repair, warranty and auto rental sit far higher than manufacturing on much smaller revenue shares.",
  "trap": "A big share of revenue is not a big share of profit. The widest bars in the chart are often the flattest."
 },
 {
  "cat": "Complements & Competitors",
  "title": "The Questions Profit Pool Mapping Answers",
  "meaning": "What the map is used to decide.",
  "how": "How do profits distribute along the supply chain? Are there business areas of the supply chain where profitability is growing? Are there opportunities for expanding the firm's business into other areas of the supply chain?",
  "trap": "The third question is the strategic one: the map is a search for where else to compete, not only a description of where the money currently is."
 }
];

const QUESTIONS = [
 {
  "cat": "The Company",
  "title": "The Unit of Analysis",
  "question": "A course introduction notes that the term company covers small businesses, large corporations, public sector organizations and not-for-profit organizations. Which of these is taken as the unit of analysis?",
  "options": {
   "A": "Any organization that employs people, regardless of its purpose.",
   "B": "The profit-oriented organization responsible for its economic and financial results.",
   "C": "Only large corporations listed on a stock exchange.",
   "D": "The public sector organization, since it answers to the broadest set of stakeholders."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Employing people is not the criterion: what defines the unit of analysis is being profit-oriented and accountable for economic and financial results.",
   "B": "Correct. Although the word company covers several kinds of organization, the unit of analysis is the profit-oriented organization responsible for the economic and financial results.",
   "C": "Incorrect. Listing on a stock exchange is a later stage in a company's evolution, not the boundary of the unit of analysis, which includes unlisted profit-oriented firms.",
   "D": "Incorrect. Public sector organizations are explicitly listed as one possible meaning of company, but they are not the object the analysis focuses on."
  },
  "recap": "Correct. Although the word company covers several kinds of organization, the unit of analysis is the profit-oriented organization responsible for the economic and financial results."
 },
 {
  "cat": "The Company",
  "title": "Measuring Company Size",
  "question": "Rankings of the largest companies by market capitalization, by revenues and by number of employees produce noticeably different lists. What does this imply?",
  "options": {
   "A": "Two of the three rankings must be based on incorrect data.",
   "B": "Size is not captured by a single indicator, so the measure used has to be stated explicitly.",
   "C": "Market capitalization is the only valid measure, since it reflects the market's judgement.",
   "D": "The three indicators are equivalent, and the differences are rounding effects."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The differences come from measuring different things, not from data errors: a capital-intensive firm and a labour-intensive one are large in different senses.",
   "B": "Correct. Market capitalization, revenues and employees are distinct indicators of size and produce distinct rankings, so a claim that a company is among the largest is only meaningful once the indicator is named.",
   "C": "Incorrect. Market capitalization is one indicator among several, and it reflects expectations about the future rather than the current scale of operations.",
   "D": "Incorrect. The rankings differ substantially, not marginally: the leaders by employees are not the leaders by market cap."
  },
  "recap": "Correct. Market capitalization, revenues and employees are distinct indicators of size and produce distinct rankings, so a claim that a company is among the largest is only meaningful once the indicator is named."
 },
 {
  "cat": "The Company",
  "title": "Dimensions of Company Scope",
  "question": "Along which three dimensions does the course describe the general trends that define the scope of a company?",
  "options": {
   "A": "Single output or portfolio of outputs; embodying or outsourcing activities; serving one country or several.",
   "B": "Revenues, market capitalization and number of employees.",
   "C": "Limited or unlimited liability; private or public status; listed or unlisted.",
   "D": "Shareholders, stakeholders and regulators."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. A company can realize a single output or a portfolio of outputs, can embody many activities or outsource many of them, and can serve a single geographical market or several countries through internationalization.",
   "B": "Incorrect. Those are indicators of size, which is a separate question from how broad the company's scope of products, activities and markets is.",
   "C": "Incorrect. Those are dimensions of legal form, which describe the contract behind the company rather than the breadth of what it does.",
   "D": "Incorrect. Those identify categories of actors in the company's ecosystem, not the structural choices that define its scope."
  },
  "recap": "Correct. A company can realize a single output or a portfolio of outputs, can embody many activities or outsource many of them, and can serve a single geographical market or several countries through internationalization."
 },
 {
  "cat": "The Company",
  "title": "From Conglomerate to Focus",
  "question": "In the 1980s Eni spanned energy, engineering, chemicals, construction and perforation, mechanical components, textile machines, non-ferrous ores, clothing and newspapers. Today it is organized around Exploration & Production, energy transition businesses and long-term opportunity technology. What does this illustrate?",
  "options": {
   "A": "That the scope of a company's portfolio of outputs is a strategic choice that can change substantially over time.",
   "B": "That companies inevitably shrink as their industry matures.",
   "C": "That internationalization always replaces diversification.",
   "D": "That changes in legal form drive changes in the business portfolio."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Eni moved from a very wide, largely unrelated portfolio to a far narrower set of related businesses, showing that the choice between a single output and a broad portfolio is a strategic decision that firms revisit over decades.",
   "B": "Incorrect. The case describes refocusing on fewer, related businesses, not a reduction of the company's overall scale.",
   "C": "Incorrect. Geographic scope and portfolio scope are separate dimensions, and the Eni example concerns the portfolio of businesses rather than the countries served.",
   "D": "Incorrect. Nothing in the case links the change in portfolio to a change in the company's legal form."
  },
  "recap": "Correct. Eni moved from a very wide, largely unrelated portfolio to a far narrower set of related businesses, showing that the choice between a single output and a broad portfolio is a strategic decision that firms revisit over decades."
 },
 {
  "cat": "The Company",
  "title": "Proprietary and Licensed Brands",
  "question": "EssilorLuxottica's portfolio includes brands such as Ray-Ban, Oakley and Persol alongside brands such as Chanel, Prada and Giorgio Armani, and the merger with Essilor brought lens production inside the company. How should these two facts be read?",
  "options": {
   "A": "All the brands are owned outright, and the Essilor merger was a geographic expansion.",
   "B": "Ray-Ban and Persol are licensed, while Chanel and Prada are proprietary brands of the group.",
   "C": "The first group are proprietary brands and the second are licensed brands, while the Essilor merger represents integration into lens production.",
   "D": "The brand portfolio shows outsourcing of activities, and the merger shows a reduction of scope."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The two sets of brands are held on different bases: some are owned by the group, others are operated under licence from the fashion houses that own them.",
   "B": "Incorrect. The two groups are inverted: Ray-Ban, Oakley and Persol are proprietary brands, while Chanel, Prada and Giorgio Armani are licensed.",
   "C": "Correct. Ray-Ban, Oakley, Vogue Eyewear, Persol and the others are proprietary brands, whereas Giorgio Armani, Chanel, Prada and similar names are licensed. Integrating lens production through the merger with Essilor extends the activities the company performs itself.",
   "D": "Incorrect. Bringing lens production in-house is the opposite of outsourcing, and it widens rather than reduces the activities embodied in the firm."
  },
  "recap": "Correct. Ray-Ban, Oakley, Vogue Eyewear, Persol and the others are proprietary brands, whereas Giorgio Armani, Chanel, Prada and similar names are licensed. Integrating lens production through the merger with Essilor extends the activities the company performs itself."
 },
 {
  "cat": "Legal Forms",
  "title": "The Company as a Legal Construct",
  "question": "What does it mean, precisely, that a company is a legal entity?",
  "options": {
   "A": "That it is registered with a public authority and pays taxes.",
   "B": "That it is a legal construct, essentially a contract, through which the law allows a group of natural persons to act as if they were a single artificial person for certain purposes.",
   "C": "That its shareholders are personally liable for its obligations.",
   "D": "That it must publish financial statements for public disclosure."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Registration and taxation are consequences of existing as an entity, not the definition of what a legal entity is.",
   "B": "Correct. A company is a legal construct, a contract, through which the law allows a group of natural persons to act as if they were a single artificial person for certain purposes. The legal form is the nature of that contract.",
   "C": "Incorrect. Personal liability depends on the legal form chosen: in limited companies shareholders precisely do not carry it.",
   "D": "Incorrect. Disclosure obligations vary by legal form, and unlimited companies are in fact exempted from filing accounts for public disclosure."
  },
  "recap": "Correct. A company is a legal construct, a contract, through which the law allows a group of natural persons to act as if they were a single artificial person for certain purposes. The legal form is the nature of that contract."
 },
 {
  "cat": "Legal Forms",
  "title": "Unlimited Company",
  "question": "Which combination correctly describes an unlimited company?",
  "options": {
   "A": "Members do not benefit from limited liability in a formal liquidation, and the company is exempted from filing accounts for public disclosure.",
   "B": "Members benefit from limited liability, and the company must file accounts for public disclosure.",
   "C": "The company has no share capital and is guaranteed by its members up to a fixed amount.",
   "D": "The company can be publicly traded on a stock exchange and raise money by selling stock or bonds."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. An unlimited company, with or without share capital, is one whose members or shareholders do not benefit from limited liability should the company go into formal liquidation, and such companies are exempted from filing accounts with the Registrar of Companies for public disclosure.",
   "B": "Incorrect. Both halves are reversed: the absence of limited liability is what defines the form, and it comes with an exemption from public filing rather than an obligation.",
   "C": "Incorrect. That describes a private company limited by guarantee, where liability is capped at the guaranteed amount.",
   "D": "Incorrect. That describes a public limited company, which is a different legal form entirely."
  },
  "recap": "Correct. An unlimited company, with or without share capital, is one whose members or shareholders do not benefit from limited liability should the company go into formal liquidation, and such companies are exempted from filing accounts with the Registrar of Companies for public disclosure."
 },
 {
  "cat": "Legal Forms",
  "title": "Company Limited by Guarantee",
  "question": "A charitable organisation is incorporated with no share capital; its members agree to pay a fixed amount in the event of liquidation. Which legal form is this?",
  "options": {
   "A": "An unlimited company.",
   "B": "A private company limited by shares.",
   "C": "A private company limited by guarantee.",
   "D": "A public limited company."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. In an unlimited company members do not benefit from limited liability at all, whereas here their exposure is capped at the amount guaranteed.",
   "B": "Incorrect. A company limited by shares has share capital and shareholders, while this form has neither.",
   "C": "Correct. A private company limited by guarantee has no share capital but is guaranteed by its members, who agree to pay a fixed amount in the event of the company's liquidation. Charitable organisations are often incorporated using this form of limited liability.",
   "D": "Incorrect. A public limited company is traded on a stock exchange and has share capital, neither of which applies here."
  },
  "recap": "Correct. A private company limited by guarantee has no share capital but is guaranteed by its members, who agree to pay a fixed amount in the event of the company's liquidation. Charitable organisations are often incorporated using this form of limited liability."
 },
 {
  "cat": "Legal Forms",
  "title": "Private Company Limited by Shares",
  "question": "Which feature distinguishes a private company limited by shares from a public limited company?",
  "options": {
   "A": "Its shareholders do not have limited liability.",
   "B": "Its shares may not be offered to the general public, and shareholders are often bound to offer shares to fellow shareholders before selling to a third party.",
   "C": "It has no share capital.",
   "D": "It is exempted from filing accounts for public disclosure."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Shareholders of a private company limited by shares do have limited liability; that is what limited by shares means.",
   "B": "Correct. A private company limited by shares has shareholders with limited liability, but its shares may not be offered to the general public, and its shareholders are often bound to offer their shares to their fellow shareholders before selling them to a third party.",
   "C": "Incorrect. It does have share capital; the form with no share capital is the company limited by guarantee.",
   "D": "Incorrect. The exemption from filing accounts for public disclosure belongs to unlimited companies."
  },
  "recap": "Correct. A private company limited by shares has shareholders with limited liability, but its shares may not be offered to the general public, and its shareholders are often bound to offer their shares to their fellow shareholders before selling them to a third party."
 },
 {
  "cat": "Legal Forms",
  "title": "Public Limited Company",
  "question": "A company is publicly traded on a stock exchange and can raise money for expansion by selling stock or bonds. Which statement about this form is correct?",
  "options": {
   "A": "It is comparable to the U.S. Corporation and the German Aktiengesellschaft, and it has access to the financial markets.",
   "B": "It cannot issue bonds, only shares.",
   "C": "Its shareholders carry unlimited liability because the shares are publicly held.",
   "D": "It is the same legal form as a company limited by guarantee, differing only in size."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. A public limited company can be publicly traded on a stock exchange, is similar to the U.S. Corporation (Corp.) and the German Aktiengesellschaft (AG), and has access to the financial markets, raising money for expansion and other projects by selling stock or bonds.",
   "B": "Incorrect. Access to the financial markets explicitly includes raising money by selling bonds as well as stock.",
   "C": "Incorrect. Being publicly traded does not remove limited liability; the public limited company is a limited form.",
   "D": "Incorrect. A company limited by guarantee has no share capital and is not traded; the difference is one of legal structure, not size."
  },
  "recap": "Correct. A public limited company can be publicly traded on a stock exchange, is similar to the U.S. Corporation (Corp.) and the German Aktiengesellschaft (AG), and has access to the financial markets, raising money for expansion and other projects by selling stock or bonds."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Shareholders' Objectives",
  "question": "Which pair of objectives does the course attribute to shareholders?",
  "options": {
   "A": "Maximising employment and maximising market share.",
   "B": "Earning money by selling the stock when the share price appreciates, and having power and controlling the company.",
   "C": "Minimising taxation and maximising disclosure.",
   "D": "Guaranteeing the company's debts and managing its day-to-day operations."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Employment and market share may be consequences of company strategy, but they are not the objectives shareholders are described as pursuing.",
   "B": "Correct. Shareholders pursue two distinct objectives: earning money by selling the stock when the share price appreciates, and having power and controlling the company.",
   "C": "Incorrect. Taxation and disclosure are constraints set by authorities and regulation, not shareholder objectives.",
   "D": "Incorrect. Guaranteeing debts and running operations are not shareholder functions; in limited companies shareholders are precisely shielded from the first."
  },
  "recap": "Correct. Shareholders pursue two distinct objectives: earning money by selling the stock when the share price appreciates, and having power and controlling the company."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Primary vs Secondary IPO",
  "question": "In an IPO, what distinguishes the primary component from the secondary component?",
  "options": {
   "A": "In a primary IPO new shares are issued and the cash goes to the company; in a secondary IPO existing shareholders sell and the cash goes to the sellers.",
   "B": "In a primary IPO existing shareholders sell their shares; in a secondary IPO new shares are issued.",
   "C": "A primary IPO takes place on the domestic market and a secondary IPO on a foreign exchange.",
   "D": "A primary IPO is friendly and a secondary IPO is hostile."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. A primary IPO is a capital increase: new shares are issued and the cash goes to the company. A secondary IPO is the sale of shares of the current shareholders, so the cash goes to the sellers. A mixed IPO combines both.",
   "B": "Incorrect. The two are inverted: issuing new shares is the primary component, selling existing ones is the secondary component.",
   "C": "Incorrect. The distinction concerns who issues and who receives the proceeds, not the geography of the listing.",
   "D": "Incorrect. Friendly and hostile describe takeovers, not the structure of an offering."
  },
  "recap": "Correct. A primary IPO is a capital increase: new shares are issued and the cash goes to the company. A secondary IPO is the sale of shares of the current shareholders, so the cash goes to the sellers. A mixed IPO combines both."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Friendly and Hostile Takeovers",
  "question": "In 2021 EasyJet rejected an unsolicited takeover approach from Wizz Air; in 2026 it agreed to a cash takeover by Apollo Global Management. How are these two operations classified?",
  "options": {
   "A": "Both are hostile, since both involved an external bidder.",
   "B": "The Wizz Air approach was a hostile one, rejected by the target, while the Apollo deal was agreed and therefore friendly.",
   "C": "Both are friendly, since the second was eventually accepted.",
   "D": "The classification depends only on the price offered per share."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Being an external bidder does not make an offer hostile; what matters is whether the target's board agrees to it.",
   "B": "Correct. A takeover is hostile when it proceeds against the wishes of the target's board, as with the unsolicited approach EasyJet rejected, and friendly when it is agreed, as with the Apollo offer EasyJet accepted at £7.15 per share.",
   "C": "Incorrect. The Wizz Air approach was unsolicited and rejected, so it cannot be reclassified as friendly because a different, later offer succeeded.",
   "D": "Incorrect. Hostility refers to the board's position, not to the level of the price: a hostile bid can be generous and a friendly one modest."
  },
  "recap": "Correct. A takeover is hostile when it proceeds against the wishes of the target's board, as with the unsolicited approach EasyJet rejected, and friendly when it is agreed, as with the Apollo offer EasyJet accepted at £7.15 per share."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Stages of Evolution",
  "question": "A company moves from foundation, through financing rounds, to an IPO. Beyond size, what else changes along this path?",
  "options": {
   "A": "Only the number of employees and the geographical footprint.",
   "B": "Nothing structural: the company simply becomes larger and better capitalised.",
   "C": "Its ownership structure, governance model and strategic priorities, in a transition from entrepreneurial control to shared ownership and public accountability.",
   "D": "Its legal form necessarily changes from unlimited to limited at each stage."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Headcount and footprint are effects of growth; the stages also reshape who owns the company and how decisions are made.",
   "B": "Incorrect. Each stage changes the company structurally, which is precisely why governance requirements rise along the way.",
   "C": "Correct. Each stage changes not only the company's size but also its ownership structure, governance model and strategic priorities. The overall evolution is a transition from entrepreneurial control to shared ownership and public accountability.",
   "D": "Incorrect. Nothing requires an unlimited-to-limited transition at each stage; what changes is ownership and governance, and the listing at the IPO stage."
  },
  "recap": "Correct. Each stage changes not only the company's size but also its ownership structure, governance model and strategic priorities. The overall evolution is a transition from entrepreneurial control to shared ownership and public accountability."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Ownership after a Series A",
  "question": "Three founders hold 40%, 40% and 20% of a company. A Series A investor injects €5m at a €10m pre-money valuation. What is the post-money valuation and what percentage does the investor receive?",
  "options": {
   "A": "Post-money €10m; the investor receives 50%.",
   "B": "Post-money €15m; the investor receives 33.33%.",
   "C": "Post-money €15m; the investor receives 50%.",
   "D": "Post-money €5m; the investor receives 100%."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The post-money valuation must include the cash injected: €10m pre-money plus €5m is €15m, not €10m.",
   "B": "Correct. Post-money valuation = pre-money valuation + new capital injected = €10m + €5m = €15m. New investor ownership = investment / post-money valuation = 5/15 = 33.33%.",
   "C": "Incorrect. The post-money figure is right but the percentage is not: €5m out of €15m is one third, not one half.",
   "D": "Incorrect. The pre-money value of the existing company does not disappear; the investor buys a share of the enlarged company."
  },
  "recap": "Correct. Post-money valuation = pre-money valuation + new capital injected = €10m + €5m = €15m. New investor ownership = investment / post-money valuation = 5/15 = 33.33%."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Founder Dilution after a Round",
  "question": "Continuing the same case: Founder A held 40% before a Series A of €5m injected at a €10m pre-money valuation. What is Founder A's stake after the round?",
  "options": {
   "A": "40%, since the founder sold no shares.",
   "B": "20%, since the investor took half the company.",
   "C": "26.67%, since existing shareholders retain the pre-money over post-money proportion.",
   "D": "13.33%, the same as the founder who held 20% before."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Dilution does not require selling shares: new shares issued to the investor reduce every existing holder's percentage of the enlarged company.",
   "B": "Incorrect. The investor receives one third, not one half, so Founder A cannot fall to half of the previous stake.",
   "C": "Correct. Existing shareholders' retention = pre-money / post-money = 10/15 = two thirds. Founder A therefore moves from 40% to 40% × 2/3 = 26.67%. Equivalently, 40% of €10m is €4m, and €4m / €15m = 26.67%.",
   "D": "Incorrect. 13.33% is the post-round stake of the founder who previously held 20%; the same retention factor applied to 40% gives 26.67%."
  },
  "recap": "Correct. Existing shareholders' retention = pre-money / post-money = 10/15 = two thirds. Founder A therefore moves from 40% to 40% × 2/3 = 26.67%. Equivalently, 40% of €10m is €4m, and €4m / €15m = 26.67%."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "A Second Financing Round",
  "question": "After Series A the company raises a Series B: an investor injects €15m at a €45m pre-money valuation. What percentage does the Series B investor obtain, and what happens to the Series A investor's 33.33% stake?",
  "options": {
   "A": "Series B obtains 25%, and the Series A investor is diluted to 25%.",
   "B": "Series B obtains 33.33%, and the Series A investor keeps 33.33%.",
   "C": "Series B obtains 25%, and the Series A investor keeps 33.33%.",
   "D": "Series B obtains 15%, and the Series A investor is diluted to 20%."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Post-money = €45m + €15m = €60m, so the Series B investor receives 15/60 = 25%. Existing shareholders retain 45/60 = three quarters of their stake, so the Series A investor moves from 33.33% to 25%, and the founders move from 26.67% to 20% and from 13.33% to 10%.",
   "B": "Incorrect. €15m out of a €60m post-money valuation is 25%, and existing holders cannot keep their percentage unchanged when new shares are issued.",
   "C": "Incorrect. The Series B percentage is right, but the Series A investor is diluted like every other existing shareholder, by the same retention factor.",
   "D": "Incorrect. Those figures do not follow from the round: 15/60 is 25%, and applying the 45/60 retention to 33.33% gives 25%."
  },
  "recap": "Correct. Post-money = €45m + €15m = €60m, so the Series B investor receives 15/60 = 25%. Existing shareholders retain 45/60 = three quarters of their stake, so the Series A investor moves from 33.33% to 25%, and the founders move from 26.67% to 20% and from 13.33% to 10%."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Dilution at the IPO",
  "question": "A company carries out a primary IPO raising €160m at a €240m pre-money valuation. A shareholder held 20% before the offering. What share of the company do public shareholders receive, and what is that shareholder's stake afterwards?",
  "options": {
   "A": "Public shareholders receive 40%; the shareholder moves from 20% to 12%.",
   "B": "Public shareholders receive 40%; the shareholder keeps 20%.",
   "C": "Public shareholders receive 67%; the shareholder moves from 20% to 6.6%.",
   "D": "Public shareholders receive 160%; the calculation cannot be completed."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Post-money valuation = €240m + €160m = €400m, so public shareholders receive 160/400 = 40%. All existing shareholders are diluted by 40%, retaining 240/400 = 60% of their previous stake, so a 20% holder moves to 12%.",
   "B": "Incorrect. The public share is right, but existing shareholders cannot keep their percentages unchanged once 40% of the company is issued to new investors.",
   "C": "Incorrect. The €160m raised is measured against the €400m post-money valuation, not against the €240m pre-money figure.",
   "D": "Incorrect. The percentage is the investment over the post-money valuation, which is well defined here at 40%."
  },
  "recap": "Correct. Post-money valuation = €240m + €160m = €400m, so public shareholders receive 160/400 = 40%. All existing shareholders are diluted by 40%, retaining 240/400 = 60% of their previous stake, so a 20% holder moves to 12%."
 },
 {
  "cat": "Ownership & Evolution",
  "title": "Interpreting Dilution",
  "question": "Across two financing rounds a founder's stake falls from 40% to 20%, while the company's valuation rises from €10m pre-money to €60m post-money. How should this be interpreted?",
  "options": {
   "A": "The founder has lost half of their wealth in the company.",
   "B": "Dilution is not necessarily negative: the founder owns a smaller percentage of a potentially much more valuable company.",
   "C": "The rounds destroyed value, since the founder's percentage decreased.",
   "D": "The founder's stake in percent is the only meaningful measure of their position."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A smaller percentage of a much larger valuation is not automatically less value: 40% of €10m is €4m, while 20% of €60m is €12m.",
   "B": "Correct. Dilution is not necessarily negative. Founders own a smaller percentage, but potentially of a much more valuable company, which is why percentages must always be read together with the valuation behind them.",
   "C": "Incorrect. The decrease in percentage is a mechanical effect of issuing new shares and says nothing on its own about value creation or destruction.",
   "D": "Incorrect. Reading the percentage in isolation is exactly the error the case is designed to expose."
  },
  "recap": "Correct. Dilution is not necessarily negative. Founders own a smaller percentage, but potentially of a much more valuable company, which is why percentages must always be read together with the valuation behind them."
 },
 {
  "cat": "Value & Objectives",
  "title": "The Shareholder Value Formula",
  "question": "Shareholder value is computed as the discounted sum of the net cash flows to shareholders. What does the net cash flow of a given year contain, and at what rate is it discounted?",
  "options": {
   "A": "Revenues less operating costs, discounted at the risk-free rate.",
   "B": "Dividends plus the share price at the time of sale minus capital injections, discounted at the cost of equity capital.",
   "C": "Dividends only, discounted at the weighted average cost of capital.",
   "D": "Enterprise value less net debt, discounted at the cost of debt."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is closer to an operating result; shareholder value is built on the cash flows accruing to shareholders, not on the company's operating margin.",
   "B": "Correct. Shareholder value is the sum over time of NCF_t / (1 + re)^t, where NCF_t is the net cash flow at year t for the shareholders, equal to dividends plus the share price at the time of sale minus capital injections, and re is the cost of equity capital.",
   "C": "Incorrect. Dividends alone omit both the proceeds from selling the shares and the capital shareholders put in, and the relevant rate is the cost of equity.",
   "D": "Incorrect. Enterprise value less net debt is the relation between EV and SV, not the definition of the annual cash flow being discounted."
  },
  "recap": "Correct. Shareholder value is the sum over time of NCF_t / (1 + re)^t, where NCF_t is the net cash flow at year t for the shareholders, equal to dividends plus the share price at the time of sale minus capital injections, and re is the cost of equity capital."
 },
 {
  "cat": "Value & Objectives",
  "title": "From Enterprise Value to Shareholder Value",
  "question": "A company has an enterprise value of €850m, debt of €300m and cash of €70m. What is its shareholder value?",
  "options": {
   "A": "€1,220m",
   "B": "€480m",
   "C": "€620m",
   "D": "€550m"
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. This adds the debt instead of subtracting it; debt is a claim ahead of shareholders, so it reduces the value left to them.",
   "B": "Incorrect. This subtracts the cash as well as the debt. Cash reduces net debt, so it works in the shareholders' favour.",
   "C": "Correct. Shareholder value equals enterprise value less net debt, and net debt is debt less cash, so SV = EV − debt + cash = 850 − 300 + 70 = €620m.",
   "D": "Incorrect. This subtracts the debt but ignores the cash entirely, which is the most common slip in the formula."
  },
  "recap": "Correct. Shareholder value equals enterprise value less net debt, and net debt is debt less cash, so SV = EV − debt + cash = 850 − 300 + 70 = €620m."
 },
 {
  "cat": "Value & Objectives",
  "title": "Market Value as a Proxy",
  "question": "Why is the stock market value of a listed company described as a proxy of shareholder value rather than a measure of it?",
  "options": {
   "A": "Because stock prices are published with a delay.",
   "B": "Because the stock market is affected by bubbles, fads and speculation.",
   "C": "Because market value includes debt, while shareholder value does not.",
   "D": "Because only unlisted companies have a shareholder value."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Publication delays are a practical detail and are not the reason the figure is approximate.",
   "B": "Correct. The stock market value is used as a proxy of shareholder value precisely because the market is affected by bubbles, fads and speculation, so the quoted value can depart from the underlying value created for shareholders.",
   "C": "Incorrect. Market capitalization is the value of the equity, not of the whole enterprise; the figure that includes debt is enterprise value.",
   "D": "Incorrect. Shareholder value is defined for any company; listing simply provides an observable price to compare it with."
  },
  "recap": "Correct. The stock market value is used as a proxy of shareholder value precisely because the market is affected by bubbles, fads and speculation, so the quoted value can depart from the underlying value created for shareholders."
 },
 {
  "cat": "Value & Objectives",
  "title": "The Stakeholder Perspective",
  "question": "The course argues that the shareholder perspective looks incomplete. What does the stakeholder perspective add, and where does it matter most?",
  "options": {
   "A": "That companies should serve the broader public interest as well as the shareholder interest, which holds particularly for public limited companies.",
   "B": "That shareholder value should be abandoned as an objective.",
   "C": "That stakeholders always share the same objectives, which simplifies decision-making.",
   "D": "That only privately held companies need to consider stakeholders."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Under the stakeholder perspective corporations should be socially responsible and serve the broader public interest as well as the shareholder interest. This holds particularly true for public limited companies, which live in the most complicated ecosystem, involving a huge number of shareholders and stakeholders.",
   "B": "Incorrect. The argument is that shareholder value is not sufficient as the whole objective, not that it should be dropped.",
   "C": "Incorrect. Stakeholders can have different objectives, in some cases even in contrast with each other, which is what makes the analysis necessary.",
   "D": "Incorrect. The point is the opposite: the ecosystem is most complex, and the stakeholder question most pressing, for public limited companies."
  },
  "recap": "Correct. Under the stakeholder perspective corporations should be socially responsible and serve the broader public interest as well as the shareholder interest. This holds particularly true for public limited companies, which live in the most complicated ecosystem, involving a huge number of shareholders and stakeholders."
 },
 {
  "cat": "Value & Objectives",
  "title": "Long-Term Interdependence",
  "question": "How does the course describe the long-term relationship between shareholder value and stakeholder value?",
  "options": {
   "A": "They are independent: pursuing one has no effect on the other.",
   "B": "Stakeholder value must be maximised first, and shareholder value follows automatically.",
   "C": "They are mutually dependent: stakeholders are vulnerable when management fails to create shareholder value, and without stakeholder value there can be no shareholder value in the long term.",
   "D": "Shareholder value in the short term is the only reliable objective."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The argument is explicitly about the dependence running in both directions over a long horizon.",
   "B": "Incorrect. There is no automatic sequence: the two are presented as a partnership of value creation, not as one preceding the other.",
   "C": "Correct. Stakeholders are vulnerable when management fails to create shareholder value, and without stakeholder value there can be no shareholder value in the long term. This is why the emphasis falls on the maximisation of long-term cash flows.",
   "D": "Incorrect. The emphasis is placed on long-term cash flows precisely because a short-term focus can damage the relationships the firm depends on."
  },
  "recap": "Correct. Stakeholders are vulnerable when management fails to create shareholder value, and without stakeholder value there can be no shareholder value in the long term. This is why the emphasis falls on the maximisation of long-term cash flows."
 },
 {
  "cat": "Value & Objectives",
  "title": "Why Stakeholder Analysis Gained Weight",
  "question": "Which set of events is cited as having eroded public trust in business and reinforced the role of stakeholders?",
  "options": {
   "A": "Accounting scandals such as Enron, Arthur Andersen, WorldCom, Tyco and Parmalat, the Global Financial Crisis, and black swan events.",
   "B": "The introduction of IFRS and the harmonisation of accounting standards.",
   "C": "The growth of e-commerce and the digitalisation of retail.",
   "D": "The creation of the euro and the enlargement of the European Union."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Accounting scandals (Enron, Arthur Andersen, WorldCom, Tyco, Parmalat), the Global Financial Crisis and other black swan events such as 9/11, Fukushima, the fall of the Berlin wall with the collapse of the Soviet Union and the pandemic eroded the public's trust in business and capitalism, making relationships with stakeholders more critical.",
   "B": "Incorrect. Accounting harmonisation is a response to reporting needs, not one of the trust-eroding events cited.",
   "C": "Incorrect. Digitalisation reshaped competition but is not presented as a cause of the loss of trust in business.",
   "D": "Incorrect. Monetary and political integration are not among the events the course points to."
  },
  "recap": "Correct. Accounting scandals (Enron, Arthur Andersen, WorldCom, Tyco, Parmalat), the Global Financial Crisis and other black swan events such as 9/11, Fukushima, the fall of the Berlin wall with the collapse of the Soviet Union and the pandemic eroded the public's trust in business and capitalism, making relationships with stakeholders more critical."
 },
 {
  "cat": "Governance & ESG",
  "title": "Defining Corporate Governance",
  "question": "How is corporate governance defined?",
  "options": {
   "A": "The set of accounting standards a company must apply when preparing its financial statements.",
   "B": "The set of systems, principles and processes by which a company is governed, guiding how it is directed or controlled to fulfill its goals, add value and benefit all stakeholders in the long term.",
   "C": "The organisational chart describing reporting lines between managers.",
   "D": "The procedure for issuing new shares and admitting new shareholders."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Accounting standards govern how results are measured and reported; governance concerns how the company is directed and controlled.",
   "B": "Correct. Corporate governance is the set of systems, principles and processes by which a company is governed. They provide the guidelines as to how the company can be directed or controlled in order to fulfill its goals and objectives, add value and be beneficial for all stakeholders in the long term.",
   "C": "Incorrect. Reporting lines are a matter of organisational design, a narrower question than the systems and principles that direct and control the firm.",
   "D": "Incorrect. Issuing shares is one specific decision, in fact reserved to the shareholders assembly, not the definition of governance."
  },
  "recap": "Correct. Corporate governance is the set of systems, principles and processes by which a company is governed. They provide the guidelines as to how the company can be directed or controlled in order to fulfill its goals and objectives, add value and be beneficial for all stakeholders in the long term."
 },
 {
  "cat": "Governance & ESG",
  "title": "Extraordinary Decisions",
  "question": "Which decisions are reserved to the extraordinary shareholders assembly rather than being taken by the board?",
  "options": {
   "A": "Approving the financial statement and deciding upon dividends.",
   "B": "Hiring and firing company executives.",
   "C": "Bond issue, capital increase and change of the statute.",
   "D": "Checking that decisions comply with normative and statutory requirements."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Approving the financial statement and deciding on dividends are functions of the board of directors in the traditional model.",
   "B": "Incorrect. Appointing and dismissing executives is a board function, carried out by the board of directors or, in a two-tier system, by the supervisory board.",
   "C": "Correct. The extraordinary decisions of the shareholders assembly are the bond issue, the capital increase and the change of the statute: precisely the decisions that alter the capital structure or the constitution of the company.",
   "D": "Incorrect. That compliance check is the role of the board of supervisors made of independent members."
  },
  "recap": "Correct. The extraordinary decisions of the shareholders assembly are the bond issue, the capital increase and the change of the statute: precisely the decisions that alter the capital structure or the constitution of the company."
 },
 {
  "cat": "Governance & ESG",
  "title": "Two-Tier and One-Tier Systems",
  "question": "A company in Germany separates a Supervisory Board from a Management Board made of the CEO and executives. A company in the United States has a single Board of Directors where non-executives outnumber executives and some act as supervisors. How are these two models named?",
  "options": {
   "A": "The German company uses a one-tier system; the U.S. company uses a two-tier system.",
   "B": "The German company uses a two-tier system; the U.S. company uses a one-tier system.",
   "C": "Both use the traditional model, differing only in board size.",
   "D": "The German company uses the traditional model; the U.S. company uses a two-tier system."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The labels are inverted: having two separate boards is what defines the two-tier system.",
   "B": "Correct. The two-tier system, found in the Netherlands and Germany, splits a Supervisory Board from a Management Board of the CEO and executives. The one-tier system, found in the U.S. and the U.K., places everything in a single Board of Directors where non-executives are more numerous than executives and some act as supervisors.",
   "C": "Incorrect. The difference is structural, not a matter of size: one model uses two distinct boards, the other a single one.",
   "D": "Incorrect. The German arrangement described, with two separate boards, is the two-tier system, and the U.S. arrangement is the one-tier system."
  },
  "recap": "Correct. The two-tier system, found in the Netherlands and Germany, splits a Supervisory Board from a Management Board of the CEO and executives. The one-tier system, found in the U.S. and the U.K., places everything in a single Board of Directors where non-executives are more numerous than executives and some act as supervisors."
 },
 {
  "cat": "Governance & ESG",
  "title": "Supervision and Audit",
  "question": "In the traditional governance model, which body checks that the decisions undertaken by the company's management comply with normative and statutory requirements, and which one checks the financial statements?",
  "options": {
   "A": "The board of supervisors, made of independent members, checks compliance; the committee of independent auditors checks the financial statements.",
   "B": "The board of directors checks compliance; the shareholders meeting checks the financial statements.",
   "C": "The committee of independent auditors checks compliance; the board of supervisors checks the financial statements.",
   "D": "The CEO performs both checks, reporting to the shareholders meeting."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The board of supervisors, made of independent members, checks that the decisions undertaken by the company's management are compliant with the normative and statutory requirements, while the committee of independent auditors checks the financial statements.",
   "B": "Incorrect. The board of directors is a body that directs the company and approves the financial statement; the compliance check is assigned to the supervisors.",
   "C": "Incorrect. The two roles are inverted: auditors examine the financial statements, supervisors examine compliance of management's decisions.",
   "D": "Incorrect. The point of both bodies is independence from the management being checked, so the CEO cannot perform these functions."
  },
  "recap": "Correct. The board of supervisors, made of independent members, checks that the decisions undertaken by the company's management are compliant with the normative and statutory requirements, while the committee of independent auditors checks the financial statements."
 },
 {
  "cat": "Governance & ESG",
  "title": "The Volkswagen Governance Failure",
  "question": "Commentators argued that the Volkswagen diesel cheating was predictable. On what governance grounds?",
  "options": {
   "A": "The company had no supervisory board at all.",
   "B": "Lax boardroom controls and a peculiar corporate culture, with a supervisory board short of independent voices and relevant expertise.",
   "C": "The supervisory board was entirely composed of external investors.",
   "D": "The company was unlisted, so no external scrutiny applied."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. VW did have a 20-member supervisory board; the problem was its composition and the weakness of its controls, not its absence.",
   "B": "Correct. Governance experts argued the cheating was predictable because of VW's lax boardroom controls and peculiar corporate culture. The supervisory board had only one truly independent voice, 17 of its 20 members were German or Austrian, many directors represented the three largest shareholders, and external investors held only 12% of the voting shares. Even before the scandal, VW shares traded at a discount to other carmakers partly because of governance concerns.",
   "C": "Incorrect. The opposite was true: external investors held only 12% of the voting shares and therefore could not change anything.",
   "D": "Incorrect. VW was listed, and its shares already traded at a governance-related discount before the scandal broke."
  },
  "recap": "Correct. Governance experts argued the cheating was predictable because of VW's lax boardroom controls and peculiar corporate culture. The supervisory board had only one truly independent voice, 17 of its 20 members were German or Austrian, many directors represented the three largest shareholders, and external investors held only 12% of the voting shares. Even before the scandal, VW shares traded at a discount to other carmakers partly because of governance concerns."
 },
 {
  "cat": "Governance & ESG",
  "title": "The Three Pillars of ESG",
  "question": "A company reports on greenhouse gas emissions and water management, on diversity and employee engagement, and on board composition and executive compensation. How do these three groups map onto the ESG framework?",
  "options": {
   "A": "Environmental, social and governance respectively.",
   "B": "Social, governance and environmental respectively.",
   "C": "Governance, environmental and social respectively.",
   "D": "They all belong to the environmental pillar, since ESG is a sustainability framework."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The environmental aspect focuses on preserving the natural world, including greenhouse gas emissions and water management; the social aspect focuses on people and relationships, including diversity, equity and inclusion and employee engagement; the governance aspect focuses on enhancing corporate governance, including board composition and executive compensation.",
   "B": "Incorrect. Emissions and water management are environmental matters, not social ones, and board composition is governance rather than environmental.",
   "C": "Incorrect. The order is wrong: emissions belong to the environmental pillar and board composition to the governance pillar.",
   "D": "Incorrect. ESG explicitly separates three aspects, and only the first concerns the natural environment."
  },
  "recap": "Correct. The environmental aspect focuses on preserving the natural world, including greenhouse gas emissions and water management; the social aspect focuses on people and relationships, including diversity, equity and inclusion and employee engagement; the governance aspect focuses on enhancing corporate governance, including board composition and executive compensation."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Company's Underlying Goal",
  "question": "According to the chapter, what should a company's goal be, and what does reaching it allow?",
  "options": {
   "A": "Maximizing short term profit, which allows dividends to be paid every year.",
   "B": "Maximizing long term cash flows, which allows a combination of value creation for both shareholders and stakeholders.",
   "C": "Maximizing market share, which allows competitors to be driven out.",
   "D": "Maximizing shareholder value alone, since stakeholder interests are handled by regulation."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The horizon stated is long term, and the measure is cash flows rather than the profit of a single year.",
   "B": "Correct. The goal of a company should be to maximize long term cash flows, which allows it to achieve a combination of value creation for both shareholders and stakeholders.",
   "C": "Incorrect. Market share is not the stated goal; it can be a means, but the goal is expressed in long term cash flows.",
   "D": "Incorrect. The two are joined, not separated: the goal allows value creation for shareholders and stakeholders together."
  },
  "recap": "Correct. The goal of a company should be to maximize long term cash flows, which allows it to achieve a combination of value creation for both shareholders and stakeholders."
 },
 {
  "cat": "What Strategy Is",
  "title": "Where the Word Comes From",
  "question": "What is the origin of the word «strategy», and what did it originally describe?",
  "options": {
   "A": "The Latin «stratum», meaning a layer, describing levels of command.",
   "B": "The Greek «Strategos», meaning generalship: the art of war, especially planning the movements of troops, ships and aircraft into favourable positions.",
   "C": "The Greek «stratos», meaning a crowd, describing the management of large organisations.",
   "D": "A nineteenth-century business coinage with no earlier meaning."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The root is Greek and military, not Latin.",
   "B": "Correct. «Strategy» comes from the Greek word «Strategos», which means generalship. It is the art of war, especially the planning of movements of troops, ships, aircraft and so on into favourable positions.",
   "C": "Incorrect. The meaning given is generalship, the command of an army, not a crowd.",
   "D": "Incorrect. The military meaning long predates the business use, which borrows from it."
  },
  "recap": "Correct. «Strategy» comes from the Greek word «Strategos», which means generalship. It is the art of war, especially the planning of movements of troops, ships, aircraft and so on into favourable positions."
 },
 {
  "cat": "What Strategy Is",
  "title": "Whose Definition Is the Odd One Out",
  "question": "Four of these definitions describe strategy as something deliberately sought or planned. Which one instead describes it as something identifiable in what a company has actually done?",
  "options": {
   "A": "Ohmae: a sustainable edge over competitors.",
   "B": "Henderson: a deliberate search for a plan of action that will develop a competitive advantage.",
   "C": "Mintzberg: a pattern in a stream of decisions.",
   "D": "Porter: being different, delivering a unique mix of value."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. An edge over competitors is the outcome the other definitions aim at, described as something to be achieved.",
   "B": "Incorrect. Henderson's wording is explicitly a deliberate search for a plan.",
   "C": "Correct. Mintzberg defines strategy as a pattern in a stream of decisions, which is observed in the decisions actually taken rather than planned in advance. This is the tension that returns later as intended versus emergent strategy.",
   "D": "Incorrect. Porter describes a chosen position, delivering a unique mix of value."
  },
  "recap": "Correct. Mintzberg defines strategy as a pattern in a stream of decisions, which is observed in the decisions actually taken rather than planned in advance. This is the tension that returns later as intended versus emergent strategy."
 },
 {
  "cat": "What Strategy Is",
  "title": "Superior Relative to Whom",
  "question": "Strategy is defined as a set of goal-directed actions a firm takes to gain and sustain superior performance. Superior in what sense?",
  "options": {
   "A": "Relative to competitors.",
   "B": "Relative to the firm's own past performance.",
   "C": "Relative to the expectations set in the budget.",
   "D": "Relative to the cost of capital alone."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The definition is a set of goal-directed actions a firm takes to gain and sustain superior performance relative to competitors, so the benchmark is external. A firm improving in absolute terms while rivals improve faster has no competitive advantage.",
   "B": "Incorrect. Improving on one's own past says nothing about competitive advantage.",
   "C": "Incorrect. Budget expectations are an internal control measure, not the benchmark in this definition.",
   "D": "Incorrect. The cost of capital appears in the levels-of-strategy scheme as the return threshold, not as the comparison in this definition."
  },
  "recap": "Correct. The definition is a set of goal-directed actions a firm takes to gain and sustain superior performance relative to competitors, so the benchmark is external. A firm improving in absolute terms while rivals improve faster has no competitive advantage."
 },
 {
  "cat": "What Strategy Is",
  "title": "What an Integrated Plan Does",
  "question": "Which three things does the chapter say an integrated, comprehensive strategy does?",
  "options": {
   "A": "Sets annual targets, allocates budgets and measures results.",
   "B": "Identifies the scope and direction of the organisation, integrates a coherent set of strategic decisions, and aims at long term performance superior to competitors.",
   "C": "Describes the vision, the mission and the purpose of the company.",
   "D": "Analyses the industry, the competitors and the customers."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Those are elements of planning and control, not the definition of the strategic plan given here.",
   "B": "Correct. Strategy as an integrated, comprehensive plan identifies the scope and the direction of the organisation, integrates a coherent set of strategic decisions, and is aimed at obtaining long term performance superior to competitors, which is competitive advantage.",
   "C": "Incorrect. Vision, mission and purpose are separate concepts covered later in the chapter.",
   "D": "Incorrect. That is external analysis, one input to the strategy process rather than what the plan itself does."
  },
  "recap": "Correct. Strategy as an integrated, comprehensive plan identifies the scope and the direction of the organisation, integrates a coherent set of strategic decisions, and is aimed at obtaining long term performance superior to competitors, which is competitive advantage."
 },
 {
  "cat": "What Strategy Is",
  "title": "Testing Whether a Decision Is Strategic",
  "question": "A company signs a one-year, low-cost advertising contract that it can cancel at any time. By the chapter's criteria, is this a strategic decision?",
  "options": {
   "A": "Yes, because any decision about the market is strategic.",
   "B": "Yes, because advertising affects the company's position.",
   "C": "No, because it fails all three criteria: it is short term, it is reversible and it does not require large amounts of resources.",
   "D": "No, because only decisions taken by the board can be strategic."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The subject matter does not settle it; the three criteria do.",
   "B": "Incorrect. Affecting the company's position is not one of the three criteria given.",
   "C": "Correct. A strategic decision is one that has long term effects, has non-reversible effects, and requires large amounts of resources. This contract is short, cancellable and cheap, so it satisfies none of them.",
   "D": "Incorrect. The definition is framed by the nature of the decision, not by who takes it."
  },
  "recap": "Correct. A strategic decision is one that has long term effects, has non-reversible effects, and requires large amounts of resources. This contract is short, cancellable and cheap, so it satisfies none of them."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Two Organisational Roles of Strategy",
  "question": "Beyond the content of any plan, why does the chapter say strategy is important?",
  "options": {
   "A": "As decision support, constraining decision alternatives and integrating the knowledge of different individuals; and as a coordinating device, coordinating the actions of different parts of the organisation and defining messages easy to communicate.",
   "B": "As a legal requirement for listed companies and as a document for investors.",
   "C": "As a forecasting tool and as a basis for the annual budget.",
   "D": "As a way of motivating employees and as a recruitment argument."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Strategy works as decision support, by constraining decision alternatives and integrating knowledge of different individuals, and as a coordinating device, by coordinating the actions of different parts of the organisation and defining messages that are easy to communicate.",
   "B": "Incorrect. No legal requirement is invoked; the reasons given are organisational.",
   "C": "Incorrect. Forecasting and budgeting are not the two roles stated.",
   "D": "Incorrect. Motivation and recruitment are not among the reasons given."
  },
  "recap": "Correct. Strategy works as decision support, by constraining decision alternatives and integrating knowledge of different individuals, and as a coordinating device, by coordinating the actions of different parts of the organisation and defining messages that are easy to communicate."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Structure of Successful Strategy",
  "question": "In Grant's scheme of common elements in successful strategy, how do the pieces fit together?",
  "options": {
   "A": "Successful strategy rests directly on the three foundations, with implementation a separate concern.",
   "B": "Successful strategy rests on effective implementation, which rests on simple, consistent, long-term goals; profound understanding of the competitive environment; and objective appraisal of resources.",
   "C": "Successful strategy rests on effective implementation alone, the foundations being optional.",
   "D": "Successful strategy rests on profound understanding of the competitive environment, from which the other elements follow."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Effective implementation sits between the foundations and success; it is not set aside.",
   "B": "Correct. In the scheme, successful strategy rests on effective implementation, and effective implementation rests on three foundations: simple, consistent, long-term goals; profound understanding of the competitive environment; and objective appraisal of resources.",
   "C": "Incorrect. Implementation is effective because of the three foundations beneath it, so they are not optional.",
   "D": "Incorrect. Understanding the competitive environment is one of three parallel foundations, not the source of the others."
  },
  "recap": "Correct. In the scheme, successful strategy rests on effective implementation, and effective implementation rests on three foundations: simple, consistent, long-term goals; profound understanding of the competitive environment; and objective appraisal of resources."
 },
 {
  "cat": "What Strategy Is",
  "title": "Simple, Consistent, Long-Term",
  "question": "The first foundation in Grant's scheme calls for goals that are simple, consistent and long-term. What does the requirement of simplicity imply?",
  "options": {
   "A": "That goals should be sophisticated enough to capture every contingency.",
   "B": "That goals should be revised frequently as conditions change.",
   "C": "That goals should be delegated to each function separately.",
   "D": "That goals have to be simple as well as consistent and long-term, because they underpin an implementation that many people have to carry out."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. The requirement stated is simplicity, which is the opposite of capturing every contingency.",
   "B": "Incorrect. Frequent revision conflicts with both consistency and the long-term horizon required.",
   "C": "Incorrect. Delegation by function is what functional strategies do; it is not what the foundation asks of the goals.",
   "D": "Correct. The foundation is simple, consistent, long-term goals, and it supports effective implementation, which is what makes simplicity a requirement rather than a compromise: the goals have to survive being communicated and acted on across the organisation."
  },
  "recap": "Correct. The foundation is simple, consistent, long-term goals, and it supports effective implementation, which is what makes simplicity a requirement rather than a compromise: the goals have to survive being communicated and acted on across the organisation."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Which Level Answers Which Question",
  "question": "A company decides to enter the pharmaceutical industry, and separately decides to compete there on speed of development. Which levels are these?",
  "options": {
   "A": "Both are corporate strategy decisions.",
   "B": "Entering the industry is corporate strategy; competing on speed is business strategy.",
   "C": "Entering the industry is business strategy; competing on speed is corporate strategy.",
   "D": "Both are business strategy decisions, since both concern competition."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Only the first is corporate; how to compete once inside is a different level.",
   "B": "Correct. Corporate strategy defines in which industries and markets the company is going to compete, answering industry attractiveness. Business strategy is concerned with how the company competes within a particular industry or market, answering comparative advantage.",
   "C": "Incorrect. The two are inverted: choosing the arena is corporate, competing inside it is business.",
   "D": "Incorrect. Both mention competition, which is exactly the confusion the two levels are meant to separate."
  },
  "recap": "Correct. Corporate strategy defines in which industries and markets the company is going to compete, answering industry attractiveness. Business strategy is concerned with how the company competes within a particular industry or market, answering comparative advantage."
 },
 {
  "cat": "Levels of Strategy",
  "title": "The Return Threshold",
  "question": "In Grant's scheme the levels of strategy serve the question of how the company makes money. Against what benchmark is that return measured?",
  "options": {
   "A": "Above zero, so that the company is profitable.",
   "B": "Above the industry average profit.",
   "C": "Above the cost of capital.",
   "D": "Above the previous year's return."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A positive profit that does not cover the cost of capital is not the return the scheme asks for.",
   "B": "Incorrect. The industry average is not the threshold named; the cost of capital is.",
   "C": "Correct. The scheme puts a rate of return above the cost of capital at the top, and splits the question of how the company makes money into industry attractiveness, answered by corporate strategy, and comparative advantage, answered by business strategy.",
   "D": "Incorrect. Improvement on last year is not the benchmark in this scheme."
  },
  "recap": "Correct. The scheme puts a rate of return above the cost of capital at the top, and splits the question of how the company makes money into industry attractiveness, answered by corporate strategy, and comparative advantage, answered by business strategy."
 },
 {
  "cat": "Levels of Strategy",
  "title": "What Functional Strategies Are",
  "question": "What role do functional strategies play?",
  "options": {
   "A": "They choose which industries the company competes in, function by function.",
   "B": "They are the elaboration and implementation of business strategies through individual functions such as R&D, production, HR, finance and sales & marketing.",
   "C": "They replace the business strategy where a function is large enough to stand alone.",
   "D": "They are the strategies of the company's suppliers and distributors."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Choosing industries is corporate strategy and is not done function by function.",
   "B": "Correct. Functional strategies are the elaboration and implementation of business strategies through individual functions, and in the hierarchy they sit beneath each business unit strategy.",
   "C": "Incorrect. They implement the business strategy rather than replacing it, however large the function.",
   "D": "Incorrect. They are internal to the company, not the strategies of external parties."
  },
  "recap": "Correct. Functional strategies are the elaboration and implementation of business strategies through individual functions, and in the hierarchy they sit beneath each business unit strategy."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Reading the Hierarchy",
  "question": "A company has three strategic business units. According to the hierarchy shown, what does the structure of its strategies look like?",
  "options": {
   "A": "One corporate strategy, three business unit strategies, and a set of functional strategies under each business unit.",
   "B": "Three corporate strategies, one for each business unit, each with its own functional strategies.",
   "C": "One corporate strategy and one set of functional strategies shared by all three business units.",
   "D": "One corporate strategy and three functional strategies, with no business unit level."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The hierarchy has corporate strategy at the top, a strategy for each SBU below it, and within each SBU the functional strategies — R&D, production, HR, finance and sales & marketing.",
   "B": "Incorrect. Corporate strategy is single by definition: it decides which industries the company as a whole is in.",
   "C": "Incorrect. The functional strategies are repeated under each business unit, since each elaborates its own unit's strategy.",
   "D": "Incorrect. The business unit level is precisely where business strategy lives and cannot be skipped."
  },
  "recap": "Correct. The hierarchy has corporate strategy at the top, a strategy for each SBU below it, and within each SBU the functional strategies — R&D, production, HR, finance and sales & marketing."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Is It an SBU?",
  "question": "A product line shares its customers, its competitors and its management with the rest of the company, and is measured only on production cost. Is it a strategic business unit?",
  "options": {
   "A": "Yes, because any defined group of products is an SBU.",
   "B": "Yes, provided the company chooses to call it one.",
   "C": "No, because it fails the defining tests: it has no specific customer group of its own, no competitors of its own, cannot be managed separately or stand alone, and is not a profit centre.",
   "D": "No, but only because it is measured on cost; the other conditions are optional."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A defined group of products is one element of the definition, and on its own it is not enough.",
   "B": "Incorrect. The definition sets substantive conditions rather than a naming choice.",
   "C": "Correct. An SBU carries out a defined group of products aimed at a specific group of customers, has its own competitors, can be managed separately from the rest of the company, can stand alone, and has distinct objectives, being a profit centre with a manager responsible for its strategy and performance. This product line satisfies none of those.",
   "D": "Incorrect. The other conditions are part of the definition too, and this line fails them as well."
  },
  "recap": "Correct. An SBU carries out a defined group of products aimed at a specific group of customers, has its own competitors, can be managed separately from the rest of the company, can stand alone, and has distinct objectives, being a profit centre with a manager responsible for its strategy and performance. This product line satisfies none of those."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Why the SBU Is a Profit Centre",
  "question": "Why does the definition of an SBU insist that it is a profit centre with a manager responsible for its strategy and performance?",
  "options": {
   "A": "Because tax rules require separate accounts for each business.",
   "B": "Because it makes business strategy accountable: someone owns the result of how that unit competes.",
   "C": "Because profit centres are exempt from corporate strategy.",
   "D": "Because it determines how the unit's costs are allocated."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. No tax requirement is given; the reasoning is about management and accountability.",
   "B": "Correct. Being a profit centre with a manager responsible for its strategy and performance is part of the definition, and it is what allows the unit to carry a business strategy whose results someone owns.",
   "C": "Incorrect. SBUs sit under the corporate strategy, which decides which industries the company is in.",
   "D": "Incorrect. Cost allocation is a cost accounting matter and is not what the definition is about."
  },
  "recap": "Correct. Being a profit centre with a manager responsible for its strategy and performance is part of the definition, and it is what allows the unit to carry a business strategy whose results someone owns."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Standing Alone",
  "question": "Among the conditions defining an SBU, which captures the idea that the unit could exist as a company in its own right?",
  "options": {
   "A": "That it carries out a defined group of products.",
   "B": "That it has distinct objectives.",
   "C": "That it can be managed separately from the rest of the company and can stand alone.",
   "D": "That it is aimed at a specific group of customers."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A defined group of products can sit inside a larger unit without being separable.",
   "B": "Incorrect. Distinct objectives can be set for a department that could not survive on its own.",
   "C": "Correct. The definition includes both that the unit can be managed separately from the rest of the company and that it can stand alone, which together express independence rather than mere distinctness.",
   "D": "Incorrect. Serving a specific customer group is about focus, not about the ability to exist independently."
  },
  "recap": "Correct. The definition includes both that the unit can be managed separately from the rest of the company and that it can stand alone, which together express independence rather than mere distinctness."
 },
 {
  "cat": "Levels of Strategy",
  "title": "Corporate Strategy in One Question",
  "question": "Which question does corporate strategy answer?",
  "options": {
   "A": "Which industries should we be in?",
   "B": "How should we compete?",
   "C": "How should each function support the business?",
   "D": "What is our vision and mission?"
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Corporate strategy defines in which industries and markets the company is going to compete, which the scheme states as the question of industry attractiveness: which industries should we be in?",
   "B": "Incorrect. How should we compete is the question of comparative advantage, answered by business strategy.",
   "C": "Incorrect. That is the domain of the functional strategies, which elaborate the business strategy.",
   "D": "Incorrect. Vision and mission are separate concepts and are not what distinguishes the levels of strategy."
  },
  "recap": "Correct. Corporate strategy defines in which industries and markets the company is going to compete, which the scheme states as the question of industry attractiveness: which industries should we be in?"
 },
 {
  "cat": "Strategy Process",
  "title": "Where the Two Analyses Meet",
  "question": "In the strategic decisions process, what do external and internal analysis produce, and where do they converge?",
  "options": {
   "A": "External analysis produces strategic resources and internal analysis key success factors; they converge on the SWOT.",
   "B": "External analysis produces key success factors and internal analysis strategic resources; they converge on competitive advantage and the grand strategy.",
   "C": "External analysis produces the grand strategy and internal analysis the implementation plan.",
   "D": "They do not converge: each produces its own set of strategic alternatives."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The two outputs are inverted: key success factors come from the external side and strategic resources from the internal one.",
   "B": "Correct. External analysis yields the key success factors and the opportunities and threats; internal analysis yields the strategic resources and the strengths and weaknesses. The two sides meet at competitive advantage and the grand strategy, supported by the SWOT analysis.",
   "C": "Incorrect. The grand strategy is where the two sides meet, not the output of one of them.",
   "D": "Incorrect. The alternatives are generated once, after the diagnosis has converged."
  },
  "recap": "Correct. External analysis yields the key success factors and the opportunities and threats; internal analysis yields the strategic resources and the strengths and weaknesses. The two sides meet at competitive advantage and the grand strategy, supported by the SWOT analysis."
 },
 {
  "cat": "Strategy Process",
  "title": "Which Phase Does SWOT Belong To",
  "question": "The process groups into diagnosis, strategy formulation and actions implementation. Where does the SWOT analysis sit?",
  "options": {
   "A": "In strategy formulation, because it selects among alternatives.",
   "B": "In actions implementation, because it is used to monitor progress.",
   "C": "In diagnosis, together with external and internal analysis.",
   "D": "Outside the three phases, as a preliminary exercise."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Formulation is the generation and selection of strategic alternatives, which follows the SWOT.",
   "B": "Incorrect. Implementation and control make up the actions phase; the SWOT precedes them.",
   "C": "Correct. Diagnosis covers external analysis, internal analysis and the SWOT that combines them. SWOT describes the situation; it does not choose the alternative.",
   "D": "Incorrect. It sits inside the diagnosis phase, which is the first of the three."
  },
  "recap": "Correct. Diagnosis covers external analysis, internal analysis and the SWOT that combines them. SWOT describes the situation; it does not choose the alternative."
 },
 {
  "cat": "Strategy Process",
  "title": "Key Success Factor or Strength",
  "question": "A firm notes that rapid delivery is what wins orders in its industry, and separately that its own logistics network is unusually dense. How does the process classify these two observations?",
  "options": {
   "A": "Both are strengths, since both favour the firm.",
   "B": "Rapid delivery is a key success factor from external analysis; the dense network is a strength from internal analysis.",
   "C": "Rapid delivery is a strength; the dense network is an opportunity.",
   "D": "Both are opportunities, since both concern the market."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. What the industry demands is not a property of the firm, so it cannot be a strength.",
   "B": "Correct. External analysis identifies the key success factors of the arena and produces the opportunities and threats; internal analysis identifies the firm's strategic resources and produces the strengths and weaknesses. Key success factors belong to the industry, resources to the firm.",
   "C": "Incorrect. The classification is inverted: the industry requirement is the key success factor and the firm's asset is the strength.",
   "D": "Incorrect. The dense logistics network is something the firm owns, which makes it internal."
  },
  "recap": "Correct. External analysis identifies the key success factors of the arena and produces the opportunities and threats; internal analysis identifies the firm's strategic resources and produces the strengths and weaknesses. Key success factors belong to the industry, resources to the firm."
 },
 {
  "cat": "Strategy Process",
  "title": "Threat or Weakness",
  "question": "A new low-cost entrant appears in the firm's market. In the SWOT, how is this classified?",
  "options": {
   "A": "A weakness, because it damages the firm's position.",
   "B": "A threat, because it comes from the external environment.",
   "C": "Either, depending on how severe it is.",
   "D": "Neither: competitor moves are handled outside the SWOT."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Strengths and weaknesses are internal by definition, describing the firm rather than its surroundings.",
   "B": "Correct. Opportunities and threats arrive from the external analysis, strengths and weaknesses from the internal one. A new entrant is part of the external environment, so it is a threat however damaging it turns out to be.",
   "C": "Incorrect. Severity does not move an item from the external side to the internal one.",
   "D": "Incorrect. Competitors are part of the external environment the analysis covers."
  },
  "recap": "Correct. Opportunities and threats arrive from the external analysis, strengths and weaknesses from the internal one. A new entrant is part of the external environment, so it is a threat however damaging it turns out to be."
 },
 {
  "cat": "Strategy Process",
  "title": "What the Grand Strategy Is",
  "question": "In the process diagram, what sits at the centre, and how is it described?",
  "options": {
   "A": "The implementation plan, described as the set of actions to be carried out.",
   "B": "The SWOT analysis, described as the summary of the diagnosis.",
   "C": "Competitive advantage and the grand strategy, described as the business model.",
   "D": "The control system, described as the feedback mechanism."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Implementation comes further down, after the alternatives have been generated and selected.",
   "B": "Incorrect. The SWOT supports the centre but is not what the centre is called.",
   "C": "Correct. At the centre of the process sits competitive advantage and the grand strategy, which the diagram labels the business model. It is what the diagnosis converges on and what the strategic alternatives are generated from.",
   "D": "Incorrect. Control is the last step of the actions implementation phase."
  },
  "recap": "Correct. At the centre of the process sits competitive advantage and the grand strategy, which the diagram labels the business model. It is what the diagnosis converges on and what the strategic alternatives are generated from."
 },
 {
  "cat": "Strategy Process",
  "title": "Why the Process Is a Loop",
  "question": "What makes the strategic decisions process a process rather than a one-off exercise?",
  "options": {
   "A": "That it is repeated at fixed calendar intervals.",
   "B": "That control follows implementation and repositioning feeds back into the diagnosis.",
   "C": "That every level of strategy runs it separately.",
   "D": "That the SWOT is updated whenever a competitor moves."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. No fixed interval is specified; what makes it a process is the feedback in the diagram.",
   "B": "Correct. Control follows implementation, and repositioning feeds back into the diagnosis, so the analysis is revisited rather than performed once. Without those loops the scheme would describe a single exercise.",
   "C": "Incorrect. Running it at several levels would multiply the exercise, not make any one of them a loop.",
   "D": "Incorrect. Updating one input is not the feedback structure the diagram shows."
  },
  "recap": "Correct. Control follows implementation, and repositioning feeds back into the diagnosis, so the analysis is revisited rather than performed once. Without those loops the scheme would describe a single exercise."
 },
 {
  "cat": "Strategy Process",
  "title": "Which Side Are Goals and Values On",
  "question": "Strategy links the internal and external environments. On which side do goals and values sit, and what else is there?",
  "options": {
   "A": "Internal, together with resources & capabilities and structure & systems.",
   "B": "External, together with the economic and social context and the competitors.",
   "C": "Internal, together with customers and suppliers.",
   "D": "External, since values are imposed by society."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The internal environment is goals & values, resources & capabilities, and structure & systems. The external side holds the economic and social context, business areas, competitors, customers and suppliers.",
   "B": "Incorrect. The economic and social context and the competitors are external, but goals and values are not.",
   "C": "Incorrect. Customers and suppliers belong to the external environment.",
   "D": "Incorrect. Goals and values are listed as something the firm brings, on the internal side."
  },
  "recap": "Correct. The internal environment is goals & values, resources & capabilities, and structure & systems. The external side holds the economic and social context, business areas, competitors, customers and suppliers."
 },
 {
  "cat": "Strategy Process",
  "title": "What Sits on the External Side",
  "question": "Which list matches the external environment as the chapter presents it?",
  "options": {
   "A": "Resources & capabilities, structure & systems, goals & values.",
   "B": "Economic and social context, business areas, competitors, customers, suppliers.",
   "C": "Key success factors, strategic resources, competitive advantage.",
   "D": "Corporate strategy, business strategy, functional strategies."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the internal environment, the other side of the link.",
   "B": "Correct. The external environment comprises the economic and social context, business areas, competitors, customers and suppliers, with strategy acting as the link to the internal environment.",
   "C": "Incorrect. Those are outputs of the strategic decisions process, not the contents of the external environment.",
   "D": "Incorrect. Those are the levels of strategy, a different scheme."
  },
  "recap": "Correct. The external environment comprises the economic and social context, business areas, competitors, customers and suppliers, with strategy acting as the link to the internal environment."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Intended Against Realized",
  "question": "In the top down and bottom up scheme, what happens to the intended strategy?",
  "options": {
   "A": "It becomes the realized strategy in full, once implementation is complete.",
   "B": "Part of it is never carried out and becomes unrealized strategy; the part carried out is the deliberate strategy, which joins the emergent strategy to form the realized strategy.",
   "C": "It is replaced entirely by the emergent strategy coming from below.",
   "D": "It becomes the emergent strategy once the organisation adopts it."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Part of the intended strategy is never carried out; that part is the unrealized strategy.",
   "B": "Correct. The intended strategy splits: the unrealized part is dropped and the deliberate part goes ahead. The deliberate strategy then joins the emergent strategy arising from below, and together they form the realized strategy.",
   "C": "Incorrect. The deliberate part survives, so the realized strategy has two sources rather than one.",
   "D": "Incorrect. Emergent strategy comes from the bottom up, not from the intended plan."
  },
  "recap": "Correct. The intended strategy splits: the unrealized part is dropped and the deliberate part goes ahead. The deliberate strategy then joins the emergent strategy arising from below, and together they form the realized strategy."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Deliberate Is Not Intended",
  "question": "What distinguishes deliberate strategy from intended strategy?",
  "options": {
   "A": "Nothing: they are two names for the strategic plan.",
   "B": "Deliberate strategy is the plan before approval; intended strategy is the plan after it.",
   "C": "Deliberate strategy is the part of the intended strategy that is actually carried out.",
   "D": "Deliberate strategy is the part that comes from the bottom of the organisation."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The scheme separates them precisely because the plan and what is carried out differ.",
   "B": "Incorrect. The distinction is about what survives into action, not about approval.",
   "C": "Correct. The intended strategy splits into the unrealized part, never carried out, and the deliberate part, which goes ahead and feeds into the realized strategy.",
   "D": "Incorrect. What comes from the bottom of the organisation is the emergent strategy."
  },
  "recap": "Correct. The intended strategy splits into the unrealized part, never carried out, and the deliberate part, which goes ahead and feeds into the realized strategy."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Where Emergent Strategy Comes From",
  "question": "What is emergent strategy, and what does the label imply?",
  "options": {
   "A": "Strategy arising from decisions and initiatives lower in the organisation, which accumulate into a pattern; it is not the same as unmanaged or accidental.",
   "B": "Strategy that emerges from the external environment and is imposed on the firm.",
   "C": "Strategy that the board approves without a formal plan.",
   "D": "The part of the plan that is postponed to a later period."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The bottom up strategic approach produces the emergent strategy, arising from decisions and initiatives taken lower in the organisation. It is a pattern in a stream of decisions, which is Mintzberg's own definition of strategy, so emergent does not mean accidental.",
   "B": "Incorrect. It comes from inside the organisation, from below, not from the environment.",
   "C": "Incorrect. Board approval concerns the top down route.",
   "D": "Incorrect. A postponed part of the plan is still intended; emergent strategy was never in the plan."
  },
  "recap": "Correct. The bottom up strategic approach produces the emergent strategy, arising from decisions and initiatives taken lower in the organisation. It is a pattern in a stream of decisions, which is Mintzberg's own definition of strategy, so emergent does not mean accidental."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Plan or Pattern",
  "question": "Under Mintzberg's definition, can a company with no strategic plan have a strategy?",
  "options": {
   "A": "No: without a plan there is nothing to implement.",
   "B": "Yes, if a pattern can be identified in the stream of decisions it has actually taken.",
   "C": "Only if the company later writes the plan down.",
   "D": "Only at the functional level, not at the corporate one."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That reading treats strategy as identical to the plan, which is what Mintzberg's definition sets aside.",
   "B": "Correct. Mintzberg defines strategy as a pattern in a stream of decisions, which makes it observable in what the organisation has actually done. Under that definition a company with no plan can still have a strategy, and a company with a plan it never followed may not.",
   "C": "Incorrect. Writing it down afterwards does not change the decisions already taken, which is where the pattern lies.",
   "D": "Incorrect. The definition is not restricted by level."
  },
  "recap": "Correct. Mintzberg defines strategy as a pattern in a stream of decisions, which makes it observable in what the organisation has actually done. Under that definition a company with no plan can still have a strategy, and a company with a plan it never followed may not."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Combining the Two Approaches",
  "question": "How does the chapter describe the relationship between top down and bottom up strategy in reality?",
  "options": {
   "A": "Companies must choose one approach and apply it consistently.",
   "B": "The top down approach applies to corporate strategy and the bottom up approach to functional strategy.",
   "C": "Strategy is a combination of planned, top down strategy and emergent strategy, both flowing into what the company actually does.",
   "D": "The bottom up approach replaces the top down one in large organisations."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. They are presented as combining, not as alternatives to choose between.",
   "B": "Incorrect. No such split by level is made; both routes feed the realized strategy.",
   "C": "Correct. Strategy in reality is a combination of planned or top down strategy and emergent strategy: the top down strategic plan and the bottom up emergent strategy both flow into the realized strategy.",
   "D": "Incorrect. Neither replaces the other; the realized strategy draws on both."
  },
  "recap": "Correct. Strategy in reality is a combination of planned or top down strategy and emergent strategy: the top down strategic plan and the bottom up emergent strategy both flow into the realized strategy."
 },
 {
  "cat": "Intended & Emergent",
  "title": "What Changed the Committee's Mind",
  "question": "In the Starbucks case, the executive committee first voted the iced drink down 7 to 1, and CEO Howard Schultz said “We do coffee, we don't do iced drinks”. What eventually persuaded the executive team to approve it?",
  "options": {
   "A": "The taste of the drink when it was served to them in Seattle.",
   "B": "The sales records Diana had kept: 40 drinks a day in the first week, 50 in the second and 70 in the third.",
   "C": "A formal request from the store managers of southern California.",
   "D": "A change of CEO at Starbucks."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. They tasted it in Seattle and liked it, and still said no; the taste alone did not move them.",
   "B": "Correct. Howard Behar produced the sales numbers Diana had carefully kept — 40 drinks a day in the first week, 50 in the second, 70 in the third — and those results persuaded the executive team to give reluctant approval to introduce the drink in all stores.",
   "C": "Incorrect. The initiative came from one store manager, and the case turns on the evidence rather than on collective pressure.",
   "D": "Incorrect. Schultz remained CEO; the committee was persuaded rather than replaced."
  },
  "recap": "Correct. Howard Behar produced the sales numbers Diana had carefully kept — 40 drinks a day in the first week, 50 in the second, 70 in the third — and those results persuaded the executive team to give reluctant approval to introduce the drink in all stores."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Why the Frappuccino Case Is Told Here",
  "question": "What does the Starbucks Frappuccino case illustrate?",
  "options": {
   "A": "That top down strategic planning works when the CEO is decisive.",
   "B": "That emergent strategy from the bottom of the organisation can enter the realized strategy even after the formal process has rejected it.",
   "C": "That functional strategies should be set independently of the business strategy.",
   "D": "That a strong culture always prevents innovation."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The top down process rejected the idea twice, so the case is not an argument for it.",
   "B": "Correct. A store manager's initiative was voted down by the executive committee and pursued anyway, and it ended as a product that at one point brought in more than 20 percent of Starbucks' total revenues. The realized strategy came from the bottom up.",
   "C": "Incorrect. The case is about where strategy originates, not about the independence of functional strategies.",
   "D": "Incorrect. Culture can become a liability, but the case is told to illustrate emergent strategy."
  },
  "recap": "Correct. A store manager's initiative was voted down by the executive committee and pursued anyway, and it ended as a product that at one point brought in more than 20 percent of Starbucks' total revenues. The realized strategy came from the bottom up."
 },
 {
  "cat": "Intended & Emergent",
  "title": "Naming the Two Approaches",
  "question": "Which pairing of approach and resulting strategy is correct?",
  "options": {
   "A": "Top down produces emergent strategy; bottom up produces intended strategy.",
   "B": "Top down produces intended strategy; bottom up produces emergent strategy.",
   "C": "Top down produces realized strategy; bottom up produces deliberate strategy.",
   "D": "Top down produces deliberate strategy; bottom up produces unrealized strategy."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The two are inverted: planning from the top is what produces the intended strategy.",
   "B": "Correct. The top down strategic approach produces the intended strategy, and the bottom up strategic approach produces the emergent strategy.",
   "C": "Incorrect. Realized strategy is the outcome of both routes together, not the product of the top down one.",
   "D": "Incorrect. Unrealized strategy is the part of the intended strategy that is dropped, not the product of the bottom up approach."
  },
  "recap": "Correct. The top down strategic approach produces the intended strategy, and the bottom up strategic approach produces the emergent strategy."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Vision or Mission",
  "question": "“To be the world's leading aerospace company” and “manufacturing the world's largest aircraft with passengers at heart and airlines in mind”. Which is which, for Airbus?",
  "options": {
   "A": "The first is the mission and the second the vision.",
   "B": "The first is the vision and the second the mission.",
   "C": "Both are vision statements at different horizons.",
   "D": "The first is the purpose and the second the vision."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The statement of what the company manufactures and for whom describes present business scope, which is the mission.",
   "B": "Correct. The vision is the future dream, where we are going, so being the world's leading aerospace company is the vision. The mission is the present business scope, who we are and what we do, and the means by which the vision is accomplished.",
   "C": "Incorrect. Only one of them expresses an aspiration; the other describes the current activity.",
   "D": "Incorrect. Purpose says why the company exists, which neither statement does."
  },
  "recap": "Correct. The vision is the future dream, where we are going, so being the world's leading aerospace company is the vision. The mission is the present business scope, who we are and what we do, and the means by which the vision is accomplished."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What a Mission Statement Covers",
  "question": "According to the chapter, what does a mission statement define?",
  "options": {
   "A": "What the organization wishes to be like in some years' time.",
   "B": "Why the organization exists, from the perspective of its stakeholders.",
   "C": "The collectively shared values and norms of the firm.",
   "D": "What business the organization is in and what it is not, both now and projecting into the future, and the means by which the vision is accomplished."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. That is the vision, which looks at what the organization wishes to become.",
   "B": "Incorrect. That is purpose, the broader and outward-oriented concept.",
   "C": "Incorrect. That is organisational culture, covered separately.",
   "D": "Correct. The mission broadly defines what a company does, covering what business the organization is in and what it is not, both now and projecting into the future, and it is the means by which the vision is accomplished."
  },
  "recap": "Correct. The mission broadly defines what a company does, covering what business the organization is in and what it is not, both now and projecting into the future, and it is the means by which the vision is accomplished."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "The Definition of Purpose",
  "question": "How does the chapter define purpose?",
  "options": {
   "A": "The long-term and normative aspiration that identifies why an organization exists and pushes it to take actions that are meaningful and impactful for its stakeholders.",
   "B": "The set of financial objectives the organization commits to over the long term.",
   "C": "The statement of what business the organization is in and what it is not.",
   "D": "The collectively shared values and norms that govern employee behaviour."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Purpose is the long-term and normative aspiration that identifies why an organization exists and pushes it to take actions that are meaningful and impactful for its stakeholders. It requires an outward-looking perspective, seeing things from the eyes of stakeholders.",
   "B": "Incorrect. Purpose is normative and outward-looking rather than a set of financial targets.",
   "C": "Incorrect. That is the mission.",
   "D": "Incorrect. That is organisational culture and values."
  },
  "recap": "Correct. Purpose is the long-term and normative aspiration that identifies why an organization exists and pushes it to take actions that are meaningful and impactful for its stakeholders. It requires an outward-looking perspective, seeing things from the eyes of stakeholders."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What Makes a Statement an Organizational Purpose",
  "question": "A company publishes a purpose statement written by its communications team, which employees do not recognise. Does it qualify as an organizational purpose?",
  "options": {
   "A": "Yes, since publishing it makes it official.",
   "B": "Yes, provided it refers to societal needs.",
   "C": "No: to become an organizational purpose, a statement has to be authentic and shared.",
   "D": "No, because only the board may issue a purpose statement."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Publication is not one of the conditions given.",
   "B": "Incorrect. Referring to societal needs is part of what purpose means, but it does not substitute for the two conditions.",
   "C": "Correct. To become an organizational purpose, a statement has to be authentic and shared. A statement announced by management and not recognised inside the company does not qualify.",
   "D": "Incorrect. The conditions concern authenticity and sharing, not who issues the statement."
  },
  "recap": "Correct. To become an organizational purpose, a statement has to be authentic and shared. A statement announced by management and not recognised inside the company does not qualify."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Telling the Three Apart",
  "question": "Disney states: “to be one of the leading producers and providers of entertainment and information”, “promote and spread happiness”, and a statement about using its portfolio of brands to develop creative, innovative and profitable entertainment experiences. Which is the purpose?",
  "options": {
   "A": "To be one of the leading producers and providers of entertainment and information.",
   "B": "Promote and spread happiness.",
   "C": "Using its portfolio of brands to develop entertainment experiences and related products.",
   "D": "None of them: Disney states only a vision and a mission."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the vision: what the organization wishes to be like in some years' time.",
   "B": "Correct. Purpose expresses why a company exists, with a broader and outward-oriented perspective, and it does not represent what the company does, will do or wants to be. Disney's purpose is to promote and spread happiness, and notably it names no product at all.",
   "C": "Incorrect. That is the mission, describing the present business scope and the means.",
   "D": "Incorrect. All three are stated for Disney in the chapter."
  },
  "recap": "Correct. Purpose expresses why a company exists, with a broader and outward-oriented perspective, and it does not represent what the company does, will do or wants to be. Disney's purpose is to promote and spread happiness, and notably it names no product at all."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What Purpose Statements Have in Common",
  "question": "Looking at purpose statements such as Tesla's “accelerate the world transition to sustainable energy” and Walmart's “saving people money so they can live better”, what do they share?",
  "options": {
   "A": "They quantify a target and a deadline.",
   "B": "They name the company's main product explicitly.",
   "C": "They describe the competitive advantage the company holds.",
   "D": "They express why the company exists in outward-looking terms, generally without naming the product at all."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. None of the examples given sets a figure or a date.",
   "B": "Incorrect. Almost none names the product: Tesla says energy rather than cars, Walmart says saving money rather than retail.",
   "C": "Incorrect. Competitive advantage belongs to business strategy, not to a purpose statement.",
   "D": "Correct. Purpose has a broader and outward-oriented perspective, representing why a company exists rather than what it does, which is why these statements are framed around the effect on people rather than around products."
  },
  "recap": "Correct. Purpose has a broader and outward-oriented perspective, representing why a company exists rather than what it does, which is why these statements are framed around the effect on people rather than around products."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Culture and Values Defined",
  "question": "How do organisational culture and organisational values differ in the chapter's definitions?",
  "options": {
   "A": "Culture is the collectively shared values and norms of the firm; values define what is important and include the ethical standards, beliefs and norms governing individual behaviour.",
   "B": "Culture is what management declares; values are what employees actually do.",
   "C": "Culture applies to the whole company; values apply only to senior management.",
   "D": "Culture is formal and written down; values are informal and unwritten."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Organisational culture describes the collectively shared values and norms of the firm, while organisational values define what is important and include the ethical standards, beliefs and norms that define the appropriate employee attitude and govern the behaviour of individuals within a firm.",
   "B": "Incorrect. Culture is defined as collectively shared, not as a management declaration.",
   "C": "Incorrect. Values govern the behaviour of individuals within the firm generally.",
   "D": "Incorrect. Neither is defined by whether it is written down; culture is expressed in artifacts."
  },
  "recap": "Correct. Organisational culture describes the collectively shared values and norms of the firm, while organisational values define what is important and include the ethical standards, beliefs and norms that define the appropriate employee attitude and govern the behaviour of individuals within a firm."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Recognising an Artifact",
  "question": "Which of these is an artifact of corporate culture as the chapter uses the term?",
  "options": {
   "A": "The company's return on invested capital.",
   "B": "The design and layout of the physical space, such as an open playful office rather than rows of identical cubicles.",
   "C": "The number of business units the company runs.",
   "D": "The industry the company has chosen to compete in."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A financial measure is not among the artifacts listed.",
   "B": "Correct. Corporate culture finds its expression in artifacts: the design and layout of physical space, symbols such as the type of clothing, vocabulary and language, the stories told and the events celebrated. Artifacts are where culture becomes observable, though they are the expression rather than the culture itself.",
   "C": "Incorrect. The number of SBUs is a matter of organisational structure and corporate strategy.",
   "D": "Incorrect. The choice of industry is corporate strategy."
  },
  "recap": "Correct. Corporate culture finds its expression in artifacts: the design and layout of physical space, symbols such as the type of clothing, vocabulary and language, the stories told and the events celebrated. Artifacts are where culture becomes observable, though they are the expression rather than the culture itself."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "How Culture Becomes a Liability",
  "question": "The chapter says culture is one of the strongest assets a company has but can also become its strongest liability. What is that second condition called, and what does it lead to?",
  "options": {
   "A": "Groupthink, which leads to a change of purpose.",
   "B": "Founder imprinting, which leads to socialisation.",
   "C": "Core rigidity, which leads to the need for cultural change, often meaning new leaders and a change of management.",
   "D": "Core competence, which leads to repositioning."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Groupthink is the risk that follows from founder imprinting; the liability form of culture is named differently.",
   "B": "Incorrect. Founder imprinting is where culture comes from, and socialisation is how employees learn it.",
   "C": "Correct. Culture is one of the strongest assets but can also become a company's strongest liability, called core rigidity. This leads to the need for cultural change, which often means new leaders and change of management.",
   "D": "Incorrect. Core competence is not the term used here, and repositioning belongs to the strategy process."
  },
  "recap": "Correct. Culture is one of the strongest assets but can also become a company's strongest liability, called core rigidity. This leads to the need for cultural change, which often means new leaders and change of management."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Where Culture Comes From",
  "question": "According to the chapter, what is the origin of organisational culture, and how long does its influence last?",
  "options": {
   "A": "It comes from founder imprinting, which often persists decades after his or her departure.",
   "B": "It comes from the industry the company competes in and changes with it.",
   "C": "It comes from the current CEO and changes with each appointment.",
   "D": "It comes from the written code of conduct and lasts as long as that document."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Organisational culture comes from founder imprinting, which often persists decades after his or her departure. That persistence is the point: a culture can outlast the person who set it and the conditions that made it appropriate.",
   "B": "Incorrect. The origin given is internal and specific to the firm's founder.",
   "C": "Incorrect. If it changed with each CEO it could not persist for decades, and cultural change is described as difficult.",
   "D": "Incorrect. A code of conduct may state values, but the origin given is founder imprinting."
  },
  "recap": "Correct. Organisational culture comes from founder imprinting, which often persists decades after his or her departure. That persistence is the point: a culture can outlast the person who set it and the conditions that made it appropriate."
 },
 {
  "cat": "What Strategy Is",
  "title": "The First Work on Strategy",
  "question": "Which work does the lecture identify as the first seminal text on strategy, and roughly when was it written?",
  "options": {
   "A": "Ken Ohmae's The Mind of the Strategist, 1983.",
   "B": "Sun Tzu's The Art of War, around 500 B.C.",
   "C": "Bruce Henderson's The Origin of Strategy, 1989.",
   "D": "Michael Porter's Competitive Strategy, 1980."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Ohmae's book is a modern business text, quoted later for its definition of competitive advantage.",
   "B": "Correct. The first seminal work that referred to strategy, in this case military strategy, is Sun Tzu's The Art of War, which dates back to around 500 B.C. It sets out ten decisive factors for victory.",
   "C": "Incorrect. Henderson's essay is from 1989 and belongs to the business literature.",
   "D": "Incorrect. Porter is quoted in the chapter, but the first seminal work named is far older and military."
  },
  "recap": "Correct. The first seminal work that referred to strategy, in this case military strategy, is Sun Tzu's The Art of War, which dates back to around 500 B.C. It sets out ten decisive factors for victory."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Military-to-Business Mapping",
  "question": "In the parallelism that carried strategy from the military world into management, what does the army correspond to?",
  "options": {
   "A": "The competitive arena.",
   "B": "The competitors.",
   "C": "The company, with its assets and resources as the weapons.",
   "D": "The entrepreneur or manager."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The competitive arena is what the battlefield became.",
   "B": "Incorrect. The competitors are what the enemies to fight became.",
   "C": "Correct. In the parallelism the battlefield became the competitive arena, the enemies became the competitors, the army became the company with its assets and resources as the weapons war could be fought with, and the general became the entrepreneur or manager leading the company towards success.",
   "D": "Incorrect. The entrepreneur or manager is what the general became."
  },
  "recap": "Correct. In the parallelism the battlefield became the competitive arena, the enemies became the competitors, the army became the company with its assets and resources as the weapons war could be fought with, and the general became the entrepreneur or manager leading the company towards success."
 },
 {
  "cat": "What Strategy Is",
  "title": "Strategic or Tactical",
  "question": "Enrolling in a two-year MSc, washing your car, investing in a new plant, scheduling tomorrow's shift work. Which pair is strategic?",
  "options": {
   "A": "Enrolling in the MSc and investing in a new plant.",
   "B": "Washing the car and scheduling the shift work.",
   "C": "Enrolling in the MSc and scheduling the shift work.",
   "D": "All four, since each requires a decision."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Both act on the long term, require significant resources and are hardly reversible. Washing a car and scheduling a day's shift work are the tactical twins of buying a car and investing in a plant: short-term, operational, and reversible.",
   "B": "Incorrect. Those are exactly the tactical examples used to draw the line.",
   "C": "Incorrect. Scheduling shift work for a day is the standard example of a tactical decision at company level.",
   "D": "Incorrect. Requiring a decision is not the criterion; the criteria are horizon, resources, impact and reversibility."
  },
  "recap": "Correct. Both act on the long term, require significant resources and are hardly reversible. Washing a car and scheduling a day's shift work are the tactical twins of buying a car and investing in a plant: short-term, operational, and reversible."
 },
 {
  "cat": "What Strategy Is",
  "title": "How Tactics Relate to Strategy",
  "question": "What is the relationship between strategy and tactics?",
  "options": {
   "A": "Tactics replace strategy once implementation begins.",
   "B": "Tactics are strategy applied at a lower level of the organisation, with the same characteristics.",
   "C": "In strategy you set long term objectives and plan to achieve them; tactics are how you concretize and implement that strategy through actions performed on a daily basis, within the resources the strategy has allotted.",
   "D": "Tactics are the part of the strategy that is never carried out."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Tactics implement the strategy rather than replacing it; both remain in play.",
   "B": "Incorrect. They differ in kind, not only in level: tactical decisions are short-term, operational and reversible.",
   "C": "Correct. In strategy you set long term objectives and plan to achieve them; tactics refer to how you concretize and implement that strategy by means of actions performed on a daily basis. In the military parallel, strategy aims at winning the war and tactics at winning the single battle, with the resources allotted by the strategy level.",
   "D": "Incorrect. That describes unrealized strategy, from a different part of the chapter."
  },
  "recap": "Correct. In strategy you set long term objectives and plan to achieve them; tactics refer to how you concretize and implement that strategy by means of actions performed on a daily basis. In the military parallel, strategy aims at winning the war and tactics at winning the single battle, with the resources allotted by the strategy level."
 },
 {
  "cat": "What Strategy Is",
  "title": "The Fuller Definition of a Strategic Decision",
  "question": "Beyond long term effects, non-reversible effects and large amounts of resources, what else does the lecture's operational definition of a strategic decision include?",
  "options": {
   "A": "That the effects are significant and multi-dimensional on the final goal of the organization, and that it usually requires top management involvement.",
   "B": "That it must be approved by the shareholders' meeting.",
   "C": "That it must be documented in a written strategic plan.",
   "D": "That it must concern a market the company is not yet in."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The operational definition is that a strategic decision has long term, significant, multi-dimensional and non-reversible effects on the final goal of the organization; it usually requires large amounts of resources; and it usually requires top management involvement.",
   "B": "Incorrect. No approval body is part of the definition; the involvement named is that of top management.",
   "C": "Incorrect. Documentation is not one of the criteria, and under Mintzberg's view strategy need not be written at all.",
   "D": "Incorrect. Entering a new market is one example of a strategic decision, not a condition for one."
  },
  "recap": "Correct. The operational definition is that a strategic decision has long term, significant, multi-dimensional and non-reversible effects on the final goal of the organization; it usually requires large amounts of resources; and it usually requires top management involvement."
 },
 {
  "cat": "What Strategy Is",
  "title": "Politics, Strategy, Tactics",
  "question": "In the military view, strategy sits in the space between politics and tactics. What does each level do?",
  "options": {
   "A": "Politics sets the movements in battle; strategy allocates resources; tactics derive the purpose.",
   "B": "Politics is derived from a purpose or cause; strategy incorporates that purpose and concerns how to achieve the goal with the means available; tactics are the particular movements and actions while engaged in battle.",
   "C": "Politics and strategy are the same level; tactics is the only distinct one.",
   "D": "Strategy sets the purpose, politics negotiates it, and tactics communicate it."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The three are inverted: movements in battle are tactics, and the purpose comes from politics.",
   "B": "Correct. Politics is derived from a purpose or cause; strategy incorporates this purpose and is concerned with how to achieve the policy or goal with the means available; tactics are the particular movements and actions while engaged in battle. Strategy is the middle term.",
   "C": "Incorrect. They are distinguished precisely so that strategy can be located between them.",
   "D": "Incorrect. Strategy does not set the purpose: it receives it and works out how to reach it."
  },
  "recap": "Correct. Politics is derived from a purpose or cause; strategy incorporates this purpose and is concerned with how to achieve the policy or goal with the means available; tactics are the particular movements and actions while engaged in battle. Strategy is the middle term."
 },
 {
  "cat": "What Strategy Is",
  "title": "Where the War Analogy Stops",
  "question": "The chapter carries strategy over from the military world, but marks one point where the analogy breaks down. Which?",
  "options": {
   "A": "Business strategy has no equivalent of resources.",
   "B": "Business strategy cannot be planned in advance.",
   "C": "Business strategy does not aim at crushing or annihilating opponents: it assumes you have a goal and resources, in a context where other entities have goals that overlap and compete with yours.",
   "D": "Business strategy has no equivalent of a commander."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Resources map directly: in the parallelism the company's assets and resources are the weapons.",
   "B": "Incorrect. Planning survives the transfer; it is central to the intended strategy.",
   "C": "Correct. Business strategy does not aim any more at crushing or annihilating opponents as in war. It assumes you have a goal, you have resources to reach it, and you operate in a context where other entities may have their own goals that overlap and compete with yours. Strategy is then how to establish and maintain an advantage over them.",
   "D": "Incorrect. The general maps onto the entrepreneur or manager leading the company."
  },
  "recap": "Correct. Business strategy does not aim any more at crushing or annihilating opponents as in war. It assumes you have a goal, you have resources to reach it, and you operate in a context where other entities may have their own goals that overlap and compete with yours. Strategy is then how to establish and maintain an advantage over them."
 },
 {
  "cat": "What Strategy Is",
  "title": "Why Strategy Looks Fuzzy",
  "question": "The lecture opens by warning that strategy risks appearing «fuzzy». What causes that, and what resolves it?",
  "options": {
   "A": "Its many competing academic schools; an authoritative textbook resolves it.",
   "B": "The word is used in many varied contexts, from corporate settings down to everyday personal plans; tying it to advantage and performance through an operational definition resolves it.",
   "C": "Its military origin, which no longer applies; dropping the military parallel resolves it.",
   "D": "The absence of any agreed definition; only measurement resolves it."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The cause given is the everyday spread of the word, not academic disagreement.",
   "B": "Correct. Strategy risks appearing fuzzy because the term is used in many varied contexts, in corporate and business environments but also to describe situations at an individual level, even on a daily basis. The answer offered is an operational definition: strategy is far from fuzzy once it is tied to the notion of advantage and, more broadly, to performance.",
   "C": "Incorrect. The military origin is presented as the foundation of the concept, not as the source of confusion.",
   "D": "Incorrect. Definitions are given, several of them; the problem is loose everyday use."
  },
  "recap": "Correct. Strategy risks appearing fuzzy because the term is used in many varied contexts, in corporate and business environments but also to describe situations at an individual level, even on a daily basis. The answer offered is an operational definition: strategy is far from fuzzy once it is tied to the notion of advantage and, more broadly, to performance."
 },
 {
  "cat": "What Strategy Is",
  "title": "Ohmae on What Strategic Planning Is For",
  "question": "In the quote given in full, Ken Ohmae writes that the sole purpose of strategic planning is to enable a company to do what?",
  "options": {
   "A": "To maximize its market share as rapidly as possible.",
   "B": "To gain, as efficiently as possible, a sustainable edge over its competitors, altering the company's strength relative to theirs.",
   "C": "To set long term objectives and communicate them across the organisation.",
   "D": "To identify the industries in which it should compete."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Market share is not what the quote names; competitive advantage is.",
   "B": "Correct. Ohmae, in The Mind of the Strategist (1983): what business strategy is all about is, in a word, competitive advantage, and the sole purpose of strategic planning is to enable a company to gain, as efficiently as possible, a sustainable edge over its competitors. Strategy thus implies an attempt to alter a company's strength relative to that of its competitors in the most efficient way.",
   "C": "Incorrect. That is closer to the coordinating role of strategy than to Ohmae's stated purpose.",
   "D": "Incorrect. Choosing industries is corporate strategy in Grant's scheme, not Ohmae's definition."
  },
  "recap": "Correct. Ohmae, in The Mind of the Strategist (1983): what business strategy is all about is, in a word, competitive advantage, and the sole purpose of strategic planning is to enable a company to gain, as efficiently as possible, a sustainable edge over its competitors. Strategy thus implies an attempt to alter a company's strength relative to that of its competitors in the most efficient way."
 },
 {
  "cat": "What Strategy Is",
  "title": "Henderson on Enlarging the Advantage",
  "question": "Bruce Henderson writes that the differences between you and your competitors are the basis for your advantage, and that the objective is to enlarge its scope. With what qualification?",
  "options": {
   "A": "That it can only happen at someone else's expense.",
   "B": "That it can only happen in a growing market.",
   "C": "That it can only happen with top management involvement.",
   "D": "That it can only happen once the plan is written down."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Henderson, in The Origin of Strategy (1989): strategy is a deliberate search for a plan of action that will develop a business's competitive advantage and compound it; the differences between you and your competitors are the basis for your advantage; and the objective is to enlarge the scope of your advantage, which can only happen at someone else's expense.",
   "B": "Incorrect. Market growth is not the qualification in the quote; competition is.",
   "C": "Incorrect. Top management involvement belongs to the definition of a strategic decision, not to this quote.",
   "D": "Incorrect. Nothing in the quote depends on the plan being documented."
  },
  "recap": "Correct. Henderson, in The Origin of Strategy (1989): strategy is a deliberate search for a plan of action that will develop a business's competitive advantage and compound it; the differences between you and your competitors are the basis for your advantage; and the objective is to enlarge the scope of your advantage, which can only happen at someone else's expense."
 },
 {
  "cat": "What Strategy Is",
  "title": "Where the Definition of Strategy Starts",
  "question": "The lecture says that to define strategy operationally we should position ourselves in the realm of decisions. Why does that order matter?",
  "options": {
   "A": "Because decisions are easier to count than plans.",
   "B": "Because strategy is defined and made of a set of strategic decisions, so defining the building block has to come before defining the whole.",
   "C": "Because only decisions taken by top management are observable.",
   "D": "Because tactics cannot be defined until strategy has been."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Countability is not the reason given.",
   "B": "Correct. The starting assumption is that strategy is defined and made of a set of strategic decisions. That is why the lectures define a strategic decision first, as against a tactical one, and only then arrive at strategy as an integrated, comprehensive plan integrating a consistent set of those decisions.",
   "C": "Incorrect. Top management involvement is a feature of strategic decisions, not the reason for starting from decisions.",
   "D": "Incorrect. The two are defined together, by contrast with each other."
  },
  "recap": "Correct. The starting assumption is that strategy is defined and made of a set of strategic decisions. That is why the lectures define a strategic decision first, as against a tactical one, and only then arrive at strategy as an integrated, comprehensive plan integrating a consistent set of those decisions."
 },
 {
  "cat": "Strategy Process",
  "title": "The Five Macro-Phases",
  "question": "Which sequence describes the business strategy formulation process as the lecture presents it?",
  "options": {
   "A": "Analysis, Decision-making, Implementation, Control.",
   "B": "Orientation, Analysis or Diagnosis, Decision-making, Implementation, Control.",
   "C": "Diagnosis, Strategy formulation, Actions implementation.",
   "D": "Vision, Mission, Objectives, SWOT, Budget."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Orientation, where vision, mission and objectives are set, comes first and is missing here.",
   "B": "Correct. The process is made of steps belonging to five macro-phases: Orientation, also called direction setting; Analysis or Diagnosis; Decision-making; Implementation; and Control or Monitoring.",
   "C": "Incorrect. That is the three-phase grouping used on the slides; the business-level lecture names five.",
   "D": "Incorrect. Those are elements inside the phases, not the phases themselves."
  },
  "recap": "Correct. The process is made of steps belonging to five macro-phases: Orientation, also called direction setting; Analysis or Diagnosis; Decision-making; Implementation; and Control or Monitoring."
 },
 {
  "cat": "Strategy Process",
  "title": "What the SBU Receives",
  "question": "How does a Strategic Business Unit's business strategy connect to the corporate level?",
  "options": {
   "A": "The SBU formulates its own goals independently and reports results upwards.",
   "B": "The SBU receives general goals and resources, or a budget to reach them, from the corporate strategy, and formulates its business strategy accordingly.",
   "C": "The corporate strategy formulates the business strategy and the SBU only implements it.",
   "D": "The SBU sets the corporate goals, since it is closest to the market."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The goals come from above; what the SBU decides is how to reach them in its business area.",
   "B": "Correct. Each SBU receives general goals and resources, or a budget to reach those goals, from the corporate strategy, and formulates its business strategy accordingly. Orientation then translates those corporate goals and directions into the specific business area.",
   "C": "Incorrect. Formulating the business strategy is precisely the SBU's job, within the goals handed down.",
   "D": "Incorrect. Deciding which industries to be in is the corporate level's question, not the SBU's."
  },
  "recap": "Correct. Each SBU receives general goals and resources, or a budget to reach those goals, from the corporate strategy, and formulates its business strategy accordingly. Orientation then translates those corporate goals and directions into the specific business area."
 },
 {
  "cat": "Strategy Process",
  "title": "The Three Axes of the Abell Cube",
  "question": "The Abell Cube defines a business area in three dimensions. Which?",
  "options": {
   "A": "Customers, competitors and suppliers.",
   "B": "Strengths, weaknesses and opportunities.",
   "C": "Customer groups, customer functions, and the alternative technologies available to provide those functions.",
   "D": "Price, quality and volume."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Competitors and suppliers belong to the external environment, not to the cube's axes.",
   "B": "Incorrect. Those are SWOT elements, which come later, in the diagnosis phase.",
   "C": "Correct. The Abell Cube gives a three-dimensional definition of the business: customer groups, answering who the competitors in the industry serve; customer functions, meaning what customer needs the offer satisfies; and the alternative technologies available to provide those functions through different products and services. Their intersection delimits the business area.",
   "D": "Incorrect. Those are competitive variables inside a business area, not the dimensions that define it."
  },
  "recap": "Correct. The Abell Cube gives a three-dimensional definition of the business: customer groups, answering who the competitors in the industry serve; customer functions, meaning what customer needs the offer satisfies; and the alternative technologies available to provide those functions through different products and services. Their intersection delimits the business area."
 },
 {
  "cat": "Strategy Process",
  "title": "Whose Standpoint in External Analysis",
  "question": "When carrying out external strategy analysis, whose point of view should be taken?",
  "options": {
   "A": "Your own company's, since the analysis serves its strategy.",
   "B": "The largest competitor's, since it sets the standard.",
   "C": "The customers', since they decide what succeeds.",
   "D": "The average generic player in the business area, so that opportunities and threats are industry-wise rather than firm-wise."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Taking your own standpoint is exactly the mistake: it turns industry trends into firm-specific judgements and empties the distinction from internal analysis.",
   "B": "Incorrect. No single competitor's view is the reference; the generic average player is.",
   "C": "Incorrect. Customers are part of the external environment being analysed, not the vantage point.",
   "D": "Correct. In external strategy analysis the point of view is that of the average generic player in the business area, not of your own company, so the opportunities and threats drawn should apply to any competitor operating in the industry."
  },
  "recap": "Correct. In external strategy analysis the point of view is that of the average generic player in the business area, not of your own company, so the opportunities and threats drawn should apply to any competitor operating in the industry."
 },
 {
  "cat": "Strategy Process",
  "title": "How Internal Analysis Finds Strengths",
  "question": "By what means does internal strategy analysis identify a company's strengths and weaknesses?",
  "options": {
   "A": "By comparing the company with its main direct competitors through benchmarking.",
   "B": "By listing every resource the company owns.",
   "C": "By surveying employees about the company's qualities.",
   "D": "By projecting the industry's trends onto the company."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Internal strategy analysis focuses on one specific company in the business area and compares it with its main direct competitors by means of benchmarking, disclosing the firm-specific characteristics that give it an edge or the negative gaps to be filled. Those are the possible sources of competitive advantage or disadvantage.",
   "B": "Incorrect. A resource shared by every competitor is neither a strength nor a weakness, because it creates no gap.",
   "C": "Incorrect. The method named is benchmarking against competitors, not internal opinion.",
   "D": "Incorrect. Projecting industry trends is external analysis."
  },
  "recap": "Correct. Internal strategy analysis focuses on one specific company in the business area and compares it with its main direct competitors by means of benchmarking, disclosing the firm-specific characteristics that give it an edge or the negative gaps to be filled. Those are the possible sources of competitive advantage or disadvantage."
 },
 {
  "cat": "Strategy Process",
  "title": "What the SWOT Is For",
  "question": "Why does the lecture call the SWOT the core of the business-level formulation process?",
  "options": {
   "A": "Because it summarises the diagnosis in a form that is easy to communicate.",
   "B": "Because the business strategy itself arises from crossing its four elements.",
   "C": "Because it replaces the external and internal analyses.",
   "D": "Because it quantifies the strategic objectives."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Ease of use is mentioned, but it is not why the SWOT is called the core.",
   "B": "Correct. By crossing external opportunities and threats with internal strengths and weaknesses, the company sees which strengths to leverage to exploit an opportunity, which strengths defend against a threat, and which weaknesses stop it exploiting an opportunity or intensify a threat. The business strategy arises from those combined perspectives.",
   "C": "Incorrect. It combines them; it is built from their outputs.",
   "D": "Incorrect. Quantification is the job of the SMART objectives set in orientation."
  },
  "recap": "Correct. By crossing external opportunities and threats with internal strengths and weaknesses, the company sees which strengths to leverage to exploit an opportunity, which strengths defend against a threat, and which weaknesses stop it exploiting an opportunity or intensify a threat. The business strategy arises from those combined perspectives."
 },
 {
  "cat": "Strategy Process",
  "title": "Is a SWOT Combination a Strategic Decision",
  "question": "A company decides to exploit an identified opportunity by leveraging one of its strengths. Is that a strategic decision?",
  "options": {
   "A": "No, because it follows mechanically from the SWOT.",
   "B": "No, because it concerns only one function.",
   "C": "Yes: it is long term, requires large investments and resources, is cross-functional and is hardly reversible.",
   "D": "Only if the board formally approves it."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The SWOT suggests the combination, but committing to it is a decision with all the strategic characteristics.",
   "B": "Incorrect. The lecture describes such a decision as cross-functional, which is the opposite.",
   "C": "Correct. Exploiting an opportunity with a strength is a strategic decision, since it is long term, it requires lots of investments and resources, it is cross-functional and it is hardly reversible. The overall set of such decisions is what constitutes the business strategy.",
   "D": "Incorrect. Approval is not among the criteria; the nature of the decision is."
  },
  "recap": "Correct. Exploiting an opportunity with a strength is a strategic decision, since it is long term, it requires lots of investments and resources, it is cross-functional and it is hardly reversible. The overall set of such decisions is what constitutes the business strategy."
 },
 {
  "cat": "Strategy Process",
  "title": "Choosing Among Alternatives",
  "question": "Not every strategic alternative can be implemented. On what is the selection based, and who ultimately makes it?",
  "options": {
   "A": "On consistency with vision, mission and goals, on the budget available, and on the contribution to value creation through competitive advantage; ultimately it rests on the entrepreneur's or manager's strategic acumen.",
   "B": "Purely on the results of the sensitivity analysis, which ranks the alternatives.",
   "C": "On which alternative the SWOT identifies first.",
   "D": "On the corporate strategy, which selects for the SBU."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Alternatives are assessed on their consistency with the vision, mission and goals, on the resources available in terms of budget, and on their contribution to the ultimate goal of value creation by means of competitive advantage. Scenario analysis, economic and financial forecasts and sensitivity analysis support the assessment, but since this is the heart of the decision-making role it is the entrepreneur's or manager's strategic and entrepreneurial acumen that determines the choice.",
   "B": "Incorrect. The tools inform the decision; they do not settle it.",
   "C": "Incorrect. Order of appearance is not a criterion, and alternatives may be mutually exclusive.",
   "D": "Incorrect. The corporate level hands down goals and budget; the selection happens at business level."
  },
  "recap": "Correct. Alternatives are assessed on their consistency with the vision, mission and goals, on the resources available in terms of budget, and on their contribution to the ultimate goal of value creation by means of competitive advantage. Scenario analysis, economic and financial forecasts and sensitivity analysis support the assessment, but since this is the heart of the decision-making role it is the entrepreneur's or manager's strategic and entrepreneurial acumen that determines the choice."
 },
 {
  "cat": "Strategy Process",
  "title": "What Implementation Consists Of",
  "question": "How is a selected business strategy executed?",
  "options": {
   "A": "Through a single cross-functional project owned by top management.",
   "B": "Through a number of consistent tactical choices, chained to one another, reaching into each function or unit.",
   "C": "Through a new SWOT analysis carried out at functional level.",
   "D": "Through the annual budgeting variance analysis."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Execution reaches into each given function or unit rather than being concentrated in one project.",
   "B": "Correct. The strategy is executed by means of a number of consistent tactical choices, chained to one another, that should lead to achieving the overall strategic objectives. Execution gets strategy down to the basics and encompasses decisions in each given function or unit.",
   "C": "Incorrect. The SWOT belongs to the diagnosis phase, before decision-making.",
   "D": "Incorrect. Variance analysis is the control step of the monitoring phase, which comes after implementation."
  },
  "recap": "Correct. The strategy is executed by means of a number of consistent tactical choices, chained to one another, that should lead to achieving the overall strategic objectives. Execution gets strategy down to the basics and encompasses decisions in each given function or unit."
 },
 {
  "cat": "Strategy Process",
  "title": "Which Framework Supports Execution",
  "question": "Which framework does the lecture name as widely employed to support strategy implementation?",
  "options": {
   "A": "The Abell Cube.",
   "B": "The SWOT matrix.",
   "C": "The business model, which considers the implications of the business strategy on a unified set of building blocks and parameters.",
   "D": "Benchmarking against direct competitors."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The Abell Cube defines the boundaries of the business area, in the orientation phase.",
   "B": "Incorrect. The SWOT belongs to diagnosis and to generating alternatives.",
   "C": "Correct. To support strategy execution managers may resort to different models, and the framework widely employed is the business model, which considers the implications of a company's business strategy on a unified set of building blocks and parameters.",
   "D": "Incorrect. Benchmarking is the method of internal strategy analysis."
  },
  "recap": "Correct. To support strategy execution managers may resort to different models, and the framework widely employed is the business model, which considers the implications of a company's business strategy on a unified set of building blocks and parameters."
 },
 {
  "cat": "Strategy Process",
  "title": "What Monitoring Produces",
  "question": "The monitoring macro-phase compares results obtained with goals planned. What can follow from it?",
  "options": {
   "A": "Only a report to the corporate level, with no effect on the strategy.",
   "B": "Either confirmation of the long-term goals set in orientation, or a strategic re-planning that may require new objectives and even a new vision, mission and SWOT.",
   "C": "An automatic revision of the budget for the following year.",
   "D": "A change of the business area boundaries defined by the Abell Cube."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The phase exists to feed back into the strategy, not only to report.",
   "B": "Correct. Monitoring is usually run annually and executed through a control step corresponding to budgeting variance analysis, quantifying the delta between expected and achieved performance and its cause. It may confirm the long-term goals set in the orientation phase or trigger a strategic re-planning involving new objectives and possibly a new vision, mission and SWOT.",
   "C": "Incorrect. Variance analysis is the method of the control step, not an automatic budget revision.",
   "D": "Incorrect. Redefining the business area may be part of a re-planning, but it is not the stated outcome."
  },
  "recap": "Correct. Monitoring is usually run annually and executed through a control step corresponding to budgeting variance analysis, quantifying the delta between expected and achieved performance and its cause. It may confirm the long-term goals set in the orientation phase or trigger a strategic re-planning involving new objectives and possibly a new vision, mission and SWOT."
 },
 {
  "cat": "Strategy Process",
  "title": "How Linear the Process Really Is",
  "question": "The five macro-phases are presented in sequence. How linear is the process in practice?",
  "options": {
   "A": "Strictly linear: each phase must be completed before the next begins.",
   "B": "Linear only in ideal conditions where no feedback or feedforward is needed; in real cases one may go back to a step or jump another, and what matters is that all steps are considered at least once.",
   "C": "Entirely unordered: the phases can be run in any sequence with the same result.",
   "D": "Linear at business level but circular at corporate level."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The lecture explicitly says the process is far from being that straightforward.",
   "B": "Correct. A waterfall sequence only happens in ideal conditions, where no feedback or feedforward is needed. In real cases one may have to go back to one step, jump another, and so on. The important thing is that all the steps are considered at least once and lead to a strategy achieving competitive advantage in the company's business.",
   "C": "Incorrect. There is an order; what the caveat allows is departing from it, not ignoring it.",
   "D": "Incorrect. No such contrast between the levels is drawn."
  },
  "recap": "Correct. A waterfall sequence only happens in ideal conditions, where no feedback or feedforward is needed. In real cases one may have to go back to one step, jump another, and so on. The important thing is that all the steps are considered at least once and lead to a strategy achieving competitive advantage in the company's business."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Vision in the Business-Strategy Sense",
  "question": "In the business strategy formulation process, what is the vision, and what is its other name?",
  "options": {
   "A": "The company's own future dream, also known as its aspiration.",
   "B": "The long term view on the best possible evolution of the business area, also known as industry foresight.",
   "C": "The strategic role the company wishes to play, also known as strategic intent.",
   "D": "The set of measurable milestones for the coming years, also known as strategic objectives."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the general definition of vision used elsewhere in the chapter, not the one in the business strategy process.",
   "B": "Correct. At business-strategy level the vision is the long term view on the best possible evolution of the business area the company operates in or will operate in. It describes how the industry will positively evolve and draws a path the company and its competitors may follow, which is why it is also known as industry foresight.",
   "C": "Incorrect. That is the mission on this reading, also called strategic intent.",
   "D": "Incorrect. Those are the strategic objectives, introduced as the third concept of orientation."
  },
  "recap": "Correct. At business-strategy level the vision is the long term view on the best possible evolution of the business area the company operates in or will operate in. It describes how the industry will positively evolve and draws a path the company and its competitors may follow, which is why it is also known as industry foresight."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Which One Can Be Shared with Competitors",
  "question": "In the business-strategy reading, one of vision and mission is industry-specific and the other firm-specific. Which way round, and what follows?",
  "options": {
   "A": "The vision is industry-specific and may be shared with competitors; the mission is firm-specific and states the role this company wants to play.",
   "B": "The mission is industry-specific and may be shared; the vision is firm-specific.",
   "C": "Both are firm-specific, which is why they must not overlap.",
   "D": "Both are industry-specific, since they describe the business area."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The vision embraces the business area's evolution and might be shared by other competitors too, while the mission is firm-specific: it tells the company how it should develop its strategy according to the trends foreseen by the vision.",
   "B": "Incorrect. The two are inverted: it is the view of the industry's evolution that can be common.",
   "C": "Incorrect. The vision concerns the industry, so it is not firm-specific on this reading.",
   "D": "Incorrect. The mission names the role of one company within the path, which makes it firm-specific."
  },
  "recap": "Correct. The vision embraces the business area's evolution and might be shared by other competitors too, while the mission is firm-specific: it tells the company how it should develop its strategy according to the trends foreseen by the vision."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Reading the Microsoft Example",
  "question": "«A chicken in every oven, and a computer in every house» is given as Microsoft's vision in the late 1980s. What made it a vision rather than a mission, and why did it matter?",
  "options": {
   "A": "It named a market share target, which competitors could not match.",
   "B": "It described the company's internal values, which shaped its culture.",
   "C": "It was a claim about how the industry would evolve — computers becoming everyday objects in homes — which differed from competitors who expected computers to stay in the corporate world.",
   "D": "It was a mission, since it describes what Microsoft did."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. No target is named, and the statement is about the industry's evolution rather than a share of it.",
   "B": "Incorrect. Values and culture are a separate concept in the chapter.",
   "C": "Correct. The vision implied that wealth would spread, that the resulting surplus would go to more refined needs met by consumer electronics, and so that personal computers could become objects used daily. That differed from competitors who believed computers would find their way into the corporate world rather than individual homes, and it set the path Microsoft's strategy followed. The matching mission would have been to become the leader in the personal computers business area.",
   "D": "Incorrect. The statement describes the industry's future, not the role Microsoft would play in it."
  },
  "recap": "Correct. The vision implied that wealth would spread, that the resulting surplus would go to more refined needs met by consumer electronics, and so that personal computers could become objects used daily. That differed from competitors who believed computers would find their way into the corporate world rather than individual homes, and it set the path Microsoft's strategy followed. The matching mission would have been to become the leader in the personal computers business area."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Why Objectives Are Needed at All",
  "question": "Vision and mission both have a long-term motivational role. Why does the orientation phase add strategic objectives?",
  "options": {
   "A": "Because vision and mission are not enough to set the boundaries and targets for strategy formulation.",
   "B": "Because vision and mission are optional in practice.",
   "C": "Because objectives replace the vision once the strategy is under way.",
   "D": "Because the corporate level requires them for reporting."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. While both the vision and the mission have a long-term motivational role, they are not enough to set the boundaries and targets for strategy formulation, so strategic objectives are introduced. They steer the whole process — analysis, decision-making, implementation and above all control — and they are the means to get the mission down to earth as measurable, quantifiable milestones.",
   "B": "Incorrect. Both are described as essential and complementary in formulation.",
   "C": "Incorrect. They translate the mission rather than replacing the vision.",
   "D": "Incorrect. The reason given is internal to the formulation process, not a reporting requirement."
  },
  "recap": "Correct. While both the vision and the mission have a long-term motivational role, they are not enough to set the boundaries and targets for strategy formulation, so strategic objectives are introduced. They steer the whole process — analysis, decision-making, implementation and above all control — and they are the means to get the mission down to earth as measurable, quantifiable milestones."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What SMART Stands For",
  "question": "Which set matches the five features a strategic objective must have?",
  "options": {
   "A": "Simple, Measurable, Ambitious, Recorded, Transparent.",
   "B": "Specific, Measurable, Appropriate, Realistic, Timely.",
   "C": "Strategic, Managerial, Achievable, Relevant, Tactical.",
   "D": "Specific, Motivating, Aligned, Rewarded, Tracked."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The first feature is specific rather than simple, and the last two are not among the five.",
   "B": "Correct. Specific, so it conveys a clear message on what is to be achieved; Measurable and quantifiable through clear indicators; Appropriate or aligned, consistent with the overarching vision and mission; Realistic, challenging but neither impossible nor too easy; and Timely, tied to a clear deadline.",
   "C": "Incorrect. Those words do not match the acronym as the lecture spells it out.",
   "D": "Incorrect. Only the first is right; the remaining four are not the features listed."
  },
  "recap": "Correct. Specific, so it conveys a clear message on what is to be achieved; Measurable and quantifiable through clear indicators; Appropriate or aligned, consistent with the overarching vision and mission; Realistic, challenging but neither impossible nor too easy; and Timely, tied to a clear deadline."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "What Realistic Means in SMART",
  "question": "Goal setting theory is invoked for the R in SMART. What does it prescribe?",
  "options": {
   "A": "Objectives that are easy enough to be certain of achievement.",
   "B": "Objectives set as high as possible, so that even partial achievement is valuable.",
   "C": "Objectives that are challenging but perceived as neither impossible nor too easy, because both extremes demotivate.",
   "D": "Objectives revised whenever they turn out to be hard."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. An objective that is too easy demotivates, just as an impossible one does.",
   "B": "Incorrect. An objective perceived as impossible is explicitly ruled out.",
   "C": "Correct. Goal setting theory tells managers to set objectives that are challenging but not perceived as either impossible or too easy, because both ways lead to demotivation. Realistic therefore does not mean easy.",
   "D": "Incorrect. Revision on difficulty is not what the feature prescribes; the objective should be challenging by design."
  },
  "recap": "Correct. Goal setting theory tells managers to set objectives that are challenging but not perceived as either impossible or too easy, because both ways lead to demotivation. Realistic therefore does not mean easy."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Two Definitions of Vision in One Chapter",
  "question": "A question asks what a company's vision is. The chapter supports two different answers. What distinguishes them?",
  "options": {
   "A": "Nothing: the two formulations say the same thing in different words.",
   "B": "One applies to listed companies and the other to private ones.",
   "C": "One is older and has been superseded by the other.",
   "D": "In the general definitions the vision is the company's own future dream, what it wishes to be like in some years' time; in the business strategy process it is industry foresight, a view on how the business area will evolve, which competitors could share."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. They differ on what the statement is about: the company itself in one case, the industry in the other.",
   "B": "Incorrect. No such distinction by company type is made.",
   "C": "Incorrect. Both are presented in the same chapter, at different levels of the discussion.",
   "D": "Correct. The general definitions make the vision the company's own aspiration and the mission its present business scope. The business strategy process makes the vision industry foresight and the mission strategic intent, the role the firm wants to play within the path the vision draws. The tell is whether the statement describes the industry's future or the company's own."
  },
  "recap": "Correct. The general definitions make the vision the company's own aspiration and the mission its present business scope. The business strategy process makes the vision industry foresight and the mission strategic intent, the role the firm wants to play within the path the vision draws. The tell is whether the statement describes the industry's future or the company's own."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Getting the Mission Down to Earth",
  "question": "The lecture describes SMART objectives as a means to get the mission down to earth. What does that mean in practice?",
  "options": {
   "A": "Translating the mission into a set of measurable and quantifiable milestones.",
   "B": "Replacing the mission with a shorter statement everyone can remember.",
   "C": "Delegating the mission to the functional level.",
   "D": "Restating the mission in the language of the industry's evolution."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. SMART objectives are a means to get the mission down to earth, to translate it into a set of measurable and quantifiable milestones. That is also what makes the control phase possible, since results need something to be compared against.",
   "B": "Incorrect. The mission is not replaced; it is made operational.",
   "C": "Incorrect. Delegation to functions happens at implementation, through tactical choices.",
   "D": "Incorrect. Restating it in industry terms would move it towards the vision, not towards measurable targets."
  },
  "recap": "Correct. SMART objectives are a means to get the mission down to earth, to translate it into a set of measurable and quantifiable milestones. That is also what makes the control phase possible, since results need something to be compared against."
 },
 {
  "cat": "External Analysis",
  "title": "Matching the Lens to the Question",
  "question": "You want to understand how profits are distributed along your industry's supply chain. Which of the five lenses applies?",
  "options": {
   "A": "STEEP analysis.",
   "B": "Porter's five forces model.",
   "C": "Profit pool mapping.",
   "D": "Customer segmentation."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. STEEP covers the big picture outside the industry: social, technological, economic, ecological and political factors.",
   "B": "Incorrect. The five forces model explains the attractiveness of the business area, not how profit is spread along its chain.",
   "C": "Correct. Understanding the supply chain is the job of profit pool mapping, which plots the vertical structure of profitability stage by stage.",
   "D": "Incorrect. Segmentation belongs to understanding the customers."
  },
  "recap": "Correct. Understanding the supply chain is the job of profit pool mapping, which plots the vertical structure of profitability stage by stage."
 },
 {
  "cat": "External Analysis",
  "title": "What Attractiveness Measures",
  "question": "How is the attractiveness of a business area defined?",
  "options": {
   "A": "The profitability of the leading company in the area.",
   "B": "The average profitability and growth of the companies operating in the business area, both current and future.",
   "C": "The growth rate of the total market this year.",
   "D": "The number of competitors relative to the number of customers."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Attractiveness is a property of the arena, measured on the average rather than on the best performer.",
   "B": "Correct. The attractiveness of a business area is the average profitability and growth of the companies operating in it, both current and future.",
   "C": "Incorrect. Growth is part of it but so is profitability, and both are considered current and future.",
   "D": "Incorrect. Concentration is a determinant of rivalry, not the definition of attractiveness."
  },
  "recap": "Correct. The attractiveness of a business area is the average profitability and growth of the companies operating in it, both current and future."
 },
 {
  "cat": "External Analysis",
  "title": "The Three Outputs",
  "question": "What does external analysis lead to?",
  "options": {
   "A": "Strengths, weaknesses and strategic resources.",
   "B": "Key success factors, opportunities and threats.",
   "C": "Vision, mission and strategic objectives.",
   "D": "Strategic groups, segments and profit pools."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Strengths, weaknesses and strategic resources come from internal analysis.",
   "B": "Correct. The external analysis leads to identifying key success factors, opportunities and threats.",
   "C": "Incorrect. Those belong to the orientation phase, before any analysis.",
   "D": "Incorrect. Those are tools and intermediate outputs within the analysis, not its three stated outcomes."
  },
  "recap": "Correct. The external analysis leads to identifying key success factors, opportunities and threats."
 },
 {
  "cat": "External Analysis",
  "title": "Where Key Success Factors Come From",
  "question": "Key success factors are derived by crossing two analyses. Which, and what does each ask?",
  "options": {
   "A": "Analysis of demand, asking what customers want; and analysis of competition, asking how firms survive competition.",
   "B": "Internal analysis, asking what we have; and external analysis, asking what the market offers.",
   "C": "STEEP analysis and five forces analysis.",
   "D": "Segmentation and strategic group analysis."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The analysis of demand asks who our customers are and what they want. The analysis of competition asks what drives competition, what the main dimensions of competition are and how intense it is. Crossing the two prerequisites gives the key success factors.",
   "B": "Incorrect. Key success factors are derived entirely within external analysis; internal analysis produces strengths and weaknesses.",
   "C": "Incorrect. Those are two tools of external analysis, not the two questions the KSF scheme crosses.",
   "D": "Incorrect. Segmentation and strategic groups divide markets and competitors; they do not define what it takes to succeed."
  },
  "recap": "Correct. The analysis of demand asks who our customers are and what they want. The analysis of competition asks what drives competition, what the main dimensions of competition are and how intense it is. Crossing the two prerequisites gives the key success factors."
 },
 {
  "cat": "External Analysis",
  "title": "Key Success Factors by Segment",
  "question": "In the airline example, why are two different sets of key success factors given?",
  "options": {
   "A": "Because the industry spans several countries with different regulations.",
   "B": "Because the economy and business segments want different things, so lean and efficient processes and low operational costs serve one while on-board services serve the other.",
   "C": "Because key success factors change every year.",
   "D": "Because one set applies to incumbents and the other to new entrants."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The split given is by customer segment, not by geography.",
   "B": "Correct. Customers want low price, and comfort in the business segment. The economy segment therefore needs lean and efficient processes and low operational costs, while the business segment needs on-board services, which is service differentiation supported by loyalty.",
   "C": "Incorrect. Nothing in the example turns on the passage of time.",
   "D": "Incorrect. Key success factors are prerequisites for success in the arena and apply to any competitor in it."
  },
  "recap": "Correct. Customers want low price, and comfort in the business segment. The economy segment therefore needs lean and efficient processes and low operational costs, while the business segment needs on-board services, which is service differentiation supported by loyalty."
 },
 {
  "cat": "External Analysis",
  "title": "Is It an Opportunity or a Strength",
  "question": "An airline notes that the tourism market is growing, and separately that its own fleet is the youngest in the industry. Where does each belong?",
  "options": {
   "A": "Both are opportunities from the external analysis.",
   "B": "Both are strengths from the internal analysis.",
   "C": "Market growth is an opportunity from external analysis; the young fleet is a strength from internal analysis.",
   "D": "Market growth is a key success factor; the young fleet is an opportunity."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The fleet belongs to one specific airline, which makes it internal.",
   "B": "Incorrect. Market growth applies to every competitor in the industry, which makes it external.",
   "C": "Correct. Market growth, especially in the tourism sector, is listed as an opportunity for the airline industry: it holds for any competitor. A fleet that is the youngest in the industry is a firm-specific characteristic disclosed by internal analysis against direct competitors.",
   "D": "Incorrect. A key success factor is a prerequisite for success in the arena, not a favourable trend, and the fleet is not external."
  },
  "recap": "Correct. Market growth, especially in the tourism sector, is listed as an opportunity for the airline industry: it holds for any competitor. A fleet that is the youngest in the industry is a firm-specific characteristic disclosed by internal analysis against direct competitors."
 },
 {
  "cat": "External Analysis",
  "title": "Reading a Segment's Behaviour",
  "question": "In the airline segmentation, what distinguishes business travellers from the other two segments?",
  "options": {
   "A": "They are the most price sensitive of the three.",
   "B": "The choice of airline is made organisation-wide rather than by the individual traveller, and they tend to be loyal to few airlines.",
   "C": "They travel least frequently.",
   "D": "They perceive little difference between airlines."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Price sensitivity characterises regular travellers and, most of all, the budget conscious.",
   "B": "Correct. Business customers make an organization-wide decision as to the choice of airline, rather than the individual traveller being involved in the purchase decision; they fly business class and tend to be loyal to few airlines.",
   "C": "Incorrect. Infrequent travel describes the budget conscious segment.",
   "D": "Incorrect. Perceiving little difference between airlines is what the deck says of the budget conscious."
  },
  "recap": "Correct. Business customers make an organization-wide decision as to the choice of airline, rather than the individual traveller being involved in the purchase decision; they fly business class and tend to be loyal to few airlines."
 },
 {
  "cat": "External Analysis",
  "title": "The Standpoint of the Whole Exercise",
  "question": "Across all five lenses, whose situation is external analysis describing?",
  "options": {
   "A": "The industry and its environment, so that the findings hold for any competitor in the business area.",
   "B": "Your own company, since the analysis exists to serve its strategy.",
   "C": "The market leader, which sets the terms for everyone else.",
   "D": "The customers, whose preferences determine everything else."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. External analysis takes the industry and its environment as its subject, which is why its outputs are key success factors, opportunities and threats: things that apply to any competitor operating in the business area rather than to one firm.",
   "B": "Incorrect. Describing your own firm is internal analysis, which compares it to direct competitors by benchmarking.",
   "C": "Incorrect. No single firm's standpoint is taken, the leader's included.",
   "D": "Incorrect. Customers are one of the five lenses, not the vantage point of the whole analysis."
  },
  "recap": "Correct. External analysis takes the industry and its environment as its subject, which is why its outputs are key success factors, opportunities and threats: things that apply to any competitor operating in the business area rather than to one firm."
 },
 {
  "cat": "STEEP",
  "title": "What STEEP Stands For",
  "question": "Which five groups of variables does STEEP cover?",
  "options": {
   "A": "Social, Technological, Economic, Ecological, Political.",
   "B": "Strategic, Tactical, Economic, Environmental, Political.",
   "C": "Social, Technical, Ethical, Environmental, Political.",
   "D": "Supply, Technology, Entry, Exit, Price."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. STEEP groups the context variables into Social, Technological, Economic, Ecological and Political.",
   "B": "Incorrect. Strategic and tactical are levels of decision, not categories of context variables.",
   "C": "Incorrect. The categories are ecological and technological, and there is no ethical heading.",
   "D": "Incorrect. Those are elements of the five forces model, not of STEEP."
  },
  "recap": "Correct. STEEP groups the context variables into Social, Technological, Economic, Ecological and Political."
 },
 {
  "cat": "STEEP",
  "title": "Sorting a Variable into STEEP",
  "question": "Exchange rates, environmental protection laws, consumer activism and tariffs. Which categories do they belong to?",
  "options": {
   "A": "All four are political and legal.",
   "B": "Economic, ecological, socio-cultural and political respectively.",
   "C": "Economic, political, political and economic respectively.",
   "D": "Ecological, ecological, socio-cultural and economic respectively."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Only tariffs sit under political and legal; the other three are spread across three different headings.",
   "B": "Correct. Exchange rates are economic, alongside growth rates, interest rates, inflation and employment level. Environmental protection laws are ecological. Consumer activism is socio-cultural, listed with class actions and media campaigns. Tariffs are political and legal.",
   "C": "Incorrect. Environmental protection laws are classified as ecological despite being legislation, and consumer activism is behaviour rather than regulation.",
   "D": "Incorrect. Exchange rates are economic, not ecological, and tariffs are political."
  },
  "recap": "Correct. Exchange rates are economic, alongside growth rates, interest rates, inflation and employment level. Environmental protection laws are ecological. Consumer activism is socio-cultural, listed with class actions and media campaigns. Tariffs are political and legal."
 },
 {
  "cat": "STEEP",
  "title": "How Factors Are Rated",
  "question": "In the practical method, how is each STEEP factor assessed?",
  "options": {
   "A": "By a yes or no judgement on whether it will occur.",
   "B": "By a probability of occurrence in per cent and a rating of its impact in the coming three to five years, from -5 for terrible to +5 for fantastic.",
   "C": "By its financial value in euros over the next year.",
   "D": "By ranking the factors from most to least important."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A binary judgement would lose the probability, which is one of the two axes the analysis plots.",
   "B": "Correct. The practical way of carrying out the analysis is to identify each possible factor and give it a probability of occurrence in per cent together with a rating for its impact in the coming 3-5 years, where -5 is terrible and +5 is fantastic.",
   "C": "Incorrect. The impact scale is a signed rating, not a monetary amount, and the horizon is three to five years.",
   "D": "Incorrect. Ranking would lose both the probability and the sign of the impact."
  },
  "recap": "Correct. The practical way of carrying out the analysis is to identify each possible factor and give it a probability of occurrence in per cent together with a rating for its impact in the coming 3-5 years, where -5 is terrible and +5 is fantastic."
 },
 {
  "cat": "STEEP",
  "title": "Reading the Threats and Opportunities Chart",
  "question": "On the chart used to plot rated STEEP factors, what are the two axes and what separates threats from opportunities?",
  "options": {
   "A": "Probability of change against impact; the sign of the impact separates threats, on the negative side, from opportunities, on the positive side.",
   "B": "Time against cost; anything above the break-even line is an opportunity.",
   "C": "Impact against industry attractiveness; the more attractive the industry the fewer the threats.",
   "D": "Probability against cost of response; expensive responses mark threats."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Probability of change runs on the vertical axis from 0 to 100 per cent and impact on the horizontal axis from -5 to +5. Negative impacts fall on the threats side and positive ones on the opportunities side, so position combines how likely a factor is with how good or bad it would be.",
   "B": "Incorrect. Neither time nor cost is an axis of this chart.",
   "C": "Incorrect. Attractiveness comes from the five forces model, not from the STEEP plot.",
   "D": "Incorrect. The response is recorded in the table of factors, but it is not an axis."
  },
  "recap": "Correct. Probability of change runs on the vertical axis from 0 to 100 per cent and impact on the horizontal axis from -5 to +5. Negative impacts fall on the threats side and positive ones on the opportunities side, so position combines how likely a factor is with how good or bad it would be."
 },
 {
  "cat": "STEEP",
  "title": "Where Urbanisation Belongs and Why It Matters",
  "question": "Urbanisation is listed as a socio-cultural variable. Which mechanism does the deck give for why cities matter economically?",
  "options": {
   "A": "They concentrate government spending.",
   "B": "They reduce transport costs for manufacturers.",
   "C": "They harness economies of scale and add value by attracting talent and ideas, sharing knowledge and supporting business development.",
   "D": "They lower the cost of housing as supply grows."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Public spending is not the mechanism named.",
   "B": "Incorrect. Transport costs are not the explanation given.",
   "C": "Correct. Cities stay at the heart of any economic development because they harness the power of economies of scale and add value for people and companies thanks to their ability to attract talent and ideas, share knowledge and support business development. The deck adds that cities generate 85 per cent of the world's GDP and that 1.5 million people migrate to cities every week.",
   "D": "Incorrect. Housing cost is not among the reasons listed."
  },
  "recap": "Correct. Cities stay at the heart of any economic development because they harness the power of economies of scale and add value for people and companies thanks to their ability to attract talent and ideas, share knowledge and support business development. The deck adds that cities generate 85 per cent of the world's GDP and that 1.5 million people migrate to cities every week."
 },
 {
  "cat": "STEEP",
  "title": "Where Population Growth Happens",
  "question": "According to the demographic trends given, where does population growth come from, and what happens in developed economies?",
  "options": {
   "A": "Emerging or developing countries produce 97 per cent of the growth, while in developed economies people live longer and have fewer children, making the over-65s the fastest growing segment.",
   "B": "Growth is spread evenly, and every region is ageing at the same rate.",
   "C": "Developed economies produce most of the growth thanks to immigration.",
   "D": "Population is falling globally, which is why the over-65s are growing as a share."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. World population is projected to rise by 60-70 million people a year, passing 8 billion in 2024, and emerging or developing countries produce 97 per cent of that growth. In developed economies people are living longer and having fewer children, and people over 65 are the fastest growing segment of the population.",
   "B": "Incorrect. The 97 per cent figure shows growth is heavily concentrated.",
   "C": "Incorrect. Developed economies are described as having fewer children, not as the source of growth.",
   "D": "Incorrect. The total is projected to rise, not fall."
  },
  "recap": "Correct. World population is projected to rise by 60-70 million people a year, passing 8 billion in 2024, and emerging or developing countries produce 97 per cent of that growth. In developed economies people are living longer and having fewer children, and people over 65 are the fastest growing segment of the population."
 },
 {
  "cat": "STEEP",
  "title": "Why BRICS Potential Is Called Volatile",
  "question": "The deck calls the economic potential of BRICS volatile. Which figures support that?",
  "options": {
   "A": "Every BRICS country grew above 6 per cent in both years.",
   "B": "India shows 6.8 and 6.6 per cent while South Africa shows 0.6 and 1.1 per cent, China slows to 4.6 and 4.8, and Russian GDP fell 2.1 per cent in 2022 and was 0.6 per cent in 2025.",
   "C": "All BRICS economies contracted after commodity prices dropped.",
   "D": "The group's growth is identical to that of developed economies."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Only India is near that level; South Africa is around 1 per cent.",
   "B": "Correct. Within the same group India still shows significant growth at 6.8 per cent in 2024 and 6.6 in 2025, while South Africa is at 0.6 and 1.1, the champion of economic growth China is slowing to 4.6 and 4.8, Brazil moves from 4.0 to 2.4, and Russia's GDP fell 2.1 per cent in 2022 and was 0.6 per cent in 2025.",
   "C": "Incorrect. Many emerging markets declined when commodity prices dropped, but the BRICS figures given are not uniformly negative.",
   "D": "Incorrect. No such comparison is drawn, and the spread within the group is the point."
  },
  "recap": "Correct. Within the same group India still shows significant growth at 6.8 per cent in 2024 and 6.6 in 2025, while South Africa is at 0.6 and 1.1, the champion of economic growth China is slowing to 4.6 and 4.8, Brazil moves from 4.0 to 2.4, and Russia's GDP fell 2.1 per cent in 2022 and was 0.6 per cent in 2025."
 },
 {
  "cat": "STEEP",
  "title": "The Resource Numbers",
  "question": "By 2030, what increases in demand does the deck attribute to a growing global population?",
  "options": {
   "A": "35 per cent for food, 40 per cent for water and 50 per cent for energy.",
   "B": "50 per cent for food, 40 per cent for water and 35 per cent for energy.",
   "C": "20 per cent across food, water and energy alike.",
   "D": "35 per cent for energy only, with food and water stable."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. A growing global population will mean a 35 per cent increase in food demand by 2030, with demand for water increasing by 40 per cent and for energy by 50 per cent. The deck adds that in Africa climate change is expected to reduce agricultural productivity by a third over the next 60 years.",
   "B": "Incorrect. The figures are in the other order: energy rises most, food least.",
   "C": "Incorrect. The three figures differ from one another.",
   "D": "Incorrect. All three are projected to rise."
  },
  "recap": "Correct. A growing global population will mean a 35 per cent increase in food demand by 2030, with demand for water increasing by 40 per cent and for energy by 50 per cent. The deck adds that in Africa climate change is expected to reduce agricultural productivity by a third over the next 60 years."
 },
 {
  "cat": "Five Forces",
  "title": "The Direction of the Relationship",
  "question": "One of the model's basic assumptions links competition to attractiveness. Which way does it run?",
  "options": {
   "A": "Attractiveness is directly proportional to the level of competition.",
   "B": "Attractiveness is inversely proportional to the level of competition in the competitive environment.",
   "C": "Attractiveness is independent of competition and depends only on market size.",
   "D": "Attractiveness rises with competition up to a point and then falls."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. More competition means lower average profitability, which is less attractiveness.",
   "B": "Correct. Among the model's basic assumptions: competition is driven by industry structure, and the business area's attractiveness is inversely proportional to the level of competition of the competitive environment. So a strong force is bad news for profitability.",
   "C": "Incorrect. The whole model exists to derive attractiveness from the structure of competition.",
   "D": "Incorrect. No such turning point is part of the model."
  },
  "recap": "Correct. Among the model's basic assumptions: competition is driven by industry structure, and the business area's attractiveness is inversely proportional to the level of competition of the competitive environment. So a strong force is bad news for profitability."
 },
 {
  "cat": "Five Forces",
  "title": "Extended Rivalry",
  "question": "What does the concept of extended rivalry mean in the five forces model?",
  "options": {
   "A": "That rivalry between existing competitors extends across national borders.",
   "B": "That rivalry extends over long time horizons.",
   "C": "That competition in an industry goes well beyond established players, which is why buyers, suppliers, entrants and substitutes are forces too.",
   "D": "That every industry eventually converges on the same level of rivalry."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Geography is not what the term refers to.",
   "B": "Incorrect. The extension is across actors, not across time.",
   "C": "Correct. Competition in an industry goes well beyond established players: this is the concept of extended rivalry, and it is why four of the five forces are not your direct competitors.",
   "D": "Incorrect. No convergence claim is made; rivalry depends on industry structure."
  },
  "recap": "Correct. Competition in an industry goes well beyond established players: this is the concept of extended rivalry, and it is why four of the five forces are not your direct competitors."
 },
 {
  "cat": "Five Forces",
  "title": "Industry Growth and Rivalry",
  "question": "Industry growth is one of the structural determinants of rivalry. How does it act?",
  "options": {
   "A": "Faster growth intensifies rivalry, because more is at stake.",
   "B": "Faster growth eases rivalry, because competitors can expand without taking share from one another.",
   "C": "Growth has no effect on rivalry, only on entry.",
   "D": "Growth raises rivalry only where exit barriers are low."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. It is stagnation that forces competitors to grow at each other's expense.",
   "B": "Correct. Industry growth is listed among the structural determinants of the intensity of internal rivalry, alongside concentration, product differentiation, the impact of fixed costs, excess capacity, switching costs and exit barriers. A growing industry lets everyone expand without taking share from anyone.",
   "C": "Incorrect. It is explicitly a determinant of rivalry.",
   "D": "Incorrect. The two determinants act separately; no such condition is stated."
  },
  "recap": "Correct. Industry growth is listed among the structural determinants of the intensity of internal rivalry, alongside concentration, product differentiation, the impact of fixed costs, excess capacity, switching costs and exit barriers. A growing industry lets everyone expand without taking share from anyone."
 },
 {
  "cat": "Five Forces",
  "title": "What Exit Barriers Do to Profitability",
  "question": "A business area has very high exit barriers. Other things being equal, what does that imply?",
  "options": {
   "A": "It is more profitable, because fewer companies can leave and flood the market.",
   "B": "It is less profitable, because competitors might stay in even if they are not making any profit.",
   "C": "It is more profitable, because exit barriers also keep new entrants out.",
   "D": "Profitability is unaffected; exit barriers matter only at the moment of leaving."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Companies staying in is precisely what keeps capacity and competition high.",
   "B": "Correct. The higher the barriers to exit, the less profitable the business arena, other things being equal, as competitors might stay in even if they are not making any profit.",
   "C": "Incorrect. Exit barriers and entry barriers are different things and work in opposite directions on profitability.",
   "D": "Incorrect. Their effect is continuous, because they keep unprofitable capacity in the arena."
  },
  "recap": "Correct. The higher the barriers to exit, the less profitable the business arena, other things being equal, as competitors might stay in even if they are not making any profit."
 },
 {
  "cat": "Five Forces",
  "title": "Telling Exit Barriers Apart",
  "question": "Which of these is listed as an exit barrier?",
  "options": {
   "A": "Economies of scale.",
   "B": "Brand identity.",
   "C": "Emotional barriers such as career concerns and loyalty to employees.",
   "D": "Access to distribution channels."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Economies of scale is an entry barrier.",
   "B": "Incorrect. Brand identity is an entry barrier.",
   "C": "Correct. Common exit barriers include specialized assets, fixed costs of exit such as labour agreements, strategic interrelationships like shared facilities and access to financial markets, emotional barriers such as career concerns and loyalty to employees, and government and social restrictions.",
   "D": "Incorrect. Access to distribution channels is an entry barrier."
  },
  "recap": "Correct. Common exit barriers include specialized assets, fixed costs of exit such as labour agreements, strategic interrelationships like shared facilities and access to financial markets, emotional barriers such as career concerns and loyalty to employees, and government and social restrictions."
 },
 {
  "cat": "Five Forces",
  "title": "What the Threat of New Entrants Depends On",
  "question": "The threat of new entrants has two determinants. Which?",
  "options": {
   "A": "Entry barriers, and the incumbents' expected reactions, meaning a credible threat of retaliation.",
   "B": "Exit barriers, and the bargaining power of suppliers.",
   "C": "Industry growth, and the availability of substitutes.",
   "D": "The number of existing competitors, and their concentration."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The threat of new entrants is potential competition, and its structural determinants are the entry barriers protecting the arena and the incumbents' expected reactions, that is a credible threat of retaliation.",
   "B": "Incorrect. Exit barriers act on rivalry, and supplier power is a separate force.",
   "C": "Incorrect. Growth is a determinant of rivalry, and substitutes are a separate force.",
   "D": "Incorrect. Concentration is a determinant of rivalry among existing competitors."
  },
  "recap": "Correct. The threat of new entrants is potential competition, and its structural determinants are the entry barriers protecting the arena and the incumbents' expected reactions, that is a credible threat of retaliation."
 },
 {
  "cat": "Five Forces",
  "title": "Scale or Absolute Advantage",
  "question": "Proprietary product technology, favourable access to raw materials, favourable location, the learning curve and government subsidies are grouped together. Under what heading, and why does the grouping matter?",
  "options": {
   "A": "Economies of scale, because all of them grow with volume.",
   "B": "Cost advantages independent of size, because a new entrant could match the incumbent's volume and still not match them.",
   "C": "Switching costs, because all of them make changing supplier expensive.",
   "D": "Exit barriers, because all of them make leaving costly."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Economies of scale is a separate entry barrier, listed alongside this group.",
   "B": "Correct. They are listed as cost advantages independent of size, an entry barrier distinct from economies of scale. De Beers in diamonds and Gazprom in gas are the examples given for favourable access to raw materials.",
   "C": "Incorrect. Switching costs are a separate entry barrier and concern the buyer's cost of changing.",
   "D": "Incorrect. These make entering hard, not leaving."
  },
  "recap": "Correct. They are listed as cost advantages independent of size, an entry barrier distinct from economies of scale. De Beers in diamonds and Gazprom in gas are the examples given for favourable access to raw materials."
 },
 {
  "cat": "Five Forces",
  "title": "What the Ryanair Case Demonstrates",
  "question": "In 1986 Aer Lingus and British Airways cut the Dublin-London fare from €300 to €130 before Ryanair had even started flying the route, and kept cutting until tickets reached €100 by 1989. Which element of the model does this illustrate?",
  "options": {
   "A": "The bargaining power of buyers, since passengers obtained lower prices.",
   "B": "The threat of substitutes, since other transport modes became relatively cheaper.",
   "C": "The incumbents' expected reactions, a credible threat of retaliation, aimed also at discouraging other potential entrants.",
   "D": "Exit barriers, since Ryanair could not leave the route."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Passengers benefited, but the mechanism described is the incumbents' response to entry rather than buyer power.",
   "B": "Incorrect. No substitute industry appears in the case; the fight is between airlines on the same route.",
   "C": "Correct. The threat of new entrants depends on entry barriers and on the incumbents' expected reactions, that is a credible threat of retaliation. Aer Lingus and British Airways had the clear objective of strangling Ryanair to avoid not only its entry but also to discourage other potential entrants from following its footsteps.",
   "D": "Incorrect. The case is about entering, and Ryanair's problem was losses rather than an inability to leave."
  },
  "recap": "Correct. The threat of new entrants depends on entry barriers and on the incumbents' expected reactions, that is a credible threat of retaliation. Aer Lingus and British Airways had the clear objective of strangling Ryanair to avoid not only its entry but also to discourage other potential entrants from following its footsteps."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Substitute or Competitor",
  "question": "High speed trains on a route also served by short haul flights; and a second airline undercutting the first on the same route. How does the model classify each?",
  "options": {
   "A": "Both are substitutes, since both take passengers away.",
   "B": "Both are existing competitors, since both serve the same passengers.",
   "C": "The train is a substitute, provided by another industry performing the same function; the second airline is an existing competitor.",
   "D": "The train is a complement and the second airline a substitute."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. A rival airline is inside the same industry, which makes it a direct competitor.",
   "B": "Incorrect. The train is provided by another industry, which is what makes it a substitute.",
   "C": "Correct. Substitutes are products provided by other industries that perform the same function as the product of the industry: short haul airline routes against high speed trains is one of the examples given, alongside airlines against web conferencing, tablets against laptops and aluminium against steel.",
   "D": "Incorrect. A complement adds value to the industry's offering and increases demand for it, which the train does not."
  },
  "recap": "Correct. Substitutes are products provided by other industries that perform the same function as the product of the industry: short haul airline routes against high speed trains is one of the examples given, alongside airlines against web conferencing, tablets against laptops and aluminium against steel."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Direct and Indirect Competition in Abell's Model",
  "question": "In Abell's three dimensions — customers, customers' needs and products — what distinguishes direct from indirect competition?",
  "options": {
   "A": "Direct competition shares customers and needs and products; indirect competition shares customers and needs but uses different products.",
   "B": "Direct competition shares only the customers; indirect competition shares only the needs.",
   "C": "Direct competition shares products; indirect competition shares nothing.",
   "D": "Direct competition is within a strategic group; indirect competition is across strategic groups."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Direct competition means same customers, same needs and same products, and corresponds to the existing competitors of Porter's model. Indirect competition means same customers, same needs but different products, and corresponds to the substitutes. The two differ on one dimension only.",
   "B": "Incorrect. Both forms share customers and needs; only the product differs.",
   "C": "Incorrect. Indirect competition shares both customers and needs.",
   "D": "Incorrect. Strategic groups are a different tool, used to segment an industry by the strategies of its firms."
  },
  "recap": "Correct. Direct competition means same customers, same needs and same products, and corresponds to the existing competitors of Porter's model. Indirect competition means same customers, same needs but different products, and corresponds to the substitutes. The two differ on one dimension only."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "How Substitutes Affect Returns",
  "question": "Through what mechanism do substitutes reduce the potential return of an industry?",
  "options": {
   "A": "By increasing the fixed costs of the industry's firms.",
   "B": "By placing a ceiling on the prices companies in the industry can profitably charge.",
   "C": "By raising the bargaining power of suppliers.",
   "D": "By lowering the entry barriers into the industry."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Substitutes act on the price the industry can charge, not on its cost structure.",
   "B": "Correct. Substitutes limit the potential return of an industry by placing a ceiling on the prices companies in the industry can profitably charge. The strength of the competition from substitutes is a function of switching costs, the substitute's price against the industry's, and the substitute's quality and performance against the industry's.",
   "C": "Incorrect. Supplier power is a separate force, acting upstream.",
   "D": "Incorrect. Entry barriers concern potential entrants inside the same industry."
  },
  "recap": "Correct. Substitutes limit the potential return of an industry by placing a ceiling on the prices companies in the industry can profitably charge. The strength of the competition from substitutes is a function of switching costs, the substitute's price against the industry's, and the substitute's quality and performance against the industry's."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Reading the Substitutes Matrix",
  "question": "A substitute has a favourable price and better performance than the industry's product. What does the matrix say, and what do the other cells call for?",
  "options": {
   "A": "It is a big threat; the other three cells call for monitoring the dimension the substitute is currently losing on.",
   "B": "It is harmless, because a cheap product cannot be better.",
   "C": "It calls for monitoring the reduction of the price only.",
   "D": "It calls for immediate exit from the industry."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Favourable price with better performance is the one cell labelled a big threat. A favourable price with worse performance calls for monitoring the improvement of performance; an unfavourable price with better performance calls for monitoring the reduction of the price; and an unfavourable price with worse performance calls for monitoring both.",
   "B": "Incorrect. That combination is exactly the dangerous one in the matrix.",
   "C": "Incorrect. Monitoring the price reduction applies where the substitute is already better but still expensive.",
   "D": "Incorrect. The matrix prescribes monitoring and threat assessment, not exit."
  },
  "recap": "Correct. Favourable price with better performance is the one cell labelled a big threat. A favourable price with worse performance calls for monitoring the improvement of performance; an unfavourable price with better performance calls for monitoring the reduction of the price; and an unfavourable price with worse performance calls for monitoring both."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "When Buyers Are Powerful",
  "question": "In a business-to-business setting, which combination increases the bargaining power of buyers?",
  "options": {
   "A": "High product differentiation and high switching costs.",
   "B": "Low product differentiation, low switching costs, buyers able to integrate backward and buyers with clear information about the product.",
   "C": "Buyers less concentrated than their suppliers.",
   "D": "Buyers with no information about the product."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. High differentiation and high switching costs raise supplier power and lower buyer power.",
   "B": "Correct. In B2B, buyer power increases if product differentiation is low and switching costs are low, and if buyers are able to integrate themselves backward and have clear information about the product. Power is also higher when the buyers' business area is more concentrated than that of the suppliers.",
   "C": "Incorrect. Relative concentration works the other way: buyers are stronger when their area is the more concentrated of the two.",
   "D": "Incorrect. Clear information strengthens buyers; its absence weakens them."
  },
  "recap": "Correct. In B2B, buyer power increases if product differentiation is low and switching costs are low, and if buyers are able to integrate themselves backward and have clear information about the product. Power is also higher when the buyers' business area is more concentrated than that of the suppliers."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "What Changes Between B2B and B2C",
  "question": "Which determinant of buyer power drops out when the buyer is a consumer rather than a business?",
  "options": {
   "A": "Low product differentiation.",
   "B": "Low switching costs.",
   "C": "The ability to integrate backward.",
   "D": "Easy availability of information about the product."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Low differentiation raises consumer power just as it does business buyer power.",
   "B": "Incorrect. Low switching costs appear in both lists.",
   "C": "Correct. In B2C the power of buyers increases if product differentiation is low, if information about the product is easily available and if switching costs are low. Backward integration is not among them, because an individual consumer cannot credibly threaten to make the product themselves.",
   "D": "Incorrect. Easily available information is explicitly listed for B2C."
  },
  "recap": "Correct. In B2C the power of buyers increases if product differentiation is low, if information about the product is easily available and if switching costs are low. Backward integration is not among them, because an individual consumer cannot credibly threaten to make the product themselves."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "The Duality of the Two Forces",
  "question": "The determinants of supplier power are described as dual to those of buyer power. What follows for product differentiation?",
  "options": {
   "A": "High differentiation raises both forces at once.",
   "B": "High differentiation lowers both forces at once.",
   "C": "Differentiation affects neither force.",
   "D": "High differentiation raises supplier power and lowers buyer power."
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. Duality means the same variable pushes the two forces in opposite directions.",
   "B": "Incorrect. For the same reason, they cannot both fall.",
   "C": "Incorrect. Product features are a listed determinant of both forces.",
   "D": "Correct. The structural determinants of supplier power are dual to those influencing buyer power. Supplier power increases if product or service differentiation is high and switching costs are high, while buyer power increases if differentiation is low and switching costs are low."
  },
  "recap": "Correct. The structural determinants of supplier power are dual to those influencing buyer power. Supplier power increases if product or service differentiation is high and switching costs are high, while buyer power increases if differentiation is low and switching costs are low."
 },
 {
  "cat": "Substitutes, Buyers & Suppliers",
  "title": "Who Must Be Included in the Buyer Analysis",
  "question": "The deck adds one requirement to the analysis of buyer power. Which?",
  "options": {
   "A": "That it includes the buyers and the ultimate customers.",
   "B": "That it is repeated for every strategic group.",
   "C": "That it is carried out only for the largest buyer.",
   "D": "That it covers only buyers with backward integration capability."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. The bargaining power of buyers depends on relative concentration, the product's features and the buyer's characteristics, and the analysis has to include the buyers and the ultimate customers, which can be different parties with different power.",
   "B": "Incorrect. Strategic groups are a separate tool, used to segment competitors.",
   "C": "Incorrect. No such restriction is given.",
   "D": "Incorrect. Backward integration is one determinant among several, not a filter on who is analysed."
  },
  "recap": "Correct. The bargaining power of buyers depends on relative concentration, the product's features and the buyer's characteristics, and the analysis has to include the buyers and the ultimate customers, which can be different parties with different power."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Complement or Substitute",
  "question": "Charging stations for electric vehicles, and petrol cars as an alternative to electric ones. How does the model classify each in relation to the electric vehicle industry?",
  "options": {
   "A": "Both are complements, since both concern mobility.",
   "B": "Charging stations are a complement, adding value and increasing demand for the industry's product; petrol cars are a substitute.",
   "C": "Both are substitutes, since both come from outside the industry.",
   "D": "Charging stations are a substitute and petrol cars a complement."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A petrol car replaces the industry's product rather than adding value to it.",
   "B": "Correct. A complement is a product or service that adds value to the industry's product offering and increases demand for the primary product, enhancing the industry's profit potential. The deck names the developers of charging stations as complementors in the electric vehicle industry, alongside game producers for consoles and app developers for smartphones.",
   "C": "Incorrect. Both do come from outside, but their effect on demand is opposite.",
   "D": "Incorrect. The two are inverted."
  },
  "recap": "Correct. A complement is a product or service that adds value to the industry's product offering and increases demand for the primary product, enhancing the industry's profit potential. The deck names the developers of charging stations as complementors in the electric vehicle industry, alongside game producers for consoles and app developers for smartphones."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Installed Base and the Self-Reinforcing Cycle",
  "question": "What is the installed base, and what cycle does it enter?",
  "options": {
   "A": "The total production capacity of the industry; it cycles with excess capacity.",
   "B": "The number of users of a particular technology; there is a self-reinforcing cycle between it and the availability of complementary goods.",
   "C": "The set of fixed assets a company has installed; it cycles with depreciation.",
   "D": "The share of the market held by the leader; it cycles with entry."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Installed base counts users, not capacity.",
   "B": "Correct. The number of users of a particular technology is referred to as the installed base. Network effects also arise when complementary goods are important: many products are desirable or functional only if a set of complementary goods is available, and there is a self-reinforcing cycle of installed base and availability of complementary goods. The cycle can therefore also run backwards.",
   "C": "Incorrect. The term refers to users of a technology, not to a firm's assets.",
   "D": "Incorrect. It is not a measure of market share."
  },
  "recap": "Correct. The number of users of a particular technology is referred to as the installed base. Network effects also arise when complementary goods are important: many products are desirable or functional only if a set of complementary goods is available, and there is a self-reinforcing cycle of installed base and availability of complementary goods. The cycle can therefore also run backwards."
 },
 {
  "cat": "Complements & Competitors",
  "title": "What the Attractiveness Profile Shows",
  "question": "Porter's attractiveness profile plots each of the five forces from highly unattractive to highly attractive, with two lines. What are they, and why does it matter?",
  "options": {
   "A": "One line for the industry and one for the firm, to show the firm's relative position.",
   "B": "One line for revenue and one for profit, to show the margin.",
   "C": "One line for the present and one, dashed, for the future, so that a profile shifting towards unattractive can be told from a stable one.",
   "D": "One line for opportunities and one for threats, matching the SWOT."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Both lines describe the business area; the firm's own position comes from internal analysis.",
   "B": "Incorrect. No financial series is plotted; the axis is the attractiveness rating of each force.",
   "C": "Correct. The profile rates intensity of rivalry, the risk of entry by potential competitors, the bargaining power of buyers, the bargaining power of suppliers and the availability and similarity of substitute value propositions, with a solid line for the present and a dashed line for the future. The comparison between the two is the point of the chart.",
   "D": "Incorrect. Opportunities and threats are an outcome of the external analysis, not the two lines of this chart."
  },
  "recap": "Correct. The profile rates intensity of rivalry, the risk of entry by potential competitors, the bargaining power of buyers, the bargaining power of suppliers and the availability and similarity of substitute value propositions, with a solid line for the present and a dashed line for the future. The comparison between the two is the point of the chart."
 },
 {
  "cat": "Complements & Competitors",
  "title": "How Maturity Changes Profitability",
  "question": "Among the events that change industry profitability over time, what does the deck say happens as an industry reaches maturity?",
  "options": {
   "A": "Its growth rate declines, resulting in intensified rivalry and declining profits.",
   "B": "Entry barriers fall, attracting new entrants.",
   "C": "Supplier power rises as suppliers consolidate.",
   "D": "Substitutes disappear as the industry standard settles."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. As the industry reaches maturity its growth rate declines, resulting in intensified rivalry and declining profits. The other events listed are an acquisition introducing a very different player, technological innovation creating space for new entrants or substitutes, and a reduction in the number of suppliers reducing bargaining power towards them.",
   "B": "Incorrect. Falling entry barriers are not what the deck attributes to maturity.",
   "C": "Incorrect. Supplier consolidation is listed separately, as a reduction in the number of suppliers.",
   "D": "Incorrect. Technological innovation is said to create space for substitutes, not to remove them."
  },
  "recap": "Correct. As the industry reaches maturity its growth rate declines, resulting in intensified rivalry and declining profits. The other events listed are an acquisition introducing a very different player, technological innovation creating space for new entrants or substitutes, and a reduction in the number of suppliers reducing bargaining power towards them."
 },
 {
  "cat": "Complements & Competitors",
  "title": "The Three Purposes of Competitor Analysis",
  "question": "What are the three purposes of competitor analysis?",
  "options": {
   "A": "To forecast competitors' future strategies and decisions; to predict their reaction to a firm's strategic initiatives; and to determine how their behaviour can be influenced.",
   "B": "To measure competitors' market share, profitability and growth.",
   "C": "To segment the industry, map strategic groups and identify mobility barriers.",
   "D": "To collect public information, analyse it and publish the findings."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Competitor analysis has three main purposes: to forecast competitors' future strategies and decisions, to predict competitors' reaction to a firm's strategic initiatives, and to determine how competitors' behaviour can be influenced. Its three sections are understanding how rivals compete at present, forecasting how a competitor might change its strategy, and understanding the perception competitors have of the industry.",
   "B": "Incorrect. Those are measures that might feed the analysis, not its stated purposes.",
   "C": "Incorrect. Strategic group analysis is a separate tool.",
   "D": "Incorrect. That describes competitive intelligence as a process, and publishing is no part of it."
  },
  "recap": "Correct. Competitor analysis has three main purposes: to forecast competitors' future strategies and decisions, to predict competitors' reaction to a firm's strategic initiatives, and to determine how competitors' behaviour can be influenced. Its three sections are understanding how rivals compete at present, forecasting how a competitor might change its strategy, and understanding the perception competitors have of the industry."
 },
 {
  "cat": "Complements & Competitors",
  "title": "What Competitive Intelligence Works From",
  "question": "Competitive intelligence is defined by the kind of information it uses. Which?",
  "options": {
   "A": "Confidential information obtained from competitors' employees.",
   "B": "Public information about rivals, collected and analysed systematically to inform decision making.",
   "C": "Internal performance data compared against budget.",
   "D": "Customer satisfaction surveys commissioned by the firm."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The definition specifies public information.",
   "B": "Correct. Competitive intelligence involves the systematic collection and analysis of public information about rivals for informing decision making. Its main sources are annual reports and company profiles, product brochures, fairs and exhibitions, press releases and articles in the media, suppliers, customers and the business community.",
   "C": "Incorrect. Comparing results against budget is the variance analysis of the control phase.",
   "D": "Incorrect. Surveys are a demand analysis tool and are not what defines competitive intelligence."
  },
  "recap": "Correct. Competitive intelligence involves the systematic collection and analysis of public information about rivals for informing decision making. Its main sources are annual reports and company profiles, product brochures, fairs and exhibitions, press releases and articles in the media, suppliers, customers and the business community."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Segmentation or Strategic Groups",
  "question": "What distinguishes strategic group analysis from segmentation analysis?",
  "options": {
   "A": "Segmentation concentrates on the characteristics of markets as the basis for disaggregating industries; strategic group analysis segments an industry on the basis of the strategies of the member firms.",
   "B": "Segmentation applies to B2C markets and strategic groups to B2B ones.",
   "C": "Segmentation is internal analysis and strategic groups are external analysis.",
   "D": "They are the same tool under two names."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Whereas segmentation analysis concentrates on the characteristics of markets as the basis for disaggregating industries, strategic group analysis segments an industry on the basis of the strategies of the member firms. A strategic group is the group of firms in an industry following the same or a similar strategy along the strategic dimensions.",
   "B": "Incorrect. Neither tool is restricted by the type of market.",
   "C": "Incorrect. Both belong to external analysis.",
   "D": "Incorrect. One divides the market, the other divides the competitors."
  },
  "recap": "Correct. Whereas segmentation analysis concentrates on the characteristics of markets as the basis for disaggregating industries, strategic group analysis segments an industry on the basis of the strategies of the member firms. A strategic group is the group of firms in an industry following the same or a similar strategy along the strategic dimensions."
 },
 {
  "cat": "Complements & Competitors",
  "title": "Reading a Strategic Group Map",
  "question": "On a map of the U.S. domestic airline industry, prices charged are plotted against routes serviced, separating a low-cost point-to-point group from a differentiated hub-and-spoke group with a line between them. What is that line, and where is rivalry strongest?",
  "options": {
   "A": "An entry barrier; rivalry is strongest across the line.",
   "B": "A mobility barrier; rivalry is strongest between firms within the same strategic group.",
   "C": "An exit barrier; rivalry is strongest in the larger group.",
   "D": "A price ceiling set by substitutes; rivalry is uniform across the industry."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Entry barriers protect the industry from outsiders; this line separates groups inside it.",
   "B": "Correct. The line is a mobility barrier, the obstacle to moving from one strategic group to another. Competitive rivalry is strongest between firms within the same strategic group, and the map also shows that the external environment and the five forces affect groups differently and that some groups are more profitable than others.",
   "C": "Incorrect. Exit barriers keep firms in the industry rather than in a group, and rivalry is not a matter of group size.",
   "D": "Incorrect. A substitute ceiling concerns prices across the industry, not the boundary between groups."
  },
  "recap": "Correct. The line is a mobility barrier, the obstacle to moving from one strategic group to another. Competitive rivalry is strongest between firms within the same strategic group, and the map also shows that the external environment and the five forces affect groups differently and that some groups are more profitable than others."
 },
 {
  "cat": "Complements & Competitors",
  "title": "What a Profit Pool Map Reveals",
  "question": "In the automotive profit pool, auto manufacturing occupies a large share of industry revenue at a low single-digit operating margin while leasing reaches above 20 per cent on a much smaller share. What is the general lesson?",
  "options": {
   "A": "That the largest stage of the chain is always the most profitable.",
   "B": "That operating margin and share of industry revenue move together.",
   "C": "That return on capital varies throughout the value chain, so a big share of revenue need not mean a big share of profit.",
   "D": "That manufacturing should be outsourced in every industry."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The map shows the opposite: manufacturing is large and thin.",
   "B": "Incorrect. The chart is built precisely to show that they do not.",
   "C": "Correct. Profit pool mapping plots the vertical structure of profitability, showing that return on capital varies throughout the value chain. In the automotive example manufacturing and new car dealers run at low margins on a large revenue share, while leasing, warranty, service and repair and auto rental sit far higher on smaller shares.",
   "D": "Incorrect. The map informs where else to compete; it prescribes no universal answer."
  },
  "recap": "Correct. Profit pool mapping plots the vertical structure of profitability, showing that return on capital varies throughout the value chain. In the automotive example manufacturing and new car dealers run at low margins on a large revenue share, while leasing, warranty, service and repair and auto rental sit far higher on smaller shares."
 },
 {
  "cat": "Complements & Competitors",
  "title": "The Questions a Profit Pool Map Answers",
  "question": "Which set of questions does profit pool mapping address?",
  "options": {
   "A": "Who are our customers, what do they want, and how intense is competition?",
   "B": "How do profits distribute along the supply chain, are there areas where profitability is growing, and are there opportunities for expanding the firm's business into other areas of the chain?",
   "C": "Which industries should we be in, and how should we compete?",
   "D": "What are our strengths, weaknesses, opportunities and threats?"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Those belong to the analysis of demand and of competition, which derive key success factors.",
   "B": "Correct. Profit pool mapping asks how profits distribute along the supply chain, whether there are business areas of the supply chain where profitability is growing, and whether there are opportunities for expanding the firm's business into other areas of the supply chain.",
   "C": "Incorrect. Those are the questions separating corporate from business strategy.",
   "D": "Incorrect. That is the SWOT, which combines the external and internal analyses."
  },
  "recap": "Correct. Profit pool mapping asks how profits distribute along the supply chain, whether there are business areas of the supply chain where profitability is growing, and whether there are opportunities for expanding the firm's business into other areas of the supply chain."
 }
];
