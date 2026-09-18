"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const context = {};
vm.runInNewContext(
  fs.readFileSync(path.join(root, "data.js"), "utf8") +
    ";this.map = JSON.parse(JSON.stringify(STUDY_MAP)); this.categories = CATEGORIES;",
  context
);

test("Prerequisites is one ten-part route with stable numbering", () => {
  assert.equal(context.map.length, 1);
  assert.equal(context.map[0].name, "Prerequisites");
  assert.equal(context.map[0].blocks.length, 10);
  assert.deepEqual(
    Array.from(context.map[0].blocks, block => block.number),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
  );
});

test("every prerequisite part contains a detailed explanation and learning objectives", () => {
  for (const block of context.map[0].blocks) {
    for (const field of ["title", "summary", "overview", "connection", "status"]) {
      assert.equal(typeof block[field], "string", `${block.number}: ${field}`);
      assert.ok(block[field].trim().length > 0, `${block.number}: empty ${field}`);
    }
    assert.ok(block.overview.length >= 350, `${block.number}: overview is too brief`);
    assert.equal(block.keyPoints.length, 3, `${block.number}: expected three learning objectives`);
    block.keyPoints.forEach(point => assert.ok(point.length >= 60, `${block.number}: objective is too brief`));
    assert.ok(["ready", "next"].includes(block.status), `${block.number}: unknown status`);
    if (block.filter) assert.ok(context.categories.includes(block.filter), `${block.number}: invalid concept filter`);
    else assert.equal(block.section, "programme", `${block.number}: missing destination`);
  }
});

test("the AFC shell exposes and renders the Prerequisites section", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  assert.match(html, /id="studyMapBtn"[^>]*>Prerequisites</);
  assert.match(html, /id="studyMap"/);
  assert.match(html, /id="studyMapGrid"/);
  assert.match(app, /function renderStudyMap\(\)/);
  assert.match(app, /data-map-filter/);
  assert.match(app, /<details class=\"map-block/);
  assert.match(app, /blockIndex === 0 \? \" open\"/);
  assert.match(app, /other\.open = false/);
});
