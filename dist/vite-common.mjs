/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
(function(e) {
  e.fn.fitVids = function(t) {
    var i = {
      customSelector: null,
      ignore: null
    };
    if (!document.getElementById("fit-vids-style")) {
      var s = document.head || document.getElementsByTagName("head")[0], a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}", n = document.createElement("div");
      n.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", s.appendChild(n.childNodes[1]);
    }
    return t && e.extend(i, t), this.each(function() {
      var l = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        "object",
        "embed"
      ];
      i.customSelector && l.push(i.customSelector);
      var r = ".fitvidsignore";
      i.ignore && (r = r + ", " + i.ignore);
      var o = e(this).find(l.join(","));
      o = o.not("object object"), o = o.not(r), o.each(function() {
        var c = e(this);
        if (!(c.parents(r).length > 0) && !(this.tagName.toLowerCase() === "embed" && c.parent("object").length || c.parent(".fluid-width-video-wrapper").length)) {
          !c.css("height") && !c.css("width") && (isNaN(c.attr("height")) || isNaN(c.attr("width"))) && (c.attr("height", 9), c.attr("width", 16));
          var g = this.tagName.toLowerCase() === "object" || c.attr("height") && !isNaN(parseInt(c.attr("height"), 10)) ? parseInt(c.attr("height"), 10) : c.height(), p = isNaN(parseInt(c.attr("width"), 10)) ? c.width() : parseInt(c.attr("width"), 10), m = g / p;
          if (!c.attr("name")) {
            var h = "fitvid" + e.fn.fitVids._count;
            c.attr("name", h), e.fn.fitVids._count++;
          }
          c.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", m * 100 + "%"), c.removeAttr("height").removeAttr("width");
        }
      });
    });
  }, e.fn.fitVids._count = 0;
})(window.jQuery || window.Zepto);
function re(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function ne(e = {}, t = {}) {
  Object.keys(t).forEach((i) => {
    typeof e[i] > "u" ? e[i] = t[i] : re(t[i]) && re(e[i]) && Object.keys(t[i]).length > 0 && ne(e[i], t[i]);
  });
}
const ue = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function $() {
  const e = typeof document < "u" ? document : {};
  return ne(e, ue), e;
}
const Te = {
  document: ue,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  }
};
function D() {
  const e = typeof window < "u" ? window : {};
  return ne(e, Te), e;
}
function Ee(e) {
  const t = e;
  Object.keys(t).forEach((i) => {
    try {
      t[i] = null;
    } catch {
    }
    try {
      delete t[i];
    } catch {
    }
  });
}
function te(e, t = 0) {
  return setTimeout(e, t);
}
function U() {
  return Date.now();
}
function Ce(e) {
  const t = D();
  let i;
  return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), i || (i = e.style), i;
}
function we(e, t = "x") {
  const i = D();
  let s, a, n;
  const l = Ce(e);
  return i.WebKitCSSMatrix ? (a = l.transform || l.webkitTransform, a.split(",").length > 6 && (a = a.split(", ").map((r) => r.replace(",", ".")).join(", ")), n = new i.WebKitCSSMatrix(a === "none" ? "" : a)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), t === "x" && (i.WebKitCSSMatrix ? a = n.m41 : s.length === 16 ? a = parseFloat(s[12]) : a = parseFloat(s[4])), t === "y" && (i.WebKitCSSMatrix ? a = n.m42 : s.length === 16 ? a = parseFloat(s[13]) : a = parseFloat(s[5])), a || 0;
}
function W(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Me(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function z(...e) {
  const t = Object(e[0]), i = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < e.length; s += 1) {
    const a = e[s];
    if (a != null && !Me(a)) {
      const n = Object.keys(Object(a)).filter((l) => i.indexOf(l) < 0);
      for (let l = 0, r = n.length; l < r; l += 1) {
        const o = n[l], c = Object.getOwnPropertyDescriptor(a, o);
        c !== void 0 && c.enumerable && (W(t[o]) && W(a[o]) ? a[o].__swiper__ ? t[o] = a[o] : z(t[o], a[o]) : !W(t[o]) && W(a[o]) ? (t[o] = {}, a[o].__swiper__ ? t[o] = a[o] : z(t[o], a[o])) : t[o] = a[o]);
      }
    }
  }
  return t;
}
function X(e, t, i) {
  e.style.setProperty(t, i);
}
function pe({
  swiper: e,
  targetPosition: t,
  side: i
}) {
  const s = D(), a = -e.translate;
  let n = null, l;
  const r = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const o = t > a ? "next" : "prev", c = (p, m) => o === "next" && p >= m || o === "prev" && p <= m, g = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), n === null && (n = l);
    const p = Math.max(Math.min((l - n) / r, 1), 0), m = 0.5 - Math.cos(p * Math.PI) / 2;
    let h = a + m * (t - a);
    if (c(h, t) && (h = t), e.wrapperEl.scrollTo({
      [i]: h
    }), c(h, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [i]: h
        });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(g);
  };
  g();
}
function me(e) {
  return e.querySelector(".swiper-slide-transform") || e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform") || e;
}
function B(e, t = "") {
  return [...e.children].filter((i) => i.matches(t));
}
function ae(e, t = []) {
  const i = document.createElement(e);
  return i.classList.add(...Array.isArray(t) ? t : [t]), i;
}
function Pe(e, t) {
  const i = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function Le(e, t) {
  const i = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function V(e, t) {
  return D().getComputedStyle(e, null).getPropertyValue(t);
}
function R(e) {
  let t = e, i;
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (i += 1);
    return i;
  }
}
function he(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; )
    t ? s.matches(t) && i.push(s) : i.push(s), s = s.parentElement;
  return i;
}
function Ie(e, t) {
  function i(s) {
    s.target === e && (t.call(e, s), e.removeEventListener("transitionend", i));
  }
  t && e.addEventListener("transitionend", i);
}
function ie(e, t, i) {
  const s = D();
  return i ? e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}
