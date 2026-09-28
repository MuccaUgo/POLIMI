/* PolimiAFC — save backups: turn a saved game into a file or a short code, and read them back.
   No DOM access, so it can be tested. */
(function (root) {
  "use strict";
  const APP = "polimiafc";
  const PREFIX = "PAFC1-";
  const KINDS = { career: "career" };

  function pack(kind, data, when) {
    if (!KINDS[kind]) throw new Error("Unknown save type.");
    return { app: APP, v: 1, kind, saved: (when || new Date()).toISOString(), data };
  }
  const toText = p => JSON.stringify(p, null, 1);

  // UTF-8 safe base64 in both browsers and Node.
  function b64encode(s) {
    if (typeof Buffer !== "undefined") return Buffer.from(s, "utf8").toString("base64");
    const bytes = new TextEncoder().encode(s);
    let bin = "";
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin);
  }
  function b64decode(s) {
    if (typeof Buffer !== "undefined") return Buffer.from(s, "base64").toString("utf8");
    const bin = atob(s);
    return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
  }
  const toCode = p => PREFIX + b64encode(JSON.stringify(p));
  const fileName = p => `polimiafc-${KINDS[p.kind]}-${p.saved.slice(0, 10)}.json`;

  // Accepts the file's text or the code (spaces and line breaks from copy-paste are ignored).
  function parse(text) {
    const t = String(text == null ? "" : text).trim();
    if (!t) throw new Error("Choose a file or paste a code first.");
    let obj = null;
    try {
      if (t.startsWith("{")) obj = JSON.parse(t);
      else {
        const body = t.replace(/\s+/g, "");
        if (!body.startsWith(PREFIX)) throw new Error("bad");
        obj = JSON.parse(b64decode(body.slice(PREFIX.length)));
      }
    } catch (e) {
      throw new Error("This doesn't look like a PolimiAFC save. Check that you copied the whole code.");
    }
    if (obj && obj.app === APP && obj.kind === "quest") throw new Error("This is a Ledger Quest adventure save: the adventure has been retired, only careers can be imported.");
    if (!obj || obj.app !== APP || !KINDS[obj.kind] || !obj.data || typeof obj.data !== "object") {
      throw new Error("This doesn't look like a PolimiAFC save.");
    }
    const d = obj.data;
    if (obj.kind === "career" && d.mode !== "career") throw new Error("This career save is damaged.");
    return { kind: obj.kind, data: d, saved: obj.saved || null };
  }

  const api = { APP, PREFIX, KINDS, pack, toText, toCode, fileName, parse };
  root.SaveBackup = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
