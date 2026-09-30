// Course programme and lecture calendar for Accounting, Finance & Control (AFC26),
// from AFC26_Calendar_Arnaboldi and the Lecture 02 deck, Introduction to the Course.
// Dates fall in 2026.
const COURSE = {
  code: "AFC26",
  title: "Accounting, Finance & Control",
  lecturer: "Michela Arnaboldi",
  cohort: "Students from [A] included to [CE] excluded",
  assistants: ["Eleonora Carloni", "Laura Porta", "Claudia Rizzuti", "Romain Lerouge"],
  slots: ["Monday 14.30, room BL.27.0.3", "Wednesday 8.45, room L.07"],
  materials: "WeBeep (webeep.polimi.it)",
  book: "Arnaboldi, M., Azzone, G. and Giorgino, M. (2014). Performance Measurement and Management for Engineers. Elsevier, NY",
  // Final grade = (challenge 1 x 0.2) + (challenge 2 x 0.2) + (written test x 0.6), then the oral.
  assessment: [
    { part: "Challenge 1", weight: "20%", note: "4-hour in-class sprint, 26 October 2026" },
    { part: "Challenge 2", weight: "20%", note: "4-hour in-class sprint, 14 December 2026" },
    { part: "Written test", weight: "60%", note: "Question and exercise types in AFC26_ExamQuestions" },
    { part: "Oral exam", weight: "\u00b12 points", note: "Optional; can also fail the exam" }
  ],
  // The syllabus as the course states it, one block per letter.
  structure: [
    { block: "Accounting", items: ["Financial accounting recovery", "Financial statement analysis", "Financial statement consolidation"] },
    { block: "Finance", items: ["Cash flow", "Relative valuation", "Value proxies"] },
    { block: "Control", items: ["Planning and control cycle", "Budgeting", "KPIs, corporate costs, TPS, variance analysis", "Reporting and dashboard"] }
  ],
  // Three prerequisites are named; the hub covers two of them today.
  prerequisites: [
    { name: "Financial Accounting", detail: "Structure and content of annual reports: balance sheet, income statement, cash flow statement, IAS/IFRS.", topic: "Financial Accounting" },
    { name: "Cost Accounting", detail: "Definition of cost, cost classification, cost allocation.", topic: "Cost Accounting" },
    { name: "Decision making", detail: "Short term decisions with contribution margin and break-even point; long term decisions with NPV. Covered by MOOC weeks 3 and 4 \u2014 not in this hub yet." }
  ]
};