let K;
function ke() {
  const e = D(), t = $();
  return {
    smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
  };
}
function ge() {
  return K || (K = ke()), K;
}
let Q;
function Ae({
  userAgent: e
} = {}) {
  const t = ge(), i = D(), s = i.navigator.platform, a = e || i.navigator.userAgent, n = {
    ios: !1,
    android: !1
  }, l = i.screen.width, r = i.screen.height, o = a.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = a.match(/(iPad).*OS\s([\d_]+)/);
  const g = a.match(/(iPod)(.*OS\s([\d_]+))?/), p = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/), m = s === "Win32";
  let h = s === "MacIntel";
  const v = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !c && h && t.touch && v.indexOf(`${l}x${r}`) >= 0 && (c = a.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), h = !1), o && !m && (n.os = "android", n.android = !0), (c || p || g) && (n.os = "ios", n.ios = !0), n;
}
function Oe(e = {}) {
  return Q || (Q = Ae(e)), Q;
}
let Z;
function ze() {
  const e = D();
  let t = !1;
  function i() {
    const s = e.navigator.userAgent.toLowerCase();
    return s.indexOf("safari") >= 0 && s.indexOf("chrome") < 0 && s.indexOf("android") < 0;
  }
  if (i()) {
    const s = String(e.navigator.userAgent);
    if (s.includes("Version/")) {
      const [a, n] = s.split("Version/")[1].split(" ")[0].split(".").map((l) => Number(l));
      t = a < 16 || a === 16 && n < 2;
    }
  }
  return {
    isSafari: t || i(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
  };
}
function De() {
  return Z || (Z = ze()), Z;
}
function Ge({
  swiper: e,
  on: t,
  emit: i
}) {
  const s = D();
  let a = null, n = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
  }, r = () => {
    !e || e.destroyed || !e.initialized || (a = new ResizeObserver((g) => {
      n = s.requestAnimationFrame(() => {
        const {
          width: p,
          height: m
        } = e;
        let h = p, v = m;
        g.forEach(({
          contentBoxSize: S,
          contentRect: T,
          target: d
        }) => {
          d && d !== e.el || (h = T ? T.width : (S[0] || S).inlineSize, v = T ? T.height : (S[0] || S).blockSize);
        }), (h !== p || v !== m) && l();
      });
    }), a.observe(e.el));
  }, o = () => {
    n && s.cancelAnimationFrame(n), a && a.unobserve && e.el && (a.unobserve(e.el), a = null);
  }, c = () => {
    !e || e.destroyed || !e.initialized || i("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      r();
      return;
    }
    s.addEventListener("resize", l), s.addEventListener("orientationchange", c);
  }), t("destroy", () => {
    o(), s.removeEventListener("resize", l), s.removeEventListener("orientationchange", c);
  });
}
function Be({
  swiper: e,
  extendParams: t,
  on: i,
  emit: s
}) {
  const a = [], n = D(), l = (c, g = {}) => {
    const p = n.MutationObserver || n.WebkitMutationObserver, m = new p((h) => {
      if (e.__preventObserver__)
        return;
      if (h.length === 1) {
        s("observerUpdate", h[0]);
        return;
      }
      const v = function() {
        s("observerUpdate", h[0]);
      };
      n.requestAnimationFrame ? n.requestAnimationFrame(v) : n.setTimeout(v, 0);
    });
    m.observe(c, {
      attributes: typeof g.attributes > "u" ? !0 : g.attributes,
      childList: typeof g.childList > "u" ? !0 : g.childList,
      characterData: typeof g.characterData > "u" ? !0 : g.characterData
    }), a.push(m);
  }, r = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const c = he(e.el);
        for (let g = 0; g < c.length; g += 1)
          l(c[g]);
      }
      l(e.el, {
        childList: e.params.observeSlideChildren
      }), l(e.wrapperEl, {
        attributes: !1
      });
    }
  }, o = () => {
    a.forEach((c) => {
      c.disconnect();
    }), a.splice(0, a.length);
  };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), i("init", r), i("destroy", o);
}
const Ne = {
  on(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    const a = i ? "unshift" : "push";
    return e.split(" ").forEach((n) => {
      s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][a](t);
    }), s;
  },
  once(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    function a(...n) {
      s.off(e, a), a.__emitterProxy && delete a.__emitterProxy, t.apply(s, n);
    }
    return a.__emitterProxy = t, s.on(e, a, i);
  },
  onAny(e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    const s = t ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners)
      return t;
    const i = t.eventsAnyListeners.indexOf(e);
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
  },
  off(e, t) {
    const i = this;
    return !i.eventsListeners || i.destroyed || !i.eventsListeners || e.split(" ").forEach((s) => {
      typeof t > "u" ? i.eventsListeners[s] = [] : i.eventsListeners[s] && i.eventsListeners[s].forEach((a, n) => {
        (a === t || a.__emitterProxy && a.__emitterProxy === t) && i.eventsListeners[s].splice(n, 1);
      });
    }), i;
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners)
      return t;
    let i, s, a;
    return typeof e[0] == "string" || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = t) : (i = e[0].events, s = e[0].data, a = e[0].context || t), s.unshift(a), (Array.isArray(i) ? i : i.split(" ")).forEach((l) => {
      t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((r) => {
        r.apply(a, [l, ...s]);
      }), t.eventsListeners && t.eventsListeners[l] && t.eventsListeners[l].forEach((r) => {
        r.apply(a, s);
      });
    }), t;
  }
};
function _e() {
  const e = this;
  let t, i;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? t = e.params.width : t = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? i = e.params.height : i = s.clientHeight, !(t === 0 && e.isHorizontal() || i === 0 && e.isVertical()) && (t = t - parseInt(V(s, "padding-left") || 0, 10) - parseInt(V(s, "padding-right") || 0, 10), i = i - parseInt(V(s, "padding-top") || 0, 10) - parseInt(V(s, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
    width: t,
    height: i,
    size: e.isHorizontal() ? t : i
  }));
}
function Ve() {
  const e = this;
  function t(w) {
    return e.isHorizontal() ? w : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[w];
  }
  function i(w, C) {
    return parseFloat(w.getPropertyValue(t(C)) || 0);
  }
  const s = e.params, {
    wrapperEl: a,
    slidesEl: n,
    size: l,
    rtlTranslate: r,
    wrongRTL: o
  } = e, c = e.virtual && s.virtual.enabled, g = c ? e.virtual.slides.length : e.slides.length, p = B(n, `.${e.params.slideClass}, swiper-slide`), m = c ? e.virtual.slides.length : p.length;
  let h = [];
  const v = [], S = [];
  let T = s.slidesOffsetBefore;
  typeof T == "function" && (T = s.slidesOffsetBefore.call(e));
  let d = s.slidesOffsetAfter;
  typeof d == "function" && (d = s.slidesOffsetAfter.call(e));
  const f = e.snapGrid.length, b = e.slidesGrid.length;
  let y = s.spaceBetween, E = -T, M = 0, k = 0;
  if (typeof l > "u")
    return;
  typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * l : typeof y == "string" && (y = parseFloat(y)), e.virtualSize = -y, p.forEach((w) => {
    r ? w.style.marginLeft = "" : w.style.marginRight = "", w.style.marginBottom = "", w.style.marginTop = "";
  }), s.centeredSlides && s.cssMode && (X(a, "--swiper-centered-offset-before", ""), X(a, "--swiper-centered-offset-after", ""));
  const L = s.grid && s.grid.rows > 1 && e.grid;
  L && e.grid.initSlides(m);
  let I;
  const A = s.slidesPerView === "auto" && s.breakpoints && Object.keys(s.breakpoints).filter((w) => typeof s.breakpoints[w].slidesPerView < "u").length > 0;
  for (let w = 0; w < m; w += 1) {
    I = 0;
    let C;
    if (p[w] && (C = p[w]), L && e.grid.updateSlide(w, C, m, t), !(p[w] && V(C, "display") === "none")) {
      if (s.slidesPerView === "auto") {
        A && (p[w].style[t("width")] = "");
        const u = getComputedStyle(C), x = C.style.transform, P = C.style.webkitTransform;
        if (x && (C.style.transform = "none"), P && (C.style.webkitTransform = "none"), s.roundLengths)
          I = e.isHorizontal() ? ie(C, "width", !0) : ie(C, "height", !0);
        else {
          const G = i(u, "width"), j = i(u, "padding-left"), N = i(u, "padding-right"), F = i(u, "margin-left"), H = i(u, "margin-right"), q = u.getPropertyValue("box-sizing");
          if (q && q === "border-box")
            I = G + F + H;
          else {
            const {
              clientWidth: ye,
              offsetWidth: xe
            } = C;
            I = G + j + N + F + H + (xe - ye);
          }
        }
        x && (C.style.transform = x), P && (C.style.webkitTransform = P), s.roundLengths && (I = Math.floor(I));
      } else
        I = (l - (s.slidesPerView - 1) * y) / s.slidesPerView, s.roundLengths && (I = Math.floor(I)), p[w] && (p[w].style[t("width")] = `${I}px`);
      p[w] && (p[w].swiperSlideSize = I), S.push(I), s.centeredSlides ? (E = E + I / 2 + M / 2 + y, M === 0 && w !== 0 && (E = E - l / 2 - y), w === 0 && (E = E - l / 2 - y), Math.abs(E) < 1 / 1e3 && (E = 0), s.roundLengths && (E = Math.floor(E)), k % s.slidesPerGroup === 0 && h.push(E), v.push(E)) : (s.roundLengths && (E = Math.floor(E)), (k - Math.min(e.params.slidesPerGroupSkip, k)) % e.params.slidesPerGroup === 0 && h.push(E), v.push(E), E = E + I + y), e.virtualSize += I + y, M = I, k += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, l) + d, r && o && (s.effect === "slide" || s.effect === "coverflow") && (a.style.width = `${e.virtualSize + y}px`), s.setWrapperSize && (a.style[t("width")] = `${e.virtualSize + y}px`), L && e.grid.updateWrapperSize(I, h, t), !s.centeredSlides) {
    const w = [];
    for (let C = 0; C < h.length; C += 1) {
      let u = h[C];
      s.roundLengths && (u = Math.floor(u)), h[C] <= e.virtualSize - l && w.push(u);
    }
    h = w, Math.floor(e.virtualSize - l) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - l);
  }
  if (c && s.loop) {
    const w = S[0] + y;
    if (s.slidesPerGroup > 1) {
      const C = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup), u = w * s.slidesPerGroup;
      for (let x = 0; x < C; x += 1)
        h.push(h[h.length - 1] + u);
    }
    for (let C = 0; C < e.virtual.slidesBefore + e.virtual.slidesAfter; C += 1)
      s.slidesPerGroup === 1 && h.push(h[h.length - 1] + w), v.push(v[v.length - 1] + w), e.virtualSize += w;
  }
  if (h.length === 0 && (h = [0]), y !== 0) {
    const w = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
    p.filter((C, u) => !s.cssMode || s.loop ? !0 : u !== p.length - 1).forEach((C) => {
      C.style[w] = `${y}px`;
    });
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let w = 0;
    S.forEach((u) => {
      w += u + (y || 0);
    }), w -= y;
    const C = w - l;
    h = h.map((u) => u < 0 ? -T : u > C ? C + d : u);
  }
  if (s.centerInsufficientSlides) {
    let w = 0;
    if (S.forEach((C) => {
      w += C + (y || 0);
    }), w -= y, w < l) {
      const C = (l - w) / 2;
      h.forEach((u, x) => {
        h[x] = u - C;
      }), v.forEach((u, x) => {
        v[x] = u + C;
      });
    }
  }
  if (Object.assign(e, {
    slides: p,
    snapGrid: h,
    slidesGrid: v,
    slidesSizesGrid: S
  }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
    X(a, "--swiper-centered-offset-before", `${-h[0]}px`), X(a, "--swiper-centered-offset-after", `${e.size / 2 - S[S.length - 1] / 2}px`);
    const w = -e.snapGrid[0], C = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((u) => u + w), e.slidesGrid = e.slidesGrid.map((u) => u + C);
  }
  if (m !== g && e.emit("slidesLengthChange"), h.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), v.length !== b && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), !c && !s.cssMode && (s.effect === "slide" || s.effect === "fade")) {
    const w = `${s.containerModifierClass}backface-hidden`, C = e.el.classList.contains(w);
    m <= s.maxBackfaceHiddenSlides ? C || e.el.classList.add(w) : C && e.el.classList.remove(w);
  }
}
function Fe(e) {
  const t = this, i = [], s = t.virtual && t.params.virtual.enabled;
  let a = 0, n;
  typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
  const l = (r) => s ? t.slides[t.getSlideIndexByData(r)] : t.slides[r];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((r) => {
        i.push(r);
      });
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const r = t.activeIndex + n;
        if (r > t.slides.length && !s)
          break;
        i.push(l(r));
      }
  else
    i.push(l(t.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < "u") {
      const r = i[n].offsetHeight;
      a = r > a ? r : a;
    }
  (a || a === 0) && (t.wrapperEl.style.height = `${a}px`);
}
function He() {
  const e = this, t = e.slides, i = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i - e.cssOverflowAdjustment();
}
function $e(e = this && this.translate || 0) {
  const t = this, i = t.params, {
    slides: s,
    rtlTranslate: a,
    snapGrid: n
  } = t;
  if (s.length === 0)
    return;
  typeof s[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let l = -e;
  a && (l = e), s.forEach((o) => {
    o.classList.remove(i.slideVisibleClass);
  }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  let r = i.spaceBetween;
  typeof r == "string" && r.indexOf("%") >= 0 ? r = parseFloat(r.replace("%", "")) / 100 * t.size : typeof r == "string" && (r = parseFloat(r));
  for (let o = 0; o < s.length; o += 1) {
    const c = s[o];
    let g = c.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (g -= s[0].swiperSlideOffset);
    const p = (l + (i.centeredSlides ? t.minTranslate() : 0) - g) / (c.swiperSlideSize + r), m = (l - n[0] + (i.centeredSlides ? t.minTranslate() : 0) - g) / (c.swiperSlideSize + r), h = -(l - g), v = h + t.slidesSizesGrid[o];
    (h >= 0 && h < t.size - 1 || v > 1 && v <= t.size || h <= 0 && v >= t.size) && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(o), s[o].classList.add(i.slideVisibleClass)), c.progress = a ? -p : p, c.originalProgress = a ? -m : m;
  }
}
function je(e) {
  const t = this;
  if (typeof e > "u") {
    const g = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * g || 0;
  }
  const i = t.params, s = t.maxTranslate() - t.minTranslate();
  let {
    progress: a,
    isBeginning: n,
    isEnd: l,
    progressLoop: r
  } = t;
  const o = n, c = l;
  if (s === 0)
    a = 0, n = !0, l = !0;
  else {
    a = (e - t.minTranslate()) / s;
    const g = Math.abs(e - t.minTranslate()) < 1, p = Math.abs(e - t.maxTranslate()) < 1;
    n = g || a <= 0, l = p || a >= 1, g && (a = 0), p && (a = 1);
  }
  if (i.loop) {
    const g = t.getSlideIndexByData(0), p = t.getSlideIndexByData(t.slides.length - 1), m = t.slidesGrid[g], h = t.slidesGrid[p], v = t.slidesGrid[t.slidesGrid.length - 1], S = Math.abs(e);
    S >= m ? r = (S - m) / v : r = (S + v - h) / v, r > 1 && (r -= 1);
  }
  Object.assign(t, {
    progress: a,
    progressLoop: r,
    isBeginning: n,
    isEnd: l
  }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), n && !o && t.emit("reachBeginning toEdge"), l && !c && t.emit("reachEnd toEdge"), (o && !n || c && !l) && t.emit("fromEdge"), t.emit("progress", a);
}
function Re() {
  const e = this, {
    slides: t,
    params: i,
    slidesEl: s,
    activeIndex: a
  } = e, n = e.virtual && i.virtual.enabled, l = (o) => B(s, `.${i.slideClass}${o}, swiper-slide${o}`)[0];
  t.forEach((o) => {
    o.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
  });
  let r;
  if (n)
    if (i.loop) {
      let o = a - e.virtual.slidesBefore;
      o < 0 && (o = e.virtual.slides.length + o), o >= e.virtual.slides.length && (o -= e.virtual.slides.length), r = l(`[data-swiper-slide-index="${o}"]`);
    } else
      r = l(`[data-swiper-slide-index="${a}"]`);
  else
    r = t[a];
  if (r) {
    r.classList.add(i.slideActiveClass);
    let o = Le(r, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !o && (o = t[0]), o && o.classList.add(i.slideNextClass);
    let c = Pe(r, `.${i.slideClass}, swiper-slide`)[0];
    i.loop && !c === 0 && (c = t[t.length - 1]), c && c.classList.add(i.slidePrevClass);
  }
  e.emitSlidesClasses();
}
const Y = (e, t) => {
  if (!e || e.destroyed || !e.params)
    return;
  const i = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = t.closest(i());
  if (s) {
    const a = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    a && a.remove();
  }
}, le = (e, t) => {
  if (!e.slides[t])
    return;
  const i = e.slides[t].querySelector('[loading="lazy"]');
  i && i.removeAttribute("loading");
}, se = (e) => {
  if (!e || e.destroyed || !e.params)
    return;
  let t = e.params.lazyPreloadPrevNext;
  const i = e.slides.length;
  if (!i || !t || t < 0)
    return;
  t = Math.min(t, i);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), a = e.activeIndex, n = a + s - 1;
  if (e.params.rewind)
    for (let l = a - t; l <= n + t; l += 1) {
      const r = (l % i + i) % i;
      r !== a && r > n && le(e, r);
    }
  else
    for (let l = Math.max(n - t, 0); l <= Math.min(n + t, i - 1); l += 1)
      l !== a && l > n && le(e, l);
};
function qe(e) {
  const {
    slidesGrid: t,
    params: i
  } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let a;
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < "u" ? s >= t[n] && s < t[n + 1] - (t[n + 1] - t[n]) / 2 ? a = n : s >= t[n] && s < t[n + 1] && (a = n + 1) : s >= t[n] && (a = n);
  return i.normalizeSlideIndex && (a < 0 || typeof a > "u") && (a = 0), a;
}
function We(e) {
  const t = this, i = t.rtlTranslate ? t.translate : -t.translate, {
    snapGrid: s,
    params: a,
    activeIndex: n,
    realIndex: l,
    snapIndex: r
  } = t;
  let o = e, c;
  const g = (m) => {
    let h = m - t.virtual.slidesBefore;
    return h < 0 && (h = t.virtual.slides.length + h), h >= t.virtual.slides.length && (h -= t.virtual.slides.length), h;
  };
  if (typeof o > "u" && (o = qe(t)), s.indexOf(i) >= 0)
    c = s.indexOf(i);
  else {
    const m = Math.min(a.slidesPerGroupSkip, o);
    c = m + Math.floor((o - m) / a.slidesPerGroup);
  }
  if (c >= s.length && (c = s.length - 1), o === n) {
    c !== r && (t.snapIndex = c, t.emit("snapIndexChange")), t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = g(o));
    return;
  }
  let p;
  t.virtual && a.virtual.enabled && a.loop ? p = g(o) : t.slides[o] ? p = parseInt(t.slides[o].getAttribute("data-swiper-slide-index") || o, 10) : p = o, Object.assign(t, {
    previousSnapIndex: r,
    snapIndex: c,
    previousRealIndex: l,
    realIndex: p,
    previousIndex: n,
    activeIndex: o
  }), t.initialized && se(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), l !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function Xe(e) {
  const t = this, i = t.params, s = e.closest(`.${i.slideClass}, swiper-slide`);
  let a = !1, n;
  if (s) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === s) {
        a = !0, n = l;
        break;
      }
  }
  if (s && a)
    t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(s.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = n;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
const Ye = {
  updateSize: _e,
  updateSlides: Ve,
  updateAutoHeight: Fe,
  updateSlidesOffset: He,
  updateSlidesProgress: $e,
  updateProgress: je,
  updateSlidesClasses: Re,
  updateActiveIndex: We,
  updateClickedSlide: Xe
};
function Ue(e = this.isHorizontal() ? "x" : "y") {
  const t = this, {
    params: i,
    rtlTranslate: s,
    translate: a,
    wrapperEl: n
  } = t;
  if (i.virtualTranslate)
    return s ? -a : a;
  if (i.cssMode)
    return a;
  let l = we(n, e);
  return l += t.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function Ke(e, t) {
  const i = this, {
    rtlTranslate: s,
    params: a,
    wrapperEl: n,
    progress: l
  } = i;
  let r = 0, o = 0;
  const c = 0;
  i.isHorizontal() ? r = s ? -e : e : o = e, a.roundLengths && (r = Math.floor(r), o = Math.floor(o)), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? r : o, a.cssMode ? n[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -r : -o : a.virtualTranslate || (i.isHorizontal() ? r -= i.cssOverflowAdjustment() : o -= i.cssOverflowAdjustment(), n.style.transform = `translate3d(${r}px, ${o}px, ${c}px)`);
  let g;
  const p = i.maxTranslate() - i.minTranslate();
  p === 0 ? g = 0 : g = (e - i.minTranslate()) / p, g !== l && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
}
function Qe() {
  return -this.snapGrid[0];
}
function Ze() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Je(e = 0, t = this.params.speed, i = !0, s = !0, a) {
  const n = this, {
    params: l,
    wrapperEl: r
  } = n;
  if (n.animating && l.preventInteractionOnTransition)
    return !1;
  const o = n.minTranslate(), c = n.maxTranslate();
  let g;
  if (s && e > o ? g = o : s && e < c ? g = c : g = e, n.updateProgress(g), l.cssMode) {
    const p = n.isHorizontal();
    if (t === 0)
      r[p ? "scrollLeft" : "scrollTop"] = -g;
    else {
      if (!n.support.smoothScroll)
        return pe({
          swiper: n,
          targetPosition: -g,
          side: p ? "left" : "top"
        }), !0;
      r.scrollTo({
        [p ? "left" : "top"]: -g,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return t === 0 ? (n.setTransition(0), n.setTranslate(g), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(g), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(m) {
    !n || n.destroyed || m.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
const et = {
  getTranslate: Ue,
  setTranslate: Ke,
  minTranslate: Qe,
  maxTranslate: Ze,
  translateTo: Je
};
function tt(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`), i.emit("setTransition", e, t);
}
function ve({
  swiper: e,
  runCallbacks: t,
  direction: i,
  step: s
}) {
  const {
    activeIndex: a,
    previousIndex: n
  } = e;
  let l = i;
  if (l || (a > n ? l = "next" : a < n ? l = "prev" : l = "reset"), e.emit(`transition${s}`), t && a !== n) {
    if (l === "reset") {
      e.emit(`slideResetTransition${s}`);
      return;
    }
    e.emit(`slideChangeTransition${s}`), l === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`);
  }
}
function it(e = !0, t) {
  const i = this, {
    params: s
  } = i;
  s.cssMode || (s.autoHeight && i.updateAutoHeight(), ve({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
function st(e = !0, t) {
  const i = this, {
    params: s
  } = i;
  i.animating = !1, !s.cssMode && (i.setTransition(0), ve({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "End"
  }));
}
const nt = {
  setTransition: tt,
  transitionStart: it,
  transitionEnd: st
};
function at(e = 0, t = this.params.speed, i = !0, s, a) {
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: r,
    snapGrid: o,
    slidesGrid: c,
    previousIndex: g,
    activeIndex: p,
    rtlTranslate: m,
    wrapperEl: h,
    enabled: v
  } = n;
  if (n.animating && r.preventInteractionOnTransition || !v && !s && !a)
    return !1;
  const S = Math.min(n.params.slidesPerGroupSkip, l);
  let T = S + Math.floor((l - S) / n.params.slidesPerGroup);
  T >= o.length && (T = o.length - 1);
  const d = -o[T];
  if (r.normalizeSlideIndex)
    for (let b = 0; b < c.length; b += 1) {
      const y = -Math.floor(d * 100), E = Math.floor(c[b] * 100), M = Math.floor(c[b + 1] * 100);
      typeof c[b + 1] < "u" ? y >= E && y < M - (M - E) / 2 ? l = b : y >= E && y < M && (l = b + 1) : y >= E && (l = b);
    }
  if (n.initialized && l !== p && (!n.allowSlideNext && d < n.translate && d < n.minTranslate() || !n.allowSlidePrev && d > n.translate && d > n.maxTranslate() && (p || 0) !== l))
    return !1;
  l !== (g || 0) && i && n.emit("beforeSlideChangeStart"), n.updateProgress(d);
  let f;
  if (l > p ? f = "next" : l < p ? f = "prev" : f = "reset", m && -d === n.translate || !m && d === n.translate)
    return n.updateActiveIndex(l), r.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), r.effect !== "slide" && n.setTranslate(d), f !== "reset" && (n.transitionStart(i, f), n.transitionEnd(i, f)), !1;
  if (r.cssMode) {
    const b = n.isHorizontal(), y = m ? d : -d;
    if (t === 0) {
      const E = n.virtual && n.params.virtual.enabled;
      E && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), E && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        h[b ? "scrollLeft" : "scrollTop"] = y;
      })) : h[b ? "scrollLeft" : "scrollTop"] = y, E && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    } else {
      if (!n.support.smoothScroll)
        return pe({
          swiper: n,
          targetPosition: y,
          side: b ? "left" : "top"
        }), !0;
      h.scrollTo({
        [b ? "left" : "top"]: y,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return n.setTransition(t), n.setTranslate(d), n.updateActiveIndex(l), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, s), n.transitionStart(i, f), t === 0 ? n.transitionEnd(i, f) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(y) {
    !n || n.destroyed || y.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(i, f));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function rt(e = 0, t = this.params.speed, i = !0, s) {
  typeof e == "string" && (e = parseInt(e, 10));
  const a = this;
  let n = e;
  return a.params.loop && (a.virtual && a.params.virtual.enabled ? n = n + a.virtual.slidesBefore : n = a.getSlideIndexByData(n)), a.slideTo(n, t, i, s);
}
function lt(e = this.params.speed, t = !0, i) {
  const s = this, {
    enabled: a,
    params: n,
    animating: l
  } = s;
  if (!a)
    return s;
  let r = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (r = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const o = s.activeIndex < n.slidesPerGroupSkip ? 1 : r, c = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !c && n.loopPreventsSliding)
      return !1;
    s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + o, e, t, i);
}
function ot(e = this.params.speed, t = !0, i) {
  const s = this, {
    params: a,
    snapGrid: n,
    slidesGrid: l,
    rtlTranslate: r,
    enabled: o,
    animating: c
  } = s;
  if (!o)
    return s;
  const g = s.virtual && a.virtual.enabled;
  if (a.loop) {
    if (c && !g && a.loopPreventsSliding)
      return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const p = r ? s.translate : -s.translate;
  function m(d) {
    return d < 0 ? -Math.floor(Math.abs(d)) : Math.floor(d);
  }
  const h = m(p), v = n.map((d) => m(d));
  let S = n[v.indexOf(h) - 1];
  if (typeof S > "u" && a.cssMode) {
    let d;
    n.forEach((f, b) => {
      h >= f && (d = b);
    }), typeof d < "u" && (S = n[d > 0 ? d - 1 : d]);
  }
  let T = 0;
  if (typeof S < "u" && (T = l.indexOf(S), T < 0 && (T = s.activeIndex - 1), a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (T = T - s.slidesPerViewDynamic("previous", !0) + 1, T = Math.max(T, 0))), a.rewind && s.isBeginning) {
    const d = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(d, e, t, i);
  }
  return s.slideTo(T, e, t, i);
}
function dt(e = this.params.speed, t = !0, i) {
  const s = this;
  return s.slideTo(s.activeIndex, e, t, i);
}
function ct(e = this.params.speed, t = !0, i, s = 0.5) {
  const a = this;
  let n = a.activeIndex;
  const l = Math.min(a.params.slidesPerGroupSkip, n), r = l + Math.floor((n - l) / a.params.slidesPerGroup), o = a.rtlTranslate ? a.translate : -a.translate;
  if (o >= a.snapGrid[r]) {
    const c = a.snapGrid[r], g = a.snapGrid[r + 1];
    o - c > (g - c) * s && (n += a.params.slidesPerGroup);
  } else {
    const c = a.snapGrid[r - 1], g = a.snapGrid[r];
    o - c <= (g - c) * s && (n -= a.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, a.slidesGrid.length - 1), a.slideTo(n, e, t, i);
}
function ft() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e, s = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let a = e.clickedIndex, n;
  const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating)
      return;
    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - s / 2 || a > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), a = e.getSlideIndex(B(i, `${l}[data-swiper-slide-index="${n}"]`)[0]), te(() => {
      e.slideTo(a);
    })) : e.slideTo(a) : a > e.slides.length - s ? (e.loopFix(), a = e.getSlideIndex(B(i, `${l}[data-swiper-slide-index="${n}"]`)[0]), te(() => {
      e.slideTo(a);
    })) : e.slideTo(a);
  } else
    e.slideTo(a);
}
const ut = {
  slideTo: at,
  slideToLoop: rt,
  slideNext: lt,
  slidePrev: ot,
  slideReset: dt,
  slideToClosest: ct,
  slideToClickedSlide: ft
};
function pt(e) {
  const t = this, {
    params: i,
    slidesEl: s
  } = t;
  if (!i.loop || t.virtual && t.params.virtual.enabled)
    return;
  B(s, `.${i.slideClass}, swiper-slide`).forEach((n, l) => {
    n.setAttribute("data-swiper-slide-index", l);
  }), t.loopFix({
    slideRealIndex: e,
    direction: i.centeredSlides ? void 0 : "next"
  });
}
function mt({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: i,
  setTranslate: s,
  activeSlideIndex: a,
  byController: n,
  byMousewheel: l
} = {}) {
  const r = this;
  if (!r.params.loop)
    return;
  r.emit("beforeLoopFix");
  const {
    slides: o,
    allowSlidePrev: c,
    allowSlideNext: g,
    slidesEl: p,
    params: m
  } = r;
  if (r.allowSlidePrev = !0, r.allowSlideNext = !0, r.virtual && m.virtual.enabled) {
    t && (!m.centeredSlides && r.snapIndex === 0 ? r.slideTo(r.virtual.slides.length, 0, !1, !0) : m.centeredSlides && r.snapIndex < m.slidesPerView ? r.slideTo(r.virtual.slides.length + r.snapIndex, 0, !1, !0) : r.snapIndex === r.snapGrid.length - 1 && r.slideTo(r.virtual.slidesBefore, 0, !1, !0)), r.allowSlidePrev = c, r.allowSlideNext = g, r.emit("loopFix");
    return;
  }
  const h = m.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(parseFloat(m.slidesPerView, 10));
  let v = m.loopedSlides || h;
  v % m.slidesPerGroup !== 0 && (v += m.slidesPerGroup - v % m.slidesPerGroup), r.loopedSlides = v;
  const S = [], T = [];
  let d = r.activeIndex;
  typeof a > "u" ? a = r.getSlideIndex(r.slides.filter((M) => M.classList.contains(m.slideActiveClass))[0]) : d = a;
  const f = i === "next" || !i, b = i === "prev" || !i;
  let y = 0, E = 0;
  if (a < v) {
    y = Math.max(v - a, m.slidesPerGroup);
    for (let M = 0; M < v - a; M += 1) {
      const k = M - Math.floor(M / o.length) * o.length;
      S.push(o.length - k - 1);
    }
  } else if (a > r.slides.length - v * 2) {
    E = Math.max(a - (r.slides.length - v * 2), m.slidesPerGroup);
    for (let M = 0; M < E; M += 1) {
      const k = M - Math.floor(M / o.length) * o.length;
      T.push(k);
    }
  }
  if (b && S.forEach((M) => {
    r.slides[M].swiperLoopMoveDOM = !0, p.prepend(r.slides[M]), r.slides[M].swiperLoopMoveDOM = !1;
  }), f && T.forEach((M) => {
    r.slides[M].swiperLoopMoveDOM = !0, p.append(r.slides[M]), r.slides[M].swiperLoopMoveDOM = !1;
  }), r.recalcSlides(), m.slidesPerView === "auto" && r.updateSlides(), m.watchSlidesProgress && r.updateSlidesOffset(), t) {
    if (S.length > 0 && b)
      if (typeof e > "u") {
        const M = r.slidesGrid[d], L = r.slidesGrid[d + y] - M;
        l ? r.setTranslate(r.translate - L) : (r.slideTo(d + y, 0, !1, !0), s && (r.touches[r.isHorizontal() ? "startX" : "startY"] += L));
      } else
        s && r.slideToLoop(e, 0, !1, !0);
    else if (T.length > 0 && f)
      if (typeof e > "u") {
        const M = r.slidesGrid[d], L = r.slidesGrid[d - E] - M;
        l ? r.setTranslate(r.translate - L) : (r.slideTo(d - E, 0, !1, !0), s && (r.touches[r.isHorizontal() ? "startX" : "startY"] += L));
      } else
        r.slideToLoop(e, 0, !1, !0);
  }
  if (r.allowSlidePrev = c, r.allowSlideNext = g, r.controller && r.controller.control && !n) {
    const M = {
      slideRealIndex: e,
      slideTo: !1,
      direction: i,
      setTranslate: s,
      activeSlideIndex: a,
      byController: !0
    };
    Array.isArray(r.controller.control) ? r.controller.control.forEach((k) => {
      !k.destroyed && k.params.loop && k.loopFix(M);
    }) : r.controller.control instanceof r.constructor && r.controller.control.params.loop && r.controller.control.loopFix(M);
  }
  r.emit("loopFix");
}
function ht() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled)
    return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((a) => {
    const n = typeof a.swiperSlideIndex > "u" ? a.getAttribute("data-swiper-slide-index") * 1 : a.swiperSlideIndex;
    s[n] = a;
  }), e.slides.forEach((a) => {
    a.removeAttribute("data-swiper-slide-index");
  }), s.forEach((a) => {
    i.append(a);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
const gt = {
  loopCreate: pt,
  loopFix: mt,
  loopDestroy: ht
};
function vt(e) {
  const t = this;
  if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
    return;
  const i = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0), i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  });
}
function bt() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
const St = {
  setGrabCursor: vt,
  unsetGrabCursor: bt
};
function yt(e, t = this) {
  function i(s) {
    if (!s || s === $() || s === D())
      return null;
    s.assignedSlot && (s = s.assignedSlot);
    const a = s.closest(e);
    return !a && !s.getRootNode ? null : a || i(s.getRootNode().host);
  }
  return i(t);
}
function xt(e) {
  const t = this, i = $(), s = D(), a = t.touchEventsData;
  a.evCache.push(e);
  const {
    params: n,
    touches: l,
    enabled: r
  } = t;
  if (!r || !n.simulateTouch && e.pointerType === "mouse" || t.animating && n.preventInteractionOnTransition)
    return;
  !t.animating && n.cssMode && n.loop && t.loopFix();
  let o = e;
  o.originalEvent && (o = o.originalEvent);
  let c = o.target;
  if (n.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(c) || "which" in o && o.which === 3 || "button" in o && o.button > 0 || a.isTouched && a.isMoved)
    return;
  const g = !!n.noSwipingClass && n.noSwipingClass !== "", p = e.composedPath ? e.composedPath() : e.path;
  g && o.target && o.target.shadowRoot && p && (c = p[0]);
  const m = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, h = !!(o.target && o.target.shadowRoot);
  if (n.noSwiping && (h ? yt(m, c) : c.closest(m))) {
    t.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !c.closest(n.swipeHandler))
    return;
  l.currentX = o.pageX, l.currentY = o.pageY;
  const v = l.currentX, S = l.currentY, T = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection, d = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
  if (T && (v <= d || v >= s.innerWidth - d))
    if (T === "prevent")
      e.preventDefault();
    else
      return;
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = v, l.startY = S, a.touchStartTime = U(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (a.allowThresholdMove = !1);
  let f = !0;
  c.matches(a.focusableElements) && (f = !1, c.nodeName === "SELECT" && (a.isTouched = !1)), i.activeElement && i.activeElement.matches(a.focusableElements) && i.activeElement !== c && i.activeElement.blur();
  const b = f && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || b) && !c.isContentEditable && o.preventDefault(), t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", o);
}
function Tt(e) {
  const t = $(), i = this, s = i.touchEventsData, {
    params: a,
    touches: n,
    rtlTranslate: l,
    enabled: r
  } = i;
  if (!r || !a.simulateTouch && e.pointerType === "mouse")
    return;
  let o = e;
  if (o.originalEvent && (o = o.originalEvent), !s.isTouched) {
    s.startMoving && s.isScrolling && i.emit("touchMoveOpposite", o);
    return;
  }
  const c = s.evCache.findIndex((M) => M.pointerId === o.pointerId);
  c >= 0 && (s.evCache[c] = o);
  const g = s.evCache.length > 1 ? s.evCache[0] : o, p = g.pageX, m = g.pageY;
  if (o.preventedByNestedSwiper) {
    n.startX = p, n.startY = m;
    return;
  }
  if (!i.allowTouchMove) {
    o.target.matches(s.focusableElements) || (i.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: p,
      startY: m,
      prevX: i.touches.currentX,
      prevY: i.touches.currentY,
      currentX: p,
      currentY: m
    }), s.touchStartTime = U());
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop) {
    if (i.isVertical()) {
      if (m < n.startY && i.translate <= i.maxTranslate() || m > n.startY && i.translate >= i.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else if (p < n.startX && i.translate <= i.maxTranslate() || p > n.startX && i.translate >= i.minTranslate())
      return;
  }
  if (t.activeElement && o.target === t.activeElement && o.target.matches(s.focusableElements)) {
    s.isMoved = !0, i.allowClick = !1;
    return;
  }
  if (s.allowTouchCallbacks && i.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1)
    return;
  n.currentX = p, n.currentY = m;
  const h = n.currentX - n.startX, v = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(h ** 2 + v ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > "u") {
    let M;
    i.isHorizontal() && n.currentY === n.startY || i.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : h * h + v * v >= 25 && (M = Math.atan2(Math.abs(v), Math.abs(h)) * 180 / Math.PI, s.isScrolling = i.isHorizontal() ? M > a.touchAngle : 90 - M > a.touchAngle);
  }
  if (s.isScrolling && i.emit("touchMoveOpposite", o), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || i.zoom && i.params.zoom && i.params.zoom.enabled && s.evCache.length > 1) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  i.allowClick = !1, !a.cssMode && o.cancelable && o.preventDefault(), a.touchMoveStopPropagation && !a.nested && o.stopPropagation();
  let S = i.isHorizontal() ? h : v, T = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  a.oneWayMovement && (S = Math.abs(S) * (l ? 1 : -1), T = Math.abs(T) * (l ? 1 : -1)), n.diff = S, S *= a.touchRatio, l && (S = -S, T = -T);
  const d = i.touchesDirection;
  i.swipeDirection = S > 0 ? "prev" : "next", i.touchesDirection = T > 0 ? "prev" : "next";
  const f = i.params.loop && !a.cssMode;
  if (!s.isMoved) {
    if (f && i.loopFix({
      direction: i.swipeDirection
    }), s.startTranslate = i.getTranslate(), i.setTransition(0), i.animating) {
      const M = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(M);
    }
    s.allowMomentumBounce = !1, a.grabCursor && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!0), i.emit("sliderFirstMove", o);
  }
  let b;
  s.isMoved && d !== i.touchesDirection && f && Math.abs(S) >= 1 && (i.loopFix({
    direction: i.swipeDirection,
    setTranslate: !0
  }), b = !0), i.emit("sliderMove", o), s.isMoved = !0, s.currentTranslate = S + s.startTranslate;
  let y = !0, E = a.resistanceRatio;
  if (a.touchReleaseOnEdges && (E = 0), S > 0 ? (f && !b && s.currentTranslate > (a.centeredSlides ? i.minTranslate() - i.size / 2 : i.minTranslate()) && i.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > i.minTranslate() && (y = !1, a.resistance && (s.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + s.startTranslate + S) ** E))) : S < 0 && (f && !b && s.currentTranslate < (a.centeredSlides ? i.maxTranslate() + i.size / 2 : i.maxTranslate()) && i.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: i.slides.length - (a.slidesPerView === "auto" ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(a.slidesPerView, 10)))
  }), s.currentTranslate < i.maxTranslate() && (y = !1, a.resistance && (s.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - s.startTranslate - S) ** E))), y && (o.preventedByNestedSwiper = !0), !i.allowSlideNext && i.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && i.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && !i.allowSlideNext && (s.currentTranslate = s.startTranslate), a.threshold > 0)
    if (Math.abs(S) > a.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = i.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !a.followFinger || a.cssMode || ((a.freeMode && a.freeMode.enabled && i.freeMode || a.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()), i.params.freeMode && a.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), i.updateProgress(s.currentTranslate), i.setTranslate(s.currentTranslate));
}
function Et(e) {
  const t = this, i = t.touchEventsData, s = i.evCache.findIndex((b) => b.pointerId === e.pointerId);
  if (s >= 0 && i.evCache.splice(s, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type) && !(e.type === "pointercancel" && (t.browser.isSafari || t.browser.isWebView)))
    return;
  const {
    params: a,
    touches: n,
    rtlTranslate: l,
    slidesGrid: r,
    enabled: o
  } = t;
  if (!o || !a.simulateTouch && e.pointerType === "mouse")
    return;
  let c = e;
  if (c.originalEvent && (c = c.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", c), i.allowTouchCallbacks = !1, !i.isTouched) {
    i.isMoved && a.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
    return;
  }
  a.grabCursor && i.isMoved && i.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
  const g = U(), p = g - i.touchStartTime;
  if (t.allowClick) {
    const b = c.path || c.composedPath && c.composedPath();
    t.updateClickedSlide(b && b[0] || c.target), t.emit("tap click", c), p < 300 && g - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", c);
  }
  if (i.lastClickTime = U(), te(() => {
    t.destroyed || (t.allowClick = !0);
  }), !i.isTouched || !i.isMoved || !t.swipeDirection || n.diff === 0 || i.currentTranslate === i.startTranslate) {
    i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
    return;
  }
  i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
  let m;
  if (a.followFinger ? m = l ? t.translate : -t.translate : m = -i.currentTranslate, a.cssMode)
    return;
  if (t.params.freeMode && a.freeMode.enabled) {
    t.freeMode.onTouchEnd({
      currentPos: m
    });
    return;
  }
  let h = 0, v = t.slidesSizesGrid[0];
  for (let b = 0; b < r.length; b += b < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
    const y = b < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof r[b + y] < "u" ? m >= r[b] && m < r[b + y] && (h = b, v = r[b + y] - r[b]) : m >= r[b] && (h = b, v = r[r.length - 1] - r[r.length - 2]);
  }
  let S = null, T = null;
  a.rewind && (t.isBeginning ? T = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (S = 0));
  const d = (m - r[h]) / v, f = h < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (p > a.longSwipesMs) {
    if (!a.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" && (d >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? S : h + f) : t.slideTo(h)), t.swipeDirection === "prev" && (d > 1 - a.longSwipesRatio ? t.slideTo(h + f) : T !== null && d < 0 && Math.abs(d) > a.longSwipesRatio ? t.slideTo(T) : t.slideTo(h));
  } else {
    if (!a.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation && (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl) ? c.target === t.navigation.nextEl ? t.slideTo(h + f) : t.slideTo(h) : (t.swipeDirection === "next" && t.slideTo(S !== null ? S : h + f), t.swipeDirection === "prev" && t.slideTo(T !== null ? T : h));
  }
}
function oe() {
  const e = this, {
    params: t,
    el: i
  } = e;
  if (i && i.offsetWidth === 0)
    return;
  t.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: a,
    snapGrid: n
  } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const r = l && t.loop;
  (t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !r ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = a, e.allowSlideNext = s, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function Ct(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function wt() {
  const e = this, {
    wrapperEl: t,
    rtlTranslate: i,
    enabled: s
  } = e;
  if (!s)
    return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let a;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? a = 0 : a = (e.translate - e.minTranslate()) / n, a !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Mt(e) {
  const t = this;
  Y(t, e.target), !(t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update();
}
let de = !1;
function Pt() {
}
const be = (e, t) => {
  const i = $(), {
    params: s,
    el: a,
    wrapperEl: n,
    device: l
  } = e, r = !!s.nested, o = t === "on" ? "addEventListener" : "removeEventListener", c = t;
  a[o]("pointerdown", e.onTouchStart, {
    passive: !1
  }), i[o]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: r
  }), i[o]("pointerup", e.onTouchEnd, {
    passive: !0
  }), i[o]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), i[o]("pointerout", e.onTouchEnd, {
    passive: !0
  }), i[o]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && a[o]("click", e.onClick, !0), s.cssMode && n[o]("scroll", e.onScroll), s.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", oe, !0) : e[c]("observerUpdate", oe, !0), a[o]("load", e.onLoad, {
    capture: !0
  });
};
function Lt() {
  const e = this, t = $(), {
    params: i
  } = e;
  e.onTouchStart = xt.bind(e), e.onTouchMove = Tt.bind(e), e.onTouchEnd = Et.bind(e), i.cssMode && (e.onScroll = wt.bind(e)), e.onClick = Ct.bind(e), e.onLoad = Mt.bind(e), de || (t.addEventListener("touchstart", Pt), de = !0), be(e, "on");
}
function It() {
  be(this, "off");
}
const kt = {
  attachEvents: Lt,
  detachEvents: It
}, ce = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function At() {
  const e = this, {
    realIndex: t,
    initialized: i,
    params: s,
    el: a
  } = e, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0)
    return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l)
    return;
  const o = (l in n ? n[l] : void 0) || e.originalParams, c = ce(e, s), g = ce(e, o), p = s.enabled;
  c && !g ? (a.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !c && g && (a.classList.add(`${s.containerModifierClass}grid`), (o.grid.fill && o.grid.fill === "column" || !o.grid.fill && s.grid.fill === "column") && a.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((S) => {
    const T = s[S] && s[S].enabled, d = o[S] && o[S].enabled;
    T && !d && e[S].disable(), !T && d && e[S].enable();
  });
  const m = o.direction && o.direction !== s.direction, h = s.loop && (o.slidesPerView !== s.slidesPerView || m);
  m && i && e.changeDirection(), z(e.params, o);
  const v = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), p && !v ? e.disable() : !p && v && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", o), h && i && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", o);
}
function Ot(e, t = "window", i) {
  if (!e || t === "container" && !i)
    return;
  let s = !1;
  const a = D(), n = t === "window" ? a.innerHeight : i.clientHeight, l = Object.keys(e).map((r) => {
    if (typeof r == "string" && r.indexOf("@") === 0) {
      const o = parseFloat(r.substr(1));
      return {
        value: n * o,
        point: r
      };
    }
    return {
      value: r,
      point: r
    };
  });
  l.sort((r, o) => parseInt(r.value, 10) - parseInt(o.value, 10));
  for (let r = 0; r < l.length; r += 1) {
    const {
      point: o,
      value: c
    } = l[r];
    t === "window" ? a.matchMedia(`(min-width: ${c}px)`).matches && (s = o) : c <= i.clientWidth && (s = o);
  }
  return s || "max";
}
const zt = {
  setBreakpoint: At,
  getBreakpoint: Ot
};
function Dt(e, t) {
  const i = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((a) => {
      s[a] && i.push(t + a);
    }) : typeof s == "string" && i.push(t + s);
  }), i;
}
function Gt() {
  const e = this, {
    classNames: t,
    params: i,
    rtl: s,
    el: a,
    device: n
  } = e, l = Dt(["initialized", i.direction, {
    "free-mode": e.params.freeMode && i.freeMode.enabled
  }, {
    autoheight: i.autoHeight
  }, {
    rtl: s
  }, {
    grid: i.grid && i.grid.rows > 1
  }, {
    "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": i.cssMode
  }, {
    centered: i.cssMode && i.centeredSlides
  }, {
    "watch-progress": i.watchSlidesProgress
  }], i.containerModifierClass);
  t.push(...l), a.classList.add(...t), e.emitContainerClasses();
}
function Bt() {
  const e = this, {
    el: t,
    classNames: i
  } = e;
  t.classList.remove(...i), e.emitContainerClasses();
}
const Nt = {
  addClasses: Gt,
  removeClasses: Bt
};
function _t() {
  const e = this, {
    isLocked: t,
    params: i
  } = e, {
    slidesOffsetBefore: s
  } = i;
  if (s) {
    const a = e.slides.length - 1, n = e.slidesGrid[a] + e.slidesSizesGrid[a] + s * 2;
    e.isLocked = e.size > n;
  } else
    e.isLocked = e.snapGrid.length === 1;
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
const Vt = {
  checkOverflow: _t
}, fe = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopedSlides: null,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function Ft(e, t) {
  return function(s = {}) {
    const a = Object.keys(s)[0], n = s[a];
    if (typeof n != "object" || n === null) {
      z(t, s);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && e[a] === !0 && (e[a] = {
      auto: !0
    }), !(a in e && "enabled" in n)) {
      z(t, s);
      return;
    }
    e[a] === !0 && (e[a] = {
      enabled: !0
    }), typeof e[a] == "object" && !("enabled" in e[a]) && (e[a].enabled = !0), e[a] || (e[a] = {
      enabled: !1
    }), z(t, s);
  };
}
const J = {
  eventsEmitter: Ne,
  update: Ye,
  translate: et,
  transition: nt,
  slide: ut,
  loop: gt,
  grabCursor: St,
  events: kt,
  breakpoints: zt,
  checkOverflow: Vt,
  classes: Nt
}, ee = {};
class O {
  constructor(...t) {
    let i, s;
    t.length === 1 && t[0].constructor && Object.prototype.toString.call(t[0]).slice(8, -1) === "Object" ? s = t[0] : [i, s] = t, s || (s = {}), s = z({}, s), i && !s.el && (s.el = i);
    const a = $();
    if (s.el && typeof s.el == "string" && a.querySelectorAll(s.el).length > 1) {
      const o = [];
      return a.querySelectorAll(s.el).forEach((c) => {
        const g = z({}, s, {
          el: c
        });
        o.push(new O(g));
      }), o;
    }
    const n = this;
    n.__swiper__ = !0, n.support = ge(), n.device = Oe({
      userAgent: s.userAgent
    }), n.browser = De(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
    const l = {};
    n.modules.forEach((o) => {
      o({
        params: s,
        swiper: n,
        extendParams: Ft(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const r = z({}, fe, l);
    return n.params = z({}, r, ee, s), n.originalParams = z({}, n.params), n.passedParams = z({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach((o) => {
      n.on(o, n.params.on[o]);
    }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: i,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return n.params.direction === "horizontal";
      },
      isVertical() {
        return n.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: n.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        evCache: []
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), n.emit("_swiper"), n.params.init && n.init(), n;
  }
  getSlideIndex(t) {
    const {
      slidesEl: i,
      params: s
    } = this, a = B(i, `.${s.slideClass}, swiper-slide`), n = R(a[0]);
    return R(t) - n;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(this.slides.filter((i) => i.getAttribute("data-swiper-slide-index") * 1 === t)[0]);
  }
  recalcSlides() {
    const t = this, {
      slidesEl: i,
      params: s
    } = t;
    t.slides = B(i, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled || (t.enabled = !0, t.params.grabCursor && t.setGrabCursor(), t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled && (t.enabled = !1, t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"));
  }
  setProgress(t, i) {
    const s = this;
    t = Math.min(Math.max(t, 0), 1);
    const a = s.minTranslate(), l = (s.maxTranslate() - a) * t + a;
    s.translateTo(l, typeof i > "u" ? 0 : i), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = t.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(t.params.containerModifierClass) === 0);
    t.emit("_containerClasses", i.join(" "));
  }
  getSlideClasses(t) {
    const i = this;
    return i.destroyed ? "" : t.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(i.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = [];
    t.slides.forEach((s) => {
      const a = t.getSlideClasses(s);
      i.push({
        slideEl: s,
        classNames: a
      }), t.emit("_slideClass", s, a);
    }), t.emit("_slideClasses", i);
  }
  slidesPerViewDynamic(t = "current", i = !1) {
    const s = this, {
      params: a,
      slides: n,
      slidesGrid: l,
      slidesSizesGrid: r,
      size: o,
      activeIndex: c
    } = s;
    let g = 1;
    if (a.centeredSlides) {
      let p = n[c].swiperSlideSize, m;
      for (let h = c + 1; h < n.length; h += 1)
        n[h] && !m && (p += n[h].swiperSlideSize, g += 1, p > o && (m = !0));
      for (let h = c - 1; h >= 0; h -= 1)
        n[h] && !m && (p += n[h].swiperSlideSize, g += 1, p > o && (m = !0));
    } else if (t === "current")
      for (let p = c + 1; p < n.length; p += 1)
        (i ? l[p] + r[p] - l[c] < o : l[p] - l[c] < o) && (g += 1);
    else
      for (let p = c - 1; p >= 0; p -= 1)
        l[c] - l[p] < o && (g += 1);
    return g;
  }
  update() {
    const t = this;
    if (!t || t.destroyed)
      return;
    const {
      snapGrid: i,
      params: s
    } = t;
    s.breakpoints && t.setBreakpoint(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && Y(t, l);
    }), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();
    function a() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate, r = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate());
      t.setTranslate(r), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let n;
    if (t.params.freeMode && t.params.freeMode.enabled)
      a(), t.params.autoHeight && t.updateAutoHeight();
    else {
      if ((t.params.slidesPerView === "auto" || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides) {
        const l = t.virtual && t.params.virtual.enabled ? t.virtual.slides : t.slides;
        n = t.slideTo(l.length - 1, 0, !1, !0);
      } else
        n = t.slideTo(t.activeIndex, 0, !1, !0);
      n || a();
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit("update");
  }
  changeDirection(t, i = !0) {
    const s = this, a = s.params.direction;
    return t || (t = a === "horizontal" ? "vertical" : "horizontal"), t === a || t !== "horizontal" && t !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${a}`), s.el.classList.add(`${s.params.containerModifierClass}${t}`), s.emitContainerClasses(), s.params.direction = t, s.slides.forEach((n) => {
      t === "vertical" ? n.style.width = "" : n.style.height = "";
    }), s.emit("changeDirection"), i && s.update()), s;
  }
  changeLanguageDirection(t) {
    const i = this;
    i.rtl && t === "rtl" || !i.rtl && t === "ltr" || (i.rtl = t === "rtl", i.rtlTranslate = i.params.direction === "horizontal" && i.rtl, i.rtl ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`), i.el.dir = "rtl") : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`), i.el.dir = "ltr"), i.update());
  }
  mount(t) {
    const i = this;
    if (i.mounted)
      return !0;
    let s = t || i.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = i, s.shadowEl && (i.isElement = !0);
    const a = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = (() => s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(a()) : B(s, a())[0])();
    return !l && i.params.createElements && (l = ae("div", i.params.wrapperClass), s.append(l), B(s, `.${i.params.slideClass}`).forEach((r) => {
      l.append(r);
    })), Object.assign(i, {
      el: s,
      wrapperEl: l,
      slidesEl: i.isElement ? s : l,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || V(s, "direction") === "rtl",
      rtlTranslate: i.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || V(s, "direction") === "rtl"),
      wrongRTL: V(l, "display") === "-webkit-box"
    }), !0;
  }
  init(t) {
    const i = this;
    return i.initialized || i.mount(t) === !1 || (i.emit("beforeInit"), i.params.breakpoints && i.setBreakpoint(), i.addClasses(), i.updateSize(), i.updateSlides(), i.params.watchOverflow && i.checkOverflow(), i.params.grabCursor && i.enabled && i.setGrabCursor(), i.params.loop && i.virtual && i.params.virtual.enabled ? i.slideTo(i.params.initialSlide + i.virtual.slidesBefore, 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0), i.params.loop && i.loopCreate(), i.attachEvents(), [...i.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
      a.complete ? Y(i, a) : a.addEventListener("load", (n) => {
        Y(i, n.target);
      });
    }), se(i), i.initialized = !0, se(i), i.emit("init"), i.emit("afterInit")), i;
  }
  destroy(t = !0, i = !0) {
    const s = this, {
      params: a,
      el: n,
      wrapperEl: l,
      slides: r
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), i && (s.removeClasses(), n.removeAttribute("style"), l.removeAttribute("style"), r && r.length && r.forEach((o) => {
      o.classList.remove(a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), o.removeAttribute("style"), o.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((o) => {
      s.off(o);
    }), t !== !1 && (s.el.swiper = null, Ee(s)), s.destroyed = !0), null;
  }
  static extendDefaults(t) {
    z(ee, t);
  }
  static get extendedDefaults() {
    return ee;
  }
  static get defaults() {
    return fe;
  }
  static installModule(t) {
    O.prototype.__modules__ || (O.prototype.__modules__ = []);
    const i = O.prototype.__modules__;
    typeof t == "function" && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t) ? (t.forEach((i) => O.installModule(i)), O) : (O.installModule(t), O);
  }
}
Object.keys(J).forEach((e) => {
  Object.keys(J[e]).forEach((t) => {
    O.prototype[t] = J[e][t];
  });
});
O.use([Ge, Be]);
function Se(e, t, i, s) {
  return e.params.createElements && Object.keys(s).forEach((a) => {
    if (!i[a] && i.auto === !0) {
      let n = B(e.el, `.${s[a]}`)[0];
      n || (n = ae("div", s[a]), n.className = s[a], e.el.append(n)), i[a] = n, t[a] = n;
    }
  }), i;
}
function Ht({
  swiper: e,
  extendParams: t,
  on: i,
  emit: s
}) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null
  };
  const a = (v) => (Array.isArray(v) || (v = [v].filter((S) => !!S)), v);
  function n(v) {
    let S;
    return v && typeof v == "string" && e.isElement && (S = e.el.shadowRoot.querySelector(v), S) ? S : (v && (typeof v == "string" && (S = [...document.querySelectorAll(v)]), e.params.uniqueNavElements && typeof v == "string" && S.length > 1 && e.el.querySelectorAll(v).length === 1 && (S = e.el.querySelector(v))), v && !S ? v : S);
  }
  function l(v, S) {
    const T = e.params.navigation;
    v = a(v), v.forEach((d) => {
      d && (d.classList[S ? "add" : "remove"](...T.disabledClass.split(" ")), d.tagName === "BUTTON" && (d.disabled = S), e.params.watchOverflow && e.enabled && d.classList[e.isLocked ? "add" : "remove"](T.lockClass));
    });
  }
  function r() {
    const {
      nextEl: v,
      prevEl: S
    } = e.navigation;
    if (e.params.loop) {
      l(S, !1), l(v, !1);
      return;
    }
    l(S, e.isBeginning && !e.params.rewind), l(v, e.isEnd && !e.params.rewind);
  }
  function o(v) {
    v.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function c(v) {
    v.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function g() {
    const v = e.params.navigation;
    if (e.params.navigation = Se(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(v.nextEl || v.prevEl))
      return;
    let S = n(v.nextEl), T = n(v.prevEl);
    Object.assign(e.navigation, {
      nextEl: S,
      prevEl: T
    }), S = a(S), T = a(T);
    const d = (f, b) => {
      f && f.addEventListener("click", b === "next" ? c : o), !e.enabled && f && f.classList.add(...v.lockClass.split(" "));
    };
    S.forEach((f) => d(f, "next")), T.forEach((f) => d(f, "prev"));
  }
  function p() {
    let {
      nextEl: v,
      prevEl: S
    } = e.navigation;
    v = a(v), S = a(S);
    const T = (d, f) => {
      d.removeEventListener("click", f === "next" ? c : o), d.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    v.forEach((d) => T(d, "next")), S.forEach((d) => T(d, "prev"));
  }
  i("init", () => {
    e.params.navigation.enabled === !1 ? h() : (g(), r());
  }), i("toEdge fromEdge lock unlock", () => {
    r();
  }), i("destroy", () => {
    p();
  }), i("enable disable", () => {
    let {
      nextEl: v,
      prevEl: S
    } = e.navigation;
    v = a(v), S = a(S), [...v, ...S].filter((T) => !!T).forEach((T) => T.classList[e.enabled ? "remove" : "add"](e.params.navigation.lockClass));
  }), i("click", (v, S) => {
    let {
      nextEl: T,
      prevEl: d
    } = e.navigation;
    T = a(T), d = a(d);
    const f = S.target;
    if (e.params.navigation.hideOnClick && !d.includes(f) && !T.includes(f)) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === f || e.pagination.el.contains(f)))
        return;
      let b;
      T.length ? b = T[0].classList.contains(e.params.navigation.hiddenClass) : d.length && (b = d[0].classList.contains(e.params.navigation.hiddenClass)), s(b === !0 ? "navigationShow" : "navigationHide"), [...T, ...d].filter((y) => !!y).forEach((y) => y.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const m = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), g(), r();
  }, h = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), p();
  };
  Object.assign(e.navigation, {
    enable: m,
    disable: h,
    update: r,
    init: g,
    destroy: p
  });
}
function _(e = "") {
  return `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function $t({
  swiper: e,
  extendParams: t,
  on: i,
  emit: s
}) {
  const a = "swiper-pagination";
  t({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (d) => d,
      formatFractionTotal: (d) => d,
      bulletClass: `${a}-bullet`,
      bulletActiveClass: `${a}-bullet-active`,
      modifierClass: `${a}-`,
      currentClass: `${a}-current`,
      totalClass: `${a}-total`,
      hiddenClass: `${a}-hidden`,
      progressbarFillClass: `${a}-progressbar-fill`,
      progressbarOppositeClass: `${a}-progressbar-opposite`,
      clickableClass: `${a}-clickable`,
      lockClass: `${a}-lock`,
      horizontalClass: `${a}-horizontal`,
      verticalClass: `${a}-vertical`,
      paginationDisabledClass: `${a}-disabled`
    }
  }), e.pagination = {
    el: null,
    bullets: []
  };
  let n, l = 0;
  const r = (d) => (Array.isArray(d) || (d = [d].filter((f) => !!f)), d);
  function o() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function c(d, f) {
    const {
      bulletActiveClass: b
    } = e.params.pagination;
    d && (d = d[`${f === "prev" ? "previous" : "next"}ElementSibling`], d && (d.classList.add(`${b}-${f}`), d = d[`${f === "prev" ? "previous" : "next"}ElementSibling`], d && d.classList.add(`${b}-${f}-${f}`)));
  }
  function g(d) {
    const f = d.target.closest(_(e.params.pagination.bulletClass));
    if (!f)
      return;
    d.preventDefault();
    const b = R(f) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === b)
        return;
      const y = e.getSlideIndexByData(b), E = e.getSlideIndexByData(e.realIndex);
      y > e.slides.length - e.loopedSlides && e.loopFix({
        direction: y > E ? "next" : "prev",
        activeSlideIndex: y,
        slideTo: !1
      }), e.slideToLoop(b);
    } else
      e.slideTo(b);
  }
  function p() {
    const d = e.rtl, f = e.params.pagination;
    if (o())
      return;
    let b = e.pagination.el;
    b = r(b);
    let y, E;
    const M = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, k = e.params.loop ? Math.ceil(M / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (E = e.previousRealIndex || 0, y = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (y = e.snapIndex, E = e.previousSnapIndex) : (E = e.previousIndex || 0, y = e.activeIndex || 0), f.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const L = e.pagination.bullets;
      let I, A, w;
      if (f.dynamicBullets && (n = ie(L[0], e.isHorizontal() ? "width" : "height", !0), b.forEach((C) => {
        C.style[e.isHorizontal() ? "width" : "height"] = `${n * (f.dynamicMainBullets + 4)}px`;
      }), f.dynamicMainBullets > 1 && E !== void 0 && (l += y - (E || 0), l > f.dynamicMainBullets - 1 ? l = f.dynamicMainBullets - 1 : l < 0 && (l = 0)), I = Math.max(y - l, 0), A = I + (Math.min(L.length, f.dynamicMainBullets) - 1), w = (A + I) / 2), L.forEach((C) => {
        const u = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((x) => `${f.bulletActiveClass}${x}`)].map((x) => typeof x == "string" && x.includes(" ") ? x.split(" ") : x).flat();
        C.classList.remove(...u);
      }), b.length > 1)
        L.forEach((C) => {
          const u = R(C);
          u === y && C.classList.add(...f.bulletActiveClass.split(" ")), f.dynamicBullets && (u >= I && u <= A && C.classList.add(...`${f.bulletActiveClass}-main`.split(" ")), u === I && c(C, "prev"), u === A && c(C, "next"));
        });
      else {
        const C = L[y];
        if (C && C.classList.add(...f.bulletActiveClass.split(" ")), f.dynamicBullets) {
          const u = L[I], x = L[A];
          for (let P = I; P <= A; P += 1)
            L[P] && L[P].classList.add(...`${f.bulletActiveClass}-main`.split(" "));
          c(u, "prev"), c(x, "next");
        }
      }
      if (f.dynamicBullets) {
        const C = Math.min(L.length, f.dynamicMainBullets + 4), u = (n * C - n) / 2 - w * n, x = d ? "right" : "left";
        L.forEach((P) => {
          P.style[e.isHorizontal() ? x : "top"] = `${u}px`;
        });
      }
    }
    b.forEach((L, I) => {
      if (f.type === "fraction" && (L.querySelectorAll(_(f.currentClass)).forEach((A) => {
        A.textContent = f.formatFractionCurrent(y + 1);
      }), L.querySelectorAll(_(f.totalClass)).forEach((A) => {
        A.textContent = f.formatFractionTotal(k);
      })), f.type === "progressbar") {
        let A;
        f.progressbarOpposite ? A = e.isHorizontal() ? "vertical" : "horizontal" : A = e.isHorizontal() ? "horizontal" : "vertical";
        const w = (y + 1) / k;
        let C = 1, u = 1;
        A === "horizontal" ? C = w : u = w, L.querySelectorAll(_(f.progressbarFillClass)).forEach((x) => {
          x.style.transform = `translate3d(0,0,0) scaleX(${C}) scaleY(${u})`, x.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      f.type === "custom" && f.renderCustom ? (L.innerHTML = f.renderCustom(e, y + 1, k), I === 0 && s("paginationRender", L)) : (I === 0 && s("paginationRender", L), s("paginationUpdate", L)), e.params.watchOverflow && e.enabled && L.classList[e.isLocked ? "add" : "remove"](f.lockClass);
    });
  }
  function m() {
    const d = e.params.pagination;
    if (o())
      return;
    const f = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length;
    let b = e.pagination.el;
    b = r(b);
    let y = "";
    if (d.type === "bullets") {
      let E = e.params.loop ? Math.ceil(f / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && E > f && (E = f);
      for (let M = 0; M < E; M += 1)
        d.renderBullet ? y += d.renderBullet.call(e, M, d.bulletClass) : y += `<${d.bulletElement} class="${d.bulletClass}"></${d.bulletElement}>`;
    }
    d.type === "fraction" && (d.renderFraction ? y = d.renderFraction.call(e, d.currentClass, d.totalClass) : y = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`), d.type === "progressbar" && (d.renderProgressbar ? y = d.renderProgressbar.call(e, d.progressbarFillClass) : y = `<span class="${d.progressbarFillClass}"></span>`), e.pagination.bullets = [], b.forEach((E) => {
      d.type !== "custom" && (E.innerHTML = y || ""), d.type === "bullets" && e.pagination.bullets.push(...E.querySelectorAll(_(d.bulletClass)));
    }), d.type !== "custom" && s("paginationRender", b[0]);
  }
  function h() {
    e.params.pagination = Se(e, e.originalParams.pagination, e.params.pagination, {
      el: "swiper-pagination"
    });
    const d = e.params.pagination;
    if (!d.el)
      return;
    let f;
    typeof d.el == "string" && e.isElement && (f = e.el.shadowRoot.querySelector(d.el)), !f && typeof d.el == "string" && (f = [...document.querySelectorAll(d.el)]), f || (f = d.el), !(!f || f.length === 0) && (e.params.uniqueNavElements && typeof d.el == "string" && Array.isArray(f) && f.length > 1 && (f = [...e.el.querySelectorAll(d.el)], f.length > 1 && (f = f.filter((b) => he(b, ".swiper")[0] === e.el)[0])), Array.isArray(f) && f.length === 1 && (f = f[0]), Object.assign(e.pagination, {
      el: f
    }), f = r(f), f.forEach((b) => {
      d.type === "bullets" && d.clickable && b.classList.add(d.clickableClass), b.classList.add(d.modifierClass + d.type), b.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.type === "bullets" && d.dynamicBullets && (b.classList.add(`${d.modifierClass}${d.type}-dynamic`), l = 0, d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)), d.type === "progressbar" && d.progressbarOpposite && b.classList.add(d.progressbarOppositeClass), d.clickable && b.addEventListener("click", g), e.enabled || b.classList.add(d.lockClass);
    }));
  }
  function v() {
    const d = e.params.pagination;
    if (o())
      return;
    let f = e.pagination.el;
    f && (f = r(f), f.forEach((b) => {
      b.classList.remove(d.hiddenClass), b.classList.remove(d.modifierClass + d.type), b.classList.remove(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.clickable && b.removeEventListener("click", g);
    })), e.pagination.bullets && e.pagination.bullets.forEach((b) => b.classList.remove(...d.bulletActiveClass.split(" ")));
  }
  i("changeDirection", () => {
    if (!e.pagination || !e.pagination.el)
      return;
    const d = e.params.pagination;
    let {
      el: f
    } = e.pagination;
    f = r(f), f.forEach((b) => {
      b.classList.remove(d.horizontalClass, d.verticalClass), b.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass);
    });
  }), i("init", () => {
    e.params.pagination.enabled === !1 ? T() : (h(), m(), p());
  }), i("activeIndexChange", () => {
    typeof e.snapIndex > "u" && p();
  }), i("snapIndexChange", () => {
    p();
  }), i("snapGridLengthChange", () => {
    m(), p();
  }), i("destroy", () => {
    v();
  }), i("enable disable", () => {
    let {
      el: d
    } = e.pagination;
    d && (d = r(d), d.forEach((f) => f.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), i("lock unlock", () => {
    p();
  }), i("click", (d, f) => {
    const b = f.target;
    let {
      el: y
    } = e.pagination;
    if (Array.isArray(y) || (y = [y].filter((E) => !!E)), e.params.pagination.el && e.params.pagination.hideOnClick && y && y.length > 0 && !b.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && b === e.navigation.nextEl || e.navigation.prevEl && b === e.navigation.prevEl))
        return;
      const E = y[0].classList.contains(e.params.pagination.hiddenClass);
      s(E === !0 ? "paginationShow" : "paginationHide"), y.forEach((M) => M.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const S = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let {
      el: d
    } = e.pagination;
    d && (d = r(d), d.forEach((f) => f.classList.remove(e.params.pagination.paginationDisabledClass))), h(), m(), p();
  }, T = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let {
      el: d
    } = e.pagination;
    d && (d = r(d), d.forEach((f) => f.classList.add(e.params.pagination.paginationDisabledClass))), v();
  };
  Object.assign(e.pagination, {
    enable: S,
    disable: T,
    render: m,
    update: p,
    init: h,
    destroy: v
  });
}
function jt({
  swiper: e,
  extendParams: t,
  on: i
}) {
  t({
    parallax: {
      enabled: !1
    }
  });
  const s = (l, r) => {
    const {
      rtl: o
    } = e, c = o ? -1 : 1, g = l.getAttribute("data-swiper-parallax") || "0";
    let p = l.getAttribute("data-swiper-parallax-x"), m = l.getAttribute("data-swiper-parallax-y");
    const h = l.getAttribute("data-swiper-parallax-scale"), v = l.getAttribute("data-swiper-parallax-opacity"), S = l.getAttribute("data-swiper-parallax-rotate");
    if (p || m ? (p = p || "0", m = m || "0") : e.isHorizontal() ? (p = g, m = "0") : (m = g, p = "0"), p.indexOf("%") >= 0 ? p = `${parseInt(p, 10) * r * c}%` : p = `${p * r * c}px`, m.indexOf("%") >= 0 ? m = `${parseInt(m, 10) * r}%` : m = `${m * r}px`, typeof v < "u" && v !== null) {
      const d = v - (v - 1) * (1 - Math.abs(r));
      l.style.opacity = d;
    }
    let T = `translate3d(${p}, ${m}, 0px)`;
    if (typeof h < "u" && h !== null) {
      const d = h - (h - 1) * (1 - Math.abs(r));
      T += ` scale(${d})`;
    }
    if (S && typeof S < "u" && S !== null) {
      const d = S * r * -1;
      T += ` rotate(${d}deg)`;
    }
    l.style.transform = T;
  }, a = () => {
    const {
      el: l,
      slides: r,
      progress: o,
      snapGrid: c
    } = e;
    B(l, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((g) => {
      s(g, o);
    }), r.forEach((g, p) => {
      let m = g.progress;
      e.params.slidesPerGroup > 1 && e.params.slidesPerView !== "auto" && (m += Math.ceil(p / 2) - o * (c.length - 1)), m = Math.min(Math.max(m, -1), 1), g.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((h) => {
        s(h, m);
      });
    });
  }, n = (l = e.params.speed) => {
    const {
      el: r
    } = e;
    r.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((o) => {
      let c = parseInt(o.getAttribute("data-swiper-parallax-duration"), 10) || l;
      l === 0 && (c = 0), o.style.transitionDuration = `${c}ms`;
    });
  };
  i("beforeInit", () => {
    e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0);
  }), i("init", () => {
    e.params.parallax.enabled && a();
  }), i("setTranslate", () => {
    e.params.parallax.enabled && a();
  }), i("setTransition", (l, r) => {
    e.params.parallax.enabled && n(r);
  });
}
function Rt({
  swiper: e,
  extendParams: t,
  on: i
}) {
  t({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null
    }
  }), e.a11y = {
    clicked: !1
  };
  let s = null;
  function a(u) {
    const x = s;
    x.length !== 0 && (x.innerHTML = "", x.innerHTML = u);
  }
  const n = (u) => (Array.isArray(u) || (u = [u].filter((x) => !!x)), u);
  function l(u = 16) {
    const x = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(u).replace(/x/g, x);
  }
  function r(u) {
    u = n(u), u.forEach((x) => {
      x.setAttribute("tabIndex", "0");
    });
  }
  function o(u) {
    u = n(u), u.forEach((x) => {
      x.setAttribute("tabIndex", "-1");
    });
  }
  function c(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("role", x);
    });
  }
  function g(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("aria-roledescription", x);
    });
  }
  function p(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("aria-controls", x);
    });
  }
  function m(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("aria-label", x);
    });
  }
  function h(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("id", x);
    });
  }
  function v(u, x) {
    u = n(u), u.forEach((P) => {
      P.setAttribute("aria-live", x);
    });
  }
  function S(u) {
    u = n(u), u.forEach((x) => {
      x.setAttribute("aria-disabled", !0);
    });
  }
  function T(u) {
    u = n(u), u.forEach((x) => {
      x.setAttribute("aria-disabled", !1);
    });
  }
  function d(u) {
    if (u.keyCode !== 13 && u.keyCode !== 32)
      return;
    const x = e.params.a11y, P = u.target;
    e.pagination && e.pagination.el && (P === e.pagination.el || e.pagination.el.contains(u.target)) && !u.target.matches(_(e.params.pagination.bulletClass)) || (e.navigation && e.navigation.nextEl && P === e.navigation.nextEl && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? a(x.lastSlideMessage) : a(x.nextSlideMessage)), e.navigation && e.navigation.prevEl && P === e.navigation.prevEl && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? a(x.firstSlideMessage) : a(x.prevSlideMessage)), e.pagination && P.matches(_(e.params.pagination.bulletClass)) && P.click());
  }
  function f() {
    if (e.params.loop || e.params.rewind || !e.navigation)
      return;
    const {
      nextEl: u,
      prevEl: x
    } = e.navigation;
    x && (e.isBeginning ? (S(x), o(x)) : (T(x), r(x))), u && (e.isEnd ? (S(u), o(u)) : (T(u), r(u)));
  }
  function b() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function y() {
    return b() && e.params.pagination.clickable;
  }
  function E() {
    const u = e.params.a11y;
    b() && e.pagination.bullets.forEach((x) => {
      e.params.pagination.clickable && (r(x), e.params.pagination.renderBullet || (c(x, "button"), m(x, u.paginationBulletMessage.replace(/\{\{index\}\}/, R(x) + 1)))), x.matches(_(e.params.pagination.bulletActiveClass)) ? x.setAttribute("aria-current", "true") : x.removeAttribute("aria-current");
    });
  }
  const M = (u, x, P) => {
    r(u), u.tagName !== "BUTTON" && (c(u, "button"), u.addEventListener("keydown", d)), m(u, P), p(u, x);
  }, k = () => {
    e.a11y.clicked = !0;
  }, L = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.destroyed || (e.a11y.clicked = !1);
      });
    });
  }, I = (u) => {
    if (e.a11y.clicked)
      return;
    const x = u.target.closest(`.${e.params.slideClass}, swiper-slide`);
    if (!x || !e.slides.includes(x))
      return;
    const P = e.slides.indexOf(x) === e.activeIndex, G = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(x);
    P || G || u.sourceCapabilities && u.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, e.slideTo(e.slides.indexOf(x), 0));
  }, A = () => {
    const u = e.params.a11y;
    u.itemRoleDescriptionMessage && g(e.slides, u.itemRoleDescriptionMessage), u.slideRole && c(e.slides, u.slideRole);
    const x = e.slides.length;
    u.slideLabelMessage && e.slides.forEach((P, G) => {
      const j = e.params.loop ? parseInt(P.getAttribute("data-swiper-slide-index"), 10) : G, N = u.slideLabelMessage.replace(/\{\{index\}\}/, j + 1).replace(/\{\{slidesLength\}\}/, x);
      m(P, N);
    });
  }, w = () => {
    const u = e.params.a11y;
    e.isElement ? e.el.shadowEl.append(s) : e.el.append(s);
    const x = e.el;
    u.containerRoleDescriptionMessage && g(x, u.containerRoleDescriptionMessage), u.containerMessage && m(x, u.containerMessage);
    const P = e.wrapperEl, G = u.id || P.getAttribute("id") || `swiper-wrapper-${l(16)}`, j = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
    h(P, G), v(P, j), A();
    let {
      nextEl: N,
      prevEl: F
    } = e.navigation ? e.navigation : {};
    N = n(N), F = n(F), N && N.forEach((H) => M(H, G, u.nextSlideMessage)), F && F.forEach((H) => M(H, G, u.prevSlideMessage)), y() && (Array.isArray(e.pagination.el) ? e.pagination.el : [e.pagination.el]).forEach((q) => {
      q.addEventListener("keydown", d);
    }), e.el.addEventListener("focus", I, !0), e.el.addEventListener("pointerdown", k, !0), e.el.addEventListener("pointerup", L, !0);
  };
  function C() {
    s && s.remove();
    let {
      nextEl: u,
      prevEl: x
    } = e.navigation ? e.navigation : {};
    u = n(u), x = n(x), u && u.forEach((P) => P.removeEventListener("keydown", d)), x && x.forEach((P) => P.removeEventListener("keydown", d)), y() && (Array.isArray(e.pagination.el) ? e.pagination.el : [e.pagination.el]).forEach((G) => {
      G.removeEventListener("keydown", d);
    }), e.el.removeEventListener("focus", I, !0), e.el.removeEventListener("pointerdown", k, !0), e.el.removeEventListener("pointerup", L, !0);
  }
  i("beforeInit", () => {
    s = ae("span", e.params.a11y.notificationClass), s.setAttribute("aria-live", "assertive"), s.setAttribute("aria-atomic", "true");
  }), i("afterInit", () => {
    e.params.a11y.enabled && w();
  }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    e.params.a11y.enabled && A();
  }), i("fromEdge toEdge afterInit lock unlock", () => {
    e.params.a11y.enabled && f();
  }), i("paginationUpdate", () => {
    e.params.a11y.enabled && E();
  }), i("destroy", () => {
    e.params.a11y.enabled && C();
  });
}
function qt(e) {
  const {
    effect: t,
    swiper: i,
    on: s,
    setTranslate: a,
    setTransition: n,
    overwriteParams: l,
    perspective: r,
    recreateShadows: o,
    getEffectParams: c
  } = e;
  s("beforeInit", () => {
    if (i.params.effect !== t)
      return;
    i.classNames.push(`${i.params.containerModifierClass}${t}`), r && r() && i.classNames.push(`${i.params.containerModifierClass}3d`);
    const p = l ? l() : {};
    Object.assign(i.params, p), Object.assign(i.originalParams, p);
  }), s("setTranslate", () => {
    i.params.effect === t && a();
  }), s("setTransition", (p, m) => {
    i.params.effect === t && n(m);
  }), s("transitionEnd", () => {
    if (i.params.effect === t && o) {
      if (!c || !c().slideShadows)
        return;
      i.slides.forEach((p) => {
        p.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((m) => m.remove());
      }), o();
    }
  });
  let g;
  s("virtualUpdate", () => {
    i.params.effect === t && (i.slides.length || (g = !0), requestAnimationFrame(() => {
      g && i.slides && i.slides.length && (a(), g = !1);
    }));
  });
}
function Wt(e, t) {
  const i = me(t);
  return i !== t && (i.style.backfaceVisibility = "hidden", i.style["-webkit-backface-visibility"] = "hidden"), i;
}
function Xt({
  swiper: e,
  duration: t,
  transformElements: i,
  allSlides: s
}) {
  const {
    activeIndex: a
  } = e, n = (l) => l.parentElement ? l.parentElement : e.slides.filter((o) => o.shadowEl && o.shadowEl === l.parentNode)[0];
  if (e.params.virtualTranslate && t !== 0) {
    let l = !1, r;
    s ? r = i : r = i.filter((o) => {
      const c = o.classList.contains("swiper-slide-transform") ? n(o) : o;
      return e.getSlideIndex(c) === a;
    }), r.forEach((o) => {
      Ie(o, () => {
        if (l || !e || e.destroyed)
          return;
        l = !0, e.animating = !1;
        const c = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        e.wrapperEl.dispatchEvent(c);
      });
    });
  }
}
function Yt({
  swiper: e,
  extendParams: t,
  on: i
}) {
  t({
    fadeEffect: {
      crossFade: !1
    }
  }), qt({
    effect: "fade",
    swiper: e,
    on: i,
    setTranslate: () => {
      const {
        slides: n
      } = e, l = e.params.fadeEffect;
      for (let r = 0; r < n.length; r += 1) {
        const o = e.slides[r];
        let g = -o.swiperSlideOffset;
        e.params.virtualTranslate || (g -= e.translate);
        let p = 0;
        e.isHorizontal() || (p = g, g = 0);
        const m = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(o.progress), 0) : 1 + Math.min(Math.max(o.progress, -1), 0), h = Wt(l, o);
        h.style.opacity = m, h.style.transform = `translate3d(${g}px, ${p}px, 0px)`;
      }
    },
    setTransition: (n) => {
      const l = e.slides.map((r) => me(r));
      l.forEach((r) => {
        r.style.transitionDuration = `${n}ms`;
      }), Xt({
        swiper: e,
        duration: n,
        transformElements: l,
        allSlides: !0
      });
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode
    })
  });
}
O.use([Ht, $t, Yt, jt, Rt]);
((e) => {
  new O(".js-home-slideshow", {
    effect: "fade",
    loop: !0,
    parallax: !0,
    autoplay: {
      delay: 7e3,
      //7 seconds per slide
      disableOnInteraction: !1
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      hideOnclick: !1,
      clickable: !0
    }
  }), new O(".js-testimonial-slideshow", {
    loop: !0,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      hideOnclick: !1,
      clickable: !0
    }
  }), document.querySelectorAll(".gallery").forEach((i, s) => {
    let a = i.querySelector(".js-gallery-slides"), n = i.querySelector(".js-gallery-thumbs");
    const l = new O(n, {
      spaceBetween: 10,
      slidesPerView: "auto",
      loop: !1,
      freeMode: !0
    });
    new O(a, {
      loop: !1,
      fadeEffect: { crossFade: !0 },
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      thumbs: {
        swiper: l
      }
    });
  });
})(jQuery);
function Ut(e, t, i) {
  var s = i || {}, a = s.noTrailing, n = a === void 0 ? !1 : a, l = s.noLeading, r = l === void 0 ? !1 : l, o = s.debounceMode, c = o === void 0 ? void 0 : o, g, p = !1, m = 0;
  function h() {
    g && clearTimeout(g);
  }
  function v(T) {
    var d = T || {}, f = d.upcomingOnly, b = f === void 0 ? !1 : f;
    h(), p = !b;
  }
  function S() {
    for (var T = arguments.length, d = new Array(T), f = 0; f < T; f++)
      d[f] = arguments[f];
    var b = this, y = Date.now() - m;
    if (p)
      return;
    function E() {
      m = Date.now(), t.apply(b, d);
    }
    function M() {
      g = void 0;
    }
    !r && c && !g && E(), h(), c === void 0 && y > e ? r ? (m = Date.now(), n || (g = setTimeout(c ? M : E, e))) : E() : n !== !0 && (g = setTimeout(c ? M : E, c === void 0 ? e - y : e));
  }
  return S.cancel = v, S;
}
function Kt(e, t, i) {
  var s = i || {}, a = s.atBegin, n = a === void 0 ? !1 : a;
  return Ut(e, t, {
    debounceMode: n !== !1
  });
}
const Qt = ((e) => function(i) {
  i = e.extend({}, {
    wrapperSelector: ".site-wrapper",
    menuButtonSelector: ".menu-btn",
    menuOpenWrapperClass: "menu-open",
    activeClass: "active",
    dropdownSelector: "",
    navType: "offCanvas",
    debounceTime: 150,
    closeOnOutsideClick: !1,
    showTabsOnFocus: !0
  }, i);
  const s = e(this), a = e(i.wrapperSelector), n = e(i.menuButtonSelector), l = i.dropdownSelector ? e(i.dropdownSelector) : s;
  function r() {
    return n.hasClass(i.activeClass);
  }
  function o() {
    l.slideUp();
  }
  function c() {
    a.removeClass(i.menuOpenWrapperClass);
  }
  const p = {
    dropdown: o,
    offCanvas: c
  }[i.navType] || c;
  function m() {
    p(), n.removeClass(i.activeClass);
  }
  function h() {
    l.slideDown();
  }
  function v() {
    a.addClass(i.menuOpenWrapperClass);
  }
  const T = {
    dropdown: h,
    offCanvas: v
  }[i.navType] || v;
  function d() {
    T(), n.addClass(i.activeClass), i.closeOnOutsideClick && e(i.wrapperSelector).on("touchstart, click", function(E) {
      !s.is(E.target) && s.has(E.target).length === 0 && m();
    });
  }
  i.showTabsOnFocus && (e("nav.main-nav > ul > li.menu-item-has-children > a").on("focus", function() {
    e(this).siblings("ul").addClass("tab-show");
  }).on("blur", function() {
    e(this).siblings("ul").removeClass("tab-show");
  }), e("nav.main-nav > ul > li.menu-item-has-children > ul > li > a").on("focus", function() {
    e(this).parent().parent("ul").addClass("tab-show");
  }).on("blur", function() {
    e(this).parent().parent("ul").removeClass("tab-show");
  }));
  const f = function() {
    s.find(".nav-expander").each(function() {
      e(this).on("touchstart, click", function(y) {
        y.stopPropagation(), y.preventDefault(), r() && !e(this).parent().next().is(":visible") && e(this).parent().next().length > 0 ? (e(this).parent().parent().siblings().removeClass("toggle").children("ul").slideUp(250), e(this).parent().parent().addClass("toggle"), e(this).parent().next("ul").slideDown(250)) : r() && e(this).parent().next("ul").is(":visible") && (e(this).parent().parent().removeClass("toggle"), e(this).parent().next("ul").slideUp(250));
      });
    });
  }, b = function() {
    n.is(":visible") && s.find("li.current_page_item, li.current_page_ancestor").each(function() {
      e(this).hasClass("toggle") || e(this).addClass("toggle"), e(this).children("ul").is(":visible") || e(this).children("ul").show();
    });
  };
  return n.on("touchstart, click", function(y) {
    y.stopPropagation(), y.preventDefault(), r() ? m() : d();
  }), f(), b(), e(window).on("resize", Kt(i.debounceTime, function() {
    n.is(":visible") ? b() : (r() && (n.removeClass(i.activeClass), a.removeClass(i.menuOpenWrapperClass), s.removeAttr("style")), s.find("ul").removeAttr("style"), s.find(".menu-item-has-children").removeClass("toggle"), s.removeAttr("style"));
  })), this;
})(jQuery), Zt = ((e) => function() {
  const t = e("dl.accordion dt"), i = window.location.hash, s = window.location.hash.replace("#", ""), a = function(n, l, r) {
    l.hasClass("active") && r.is(":visible") ? (r.slideUp(), l.removeClass("active").addClass("inactive")) : (r.slideDown(), l.addClass("active").removeClass("inactive"), window.location.hash = n);
  };
  if (t.find("a").on("click", function(n) {
    n.preventDefault();
    const l = e(this).attr("href"), r = e(this).closest("dt"), o = r.next();
    a(l, r, o);
  }), i && e('dl.accordion dt[data-id="' + s + '"]').length > 0) {
    const n = e('dl.accordion dt[data-id="' + s + '"]'), l = n.next(), r = n.offset().top;
    a(i, n, l), e(document).scrollTop(r);
  }
})(jQuery);
((e) => {
  console.log(e().jquery, window.jQuery), e.fn.responsiveNav = Qt, e.fn.accordion = Zt;
  const t = document.querySelector("html");
  t.classList.remove("no-js"), t.classList.add("js"), e("nav.main-nav").responsiveNav({
    navType: "offCanvas",
    closeOnOutsideClick: !0
  }), e("nav.subnav").responsiveNav({
    navType: "dropdown",
    menuButtonSelector: ".subnav__mobile-toggle",
    dropdownSelector: ".subnav__menu"
  }), e(".rtecontent").fitVids(), e("dl.accordion").accordion(), e("#categoryFilter").on("change", function() {
    var i = e(this).val();
    window.location = i;
  }), e(".js-open-search").magnificPopup({
    type: "inline",
    alignTop: !0,
    modal: !0,
    midClick: !0,
    // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    mainClass: "mfp-fade",
    focus: "#s",
    callbacks: {
      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      beforeOpen: function() {
        e(window).width() < 700 ? this.st.focus = !1 : this.st.focus = "#s";
      }
    }
  }), e(document).on("click", ".js-close-popup", function(i) {
    i.preventDefault(), e.magnificPopup.close();
  });
})(jQuery);
