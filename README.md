# POLIMI Study Hubs

Personal revision sites for my Management Engineering courses at Politecnico di Milano. Not an official
university project: these are study aids built from my own course material.

The root page is a portal listing the courses and the practice game; each one is a self-contained static site in its own folder.

## Courses

| Folder | Course | Content |
|---|---|---|
| [`afc/`](afc/) | Accounting, Finance & Control | The AFC26 programme, calendar, assessment and the course's own A/F/C structure, plus a **three-chapter Study Map**: ten parts each for Financial Accounting, Cost Accounting and Financial Statement Consolidation. Two prerequisite topics and the course content taught so far. **Financial Accounting**: 51 concept cards, 88 questions — IFRS reporting, Recovery lecture notes and EPS. **Cost Accounting**: 39 concept cards, 42 questions — cost classifications, configurations and allocation methods. **Consolidation**: 22 concept cards, 24 questions — groups and control, the equity method, pre-consolidation adjustments, combine/offset/eliminate, fair value, goodwill and non-controlling interests. **Financial Analysis**: 39 concept cards, 43 questions — the six steps to value, context and the Form 20-F, reclassification with NOWC and the NFP, financial planning, and common size |
| [`sm/`](sm/) | Strategy & Marketing | **Introduction**: 39 concept cards, 31 questions — the company and its legal forms, ownership from foundation to IPO, shareholder and stakeholder value, corporate governance and ESG. **The Concept of Strategy** (chapter 1): 66 concept cards, 74 questions — what strategy is, its levels and the SBU, the business strategy formulation process from orientation to control, intended against emergent strategy, and vision, mission, purpose and culture. Cards the six *Fundamentals of Strategy* lectures expand on carry a **Going deeper** section naming the lecture. **External Analysis** (chapter 2): 45 concept cards, 42 questions — STEEP, Porter's five forces with entry and exit barriers, substitutes, buyer and supplier power, complements and network effects, competitor analysis, strategic groups, profit pool mapping and segmentation. The hub records that class has reached STEEP. A **Study Map** organises the material into the 10 + 10 + 8 blocks from *Things to Remember*. `sm/CONTENT_REVIEW.md` records where the sources differ |

## Practice game: AFC Closing Desk

[`desk/`](desk/) is a practice game for Accounting, Finance & Control, built for the iPhone. You play the
accountant: the management decisions are already taken, the documents (invoices, bank statements, contracts,
stock counts, memos) are on your desk, and your job is to fill in the working paper — the income statement,
balance-sheet sections, cash flow statement or schedule the case asks for. An auditor then checks every line
and issues an opinion: **unmodified** (every line right, no hints), **qualified** (at least 75%) or **adverse**.

- **First week (onboarding).** Before the chapters, an optional warm-up in the story of a junior accountant's
  first week at an accounting firm, keeping the books of five very different clients: a textile manufacturer,
  a bakery, a subscription software company, a hotel and a consultancy. One idea a day — the five elements,
  the accounting equation, revenue versus cash, prepayments and accruals, a first profit and cash summary —
  with short tap-to-answer questions that get harder, a note on how the idea differs between the clients,
  and a ten-question probation review. Every wrong answer shows its consequence.
- **Content.** Financial accounting chapters 1–5 of the course's numerical exercises: 50 case types, 25 of
  them the PDF's own exercises and 25 new ones on the same topics. Each case type generates new numbers every
  time; the first time a PDF case type comes up it uses the PDF's original numbers.
- **Levels.** Each chapter has Basic, Intermediate and Advanced levels. A level clears after 10, 10 and 6
  passed cases respectively, with every case type met at least once; clearing it unlocks the next. Clearing
  levels raises your rank from Trainee to Financial Controller.
- **Daily close** picks five cases a day from the unlocked levels. **Re-audit** replays, with the same numbers,
  the cases that did not get a clean opinion.
- **On the phone.** A built-in keypad (no system keyboard) accepts calculations such as `84000÷7×3` or
  `64000×5%`; hints show the formula; live tie-out checks flag a cash flow or balance that does not reconcile.
  It installs to the home screen and works offline.

Cost accounting (chapters 6–9) and consolidation (chapter 10) will join the same desk later.

## Pixel-art career: PolimiAFC

[`quest/`](quest/) is **PolimiAFC**, a pixel-art **career** at PolimiAFC S.p.A., an accounting firm that is
itself a company with shares. (It began as the Ledger Quest RPG; the adventure has since been retired to focus
on the career, and old adventure saves are dropped.) You start as an intern in a pixel-art office. Clients drop documents in the inbox and you
carry each one where it belongs: into the right coloured cabinet (Assets, Liabilities, Equity, Revenue,
Expenses), to your desk to fill in a stock count, a payslip or a rent receipt, or to sort a year-end cut-off
pile. The phone rings with timed questions, and Marco, the senior, asks you to find the document he filed
wrong. Giulia, the CEO, takes the firm's decisions (share issues, a bank loan, laptops, rent in advance)
and you record them as journal entries in the company books, with a live balance check.

