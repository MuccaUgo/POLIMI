"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = {};
// Serialize inside the sandbox and parse out here, so the values carry this realm's prototypes.
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../course.js"), "utf8") +
  ";this.json = JSON.stringify({ calendar: CALENDAR, modules: MODULES, course: COURSE });", context);
const { calendar, modules, course } = JSON.parse(context.json);

test("the calendar matches the published schedule", () => {
  assert.equal(course.code, "AFC26");
  // 29 published slots, 5 of them with no lecture
  assert.equal(calendar.length, 29);
  assert.equal(calendar.filter(l => l.off).length, 5);
  assert.deepEqual(
    calendar.filter(l => l.off).map(l => l.date),
    ["2026-10-21", "2026-11-02", "2026-11-04", "2026-12-07", "2026-12-16"]
  );
});

test("every entry is well formed and the dates run in order", () => {
  const seen = new Set();
  let previous = null;
  for (const l of calendar) {
    assert.match(l.date, /^2026-\d{2}-\d{2}$/, l.topic);
    assert.ok(!seen.has(l.date), `Duplicate date: ${l.date}`);
    seen.add(l.date);
    const d = new Date(l.date + "T00:00:00");
    assert.ok(!Number.isNaN(d.getTime()), l.date);
    if (previous) assert.ok(d > previous, `Out of order: ${l.date}`);
    previous = d;

    assert.equal(typeof l.topic, "string");
    assert.ok(l.topic.trim().length > 0, l.date);
    if (l.off) {
      assert.equal(typeof l.note, "string", `${l.date}: missing reason`);
      assert.ok(l.note.trim().length > 0, l.date);
    } else {
      for (const field of ["mode", "who", "module"]) {
        assert.equal(typeof l[field], "string", `${l.date}: ${field}`);
        assert.ok(l[field].trim().length > 0, `${l.date}: empty ${field}`);
      }
    }
  }
});

test("lectures fall on the Monday/Wednesday slots the course uses", () => {
  for (const l of calendar) {
    const day = new Date(l.date + "T00:00:00Z").getUTCDay();
    assert.ok(day === 1 || day === 3, `${l.date} (${l.topic}) is not a Monday or Wednesday`);
  }
});

test("delivery modes are the ones the calendar publishes", () => {
  const modes = new Set(calendar.filter(l => !l.off).map(l => l.mode));
  assert.deepEqual([...modes].sort(), ["@HOME", "All cohorts", "Online (TBC)", "Onsite"]);
});

test("every lecture belongs to a declared module, and every module has lectures", () => {
  const declared = modules.map(m => m.title);
  assert.equal(new Set(declared).size, declared.length, "duplicate module titles");
  for (const l of calendar) {
    if (l.off) continue;
    assert.ok(declared.includes(l.module), `${l.topic}: unknown module ${l.module}`);
  }
  for (const m of modules) {
    const lectures = calendar.filter(l => l.module === m.title);
    assert.ok(lectures.length > 0, `${m.title}: no lectures`);
    assert.equal(typeof m.blurb, "string");
    assert.ok(m.blurb.trim().length > 20, `${m.title}: blurb too short`);
  }
});

test("the modules the hub already covers point back to a background topic", () => {
  const withRevise = modules.filter(m => m.revise).map(m => [m.title, m.revise]);
  assert.deepEqual(withRevise, [
    ["Foundations", "Financial Accounting"],
    ["Financial Statements", "Financial Accounting"],
    ["Financial Analysis", "Financial Accounting"],
    ["Planning & Control", "Cost Accounting"]
  ]);
});

test("every module's background topic exists in the question bank", () => {
  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
    ";this.json = JSON.stringify({ topics: TOPICS, cats: QUESTIONS.map(q => q.cat) });", data);
  const { topics, cats } = JSON.parse(data.json);
  const names = topics.map(t => t.name);

  for (const m of modules) {
    if (!m.revise) continue;
    // The Programme tab renders a button preselecting "topic:<revise>"; a name the bank does
    // not know would silently fall back to practising everything.
    assert.ok(names.includes(m.revise), `${m.title}: unknown topic ${m.revise}`);
    const topic = topics.find(t => t.name === m.revise);
    const count = cats.filter(c => topic.categories.includes(c)).length;
    assert.ok(count > 0, `${m.title}: topic ${m.revise} has no questions`);
  }
});
