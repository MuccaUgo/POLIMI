// Course programme and lecture calendar for Accounting, Finance & Control (AFC26),
// transcribed from the calendar published by Professor Arnaboldi. Dates fall in 2026.
const COURSE = {
  code: "AFC26",
  title: "Accounting, Finance & Control",
  lecturer: "Professor Arnaboldi",
  assistants: ["Assistant Lerouge", "Assistant Carloni", "Assistant Rizzuti"]
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
  { date: "2026-10-14", topic: "F1 Cash Flow — Direct measurement of PV, Part 1", mode: "Online (TBC)", who: "Professor Arnaboldi", module: "Valuation" },
  { date: "2026-10-19", topic: "F1 Cash Flow — Direct measurement of PV, Part 2", mode: "Onsite", who: "Professor Arnaboldi", module: "Valuation" },
  { date: "2026-10-21", topic: "NO LECTURE", note: "MSc Graduation", off: true },
  { date: "2026-10-26", topic: "First Challenge: Financial Statement Analysis", mode: "Onsite", who: "Assistant Lerouge · Assistant Rizzuti", module: "Challenges" },
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
    blurb: "Basic terminology and a self-assessment of where you stand before the course builds on it.",
    revise: "Financial Accounting"
  },
  {
    title: "Financial Statements",
    blurb: "Recovering a set of financial statements and consolidating a group, first on video and then in exercises.",
    revise: "Financial Accounting"
  },
  {
    title: "Financial Analysis",
    blurb: "Three theory lectures, then reclassification, exercises and a practical session on benchmarking.",
    revise: "Financial Accounting"
  },
  {
    title: "Valuation",
    blurb: "Cash flow and the direct measurement of present value, discounted cash flow exercises, and relative valuation."
  },
  {
    title: "Planning & Control",
    blurb: "Budgeting and corporate costs, then non-financial KPIs and transfer pricing, each with its own exercise session."
  },
  {
    title: "Sustainability",
    blurb: "A plenary lecture to all cohorts."
  },
  {
    title: "Challenges",
    blurb: "Two group challenges — financial statement analysis and an executive dashboard design lab — plus the exam simulation."
  }
];
