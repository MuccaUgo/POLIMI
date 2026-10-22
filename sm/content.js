/* Strategy & Marketing Study Hub — course decks, sheets, flashcards, cases and oral questions.
   Built from the course slides (V. Chiesa, decks 0–7; G. Peggiani, marketing lectures 1–2) and the
   student's notes (marketing lecture 3). Card and question ids are hashes of the text, so editing a
   card's question resets its review history; adding or reordering cards does not. */
var SM_CONTENT = (function () {
"use strict";
const DECKS=[
 {id:'intro',deck:'0',title:'The company and its goal',file:'Introduction.pdf',track:'str'},
 {id:'strat',deck:'1',title:'The concept of strategy',file:'1_The concept of Strategy.pdf',track:'str'},
 {id:'ext',deck:'2',title:'External analysis',file:'2_External Analysis.pdf',track:'str'},
 {id:'ca',deck:'3',title:'Competitive advantage & grand strategy',file:'3_Competitive advantage and grand strategy.pdf',track:'str'},
 {id:'int',deck:'4',title:'Internal analysis',file:'4_Internal Analysis.pdf',track:'str'},
 {id:'swot',deck:'5',title:'SWOT & strategic alternatives',file:'5_SWOT and Strategic Alternatives.pdf',track:'str'},
 {id:'bmc',deck:'6',title:'Business model canvas',file:'6_Business Model Canvas.pdf',track:'str'},
 {id:'corp',deck:'7',title:'Corporate strategy',file:'7_Corporate Strategy.pdf',track:'str'},
 {id:'mk1',deck:'M1',title:'Market demand & the marketing process',file:'Marketing_Lecture_1.pdf · 1 Oct',track:'mkt'},
 {id:'mk2',deck:'M2',title:'Segmentation (STP process)',file:'Marketing_Lecture_2.pdf · 8 Oct',track:'mkt'},
 {id:'mk3',deck:'M3',title:'Targeting & positioning',file:'M3.pdf · your notes',track:'mkt',notes:true}
];
const COMING={strategy:['Mergers & acquisitions','Internationalisation','Disruptive innovation','Digital disruption'],
  marketing:['Marketing mix: product / value proposition','Pricing','Branding','Communication','Distribution','Digital marketing','Consumer behaviour tools & neuromarketing','AI in marketing']};
const DECK_BY_ID=Object.fromEntries(DECKS.map(m=>[m.id,m]));

const SHEETS={
intro:`
<p class="thesis">In this course a company is a profit-oriented legal entity whose goal is to <mark>maximise long-term cash flows</mark>. That is how it creates value for shareholders and, over time, for every other stakeholder.</p>
<h3>What a company is</h3>
<ul>
<li>Unit of analysis: the <b>profit-oriented organisation</b> responsible for economic and financial results. Small businesses, public bodies and non-profits are companies too, but are not the focus.</li>
<li>Size can be read through <b>market capitalisation</b>, <b>revenues</b> or <b>employees</b>, and the rankings change a lot with the indicator.</li>
<li>Scope choices: one output or a portfolio; many activities in-house or outsourced; one market or many (internationalisation). Eni moved from a 1980s conglomerate (energy, chemicals, textiles, newspapers) to Exploration &amp; Production plus energy-transition businesses (Plenitude, Enilive). EssilorLuxottica integrated into lenses through the Essilor merger and runs about 20,000 shops.</li>
</ul>
<h3>Legal forms</h3>
<div class="tablewrap"><table><tr><th>Form</th><th>Liability</th><th>What to remember</th></tr>
<tr><td>Unlimited company</td><td>Members not protected on liquidation</td><td>Exempt from filing public accounts</td></tr>
<tr><td>Private company limited by guarantee</td><td>Members guarantee a fixed amount</td><td>No share capital; typical of charities</td></tr>
<tr><td>Private company limited by shares</td><td>Limited</td><td>Shares cannot be offered to the public; usually offered to fellow shareholders first</td></tr>
<tr><td>Public limited company (≈ US Corp., German AG)</td><td>Limited</td><td>Can be listed; raises money by selling stock or bonds</td></tr></table></div>
<h3>From foundation to IPO</h3>
<p>Foundation (legal entity, equity split, decision rules) → financing rounds (capital in, <mark>dilution</mark>, less founder control) → IPO (public markets, valuation, disclosure, stronger governance). The journey goes from entrepreneurial control to shared ownership and public accountability.</p>
<div class="formula">Post-money = Pre-money + new capital<br>Investor stake = Investment ÷ Post-money<br>Existing holders keep (Pre ÷ Post) of their stake</div>
<div class="tablewrap"><table><tr><th>Shareholder</th><th>Start</th><th>After A<br><span class="mono">€5m @ €10m pre</span></th><th>After B<br><span class="mono">€15m @ €45m pre</span></th><th>After IPO<br><span class="mono">€160m @ €240m pre</span></th></tr>
<tr><td>Founder A</td><td class="n">40%</td><td class="n">26.67%</td><td class="n">20.0%</td><td class="n">12.0%</td></tr>
<tr><td>Founder B</td><td class="n">40%</td><td class="n">26.67%</td><td class="n">20.0%</td><td class="n">12.0%</td></tr>
<tr><td>Founder C</td><td class="n">20%</td><td class="n">13.33%</td><td class="n">10.0%</td><td class="n">6.0%</td></tr>
<tr><td>Series A</td><td class="n">–</td><td class="n">33.33%</td><td class="n">25.0%</td><td class="n">15.0%</td></tr>
<tr><td>Series B</td><td class="n">–</td><td class="n">–</td><td class="n">25.0%</td><td class="n">15.0%</td></tr>
<tr><td>Public</td><td class="n">–</td><td class="n">–</td><td class="n">–</td><td class="n">40.0%</td></tr></table></div>
<p class="note">Dilution is not necessarily bad: founders own a smaller percentage of a much more valuable company.</p>
<ul>
<li><b>Primary IPO</b>: new shares, cash to the company (capital increase). <b>Secondary</b>: existing shareholders sell, cash to the sellers. <b>Mixed</b>: both.</li>
<li>SpaceX (June 2026): $135 per share, about 555.6m Class A shares, 100% primary, Nasdaq ticker SPCX; ≈$75bn raised against Saudi Aramco's $25.6bn.</li>
<li>Shareholders want capital gains (plus dividends) and <b>power/control</b>. Takeovers are friendly or hostile (takeover bid).</li>
<li>EasyJet rejected Wizz Air's unsolicited approach (2021), then agreed to Apollo's £5.7bn cash offer at £7.15 per share (Aug 2026, closing expected by March 2027). Musk–Twitter (2022): 9.1% stake → $43bn offer → board accepts $44bn → attempted termination → lawsuit → deal closed 28 Oct, Twitter delisted.</li>
</ul>
<h3>The goal: shareholder value and beyond</h3>
<div class="formula">SV = Σ NCF<sub>t</sub> / (1 + r<sub>e</sub>)<sup>t</sup><br>NCF = dividends + share price at sale − capital injected; r<sub>e</sub> = cost of equity<br>SV = EV − net debt = EV − debt + cash</div>
<ul>
<li>Stock market value is only a <b>proxy</b> of SV, because markets have bubbles, fads and speculation.</li>
<li>Stakeholder view: the firm is a living organism in an ecosystem (B2C/B2B consumers, suppliers, financial system, labour, government, society &amp; community, consultants). Their objectives can conflict, above all in listed companies.</li>
<li>In the long run the two views meet: stakeholders suffer when management fails to create SV, and there is no SV without stakeholder value. Hence the emphasis on <mark>long-term cash flows</mark>.</li>
<li>Stakeholder impact analysis became critical after accounting scandals (Enron, Arthur Andersen, WorldCom, Tyco, Parmalat), the global financial crisis and black swans (9/11, Fukushima, fall of the Berlin Wall, the pandemic).</li>
<li>CSR pyramid (Carroll, in Rothaermel): economic → legal → ethical → philanthropic responsibilities.</li>
</ul>
<h3>Corporate governance</h3>
<p>The set of systems, principles and processes by which a company is governed, so that it can fulfil its goals, add value and benefit all stakeholders in the long term.</p>
<div class="tablewrap"><table><tr><th>Model</th><th>Bodies</th><th>Who controls whom</th></tr>
<tr><td>Traditional (Italy)</td><td>Shareholders' meeting; Board of directors (+CEO); Board of supervisors; independent auditors</td><td>Meeting hires/fires board members, approves financial statements and dividends; supervisors (independent) check legal and statutory compliance; auditors check the accounts. Extraordinary meeting: bond issue, capital increase, statute change.</td></tr>
<tr><td>Two-tier (Germany, Netherlands)</td><td>Supervisory board; Management board; auditors</td><td>Supervisory board (shareholder + stakeholder reps, non-executives) hires/fires the management board, reviews decisions, approves financial statements.</td></tr>
<tr><td>One-tier (US, UK)</td><td>Board of directors; auditors</td><td>Executives and non-executives on one board; non-executives outnumber executives and some act as supervisors.</td></tr></table></div>
<p><b>VW dieselgate</b>: a 20-member supervisory board split between shareholder and worker reps, 17 of 20 German or Austrian, one truly independent voice, dominated by the Porsche/Piëch families, Lower Saxony and Qatar; outside investors held 12% of votes. Lack of independence, diversity and expertise made the cheating predictable; the shares already traded at a governance discount.</p>
<p><b>ESG</b>: Environmental (climate, emissions, biodiversity, pollution, energy, water), Social (diversity, equity &amp; inclusion, customer satisfaction, employee engagement), Governance (board composition, cybersecurity, management structure, executive pay, anti-bribery). It is meant to be built into strategy to create enterprise value.</p>
<div class="exam"><b>Exam angle.</b> Numbers on dilution and SV; Envision questions on IPO structure, takeovers or governance reforms (always weigh shareholder vs stakeholder effects).</div>`,

strat:`
<p class="thesis">Strategy is an integrated plan of goal-directed actions that sets a firm's scope and direction to achieve long-term performance superior to competitors: a <mark>competitive advantage</mark>.</p>
<h3>Definitions to quote</h3>
<div class="tablewrap"><table><tr><th>Author</th><th>Strategy is…</th></tr>
<tr><td>Ken Ohmae</td><td>About competitive advantage: a sustainable edge over competitors</td></tr>
<tr><td>Peter Drucker</td><td>A firm's theory about how to gain competitive advantages</td></tr>
<tr><td>Michael Porter</td><td>Being different: delivering a unique mix of value</td></tr>
<tr><td>Bruce Henderson</td><td>A deliberate search for a plan of action to develop competitive advantage</td></tr>
<tr><td>Henry Mintzberg</td><td>A pattern in a stream of decisions</td></tr></table></div>
<p>Origin: Greek <i>strategos</i>, generalship, the art of moving troops into favourable positions.</p>
<h3>Strategic decisions</h3>
<ul><li>A <mark>strategic decision</mark> has long-term effects, is not reversible and needs large resources.</li>
<li>Strategy matters as <b>decision support</b> (narrows alternatives, integrates knowledge) and as a <b>coordinating device</b> (aligns units, gives messages easy to communicate).</li></ul>
<h3>Levels of strategy (Grant)</h3>
<div class="tablewrap"><table><tr><th>Level</th><th>Question</th><th>Driver of profit</th></tr>
<tr><td>Corporate</td><td>Which industries should we be in?</td><td>Industry attractiveness</td></tr>
<tr><td>Business</td><td>How should we compete?</td><td>Competitive advantage</td></tr>
<tr><td colspan="3">Both lead to a <b>rate of return above the cost of capital</b>. Functional strategies elaborate and implement business strategy within each function.</td></tr></table></div>
<p><b>Strategic Business Unit</b>: a defined group of products for a specific group of customers, with its own competitors, manageable separately and able to stand alone, with distinct objectives, run as a profit centre by a manager responsible for its strategy and performance.</p>
<h3>The strategic decisions process</h3>
<p>The backbone of the whole course (see the map above): <b>Diagnosis</b> — external analysis (KSFs, opportunities &amp; threats) and internal analysis (strategic resources, strengths &amp; weaknesses), competitive advantage &amp; grand strategy, SWOT; <b>Strategy formulation</b> — generation and selection of strategic alternatives, repositioning; <b>Implementation</b> — actions and control.</p>
<p>Strategy is the link between the <b>internal environment</b> (goals &amp; values, resources &amp; capabilities, structure &amp; systems) and the <b>external environment</b> (economic &amp; social context, business areas, competitors, customers, suppliers).</p>
<p>Grant's common elements of successful strategy: simple, consistent, long-term goals; profound understanding of the competitive environment; objective appraisal of resources; effective implementation.</p>
<h3>Approaches</h3>
<ul><li><b>Top-down</b>: intended, planned strategy.</li><li><b>Bottom-up</b>: emergent strategy.</li><li>In reality strategy combines the planned strategy with emergent initiatives.</li></ul>
<h3>Vision, mission, purpose</h3>
<div class="tablewrap"><table><tr><th></th><th>Answers</th><th>Disney</th></tr>
<tr><td>Vision</td><td>Where are we going? The future “dream”</td><td>To be one of the leading producers and providers of entertainment and information</td></tr>
<tr><td>Mission</td><td>Who are we, what do we do? Present scope; the means to the vision</td><td>Using a portfolio of brands to create the most creative, innovative and profitable entertainment experiences</td></tr>
<tr><td>Purpose</td><td>Why do we exist? Outward-looking, for stakeholders; must be authentic and shared</td><td>Promote and spread happiness</td></tr></table></div>
<p>Airbus (traditional approach). Vision: the world's leading aerospace company. Mission: manufacturing the world's largest aircraft with passengers at heart and airlines in mind. Purpose examples: Walmart, saving people money so they can live better; Tesla, accelerating the world's transition to sustainable energy; Unilever, making sustainable living commonplace.</p>
<h3>Culture and values</h3>
<ul><li>Culture: collectively shared values and norms. Values: what is important, ethical standards, appropriate behaviour.</li>
<li>Visible in <b>artifacts</b> (space, dress, vocabulary, stories, celebrations); learned through <b>socialisation</b>.</li>
<li>Comes from <b>founder imprinting</b>. Risks: groupthink and <mark>core rigidity</mark> (the strongest asset becomes the strongest liability). Cultural change usually needs new leaders.</li></ul>
<h3>What the recorded lectures add</h3>
<p class="note">From the MOOC <i>Fundamentals of Strategy</i> (lectures 1.1.01–1.3.03). Where they differ from the slides, both readings are kept: use the one your examiner uses.</p>
<ul>
<li><b>Strategic decision, full definition</b> (1.1.02): long-term, significant, multi-dimensional and non-reversible effects on the organisation's final goal; usually large resources; usually top-management involvement. The slides keep three criteria.</li>
<li><b>Five macro-phases</b> of the business strategy process (1.3.03): orientation → analysis/diagnosis → decision-making → implementation → control. Orientation (vision, mission, SMART objectives, business-area boundaries) comes before the slides' three phases; implementation and control are split.</li>
<li><b>Vision and mission, second reading</b> (1.3.01): vision = <mark>industry foresight</mark>, how the business area will evolve, which competitors can share; mission = <mark>strategic intent</mark>, the role the firm wants to play on that path, firm-specific. Microsoft, late 1980s: computers would reach every home (vision); becoming the leader in personal computers (mission).</li>
<li><b>SMART objectives</b> (1.3.02): specific, measurable, appropriate (aligned with vision and mission), realistic (challenging but attainable), timely.</li>
<li><b>Abell cube</b> (1.3.02): the business area's boundaries on three axes — customer groups, customer functions, alternative technologies. Deck 2 reuses Abell (customers × needs × products) to find substitutes.</li>
<li><b>Sun Tzu</b> (1.1.01): <i>The Art of War</i> (around 500 BC) and its ten decisive factors, many still business rules: know the enemy and yourself, be flexible, separate the enemy from his allies.</li>
</ul>
<div class="exam"><b>Exam angle.</b> Use the process to structure any answer: diagnose (external + internal), formulate (alternatives), implement and control. Mission/vision/purpose drafts are common Envision tasks.</div>`,

ext:`
<p class="thesis">External analysis tells you what the environment rewards. It ends in three outputs: <mark>key success factors</mark>, opportunities and threats.</p>
<h3>Five lenses</h3>
<div class="tablewrap"><table><tr><th>Level</th><th>Tool</th></tr>
<tr><td>Big picture</td><td>STEEP analysis</td></tr><tr><td>Industry</td><td>Porter's five forces</td></tr><tr><td>Competitors</td><td>Competitor analysis, strategic groups</td></tr><tr><td>Supply chain</td><td>Profit pool mapping</td></tr><tr><td>Customers</td><td>Demand analysis, segmentation, buyer analysis</td></tr></table></div>
<h3>STEEP</h3>
<p><b>S</b>ocial (demographics, income distribution, lifestyles, education, consumer activism, urbanisation) · <b>T</b>echnological (breakthroughs, connectedness) · <b>E</b>conomic (growth, interest and exchange rates, inflation, employment) · <b>E</b>cological (environmental laws, protocols, decommissioning costs, energy) · <b>P</b>olitical/legal (antitrust, tax, trade rules, tariffs, stability).</p>
<p>How to run it: list the factors, give each a <b>probability (%)</b> and an <b>impact from −5 to +5</b> over the next 3–5 years, add the response, and plot them on a probability × impact chart; negative impacts are threats, positive ones opportunities.</p>
<p class="note">Megatrends to cite: 1.5m people move to cities every week and cities produce 85% of GDP; world population over 8bn (2024), 97% of growth in emerging countries, over-65s the fastest-growing group; 2.2bn new middle-class consumers by 2030, mostly in Asia; by 2030 demand for food +35%, water +40%, energy +50%; tech disruptions (AI, IoT, cloud, robotics, autonomous vehicles, genomics, energy storage, 3D printing, renewables).</p>
<h3>Porter's five forces</h3>
<p><b>Attractiveness</b> of a business area = average profitability and growth of the firms in it, current and future. Assumptions: competition is driven by industry structure; attractiveness is inversely proportional to competition; rivalry is <mark>extended</mark> beyond current players.</p>
<div class="tablewrap"><table><tr><th>Force</th><th>Gets stronger when…</th></tr>
<tr><td>Rivalry (direct competition)</td><td>Excess capacity, high fixed costs, low differentiation, slow growth, many similar-size players, high exit barriers, low switching costs</td></tr>
<tr><td>New entrants (potential competition)</td><td>Low entry barriers: no regulation, no cost advantages independent of size (proprietary technology, access to raw materials, location, learning curve, subsidies), easy access to distribution, low switching costs, low capital needs, no scale economies, weak brands, no credible retaliation</td></tr>
<tr><td>Substitutes (indirect competition)</td><td>Low switching costs; better price and/or performance of the substitute</td></tr>
<tr><td>Buyers</td><td>Buyers more concentrated than sellers, low switching costs, low differentiation, good information, able to integrate backward</td></tr>
<tr><td>Suppliers (upstream competition)</td><td>Dual of buyers: suppliers more concentrated, high switching costs, differentiated inputs, customers poorly informed and unable to integrate backward</td></tr></table></div>
<ul>
<li><b>Exit barriers</b> (specialised assets, fixed exit costs such as labour agreements, strategic interrelationships, emotional barriers, government and social restrictions) make an industry <b>less</b> profitable: losers stay in.</li>
<li><b>Entry barriers</b> make it <b>more</b> profitable for incumbents. Ryanair 1986: entered Dublin–London at €140 against €300; Aer Lingus and BA cut to €130 before launch and kept cutting (€100 by 1989); Ryanair grew but made losses. Credible retaliation is a barrier.</li>
<li><b>Substitutes</b> come from other industries and perform the same function (high-speed trains vs short-haul flights, web conferencing vs airlines, tablets vs laptops, aluminium vs steel). They put a ceiling on prices. <b>Abell's model</b>: customers × needs × products; direct competition = same customers, needs and products; indirect competition = same customers and needs, different products.</li>
</ul>
<p><b>Substitutes matrix</b></p>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">Performance worse</div><div class="hd">Performance better</div>
<div class="hd">Price favourable</div><div>Monitor the improvement of performance</div><div class="hot">Big threat</div>
<div class="hd">Price unfavourable</div><div>Monitor price reduction and performance improvement</div><div>Monitor the reduction of price</div></div>
<ul>
<li><b>Sixth force: complements</b>. A complement adds value to the industry's product and raises its demand (games for consoles, apps for smartphones, charging stations for EVs). With an <b>installed base</b> they create <mark>network effects</mark>: a self-reinforcing cycle between users and complements.</li>
<li><b>Dynamics</b>: maturity slows growth and intensifies rivalry; an acquisition can bring in a very different player; technology opens room for entrants or substitutes; fewer suppliers reduce the firm's bargaining power.</li>
</ul>
<h3>Competitors</h3>
<ul>
<li><b>Competitor analysis</b> aims to forecast rivals' strategies, predict their reactions and influence their behaviour. It covers how they compete now, how they might change, and how they perceive the industry. <b>Competitive intelligence</b> uses public sources: annual reports, brochures and fairs, press, suppliers, customers, the business community.</li>
<li><b>Strategic group</b>: firms in an industry following the same or a similar strategy along the key strategic dimensions. Rivalry is strongest inside a group; the environment and the five forces hit groups differently; some groups are more profitable than others.</li>
</ul>
<h3>Supply chain and customers</h3>
<ul>
<li><b>Profit pool mapping</b>: how are profits distributed along the chain, where are they growing, can we expand into those stages? (Air transport: returns differ widely across airports, airlines, MRO, catering, ground handling, ANSPs, CRS.)</li>
<li><b>Segmentation</b> example (airlines): regular travellers (personal reasons, price sensitive, loyalty points), business travellers (company decides, business class, loyal to few airlines), budget-conscious (infrequent, see little difference, highly price sensitive).</li>
</ul>
<h3>Key success factors</h3>
<p>KSF = what customers want (<b>demand analysis</b>) + how the firm survives competition (<b>competition analysis</b>).</p>
<div class="tablewrap"><table><tr><th>Industry</th><th>Customers want</th><th>Competition</th><th>KSFs</th></tr>
<tr><td>Airline</td><td>Low price; comfort (business)</td><td>Commodity, excess capacity, price wars, exit barriers, strong suppliers and buyers</td><td>Economy: lean processes, low operating costs. Business: on-board services, loyalty</td></tr>
<tr><td>Steel</td><td>Low price, consistency, reliability (special steel)</td><td>Commodity, excess capacity, high fixed costs, exit barriers</td><td>Cheap raw materials, low-cost location, large scale, customisation for applications</td></tr>
<tr><td>Fashion</td><td>Variety of styles; price sensitive</td><td>Low entry barriers, low concentration, powerful retail chains</td><td>Speed of response to trends, fast delivery, low-cost manufacturing</td></tr></table></div>
<h3>Appendix</h3>
<div class="formula">Concentration: cumulated market share of the top 1…n competitors<br>DOL = (ΔEBIT/EBIT) ÷ (ΔREV/REV) = 1 / (1 − FC/(m·Q))</div>
<p class="note">High fixed costs → high operating leverage → strong pressure to fill capacity → fiercer rivalry.</p>
<div class="exam"><b>Exam angle.</b> “Assess” questions: STEEP + five forces (state the direction and strength of each force with case evidence), then conclude with KSFs, opportunities and threats and an overall judgement on attractiveness.</div>`,

ca:`
<p class="thesis">A firm has a competitive advantage when it earns, or can earn, a <mark>persistently higher rate of profit</mark> than rivals in the same market. It comes from lower cost or from differentiation, and the grand strategy chooses where and how to use it.</p>
<h3>Where advantage comes from</h3>
<ul><li><b>External change</b>: shifts in customer demand, prices, technology.</li>
<li><b>Internal change</b>: resource heterogeneity means change hits firms differently; some are more creative and innovative, some faster at exploiting change.</li>
<li>Zara: designs from store sales (pull model), time to market as short as 4 weeks, attractive stores, planning on fabrics and semi-finished goods rather than finished products → very high rotation at low risk.</li></ul>
<h3>Cost advantage</h3>
<p>Same or similar products at lower cost. <b>Cost drivers</b>: capacity utilisation, <mark>economies of scale</mark>, <mark>economies of learning</mark>, production techniques, product design, preferential access to inputs (location).</p>
<ul><li><b>Scale</b>: unit cost falls as output rises, down to the minimum efficient scale. Sources: technical input-output relations, indivisibilities, specialised equipment. Beyond a point, diseconomies (coordination costs). Scale also helps differentiation: bigger R&amp;D, advertising, sales networks and service.</li>
<li><b>Learning</b>: costs fall about 20–30% in real terms each time cumulative output doubles, but only if managed.</li>
<li>Scale is captured at a point in time; learning accumulates over time. Learning flattens out but has no diseconomies.</li></ul>
<h3>Differentiation advantage</h3>
<p>Attributes different and better than rivals' that increase customer value. <b>Demand side</b>: tangible (physical features, performance, associated service) and intangible (status, exclusivity, image, experience); requires understanding why customers buy and matching segment preferences with attributes. <b>Supply side</b> drivers of uniqueness: product features, service procedures, marketing intensity, embodied technology, quality of inputs, complements (ecosystem), employee skills, location. Also needs product integrity, communication, reputation (quality signals, ad spending, premium prices) and brand. It is costly.</p>
<div class="formula">Cost advantage: price unchanged → ΔCFFO = Δm × Q &nbsp;|&nbsp; price cut with costs → ΔCFFO = m × ΔQ<br>Differentiation: price up → ΔCFFO = Δm × Q &nbsp;|&nbsp; price unchanged → ΔCFFO = m × ΔQ</div>
<h3>Grand strategies (Porter, Rothaermel)</h3>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">Cost</div><div class="hd">Differentiation</div>
<div class="hd">Broad scope</div><div><b>Cost leadership</b>Walmart, Aldi, Southwest</div><div><b>Differentiation</b>Apple, BMW, Illy, Tesco</div>
<div class="hd">Narrow scope</div><div><b>Focused cost leadership</b>Spirit, Allegiant</div><div><b>Focused differentiation</b>niche players</div></div>
<p><b>Integration</b> combines both (IKEA, Toyota, Target). Fail at it and you are <mark>stuck in the middle</mark>.</p>
<div class="tablewrap"><table><tr><th>Strategy</th><th>Requirements</th><th>Risks</th></tr>
<tr><td>Cost leadership</td><td>Be the lowest (second-lowest can be undercut); never ignore minimum quality; tight cost control everywhere</td><td>Technology change voids past investment or learning; imitation by followers; losing sight of the quality customers need</td></tr>
<tr><td>Differentiation</td><td>Investment in R&amp;D, ads, brand, people, quality; allows premium prices; costs still matter</td><td>Premium too high vs cost-based rivals; customers need the feature less; imitation; counterfeits</td></tr>
<tr><td>Focus</td><td>Serve a narrow target (segment, region, niche) better or cheaper than broad players</td><td>Cost gap with broad players widens; target's needs converge with the market; rivals out-focus the focuser</td></tr>
<tr><td>Integration</td><td>Drivers: quality (higher value and lower after-sale cost), economies of scope, mass customisation</td><td>Stuck in the middle</td></tr></table></div>
<p class="note">Cases: Walmart (suppliers replenish shelves from checkout data, no orders or billing, no inventory costs); Aldi (few products per category, private label, small simple stores, minimal service, prices ~40% lower); Formule 1 hotels (€39 a night); Illy (9 pure Arabica varieties, quality and culture brand in a commodity); Tesco Clubcard (1993; quarterly newsletter in 4 million versions); Commerce Bank (small, premium service, 7:30–20:30, “10-minute rule”, retailtainment); Nordstrom differentiator, Walmart cost leader, Target integrator.</p>
<h3>Positioning</h3>
<ul><li>Two myths: you need the best product; innovation means better technology. “Better” depends on customers' purchase criteria; innovation creates new forms of value. BMW (joy of driving) and Volvo (safety) don't claim the best car; they win different customers.</li>
<li><b>Positioning</b> (Kotler): designing the offer and image to occupy a distinct place in the target customer's mind. Tools: the <b>perceptual map</b> (pick the purchase attributes, map yourself and rivals) and the <b>value curve</b>.</li>
<li>Critical success factors: a specific target; the key variables for that segment; an exclusive or at least superior advantage as customers perceive it; durable; consistent over time.</li></ul>
<div class="exam"><b>Exam angle.</b> “Apply”: name the type of advantage with evidence (cost drivers or uniqueness drivers), place the firm on Porter's matrix, check for stuck-in-the-middle, draw a perceptual map or value curve.</div>`,

int:`
<p class="thesis">Internal analysis finds the <mark>strategic resources</mark> behind a firm's advantage and judges its strengths and weaknesses against competitors.</p>
<h3>Core competencies</h3>
<p>Unique strengths deeply embedded in the company, created by the interplay of <b>resources</b> (tangible and intangible assets), <b>capabilities</b> (skills to orchestrate them) and <b>activities</b> (processes). Examples: Netflix (AI to predict hits and recommend), IKEA (low-cost functional design, retail experience), Coca-Cola (marketing and distribution), Tesla (battery packs and powertrains, vertical integration), Amazon (IT/AI, customer service).</p>
<h3>Porter's value chain</h3>
<div class="tablewrap"><table><tr><th>Primary activities</th><th>Support activities</th></tr>
<tr><td>Inbound logistics (receiving, storing, inventory, supplier management)<br>Operations (machining, assembly, packaging, testing, maintenance)<br>Outbound logistics (order processing, warehousing, distribution)<br>Marketing &amp; sales (advertising, promotion, pricing, channels)<br>Service (after-sale maintenance and interaction)</td><td>Firm infrastructure (general management, planning, finance, accounting, PR)<br>Human resource management (recruiting, training, pay, retention)<br>Technology development (R&amp;D, product and process improvement)<br>Procurement (purchasing, supplier contracts)</td></tr></table></div>
<p><b>Resources</b>: tangible (physical, financial; found on the balance sheet), intangible (brand, reputation, culture, IP), human (skills, know-how, motivation). <b>Organisational capabilities</b>: the intangible ability to deploy resources for a desired end — structure, routines, culture (3M's innovation process, Walmart's logistics, UPS delivery).</p>
<h3>VRIO</h3>
<div class="tablewrap"><table><tr><th>Valuable?</th><th>Rare?</th><th>Costly to imitate?</th><th>Organised?</th><th>Outcome</th></tr>
<tr><td>No</td><td></td><td></td><td></td><td>Competitive disadvantage</td></tr>
<tr><td>Yes</td><td>No</td><td></td><td></td><td>Competitive parity</td></tr>
<tr><td>Yes</td><td>Yes</td><td>No</td><td></td><td>Short-term advantage</td></tr>
<tr><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>Mid-term advantage</td></tr>
<tr><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td><b>Sustainable advantage</b></td></tr></table></div>
<p><b>Isolating mechanisms</b> that make imitation hard: unique physical resources and IP (patents, designs, copyrights, trademarks, trade secrets, mines, wells); <mark>path dependence</mark> (built over time, cannot be compressed); <mark>causal ambiguity</mark> (rivals can't see how the advantage is produced, typical of capabilities); economic deterrence (the market can't support two players).</p>
<h3>Using the value chain</h3>
<ul><li>Which activities drive cost and which create differentiation depends on the industry and on the advantage pursued.</li>
<li><b>For cost</b>: (1) find the activities with relevant costs (Pareto; fixed vs variable; internal vs external; how competitors run them), (2) find each activity's cost drivers, (3) find cost-reduction opportunities. Car example: component prices depend on number of components, order size, purchase per supplier, supplier location; assembly on plant scale, models per plant, automation, wages, location.</li>
<li><b>For differentiation</b>: (1) identify the key performance the customer wants, (2) the activities that affect it, (3) opportunities. Metal cans: link your value chain to the customer's — distinctive can design supports their marketing, tight tolerances avoid breakdowns on their lines, fast flexible delivery cuts their inventory, skilled maintenance of their packaging lines.</li></ul>
<h3>Strengths and weaknesses</h3>
<p><b>Benchmarking</b> appraises resources and capabilities against competitors. Score each on strategic importance and relative strength (1–10, 5 = parity):</p>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">Low importance</div><div class="hd">High importance</div>
<div class="hd">High relative strength</div><div><b>Superfluous strengths</b>VW: government relations</div><div><b>Key strengths</b>VW: engineering, plants</div>
<div class="hd">Low relative strength</div><div><b>Zone of irrelevance</b>VW: location</div><div class="hot"><b>Key weaknesses</b>VW: product development, marketing, manufacturing</div></div>
<p><b>EMI and Raytheon</b> lessons: a well-performing new product does not guarantee success; strategic resources are often activities or capabilities complementary to the product; that is why followers often beat pioneers; collaborations are the main way to access resources you lack.</p>
<div class="exam"><b>Exam angle.</b> “Apply”: run VRIO on two or three named resources with case evidence, say which isolating mechanism protects them, and place them in the strengths/weaknesses matrix.</div>`,

swot:`
<p class="thesis">SWOT closes the diagnosis: it crosses internal strengths and weaknesses with external opportunities and threats to <mark>generate strategic alternatives</mark>, which you then prioritise on a roadmap.</p>
<h3>SWOT and the strategic questions</h3>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">Opportunities</div><div class="hd">Threats</div>
<div class="hd">Strengths</div><div><b>S–O</b>How can we use our strengths to take advantage of opportunities?</div><div><b>S–T</b>How can we use strengths to reduce the likelihood and impact of threats?</div>
<div class="hd">Weaknesses</div><div><b>W–O</b>How can we overcome the weaknesses that stop us from seizing opportunities?</div><div><b>W–T</b>How can we fix the weaknesses that would make threats real?</div></div>
<p>Each answer becomes a candidate action (the course example is McDonald's). S and W come from internal analysis; O and T from external analysis. A good SWOT is specific, relative to competitors and backed by case evidence.</p>
<h3>Roadmapping</h3>
<p>Assess every action on two criteria: <b>expected economic impact</b> (profit generated or loss avoided) and <b>expected implementation problems</b> (actions needed, organisational change, activities involved). Sequence them into a roadmap: high-impact, easy moves first; high-impact, hard moves planned as major projects; low-impact, hard moves dropped.</p>
<h3>Repositioning</h3>
<ul><li>Changing how the target audience perceives the offer. Needed when the firm is <b>mispositioned</b> (failing to connect with its target), but also when things change.</li>
<li>Reasons: stronger competition; faulty positioning (under-positioned or too narrow); product evolution and customer trends; environmental changes (policy, economy, technology); future plans.</li>
<li>Signs: falling sales; shrinking core audience; industry shake-ups; product line inconsistent with the brand promise; outdated value proposition; no appeal to younger generations; brand confusion or negative associations.</li>
<li>Hard because brand images are deep-seated: keep <mark>continuity</mark> with the past.</li></ul>
<p class="note">Lego (2003): debt, falling sales → new CEO Knudstorp simplified go-to-market, sold loss-making theme parks, crowdsourced ideas from fans, partnered with Ghostbusters, Minecraft, Back to the Future. McDonald's: from fast to fresh, from unhealthy to healthier options. Domino's: admitted its pizza was bad, changed the recipe and ran a transparent “new and better” campaign; its core segment (students) cared more about quality and taste than price.</p>
<h3>Stuck in the middle</h3>
<p>US airlines: Southwest = cost leadership; Delta, American, United = differentiation; Alaska, Allegiant, Spirit = focused cost leadership; JetBlue = stuck in the middle.</p>
<p><b>JCPenney (2011–13)</b>: Ron Johnson, hired from Apple Retail, moved the chain from cost leadership to integration (boutiques, exclusive merchandise), removed clearance racks and coupons, rolled it out in all 1,800 stores at once without testing (“We didn't test at Apple”). Sales fell 25% in 12 months; he was fired within 18 months and replaced by his predecessor. Lessons: test before rollout, don't remove what core customers value, respect continuity.</p>
<div class="exam"><b>Exam angle.</b> “Envision”: build the SWOT from your Assess/Apply answers, derive 3–5 concrete actions from the crossings, prioritise them (impact × difficulty) and say how you will implement and control them.</div>`,

bmc:`
<p class="thesis">A business model is the set of strategic decisions that define how a company <mark>creates, delivers and captures value</mark>. Drafting it tests whether a strategic alternative is sound and consistent with the rest of the firm.</p>
<h3>The nine building blocks (Osterwalder, 2010)</h3>
<div class="tablewrap"><table><tr><th>Block</th><th>Key questions</th></tr>
<tr><td>1 Customer segments</td><td>Who do we create value for? A distinct segment when it gets a distinct offer, channel, relationship, or has different profitability</td></tr>
<tr><td>2 Value proposition</td><td>Which bundle of products/services solves which need for each segment? Innovative or similar with added features</td></tr>
<tr><td>3 Channels</td><td>Direct (sales force, web) or indirect (dealers, partners, wholesalers); functions: awareness, evaluation, purchase, delivery, after-sales. Costly channels for profitable clients</td></tr>
<tr><td>4 Customer relationships</td><td>Personal assistance, dedicated personal assistance, self-service, automated services, communities, co-creation. High price → high touch</td></tr>
<tr><td>5 Revenue streams</td><td>Selling, lending, licensing, commissions, transaction fees, advertising; share of each</td></tr>
<tr><td>6 Key resources</td><td>Human, physical, increasingly intangible (brand, expertise)</td></tr>
<tr><td>7 Key activities</td><td>The most important things to do; in-house or through partners</td></tr>
<tr><td>8 Key partners</td><td>Suppliers, alliances, JVs; what we do ourselves vs with others</td></tr>
<tr><td>9 Cost structure</td><td>Results from all other blocks; costs traceable to each block and segment</td></tr></table></div>
<p>Value creation factors: originality, performance, customisation, design, brand, exclusivity/status, price, cost reduction and risk reduction for the customer, accessibility, handiness, ease of use, fast delivery, reliability.</p>
<p>Alternative reading of the canvas: <b>value network</b> (partners, activities, resources) · <b>value proposition &amp; customer interface</b> (VP, relationships, channels, segments) · <b>economic model</b> (costs, revenues). Or: left side = value creation, right side = value capture.</p>
<h3>Patterns to know</h3>
<div class="tablewrap"><table><tr><th>Pattern</th><th>Example</th></tr>
<tr><td>Direct sales + assemble-to-order + outsourcing</td><td>Dell: minimal working capital, paid before building, no dealer margin; a business-model innovation</td></tr>
<tr><td>Bait &amp; hook</td><td>Gillette: cheap handle, frequent blade purchases, built-in lock-in (patents)</td></tr>
<tr><td>Bait &amp; hook + community</td><td>Nespresso: invented 1975 (Favre), patented 1976, launched 1986; Gaillard added Le Club, cut machine prices and raised capsule prices, made it a luxury brand, licensed machine production</td></tr>
<tr><td>Multi-sided platform</td><td>Consoles: Xbox/PS sell hardware at a loss and earn royalties; Wii sold profitable hardware to casual gamers. Google: three segments (surfers, advertisers, content owners), one revenue stream subsidises free search</td></tr>
<tr><td>Free</td><td>Metro: free commuter paper funded by advertisers, distributed through transport networks</td></tr>
<tr><td>Freemium</td><td>Flickr, Skype: paid SkypeOut under 10% of usage, over 90% of users on the free service</td></tr>
<tr><td>Revenue models</td><td>Pay-per-use, subscription (Netflix, Office), renting, licence, brokerage (Alibaba), advertising, agency (artists, Apple app sales), bundling (Office suite)</td></tr></table></div>
<h3>Business-model innovation</h3>
<p>The <mark>“what if…”</mark> method: map the current model, change one or more blocks, and work out what must change in the others. Cases listed: IKEA, Rolls-Royce, Daimler car2go, Zopa, Swatch, Mapei, Illy, Commerz Bank, Easycar, Norwich Union, Zara.</p>
<div class="exam"><b>Exam angle.</b> “Apply/Envision”: draw the current canvas from the case, then the canvas of your recommended option and say which blocks change and why it is consistent (cost structure must follow from the rest).</div>`,

corp:`
<p class="thesis">Corporate strategy decides <mark>where</mark> the firm competes: which stages of the value chain (vertical integration), which products and businesses (diversification) and which countries (internationalisation).</p>
<h3>Vertical integration</h3>
<p><b>Backward</b> (towards inputs) or <b>forward</b> (towards customers) along the industry value chain (HTC in smartphones; car makers).</p>
<div class="tablewrap"><table><tr><th>Advantages</th><th>Risks</th></tr>
<tr><td>Capture higher margins; lower transaction costs; better quality; secure critical supplies (backward) and channels (forward); learning; independence from suppliers; easier scheduling and planning</td><td>Compounding risk; less flexibility; weak incentives to cut costs (captive market); lower efficiency than specialised suppliers</td></tr></table></div>
<p><b>Forms of vertical relations</b>, from low to high commitment and formalisation: spot purchases → informal supplier/customer relationships → long-term contracts → agency agreements, franchises → supplier/customer partnerships → joint ventures → full vertical integration. <b>Taper integration</b> mixes in-house production with outside suppliers or distributors. Car OEMs keep strong relationships with Tier 1 and Tier 2 suppliers.</p>
<p class="note">De Beers: from a supply-driven miner selling rough diamonds to a marketing-driven firm integrating forward into jewellery (“from mine to finger”, “A diamond is forever”). Lenovo: bought IBM's PC business (2005) and Motorola Mobility (2014); its end-to-end model with in-house manufacturing is a source of cost advantage. Zara: vertically integrated fast fashion.</p>
<h3>Diversification</h3>
<ul><li>Traditional motives: growth, risk reduction, escape from unattractive industries, use of surplus cash (in mid-2026 Big Tech held from about $57bn (Nvidia) to $243bn (Alphabet) in cash and marketable securities).</li>
<li>History: diversification era (1950–80) → <b>refocusing</b>, driven by shareholder value, turbulence favouring specialisation, and the insight that sharing resources and capabilities is the real source of advantage.</li>
<li>Advantage from diversification: <mark>economies of scope</mark> (sharing a resource across activities uses less of it) in tangible and intangible assets (P&amp;G, Honda), organisational capabilities (LVMH), contracting out and licensing (Disney); internal markets; financial resources; administrative activities.</li>
<li>Rumelt's types (Rothaermel): single business (&gt;95% of revenues from one business), dominant business (70–95%), related diversification (&lt;70%; constrained if all businesses share competencies, linked if only some do), unrelated diversification / conglomerate (&lt;70%, little or nothing shared).</li></ul>
<div class="tablewrap"><table><tr><th></th><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Unrelated portfolio</td><td>Financial economies, restructuring, internal capital markets, risk reduction, shared HR and administration</td><td>Coordination costs, cultural heterogeneity, organisational complexity</td></tr>
<tr><td>Related portfolio</td><td>Shared resources, economies of scale and scope, critical mass, financial economies, restructuring, internal capital markets</td><td>Coordination complexity, higher risk than unrelated, managerial complexity</td></tr></table></div>
<p class="note">Examples: Nestlé H1 2026 (coffee 28%, food &amp; snacks 28%, petcare 21%, nutrition 19%, waters 4%); conglomerates Tata, Samsung, Hyundai, Mitsubishi, Sony, Reliance; Berkshire Hathaway. GE's problems (ill-judged acquisitions, overoptimism, GE Capital assets traded to keep earnings rising, manager rotation) ended in three listed companies: GE Aerospace, GE HealthCare, GE Vernova.</p>
<h3>Portfolio analysis</h3>
<p>Two dimensions: market attractiveness × the business's competitive position.</p>
<div class="formula">Relative market share (RMS) = own share ÷ share of the largest competitor (excluding the firm); cut-off = 1</div>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">High RMS (&gt;1)</div><div class="hd">Low RMS (&lt;1)</div>
<div class="hd">High market growth</div><div><b>Star</b>Invest to keep the lead</div><div><b>Question mark</b>Invest selectively or divest</div>
<div class="hd">Low market growth</div><div><b>Cash cow</b>Harvest; fund the others</div><div><b>Dog</b>Harvest or divest</div></div>
<p><b>GE/McKinsey matrix</b> (McKinsey for GE, 1971): 3×3, each axis built from many weighted variables. Market attractiveness: size, growth, margin potential, competitive intensity, cyclicality/seasonality, position on the learning curve. Business strength: relative share, price competitiveness, quality perception, market knowledge and loyalty, sales effectiveness, geographic coverage.</p>
<div class="mx" style="grid-template-columns:auto 1fr 1fr 1fr">
<div class="hd">Attractiveness ↓ / Strength →</div><div class="hd">High</div><div class="hd">Medium</div><div class="hd">Low</div>
<div class="hd">High</div><div><b>1 Premium invest/grow</b></div><div><b>3 Challenge invest/grow</b></div><div><b>6 Opportunistic selectivity</b>improve or divest</div>
<div class="hd">Medium</div><div><b>2 Selective invest/grow</b></div><div><b>5 Prime selectivity</b>creative segmentation</div><div><b>8 Opportunistic harvest/divest</b></div>
<div class="hd">Low</div><div><b>4 Protective selectivity</b>cash generator; don't over-invest</div><div><b>7 Restructure, harvest/divest</b></div><div class="hot"><b>9 Harvest/divest</b>exit</div></div>
<div class="exam"><b>Exam angle.</b> Compute RMS and place businesses on BCG; argue with GE/McKinsey factors from the case; judge vertical moves on advantages vs risks and consider lighter forms (contracts, JVs, taper) before full integration.</div>`,

mk1:`
<p class="thesis">Marketing starts from the customer's problem, not from the product. You understand the market and its <mark>demand</mark>, then create <mark>customer value</mark> that competitors fail to deliver.</p>
<h3>The basics</h3>
<ul>
<li>Four core concepts: <b>market, customer, exchange, value</b>.</li>
<li><b>Market</b> (Kotler): a system that facilitates the exchange of goods and services, bringing buyers and sellers into contact directly or through intermediaries. <b>Industry</b>: the sellers competing to serve a market.</li>
<li><b>Exchange</b>: obtaining a desired product by offering something in return; when an agreement is reached it is a <b>transaction</b>. Offer → exchange → transaction.</li>
<li><b>Marketing</b> (AMA, 2007, reaffirmed 2017): the activity, set of institutions and processes for creating, communicating, delivering and exchanging offerings that have value for customers, clients, partners and society at large.</li>
<li>Customers rarely want products per se: products are means to achieve something.</li>
</ul>
<h3>Four orientations</h3>
<div class="tablewrap"><table><tr><th>Orientation</th><th>Starting question</th><th>Emblem</th></tr>
<tr><td>Production</td><td>How can we produce efficiently?</td><td>Henry Ford: any colour, as long as it's black</td></tr>
<tr><td>Product</td><td>How can we build the best product?</td><td>Steve Jobs: people don't know what they want until you show them. Risk: Google Glass (forecast to sell millions by 2016; sales ended Jan 2015)</td></tr>
<tr><td>Sales</td><td>How can we sell what we produce?</td><td>Sergio Zyman (Coca-Cola): sell more stuff, to more people, more often, for more money</td></tr>
<tr><td>Marketing</td><td>What does the market value, and how can we serve it better?</td><td>From “sell what you make” to “produce what can be sold”</td></tr></table></div>
<p>Market analysis tools: surveys and questionnaires, focus groups, feedback and complaints, ethnographic research, social listening and reviews, competitive benchmarking, trend analysis, sales data and CRM analytics, experiments and A/B tests.</p>
<p><b>Shareholder vs stakeholder theory</b>: Friedman (1970s) — maximise shareholder value, managers are agents of the owners, externalities are for government; criticised for “profit at all costs”. Freeman (1980s) — the firm is a nexus of relationships, managers mediate between interests, the firm is directly responsible for society and the environment; criticised for diluted objectives. (Same debate as deck 0.)</p>
<h3>The marketing process (reference framework)</h3>
<p><b>Context analysis</b> (external: macro-environment/PESTEL, competitive forces, demand macro + micro, consumers; internal: values, resources and competencies, primary and support activities) → business strategy → <b>segmentation, targeting, positioning</b> → <b>value proposition: marketing mix</b> (product, place, price, promotion) → <b>implementation and control</b>.</p>
<div class="tablewrap"><table><tr><th></th><th>Strategic marketing</th><th>Operational marketing</th></tr>
<tr><td>Question</td><td>Where to play and how to win</td><td>How to execute the strategy</td></tr>
<tr><td>Steps</td><td>Context analysis, STP</td><td>Marketing mix (4Ps), implementation</td></tr>
<tr><td>Decision</td><td>Long-term, non-reversible, large resources, top management</td><td>Short/medium term, limited resources, revisable on market feedback, middle management</td></tr></table></div>
<p>Marketers' tasks: know customers, build relationships, estimate market size and structure, forecast demand, segment, target, position, create the offer (4Ps), manage the brand portfolio. Transversal topics of the course: digital marketing, consumer behaviour tools (user testing, neuromarketing), AI in marketing.</p>
<h3>Market demand</h3>
<p><b>Need → want → demand.</b> Need: a perceived state of deprivation. Want: a need directed at a specific solution. Demand: a want backed by willingness and ability to buy. (“I'm thirsty” → a Coke → I buy it.)</p>
<p><b>Market demand</b>: the total quantity of a product or service that consumers are willing and able to buy at a given price within a specific period. Analyse it at three levels: macro-environment (PESTEL); <b>macro</b> view of demand (define and qualify the market; measure it: estimate and forecast); <b>micro</b> view (needs, buying behaviour, offering analysis, competitive system).</p>
<div class="tablewrap"><table><tr><th>Market level</th><th>Range Rover Evoque in Italy (€60,000)</th></tr>
<tr><td>Potential</td><td>Drivers interested in premium SUVs</td></tr>
<tr><td>Qualified</td><td>Adults with a driving licence</td></tr>
<tr><td>Available</td><td>Upper-middle income professionals (€85k+) in big cities, near a dealer</td></tr>
<tr><td>Served (target)</td><td>Urban professionals in Milan, Rome, Turin</td></tr>
<tr><td>Penetrated</td><td>Those who bought it (e.g. 5,000 in 2024)</td></tr></table></div>
<div class="formula">Market share = company sales ÷ total market demand<br>Price elasticity E = (ΔQ/Q) ÷ (ΔP/P) &nbsp;→ |E| &gt; 1 elastic, |E| &lt; 1 inelastic</div>
<ul>
<li>Market share measures competitive capacity. PCs 2024 by units (Gartner): Lenovo 25.5%, HP 21.6%, Dell 16.1%, Apple 9.2%, Asus 7.1%, Acer 6.9%, others 13.7%.</li>
<li><b>Expansible</b> markets grow a lot with marketing effort; <b>non-expansible</b> ones stay close to their potential whatever you do.</li>
<li>Demand drivers: <b>endogenous</b>, controlled by the firm (price, product/service, point of sale, communication, personal relationship) and <b>exogenous</b> (macro-environment, economic trends, disposable income, competition and positioning, complements, substitutes).</li>
<li><b>Forecasting</b>: choose the method by data (quantitative data available → quantitative methods, otherwise qualitative) and by objective (size of an existing market; demand after a new launch; precise demand over a time window). Quantitative: objective, accurate with rich data, catch trend and seasonality, but need large reliable datasets, explain “what” not “why”, miss disruptions. Qualitative: work with little data, capture motivations, flexible, explain “why”, but subjective, less precise, costly and slow.</li>
</ul>
<h3>Customer value</h3>
<p>Value = perceived <b>benefits</b> against perceived <b>costs and risks</b>, not only price. If costs outweigh benefits the product feels too expensive. Marketing goal: deliver benefits customers really value in ways competitors don't, by uncovering the costs and risks of the buying process and removing them first.</p>
<ul><li><b>Explicit</b> costs and risks are monetary: every competitor sees them, so cutting them shrinks contribution margins and leads to <mark>price wars</mark>.</li>
<li><b>Hidden</b> costs are effort (time to buy, difficulty understanding the product and which information matters) and risks of a poor choice (“what if she doesn't like the gift?”, “what if I stop using it next year?”). Reducing them differentiates.</li></ul>
<h3>B2C demand</h3>
<p>The consumer is a person with many interests; buying is only one of them, usually of limited importance, shaped by social, cultural and psychological variables.</p>
<ol><li><b>Problem recognition</b> (run out, broken, marketing stimulus, internal motivation)</li><li><b>Information search</b>: internal (experience) and external (personal, public, marketing sources)</li><li><b>Evaluation of alternatives</b>: decision criteria (price, brand quality, performance, exclusivity)</li><li><b>Purchase decision</b>: from whom and when (store atmosphere, terms, past experience, sales pressure, economic situation)</li><li><b>Post-purchase behaviour</b>: expectations vs experience</li></ol>
<p><b>Involvement</b> depends on importance (cost), personal consequences and effect on social and self-image; the lower it is, the more steps are skipped.</p>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd">FCB grid (1987)</div><div class="hd">Thinking</div><div class="hd">Feeling</div>
<div class="hd">High involvement</div><div><b>Informative</b>insurance, cars, appliances, cameras → reviews, detailed arguments, guarantees</div><div><b>Affective</b>sports car, luxury watch, perfume, glasses → emotional storytelling, aspirational imagery</div>
<div class="hd">Low involvement</div><div><b>Habitual</b>detergent, bleach, motor oil, painkillers → promotions, price, distribution and reminders</div><div><b>Self-satisfaction</b>snacks, soft drinks, beer, biscuits → brand personality, packaging, sensory cues</div></div>
<p><b>Maslow</b>: physiological → safety → belonging → esteem → self-actualisation.</p>
<h3>B2B demand</h3>
<div class="tablewrap"><table><tr><th></th><th>B2B</th><th>B2C</th></tr>
<tr><td>Structure</td><td>Few customers, stable, interdependent</td><td>Many customers, complex, turbulent</td></tr>
<tr><td>Nature</td><td><b>Derived</b> demand (from end-product demand)</td><td>Direct demand</td></tr>
<tr><td>Volume</td><td>High volumes, contracts</td><td>Small individual purchases</td></tr>
<tr><td>Elasticity</td><td>Less price-sensitive if essential</td><td>More price-sensitive</td></tr>
<tr><td>Drivers</td><td>Efficiency, production needs, ROI</td><td>Emotions, trends, brand</td></tr>
<tr><td>Predictability</td><td>Stable, forecastable</td><td>Fluctuates with trends and seasons</td></tr>
<tr><td>Frequency</td><td>Infrequent but recurring</td><td>Frequent</td></tr>
<tr><td>Customisation</td><td>Tailored solutions</td><td>Standardised for mass markets</td></tr></table></div>
<p>The <b>purchasing centre</b>: initiator, influencer, decider, buyer, user. (3D printer: production manager identifies the need; lead engineer specifies; COO/CEO decides; procurement buys; line workers use.) Its needs are technical, economic-financial, assistance and information. The marketer identifies each role, keeps them distinct, sees which variables each role controls and addresses each on the objectives it maximises.</p>
<p>Segmentation starts here: not all customers are equal; segments show <b>internal similarity</b> and <b>external diversity</b>.</p>
<div class="exam"><b>Exam angle.</b> In an “Assess” question on a market, qualify it (five levels), measure it (share, elasticity), separate endogenous from exogenous drivers and say where customer value can beat competitors (hidden costs). Link to deck 2: demand analysis is the customer lens of external analysis.</div>`,

mk2:`
<p class="thesis">Not all customers are equal, so the “best” product does not exist. <mark>Segmentation</mark> divides the market into internally homogeneous groups so that each can get its own marketing plan; it is the first step of STP.</p>
<h3>STP and the definition</h3>
<p><b>Segmentation</b> (identify variables, slice the market, profile segments) → <b>Targeting</b> → <b>Positioning</b>. Segmentation: the process through which the company divides the market into sub-groups with different demand profiles but internally homogeneous, for which management develops specific marketing plans.</p>
<ul><li>Why: markets are too broad and too diverse (preferences, resources, locations, attitudes, buying habits). Prego tested 45 tomato-sauce variants: there is no single best sauce, only best sauces for groups.</li>
<li>It is a trade-off between <b>undifferentiated</b> (mass) marketing and <b>one-to-one</b> marketing.</li></ul>
<div class="tablewrap"><table><tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Firm: lower complexity, priorities for marketing resources (current value × future value of segments), stronger competitive advantage → sustainable profit growth.<br>Customer: convenience, tailored products, personalised experience.</td><td>Different products per segment (R&amp;D, engineering), higher production and distribution costs (stock), fragmented advertising, more market research. <b>Modularisation</b> limits the cost.</td></tr></table></div>
<p><b>A good segment</b> is: <mark>measurable</mark> (size, buying power), <mark>accessible</mark> by marketing actions, <mark>homogeneous</mark> inside and different from others, <mark>important</mark> enough to justify a dedicated action, <mark>durable</mark> over time.</p>
<h3>Approaches</h3>
<ul><li><b>By product</b> (GM split the US car market into six segments in 1921): simple, immediate, clear; but ignores customers, hides competition among products, simplistic. It fitted markets where production was the problem. Mature, competitive markets segment <b>by customer</b>.</li>
<li>By customer, in two steps: identify the criteria, then profile the segments, along three dimensions: <b>characteristics</b>, <b>behaviour</b>, <b>needs</b> (for consumers or industrial customers).</li></ul>
<div class="mx" style="grid-template-columns:auto 1fr 1fr">
<div class="hd"></div><div class="hd">Easy to observe</div><div class="hd">Hard to observe</div>
<div class="hd">Low differentiation potential</div><div><b>Socio-demographic</b>which group consumers belong to</div><div></div>
<div class="hd">High differentiation potential</div><div><b>Behavioural</b>what customers do</div><div><b>Psychographic · Needs</b>how they think · what they want</div></div>
<div class="tablewrap"><table><tr><th>B2C approach</th><th>Variables</th><th>Pros / cons</th></tr>
<tr><td>Socio-demographic, geographic</td><td>Age, gender, family, income, occupation, class, religion; country, region, urban/suburban/rural</td><td>Easy, measurable, stable / inaccurate, too broad alone</td></tr>
<tr><td>Psychographic</td><td>Personality (Big 5), lifestyle (VALS, PRIZM)</td><td>Deeper drivers / hard to measure, unstable</td></tr>
<tr><td>Behaviour</td><td>Usage (user/non-user, intensity, type, time); buying process (frequency, store, duration, roles, loyalty)</td><td>Real actions, predictive / costly data, privacy concerns</td></tr>
<tr><td>Needs</td><td>Benefits sought: price, quality, safety, variety, convenience, status…</td><td>Rich insight / hard to identify, needs continuous research</td></tr></table></div>
<p class="note">Examples: Wolfram Mathematica's cheaper student version (socio-demographic, builds future customers); McDonald's regional menus (geographic); PRIZM's 66 lifestyle groups (psychographic); daily vs occasional vs infrequent shavers (usage intensity); pharma marketing to patients vs doctors (roles); Hill-Rom split hospitals into five segments from its data, then into key customers (solutions, investment view) and prime customers (cost-conscious, need speed).</p>
<p>Use behaviour data to grow usage among users, convert non-users, spot loyal heavy users, and prioritise channels when customers are loyal to the store. Use needs to design the product and the communication's motivations.</p>
<p><b>B2B variables</b>: company size, sector, activity, management; geography; usage and volumes, application; buying process (lot size, complexity, roles, distributor loyalty); benefits sought (punctual and fast delivery, supply continuity, technical support, certification, price, customisation).</p>
<p><b>Market vs customer segmentation</b>: market segmentation uses external research data on the whole market and produces profiles/personas to decide <i>where to compete</i>; customer segmentation uses internal CRM data on your own customers (recency, frequency, monetary value — <b>RFM</b>; history; churn risk; customer lifetime value) to drive retention, upselling and cross-selling.</p>
<h3>Methods</h3>
<ul><li><b>Mathematical</b>: statistical techniques on a representative sample, e.g. <b>k-means cluster analysis</b> (choose k, pick k random centroids, assign each point to the nearest, recompute centroids; stop when nothing changes or at max iterations).</li>
<li><b>Heuristic</b> (based on the marketer's experience):
<ul><li><b>Successive elimination</b> (Porter, 1987): checklist of variables → compare them in pairs in a matrix → drop irrelevant crossings and contradictions → combine variables step by step → place products by use. Tesla: income × urbanisation × ownership → urban high-income individuals (Model 3/S), suburban high-income families (Model Y/X/S), urban corporate fleets (Model 3).</li>
<li><b>Two-step</b> (Wind &amp; Cardozo, 1974): macro-segmentation on company-level variables (industry, size, geography), then micro-segmentation on decision makers' needs (security-, innovation-, cost-driven buyers).</li>
<li><b>Nested approach</b> (Bonoma &amp; Shapiro, 1982): five nests from the most observable to the most individual — demographics, operating variables, purchasing approach, situational factors, personal characteristics of buyers.</li></ul></li></ul>
<h3>Segment analysis</h3>
<ul><li><b>Validation</b>: statistical (stable clusters, truly distinct, predictive of purchase), managerial (recognisable by sales teams, a different mix is feasible), strategic (fit with positioning and goals, worth it vs competitors).</li>
<li><b>Description</b>: a concise profile of characteristics, needs, behaviour, size. <b>Product–market mix</b>: matches a product line with a defined segment (target, behaviour, needs, trends).</li></ul>
<p class="note">Smartwatch case: 10,540 respondents aged 18–50 in Northern Italy; Likert scales on utility, privacy, social impact, brand, community impact, product; k-means. “Fashion lovers” see wearables as an accessory: design and personalisation matter more than functions; young, low income → value pricing, extra straps and faces, limited editions, social contests and co-creation.</p>
<h3>Beyond segments</h3>
<ul><li><b>Personas</b>: semi-fictional incarnations of a segment built from data, interviews and some assumptions, with goals, expectations, motivations, habits, emotions, likes and dislikes.</li>
<li><b>Digital twins</b>: dynamic, data-driven virtual replicas that simulate how a real consumer would react to campaigns, products or ads before launch (Fuller et al., 2020).</li></ul>
<div class="exam"><b>Exam angle.</b> “Apply”: choose the variables (and say why), pick a method, check the five criteria of a good segment, validate, and profile the segments you keep. Segmentation feeds deck 3's positioning and deck 6's customer segments.</div>`,

mk3:`
<p class="note"><b>Built from your handwritten notes</b> (M3.pdf, 19 Oct) and the course textbook (Kotler). The lecture 3 slides are not on your Drive: when you have them, ask Claude to replace this sheet with the official content.</p>
<p class="thesis">After segmentation you choose <mark>which segments to serve</mark> (targeting) and <mark>how you want them to perceive the offer</mark> (positioning).</p>
<h3>Targeting: five coverage patterns</h3>
<div class="tablewrap"><table><tr><th>Pattern</th><th>What it means</th></tr>
<tr><td>Single-segment concentration</td><td>One product line for one specific target (luxury players such as Rolex or Ferrari)</td></tr>
<tr><td>Selective specialisation</td><td>Different solutions for different, unrelated targets</td></tr>
<tr><td>Product specialisation</td><td>The same solution for different markets</td></tr>
<tr><td>Market specialisation</td><td>Different solutions for the same market (one customer group)</td></tr>
<tr><td>Full market coverage</td><td>Broad solutions for every target (L'Oréal)</td></tr></table></div>
<p>Choose by segment attractiveness (size, growth, competition — deck 2) and fit with the firm's resources and goals (deck 4).</p>
<h3>Positioning</h3>
<p>The step in which you establish how the market should perceive a specific offer relative to competitors' offers, in the minds of the chosen segment(s). Same idea as deck 3 (Kotler; perceptual maps; value curves).</p>
<p><b>Schema theory</b>: a schema is a mental framework, a set of ideas and expectations about something (a restaurant: menu, waiters, tables, you pay at the end). A new product that fits an existing schema is easy to understand and accept; one that doesn't can confuse people or meet resistance. Position new offers with the schema in mind.</p>
<p><b>Roadmap</b> (from your notes): understand how target customers perceive the category → identify what they value → analyse how competitors are positioned → formulate an offer consistent with the chosen segment and distinct from rivals.</p>
<h3>Traditional positioning approach</h3>
<ol><li><b>Identify the relevant attributes</b>, functional and emotional.</li><li><b>Rate the attributes</b> for your brand and competitors (Likert-scale surveys).</li><li><b>Reduce the attributes</b> to a few dimensions and analyse the results → perceptual map and strategic implications.</li></ol>
<p>For emotional attributes: Aaker's brand personality dimensions — sincerity, excitement, competence, sophistication, ruggedness.</p>
<div class="exam"><b>Exam angle.</b> “Envision”: justify the target choice and the coverage pattern, then draw the perceptual map and state the positioning in one sentence (target, key benefit, difference from rivals).</div>`
};

/* ---------- Flashcards ---------- */
const CARDS=[];
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
function deck(m,list){list.forEach(([q,a])=>CARDS.push({m,q,a,id:m+'-'+hash(q)}))}

deck('intro',[
[`What is the unit of analysis of the course?`,`The <b>profit-oriented organisation</b> responsible for economic and financial results. (Small businesses, public bodies and non-profits are companies too, but not the focus.)`],
[`Three indicators used to measure the size of a company`,`Market capitalisation · revenues · number of employees. Rankings change a lot depending on the indicator.`],
[`Name the four legal forms of company`,`Unlimited company · private company limited by guarantee · private company limited by shares · public limited company (≈ US Corp., German AG).`],
[`Private company limited by guarantee: what is special about it?`,`It has <b>no share capital</b>; members guarantee a fixed amount if the company is liquidated. Often used by charities.`],
[`Private company limited by shares vs public limited company`,`Both give limited liability. Private: shares cannot be offered to the public and are usually offered to fellow shareholders first. Public: can be listed on a stock exchange and raise money by selling stock or bonds.`],
[`What two objectives do shareholders pursue?`,`Earning money (share price appreciation when they sell, plus dividends) and having <b>power and control</b> over the company.`],
[`Pre-money, post-money, investor stake, retention: the four formulas`,`Post-money = pre-money + new capital<br>Investor stake = investment ÷ post-money<br>Existing holders keep pre ÷ post of their stake.`],
[`Series A: €5m at €10m pre-money. What does a founder with 40% own afterwards?`,`Post = €15m. Investor = 5/15 = 33.3%. Founder = 40% × 10/15 = <b>26.67%</b> (her €4m of value ÷ €15m).`],
[`Why is dilution not necessarily negative?`,`Founders own a smaller percentage of a potentially much more valuable company.`],
[`Primary vs secondary vs mixed IPO`,`Primary: new shares issued, cash goes to the company (capital increase). Secondary: existing shareholders sell, cash goes to the sellers. Mixed: both.`],
[`SpaceX IPO (June 2026): key facts`,`$135 per share; ~555.6m Class A shares; 100% primary (capital increase); Nasdaq ticker SPCX; ≈$75bn raised vs $25.6bn for Saudi Aramco.`],
[`Friendly vs hostile takeover: give the course examples`,`Friendly: target's board agrees (Apollo–EasyJet, £5.7bn cash at £7.15/share, Aug 2026). Hostile/unsolicited: bid over the board's head (EasyJet rejected Wizz Air's approach in 2021). Musk–Twitter: 9.1% stake, $44bn offer accepted, attempted walk-away, lawsuit, closed Oct 2022, delisted.`],
[`Write the shareholder value formula`,`SV = Σ NCF<sub>t</sub> / (1 + r<sub>e</sub>)<sup>t</sup><br>NCF = dividends + share price at sale − capital injected; r<sub>e</sub> = cost of equity.`],
[`Link shareholder value and enterprise value`,`SV = EV − net debt = EV − debt + cash.`],
[`Why is stock market value only a proxy of shareholder value?`,`Markets are affected by bubbles, fads and speculation.`],
[`What does the stakeholder perspective add to shareholder value?`,`Firms should be socially responsible and serve the broader stakeholder interest. Stakeholders can have conflicting objectives, especially in listed companies with complex ecosystems.`],
[`How do shareholder and stakeholder value reconcile in the long run?`,`Stakeholders are vulnerable when management fails to create SV, and without stakeholder value there is no SV in the long term → focus on <b>maximising long-term cash flows</b>.`],
[`Why has stakeholder impact analysis become critical?`,`Erosion of trust after accounting scandals (Enron, Arthur Andersen, WorldCom, Tyco, Parmalat), the global financial crisis and black swans (9/11, Fukushima, fall of the Berlin Wall, pandemic).`],
[`The four levels of the CSR pyramid`,`Economic (be profitable) → legal (obey the law) → ethical (do what is right) → philanthropic (be a good corporate citizen). Carroll, shown via Rothaermel.`],
[`Define corporate governance`,`The set of systems, principles and processes by which a company is governed: how it is directed and controlled to fulfil its goals, add value and benefit all stakeholders in the long term.`],
[`Traditional (Italian) governance model: bodies and roles`,`Shareholders' meeting (hires/fires board, approves financial statements, dividends; extraordinary: bonds, capital increase, statute change) · Board of directors · Board of supervisors (independent, checks legal/statutory compliance) · Independent auditors (check the accounts).`],
[`Two-tier vs one-tier governance`,`Two-tier (Germany, Netherlands): supervisory board (shareholder + stakeholder reps, non-execs) hires/fires the management board and approves the accounts. One-tier (US, UK): a single board of directors where non-executives outnumber executives and some act as supervisors.`],
[`What governance weaknesses did the VW diesel scandal expose?`,`20-member supervisory board, half worker reps; 17/20 German or Austrian; only one truly independent member; controlled by Porsche/Piëch families, Lower Saxony, Qatar; outside investors 12% of votes; little relevant expertise. Shares already traded at a governance discount.`],
[`ESG: what does each letter cover?`,`E: climate, emissions, biodiversity, pollution, energy, water. S: diversity, equity &amp; inclusion, customer satisfaction, employee engagement. G: board composition, cybersecurity, management structure, executive pay, anti-bribery.`],
[`Three scope choices a company makes (with the Eni example)`,`One output vs a portfolio; doing activities in-house vs outsourcing; one market vs many countries. Eni went from a 1980s conglomerate to E&amp;P plus energy-transition businesses (Plenitude, Enilive).`]
]);

deck('strat',[
[`Where does the word “strategy” come from?`,`Greek <i>strategos</i> = generalship: the art of war, moving troops into favourable positions.`],
[`Match the definition: Ohmae, Drucker, Porter, Henderson, Mintzberg`,`Ohmae: a sustainable edge over competitors. Drucker: a firm's theory about how to gain CA. Porter: being different, a unique mix of value. Henderson: a deliberate search for a plan of action to develop CA. Mintzberg: a pattern in a stream of decisions.`],
[`Give the course's operational definition of strategy`,`A set of goal-directed actions a firm takes to gain and sustain superior performance relative to competitors; an integrated plan that sets scope and direction, integrates coherent strategic decisions and aims at long-term superior performance (competitive advantage).`],
[`Three features of a strategic decision`,`Long-term effects · non-reversible · requires large amounts of resources.`],
[`Two reasons why strategy is important`,`Decision support (narrows alternatives, integrates individuals' knowledge) and coordinating device (aligns parts of the organisation, easy-to-communicate messages).`],
[`Corporate vs business strategy`,`Corporate: which industries/markets to be in (industry attractiveness). Business: how to compete within an industry (competitive advantage). Both aim at a return above the cost of capital.`],
[`Define a Strategic Business Unit`,`A defined group of products for a specific group of customers, with its own competitors, manageable separately and able to stand alone, with distinct objectives, run as a profit centre by a manager responsible for its strategy and performance.`],
[`What are functional strategies?`,`The elaboration and implementation of the business strategy through the individual functions.`],
[`List the phases of the strategic decisions process`,`<b>Diagnosis</b>: external analysis (KSFs, O/T), internal analysis (strategic resources, S/W), competitive advantage &amp; grand strategy, SWOT. <b>Formulation</b>: generation and selection of alternatives, repositioning. <b>Implementation</b>: actions, control.`],
[`Strategy as a link: between what and what?`,`Internal environment (goals &amp; values, resources &amp; capabilities, structure &amp; systems) and external environment (economic/social context, business areas, competitors, customers, suppliers).`],
[`Grant's four common elements of successful strategy`,`Simple, consistent, long-term goals · profound understanding of the competitive environment · objective appraisal of resources · effective implementation.`],
[`Three approaches to strategy`,`Top-down (intended/planned) · bottom-up (emergent) · in reality a combination of planned and emergent strategy.`],
[`Vision vs mission`,`Vision: the future “dream”, where we are going, what the organisation wants to accomplish. Mission: present business scope, who we are and what we do, the means to reach the vision.`],
[`Define purpose and how it differs from mission and vision`,`The long-term normative aspiration that says <b>why</b> the organisation exists and pushes it to act meaningfully for stakeholders. Outward-looking; must be authentic and shared. Mission = what we do; vision = what we want to become; purpose = why we exist.`],
[`Disney: mission, vision, purpose`,`Mission: use its brand portfolio to create the most creative, innovative and profitable entertainment experiences. Vision: be one of the leading producers and providers of entertainment and information. Purpose: promote and spread happiness.`],
[`Airbus vision and mission`,`Vision: to be the world's leading aerospace company. Mission: manufacturing the world's largest aircraft with passengers at heart and airlines in mind.`],
[`Give three purpose statements from the slides`,`Walmart: saving people money so they can live better. Tesla: accelerate the world's transition to sustainable energy. Unilever: making sustainable living commonplace. (Also Nike, LEGO, Disney, Ford, Kellogg…)`],
[`Organisational culture, values, artifacts, socialisation`,`Culture: collectively shared values and norms. Values: what is important, ethical standards, appropriate behaviour. Artifacts: space, dress, vocabulary, stories, celebrations. Socialisation: how employees learn the culture.`],
[`Why can culture become a liability?`,`It comes from founder imprinting and persists; it can cause groupthink and <b>core rigidity</b> (strongest asset → strongest liability). Changing it usually needs new leaders.`],
[`What should a company's goal be, according to the course?`,`Maximise long-term cash flows, which creates value for both shareholders and stakeholders.`],
[`Lecture 1.1.02: the full definition of a strategic decision`,`Long-term, significant, multi-dimensional and non-reversible effects on the organisation's final goal; usually requires large resources; usually requires top-management involvement. (Slides: long-term, non-reversible, large resources.)`],
[`How many phases does the strategy process have?`,`Slides: three — diagnosis, strategy formulation, actions implementation. Lecture 1.3.03: five macro-phases — orientation, analysis/diagnosis, decision-making, implementation, control. Orientation is added in front; implementation and control are split.`],
[`Vision and mission in the business-strategy reading (lecture 1.3.01)`,`Vision = <b>industry foresight</b>: how the business area will evolve; industry-specific, can be shared with competitors. Mission = <b>strategic intent</b>: the role the firm wants to play on that path; firm-specific. Microsoft: computers in every home → leader in personal computers.`],
[`SMART objectives`,`Specific · Measurable · Appropriate (aligned with vision and mission) · Realistic (challenging but attainable) · Timely. They bring the mission down to earth.`],
[`The Abell cube: what does it define, on which axes?`,`The boundaries of the business area an SBU covers: customer groups (who) × customer functions (which needs) × alternative technologies (how). It defines the arena, not the firm.`]
]);

deck('ext',[
[`Five lenses of external analysis and their tools`,`Big picture: STEEP · industry: five forces · competitors: competitor analysis · supply chain: profit pool mapping · customers: demand analysis, segmentation, buyer analysis.`],
[`STEEP: the five groups with two variables each`,`Social (demographics, lifestyles) · Technological (breakthroughs, connectedness) · Economic (growth, interest/exchange rates) · Ecological (environmental laws, energy) · Political (tax, trade rules/tariffs).`],
[`How do you run a STEEP analysis in practice?`,`List the factors; give each a probability (%) and an impact from −5 to +5 over 3–5 years; add a response; plot probability × impact. Negative = threats, positive = opportunities.`],
[`Urbanisation: the numbers on the slide`,`1.5m people move to cities every week; cities generate 85% of world GDP; China lifted 500m people out of poverty in under 30 years through its cities.`],
[`Demographic megatrends`,`+60–70m people a year, over 8bn in 2024; 97% of growth in emerging countries; in developed economies people live longer, over-65s the fastest-growing group; rising inequality; ageing raises healthcare spending.`],
[`Climate and resource scarcity numbers (by 2030)`,`Food demand +35%, water +40%, energy +50%. In Africa agricultural productivity could fall by a third over 60 years.`],
[`Define industry (business area) attractiveness`,`The average profitability and growth of the companies operating in the business area, current and future.`],
[`Three assumptions of Porter's five forces model`,`Competition is driven by industry structure; attractiveness is inversely proportional to the level of competition; competition goes beyond established players (<b>extended rivalry</b>).`],
[`Structural determinants of rivalry`,`Excess capacity · fixed-cost weight · product differentiation · industry growth · concentration · exit barriers · switching costs.`],
[`Exit barriers: list them and their effect`,`Specialised assets; fixed exit costs (labour agreements); strategic interrelationships; emotional barriers; government/social restrictions. Higher exit barriers → <b>less</b> profitable industry (firms stay in without profits).`],
[`List the entry barriers in the course`,`Legislation/government; cost advantages independent of size (proprietary technology, access to raw materials, location, learning curve, subsidies); access to distribution; switching costs; capital requirements; economies of scale; brand identity; incumbents' expected reaction.`],
[`Effect of entry barriers on profitability`,`Higher entry barriers → <b>more</b> profitable for incumbents, because the threat of new competitors is limited. Barriers exist even in the digital era.`],
[`Ryanair's 1986 entry on Dublin–London: what happened and what does it teach?`,`Ryanair offered €140 vs €300; Aer Lingus and BA cut to €130 before it even launched, then kept cutting (€100 by 1989). Ryanair grew but lost money. Incumbents' credible retaliation (price war) is an entry barrier meant to deter others too.`],
[`Define substitutes and give four examples`,`Products from other industries that perform the same function. Short-haul flights vs high-speed trains; airlines vs web conferencing; tablets vs laptops; aluminium vs steel.`],
[`Abell's model: dimensions and the two forms of competition`,`Customers × customer needs × products. Direct competition: same customers, needs and products (existing competitors). Indirect: same customers and needs, different products (substitutes).`],
[`What determines the threat of substitutes?`,`Switching costs; substitute's price vs ours; substitute's quality/performance vs ours. Substitutes set a ceiling on the prices the industry can charge.`],
[`Substitutes matrix: fill the four cells`,`Price favourable + better performance → <b>big threat</b>. Favourable price + worse performance → monitor performance improvement. Unfavourable price + better performance → monitor price reduction. Unfavourable + worse → monitor both.`],
[`Buyer power in B2B: three groups of determinants`,`Relative concentration (buyers more concentrated than suppliers); product features (low switching costs, low differentiation); buyer characteristics (clear information, ability to integrate backward).`],
[`Buyer power in B2C increases when…`,`Product information is easily available, switching costs are low and differentiation is low. Analyse both direct buyers and ultimate customers.`],
[`Supplier power increases when…`,`Suppliers are more concentrated than buyers; switching costs are high; inputs are differentiated; customers lack information and cannot integrate backward. (Dual of buyer power.)`],
[`The sixth force: complements`,`A complement adds value to the industry's product and increases its demand. Complementors: game developers for consoles, app developers for smartphones, charging-station builders for EVs.`],
[`Installed base and network effects`,`Installed base = number of users of a technology. Network effects with complements: more users attract more complements, which attract more users — a self-reinforcing cycle.`],
[`Four events that change industry profitability over time`,`Maturity (growth slows, rivalry rises); an acquisition bringing in a very different player; technological innovation creating room for entrants or substitutes; fewer suppliers reducing your bargaining power.`],
[`Competitor analysis: three purposes and three sections`,`Purposes: forecast rivals' strategies, predict their reactions, influence their behaviour. Sections: how they compete now, how they might change, how they perceive the industry.`],
[`Sources of competitive intelligence`,`Annual reports and company profiles; brochures, fairs, exhibitions; press releases and media; suppliers; customers; the business community.`],
[`Define a strategic group and give four insights`,`Firms following the same or a similar strategy along the key strategic dimensions. Rivalry is strongest within a group; the environment and the five forces affect groups differently; some groups are more profitable.`],
[`Profit pool mapping: what is it and what three questions does it answer?`,`The vertical structure of profitability along the supply chain. How are profits distributed? Where is profitability growing? Can we expand into those stages?`],
[`Airline segmentation example: the three segments`,`Regular travellers (personal reasons, price sensitive, loyalty points); business travellers (company decides, business class, loyal to few airlines); budget-conscious (infrequent, see little difference, very price sensitive).`],
[`How do you derive key success factors?`,`KSF = what customers want (demand analysis: who are they, what do they want) + how the firm survives competition (what drives competition, its dimensions and intensity).`],
[`KSFs for airlines, steel and fashion`,`Airline: lean efficient processes and low costs (economy), on-board service and loyalty (business). Steel: cheap raw materials, low-cost location, large scale, customisation. Fashion: speed of response to trends, fast delivery, low-cost manufacturing.`],
[`Three outputs of external analysis`,`Key success factors · opportunities · threats.`],
[`Degree of operating leverage: formula and meaning`,`DOL = (ΔEBIT/EBIT) ÷ (ΔREV/REV) = 1 / (1 − FC/(m·Q)). High fixed costs → high DOL → pressure to fill capacity → fiercer rivalry.`],
[`Threats and opportunities for airlines (slide)`,`Opportunities: market growth (tourism), expansion of Western markets, more frequency on profitable routes. Threats: security regulation, aviation in the emissions trading system, oil price volatility.`]
]);

deck('ca',[
[`Define competitive advantage`,`A firm has CA over rivals in the same market when it earns, or has the potential to earn, a <b>persistently higher rate of profit</b>.`],
[`External and internal sources of competitive advantage`,`External change: customer demand, prices, technology. Internal: resource heterogeneity (change hits firms differently); some firms are more creative/innovative; some are faster and more effective at exploiting change.`],
[`Zara: what makes it an example of exploiting external change?`,`Designs from store sales (pull model); time to market as short as 4 weeks; attractive stores and merchandising; plans on fabrics and semi-finished goods, not finished products → very high rotation at reduced risk.`],
[`Two types of competitive advantage`,`Cost advantage: same or similar products at lower cost. Differentiation advantage: products/services with unique features customers value.`],
[`List the cost drivers`,`Capacity utilisation · economies of scale · economies of learning · production techniques · product design · preferential access to inputs (location).`],
[`Economies of scale: sources and limits`,`Technical input-output relations; indivisibilities; specialised equipment. Unit cost falls to the minimum efficient scale; beyond it, diseconomies (coordination and management costs). Mid-size firms can still be viable.`],
[`How can scale economies support differentiation?`,`Bigger R&amp;D projects and unique know-how; wider advertising campaigns; a more pervasive sales network; wider service and technical assistance.`],
[`Learning curve: definition`,`Costs decline about 20–30% in real terms each time cumulative production doubles. The decline is not automatic: it must be managed.`],
[`Economies of scale vs economies of learning`,`Scale: captured at a point in time as output rises; has diseconomies. Learning: accumulates over time with cumulative output; flattens out but has no diseconomies. Some industries have one without the other.`],
[`Economic value of a cost advantage (two levers)`,`Costs fall, price unchanged → margin up: ΔCFFO = Δm × Q. Price and cost fall together → volume up: ΔCFFO = m × ΔQ.`],
[`Economic value of a differentiation advantage (two levers)`,`Price up → margin up: ΔCFFO = Δm × Q. Price unchanged → volume up: ΔCFFO = m × ΔQ.`],
[`Differentiation on the demand side: tangible vs intangible`,`Tangible: physical features (size, design, material, technology), performance and associated service (reliability, durability, safety, delivery, after-sale). Intangible: social, emotional, psychological, aesthetic (status, exclusivity, image, experience).`],
[`What does differentiation require on the demand side?`,`Understand why customers buy; identify the attributes that can create value; combine segment preferences with product attributes. Customers compare our value proposition with competitors'.`],
[`Drivers of uniqueness (supply side)`,`Product features and performance; service procedures; marketing intensity (brand); embodied technology; quality of inputs; availability of complements (ecosystem); employee skills; location.`],
[`Besides uniqueness, what else does differentiation need?`,`Product integrity (consistent characteristics); communication; reputation built through quality signals, ad spending, premium prices; brand. And it is costly.`],
[`Porter's grand strategies: the 2×2`,`Scope (broad/narrow) × position (cost/differentiation): cost leadership, differentiation, focused cost leadership, focused differentiation. Plus integration (cost + differentiation).`],
[`Cost leadership: what does it require?`,`Being THE lowest-cost firm (second or third can be undercut); not disregarding the minimum quality; cost minimisation in all activities with tight control.`],
[`Risks of cost leadership`,`Technological change that voids past investment or learning; low-cost imitation by followers; losing sight of the minimum quality because of focus on cost.`],
[`Walmart case: where does its cost advantage come from?`,`Procurement redesign: suppliers get shelf space, checkout data flows to their systems, they replenish shelves with their own trucks; framework agreements, no purchase orders or billing → no inventory, ordering or billing costs for Walmart.`],
[`Aldi case: four elements of its format`,`Few products per category (rotation, power over suppliers); mostly private label; small, efficient, simple stores; limited service (bring your own bags). Prices ~40% lower.`],
[`Risks of differentiation`,`Premium over cost-based rivals becomes too large; customers become sophisticated and need the feature less; imitation narrows perceived differences; counterfeits.`],
[`Six bases of differentiation with examples`,`Prestige/brand (Apple, BMW); quality (Michelin); technology (North Face); innovation (Tesla, BYD); features (Ducati); dealer network (Lexus, Caterpillar).`],
[`Illy, Tesco, Commerce Bank: one line each`,`Illy: differentiated a commodity with 9 pure Arabicas, quality and culture brand. Tesco: Clubcard (1993), newsletters in 4 million versions from micro-segmentation. Commerce Bank: stayed small, premium personal service (long hours, 10-minute rule, retailtainment) for a premium price.`],
[`Focus strategy and its risks`,`Serve a narrow target (segment, region, niche) more effectively or efficiently than broad rivals, via cost, differentiation or both. Risks: cost gap with broad players widens; target's needs converge with the market; rivals out-focus the focuser.`],
[`Integration strategy: definition, drivers, examples`,`Combines differentiation and cost leadership. Drivers: quality (more value, lower after-sale cost), economies of scope, mass customisation. Examples: IKEA, Toyota (JIT/TPS + fast development), Target.`],
[`Nordstrom, Walmart, Target: who plays which strategy?`,`Nordstrom: differentiator (luxury experience). Walmart: cost leader (no frills). Target: integrator — near cost parity with Walmart thanks to logistics, better selection, merchandising and layout.`],
[`Two conventional myths about winning`,`“You need the best product” and “innovation means better products and technology”. “Better” depends on customers' purchase criteria; innovation is about new forms of customer value.`],
[`BMW vs Volvo: what does the example show?`,`Neither claims the best car: BMW stands for joy of driving, Volvo for safety. They win different customers by stressing different purchase criteria.`],
[`Define positioning`,`The firm's decision about how it wants to be perceived: designing the offer and image to occupy a precise place in the target customers' minds (Kotler). It combines product attributes and customer preferences.`],
[`Perceptual map: two steps. Value curve: what is it?`,`(1) Identify the attributes customers consider important for purchase; (2) map your offer and competitors' on them. Value curve: relative level (high–low) of the offer on each key variable vs competitors.`],
[`Five critical success factors for positioning`,`Address a specific target · focus on the key variables for that segment · offer an exclusive (or at least superior) advantage in customers' perception · durable · consistent over time.`]
]);

deck('int',[
[`Define strategic resources / core competencies`,`The resources at the root of competitive advantage: unique strengths deeply embedded in the company, created by the interplay of resources (tangible and intangible), capabilities (skills to orchestrate them) and activities (processes).`],
[`Core competencies of Netflix, IKEA, Tesla`,`Netflix: AI to predict successful shows and personalise recommendations. IKEA: modern functional furnishing at low cost; retail experience. Tesla: battery packs/motors/powertrains, decentralised storage, vertical integration.`],
[`Twofold objective of internal analysis`,`Understand the resources, capabilities and activities behind the competitive advantage; identify strengths and weaknesses relative to competitors.`],
[`Porter's value chain: the five primary activities`,`Inbound logistics · operations · outbound logistics · marketing &amp; sales · service.`],
[`Porter's value chain: the four support activities`,`Firm infrastructure · human resource management · technology development · procurement.`],
[`Primary vs support activities`,`Primary: physical creation of the product, its sale and transfer to the buyer, after-sale assistance. Support: support primary activities and each other with purchased inputs, technology, people and company-wide functions.`],
[`Three types of resources`,`Tangible (physical and financial; on the balance sheet) · intangible (brand, reputation, culture, IP) · human (skills, know-how, experience, motivation).`],
[`Define organisational capabilities and give examples`,`The (intangible) ability to orchestrate resources and deploy them for a desired end: structure, routines, culture. 3M's innovation process, Walmart's logistics, UPS delivery.`],
[`VRIO: what does each letter ask?`,`Valuable (relevant to a customer need) · Rare (scarce, not available to rivals) · Inimitable (costly to imitate) · Organised to capture value (structure, processes, systems in place).`],
[`VRIO outcomes for each “no”`,`Not valuable → disadvantage. Valuable, not rare → parity. V+R, imitable → short-term advantage. V+R+I, not organised → mid-term advantage. All four → sustainable advantage.`],
[`Four isolating mechanisms`,`Unique physical resources and IP (patents, designs, trademarks, trade secrets, mines, wells) · path dependence · causal ambiguity · economic deterrence (market too small for two).`],
[`What is path dependence?`,`Resources that can't be bought instantly but must be built over time through continuous accumulation of competence; firms cannot compress that time at will.`],
[`What is causal ambiguity?`,`Competitors can't understand how the firm created its advantage, typically because it rests on organisational capabilities rather than single resources.`],
[`Value chain for cost advantage: three phases`,`(1) Identify activities with relevant costs (Pareto; fixed vs variable; internal vs external; how rivals run them); (2) identify each activity's cost drivers; (3) identify cost-reduction opportunities.`],
[`Car industry cost drivers: purchasing and assembly`,`Purchasing: number of components, order size, purchase value per supplier, supplier location. Assembly: plant scale, models per plant, automation, wage levels, plant location.`],
[`Value chain for differentiation: three phases`,`(1) Identify the key performance the customer wants; (2) identify the activities that affect it and how; (3) identify differentiation opportunities.`],
[`Metal containers example: how do you find differentiation?`,`Link your value chain to the customer's: distinctive can design (helps their marketing), tight tolerances (fewer breakdowns on their lines), fast flexible delivery (less inventory for them), skilled maintenance of their packaging lines.`],
[`How are strengths and weaknesses identified?`,`By benchmarking strategic resources against competitors: score each on strategic importance and relative strength (1–10, 5 = parity).`],
[`The four zones of the resource appraisal matrix`,`High importance + high strength = key strengths; high importance + low strength = key weaknesses; low importance + high strength = superfluous strengths; low/low = zone of irrelevance.`],
[`VW appraisal: classify engineering, product development, government relations, location`,`Engineering (7, 9): key strength. Product development (9, 4): key weakness. Government relations (4, 8): superfluous strength. Location (4, 4): zone of irrelevance.`],
[`EMI and Raytheon: four lessons`,`A good new product does not ensure success; strategic resources are often complementary activities/capabilities; so followers often beat pioneers; collaborations are the main way to access missing resources.`]
]);

deck('swot',[
[`SWOT: which quadrants come from which analysis?`,`Strengths and weaknesses from internal analysis; opportunities and threats from external analysis.`],
[`The four SWOT strategic questions`,`S–O: use strengths to seize opportunities. S–T: use strengths to reduce threats. W–O: overcome weaknesses that block opportunities. W–T: fix weaknesses that would make threats real.`],
[`How do you generate strategic alternatives from a SWOT?`,`Cross the quadrants (S–O, S–T, W–O, W–T): each answer to a strategic question becomes a candidate action.`],
[`Roadmapping: the two assessment criteria`,`Expected economic impact (profit generated or loss reduced) and expected implementation problems (actions needed, organisational change, activities involved).`],
[`Define repositioning and mispositioning`,`Repositioning: changing how the target audience perceives the products/services. Mispositioning: the brand fails to connect with its target audience.`],
[`Five reasons for repositioning`,`Stronger competition · faulty positioning (under-positioned or too narrow) · product evolution and customer trends · environmental changes (policy, economy, technology) · future plans (new opportunities).`],
[`Signs that repositioning is needed`,`Falling sales; shrinking core audience; industry shake-ups; product line inconsistent with the brand promise; outdated value proposition; no appeal to younger generations; brand confusion or negative associations.`],
[`Why is repositioning hard, and what helps?`,`The brand image in customers' minds is deep-seated. Keeping continuity with the past helps customers keep recognising the product.`],
[`Lego 2003 repositioning`,`Debt and falling sales → new CEO Knudstorp simplified go-to-market, sold loss-making theme parks, engaged and crowdsourced from the fan community, partnered with Ghostbusters, Minecraft, Back to the Future.`],
[`McDonald's and Domino's repositioning`,`McDonald's: from fast food to fresh, from unhealthy to healthier (salads, fruit). Domino's: changed the recipe and ran a transparent “new and better pizza” campaign; its core segment (students) now valued quality and taste over price.`],
[`US airlines on Porter's matrix`,`Cost leadership: Southwest. Differentiation: Delta, American, United. Focused cost leadership: Alaska, Allegiant, Spirit. Stuck in the middle: JetBlue.`],
[`JCPenney under Ron Johnson: what went wrong?`,`Moved from cost leadership to integration; removed clearance racks and coupons; rolled out in all 1,800 stores at once without testing (“We didn't test at Apple”). Sales −25% in 12 months; fired within 18 months → stuck in the middle.`],
[`What does “stuck in the middle” mean?`,`A firm that tries to combine cost and differentiation (or moves between them) without achieving either, so it has no clear advantage over cost leaders or differentiators.`]
]);

deck('bmc',[
[`Define a business model and its use`,`A comprehensive set of strategic decisions defining how a company creates value, transfers it to customers and captures it. Used to evaluate strategic alternatives: are they sound and consistent with the firm's structure?`],
[`The nine blocks of the Business Model Canvas`,`Customer segments · value proposition · channels · customer relationships · revenue streams · key resources · key activities · key partners · cost structure.`],
[`When do customers deserve a distinct segment?`,`When we offer them a distinct offer, reach them through different channels, keep a different relationship, or they have substantially different profitability.`],
[`Define the value proposition`,`The reason customers choose one company over another: a bundle of products/services that solves a problem or satisfies a need for a segment. Can be innovative or similar with added features.`],
[`Factors enabling value creation (name at least eight)`,`Originality, performance, customisation, design, brand, exclusivity/status, price, cost reduction, risk reduction, accessibility, handiness, ease of use, fast delivery, reliability.`],
[`Channels: types and five functions`,`Direct (sales force, web) or indirect (dealers, partners, wholesalers). Functions: create awareness, support evaluation, enable purchase, deliver the value proposition, after-sales support.`],
[`Rule of thumb on channel cost`,`Use cost-intensive channels for very profitable clients and cost-efficient channels for less profitable ones.`],
[`Six types of customer relationship`,`Personal assistance · dedicated personal assistance · self-service · automated services · online community · co-creation. High price → high-touch expectations.`],
[`Forms of revenue streams`,`Selling, lending, licensing, commissions, transaction fees, advertising fees.`],
[`Key resources, activities, partners: one line each`,`Resources: what the model is built on (people, assets, increasingly brand and expertise). Activities: the most important things to do, in-house or via partners. Partners: suppliers, alliances, JVs; what we do ourselves vs with others.`],
[`Cost structure in the canvas`,`A direct result of all the other blocks; ideally each cost is traceable to a block and computable per segment.`],
[`Two alternative readings of the canvas`,`Value network (KP, KA, KR) · value proposition &amp; customer interface (VP, CR, CH, CS) · economic model (costs, revenues). Or value creation (left) vs value capture (right).`],
[`Dell's business model: what was innovative?`,`Assembled to order in-house, outsourced components and services, sold only directly (no retailer margin), got paid immediately with very low stock → minimal working capital. Innovation was in the business model.`],
[`Bait &amp; hook: definition and examples`,`An attractive, cheap or free initial offer that drives continuing purchases of related items with built-in lock-in. Gillette (handle + blades); Nespresso (machines + capsules).`],
[`Nespresso: what did Gaillard change?`,`Created Le Club (customer community and database), lowered machine prices and raised capsule prices, turned an office machine into a luxury consumer brand, licensed machine production to other firms.`],
[`Consoles: Xbox/PlayStation vs Wii business models`,`Xbox/PS: hard-core gamers, high-performance console sold at a loss, revenues from royalties and in-house games. Wii: casual gamers/family, cheaper game development, profitable hardware plus royalties.`],
[`Google as a multi-sided model`,`Three interdependent segments (web surfers, advertisers, content owners) with distinct value propositions; one revenue stream (keyword auctions for targeted ads) subsidises free search and content.`],
[`Free vs freemium (examples)`,`Free: basic service free, paid by others (Metro free newspaper funded by advertisers). Freemium: free basic + paid premium (Flickr pro accounts; Skype: paid SkypeOut under 10% of usage, over 90% of users free).`],
[`Popular revenue models on the slides`,`Pay-per-use, subscription, renting, licence, brokerage (Alibaba), advertising, agency (Apple app sales), bundling (Office suite).`],
[`How do you develop a business-model innovation?`,`The “what if…” question: map the existing model, change one or more building blocks, identify the changes required in the other blocks.`]
]);

deck('corp',[
[`Three decisions of corporate strategy`,`Which stages of the value chain (vertical integration); which range of products/services (diversification); where to compete (geographic scope, internationalisation).`],
[`Backward vs forward vertical integration`,`Backward: moving upstream towards inputs/suppliers. Forward: moving downstream towards distribution and customers.`],
[`Advantages of vertical integration`,`Capture higher margins; reduce transaction costs; improve quality; secure critical supplies (backward) and channels (forward); learning; independence from suppliers; easier scheduling and planning.`],
[`Risks of vertical integration`,`Compounding risk; lower flexibility; low incentives to cut costs (captive market); lower efficiency than specialised suppliers.`],
[`Forms of vertical relations, from loose to tight`,`Spot purchases → informal relationships → long-term contracts → agency agreements / franchises → supplier-customer partnerships → joint ventures → vertical integration (rising commitment and formalisation).`],
[`What is taper integration?`,`Combining in-house integration with reliance on outside suppliers and/or outside distributors for the same stage.`],
[`De Beers: which integration move and why?`,`To fight erosion of its position and ride luxury growth it shifted from supply-driven mining to marketing-driven, integrating forward into jewellery distribution: “from mine to finger”, “A diamond is forever”.`],
[`Lenovo: how does vertical integration help it?`,`End-to-end model with in-house manufacturing gives control over product development and supply chain, efficiency and lower costs. Grew via IBM PCs (2005) and Motorola Mobility (2014).`],
[`Four traditional motives for diversification`,`Growth · risk reduction · escape from unattractive industries · use of surplus cash flow.`],
[`Why did firms move from diversification (1950–80) to refocusing?`,`Emphasis on shareholder value; turbulence favouring specialisation; recognition that sharing resources and capabilities is the real source of advantage.`],
[`Define economies of scope`,`When using a resource across multiple activities uses less of it than carrying out the activities independently.`],
[`Sources of advantage from diversification (with examples)`,`Economies of scope in tangible/intangible assets (P&amp;G, Honda), organisational capabilities (LVMH), contracting out and licensing (Disney); internal markets; financial resources; administrative activities.`],
[`Rumelt's diversification types with thresholds`,`Single business: &gt;95% of revenues from one business. Dominant: 70–95%. Related: &lt;70%, constrained (all share competencies) or linked (some share). Unrelated/conglomerate: &lt;70%, little or nothing shared.`],
[`Unrelated portfolio: advantages and disadvantages`,`Advantages: financial economies, restructuring, internal capital markets, risk reduction, shared HR and admin. Disadvantages: coordination costs, cultural heterogeneity, organisational complexity.`],
[`Related portfolio: advantages and disadvantages`,`Advantages: shared resources, economies of scale and scope, critical mass, financial economies, restructuring, internal capital markets. Disadvantages: coordination complexity, higher risk than unrelated, managerial complexity.`],
[`What two factors does portfolio analysis use?`,`A measure of market attractiveness and a measure of the business's competitive position in that market.`],
[`BCG matrix: axes and RMS formula`,`Market growth × relative market share. RMS = own market share ÷ share of the largest competitor (excluding the firm); cut-off at 1.`],
[`BCG quadrants and typical moves`,`Star (high growth, high RMS): invest. Cash cow (low growth, high RMS): harvest, fund others. Question mark (high growth, low RMS): invest selectively or divest. Dog (low/low): harvest or divest.`],
[`GE/McKinsey vs BCG`,`Developed by McKinsey for GE in 1971. 3×3 instead of 2×2; each axis built from many weighted variables rather than one measure (growth, RMS).`],
[`GE/McKinsey: market attractiveness factors`,`Market size, growth rate, profit margin potential, competitive intensity, cyclical/seasonal sales, position on the learning curve.`],
[`GE/McKinsey: business strength factors`,`Relative market share, price competitiveness, product/service quality perception, market knowledge and customer loyalty, sales effectiveness, geographic coverage.`],
[`GE/McKinsey: the three zones and cells 1, 4, 6, 9`,`Invest/grow (cells 1–3), selectivity/earnings (4–6), harvest/divest (7–9). 1: high/high premium invest. 4: strong business in unattractive market, protective selectivity, cash generator, don't over-invest. 6: weak business in attractive market, invest to improve or divest. 9: low/low, exit.`],
[`GE: what went wrong and how did it end?`,`Ill-judged acquisitions, overoptimism, accounting practices (GE Capital assets traded to keep earnings rising), manager rotation. Split into GE Aerospace (legal successor), GE HealthCare, GE Vernova.`],
[`Nestlé's business mix (H1 2026)`,`Coffee 28%, food &amp; snacks 28%, petcare 21%, nutrition 19%, waters &amp; premium beverages 4%.`]
]);

deck('mk1',[
[`The four core concepts of marketing`,`Market · customer · exchange · value.`],
[`Define a market (Kotler) and an industry`,`Market: a system that facilitates the exchange of goods and services, bringing buyers and sellers into contact directly or through intermediaries. Industry: the sellers competing to serve a market.`],
[`Exchange vs transaction`,`Exchange: obtaining a desired product by offering something in return. Transaction: the agreement that concludes it. Offer → exchange → transaction.`],
[`AMA definition of marketing`,`The activity, set of institutions and processes for <b>creating, communicating, delivering and exchanging</b> offerings that have value for customers, clients, partners and society at large (AMA 2007, reaffirmed 2017).`],
[`The four orientations and their starting questions`,`Production: how can we produce efficiently? Product: how can we build the best product? Sales: how can we sell what we produce? Marketing: what does the market value and how can we serve it better?`],
[`Match the quotes: Henry Ford, Steve Jobs, Sergio Zyman`,`Ford: any colour as long as it's black (production). Jobs: people don't know what they want until you show them (product). Zyman, Coca-Cola: sell more stuff to more people, more often, for more money (sales).`],
[`What does the Google Glass case show?`,`The risk of the product-based approach: forecast (Dec 2013) to sell millions by 2016, sales ended in Jan 2015. A great product without a market need fails.`],
[`Name six market analysis tools`,`Surveys/questionnaires, focus groups, feedback &amp; complaints, ethnographic research, social listening &amp; reviews, competitive benchmarking, trend analysis, sales data &amp; CRM analytics, experiments/A-B tests.`],
[`Friedman vs Freeman: shareholder vs stakeholder theory`,`Friedman (1970s): maximise shareholder value; managers are agents of the owners; externalities belong to regulation; risk of profit at all costs. Freeman (1980s): the firm is a nexus of relationships; managers mediate interests; direct responsibility to society and environment; risk of diluted objectives.`],
[`The steps of the marketing reference framework`,`Context analysis (external + internal) → segmentation, targeting, positioning → value proposition: marketing mix (product, place, price, promotion) → implementation and control.`],
[`Strategic vs operational marketing`,`Strategic: where to play and how to win (context analysis, STP); long-term, non-reversible, large resources, top management. Operational: how to execute (4Ps); short/medium term, limited resources, revisable on feedback, middle management.`],
[`Which three questions does STP answer?`,`How is the market structured? Which customer groups are most compatible with the organisation? How can it be perceived as different from competitors?`],
[`Need, want, demand`,`Need: a perceived state of deprivation. Want: a need directed at a specific solution. Demand: a want backed by willingness and ability to buy. “I'm thirsty” → a Coke → buying it.`],
[`Define market demand`,`The total quantity of a product or service that consumers are willing and able to buy at a given price within a specific period.`],
[`Demand analysis: macro vs micro viewpoint`,`Macro: define and qualify the market (boundaries, breadth) and measure it (estimate and forecast). Micro: market needs, buying behaviour, offering analysis, competitive system (5 forces, benchmarking). Plus the macro-environment (PESTEL).`],
[`The five levels of market qualification (Evoque example)`,`Potential (interested in premium SUVs) → qualified (adults with a licence) → available (€85k+ urban professionals near a dealer) → served/target (professionals in Milan, Rome, Turin) → penetrated (actual buyers, e.g. 5,000 in 2024).`],
[`Market share: meaning, formula, PC example`,`An indicator of competitive capacity. Share = company sales ÷ total market demand. PCs 2024 by units: Lenovo 25.5%, HP 21.6%, Dell 16.1%, Apple 9.2%, Asus 7.1%, Acer 6.9%.`],
[`Expansible vs non-expansible markets`,`Expansible: total demand can grow significantly with marketing effort. Non-expansible: demand is insensitive to marketing and stays close to its potential.`],
[`Endogenous vs exogenous demand factors`,`Endogenous (controlled): price, product/service, point of sale, communication, personal relationship. Exogenous: macro-environment, economic trends, disposable income, competition and positioning, complements, substitutes.`],
[`Price elasticity of demand: formula and reading`,`E = (ΔQ/Q) ÷ (ΔP/P). |E| &gt; 1 → elastic (quantity reacts more than price); |E| &lt; 1 → inelastic.`],
[`How do you choose a demand forecasting method?`,`By data (quantitative data available → quantitative methods; otherwise qualitative) and by objective (size of an existing market; demand after a new launch; precise demand over a time window).`],
[`Quantitative vs qualitative forecasting: pros and cons`,`Quantitative: objective, accurate with rich data, detect trend and seasonality / need large reliable data, explain “what” not “why”, sensitive to assumptions, miss disruptions. Qualitative: work with little data, capture motivations, flexible, explain “why” / subjective, less precise, costly and slow.`],
[`Define customer value and the marketing goal`,`Value = perceived benefits vs perceived costs and risks (not only price). Goal: deliver benefits customers value in ways competitors don't, by finding and reducing the customer's costs and risks before competitors.`],
[`Explicit vs hidden customer costs: why compete on hidden ones?`,`Explicit = monetary costs and risks: every competitor sees them, so cutting them squeezes margins and triggers price wars. Hidden = effort (time, difficulty understanding the product and the information) and risk of a poor choice. Reducing hidden costs differentiates.`],
[`The five phases of the B2C buying process`,`Problem recognition → information search (internal; personal, public, marketing sources) → evaluation of alternatives (criteria) → purchase decision (whom/when: atmosphere, terms, past experience, sales pressure) → post-purchase behaviour (expectations vs experience).`],
[`What drives customer involvement, and what does low involvement change?`,`Importance (cost), personal consequences, effect on social and self-image. The lower the involvement, the more steps of the buying process are skipped.`],
[`FCB grid: quadrants and marketing implications`,`High involvement + thinking: information, reviews, guarantees (insurance, appliances). High + feeling: emotional storytelling, aspiration (sports car, perfume). Low + thinking: promotions, price, distribution, reminders (detergent). Low + feeling: brand personality, packaging, sensory cues (snacks, soft drinks).`],
[`Maslow's hierarchy of needs`,`Physiological → safety → belonging → esteem → self-actualisation.`],
[`Five differences between B2B and B2C demand`,`B2B: concentrated customers, <b>derived</b> demand, high volumes and contracts, less price-elastic, driven by ROI/efficiency, more predictable, infrequent but recurring, tailored. B2C: many customers, direct demand, small purchases, more elastic, emotional/brand-driven, volatile, frequent, standardised.`],
[`The roles of the purchasing centre (with the 3D-printer example)`,`Initiator (production manager spots the need) · influencer (lead engineer sets specs) · decider (COO/CEO approves) · buyer (procurement negotiates) · user (line workers).`],
[`Needs of the purchasing centre`,`Technical (function, quality, duration) · economic-financial (cost, payment terms) · assistance (post-sale, set-up) · information (access to innovation, security of supply, market information).`],
[`How should a marketer handle a purchasing centre?`,`Identify the roles in the buying situation, keep them distinct, find the decision variables each role sees or controls, and approach each on the objectives it maximises.`]
]);

deck('mk2',[
[`The three steps of STP`,`Segmentation (identify variables, slice the market, profile segments) → targeting (choose segments) → positioning (how each target should perceive the offer).`],
[`Define market segmentation`,`The process through which the company divides the market into sub-groups with different demand profiles but internally homogeneous, for which management develops specific marketing plans.`],
[`Why segment a market? (and the Prego example)`,`Markets are too broad and too diverse (preferences, resources, locations, attitudes, habits). Prego tested 45 tomato-sauce variants: no single best product exists, only the best for each group.`],
[`Segmentation sits between which two extremes?`,`Undifferentiated (mass) marketing and one-to-one marketing.`],
[`Advantages of segmentation for the firm and for the customer`,`Firm: lower complexity, prioritised resource allocation (current × future value of segments), stronger competitive advantage → sustainable profit growth. Customer: convenience, tailored products, personalised experience.`],
[`Disadvantages of segmentation and a remedy`,`More R&amp;D and engineering, higher production and distribution (stock) costs, fragmented advertising, more market research. Modularisation reduces the cost of variety.`],
[`Five characteristics of a good segment`,`Measurability · accessibility · homogeneity inside / heterogeneity outside · importance (large enough) · duration.`],
[`Segmenting by product: example, pros, cons`,`GM split the US car market into six segments (1921). Pros: simple, immediate, clear. Cons: ignores customers, little visibility of competition among products, simplistic. Fitted production-driven, low-competition markets.`],
[`The three dimensions of customer segmentation`,`Customer characteristics (socio-demographic, geographic, psychographic) · customer behaviour (usage, buying process) · customer needs (benefits sought).`],
[`Observability vs differentiation potential of segmentation bases`,`Socio-demographic: easiest to observe, lowest differentiation potential. Behavioural, psychographic and needs: harder to observe, higher potential; needs offer the most.`],
[`Market segmentation vs customer segmentation`,`Market: whole market, external research data → segment profiles/personas → decide where to compete. Customer: own customer base, internal CRM data (RFM, history, churn risk, CLV) → clusters for retention, upselling, cross-selling.`],
[`What is RFM?`,`Recency, frequency, monetary value of purchases: the core variables of CRM-based customer segmentation (with purchase history, engagement, churn risk, customer lifetime value).`],
[`Pros and cons of B2C segmentation bases`,`Objective characteristics: easy, stable / inaccurate, too broad alone. Psychographics: deeper drivers / hard to measure, unstable. Behaviour: real actions, predictive / costly data, privacy issues. Needs: rich insight / hard to identify, need continuous research.`],
[`Examples: Wolfram, McDonald's, PRIZM`,`Wolfram Mathematica: cheaper student version to build future customers (socio-demographic). McDonald's: regional and seasonal menus (geographic). PRIZM: 66 lifestyle groups (psychographic).`],
[`Two behavioural segmentation examples`,`Shaving: daily, occasional, infrequent shavers (usage intensity). Pharma: B2C marketing to patients vs medical marketing to doctors (roles in the purchase process).`],
[`How do you use behaviour data and needs data?`,`Behaviour: expand usage of current users, convert non-users, spot loyal heavy users, prioritise channels when loyalty is to the store. Needs: design the product on the benefits sought and the communication on the motivations customers respond to.`],
[`B2B segmentation variables`,`Company size, sector, activity, management; geography; usage and volumes, application; buying process (lot size, complexity, roles, distributor loyalty); benefits sought (punctuality and speed of delivery, continuity, technical support, certification, price, customisation).`],
[`Hill-Rom: how did it segment hospitals?`,`Five segments from regression analysis of its data, validated with interviews, then key customers (high spend, want comprehensive solutions, see purchases as investments) vs prime customers (cost-conscious, want speed).`],
[`Mathematical vs heuristic segmentation methods`,`Mathematical: statistical algorithms on a representative sample (e.g. cluster analysis). Heuristic: empirical, mostly qualitative methods based on the marketer's experience.`],
[`The steps of k-means clustering`,`Choose k → pick k random centroids → assign each point to the nearest centroid → recompute centroids → repeat until centroids or memberships stop changing or max iterations.`],
[`Successive elimination (Porter, 1987): steps and the Tesla example`,`Checklist of variables → pairwise matrix → drop irrelevant crossings and contradictions → combine variables → place products by use. Tesla: urban high-income individuals (Model 3/S), suburban high-income families (Y/X/S), urban corporate fleets (Model 3).`],
[`Two-step approach (Wind &amp; Cardozo, 1974)`,`Macro-segmentation on company-level variables (industry, size, geography) → micro-segmentation on decision makers' behaviour and needs (security-, innovation-, cost-driven buyers).`],
[`Nested approach (Bonoma &amp; Shapiro, 1982)`,`Five nests from the most observable to the most individual: demographics → operating variables → purchasing approach → situational factors → personal characteristics of buyers.`],
[`Three kinds of segment validation`,`Statistical (stable, distinct, predictive), managerial (recognisable, a different mix is feasible), strategic (fits positioning and goals, worth it vs competitors).`],
[`Segment description vs product-market mix`,`Description: concise profile of a segment's characteristics, needs, behaviour, size. Product–market mix: matches a product line to a defined segment, with its buyers, needs and demand trends.`],
[`Smartwatch case: method and the “fashion lovers” insights`,`10,540 respondents (18–50, Northern Italy), Likert scales + k-means on utility, privacy, social impact, brand, community, product. Fashion lovers: wearable as accessory, design and personalisation first; young, low income → value pricing, straps/faces, limited editions, social contests, co-creation.`],
[`What is a persona?`,`A semi-fictional representation of a segment's ideal customer, built from data, interviews and some assumptions: goals, expectations, motivations, habits, emotions, likes and dislikes.`],
[`What is a consumer digital twin?`,`A dynamic, data-driven virtual replica (demographic, psychographic, transactional data) that simulates how a real consumer would react to campaigns, products or ads before launch (Fuller et al., 2020).`]
]);

deck('mk3',[
[`The five targeting (coverage) patterns`,`Single-segment concentration · selective specialisation · product specialisation · market specialisation · full market coverage.`],
[`Product specialisation vs market specialisation`,`Product specialisation: the same solution sold to different markets. Market specialisation: different solutions for the same customer group.`],
[`Single-segment concentration vs full market coverage (examples)`,`Single segment: one product line for one target (luxury players like Rolex, Ferrari). Full coverage: broad solutions for every target (L'Oréal).`],
[`What do you weigh when choosing target segments?`,`Segment attractiveness (size, growth, competitive intensity — external analysis) and fit with the firm's resources, competencies and goals (internal analysis).`],
[`What is a schema and why does it matter for positioning?`,`A mental framework of ideas and expectations about something (a restaurant: menu, waiters, tables, pay at the end). Offers that fit a schema are easy to understand and accept; those that don't can confuse or meet resistance.`],
[`The three steps of the traditional positioning approach`,`Identify relevant attributes (functional and emotional) → rate them for your brand and competitors (Likert scales) → reduce them to a few dimensions and analyse → perceptual map and strategic implications.`],
[`Aaker's five brand personality dimensions`,`Sincerity · excitement · competence · sophistication · ruggedness.`]
]);

/* ---------- Written-exam cases ---------- */
const CASES=[
{id:'velora',title:'Velora e-bikes',tags:['ext','ca','int','swot','bmc'],
text:`<p>Velora is a 14-year-old e-bike maker based near Bergamo. It sells about 38,000 bikes a year at an average price of €2,900 through 420 independent dealers in Italy, Germany and Austria. Its 25-person in-house design team has won several awards for its aluminium frames. Motors and batteries come from two large suppliers that also serve Velora's main competitors, and switching would mean redesigning the frames.</p>
<p>Over the last three years Chinese brands have entered Europe selling online at €1,200–1,600. The EU introduced anti-dumping duties on Chinese e-bikes, but some brands are moving assembly to Eastern Europe. After the pandemic boom demand is flat and many manufacturers are discounting to clear excess inventory. Cities are building cycle lanes and several regions offer purchase incentives. Velora's EBIT margin has fallen from 9% to 3%.</p>
<p>The founder is weighing three moves: (a) a €1,700 entry model sold online; (b) 15 Velora brand stores in major cities; (c) a subscription for urban commuters (bike + maintenance + insurance for a monthly fee).</p>`,
qs:[
{skill:'Assess',q:`Assess the attractiveness of the European mid/premium e-bike industry using the five forces and the main STEEP trends. Which forces explain Velora's margin decline?`,
out:[`Rivalry high: flat demand after the boom, excess inventory, discounting (excess capacity), similar products.`,`New entrants: Chinese brands bypass dealers online (access to distribution no longer a barrier); anti-dumping duties are a government barrier but circumvented by EU assembly.`,`Suppliers strong: two concentrated motor/battery suppliers, high switching costs (frame redesign), they also serve rivals.`,`Buyers: consumers compare prices online (more information, low switching costs); independent dealers squeezed by inventory.`,`Substitutes: public transport, e-scooters, bike sharing, cars; complements: cycle lanes, incentives raise demand.`,`STEEP: social (urban mobility, health, ethical living) and political (incentives, lanes, duties) = opportunities; economic (post-boom slowdown) and new low-cost competition = threats.`,`Judgement: medium-low attractiveness; margin squeeze driven by rivalry, entrants and supplier power.`]},
{skill:'Apply',q:`What type of competitive advantage does Velora have, and is it sustainable? Apply VRIO to its design capability and to its dealer network.`,
out:[`Differentiation advantage (design, awards, premium price €2,900, dealer service), broad or focused on the premium segment.`,`Design capability: valuable (supports premium), rare (award-winning in-house team), costly to imitate (path dependence, causal ambiguity of team know-how; but designers can be poached), organised (in-house) → sustainable or at least mid-term.`,`Dealer network: valuable (test rides, service) but shared with rivals → not rare → parity; and losing value as buyers move online.`,`Motors/batteries bought from the same suppliers → no advantage from components.`,`Risks of differentiation: premium gap vs €1,200–1,600 entrants too large; imitation of design.`]},
{skill:'Envision',q:`Evaluate the three options and recommend a strategy. Build a SWOT, derive actions from it, and sketch the business model canvas of the option you recommend.`,
out:[`SWOT: S design, brand, dealer relations; W cost position, supplier dependence, no direct online channel; O incentives, cycling infrastructure, commuters, service revenues; T low-cost entrants, discounting, supplier power.`,`(a) €1,700 online model: competes on price without a cost advantage → risk of stuck in the middle, brand dilution, dealer conflict; only as a separate sub-brand, if at all.`,`(b) Brand stores: forward integration in distribution; control of experience and margins but high capital, risk, conflict with dealers.`,`(c) Subscription: S–O move; canvas — CS urban commuters; VP mobility without ownership hassle; RS recurring monthly fees; KR fleet, design, brand; KA maintenance logistics; KP insurer, dealers as service points; C$ fleet financing, maintenance.`,`Recommendation with roadmap: pilot subscription in 1–2 cities (high impact, manageable), keep dealers as partners, defer stores, reduce supplier dependence (second source, long-term contracts).`,`Control: KPIs (churn, utilisation, margin per subscriber, dealer satisfaction).`]}]},
{id:'lumen',title:'Lumen Air',tags:['ext','ca','swot'],
text:`<p>Lumen Air is an Italian carrier with 22 narrow-body aircraft flying domestic routes and a few to European capitals. Its busiest route, Milan Linate–Rome Fiumicino, has lost 45% of its passengers in ten years to high-speed trains, which link the two city centres in about 3 hours, with WiFi, departures every 15–20 minutes and fares from €30 to €110.</p>
<p>Lumen's average fare on the route is €95. Its unit costs are about 30% higher than those of the low-cost carriers that dominate leisure routes from Bergamo and Malpensa. Lumen calls itself “the comfortable choice”: a free checked bag, assigned seats, a lounge at Linate and a loyalty programme. Surveys show business travellers value frequency and punctuality most, while leisure travellers choose almost only on price. Fuel is 28% of costs, and aviation is now part of the EU emissions trading system.</p>
<p>The CEO is debating whether to cut costs to match the low-cost carriers or to focus on a narrower group of customers.</p>`,
qs:[
{skill:'Assess',q:`Assess the threat of high-speed rail using Abell's model and the substitutes matrix. Then list the other main opportunities and threats for Lumen.`,
out:[`Abell: same customers (Milan–Rome travellers), same need (intercity travel), different product/technology → indirect competition = substitute.`,`Substitutes matrix: rail price favourable (from €30 vs €95) and performance better door-to-door (city centre to city centre, frequency, WiFi) → “big threat” cell; low switching costs.`,`Web conferencing as a second substitute for business trips.`,`Threats: ETS CO2 costs, fuel volatility (28% of costs), low-cost rivalry on leisure, security regulation.`,`Opportunities: tourism growth, European capitals, more frequency on profitable routes, loyal business segment.`]},
{skill:'Apply',q:`Identify the key success factors for business and leisure travellers, and draw a perceptual map (or value curve) for Lumen, the low-cost carriers and high-speed rail.`,
out:[`KSF = demand (what customers want) + competition (how to survive). Business: frequency, punctuality, comfort, loyalty. Leisure: low price → lean, efficient processes and low operating costs.`,`Perceptual map, e.g. price (x) vs door-to-door convenience (y): LCC low price/low convenience; rail mid price/high convenience on domestic; Lumen high price/medium convenience → dominated on Milan–Rome.`,`Value curve variables: price, frequency, punctuality, door-to-door time, baggage, seat comfort, lounge, loyalty, connectivity; Lumen over-delivers on items leisure customers don't value and under-delivers on frequency.`]},
{skill:'Envision',q:`Is Lumen “stuck in the middle”? Recommend a grand strategy and explain how to implement the repositioning without repeating JCPenney's mistakes.`,
out:[`Yes: costs 30% above LCCs, premium not valued by leisure customers, beaten by rail on its key domestic route.`,`Cost leadership not credible (no scale, airport or labour cost advantage; LCCs already lowest).`,`Recommend focused differentiation on business and premium travellers on routes where rail is weak (European capitals, connections), using Linate slots; cut Milan–Rome frequencies and redeploy aircraft (profit pool logic); consider partnerships/codeshares or air-rail tickets.`,`Implementation: pilot on selected routes, keep continuity with “comfortable choice”, communicate the change, measure (yield, load factor, punctuality), roadmap by impact and difficulty.`,`JCPenney lessons: test before rollout, don't remove what core customers value overnight, don't change everything at once.`]}]},
{id:'ardesia',title:'Torrefazione Ardesia',tags:['ext','bmc','corp'],
text:`<p>Ardesia is a family-owned coffee roaster in Brescia with €60m revenues. 80% of sales are beans sold to about 3,000 bars in Northern Italy, usually under 5-year contracts in which Ardesia lends the espresso machine and finances the bar's renovation in exchange for exclusivity. Roasting margins are thin: green coffee prices have doubled in two years, and large roasters compete for bars with ever bigger loans.</p>
<p>Meanwhile at-home consumption keeps growing, compatible capsules sold in supermarkets carry high margins, and specialty coffee shops charge €3–4 for single-origin drinks. Ardesia's brand is well known among bar owners but almost unknown to consumers.</p>
<p>The new CEO, the founder's granddaughter, is considering: (a) opening 20 Ardesia-branded coffee shops; (b) launching compatible capsules in supermarkets; (c) buying a small importer in Brazil that sources green coffee directly from farms.</p>`,
qs:[
{skill:'Assess',q:`Map the profit pool along the coffee value chain (green coffee → importing → roasting → distribution → bars, coffee shops, at-home). Where is value captured today and where is it moving?`,
out:[`Profit pool questions: how profits are distributed, where they grow, whether to expand into those stages.`,`Roasting for bars: thin margins, squeezed by input prices (supplier power) and by bars' bargaining power (roasters bid with bigger loans: rivalry for buyers).`,`High and growing margins in consumer-facing, branded stages: compatible capsules at home, specialty coffee shops.`,`Green coffee: volatile commodity, upstream power during price spikes.`,`Conclusion: value moving towards branded consumer segments where Ardesia has no brand.`]},
{skill:'Apply',q:`Describe Ardesia's current business model with the canvas. Then draw the canvas of the capsule option and say which blocks change.`,
out:[`Current: CS bars (B2B); VP blend quality + machine loan + renovation financing + service; CH own sales force/agents; CR dedicated personal assistance, long contracts, exclusivity; RS bean sales; KR roasting plant, blend know-how, financial capacity, sales network; KA roasting, sales, technical service; KP importers, machine makers, banks; C$ green coffee, financing, plant.`,`Capsules: CS consumers at home; VP convenience, quality, machine compatibility; CH supermarkets (indirect) + online; CR self-service/automated; RS repeat capsule purchases (no lock-in: compatible, so not true bait &amp; hook); KR consumer brand (missing!), capsule technology; KP retailers, co-packer; C$ marketing, listing fees.`,`Almost every customer-facing block changes; the missing key resource is a consumer brand; retailer power is a new threat.`]},
{skill:'Envision',q:`Evaluate each option as a corporate-strategy move (direction of integration or diversification, advantages, risks) and recommend a plan.`,
out:[`(a) Coffee shops: forward integration into retail; higher margins, brand building, learning; risks: capital, new capabilities (retail operations), competing with its own bar customers, lower flexibility.`,`(b) Capsules: related diversification into the at-home channel; uses roasting and blend know-how (economies of scope); risks: supermarket buyer power, weak brand, crowded market; could use a co-packer (taper integration).`,`(c) Brazilian importer: backward integration; secures supply and quality, independence from importers; risks: compounding commodity risk, lower efficiency than specialised importers. Lighter forms: long-term contracts or partnerships with farms.`,`Recommendation: e.g. capsules via co-packer + 2–3 flagship shops as brand builders (pilot), long-term sourcing contracts instead of an acquisition; roadmap by impact and difficulty, KPIs.`]}]},
{id:'corradi',title:'Gruppo Corradi',tags:['corp','intro'],
text:`<p>Gruppo Corradi is a family-controlled industrial group listed on Euronext Milan. The family owns 58% of the shares and appoints 7 of the 9 board members. The group has four businesses:</p>
<ul><li><b>Valves</b> for oil &amp; gas pipelines: revenue €900m, market share 22%, largest competitor 11%, market growth 1% a year.</li>
<li><b>Packaging machines</b> for food: revenue €400m, market share 6%, largest competitor 18%, market growth 9% a year.</li>
<li><b>Hospital beds</b> and patient-handling equipment: revenue €150m, market share 4%, largest competitor 20%, market growth 12% a year.</li>
<li><b>Commercial real estate</b> in Northern Italy (offices leased to third parties): revenue €80m.</li></ul>
<p>The valve business funds most of the group's investments. Valves and packaging machines share engineering, procurement and a plant in Emilia; the other two businesses share nothing except headquarters functions. Analysts apply a “conglomerate discount”, and an activist fund holding 6% is asking to split the group.</p>`,
qs:[
{skill:'Assess',q:`Position the three industrial businesses on the BCG matrix (compute the relative market shares) and comment on what the matrix suggests.`,
out:[`Valves: RMS = 22/11 = 2.0, growth 1% → cash cow.`,`Packaging: RMS = 6/18 = 0.33, growth 9% → question mark.`,`Hospital beds: RMS = 4/20 = 0.20, growth 12% → question mark.`,`Real estate is not a market-share business: BCG does not apply.`,`Suggestion: use valve cash to fund question marks selectively; two weak question marks compete for the same cash → choose.`]},
{skill:'Apply',q:`Classify Corradi's diversification and discuss where the portfolio creates or destroys value.`,
out:[`Valves = 900/1,530 ≈ 59% of revenues → below 70%: a diversified group (Rumelt), not dominant-business.`,`Valves + packaging related (shared engineering, procurement, plant → economies of scope); beds and real estate unrelated → overall related-linked plus unrelated pieces.`,`Value created: economies of scope, internal capital market, risk reduction.`,`Value destroyed: coordination costs, cultural heterogeneity, organisational complexity, cross-subsidies to weak units; conglomerate discount (shareholders can diversify by themselves — refocusing logic).`]},
{skill:'Envision',q:`Use a GE/McKinsey-style assessment to propose a five-year portfolio plan, and judge whether the group's governance fits that plan.`,
out:[`Valves: strong position, unattractive market → cell 4, protective selectivity: generate cash, don't over-invest.`,`Packaging: medium/low strength in an attractive market → challenge invest or opportunistic selectivity: invest to build strength (shared engineering helps).`,`Beds: weak in a very attractive market → cell 6: improve only if a credible path exists, otherwise sell to a medtech player or JV.`,`Real estate: non-core, unrelated → divest and redeploy capital.`,`Plan: refocus on industrial engineering (valves + packaging); timeline and KPIs.`,`Governance: 7/9 family appointees → little independence (VW lesson); add independent directors and committees; engage the activist; weigh stakeholders (employees, Emilia plant).`]}]},
{id:'nuvola',title:'Nuvola SaaS',tags:['intro','strat'],
text:`<p>Nuvola is a Milan-based software company selling a cloud platform for restaurant management (bookings, orders, inventory) on monthly subscriptions. It was founded in 2021 by three co-founders holding 50%, 30% and 20% of the shares.</p>
<p>In 2023 a venture fund invested €8m at a €12m pre-money valuation; in 2025 a growth fund invested €30m at a €90m pre-money valuation. Nuvola now serves 9,000 restaurants in four countries, adds about 1,000 a quarter and loses 2% of customers a month.</p>
<p>The board plans an IPO in 2027. The bankers suggest raising €100m with new shares at a €400m pre-money valuation, and letting the two funds sell part of their stakes. Employees are asking for a stock option plan, and restaurant associations complain about recent price increases. The founders want to keep control of strategic decisions after listing.</p>`,
qs:[
{skill:'Assess',q:`Compute each shareholder's stake after the 2023 round, after the 2025 round and after the IPO's new-share issue. How much control do the founders keep?`,
out:[`2023: post = €20m; VC = 8/20 = 40%; founders keep 12/20 = 60% → 30%, 18%, 12%.`,`2025: post = €120m; growth fund = 30/120 = 25%; others keep 90/120 = 75% → founders 22.5%, 13.5%, 9%; VC 30%.`,`IPO (primary part): post = €500m; public = 100/500 = 20%; others keep 80% → founders 18%, 10.8%, 7.2%; VC 24%; growth fund 20%; public 20%.`,`Founders combined: 60% → 45% → 36%: majority lost after the 2025 round. The funds' secondary sale changes who owns their stakes, not the founders' %.`,`Dilution not necessarily negative: founder A's 50% of €12m (€6m) becomes 18% of €500m (€90m).`]},
{skill:'Apply',q:`Draft Nuvola's vision, mission and purpose, and map its key stakeholders with their possibly conflicting objectives.`,
out:[`Vision (where we go), e.g. “the operating system of Europe's independent restaurants”.`,`Mission (what we do now), e.g. “one cloud platform for bookings, orders and inventory”.`,`Purpose (why we exist, outward-looking), e.g. “help independent restaurants thrive”; must be authentic and shared.`,`Stakeholders: founders (control), funds (return, exit), future public investors (growth, disclosure), employees (stock options), customers and their associations (prices), partners (payments, POS), government (data, tax), community.`,`Conflicts: price increases vs customers; secondary selling vs new investors; resolve with the long-term cash-flow view (no SV without stakeholder value).`]},
{skill:'Envision',q:`Recommend the IPO structure (primary, secondary or mixed) and a governance model for the listed company. Explain the trade-offs.`,
out:[`Mixed IPO: primary €100m funds growth (cash to the company); secondary gives the funds liquidity (cash to sellers). Trade-off: heavy insider selling can signal weakness → limit size, lock-ups.`,`Governance: Italian traditional model (shareholders' meeting, board, board of statutory auditors, independent auditors) or one-tier with committees; add independent directors.`,`Founders' control: shareholder agreement among founders, or enhanced-voting shares where the law allows — trade-off with outside investors' influence and the risk of a governance discount (VW lesson).`,`Stock option plan aligns employees with long-term value; transparent pricing policy towards restaurants.`]}]},
{id:'spesa',title:'Spesa Più supermarkets',tags:['ext','ca','int','swot'],
text:`<p>Spesa Più runs 140 mid-sized supermarkets in Piedmont and Liguria. For decades it competed as “the neighbourhood supermarket”: convenient locations, a broad range of 12,000 products (mostly national brands), staffed fresh counters and frequent promotions.</p>
<p>In the last five years discounters have opened 60 stores in its regions with about 2,000 products, mostly private label, at prices 25–35% lower. A premium chain has expanded with large stores, ready meals and a strong loyalty app. Spesa Più's sales per square metre fell 18%, its customers are ageing, and young families describe the brand as “neither cheap nor special”.</p>
<p>Internal data: logistics and store staff are 62% of operating costs; promotions cut gross margin by 4 points; the fresh counters (bakery, butcher) have the highest customer satisfaction scores. The board has hired a CEO from a fashion retailer who wants to “reinvent all the stores within a year”.</p>`,
qs:[
{skill:'Assess',q:`Map the strategic groups in the regional grocery market. Where does Spesa Più sit, and why is its position weak?`,
out:[`Dimensions: price level × assortment breadth/service (or experience).`,`Groups: discounters (low price, ~2,000 SKUs, private label); premium chain (higher price, large stores, ready meals, app); neighbourhood supermarkets (mid price, broad national brands, convenience).`,`Rivalry strongest within groups, but discounters and premium are attacking from both sides; forces hit groups differently (supplier power higher for brand-heavy chains).`,`Spesa Più is stuck in the middle: neither cost leader nor differentiated; ageing customers, falling sales density.`]},
{skill:'Apply',q:`Use the value chain to find Spesa Più's main cost drivers and sources of differentiation. Then classify its resources/capabilities as key strengths, key weaknesses, superfluous strengths or irrelevant.`,
out:[`Cost: Pareto → logistics and store staff 62%; drivers: assortment breadth (12,000 SKUs → complexity, inventory), national brands vs private label (weak buying power), store size and density, promotion intensity (−4 margin points).`,`Differentiation: fresh counters (operations/service), location convenience, staff.`,`Key strengths: fresh counters, locations. Key weaknesses: cost/logistics efficiency, private label, digital/loyalty. Superfluous strength: breadth of national-brand assortment (strong but losing importance). Irrelevant: justify from the case.`]},
{skill:'Envision',q:`Recommend a repositioning (grand strategy, positioning, key actions) and an implementation plan that avoids the JCPenney mistakes.`,
out:[`Choice, e.g. focused differentiation: “fresh and local neighbourhood store” for families and older customers — or integration (cut costs while differentiating on fresh).`,`Actions: SKU rationalisation, private-label tier, fewer promotions, ready meals from fresh counters, loyalty app, logistics efficiency.`,`Positioning: perceptual map/value curve vs discounters and premium; consistent and durable.`,`Implementation: pilot in 5–10 stores, measure, keep continuity with the neighbourhood identity, communicate, roadmap by impact × difficulty, control KPIs.`,`JCPenney parallels: outsider CEO, everything at once, removing promotions abruptly, no testing → avoid.`]}]}
];
CASES.push({id:'verde',title:'Verde Pasto ready meals',tags:['mk1','mk2','mk3'],
text:`<p>Verde Pasto is a Turin start-up making chilled plant-based ready meals (lasagne, curries, grain bowls) sold at €6.90. So far it sells through its website and 40 organic shops in Piedmont. Two regional supermarket chains have now offered it a listing.</p>
<p>A research agency estimates that in Northern Italy about 14 million adults buy ready meals at least occasionally; 3.5 million buy chilled ready meals in supermarkets every week; 900,000 of these say they are cutting meat for health or environmental reasons. The shoppers of the two chains that offered the listing include about 300,000 of them. Verde Pasto has around 6,000 regular buyers. In a test in 10 supermarkets, cutting the price from €6.90 to €5.90 raised weekly sales from 1,200 to 1,500 meals.</p>
<p>Competitors: large food brands launching plant-based lines with heavy advertising, private labels at €3.90, and meal-delivery apps. A survey of 2,000 shoppers found four groups: <b>flexitarian families</b> (plan the weekly shop, price-aware, want children to eat more vegetables), <b>busy professionals</b> (lunch at the office, convenience, protein content), <b>committed vegans</b> (ingredients and ethics, loyal to specialist brands) and <b>curious foodies</b> (new flavours, will pay a premium, active on social media). The founders want to pick one or two targets for the supermarket launch.</p>`,
qs:[
{skill:'Assess',q:`Qualify and measure Verde Pasto's market (levels and penetration), compute the price elasticity from the test, and identify the endogenous and exogenous factors that shape demand.`,
out:[`Levels: potential 14m (ready-meal buyers) → qualified 3.5m (weekly chilled ready-meal buyers in supermarkets) → available 900k (cutting meat) → served 300k (shoppers of the two chains) → penetrated 6k.`,`Penetration: 6,000 / 300,000 = 2% of the served market; 0.67% of the available market → large room to grow.`,`Elasticity: ΔQ/Q = 300/1,200 = +25%; ΔP/P = −1/6.90 = −14.5%; E ≈ −1.73 → elastic (|E| &gt; 1). Revenue rises from €8,280 to €8,850 a week, but check the unit margin before cutting price.`,`Endogenous: price, product range, distribution (listings, shelf position), communication. Exogenous: health and environmental trends, disposable income, big brands' advertising, private labels, substitutes (delivery apps, home cooking).`,`Expansible market: marketing can still grow plant-based consumption. Customer value: reduce hidden costs (taste risk, unfamiliarity) not only price.`]},
{skill:'Apply',q:`Assess the four survey groups as market segments: which segmentation bases do they rely on, do they meet the criteria of a good segment, and how would you validate them?`,
out:[`Bases: mainly needs/benefits sought (health, convenience, ethics, novelty), plus behaviour (weekly planning, office lunch, brand loyalty) and socio-demographics (families, professionals).`,`Five criteria for each group: measurable (survey shares), accessible (supermarket vs specialist shops vs social media), homogeneous inside and different outside, important (size and buying power), durable (lasting trend vs fad).`,`Committed vegans: loyal to specialists, likely small in supermarkets → weak accessibility/importance for this launch. Curious foodies: premium but maybe short-lived (duration).`,`Validation: statistical (stable clusters, distinct, predictive of purchase), managerial (recognisable by the chains' buyers, a different mix is feasible), strategic (fits brand and goals).`,`Profile the kept segments with personas (goals, habits, emotions).`]},
{skill:'Envision',q:`Choose the target(s) and coverage pattern for the supermarket launch, and design the positioning: key attributes, perceptual map, and how the offer should fit shoppers' schema of ready meals.`,
out:[`Example choice: flexitarian families + busy professionals, with two lines (family trays, single-portion lunch bowls) → selective specialisation; or single-segment concentration on families to start, given limited resources.`,`Attributes: taste, healthiness, convenience, price, ethics. Perceptual map, e.g. price × “everyday healthy” vs “niche/vegan”: private labels (cheap, basic), big brands (mainstream, advertising), specialists (vegan, premium) → gap: affordable, familiar, healthy.`,`Schema: familiar dishes in the chilled ready-meal aisle next to traditional ones, framed as “good food with more vegetables” rather than “vegan” → fits the shoppers' schema and avoids resistance.`,`Price: demand is elastic → value pricing or launch promotions, but protect the margin; reduce hidden costs (tasting, clear labelling, kid-friendly recipes).`,`Positioning statement + KPIs (rotation per store, repeat purchase, penetration of the served market); test in a few stores before full rollout.`]}]});
CASES.forEach(c=>c.qs.forEach((q,i)=>q.id=c.id+'-q'+(i+1)));

/* ---------- Oral questions ---------- */
const ORAL=[];
function oral(m,list){list.forEach(([q,pts])=>ORAL.push({m,q,pts,id:'o-'+hash(q)}))}
oral('intro',[
[`Walk me from a startup's foundation to its IPO. What happens to ownership and control?`,[`Foundation: legal entity, equity split, rules`,`Rounds: pre/post-money, dilution formulas, less control`,`Dilution not necessarily bad (bigger pie)`,`IPO: primary/secondary/mixed; disclosure, market discipline`,`Example: slide table or SpaceX`]],
[`Shareholder value or stakeholder value: what should a company maximise?`,[`SV formula; SV = EV − debt + cash; market value as proxy`,`Stakeholder view: ecosystem, conflicting objectives`,`Long-term reconciliation → long-term cash flows`,`Trust crisis: scandals, black swans; CSR pyramid`]],
[`Compare the governance models and use the VW case to show why governance matters.`,[`Definition of corporate governance`,`Traditional, two-tier, one-tier: bodies and controls`,`VW: board composition, independence, voting power`,`Link to ESG (G pillar)`]]
]);
oral('strat',[
[`What is strategy? Give definitions and the course's operational one.`,[`Strategos origin`,`Ohmae, Drucker, Porter, Henderson, Mintzberg`,`Goal-directed actions → superior performance vs rivals`,`Strategic decision: long-term, irreversible, resource-heavy`]],
[`Explain the strategic decisions process and how the course modules fit into it.`,[`Diagnosis: external (KSFs, O/T), internal (resources, S/W)`,`Competitive advantage & grand strategy (business model)`,`SWOT → alternatives → repositioning`,`Implementation and control`]],
[`Corporate vs business strategy, and what is an SBU?`,[`Which industries vs how to compete`,`Industry attractiveness vs competitive advantage → return above cost of capital`,`SBU features`,`Functional strategies`]],
[`Mission, vision and purpose: differences with examples.`,[`Vision = where; mission = what; purpose = why`,`Airbus, Disney`,`Purpose: outward, authentic, shared`,`Culture and core rigidity`]],
[`The slides and the recorded lectures define vision and mission differently. Explain both readings.`,[`Slides: vision = the company's future dream; mission = present scope`,`Lecture: vision = industry foresight (shareable); mission = strategic intent (firm-specific)`,`Microsoft example`,`Where each sits: corporate identity vs orientation phase; SMART objectives next`]]
]);
oral('ext',[
[`Present Porter's five forces and the determinants of each force.`,[`Attractiveness definition and assumptions`,`Rivalry, entrants, substitutes, buyers, suppliers with determinants`,`Exit vs entry barriers: opposite effects`,`Complements as sixth force`]],
[`How do you assess the threat of substitutes?`,[`Definition and examples`,`Abell: direct vs indirect competition`,`Switching costs, relative price, relative performance`,`Substitutes matrix cells`]],
[`What are key success factors and how do you derive them? Give an example.`,[`Demand analysis + competition analysis`,`Airline/steel/fashion example`,`Output of external analysis with O and T`]],
[`STEEP: how do you run it so it is useful, not a list?`,[`Five groups with variables`,`Probability % and impact −5..+5 over 3–5 years`,`Response; probability × impact chart`,`Megatrend example`]],
[`Strategic groups and profit pools: what do they add to the five forces?`,[`Strategic group definition, 4 insights`,`Profit pool: vertical structure of profitability, 3 questions`,`Airline examples`]]
]);
oral('ca',[
[`Cost advantage: what drives it? Distinguish economies of scale and learning.`,[`Cost drivers list`,`Scale: sources, MES, diseconomies`,`Learning: 20–30% per doubling, managed`,`Point in time vs over time; ΔCFFO levers`]],
[`What does a firm need to differentiate successfully?`,[`Definition`,`Demand side: tangible/intangible, customer understanding`,`Supply side: drivers of uniqueness`,`Integrity, communication, reputation, brand; costs; risks`]],
[`Present Porter's grand strategies with examples and risks.`,[`2×2 + integration`,`Cost leadership: requirements, risks, Walmart/Aldi`,`Differentiation: Illy, Tesco, Commerce Bank`,`Focus; stuck in the middle`]],
[`What is positioning and how do you analyse it?`,[`Two myths; BMW vs Volvo`,`Kotler definition`,`Perceptual map steps; value curve`,`Five critical success factors`]]
]);
oral('int',[
[`Explain the VRIO framework and isolating mechanisms.`,[`V, R, I, O questions`,`Outcome ladder: disadvantage → sustainable`,`Unique resources/IP, path dependence, causal ambiguity, economic deterrence`,`Example core competency`]],
[`How do you use the value chain for cost and for differentiation analysis?`,[`Primary and support activities`,`Cost: 3 phases, Pareto, drivers (car example)`,`Differentiation: 3 phases, link to customer value chain (cans)`]],
[`How do you identify strengths and weaknesses? Use the VW example.`,[`Benchmarking vs competitors`,`Importance × relative strength`,`Four zones with VW items`,`EMI/Raytheon: complementary resources`]]
]);
oral('swot',[
[`How do you go from a SWOT to a strategic roadmap?`,[`SWOT inputs from external/internal analysis`,`Four strategic questions (S–O, S–T, W–O, W–T)`,`Impact × implementation problems`,`Roadmap sequencing`]],
[`When and how should a firm reposition? Use JCPenney and Lego.`,[`Definition, mispositioning`,`Reasons and signs`,`Continuity`,`Lego success vs JCPenney failure: testing, core customers`]]
]);
oral('bmc',[
[`Present the business model canvas and show it on one company.`,[`Definition: create, deliver, capture value`,`Nine blocks with key questions`,`Example: Dell, Nespresso or Starbucks`,`Consistency: cost structure follows`]],
[`Explain bait & hook, multi-sided and freemium models with examples.`,[`Gillette, Nespresso`,`Consoles, Google`,`Metro (free), Flickr/Skype (freemium)`,`Revenue model list`]],
[`How do you innovate a business model?`,[`“What if…” method`,`Dell as BM innovation`,`Nespresso changes by Gaillard`,`Consistency across blocks`]]
]);
oral('mk1',[
[`From needs to demand: how do you analyse and measure a market?`,[`Need → want → demand; market demand definition`,`Macro-environment, macro view (qualify, measure), micro view`,`Five market levels (Evoque); market share`,`Endogenous vs exogenous factors; elasticity; forecasting methods`]],
[`What is customer value, and why compete on hidden costs rather than price?`,[`Benefits vs costs and risks`,`Explicit costs → margin contraction, price wars`,`Hidden costs: effort and risk of a poor choice`,`Link to differentiation (deck 3)`]],
[`Compare B2C and B2B buying processes.`,[`Five B2C phases; involvement; FCB grid`,`B2B vs B2C demand table (derived demand…)`,`Purchasing centre roles and needs`,`What the marketer does with each role`]],
[`Strategic vs operational marketing: where does each step of the marketing process sit?`,[`Four orientations; marketing orientation`,`Reference framework steps`,`Strategic: context analysis + STP; operational: 4Ps`,`Decision features of each`]]
]);
oral('mk2',[
[`Explain the approaches to segmentation and their trade-offs.`,[`Definition; why segment; pros and cons`,`Product vs customer segmentation`,`Characteristics, behaviour, needs; observability vs differentiation`,`Examples (Wolfram, McDonald's, shavers, Hill-Rom)`]],
[`Walk me through a segmentation method with an example.`,[`Mathematical: k-means steps (smartwatch case)`,`Heuristic: successive elimination (Tesla)`,`Two-step and nested approaches`,`From clusters to personas`]],
[`What makes a good segment, and how do you validate it?`,[`Five criteria`,`Statistical, managerial, strategic validation`,`Description and product–market mix`,`Market vs customer (CRM/RFM) segmentation`]]
]);
oral('mk3',[
[`How do you choose targets and build a positioning?`,[`Five coverage patterns`,`Attractiveness × fit`,`Schema theory`,`Attribute identification → rating → reduction → perceptual map`]]
]);
oral('corp',[
[`Should a firm vertically integrate? Discuss advantages, risks and alternatives.`,[`Backward/forward`,`Advantages vs risks`,`Spectrum of vertical relations; taper integration`,`De Beers, Lenovo, Zara`]],
[`Why do firms diversify, and when does diversification create value?`,[`Four motives; history to refocusing`,`Economies of scope and other sources`,`Rumelt types`,`Related vs unrelated pros/cons; GE`]],
[`Compare the BCG and GE/McKinsey matrices.`,[`Two dimensions of portfolio analysis`,`BCG: growth × RMS, quadrants`,`GE: weighted factors, 3×3, three zones`,`When to prefer each`]]
]);


return { DECKS: DECKS, DECK_BY_ID: DECK_BY_ID, COMING: COMING, SHEETS: SHEETS, CARDS: CARDS, CASES: CASES, ORAL: ORAL, hash: hash };
})();
