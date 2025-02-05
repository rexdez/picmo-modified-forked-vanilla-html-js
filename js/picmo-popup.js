(function(T, b) {
    typeof exports == "object" && typeof module < "u" ? b(exports, require("picmo")) : typeof define == "function" && define.amd ? define(["exports", "picmo"], b) : (T = typeof globalThis < "u" ? globalThis : T || self, b(T.picmoPopup = {}, T.picmo))
})(this, function(T, b) {
    "use strict";

    function D(t) {
        return t.split("-")[0]
    }

    function j(t) {
        return t.split("-")[1]
    }

    function $(t) {
        return ["top", "bottom"].includes(D(t)) ? "x" : "y"
    }

    function et(t) {
        return t === "y" ? "height" : "width"
    }

    function nt(t, e, n) {
        let {
            reference: i,
            floating: o
        } = t;
        const r = i.x + i.width / 2 - o.width / 2,
            c = i.y + i.height / 2 - o.height / 2,
            s = $(e),
            l = et(s),
            a = i[l] / 2 - o[l] / 2,
            h = D(e),
            f = s === "x";
        let u;
        switch (h) {
            case "top":
                u = {
                    x: r,
                    y: i.y - o.height
                };
                break;
            case "bottom":
                u = {
                    x: r,
                    y: i.y + i.height
                };
                break;
            case "right":
                u = {
                    x: i.x + i.width,
                    y: c
                };
                break;
            case "left":
                u = {
                    x: i.x - o.width,
                    y: c
                };
                break;
            default:
                u = {
                    x: i.x,
                    y: i.y
                }
        }
        switch (j(e)) {
            case "start":
                u[s] -= a * (n && f ? -1 : 1);
                break;
            case "end":
                u[s] += a * (n && f ? -1 : 1);
                break
        }
        return u
    }
    const xt = async (t, e, n) => {
        const {
            placement: i = "bottom",
            strategy: o = "absolute",
            middleware: r = [],
            platform: c
        } = n, s = await (c.isRTL == null ? void 0 : c.isRTL(e));
        // if (process.env.NODE_ENV !== "production" && (c == null && console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" ")), r.filter(p => {
        //         let {
        //             name: d
        //         } = p;
        //         return d === "autoPlacement" || d === "flip"
        //     }).length > 1)) throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
        let l = await c.getElementRects({
                reference: t,
                floating: e,
                strategy: o
            }),
            {
                x: a,
                y: h
            } = nt(l, i, s),
            f = i,
            u = {},
            m = 0;
        for (let p = 0; p < r.length; p++) {
            const {
                name: d,
                fn: w
            } = r[p], {
                x: y,
                y: g,
                data: x,
                reset: v
            } = await w({
                x: a,
                y: h,
                initialPlacement: i,
                placement: f,
                strategy: o,
                middlewareData: u,
                rects: l,
                platform: c,
                elements: {
                    reference: t,
                    floating: e
                }
            });
            if (a = y != null ? y : a, h = g != null ? g : h, u = {
                    ...u,
                    [d]: {
                        ...u[d],
                        ...x
                    }
                }, m > 50 && console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" ")), v && m <= 50) {
                m++, typeof v == "object" && (v.placement && (f = v.placement), v.rects && (l = v.rects === !0 ? await c.getElementRects({
                    reference: t,
                    floating: e,
                    strategy: o
                }) : v.rects), {
                    x: a,
                    y: h
                } = nt(l, f, s)), p = -1;
                continue
            }
        }
        return {
            x: a,
            y: h,
            placement: f,
            strategy: o,
            middlewareData: u
        }
    };

    function bt(t) {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...t
        }
    }

    function Et(t) {
        return typeof t != "number" ? bt(t) : {
            top: t,
            right: t,
            bottom: t,
            left: t
        }
    }

    function H(t) {
        return {
            ...t,
            top: t.y,
            left: t.x,
            right: t.x + t.width,
            bottom: t.y + t.height
        }
    }
    async function Q(t, e) {
        var n;
        e === void 0 && (e = {});
        const {
            x: i,
            y: o,
            platform: r,
            rects: c,
            elements: s,
            strategy: l
        } = t, {
            boundary: a = "clippingAncestors",
            rootBoundary: h = "viewport",
            elementContext: f = "floating",
            altBoundary: u = !1,
            padding: m = 0
        } = e, p = Et(m), w = s[u ? f === "floating" ? "reference" : "floating" : f], y = H(await r.getClippingRect({
            element: (n = await (r.isElement == null ? void 0 : r.isElement(w))) == null || n ? w : w.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(s.floating)),
            boundary: a,
            rootBoundary: h,
            strategy: l
        })), g = H(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: f === "floating" ? {
                ...c.floating,
                x: i,
                y: o
            } : c.reference,
            offsetParent: await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(s.floating)),
            strategy: l
        }) : c[f]);
        return {
            top: y.top - g.top + p.top,
            bottom: g.bottom - y.bottom + p.bottom,
            left: y.left - g.left + p.left,
            right: g.right - y.right + p.right
        }
    }
    const Ct = Math.min,
        Pt = Math.max;

    function ot(t, e, n) {
        return Pt(t, Ct(e, n))
    }
    const At = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

    function z(t) {
        return t.replace(/left|right|bottom|top/g, e => At[e])
    }

    function it(t, e, n) {
        n === void 0 && (n = !1);
        const i = j(t),
            o = $(t),
            r = et(o);
        let c = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
        return e.reference[r] > e.floating[r] && (c = z(c)), {
            main: c,
            cross: z(c)
        }
    }
    const Ot = {
        start: "end",
        end: "start"
    };

    function Z(t) {
        return t.replace(/start|end/g, e => Ot[e])
    }
    const Lt = ["top", "right", "bottom", "left"].reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);

    function kt(t, e, n) {
        return (t ? [...n.filter(o => j(o) === t), ...n.filter(o => j(o) !== t)] : n.filter(o => D(o) === o)).filter(o => t ? j(o) === t || (e ? Z(o) !== o : !1) : !0)
    }
    const Rt = function(t) {
        return t === void 0 && (t = {}), {
            name: "autoPlacement",
            options: t,
            async fn(e) {
                var n, i, o, r, c;
                const {
                    x: s,
                    y: l,
                    rects: a,
                    middlewareData: h,
                    placement: f,
                    platform: u,
                    elements: m
                } = e, {
                    alignment: p = null,
                    allowedPlacements: d = Lt,
                    autoAlignment: w = !0,
                    ...y
                } = t, g = kt(p, w, d), x = await Q(e, y), v = (n = (i = h.autoPlacement) == null ? void 0 : i.index) != null ? n : 0, P = g[v];
                if (P == null) return {};
                const {
                    main: q,
                    cross: G
                } = it(P, a, await (u.isRTL == null ? void 0 : u.isRTL(m.floating)));
                if (f !== P) return {
                    x: s,
                    y: l,
                    reset: {
                        placement: g[0]
                    }
                };
                const J = [x[D(P)], x[q], x[G]],
                    A = [...(o = (r = h.autoPlacement) == null ? void 0 : r.overflows) != null ? o : [], {
                        placement: P,
                        overflows: J
                    }],
                    N = g[v + 1];
                if (N) return {
                    data: {
                        index: v + 1,
                        overflows: A
                    },
                    reset: {
                        placement: N
                    }
                };
                const V = A.slice().sort((R, W) => R.overflows[0] - W.overflows[0]),
                    _ = (c = V.find(R => {
                        let {
                            overflows: W
                        } = R;
                        return W.every(se => se <= 0)
                    })) == null ? void 0 : c.placement,
                    F = _ != null ? _ : V[0].placement;
                return F !== f ? {
                    data: {
                        index: v + 1,
                        overflows: A
                    },
                    reset: {
                        placement: F
                    }
                } : {}
            }
        }
    };

    function Tt(t) {
        const e = z(t);
        return [Z(t), e, Z(e)]
    }
    const Bt = function(t) {
        return t === void 0 && (t = {}), {
            name: "flip",
            options: t,
            async fn(e) {
                var n;
                const {
                    placement: i,
                    middlewareData: o,
                    rects: r,
                    initialPlacement: c,
                    platform: s,
                    elements: l
                } = e, {
                    mainAxis: a = !0,
                    crossAxis: h = !0,
                    fallbackPlacements: f,
                    fallbackStrategy: u = "bestFit",
                    flipAlignment: m = !0,
                    ...p
                } = t, d = D(i), y = f || (d === c || !m ? [z(c)] : Tt(c)), g = [c, ...y], x = await Q(e, p), v = [];
                let P = ((n = o.flip) == null ? void 0 : n.overflows) || [];
                if (a && v.push(x[d]), h) {
                    const {
                        main: A,
                        cross: N
                    } = it(i, r, await (s.isRTL == null ? void 0 : s.isRTL(l.floating)));
                    v.push(x[A], x[N])
                }
                if (P = [...P, {
                        placement: i,
                        overflows: v
                    }], !v.every(A => A <= 0)) {
                    var q, G;
                    const A = ((q = (G = o.flip) == null ? void 0 : G.index) != null ? q : 0) + 1,
                        N = g[A];
                    if (N) return {
                        data: {
                            index: A,
                            overflows: P
                        },
                        reset: {
                            placement: N
                        }
                    };
                    let V = "bottom";
                    switch (u) {
                        case "bestFit": {
                            var J;
                            const _ = (J = P.map(F => [F, F.overflows.filter(R => R > 0).reduce((R, W) => R + W, 0)]).sort((F, R) => F[1] - R[1])[0]) == null ? void 0 : J[0].placement;
                            _ && (V = _);
                            break
                        }
                        case "initialPlacement":
                            V = c;
                            break
                    }
                    if (i !== V) return {
                        reset: {
                            placement: V
                        }
                    }
                }
                return {}
            }
        }
    };
    async function St(t, e) {
        const {
            placement: n,
            platform: i,
            elements: o
        } = t, r = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), c = D(n), s = j(n), l = $(n) === "x", a = ["left", "top"].includes(c) ? -1 : 1, h = r && l ? -1 : 1, f = typeof e == "function" ? e(t) : e;
        let {
            mainAxis: u,
            crossAxis: m,
            alignmentAxis: p
        } = typeof f == "number" ? {
            mainAxis: f,
            crossAxis: 0,
            alignmentAxis: null
        } : {
            mainAxis: 0,
            crossAxis: 0,
            alignmentAxis: null,
            ...f
        };
        return s && typeof p == "number" && (m = s === "end" ? p * -1 : p), l ? {
            x: m * h,
            y: u * a
        } : {
            x: u * a,
            y: m * h
        }
    }
    const st = function(t) {
        return t === void 0 && (t = 0), {
            name: "offset",
            options: t,
            async fn(e) {
                const {
                    x: n,
                    y: i
                } = e, o = await St(e, t);
                return {
                    x: n + o.x,
                    y: i + o.y,
                    data: o
                }
            }
        }
    };

    function Dt(t) {
        return t === "x" ? "y" : "x"
    }
    const rt = function(t) {
        return t === void 0 && (t = {}), {
            name: "shift",
            options: t,
            async fn(e) {
                const {
                    x: n,
                    y: i,
                    placement: o
                } = e, {
                    mainAxis: r = !0,
                    crossAxis: c = !1,
                    limiter: s = {
                        fn: w => {
                            let {
                                x: y,
                                y: g
                            } = w;
                            return {
                                x: y,
                                y: g
                            }
                        }
                    },
                    ...l
                } = t, a = {
                    x: n,
                    y: i
                }, h = await Q(e, l), f = $(D(o)), u = Dt(f);
                let m = a[f],
                    p = a[u];
                if (r) {
                    const w = f === "y" ? "top" : "left",
                        y = f === "y" ? "bottom" : "right",
                        g = m + h[w],
                        x = m - h[y];
                    m = ot(g, m, x)
                }
                if (c) {
                    const w = u === "y" ? "top" : "left",
                        y = u === "y" ? "bottom" : "right",
                        g = p + h[w],
                        x = p - h[y];
                    p = ot(g, p, x)
                }
                const d = s.fn({
                    ...e,
                    [f]: m,
                    [u]: p
                });
                return {
                    ...d,
                    data: {
                        x: d.x - n,
                        y: d.y - i
                    }
                }
            }
        }
    };

    function ct(t) {
        return t && t.document && t.location && t.alert && t.setInterval
    }

    function O(t) {
        if (t == null) return window;
        if (!ct(t)) {
            const e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function E(t) {
        return O(t).getComputedStyle(t)
    }

    function L(t) {
        return ct(t) ? "" : t ? (t.nodeName || "").toLowerCase() : ""
    }

    function lt() {
        const t = navigator.userAgentData;
        return t != null && t.brands ? t.brands.map(e => e.brand + "/" + e.version).join(" ") : navigator.userAgent
    }

    function C(t) {
        return t instanceof O(t).HTMLElement
    }

    function B(t) {
        return t instanceof O(t).Element
    }

    function Nt(t) {
        return t instanceof O(t).Node
    }

    function I(t) {
        if (typeof ShadowRoot > "u") return !1;
        const e = O(t).ShadowRoot;
        return t instanceof e || t instanceof ShadowRoot
    }

    function U(t) {
        const {
            overflow: e,
            overflowX: n,
            overflowY: i
        } = E(t);
        return /auto|scroll|overlay|hidden/.test(e + i + n)
    }

    function Vt(t) {
        return ["table", "td", "th"].includes(L(t))
    }

    function at(t) {
        const e = /firefox/i.test(lt()),
            n = E(t);
        return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1)
    }

    function ft() {
        return !/^((?!chrome|android).)*safari/i.test(lt())
    }
    const ut = Math.min,
        M = Math.max,
        X = Math.round;

    function k(t, e, n) {
        var i, o, r, c;
        e === void 0 && (e = !1), n === void 0 && (n = !1);
        const s = t.getBoundingClientRect();
        let l = 1,
            a = 1;
        e && C(t) && (l = t.offsetWidth > 0 && X(s.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && X(s.height) / t.offsetHeight || 1);
        const h = B(t) ? O(t) : window,
            f = !ft() && n,
            u = (s.left + (f && (i = (o = h.visualViewport) == null ? void 0 : o.offsetLeft) != null ? i : 0)) / l,
            m = (s.top + (f && (r = (c = h.visualViewport) == null ? void 0 : c.offsetTop) != null ? r : 0)) / a,
            p = s.width / l,
            d = s.height / a;
        return {
            width: p,
            height: d,
            top: m,
            right: u + p,
            bottom: m + d,
            left: u,
            x: u,
            y: m
        }
    }

    function S(t) {
        return ((Nt(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function Y(t) {
        return B(t) ? {
            scrollLeft: t.scrollLeft,
            scrollTop: t.scrollTop
        } : {
            scrollLeft: t.pageXOffset,
            scrollTop: t.pageYOffset
        }
    }

    function dt(t) {
        return k(S(t)).left + Y(t).scrollLeft
    }

    function Ft(t) {
        const e = k(t);
        return X(e.width) !== t.offsetWidth || X(e.height) !== t.offsetHeight
    }

    function jt(t, e, n) {
        const i = C(e),
            o = S(e),
            r = k(t, i && Ft(e), n === "fixed");
        let c = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const s = {
            x: 0,
            y: 0
        };
        if (i || !i && n !== "fixed")
            if ((L(e) !== "body" || U(o)) && (c = Y(e)), C(e)) {
                const l = k(e, !0);
                s.x = l.x + e.clientLeft, s.y = l.y + e.clientTop
            } else o && (s.x = dt(o));
        return {
            x: r.left + c.scrollLeft - s.x,
            y: r.top + c.scrollTop - s.y,
            width: r.width,
            height: r.height
        }
    }

    function pt(t) {
        return L(t) === "html" ? t : t.assignedSlot || t.parentNode || (I(t) ? t.host : null) || S(t)
    }

    function ht(t) {
        return !C(t) || E(t).position === "fixed" ? null : It(t)
    }

    function It(t) {
        let {
            offsetParent: e
        } = t, n = t, i = !1;
        for (; n && n !== e;) {
            const {
                assignedSlot: o
            } = n;
            if (o) {
                let r = o.offsetParent;
                if (E(o).display === "contents") {
                    const c = o.hasAttribute("style"),
                        s = o.style.display;
                    o.style.display = E(n).display, r = o.offsetParent, o.style.display = s, c || o.removeAttribute("style")
                }
                n = o, e !== r && (e = r, i = !0)
            } else if (I(n) && n.host && i) break;
            n = I(n) && n.host || n.parentNode
        }
        return e
    }

    function Mt(t) {
        let e = pt(t);
        for (I(e) && (e = e.host); C(e) && !["html", "body"].includes(L(e));) {
            if (at(e)) return e;
            {
                const n = e.parentNode;
                e = I(n) ? n.host : n
            }
        }
        return null
    }

    function tt(t) {
        const e = O(t);
        let n = ht(t);
        for (; n && Vt(n) && E(n).position === "static";) n = ht(n);
        return n && (L(n) === "html" || L(n) === "body" && E(n).position === "static" && !at(n)) ? e : n || Mt(t) || e
    }

    function mt(t) {
        if (C(t)) return {
            width: t.offsetWidth,
            height: t.offsetHeight
        };
        const e = k(t);
        return {
            width: e.width,
            height: e.height
        }
    }

    function _t(t) {
        let {
            rect: e,
            offsetParent: n,
            strategy: i
        } = t;
        const o = C(n),
            r = S(n);
        if (n === r) return e;
        let c = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const s = {
            x: 0,
            y: 0
        };
        if ((o || !o && i !== "fixed") && ((L(n) !== "body" || U(r)) && (c = Y(n)), C(n))) {
            const l = k(n, !0);
            s.x = l.x + n.clientLeft, s.y = l.y + n.clientTop
        }
        return {
            ...e,
            x: e.x - c.scrollLeft + s.x,
            y: e.y - c.scrollTop + s.y
        }
    }

    function Wt(t, e) {
        const n = O(t),
            i = S(t),
            o = n.visualViewport;
        let r = i.clientWidth,
            c = i.clientHeight,
            s = 0,
            l = 0;
        if (o) {
            r = o.width, c = o.height;
            const a = ft();
            (a || !a && e === "fixed") && (s = o.offsetLeft, l = o.offsetTop)
        }
        return {
            width: r,
            height: c,
            x: s,
            y: l
        }
    }

    function $t(t) {
        var e;
        const n = S(t),
            i = Y(t),
            o = (e = t.ownerDocument) == null ? void 0 : e.body,
            r = M(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
            c = M(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
        let s = -i.scrollLeft + dt(t);
        const l = -i.scrollTop;
        return E(o || n).direction === "rtl" && (s += M(n.clientWidth, o ? o.clientWidth : 0) - r), {
            width: r,
            height: c,
            x: s,
            y: l
        }
    }

    function gt(t) {
        const e = pt(t);
        return ["html", "body", "#document"].includes(L(e)) ? t.ownerDocument.body : C(e) && U(e) ? e : gt(e)
    }

    function K(t, e) {
        var n;
        e === void 0 && (e = []);
        const i = gt(t),
            o = i === ((n = t.ownerDocument) == null ? void 0 : n.body),
            r = O(i),
            c = o ? [r].concat(r.visualViewport || [], U(i) ? i : []) : i,
            s = e.concat(c);
        return o ? s : s.concat(K(c))
    }

    function Ht(t, e) {
        const n = e.getRootNode == null ? void 0 : e.getRootNode();
        if (t.contains(e)) return !0;
        if (n && I(n)) {
            let i = e;
            do {
                if (i && t === i) return !0;
                i = i.parentNode || i.host
            } while (i)
        }
        return !1
    }

    function zt(t, e) {
        const n = k(t, !1, e === "fixed"),
            i = n.top + t.clientTop,
            o = n.left + t.clientLeft;
        return {
            top: i,
            left: o,
            x: o,
            y: i,
            right: o + t.clientWidth,
            bottom: i + t.clientHeight,
            width: t.clientWidth,
            height: t.clientHeight
        }
    }

    function wt(t, e, n) {
        return e === "viewport" ? H(Wt(t, n)) : B(e) ? zt(e, n) : H($t(S(t)))
    }

    function Ut(t) {
        const e = K(t),
            i = ["absolute", "fixed"].includes(E(t).position) && C(t) ? tt(t) : t;
        return B(i) ? e.filter(o => B(o) && Ht(o, i) && L(o) !== "body") : []
    }

    function Xt(t) {
        let {
            element: e,
            boundary: n,
            rootBoundary: i,
            strategy: o
        } = t;
        const c = [...n === "clippingAncestors" ? Ut(e) : [].concat(n), i],
            s = c[0],
            l = c.reduce((a, h) => {
                const f = wt(e, h, o);
                return a.top = M(f.top, a.top), a.right = ut(f.right, a.right), a.bottom = ut(f.bottom, a.bottom), a.left = M(f.left, a.left), a
            }, wt(e, s, o));
        return {
            width: l.right - l.left,
            height: l.bottom - l.top,
            x: l.left,
            y: l.top
        }
    }
    const Yt = {
        getClippingRect: Xt,
        convertOffsetParentRelativeRectToViewportRelativeRect: _t,
        isElement: B,
        getDimensions: mt,
        getOffsetParent: tt,
        getDocumentElement: S,
        getElementRects: t => {
            let {
                reference: e,
                floating: n,
                strategy: i
            } = t;
            return {
                reference: jt(e, tt(n), i),
                floating: {
                    ...mt(n),
                    x: 0,
                    y: 0
                }
            }
        },
        getClientRects: t => Array.from(t.getClientRects()),
        isRTL: t => E(t).direction === "rtl"
    };

    function Kt(t, e, n, i) {
        i === void 0 && (i = {});
        const {
            ancestorScroll: o = !0,
            ancestorResize: r = !0,
            elementResize: c = !0,
            animationFrame: s = !1
        } = i, l = o && !s, a = r && !s, h = l || a ? [...B(t) ? K(t) : [], ...K(e)] : [];
        h.forEach(d => {
            l && d.addEventListener("scroll", n, {
                passive: !0
            }), a && d.addEventListener("resize", n)
        });
        let f = null;
        if (c) {
            let d = !0;
            f = new ResizeObserver(() => {
                d || n(), d = !1
            }), B(t) && !s && f.observe(t), f.observe(e)
        }
        let u, m = s ? k(t) : null;
        s && p();

        function p() {
            const d = k(t);
            m && (d.x !== m.x || d.y !== m.y || d.width !== m.width || d.height !== m.height) && n(), m = d, u = requestAnimationFrame(p)
        }
        return n(), () => {
            var d;
            h.forEach(w => {
                l && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n)
            }), (d = f) == null || d.disconnect(), f = null, s && cancelAnimationFrame(u)
        }
    }
    const qt = (t, e, n) => xt(t, e, {
        platform: Yt,
        ...n
    });
    async function Gt(t, e, n) {
        if (!n) throw new Error("Must provide a positioning option");
        return await (typeof n == "string" ? Jt(t, e, n) : Qt(t, n))
    }
    async function Jt(t, e, n) {
        if (!e) throw new Error("Reference element is required for relative positioning");
        let i;
        return n === "auto" ? i = {
            middleware: [Rt(), rt(), st({
                mainAxis: 5,
                crossAxis: 12
            })]
        } : i = {
            placement: n,
            middleware: [Bt(), rt(), st(5)]
        }, Kt(e, t, async () => {
            const {
                x: o,
                y: r
            } = await qt(e, t, i);
            Object.assign(t.style, {
                position: "absolute",
                left: `${o}px`,
                top: `${r}px`
            })
        })
    }

    function Qt(t, e) {
        return t.style.position = "fixed", Object.entries(e).forEach(([n, i]) => {
            t.style[n] = i
        }), () => {}
    }
    const Zt = {
        hideOnClickOutside: !0,
        hideOnEmojiSelect: !0,
        hideOnEscape: !0,
        position: "auto",
        showCloseButton: !0
    };

    function te(t = {}) {
        return {
            ...Zt,
            rootElement: document.body,
            ...t
        }
    }
    const ee = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>',
        yt = {
            popupContainer: "popupContainer",
            closeButton: "closeButton"
        };
    class vt {
        constructor(e, n) {
            this.isOpen = !1, this.externalEvents = new b.Events, this.options = {
                ...te(n),
                ...b.getOptions(e)
            }, this.popupEl = document.createElement("div"), this.popupEl.classList.add(yt.popupContainer), this.popupEl.classList.add(this.options.theme), n.className && this.popupEl.classList.add(n.className), this.options.showCloseButton && (this.closeButton = document.createElement("button"), this.closeButton.type = "button", this.closeButton.classList.add(yt.closeButton), this.closeButton.innerHTML = ee, this.popupEl.appendChild(this.closeButton));
            const i = document.createElement("div");
            this.popupEl.appendChild(i), this.picker = b.createPicker({
                ...this.options,
                rootElement: i
            }), this.focusTrap = new b.FocusTrap, this.picker.addEventListener("data:ready", () => {
                this.focusTrap.activate(this.picker.el), this.picker.setInitialFocus()
            }), this.options.hideOnEmojiSelect && this.picker.addEventListener("emoji:select", () => {
                var o;
                (o = this.options.triggerElement) == null || o.focus()
            }), this.options.hideOnClickOutside && (this.onDocumentClick = this.onDocumentClick.bind(this), document.addEventListener("click", this.onDocumentClick)), this.options.hideOnEscape && (this.handleKeydown = this.handleKeydown.bind(this), this.popupEl.addEventListener("keydown", this.handleKeydown))
        }
        addEventListener(e, n) {
            this.externalEvents.on(e, n), this.picker.addEventListener(e, n)
        }
        removeEventListener(e, n) {
            this.externalEvents.off(e, n), this.picker.removeEventListener(e, n)
        }
        handleKeydown(e) {
            var n;
            e.key === "Escape" && (this.close(), (n = this.options.triggerElement) == null || n.focus())
        }
        async destroy() {
            this.isOpen && await this.close(), document.removeEventListener("click", this.onDocumentClick), this.picker.destroy(), this.externalEvents.removeAll()
        }
        toggle() {
            return this.isOpen ? this.close() : this.open()
        }
        async open() {
            this.isOpen || (await this.initiateOpenStateChange(!0), this.options.rootElement.appendChild(this.popupEl), await this.setPosition(), this.picker.reset(), await this.animatePopup(!0), await this.animateCloseButton(!0), this.picker.setInitialFocus(), this.externalEvents.emit("picker:open"))
        }
        async close() {
            var e;
            !this.isOpen || (await this.initiateOpenStateChange(!1), await this.animateCloseButton(!1), await this.animatePopup(!1), this.popupEl.remove(), this.picker.reset(), (e = this.positionCleanup) == null || e.call(this), this.focusTrap.deactivate(), this.externalEvents.emit("picker:close"))
        }
        getRunningAnimations() {
            return this.picker.el.getAnimations().filter(e => e.playState === "running")
        }
        async setPosition() {
            var e;
            (e = this.positionCleanup) == null || e.call(this), this.positionCleanup = await Gt(this.popupEl, this.options.referenceElement, this.options.position)
        }
        awaitPendingAnimations() {
            return Promise.all(this.getRunningAnimations().map(e => e.finished))
        }
        onDocumentClick(e) {
            var o;
            const n = e.target,
                i = (o = this.options.triggerElement) == null ? void 0 : o.contains(n);
            this.isOpen && !this.picker.isPickerClick(e) && !i && this.close()
        }
        animatePopup(e) {
            return b.animate(this.picker.el, {
                opacity: [0, 1],
                transform: ["scale(0.9)", "scale(1)"]
            }, {
                duration: 150,
                id: e ? "show-picker" : "hide-picker",
                easing: "ease-in-out",
                direction: e ? "normal" : "reverse",
                fill: "both"
            }, this.options)
        }
        animateCloseButton(e) {
            if (this.closeButton) return b.animate(this.closeButton, {
                opacity: [0, 1]
            }, {
                duration: 25,
                id: e ? "show-close" : "hide-close",
                easing: "ease-in-out",
                direction: e ? "normal" : "reverse",
                fill: "both"
            }, this.options)
        }
        async initiateOpenStateChange(e) {
            this.isOpen = e, await this.awaitPendingAnimations()
        }
    }
    const ne = `.popupContainer{display:flex;flex-direction:column;position:absolute}.popupContainer .closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:var(--search-focus-background-color);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.popupContainer .closeButton:hover{background:var(--accent-color)}.popupContainer .closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`,
        oe = b.createStyleInjector();

    function ie(t, e) {
        return oe(ne), new vt({
            autoFocus: "auto",
            ...t
        }, e)
    }
    T.PopupPickerController = vt, T.createPopup = ie, Object.defineProperties(T, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    })
});