var le = (n, u, f) => {
  if (!u.has(n)) throw TypeError("Cannot " + f)
};
var v = (n, u, f) => (le(n, u, "read from private field"), f ? f.call(n) : u.get(n)),
  w = (n, u, f) => {
      if (u.has(n)) throw TypeError("Cannot add the same private member more than once");
      u instanceof WeakSet ? u.add(n) : u.set(n, f)
  },
  G = (n, u, f, j) => (le(n, u, "write to private field"), j ? j.call(n, f) : u.set(n, f), f);
var y = (n, u, f) => (le(n, u, "access private method"), f);
(function(n, u) {
  typeof exports == "object" && typeof module < "u" ? u(exports) : typeof define == "function" && define.amd ? define(["exports"], u) : (n = typeof globalThis < "u" ? globalThis : n || self, u(n.picmo = {}))
})(this, function(n) {
  var k, L, A, he, I, de, T, me, b, E, _, R, ue, V;
  "use strict";
  const u = "14.0";

  function f(o, e, t) {
      let s = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${o}`;
      return typeof t == "function" ? s = t(o, e) : typeof t == "string" && (s = `${t}/${o}`), s
  }
  async function j(o, e = {}) {
      const {
          local: t = !1,
          version: s = "latest",
          cdnUrl: i,
          ...r
      } = e, a = f(o, s, i), c = t ? localStorage : sessionStorage, h = `emojibase/${s}/${o}`, m = c.getItem(h);
      if (m) return Promise.resolve(JSON.parse(m));
      const d = await fetch(a, {
          credentials: "omit",
          mode: "cors",
          redirect: "error",
          ...r
      });
      if (!d.ok) throw new Error("Failed to load Emojibase dataset.");
      const C = await d.json();
      try {
          c.setItem(h, JSON.stringify(C))
      } catch {}
      return C
  }
  const Ge = {
      discord: "joypixels",
      slack: "iamcal"
  };
  async function ge(o, e, t) {
      var s;
      return j(`${o}/shortcodes/${(s=Ge[e])!==null&&s!==void 0?s:e}.json`, t)
  }

  function x(o, e) {
      if (e.length === 0) return o;
      const t = new Set(o.shortcodes);
      return e.forEach(s => {
          const i = s[o.hexcode];
          Array.isArray(i) ? i.forEach(r => t.add(r)) : i && t.add(i)
      }), o.shortcodes = [...t], o.skins && o.skins.forEach(s => {
          x(s, e)
      }), o
  }

  function _e(o, e = []) {
      const t = [];
      return o.forEach(s => {
          if (s.skins) {
              const {
                  skins: i,
                  ...r
              } = s;
              t.push(x(r, e)), i.forEach(a => {
                  const c = {
                      ...a
                  };
                  r.tags && (c.tags = [...r.tags]), t.push(x(c, e))
              })
          } else t.push(x(s, e))
      }), t
  }

  function We(o, e) {
      return e.length === 0 || o.forEach(t => {
          x(t, e)
      }), o
  }
  async function pe(o, e = {}) {
      const {
          compact: t = !1,
          flat: s = !1,
          shortcodes: i = [],
          ...r
      } = e, a = await j(`${o}/${t?"compact":"data"}.json`, r);
      let c = [];
      return i.length > 0 && (c = await Promise.all(i.map(h => {
          let m;
          if (h.includes("/")) {
              const [d, C] = h.split("/");
              m = ge(d, C, r)
          } else m = ge(o, h, r);
          return m.catch(() => ({}))
      }))), s ? _e(a, c) : We(a, c)
  }
  async function fe(o, e) {
      return j(`${o}/messages.json`, e)
  }

  function M(o, e) {
      const s = o.target.closest("[data-emoji]");
      if (s) {
          const i = e.find(r => r.emoji === s.dataset.emoji);
          if (i) return i
      }
      return null
  }

  function W(o) {
      var t;
      const e = (t = window.matchMedia) == null ? void 0 : t.call(window, "(prefers-reduced-motion: reduce)");
      return o.animate && !(e != null && e.matches)
  }

  function J(o, e) {
      return o.toLowerCase().includes(e.toLowerCase())
  }

  function ye(o, e) {
      let t = null;
      return () => {
          t || (t = window.setTimeout(() => {
              o(), t = null
          }, e))
      }
  }

  function ve(o, e) {
      let t = null;
      return (...s) => {
          t && window.clearTimeout(t), t = window.setTimeout(() => {
              o(...s), t = null
          }, e)
      }
  }

  function S(o, e, t, s) {
      return W(s) && o.animate ? o.animate(e, t).finished : Promise.resolve()
  }

  function D(o) {
      var t;
      const e = document.createElement("template");
      return e.innerHTML = o, (t = e.content) == null ? void 0 : t.firstElementChild
  }
  async function we(o) {
      const e = new TextEncoder().encode(o),
          t = await crypto.subtle.digest("SHA-256", e);
      return Array.from(new Uint8Array(t)).map(i => i.toString(16).padStart(2, "0")).join("")
  }

  function p(...o) {
      return o.reduce((e, t) => ({
          ...e,
          [t]: B(t)
      }), {})
  }

  function B(o) {
      return `${o}`
  }

  function Je(o, e) {
      const t = `https://cdn.jsdelivr.net/npm/emojibase-data@${o}/${e}`;
      return {
          emojisUrl: `${t}/data.json`,
          messagesUrl: `${t}/messages.json`
      }
  }
  async function be(o) {
      try {
          return (await fetch(o, {
              method: "HEAD"
          })).headers.get("etag")
      } catch {
          return null
      }
  }

  function Ye(o) {
      const {
          emojisUrl: e,
          messagesUrl: t
      } = Je("latest", o);
      try {
          return Promise.all([be(e), be(t)])
      } catch {
          return Promise.all([null, null])
      }
  }
  async function Qe(o, e, t) {
      let s;
      try {
          s = await o.getEtags()
      } catch {
          s = {}
      }
      const {
          storedEmojisEtag: i,
          storedMessagesEtag: r
      } = s;
      if (t !== r || e !== i) {
          const [a, c] = await Promise.all([fe(o.locale), pe(o.locale)]);
          await o.populate({
              groups: a.groups,
              emojis: c,
              emojisEtag: e,
              messagesEtag: t
          })
      }
  }
  async function Xe(o, e) {
      const t = await o.getHash();
      return e !== t
  }
  async function Ce(o, e, t) {
      const s = t || e(o);
      return await s.open(), s
  }
  async function Ze(o, e, t) {
      const s = await Ce(o, e, t),
          [i, r] = await Ye(o);
      if (await s.isPopulated()) i && r && await Qe(s, i, r);
      else {
          const [a, c] = await Promise.all([fe(o), pe(o)]);
          await s.populate({
              groups: a.groups,
              emojis: c,
              emojisEtag: i,
              messagesEtag: r
          })
      }
      return s
  }
  async function et(o, e, t, s, i) {
      const r = await Ce(o, e, i),
          a = await we(s);
      return (!await r.isPopulated() || await Xe(r, a)) && await r.populate({
          groups: t.groups,
          emojis: s,
          hash: a
      }), r
  }
  async function Y(o, e, t, s, i) {
      return t && s ? et(o, e, t, s, i) : Ze(o, e, i)
  }

  function tt(o, e) {
      o.deleteDatabase(e)
  }
  class je {
      constructor() {
          this.handleKeyDown = this.handleKeyDown.bind(this)
      }
      activate(e) {
          this.rootElement = e, this.rootElement.addEventListener("keydown", this.handleKeyDown)
      }
      deactivate() {
          var e;
          (e = this.rootElement) == null || e.removeEventListener("keydown", this.handleKeyDown)
      }
      get focusableElements() {
          return this.rootElement.querySelectorAll('input, [tabindex="0"]')
      }
      get lastFocusableElement() {
          return this.focusableElements[this.focusableElements.length - 1]
      }
      get firstFocusableElement() {
          return this.focusableElements[0]
      }
      checkFocus(e, t, s) {
          e.target === t && (s.focus(), e.preventDefault())
      }
      handleKeyDown(e) {
          e.key === "Tab" && this.checkFocus(e, e.shiftKey ? this.firstFocusableElement : this.lastFocusableElement, e.shiftKey ? this.lastFocusableElement : this.firstFocusableElement)
      }
  }
  // Here it defines the profile to be chosen for the color profile
  const {
      light: ke,
      dark: st,
      auto: ot
  } = p("light", "dark", "auto");
  class l {
      constructor({
          template: e,
          classes: t,
          parent: s
      }) {
          this.isDestroyed = !1, this.appEvents = {}, this.uiEvents = [], this.uiElements = {}, this.ui = {}, this.template = e, this.classes = t, this.parent = s, this.keyBindingHandler = this.keyBindingHandler.bind(this)
      }
      initialize() {
          this.bindAppEvents()
      }
      setCustomEmojis(e) {
          this.customEmojis = e
      }
      setEvents(e) {
          this.events = e
      }
      setPickerId(e) {
          this.pickerId = e
      }
      emit(e, ...t) {
          this.events.emit(e, ...t)
      }
      setI18n(e) {
          this.i18n = e
      }
      setRenderer(e) {
          this.renderer = e
      }
      setEmojiData(e) {
          this.emojiDataPromise = e, e.then(t => {
              this.emojiData = t
          })
      }
      updateEmojiData(e) {
          this.emojiData = e, this.emojiDataPromise = Promise.resolve(e)
      }
      setOptions(e) {
          this.options = e
      }
      renderSync(e = {}) {
          return this.el = this.template.renderSync({
              classes: this.classes,
              i18n: this.i18n,
              pickerId: this.pickerId,
              ...e
          }), this.postRender(), this.el
      }
      async render(e = {}) {
          return await this.emojiDataPromise, this.el = await this.template.renderAsync({
              classes: this.classes,
              i18n: this.i18n,
              pickerId: this.pickerId,
              ...e
          }), this.postRender(), this.el
      }
      postRender() {
          this.bindUIElements(), this.bindKeyBindings(), this.bindUIEvents(), this.scheduleShowAnimation()
      }
      bindAppEvents() {
          Object.keys(this.appEvents).forEach(e => {
              this.events.on(e, this.appEvents[e], this)
          }), this.events.on("data:ready", this.updateEmojiData, this)
      }
      unbindAppEvents() {
          Object.keys(this.appEvents).forEach(e => {
              this.events.off(e, this.appEvents[e])
          }), this.events.off("data:ready", this.updateEmojiData)
      }
      keyBindingHandler(e) {
          const t = this.keyBindings[e.key];
          t && t.call(this, e)
      }
      bindKeyBindings() {
          this.keyBindings && this.el.addEventListener("keydown", this.keyBindingHandler)
      }
      unbindKeyBindings() {
          this.keyBindings && this.el.removeEventListener("keydown", this.keyBindingHandler)
      }
      bindUIElements() {
          this.ui = Object.keys(this.uiElements).reduce((e, t) => ({
              ...e,
              [t]: this.el.querySelector(this.uiElements[t])
          }), {})
      }
      bindUIEvents() {
          this.uiEvents.forEach(e => {
              e.handler = e.handler.bind(this), (e.target ? this.ui[e.target] : this.el).addEventListener(e.event, e.handler, e.options)
          })
      }
      unbindUIEvents() {
          this.uiEvents.forEach(e => {
              (e.target ? this.ui[e.target] : this.el).removeEventListener(e.event, e.handler)
          })
      }
      destroy() {
          this.unbindAppEvents(), this.unbindUIEvents(), this.unbindKeyBindings(), this.el.remove(), this.isDestroyed = !0
      }
      scheduleShowAnimation() {
          if (this.parent) {
              const e = new MutationObserver(t => {
                  const [s] = t;
                  s.type === "childList" && s.addedNodes[0] === this.el && (W(this.options) && this.animateShow && this.animateShow(), e.disconnect)
              });
              e.observe(this.parent, {
                  childList: !0
              })
          }
      }
      static childEvent(e, t, s, i = {}) {
          return {
              target: e,
              event: t,
              handler: s,
              options: i
          }
      }
      static uiEvent(e, t, s = {}) {
          return {
              event: e,
              handler: t,
              options: s
          }
      }
      static byClass(e) {
          return `.${e}`
      }
  }
  const it = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>',
      rt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>',
      at = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>',
      nt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>',
      ct = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>',
      lt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>',
      ht = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>',
      dt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>',
      mt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<defs>
  <radialGradient gradientUnits="userSpaceOnUse" cy="10%" id="gradient-0">
    <stop offset="0" stop-color="hsl(50, 100%, 50%)" />
    <stop offset="1" stop-color="hsl(50, 100%, 60%)" />
  </radialGradient>
</defs>
<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
<ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="172.586" cy="207.006" rx="39.974" ry="39.974"/>
<ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="334.523" cy="207.481" rx="39.974" ry="39.974"/>
<ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="313.325" cy="356.208" rx="91.497" ry="59.893"/>
<path fill="#55a7ff" d="M 159.427 274.06 L 102.158 363.286 L 124.366 417.011 L 160.476 423.338 L 196.937 414.736 L 218.502 375.214"></path>
<path fill="url(#gradient-0)" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z" />
</svg>`,
      ut = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>',
      gt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>',
      pt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>',
      ft = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>',
      yt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>',
      vt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<defs>
  <radialGradient id="radial" cy="85%">
    <stop offset="20%" stop-color="var(--color-secondary)" />
    <stop offset="100%" stop-color="var(--color-primary)" />
  </radialGradient>
</defs>
<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
<path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`,
      wt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';

  function bt(o, e) {
      const t = D(e);
      return t.dataset.icon = o, t.classList.add(B("icon")), t
  }
  const Ee = {
          clock: it,
          flag: rt,
          frown: at,
          gamepad: nt,
          lightbulb: ct,
          mug: lt,
          plane: ht,
          robot: dt,
          sad: mt,
          search: ut,
          smiley: gt,
          symbols: pt,
          tree: ft,
          users: yt,
          warning: vt,
          xmark: wt
      },
      H = {
          recents: "clock",
          "smileys-emotion": "smiley",
          "people-body": "users",
          "animals-nature": "tree",
          "food-drink": "mug",
          activities: "gamepad",
          "travel-places": "plane",
          objects: "lightbulb",
          symbols: "symbols",
          flags: "flag",
          custom: "robot"
      };

  function xe(o, e) {
      if (!(o in Ee)) return console.warn(`Unknown icon: "${o}"`), document.createElement("div");
      const t = bt(o, Ee[o]);
      return e && t.classList.add(B(`icon-${e}`)), t
  }
  const Ct = {
      mode: "sync"
  };
  class g {
      constructor(e, t = {}) {
          w(this, A);
          w(this, I);
          w(this, T);
          w(this, k, void 0);
          w(this, L, void 0);
          G(this, k, e), G(this, L, t.mode || Ct.mode)
      }
      renderSync(e = {}) {
          const t = D(v(this, k).call(this, e));
          return y(this, T, me).call(this, t, e), y(this, I, de).call(this, t), y(this, A, he).call(this, t, e), t
      }
      async renderAsync(e = {}) {
          const t = D(v(this, k).call(this, e));
          return y(this, T, me).call(this, t, e), y(this, I, de).call(this, t), await y(this, A, he).call(this, t, e), t
      }
      render(e) {
          return v(this, L) === "sync" ? this.renderSync(e) : this.renderAsync(e)
      }
  }
  k = new WeakMap, L = new WeakMap, A = new WeakSet, he = async function(e, t) {
      const s = e.querySelectorAll("[data-view]"),
          i = [];
      for (const r of s) {
          const a = t[r.dataset.view];
          a ? r.dataset.render !== "sync" ? i.push(a.render().then(c => (r.replaceWith(c), c))) : r.replaceWith(a.renderSync()) : r.remove()
      }
      return Promise.all(i)
  }, I = new WeakSet, de = function(e) {
      e.querySelectorAll("i[data-icon]").forEach(s => {
          const {
              icon: i,
              size: r
          } = s.dataset;
          s.replaceWith(xe(i, r))
      })
  }, T = new WeakSet, me = function(e, t) {
      return e.querySelectorAll("[data-placeholder]").forEach(i => {
          const r = i.dataset.placeholder;
          if (r && t[r]) {
              const a = t[r];
              i.replaceWith(...[a].flat())
          } else console.warn(`Missing placeholder element for key "${r}"`)
      }), e
  };
  const jt = p("imagePlaceholder", "placeholder"),
      kt = new g(({
          classes: o
      }) => `
<div class="${o.placeholder} ${o.imagePlaceholder}"></div>
`);
  class Et extends l {
      constructor({
          classNames: e
      } = {}) {
          super({
              template: kt,
              classes: jt
          }), this.classNames = e
      }
      load(e) {
          const t = document.createElement("img");
          this.classNames && (t.className = this.classNames), t.addEventListener("load", () => {
              this.el.replaceWith(t)
          }, {
              once: !0
          }), Promise.resolve(e).then(s => t.src = s)
      }
      renderSync() {
          return super.renderSync(), this.classNames && this.classNames.split(" ").forEach(t => this.el.classList.add(t)), this.el
      }
  }
  const xt = p("customEmoji");
  class Se {
      renderElement(e) {
          return {
              content: e
          }
      }
      renderImage(e = "", t) {
          const s = new Et({
              classNames: e
          });
          return s.renderSync(), {
              content: s,
              resolver: () => (s.load(t()), s.el)
          }
      }
      doRender(e, t, s) {
          if (e.custom) return this.renderCustom(e, t, s);
          const {
              content: i,
              resolver: r
          } = this.render(e, s), a = i instanceof Element ? i : i.el;
          return r && r(), a
      }
      doEmit(e) {
          return e.custom ? this.emitCustom(e) : this.emit(e)
      }
      emitCustom({
          url: e,
          label: t,
          emoji: s,
          data: i
      }) {
          return {
              url: e,
              label: t,
              emoji: s,
              data: i
          }
      }
      renderCustom(e, t, s = "") {
          const i = [xt.customEmoji, s].join(" ").trim(),
              {
                  content: r,
                  resolver: a
              } = this.renderImage(i, () => e.url),
              c = r instanceof Element ? r : r.el;
          return a && a(), c
      }
  }
  const St = new g(({
      emoji: o
  }) => `<span>${o}</span>`);
  class Pe extends Se {
      render(e) {
          return this.renderElement(St.renderSync({
              emoji: e.emoji
          }))
      }
      emit({
          emoji: e,
          hexcode: t,
          label: s
      }) {
          return {
              emoji: e,
              hexcode: t,
              label: s
          }
      }
  }
  const ze = {
          "categories.activities": "Activities",
          "categories.animals-nature": "Animals & Nature",
          "categories.custom": "Custom",
          "categories.flags": "Flags",
          "categories.food-drink": "Food & Drink",
          "categories.objects": "Objects",
          "categories.people-body": "People & Body",
          "categories.recents": "Recently Used",
          "categories.smileys-emotion": "Smileys & Emotion",
          "categories.symbols": "Symbols",
          "categories.travel-places": "Travel & Places",
          "error.load": "Failed to load emojis",
          "recents.clear": "Clear recent emojis",
          "recents.none": "You haven't selected any emojis yet.",
          retry: "Try again",
          "search.clear": "Clear search",
          "search.error": "Failed to search emojis",
          "search.notFound": "No results found",
          search: "Search emojis..."
      },
      Pt = [(o, e) => (o.hexcode === "1F91D" && e < 14 && (o.skins = []), o), (o, e) => (o.skins && (o.skins = o.skins.filter(t => !t.version || t.version <= e)), o)];

  function zt(o, e) {
      return Pt.some(t => t(o, e) === null) ? null : o
  }

  function N(o, e) {
      return o.filter(t => zt(t, e) !== null)
  }

  function P(o) {
      var e;
      return {
          emoji: o.emoji,
          label: o.label,
          tags: o.tags,
          skins: (e = o.skins) == null ? void 0 : e.map(t => P(t)),
          order: o.order,
          custom: !1,
          hexcode: o.hexcode,
          version: o.version
      }
  }

  function O(o, e, t) {
      var s;
      return t && !t.some(i => i.order === o.group) ? !1 : J(o.label, e) || ((s = o.tags) == null ? void 0 : s.some(i => J(i, e)))
  }
  class $e {
      constructor(e = "en") {
          this.locale = e
      }
  }
  const Q = "PicMo";

  function X(o) {
      return new $t(o)
  }
  X.deleteDatabase = o => new Promise((e, t) => {
      const s = indexedDB.deleteDatabase(`${Q}-${o}`);
      s.addEventListener("success", e), s.addEventListener("error", t)
  });
  class $t extends $e {
      async open() {
          const e = indexedDB.open(`${Q}-${this.locale}`);
          return new Promise((t, s) => {
              e.addEventListener("success", i => {
                  var r;
                  this.db = (r = i.target) == null ? void 0 : r.result, t()
              }), e.addEventListener("error", s), e.addEventListener("upgradeneeded", async i => {
                  var a;
                  this.db = (a = i.target) == null ? void 0 : a.result, this.db.createObjectStore("category", {
                      keyPath: "order"
                  });
                  const r = this.db.createObjectStore("emoji", {
                      keyPath: "emoji"
                  });
                  r.createIndex("category", "group"), r.createIndex("version", "version"), this.db.createObjectStore("meta")
              })
          })
      }
      async delete() {
          this.close();
          const e = indexedDB.deleteDatabase(`${Q}-${this.locale}`);
          await this.waitForRequest(e)
      }
      close() {
          this.db.close()
      }
      async getEmojiCount() {
          const t = this.db.transaction("emoji", "readonly").objectStore("emoji");
          return (await this.waitForRequest(t.count())).target.result
      }
      async getEtags() {
          const t = this.db.transaction("meta", "readonly").objectStore("meta"),
              [s, i] = await Promise.all([this.waitForRequest(t.get("emojisEtag")), this.waitForRequest(t.get("messagesEtag"))]);
          return {
              storedEmojisEtag: s.target.result,
              storedMessagesEtag: i.target.result
          }
      }
      async setMeta(e) {
          const t = this.db.transaction("meta", "readwrite"),
              s = t.objectStore("meta");
          return new Promise(i => {
              t.oncomplete = i, Object.keys(e).filter(Boolean).forEach(a => {
                  s.put(e[a], a)
              })
          })
      }
      async getHash() {
          const t = this.db.transaction("meta", "readonly").objectStore("meta");
          return (await this.waitForRequest(t.get("hash"))).target.result
      }
      async isPopulated() {
          const t = this.db.transaction("category", "readonly").objectStore("category");
          return (await this.waitForRequest(t.count())).target.result > 0
      }
      async populate({
          groups: e,
          emojis: t,
          emojisEtag: s,
          messagesEtag: i,
          hash: r
      }) {
          await this.removeAllObjects("category", "emoji");
          const a = [this.addObjects("category", e), this.addObjects("emoji", t), this.setMeta({
              emojisEtag: s,
              messagesEtag: i,
              hash: r
          })];
          await Promise.all(a)
      }
      async getCategories(e) {
          var a;
          const s = this.db.transaction("category", "readonly").objectStore("category");
          let r = (await this.waitForRequest(s.getAll())).target.result.filter(c => c.key !== "component");
          if (e.showRecents && r.unshift({
                  key: "recents",
                  order: -1
              }), (a = e.custom) != null && a.length && r.push({
                  key: "custom",
                  order: 10
              }), e.categories) {
              const c = e.categories;
              r = r.filter(h => c.includes(h.key)), r.sort((h, m) => c.indexOf(h.key) - c.indexOf(m.key))
          } else r.sort((c, h) => c.order - h.order);
          return r
      }
      async getEmojis(e, t) {
          const r = this.db.transaction("emoji", "readonly").objectStore("emoji").index("category"),
              h = (await this.waitForRequest(r.getAll(e.order))).target.result.filter(m => m.version <= t).sort((m, d) => m.order != null && d.order != null ? m.order - d.order : 0).map(P);
          return N(h, t)
      }
      async searchEmojis(e, t, s, i) {
          const r = [];
          return new Promise((a, c) => {
              const d = this.db.transaction("emoji", "readonly").objectStore("emoji").openCursor();
              d.addEventListener("success", C => {
                  var qe;
                  const ne = (qe = C.target) == null ? void 0 : qe.result;
                  if (!ne) return a([...N(r, s), ...t.filter(As => O(As, e))]);
                  const ce = ne.value;
                  O(ce, e, i) && ce.version <= s && r.push(P(ce)), ne.continue()
              }), d.addEventListener("error", C => {
                  c(C)
              })
          })
      }
      async waitForRequest(e) {
          return new Promise((t, s) => {
              e.onsuccess = t, e.onerror = s
          })
      }
      withTransaction(e, t = "readwrite", s) {
          return new Promise((i, r) => {
              const a = this.db.transaction(e, t);
              a.oncomplete = i, a.onerror = r, s(a)
          })
      }
      async removeAllObjects(...e) {
          const t = this.db.transaction(e, "readwrite"),
              s = e.map(i => t.objectStore(i));
          await Promise.all(s.map(i => this.waitForRequest(i.clear())))
      }
      async addObjects(e, t) {
          return this.withTransaction(e, "readwrite", s => {
              const i = s.objectStore(e);
              t.forEach(r => {
                  i.add(r)
              })
          })
      }
  }
  class Fe {}
  const Z = "PicMo:recents";
  class Le extends Fe {
      constructor(e) {
          super(), this.storage = e
      }
      clear() {
          this.storage.removeItem(Z)
      }
      getRecents(e) {
          var t;
          try {
              return JSON.parse((t = this.storage.getItem(Z)) != null ? t : "[]").slice(0, e)
          } catch {
              return []
          }
      }
      addOrUpdateRecent(e, t) {
          const s = [e, ...this.getRecents(t).filter(i => i.hexcode !== e.hexcode)].slice(0, t);
          try {
              this.storage.setItem(Z, JSON.stringify(s))
          } catch {
              console.warn("storage is not available, recent emojis will not be saved")
          }
      }
  }
  class Ae extends Le {
      constructor() {
          super(localStorage)
      }
  }
  // Modifies the default value to st. i.e to choose dark theme by default
  const Ft = {
      dataStore: X,
      theme: st,
      animate: !0,
      showCategoryTabs: !0,
      showPreview: !0,
      showRecents: !0,
      showSearch: !0,
      showVariants: !0,
      emojisPerRow: 8,
      visibleRows: 6,
      emojiVersion: "auto",
      i18n: ze,
      locale: "en",
      maxRecents: 50,
      custom: []
  };

  function Ie(o = {}) {
      return {
          ...Ft,
          ...o,
          renderer: o.renderer || new Pe,
          recentsProvider: o.recentsProvider || new Ae
      }
  }
  class U {
      constructor() {
          w(this, E);
          w(this, R);
          w(this, b, new Map)
      }
      on(e, t, s) {
          y(this, R, ue).call(this, e, t, s)
      }
      once(e, t, s) {
          y(this, R, ue).call(this, e, t, s, !0)
      }
      off(e, t) {
          const s = y(this, E, _).call(this, e);
          v(this, b).set(e, s.filter(i => i.handler !== t))
      }
      emit(e, ...t) {
          y(this, E, _).call(this, e).forEach(i => {
              i.handler.apply(i.context, t), i.once && this.off(e, i.handler)
          })
      }
      removeAll() {
          v(this, b).clear()
      }
  }
  b = new WeakMap, E = new WeakSet, _ = function(e) {
      return v(this, b).has(e) || v(this, b).set(e, []), v(this, b).get(e)
  }, R = new WeakSet, ue = function(e, t, s, i = !1) {
      y(this, E, _).call(this, e).push({
          context: s,
          handler: t,
          once: i
      })
  };
  const Te = {
      injectStyles: !0
  };
  class Lt extends U {}
  class At extends U {}
  const ee = p("emojiCategory", "categoryName", "noRecents", "recentEmojis");
  class te extends l {
      constructor({
          template: e,
          category: t,
          showVariants: s,
          lazyLoader: i
      }) {
          super({
              template: e,
              classes: ee
          }), this.baseUIElements = {
              categoryName: l.byClass(ee.categoryName)
          }, this.category = t, this.showVariants = s, this.lazyLoader = i
      }
      setActive(e, t, s) {
          this.emojiContainer.setActive(e, t, s)
      }
  }
  const It = new g(({
          classes: o,
          emoji: e
      }) => `
<button
  type="button"
  class="${o.emojiButton}"
  title="${e.label}"
  data-emoji="${e.emoji}"
  tabindex="-1">
  <div data-placeholder="emojiContent"></div>
</button>
`),
      Tt = p("emojiButton");
  class Re extends l {
      constructor({
          emoji: e,
          lazyLoader: t,
          category: s
      }) {
          super({
              template: It,
              classes: Tt
          }), this.emoji = e, this.lazyLoader = t, this.category = s
      }
      initialize() {
          this.uiEvents = [l.uiEvent("focus", this.handleFocus)], super.initialize()
      }
      handleFocus() {
          this.category && this.events.emit("focus:change", this.category)
      }
      activateFocus(e) {
          this.el.tabIndex = 0, e && this.el.focus()
      }
      deactivateFocus() {
          this.el.tabIndex = -1
      }
      renderSync() {
          return super.renderSync({
              emoji: this.emoji,
              emojiContent: this.renderer.doRender(this.emoji, this.lazyLoader)
          })
      }
  }
  class Rt {
      constructor(e, t, s = 0, i = 0, r = !1) {
          this.events = new U, this.keyHandlers = {
              ArrowLeft: this.focusPrevious.bind(this),
              ArrowRight: this.focusNext.bind(this),
              ArrowUp: this.focusUp.bind(this),
              ArrowDown: this.focusDown.bind(this)
          }, this.rowCount = Math.ceil(t / e), this.columnCount = e, this.focusedRow = s, this.focusedColumn = i, this.emojiCount = t, this.wrap = r, this.handleKeyDown = this.handleKeyDown.bind(this)
      }
      destroy() {
          this.events.removeAll()
      }
      on(e, t) {
          this.events.on(e, t)
      }
      handleKeyDown(e) {
          e.key in this.keyHandlers && (e.preventDefault(), this.keyHandlers[e.key]())
      }
      setCell(e, t, s = !0) {
          const i = this.getIndex();
          this.focusedRow = e, t !== void 0 && (this.focusedColumn = Math.min(this.columnCount, t)), (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) && (this.focusedRow = this.rowCount - 1, this.focusedColumn = this.emojiCount % this.columnCount - 1), this.events.emit("focus:change", {
              from: i,
              to: this.getIndex(),
              performFocus: s
          })
      }
      setFocusedIndex(e, t = !0) {
          const s = Math.floor(e / this.columnCount),
              i = e % this.columnCount;
          this.setCell(s, i, t)
      }
      focusNext() {
          this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1 ? this.setCell(this.focusedRow, this.focusedColumn + 1) : this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, 0) : this.wrap ? this.setCell(0, 0) : this.events.emit("focus:overflow", 0)
      }
      focusPrevious() {
          this.focusedColumn > 0 ? this.setCell(this.focusedRow, this.focusedColumn - 1) : this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.columnCount - 1) : this.wrap ? this.setCell(this.rowCount - 1, this.columnCount - 1) : this.events.emit("focus:underflow", this.columnCount - 1)
      }
      focusUp() {
          this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.focusedColumn) : this.events.emit("focus:underflow", this.focusedColumn)
      }
      focusDown() {
          this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, this.focusedColumn) : this.events.emit("focus:overflow", this.focusedColumn)
      }
      focusToIndex(e) {
          this.setCell(Math.floor(e / this.columnCount), e % this.columnCount)
      }
      getIndex() {
          return this.focusedRow * this.columnCount + this.focusedColumn
      }
      getCell() {
          return {
              row: this.focusedRow,
              column: this.focusedColumn
          }
      }
      getRowCount() {
          return this.rowCount
      }
  }
  const Vt = new g(({
          classes: o
      }) => `
<div class="${o.emojiContainer}">
  <div data-placeholder="emojis"></div>
</div>
`),
      Mt = p("emojiContainer");
  class z extends l {
      constructor({
          emojis: e,
          showVariants: t,
          preview: s = !0,
          lazyLoader: i,
          category: r,
          fullHeight: a = !1
      }) {
          super({
              template: Vt,
              classes: Mt
          }), this.fullHeight = !1, this.showVariants = t, this.lazyLoader = i, this.preview = s, this.emojis = e, this.category = r, this.fullHeight = a, this.setFocus = this.setFocus.bind(this), this.triggerNextCategory = this.triggerNextCategory.bind(this), this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this)
      }
      initialize() {
          this.grid = new Rt(this.options.emojisPerRow, this.emojiCount, 0, 0, !this.category), this.grid.on("focus:change", this.setFocus), this.grid.on("focus:overflow", this.triggerNextCategory), this.grid.on("focus:underflow", this.triggerPreviousCategory), this.uiEvents = [l.uiEvent("click", this.selectEmoji), l.uiEvent("keydown", this.grid.handleKeyDown)], this.preview && this.uiEvents.push(l.uiEvent("mouseover", this.showPreview), l.uiEvent("mouseout", this.hidePreview), l.uiEvent("focus", this.showPreview, {
              capture: !0
          }), l.uiEvent("blur", this.hidePreview, {
              capture: !0
          })), super.initialize()
      }
      setFocusedView(e, t) {
          if (!!e)
              if (typeof e == "string") {
                  const s = this.emojis.findIndex(i => i.emoji === e);
                  this.grid.setFocusedIndex(s, !1), setTimeout(() => {
                      var c, h, m, d;
                      const i = this.emojiViews[s].el;
                      i.scrollIntoView();
                      const r = (c = i.parentElement) == null ? void 0 : c.previousElementSibling,
                          a = (m = (h = i.parentElement) == null ? void 0 : h.parentElement) == null ? void 0 : m.parentElement;
                      a.scrollTop -= (d = r == null ? void 0 : r.offsetHeight) != null ? d : 0
                  })
              } else e.row === "first" || e.row === 0 ? this.grid.setCell(0, e.offset, t) : e.row === "last" && this.grid.setCell(this.grid.getRowCount() - 1, e.offset, t)
      }
      setActive(e, t, s) {
          var i;
          e ? this.setFocusedView(t, s) : (i = this.emojiViews[this.grid.getIndex()]) == null || i.deactivateFocus()
      }
      renderSync() {
          return this.emojiViews = this.emojis.map(e => this.viewFactory.create(Re, {
              emoji: e,
              category: this.category,
              lazyLoader: this.lazyLoader,
              renderer: this.renderer
          })), this.emojiElements = this.emojiViews.map(e => e.renderSync()), super.renderSync({
              emojis: this.emojiElements,
              i18n: this.i18n
          })
      }
      destroy() {
          super.destroy(), this.emojiViews.forEach(e => e.destroy()), this.grid.destroy()
      }
      triggerPreviousCategory(e) {
          this.events.emit("category:previous", e)
      }
      triggerNextCategory(e) {
          this.category && this.events.emit("category:next", e)
      }
      setFocus({
          from: e,
          to: t,
          performFocus: s
      }) {
          var i, r;
          (i = this.emojiViews[e]) == null || i.deactivateFocus(), (r = this.emojiViews[t]) == null || r.activateFocus(s)
      }
      selectEmoji(e) {
          const t = M(e, this.emojis);
          t && this.events.emit("emoji:select", {
              emoji: t,
              showVariants: this.showVariants
          })
      }
      showPreview(e) {
          const s = e.target.closest("button"),
              i = s == null ? void 0 : s.firstElementChild,
              r = M(e, this.emojis);
          r && this.events.emit("preview:show", r, i == null ? void 0 : i.cloneNode(!0))
      }
      hidePreview(e) {
          M(e, this.emojis) && this.events.emit("preview:hide")
      }
      get emojiCount() {
          return this.emojis.length
      }
  }
  const Dt = new g(({
      classes: o,
      category: e,
      pickerId: t,
      icon: s,
      i18n: i
  }) => `
<section class="${o.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
  <h3 data-category="${e.key}" class="${o.categoryName}">
    <i data-icon="${s}"></i>
    ${i.get(`categories.${e.key}`,e.message||e.key)}
  </h3>
  <div data-view="emojis" data-render="sync"></div>
</section>
`);
  class Bt extends te {
      constructor({
          category: e,
          showVariants: t,
          lazyLoader: s,
          emojiVersion: i
      }) {
          super({
              category: e,
              showVariants: t,
              lazyLoader: s,
              template: Dt
          }), this.showVariants = t, this.lazyLoader = s, this.emojiVersion = i
      }
      initialize() {
          this.uiElements = {
              ...this.baseUIElements
          }, super.initialize()
      }
      async render() {
          await this.emojiDataPromise;
          const e = await this.emojiData.getEmojis(this.category, this.emojiVersion);
          return this.emojiContainer = this.viewFactory.create(z, {
              emojis: e,
              showVariants: this.showVariants,
              lazyLoader: this.lazyLoader,
              category: this.category.key
          }), super.render({
              category: this.category,
              emojis: this.emojiContainer,
              emojiCount: e.length,
              icon: H[this.category.key]
          })
      }
  }
  class Ht extends z {
      constructor({
          category: e,
          emojis: t,
          preview: s = !0,
          lazyLoader: i
      }) {
          super({
              category: e,
              emojis: t,
              showVariants: !1,
              preview: s,
              lazyLoader: i
          })
      }
      async addOrUpdate(e) {
          const t = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
          t && (this.el.removeChild(t), this.emojis = this.emojis.filter(i => i !== e));
          const s = this.viewFactory.create(Re, {
              emoji: e
          });
          if (this.el.insertBefore(s.renderSync(), this.el.firstChild), this.emojis = [e, ...this.emojis.filter(i => i !== e)], this.emojis.length > this.options.maxRecents) {
              this.emojis = this.emojis.slice(0, this.options.maxRecents);
              const i = this.el.childElementCount - this.options.maxRecents;
              for (let r = 0; r < i; r++) this.el.lastElementChild && this.el.removeChild(this.el.lastElementChild)
          }
      }
  }
  const Nt = new g(({
      emojiCount: o,
      classes: e,
      category: t,
      pickerId: s,
      icon: i,
      i18n: r
  }) => `
<section class="${e.emojiCategory}" role="tabpanel" aria-labelledby="${s}-category-${t.key}">
  <h3 data-category="${t.key}" class="${e.categoryName}">
    <i data-icon="${i}"></i>
    ${r.get(`categories.${t.key}`,t.message||t.key)}
  </h3>
  <div data-empty="${o===0}" class="${e.recentEmojis}">
    <div data-view="emojis" data-render="sync"></div>
  </div>
  <div class="${e.noRecents}">
    ${r.get("recents.none")}
  </div>
</section>
`, {
      mode: "async"
  });
  class Ot extends te {
      constructor({
          category: e,
          lazyLoader: t,
          provider: s
      }) {
          super({
              category: e,
              showVariants: !1,
              lazyLoader: t,
              template: Nt
          }), this.provider = s
      }
      initialize() {
          this.uiElements = {
              ...this.baseUIElements,
              recents: l.byClass(ee.recentEmojis)
          }, this.appEvents = {
              "recent:add": this.addRecent
          }, super.initialize()
      }
      async addRecent(e) {
          await this.emojiContainer.addOrUpdate(e), this.ui.recents.dataset.empty = "false"
      }
      async render() {
          var t;
          const e = (t = this.provider) == null ? void 0 : t.getRecents(this.options.maxRecents);
          return this.emojiContainer = this.viewFactory.create(Ht, {
              emojis: e,
              showVariants: !1,
              lazyLoader: this.lazyLoader,
              category: this.category.key
          }), await super.render({
              category: this.category,
              emojis: this.emojiContainer,
              emojiCount: e.length,
              icon: H[this.category.key]
          }), this.el
      }
  }
  const Ut = new g(({
      classes: o,
      category: e,
      pickerId: t,
      icon: s,
      i18n: i
  }) => `
<section class="${o.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
  <h3 data-category="${e.key}" class="${o.categoryName}">
    <i data-icon="${s}"></i>
    ${i.get(`categories.${e.key}`,e.message||e.key)}
  </h3>
  <div data-view="emojis" data-render="sync"></div>
</section>
`);
  class Kt extends te {
      constructor({
          category: e,
          lazyLoader: t
      }) {
          super({
              template: Ut,
              showVariants: !1,
              lazyLoader: t,
              category: e
          })
      }
      initialize() {
          this.uiElements = {
              ...this.baseUIElements
          }, super.initialize()
      }
      async render() {
          return this.emojiContainer = this.viewFactory.create(z, {
              emojis: this.customEmojis,
              showVariants: this.showVariants,
              lazyLoader: this.lazyLoader,
              category: this.category.key
          }), super.render({
              category: this.category,
              emojis: this.emojiContainer,
              emojiCount: this.customEmojis.length,
              icon: H[this.category.key]
          })
      }
  }
  class Ve {
      constructor() {
          this.elements = new Map
      }
      lazyLoad(e, t) {
          return this.elements.set(e, t), e
      }
      observe(e) {
          if (window.IntersectionObserver) {
              const t = new IntersectionObserver(s => {
                  s.filter(i => i.intersectionRatio > 0).map(i => i.target).forEach(i => {
                      const r = this.elements.get(i);
                      r == null || r(), t.unobserve(i)
                  })
              }, {
                  root: e
              });
              this.elements.forEach((s, i) => {
                  t.observe(i)
              })
          } else this.elements.forEach(t => {
              t()
          })
      }
  }
  const Me = p("emojiArea"),
      qt = new g(({
          classes: o
      }) => `
<div class="${o.emojiArea}">
  <div data-placeholder="emojis"></div>
</div>
`, {
          mode: "async"
      }),
      Gt = {
          recents: Ot,
          custom: Kt
      };

  function _t(o) {
      return Gt[o.key] || Bt
  }

  function Wt(o) {
      return !o || o === "button" ? {
          row: "first",
          offset: 0
      } : o
  }
  class Jt extends l {
      constructor({
          categoryTabs: e,
          categories: t,
          emojiVersion: s
      }) {
          super({
              template: qt,
              classes: Me
          }), this.selectedCategory = 0, this.scrollListenerState = "active", this.lazyLoader = new Ve, this.categoryTabs = e, this.categories = t, this.emojiVersion = s, this.handleScroll = ye(this.handleScroll.bind(this), 100)
      }
      initialize() {
          this.appEvents = {
              "category:select": this.handleCategorySelect,
              "category:previous": this.focusPreviousCategory,
              "category:next": this.focusNextCategory,
              "focus:change": this.updateFocusedCategory
          }, this.uiElements = {
              emojis: l.byClass(Me.emojiArea)
          }, this.uiEvents = [l.uiEvent("scroll", this.handleScroll)], super.initialize()
      }
      get focusableEmoji() {
          return this.el.querySelector('[tabindex="0"]')
      }
      async render() {
          this.emojiCategories = this.categories.map(this.createCategory, this);
          const e = {};
          return this.categories.forEach((t, s) => {
              e[`emojis-${t.key}`] = this.emojiCategories[s]
          }), await super.render({
              emojis: await Promise.all(this.emojiCategories.map(t => t.render()))
          }), this.lazyLoader.observe(this.el), window.ResizeObserver && (this.observer = new ResizeObserver(() => {
              const t = this.el.scrollHeight - this.scrollHeight;
              this.el.scrollTop - this.scrollTop === 0 && t > 0 && (this.el.scrollTop += t), this.scrollHeight = this.el.scrollHeight, this.scrollTop = this.el.scrollTop
          }), this.emojiCategories.forEach(t => {
              this.observer.observe(t.el)
          })), this.el
      }
      destroy() {
          super.destroy(), this.emojiCategories.forEach(e => {
              var t;
              (t = this.observer) == null || t.unobserve(e.el), e.destroy()
          })
      }
      handleCategorySelect(e, t) {
          this.selectCategory(e, t)
      }
      createCategory(e) {
          const t = _t(e);
          return this.viewFactory.create(t, {
              category: e,
              showVariants: !0,
              lazyLoader: this.lazyLoader,
              emojiVersion: this.emojiVersion,
              provider: this.options.recentsProvider
          })
      }
      determineInitialCategory() {
          var e;
          return this.options.initialCategory && this.categories.find(t => t.key === this.options.initialCategory) ? this.options.initialCategory : (e = this.categories.find(t => t.key !== "recents")) == null ? void 0 : e.key
      }
      determineFocusTarget(e) {
          const t = this.emojiCategories.find(s => s.category.key === e);
          return this.options.initialEmoji && (t == null ? void 0 : t.el.querySelector(`[data-emoji="${this.options.initialEmoji}"]`)) ? this.options.initialEmoji : "button"
      }
      reset(e = !0) {
          this.events.emit("preview:hide");
          const t = this.determineInitialCategory();
          t && (this.selectCategory(t, {
              focus: this.determineFocusTarget(t),
              performFocus: e,
              scroll: "jump"
          }), this.selectedCategory = this.getCategoryIndex(t))
      }
      getCategoryIndex(e) {
          return this.categories.findIndex(t => t.key === e)
      }
      focusPreviousCategory(e) {
          this.selectedCategory > 0 && this.focusCategory(this.selectedCategory - 1, {
              row: "last",
              offset: e != null ? e : this.options.emojisPerRow
          })
      }
      focusNextCategory(e) {
          this.selectedCategory < this.categories.length - 1 && this.focusCategory(this.selectedCategory + 1, {
              row: "first",
              offset: e != null ? e : 0
          })
      }
      focusCategory(e, t) {
          this.selectCategory(e, {
              focus: t,
              performFocus: !0
          })
      }
      async selectCategory(e, t = {}) {
          var h;
          this.scrollListenerState = "suspend";
          const {
              focus: s,
              performFocus: i,
              scroll: r
          } = {
              performFocus: !1,
              ...t
          };
          this.emojiCategories[this.selectedCategory].setActive(!1);
          const a = this.selectedCategory = typeof e == "number" ? e : this.getCategoryIndex(e);
          (h = this.categoryTabs) == null || h.setActiveTab(this.selectedCategory, {
              performFocus: i,
              scroll: s === "button"
          });
          const c = this.emojiCategories[a].el.offsetTop;
          this.emojiCategories[a].setActive(!0, Wt(s), s !== "button" && i), r && (this.el.scrollTop = c), this.scrollListenerState = "resume"
      }
      updateFocusedCategory(e) {
          var t;
          this.categories[this.selectedCategory].key !== e && (this.scrollListenerState = "suspend", this.selectedCategory = this.getCategoryIndex(e), (t = this.categoryTabs) == null || t.setActiveTab(this.selectedCategory, {
              changeFocusable: !1,
              performFocus: !1
          }), this.scrollListenerState = "resume")
      }
      handleScroll() {
          if (this.scrollListenerState === "suspend" || !this.categoryTabs) return;
          if (this.scrollListenerState === "resume") {
              this.scrollListenerState = "active";
              return
          }
          const e = this.el.scrollTop,
              t = this.el.scrollHeight - this.el.offsetHeight,
              s = this.emojiCategories.findIndex((r, a) => {
                  var c;
                  return e < ((c = this.emojiCategories[a + 1]) == null ? void 0 : c.el.offsetTop)
              }),
              i = {
                  changeFocusable: !1,
                  performFocus: !1,
                  scroll: !1
              };
          e === 0 ? this.categoryTabs.setActiveTab(0, i) : Math.floor(e) === Math.floor(t) || s < 0 ? this.categoryTabs.setActiveTab(this.categories.length - 1, i) : this.categoryTabs.setActiveTab(s, i)
      }
  }
  const Yt = new g(({
          classList: o,
          classes: e,
          icon: t,
          message: s
      }) => `
<div class="${o}" role="alert">
<div class="${e.iconContainer}"><i data-size="10x" data-icon="${t}"></i></div>
<h3 class="${e.title}">${s}</h3>
</div>
`),
      De = p("error", "iconContainer", "title");
  class se extends l {
      constructor({
          message: e,
          icon: t = "warning",
          template: s = Yt,
          className: i
      }) {
          super({
              template: s,
              classes: De
          }), this.message = e, this.icon = t, this.className = i
      }
      renderSync() {
          const e = [De.error, this.className].join(" ").trim();
          return super.renderSync({
              message: this.message,
              icon: this.icon,
              classList: e
          })
      }
  }
  const Qt = new g(({
          classList: o,
          classes: e,
          icon: t,
          i18n: s,
          message: i
      }) => `
<div class="${o}" role="alert">
  <div class="${e.icon}"><i data-size="10x" data-icon="${t}"></i></div>
  <h3 class="${e.title}">${i}</h3>
  <button type="button">${s.get("retry")}</button>
</div>
`),
      Xt = p("dataError");
  class Zt extends se {
      constructor({
          message: e
      }) {
          super({
              message: e,
              template: Qt,
              className: Xt.dataError
          })
      }
      initialize() {
          this.uiElements = {
              retryButton: "button"
          }, this.uiEvents = [l.childEvent("retryButton", "click", this.onRetry)], super.initialize()
      }
      async onRetry() {
          this.emojiData ? await this.emojiData.delete() : await this.options.dataStore.deleteDatabase(this.options.locale), this.events.emit("reinitialize");
          const e = await Y(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
          this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e)
      }
  }
  const $ = p("preview", "previewEmoji", "previewName", "tagList", "tag"),
      es = new g(({
          classes: o,
          tag: e
      }) => `
<li class="${o.tag}">${e}</li>
`),
      ts = new g(({
          classes: o
      }) => `
<div class="${o.preview}">
  <div class="${o.previewEmoji}"></div>
  <div class="${o.previewName}"></div>
  <ul class="${o.tagList}"></ul>
</div>
`);
  class ss extends l {
      constructor() {
          super({
              template: ts,
              classes: $
          })
      }
      initialize() {
          this.uiElements = {
              emoji: l.byClass($.previewEmoji),
              name: l.byClass($.previewName),
              tagList: l.byClass($.tagList)
          }, this.appEvents = {
              "preview:show": this.showPreview,
              "preview:hide": this.hidePreview
          }, super.initialize()
      }
      showPreview(e, t) {
          if (this.ui.emoji.replaceChildren(t), this.ui.name.textContent = e.label, e.tags) {
              this.ui.tagList.style.display = "flex";
              const s = e.tags.map(i => es.renderSync({
                  tag: i,
                  classes: $
              }));
              this.ui.tagList.replaceChildren(...s)
          }
      }
      hidePreview() {
          this.ui.emoji.replaceChildren(), this.ui.name.textContent = "", this.ui.tagList.replaceChildren()
      }
  }
  const os = new g(({
          classes: o,
          i18n: e
      }) => `
<button title="${e.get("search.clear")}" class="${o.clearSearchButton}">
  <i data-icon="xmark"></i>
</button>
`),
      is = new g(({
          classes: o,
          i18n: e
      }) => `
<div class="${o.searchContainer}">
<input class="${o.searchField}" placeholder="${e.get("search")}">
<span class="${o.searchAccessory}"></span>
</div>
`, {
          mode: "async"
      }),
      F = p("searchContainer", "searchField", "clearButton", "searchAccessory", "clearSearchButton", "notFound");
  class rs extends l {
      constructor({
          categories: e,
          emojiVersion: t
      }) {
          super({
              template: is,
              classes: F
          }), this.categories = e.filter(s => s.key !== "recents"), this.emojiVersion = t, this.search = ve(this.search.bind(this), 100)
      }
      initialize() {
          this.uiElements = {
              searchField: l.byClass(F.searchField),
              searchAccessory: l.byClass(F.searchAccessory)
          }, this.uiEvents = [l.childEvent("searchField", "keydown", this.onKeyDown), l.childEvent("searchField", "input", this.onSearchInput)], super.initialize()
      }
      async render() {
          return await super.render(), this.searchIcon = xe("search"), this.notFoundMessage = this.viewFactory.create(se, {
              message: this.i18n.get("search.notFound"),
              className: F.notFound,
              icon: "sad"
          }), this.notFoundMessage.renderSync(), this.errorMessage = this.viewFactory.create(se, {
              message: this.i18n.get("search.error")
          }), this.errorMessage.renderSync(), this.clearSearchButton = os.render({
              classes: F,
              i18n: this.i18n
          }), this.clearSearchButton.addEventListener("click", e => this.onClearSearch(e)), this.searchField = this.ui.searchField, this.showSearchIcon(), this.el
      }
      showSearchIcon() {
          this.showSearchAccessory(this.searchIcon)
      }
      showClearSearchButton() {
          this.showSearchAccessory(this.clearSearchButton)
      }
      showSearchAccessory(e) {
          this.ui.searchAccessory.replaceChildren(e)
      }
      clear() {
          this.searchField.value = "", this.showSearchIcon()
      }
      focus() {
          this.searchField.focus()
      }
      onClearSearch(e) {
          var t;
          e.stopPropagation(), this.searchField.value = "", (t = this.resultsContainer) == null || t.destroy(), this.resultsContainer = null, this.showSearchIcon(), this.events.emit("content:show"), this.searchField.focus()
      }
      handleResultsKeydown(e) {
          this.resultsContainer && e.key === "Escape" && this.onClearSearch(e)
      }
      onKeyDown(e) {
          var t;
          e.key === "Escape" && this.searchField.value ? this.onClearSearch(e) : (e.key === "Enter" || e.key === "ArrowDown") && this.resultsContainer && (e.preventDefault(), (t = this.resultsContainer.el.querySelector('[tabindex="0"]')) == null || t.focus())
      }
      onSearchInput(e) {
          this.searchField.value ? (this.showClearSearchButton(), this.search()) : this.onClearSearch(e)
      }
      async search() {
          var e;
          if (!!this.searchField.value) try {
              const t = await this.emojiData.searchEmojis(this.searchField.value, this.customEmojis, this.emojiVersion, this.categories);
              if (this.events.emit("preview:hide"), t.length) {
                  const s = new Ve;
                  this.resultsContainer = this.viewFactory.create(z, {
                      emojis: t,
                      fullHeight: !0,
                      showVariants: !0,
                      lazyLoader: s
                  }), this.resultsContainer.renderSync(), (e = this.resultsContainer) != null && e.el && (s.observe(this.resultsContainer.el), this.resultsContainer.setActive(!0, {
                      row: 0,
                      offset: 0
                  }, !1), this.resultsContainer.el.addEventListener("keydown", i => this.handleResultsKeydown(i)), this.events.emit("content:show", this.resultsContainer))
              } else this.events.emit("content:show", this.notFoundMessage)
          } catch {
              this.events.emit("content:show", this.errorMessage)
          }
      }
  }
  const as = new g(({
          classes: o
      }) => `
<div class="${o.variantOverlay}">
  <div class="${o.variantPopup}">
    <div data-view="emojis" data-render="sync"></div>
  </div>
</div>
`),
      Be = p("variantOverlay", "variantPopup"),
      oe = {
          easing: "ease-in-out",
          duration: 250,
          fill: "both"
      },
      He = {
          opacity: [0, 1]
      },
      Ne = {
          opacity: [0, 1],
          transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"]
      };
  class ns extends l {
      constructor({
          emoji: e,
          parent: t
      }) {
          super({
              template: as,
              classes: Be,
              parent: t
          }), this.focusedEmojiIndex = 0, this.focusTrap = new je, this.animateShow = () => Promise.all([S(this.el, He, oe, this.options), S(this.ui.popup, Ne, oe, this.options)]), this.emoji = e
      }
      initialize() {
          this.uiElements = {
              popup: l.byClass(Be.variantPopup)
          }, this.uiEvents = [l.uiEvent("click", this.handleClick), l.uiEvent("keydown", this.handleKeydown)], super.initialize()
      }
      animateHide() {
          const e = {
              ...oe,
              direction: "reverse"
          };
          return Promise.all([S(this.el, He, e, this.options), S(this.ui.popup, Ne, e, this.options)])
      }
      async hide() {
          await this.animateHide(), this.events.emit("variantPopup:hide")
      }
      handleKeydown(e) {
          e.key === "Escape" && (this.hide(), e.stopPropagation())
      }
      handleClick(e) {
          this.ui.popup.contains(e.target) || this.hide()
      }
      getEmoji(e) {
          return this.renderedEmojis[e]
      }
      setFocusedEmoji(e) {
          const t = this.getEmoji(this.focusedEmojiIndex);
          t.tabIndex = -1, this.focusedEmojiIndex = e;
          const s = this.getEmoji(this.focusedEmojiIndex);
          s.tabIndex = 0, s.focus()
      }
      destroy() {
          this.emojiContainer.destroy(), this.focusTrap.deactivate(), super.destroy()
      }
      renderSync() {
          const e = {
                  ...this.emoji,
                  skins: null
              },
              t = (this.emoji.skins || []).map(i => ({
                  ...i,
                  label: this.emoji.label,
                  tags: this.emoji.tags
              })),
              s = [e, ...t];
          return this.emojiContainer = this.viewFactory.create(z, {
              emojis: s,
              preview: !1
          }), super.renderSync({
              emojis: this.emojiContainer
          }), s.length < this.options.emojisPerRow && this.el.style.setProperty("--emojis-per-row", s.length.toString()), this.el
      }
      activate() {
          this.emojiContainer.setActive(!0, {
              row: 0,
              offset: 0
          }, !0), this.focusTrap.activate(this.el)
      }
  }
  const cs = new g(({
          classes: o,
          i18n: e,
          category: t,
          pickerId: s,
          icon: i
      }) => `
<li class="${o.categoryTab}">
<button
  aria-selected="false"
  role="tab"
  class="${o.categoryButton}"
  tabindex="-1"
  title="${e.get(`categories.${t.key}`,t.message||t.key)}"
  type="button"
  data-category="${t.key}"
  id="${s}-category-${t.key}"
>
  <i data-icon="${i}"></i>
</li>
`),
      ie = p("categoryTab", "categoryTabActive", "categoryButton");
  class ls extends l {
      constructor({
          category: e,
          icon: t
      }) {
          super({
              template: cs,
              classes: ie
          }), this.isActive = !1, this.category = e, this.icon = t
      }
      initialize() {
          this.uiElements = {
              button: l.byClass(ie.categoryButton)
          }, this.uiEvents = [l.childEvent("button", "click", this.selectCategory), l.childEvent("button", "focus", this.selectCategory)], super.initialize()
      }
      renderSync() {
          return super.renderSync({
              category: this.category,
              icon: this.icon
          }), this.ui.button.ariaSelected = "false", this.el
      }
      setActive(e, t = {}) {
          const {
              changeFocusable: s,
              performFocus: i,
              scroll: r
          } = {
              changeFocusable: !0,
              performFocus: !0,
              scroll: !0,
              ...t
          };
          this.el.classList.toggle(ie.categoryTabActive, e), s && (this.ui.button.tabIndex = e ? 0 : -1, this.ui.button.ariaSelected = e.toString()), e && i && (this.ui.button.focus(), r && this.events.emit("category:select", this.category.key, {
              scroll: "animate",
              focus: "button",
              performFocus: !1
          })), this.isActive = e
      }
      selectCategory() {
          this.isActive || this.events.emit("category:select", this.category.key, {
              scroll: "animate",
              focus: "button",
              performFocus: !0
          })
      }
  }
  const hs = new g(({
          classes: o
      }) => `
<ul role="tablist" class="${o.categoryButtons}">
  <div data-placeholder="tabs"></div>
</ul>
`),
      ds = p("categoryButtons");
  class ms extends l {
      constructor({
          categories: e
      }) {
          super({
              template: hs,
              classes: ds
          }), this.activeCategoryIndex = 0, this.categories = e
      }
      initialize() {
          this.keyBindings = {
              ArrowLeft: this.stepSelectedTab(-1),
              ArrowRight: this.stepSelectedTab(1)
          }, super.initialize()
      }
      renderSync() {
          return this.tabViews = this.categories.map(e => this.viewFactory.create(ls, {
              category: e,
              icon: H[e.key]
          })), super.renderSync({
              tabs: this.tabViews.map(e => e.renderSync())
          }), this.el
      }
      get currentCategory() {
          return this.categories[this.activeCategoryIndex]
      }
      get currentTabView() {
          return this.tabViews[this.activeCategoryIndex]
      }
      setActiveTab(e, t = {}) {
          if (e === this.activeCategoryIndex) return;
          const s = this.currentTabView,
              i = this.tabViews[e];
          s.setActive(!1, t), i.setActive(!0, t), this.activeCategoryIndex = e
      }
      getTargetCategory(e) {
          return e < 0 ? this.categories.length - 1 : e >= this.categories.length ? 0 : e
      }
      stepSelectedTab(e) {
          return () => {
              const t = this.activeCategoryIndex + e;
              this.setActiveTab(this.getTargetCategory(t), {
                  changeFocusable: !0,
                  performFocus: !0
              })
          }
      }
  }

  function Is(o) {}
  const us = [{
      version: 15,
      emoji: String.fromCodePoint(129768)
  }, {
      version: 14,
      emoji: String.fromCodePoint(128733)
  }, {
      version: 13,
      emoji: String.fromCodePoint(129729)
  }, {
      version: 12,
      emoji: String.fromCodePoint(129449)
  }, {
      version: 11,
      emoji: String.fromCodePoint(129463)
  }, {
      version: 5,
      emoji: String.fromCodePoint(129322)
  }, {
      version: 4,
      emoji: String.fromCodePoint(9877)
  }, {
      version: 3,
      emoji: String.fromCodePoint(129314)
  }, {
      version: 2,
      emoji: String.fromCodePoint(128488)
  }, {
      version: 1,
      emoji: String.fromCodePoint(128512)
  }];

  function gs() {
      var e;
      const o = us.find(t => ps(t.emoji));
      return (e = o == null ? void 0 : o.version) != null ? e : 1
  }

  function ps(o) {
      const e = document.createElement("canvas").getContext("2d");
      if (e) return e.textBaseline = "top", e.font = "32px Arial", e.fillText(o, 0, 0), e.getImageData(16, 16, 1, 1).data[0] !== 0
  }

  function re(o, e) {
      return Array.from({
          length: o
      }, () => e).join("")
  }

  function fs({
      showHeader: o,
      classes: e
  }) {
      return o ? `
  <header class="${e.header}">
    <div data-view="search"></div>
    <div data-view="categoryTabs" data-render="sync"></div>
  </header>
` : ""
  }

  function ys(o) {
      const {
          classes: e,
          theme: t,
          className: s = ""
      } = o;
      return `
  <div class="picmo-picker ${e.picker} ${t} ${s}">
    ${fs(o)}
    <div class="${e.content}">
      <div data-view="emojiArea"></div>
    </div>
    <div data-view="preview"></div>
  </div>
`
  }

  function vs(o) {
      const {
          emojiCount: e,
          classes: t,
          theme: s,
          className: i
      } = o, r = ({
          showSearch: m,
          classes: d
      }) => m ? `
  <div class="${d.searchSkeleton}">
    <div class="${d.searchInput} ${d.placeholder}"></div>
  </div>
` : "", a = ({
          showCategoryTabs: m,
          classes: d
      }) => m ? `
  <div class="${d.categoryTabsSkeleton}">
    ${re(10,`<div class="${d.placeholder} ${d.categoryTab}"></div>`)}
  </div>
` : "", c = ({
          showHeader: m,
          classes: d
      }) => m ? `
  <header class="${d.header}">
    ${r(o)}
    ${a(o)}
  </header>
` : "", h = ({
          showPreview: m,
          classes: d
      }) => m ? `
  <div class="${d.previewSkeleton}">
    <div class="${d.placeholder} ${d.previewEmoji}"></div>
    <div class="${d.placeholder} ${d.previewName}"></div>
    <ul class="${d.tagList}">
      ${re(3,`<li class="${d.placeholder} ${d.tag}"></li>`)}
    </ul>
  </div>
` : "";
      return `
  <div class="picmo-picker ${t.skeleton} ${t.picker} ${s} ${i}">
    ${c(o)}
    <div class="${t.contentSkeleton}">
      <div class="${t.placeholder} ${t.categoryName}"></div>
      <div class="${t.emojiGrid}">
        ${re(e,`<div class="${t.placeholder} ${t.emoji}"></div>`)}
      </div>
    </div>
    ${h(o)}
  </div>
`
  }
  const ws = new g(o => o.isLoaded ? ys(o) : vs(o)),
      K = p("picker", "skeleton", "placeholder", "searchSkeleton", "searchInput", "categoryTabsSkeleton", "categoryTab", "contentSkeleton", "categoryName", "emojiGrid", "emoji", "previewSkeleton", "previewEmoji", "previewName", "tagList", "tag", "overlay", "content", "fullHeight", "pluginContainer", "header"),
      q = {
          emojisPerRow: "--emojis-per-row",
          visibleRows: "--row-count",
          emojiSize: "--emoji-size"
      };
  class Oe extends l {
      constructor() {
          super({
              template: ws,
              classes: K
          }), this.pickerReady = !1, this.externalEvents = new At, this.updaters = {
              styleProperty: e => t => this.el.style.setProperty(q[e], t.toString()),
              theme: e => {
                  this.el.classList.remove(this.options.theme), this.el.classList.add(e)
              },
              className: e => {
                  this.options.className && this.el.classList.remove(this.options.className), this.el.classList.add(e)
              },
              emojisPerRow: this.updateStyleProperty.bind(this, "emojisPerRow"),
              emojiSize: this.updateStyleProperty.bind(this, "emojiSize"),
              visibleRows: this.updateStyleProperty.bind(this, "visibleRows")
          }
      }
      initialize() {
          this.uiElements = {
              pickerContent: l.byClass(K.content),
              header: l.byClass(K.header)
          }, this.uiEvents = [l.uiEvent("keydown", this.handleKeyDown)], this.appEvents = {
              error: this.onError,
              reinitialize: this.reinitialize,
              "data:ready": this.onDataReady,
              "content:show": this.showContent,
              "variantPopup:hide": this.hideVariantPopup,
              "emoji:select": this.selectEmoji
          }, super.initialize(), this.options.recentsProvider
      }
      destroy() {
          var e, t;
          super.destroy(), (e = this.search) == null || e.destroy(), this.emojiArea.destroy(), (t = this.categoryTabs) == null || t.destroy(), this.events.removeAll(), this.externalEvents.removeAll()
      }
      clearRecents() {
          this.options.recentsProvider.clear()
      }
      addEventListener(e, t) {
          this.externalEvents.on(e, t)
      }
      removeEventListener(e, t) {
          this.externalEvents.off(e, t)
      }
      initializePickerView() {
          this.pickerReady && (this.showContent(), this.emojiArea.reset(!1))
      }
      handleKeyDown(e) {
          const t = e.ctrlKey || e.metaKey;
          e.key === "s" && t && this.search && (e.preventDefault(), this.search.focus())
      }
      buildChildViews() {
          return this.options.showPreview && (this.preview = this.viewFactory.create(ss)), this.options.showSearch && (this.search = this.viewFactory.create(rs, {
              categories: this.categories,
              emojiVersion: this.emojiVersion
          })), this.options.showCategoryTabs && (this.categoryTabs = this.viewFactory.create(ms, {
              categories: this.categories
          })), this.currentView = this.emojiArea = this.viewFactory.create(Jt, {
              categoryTabs: this.categoryTabs,
              categories: this.categories,
              emojiVersion: this.emojiVersion
          }), [this.preview, this.search, this.emojiArea, this.categoryTabs]
      }
      setStyleProperties() {
          this.options.showSearch || this.el.style.setProperty("--search-height-full", "0px"), this.options.showCategoryTabs || (this.el.style.setProperty("--category-tabs-height", "0px"), this.el.style.setProperty("--category-tabs-offset", "0px")), this.options.showPreview || this.el.style.setProperty("--emoji-preview-height-full", "0px"), Object.keys(q).forEach(e => {
              this.options[e] && this.el.style.setProperty(q[e], this.options[e].toString())
          })
      }
      updateStyleProperty(e, t) {
          this.el.style.setProperty(q[e], t.toString())
      }
      reinitialize() {
          this.renderSync()
      }
      onError(e) {
          const t = this.viewFactory.create(Zt, {
                  message: this.i18n.get("error.load")
              }),
              s = this.el.offsetHeight || 375;
          throw this.el.style.height = `${s}px`, this.el.replaceChildren(t.renderSync()), e
      }
      async onDataReady(e) {
          const t = this.el;
          try {
              e ? this.emojiData = e : await this.emojiDataPromise, this.options.emojiVersion === "auto" ? this.emojiVersion = gs() || parseFloat(u) : this.emojiVersion = this.options.emojiVersion, this.categories = await this.emojiData.getCategories(this.options);
              const [s, i, r, a] = this.buildChildViews();
              await super.render({
                  isLoaded: !0,
                  search: i,
                  categoryTabs: a,
                  emojiArea: r,
                  preview: s,
                  showHeader: Boolean(this.search || this.categoryTabs),
                  theme: this.options.theme,
                  className: this.options.className
              }), this.el.style.setProperty("--category-count", this.categories.length.toString()), this.pickerReady = !0, t.replaceWith(this.el), this.setStyleProperties(), this.initializePickerView(), this.setInitialFocus(), this.externalEvents.emit("data:ready")
          } catch (s) {
              this.events.emit("error", s)
          }
      }
      renderSync() {
          if (super.renderSync({
                  isLoaded: !1,
                  theme: this.options.theme,
                  showSearch: this.options.showSearch,
                  showPreview: this.options.showPreview,
                  showCategoryTabs: this.options.showCategoryTabs,
                  showHeader: this.options.showSearch || this.options.showCategoryTabs,
                  emojiCount: this.options.emojisPerRow * this.options.visibleRows
              }), !this.options.rootElement) throw new Error("Picker must be given a root element via the rootElement option");
          return this.options.rootElement.replaceChildren(this.el), this.setStyleProperties(), this.pickerReady && this.initializePickerView(), this.el
      }
      getInitialFocusTarget() {
          if (typeof this.options.autoFocus < "u") switch (this.options.autoFocus) {
              case "emojis":
                  return this.emojiArea.focusableEmoji;
              case "search":
                  return this.search;
              case "auto":
                  return this.search || this.emojiArea.focusableEmoji;
              default:
                  return null
          }
          if (this.options.autoFocusSearch === !0) return console.warn("options.autoFocusSearch is deprecated, please use options.focusTarget instead"), this.search
      }
      setInitialFocus() {
          var e;
          !this.pickerReady || (e = this.getInitialFocusTarget()) == null || e.focus()
      }
      reset() {
          var e;
          this.pickerReady && (this.emojiArea.reset(), this.showContent(this.emojiArea)), (e = this.search) == null || e.clear(), this.hideVariantPopup()
      }
      showContent(e = this.emojiArea) {
          var t, s;
          e !== this.currentView && (this.currentView !== this.emojiArea && ((t = this.currentView) == null || t.destroy()), this.ui.pickerContent.classList.toggle(K.fullHeight, e !== this.emojiArea), this.ui.pickerContent.replaceChildren(e.el), this.currentView = e, e === this.emojiArea ? (this.emojiArea.reset(), this.categoryTabs && this.ui.header.appendChild(this.categoryTabs.el)) : (s = this.categoryTabs) == null || s.el.remove())
      }
      hideVariantPopup() {
          var e;
          (e = this.variantPopup) == null || e.destroy()
      }
      isPickerClick(e) {
          var r, a;
          const t = e.target,
              s = this.el.contains(t),
              i = (a = (r = this.variantPopup) == null ? void 0 : r.el) == null ? void 0 : a.contains(t);
          return s || i
      }
      async selectEmoji({
          emoji: e
      }) {
          var t, s;
          ((t = e.skins) == null ? void 0 : t.length) && this.options.showVariants && !this.isVariantPopupOpen ? this.showVariantPopup(e) : (await ((s = this.variantPopup) == null ? void 0 : s.animateHide()), this.events.emit("variantPopup:hide"), await this.emitEmoji(e))
      }
      get isVariantPopupOpen() {
          return this.variantPopup && !this.variantPopup.isDestroyed
      }
      async showVariantPopup(e) {
          const t = document.activeElement;
          this.events.once("variantPopup:hide", () => {
              t == null || t.focus()
          }), this.variantPopup = this.viewFactory.create(ns, {
              emoji: e,
              parent: this.el
          }), this.el.appendChild(this.variantPopup.renderSync()), this.variantPopup.activate()
      }
      async emitEmoji(e) {
          this.externalEvents.emit("emoji:select", await this.renderer.doEmit(e)), this.options.recentsProvider.addOrUpdateRecent(e, this.options.maxRecents), this.events.emit("recent:add", e)
      }
      updateOptions(e) {
          Object.keys(e).forEach(t => {
              this.updaters[t](e[t])
          }), Object.assign(this.options, e)
      }
  }
  class bs {
      constructor({
          events: e,
          i18n: t,
          renderer: s,
          emojiData: i,
          options: r,
          customEmojis: a = [],
          pickerId: c
      }) {
          this.events = e, this.i18n = t, this.renderer = s, this.emojiData = i, this.options = r, this.customEmojis = a, this.pickerId = c
      }
      setEmojiData(e) {
          this.emojiData = Promise.resolve(e)
      }
      create(e, ...t) {
          const s = new e(...t);
          return s.setPickerId(this.pickerId), s.setEvents(this.events), s.setI18n(this.i18n), s.setRenderer(this.renderer), s.setEmojiData(this.emojiData), s.setOptions(this.options), s.setCustomEmojis(this.customEmojis), s.viewFactory = this, s.initialize(), s
      }
  }
  class Cs {
      constructor(e = {}) {
          w(this, V, void 0);
          G(this, V, new Map(Object.entries(e)))
      }
      get(e, t = e) {
          return v(this, V).get(e) || t
      }
  }
  V = new WeakMap;

  function js(o, e) {
      e === void 0 && (e = {});
      var t = e.insertAt;
      if (!(!o || typeof document > "u")) {
          var s = document.head || document.getElementsByTagName("head")[0],
              i = document.createElement("style");
          i.type = "text/css", t === "top" && s.firstChild ? s.insertBefore(i, s.firstChild) : s.appendChild(i), i.styleSheet ? i.styleSheet.cssText = o : i.appendChild(document.createTextNode(o))
      }
  }

  function Ue() {
      let o = !1;
      return function(t) {
          Te.injectStyles && !o && (js(t), o = !0)
      }
  }
  const ks = `.picmo-picker .icon {
	width: 1.25em;
	height: 1em;
	fill: currentColor
}

.icon-small {
	font-size: .8em
}

.icon-medium {
	font-size: 1em
}

.icon-large {
	font-size: 1.25em
}

.icon-2x {
	font-size: 2em
}

.icon-3x {
	font-size: 3em
}

.icon-4x {
	font-size: 4em
}

.icon-5x {
	font-size: 5em
}

.icon-8x {
	font-size: 8em
}

.icon-10x {
	font-size: 10em
}

.light,.auto {
	color-scheme: light;
	--accent-color: #4f46e5;
	--background-color: #f9fafb;
	--border-color: #cccccc;
	--category-name-background-color: #f9fafb;
	--category-name-button-color: #999999;
	--category-name-text-color: hsl(214, 30%, 50%);
	--category-tab-active-background-color: rgba(255, 255, 255, .6);
	--category-tab-active-color: var(--accent-color);
	--category-tab-color: #666;
	--category-tab-highlight-background-color: rgba(0, 0, 0, .15);
	--error-color-dark: hsl(0, 100%, 45%);
	--error-color: hsl(0, 100%, 40%);
	--focus-indicator-background-color: hsl(198, 65%, 85%);
	--focus-indicator-color: #333333;
	--hover-background-color: #c7d2fe;
	--placeholder-background-color: #cccccc;
	--preview-background-color: var(--secondary-background-color);
	--scrollbar-background-color: var(--background-color);
	--scrollbar-color: rgba(0, 0, 0, .75);
	--search-background-color: #f9fafb;
	--search-focus-background-color: #ffffff;
	--search-icon-color: #999999;
	--search-placeholder-color: #71717a;
	--secondary-background-color: #e2e8f0;
	--secondary-text-color: #666666;
	--tag-background-color: rgba(162, 190, 245, .3);
	--text-color: #000000;
	--variant-popup-background-color: #ffffff
}

.dark {
	color-scheme: dark;
	--accent-color: #535374;
	--background-color: #2b2b34;
	--border-color: #666666;
	--category-name-background-color: #2b2b34;
	--category-name-button-color: #eeeeee;
	--category-name-text-color: #ffffff;
	--category-tab-active-background-color: #000000;
	--category-tab-active-color: var(--accent-color);
	--category-tab-color: #cccccc;
	--category-tab-highlight-background-color: #4A4A4A;
	--error-color-dark: hsl(0, 7%, 3%);
	--error-color: hsl(0, 30%, 60%);
	--focus-indicator-background-color: hsl(0, 0%, 50%);
	--focus-indicator-color: #999999;
	--hover-background-color: hsla(0, 0%, 40%, .85);
	--image-placeholder-color: #ffffff;
	--placeholder-background-color: #666666;
	--search-background-color:#27272b;
	--search-focus-background-color: #52525b;
	--search-icon-color: #cccccc;
	--search-placeholder-color:rgb(186, 186, 190);
	--secondary-background-color: #000000;
	--secondary-text-color: #999999;
	--tag-background-color: rgba(162, 190, 245, .3);
	--text-color: #ffffff;
	--variant-popup-background-color: #333333
}

@media (prefers-color-scheme: dark) {
	.auto {
		color-scheme: dark;
		--accent-color: #A580F9;
		--background-color: #333333;
		--border-color: #666666;
		--category-name-background-color: #333333;
		--category-name-button-color: #eeeeee;
		--category-name-text-color: #ffffff;
		--category-tab-active-background-color: #000000;
		--category-tab-active-color: var(--accent-color);
		--category-tab-color: #cccccc;
		--category-tab-highlight-background-color: #4A4A4A;
		--error-color-dark: hsl(0, 7%, 3%);
		--error-color: hsl(0, 30%, 60%);
		--focus-indicator-background-color: hsl(0, 0%, 50%);
		--focus-indicator-color: #999999;
		--hover-background-color: hsla(0, 0%, 40%, .85);
		--image-placeholder-color: #ffffff;
		--placeholder-background-color: #666666;
		--search-background-color: #71717a;
		--search-focus-background-color: #52525b;
		--search-icon-color: #cccccc;
		--search-placeholder-color: #d4d4d8;
		--secondary-background-color: #000000;
		--secondary-text-color: #999999;
		--tag-background-color: rgba(162, 190, 245, .3);
		--text-color: #ffffff;
		--variant-popup-background-color: #333333
	}
}

.picmo-picker .categoryButtons {
	--tab-size-ratio: 1.55;
	--tab-padding: .5em;
	--tab-area-width: calc(var(--picker-width) - (var(--tab-padding) * 2));
	--tab-size: calc((var(--tab-area-width) / var(--category-count))) / var(--tab-size-ratio);
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	gap: var(--tab-gap);
	justify-content: center;
	margin: 0;
	padding: 0 var(--tab-padding);
	align-items: center;
	height: var(--category-tabs-height);
	box-sizing: border-box;
	position: relative;
	list-style-type: none
}

.picmo-picker .categoryButtons .categoryTab {
	display: flex;
	align-items: center;
	justify-content: stretch;
	transition: all .1s
}

.picmo-picker .categoryButtons .categoryTab.categoryTabActive .categoryButton {
    color: #ffffff;
    background: #414141;
    border: 2px solid #615e69;
}

.picmo-picker .categoryButtons .categoryTab.categoryTabActive .categoryButton:hover {
	background-color: var(--category-tab-active-background-color)
}

.picmo-picker .categoryButtons .categoryTab button.categoryButton {
	border-radius: 5px;
	background: transparent;
	border: 2px solid transparent;
	color: var(--category-tab-color);
	cursor: pointer;
	padding: 2px;
	vertical-align: middle;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.2rem;
	font-size: min(var(--tab-size),1.2rem);
	width: 1.6em;
	height: 1.6em;
	transition: all .1s
}

.picmo-picker .categoryButtons .categoryTab button.categoryButton:is(img) {
	width: var(--category-tab-size);
	height: var(--category-tab-size)
}

.picmo-picker .categoryButtons .categoryTab button.categoryButton:hover {
	background: var(--category-tab-highlight-background-color)
}

.dataError [data-icon] {
	opacity: .8
}

@keyframes appear {
	0% {
		opacity: 0
	}

	to {
		opacity: .8
	}
}

@keyframes appear-grow {
	0% {
		opacity: 0;
		transform: scale(.8)
	}

	to {
		opacity: .8;
		transform: scale(1)
	}
}

.picmo-picker .error {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--secondary-text-color)
}

.picmo-picker .error .iconContainer {
	opacity: .8;
	animation: appear-grow .25s cubic-bezier(.175,.885,.32,1.275);
	--color-primary: var(--error-color);
	--color-secondary: var(--error-color-dark)
}

.picmo-picker .error .title {
	animation: appear .25s;
	animation-delay: 50ms;
	animation-fill-mode: both
}

.picmo-picker .error button {
	padding: 8px 16px;
	cursor: pointer;
	background: var(--background-color);
	border: 1px solid var(--text-color);
	border-radius: 5px;
	color: var(--text-color)
}

.picmo-picker .error button:hover {
	background: var(--text-color);
	color: var(--background-color)
}

.emojiButton {
	background: transparent;
	border: none;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	font-family: var(--emoji-font);
	font-size: var(--emoji-size);
	height: 100%;
	justify-content: center;
	align-items: center;
	margin: 0;
	overflow: hidden;
	padding: 0;
	width: 100%
}

.emojiButton:hover {
	background: var(--hover-background-color)
}

.emojiButton:focus {
	border-radius: 0;
	background: var(--focus-indicator-background-color);
	outline: 1px soldi var(--focus-indicator-color)
}

.picmo-picker .emojiArea {
	height: var(--emoji-area-height);
	overflow-y: auto;
	position: relative;
	scrollbar-color: var(--scrollbar-color) var(--scrollbar-background-color);
	scrollbar-width: thin
}

.picmo-picker .emojiArea::-webkit-scrollbar {
	background: var(--scrollbar-background-color);
	width: 1.1em
}

.picmo-picker .emojiArea::-webkit-scrollbar-thumb {
	background: var(--scrollbar-color);
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	background-clip: padding-box;
	height: 1em;
	border-radius: 1em
}

.picmo-picker .emojiCategory {
	position: relative
}

.picmo-picker .emojiCategory .categoryName {
	font-size: .9em;
	padding: .5rem;
	margin: 0;
	background: var(--category-name-background-color);
	color: var(--category-name-text-color);
	top: 0;
	z-index: 1;
	display: grid;
	gap: 4px;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	line-height: 1;
	box-sizing: border-box;
	height: var(--category-name-height);
	justify-content: flex-start;
	text-transform: uppercase
}

.picmo-picker .emojiCategory .categoryName button {
	background: transparent;
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;
	color: var(--category-name-button-color)
}

.picmo-picker .emojiCategory .categoryName button:hover {
	opacity: 1
}

.picmo-picker .emojiCategory .noRecents {
	color: var(--secondary-text-color);
	grid-column: 1 / span var(--emojis-per-row);
	font-size: .9em;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: calc(var(--emoji-size) * var(--emoji-size-multiplier))
}

.picmo-picker .emojiCategory .recentEmojis[data-empty=true] {
	display: none
}

:is(.picmo-picker .emojiCategory) .recentEmojis[data-empty=false]+div {
	display: none
}

.picmo-picker .emojiContainer {
	display: grid;
	justify-content: space-between;
	gap: 1px;
	padding: 0 .5em;
	grid-template-columns: repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));
	grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));
	align-items: center;
	justify-items: center
}

.picmo-picker.picker {
	--border-radius: 5px;
	--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );
	--content-height: var(--emoji-area-height);
	--emojis-per-row: 8;
	--row-count: 6;
	--emoji-preview-margin: 4px;
	--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);
	--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));
	--emoji-preview-size: 2em;
	--emoji-size: 1.5rem;
	--emoji-size-multiplier: 1.3;
	--content-margin: 8px;
	--category-tabs-height: calc(1.5em + 9px);
	--category-tabs-offset: 8px;
	--category-tab-size: 1.2rem;
	--category-name-height: 2rem;
	--category-name-padding-y: 6px;
	--search-height: 2em;
	--search-margin: .5em;
	--search-margin-bottom: 4px;
	--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));
	--overlay-background-color: rgba(0, 0, 0, .8);
	--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";
	--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
	--ui-font-size: 14px;
	--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 4.4rem);
	background: var(--background-color);
	border-radius: var(--border-radius);
	border: 1px solid var(--border-color);
	font-family: var(--ui-font);
	font-size: var(--ui-font-size);
	overflow: hidden;
	position: relative;
	width: var(--picker-width);
	display: grid;
	gap: 8px
}

.picmo-picker.picker>* {
	font-family: var(--ui-font)
}

.picmo-picker.skeleton {
	background: var(--background-color);
	border-radius: var(--border-radius);
	border: 1px solid var(--border-color);
	font-family: var(--ui-font);
	width: var(--picker-width);
	color: var(--secondary-text-color)
}

.picmo-picker.skeleton * {
	box-sizing: border-box
}

.picmo-picker.skeleton .placeholder {
	background: var(--placeholder-background-color);
	position: relative;
	overflow: hidden
}

.picmo-picker.skeleton .placeholder:after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translate(-100%);
	background-image: linear-gradient(90deg,rgba(#fff,0) 0,rgba(#fff,.2) 20%,rgba(#fff,.5) 60%,rgba(#fff,0));
	animation: shine 2s infinite;
	content: ""
}

.picmo-picker.skeleton .searchSkeleton {
	padding: 0 8px;
	height: var(--search-height)
}

.picmo-picker.skeleton .searchSkeleton .searchInput {
	width: 100%;
	height: 28px;
	border-radius: 3px
}

.picmo-picker.skeleton .categoryTabsSkeleton {
	height: var(--category-tabs-height);
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center
}

.picmo-picker.skeleton .categoryTabsSkeleton .categoryTab {
	width: 25px;
	height: 25px;
	padding: 2px;
	border-radius: 5px
}

.picmo-picker.skeleton .contentSkeleton {
	height: var(--content-height);
	padding-right: 8px;
	opacity: .7
}

.picmo-picker.skeleton .contentSkeleton .categoryName {
	width: 50%;
	height: 1rem;
	margin: .5rem;
	box-sizing: border-box
}

.picmo-picker.skeleton .contentSkeleton .emojiGrid {
	display: grid;
	justify-content: space-between;
	gap: 1px;
	padding: 0 .5em;
	grid-template-columns: repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));
	grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));
	align-items: center;
	justify-items: center
}

.picmo-picker.skeleton .contentSkeleton .emojiGrid .emoji {
	width: var(--emoji-size);
	height: var(--emoji-size);
	border-radius: 50%
}

.picmo-picker.skeleton .previewSkeleton {
	height: var(--emoji-preview-height);
	border-top: 1px solid var(--border-color);
	display: grid;
	align-items: center;
	padding: .5em;
	gap: 6px;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas: "emoji name" "emoji tags"
}

.picmo-picker.skeleton .previewSkeleton .previewEmoji {
	grid-area: emoji;
	border-radius: 50%;
	width: var(--emoji-preview-size);
	height: var(--emoji-preview-size)
}

.picmo-picker.skeleton .previewSkeleton .previewName {
	grid-area: name;
	width: 12em;
	height: .8em
}

.picmo-picker.skeleton .previewSkeleton .tagList {
	grid-area: tags;
	list-style-type: none;
	display: flex;
	flex-direction: row;
	padding: 0;
	margin: 0
}

.picmo-picker.skeleton .previewSkeleton .tagList .tag {
	border-radius: 3px;
	padding: 2px 8px;
	margin-right: .25em;
	height: 1em;
	width: 3em
}

.overlay {
	background: rgba(0,0,0,.75);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000
}

.content {
	position: relative;
	overflow: hidden;
	height: var(--content-height)
}

.content.fullHeight {
	height: calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));
	overflow-y: auto;
	scrollbar-color: var(--scrollbar-color) var(--scrollbar-background-color);
	scrollbar-width: thin
}

.content.fullHeight::-webkit-scrollbar {
	background: var(--scrollbar-background-color);
	width: 1.1em
}

.content.fullHeight::-webkit-scrollbar-thumb {
	background: var(--scrollbar-color);
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	background-clip: padding-box;
	height: 1em;
	border-radius: 1em
}

.pluginContainer {
	margin: .5em;
	display: flex;
	flex-direction: row
}

.header {
	background-color: var(--background-color);
	padding-top: 8px;
	padding-bottom: 8px;
	display: grid;
	gap: 8px;
	border-bottom: 1px solid var(--border-color)
}

@media (prefers-reduced-motion: reduce) {
	.placeholder {
		background: var(--placeholder-background-color);
		position: relative;
		overflow: hidden
	}

	.placeholder:after {
		display: none
	}
}

.picmo-picker .preview {
	border-top: 1px solid var(--border-color);
	display: grid;
	align-items: center;
	gap: 6px;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas: "emoji name" "emoji tags";
	height: var(--emoji-preview-height);
	box-sizing: border-box;
	padding: .5em;
	position: relative;
	background: var(--preview-background-color)
}

.picmo-picker .preview .previewEmoji {
	grid-area: emoji;
	font-size: var(--emoji-preview-size);
	font-family: var(--emoji-font);
	width: 1.25em;
	display: flex;
	align-items: center;
	justify-content: center
}

.picmo-picker .preview .previewName {
	grid-area: name;
	color: var(--text-color);
	font-size: .8em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 500
}

.picmo-picker .preview .tagList {
	grid-area: tags;
	list-style-type: none;
	display: flex;
	flex-direction: row;
	padding: 0;
	margin: 0;
	font-size: .75em;
	overflow: hidden
}

.picmo-picker .preview .tag {
	border-radius: 3px;
	background: var(--tag-background-color);
	color: var(--text-color);
	padding: 2px 8px;
	margin-right: .25em;
	white-space: nowrap
}

.picmo-picker .preview .tag:last-child {
	margin-right: 0
}

.picmo-picker .searchContainer {
	display: flex;
	height: var(--search-height);
	box-sizing: border-box;
	padding: 0 8px;
	position: relative
}

.picmo-picker .searchContainer .searchField {
	background: var(--search-background-color);
	border-radius: 3px;
	border: none;
	box-sizing: border-box;
	color: var(--text-color);
	font-size: .9em;
	outline: none;
	padding: .5em 2.25em .5em .5em;
	width: 100%
}

.picmo-picker .searchContainer .searchField:focus {
	background: var(--search-focus-background-color)
}

.picmo-picker .searchContainer .searchField::placeholder {
	color: var(--search-placeholder-color)
}

.picmo-picker .searchContainer .searchAccessory {
	color: var(--search-icon-color);
	height: 100%;
	position: absolute;
	right: 1em;
	top: 0;
	width: 1.25rem;
	display: flex;
	align-items: center
}

.picmo-picker .searchContainer .searchAccessory svg {
	fill: var(--search-icon-color)
}

.picmo-picker .searchContainer .clearButton {
	border: 0;
	color: var(--search-icon-color);
	background: transparent;
	cursor: pointer
}

.picmo-picker .searchContainer .clearSearchButton {
	cursor: pointer;
	border: none;
	background: transparent;
	color: var(--search-icon-color);
	font-size: 1em;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0
}

.picmo-picker .searchContainer .notFound [data-icon] {
	fill: #f3e265
}

.picmo-picker .variantOverlay {
	background: var(--overlay-background-color);
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1
}

.picmo-picker .variantOverlay .variantPopup {
	background: var(--variant-popup-background-color);
	border-radius: 5px;
	margin: .5em;
	padding: .5em;
	text-align: center;
	user-select: none;
	display: flex;
	align-items: center;
	justify-content: center
}

.customEmoji {
	width: 1em;
	height: 1em
}

@keyframes shine {
	to {
		transform: translate(100%)
	}
}

.picmo-picker .imagePlaceholder {
	width: 2rem;
	height: 2rem;
	border-radius: 50%
}

.placeholder {
	background: #DDDBDD;
	position: relative
}

.placeholder:after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translate(-100%);
	background-image: linear-gradient(90deg,rgba(#fff,0) 0,rgba(#fff,.2) 20%,rgba(#fff,.5) 60%,rgba(#fff,0));
	animation: shine 2s infinite;
	content: ""
}
`;

  function Es(o) {
      return Y(o.locale, o.dataStore, o.messages, o.emojiData)
  }
  let xs = 0;

  function Ss() {
      return `picmo-${Date.now()}-${xs++}`
  }
  const Ps = Ue();

  function zs(o) {
      Ps(ks);
      const e = Ie(o),
          t = ((e == null ? void 0 : e.custom) || []).map(h => ({
              ...h,
              custom: !0,
              tags: ["custom", ...h.tags || []]
          })),
          s = new Lt,
          i = Es(e),
          r = new Cs(e.i18n);
      i.then(h => {
          s.emit("data:ready", h)
      }).catch(h => {
          s.emit("error", h)
      });
      const c = new bs({
          events: s,
          i18n: r,
          customEmojis: t,
          renderer: e.renderer,
          options: e,
          emojiData: i,
          pickerId: Ss()
      }).create(Oe);
      return c.renderSync(), c
  }
  const ae = {};

  function Ke(o) {
      return ae[o] || (ae[o] = new $s(o)), ae[o]
  }
  Ke.deleteDatabase = o => {};
  class $s extends $e {
      open() {
          return Promise.resolve()
      }
      delete() {
          return Promise.resolve()
      }
      close() {}
      isPopulated() {
          return Promise.resolve(!1)
      }
      getEmojiCount() {
          return Promise.resolve(this.emojis.length)
      }
      getEtags() {
          return Promise.resolve({
              foo: "bar"
          })
      }
      getHash() {
          return Promise.resolve("")
      }
      populate(e) {
          return this.categories = e.groups, this.emojis = e.emojis, Promise.resolve()
      }
      getCategories(e) {
          var s;
          let t = this.categories.filter(i => i.key !== "component");
          if (e.showRecents && t.unshift({
                  key: "recents",
                  order: -1
              }), (s = e.custom) != null && s.length && t.push({
                  key: "custom",
                  order: 10
              }), e.categories) {
              const i = e.categories;
              t = t.filter(r => i.includes(r.key)), t.sort((r, a) => i.indexOf(r.key) - i.indexOf(a.key))
          } else t.sort((i, r) => i.order - r.order);
          return Promise.resolve(t)
      }
      getEmojis(e, t) {
          const s = this.emojis.filter(i => i.group === e.order).filter(i => i.version <= t).sort((i, r) => i.order != null && r.order != null ? i.order - r.order : 0).map(P);
          return Promise.resolve(N(s, t))
      }
      searchEmojis(e, t, s, i) {
          const r = this.emojis.filter(h => O(h, e, i)).map(P),
              a = t.filter(h => O(h, e, i)),
              c = [...N(r, s), ...a];
          return Promise.resolve(c)
      }
      setMeta(e) {
          this.meta = e
      }
  }
  class Fs extends Le {
      constructor() {
          super(sessionStorage)
      }
  }
  async function Ls(o, e, t, s) {
      (await Y(o, e, t, s)).close()
  }
  n.EmojiPicker = Oe, n.Events = U, n.FocusTrap = je, n.InMemoryStoreFactory = Ke, n.IndexedDbStoreFactory = X, n.LocalStorageProvider = Ae, n.NativeRenderer = Pe, n.RecentsProvider = Fe, n.Renderer = Se, n.SessionStorageProvider = Fs, n.animate = S, n.autoTheme = ot, n.caseInsensitiveIncludes = J, n.computeHash = we, n.createDatabase = Ls, n.createPicker = zs, n.createStyleInjector = Ue, n.darkTheme = st, n.debounce = ve, n.deleteDatabase = tt, n.en = ze, n.getEmojiForEvent = M, n.getOptions = Ie, n.getPrefixedClasses = p, n.globalConfig = Te, n.lightTheme = ke, n.prefixClassName = B, n.shouldAnimate = W, n.throttle = ye, n.toElement = D, Object.defineProperties(n, {
      __esModule: {
          value: !0
      },
      [Symbol.toStringTag]: {
          value: "Module"
      }
  })
});