Every third day closes a quarter: fees are invoiced for the jobs done right, clients pay the previous
quarter's invoices, and a dashboard shows revenue, expenses, profit, cash and each client's growth. At year
end you write the annual report (income statement, balance sheet, weighted-average shares and EPS) from the
trial balance; the closing entry and the shareholders' meeting follow (5% to the legal reserve, art. 2430
c.c., and a dividend). You earn a daily salary plus a bonus for good work. Promotions are never automatic:
once you have the XP you choose when to take a hard six-question interview with Giulia. Intern, Junior
Accountant and Financial Analyst are playable. The four statements are kept distinct throughout: the
cabinets are grouped under BALANCE SHEET (A, L, E) and INCOME STATEMENT (R, X); a "which statements?" job asks
which of the balance sheet, income statement, cash flow statement (and its section) and statement of changes in
equity record a transaction; the whiteboard explains what each statement answers and how they link, with
PolimiAFC's own figures; and the firm's annual report includes a cash flow statement and a statement of changes
in equity built from its ledger; higher ranks open as new content arrives. The Financial
Analyst (`office-analysis.js`, from AFC Lecture 05) works on a listed client, Lario Energia: sorting the four
kinds of public source, the Form 20-F, reclassifying the balance sheet (fixed assets, NOWC, NFP, provisions,
equity; invested capital = coverage) and the income statement (value added, EBITDA, EBIT, pretax and net
income), segmental analysis, ROE and the payout ratio. Every morning Giulia asks what the day's work is: client bookkeeping,
the **consolidation desk** or the **financial analysis desk** (`office-study.js`); her memos for the company
books arrive either way. Each desk climbs three levels (6 right out of the last 8 to move up), the third being
the level of the AFC written exam, on the patterns of `AFC26_ExamQuestions` and the Lecture 04 exercises:
past-exam theory questions with every option explained; the equity method over several years; full
consolidation with NCI at fair value or proportionate share, full or partial goodwill, fair value
adjustments with deferred taxes and intra-group eliminations; EBIT rebuilt from the indirect cash flow
statement, income statements by nature and by function, ROE from turnover and margins, the financial leverage
formula, the impairment test and net profit from the equity section. At level 3 the desks also hand out the recurring patterns of the past
exams as multiple-choice questions with fresh numbers (`office-exam.js`): EBIT from the cash flow statement,
income statements by nature and from net profit upwards, margins and quality of earnings, ROE/ROS/ROA from the
ratios, net profit and CFO, NFP/EBITDA, DSO from the current ratio or from NOWC, ITR and DPO, the cost of
debt, budgeted ROE, NPM from DSO and DPO, the leverage formula, CAPEX and carrying amounts, the payout ratio
from the cash flow statement, goodwill and NCI, and the equity method. Every wrong option is the result of a
typical mistake named in the official solutions, "None of the other answers" is sometimes right, and a
step-by-step solution follows. One morning option is an eight-question **mock exam**; the menu's **Exam prep**
page lists every pattern met, weakest first. The financial analysis desk also covers steps 2 and 3 of
Lectures 05–06 (`office-planning.js`): common size analysis, vertical and horizontal, on Eni's 2024–2025
figures and on generated firms, percentage points against relative changes, and financial planning (equity
against debt, matching maturities, committed and uncommitted credit lines, factoring with and without
recourse, IFRS 16 leases, bond yields and ratings, the interest tax shield). Interns keep two clients, a
bakery and a software start-up, and the game remembers what you've seen, so documents, calls and exercises
don't repeat until their pool has gone round. Below the screen, two buttons open pop-up panels: **BOOKS** shows PolimiAFC's balance sheet and income statement as the
books stand (totals hidden while you write the annual report) and how each client is doing; **CODEX**
holds every definition the game uses, from the basics to consolidation, with a search. Every screen with sums to do has a pop-up calculator under SUBMIT; USE puts
its result in the box being filled in. The office is
played by tapping. The career saves itself in the browser. For a backup you ask Giulia for a copy of your personnel
file, exported as a file or a copyable code (`PAFC1-…`), and **IMPORT A SAVE** on the title screen restores it, also on another
device (`backup.js`).

The Accounting, Finance & Control hub started life at `/fa/` as a Financial Accounting hub. That path now
holds a redirect page that retires the old service worker and forwards to `/afc/`; saved progress is carried
over from the `fa_` key prefix to `afc_` the first time the new hub loads.

## Pixel-art internships: Polimi Interns

[`interns/`](interns/) is **Polimi Interns**, a single-player pixel-art game about learning real jobs. You create
a student (look, hair, clothes, glasses, degree programme), walk around Piazza Leonardo da Vinci and accept an
internship at the Career Service in Edificio 1, then take the tram to the host company. The first track is
Finance & Control at Brera Components S.r.l.: onboarding with the tutor, Giulia, then a September bank
reconciliation graded line by line. Progress is counted in completed projects and badges, not levels. Weeks
3–12 of the AFC internship and the other tracks are still placeholders. One self-contained `index.html`; the
save lives in `localStorage` under `polimi-interns-v03`.

