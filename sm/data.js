// Strategy & Marketing study data, generated from the course decks by V. Chiesa (Introduction and
// chapters 1-7) and G. Peggiani (marketing lectures 1-2), MSc Management Engineering. Marketing lecture 3
// is built from the student's notes until its slides are available. The deck sheets, flashcards, cases
// and oral questions live in content.js.
const TOPICS = [
 { name: "Introduction", categories: ["The Company", "Legal Forms", "Ownership & Evolution", "Value & Objectives", "Governance & ESG"] },
 { name: "The Concept of Strategy", categories: ["What Strategy Is", "Levels of Strategy", "Strategy Process", "Intended & Emergent", "Vision, Mission & Purpose"] },
 { name: "External Analysis", categories: ["External Analysis", "STEEP", "Five Forces", "Substitutes, Buyers & Suppliers", "Complements & Competitors"],
   note: "Chapter 2 \u2014 covered in class. The lectures have since moved on to chapters 3 to 7 and to the first marketing lectures, which now have their own areas below." },
 { name: "Competitive Advantage", categories: ["Sources of Advantage", "Cost & Differentiation", "Grand Strategies & Positioning"] },
 { name: "Internal Analysis", categories: ["Resources & Value Chain", "VRIO & Imitability", "Strengths & Weaknesses"] },
 { name: "SWOT & Alternatives", categories: ["SWOT & Roadmapping", "Repositioning"] },
 { name: "Business Model", categories: ["Canvas Building Blocks", "Business Model Patterns"] },
 { name: "Corporate Strategy", categories: ["Vertical Integration", "Diversification", "Portfolio Analysis"] },
 { name: "Market Demand", categories: ["Marketing Basics", "Demand & Customer Value", "B2C & B2B Buying"] },
 { name: "Segmentation", categories: ["Segmentation Basics", "Segmentation Bases", "Segmentation Methods"] },
 { name: "Targeting & Positioning", categories: ["Targeting & Positioning"],
   note: "Marketing lecture 3 \u2014 built from the student's handwritten notes and Kotler, because the lecture slides are not in the hub yet. Check it against the slides when they are available." }
];
const CATEGORIES = TOPICS.reduce(function (all, t) { return all.concat(t.categories); }, []);

