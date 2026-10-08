/* PolimiAFC — the pocket calculator. On every screen that needs sums (number boxes to fill in, or an exam
   question), a "🧮 CALCULATOR" button sits under SUBMIT; it opens a calculator right there, and USE ▸ puts the
   result in the box you were filling in. evaluate() and forInput() have no DOM access, so they can be tested. */
(function (root) {
  "use strict";

  // + − × ÷, brackets and % (x% = x ÷ 100), without eval. Returns null for an empty or impossible expression.
  function evaluate(expr) {
    const s = String(expr == null ? "" : expr).replace(/\s+/g, "").replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−").replace(/,/g, ".");
    if (!s) return null;
    let i = 0;
    const peek = () => s[i];
    function number() {
      const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (!m) throw new Error("number expected");
      i += m[0].length;
      return parseFloat(m[0]);
    }
    function factor() {
      const c = peek();
      if (c === "−") { i++; return -factor(); }
      if (c === "+") { i++; return factor(); }
      let v;
      if (c === "(") { i++; v = sum(); if (peek() === ")") i++; } // a bracket left open closes at the end
      else v = number();
      while (peek() === "%") { i++; v /= 100; }
      return v;
    }
    function product() {
      let v = factor();
      while (peek() === "×" || peek() === "÷") { const op = s[i++]; const r = factor(); v = op === "×" ? v * r : v / r; }
      return v;
    }
    function sum() {
      let v = product();
      while (peek() === "+" || peek() === "−") { const op = s[i++]; const r = product(); v = op === "+" ? v + r : v - r; }
      return v;
    }
    try {
      const v = sum();
      if (i < s.length) return null;
      return isFinite(v) ? v : null;
    } catch (e) { return null; }
  }

  // How the result goes into a box. The game reads "12.345" as twelve thousand (a thousands dot), so a result with
  // exactly three decimals gets a fourth: 0.125 → "0.1250". Four decimals are enough for EPS.
  function forInput(v) {
    const r = Math.round(v * 10000) / 10000;
    let t = String(Math.abs(r) < 1e-12 ? 0 : r);
    if (/e/i.test(t)) t = r.toFixed(4);
    const dec = t.split(".")[1];
    if (dec && dec.length === 3) t += "0";
    return t;
  }
  const show = v => v == null ? "" : (Math.round(v * 1e6) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 6 });

  const api = { evaluate, forInput, show };
  root.PocketCalc = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;

  // ---------- In the job screens ----------
  const OPS = "+−×÷";
  let expr = "", open = false, lastInput = null, fresh = false; // fresh: the display shows a result; a digit starts over
  const KEYS = ["7", "8", "9", "⌫", "C", "4", "5", "6", "×", "÷", "1", "2", "3", "+", "−", "0", ".", "%", "(", ")"];
  const html = () => `<div class="calcbox">
    <button type="button" class="calc-toggle" data-calc="toggle" aria-expanded="${open}">🧮 CALCULATOR ${open ? "▴" : "▾"}</button>
    <div class="calc" ${open ? "" : "hidden"}>
      <div class="calc-screen"><div class="calc-expr" aria-live="polite"></div><div class="calc-res"></div></div>
      <div class="calc-keys">${KEYS.map(k => `<button type="button" data-calc="${k}"${/[⌫C]/.test(k) ? ' class="fn"' : OPS.includes(k) ? ' class="op"' : ""}>${k}</button>`).join("")}
        <button type="button" data-calc="use" class="use">USE ▸ in the box</button><button type="button" data-calc="=" class="eq">=</button></div>
    </div></div>`;
  const panel = () => document.querySelector("#overlay .panel.job");
  const needsCalc = p => p && (p.querySelector('input[inputmode="decimal"]') || p.querySelector('.chips.list[data-g="a"]'));
  function refresh(box) {
    if (!box) return;
    const v = evaluate(expr);
    box.querySelector(".calc-expr").textContent = expr || "0";
    box.querySelector(".calc-res").textContent = expr && v != null ? "= " + show(v) : expr ? "…" : "";
    box.querySelector('[data-calc="use"]').hidden = !box.closest(".panel").querySelector('input[inputmode="decimal"]');
  }
  function target(p) {
    if (lastInput && p.contains(lastInput)) return lastInput;
    return [...p.querySelectorAll('input[inputmode="decimal"]')].find(x => !x.value) || null;
  }
  function press(box, k) {
    const last = expr.slice(-1);
    if (k === "toggle") {
      open = !open;
      box.querySelector(".calc").hidden = !open;
      const t = box.querySelector(".calc-toggle");
      t.textContent = `🧮 CALCULATOR ${open ? "▴" : "▾"}`; t.setAttribute("aria-expanded", open);
      if (open) box.querySelector(".calc").scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }
    const wasFresh = fresh; fresh = false;
    if (k === "C") expr = "";
    else if (k === "⌫") expr = expr.slice(0, -1);
    else if (k === "=") { const v = evaluate(expr); if (v != null) { expr = forInput(v); fresh = true; } }
    else if (k === "use") {
      const v = evaluate(expr), p = box.closest(".panel"), inp = p && target(p);
      if (v == null || !inp) { box.querySelector(".calc-res").textContent = v == null ? "Nothing to use yet" : "Tap a box first"; return; }
      inp.value = forInput(v);
      inp.dispatchEvent(new Event("input", { bubbles: true }));
      inp.classList.add("calc-filled"); setTimeout(() => inp.classList.remove("calc-filled"), 700);
      // The display keeps the result; the next digit starts a new calculation, an operator carries on from it.
      expr = inp.value; fresh = true;
      box.querySelector(".calc-expr").textContent = expr;
      box.querySelector(".calc-res").textContent = "→ in the box";
      return;
    }
    else if (OPS.includes(k)) {
      if (!expr && k !== "−") expr = "0";
      expr = OPS.includes(last) && !(k === "−" && "×÷(".includes(last)) ? expr.slice(0, -1) + k : expr + k;
    }
    else expr = (wasFresh && /[\d.(]/.test(k) ? "" : expr) + k;
    refresh(box);
  }
  function attach() {
    const p = panel();
    if (!needsCalc(p) || p.querySelector(".calcbox")) return;
    const go = [...p.querySelectorAll("[data-go]")].pop();
    if (go) go.insertAdjacentHTML("afterend", html()); else p.insertAdjacentHTML("beforeend", html());
    const box = p.querySelector(".calcbox");
    // Its own clicks: kept away from the screen's handlers (which listen on the whole overlay).
    box.addEventListener("click", ev => {
      const b = ev.target.closest("[data-calc]"); if (!b) return;
      ev.stopPropagation(); ev.preventDefault();
      press(box, b.dataset.calc);
    });
    refresh(box);
  }
  const overlay = document.querySelector("#overlay");
  if (overlay) {
    new MutationObserver(attach).observe(overlay, { childList: true, subtree: false });
    overlay.addEventListener("focusin", ev => { if (ev.target.matches && ev.target.matches('input[inputmode="decimal"]')) lastInput = ev.target; });
  }
})(typeof window !== "undefined" ? window : globalThis);
