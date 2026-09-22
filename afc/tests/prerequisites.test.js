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

test("the study map has three ten-part chapters with stable numbering", () => {
  assert.deepEqual(Array.from(context.map, topic => topic.name), ["Financial Accounting", "Cost Accounting", "Financial Statement Consolidation"]);
  for (const topic of context.map) {
    assert.equal(topic.blocks.length, 10, `${topic.name}: expected ten parts`);
    assert.deepEqual(
      Array.from(topic.blocks, block => block.number),
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
    );
  }
});

test("every study-map part contains a detailed explanation and learning objectives", () => {
  for (const topic of context.map) for (const block of topic.blocks) {
    for (const field of ["title", "summary", "overview", "connection", "status"]) {
      assert.equal(typeof block[field], "string", `${topic.name} ${block.number}: ${field}`);
      assert.ok(block[field].trim().length > 0, `${topic.name} ${block.number}: empty ${field}`);
    }
    assert.ok(block.overview.length >= 350, `${topic.name} ${block.number}: overview is too brief`);
    assert.equal(block.keyPoints.length, 3, `${topic.name} ${block.number}: expected three learning objectives`);
    block.keyPoints.forEach(point => assert.ok(point.length >= 60, `${topic.name} ${block.number}: objective is too brief`));
    assert.ok(["ready", "next"].includes(block.status), `${topic.name} ${block.number}: unknown status`);
    if (block.filter) assert.ok(context.categories.includes(block.filter), `${topic.name} ${block.number}: invalid concept filter`);
    else assert.match(block.slides, /^[0-9–, ]+$/, `${topic.name} ${block.number}: missing slide reference`);
  }
});

test("the AFC shell exposes and renders the Study Map section", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  assert.match(html, /id="studyMapBtn"[^>]*>Study Map</);
  assert.match(html, /id="studyMap"/);
  assert.match(html, /id="studyMapGrid"/);
  assert.match(app, /function renderStudyMap\(\)/);
  assert.match(app, /data-map-filter/);
  assert.match(app, /map-source/);
  assert.match(app, /map-note/);
  assert.match(app, /<details class=\"map-block/);
  assert.match(app, /blockIndex === 0 \? \" open\"/);
  assert.match(app, /other\.open = false/);
});

test("the STAR–LIGHT memory part resolves the slide's NCI inconsistency", () => {
  const nci = context.map[2].blocks[9];
  const recognisedNetAssets = 190 + (470 - 170) * (1 - 0.4);
  const proportionateNci = recognisedNetAssets * 0.4;
  const partialGoodwill = 300 - recognisedNetAssets * 0.6;
  assert.equal(proportionateNci, 148);
  assert.equal(partialGoodwill, 78);
  assert.match(nci.overview, /148/);
  assert.match(nci.note, /76/);
});
