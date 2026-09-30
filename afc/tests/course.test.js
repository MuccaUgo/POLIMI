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
    ["Financial Statements", "Consolidation"],
    ["Financial Analysis", "Financial Analysis"],
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

test("the course facts match the Lecture 02 deck", () => {
  assert.equal(course.lecturer, "Michela Arnaboldi");
  // Four assistants are named on the team slide; Laura Porta was missing from the first transcription.
  assert.deepEqual(course.assistants.sort(),
    ["Claudia Rizzuti", "Eleonora Carloni", "Laura Porta", "Romain Lerouge"]);
  assert.equal(course.slots.length, 2);
  assert.ok(course.slots.some(s => /Monday/.test(s) && /14\.30/.test(s)));
  assert.ok(course.slots.some(s => /Wednesday/.test(s) && /8\.45/.test(s)));
  assert.match(course.book, /Arnaboldi.*Azzone.*Giorgino.*2014/);
});

test("the assessment adds up to the published weights", () => {
  const weights = course.assessment.filter(a => /%$/.test(a.weight)).map(a => parseInt(a.weight, 10));
  assert.deepEqual(weights, [20, 20, 60]);
  assert.equal(weights.reduce((a, b) => a + b, 0), 100);
  // The oral is not part of the 100: it moves the result by two points either way.
  const oral = course.assessment.find(a => /Oral/.test(a.part));
  assert.match(oral.weight, /2 points/);
});

test("the course structure is the A, F, C one the course states", () => {
  assert.deepEqual(course.structure.map(b => b.block), ["Accounting", "Finance", "Control"]);
  for (const block of course.structure) {
    assert.ok(block.items.length >= 3, `${block.block}: too few topics`);
  }
  // Every calendar module belongs to one of those blocks, or to the course itself.
  const blocks = new Set(["Accounting", "Finance", "Control", "Course"]);
  for (const m of modules) {
    assert.ok(blocks.has(m.block), `${m.title}: unknown block ${m.block}`);
  }
});

test("all three prerequisites are named, and the uncovered one says so", () => {
  assert.equal(course.prerequisites.length, 3);
  const names = course.prerequisites.map(p => p.name);
  assert.deepEqual(names, ["Financial Accounting", "Cost Accounting", "Decision making"]);

  const data = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data.js"), "utf8") +
    ";this.json = JSON.stringify({ topics: TOPICS.map(t => t.name) });", data);
  const topics = JSON.parse(data.json).topics;

  for (const p of course.prerequisites) {
    if (p.topic) assert.ok(topics.includes(p.topic), `${p.name}: topic ${p.topic} not in the bank`);
    else assert.match(p.detail, /not in this hub yet/, `${p.name}: an uncovered prerequisite must say so`);
  }
});

test("lectures the two sources disagree on are flagged", () => {
  const flagged = calendar.filter(l => l.conflict);
  assert.equal(flagged.length, 2);
  assert.deepEqual(flagged.map(l => l.date), ["2026-10-14", "2026-10-26"]);
  for (const l of flagged) assert.ok(l.conflict.includes("Lecture 02 deck"));
});