// Each lecture: ISO date, the topic exactly as published, delivery mode, who runs it,
// and the module it belongs to. off: true marks a scheduled slot with no lecture.
const CALENDAR = [
  { date: "2026-09-14", topic: "Welcome day", mode: "All cohorts", who: "Professor Arnaboldi", module: "Foundations" },
  { date: "2026-09-16", topic: "Introduction to the Course — Basic Terminology & Self-assessment", mode: "Onsite", who: "Professor Arnaboldi · Assistant Lerouge", module: "Foundations" },
  { date: "2026-09-21", topic: "Videos on Financial Statements Recovery and Consolidation", mode: "@HOME", who: "Professor Arnaboldi", module: "Financial Statements" },
  { date: "2026-09-23", topic: "Exercises on Financial Statements Recovery and Consolidation", mode: "Onsite", who: "Assistant Carloni", module: "Financial Statements" },
  { date: "2026-09-28", topic: "Theory on Financial Analysis — Introduction", mode: "Onsite", who: "Professor Arnaboldi", module: "Financial Analysis" },
  { date: "2026-09-30", topic: "Theory on Financial Analysis — Part 1", mode: "Onsite", who: "Professor Arnaboldi", module: "Financial Analysis" },
  { date: "2026-10-05", topic: "Theory on Financial Analysis — Part 2", mode: "Onsite", who: "Professor Arnaboldi", module: "Financial Analysis" },
  { date: "2026-10-07", topic: "Financial Analysis Reclassification and exercises", mode: "Onsite", who: "Assistant Carloni", module: "Financial Analysis" },
  { date: "2026-10-12", topic: "Practical session on Financial Analysis and Benchmarking", mode: "Onsite", who: "Assistant Carloni", module: "Financial Analysis" },
  { date: "2026-10-14", topic: "F1 Cash Flow — Direct measurement of PV, Part 1", mode: "Online (TBC)", who: "Professor Arnaboldi", module: "Valuation", conflict: "The Lecture 02 deck lists this as Online (TBD) with Assistant Carloni." },
  { date: "2026-10-19", topic: "F1 Cash Flow — Direct measurement of PV, Part 2", mode: "Onsite", who: "Professor Arnaboldi", module: "Valuation" },
  { date: "2026-10-21", topic: "NO LECTURE", note: "MSc Graduation", off: true },
  { date: "2026-10-26", topic: "First Challenge: Financial Statement Analysis", mode: "Onsite", who: "Assistant Lerouge · Assistant Rizzuti", module: "Challenges", conflict: "The Lecture 02 deck lists Professor Arnaboldi for this slot." },
  { date: "2026-10-28", topic: "Exercises on DCF, Part 2", mode: "Onsite", who: "Assistant Lerouge", module: "Valuation" },
  { date: "2026-11-02", topic: "NO LECTURE", note: "Mid-terms", off: true },
  { date: "2026-11-04", topic: "NO LECTURE", note: "Mid-terms", off: true },
  { date: "2026-11-09", topic: "Lecture on Relative Valuation and Exercises on DCF", mode: "Onsite", who: "Professor Arnaboldi · Assistant Lerouge", module: "Valuation" },
  { date: "2026-11-11", topic: "Exercises on Relative Valuation and Financial Analysis recovery", mode: "Onsite", who: "Assistant Carloni", module: "Valuation" },
  { date: "2026-11-16", topic: "Budgeting, Part 1", mode: "Onsite", who: "Professor Arnaboldi", module: "Planning & Control" },
  { date: "2026-11-18", topic: "Budgeting, Part 2 and Corporate costs", mode: "Onsite", who: "Professor Arnaboldi", module: "Planning & Control" },
  { date: "2026-11-23", topic: "Non financial KPIs and Transfer Pricing", mode: "Onsite", who: "Professor Arnaboldi", module: "Planning & Control" },
  { date: "2026-11-25", topic: "Plenary lesson on Sustainability", mode: "All cohorts", who: "Professor Arnaboldi", module: "Sustainability" },
  { date: "2026-11-30", topic: "Exercises on Budgeting", mode: "Onsite", who: "Assistant Lerouge · Assistant Rizzuti", module: "Planning & Control" },
  { date: "2026-12-02", topic: "Exercises on TPS and KPIs", mode: "Onsite", who: "Assistant Carloni · Assistant Lerouge", module: "Planning & Control" },
  { date: "2026-12-07", topic: "NO LECTURE", note: "Public holidays", off: true },
  { date: "2026-12-09", topic: "LECTURE TBD", mode: "Onsite", who: "To be announced", module: "Challenges" },
  { date: "2026-12-14", topic: "Second Challenge: Executive Dashboard Design Lab", mode: "Onsite", who: "Assistant Lerouge · Assistant Rizzuti", module: "Challenges" },
  { date: "2026-12-16", topic: "NO LECTURE", note: "MSc Graduation", off: true },
  { date: "2026-12-21", topic: "Exam simulation and final follow up", mode: "Onsite", who: "Assistant Lerouge", module: "Challenges" }
];

// The modules the calendar groups into, in the order they are taught.
const MODULES = [
  {
    title: "Foundations",
    block: "Course",
    blurb: "Basic terminology and a self-assessment of where you stand before the course builds on it.",
    revise: "Financial Accounting"
  },
  {
    title: "Financial Statements",
    block: "Accounting",
    blurb: "Recovering a set of financial statements and consolidating a group, first on video and then in exercises.",
    revise: "Consolidation"
  },
  {
    title: "Financial Analysis",
    block: "Accounting",
    blurb: "Three theory lectures, then reclassification, exercises and a practical session on benchmarking.",
    revise: "Financial Analysis"
  },
  {
    title: "Valuation",
    block: "Finance",
    blurb: "Cash flow and the direct measurement of present value, discounted cash flow exercises, and relative valuation."
  },
  {
    title: "Planning & Control",
    block: "Control",
    blurb: "Budgeting and corporate costs, then non-financial KPIs and transfer pricing, each with its own exercise session.",
    revise: "Cost Accounting"
  },
  {
    title: "Sustainability",
    block: "Course",
    blurb: "A plenary lecture to all cohorts."
  },
  {
    title: "Challenges",
    block: "Course",
    blurb: "Two group challenges — financial statement analysis and an executive dashboard design lab — plus the exam simulation."
  }
];