## What each hub offers

- **Programme** *(Accounting, Finance & Control only)* — the AFC26 modules and the lecture calendar, with the
  next lecture highlighted and past lectures dimmed. A module that declares a background topic links straight
  to a Practice 10 run on it, with that topic preselected. Read from `course.js`; the rest of the engine
  ignores it when that file is absent, which is why the Strategy & Marketing hub has no Programme tab.
- **Study Map** — Strategy & Marketing has 28 memory blocks split 10 + 10 + 8 across its three topics.
  Accounting, Finance & Control has three 10-part chapters with extended explanations and learning
  objectives. The two prerequisite chapters link to related concept cards; the consolidation chapter
  cites lecture slides and explains the worked examples.
- **Concepts** — cards grouped by area, each with the meaning, how it works in practice and the typical exam
  trap, plus an optional **Going deeper** section when a recorded lecture expands on the slide, credited to
  that lecture. A topic may also carry a note, shown when it is selected — the Strategy & Marketing hub uses
  it to show how far the class has reached in a chapter. Searchable and filterable. Where the data declares more than one topic, as both hubs now do, a topic
  row sits above the areas and the area pills follow the topic selected; the quiz area selector groups its
  options the same way, with an *All of …* entry per topic.
- **Full Test** — every question, with area and order selection, automatic session saving and *Jump to question*.
- **Practice 10** — up to 10 random questions with immediate feedback, optionally filtered to one area.
- **Exam Test** — 10 random questions with editable choices and no feedback until the final recap.
- **Mistakes Review** — wrong answers stored in the browser for later revision.

Each hub keeps its own progress, study streak and accuracy in `localStorage` under its own key prefix, so the
courses never mix. Nothing is sent anywhere.

## Running locally

Serve the repository root so the portal and the relative links work:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publishing on GitHub Pages

1. Push to the default branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/root`, then save.

The portal is served at the repository root and each course at its own path, for example `/afc/` and `/sm/`.

## Offline use

Every course folder ships its own manifest and service worker, scoped to that folder. Open a hub once over
HTTPS or a local server and it can be installed to the home screen and reopened without a connection. The
portal page itself has a manifest but no service worker, so it needs a connection on first load.

## Structure

```
index.html      portal listing the courses
portal.css      portal styles
manifest.json   portal manifest
icon.svg        portal icon
afc/            Accounting, Finance & Control hub (index.html, styles.css, data.js, course.js, app.js, sw.js, manifest.json, icon.svg)
afc/tests/      data, quiz and service-worker tests
sm/             Strategy & Marketing hub (same structure)
sm/tests/       same tests for the Strategy & Marketing bank
desk/           AFC Closing Desk game (index.html, styles.css, core.js, onboarding.js, app.js, cases/ch1–ch5.js, sw.js, manifest.json, icons)
desk/tests/     engine, case and service-worker tests
quest/          PolimiAFC career: engine (game.js, art.js, world.js, logic.js), the office and its rules (office-art.js,
                office-data.js, office-logic.js, office-analysis.js, office-study.js, office-exam.js, office-planning.js, office-codex.js, office-ui.js, calculator.js),
                save backups (backup.js), plus index.html, style.css, sw.js, manifest.json, icons
quest/tests/    engine, career, analysis, statements, study-desk, exam, backup and service-worker tests
interns/        Polimi Interns: one self-contained index.html (engine, pixel art and content)
fa/index.html   redirect from the hub's former path
```

In the desk, `core.js` is the engine (seeded generators, the keypad's expression parser, grading, levels and
progress), each `cases/chN.js` registers that chapter's case types, and `app.js` renders the screens.

In each hub, `data.js` holds the concept cards and question bank, while `app.js` renders the concepts browser
and runs the quiz. No frameworks, no backend, no external dependencies.

The portal and both hubs share one design system: the same CSS custom properties, layout and components, with
only the accent palette changing per course (green for Accounting, Finance & Control, indigo for Strategy &
Marketing, slate for the portal). The chosen theme is stored once under `polimi_theme` and followed everywhere.

## Tests

```bash
node --test afc/tests/*.test.js
node --test sm/tests/*.test.js
node --test desk/tests/*.test.js
node --test quest/tests/*.test.js
```

The suites load `data.js` in a sandbox and check the bank's structure, that every answer key matches its
explanation, that the numeric exercises recompute correctly, and that each service worker only ever touches
caches scoped to its own folder. The desk suite checks the 25 PDF exercises against solutions worked out
independently, builds every case type from hundreds of seeds (well-formed lines, amounts in cents, tie-out
checks that reconcile, realistic figures), and covers the keypad parser, grading tolerances, level unlocking,
re-audits, the daily close and the streak. `afc/tests/course.test.js` also checks the calendar against the published
schedule: 29 slots with 5 of them off, dates in order on the course's Monday/Wednesday pattern, and every
lecture belonging to a declared module.
