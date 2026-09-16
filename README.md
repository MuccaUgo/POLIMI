# POLIMI Study Hubs

Personal revision sites for my Management Engineering courses at Politecnico di Milano. Not an official
university project: these are study aids built from my own course material.

The root page is a portal listing the courses; each course is a self-contained static site in its own folder.

## Courses

| Folder | Course | Content |
|---|---|---|
| [`afc/`](afc/) | Accounting, Finance & Control | The AFC26 programme and lecture calendar, plus background topics to revise before the course concepts build on them. **Financial Accounting**: 44 concept cards, 83 questions — IFRS reporting: accrual principle and fair value, balance sheet, income statement, cash flow statement, notes and segmental reporting. **Cost Accounting**: 39 concept cards, 42 questions — cost objects and the three classifications, cost configurations, and the process, job order, operation and activity-based allocation methods |
| [`sm/`](sm/) | Strategy & Marketing | **Introduction**: 39 concept cards, 31 questions — the company and its legal forms, ownership from foundation to IPO, shareholder and stakeholder value, corporate governance and ESG. **The Concept of Strategy** (chapter 1): 49 concept cards, 54 questions — what strategy is, its levels and the SBU, the strategic decisions process, intended against emergent strategy, and vision, mission, purpose and culture. Cards the *Fundamentals of Strategy* lectures expand on carry a **Going deeper** section naming the lecture |

The Accounting, Finance & Control hub started life at `/fa/` as a Financial Accounting hub. That path now
holds a redirect page that retires the old service worker and forwards to `/afc/`; saved progress is carried
over from the `fa_` key prefix to `afc_` the first time the new hub loads.

## What each hub offers

- **Programme** *(Accounting, Finance & Control only)* — the AFC26 modules and the lecture calendar, with the
  next lecture highlighted and past lectures dimmed. A module that declares a background topic links straight
  to a Practice 10 run on it, with that topic preselected. Read from `course.js`; the rest of the engine
  ignores it when that file is absent, which is why the Strategy & Marketing hub has no Programme tab.
- **Concepts** — cards grouped by area, each with the meaning, how it works in practice and the typical exam
  trap, plus an optional **Going deeper** section when a recorded lecture expands on the slide, credited to
  that lecture. Searchable and filterable. Where the data declares more than one topic, as both hubs now do, a topic
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
fa/index.html   redirect from the hub's former path
```

In each hub, `data.js` holds the concept cards and question bank, while `app.js` renders the concepts browser
and runs the quiz. No frameworks, no backend, no external dependencies.

The portal and both hubs share one design system: the same CSS custom properties, layout and components, with
only the accent palette changing per course (green for Accounting, Finance & Control, indigo for Strategy &
Marketing, slate for the portal). The chosen theme is stored once under `polimi_theme` and followed everywhere.

## Tests

```bash
node --test afc/tests/*.test.js
node --test sm/tests/*.test.js
```

The suites load `data.js` in a sandbox and check the bank's structure, that every answer key matches its
explanation, that the numeric exercises recompute correctly, and that each service worker only ever touches
caches scoped to its own folder. `afc/tests/course.test.js` also checks the calendar against the published
schedule: 29 slots with 5 of them off, dates in order on the course's Monday/Wednesday pattern, and every
lecture belonging to a declared module.