// The 28-part memory map mirrors the student's "Things to Remember" notes.
// Each block opens the most relevant area in the concept browser.
const STUDY_MAP = [
 {
  "chapter": "01",
  "name": "Introduction",
  "subtitle": "10 blocks · covered in class",
  "blocks": [
   { "title": "What is a company?", "summary": "A company can be small or large, private or public, profit-oriented or not-for-profit. In this course the unit of analysis is the profit-oriented organisation that is responsible for its own economic and financial results.", "keyPoints": ["The word company covers many organisations, but the course deliberately focuses on profit-oriented businesses.", "The company is treated as an autonomous economic unit: it combines resources, performs activities and produces outputs for customers.", "Responsibility for economic and financial results distinguishes the analysed organisation from a project, department or informal group.", "Always identify the unit of analysis before applying a strategy framework: group, company, business unit and function are different levels."], "exam": "Do not turn the course's chosen scope into a universal definition. Public-sector and not-for-profit organisations exist; they are simply outside the main unit analysed here.", "filter": "The Company", "status": "covered" },
   { "title": "How do we measure a company?", "summary": "There is no single measure of company size. Market capitalisation measures the market value of equity, revenues measure sales activity and employees indicate organisational scale, so each measure can produce a different ranking.", "keyPoints": ["Market capitalisation equals the share price multiplied by shares outstanding and is available only for listed companies.", "Revenues are a flow generated during a period; they measure business volume, not the market value of the firm.", "Employee count captures organisational and labour scale, but it varies greatly with automation, outsourcing and the business model.", "A company may lead one ranking and not another, so every comparison must name the indicator and period used."], "exam": "Never write that one company is simply 'larger' without specifying the measure. Market capitalisation, revenues and employees answer different questions.", "filter": "The Company", "status": "covered" },
   { "title": "Company boundaries and general trends", "summary": "A firm chooses how many products to offer, which activities to keep inside, what to outsource and how many countries to serve. Diversification, vertical integration and internationalisation describe different dimensions of these boundaries.", "keyPoints": ["Product scope ranges from one output to a portfolio; diversification widens the businesses and needs served.", "Vertical scope asks how much of the value chain the company performs internally and how much it purchases from external partners.", "Geographical scope ranges from one national market to coordinated activities and sales across several countries.", "Company boundaries change over time: firms can integrate, outsource, globalise or refocus, as the Eni example shows."], "exam": "Keep the dimensions separate. A diversified company is not necessarily vertically integrated, and exporting alone does not make its whole organisation global.", "filter": "The Company", "status": "covered" },
   { "title": "Legal form and ownership", "summary": "The company is a legal entity separate from the people behind it. Its legal form determines whether members have limited or unlimited liability and whether shares remain private or can be offered to the public.", "keyPoints": ["A legal entity is an artificial person created by law, allowing several natural persons to act through one contractual organisation.", "Limited liability caps the owners' exposure; unlimited-company members remain exposed if the firm enters formal liquidation.", "A private company cannot offer shares to the general public and often restricts transfers to outsiders.", "A public limited company can access stock and bond markets, but must meet stronger disclosure, valuation and governance requirements."], "exam": "Do not confuse 'public company' with a state-owned organisation. Here public means that securities can be offered and traded on public financial markets.", "filter": "Legal Forms", "status": "covered" },
   { "title": "Foundation, financing rounds and dilution", "summary": "Founders start with the initial ownership split; later investors inject capital in exchange for newly issued shares. Post-money value equals pre-money value plus the investment, and existing owners retain the pre-money divided by post-money proportion of their former stake.", "keyPoints": ["At foundation, the equity split also establishes initial voting power and decision rules.", "In a financing round the company issues new shares; the injected cash increases company value while reducing existing owners' percentages.", "Post-money valuation = pre-money valuation + new investment, and the investor's ownership = investment ÷ post-money value.", "Each existing owner keeps the same fraction of the old company: retention = pre-money ÷ post-money, applied to the previous percentage.", "Dilution can be economically positive when a smaller percentage represents a much more valuable company."], "exam": "Use the post-money value as the denominator for the new investor. Comparing ownership percentages without comparing valuations gives an incomplete answer.", "filter": "Ownership & Evolution", "status": "covered" },
   { "title": "IPO and takeovers", "summary": "A primary IPO issues new shares and sends cash to the company; a secondary IPO sells existing shares and sends cash to the sellers. A takeover is friendly when the target board agrees and hostile when the offer proceeds against the board's wishes.", "keyPoints": ["An IPO is the first offering of a company's shares on a public market and changes ownership, accountability and governance.", "Primary IPO: new shares are issued, the company receives cash and existing shareholders are diluted.", "Secondary IPO: existing shareholders sell their shares, so the sellers receive the cash and the company issues no new equity.", "A mixed IPO combines primary and secondary components.", "A takeover transfers control; friendly or hostile describes the target board's position, not the generosity of the price."], "exam": "Follow the money. In a primary offering cash enters the company; in a secondary offering it goes to the selling shareholders.", "filter": "Ownership & Evolution", "status": "covered" },
   { "title": "Shareholder value", "summary": "Shareholder value is the present value of the net cash flows received by shareholders. It also equals enterprise value minus net debt: SV = EV − debt + cash, so it must not be confused with the value of the operating business.", "keyPoints": ["Net cash flow to shareholders includes dividends and the eventual sale price, minus any capital they inject.", "Future cash flows are discounted at the cost of equity because timing and risk affect their present value.", "Enterprise value measures the operating business for all capital providers; shareholder value belongs only to equity holders.", "Net debt equals debt minus cash, giving SV = EV − debt + cash.", "Market capitalisation is a useful proxy for listed firms, but bubbles, expectations and speculation can separate it from intrinsic value."], "exam": "Cash raises shareholder value for a given enterprise value because it reduces net debt. Do not drop the cash term or treat market capitalisation as a perfect valuation.", "filter": "Value & Objectives", "status": "covered" },
   { "title": "Stakeholder value and CSR", "summary": "Companies depend on employees, customers, suppliers, lenders, governments and communities as well as shareholders. The stakeholder view connects long-term shareholder value with these relationships, while the CSR pyramid adds economic, legal, ethical and philanthropic responsibilities.", "keyPoints": ["Stakeholders contribute resources or are affected by the company's actions: employees, managers, suppliers, lenders, customers, authorities and communities.", "Their objectives can conflict, so management must understand interests, power, dependence and possible trade-offs.", "The long-term argument is reciprocal: stakeholder cooperation supports cash flows, while financial viability protects stakeholder relationships.", "The CSR pyramid builds from economic responsibility to legal, ethical and philanthropic responsibilities.", "Corporate scandals, financial crises and other shocks strengthened demands for accountability beyond short-term shareholder returns."], "exam": "The stakeholder perspective adds responsibilities and a long-term view; it does not claim that shareholder value or economic viability can be ignored.", "filter": "Value & Objectives", "status": "covered" },
   { "title": "Corporate governance", "summary": "Corporate governance is the system of bodies, principles and processes used to direct and control a company. Learn the roles of shareholders, directors, managers and supervisors, then distinguish the traditional, one-tier and two-tier governance systems.", "keyPoints": ["Governance defines who has authority, who monitors decisions and how the company remains accountable to owners and stakeholders.", "The shareholders' meeting appoints key bodies and decides on matters reserved to the owners; directors set direction and oversee management.", "In the traditional model, a board of directors manages while a separate board of statutory auditors supervises.", "In the one-tier model, executive and non-executive directors sit on one board, with supervision assigned within it.", "In the two-tier model, a management board runs the company and a separate supervisory board appoints and monitors it."], "exam": "One-tier does not mean no supervision. The difference between the models is where management and monitoring powers are located and how the bodies are separated.", "filter": "Governance & ESG", "status": "covered" },
   { "title": "ESG", "summary": "ESG evaluates performance through environmental, social and governance dimensions. It broadens the information used to judge a company, but the three dimensions must be analysed separately because strong performance in one does not cancel weakness in another.", "keyPoints": ["Environmental factors include emissions, energy, resources, waste, biodiversity and exposure to climate-related risks.", "Social factors cover employees, safety, inclusion, human rights, supply-chain practices, customers and communities.", "Governance factors include board structure, controls, ethics, transparency, executive incentives and shareholder rights.", "ESG indicators help investors and stakeholders evaluate risks and effects that financial statements alone may not reveal.", "Scores depend on the metrics, weights and data provider, so an aggregate rating should be interpreted rather than accepted mechanically."], "exam": "ESG is not one single virtue score. Identify the relevant E, S or G issue and explain the mechanism through which it affects risk, stakeholders or long-term value.", "filter": "Governance & ESG", "status": "covered" }
  ]
 },
 {
  "chapter": "02",
  "name": "The Concept of Strategy",
  "subtitle": "10 blocks · covered in class",
  "blocks": [
   { "title": "What is strategy and why is it important?", "summary": "Strategy is a coherent set of goal-directed choices about where and how an organisation will compete. It gives direction, coordinates decisions and resources, and aims to create a sustainable advantage rather than a single short-term win.", "keyPoints": ["Strategy links goals to actions and commits the organisation to a course that excludes incompatible alternatives.", "It answers where to compete, how to compete and which resources and capabilities must support those choices.", "A clear strategy guides individual decisions, coordinates functions and communicates priorities across the organisation.", "Competitive advantage means creating more value than rivals or delivering comparable value at a lower cost over time.", "Tactics implement strategy in particular situations; operational effectiveness improves activities but does not by itself define a unique position."], "exam": "Avoid calling every important action a strategy. A strategic choice must form part of a coherent direction and explain how the organisation intends to reach its goals.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Strategic decisions", "summary": "A decision is strategic when it has significant, multidimensional and long-term effects, is difficult to reverse and commits substantial resources. These decisions normally involve top management because they shape the organisation as a whole.", "keyPoints": ["Long-term effects extend beyond the immediate operating cycle and influence the organisation's future position.", "Irreversibility comes from sunk investments, commitments, reputation, contracts or organisational change.", "Strategic decisions allocate large financial, human, technological or managerial resources.", "Their effects are significant and multidimensional, often touching markets, structure, capabilities and stakeholders together.", "Top management involvement reflects the scope and accountability of the decision, although information can emerge from lower levels."], "exam": "The slides emphasise three tests—long term, non-reversible and resource intensive—while the lecture adds significant multidimensional effects and top-management involvement.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Levels of strategy and SBU", "summary": "Corporate strategy chooses the industries and businesses in which the company operates; business strategy decides how to compete inside one arena; functional strategy translates those choices into actions. An SBU is the unit for which a distinct business strategy can be formulated.", "keyPoints": ["Corporate strategy defines the business portfolio, diversification, acquisitions, divestments and the allocation of resources among businesses.", "Business strategy seeks competitive advantage within a defined business area and chooses the value proposition and competitive position.", "Functional strategies in marketing, operations, finance, HR and technology implement and support the higher-level choices.", "An SBU serves a distinct market with identifiable competitors and can be assigned its own objectives and strategy.", "The same company may therefore have one corporate strategy but several business strategies."], "exam": "Use the question being answered: 'Which industries should we enter?' is corporate; 'How do we beat rivals here?' is business; 'How will this function support it?' is functional.", "filter": "Levels of Strategy", "status": "covered" },
   { "title": "Strategic decision process", "summary": "The full process moves through orientation, analysis or diagnosis, decision-making, implementation and control. The slides also compress it into diagnosis, strategy formulation and action implementation, so remember how the two versions correspond.", "keyPoints": ["Orientation sets vision, mission and strategic objectives before detailed analysis begins.", "Analysis or diagnosis studies the external environment and the firm's internal resources and capabilities.", "Decision-making generates alternatives, evaluates them and selects a coherent strategy.", "Implementation converts the decision into structures, resources, responsibilities, projects and operating actions.", "Control monitors results and assumptions, learns from deviations and triggers adjustment when needed."], "exam": "Both representations are valid. The five-phase lecture model adds Orientation and separates Control; the three-phase slide model groups the work more broadly.", "filter": "Strategy Process", "status": "covered" },
   { "title": "Strategy links two environments", "summary": "Strategy connects the internal environment—resources, capabilities, strengths and weaknesses—with the external environment of customers, competitors, opportunities and threats. SWOT summarises this fit but does not replace the analysis behind it.", "keyPoints": ["External analysis identifies the opportunities, threats, industry forces and key success factors facing the average competitor.", "Internal analysis identifies resources, capabilities, strengths and weaknesses specific to the firm.", "A sound strategy exploits opportunities with real strengths, addresses threats and avoids depending on capabilities the firm does not possess.", "The fit is dynamic: environmental change can make former strengths obsolete, while capability development can open new opportunities.", "SWOT is the synthesis of the two analyses, not a substitute for evidence and causal reasoning."], "exam": "Strengths and weaknesses are internal; opportunities and threats are external. Classifying the same fact on the wrong side of SWOT changes the logic of the answer.", "filter": "Strategy Process", "status": "covered" },
   { "title": "Elements of a successful strategy", "summary": "Successful strategy needs clear and consistent long-term goals, a deep understanding of the competitive environment, an objective assessment of resources and effective implementation. Weakness in any one of these elements can undermine the whole strategy.", "keyPoints": ["Goals must be clear, consistent and sufficiently long term to guide trade-offs and resource commitments.", "Understanding the environment means recognising customers, competitors, industry economics and relevant change rather than relying on assumptions.", "Resource appraisal must be objective about what the organisation owns, can do and still needs to develop.", "Implementation requires leadership, organisation, incentives, budgets and operating actions aligned with the chosen direction.", "These elements reinforce one another: ambitious goals without resources or a strong analysis without execution will not produce success."], "exam": "Do not reduce success to having a clever plan. The framework treats implementation and an honest resource assessment as essential ingredients of strategy.", "filter": "What Strategy Is", "status": "covered" },
   { "title": "Approaches to strategy", "summary": "Intended strategy is planned top-down; deliberate strategy is the part of that plan actually realised. Emergent strategy forms bottom-up through learning and unexpected events, so realised strategy normally combines deliberate and emergent components.", "keyPoints": ["Intended strategy is what leadership initially plans to pursue.", "Unrealised strategy is the part abandoned because assumptions, resources or circumstances change.", "Deliberate strategy is the portion of the intention that is implemented as planned.", "Emergent strategy develops from patterns of action, experimentation and learning that were not in the original plan.", "Realised strategy = deliberate strategy + emergent strategy, making planning and adaptation complementary."], "exam": "Deliberate is not a synonym for intended. It is only the realised part of the original intention; the remaining intended choices are unrealised.", "filter": "Intended & Emergent", "status": "covered" },
   { "title": "Vision and mission", "summary": "In the general definition, vision describes the future the company wants and mission describes its present business. In the business-strategy process, vision becomes industry foresight and mission becomes the firm's strategic intent inside that expected future.", "keyPoints": ["General vision expresses the organisation's desired future and gives a picture of where it wants to go.", "General mission defines its present business scope: who it serves, what it provides and how it creates value.", "In the business-strategy lecture, vision is industry foresight—a view of how the business area may evolve and therefore something rivals may share.", "In that same reading, mission is strategic intent—the firm-specific role and position the company wants within the expected future.", "Both definitions appear in the course, so the correct interpretation depends on the level and wording of the question."], "exam": "Watch for the two readings. A company-specific future dream is the general vision; industry foresight is the business-strategy use of the same word.", "filter": "Vision, Mission & Purpose", "status": "covered" },
   { "title": "Purpose", "summary": "Purpose explains why the company exists and the contribution it wants to make beyond a list of products or financial targets. It should guide choices over time while remaining broad enough to survive changes in the current business model.", "keyPoints": ["Purpose answers 'why do we exist?' rather than 'what do we sell?' or 'where are we going?'.", "It connects the organisation's identity to the value it seeks to create for customers, society or other stakeholders.", "A credible purpose should influence priorities, trade-offs and behaviour rather than remain only a communication slogan.", "Because products and technologies change, purpose is normally broader and more enduring than the current mission.", "Purpose can motivate employees and align stakeholders when it is consistent with actual decisions and incentives."], "exam": "Purpose is not a more inspirational mission statement. Mission describes the current business; purpose provides the underlying reason for that business to exist.", "filter": "Vision, Mission & Purpose", "status": "covered" },
   { "title": "Culture and values", "summary": "Values state the principles the organisation claims to follow; culture is the deeper system of norms, assumptions and artefacts that shapes actual behaviour. Founder imprinting can make culture distinctive, while groupthink and core rigidity show how a strong culture can become a constraint.", "keyPoints": ["Values are explicit principles used to guide choices and signal expected conduct.", "Culture includes visible artefacts, shared norms and deeper assumptions that people often follow without consciously discussing them.", "Founders shape early hiring, stories, routines and symbols, leaving an imprint that can persist as the company grows.", "A strong culture coordinates behaviour and creates identity, but can discourage dissent through groupthink.", "Core rigidity arises when historically successful beliefs and routines prevent adaptation to a changed environment."], "exam": "Do not assume that a strong culture is automatically beneficial. Its value depends on alignment with the strategy and the external environment.", "filter": "Vision, Mission & Purpose", "status": "covered" }
  ]
 },
 {
  "chapter": "03",
  "name": "External Analysis",
  "subtitle": "8 blocks · covered in class",
  "blocks": [
   { "title": "Purpose and structure of external analysis", "summary": "External analysis evaluates the business area from the standpoint of the average generic competitor, not from one firm's strengths and weaknesses. It moves from the macroenvironment to industry structure, competitors, customers, key success factors and finally opportunities and threats.", "keyPoints": ["Define the business area first, because the relevant customers, competitors and substitutes depend on its boundaries.", "Use STEEP to identify macro forces that influence the arena but sit outside any single company's control.", "Analyse industry economics, competitors and customers to understand profitability, behaviour and demand.", "Derive key success factors from what demand requires and what competition makes necessary.", "Summarise the evidence as external opportunities and threats before combining it with internal analysis."], "exam": "Maintain the generic-player perspective. When the analysis starts describing what one company is good or bad at, it has moved into internal analysis.", "filter": "External Analysis", "status": "covered" },
   { "title": "STEEP analysis", "summary": "STEEP scans social, technological, economic, ecological and political forces that can reshape the business area. The task is to select relevant factors, understand their direction and assess whether their impact is positive, negative or uncertain.", "keyPoints": ["Social factors include demographics, income distribution, lifestyles, education and cultural change.", "Technological factors include innovation trajectories, digitalisation, infrastructure, patents and the pace of obsolescence.", "Economic factors include growth, inflation, interest and exchange rates, employment and purchasing power.", "Ecological factors cover climate, resources, pollution, regulation and environmental constraints on production and demand.", "Political factors include governments, taxation, trade policy, regulation, geopolitical stability and institutional choices."], "exam": "A STEEP list is not enough. Select factors relevant to the business area and explain their likely direction, impact, time horizon and uncertainty.", "filter": "STEEP", "status": "covered" },
   { "title": "Porter's Five Forces", "summary": "The model explains average industry profitability through rivalry, threat of entry, substitutes, buyer power and supplier power. Stronger competitive forces reduce attractiveness; entry barriers protect incumbents, while high exit barriers can keep unprofitable capacity in the market.", "keyPoints": ["Rivalry rises with many balanced competitors, slow growth, low differentiation, high fixed costs, excess capacity and high exit barriers.", "The threat of entry falls when scale economies, capital needs, switching costs, access, differentiation or regulation create barriers.", "Substitutes come from another industry but perform the same function, limiting the price and profit an industry can sustain.", "Powerful buyers press prices down or demand more value; powerful suppliers raise input prices or restrict terms and availability.", "Industry attractiveness is inversely related to the combined strength of these competitive pressures."], "exam": "A strong force is unfavourable for average profitability. Also keep entry barriers and exit barriers separate: high entry barriers help incumbents, while high exit barriers intensify rivalry.", "filter": "Five Forces", "status": "covered" },
   { "title": "Competitor analysis", "summary": "Competitor analysis identifies direct rivals, gathers competitive intelligence and anticipates their objectives, assumptions and likely moves. Strategic groups help separate firms that compete with similar positions from those following different models in the same industry.", "keyPoints": ["Identify the competitors that serve similar customers and needs with comparable products or business models.", "Study each rival's objectives, current strategy, resources, capabilities, assumptions and likely reactions.", "Competitive intelligence uses lawful public and market information to reduce uncertainty about rival behaviour.", "Strategic-group maps cluster firms with similar strategic dimensions such as price, breadth, quality, channels or integration.", "Mobility barriers make movement between groups difficult and help explain differences in rivalry and profitability."], "exam": "A substitute is not automatically a direct competitor. Competitors operate inside the defined arena; substitutes come from outside it while satisfying the same function.", "filter": "Complements & Competitors", "status": "covered" },
   { "title": "Profit pool mapping", "summary": "A profit pool maps revenue and profit across the activities of an industry's value chain. The largest revenue segment is not necessarily the most profitable, so the analysis reveals where value is actually captured rather than merely where sales occur.", "keyPoints": ["Break the industry's value chain into economically meaningful activities or stages.", "Estimate the revenue generated by each activity and the profit retained there during the same period.", "Represent width as revenue and height as margin so the area reflects the absolute profit pool.", "Compare activities to find where bargaining power, scarcity, differentiation or recurring relationships concentrate profit.", "Use the result to question where the firm should participate, integrate, partner or shift resources."], "exam": "Revenue share and profit share are different. A large low-margin activity can generate less profit than a smaller stage with a high margin.", "filter": "Complements & Competitors", "status": "covered" },
   { "title": "Customers and market demand", "summary": "Customer analysis studies total demand, its evolution, buying criteria and the segments with different needs or behaviours. Segmentation matters because an apparently attractive market can contain groups with very different willingness to pay and bargaining power.", "keyPoints": ["Measure market size, growth, cyclicality and the drivers that expand or contract total demand.", "Identify who buys, who uses, who influences and who pays; these roles may belong to different actors.", "Understand customer needs, purchase criteria, willingness to pay, price sensitivity and switching behaviour.", "Segment customers into groups that are internally similar and meaningfully different in needs or economics.", "Evaluate segment size, growth, accessibility, profitability and bargaining power rather than relying only on headline market growth."], "exam": "Segmentation is not just demographic description. A useful segment must change how demand, value, competition or the required strategy is understood.", "filter": "Substitutes, Buyers & Suppliers", "status": "covered" },
   { "title": "Key success factors", "summary": "Key success factors are the conditions any firm must meet to compete successfully in a specific business area. They come from demand and competition, so they are external requirements—not the same thing as the resources or strengths a particular firm already owns.", "keyPoints": ["Start with demand: what do customers value, how do they choose and what must an acceptable offer deliver?", "Add competition: which capabilities or positions are necessary to survive the dominant forces and rival behaviour?", "Keep the list short and specific to the business area; generic virtues such as 'good management' explain little.", "Distinguish threshold factors required to participate from factors that can create superior performance.", "Internal analysis later asks whether the focal company possesses the resources and capabilities needed to meet them."], "exam": "A key success factor is an external industry requirement; a strength is an internal firm attribute. Do not write the same list under both headings without testing ownership.", "filter": "External Analysis", "status": "covered" },
   { "title": "Opportunities and threats", "summary": "The final step translates the external evidence into opportunities and threats for firms in the business area. Opportunities and threats are external by definition; a firm's inability to respond is an internal weakness and belongs on the other side of SWOT.", "keyPoints": ["Opportunities are external developments that could improve demand, positioning, profitability or access to resources.", "Threats are external developments that could reduce attractiveness, intensify competition or undermine existing value creation.", "Each item should follow from evidence in STEEP, industry, competitor or customer analysis rather than from brainstorming alone.", "State the mechanism, affected actors, likely magnitude, timing and uncertainty to make the conclusion actionable.", "The same trend can create an opportunity for some firms and a threat for others, but the underlying event remains external."], "exam": "Do not label an internal deficiency as a threat. The external change is the threat; lacking the capability to respond is a weakness revealed by internal analysis.", "filter": "External Analysis", "status": "covered" }
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
 },
 {
  "cat": "Sources of Advantage",
  "title": "Competitive Advantage Defined",
  "meaning": "When two or more firms compete within the same market, one has a competitive advantage over its rivals when it earns, or has the potential to earn, a persistently higher rate of profit.",
  "how": "The deck splits the topic into four questions: how and why a company makes more or less profit than its competitors, the types and sources of competitive advantage, the selection of the grand strategy, and the company's positioning.",
  "trap": "Two words carry the definition. Potential: a firm can hold an advantage it is not yet exploiting. Persistently: one good year is not an advantage."
 },
 {
  "cat": "Sources of Advantage",
  "title": "External and Internal Sources of Change",
  "meaning": "Competitive advantage emerges from change, and Grant separates where the change comes from.",
  "how": "External sources are changing customer demand, changing prices and technological change. Internal sources explain why change hits firms differently: resources are heterogeneous, some firms have greater creative and innovative capability, and some are faster and more effective in exploiting change.",
  "trap": "External change is an opportunity for every firm in the market. What turns it into an advantage for one of them is the internal side: who is equipped to exploit it."
 },
 {
  "cat": "Sources of Advantage",
  "title": "Zara and the Speed of Response",
  "meaning": "The deck's example of a firm exploiting fast-changing customer demand.",
  "how": "Zara designs on the basis of sales in its stores (a pull model), brings products to market in as little as four weeks, invests in attractive showcases, merchandising and stores, and plans on fabrics and semi-finished products rather than finished goods. The result is a very high rotation rate at reduced risk.",
  "trap": "The advantage is speed, not the lowest price: in the words of Inditex's former CEO, stocks in clothing are like fresh products, highly perishable."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Cost Drivers",
  "meaning": "The levers behind a cost advantage: delivering the same or similar products as competitors at lower cost.",
  "how": "Capacity utilization (how saturated assets and resources are), economies of scale, economies of learning, production techniques, product design, and preferential access to input factors such as people, raw materials, capital and services, often through location.",
  "trap": "Scale is one driver out of six. A smaller firm can still win on utilization, design, technique or location."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Scale versus Learning",
  "meaning": "Two different sources of lower unit cost that are easily confused.",
  "how": "Economies of scale are captured at one point in time when output increases, from technical input-output relationships, indivisibilities and specialised equipment, down to the minimum efficient scale; beyond a point there are diseconomies of scale as coordination costs grow. Economies of learning accumulate over time: costs decline about 20 to 30 percent in real terms each time cumulative production doubles. Learning flattens out but has no diseconomies.",
  "trap": "The learning curve is not automatic. The slides stress that the cost decline requires management."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Drivers of Uniqueness",
  "meaning": "The supply-side sources of a differentiation advantage.",
  "how": "Product features and performance, service procedures, intensity of marketing campaigns and brand, technology embodied, quality of inputs, availability of complements (an ecosystem), skills and experience of employees, and location. Differentiation also needs product integrity, communication of the product's characteristics and reputation built through quality signals, advertising spending and premium prices.",
  "trap": "Differentiation is usually a bundle of factors, and it is costly: the deck adds that differentiation does not mean neglecting costs."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Porter's Grand Strategies",
  "meaning": "The four basic positions obtained by crossing competitive scope with strategic position.",
  "how": "With a broad scope a firm pursues cost leadership or differentiation; with a narrow scope, focused cost leadership or focused differentiation. An integration strategy combines cost leadership and differentiation, as IKEA, Toyota and Target do.",
  "trap": "Cost leadership means being the lowest-cost organisation, lower than all competitors. Being second- or third-lowest is always at risk of being undercut on price."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Integration Strategy",
  "meaning": "A strategy that combines differentiation and cost leadership.",
  "how": "Its drivers create value and cut cost at the same time: quality, which raises perceived value and lowers after-sale costs; economies of scope; and mass customisation. Target competes with Nordstrom on cost and with Walmart on the shopping experience, almost reaching Walmart's cost position.",
  "trap": "Done badly it leaves the firm stuck in the middle, with neither the lowest cost nor a difference customers value."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Positioning and the Perceptual Map",
  "meaning": "Positioning is the firm's decision about how it wants to be perceived: designing the offer and image to occupy a precise place in the target customers' minds (Kotler).",
  "how": "First identify the attributes customers consider important for purchase, then map the firm's offer and its competitors' on them; the value curve shows the relative level on each key variable. Positioning succeeds when it addresses a specific target, focuses on the variables relevant for that segment, offers an exclusive or at least superior advantage in customers' perception, and is durable and consistent over time.",
  "trap": "You do not need the best product. BMW stresses the joy of driving and Volvo safety: they win different customers by stressing different purchase criteria."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "Core Competencies",
  "meaning": "The strategic resources at the root of a company's competitive advantage: unique strengths deeply embedded within the company.",
  "how": "They are created by the interplay of resources (tangible and intangible assets), capabilities (the organisational and managerial skills to orchestrate the resources) and activities (business processes such as delivery, purchasing and product development). Examples from the deck: Netflix's AI for licensing content and personalised recommendations, IKEA's low-cost functional design, Coca-Cola's marketing and distribution.",
  "trap": "A core competence is rarely a single asset. It is a combination, which is also why it is hard to copy."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "Porter's Value Chain",
  "meaning": "An effective way of representing a company as a set of activities linked to its competitive advantage.",
  "how": "Primary activities create the product and transfer it to the buyer: inbound logistics, operations, outbound logistics, marketing and sales, and service. Support activities serve them and each other: firm infrastructure, human resource management, technology development and procurement.",
  "trap": "Procurement is a support activity even though the inputs it buys feed inbound logistics, and after-sale service is a primary activity."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "Resources and Organisational Capabilities",
  "meaning": "What the firm has, and what it can do with it.",
  "how": "Tangible resources are physical and financial means, easy to find on the balance sheet. Intangible resources include brand equity, reputation, culture and intellectual property. Human resources are skills, knowledge, experience and motivation. Organisational capabilities are the skills to orchestrate these resources and deploy them strategically; they are intangible by nature and include structure, routines and culture, as in 3M's innovation process, Walmart's logistics and UPS's delivery process.",
  "trap": "Capabilities never appear on the balance sheet, yet they are often the hardest source of advantage to imitate."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "The VRIO Test",
  "meaning": "Four questions that decide whether a resource, capability or competency is strategically important.",
  "how": "Valuable: relevant to fulfilling a customer need. Rare: scarce and in short supply. Costly to imitate. Organized to capture value. Not valuable gives a competitive disadvantage; valuable but not rare gives parity; valuable and rare but easy to imitate gives a short-term advantage; valuable, rare and inimitable but not organized gives a mid-term advantage; all four give a sustainable advantage.",
  "trap": "A valuable resource that every rival also has gives parity, not advantage."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "Isolating Mechanisms",
  "meaning": "The four characteristics that make resources difficult to imitate.",
  "how": "Unique physical resources, including intellectual property (patents, designs, copyrights, trademarks, trade secrets) and assets such as mines and oil wells. Path dependence: resources built through a continuous process of accumulation that firms cannot compress. Causal ambiguity: competitors cannot understand how the advantage was created, typical when it rests on organisational capabilities. Economic deterrence: the market cannot support two players.",
  "trap": "Path dependence is about time, not money: a rival with more cash still cannot buy years of accumulated learning."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "Organized to Capture Value",
  "meaning": "The O in VRIO: the firm must be able to exploit what it owns.",
  "how": "Appropriate organisational structure, processes, coordinating mechanisms and management systems must be in place to exploit the potential of resources and competencies fully. This is where organisational capabilities come in: the firm's capacity to deploy resources for a desired end result.",
  "trap": "A firm can own a valuable, rare and inimitable resource and still waste it. The EMI and Raytheon lessons make the same point from another angle."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "Value Chain for Cost Analysis",
  "meaning": "How to apply the value chain when the firm pursues a cost advantage.",
  "how": "Three phases: identify the activities generating the most relevant costs (a Pareto analysis; fixed or variable, internal or external costs; differences in how competitors run them), identify the specific cost drivers of each activity, and identify opportunities for cost reduction. In the car industry, for example, component prices depend on the number of components, order sizes, purchases per supplier and supplier location.",
  "trap": "Start from the costs that matter, which is what the Pareto analysis is for, not from the activities that are easiest to analyse."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "Linking Value Chains for Differentiation",
  "meaning": "How to apply the value chain when the firm pursues differentiation.",
  "how": "Three phases: identify the key performance for the customer, identify the activities that affect it and how, and identify differentiation opportunities. In the metal containers example the producer's activities are linked to the customer's: distinctive can design supports the customer's marketing, tight tolerances avoid breakdowns on its canning lines, fast and flexible delivery cuts its inventory, and skilled maintenance keeps its packaging lines running.",
  "trap": "In B2B the value is created in the customer's value chain, so you have to map theirs, not only your own."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "Appraising Resources: The Four Zones",
  "meaning": "Benchmarking strategic resources against competitors to identify strengths and weaknesses.",
  "how": "Each resource or capability is rated for strategic importance and relative strength on a 1 to 10 scale, where 5 means parity with competitors. High importance and high strength are key strengths; high importance and low strength are key weaknesses; low importance and high strength are superfluous strengths; low and low is the zone of irrelevance. In the Volkswagen example engineering is a key strength, product development and marketing are key weaknesses, and government relations is a superfluous strength.",
  "trap": "A superfluous strength is still a strength. The question is whether to keep investing in it, not whether it exists."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "SWOT as the End of Diagnosis",
  "meaning": "The SWOT analysis crosses the internal analysis (strengths and weaknesses) with the external analysis (opportunities and threats).",
  "how": "It closes the diagnosis phase of the strategic decisions process and feeds the generation and selection of strategic alternatives, which belong to strategy formulation.",
  "trap": "SWOT describes the situation; it does not choose the alternative. That choice comes from the crossings and the roadmap."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "The Four Strategic Questions",
  "meaning": "Crossing the SWOT quadrants turns the analysis into strategic alternatives (Rothaermel).",
  "how": "S–O: how can we use our strengths to take advantage of opportunities? S–T: how can we use our strengths to reduce the likelihood and impact of threats? W–O: how can we overcome the weaknesses that prevent us from taking advantage of opportunities? W–T: how can we overcome the weaknesses that will make threats a reality? The course applies it to McDonald's.",
  "trap": "Four lists of bullet points are not a SWOT analysis. The value is in the crossings, which produce concrete actions."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "Roadmapping Strategic Actions",
  "meaning": "Turning the generated alternatives into a sequence of actions.",
  "how": "Each strategic action is assessed against two conditions: the expected economic impact, in terms of profit generated or loss reduced, and the expected implementation problems, in terms of actions to be taken, organisational change and number of activities involved. Placing actions on these two dimensions creates the roadmap.",
  "trap": "High impact alone does not decide priority: an action with severe implementation problems may come after an easier one with a similar impact."
 },
 {
  "cat": "Repositioning",
  "title": "Repositioning",
  "meaning": "A strategy to change the target audience's perception of the company's products or services.",
  "how": "It becomes necessary when a company is mispositioned, failing to connect its brand with its target audience, but also when changes are under way. The deck lists five reasons: stronger competition, faulty positioning (an under-positioned or too narrowly defined brand), product evolution and customer trends, environmental changes, and future plans.",
  "trap": "It is a difficult transition because the brand image in customers' minds is deep-seated: keeping continuity with the past helps customers keep recognising the product."
 },
 {
  "cat": "Repositioning",
  "title": "Signs Repositioning Is Needed",
  "meaning": "The warning signals listed in the deck, with the cases that illustrate them.",
  "how": "A downward trend in sales, a shrinking core audience, industry shake-ups, product line updates inconsistent with the old brand promise, a value proposition outdated for the current culture or market, lack of appeal to younger generations, and brand confusion or negative associations. Lego in 2003 (new CEO Knudstorp, sale of theme parks, crowdsourcing from fans, partnerships), McDonald's (from fast food to fresh, from unhealthy to healthy) and Domino's (new recipe and a transparent campaign) repositioned successfully.",
  "trap": "Repositioning is not reserved for failing brands: changes in customer trends or the firm's future plans can call for it too."
 },
 {
  "cat": "Repositioning",
  "title": "The JCPenney Lesson",
  "meaning": "The deck's example of a repositioning that left the firm stuck in the middle.",
  "how": "In 2011 Ron Johnson, who had built Apple's retail stores, moved JCPenney from cost leadership towards an integration strategy: in-store boutiques, exclusive merchandise, no clearance racks and no discount coupons, implemented in all 1,800 stores at once without pre-testing. Within 12 months sales fell by 25 percent, and less than 18 months in he was replaced by his predecessor.",
  "trap": "The failure was as much in the implementation as in the idea: no pre-testing, and removing what core customers valued."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "Business Model Defined",
  "meaning": "A comprehensive set of strategic decisions defining the way a company creates value, transfers value to its customers and captures value.",
  "how": "Drafting a business model is a powerful tool to evaluate strategic alternatives, checking their soundness and their consistency with the overall structure of the company. The most widely used representation is the Business Model Canvas (Osterwalder, 2010).",
  "trap": "A business model is not the revenue model: revenue streams are one of nine building blocks."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "The Nine Building Blocks",
  "meaning": "The canvas describes a business model through nine blocks.",
  "how": "Customer segments, value proposition, channels, customer relationships, revenue streams, key resources, key activities, key partners and cost structure. Two alternative readings group them as value network, value proposition and customer interface, and economic model; or as value creation on the left and value capture on the right.",
  "trap": "The cost structure is not an independent choice: it is a direct result of all the other blocks, and ideally each cost can be traced back to one of them."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "Channels and Customer Relationships",
  "meaning": "How the company reaches customers and what kind of relationship it keeps with each segment.",
  "how": "Channels are direct (sales force, web) or indirect (dealers, partners, wholesalers) and serve five functions: create awareness, support evaluation, allow purchase, deliver the value proposition and support the customer after the sale. Relationships range from personal assistance and dedicated personal assistance to self-service, automated services, online communities and co-creation.",
  "trap": "Match cost to value: cost-intensive channels for very profitable clients, cost-efficient ones for unprofitable clients; and customers paying a high price expect a high-touch relationship."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Bait and Hook",
  "meaning": "An attractive, inexpensive or free initial offer that encourages continuing future purchases of related products.",
  "how": "Gillette sells the razor handle once and the blades frequently, with a built-in lock-in. Nespresso, invented by Eric Favre in 1975 and patented in 1976, took off after Jean-Paul Gaillard introduced the Le Club community, reduced machine prices while raising capsule prices, turned the office machine into a luxury consumer brand and licensed machine production to other companies.",
  "trap": "The profit is in the hook, not the bait. Without a lock-in such as patents or compatibility, customers buy the bait and the hook elsewhere."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Multi-sided Business Models",
  "meaning": "Business models that serve several interdependent customer segments with distinct value propositions.",
  "how": "Xbox and PlayStation sell high-performance consoles to hard-core gamers at a loss and earn royalties from game developers, while the Wii sold profitable hardware to casual gamers. Google offers free search to web surfers, targeted ads to advertisers and free content services to content owners, with one main revenue stream, keyword auctions, subsidising the other offers.",
  "trap": "The segments are interdependent: the free side is not charity, it is what makes the paying side valuable."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Free, Freemium and Business Model Innovation",
  "meaning": "Patterns that give part of the offer away, and how to design new models.",
  "how": "In the free model the basic service is free and someone else pays, as advertisers pay for the Metro free commuter paper. In freemium the basic service is free and premium services are paid: paid SkypeOut calls were less than 10% of total usage, while over 90% of Skype users used the free service. Dell's direct sales and assemble-to-order model was itself a business model innovation. The method to innovate is the “what if…” question: map the existing model, change one or more blocks, and work out the changes needed in the others.",
  "trap": "Dell's innovation was not the PC but the business model: no retailer margin, immediate payment and very low stock."
 },
 {
  "cat": "Vertical Integration",
  "title": "Three Corporate Decisions",
  "meaning": "Corporate strategy deals with three decisions about where the firm competes.",
  "how": "In which stages of the industry value chain to participate, which determines vertical integration; what range of products and services to offer, which determines diversification; and where to compete, which determines geographic scope and internationalisation.",
  "trap": "Corporate strategy decides where to compete; business strategy decides how to compete within each business."
 },
 {
  "cat": "Vertical Integration",
  "title": "Advantages and Risks of Vertical Integration",
  "meaning": "Integrating backward (towards suppliers) or forward (towards customers) along the industry value chain.",
  "how": "Advantages: embodying higher margins, reducing transaction costs, improving quality, securing critical supplies (backward) and distribution channels (forward), learning, independence from suppliers, and easier scheduling and planning. Risks: compounding risk, lower flexibility, low incentives to lower costs because of a captive market, and lower efficiency than specialised suppliers.",
  "trap": "The captive market is the subtle risk: an in-house supplier does not have to win the business, so it has less reason to cut costs."
 },
 {
  "cat": "Vertical Integration",
  "title": "Forms of Vertical Relations",
  "meaning": "Vertical integration is one end of a spectrum.",
  "how": "From low to high commitment and formalisation: spot sales and purchases, informal supplier-customer relationships, long-term contracts, agency agreements and franchises, supplier-customer partnerships, joint ventures, and full vertical integration. Taper integration combines integration with reliance on outside suppliers or distributors. De Beers integrated forward into jewellery (“from mine to finger”); Lenovo's end-to-end model with its own manufacturing is a source of cost advantage.",
  "trap": "Integration is not a yes-or-no choice: lighter forms can secure supply or channels without the risks of ownership."
 },
 {
  "cat": "Diversification",
  "title": "Motives for Diversification",
  "meaning": "Why firms enter new businesses, and how thinking on it has changed.",
  "how": "The traditional motives are growth, risk reduction, escape from unattractive industry environments and the use of surplus cash flow, as the large cash holdings of Big Tech show. After the diversification era of 1950 to 1980 came refocusing, driven by the emphasis on shareholder value, turbulence that favoured specialisation, and the recognition that sharing resources and capabilities is the real source of advantage.",
  "trap": "Growth and risk reduction alone are not a source of advantage; the refocusing era is the evidence."
 },
 {
  "cat": "Diversification",
  "title": "Economies of Scope",
  "meaning": "Economies that exist when using a resource across multiple activities uses less of that resource than carrying out the activities independently.",
  "how": "They arise from tangible and intangible assets such as distribution channels, R&D labs, sales forces, IT systems, brands and production facilities (P&G, Honda), from organisational capabilities (LVMH), and from contracting out and licensing (Disney). Diversification can also exploit internal markets, financial resources and shared administrative activities.",
  "trap": "Economies of scope come from sharing, so they exist only where businesses are actually related."
 },
 {
  "cat": "Diversification",
  "title": "Related versus Unrelated Portfolios",
  "meaning": "Real portfolios mix related and unrelated businesses.",
  "how": "Unrelated portfolios offer financial economies, restructuring, internal capital markets, risk reduction and shared human resources and administration, at the cost of coordination costs, cultural heterogeneity and organisational complexity. Related portfolios add shared resources, economies of scale and scope and critical mass, at the cost of coordination complexity, higher risk than unrelated portfolios and managerial complexity. Rumelt's types run from single business (over 95% of revenues from one business) and dominant business (70 to 95%) to related and unrelated diversification (under 70%).",
  "trap": "Related portfolios carry higher risk than unrelated ones: what they share also exposes them to the same shocks."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "The BCG Matrix",
  "meaning": "A portfolio tool that classifies businesses by market growth and relative market share.",
  "how": "Relative market share is the company's share divided by the share of its largest competitor, excluding the company itself, with a cut-off at 1. Stars combine high growth and high share, cash cows low growth and high share, question marks high growth and low share, and dogs low growth and low share.",
  "trap": "Relative, not absolute: a 22% share is high only if the largest rival has less than 22%."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "The GE/McKinsey Matrix",
  "meaning": "A nine-cell strategy screen developed by McKinsey for GE in 1971.",
  "how": "Its two dimensions, market segment attractiveness and business strength, are each built from many weighted variables. Attractiveness: market size, growth rate, profit margin potential, competitive intensity, cyclical or seasonal sales and position on the learning curve. Strength: relative market share, price competitiveness, quality perception, market knowledge and customer loyalty, sales effectiveness and geographic coverage. Cells fall into three zones: invest and grow, selectivity and earnings, harvest and divest.",
  "trap": "Unlike BCG it uses multiple measures for each axis, so the same business can land differently depending on the weights chosen."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "General Electric's Break-up",
  "meaning": "The deck's example of a conglomerate that unwound.",
  "how": "GE spanned power, renewable energy, aviation, healthcare, financial services (GE Capital) and digital. The deck lists ill-judged acquisitions, overoptimism, accounting practices in which GE Capital assets were bought and sold to keep earnings rising, and management systems based on manager rotation. GE is now three independent listed companies: GE Aerospace, the legal successor, GE HealthCare and GE Vernova.",
  "trap": "The problems listed are managerial, not only a matter of the businesses' attractiveness."
 },
 {
  "cat": "Marketing Basics",
  "title": "Market, Exchange and Transaction",
  "meaning": "The basic vocabulary of marketing: market, customer, exchange and value.",
  "how": "A market is a system that facilitates the exchange of goods and services, bringing buyers and sellers into contact either directly or through intermediaries such as agents or institutions (Kotler). An industry is the set of sellers competing to serve a market. Exchange is the process of obtaining a desired product from someone by offering something in return; when an agreement is reached, a transaction takes place.",
  "trap": "Market and industry are not synonyms: the market is the customers around a need, the industry is the sellers serving it."
 },
 {
  "cat": "Marketing Basics",
  "title": "What Marketing Is",
  "meaning": "Marketing, in the American Marketing Association's definition (2007, reaffirmed 2017), is the activity, set of institutions and processes for creating, communicating, delivering and exchanging offerings that have value for customers, clients, partners and society at large.",
  "how": "Marketing starts with the customer's problem: customers rarely want products per se, products are means to achieve something. Modern marketing also takes the stakeholder perspective, not only customers and firm profits.",
  "trap": "Marketing is not the same as selling or advertising: those are parts of it."
 },
 {
  "cat": "Marketing Basics",
  "title": "Four Orientations to the Market",
  "meaning": "How a company can approach the market, from “sell what you make” to “produce what can be sold”.",
  "how": "Production orientation asks how to produce efficiently (Henry Ford: any colour, as long as it is black). Product orientation asks how to build the best product (Steve Jobs: people don't know what they want until you show it to them). Sales orientation asks how to sell what is produced (Sergio Zyman of Coca-Cola: sell more stuff to more people, more often, for more money). Marketing orientation asks what the market values and how to serve it better.",
  "trap": "The Google Glass case shows the risk of the product orientation: forecast in 2013 to sell millions by 2016, it was withdrawn from sale in January 2015."
 },
 {
  "cat": "Marketing Basics",
  "title": "Strategic and Operational Marketing",
  "meaning": "The marketing reference framework split into choices and execution.",
  "how": "Context analysis (external and internal), segmentation, targeting and positioning form strategic marketing: where to play and how to win. The value proposition defined through the marketing mix (product, place, price, promotion) and implementation and control form operational marketing: how to execute. Operational decisions have short- to medium-term effects, use limited resources, can be revised on market feedback and are often handled by middle management.",
  "trap": "STP is strategic, not operational: it decides who to serve and how to be perceived before any 4P decision."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Need, Want and Demand",
  "meaning": "Where the marketing process starts: understanding the market.",
  "how": "A need is a perceived state of deprivation; a want is a need directed toward a specific solution; demand is a want backed by willingness and ability to buy. Market demand is the total quantity of a product or service that consumers are willing and able to purchase at a given price within a specific period. Demand is analysed from a macro viewpoint (defining, qualifying and measuring the market) and a micro viewpoint (needs, buying behaviour, offering and competitive system).",
  "trap": "Demand needs both willingness and ability: a want without purchasing power is not demand."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Market Qualification Levels",
  "meaning": "The market is narrowed in five steps, illustrated with the Range Rover Evoque in Italy.",
  "how": "Potential market: people interested in premium SUVs. Qualified market: adults with a driving licence. Available market: upper-middle income professionals in big cities, earning over €85k, with a dealer nearby. Served or target market: urban professionals in Milan, Rome and Turin. Penetrated market: those who actually bought, for example 5,000 Evoques in 2024. Market share, an indicator of competitive capacity, is the company's sales over total market demand.",
  "trap": "Each level is a subset of the previous one; penetration is measured against the served market, not the potential one."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Price Elasticity and Expansible Markets",
  "meaning": "How sensitive demand is to price and to marketing effort.",
  "how": "Price elasticity measures how a relative variation of price affects the relative variation of quantity sold: E = (ΔQ/Q) ÷ (ΔP/P). Demand is elastic when |E| is above 1 and inelastic below 1. An expansible market is one whose total demand can be significantly increased by marketing efforts; a non-expansible one stays close to its potential whatever the effort. Demand depends on endogenous variables controlled by the firm (price, product, point of sale, communication, personal relationship) and exogenous ones (macro-environment, economic trends, disposable income, competition, complements, substitutes).",
  "trap": "Elasticity uses relative changes, not absolute ones: a €1 cut means very different things on a €6 and a €60 product."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Explicit and Hidden Customer Costs",
  "meaning": "Customer value is the balance between customer benefits and customer costs, which are not only monetary.",
  "how": "The marketing goal is to create customer value by providing benefits that are genuinely valued, in ways competitors fail to deliver, and by uncovering the costs and risks the customer incurs in the buying process and reducing them before competitors. Explicit costs and risks are monetary. Hidden costs are measured in effort (time to buy, difficulty processing the product's characteristics and understanding which information matters) and in risk of a poor choice.",
  "trap": "Explicit costs are visible to every competitor, so cutting them contracts margins and leads to price wars; hidden costs are where differentiation is possible."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "The B2C Buying Process",
  "meaning": "The five phases a consumer goes through, and why some are skipped.",
  "how": "Problem recognition; information search (internal from past experience, external from personal, public and marketing sources); evaluation of alternatives against decision criteria; the purchase decision, about from whom and when to buy; and post-purchase behaviour, comparing expectations with experience. Customers skip or minimise steps when involvement is low; involvement depends on the importance (cost) of the purchase, its personal consequences and its effect on social and self-image.",
  "trap": "Purchase and consumption are usually of limited importance in a consumer's life, which is why social, cultural and psychological variables weigh so much."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "The FCB Grid",
  "meaning": "Foote, Cone & Belding's grid (1987) crosses involvement with thinking or feeling.",
  "how": "High involvement and thinking (insurance, appliances, cameras) call for information, reviews, detailed rational arguments and guarantees. High involvement and feeling (sports cars, luxury watches, perfume) call for emotional storytelling and aspirational imagery. Low involvement and thinking (detergents, bleach, motor oil) call for promotions, price, distribution and reminders. Low involvement and feeling (snacks, soft drinks, beer) call for brand personality, packaging and sensory cues.",
  "trap": "The grid tells you which marketing levers to pull, not which product is better."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "B2B Demand",
  "meaning": "Business demand differs from consumer demand on almost every dimension.",
  "how": "B2B markets are concentrated and interdependent; demand is derived from business needs and from demand for the end product; purchases come in high volumes, often through contracts; demand is less price-sensitive when the product is essential to operations; decisions are driven by efficiency, production needs and ROI; demand is more stable and forecastable; purchases are infrequent but recurring; and offers are often tailored.",
  "trap": "Derived demand means a B2B supplier's fortunes depend on its customers' customers."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "The Purchasing Centre",
  "meaning": "In B2B the buyer is not one person but a purchasing centre.",
  "how": "Initiator: identifies the need. Influencer: provides information and evaluation criteria. Decider: has the authority to choose and approve. Buyer: has the formal authority to negotiate with the supplier. User: uses the product and may define specifications. In the 3D-printer example: the production manager, the lead industrial engineer, the COO or CEO, the procurement manager and the line workers. Its needs are technical, economic-financial, assistance and information needs.",
  "trap": "Each role maximises different objectives, so the marketer must identify the roles, keep them distinct and approach each on its own objectives."
 },
 {
  "cat": "Segmentation Basics",
  "title": "Segmentation and the STP Process",
  "meaning": "Segmentation is the marketing process through which the company divides the market into sub-groups with different demand profiles but internally homogeneous, for which management develops specific marketing plans.",
  "how": "It is the first step of STP: segmentation (identify variables, slice the market, profile segments), targeting and positioning. It sits between undifferentiated marketing and one-to-one marketing, and it is needed because markets are too broad and too diverse in preferences, resources, locations, attitudes and buying habits.",
  "trap": "There is no single best product: Prego tested 45 variants of tomato sauce and found preferences that only groups of customers share."
 },
 {
  "cat": "Segmentation Basics",
  "title": "Advantages and Costs of Segmenting",
  "meaning": "Segmentation brings benefits to both sides, at a price.",
  "how": "For the organisation: lower complexity in managing the market, prioritised allocation of marketing resources (by current and future value of segments) and increased competitive advantage, leading to sustainable profit growth. For the customer: convenience and time savings, tailored products and personalised experiences. Disadvantages: different products for different segments, higher production and distribution costs, fragmented advertising costs and more market research. Modularisation limits the cost of variety.",
  "trap": "The costs grow with the number of segments, which is why the lecture insists on segments large enough to justify a targeted action."
 },
 {
  "cat": "Segmentation Basics",
  "title": "What Makes a Good Segment",
  "meaning": "Segments need internal similarity and external diversity, plus five characteristics.",
  "how": "Measurability: size and buying power can be measured. Accessibility: the segment can really be reached by marketing actions. Homogeneity within the segment and heterogeneity compared with others. Importance: large enough to justify a targeted marketing action. Duration: it can be exploited for a reasonable period of time.",
  "trap": "A segment that cannot be reached with marketing actions is useless, however attractive its profile."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Product versus Customer Segmentation",
  "meaning": "Two main approaches to segmenting a market.",
  "how": "Segmenting by product, as GM did when it split the US car market into six segments in 1921, is simple, immediate and clear, but ignores customers' characteristics and gives little visibility of competition among products. In mature, competitive markets companies segment by customer: by characteristics (socio-demographic, geographic, psychographic), by behaviour (product usage, buying process) and by needs (benefits sought).",
  "trap": "Product segmentation made sense when the main problem was production in markets with little competition."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Observability versus Differentiation Potential",
  "meaning": "The segmentation bases trade ease of observation against potential for competitive differentiation.",
  "how": "Socio-demographic variables (which group consumers belong to) are the easiest to observe but offer the least differentiation potential. Behavioural variables (what customers do), psychographic variables (how they think) and needs (what they want) are progressively harder to observe and offer more differentiation potential. Socio-demographics are easily available and stable but inaccurate and too broad alone; behaviour reflects real actions but its data is costly and raises privacy concerns; needs reveal what customers value but are hard to identify and quantify.",
  "trap": "The most useful base for differentiation is the hardest to measure, which is why segmentation usually combines several bases."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Market versus Customer Segmentation",
  "meaning": "The same principles applied to two different units of analysis.",
  "how": "Market segmentation takes the whole market as its unit and relies on external research data (demographics, psychographics, surveys, panels) to produce segment profiles or personas and decide where to compete. Customer segmentation works on the company's own customer database and internal transaction data (recency, frequency and monetary value, purchase history, engagement, churn risk, customer lifetime value) to drive retention, upselling and cross-selling.",
  "trap": "RFM and lifetime value belong to customer segmentation: they describe people who already buy from you."
 },
 {
  "cat": "Segmentation Methods",
  "title": "Cluster Analysis",
  "meaning": "A mathematical segmentation method that needs data from a representative sample.",
  "how": "K-means: choose the number of clusters k, select k random centroids, assign every point to the closest centroid, recompute the centroids of the new clusters, and repeat until the centroids stop changing, points stay in the same cluster or the maximum number of iterations is reached. In the smartwatch case 10,540 respondents aged 18 to 50 in Northern Italy were clustered on utility, privacy, social impact, brand, community impact and product; the “fashion lovers” see wearables as accessories.",
  "trap": "The analyst still chooses k and the variables: a mathematical method is not free of judgement."
 },
 {
  "cat": "Segmentation Methods",
  "title": "Heuristic Segmentation Methods",
  "meaning": "Empirical, mostly qualitative methods based on the marketer's experience.",
  "how": "Successive elimination (Porter, 1987): a checklist of variables, pairwise comparison in a matrix, elimination of irrelevant crossings and contradictions, gradual combination of variables, then products entered by use (the Tesla example). The two-step approach (Wind and Cardozo, 1974): macro-segmentation on company-level variables, then micro-segmentation on decision makers' needs. The nested approach (Bonoma and Shapiro, 1982): five nests from the most observable to the most individual variables.",
  "trap": "The two-step and nested approaches are built for B2B markets, where the firm and the individual decision makers are segmented separately."
 },
 {
  "cat": "Segmentation Methods",
  "title": "Validating and Describing Segments",
  "meaning": "Segments must be tested before strategic decisions are made on them.",
  "how": "Statistical validation checks reliability, discriminant validity and predictive power. Managerial validation checks that segments make sense in the real world, are recognisable by sales and marketing teams and can be served with a different marketing mix. Strategic validation checks fit with brand positioning and long-term objectives. Validated segments are then described in profiles, product-market mixes and personas (semi-fictional representations of an ideal customer); digital twins go further and simulate how a consumer would react to campaigns before launch.",
  "trap": "A statistically perfect segment can still fail managerial validation if the sales force cannot recognise it."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Five Coverage Patterns",
  "meaning": "After segmentation the firm chooses which segments to serve and how to cover them.",
  "how": "Single-segment concentration: one line of products for one specific target, as luxury players such as Rolex or Ferrari do. Selective specialisation: different solutions for different targets. Product specialisation: the same solution for different markets. Market specialisation: different solutions for the same market. Full market coverage: broad solutions for every target, as L'Oréal does.",
  "trap": "Product and market specialisation are easily swapped: product specialisation keeps the product and varies the market, market specialisation keeps the customer group and varies the products."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Choosing Target Segments",
  "meaning": "Targeting weighs the attractiveness of each segment against the firm's fit with it.",
  "how": "Attractiveness comes from the external analysis: size, growth, profitability and competitive intensity of the segment. Fit comes from the internal analysis: whether the firm's resources, competencies and objectives allow it to serve the segment better than rivals.",
  "trap": "An attractive segment the firm cannot serve well is a trap: competitors with a better fit will take it."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Schema Theory in Positioning",
  "meaning": "A schema is a mental framework, a set of ideas and expectations about something.",
  "how": "In a restaurant you expect a menu, waiters and tables, and to pay at the end. When a new product fits consumers' existing schema, it is easy to understand and accept; when it does not fit, consumers may feel confused or resist it. Positioning has to take the target's schemas into account.",
  "trap": "Being different helps only if customers can still recognise what the offer is."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "The Traditional Positioning Approach",
  "meaning": "A three-step method to analyse and choose a position.",
  "how": "Identify the relevant attributes, functional and emotional; rate them for the brand and its competitors, typically with Likert-scale surveys; reduce the attributes to a few dimensions and analyse the results, producing a perceptual map and its strategic implications. For emotional attributes, Aaker's brand personality dimensions are sincerity, excitement, competence, sophistication and ruggedness.",
  "trap": "The map is only as good as the attributes: start from what customers consider important for purchase, not from what the company wants to communicate."
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
 },
 {
  "cat": "Sources of Advantage",
  "title": "Defining Competitive Advantage",
  "question": "According to the deck, when does a firm possess a competitive advantage over its rivals in the same market?",
  "options": {
   "A": "When it holds the largest market share in its industry.",
   "B": "When it earns, or has the potential to earn, a persistently higher rate of profit than its rivals.",
   "C": "When it sells at the lowest price in the market.",
   "D": "When its products have the best technical performance."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Market share can come with low profitability; the definition is about the rate of profit.",
   "B": "Correct. Competitive advantage is a persistently higher rate of profit, actual or potential, against rivals in the same market.",
   "C": "Incorrect. Low price is one way to compete, not the definition; a price cut without lower costs destroys profit.",
   "D": "Incorrect. The deck explicitly calls the idea that you need the best product a conventional myth."
  },
  "recap": "Correct. Competitive advantage is a persistently higher rate of profit, actual or potential, against rivals in the same market."
 },
 {
  "cat": "Sources of Advantage",
  "title": "An Internal Source of Change",
  "question": "Which of these is an internal source of competitive advantage in Grant's scheme?",
  "options": {
   "A": "Changing customer demand.",
   "B": "Technological change.",
   "C": "Some firms are faster and more effective than others in exploiting change.",
   "D": "Changing prices."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Changing customer demand is an external source of change.",
   "B": "Incorrect. Technological change is an external source of change.",
   "C": "Correct. Resource heterogeneity, creative capability and speed in exploiting change are the internal sources that make the same change benefit some firms more than others.",
   "D": "Incorrect. Changing prices are an external source of change."
  },
  "recap": "Correct. Resource heterogeneity, creative capability and speed in exploiting change are the internal sources that make the same change benefit some firms more than others."
 },
 {
  "cat": "Sources of Advantage",
  "title": "Zara's Pull Model",
  "question": "What is at the heart of Zara's advantage as the deck presents it?",
  "options": {
   "A": "The lowest manufacturing costs in the industry, from outsourcing to Asia.",
   "B": "Design driven by store sales, a time to market of as little as four weeks, and planning on fabrics rather than finished goods.",
   "C": "Heavy advertising that builds a premium brand.",
   "D": "Exclusive collaborations with famous designers."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Zara's case is about speed of response, not about having the lowest production cost.",
   "B": "Correct. The pull model, the short time to market and planning on semi-finished products give a very high rotation rate at reduced risk.",
   "C": "Incorrect. Zara's attractiveness comes from its stores and showcases and from fresh assortments, not from heavy advertising.",
   "D": "Incorrect. Designer collaborations are not part of the case in the deck."
  },
  "recap": "Correct. The pull model, the short time to market and planning on semi-finished products give a very high rotation rate at reduced risk."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Scale or Learning?",
  "question": "Which statement correctly distinguishes economies of scale from economies of learning?",
  "options": {
   "A": "Learning is captured at one point in time, while scale accumulates over time.",
   "B": "Beyond a point there are diseconomies of scale, while learning flattens out but has no diseconomies.",
   "C": "Both reduce costs automatically as output grows, without any management effort.",
   "D": "Economies of learning exist only in labour-intensive industries."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. It is the reverse: scale is captured at a point in time, learning accumulates with cumulative output.",
   "B": "Correct. Diseconomies of scale appear as coordination and management costs grow; learning declines at some point but has no diseconomies.",
   "C": "Incorrect. The deck stresses that learning-curve cost declines do not occur automatically: they require management.",
   "D": "Incorrect. The deck notes there are industries where learning is weak, but it does not restrict learning to labour-intensive ones."
  },
  "recap": "Correct. Diseconomies of scale appear as coordination and management costs grow; learning declines at some point but has no diseconomies."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Learning Curve Arithmetic",
  "question": "Unit cost is €40 at a cumulative output of 1,000 units, and costs fall 25% each time cumulative output doubles. What is the unit cost at 4,000 units?",
  "options": {
   "A": "€20.00",
   "B": "€22.50",
   "C": "€30.00",
   "D": "€10.00"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is a 50% total fall, as if costs dropped 25 points per doubling of the original cost; the decline compounds on the new cost each time.",
   "B": "Correct. 4,000 is two doublings of 1,000, so the cost is 40 × 0.75 × 0.75 = €22.50.",
   "C": "Incorrect. That is only one doubling (1,000 to 2,000).",
   "D": "Incorrect. That would be a 75% cut, the result of subtracting the percentage three times."
  },
  "recap": "Correct. 4,000 is two doublings of 1,000, so the cost is 40 × 0.75 × 0.75 = €22.50."
 },
 {
  "cat": "Cost & Differentiation",
  "title": "Value of a Differentiation Advantage",
  "question": "A differentiator keeps its price unchanged and, thanks to its unique features, sells 2,000 more units at a unit contribution margin of €15. How does the deck express the economic value created?",
  "options": {
   "A": "ΔCFFO = Δm × Q, because the margin rises.",
   "B": "ΔCFFO = m × ΔQ = €30,000, because volume rises at an unchanged margin.",
   "C": "ΔCFFO = m × Q, the whole contribution margin.",
   "D": "ΔCFFO = ΔP × ΔQ."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the lever when the differentiator raises its price and sales stay unchanged.",
   "B": "Correct. With the price unchanged the margin stays the same and sales grow: ΔCFFO = m × ΔQ = 15 × 2,000 = €30,000.",
   "C": "Incorrect. That is the total contribution, not the change created by the advantage.",
   "D": "Incorrect. This formula does not appear in the deck and mixes price and volume changes."
  },
  "recap": "Correct. With the price unchanged the margin stays the same and sales grow: ΔCFFO = m × ΔQ = 15 × 2,000 = €30,000."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Lowest, Not One of the Lowest",
  "question": "Why does the deck insist that cost leadership means being the lowest-cost organisation, not one of the lowest?",
  "options": {
   "A": "Because only the lowest-cost firm can ignore quality.",
   "B": "Because the second- or third-lowest is always at risk of being undercut on price.",
   "C": "Because low cost is only possible with a narrow scope.",
   "D": "Because the cost leader must also be the price leader in every segment."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The deck says the opposite: low cost cannot be pursued in disregard for quality.",
   "B": "Correct. A firm that is not the lowest-cost player can be undercut by the one that is, so its position is fragile.",
   "C": "Incorrect. Cost leadership is a broad-scope strategy; the narrow version is focused cost leadership.",
   "D": "Incorrect. The deck does not require the cost leader to have the lowest price in every segment."
  },
  "recap": "Correct. A firm that is not the lowest-cost player can be undercut by the one that is, so its position is fragile."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Target as Integrator",
  "question": "In the Nordstrom, Walmart and Target example, which strategy does Target follow?",
  "options": {
   "A": "Cost leadership.",
   "B": "Differentiation.",
   "C": "Integration.",
   "D": "Focused differentiation."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Walmart is the cost leader with its no-frills approach.",
   "B": "Incorrect. Nordstrom is the differentiator, with a luxury department-store experience.",
   "C": "Correct. Target almost reaches Walmart's cost position through efficient logistics while offering a better shopping experience: it combines cost and differentiation.",
   "D": "Incorrect. Target serves a broad market, not a narrow niche."
  },
  "recap": "Correct. Target almost reaches Walmart's cost position through efficient logistics while offering a better shopping experience: it combines cost and differentiation."
 },
 {
  "cat": "Grand Strategies & Positioning",
  "title": "Positioning without the Best Product",
  "question": "What does the BMW versus Volvo example show?",
  "options": {
   "A": "That the brand with the best product always wins the market.",
   "B": "That brands can win different customers by stressing different purchase criteria, without claiming the best product.",
   "C": "That safety is the most important purchase criterion for cars.",
   "D": "That positioning matters only for luxury goods."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The example is used against the myth that you must have the best product.",
   "B": "Correct. BMW stresses the joy of driving and Volvo safety; neither has to prove its car is superior, because they appeal to different customers.",
   "C": "Incorrect. Safety is Volvo's chosen criterion, not a universal ranking.",
   "D": "Incorrect. Positioning applies to any product; the deck's other examples include beer, soap and toothpaste."
  },
  "recap": "Correct. BMW stresses the joy of driving and Volvo safety; neither has to prove its car is superior, because they appeal to different customers."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "Primary or Support?",
  "question": "Which of these is a support activity in Porter's value chain?",
  "options": {
   "A": "Outbound logistics.",
   "B": "Service.",
   "C": "Procurement.",
   "D": "Marketing and sales."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Outbound logistics (order processing, warehousing, distribution) is a primary activity.",
   "B": "Incorrect. After-sale service is a primary activity.",
   "C": "Correct. Procurement, together with firm infrastructure, human resource management and technology development, supports the primary activities.",
   "D": "Incorrect. Marketing and sales is a primary activity."
  },
  "recap": "Correct. Procurement, together with firm infrastructure, human resource management and technology development, supports the primary activities."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "What a Core Competence Is",
  "question": "How does the deck define core competencies?",
  "options": {
   "A": "The largest tangible assets on the company's balance sheet.",
   "B": "Unique strengths deeply embedded in the company, created by the interplay of resources, capabilities and activities.",
   "C": "The activities a company outsources to specialised partners.",
   "D": "The personal skills of the chief executive."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Tangible assets are only one kind of resource and are usually the easiest to find and copy.",
   "B": "Correct. Core competencies arise from the interplay of resources, capabilities and activities, which is what makes them unique and embedded.",
   "C": "Incorrect. Outsourced activities are by definition not embedded in the company.",
   "D": "Incorrect. A core competence belongs to the organisation, not to one person."
  },
  "recap": "Correct. Core competencies arise from the interplay of resources, capabilities and activities, which is what makes them unique and embedded."
 },
 {
  "cat": "Resources & Value Chain",
  "title": "Capabilities and the Balance Sheet",
  "question": "Why are organisational capabilities rarely found on a firm's balance sheet?",
  "options": {
   "A": "Because accounting rules forbid reporting them as liabilities.",
   "B": "Because they are intangible by nature: structure, routines and culture used to orchestrate resources.",
   "C": "Because they belong to suppliers rather than to the firm.",
   "D": "Because they have no economic value."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The point is not about liabilities: capabilities are skills, not recorded items.",
   "B": "Correct. Capabilities are the intangible skills to orchestrate tangible, intangible and human resources, embodied in structure, routines and culture.",
   "C": "Incorrect. Capabilities are the firm's own; collaborations are a way to access resources the firm lacks.",
   "D": "Incorrect. They are often the foundation of a long-term, defendable advantage."
  },
  "recap": "Correct. Capabilities are the intangible skills to orchestrate tangible, intangible and human resources, embodied in structure, routines and culture."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "Valuable but Common",
  "question": "A resource is valuable, but every competitor has it too. What does the VRIO framework conclude?",
  "options": {
   "A": "Sustainable competitive advantage.",
   "B": "Competitive parity.",
   "C": "Competitive disadvantage.",
   "D": "Short-term competitive advantage."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A sustainable advantage needs the resource to be rare, costly to imitate and organized too.",
   "B": "Correct. Valuable but not rare: every rival can deliver the same value, so the result is parity.",
   "C": "Incorrect. Disadvantage is the outcome when the resource is not even valuable.",
   "D": "Incorrect. A short-term advantage needs the resource to be rare as well as valuable."
  },
  "recap": "Correct. Valuable but not rare: every rival can deliver the same value, so the result is parity."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "Path Dependence",
  "question": "Which isolating mechanism describes a resource that must be built through continuous accumulation over time and cannot be acquired instantly?",
  "options": {
   "A": "Causal ambiguity.",
   "B": "Economic deterrence.",
   "C": "Path dependence.",
   "D": "Intellectual property protection."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Causal ambiguity is about rivals not understanding how the advantage was created.",
   "B": "Incorrect. Economic deterrence is about a market too small to support two players.",
   "C": "Correct. Path-dependent resources are created over time through competence accumulation, and firms cannot compress that time at will.",
   "D": "Incorrect. Patents and trademarks protect unique resources legally; they are not about accumulation over time."
  },
  "recap": "Correct. Path-dependent resources are created over time through competence accumulation, and firms cannot compress that time at will."
 },
 {
  "cat": "VRIO & Imitability",
  "title": "Why Causal Ambiguity Protects",
  "question": "Causal ambiguity makes an advantage hard to imitate because…",
  "options": {
   "A": "the firm holds a patent on the process.",
   "B": "competitors cannot understand how the firm created the advantage, typically when it rests on organisational capabilities.",
   "C": "the market is too small for a second player.",
   "D": "the advantage depends on a single scarce raw material."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Patents are a unique resource protected by law, a different mechanism.",
   "B": "Correct. When an advantage comes from capabilities rather than single resources, rivals cannot see what to copy.",
   "C": "Incorrect. That is economic deterrence.",
   "D": "Incorrect. A scarce raw material is a unique physical resource."
  },
  "recap": "Correct. When an advantage comes from capabilities rather than single resources, rivals cannot see what to copy."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "A Key Weakness",
  "question": "In the resource appraisal matrix, a resource with high strategic importance and low relative strength is a…",
  "options": {
   "A": "superfluous strength.",
   "B": "key weakness.",
   "C": "zone of irrelevance.",
   "D": "key strength."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A superfluous strength has low importance and high relative strength.",
   "B": "Correct. It matters a lot and the firm is behind its competitors: a key weakness.",
   "C": "Incorrect. The zone of irrelevance combines low importance with low strength.",
   "D": "Incorrect. A key strength needs high relative strength as well as high importance."
  },
  "recap": "Correct. It matters a lot and the firm is behind its competitors: a key weakness."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "Reading Volkswagen's Appraisal",
  "question": "In the Volkswagen appraisal, engineering scores 7 for strategic importance and 9 for relative strength. Where does it fall?",
  "options": {
   "A": "Key strengths.",
   "B": "Superfluous strengths.",
   "C": "Key weaknesses.",
   "D": "Zone of irrelevance."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Above-parity strength (9) on a capability of high importance (7): the core technical strength of VW.",
   "B": "Incorrect. Superfluous strengths have low strategic importance; engineering's is high.",
   "C": "Incorrect. Key weaknesses have low relative strength; engineering is well above parity.",
   "D": "Incorrect. The zone of irrelevance has low scores on both axes."
  },
  "recap": "Correct. Above-parity strength (9) on a capability of high importance (7): the core technical strength of VW."
 },
 {
  "cat": "Strengths & Weaknesses",
  "title": "Followers Beat Pioneers",
  "question": "What lesson does the deck draw from the EMI and Raytheon examples?",
  "options": {
   "A": "Pioneers always capture the returns of a new product.",
   "B": "Strategic resources are often activities or capabilities complementary to the product, so followers can capture the returns of a pioneer's innovation.",
   "C": "A well-performing new product guarantees commercial success.",
   "D": "Collaborations should be avoided because they leak strategic resources."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The lesson is the opposite: often it is the followers who gain the returns.",
   "B": "Correct. Having a new product that performs well is not enough; complementary resources decide who profits, and collaborations are the main way to access them.",
   "C": "Incorrect. The first lesson listed is that a performing new product does not necessarily mean success.",
   "D": "Incorrect. The deck presents collaborations as the main way to access strategic resources a firm lacks."
  },
  "recap": "Correct. Having a new product that performs well is not enough; complementary resources decide who profits, and collaborations are the main way to access them."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "Where SWOT Sits",
  "question": "In the strategic decisions process, what is the role of the SWOT analysis?",
  "options": {
   "A": "It selects the strategic alternative to implement.",
   "B": "It closes the diagnosis by crossing internal strengths and weaknesses with external opportunities and threats, feeding the generation of alternatives.",
   "C": "It measures the results of implementation in the control phase.",
   "D": "It replaces the external analysis when data are missing."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Selecting alternatives belongs to strategy formulation; SWOT describes the situation.",
   "B": "Correct. SWOT combines the outputs of the internal and external analyses at the end of diagnosis.",
   "C": "Incorrect. Control comes after implementation and is a separate phase.",
   "D": "Incorrect. SWOT uses the external analysis as an input; it cannot replace it."
  },
  "recap": "Correct. SWOT combines the outputs of the internal and external analyses at the end of diagnosis."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "An S–T Question",
  "question": "Which question belongs to the S–T quadrant of the SWOT matrix?",
  "options": {
   "A": "How can we use our strengths to take advantage of opportunities?",
   "B": "How can we use our strengths to reduce the likelihood and impact of threats?",
   "C": "How can we overcome the weaknesses that prevent us from taking advantage of opportunities?",
   "D": "How can we overcome the weaknesses that will make threats a reality?"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the S–O question.",
   "B": "Correct. Strengths crossed with threats: using what the firm does well to defend against what could hurt it.",
   "C": "Incorrect. That is the W–O question.",
   "D": "Incorrect. That is the W–T question."
  },
  "recap": "Correct. Strengths crossed with threats: using what the firm does well to defend against what could hurt it."
 },
 {
  "cat": "SWOT & Roadmapping",
  "title": "Two Criteria for the Roadmap",
  "question": "On which two criteria are strategic actions assessed to build the roadmap?",
  "options": {
   "A": "Market share and market growth.",
   "B": "Expected economic impact and expected implementation problems.",
   "C": "Strategic importance and relative strength.",
   "D": "Probability of occurrence and impact on a −5 to +5 scale."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Those are the axes of the BCG matrix.",
   "B": "Correct. Profit generated or loss reduced on one side, actions, organisational change and activities involved on the other.",
   "C": "Incorrect. Those are the axes of the resource appraisal in internal analysis.",
   "D": "Incorrect. That is the scoring method of the STEEP analysis."
  },
  "recap": "Correct. Profit generated or loss reduced on one side, actions, organisational change and activities involved on the other."
 },
 {
  "cat": "Repositioning",
  "title": "Why Repositioning Is Hard",
  "question": "Why does the deck describe repositioning as a transition that is very difficult to manage?",
  "options": {
   "A": "Because it always requires changing the company's legal form.",
   "B": "Because the brand image in customers' minds is deep-seated, so continuity with the past is needed.",
   "C": "Because it is allowed only when sales are falling.",
   "D": "Because competitors are legally entitled to object."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Repositioning is about perception, not legal form.",
   "B": "Correct. Customers' image of a brand is hard to move, which is why keeping some continuity eases product identification.",
   "C": "Incorrect. The deck says repositioning is not only for failing brands.",
   "D": "Incorrect. There is no such right in the deck."
  },
  "recap": "Correct. Customers' image of a brand is hard to move, which is why keeping some continuity eases product identification."
 },
 {
  "cat": "Repositioning",
  "title": "Not Only for Failing Brands",
  "question": "Which statement about repositioning is consistent with the deck?",
  "options": {
   "A": "A brand can reposition only after it fails.",
   "B": "Repositioning can be needed without failure, for example when customer trends, technology or the firm's future plans change.",
   "C": "Repositioning means changing the product while keeping customers' perception unchanged.",
   "D": "Repositioning is the same as cutting prices."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The deck explicitly says a brand does not have to fail to reposition.",
   "B": "Correct. Product evolution, customer trends, environmental changes and future plans are all listed reasons.",
   "C": "Incorrect. Repositioning is precisely about changing the target audience's perception.",
   "D": "Incorrect. Price cuts can be part of it, but repositioning is about perception, as Lego and Domino's show."
  },
  "recap": "Correct. Product evolution, customer trends, environmental changes and future plans are all listed reasons."
 },
 {
  "cat": "Repositioning",
  "title": "JCPenney's Implementation Mistake",
  "question": "Which implementation choice does the deck single out in JCPenney's failed repositioning?",
  "options": {
   "A": "Testing the new format in a few selected stores for two years.",
   "B": "Rolling out the drastic changes in all 1,800 stores at once without pre-testing.",
   "C": "Hiring a CEO from inside the company.",
   "D": "Increasing the number of discount coupons."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Pre-testing in selected stores is the industry best practice that JCPenney did not follow.",
   "B": "Correct. Ron Johnson implemented the changes everywhere at once; asked about testing, he replied that Apple did not test.",
   "C": "Incorrect. Johnson came from Apple, not from inside JCPenney.",
   "D": "Incorrect. He removed the coupons, which upset core customers."
  },
  "recap": "Correct. Ron Johnson implemented the changes everywhere at once; asked about testing, he replied that Apple did not test."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "What a Business Model Describes",
  "question": "According to the deck, a business model is a set of strategic decisions defining how a company…",
  "options": {
   "A": "sets its prices and discounts.",
   "B": "creates value, transfers value to its customers and captures value.",
   "C": "organises its legal entities and shareholders.",
   "D": "chooses which industries to compete in."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Pricing touches only the revenue streams block.",
   "B": "Correct. Value creation, transfer and capture are the three parts of the definition, and the canvas represents them in nine blocks.",
   "C": "Incorrect. That is corporate governance and legal structure, not the business model.",
   "D": "Incorrect. Choosing industries is corporate strategy."
  },
  "recap": "Correct. Value creation, transfer and capture are the three parts of the definition, and the canvas represents them in nine blocks."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "The Derived Block",
  "question": "Which canvas block does the deck describe as a direct result of all the other building blocks?",
  "options": {
   "A": "Value proposition.",
   "B": "Customer segments.",
   "C": "Cost structure.",
   "D": "Key partners."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The value proposition is a choice made for each segment, not a result of the other blocks.",
   "B": "Incorrect. Customer segments are described as the heart of any business model.",
   "C": "Correct. The cost structure follows from the other blocks; ideally each cost can be traced back to one of them.",
   "D": "Incorrect. Key partners are a choice about what to do alone and what to do with others."
  },
  "recap": "Correct. The cost structure follows from the other blocks; ideally each cost can be traced back to one of them."
 },
 {
  "cat": "Canvas Building Blocks",
  "title": "Channel Economics",
  "question": "How does the deck suggest matching channels to customers?",
  "options": {
   "A": "Use the same channel for every segment to cut costs.",
   "B": "Use cost-intensive channels for very profitable clients and cost-efficient channels for unprofitable ones.",
   "C": "Always prefer indirect channels because partners bear the costs.",
   "D": "Use the cheapest channel for the most profitable clients."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Channels can differ by segment; that is one reason to define a distinct segment.",
   "B": "Correct. Channel cost should follow client profitability.",
   "C": "Incorrect. The deck lists both direct and indirect channels without ranking them.",
   "D": "Incorrect. It is the reverse of the deck's rule."
  },
  "recap": "Correct. Channel cost should follow client profitability."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Bait and Hook Pairs",
  "question": "Which pair of examples illustrates the bait-and-hook model in the deck?",
  "options": {
   "A": "Metro and Flickr.",
   "B": "Gillette handles and blades; Nespresso machines and capsules.",
   "C": "Xbox and Wii.",
   "D": "Dell and Microsoft Office."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Metro illustrates the free model and Flickr freemium.",
   "B": "Correct. A cheap initial purchase (handle, machine) drives frequent purchases of the related product (blades, capsules).",
   "C": "Incorrect. Consoles illustrate how to manage multiple client segments.",
   "D": "Incorrect. Dell is direct sales and assemble-to-order; Office is bundling and subscription."
  },
  "recap": "Correct. A cheap initial purchase (handle, machine) drives frequent purchases of the related product (blades, capsules)."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Dell's Innovation",
  "question": "What kind of innovation does the deck attribute to Dell?",
  "options": {
   "A": "A breakthrough in PC hardware technology.",
   "B": "A business model innovation: direct sales and assemble-to-order with minimal working capital.",
   "C": "A new retail format with large stores.",
   "D": "A freemium software offer."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Dell assembled components bought from partners; its products were not technologically new.",
   "B": "Correct. Selling only directly, building to order and getting paid immediately with very low stocks was the innovation.",
   "C": "Incorrect. Dell sold directly, avoiding retailers such as Wal-Mart.",
   "D": "Incorrect. Freemium is the Skype and Flickr example."
  },
  "recap": "Correct. Selling only directly, building to order and getting paid immediately with very low stocks was the innovation."
 },
 {
  "cat": "Business Model Patterns",
  "title": "Freemium in Numbers",
  "question": "In the deck's Skype example of the freemium model, what share of total usage came from paid SkypeOut calls?",
  "options": {
   "A": "About half.",
   "B": "Less than 10%.",
   "C": "Over 90%.",
   "D": "Exactly 25%."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. The paid share was far smaller.",
   "B": "Correct. Paid SkypeOut calls accounted for less than 10% of total usage, with over 90% of users on the free service.",
   "C": "Incorrect. Over 90% is the share of users on the free service.",
   "D": "Incorrect. No such figure appears in the deck."
  },
  "recap": "Correct. Paid SkypeOut calls accounted for less than 10% of total usage, with over 90% of users on the free service."
 },
 {
  "cat": "Vertical Integration",
  "title": "Backward or Forward?",
  "question": "A car maker acquires the company that supplies its batteries. What move is this?",
  "options": {
   "A": "Forward vertical integration.",
   "B": "Backward vertical integration.",
   "C": "Related diversification into a new industry.",
   "D": "Taper integration."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Forward integration moves towards distribution and customers.",
   "B": "Correct. Moving upstream into the supply of inputs is backward integration.",
   "C": "Incorrect. The battery maker sits in the car maker's own value chain, so this is vertical integration.",
   "D": "Incorrect. Taper integration would combine own production with outside suppliers; the question describes full ownership of the supplier."
  },
  "recap": "Correct. Moving upstream into the supply of inputs is backward integration."
 },
 {
  "cat": "Vertical Integration",
  "title": "A Risk of Integration",
  "question": "Which of these is a risk of vertical integration listed in the deck?",
  "options": {
   "A": "Reducing transaction costs.",
   "B": "Securing critical supplies.",
   "C": "Low incentives to lower costs because of a captive market.",
   "D": "Learning."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Reducing transaction costs is an advantage.",
   "B": "Incorrect. Securing supplies (backward) and channels (forward) is an advantage.",
   "C": "Correct. An in-house supplier serves a captive market and has less pressure to cut costs, alongside compounding risk, lower flexibility and lower efficiency.",
   "D": "Incorrect. Learning is listed among the advantages."
  },
  "recap": "Correct. An in-house supplier serves a captive market and has less pressure to cut costs, alongside compounding risk, lower flexibility and lower efficiency."
 },
 {
  "cat": "Vertical Integration",
  "title": "Taper Integration",
  "question": "What is taper integration?",
  "options": {
   "A": "Full ownership of every stage of the industry value chain.",
   "B": "A combination of integration and reliance on outside suppliers and/or outside firms for distribution.",
   "C": "A spot purchase of inputs at market prices.",
   "D": "Diversification into unrelated industries."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is full vertical integration.",
   "B": "Correct. The firm makes part of what it needs and buys or distributes the rest through outside firms.",
   "C": "Incorrect. Spot purchases are the loosest form of vertical relation, with no integration.",
   "D": "Incorrect. That is unrelated diversification, a different corporate decision."
  },
  "recap": "Correct. The firm makes part of what it needs and buys or distributes the rest through outside firms."
 },
 {
  "cat": "Diversification",
  "title": "Economies of Scope Defined",
  "question": "How does the deck define economies of scope?",
  "options": {
   "A": "Lower unit costs from producing larger volumes of one product.",
   "B": "Cost declines as cumulative output doubles.",
   "C": "Using a resource across multiple activities uses less of that resource than carrying out the activities independently.",
   "D": "Higher margins from integrating with suppliers."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. That is economies of scale.",
   "B": "Incorrect. That is the learning curve.",
   "C": "Correct. Sharing resources across businesses is the source of advantage in related diversification.",
   "D": "Incorrect. That is one advantage of vertical integration."
  },
  "recap": "Correct. Sharing resources across businesses is the source of advantage in related diversification."
 },
 {
  "cat": "Diversification",
  "title": "Why Firms Refocused",
  "question": "Which reasons does the deck give for the shift from the diversification era (1950–80) to refocusing?",
  "options": {
   "A": "Lower interest rates and cheaper acquisitions.",
   "B": "Emphasis on shareholder value, turbulence favouring specialisation, and sharing resources and capabilities as the real source of advantage.",
   "C": "New antitrust laws that forbade conglomerates.",
   "D": "The disappearance of internal capital markets."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. These are not among the reasons given.",
   "B": "Correct. The three reasons listed explain why diversification for its own sake lost favour.",
   "C": "Incorrect. The deck does not mention antitrust as a cause.",
   "D": "Incorrect. Internal capital markets are still listed among the advantages of diversified portfolios."
  },
  "recap": "Correct. The three reasons listed explain why diversification for its own sake lost favour."
 },
 {
  "cat": "Diversification",
  "title": "Drawbacks of Unrelated Portfolios",
  "question": "Which disadvantages does the deck list for unrelated portfolios?",
  "options": {
   "A": "Coordination costs, cultural heterogeneity and organisational complexity.",
   "B": "Loss of financial economies and of internal capital markets.",
   "C": "Higher risk than related portfolios.",
   "D": "Too many shared resources between businesses."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Running unrelated businesses together costs coordination, mixes cultures and complicates the organisation.",
   "B": "Incorrect. Financial economies and internal capital markets are listed as advantages of unrelated portfolios.",
   "C": "Incorrect. Higher risk than unrelated is a drawback of related portfolios.",
   "D": "Incorrect. Unrelated businesses share little apart from human resources and administration."
  },
  "recap": "Correct. Running unrelated businesses together costs coordination, mixes cultures and complicates the organisation."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "Relative Market Share",
  "question": "A business has a 22% market share; its largest competitor has 11%. What is its relative market share?",
  "options": {
   "A": "0.5",
   "B": "1.1",
   "C": "2",
   "D": "11"
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. That is the competitor's share divided by the firm's, the wrong way round.",
   "B": "Incorrect. Relative market share is a ratio, not a difference expressed in tens of points.",
   "C": "Correct. 22 divided by 11 gives 2: the business is twice the size of its largest rival, above the cut-off of 1.",
   "D": "Incorrect. That is the difference in percentage points, not the ratio."
  },
  "recap": "Correct. 22 divided by 11 gives 2: the business is twice the size of its largest rival, above the cut-off of 1."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "A Cash Cow",
  "question": "A business has low market growth and a relative market share above 1. Which BCG quadrant is it in?",
  "options": {
   "A": "Star.",
   "B": "Cash cow.",
   "C": "Question mark.",
   "D": "Dog."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Stars combine high share with high market growth.",
   "B": "Correct. High relative share in a slow-growing market: a cash generator that can fund the rest of the portfolio.",
   "C": "Incorrect. Question marks have high growth and low relative share.",
   "D": "Incorrect. Dogs have both low growth and low relative share."
  },
  "recap": "Correct. High relative share in a slow-growing market: a cash generator that can fund the rest of the portfolio."
 },
 {
  "cat": "Portfolio Analysis",
  "title": "A Weak Business in an Attractive Market",
  "question": "In the GE/McKinsey matrix, what is recommended for a business with weak strengths in a very attractive market?",
  "options": {
   "A": "Premium invest and grow.",
   "B": "Opportunistic selectivity: invest to improve its strengths, keep it only if it can improve, otherwise divest.",
   "C": "Harvest and divest immediately.",
   "D": "Protective selectivity: keep it as a cash generator."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Premium invest and grow is for strong businesses in attractive markets.",
   "B": "Correct. Cell 6: such businesses usually have to be funded by the rest of the group and are retained only if they can improve.",
   "C": "Incorrect. Immediate exit is for businesses with neither strengths nor an attractive market.",
   "D": "Incorrect. Protective selectivity is for strong businesses in unattractive markets."
  },
  "recap": "Correct. Cell 6: such businesses usually have to be funded by the rest of the group and are retained only if they can improve."
 },
 {
  "cat": "Marketing Basics",
  "title": "Exchange and Transaction",
  "question": "In the lecture's vocabulary, what turns an exchange into a transaction?",
  "options": {
   "A": "The payment of a price in money.",
   "B": "Reaching an agreement between the parties.",
   "C": "The intervention of an intermediary.",
   "D": "The delivery of the product to the buyer."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Exchange is offering something in return, not necessarily money.",
   "B": "Correct. Exchange is the process of obtaining a product by offering something in return; when an agreement is reached, a transaction takes place.",
   "C": "Incorrect. Markets can work directly or through intermediaries; intermediaries are not what defines a transaction.",
   "D": "Incorrect. Delivery follows the transaction; the agreement is what defines it."
  },
  "recap": "Correct. Exchange is the process of obtaining a product by offering something in return; when an agreement is reached, a transaction takes place."
 },
 {
  "cat": "Marketing Basics",
  "title": "The Marketing Orientation",
  "question": "Which starting question defines the marketing orientation?",
  "options": {
   "A": "How can we produce efficiently?",
   "B": "How can we build the best product?",
   "C": "How can we sell what we produce?",
   "D": "What does the market value, and how can we serve it better?"
  },
  "correct": "D",
  "expl": {
   "A": "Incorrect. That is the production orientation.",
   "B": "Incorrect. That is the product orientation.",
   "C": "Incorrect. That is the sales orientation.",
   "D": "Correct. The marketing orientation starts from what the market values: produce what can be sold rather than sell what you make."
  },
  "recap": "Correct. The marketing orientation starts from what the market values: produce what can be sold rather than sell what you make."
 },
 {
  "cat": "Marketing Basics",
  "title": "The Google Glass Case",
  "question": "Which risk does the Google Glass case illustrate?",
  "options": {
   "A": "The risk of the production-based approach.",
   "B": "The risk of the product-based approach: building a product without a market that wants it.",
   "C": "The risk of excessive market research.",
   "D": "The risk of a sales force that is too aggressive."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Production orientation is about efficiency, as in Ford's black cars.",
   "B": "Correct. Forecast in 2013 to sell millions by 2016, Google Glass was withdrawn in January 2015: a strong product without enough demand.",
   "C": "Incorrect. The case shows the opposite problem: not enough understanding of the market.",
   "D": "Incorrect. The case is not about selling pressure."
  },
  "recap": "Correct. Forecast in 2013 to sell millions by 2016, Google Glass was withdrawn in January 2015: a strong product without enough demand."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Wants Backed by Ability",
  "question": "What distinguishes demand from a want?",
  "options": {
   "A": "Demand is a want directed toward a specific solution.",
   "B": "Demand is a want backed by willingness and ability to buy.",
   "C": "Demand is a perceived state of deprivation.",
   "D": "There is no difference: they are synonyms."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. A want directed to a specific solution is the definition of want.",
   "B": "Correct. A want becomes demand when the customer is willing and able to buy.",
   "C": "Incorrect. A perceived state of deprivation is a need.",
   "D": "Incorrect. The lecture separates need, want and demand as three steps."
  },
  "recap": "Correct. A want becomes demand when the customer is willing and able to buy."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "The Served Market",
  "question": "In the Range Rover Evoque example, the urban professionals in Milan, Rome and Turin on whom the marketing effort focuses are the…",
  "options": {
   "A": "potential market.",
   "B": "available market.",
   "C": "served (target) market.",
   "D": "penetrated market."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The potential market is everyone interested in premium SUVs.",
   "B": "Incorrect. The available market is high-income professionals in big cities near a dealer, before the firm's targeting choice.",
   "C": "Correct. The served market is the part of the available market the firm decides to target.",
   "D": "Incorrect. The penetrated market is the customers who actually bought."
  },
  "recap": "Correct. The served market is the part of the available market the firm decides to target."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Elasticity from a Price Test",
  "question": "Cutting the price from €6.90 to €5.90 raises weekly sales from 1,200 to 1,500 units. What is the price elasticity of demand?",
  "options": {
   "A": "About −0.58 (inelastic)",
   "B": "About −1.73 (elastic)",
   "C": "About −0.25 (inelastic)",
   "D": "About −1.00 (unit elastic)"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. That is the ratio turned upside down (ΔP/P ÷ ΔQ/Q).",
   "B": "Correct. ΔQ/Q = 300/1,200 = +25%; ΔP/P = −1/6.90 = −14.5%; E = 25 ÷ −14.5 ≈ −1.73, so demand is elastic.",
   "C": "Incorrect. That is only the relative change in quantity, without dividing by the relative change in price.",
   "D": "Incorrect. Quantity changed by more in relative terms than price, so |E| is above 1."
  },
  "recap": "Correct. ΔQ/Q = 300/1,200 = +25%; ΔP/P = −1/6.90 = −14.5%; E = 25 ÷ −14.5 ≈ −1.73, so demand is elastic."
 },
 {
  "cat": "Demand & Customer Value",
  "title": "Why Not Compete on Explicit Costs",
  "question": "Why does the lecture warn against competing only by reducing explicit customer costs?",
  "options": {
   "A": "Because explicit costs cannot be measured.",
   "B": "Because every competitor sees them, so cutting them contracts margins and leads to price wars.",
   "C": "Because customers ignore monetary costs.",
   "D": "Because hidden costs are always larger than explicit ones."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Explicit costs are monetary and easy to measure.",
   "B": "Correct. Visible monetary costs can be matched by any rival, which compresses contribution margins and triggers price wars.",
   "C": "Incorrect. Customers weigh all costs, monetary ones included.",
   "D": "Incorrect. The lecture does not rank their size; it says hidden costs are where differentiation is possible."
  },
  "recap": "Correct. Visible monetary costs can be matched by any rival, which compresses contribution margins and triggers price wars."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "Derived Demand",
  "question": "B2B demand is described as derived. What does that mean?",
  "options": {
   "A": "It is driven by emotions and brand perception.",
   "B": "It depends on business needs and on demand for the end product.",
   "C": "It changes daily with fashion and seasons.",
   "D": "It is always more price-elastic than consumer demand."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Emotions and brand perception drive consumer demand.",
   "B": "Correct. Business customers buy because their own customers buy the end product.",
   "C": "Incorrect. B2B demand is more stable and forecastable than consumer demand.",
   "D": "Incorrect. B2B demand is less price-sensitive when the product is essential to operations."
  },
  "recap": "Correct. Business customers buy because their own customers buy the end product."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "Who Decides?",
  "question": "In the lecture's 3D-printer example, who is the decider in the purchasing centre?",
  "options": {
   "A": "The production manager.",
   "B": "The lead industrial engineer.",
   "C": "The COO or CEO.",
   "D": "The procurement manager."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. The production manager identifies the need: the initiator.",
   "B": "Incorrect. The lead engineer provides specifications and recommendations: the influencer.",
   "C": "Correct. The COO or CEO has the final say on the investment: the decider.",
   "D": "Incorrect. The procurement manager negotiates and buys: the buyer."
  },
  "recap": "Correct. The COO or CEO has the final say on the investment: the decider."
 },
 {
  "cat": "Segmentation Basics",
  "title": "Two Characteristics of Segments",
  "question": "Which two characteristics must market segments show?",
  "options": {
   "A": "High growth and high profitability.",
   "B": "Internal similarity and external diversity.",
   "C": "Large size and low competition.",
   "D": "Geographic proximity and shared income levels."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Growth and profitability matter for targeting, not for what makes a group a segment.",
   "B": "Correct. Customers within a segment are alike, and different from those in other segments.",
   "C": "Incorrect. Size is one of the five criteria of a good segment, but not the defining pair.",
   "D": "Incorrect. Geography and income are possible variables, not the defining characteristics."
  },
  "recap": "Correct. Customers within a segment are alike, and different from those in other segments."
 },
 {
  "cat": "Segmentation Basics",
  "title": "Five Criteria of a Good Segment",
  "question": "Which list gives the five characteristics of a good market segment?",
  "options": {
   "A": "Measurability, accessibility, homogeneity, importance, duration.",
   "B": "Valuable, rare, inimitable, organized, durable.",
   "C": "Specific, measurable, appropriate, realistic, timely.",
   "D": "Price, product, place, promotion, people."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Size and buying power must be measurable, the segment reachable, internally homogeneous, important enough and lasting.",
   "B": "Incorrect. That mixes the VRIO test with durability.",
   "C": "Incorrect. That is SMART, for strategic objectives.",
   "D": "Incorrect. That is an extended marketing mix."
  },
  "recap": "Correct. Size and buying power must be measurable, the segment reachable, internally homogeneous, important enough and lasting."
 },
 {
  "cat": "Segmentation Basics",
  "title": "A Cost of Segmenting",
  "question": "Which of these does the lecture list as a disadvantage of segmentation?",
  "options": {
   "A": "Lower complexity in market management.",
   "B": "Fragmentation of advertising and promotion costs.",
   "C": "Prioritised allocation of marketing resources.",
   "D": "Tailored products and services."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Lower complexity is an advantage for the organisation.",
   "B": "Correct. Serving several segments splits advertising budgets, alongside higher production, distribution and research costs.",
   "C": "Incorrect. Prioritising resources is an advantage.",
   "D": "Incorrect. Tailored products are a benefit to the customer."
  },
  "recap": "Correct. Serving several segments splits advertising budgets, alongside higher production, distribution and research costs."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Highest Differentiation Potential",
  "question": "Which segmentation base is hardest to observe but offers the highest potential for competitive differentiation?",
  "options": {
   "A": "Socio-demographic.",
   "B": "Geographic.",
   "C": "Customer needs.",
   "D": "Product characteristics."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Socio-demographics are the easiest to observe and offer the least differentiation potential.",
   "B": "Incorrect. Geographic variables are observable characteristics.",
   "C": "Correct. What customers want is hard to identify and quantify, but it reveals what they value.",
   "D": "Incorrect. Product segmentation ignores customers altogether."
  },
  "recap": "Correct. What customers want is hard to identify and quantify, but it reveals what they value."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Internal Data for Customer Segmentation",
  "question": "Customer segmentation based on internal CRM data typically uses…",
  "options": {
   "A": "Census demographics and national surveys.",
   "B": "Recency, frequency and monetary value of purchases, churn risk and customer lifetime value.",
   "C": "The five competitive forces of the industry.",
   "D": "Focus groups with non-customers."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. External research data are typical of market segmentation.",
   "B": "Correct. RFM, purchase history, engagement, churn risk and lifetime value describe the existing customer base.",
   "C": "Incorrect. The five forces describe industry structure, not customers.",
   "D": "Incorrect. Non-customers are outside the company's own customer database."
  },
  "recap": "Correct. RFM, purchase history, engagement, churn risk and lifetime value describe the existing customer base."
 },
 {
  "cat": "Segmentation Bases",
  "title": "Wolfram's Student Version",
  "question": "Which segmentation base does Wolfram's cheaper student version of Mathematica illustrate?",
  "options": {
   "A": "Socio-demographic.",
   "B": "Geographic.",
   "C": "Psychographic.",
   "D": "Behavioural."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Students are identified by occupation, a socio-demographic characteristic; the aim is to make them regular customers after graduation.",
   "B": "Incorrect. McDonald's regional menus are the lecture's geographic example.",
   "C": "Incorrect. PRIZM's 66 lifestyle groups are the psychographic example.",
   "D": "Incorrect. Daily, occasional and infrequent shavers are the behavioural example."
  },
  "recap": "Correct. Students are identified by occupation, a socio-demographic characteristic; the aim is to make them regular customers after graduation."
 },
 {
  "cat": "Segmentation Methods",
  "title": "When k-means Stops",
  "question": "When does the k-means clustering procedure stop?",
  "options": {
   "A": "After exactly k iterations.",
   "B": "When the centroids no longer change, points stay in the same cluster, or the maximum number of iterations is reached.",
   "C": "When every cluster contains the same number of points.",
   "D": "When the marketer approves the first assignment."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. k is the number of clusters, not of iterations.",
   "B": "Correct. The algorithm repeats assignment and recomputation until it converges or hits the iteration limit.",
   "C": "Incorrect. Clusters can be of different sizes.",
   "D": "Incorrect. That would be a heuristic judgement, not the algorithm's rule."
  },
  "recap": "Correct. The algorithm repeats assignment and recomputation until it converges or hits the iteration limit."
 },
 {
  "cat": "Segmentation Methods",
  "title": "The Two-step Approach",
  "question": "In Wind and Cardozo's two-step approach, what comes first?",
  "options": {
   "A": "Micro-segmentation on the needs of individual decision makers.",
   "B": "Macro-segmentation on company-level variables such as industry, size and geography.",
   "C": "A cluster analysis on survey data.",
   "D": "The design of personas."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Micro-segmentation is the second step.",
   "B": "Correct. The approach first groups organisations by external characteristics and purchase situations, then segments the individuals within them.",
   "C": "Incorrect. The two-step approach is heuristic, not a clustering algorithm.",
   "D": "Incorrect. Personas come after segments have been identified and validated."
  },
  "recap": "Correct. The approach first groups organisations by external characteristics and purchase situations, then segments the individuals within them."
 },
 {
  "cat": "Segmentation Methods",
  "title": "Managerial Validation",
  "question": "Which question belongs to the managerial validation of segments?",
  "options": {
   "A": "Are the clusters statistically stable?",
   "B": "Are the segments recognisable by sales and marketing teams, and can the firm design a different mix for each?",
   "C": "Do the segments fit the brand's long-term objectives?",
   "D": "Does segment membership predict purchase?"
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Stability is part of statistical validation.",
   "B": "Correct. Managerial validation is a practicality check: do the segments make sense in the real world?",
   "C": "Incorrect. Fit with long-term objectives is strategic validation.",
   "D": "Incorrect. Predictive power is part of statistical validation."
  },
  "recap": "Correct. Managerial validation is a practicality check: do the segments make sense in the real world?"
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Same Solution, Different Markets",
  "question": "Which coverage pattern offers the same solution to different markets?",
  "options": {
   "A": "Single-segment concentration.",
   "B": "Market specialisation.",
   "C": "Product specialisation.",
   "D": "Full market coverage."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Single-segment concentration serves one target with one line.",
   "B": "Incorrect. Market specialisation offers different solutions to the same market.",
   "C": "Correct. The product stays the same and the markets vary.",
   "D": "Incorrect. Full coverage offers broad solutions for every target."
  },
  "recap": "Correct. The product stays the same and the markets vary."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Broad Solutions for Every Target",
  "question": "Which coverage pattern does L'Oréal illustrate, with broad solutions for every target?",
  "options": {
   "A": "Full market coverage.",
   "B": "Selective specialisation.",
   "C": "Single-segment concentration.",
   "D": "Product specialisation."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. L'Oréal serves practically every segment with its portfolio.",
   "B": "Incorrect. Selective specialisation serves some unrelated targets with different solutions, not all of them.",
   "C": "Incorrect. Single-segment concentration is the luxury example, such as Rolex or Ferrari.",
   "D": "Incorrect. Product specialisation sells one solution to several markets."
  },
  "recap": "Correct. L'Oréal serves practically every segment with its portfolio."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "When an Offer Does Not Fit the Schema",
  "question": "According to schema theory, what happens when a new product does not fit consumers' existing schema?",
  "options": {
   "A": "Consumers adopt it faster because it stands out.",
   "B": "Consumers may feel confused or resist it.",
   "C": "Nothing: schemas affect only services.",
   "D": "Its price elasticity becomes zero."
  },
  "correct": "B",
  "expl": {
   "A": "Incorrect. Standing out helps only if the offer is still understood; a misfit makes it harder to accept.",
   "B": "Correct. Products that fit an existing schema are easy to understand and accept; those that don't can confuse or meet resistance.",
   "C": "Incorrect. Schemas apply to any offer, as the restaurant example shows for a service and holds for products too.",
   "D": "Incorrect. Schema theory says nothing about elasticity."
  },
  "recap": "Correct. Products that fit an existing schema are easy to understand and accept; those that don't can confuse or meet resistance."
 },
 {
  "cat": "Targeting & Positioning",
  "title": "Brand Personality Dimensions",
  "question": "Which list gives Aaker's brand personality dimensions?",
  "options": {
   "A": "Sincerity, excitement, competence, sophistication, ruggedness.",
   "B": "Valuable, rare, inimitable, organized.",
   "C": "Openness, conscientiousness, extraversion, agreeableness, neuroticism.",
   "D": "Price, quality, safety, variety, convenience."
  },
  "correct": "A",
  "expl": {
   "A": "Correct. Aaker's five dimensions are used to rate the emotional attributes of a brand.",
   "B": "Incorrect. That is VRIO, for resources.",
   "C": "Incorrect. That is the Big Five model of personality, used in psychographic segmentation.",
   "D": "Incorrect. Those are benefits sought, used in needs-based segmentation."
  },
  "recap": "Correct. Aaker's five dimensions are used to rate the emotional attributes of a brand."
 },
 {
  "cat": "B2C & B2B Buying",
  "title": "The FCB Grid in Practice",
  "question": "According to the FCB grid, which marketing focus suits low-involvement, thinking purchases such as detergents or bleach?",
  "options": {
   "A": "Emotional storytelling and aspirational imagery.",
   "B": "Detailed rational arguments, reviews and guarantees.",
   "C": "Promotions, price, distribution and reminders.",
   "D": "Brand personality, packaging and sensory cues."
  },
  "correct": "C",
  "expl": {
   "A": "Incorrect. Emotional storytelling and aspirational imagery suit high-involvement, feeling purchases such as sports cars or perfume.",
   "B": "Incorrect. Rational arguments, reviews and guarantees suit high-involvement, thinking purchases such as insurance or appliances.",
   "C": "Correct. Habitual, low-involvement purchases respond to promotions, price, distribution and reminders that keep the product visible in store or online.",
   "D": "Incorrect. Brand personality, packaging and sensory cues suit low-involvement, feeling purchases such as snacks or soft drinks."
  },
  "recap": "Correct. Habitual, low-involvement purchases respond to promotions, price, distribution and reminders that keep the product visible in store or online."
 }
];
