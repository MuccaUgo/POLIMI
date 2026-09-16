// Strategy & Marketing study data, generated from the course decks by V. Chiesa,
// MSc Management Engineering: the Introduction and chapter 1, The Concept of Strategy.
const TOPICS = [
 { name: "Introduction", categories: ["The Company", "Legal Forms", "Ownership & Evolution", "Value & Objectives", "Governance & ESG"] },
 { name: "The Concept of Strategy", categories: ["What Strategy Is", "Levels of Strategy", "Strategy Process", "Intended & Emergent", "Vision, Mission & Purpose"] }
];
const CATEGORIES = TOPICS.reduce(function (all, t) { return all.concat(t.categories); }, []);

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
  "trap": "The two levels are often confused because both use the word competition. Corporate strategy picks the game; business strategy plays it."
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
  "trap": "The two analyses run in parallel and meet; neither comes first. Reading the diagram as a single left-to-right sequence loses that."
 },
 {
  "cat": "Strategy Process",
  "title": "The Three Phases",
  "meaning": "The process groups into three phases.",
  "how": "Diagnosis covers external and internal analysis and the SWOT. Strategy formulation is the generation and selection of strategic alternatives. Actions implementation covers implementation and control.",
  "trap": "SWOT belongs to diagnosis, not to formulation. It describes the situation; it does not choose the alternative."
 },
 {
  "cat": "Strategy Process",
  "title": "External Analysis and Key Success Factors",
  "meaning": "The outward-facing half of the diagnosis.",
  "how": "External analysis identifies the key success factors of the arena and yields the opportunities and threats of the SWOT.",
  "trap": "Key success factors belong to the industry, not to the firm. What the firm has is a resource; what the industry demands is a key success factor."
 },
 {
  "cat": "Strategy Process",
  "title": "Internal Analysis and Strategic Resources",
  "meaning": "The inward-facing half of the diagnosis.",
  "how": "Internal analysis identifies the strategic resources of the firm and yields the strengths and weaknesses of the SWOT.",
  "trap": "Strengths and weaknesses are internal by definition. A hostile market is a threat, never a weakness."
 },
 {
  "cat": "Strategy Process",
  "title": "SWOT as the Meeting Point",
  "meaning": "SWOT analysis is where the external and internal halves of the diagnosis come together.",
  "how": "Opportunities and threats arrive from the external side, strengths and weaknesses from the internal side, and the combination frames competitive advantage.",
  "trap": "SWOT is a summary of the diagnosis, not an analysis in itself. Its content is only as good as the two analyses feeding it."
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
  "trap": "Without the feedback the scheme would describe a one-off exercise. Repositioning is what makes it a process."
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
  "trap": "Vision looks forward. A statement describing what the company does today is a mission, however ambitious its wording."
 },
 {
  "cat": "Vision, Mission & Purpose",
  "title": "Mission",
  "meaning": "The mission is a company's present business scope: who we are and what we do.",
  "how": "The mission statement broadly defines what a company does, and the means by which the vision is accomplished. It covers what business the organization is in, and what it is not, both now and projecting into the future.",
  "trap": "Mission is the means, vision is the end. The mission is also what the company is not in, which is the part usually left out."
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
 }
];
