// Loads the engine and every chapter into a sandbox, the same order as index.html.
const { readFileSync } = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const FILES = ["core.js", "cases/ch1.js", "cases/ch2.js", "cases/ch3.js", "cases/ch4.js", "cases/ch5.js"];

module.exports = function load() {
  const ctx = vm.createContext({ Intl });
  for (const file of FILES) {
    vm.runInContext(readFileSync(path.join(__dirname, "..", file), "utf8"), ctx, { filename: file });
  }
  return ctx.DeskCore;
};
module.exports.FILES = FILES;
