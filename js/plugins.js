/* jQuery FlexSlider v2.2.2 */
!(function (a) {
  (a.flexslider = function (b, c) {
    var d = a(b);
    d.vars = a.extend({}, a.flexslider.defaults, c);
    var j,
      e = d.vars.namespace,
      f =
        window.navigator &&
        window.navigator.msPointerEnabled &&
        window.MSGesture,
      g =
        ("ontouchstart" in window ||
          f ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        d.vars.touch,
      h = "click touchend MSPointerUp",
      i = "",
      k = "vertical" === d.vars.direction,
      l = d.vars.reverse,
      m = d.vars.itemWidth > 0,
      n = "fade" === d.vars.animation,
      o = "" !== d.vars.asNavFor,
      p = {},
      q = !0;
    a.data(b, "flexslider", d),
      (p = {
        init: function () {
          (d.animating = !1),
            (d.currentSlide = parseInt(
              d.vars.startAt ? d.vars.startAt : 0,
              10,
            )),
            isNaN(d.currentSlide) && (d.currentSlide = 0),
            (d.animatingTo = d.currentSlide),
            (d.atEnd = 0 === d.currentSlide || d.currentSlide === d.last),
            (d.containerSelector = d.vars.selector.substr(
              0,
              d.vars.selector.search(" "),
            )),
            (d.slides = a(d.vars.selector, d)),
            (d.container = a(d.containerSelector, d)),
            (d.count = d.slides.length),
            (d.syncExists = a(d.vars.sync).length > 0),
            "slide" === d.vars.animation && (d.vars.animation = "swing"),
            (d.prop = k ? "top" : "marginLeft"),
            (d.args = {}),
            (d.manualPause = !1),
            (d.stopped = !1),
            (d.started = !1),
            (d.startTimeout = null),
            (d.transitions =
              !d.vars.video &&
              !n &&
              d.vars.useCSS &&
              (function () {
                var a = document.createElement("div"),
                  b = [
                    "perspectiveProperty",
                    "WebkitPerspective",
                    "MozPerspective",
                    "OPerspective",
                    "msPerspective",
                  ];
                for (var c in b)
                  if (void 0 !== a.style[b[c]])
                    return (
                      (d.pfx = b[c].replace("Perspective", "").toLowerCase()),
                      (d.prop = "-" + d.pfx + "-transform"),
                      !0
                    );
                return !1;
              })()),
            (d.ensureAnimationEnd = ""),
            "" !== d.vars.controlsContainer &&
              (d.controlsContainer =
                a(d.vars.controlsContainer).length > 0 &&
                a(d.vars.controlsContainer)),
            "" !== d.vars.manualControls &&
              (d.manualControls =
                a(d.vars.manualControls).length > 0 &&
                a(d.vars.manualControls)),
            d.vars.randomize &&
              (d.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              d.container.empty().append(d.slides)),
            d.doMath(),
            d.setup("init"),
            d.vars.controlNav && p.controlNav.setup(),
            d.vars.directionNav && p.directionNav.setup(),
            d.vars.keyboard &&
              (1 === a(d.containerSelector).length ||
                d.vars.multipleKeyboard) &&
              a(document).bind("keyup", function (a) {
                var b = a.keyCode;
                if (!d.animating && (39 === b || 37 === b)) {
                  var c =
                    39 === b
                      ? d.getTarget("next")
                      : 37 === b
                        ? d.getTarget("prev")
                        : !1;
                  d.flexAnimate(c, d.vars.pauseOnAction);
                }
              }),
            d.vars.mousewheel &&
              d.bind("mousewheel", function (a, b) {
                a.preventDefault();
                var f = 0 > b ? d.getTarget("next") : d.getTarget("prev");
                d.flexAnimate(f, d.vars.pauseOnAction);
              }),
            d.vars.pausePlay && p.pausePlay.setup(),
            d.vars.slideshow &&
              d.vars.pauseInvisible &&
              p.pauseInvisible.init(),
            d.vars.slideshow &&
              (d.vars.pauseOnHover &&
                d.hover(
                  function () {
                    d.manualPlay || d.manualPause || d.pause();
                  },
                  function () {
                    d.manualPause || d.manualPlay || d.stopped || d.play();
                  },
                ),
              (d.vars.pauseInvisible && p.pauseInvisible.isHidden()) ||
                (d.vars.initDelay > 0
                  ? (d.startTimeout = setTimeout(d.play, d.vars.initDelay))
                  : d.play())),
            o && p.asNav.setup(),
            g && d.vars.touch && p.touch(),
            (!n || (n && d.vars.smoothHeight)) &&
              a(window).bind("resize orientationchange focus", p.resize),
            d.find("img").attr("draggable", "false"),
            setTimeout(function () {
              d.vars.start(d);
            }, 200);
        },
        asNav: {
          setup: function () {
            (d.asNav = !0),
              (d.animatingTo = Math.floor(d.currentSlide / d.move)),
              (d.currentItem = d.currentSlide),
              d.slides
                .removeClass(e + "active-slide")
                .eq(d.currentItem)
                .addClass(e + "active-slide"),
              f
                ? ((b._slider = d),
                  d.slides.each(function () {
                    var b = this;
                    (b._gesture = new MSGesture()),
                      (b._gesture.target = b),
                      b.addEventListener(
                        "MSPointerDown",
                        function (a) {
                          a.preventDefault(),
                            a.currentTarget._gesture &&
                              a.currentTarget._gesture.addPointer(a.pointerId);
                        },
                        !1,
                      ),
                      b.addEventListener("MSGestureTap", function (b) {
                        b.preventDefault();
                        var c = a(this),
                          e = c.index();
                        a(d.vars.asNavFor).data("flexslider").animating ||
                          c.hasClass("active") ||
                          ((d.direction = d.currentItem < e ? "next" : "prev"),
                          d.flexAnimate(e, d.vars.pauseOnAction, !1, !0, !0));
                      });
                  }))
                : d.slides.on(h, function (b) {
                    b.preventDefault();
                    var c = a(this),
                      f = c.index(),
                      g = c.offset().left - a(d).scrollLeft();
                    0 >= g && c.hasClass(e + "active-slide")
                      ? d.flexAnimate(d.getTarget("prev"), !0)
                      : a(d.vars.asNavFor).data("flexslider").animating ||
                        c.hasClass(e + "active-slide") ||
                        ((d.direction = d.currentItem < f ? "next" : "prev"),
                        d.flexAnimate(f, d.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            d.manualControls
              ? p.controlNav.setupManual()
              : p.controlNav.setupPaging();
          },
          setupPaging: function () {
            var f,
              g,
              b =
                "thumbnails" === d.vars.controlNav
                  ? "control-thumbs"
                  : "control-paging",
              c = 1;
            if (
              ((d.controlNavScaffold = a(
                '<ol class="' + e + "control-nav " + e + b + '"></ol>',
              )),
              d.pagingCount > 1)
            )
              for (var j = 0; j < d.pagingCount; j++) {
                if (
                  ((g = d.slides.eq(j)),
                  (f =
                    "thumbnails" === d.vars.controlNav
                      ? '<img src="' + g.attr("data-thumb") + '"/>'
                      : "<a>" + c + "</a>"),
                  "thumbnails" === d.vars.controlNav &&
                    !0 === d.vars.thumbCaptions)
                ) {
                  var k = g.attr("data-thumbcaption");
                  "" != k &&
                    void 0 != k &&
                    (f += '<span class="' + e + 'caption">' + k + "</span>");
                }
                d.controlNavScaffold.append("<li>" + f + "</li>"), c++;
              }
            d.controlsContainer
              ? a(d.controlsContainer).append(d.controlNavScaffold)
              : d.append(d.controlNavScaffold),
              p.controlNav.set(),
              p.controlNav.active(),
              d.controlNavScaffold.delegate("a, img", h, function (b) {
                if ((b.preventDefault(), "" === i || i === b.type)) {
                  var c = a(this),
                    f = d.controlNav.index(c);
                  c.hasClass(e + "active") ||
                    ((d.direction = f > d.currentSlide ? "next" : "prev"),
                    d.flexAnimate(f, d.vars.pauseOnAction));
                }
                "" === i && (i = b.type), p.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (d.controlNav = d.manualControls),
              p.controlNav.active(),
              d.controlNav.bind(h, function (b) {
                if ((b.preventDefault(), "" === i || i === b.type)) {
                  var c = a(this),
                    f = d.controlNav.index(c);
                  c.hasClass(e + "active") ||
                    ((d.direction = f > d.currentSlide ? "next" : "prev"),
                    d.flexAnimate(f, d.vars.pauseOnAction));
                }
                "" === i && (i = b.type), p.setToClearWatchedEvent();
              });
          },
          set: function () {
            var b = "thumbnails" === d.vars.controlNav ? "img" : "a";
            d.controlNav = a(
              "." + e + "control-nav li " + b,
              d.controlsContainer ? d.controlsContainer : d,
            );
          },
          active: function () {
            d.controlNav
              .removeClass(e + "active")
              .eq(d.animatingTo)
              .addClass(e + "active");
          },
          update: function (b, c) {
            d.pagingCount > 1 && "add" === b
              ? d.controlNavScaffold.append(
                  a("<li><a>" + d.count + "</a></li>"),
                )
              : 1 === d.pagingCount
                ? d.controlNavScaffold.find("li").remove()
                : d.controlNav.eq(c).closest("li").remove(),
              p.controlNav.set(),
              d.pagingCount > 1 && d.pagingCount !== d.controlNav.length
                ? d.update(c, b)
                : p.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var b = a(
              '<ul class="' +
                e +
                'direction-nav"><li><a class="' +
                e +
                'prev" href="#">' +
                d.vars.prevText +
                '</a></li><li><a class="' +
                e +
                'next" href="#">' +
                d.vars.nextText +
                "</a></li></ul>",
            );
            d.controlsContainer
              ? (a(d.controlsContainer).append(b),
                (d.directionNav = a(
                  "." + e + "direction-nav li a",
                  d.controlsContainer,
                )))
              : (d.append(b),
                (d.directionNav = a("." + e + "direction-nav li a", d))),
              p.directionNav.update(),
              d.directionNav.bind(h, function (b) {
                b.preventDefault();
                var c;
                ("" === i || i === b.type) &&
                  ((c = a(this).hasClass(e + "next")
                    ? d.getTarget("next")
                    : d.getTarget("prev")),
                  d.flexAnimate(c, d.vars.pauseOnAction)),
                  "" === i && (i = b.type),
                  p.setToClearWatchedEvent();
              });
          },
          update: function () {
            var a = e + "disabled";
            1 === d.pagingCount
              ? d.directionNav.addClass(a).attr("tabindex", "-1")
              : d.vars.animationLoop
                ? d.directionNav.removeClass(a).removeAttr("tabindex")
                : 0 === d.animatingTo
                  ? d.directionNav
                      .removeClass(a)
                      .filter("." + e + "prev")
                      .addClass(a)
                      .attr("tabindex", "-1")
                  : d.animatingTo === d.last
                    ? d.directionNav
                        .removeClass(a)
                        .filter("." + e + "next")
                        .addClass(a)
                        .attr("tabindex", "-1")
                    : d.directionNav.removeClass(a).removeAttr("tabindex");
          },
        },
        pausePlay: {
          setup: function () {
            var b = a('<div class="' + e + 'pauseplay"><a></a></div>');
            d.controlsContainer
              ? (d.controlsContainer.append(b),
                (d.pausePlay = a("." + e + "pauseplay a", d.controlsContainer)))
              : (d.append(b), (d.pausePlay = a("." + e + "pauseplay a", d))),
              p.pausePlay.update(d.vars.slideshow ? e + "pause" : e + "play"),
              d.pausePlay.bind(h, function (b) {
                b.preventDefault(),
                  ("" === i || i === b.type) &&
                    (a(this).hasClass(e + "pause")
                      ? ((d.manualPause = !0), (d.manualPlay = !1), d.pause())
                      : ((d.manualPause = !1), (d.manualPlay = !0), d.play())),
                  "" === i && (i = b.type),
                  p.setToClearWatchedEvent();
              });
          },
          update: function (a) {
            "play" === a
              ? d.pausePlay
                  .removeClass(e + "pause")
                  .addClass(e + "play")
                  .html(d.vars.playText)
              : d.pausePlay
                  .removeClass(e + "play")
                  .addClass(e + "pause")
                  .html(d.vars.pauseText);
          },
        },
        touch: function () {
          function r(f) {
            d.animating
              ? f.preventDefault()
              : (window.navigator.msPointerEnabled || 1 === f.touches.length) &&
                (d.pause(),
                (g = k ? d.h : d.w),
                (i = Number(new Date())),
                (o = f.touches[0].pageX),
                (p = f.touches[0].pageY),
                (e =
                  m && l && d.animatingTo === d.last
                    ? 0
                    : m && l
                      ? d.limit -
                        (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo
                      : m && d.currentSlide === d.last
                        ? d.limit
                        : m
                          ? (d.itemW + d.vars.itemMargin) *
                            d.move *
                            d.currentSlide
                          : l
                            ? (d.last - d.currentSlide + d.cloneOffset) * g
                            : (d.currentSlide + d.cloneOffset) * g),
                (a = k ? p : o),
                (c = k ? o : p),
                b.addEventListener("touchmove", s, !1),
                b.addEventListener("touchend", t, !1));
          }
          function s(b) {
            (o = b.touches[0].pageX),
              (p = b.touches[0].pageY),
              (h = k ? a - p : a - o),
              (j = k
                ? Math.abs(h) < Math.abs(o - c)
                : Math.abs(h) < Math.abs(p - c));
            var f = 500;
            (!j || Number(new Date()) - i > f) &&
              (b.preventDefault(),
              !n &&
                d.transitions &&
                (d.vars.animationLoop ||
                  (h /=
                    (0 === d.currentSlide && 0 > h) ||
                    (d.currentSlide === d.last && h > 0)
                      ? Math.abs(h) / g + 2
                      : 1),
                d.setProps(e + h, "setTouch")));
          }
          function t() {
            if (
              (b.removeEventListener("touchmove", s, !1),
              d.animatingTo === d.currentSlide && !j && null !== h)
            ) {
              var k = l ? -h : h,
                m = k > 0 ? d.getTarget("next") : d.getTarget("prev");
              d.canAdvance(m) &&
              ((Number(new Date()) - i < 550 && Math.abs(k) > 50) ||
                Math.abs(k) > g / 2)
                ? d.flexAnimate(m, d.vars.pauseOnAction)
                : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0);
            }
            b.removeEventListener("touchend", t, !1),
              (a = null),
              (c = null),
              (h = null),
              (e = null);
          }
          function u(a) {
            a.stopPropagation(),
              d.animating
                ? a.preventDefault()
                : (d.pause(),
                  b._gesture.addPointer(a.pointerId),
                  (q = 0),
                  (g = k ? d.h : d.w),
                  (i = Number(new Date())),
                  (e =
                    m && l && d.animatingTo === d.last
                      ? 0
                      : m && l
                        ? d.limit -
                          (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo
                        : m && d.currentSlide === d.last
                          ? d.limit
                          : m
                            ? (d.itemW + d.vars.itemMargin) *
                              d.move *
                              d.currentSlide
                            : l
                              ? (d.last - d.currentSlide + d.cloneOffset) * g
                              : (d.currentSlide + d.cloneOffset) * g));
          }
          function v(a) {
            a.stopPropagation();
            var c = a.target._slider;
            if (c) {
              var d = -a.translationX,
                f = -a.translationY;
              return (
                (q += k ? f : d),
                (h = q),
                (j = k
                  ? Math.abs(q) < Math.abs(-d)
                  : Math.abs(q) < Math.abs(-f)),
                a.detail === a.MSGESTURE_FLAG_INERTIA
                  ? (setImmediate(function () {
                      b._gesture.stop();
                    }),
                    void 0)
                  : ((!j || Number(new Date()) - i > 500) &&
                      (a.preventDefault(),
                      !n &&
                        c.transitions &&
                        (c.vars.animationLoop ||
                          (h =
                            q /
                            ((0 === c.currentSlide && 0 > q) ||
                            (c.currentSlide === c.last && q > 0)
                              ? Math.abs(q) / g + 2
                              : 1)),
                        c.setProps(e + h, "setTouch"))),
                    void 0)
              );
            }
          }
          function w(b) {
            b.stopPropagation();
            var d = b.target._slider;
            if (d) {
              if (d.animatingTo === d.currentSlide && !j && null !== h) {
                var f = l ? -h : h,
                  k = f > 0 ? d.getTarget("next") : d.getTarget("prev");
                d.canAdvance(k) &&
                ((Number(new Date()) - i < 550 && Math.abs(f) > 50) ||
                  Math.abs(f) > g / 2)
                  ? d.flexAnimate(k, d.vars.pauseOnAction)
                  : n ||
                    d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0);
              }
              (a = null), (c = null), (h = null), (e = null), (q = 0);
            }
          }
          var a,
            c,
            e,
            g,
            h,
            i,
            j = !1,
            o = 0,
            p = 0,
            q = 0;
          f
            ? ((b.style.msTouchAction = "none"),
              (b._gesture = new MSGesture()),
              (b._gesture.target = b),
              b.addEventListener("MSPointerDown", u, !1),
              (b._slider = d),
              b.addEventListener("MSGestureChange", v, !1),
              b.addEventListener("MSGestureEnd", w, !1))
            : b.addEventListener("touchstart", r, !1);
        },
        resize: function () {
          !d.animating &&
            d.is(":visible") &&
            (m || d.doMath(),
            n
              ? p.smoothHeight()
              : m
                ? (d.slides.width(d.computedW),
                  d.update(d.pagingCount),
                  d.setProps())
                : k
                  ? (d.viewport.height(d.h), d.setProps(d.h, "setTotal"))
                  : (d.vars.smoothHeight && p.smoothHeight(),
                    d.newSlides.width(d.computedW),
                    d.setProps(d.computedW, "setTotal")));
        },
        smoothHeight: function (a) {
          if (!k || n) {
            var b = n ? d : d.viewport;
            a
              ? b.animate({ height: d.slides.eq(d.animatingTo).height() }, a)
              : b.height(d.slides.eq(d.animatingTo).height());
          }
        },
        sync: function (b) {
          var c = a(d.vars.sync).data("flexslider"),
            e = d.animatingTo;
          switch (b) {
            case "animate":
              c.flexAnimate(e, d.vars.pauseOnAction, !1, !0);
              break;
            case "play":
              c.playing || c.asNav || c.play();
              break;
            case "pause":
              c.pause();
          }
        },
        uniqueID: function (b) {
          return (
            b.find("[id]").each(function () {
              var b = a(this);
              b.attr("id", b.attr("id") + "_clone");
            }),
            b
          );
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var a = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var b = 0; b < a.length; b++)
              a[b] + "Hidden" in document &&
                (p.pauseInvisible.visProp = a[b] + "Hidden");
            if (p.pauseInvisible.visProp) {
              var c =
                p.pauseInvisible.visProp.replace(/[H|h]idden/, "") +
                "visibilitychange";
              document.addEventListener(c, function () {
                p.pauseInvisible.isHidden()
                  ? d.startTimeout
                    ? clearTimeout(d.startTimeout)
                    : d.pause()
                  : d.started
                    ? d.play()
                    : d.vars.initDelay > 0
                      ? setTimeout(d.play, d.vars.initDelay)
                      : d.play();
              });
            }
          },
          isHidden: function () {
            return document[p.pauseInvisible.visProp] || !1;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(j),
            (j = setTimeout(function () {
              i = "";
            }, 3e3));
        },
      }),
      (d.flexAnimate = function (b, c, f, h, i) {
        if (
          (d.vars.animationLoop ||
            b === d.currentSlide ||
            (d.direction = b > d.currentSlide ? "next" : "prev"),
          o &&
            1 === d.pagingCount &&
            (d.direction = d.currentItem < b ? "next" : "prev"),
          !d.animating && (d.canAdvance(b, i) || f) && d.is(":visible"))
        ) {
          if (o && h) {
            var j = a(d.vars.asNavFor).data("flexslider");
            if (
              ((d.atEnd = 0 === b || b === d.count - 1),
              j.flexAnimate(b, !0, !1, !0, i),
              (d.direction = d.currentItem < b ? "next" : "prev"),
              (j.direction = d.direction),
              Math.ceil((b + 1) / d.visible) - 1 === d.currentSlide || 0 === b)
            )
              return (
                (d.currentItem = b),
                d.slides
                  .removeClass(e + "active-slide")
                  .eq(b)
                  .addClass(e + "active-slide"),
                !1
              );
            (d.currentItem = b),
              d.slides
                .removeClass(e + "active-slide")
                .eq(b)
                .addClass(e + "active-slide"),
              (b = Math.floor(b / d.visible));
          }
          if (
            ((d.animating = !0),
            (d.animatingTo = b),
            c && d.pause(),
            d.vars.before(d),
            d.syncExists && !i && p.sync("animate"),
            d.vars.controlNav && p.controlNav.active(),
            m ||
              d.slides
                .removeClass(e + "active-slide")
                .eq(b)
                .addClass(e + "active-slide"),
            (d.atEnd = 0 === b || b === d.last),
            d.vars.directionNav && p.directionNav.update(),
            b === d.last && (d.vars.end(d), d.vars.animationLoop || d.pause()),
            n)
          )
            g
              ? (d.slides.eq(d.currentSlide).css({ opacity: 0, zIndex: 1 }),
                d.slides.eq(b).css({ opacity: 1, zIndex: 2 }),
                d.wrapup(q))
              : (d.slides
                  .eq(d.currentSlide)
                  .css({ zIndex: 1 })
                  .animate(
                    { opacity: 0 },
                    d.vars.animationSpeed,
                    d.vars.easing,
                  ),
                d.slides
                  .eq(b)
                  .css({ zIndex: 2 })
                  .animate(
                    { opacity: 1 },
                    d.vars.animationSpeed,
                    d.vars.easing,
                    d.wrapup,
                  ));
          else {
            var r,
              s,
              t,
              q = k ? d.slides.filter(":first").height() : d.computedW;
            m
              ? ((r = d.vars.itemMargin),
                (t = (d.itemW + r) * d.move * d.animatingTo),
                (s = t > d.limit && 1 !== d.visible ? d.limit : t))
              : (s =
                  0 === d.currentSlide &&
                  b === d.count - 1 &&
                  d.vars.animationLoop &&
                  "next" !== d.direction
                    ? l
                      ? (d.count + d.cloneOffset) * q
                      : 0
                    : d.currentSlide === d.last &&
                        0 === b &&
                        d.vars.animationLoop &&
                        "prev" !== d.direction
                      ? l
                        ? 0
                        : (d.count + 1) * q
                      : l
                        ? (d.count - 1 - b + d.cloneOffset) * q
                        : (b + d.cloneOffset) * q),
              d.setProps(s, "", d.vars.animationSpeed),
              d.transitions
                ? ((d.vars.animationLoop && d.atEnd) ||
                    ((d.animating = !1), (d.currentSlide = d.animatingTo)),
                  d.container.unbind("webkitTransitionEnd transitionend"),
                  d.container.bind(
                    "webkitTransitionEnd transitionend",
                    function () {
                      clearTimeout(d.ensureAnimationEnd), d.wrapup(q);
                    },
                  ),
                  clearTimeout(d.ensureAnimationEnd),
                  (d.ensureAnimationEnd = setTimeout(function () {
                    d.wrapup(q);
                  }, d.vars.animationSpeed + 100)))
                : d.container.animate(
                    d.args,
                    d.vars.animationSpeed,
                    d.vars.easing,
                    function () {
                      d.wrapup(q);
                    },
                  );
          }
          d.vars.smoothHeight && p.smoothHeight(d.vars.animationSpeed);
        }
      }),
      (d.wrapup = function (a) {
        n ||
          m ||
          (0 === d.currentSlide &&
          d.animatingTo === d.last &&
          d.vars.animationLoop
            ? d.setProps(a, "jumpEnd")
            : d.currentSlide === d.last &&
              0 === d.animatingTo &&
              d.vars.animationLoop &&
              d.setProps(a, "jumpStart")),
          (d.animating = !1),
          (d.currentSlide = d.animatingTo),
          d.vars.after(d);
      }),
      (d.animateSlides = function () {
        !d.animating && q && d.flexAnimate(d.getTarget("next"));
      }),
      (d.pause = function () {
        clearInterval(d.animatedSlides),
          (d.animatedSlides = null),
          (d.playing = !1),
          d.vars.pausePlay && p.pausePlay.update("play"),
          d.syncExists && p.sync("pause");
      }),
      (d.play = function () {
        d.playing && clearInterval(d.animatedSlides),
          (d.animatedSlides =
            d.animatedSlides ||
            setInterval(d.animateSlides, d.vars.slideshowSpeed)),
          (d.started = d.playing = !0),
          d.vars.pausePlay && p.pausePlay.update("pause"),
          d.syncExists && p.sync("play");
      }),
      (d.stop = function () {
        d.pause(), (d.stopped = !0);
      }),
      (d.canAdvance = function (a, b) {
        var c = o ? d.pagingCount - 1 : d.last;
        return b
          ? !0
          : o &&
              d.currentItem === d.count - 1 &&
              0 === a &&
              "prev" === d.direction
            ? !0
            : o &&
                0 === d.currentItem &&
                a === d.pagingCount - 1 &&
                "next" !== d.direction
              ? !1
              : a !== d.currentSlide || o
                ? d.vars.animationLoop
                  ? !0
                  : d.atEnd &&
                      0 === d.currentSlide &&
                      a === c &&
                      "next" !== d.direction
                    ? !1
                    : d.atEnd &&
                        d.currentSlide === c &&
                        0 === a &&
                        "next" === d.direction
                      ? !1
                      : !0
                : !1;
      }),
      (d.getTarget = function (a) {
        return (
          (d.direction = a),
          "next" === a
            ? d.currentSlide === d.last
              ? 0
              : d.currentSlide + 1
            : 0 === d.currentSlide
              ? d.last
              : d.currentSlide - 1
        );
      }),
      (d.setProps = function (a, b, c) {
        var e = (function () {
          var c = a
              ? a
              : (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo,
            e = (function () {
              if (m)
                return "setTouch" === b
                  ? a
                  : l && d.animatingTo === d.last
                    ? 0
                    : l
                      ? d.limit -
                        (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo
                      : d.animatingTo === d.last
                        ? d.limit
                        : c;
              switch (b) {
                case "setTotal":
                  return l
                    ? (d.count - 1 - d.currentSlide + d.cloneOffset) * a
                    : (d.currentSlide + d.cloneOffset) * a;
                case "setTouch":
                  return l ? a : a;
                case "jumpEnd":
                  return l ? a : d.count * a;
                case "jumpStart":
                  return l ? d.count * a : a;
                default:
                  return a;
              }
            })();
          return -1 * e + "px";
        })();
        d.transitions &&
          ((e = k
            ? "translate3d(0," + e + ",0)"
            : "translate3d(" + e + ",0,0)"),
          (c = void 0 !== c ? c / 1e3 + "s" : "0s"),
          d.container.css("-" + d.pfx + "-transition-duration", c),
          d.container.css("transition-duration", c)),
          (d.args[d.prop] = e),
          (d.transitions || void 0 === c) && d.container.css(d.args),
          d.container.css("transform", e);
      }),
      (d.setup = function (b) {
        if (n)
          d.slides.css({
            width: "100%",
            float: "left",
            marginRight: "-100%",
            position: "relative",
          }),
            "init" === b &&
              (g
                ? d.slides
                    .css({
                      opacity: 0,
                      display: "block",
                      webkitTransition:
                        "opacity " + d.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1,
                    })
                    .eq(d.currentSlide)
                    .css({ opacity: 1, zIndex: 2 })
                : d.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(d.currentSlide)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      d.vars.animationSpeed,
                      d.vars.easing,
                    )),
            d.vars.smoothHeight && p.smoothHeight();
        else {
          var c, f;
          "init" === b &&
            ((d.viewport = a('<div class="' + e + 'viewport"></div>')
              .css({ overflow: "hidden", position: "relative" })
              .appendTo(d)
              .append(d.container)),
            (d.cloneCount = 0),
            (d.cloneOffset = 0),
            l &&
              ((f = a.makeArray(d.slides).reverse()),
              (d.slides = a(f)),
              d.container.empty().append(d.slides))),
            d.vars.animationLoop &&
              !m &&
              ((d.cloneCount = 2),
              (d.cloneOffset = 1),
              "init" !== b && d.container.find(".clone").remove(),
              p
                .uniqueID(
                  d.slides
                    .first()
                    .clone()
                    .addClass("clone")
                    .attr("aria-hidden", "true"),
                )
                .appendTo(d.container),
              p
                .uniqueID(
                  d.slides
                    .last()
                    .clone()
                    .addClass("clone")
                    .attr("aria-hidden", "true"),
                )
                .prependTo(d.container)),
            (d.newSlides = a(d.vars.selector, d)),
            (c = l
              ? d.count - 1 - d.currentSlide + d.cloneOffset
              : d.currentSlide + d.cloneOffset),
            k && !m
              ? (d.container
                  .height(200 * (d.count + d.cloneCount) + "%")
                  .css("position", "absolute")
                  .width("100%"),
                setTimeout(
                  function () {
                    d.newSlides.css({ display: "block" }),
                      d.doMath(),
                      d.viewport.height(d.h),
                      d.setProps(c * d.h, "init");
                  },
                  "init" === b ? 100 : 0,
                ))
              : (d.container.width(200 * (d.count + d.cloneCount) + "%"),
                d.setProps(c * d.computedW, "init"),
                setTimeout(
                  function () {
                    d.doMath(),
                      d.newSlides.css({
                        width: d.computedW,
                        float: "left",
                        display: "block",
                      }),
                      d.vars.smoothHeight && p.smoothHeight();
                  },
                  "init" === b ? 100 : 0,
                ));
        }
        m ||
          d.slides
            .removeClass(e + "active-slide")
            .eq(d.currentSlide)
            .addClass(e + "active-slide"),
          d.vars.init(d);
      }),
      (d.doMath = function () {
        var a = d.slides.first(),
          b = d.vars.itemMargin,
          c = d.vars.minItems,
          e = d.vars.maxItems;
        (d.w = void 0 === d.viewport ? d.width() : d.viewport.width()),
          (d.h = a.height()),
          (d.boxPadding = a.outerWidth() - a.width()),
          m
            ? ((d.itemT = d.vars.itemWidth + b),
              (d.minW = c ? c * d.itemT : d.w),
              (d.maxW = e ? e * d.itemT - b : d.w),
              (d.itemW =
                d.minW > d.w
                  ? (d.w - b * (c - 1)) / c
                  : d.maxW < d.w
                    ? (d.w - b * (e - 1)) / e
                    : d.vars.itemWidth > d.w
                      ? d.w
                      : d.vars.itemWidth),
              (d.visible = Math.floor(d.w / d.itemW)),
              (d.move =
                d.vars.move > 0 && d.vars.move < d.visible
                  ? d.vars.move
                  : d.visible),
              (d.pagingCount = Math.ceil((d.count - d.visible) / d.move + 1)),
              (d.last = d.pagingCount - 1),
              (d.limit =
                1 === d.pagingCount
                  ? 0
                  : d.vars.itemWidth > d.w
                    ? d.itemW * (d.count - 1) + b * (d.count - 1)
                    : (d.itemW + b) * d.count - d.w - b))
            : ((d.itemW = d.w),
              (d.pagingCount = d.count),
              (d.last = d.count - 1)),
          (d.computedW = d.itemW - d.boxPadding);
      }),
      (d.update = function (a, b) {
        d.doMath(),
          m ||
            (a < d.currentSlide
              ? (d.currentSlide += 1)
              : a <= d.currentSlide && 0 !== a && (d.currentSlide -= 1),
            (d.animatingTo = d.currentSlide)),
          d.vars.controlNav &&
            !d.manualControls &&
            (("add" === b && !m) || d.pagingCount > d.controlNav.length
              ? p.controlNav.update("add")
              : (("remove" === b && !m) ||
                  d.pagingCount < d.controlNav.length) &&
                (m &&
                  d.currentSlide > d.last &&
                  ((d.currentSlide -= 1), (d.animatingTo -= 1)),
                p.controlNav.update("remove", d.last))),
          d.vars.directionNav && p.directionNav.update();
      }),
      (d.addSlide = function (b, c) {
        var e = a(b);
        (d.count += 1),
          (d.last = d.count - 1),
          k && l
            ? void 0 !== c
              ? d.slides.eq(d.count - c).after(e)
              : d.container.prepend(e)
            : void 0 !== c
              ? d.slides.eq(c).before(e)
              : d.container.append(e),
          d.update(c, "add"),
          (d.slides = a(d.vars.selector + ":not(.clone)", d)),
          d.setup(),
          d.vars.added(d);
      }),
      (d.removeSlide = function (b) {
        var c = isNaN(b) ? d.slides.index(a(b)) : b;
        (d.count -= 1),
          (d.last = d.count - 1),
          isNaN(b)
            ? a(b, d.slides).remove()
            : k && l
              ? d.slides.eq(d.last).remove()
              : d.slides.eq(b).remove(),
          d.doMath(),
          d.update(c, "remove"),
          (d.slides = a(d.vars.selector + ":not(.clone)", d)),
          d.setup(),
          d.vars.removed(d);
      }),
      p.init();
  }),
    a(window)
      .blur(function () {
        focused = !1;
      })
      .focus(function () {
        focused = !0;
      }),
    (a.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: "Previous",
      nextText: "Next",
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      init: function () {},
    }),
    (a.fn.flexslider = function (b) {
      if ((void 0 === b && (b = {}), "object" == typeof b))
        return this.each(function () {
          var c = a(this),
            d = b.selector ? b.selector : ".slides > li",
            e = c.find(d);
          (1 === e.length && b.allowOneSlide === !0) || 0 === e.length
            ? (e.fadeIn(400), b.start && b.start(c))
            : void 0 === c.data("flexslider") && new a.flexslider(this, b);
        });
      var c = a(this).data("flexslider");
      switch (b) {
        case "play":
          c.play();
          break;
        case "pause":
          c.pause();
          break;
        case "stop":
          c.stop();
          break;
        case "next":
          c.flexAnimate(c.getTarget("next"), !0);
          break;
        case "prev":
        case "previous":
          c.flexAnimate(c.getTarget("prev"), !0);
          break;
        default:
          "number" == typeof b && c.flexAnimate(b, !0);
      }
    });
})(jQuery);

/* Retina.js v1.3.0 */
!(function () {
  function a() {}
  function b(a) {
    return f.retinaImageSuffix + a;
  }
  function c(a, c) {
    if (((this.path = a || ""), "undefined" != typeof c && null !== c))
      (this.at_2x_path = c), (this.perform_check = !1);
    else {
      if (void 0 !== document.createElement) {
        var d = document.createElement("a");
        (d.href = this.path),
          (d.pathname = d.pathname.replace(g, b)),
          (this.at_2x_path = d.href);
      } else {
        var e = this.path.split("?");
        (e[0] = e[0].replace(g, b)), (this.at_2x_path = e.join("?"));
      }
      this.perform_check = !0;
    }
  }
  function d(a) {
    (this.el = a),
      (this.path = new c(
        this.el.getAttribute("src"),
        this.el.getAttribute("data-at2x"),
      ));
    var b = this;
    this.path.check_2x_variant(function (a) {
      a && b.swap();
    });
  }
  var e = "undefined" == typeof exports ? window : exports,
    f = {
      retinaImageSuffix: "@2x",
      check_mime_type: !0,
      force_original_dimensions: !0,
    };
  (e.Retina = a),
    (a.configure = function (a) {
      null === a && (a = {});
      for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b]);
    }),
    (a.init = function (a) {
      null === a && (a = e);
      var b = a.onload || function () {};
      a.onload = function () {
        var a,
          c,
          e = document.getElementsByTagName("img"),
          f = [];
        for (a = 0; a < e.length; a += 1)
          (c = e[a]), c.getAttributeNode("data-no-retina") || f.push(new d(c));
        b();
      };
    }),
    (a.isRetina = function () {
      var a =
        "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
      return e.devicePixelRatio > 1
        ? !0
        : e.matchMedia && e.matchMedia(a).matches
          ? !0
          : !1;
    });
  var g = /\.\w+$/;
  (e.RetinaImagePath = c),
    (c.confirmed_paths = []),
    (c.prototype.is_external = function () {
      return !(
        !this.path.match(/^https?\:/i) ||
        this.path.match("//" + document.domain)
      );
    }),
    (c.prototype.check_2x_variant = function (a) {
      var b,
        d = this;
      return this.is_external()
        ? a(!1)
        : this.perform_check ||
            "undefined" == typeof this.at_2x_path ||
            null === this.at_2x_path
          ? this.at_2x_path in c.confirmed_paths
            ? a(!0)
            : ((b = new XMLHttpRequest()),
              b.open("HEAD", this.at_2x_path),
              (b.onreadystatechange = function () {
                if (4 !== b.readyState) return a(!1);
                if (b.status >= 200 && b.status <= 399) {
                  if (f.check_mime_type) {
                    var e = b.getResponseHeader("Content-Type");
                    if (null === e || !e.match(/^image/i)) return a(!1);
                  }
                  return c.confirmed_paths.push(d.at_2x_path), a(!0);
                }
                return a(!1);
              }),
              b.send(),
              void 0)
          : a(!0);
    }),
    (e.RetinaImage = d),
    (d.prototype.swap = function (a) {
      function b() {
        c.el.complete
          ? (f.force_original_dimensions &&
              (c.el.setAttribute("width", c.el.offsetWidth),
              c.el.setAttribute("height", c.el.offsetHeight)),
            c.el.setAttribute("src", a))
          : setTimeout(b, 5);
      }
      "undefined" == typeof a && (a = this.path.at_2x_path);
      var c = this;
      b();
    }),
    a.isRetina() && a.init(e);
})();

/* Modernizr 2.8.3 (Custom Build) */
(window.Modernizr = (function (a, b, c) {
  function z(a) {
    j.cssText = a;
  }
  function A(a, b) {
    return z(m.join(a + ";") + (b || ""));
  }
  function B(a, b) {
    return typeof a === b;
  }
  function C(a, b) {
    return !!~("" + a).indexOf(b);
  }
  function D(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
    }
    return !1;
  }
  function E(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c)
        return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f;
    }
    return !1;
  }
  function F(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1),
      e = (a + " " + o.join(d + " ") + d).split(" ");
    return B(b, "string") || B(b, "undefined")
      ? D(e, b)
      : ((e = (a + " " + p.join(d + " ") + d).split(" ")), E(e, b, c));
  }
  var d = "2.8.3",
    e = {},
    f = !0,
    g = b.documentElement,
    h = "modernizr",
    i = b.createElement(h),
    j = i.style,
    k,
    l = {}.toString,
    m = " -webkit- -moz- -o- -ms- ".split(" "),
    n = "Webkit Moz O ms",
    o = n.split(" "),
    p = n.toLowerCase().split(" "),
    q = { svg: "http://www.w3.org/2000/svg" },
    r = {},
    s = {},
    t = {},
    u = [],
    v = u.slice,
    w,
    x = {}.hasOwnProperty,
    y;
  !B(x, "undefined") && !B(x.call, "undefined")
    ? (y = function (a, b) {
        return x.call(a, b);
      })
    : (y = function (a, b) {
        return b in a && B(a.constructor.prototype[b], "undefined");
      }),
    Function.prototype.bind ||
      (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError();
        var d = v.call(arguments, 1),
          e = function () {
            if (this instanceof e) {
              var a = function () {};
              a.prototype = c.prototype;
              var f = new a(),
                g = c.apply(f, d.concat(v.call(arguments)));
              return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(v.call(arguments)));
          };
        return e;
      }),
    (r.cssgradients = function () {
      var a = "background-image:",
        b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
        c = "linear-gradient(left top,#9f9, white);";
      return (
        z(
          (a + "-webkit- ".split(" ").join(b + a) + m.join(c + a)).slice(
            0,
            -a.length,
          ),
        ),
        C(j.backgroundImage, "gradient")
      );
    }),
    (r.csstransforms = function () {
      return !!F("transform");
    }),
    (r.csstransitions = function () {
      return F("transition");
    }),
    (r.svg = function () {
      return (
        !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect
      );
    }),
    (r.inlinesvg = function () {
      var a = b.createElement("div");
      return (
        (a.innerHTML = "<svg/>"),
        (a.firstChild && a.firstChild.namespaceURI) == q.svg
      );
    }),
    (r.svgclippaths = function () {
      return (
        !!b.createElementNS &&
        /SVGClipPath/.test(l.call(b.createElementNS(q.svg, "clipPath")))
      );
    });
  for (var G in r)
    y(r, G) &&
      ((w = G.toLowerCase()), (e[w] = r[G]()), u.push((e[w] ? "" : "no-") + w));
  return (
    (e.addTest = function (a, b) {
      if (typeof a == "object") for (var d in a) y(a, d) && e.addTest(d, a[d]);
      else {
        a = a.toLowerCase();
        if (e[a] !== c) return e;
        (b = typeof b == "function" ? b() : b),
          typeof f != "undefined" &&
            f &&
            (g.className += " " + (b ? "" : "no-") + a),
          (e[a] = b);
      }
      return e;
    }),
    z(""),
    (i = k = null),
    (function (a, b) {
      function l(a, b) {
        var c = a.createElement("p"),
          d = a.getElementsByTagName("head")[0] || a.documentElement;
        return (
          (c.innerHTML = "x<style>" + b + "</style>"),
          d.insertBefore(c.lastChild, d.firstChild)
        );
      }
      function m() {
        var a = s.elements;
        return typeof a == "string" ? a.split(" ") : a;
      }
      function n(a) {
        var b = j[a[h]];
        return b || ((b = {}), i++, (a[h] = i), (j[i] = b)), b;
      }
      function o(a, c, d) {
        c || (c = b);
        if (k) return c.createElement(a);
        d || (d = n(c));
        var g;
        return (
          d.cache[a]
            ? (g = d.cache[a].cloneNode())
            : f.test(a)
              ? (g = (d.cache[a] = d.createElem(a)).cloneNode())
              : (g = d.createElem(a)),
          g.canHaveChildren && !e.test(a) && !g.tagUrn
            ? d.frag.appendChild(g)
            : g
        );
      }
      function p(a, c) {
        a || (a = b);
        if (k) return a.createDocumentFragment();
        c = c || n(a);
        var d = c.frag.cloneNode(),
          e = 0,
          f = m(),
          g = f.length;
        for (; e < g; e++) d.createElement(f[e]);
        return d;
      }
      function q(a, b) {
        b.cache ||
          ((b.cache = {}),
          (b.createElem = a.createElement),
          (b.createFrag = a.createDocumentFragment),
          (b.frag = b.createFrag())),
          (a.createElement = function (c) {
            return s.shivMethods ? o(c, a, b) : b.createElem(c);
          }),
          (a.createDocumentFragment = Function(
            "h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
              m()
                .join()
                .replace(/[\w\-]+/g, function (a) {
                  return (
                    b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                  );
                }) +
              ");return n}",
          )(s, b.frag));
      }
      function r(a) {
        a || (a = b);
        var c = n(a);
        return (
          s.shivCSS &&
            !g &&
            !c.hasCSS &&
            (c.hasCSS = !!l(
              a,
              "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}",
            )),
          k || q(a, c),
          a
        );
      }
      var c = "3.7.0",
        d = a.html5 || {},
        e =
          /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        f =
          /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        g,
        h = "_html5shiv",
        i = 0,
        j = {},
        k;
      (function () {
        try {
          var a = b.createElement("a");
          (a.innerHTML = "<xyz></xyz>"),
            (g = "hidden" in a),
            (k =
              a.childNodes.length == 1 ||
              (function () {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return (
                  typeof a.cloneNode == "undefined" ||
                  typeof a.createDocumentFragment == "undefined" ||
                  typeof a.createElement == "undefined"
                );
              })());
        } catch (c) {
          (g = !0), (k = !0);
        }
      })();
      var s = {
        elements:
          d.elements ||
          "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: c,
        shivCSS: d.shivCSS !== !1,
        supportsUnknownElements: k,
        shivMethods: d.shivMethods !== !1,
        type: "default",
        shivDocument: r,
        createElement: o,
        createDocumentFragment: p,
      };
      (a.html5 = s), r(b);
    })(this, b),
    (e._version = d),
    (e._prefixes = m),
    (e._domPrefixes = p),
    (e._cssomPrefixes = o),
    (e.testProp = function (a) {
      return D([a]);
    }),
    (e.testAllProps = F),
    (g.className =
      g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
      (f ? " js " + u.join(" ") : "")),
    e
  );
})(this, this.document)),
  (function (a, b, c) {
    function d(a) {
      return "[object Function]" == o.call(a);
    }
    function e(a) {
      return "string" == typeof a;
    }
    function f() {}
    function g(a) {
      return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
      var a = p.shift();
      (q = 1),
        a
          ? a.t
            ? m(function () {
                ("c" == a.t ? B.injectCss : B.injectJs)(
                  a.s,
                  0,
                  a.a,
                  a.x,
                  a.e,
                  1,
                );
              }, 0)
            : (a(), h())
          : (q = 0);
    }
    function i(a, c, d, e, f, i, j) {
      function k(b) {
        if (
          !o &&
          g(l.readyState) &&
          ((u.r = o = 1),
          !q && h(),
          (l.onload = l.onreadystatechange = null),
          b)
        ) {
          "img" != a &&
            m(function () {
              t.removeChild(l);
            }, 50);
          for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
        }
      }
      var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = { t: d, s: c, e: f, a: i, x: j };
      1 === y[c] && ((r = 1), (y[c] = [])),
        "object" == a ? (l.data = c) : ((l.src = c), (l.type = a)),
        (l.width = l.height = "0"),
        (l.onerror =
          l.onload =
          l.onreadystatechange =
            function () {
              k.call(this, r);
            }),
        p.splice(e, 0, u),
        "img" != a &&
          (r || 2 === y[c]
            ? (t.insertBefore(l, s ? null : n), m(k, j))
            : y[c].push(l));
    }
    function j(a, b, c, d, f) {
      return (
        (q = 0),
        (b = b || "j"),
        e(a)
          ? i("c" == b ? v : u, a, b, this.i++, c, d, f)
          : (p.splice(this.i++, 0, a), 1 == p.length && h()),
        this
      );
    }
    function k() {
      var a = B;
      return (a.loader = { load: j, i: 0 }), a;
    }
    var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w =
        Array.isArray ||
        function (a) {
          return "[object Array]" == o.call(a);
        },
      x = [],
      y = {},
      z = {
        timeout: function (a, b) {
          return b.length && (a.timeout = b[0]), a;
        },
      },
      A,
      B;
    (B = function (a) {
      function b(a) {
        var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = { url: c, origUrl: c, prefixes: a },
          e,
          f,
          g;
        for (f = 0; f < d; f++)
          (g = a[f].split("=")), (e = z[g.shift()]) && (c = e(c, g));
        for (f = 0; f < b; f++) c = x[f](c);
        return c;
      }
      function g(a, e, f, g, h) {
        var i = b(a),
          j = i.autoCallback;
        i.url.split(".").pop().split("?").shift(),
          i.bypass ||
            (e &&
              (e = d(e)
                ? e
                : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead
              ? i.instead(a, e, f, g, h)
              : (y[i.url] ? (i.noexec = !0) : (y[i.url] = 1),
                f.load(
                  i.url,
                  i.forceCSS ||
                    (!i.forceJS &&
                      "css" == i.url.split(".").pop().split("?").shift())
                    ? "c"
                    : c,
                  i.noexec,
                  i.attrs,
                  i.timeout,
                ),
                (d(e) || d(j)) &&
                  f.load(function () {
                    k(),
                      e && e(i.origUrl, h, g),
                      j && j(i.origUrl, h, g),
                      (y[i.url] = 2);
                  })));
      }
      function h(a, b) {
        function c(a, c) {
          if (a) {
            if (e(a))
              c ||
                (j = function () {
                  var a = [].slice.call(arguments);
                  k.apply(this, a), l();
                }),
                g(a, j, b, 0, h);
            else if (Object(a) === a)
              for (n in ((m = (function () {
                var b = 0,
                  c;
                for (c in a) a.hasOwnProperty(c) && b++;
                return b;
              })()),
              a))
                a.hasOwnProperty(n) &&
                  (!c &&
                    !--m &&
                    (d(j)
                      ? (j = function () {
                          var a = [].slice.call(arguments);
                          k.apply(this, a), l();
                        })
                      : (j[n] = (function (a) {
                          return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l();
                          };
                        })(k[n]))),
                  g(a[n], j, b, n, h));
          } else !c && l();
        }
        var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m,
          n;
        c(h ? a.yep : a.nope, !!i), i && c(i);
      }
      var i,
        j,
        l = this.yepnope.loader;
      if (e(a)) g(a, 0, l, 0);
      else if (w(a))
        for (i = 0; i < a.length; i++)
          (j = a[i]),
            e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
      else Object(a) === a && h(a, l);
    }),
      (B.addPrefix = function (a, b) {
        z[a] = b;
      }),
      (B.addFilter = function (a) {
        x.push(a);
      }),
      (B.errorTimeout = 1e4),
      null == b.readyState &&
        b.addEventListener &&
        ((b.readyState = "loading"),
        b.addEventListener(
          "DOMContentLoaded",
          (A = function () {
            b.removeEventListener("DOMContentLoaded", A, 0),
              (b.readyState = "complete");
          }),
          0,
        )),
      (a.yepnope = k()),
      (a.yepnope.executeStack = h),
      (a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"),
          l,
          o,
          e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        (c = j ? h : c || f),
          (k.onreadystatechange = k.onload =
            function () {
              !l &&
                g(k.readyState) &&
                ((l = 1), c(), (k.onload = k.onreadystatechange = null));
            }),
          m(function () {
            l || ((l = 1), c(1));
          }, e),
          i ? k.onload() : n.parentNode.insertBefore(k, n);
      }),
      (a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"),
          j,
          c = i ? h : c || f;
        (e.href = a), (e.rel = "stylesheet"), (e.type = "text/css");
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
      });
  })(this, document),
  (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  });

/* WOW - v1.0.0 */
(function () {
  var a,
    b,
    c,
    d = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    e =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a,
        );
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          console.warn("MutationObserver is not supported by your browser."),
            console.warn(
              "WOW.js cannot detect dom mutations, please call .sync() after loading new content.",
            );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (this.WOW = (function () {
      function f(a) {
        null == a && (a = {}),
          (this.scrollCallback = d(this.scrollCallback, this)),
          (this.scrollHandler = d(this.scrollHandler, this)),
          (this.start = d(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          (this.animationNameCache = new c());
      }
      return (
        (f.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
        }),
        (f.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : document.addEventListener("DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (f.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.getElementsByClassName(this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else {
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
              window.addEventListener("scroll", this.scrollHandler, !1),
                window.addEventListener("resize", this.scrollHandler, !1),
                (this.interval = setInterval(this.scrollCallback, 50));
            }
          return this.config.live
            ? new a(
                (function (a) {
                  return function (b) {
                    var c, d, e, f, g;
                    for (g = [], e = 0, f = b.length; f > e; e++)
                      (d = b[e]),
                        g.push(
                          function () {
                            var a, b, e, f;
                            for (
                              e = d.addedNodes || [],
                                f = [],
                                a = 0,
                                b = e.length;
                              b > a;
                              a++
                            )
                              (c = e[a]), f.push(this.doSync(c));
                            return f;
                          }.call(a),
                        );
                    return g;
                  };
                })(this),
              ).observe(document.body, { childList: !0, subtree: !0 })
            : void 0;
        }),
        (f.prototype.stop = function () {
          return (
            (this.stopped = !0),
            window.removeEventListener("scroll", this.scrollHandler, !1),
            window.removeEventListener("resize", this.scrollHandler, !1),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (f.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (f.prototype.doSync = function (a) {
          var b, c, d, f, g;
          if (!this.stopped) {
            if ((null == a && (a = this.element), 1 !== a.nodeType)) return;
            for (
              a = a.parentNode || a,
                f = a.getElementsByClassName(this.config.boxClass),
                g = [],
                c = 0,
                d = f.length;
              d > c;
              c++
            )
              (b = f[c]),
                e.call(this.all, b) < 0
                  ? (this.applyStyle(b, !0),
                    this.boxes.push(b),
                    this.all.push(b),
                    g.push((this.scrolled = !0)))
                  : g.push(void 0);
            return g;
          }
        }),
        (f.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = "" + a.className + " " + this.config.animateClass)
          );
        }),
        (f.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this),
            )
          );
        }),
        (f.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (f.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push(a.setAttribute("style", "visibility: visible;"));
          return e;
        }),
        (f.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (f.prototype.vendors = ["moz", "webkit"]),
        (f.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          f = [];
          for (c in b)
            (d = b[c]),
              (a["" + c] = d),
              f.push(
                function () {
                  var b, f, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, f = g.length;
                    f > b;
                    b++
                  )
                    (e = g[b]),
                      h.push(
                        (a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] =
                          d),
                      );
                  return h;
                }.call(this),
              );
          return f;
        }),
        (f.prototype.vendorCSS = function (a, b) {
          var c, d, e, f, g, h;
          for (
            d = window.getComputedStyle(a),
              c = d.getPropertyCSSValue(b),
              h = this.vendors,
              f = 0,
              g = h.length;
            g > f;
            f++
          )
            (e = h[f]), (c = c || d.getPropertyCSSValue("-" + e + "-" + b));
          return c;
        }),
        (f.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = window.getComputedStyle(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (f.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (f.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (f.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (f.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (f.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (f.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f = window.pageYOffset),
            (e = f + Math.min(this.element.clientHeight, innerHeight) - c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (f.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (f.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        f
      );
    })());
}).call(this);

/* Owl Carousel 2 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this.drag = a.extend({}, m)),
      (this.state = a.extend({}, n)),
      (this.e = a.extend({}, o)),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._invalidated = {}),
      (this._pipe = []),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
        }, this),
      ),
      a.each(
        e.Pipe,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this),
      ),
      this.setup(),
      this.initialize();
  }
  function f(a) {
    if (a.touches !== d)
      return { x: a.touches[0].pageX, y: a.touches[0].pageY };
    if (a.touches === d) {
      if (a.pageX !== d) return { x: a.pageX, y: a.pageY };
      if (a.pageX === d) return { x: a.clientX, y: a.clientY };
    }
  }
  function g(a) {
    var b,
      d,
      e = c.createElement("div"),
      f = a;
    for (b in f)
      if (((d = f[b]), "undefined" != typeof e.style[d]))
        return (e = null), [d, b];
    return [!1];
  }
  function h() {
    return g([
      "transition",
      "WebkitTransition",
      "MozTransition",
      "OTransition",
    ])[1];
  }
  function i() {
    return g([
      "transform",
      "WebkitTransform",
      "MozTransform",
      "OTransform",
      "msTransform",
    ])[0];
  }
  function j() {
    return g([
      "perspective",
      "webkitPerspective",
      "MozPerspective",
      "OPerspective",
      "MsPerspective",
    ])[0];
  }
  function k() {
    return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
  }
  function l() {
    return b.navigator.msPointerEnabled;
  }
  var m, n, o;
  (m = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null,
  }),
    (n = {
      isTouch: !1,
      isScrolling: !1,
      isSwiping: !1,
      direction: !1,
      inMotion: !1,
    }),
    (o = {
      _onDragStart: null,
      _onDragMove: null,
      _onDragEnd: null,
      _transitionEnd: null,
      _resizer: null,
      _responsiveCall: null,
      _goToLoop: null,
      _checkVisibile: null,
    }),
    (e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      responsiveClass: !1,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      themeClass: "owl-theme",
      baseClass: "owl-carousel",
      itemClass: "owl-item",
      centerClass: "center",
      activeClass: "active",
    }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Plugins = {}),
    (e.Pipe = [
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a = this._clones,
            b = this.$stage.children(".cloned");
          (b.length !== a.length || (!this.settings.loop && a.length > 0)) &&
            (this.$stage.children(".cloned").remove(), (this._clones = []));
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a,
            b,
            c = this._clones,
            d = this._items,
            e = this.settings.loop
              ? c.length - Math.max(2 * this.settings.items, 4)
              : 0;
          for (a = 0, b = Math.abs(e / 2); b > a; a++)
            e > 0
              ? (this.$stage
                  .children()
                  .eq(d.length + c.length - 1)
                  .remove(),
                c.pop(),
                this.$stage.children().eq(0).remove(),
                c.pop())
              : (c.push(c.length / 2),
                this.$stage.append(
                  d[c[c.length - 1]].clone().addClass("cloned"),
                ),
                c.push(d.length - 1 - (c.length - 1) / 2),
                this.$stage.prepend(
                  d[c[c.length - 1]].clone().addClass("cloned"),
                ));
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d = this.settings.rtl ? 1 : -1,
            e = (this.width() / this.settings.items).toFixed(3),
            f = 0;
          for (
            this._coordinates = [],
              b = 0,
              c = this._clones.length + this._items.length;
            c > b;
            b++
          )
            (a = this._mergers[this.relative(b)]),
              (a =
                (this.settings.mergeFit && Math.min(a, this.settings.items)) ||
                a),
              (f +=
                (this.settings.autoWidth
                  ? this._items[this.relative(b)].width() + this.settings.margin
                  : e * a) * d),
              this._coordinates.push(f);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var b,
            c,
            d = (this.width() / this.settings.items).toFixed(3),
            e = {
              width:
                Math.abs(this._coordinates[this._coordinates.length - 1]) +
                2 * this.settings.stagePadding,
              "padding-left": this.settings.stagePadding || "",
              "padding-right": this.settings.stagePadding || "",
            };
          if (
            (this.$stage.css(e),
            (e = {
              width: this.settings.autoWidth
                ? "auto"
                : d - this.settings.margin,
            }),
            (e[this.settings.rtl ? "margin-left" : "margin-right"] =
              this.settings.margin),
            !this.settings.autoWidth &&
              a.grep(this._mergers, function (a) {
                return a > 1;
              }).length > 0)
          )
            for (b = 0, c = this._coordinates.length; c > b; b++)
              (e.width =
                Math.abs(this._coordinates[b]) -
                Math.abs(this._coordinates[b - 1] || 0) -
                this.settings.margin),
                this.$stage.children().eq(b).css(e);
          else this.$stage.children().css(e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current && this.reset(this.$stage.children().index(a.current));
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; d > c; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage
            .children("." + this.settings.activeClass)
            .removeClass(this.settings.activeClass),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass(this.settings.activeClass),
            this.settings.center &&
              (this.$stage
                .children("." + this.settings.centerClass)
                .removeClass(this.settings.centerClass),
              this.$stage
                .children()
                .eq(this.current())
                .addClass(this.settings.centerClass));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.trigger("initialize"),
        this.$element
          .addClass(this.settings.baseClass)
          .addClass(this.settings.themeClass)
          .toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0)
      ) {
        var b, c, e;
        if (
          ((b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && 0 >= e)
        )
          return this.preloadAutoWidthImages(b), !1;
      }
      this.$element.addClass("owl-loading"),
        (this.$stage = a(
          "<" + this.settings.stageElement + ' class="owl-stage"/>',
        ).wrap('<div class="owl-stage-outer">')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        (this._width = this.$element.width()),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            b >= a && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          delete e.responsive,
          e.responsiveClass &&
            this.$element
              .attr("class", function (a, b) {
                return b.replace(/\b owl-responsive-\S+/g, "");
              })
              .addClass("owl-responsive-" + d))
        : (e = a.extend({}, this.options)),
        (null === this.settings || this._breakpoint !== d) &&
          (this.trigger("change", { property: { name: "settings", value: e } }),
          (this._breakpoint = d),
          (this.settings = e),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          }));
    }),
    (e.prototype.optionsLogic = function () {
      this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop &&
          this._items.length < this.settings.items &&
          (this.settings.loop = !1),
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.settings.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        c > b;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      this._invalidated = {};
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      if (0 === this._items.length) return !1;
      new Date().getTime();
      this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        (this.state.orientation = b.orientation),
        this.watchVisibility(),
        this.trigger("refreshed");
    }),
    (e.prototype.eventsCall = function () {
      (this.e._onDragStart = a.proxy(function (a) {
        this.onDragStart(a);
      }, this)),
        (this.e._onDragMove = a.proxy(function (a) {
          this.onDragMove(a);
        }, this)),
        (this.e._onDragEnd = a.proxy(function (a) {
          this.onDragEnd(a);
        }, this)),
        (this.e._onResize = a.proxy(function (a) {
          this.onResize(a);
        }, this)),
        (this.e._transitionEnd = a.proxy(function (a) {
          this.transitionEnd(a);
        }, this)),
        (this.e._preventClick = a.proxy(function (a) {
          this.preventClick(a);
        }, this));
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this.e._onResize,
          this.settings.responsiveRefreshRate,
        ));
    }),
    (e.prototype.onResize = function () {
      return this._items.length
        ? this._width === this.$element.width()
          ? !1
          : this.trigger("resize").isDefaultPrevented()
            ? !1
            : ((this._width = this.$element.width()),
              this.invalidate("width"),
              this.refresh(),
              void this.trigger("resized"))
        : !1;
    }),
    (e.prototype.eventsRouter = function (a) {
      var b = a.type;
      "mousedown" === b || "touchstart" === b
        ? this.onDragStart(a)
        : "mousemove" === b || "touchmove" === b
          ? this.onDragMove(a)
          : "mouseup" === b || "touchend" === b
            ? this.onDragEnd(a)
            : "touchcancel" === b && this.onDragEnd(a);
    }),
    (e.prototype.internalEvents = function () {
      var c = (k(), l());
      this.settings.mouseDrag
        ? (this.$stage.on(
            "mousedown",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this),
          ),
          this.$stage.on("dragstart", function () {
            return !1;
          }),
          (this.$stage.get(0).onselectstart = function () {
            return !1;
          }))
        : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag &&
          !c &&
          this.$stage.on(
            "touchstart touchcancel",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this),
          ),
        this.transitionEndVendor &&
          this.on(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd,
            !1,
          ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", a.proxy(this.onThrottledResize, this));
    }),
    (e.prototype.onDragStart = function (d) {
      var e, g, h, i;
      if (
        ((e = d.originalEvent || d || b.event),
        3 === e.which || this.state.isTouch)
      )
        return !1;
      if (
        ("mousedown" === e.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        (this.drag.startTime = new Date().getTime()),
        this.speed(0),
        (this.state.isTouch = !0),
        (this.state.isScrolling = !1),
        (this.state.isSwiping = !1),
        (this.drag.distance = 0),
        (g = f(e).x),
        (h = f(e).y),
        (this.drag.offsetX = this.$stage.position().left),
        (this.drag.offsetY = this.$stage.position().top),
        this.settings.rtl &&
          (this.drag.offsetX =
            this.$stage.position().left +
            this.$stage.width() -
            this.width() +
            this.settings.margin),
        this.state.inMotion && this.support3d)
      )
        (i = this.getTransformProperty()),
          (this.drag.offsetX = i),
          this.animate(i),
          (this.state.inMotion = !0);
      else if (this.state.inMotion && !this.support3d)
        return (this.state.inMotion = !1), !1;
      (this.drag.startX = g - this.drag.offsetX),
        (this.drag.startY = h - this.drag.offsetY),
        (this.drag.start = g - this.drag.startX),
        (this.drag.targetEl = e.target || e.srcElement),
        (this.drag.updatedX = this.drag.start),
        ("IMG" === this.drag.targetEl.tagName ||
          "A" === this.drag.targetEl.tagName) &&
          (this.drag.targetEl.draggable = !1),
        a(c).on(
          "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
          a.proxy(function (a) {
            this.eventsRouter(a);
          }, this),
        );
    }),
    (e.prototype.onDragMove = function (a) {
      var c, e, g, h, i, j;
      this.state.isTouch &&
        (this.state.isScrolling ||
          ((c = a.originalEvent || a || b.event),
          (e = f(c).x),
          (g = f(c).y),
          (this.drag.currentX = e - this.drag.startX),
          (this.drag.currentY = g - this.drag.startY),
          (this.drag.distance = this.drag.currentX - this.drag.offsetX),
          this.drag.distance < 0
            ? (this.state.direction = this.settings.rtl ? "right" : "left")
            : this.drag.distance > 0 &&
              (this.state.direction = this.settings.rtl ? "left" : "right"),
          this.settings.loop
            ? this.op(
                this.drag.currentX,
                ">",
                this.coordinates(this.minimum()),
              ) && "right" === this.state.direction
              ? (this.drag.currentX -=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
              : this.op(
                  this.drag.currentX,
                  "<",
                  this.coordinates(this.maximum()),
                ) &&
                "left" === this.state.direction &&
                (this.drag.currentX +=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
            : ((h = this.coordinates(
                this.settings.rtl ? this.maximum() : this.minimum(),
              )),
              (i = this.coordinates(
                this.settings.rtl ? this.minimum() : this.maximum(),
              )),
              (j = this.settings.pullDrag ? this.drag.distance / 5 : 0),
              (this.drag.currentX = Math.max(
                Math.min(this.drag.currentX, h + j),
                i + j,
              ))),
          (this.drag.distance > 8 || this.drag.distance < -8) &&
            (c.preventDefault !== d ? c.preventDefault() : (c.returnValue = !1),
            (this.state.isSwiping = !0)),
          (this.drag.updatedX = this.drag.currentX),
          (this.drag.currentY > 16 || this.drag.currentY < -16) &&
            this.state.isSwiping === !1 &&
            ((this.state.isScrolling = !0),
            (this.drag.updatedX = this.drag.start)),
          this.animate(this.drag.updatedX)));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d, e, f;
      if (this.state.isTouch) {
        if (
          ("mouseup" === b.type && this.$stage.removeClass("owl-grab"),
          this.trigger("dragged"),
          this.drag.targetEl.removeAttribute("draggable"),
          (this.state.isTouch = !1),
          (this.state.isScrolling = !1),
          (this.state.isSwiping = !1),
          0 === this.drag.distance && this.state.inMotion !== !0)
        )
          return (this.state.inMotion = !1), !1;
        (this.drag.endTime = new Date().getTime()),
          (d = this.drag.endTime - this.drag.startTime),
          (e = Math.abs(this.drag.distance)),
          (e > 3 || d > 300) && this.removeClick(this.drag.targetEl),
          (f = this.closest(this.drag.updatedX)),
          this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(f),
          this.invalidate("position"),
          this.update(),
          this.settings.pullDrag ||
            this.drag.updatedX !== this.coordinates(f) ||
            this.transitionEnd(),
          (this.drag.distance = 0),
          a(c).off(".owl.dragEvents");
      }
    }),
    (e.prototype.removeClick = function (c) {
      (this.drag.targetEl = c),
        a(c).on("click.preventClick", this.e._preventClick),
        b.setTimeout(function () {
          a(c).off("click.preventClick");
        }, 300);
    }),
    (e.prototype.preventClick = function (b) {
      b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
        b.stopPropagation && b.stopPropagation(),
        a(b.target).off("click.preventClick");
    }),
    (e.prototype.getTransformProperty = function () {
      var a, c;
      return (
        (a = b
          .getComputedStyle(this.$stage.get(0), null)
          .getPropertyValue(this.vendorName + "transform")),
        (a = a.replace(/matrix(3d)?\(|\)/g, "").split(",")),
        (c = 16 === a.length),
        c !== !0 ? a[4] : a[12]
      );
    }),
    (e.prototype.closest = function (b) {
      var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            f,
            a.proxy(function (a, g) {
              return (
                b > g - d && g + d > b
                  ? (c = a)
                  : this.op(b, "<", g) &&
                    this.op(b, ">", f[a + 1] || g - e) &&
                    (c = "left" === this.state.direction ? a + 1 : a),
                -1 === c
              );
            }, this),
          ),
        this.settings.loop ||
          (this.op(b, ">", f[this.minimum()])
            ? (c = b = this.minimum())
            : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())),
        c
      );
    }),
    (e.prototype.animate = function (b) {
      this.trigger("translate"),
        (this.state.inMotion = this.speed() > 0),
        this.support3d
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px, 0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : this.state.isTouch
            ? this.$stage.css({ left: b + "px" })
            : this.$stage.animate(
                { left: b },
                this.speed() / 1e3,
                this.settings.fallbackEasing,
                a.proxy(function () {
                  this.state.inMotion && this.transitionEnd();
                }, this),
              );
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (a) {
      this._invalidated[a] = !0;
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (b, c) {
      var e = c ? this._items.length : this._items.length + this._clones.length;
      return !a.isNumeric(b) || 1 > e
        ? d
        : (b = this._clones.length
            ? ((b % e) + e) % e
            : Math.max(this.minimum(c), Math.min(this.maximum(c), b)));
    }),
    (e.prototype.relative = function (a) {
      return (
        (a = this.normalize(a)),
        (a -= this._clones.length / 2),
        this.normalize(a, !0)
      );
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = 0,
        f = this.settings;
      if (a) return this._items.length - 1;
      if (!f.loop && f.center) b = this._items.length - 1;
      else if (f.loop || f.center)
        if (f.loop || f.center) b = this._items.length + f.items;
        else {
          if (!f.autoWidth && !f.merge)
            throw "Can not detect maximum absolute position.";
          for (
            revert = f.rtl ? 1 : -1,
              c = this.$stage.width() - this.$element.width();
            (d = this.coordinates(e)) && !(d * revert >= c);

          )
            b = ++e;
        }
      else b = this._items.length - f.items;
      return b;
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c = null;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this),
          )
        : (this.settings.center
            ? ((c = this._coordinates[b]),
              (c +=
                ((this.width() - c + (this._coordinates[b - 1] || 0)) / 2) *
                (this.settings.rtl ? -1 : 1)))
            : (c = this._coordinates[b - 1] || 0),
          c);
    }),
    (e.prototype.duration = function (a, b, c) {
      return (
        Math.min(Math.max(Math.abs(b - a), 1), 6) *
        Math.abs(c || this.settings.smartSpeed)
      );
    }),
    (e.prototype.to = function (c, d) {
      if (this.settings.loop) {
        var e = c - this.relative(this.current()),
          f = this.current(),
          g = this.current(),
          h = this.current() + e,
          i = 0 > g - h ? !0 : !1,
          j = this._clones.length + this._items.length;
        h < this.settings.items && i === !1
          ? ((f = g + this._items.length), this.reset(f))
          : h >= j - this.settings.items &&
            i === !0 &&
            ((f = g - this._items.length), this.reset(f)),
          b.clearTimeout(this.e._goToLoop),
          (this.e._goToLoop = b.setTimeout(
            a.proxy(function () {
              this.speed(this.duration(this.current(), f + e, d)),
                this.current(f + e),
                this.update();
            }, this),
            30,
          ));
      } else
        this.speed(this.duration(this.current(), c, d)),
          this.current(c),
          this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.transitionEnd = function (a) {
      return a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
        ? !1
        : ((this.state.inMotion = !1), void this.trigger("translated"));
    }),
    (e.prototype.viewport = function () {
      var d;
      if (this.options.responsiveBaseElement !== b)
        d = a(this.options.responsiveBaseElement).width();
      else if (b.innerWidth) d = b.innerWidth;
      else {
        if (!c.documentElement || !c.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        d = c.documentElement.clientWidth;
      }
      return d;
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .andSelf("[data-merge]")
                      .attr("data-merge") || 1,
                );
            }, this),
          ),
        this.reset(
          a.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0,
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (a, b) {
      (b = b === d ? this._items.length : this.normalize(b, !0)),
        this.trigger("add", { content: a, position: b }),
        0 === this._items.length || b === this._items.length
          ? (this.$stage.append(a),
            this._items.push(a),
            this._mergers.push(
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1,
            ))
          : (this._items[b].before(a),
            this._items.splice(b, 0, a),
            this._mergers.splice(
              b,
              0,
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1,
            )),
        this.invalidate("items"),
        this.trigger("added", { content: a, position: b });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.addTriggerableEvents = function () {
      var b = a.proxy(function (b, c) {
        return a.proxy(function (a) {
          a.relatedTarget !== this &&
            (this.suppress([c]),
            b.apply(this, [].slice.call(arguments, 1)),
            this.release([c]));
        }, this);
      }, this);
      a.each(
        {
          next: this.next,
          prev: this.prev,
          to: this.to,
          destroy: this.destroy,
          refresh: this.refresh,
          replace: this.replace,
          add: this.add,
          remove: this.remove,
        },
        a.proxy(function (a, c) {
          this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
        }, this),
      );
    }),
    (e.prototype.watchVisibility = function () {
      function c(a) {
        return a.offsetWidth > 0 && a.offsetHeight > 0;
      }
      function d() {
        c(this.$element.get(0)) &&
          (this.$element.removeClass("owl-hidden"),
          this.refresh(),
          b.clearInterval(this.e._checkVisibile));
      }
      c(this.$element.get(0)) ||
        (this.$element.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        (this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      var c, d, e, f;
      (c = 0),
        (d = this),
        b.each(function (g, h) {
          (e = a(h)),
            (f = new Image()),
            (f.onload = function () {
              c++,
                e.attr("src", f.src),
                e.css("opacity", 1),
                c >= b.length && ((d.state.imagesLoaded = !0), d.initialize());
            }),
            (f.src =
              e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
        });
    }),
    (e.prototype.destroy = function () {
      this.$element.hasClass(this.settings.themeClass) &&
        this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"),
        this.transitionEndVendor &&
          this.off(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd,
          );
      for (var d in this._plugins) this._plugins[d].destroy();
      (this.settings.mouseDrag || this.settings.touchDrag) &&
        (this.$stage.off("mousedown touchstart touchcancel"),
        a(c).off(".owl.dragEvents"),
        (this.$stage.get(0).onselectstart = function () {}),
        this.$stage.off("dragstart", function () {
          return !1;
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        (this.e = null),
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap();
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : c > a;
        case ">":
          return d ? c > a : a > c;
        case ">=":
          return d ? c >= a : a >= c;
        case "<=":
          return d ? a >= c : c >= a;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d) {
      var e = { item: { count: this._items.length, index: this.current() } },
        f = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase(),
        ),
        g = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, e, c),
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(g);
          }),
          this.$element.trigger(g),
          this.settings &&
            "function" == typeof this.settings[f] &&
            this.settings[f].apply(this, g)),
        g
      );
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this),
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this),
      );
    }),
    (e.prototype.browserSupport = function () {
      if (((this.support3d = j()), this.support3d)) {
        this.transformVendor = i();
        var a = [
          "transitionend",
          "webkitTransitionEnd",
          "transitionend",
          "oTransitionEnd",
        ];
        (this.transitionEndVendor = a[h()]),
          (this.vendorName = this.transformVendor.replace(/Transform/i, "")),
          (this.vendorName =
            "" !== this.vendorName
              ? "-" + this.vendorName.toLowerCase() + "-"
              : "");
      }
      this.state.orientation = b.orientation;
    }),
    (a.fn.owlCarousel = function (b) {
      return this.each(function () {
        a(this).data("owlCarousel") ||
          a(this).data("owlCarousel", new e(this, b));
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    var c = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
            if (
              b.namespace &&
              this._core.settings &&
              this._core.settings.lazyLoad &&
              ((b.property && "position" == b.property.name) ||
                "initialized" == b.type)
            )
              for (
                var c = this._core.settings,
                  d = (c.center && Math.ceil(c.items / 2)) || c.items,
                  e = (c.center && -1 * d) || 0,
                  f =
                    ((b.property && b.property.value) || this._core.current()) +
                    e,
                  g = this._core.clones().length,
                  h = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                e++ < d;

              )
                this.load(g / 2 + this._core.relative(f)),
                  g && a.each(this._core.clones(this._core.relative(f++)), h);
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (c.Defaults = { lazyLoad: !1 }),
      (c.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy",
                            );
                        }, this),
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": "url(" + g + ")",
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy",
                        );
                    }, this)),
                    (e.src = g));
            }, this),
          ),
          this._loaded.push(d.get(0)));
      }),
      (c.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = c);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    var b = function (c) {
      (this._core = c),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            this._core.settings.autoHeight && this.update();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass) ===
                this._core.$stage.children().eq(this._core.current()) &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (b.prototype.update = function () {
        this._core.$stage
          .parent()
          .height(
            this._core.$stage.children().eq(this._core.current()).height(),
          )
          .addClass(this._core.settings.autoHeightClass);
      }),
      (b.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._fullscreen = !1),
        (this._handlers = {
          "resize.owl.carousel": a.proxy(function (a) {
            this._core.settings.video &&
              !this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
            this._playing && this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content).find(".owl-video");
            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
          }, this),
        }),
        (this._core.options = a.extend({}, d.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this),
        );
    };
    (d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (d.prototype.fetch = function (a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else {
          if (!(d[3].indexOf("vimeo") > -1))
            throw new Error("Video URL not supported.");
          c = "vimeo";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (d.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        return (
          b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length
            ? (l(h.attr(i)), h.remove(), !1)
            : void ("youtube" === c.type
                ? ((f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg"),
                  l(f))
                : "vimeo" === c.type &&
                  a.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (a) {
                      (f = a[0].thumbnail_large), l(f);
                    },
                  }))
        );
      }),
      (d.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null);
      }),
      (d.prototype.play = function (b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c,
          d,
          e = a(b.target || b.srcElement),
          f = e.closest("." + this._core.settings.itemClass),
          g = this._videos[f.attr("data-video")],
          h = g.width || "100%",
          i = g.height || this._core.$stage.height();
        "youtube" === g.type
          ? (c =
              '<iframe width="' +
              h +
              '" height="' +
              i +
              '" src="http://www.youtube.com/embed/' +
              g.id +
              "?autoplay=1&v=" +
              g.id +
              '" frameborder="0" allowfullscreen></iframe>')
          : "vimeo" === g.type &&
            (c =
              '<iframe src="http://player.vimeo.com/video/' +
              g.id +
              '?autoplay=1" width="' +
              h +
              '" height="' +
              i +
              '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
          f.addClass("owl-video-playing"),
          (this._playing = f),
          (d = a(
            '<div style="height:' +
              i +
              "px; width:" +
              h +
              'px" class="owl-video-frame">' +
              c +
              "</div>",
          )),
          e.after(d);
      }),
      (d.prototype.isInFullScreen = function () {
        var d =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return (
          d &&
            a(d).parent().hasClass("owl-video-frame") &&
            (this._core.speed(0), (this._fullscreen = !0)),
          d && this._fullscreen && this._playing
            ? !1
            : this._fullscreen
              ? ((this._fullscreen = !1), !1)
              : this._playing && this._core.state.orientation !== b.orientation
                ? ((this._core.state.orientation = b.orientation), !1)
                : !0
        );
      }),
      (d.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              this.swapping = "translated" == a.type;
            }, this),
          "translate.owl.carousel": a.proxy(function () {
            this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c,
                )),
            f &&
              e
                .addClass("animated owl-animated-in")
                .addClass(f)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c,
                ));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.transitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, d.Defaults, this.core.options)),
        (this.handlers = {
          "translated.owl.carousel refreshed.owl.carousel": a.proxy(
            function () {
              this.autoplay();
            },
            this,
          ),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function () {
            this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.autoplay();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (d.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (d.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay
          ? (b.clearInterval(this.interval),
            (this.interval = b.setInterval(
              a.proxy(function () {
                this.play();
              }, this),
              this.core.settings.autoplayTimeout,
            )))
          : b.clearInterval(this.interval);
      }),
      (d.prototype.play = function () {
        return c.hidden === !0 ||
          this.core.state.isTouch ||
          this.core.state.isScrolling ||
          this.core.state.isSwiping ||
          this.core.state.inMotion
          ? void 0
          : this.core.settings.autoplay === !1
            ? void b.clearInterval(this.interval)
            : void this.core.next(this.core.settings.autoplaySpeed);
      }),
      (d.prototype.stop = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.pause = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    "use strict";
    var b = function (c) {
      (this._core = c),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.push(
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot"),
              );
          }, this),
          "add.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.splice(
                b.position,
                0,
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot"),
              );
          }, this),
          "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
            this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "change.owl.carousel": a.proxy(function (a) {
            if (
              "position" == a.property.name &&
              !this._core.state.revert &&
              !this._core.settings.loop &&
              this._core.settings.navRewind
            ) {
              var b = this._core.current(),
                c = this._core.maximum(),
                d = this._core.minimum();
              a.data =
                a.property.value > c
                  ? b >= c
                    ? d
                    : c
                  : a.property.value < d
                    ? c
                    : a.property.value;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name && this.draw();
          }, this),
          "refreshed.owl.carousel": a.proxy(function () {
            this._initialized || (this.initialize(), (this._initialized = !0)),
              this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation");
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (b.Defaults = {
      nav: !1,
      navRewind: !0,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
      controlsClass: "owl-controls",
    }),
      (b.prototype.initialize = function () {
        var b,
          c,
          d = this._core.settings;
        d.dotsData ||
          (this._templates = [
            a("<div>")
              .addClass(d.dotClass)
              .append(a("<span>"))
              .prop("outerHTML"),
          ]),
          (d.navContainer && d.dotsContainer) ||
            (this._controls.$container = a("<div>")
              .addClass(d.controlsClass)
              .appendTo(this.$element)),
          (this._controls.$indicators = d.dotsContainer
            ? a(d.dotsContainer)
            : a("<div>")
                .hide()
                .addClass(d.dotsClass)
                .appendTo(this._controls.$container)),
          this._controls.$indicators.on(
            "click",
            "div",
            a.proxy(function (b) {
              var c = a(b.target).parent().is(this._controls.$indicators)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(c, d.dotsSpeed);
            }, this),
          ),
          (b = d.navContainer
            ? a(d.navContainer)
            : a("<div>")
                .addClass(d.navContainerClass)
                .prependTo(this._controls.$container)),
          (this._controls.$next = a("<" + d.navElement + ">")),
          (this._controls.$previous = this._controls.$next.clone()),
          this._controls.$previous
            .addClass(d.navClass[0])
            .html(d.navText[0])
            .hide()
            .prependTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.prev(d.navSpeed);
              }, this),
            ),
          this._controls.$next
            .addClass(d.navClass[1])
            .html(d.navText[1])
            .hide()
            .appendTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.next(d.navSpeed);
              }, this),
            );
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
      }),
      (b.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (b.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.settings,
          e = this._core.clones().length / 2,
          f = e + this._core.items().length,
          g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if (
          ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)),
          d.dots || "page" == d.slideBy)
        )
          for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)
            (b >= g || 0 === b) &&
              (this._pages.push({ start: a - e, end: a - e + g - 1 }),
              (b = 0),
              ++c),
              (b += this._core.mergers(this._core.relative(a)));
      }),
      (b.prototype.draw = function () {
        var b,
          c,
          d = "",
          e = this._core.settings,
          f =
            (this._core.$stage.children(),
            this._core.relative(this._core.current()));
        if (
          (!e.nav ||
            e.loop ||
            e.navRewind ||
            (this._controls.$previous.toggleClass("disabled", 0 >= f),
            this._controls.$next.toggleClass(
              "disabled",
              f >= this._core.maximum(),
            )),
          this._controls.$previous.toggle(e.nav),
          this._controls.$next.toggle(e.nav),
          e.dots)
        ) {
          if (
            ((b =
              this._pages.length -
              this._controls.$indicators.children().length),
            e.dotData && 0 !== b)
          ) {
            for (c = 0; c < this._controls.$indicators.children().length; c++)
              d += this._templates[this._core.relative(c)];
            this._controls.$indicators.html(d);
          } else
            b > 0
              ? ((d = new Array(b + 1).join(this._templates[0])),
                this._controls.$indicators.append(d))
              : 0 > b &&
                this._controls.$indicators.children().slice(b).remove();
          this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active");
        }
        this._controls.$indicators.toggle(e.dots);
      }),
      (b.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items),
        };
      }),
      (b.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(this._pages, function (a) {
            return a.start <= b && a.end >= b;
          })
          .pop();
      }),
      (b.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (b.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (b.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (b.prototype.to = function (b, c, d) {
        var e;
        d
          ? a.proxy(this._overrides.to, this._core)(b, c)
          : ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c,
            ));
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    "use strict";
    var c = function (d) {
      (this._core = d),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            "URLHash" == this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content)
              .find("[data-hash]")
              .andSelf("[data-hash]")
              .attr("data-hash");
            this._hashes[c] = b.content;
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function () {
            var a = b.location.hash.substring(1),
              c = this._core.$stage.children(),
              d = (this._hashes[a] && c.index(this._hashes[a])) || 0;
            return a ? void this._core.to(d, !1, !0) : !1;
          }, this),
        );
    };
    (c.Defaults = { URLhashListener: !1 }),
      (c.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = c);
  })(window.Zepto || window.jQuery, window, document);

/* GMAP3 Plugin for jQuery */
!(function (t, n) {
  function e(t) {
    return "object" == typeof t;
  }
  function o(t) {
    return "string" == typeof t;
  }
  function i(t) {
    return "number" == typeof t;
  }
  function a(t) {
    return t === n;
  }
  function r() {
    (q = google.maps),
      A ||
        (A = {
          verbose: !1,
          queryLimit: { attempt: 5, delay: 250, random: 250 },
          classes: (function () {
            var n = {};
            return (
              t.each(
                "Map Marker InfoWindow Circle Rectangle OverlayView StreetViewPanorama KmlLayer TrafficLayer BicyclingLayer GroundOverlay StyledMapType ImageMapType".split(
                  " ",
                ),
                function (t, e) {
                  n[e] = q[e];
                },
              ),
              n
            );
          })(),
          map: {
            mapTypeId: q.MapTypeId.ROADMAP,
            center: [46.578498, 2.457275],
            zoom: 2,
          },
          overlay: { pane: "floatPane", content: "", offset: { x: 0, y: 0 } },
          geoloc: { getCurrentPosition: { maximumAge: 6e4, timeout: 5e3 } },
        });
  }
  function s(t, n) {
    return a(t) ? "gmap3_" + (n ? Z + 1 : ++Z) : t;
  }
  function u(t) {
    var n,
      e = q.version.split(".");
    for (t = t.split("."), n = 0; n < e.length; n++) e[n] = parseInt(e[n], 10);
    for (n = 0; n < t.length; n++) {
      if (((t[n] = parseInt(t[n], 10)), !e.hasOwnProperty(n))) return !1;
      if (e[n] < t[n]) return !1;
    }
    return !0;
  }
  function l(n, e, o, i, a) {
    function r(e, i) {
      e &&
        t.each(e, function (t, e) {
          var r = n,
            s = e;
          R(e) && ((r = e[0]), (s = e[1])),
            i(o, t, function (t) {
              s.apply(r, [a || o, t, u]);
            });
        });
    }
    var s = e.td || {},
      u = { id: i, data: s.data, tag: s.tag };
    r(s.events, q.event.addListener), r(s.onces, q.event.addListenerOnce);
  }
  function d(t) {
    var n,
      e = [];
    for (n in t) t.hasOwnProperty(n) && e.push(n);
    return e;
  }
  function c(t, n) {
    var e,
      o = arguments;
    for (e = 2; e < o.length; e++)
      if (n in o[e] && o[e].hasOwnProperty(n)) return void (t[n] = o[e][n]);
  }
  function p(n, e) {
    var o,
      i,
      a = ["data", "tag", "id", "events", "onces"],
      r = {};
    if (n.td)
      for (o in n.td)
        n.td.hasOwnProperty(o) &&
          "options" !== o &&
          "values" !== o &&
          (r[o] = n.td[o]);
    for (i = 0; i < a.length; i++) c(r, a[i], e, n.td);
    return (r.options = t.extend({}, n.opts || {}, e.options || {})), r;
  }
  function f() {
    if (A.verbose) {
      var t,
        n = [];
      if (window.console && z(console.error)) {
        for (t = 0; t < arguments.length; t++) n.push(arguments[t]);
        console.error.apply(console, n);
      } else {
        for (n = "", t = 0; t < arguments.length; t++)
          n += arguments[t].toString() + " ";
        alert(n);
      }
    }
  }
  function g(t) {
    return (i(t) || o(t)) && "" !== t && !isNaN(t);
  }
  function h(t) {
    var n,
      o = [];
    if (!a(t))
      if (e(t))
        if (i(t.length)) o = t;
        else for (n in t) o.push(t[n]);
      else o.push(t);
    return o;
  }
  function v(n) {
    return n
      ? z(n)
        ? n
        : ((n = h(n)),
          function (o) {
            var i;
            if (a(o)) return !1;
            if (e(o)) {
              for (i = 0; i < o.length; i++)
                if (t.inArray(o[i], n) >= 0) return !0;
              return !1;
            }
            return t.inArray(o, n) >= 0;
          })
      : void 0;
  }
  function m(t, n, e) {
    var i = n ? t : null;
    return !t || o(t)
      ? i
      : t.latLng
        ? m(t.latLng)
        : t instanceof q.LatLng
          ? t
          : g(t.lat)
            ? new q.LatLng(t.lat, t.lng)
            : !e && R(t) && g(t[0]) && g(t[1])
              ? new q.LatLng(t[0], t[1])
              : i;
  }
  function y(t) {
    var n, e;
    return !t || t instanceof q.LatLngBounds
      ? t || null
      : (R(t)
          ? 2 === t.length
            ? ((n = m(t[0])), (e = m(t[1])))
            : 4 === t.length && ((n = m([t[0], t[1]])), (e = m([t[2], t[3]])))
          : "ne" in t && "sw" in t
            ? ((n = m(t.ne)), (e = m(t.sw)))
            : "n" in t &&
              "e" in t &&
              "s" in t &&
              "w" in t &&
              ((n = m([t.n, t.e])), (e = m([t.s, t.w]))),
        n && e ? new q.LatLngBounds(e, n) : null);
  }
  function w(t, n, e, i, a) {
    var r = e ? m(i.td, !1, !0) : !1,
      s = r
        ? { latLng: r }
        : i.td.address
          ? o(i.td.address)
            ? { address: i.td.address }
            : i.td.address
          : !1,
      u = s ? G.get(s) : !1,
      l = this;
    s
      ? ((a = a || 0),
        u
          ? ((i.latLng = u.results[0].geometry.location),
            (i.results = u.results),
            (i.status = u.status),
            n.apply(t, [i]))
          : (s.location && (s.location = m(s.location)),
            s.bounds && (s.bounds = y(s.bounds)),
            M().geocode(s, function (o, r) {
              r === q.GeocoderStatus.OK
                ? (G.store(s, { results: o, status: r }),
                  (i.latLng = o[0].geometry.location),
                  (i.results = o),
                  (i.status = r),
                  n.apply(t, [i]))
                : r === q.GeocoderStatus.OVER_QUERY_LIMIT &&
                    a < A.queryLimit.attempt
                  ? setTimeout(
                      function () {
                        w.apply(l, [t, n, e, i, a + 1]);
                      },
                      A.queryLimit.delay +
                        Math.floor(Math.random() * A.queryLimit.random),
                    )
                  : (f("geocode failed", r, s),
                    (i.latLng = i.results = !1),
                    (i.status = r),
                    n.apply(t, [i]));
            })))
      : ((i.latLng = m(i.td, !1, !0)), n.apply(t, [i]));
  }
  function L(n, e, o, i) {
    function a() {
      do s++;
      while (s < n.length && !("address" in n[s]));
      return s >= n.length
        ? void o.apply(e, [i])
        : void w(
            r,
            function (e) {
              delete e.td, t.extend(n[s], e), a.apply(r, []);
            },
            !0,
            { td: n[s] },
          );
    }
    var r = this,
      s = -1;
    a();
  }
  function b(t, n, e) {
    var o = !1;
    navigator && navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(
          function (i) {
            o ||
              ((o = !0),
              (e.latLng = new q.LatLng(i.coords.latitude, i.coords.longitude)),
              n.apply(t, [e]));
          },
          function () {
            o || ((o = !0), (e.latLng = !1), n.apply(t, [e]));
          },
          e.opts.getCurrentPosition,
        )
      : ((e.latLng = !1), n.apply(t, [e]));
  }
  function x(t) {
    var n,
      o = !1;
    if (e(t) && t.hasOwnProperty("get")) {
      for (n in t) if ("get" !== n) return !1;
      o = !t.get.hasOwnProperty("callback");
    }
    return o;
  }
  function M() {
    return V.geocoder || (V.geocoder = new q.Geocoder()), V.geocoder;
  }
  function I() {
    var t = [];
    (this.get = function (n) {
      if (t.length) {
        var o,
          i,
          a,
          r,
          s,
          u = d(n);
        for (o = 0; o < t.length; o++) {
          for (
            r = t[o], s = u.length === r.keys.length, i = 0;
            i < u.length && s;
            i++
          )
            (a = u[i]),
              (s = a in r.request),
              s &&
                (s =
                  e(n[a]) && "equals" in n[a] && z(n[a])
                    ? n[a].equals(r.request[a])
                    : n[a] === r.request[a]);
          if (s) return r.results;
        }
      }
    }),
      (this.store = function (n, e) {
        t.push({ request: n, keys: d(n), results: e });
      });
  }
  function P() {
    var t = [],
      n = this;
    (n.empty = function () {
      return !t.length;
    }),
      (n.add = function (n) {
        t.push(n);
      }),
      (n.get = function () {
        return t.length ? t[0] : !1;
      }),
      (n.ack = function () {
        t.shift();
      });
  }
  function k() {
    function n(t) {
      return {
        id: t.id,
        name: t.name,
        object: t.obj,
        tag: t.tag,
        data: t.data,
      };
    }
    function e(t) {
      z(t.setMap) && t.setMap(null),
        z(t.remove) && t.remove(),
        z(t.free) && t.free(),
        (t = null);
    }
    var o = {},
      i = {},
      r = this;
    (r.add = function (t, n, e, a) {
      var u = t.td || {},
        l = s(u.id);
      return (
        o[n] || (o[n] = []),
        l in i && r.clearById(l),
        (i[l] = { obj: e, sub: a, name: n, id: l, tag: u.tag, data: u.data }),
        o[n].push(l),
        l
      );
    }),
      (r.getById = function (t, e, o) {
        var a = !1;
        return t in i && (a = e ? i[t].sub : o ? n(i[t]) : i[t].obj), a;
      }),
      (r.get = function (t, e, a, r) {
        var s,
          u,
          l = v(a);
        if (!o[t] || !o[t].length) return null;
        for (s = o[t].length; s; )
          if ((s--, (u = o[t][e ? s : o[t].length - s - 1]), u && i[u])) {
            if (l && !l(i[u].tag)) continue;
            return r ? n(i[u]) : i[u].obj;
          }
        return null;
      }),
      (r.all = function (t, e, r) {
        var s = [],
          u = v(e),
          l = function (t) {
            var e, a;
            for (e = 0; e < o[t].length; e++)
              if (((a = o[t][e]), a && i[a])) {
                if (u && !u(i[a].tag)) continue;
                s.push(r ? n(i[a]) : i[a].obj);
              }
          };
        if (t in o) l(t);
        else if (a(t)) for (t in o) l(t);
        return s;
      }),
      (r.rm = function (t, n, e) {
        var a, s;
        if (!o[t]) return !1;
        if (n)
          if (e)
            for (
              a = o[t].length - 1;
              a >= 0 && ((s = o[t][a]), !n(i[s].tag));
              a--
            );
          else
            for (a = 0; a < o[t].length && ((s = o[t][a]), !n(i[s].tag)); a++);
        else a = e ? o[t].length - 1 : 0;
        return a in o[t] ? r.clearById(o[t][a], a) : !1;
      }),
      (r.clearById = function (t, n) {
        if (t in i) {
          var r,
            s = i[t].name;
          for (r = 0; a(n) && r < o[s].length; r++) t === o[s][r] && (n = r);
          return (
            e(i[t].obj),
            i[t].sub && e(i[t].sub),
            delete i[t],
            o[s].splice(n, 1),
            !0
          );
        }
        return !1;
      }),
      (r.objGetById = function (t) {
        var n, e;
        if (o.clusterer)
          for (e in o.clusterer)
            if ((n = i[o.clusterer[e]].obj.getById(t)) !== !1) return n;
        return !1;
      }),
      (r.objClearById = function (t) {
        var n;
        if (o.clusterer)
          for (n in o.clusterer)
            if (i[o.clusterer[n]].obj.clearById(t)) return !0;
        return null;
      }),
      (r.clear = function (t, n, e, i) {
        var a,
          s,
          u,
          l = v(i);
        if (t && t.length) t = h(t);
        else {
          t = [];
          for (a in o) t.push(a);
        }
        for (s = 0; s < t.length; s++)
          if (((u = t[s]), n)) r.rm(u, l, !0);
          else if (e) r.rm(u, l, !1);
          else for (; r.rm(u, l, !1); );
      }),
      (r.objClear = function (n, e, a, r) {
        var s;
        if (o.clusterer && (t.inArray("marker", n) >= 0 || !n.length))
          for (s in o.clusterer) i[o.clusterer[s]].obj.clear(e, a, r);
      });
  }
  function B(n, e, i) {
    function a(t) {
      var n = {};
      return (n[t] = {}), n;
    }
    function r() {
      var t;
      for (t in i) if (i.hasOwnProperty(t) && !u.hasOwnProperty(t)) return t;
    }
    var s,
      u = {},
      l = this,
      d = {
        latLng: {
          map: !1,
          marker: !1,
          infowindow: !1,
          circle: !1,
          overlay: !1,
          getlatlng: !1,
          getmaxzoom: !1,
          getelevation: !1,
          streetviewpanorama: !1,
          getaddress: !0,
        },
        geoloc: { getgeoloc: !0 },
      };
    o(i) && (i = a(i)),
      (l.run = function () {
        for (var o, a; (o = r()); ) {
          if (z(n[o]))
            return (
              (s = o),
              (a = t.extend(!0, {}, A[o] || {}, i[o].options || {})),
              void (o in d.latLng
                ? i[o].values
                  ? L(i[o].values, n, n[o], { td: i[o], opts: a, session: u })
                  : w(n, n[o], d.latLng[o], { td: i[o], opts: a, session: u })
                : o in d.geoloc
                  ? b(n, n[o], { td: i[o], opts: a, session: u })
                  : n[o].apply(n, [{ td: i[o], opts: a, session: u }]))
            );
          u[o] = null;
        }
        e.apply(n, [i, u]);
      }),
      (l.ack = function (t) {
        (u[s] = t), l.run.apply(l, []);
      });
  }
  function j() {
    return V.ds || (V.ds = new q.DirectionsService()), V.ds;
  }
  function O() {
    return V.dms || (V.dms = new q.DistanceMatrixService()), V.dms;
  }
  function C() {
    return V.mzs || (V.mzs = new q.MaxZoomService()), V.mzs;
  }
  function E() {
    return V.es || (V.es = new q.ElevationService()), V.es;
  }
  function S(t) {
    function n() {
      var t = this;
      return (
        (t.onAdd = function () {}),
        (t.onRemove = function () {}),
        (t.draw = function () {}),
        A.classes.OverlayView.apply(t, [])
      );
    }
    n.prototype = A.classes.OverlayView.prototype;
    var e = new n();
    return e.setMap(t), e;
  }
  function T(n, o, i) {
    function a(t) {
      T[t] ||
        (delete _[t].options.map,
        (T[t] = new A.classes.Marker(_[t].options)),
        l(n, { td: _[t] }, T[t], _[t].id));
    }
    function r() {
      return (y = U.getProjection())
        ? ((P = !0),
          j.push(q.event.addListener(o, "zoom_changed", f)),
          j.push(q.event.addListener(o, "bounds_changed", f)),
          void h())
        : void setTimeout(function () {
            r.apply(B, []);
          }, 25);
    }
    function u(t) {
      e(O[t])
        ? (z(O[t].obj.setMap) && O[t].obj.setMap(null),
          z(O[t].obj.remove) && O[t].obj.remove(),
          z(O[t].shadow.remove) && O[t].obj.remove(),
          z(O[t].shadow.setMap) && O[t].shadow.setMap(null),
          delete O[t].obj,
          delete O[t].shadow)
        : T[t] && T[t].setMap(null),
        delete O[t];
    }
    function d() {
      var t,
        n,
        e,
        o,
        i,
        a,
        r,
        s,
        u = Math.cos,
        l = Math.sin,
        d = arguments;
      return (
        d[0] instanceof q.LatLng
          ? ((t = d[0].lat()),
            (e = d[0].lng()),
            d[1] instanceof q.LatLng
              ? ((n = d[1].lat()), (o = d[1].lng()))
              : ((n = d[1]), (o = d[2])))
          : ((t = d[0]),
            (e = d[1]),
            d[2] instanceof q.LatLng
              ? ((n = d[2].lat()), (o = d[2].lng()))
              : ((n = d[2]), (o = d[3]))),
        (i = (Math.PI * t) / 180),
        (a = (Math.PI * e) / 180),
        (r = (Math.PI * n) / 180),
        (s = (Math.PI * o) / 180),
        6371e3 *
          Math.acos(
            Math.min(
              u(i) * u(r) * u(a) * u(s) +
                u(i) * l(a) * u(r) * l(s) +
                l(i) * l(r),
              1,
            ),
          )
      );
    }
    function c() {
      var t = d(o.getCenter(), o.getBounds().getNorthEast()),
        n = new q.Circle({ center: o.getCenter(), radius: 1.25 * t });
      return n.getBounds();
    }
    function p() {
      var t,
        n = {};
      for (t in O) n[t] = !0;
      return n;
    }
    function f() {
      clearTimeout(m), (m = setTimeout(h, 25));
    }
    function g(t) {
      var n = y.fromLatLngToDivPixel(t),
        e = y.fromDivPixelToLatLng(new q.Point(n.x + i.radius, n.y - i.radius)),
        o = y.fromDivPixelToLatLng(new q.Point(n.x - i.radius, n.y + i.radius));
      return new q.LatLngBounds(o, e);
    }
    function h() {
      if (!x && !I && P) {
        var n,
          e,
          a,
          r,
          s,
          l,
          d,
          f,
          h,
          v,
          m,
          y = !1,
          b = [],
          B = {},
          j = o.getZoom(),
          C = "maxZoom" in i && j > i.maxZoom,
          E = p();
        for (
          M = !1,
            j > 3 &&
              ((s = c()),
              (y = s.getSouthWest().lng() < s.getNorthEast().lng())),
            n = 0;
          n < _.length;
          n++
        )
          !_[n] ||
            (y && !s.contains(_[n].options.position)) ||
            (w && !w(D[n])) ||
            b.push(n);
        for (;;) {
          for (n = 0; B[n] && n < b.length; ) n++;
          if (n === b.length) break;
          if (((r = []), k && !C)) {
            m = 10;
            do
              for (
                f = r,
                  r = [],
                  m--,
                  d = f.length ? s.getCenter() : _[b[n]].options.position,
                  s = g(d),
                  e = n;
                e < b.length;
                e++
              )
                B[e] || (s.contains(_[b[e]].options.position) && r.push(e));
            while (f.length < r.length && r.length > 1 && m);
          } else
            for (e = n; e < b.length; e++)
              if (!B[e]) {
                r.push(e);
                break;
              }
          for (
            l = { indexes: [], ref: [] }, h = v = 0, a = 0;
            a < r.length;
            a++
          )
            (B[r[a]] = !0),
              l.indexes.push(b[r[a]]),
              l.ref.push(b[r[a]]),
              (h += _[b[r[a]]].options.position.lat()),
              (v += _[b[r[a]]].options.position.lng());
          (h /= r.length),
            (v /= r.length),
            (l.latLng = new q.LatLng(h, v)),
            (l.ref = l.ref.join("-")),
            l.ref in E
              ? delete E[l.ref]
              : (1 === r.length && (O[l.ref] = !0), L(l));
        }
        t.each(E, function (t) {
          u(t);
        }),
          (I = !1);
      }
    }
    var m,
      y,
      w,
      L,
      b,
      x = !1,
      M = !1,
      I = !1,
      P = !1,
      k = !0,
      B = this,
      j = [],
      O = {},
      C = {},
      E = {},
      T = [],
      _ = [],
      D = [],
      U = S(o, i.radius);
    r(),
      (B.getById = function (t) {
        return t in C ? (a(C[t]), T[C[t]]) : !1;
      }),
      (B.rm = function (t) {
        var n = C[t];
        T[n] && T[n].setMap(null),
          delete T[n],
          (T[n] = !1),
          delete _[n],
          (_[n] = !1),
          delete D[n],
          (D[n] = !1),
          delete C[t],
          delete E[n],
          (M = !0);
      }),
      (B.clearById = function (t) {
        return t in C ? (B.rm(t), !0) : void 0;
      }),
      (B.clear = function (t, n, e) {
        var o,
          i,
          a,
          r,
          s,
          u = [],
          l = v(e);
        for (
          t
            ? ((o = _.length - 1), (i = -1), (a = -1))
            : ((o = 0), (i = _.length), (a = 1)),
            r = o;
          r !== i && (!_[r] || (l && !l(_[r].tag)) || (u.push(E[r]), !n && !t));
          r += a
        );
        for (s = 0; s < u.length; s++) B.rm(u[s]);
      }),
      (B.add = function (t, n) {
        (t.id = s(t.id)),
          B.clearById(t.id),
          (C[t.id] = T.length),
          (E[T.length] = t.id),
          T.push(null),
          _.push(t),
          D.push(n),
          (M = !0);
      }),
      (B.addMarker = function (t, e) {
        (e = e || {}),
          (e.id = s(e.id)),
          B.clearById(e.id),
          e.options || (e.options = {}),
          (e.options.position = t.getPosition()),
          l(n, { td: e }, t, e.id),
          (C[e.id] = T.length),
          (E[T.length] = e.id),
          T.push(t),
          _.push(e),
          D.push(e.data || {}),
          (M = !0);
      }),
      (B.td = function (t) {
        return _[t];
      }),
      (B.value = function (t) {
        return D[t];
      }),
      (B.marker = function (t) {
        return t in T ? (a(t), T[t]) : !1;
      }),
      (B.markerIsSet = function (t) {
        return Boolean(T[t]);
      }),
      (B.setMarker = function (t, n) {
        T[t] = n;
      }),
      (B.store = function (t, n, e) {
        O[t.ref] = { obj: n, shadow: e };
      }),
      (B.free = function () {
        var n;
        for (n = 0; n < j.length; n++) q.event.removeListener(j[n]);
        (j = []),
          t.each(O, function (t) {
            u(t);
          }),
          (O = {}),
          t.each(_, function (t) {
            _[t] = null;
          }),
          (_ = []),
          t.each(T, function (t) {
            T[t] && (T[t].setMap(null), delete T[t]);
          }),
          (T = []),
          t.each(D, function (t) {
            delete D[t];
          }),
          (D = []),
          (C = {}),
          (E = {});
      }),
      (B.filter = function (t) {
        (w = t), h();
      }),
      (B.enable = function (t) {
        k !== t && ((k = t), h());
      }),
      (B.display = function (t) {
        L = t;
      }),
      (B.error = function (t) {
        b = t;
      }),
      (B.beginUpdate = function () {
        x = !0;
      }),
      (B.endUpdate = function () {
        (x = !1), M && h();
      }),
      (B.autofit = function (t) {
        var n;
        for (n = 0; n < _.length; n++) _[n] && t.extend(_[n].options.position);
      });
  }
  function _(t, n) {
    var e = this;
    (e.id = function () {
      return t;
    }),
      (e.filter = function (t) {
        n.filter(t);
      }),
      (e.enable = function () {
        n.enable(!0);
      }),
      (e.disable = function () {
        n.enable(!1);
      }),
      (e.add = function (t, e, o) {
        o || n.beginUpdate(), n.addMarker(t, e), o || n.endUpdate();
      }),
      (e.getById = function (t) {
        return n.getById(t);
      }),
      (e.clearById = function (t, e) {
        var o;
        return (
          e || n.beginUpdate(), (o = n.clearById(t)), e || n.endUpdate(), o
        );
      }),
      (e.clear = function (t, e, o, i) {
        i || n.beginUpdate(), n.clear(t, e, o), i || n.endUpdate();
      });
  }
  function D(n, e, o, i) {
    var a = this,
      r = [];
    A.classes.OverlayView.call(a),
      a.setMap(n),
      (a.onAdd = function () {
        var n = a.getPanes();
        e.pane in n && t(n[e.pane]).append(i),
          t.each(
            "dblclick click mouseover mousemove mouseout mouseup mousedown".split(
              " ",
            ),
            function (n, e) {
              r.push(
                q.event.addDomListener(i[0], e, function (n) {
                  t.Event(n).stopPropagation(),
                    q.event.trigger(a, e, [n]),
                    a.draw();
                }),
              );
            },
          ),
          r.push(
            q.event.addDomListener(i[0], "contextmenu", function (n) {
              t.Event(n).stopPropagation(),
                q.event.trigger(a, "rightclick", [n]),
                a.draw();
            }),
          );
      }),
      (a.getPosition = function () {
        return o;
      }),
      (a.setPosition = function (t) {
        (o = t), a.draw();
      }),
      (a.draw = function () {
        var t = a.getProjection().fromLatLngToDivPixel(o);
        i.css("left", t.x + e.offset.x + "px").css(
          "top",
          t.y + e.offset.y + "px",
        );
      }),
      (a.onRemove = function () {
        var t;
        for (t = 0; t < r.length; t++) q.event.removeListener(r[t]);
        i.remove();
      }),
      (a.hide = function () {
        i.hide();
      }),
      (a.show = function () {
        i.show();
      }),
      (a.toggle = function () {
        i && (i.is(":visible") ? a.show() : a.hide());
      }),
      (a.toggleDOM = function () {
        a.setMap(a.getMap() ? null : n);
      }),
      (a.getDOMElement = function () {
        return i[0];
      });
  }
  function U(i) {
    function r() {
      !b && (b = M.get()) && b.run();
    }
    function d() {
      (b = null), M.ack(), r.call(x);
    }
    function c(t) {
      var n,
        e = t.td.callback;
      e &&
        ((n = Array.prototype.slice.call(arguments, 1)),
        z(e) ? e.apply(i, n) : R(e) && z(e[1]) && e[1].apply(e[0], n));
    }
    function g(t, n, e) {
      e && l(i, t, n, e), c(t, n), b.ack(n);
    }
    function v(n, e) {
      e = e || {};
      var o = e.td && e.td.options ? e.td.options : 0;
      S
        ? o && (o.center && (o.center = m(o.center)), S.setOptions(o))
        : ((o = e.opts || t.extend(!0, {}, A.map, o || {})),
          (o.center = n || m(o.center)),
          (S = new A.classes.Map(i.get(0), o)));
    }
    function w(e) {
      var o,
        a,
        r = new T(i, S, e),
        s = {},
        u = {},
        d = [],
        c = /^[0-9]+$/;
      for (a in e)
        c.test(a)
          ? (d.push(1 * a),
            (u[a] = e[a]),
            (u[a].width = u[a].width || 0),
            (u[a].height = u[a].height || 0))
          : (s[a] = e[a]);
      return (
        d.sort(function (t, n) {
          return t > n;
        }),
        (o = s.calculator
          ? function (n) {
              var e = [];
              return (
                t.each(n, function (t, n) {
                  e.push(r.value(n));
                }),
                s.calculator.apply(i, [e])
              );
            }
          : function (t) {
              return t.length;
            }),
        r.error(function () {
          f.apply(x, arguments);
        }),
        r.display(function (a) {
          var c,
            p,
            f,
            g,
            h,
            v,
            y = o(a.indexes);
          if (e.force || y > 1)
            for (c = 0; c < d.length; c++) d[c] <= y && (p = u[d[c]]);
          p
            ? ((h = p.offset || [-p.width / 2, -p.height / 2]),
              (f = t.extend({}, s)),
              (f.options = t.extend(
                {
                  pane: "overlayLayer",
                  content: p.content
                    ? p.content.replace("CLUSTER_COUNT", y)
                    : "",
                  offset: {
                    x: ("x" in h ? h.x : h[0]) || 0,
                    y: ("y" in h ? h.y : h[1]) || 0,
                  },
                },
                s.options || {},
              )),
              (g = x.overlay({ td: f, opts: f.options, latLng: m(a) }, !0)),
              (f.options.pane = "floatShadow"),
              (f.options.content = t(document.createElement("div"))
                .width(p.width + "px")
                .height(p.height + "px")
                .css({ cursor: "pointer" })),
              (v = x.overlay({ td: f, opts: f.options, latLng: m(a) }, !0)),
              (s.data = { latLng: m(a), markers: [] }),
              t.each(a.indexes, function (t, n) {
                s.data.markers.push(r.value(n)),
                  r.markerIsSet(n) && r.marker(n).setMap(null);
              }),
              l(i, { td: s }, v, n, { main: g, shadow: v }),
              r.store(a, g, v))
            : t.each(a.indexes, function (t, n) {
                r.marker(n).setMap(S);
              });
        }),
        r
      );
    }
    function L(n, e, o) {
      var a = [],
        r = "values" in n.td;
      return (
        r || (n.td.values = [{ options: n.opts }]),
        n.td.values.length
          ? (v(),
            t.each(n.td.values, function (t, r) {
              var s,
                u,
                d,
                c,
                f = p(n, r);
              if (f.options[o])
                if (f.options[o][0][0] && R(f.options[o][0][0]))
                  for (u = 0; u < f.options[o].length; u++)
                    for (d = 0; d < f.options[o][u].length; d++)
                      f.options[o][u][d] = m(f.options[o][u][d]);
                else
                  for (u = 0; u < f.options[o].length; u++)
                    f.options[o][u] = m(f.options[o][u]);
              (f.options.map = S),
                (c = new q[e](f.options)),
                a.push(c),
                (s = I.add({ td: f }, e.toLowerCase(), c)),
                l(i, { td: f }, c, s);
            }),
            void g(n, r ? a : a[0]))
          : void g(n, !1)
      );
    }
    var b,
      x = this,
      M = new P(),
      I = new k(),
      S = null;
    (x._plan = function (t) {
      var n;
      for (n = 0; n < t.length; n++) M.add(new B(x, d, t[n]));
      r();
    }),
      (x.map = function (t) {
        v(t.latLng, t), l(i, t, S), g(t, S);
      }),
      (x.destroy = function (t) {
        I.clear(), i.empty(), S && (S = null), g(t, !0);
      }),
      (x.overlay = function (n, e) {
        var o = [],
          a = "values" in n.td;
        return (
          a || (n.td.values = [{ latLng: n.latLng, options: n.opts }]),
          n.td.values.length
            ? (D.__initialised ||
                ((D.prototype = new A.classes.OverlayView()),
                (D.__initialised = !0)),
              t.each(n.td.values, function (a, r) {
                var s,
                  u,
                  d = p(n, r),
                  c = t(document.createElement("div")).css({
                    border: "none",
                    borderWidth: 0,
                    position: "absolute",
                  });
                c.append(d.options.content),
                  (u = new D(S, d.options, m(d) || m(r), c)),
                  o.push(u),
                  (c = null),
                  e || ((s = I.add(n, "overlay", u)), l(i, { td: d }, u, s));
              }),
              e ? o[0] : void g(n, a ? o : o[0]))
            : void g(n, !1)
        );
      }),
      (x.marker = function (n) {
        var e,
          o,
          a,
          r = "values" in n.td,
          u = !S;
        return (
          r ||
            ((n.opts.position = n.latLng || m(n.opts.position)),
            (n.td.values = [{ options: n.opts }])),
          n.td.values.length
            ? (u && v(),
              n.td.cluster && !S.getBounds()
                ? void q.event.addListenerOnce(
                    S,
                    "bounds_changed",
                    function () {
                      x.marker.apply(x, [n]);
                    },
                  )
                : void (n.td.cluster
                    ? (n.td.cluster instanceof _
                        ? ((o = n.td.cluster), (a = I.getById(o.id(), !0)))
                        : ((a = w(n.td.cluster)),
                          (o = new _(s(n.td.id, !0), a)),
                          I.add(n, "clusterer", o, a)),
                      a.beginUpdate(),
                      t.each(n.td.values, function (t, e) {
                        var o = p(n, e);
                        (o.options.position = m(
                          o.options.position ? o.options.position : e,
                        )),
                          o.options.position &&
                            ((o.options.map = S),
                            u && (S.setCenter(o.options.position), (u = !1)),
                            a.add(o, e));
                      }),
                      a.endUpdate(),
                      g(n, o))
                    : ((e = []),
                      t.each(n.td.values, function (t, o) {
                        var a,
                          r,
                          s = p(n, o);
                        (s.options.position = m(
                          s.options.position ? s.options.position : o,
                        )),
                          s.options.position &&
                            ((s.options.map = S),
                            u && (S.setCenter(s.options.position), (u = !1)),
                            (r = new A.classes.Marker(s.options)),
                            e.push(r),
                            (a = I.add({ td: s }, "marker", r)),
                            l(i, { td: s }, r, a));
                      }),
                      g(n, r ? e : e[0]))))
            : void g(n, !1)
        );
      }),
      (x.getroute = function (t) {
        (t.opts.origin = m(t.opts.origin, !0)),
          (t.opts.destination = m(t.opts.destination, !0)),
          j().route(t.opts, function (n, e) {
            c(t, e === q.DirectionsStatus.OK ? n : !1, e), b.ack();
          });
      }),
      (x.getdistance = function (t) {
        var n;
        for (
          t.opts.origins = h(t.opts.origins), n = 0;
          n < t.opts.origins.length;
          n++
        )
          t.opts.origins[n] = m(t.opts.origins[n], !0);
        for (
          t.opts.destinations = h(t.opts.destinations), n = 0;
          n < t.opts.destinations.length;
          n++
        )
          t.opts.destinations[n] = m(t.opts.destinations[n], !0);
        O().getDistanceMatrix(t.opts, function (n, e) {
          c(t, e === q.DistanceMatrixStatus.OK ? n : !1, e), b.ack();
        });
      }),
      (x.infowindow = function (e) {
        var o = [],
          r = "values" in e.td;
        r ||
          (e.latLng && (e.opts.position = e.latLng),
          (e.td.values = [{ options: e.opts }])),
          t.each(e.td.values, function (t, s) {
            var u,
              d,
              c = p(e, s);
            (c.options.position = m(
              c.options.position ? c.options.position : s.latLng,
            )),
              S || v(c.options.position),
              (d = new A.classes.InfoWindow(c.options)),
              d &&
                (a(c.open) || c.open) &&
                (r
                  ? d.open(S, c.anchor || n)
                  : d.open(
                      S,
                      c.anchor ||
                        (e.latLng
                          ? n
                          : e.session.marker
                            ? e.session.marker
                            : n),
                    )),
              o.push(d),
              (u = I.add({ td: c }, "infowindow", d)),
              l(i, { td: c }, d, u);
          }),
          g(e, r ? o : o[0]);
      }),
      (x.circle = function (n) {
        var e = [],
          o = "values" in n.td;
        return (
          o ||
            ((n.opts.center = n.latLng || m(n.opts.center)),
            (n.td.values = [{ options: n.opts }])),
          n.td.values.length
            ? (t.each(n.td.values, function (t, o) {
                var a,
                  r,
                  s = p(n, o);
                (s.options.center = m(s.options.center ? s.options.center : o)),
                  S || v(s.options.center),
                  (s.options.map = S),
                  (r = new A.classes.Circle(s.options)),
                  e.push(r),
                  (a = I.add({ td: s }, "circle", r)),
                  l(i, { td: s }, r, a);
              }),
              void g(n, o ? e : e[0]))
            : void g(n, !1)
        );
      }),
      (x.getaddress = function (t) {
        c(t, t.results, t.status), b.ack();
      }),
      (x.getlatlng = function (t) {
        c(t, t.results, t.status), b.ack();
      }),
      (x.getmaxzoom = function (t) {
        C().getMaxZoomAtLatLng(t.latLng, function (n) {
          c(t, n.status === q.MaxZoomStatus.OK ? n.zoom : !1, status), b.ack();
        });
      }),
      (x.getelevation = function (t) {
        var n,
          e = [],
          o = function (n, e) {
            c(t, e === q.ElevationStatus.OK ? n : !1, e), b.ack();
          };
        if (t.latLng) e.push(t.latLng);
        else
          for (e = h(t.td.locations || []), n = 0; n < e.length; n++)
            e[n] = m(e[n]);
        if (e.length) E().getElevationForLocations({ locations: e }, o);
        else {
          if (t.td.path && t.td.path.length)
            for (n = 0; n < t.td.path.length; n++) e.push(m(t.td.path[n]));
          e.length
            ? E().getElevationAlongPath({ path: e, samples: t.td.samples }, o)
            : b.ack();
        }
      }),
      (x.defaults = function (n) {
        t.each(n.td, function (n, o) {
          A[n] = e(A[n]) ? t.extend({}, A[n], o) : o;
        }),
          b.ack(!0);
      }),
      (x.rectangle = function (n) {
        var e = [],
          o = "values" in n.td;
        return (
          o || (n.td.values = [{ options: n.opts }]),
          n.td.values.length
            ? (t.each(n.td.values, function (t, o) {
                var a,
                  r,
                  s = p(n, o);
                (s.options.bounds = y(s.options.bounds ? s.options.bounds : o)),
                  S || v(s.options.bounds.getCenter()),
                  (s.options.map = S),
                  (r = new A.classes.Rectangle(s.options)),
                  e.push(r),
                  (a = I.add({ td: s }, "rectangle", r)),
                  l(i, { td: s }, r, a);
              }),
              void g(n, o ? e : e[0]))
            : void g(n, !1)
        );
      }),
      (x.polyline = function (t) {
        L(t, "Polyline", "path");
      }),
      (x.polygon = function (t) {
        L(t, "Polygon", "paths");
      }),
      (x.trafficlayer = function (t) {
        v();
        var n = I.get("trafficlayer");
        n ||
          ((n = new A.classes.TrafficLayer()),
          n.setMap(S),
          I.add(t, "trafficlayer", n)),
          g(t, n);
      }),
      (x.bicyclinglayer = function (t) {
        v();
        var n = I.get("bicyclinglayer");
        n ||
          ((n = new A.classes.BicyclingLayer()),
          n.setMap(S),
          I.add(t, "bicyclinglayer", n)),
          g(t, n);
      }),
      (x.groundoverlay = function (t) {
        (t.opts.bounds = y(t.opts.bounds)),
          t.opts.bounds && v(t.opts.bounds.getCenter());
        var n,
          e = new A.classes.GroundOverlay(
            t.opts.url,
            t.opts.bounds,
            t.opts.opts,
          );
        e.setMap(S), (n = I.add(t, "groundoverlay", e)), g(t, e, n);
      }),
      (x.streetviewpanorama = function (n) {
        n.opts.opts || (n.opts.opts = {}),
          n.latLng
            ? (n.opts.opts.position = n.latLng)
            : n.opts.opts.position &&
              (n.opts.opts.position = m(n.opts.opts.position)),
          n.td.divId
            ? (n.opts.container = document.getElementById(n.td.divId))
            : n.opts.container &&
              (n.opts.container = t(n.opts.container).get(0));
        var e,
          o = new A.classes.StreetViewPanorama(n.opts.container, n.opts.opts);
        o && S.setStreetView(o),
          (e = I.add(n, "streetviewpanorama", o)),
          g(n, o, e);
      }),
      (x.kmllayer = function (n) {
        var e = [],
          o = "values" in n.td;
        return (
          o || (n.td.values = [{ options: n.opts }]),
          n.td.values.length
            ? (t.each(n.td.values, function (t, o) {
                var a,
                  r,
                  s,
                  d = p(n, o);
                S || v(),
                  (s = d.options),
                  d.options.opts &&
                    ((s = d.options.opts),
                    d.options.url && (s.url = d.options.url)),
                  (s.map = S),
                  (r = u("3.10")
                    ? new A.classes.KmlLayer(s)
                    : new A.classes.KmlLayer(s.url, s)),
                  e.push(r),
                  (a = I.add({ td: d }, "kmllayer", r)),
                  l(i, { td: d }, r, a);
              }),
              void g(n, o ? e : e[0]))
            : void g(n, !1)
        );
      }),
      (x.panel = function (n) {
        v();
        var e,
          o,
          r = 0,
          s = 0,
          u = t(document.createElement("div"));
        u.css({ position: "absolute", zIndex: 1e3, visibility: "hidden" }),
          n.opts.content &&
            ((o = t(n.opts.content)),
            u.append(o),
            i.first().prepend(u),
            a(n.opts.left)
              ? a(n.opts.right)
                ? n.opts.center && (r = (i.width() - o.width()) / 2)
                : (r = i.width() - o.width() - n.opts.right)
              : (r = n.opts.left),
            a(n.opts.top)
              ? a(n.opts.bottom)
                ? n.opts.middle && (s = (i.height() - o.height()) / 2)
                : (s = i.height() - o.height() - n.opts.bottom)
              : (s = n.opts.top),
            u.css({ top: s, left: r, visibility: "visible" })),
          (e = I.add(n, "panel", u)),
          g(n, u, e),
          (u = null);
      }),
      (x.directionsrenderer = function (n) {
        n.opts.map = S;
        var e,
          o = new q.DirectionsRenderer(n.opts);
        n.td.divId
          ? o.setPanel(document.getElementById(n.td.divId))
          : n.td.container && o.setPanel(t(n.td.container).get(0)),
          (e = I.add(n, "directionsrenderer", o)),
          g(n, o, e);
      }),
      (x.getgeoloc = function (t) {
        g(t, t.latLng);
      }),
      (x.styledmaptype = function (t) {
        v();
        var n = new A.classes.StyledMapType(t.td.styles, t.opts);
        S.mapTypes.set(t.td.id, n), g(t, n);
      }),
      (x.imagemaptype = function (t) {
        v();
        var n = new A.classes.ImageMapType(t.opts);
        S.mapTypes.set(t.td.id, n), g(t, n);
      }),
      (x.autofit = function (n) {
        var e = new q.LatLngBounds();
        t.each(I.all(), function (t, n) {
          n.getPosition
            ? e.extend(n.getPosition())
            : n.getBounds
              ? (e.extend(n.getBounds().getNorthEast()),
                e.extend(n.getBounds().getSouthWest()))
              : n.getPaths
                ? n.getPaths().forEach(function (t) {
                    t.forEach(function (t) {
                      e.extend(t);
                    });
                  })
                : n.getPath
                  ? n.getPath().forEach(function (t) {
                      e.extend(t);
                    })
                  : n.getCenter
                    ? e.extend(n.getCenter())
                    : "function" == typeof _ &&
                      n instanceof _ &&
                      ((n = I.getById(n.id(), !0)), n && n.autofit(e));
        }),
          e.isEmpty() ||
            (S.getBounds() && S.getBounds().equals(e)) ||
            ("maxZoom" in n.td &&
              q.event.addListenerOnce(S, "bounds_changed", function () {
                this.getZoom() > n.td.maxZoom && this.setZoom(n.td.maxZoom);
              }),
            S.fitBounds(e)),
          g(n, !0);
      }),
      (x.clear = function (n) {
        if (o(n.td)) {
          if (I.clearById(n.td) || I.objClearById(n.td)) return void g(n, !0);
          n.td = { name: n.td };
        }
        n.td.id
          ? t.each(h(n.td.id), function (t, n) {
              I.clearById(n) || I.objClearById(n);
            })
          : (I.clear(h(n.td.name), n.td.last, n.td.first, n.td.tag),
            I.objClear(h(n.td.name), n.td.last, n.td.first, n.td.tag)),
          g(n, !0);
      }),
      (x.get = function (e, i, a) {
        var r,
          s,
          u = i ? e : e.td;
        return (
          i || (a = u.full),
          o(u)
            ? ((s = I.getById(u, !1, a) || I.objGetById(u)),
              s === !1 && ((r = u), (u = {})))
            : (r = u.name),
          "map" === r && (s = S),
          s ||
            ((s = []),
            u.id
              ? (t.each(h(u.id), function (t, n) {
                  s.push(I.getById(n, !1, a) || I.objGetById(n));
                }),
                R(u.id) || (s = s[0]))
              : (t.each(r ? h(r) : [n], function (n, e) {
                  var o;
                  u.first
                    ? ((o = I.get(e, !1, u.tag, a)), o && s.push(o))
                    : u.all
                      ? t.each(I.all(e, u.tag, a), function (t, n) {
                          s.push(n);
                        })
                      : ((o = I.get(e, !0, u.tag, a)), o && s.push(o));
                }),
                u.all || R(r) || (s = s[0]))),
          (s = R(s) || !u.all ? s : [s]),
          i ? s : void g(e, s)
        );
      }),
      (x.exec = function (n) {
        t.each(h(n.td.func), function (e, o) {
          t.each(
            x.get(n.td, !0, n.td.hasOwnProperty("full") ? n.td.full : !0),
            function (t, n) {
              o.call(i, n);
            },
          );
        }),
          g(n, !0);
      }),
      (x.trigger = function (n) {
        if (o(n.td)) q.event.trigger(S, n.td);
        else {
          var e = [S, n.td.eventName];
          n.td.var_args &&
            t.each(n.td.var_args, function (t, n) {
              e.push(n);
            }),
            q.event.trigger.apply(q.event, e);
        }
        c(n), b.ack();
      });
  }
  var A,
    q,
    Z = 0,
    z = t.isFunction,
    R = t.isArray,
    V = {},
    G = new I();
  t.fn.gmap3 = function () {
    var n,
      e = [],
      o = !0,
      i = [];
    for (r(), n = 0; n < arguments.length; n++)
      arguments[n] && e.push(arguments[n]);
    return (
      e.length || e.push("map"),
      t.each(this, function () {
        var n = t(this),
          a = n.data("gmap3");
        (o = !1),
          a || ((a = new U(n)), n.data("gmap3", a)),
          1 !== e.length || ("get" !== e[0] && !x(e[0]))
            ? a._plan(e)
            : i.push(
                "get" === e[0]
                  ? a.get("map", !0)
                  : a.get(e[0].get, !0, e[0].get.full),
              );
      }),
      i.length ? (1 === i.length ? i[0] : i) : this
    );
  };
})(jQuery);

/* Isotope PACKAGED v2.0.1 */
(function (t) {
  function e() {}
  function i(t) {
    function i(e) {
      e.prototype.option ||
        (e.prototype.option = function (e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function n(e, i) {
      t.fn[e] = function (n) {
        if ("string" == typeof n) {
          for (
            var s = o.call(arguments, 1), a = 0, u = this.length;
            u > a;
            a++
          ) {
            var p = this[a],
              h = t.data(p, e);
            if (h)
              if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                var f = h[n].apply(h, s);
                if (void 0 !== f) return f;
              } else r("no such method '" + n + "' for " + e + " instance");
            else
              r(
                "cannot call methods on " +
                  e +
                  " prior to initialization; " +
                  "attempted to call '" +
                  n +
                  "'",
              );
          }
          return this;
        }
        return this.each(function () {
          var o = t.data(this, e);
          o
            ? (o.option(n), o._init())
            : ((o = new i(this, n)), t.data(this, e, o));
        });
      };
    }
    if (t) {
      var r =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            };
      return (
        (t.bridget = function (t, e) {
          i(e), n(t, e);
        }),
        t.bridget
      );
    }
  }
  var o = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
    : i(t.jQuery);
})(window),
  (function (t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      o = function () {};
    i.addEventListener
      ? (o = function (t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (o = function (t, i, o) {
          (t[i + o] = o.handleEvent
            ? function () {
                var i = e(t);
                o.handleEvent.call(o, i);
              }
            : function () {
                var i = e(t);
                o.call(t, i);
              }),
            t.attachEvent("on" + i, t[i + o]);
        });
    var n = function () {};
    i.removeEventListener
      ? (n = function (t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (n = function (t, e, i) {
          t.detachEvent("on" + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (o) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: o, unbind: n };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", r)
      : "object" == typeof exports
        ? (module.exports = r)
        : (t.eventie = r);
  })(this),
  (function (t) {
    function e(t) {
      "function" == typeof t && (e.isReady ? t() : r.push(t));
    }
    function i(t) {
      var i = "readystatechange" === t.type && "complete" !== n.readyState;
      if (!e.isReady && !i) {
        e.isReady = !0;
        for (var o = 0, s = r.length; s > o; o++) {
          var a = r[o];
          a();
        }
      }
    }
    function o(o) {
      return (
        o.bind(n, "DOMContentLoaded", i),
        o.bind(n, "readystatechange", i),
        o.bind(t, "load", i),
        e
      );
    }
    var n = t.document,
      r = [];
    (e.isReady = !1),
      "function" == typeof define && define.amd
        ? ((e.isReady = "function" == typeof requirejs),
          define("doc-ready/doc-ready", ["eventie/eventie"], o))
        : (t.docReady = o(t.eventie));
  })(this),
  function () {
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function () {
        return this[t].apply(this, arguments);
      };
    }
    var o = t.prototype,
      n = this,
      r = n.EventEmitter;
    (o.getListeners = function (t) {
      var e,
        i,
        o = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]);
      } else e = o[t] || (o[t] = []);
      return e;
    }),
      (o.flattenListeners = function (t) {
        var e,
          i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i;
      }),
      (o.getListenersAsObject = function (t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
      }),
      (o.addListener = function (t, i) {
        var o,
          n = this.getListenersAsObject(t),
          r = "object" == typeof i;
        for (o in n)
          n.hasOwnProperty(o) &&
            -1 === e(n[o], i) &&
            n[o].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (o.on = i("addListener")),
      (o.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (o.once = i("addOnceListener")),
      (o.defineEvent = function (t) {
        return this.getListeners(t), this;
      }),
      (o.defineEvents = function (t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (o.removeListener = function (t, i) {
        var o,
          n,
          r = this.getListenersAsObject(t);
        for (n in r)
          r.hasOwnProperty(n) &&
            ((o = e(r[n], i)), -1 !== o && r[n].splice(o, 1));
        return this;
      }),
      (o.off = i("removeListener")),
      (o.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (o.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (o.manipulateListeners = function (t, e, i) {
        var o,
          n,
          r = t ? this.removeListener : this.addListener,
          s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
          for (o = i.length; o--; ) r.call(this, e, i[o]);
        else
          for (o in e)
            e.hasOwnProperty(o) &&
              (n = e[o]) &&
              ("function" == typeof n
                ? r.call(this, o, n)
                : s.call(this, o, n));
        return this;
      }),
      (o.removeEvent = function (t) {
        var e,
          i = typeof t,
          o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
          for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this;
      }),
      (o.removeAllListeners = i("removeEvent")),
      (o.emitEvent = function (t, e) {
        var i,
          o,
          n,
          r,
          s = this.getListenersAsObject(t);
        for (n in s)
          if (s.hasOwnProperty(n))
            for (o = s[n].length; o--; )
              (i = s[n][o]),
                i.once === !0 && this.removeListener(t, i.listener),
                (r = i.listener.apply(this, e || [])),
                r === this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (o.trigger = i("emitEvent")),
      (o.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (o.setOnceReturnValue = function (t) {
        return (this._onceReturnValue = t), this;
      }),
      (o._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (o._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function () {
        return (n.EventEmitter = r), t;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return t;
          })
        : "object" == typeof module && module.exports
          ? (module.exports = t)
          : (this.EventEmitter = t);
  }.call(this),
  (function (t) {
    function e(t) {
      if (t) {
        if ("string" == typeof o[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, n = 0, r = i.length; r > n; n++)
          if (((e = i[n] + t), "string" == typeof o[e])) return e;
      }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
      o = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return e;
        })
      : "object" == typeof exports
        ? (module.exports = e)
        : (t.getStyleProperty = e);
  })(window),
  (function (t) {
    function e(t) {
      var e = parseFloat(t),
        i = -1 === t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = s.length;
        i > e;
        e++
      ) {
        var o = s[e];
        t[o] = 0;
      }
      return t;
    }
    function o(t) {
      function o(t) {
        if (
          ("string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
        ) {
          var o = r(t);
          if ("none" === o.display) return i();
          var n = {};
          (n.width = t.offsetWidth), (n.height = t.offsetHeight);
          for (
            var h = (n.isBorderBox = !(!p || !o[p] || "border-box" !== o[p])),
              f = 0,
              d = s.length;
            d > f;
            f++
          ) {
            var l = s[f],
              c = o[l];
            c = a(t, c);
            var y = parseFloat(c);
            n[l] = isNaN(y) ? 0 : y;
          }
          var m = n.paddingLeft + n.paddingRight,
            g = n.paddingTop + n.paddingBottom,
            v = n.marginLeft + n.marginRight,
            _ = n.marginTop + n.marginBottom,
            I = n.borderLeftWidth + n.borderRightWidth,
            L = n.borderTopWidth + n.borderBottomWidth,
            z = h && u,
            S = e(o.width);
          S !== !1 && (n.width = S + (z ? 0 : m + I));
          var b = e(o.height);
          return (
            b !== !1 && (n.height = b + (z ? 0 : g + L)),
            (n.innerWidth = n.width - (m + I)),
            (n.innerHeight = n.height - (g + L)),
            (n.outerWidth = n.width + v),
            (n.outerHeight = n.height + _),
            n
          );
        }
      }
      function a(t, e) {
        if (n || -1 === e.indexOf("%")) return e;
        var i = t.style,
          o = i.left,
          r = t.runtimeStyle,
          s = r && r.left;
        return (
          s && (r.left = t.currentStyle.left),
          (i.left = e),
          (e = i.pixelLeft),
          (i.left = o),
          s && (r.left = s),
          e
        );
      }
      var u,
        p = t("boxSizing");
      return (
        (function () {
          if (p) {
            var t = document.createElement("div");
            (t.style.width = "200px"),
              (t.style.padding = "1px 2px 3px 4px"),
              (t.style.borderStyle = "solid"),
              (t.style.borderWidth = "1px 2px 3px 4px"),
              (t.style[p] = "border-box");
            var i = document.body || document.documentElement;
            i.appendChild(t);
            var o = r(t);
            (u = 200 === e(o.width)), i.removeChild(t);
          }
        })(),
        o
      );
    }
    var n = t.getComputedStyle,
      r = n
        ? function (t) {
            return n(t, null);
          }
        : function (t) {
            return t.currentStyle;
          },
      s = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          o,
        )
      : "object" == typeof exports
        ? (module.exports = o(require("get-style-property")))
        : (t.getSize = o(t.getStyleProperty));
  })(window),
  (function (t, e) {
    function i(t, e) {
      return t[a](e);
    }
    function o(t) {
      if (!t.parentNode) {
        var e = document.createDocumentFragment();
        e.appendChild(t);
      }
    }
    function n(t, e) {
      o(t);
      for (
        var i = t.parentNode.querySelectorAll(e), n = 0, r = i.length;
        r > n;
        n++
      )
        if (i[n] === t) return !0;
      return !1;
    }
    function r(t, e) {
      return o(t), i(t, e);
    }
    var s,
      a = (function () {
        if (e.matchesSelector) return "matchesSelector";
        for (
          var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length;
          o > i;
          i++
        ) {
          var n = t[i],
            r = n + "MatchesSelector";
          if (e[r]) return r;
        }
      })();
    if (a) {
      var u = document.createElement("div"),
        p = i(u, "div");
      s = p ? i : r;
    } else s = n;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return s;
        })
      : (window.matchesSelector = s);
  })(this, Element.prototype),
  (function (t) {
    function e(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    function n(t, n, r) {
      function a(t, e) {
        t &&
          ((this.element = t),
          (this.layout = e),
          (this.position = { x: 0, y: 0 }),
          this._create());
      }
      var u = r("transition"),
        p = r("transform"),
        h = u && p,
        f = !!r("perspective"),
        d = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "otransitionend",
          transition: "transitionend",
        }[u],
        l = [
          "transform",
          "transition",
          "transitionDuration",
          "transitionProperty",
        ],
        c = (function () {
          for (var t = {}, e = 0, i = l.length; i > e; e++) {
            var o = l[e],
              n = r(o);
            n && n !== o && (t[o] = n);
          }
          return t;
        })();
      e(a.prototype, t.prototype),
        (a.prototype._create = function () {
          (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
            this.css({ position: "absolute" });
        }),
        (a.prototype.handleEvent = function (t) {
          var e = "on" + t.type;
          this[e] && this[e](t);
        }),
        (a.prototype.getSize = function () {
          this.size = n(this.element);
        }),
        (a.prototype.css = function (t) {
          var e = this.element.style;
          for (var i in t) {
            var o = c[i] || i;
            e[o] = t[i];
          }
        }),
        (a.prototype.getPosition = function () {
          var t = s(this.element),
            e = this.layout.options,
            i = e.isOriginLeft,
            o = e.isOriginTop,
            n = parseInt(t[i ? "left" : "right"], 10),
            r = parseInt(t[o ? "top" : "bottom"], 10);
          (n = isNaN(n) ? 0 : n), (r = isNaN(r) ? 0 : r);
          var a = this.layout.size;
          (n -= i ? a.paddingLeft : a.paddingRight),
            (r -= o ? a.paddingTop : a.paddingBottom),
            (this.position.x = n),
            (this.position.y = r);
        }),
        (a.prototype.layoutPosition = function () {
          var t = this.layout.size,
            e = this.layout.options,
            i = {};
          e.isOriginLeft
            ? ((i.left = this.position.x + t.paddingLeft + "px"),
              (i.right = ""))
            : ((i.right = this.position.x + t.paddingRight + "px"),
              (i.left = "")),
            e.isOriginTop
              ? ((i.top = this.position.y + t.paddingTop + "px"),
                (i.bottom = ""))
              : ((i.bottom = this.position.y + t.paddingBottom + "px"),
                (i.top = "")),
            this.css(i),
            this.emitEvent("layout", [this]);
        });
      var y = f
        ? function (t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)";
          }
        : function (t, e) {
            return "translate(" + t + "px, " + e + "px)";
          };
      (a.prototype._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = parseInt(t, 10),
          r = parseInt(e, 10),
          s = n === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), s && !this.isTransitioning))
          return this.layoutPosition(), void 0;
        var a = t - i,
          u = e - o,
          p = {},
          h = this.layout.options;
        (a = h.isOriginLeft ? a : -a),
          (u = h.isOriginTop ? u : -u),
          (p.transform = y(a, u)),
          this.transition({
            to: p,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
        (a.prototype.goTo = function (t, e) {
          this.setPosition(t, e), this.layoutPosition();
        }),
        (a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo),
        (a.prototype.setPosition = function (t, e) {
          (this.position.x = parseInt(t, 10)),
            (this.position.y = parseInt(e, 10));
        }),
        (a.prototype._nonTransition = function (t) {
          this.css(t.to), t.isCleaning && this._removeStyles(t.to);
          for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
        }),
        (a.prototype._transition = function (t) {
          if (!parseFloat(this.layout.options.transitionDuration))
            return this._nonTransition(t), void 0;
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null;
          }
          this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        });
      var m = p && o(p) + ",opacity";
      (a.prototype.enableTransition = function () {
        this.isTransitioning ||
          (this.css({
            transitionProperty: m,
            transitionDuration: this.layout.options.transitionDuration,
          }),
          this.element.addEventListener(d, this, !1));
      }),
        (a.prototype.transition =
          a.prototype[u ? "_transition" : "_nonTransition"]),
        (a.prototype.onwebkitTransitionEnd = function (t) {
          this.ontransitionend(t);
        }),
        (a.prototype.onotransitionend = function (t) {
          this.ontransitionend(t);
        });
      var g = {
        "-webkit-transform": "transform",
        "-moz-transform": "transform",
        "-o-transform": "transform",
      };
      (a.prototype.ontransitionend = function (t) {
        if (t.target === this.element) {
          var e = this._transn,
            o = g[t.propertyName] || t.propertyName;
          if (
            (delete e.ingProperties[o],
            i(e.ingProperties) && this.disableTransition(),
            o in e.clean &&
              ((this.element.style[t.propertyName] = ""), delete e.clean[o]),
            o in e.onEnd)
          ) {
            var n = e.onEnd[o];
            n.call(this), delete e.onEnd[o];
          }
          this.emitEvent("transitionEnd", [this]);
        }
      }),
        (a.prototype.disableTransition = function () {
          this.removeTransitionStyles(),
            this.element.removeEventListener(d, this, !1),
            (this.isTransitioning = !1);
        }),
        (a.prototype._removeStyles = function (t) {
          var e = {};
          for (var i in t) e[i] = "";
          this.css(e);
        });
      var v = { transitionProperty: "", transitionDuration: "" };
      return (
        (a.prototype.removeTransitionStyles = function () {
          this.css(v);
        }),
        (a.prototype.removeElem = function () {
          this.element.parentNode.removeChild(this.element),
            this.emitEvent("remove", [this]);
        }),
        (a.prototype.remove = function () {
          if (!u || !parseFloat(this.layout.options.transitionDuration))
            return this.removeElem(), void 0;
          var t = this;
          this.on("transitionEnd", function () {
            return t.removeElem(), !0;
          }),
            this.hide();
        }),
        (a.prototype.reveal = function () {
          delete this.isHidden, this.css({ display: "" });
          var t = this.layout.options;
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
          });
        }),
        (a.prototype.hide = function () {
          (this.isHidden = !0), this.css({ display: "" });
          var t = this.layout.options;
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: {
              opacity: function () {
                this.isHidden && this.css({ display: "none" });
              },
            },
          });
        }),
        (a.prototype.destroy = function () {
          this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: "",
          });
        }),
        a
      );
    }
    var r = t.getComputedStyle,
      s = r
        ? function (t) {
            return r(t, null);
          }
        : function (t) {
            return t.currentStyle;
          };
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
          ],
          n,
        )
      : ((t.Outlayer = {}),
        (t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty)));
  })(window),
  (function (t) {
    function e(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function i(t) {
      return "[object Array]" === f.call(t);
    }
    function o(t) {
      var e = [];
      if (i(t)) e = t;
      else if (t && "number" == typeof t.length)
        for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
      else e.push(t);
      return e;
    }
    function n(t, e) {
      var i = l(e, t);
      -1 !== i && e.splice(i, 1);
    }
    function r(t) {
      return t
        .replace(/(.)([A-Z])/g, function (t, e, i) {
          return e + "-" + i;
        })
        .toLowerCase();
    }
    function s(i, s, f, l, c, y) {
      function m(t, i) {
        if (("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)))
          return (
            u &&
              u.error("Bad " + this.constructor.namespace + " element: " + t),
            void 0
          );
        (this.element = t),
          (this.options = e({}, this.constructor.defaults)),
          this.option(i);
        var o = ++g;
        (this.element.outlayerGUID = o),
          (v[o] = this),
          this._create(),
          this.options.isInitLayout && this.layout();
      }
      var g = 0,
        v = {};
      return (
        (m.namespace = "outlayer"),
        (m.Item = y),
        (m.defaults = {
          containerStyle: { position: "relative" },
          isInitLayout: !0,
          isOriginLeft: !0,
          isOriginTop: !0,
          isResizeBound: !0,
          isResizingContainer: !0,
          transitionDuration: "0.4s",
          hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
          visibleStyle: { opacity: 1, transform: "scale(1)" },
        }),
        e(m.prototype, f.prototype),
        (m.prototype.option = function (t) {
          e(this.options, t);
        }),
        (m.prototype._create = function () {
          this.reloadItems(),
            (this.stamps = []),
            this.stamp(this.options.stamp),
            e(this.element.style, this.options.containerStyle),
            this.options.isResizeBound && this.bindResize();
        }),
        (m.prototype.reloadItems = function () {
          this.items = this._itemize(this.element.children);
        }),
        (m.prototype._itemize = function (t) {
          for (
            var e = this._filterFindItemElements(t),
              i = this.constructor.Item,
              o = [],
              n = 0,
              r = e.length;
            r > n;
            n++
          ) {
            var s = e[n],
              a = new i(s, this);
            o.push(a);
          }
          return o;
        }),
        (m.prototype._filterFindItemElements = function (t) {
          t = o(t);
          for (
            var e = this.options.itemSelector, i = [], n = 0, r = t.length;
            r > n;
            n++
          ) {
            var s = t[n];
            if (d(s))
              if (e) {
                c(s, e) && i.push(s);
                for (
                  var a = s.querySelectorAll(e), u = 0, p = a.length;
                  p > u;
                  u++
                )
                  i.push(a[u]);
              } else i.push(s);
          }
          return i;
        }),
        (m.prototype.getItemElements = function () {
          for (var t = [], e = 0, i = this.items.length; i > e; e++)
            t.push(this.items[e].element);
          return t;
        }),
        (m.prototype.layout = function () {
          this._resetLayout(), this._manageStamps();
          var t =
            void 0 !== this.options.isLayoutInstant
              ? this.options.isLayoutInstant
              : !this._isLayoutInited;
          this.layoutItems(this.items, t), (this._isLayoutInited = !0);
        }),
        (m.prototype._init = m.prototype.layout),
        (m.prototype._resetLayout = function () {
          this.getSize();
        }),
        (m.prototype.getSize = function () {
          this.size = l(this.element);
        }),
        (m.prototype._getMeasurement = function (t, e) {
          var i,
            o = this.options[t];
          o
            ? ("string" == typeof o
                ? (i = this.element.querySelector(o))
                : d(o) && (i = o),
              (this[t] = i ? l(i)[e] : o))
            : (this[t] = 0);
        }),
        (m.prototype.layoutItems = function (t, e) {
          (t = this._getItemsForLayout(t)),
            this._layoutItems(t, e),
            this._postLayout();
        }),
        (m.prototype._getItemsForLayout = function (t) {
          for (var e = [], i = 0, o = t.length; o > i; i++) {
            var n = t[i];
            n.isIgnored || e.push(n);
          }
          return e;
        }),
        (m.prototype._layoutItems = function (t, e) {
          function i() {
            o.emitEvent("layoutComplete", [o, t]);
          }
          var o = this;
          if (!t || !t.length) return i(), void 0;
          this._itemsOn(t, "layout", i);
          for (var n = [], r = 0, s = t.length; s > r; r++) {
            var a = t[r],
              u = this._getItemLayoutPosition(a);
            (u.item = a), (u.isInstant = e || a.isLayoutInstant), n.push(u);
          }
          this._processLayoutQueue(n);
        }),
        (m.prototype._getItemLayoutPosition = function () {
          return { x: 0, y: 0 };
        }),
        (m.prototype._processLayoutQueue = function (t) {
          for (var e = 0, i = t.length; i > e; e++) {
            var o = t[e];
            this._positionItem(o.item, o.x, o.y, o.isInstant);
          }
        }),
        (m.prototype._positionItem = function (t, e, i, o) {
          o ? t.goTo(e, i) : t.moveTo(e, i);
        }),
        (m.prototype._postLayout = function () {
          this.resizeContainer();
        }),
        (m.prototype.resizeContainer = function () {
          if (this.options.isResizingContainer) {
            var t = this._getContainerSize();
            t &&
              (this._setContainerMeasure(t.width, !0),
              this._setContainerMeasure(t.height, !1));
          }
        }),
        (m.prototype._getContainerSize = h),
        (m.prototype._setContainerMeasure = function (t, e) {
          if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox &&
              (t += e
                ? i.paddingLeft +
                  i.paddingRight +
                  i.borderLeftWidth +
                  i.borderRightWidth
                : i.paddingBottom +
                  i.paddingTop +
                  i.borderTopWidth +
                  i.borderBottomWidth),
              (t = Math.max(t, 0)),
              (this.element.style[e ? "width" : "height"] = t + "px");
          }
        }),
        (m.prototype._itemsOn = function (t, e, i) {
          function o() {
            return n++, n === r && i.call(s), !0;
          }
          for (
            var n = 0, r = t.length, s = this, a = 0, u = t.length;
            u > a;
            a++
          ) {
            var p = t[a];
            p.on(e, o);
          }
        }),
        (m.prototype.ignore = function (t) {
          var e = this.getItem(t);
          e && (e.isIgnored = !0);
        }),
        (m.prototype.unignore = function (t) {
          var e = this.getItem(t);
          e && delete e.isIgnored;
        }),
        (m.prototype.stamp = function (t) {
          if ((t = this._find(t))) {
            this.stamps = this.stamps.concat(t);
            for (var e = 0, i = t.length; i > e; e++) {
              var o = t[e];
              this.ignore(o);
            }
          }
        }),
        (m.prototype.unstamp = function (t) {
          if ((t = this._find(t)))
            for (var e = 0, i = t.length; i > e; e++) {
              var o = t[e];
              n(o, this.stamps), this.unignore(o);
            }
        }),
        (m.prototype._find = function (t) {
          return t
            ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
              (t = o(t)))
            : void 0;
        }),
        (m.prototype._manageStamps = function () {
          if (this.stamps && this.stamps.length) {
            this._getBoundingRect();
            for (var t = 0, e = this.stamps.length; e > t; t++) {
              var i = this.stamps[t];
              this._manageStamp(i);
            }
          }
        }),
        (m.prototype._getBoundingRect = function () {
          var t = this.element.getBoundingClientRect(),
            e = this.size;
          this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
          };
        }),
        (m.prototype._manageStamp = h),
        (m.prototype._getElementOffset = function (t) {
          var e = t.getBoundingClientRect(),
            i = this._boundingRect,
            o = l(t),
            n = {
              left: e.left - i.left - o.marginLeft,
              top: e.top - i.top - o.marginTop,
              right: i.right - e.right - o.marginRight,
              bottom: i.bottom - e.bottom - o.marginBottom,
            };
          return n;
        }),
        (m.prototype.handleEvent = function (t) {
          var e = "on" + t.type;
          this[e] && this[e](t);
        }),
        (m.prototype.bindResize = function () {
          this.isResizeBound ||
            (i.bind(t, "resize", this), (this.isResizeBound = !0));
        }),
        (m.prototype.unbindResize = function () {
          this.isResizeBound && i.unbind(t, "resize", this),
            (this.isResizeBound = !1);
        }),
        (m.prototype.onresize = function () {
          function t() {
            e.resize(), delete e.resizeTimeout;
          }
          this.resizeTimeout && clearTimeout(this.resizeTimeout);
          var e = this;
          this.resizeTimeout = setTimeout(t, 100);
        }),
        (m.prototype.resize = function () {
          this.isResizeBound && this.needsResizeLayout() && this.layout();
        }),
        (m.prototype.needsResizeLayout = function () {
          var t = l(this.element),
            e = this.size && t;
          return e && t.innerWidth !== this.size.innerWidth;
        }),
        (m.prototype.addItems = function (t) {
          var e = this._itemize(t);
          return e.length && (this.items = this.items.concat(e)), e;
        }),
        (m.prototype.appended = function (t) {
          var e = this.addItems(t);
          e.length && (this.layoutItems(e, !0), this.reveal(e));
        }),
        (m.prototype.prepended = function (t) {
          var e = this._itemize(t);
          if (e.length) {
            var i = this.items.slice(0);
            (this.items = e.concat(i)),
              this._resetLayout(),
              this._manageStamps(),
              this.layoutItems(e, !0),
              this.reveal(e),
              this.layoutItems(i);
          }
        }),
        (m.prototype.reveal = function (t) {
          var e = t && t.length;
          if (e)
            for (var i = 0; e > i; i++) {
              var o = t[i];
              o.reveal();
            }
        }),
        (m.prototype.hide = function (t) {
          var e = t && t.length;
          if (e)
            for (var i = 0; e > i; i++) {
              var o = t[i];
              o.hide();
            }
        }),
        (m.prototype.getItem = function (t) {
          for (var e = 0, i = this.items.length; i > e; e++) {
            var o = this.items[e];
            if (o.element === t) return o;
          }
        }),
        (m.prototype.getItems = function (t) {
          if (t && t.length) {
            for (var e = [], i = 0, o = t.length; o > i; i++) {
              var n = t[i],
                r = this.getItem(n);
              r && e.push(r);
            }
            return e;
          }
        }),
        (m.prototype.remove = function (t) {
          t = o(t);
          var e = this.getItems(t);
          if (e && e.length) {
            this._itemsOn(e, "remove", function () {
              this.emitEvent("removeComplete", [this, e]);
            });
            for (var i = 0, r = e.length; r > i; i++) {
              var s = e[i];
              s.remove(), n(s, this.items);
            }
          }
        }),
        (m.prototype.destroy = function () {
          var t = this.element.style;
          (t.height = ""), (t.position = ""), (t.width = "");
          for (var e = 0, i = this.items.length; i > e; e++) {
            var o = this.items[e];
            o.destroy();
          }
          this.unbindResize(),
            delete this.element.outlayerGUID,
            p && p.removeData(this.element, this.constructor.namespace);
        }),
        (m.data = function (t) {
          var e = t && t.outlayerGUID;
          return e && v[e];
        }),
        (m.create = function (t, i) {
          function o() {
            m.apply(this, arguments);
          }
          return (
            Object.create
              ? (o.prototype = Object.create(m.prototype))
              : e(o.prototype, m.prototype),
            (o.prototype.constructor = o),
            (o.defaults = e({}, m.defaults)),
            e(o.defaults, i),
            (o.prototype.settings = {}),
            (o.namespace = t),
            (o.data = m.data),
            (o.Item = function () {
              y.apply(this, arguments);
            }),
            (o.Item.prototype = new y()),
            s(function () {
              for (
                var e = r(t),
                  i = a.querySelectorAll(".js-" + e),
                  n = "data-" + e + "-options",
                  s = 0,
                  h = i.length;
                h > s;
                s++
              ) {
                var f,
                  d = i[s],
                  l = d.getAttribute(n);
                try {
                  f = l && JSON.parse(l);
                } catch (c) {
                  u &&
                    u.error(
                      "Error parsing " +
                        n +
                        " on " +
                        d.nodeName.toLowerCase() +
                        (d.id ? "#" + d.id : "") +
                        ": " +
                        c,
                    );
                  continue;
                }
                var y = new o(d, f);
                p && p.data(d, t, y);
              }
            }),
            p && p.bridget && p.bridget(t, o),
            o
          );
        }),
        (m.Item = y),
        m
      );
    }
    var a = t.document,
      u = t.console,
      p = t.jQuery,
      h = function () {},
      f = Object.prototype.toString,
      d =
        "object" == typeof HTMLElement
          ? function (t) {
              return t instanceof HTMLElement;
            }
          : function (t) {
              return (
                t &&
                "object" == typeof t &&
                1 === t.nodeType &&
                "string" == typeof t.nodeName
              );
            },
      l = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, o = t.length; o > i; i++) if (t[i] === e) return i;
            return -1;
          };
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "doc-ready/doc-ready",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "./item",
          ],
          s,
        )
      : (t.Outlayer = s(
          t.eventie,
          t.docReady,
          t.EventEmitter,
          t.getSize,
          t.matchesSelector,
          t.Outlayer.Item,
        ));
  })(window),
  (function (t) {
    function e(t) {
      function e() {
        t.Item.apply(this, arguments);
      }
      (e.prototype = new t.Item()),
        (e.prototype._create = function () {
          (this.id = this.layout.itemGUID++),
            t.Item.prototype._create.call(this),
            (this.sortData = {});
        }),
        (e.prototype.updateSortData = function () {
          if (!this.isIgnored) {
            (this.sortData.id = this.id),
              (this.sortData["original-order"] = this.id),
              (this.sortData.random = Math.random());
            var t = this.layout.options.getSortData,
              e = this.layout._sorters;
            for (var i in t) {
              var o = e[i];
              this.sortData[i] = o(this.element, this);
            }
          }
        });
      var i = e.prototype.destroy;
      return (
        (e.prototype.destroy = function () {
          i.apply(this, arguments), this.css({ display: "" });
        }),
        e
      );
    }
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], e)
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window),
  (function (t) {
    function e(t, e) {
      function i(t) {
        (this.isotope = t),
          t &&
            ((this.options = t.options[this.namespace]),
            (this.element = t.element),
            (this.items = t.filteredItems),
            (this.size = t.size));
      }
      return (
        (function () {
          function t(t) {
            return function () {
              return e.prototype[t].apply(this.isotope, arguments);
            };
          }
          for (
            var o = [
                "_resetLayout",
                "_getItemLayoutPosition",
                "_manageStamp",
                "_getContainerSize",
                "_getElementOffset",
                "needsResizeLayout",
              ],
              n = 0,
              r = o.length;
            r > n;
            n++
          ) {
            var s = o[n];
            i.prototype[s] = t(s);
          }
        })(),
        (i.prototype.needsVerticalResizeLayout = function () {
          var e = t(this.isotope.element),
            i = this.isotope.size && e;
          return i && e.innerHeight !== this.isotope.size.innerHeight;
        }),
        (i.prototype._getMeasurement = function () {
          this.isotope._getMeasurement.apply(this, arguments);
        }),
        (i.prototype.getColumnWidth = function () {
          this.getSegmentSize("column", "Width");
        }),
        (i.prototype.getRowHeight = function () {
          this.getSegmentSize("row", "Height");
        }),
        (i.prototype.getSegmentSize = function (t, e) {
          var i = t + e,
            o = "outer" + e;
          if ((this._getMeasurement(i, o), !this[i])) {
            var n = this.getFirstItemSize();
            this[i] = (n && n[o]) || this.isotope.size["inner" + e];
          }
        }),
        (i.prototype.getFirstItemSize = function () {
          var e = this.isotope.filteredItems[0];
          return e && e.element && t(e.element);
        }),
        (i.prototype.layout = function () {
          this.isotope.layout.apply(this.isotope, arguments);
        }),
        (i.prototype.getSize = function () {
          this.isotope.getSize(), (this.size = this.isotope.size);
        }),
        (i.modes = {}),
        (i.create = function (t, e) {
          function o() {
            i.apply(this, arguments);
          }
          return (
            (o.prototype = new i()),
            e && (o.options = e),
            (o.prototype.namespace = t),
            (i.modes[t] = o),
            o
          );
        }),
        i
      );
    }
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e,
        )
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window),
  (function (t) {
    function e(t, e) {
      var o = t.create("masonry");
      return (
        (o.prototype._resetLayout = function () {
          this.getSize(),
            this._getMeasurement("columnWidth", "outerWidth"),
            this._getMeasurement("gutter", "outerWidth"),
            this.measureColumns();
          var t = this.cols;
          for (this.colYs = []; t--; ) this.colYs.push(0);
          this.maxY = 0;
        }),
        (o.prototype.measureColumns = function () {
          if ((this.getContainerWidth(), !this.columnWidth)) {
            var t = this.items[0],
              i = t && t.element;
            this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
          }
          (this.columnWidth += this.gutter),
            (this.cols = Math.floor(
              (this.containerWidth + this.gutter) / this.columnWidth,
            )),
            (this.cols = Math.max(this.cols, 1));
        }),
        (o.prototype.getContainerWidth = function () {
          var t = this.options.isFitWidth
              ? this.element.parentNode
              : this.element,
            i = e(t);
          this.containerWidth = i && i.innerWidth;
        }),
        (o.prototype._getItemLayoutPosition = function (t) {
          t.getSize();
          var e = t.size.outerWidth % this.columnWidth,
            o = e && 1 > e ? "round" : "ceil",
            n = Math[o](t.size.outerWidth / this.columnWidth);
          n = Math.min(n, this.cols);
          for (
            var r = this._getColGroup(n),
              s = Math.min.apply(Math, r),
              a = i(r, s),
              u = { x: this.columnWidth * a, y: s },
              p = s + t.size.outerHeight,
              h = this.cols + 1 - r.length,
              f = 0;
            h > f;
            f++
          )
            this.colYs[a + f] = p;
          return u;
        }),
        (o.prototype._getColGroup = function (t) {
          if (2 > t) return this.colYs;
          for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
            var n = this.colYs.slice(o, o + t);
            e[o] = Math.max.apply(Math, n);
          }
          return e;
        }),
        (o.prototype._manageStamp = function (t) {
          var i = e(t),
            o = this._getElementOffset(t),
            n = this.options.isOriginLeft ? o.left : o.right,
            r = n + i.outerWidth,
            s = Math.floor(n / this.columnWidth);
          s = Math.max(0, s);
          var a = Math.floor(r / this.columnWidth);
          (a -= r % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a));
          for (
            var u =
                (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight,
              p = s;
            a >= p;
            p++
          )
            this.colYs[p] = Math.max(u, this.colYs[p]);
        }),
        (o.prototype._getContainerSize = function () {
          this.maxY = Math.max.apply(Math, this.colYs);
          var t = { height: this.maxY };
          return (
            this.options.isFitWidth && (t.width = this._getContainerFitWidth()),
            t
          );
        }),
        (o.prototype._getContainerFitWidth = function () {
          for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
          return (this.cols - t) * this.columnWidth - this.gutter;
        }),
        (o.prototype.needsResizeLayout = function () {
          var t = this.containerWidth;
          return this.getContainerWidth(), t !== this.containerWidth;
        }),
        o
      );
    }
    var i = Array.prototype.indexOf
      ? function (t, e) {
          return t.indexOf(e);
        }
      : function (t, e) {
          for (var i = 0, o = t.length; o > i; i++) {
            var n = t[i];
            if (n === e) return i;
          }
          return -1;
        };
    "function" == typeof define && define.amd
      ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window),
  (function (t) {
    function e(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function i(t, i) {
      var o = t.create("masonry"),
        n = o.prototype._getElementOffset,
        r = o.prototype.layout,
        s = o.prototype._getMeasurement;
      e(o.prototype, i.prototype),
        (o.prototype._getElementOffset = n),
        (o.prototype.layout = r),
        (o.prototype._getMeasurement = s);
      var a = o.prototype.measureColumns;
      o.prototype.measureColumns = function () {
        (this.items = this.isotope.filteredItems), a.call(this);
      };
      var u = o.prototype._manageStamp;
      return (
        (o.prototype._manageStamp = function () {
          (this.options.isOriginLeft = this.isotope.options.isOriginLeft),
            (this.options.isOriginTop = this.isotope.options.isOriginTop),
            u.apply(this, arguments);
        }),
        o
      );
    }
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          i,
        )
      : i(t.Isotope.LayoutMode, t.Masonry);
  })(window),
  (function (t) {
    function e(t) {
      var e = t.create("fitRows");
      return (
        (e.prototype._resetLayout = function () {
          (this.x = 0), (this.y = 0), (this.maxY = 0);
        }),
        (e.prototype._getItemLayoutPosition = function (t) {
          t.getSize(),
            0 !== this.x &&
              t.size.outerWidth + this.x > this.isotope.size.innerWidth &&
              ((this.x = 0), (this.y = this.maxY));
          var e = { x: this.x, y: this.y };
          return (
            (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
            (this.x += t.size.outerWidth),
            e
          );
        }),
        (e.prototype._getContainerSize = function () {
          return { height: this.maxY };
        }),
        e
      );
    }
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : e(t.Isotope.LayoutMode);
  })(window),
  (function (t) {
    function e(t) {
      var e = t.create("vertical", { horizontalAlignment: 0 });
      return (
        (e.prototype._resetLayout = function () {
          this.y = 0;
        }),
        (e.prototype._getItemLayoutPosition = function (t) {
          t.getSize();
          var e =
              (this.isotope.size.innerWidth - t.size.outerWidth) *
              this.options.horizontalAlignment,
            i = this.y;
          return (this.y += t.size.outerHeight), { x: e, y: i };
        }),
        (e.prototype._getContainerSize = function () {
          return { height: this.y };
        }),
        e
      );
    }
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e)
      : e(t.Isotope.LayoutMode);
  })(window),
  (function (t) {
    function e(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function i(t) {
      return "[object Array]" === h.call(t);
    }
    function o(t) {
      var e = [];
      if (i(t)) e = t;
      else if (t && "number" == typeof t.length)
        for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
      else e.push(t);
      return e;
    }
    function n(t, e) {
      var i = f(e, t);
      -1 !== i && e.splice(i, 1);
    }
    function r(t, i, r, u, h) {
      function f(t, e) {
        return function (i, o) {
          for (var n = 0, r = t.length; r > n; n++) {
            var s = t[n],
              a = i.sortData[s],
              u = o.sortData[s];
            if (a > u || u > a) {
              var p = void 0 !== e[s] ? e[s] : e,
                h = p ? 1 : -1;
              return (a > u ? 1 : -1) * h;
            }
          }
          return 0;
        };
      }
      var d = t.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
      (d.Item = u),
        (d.LayoutMode = h),
        (d.prototype._create = function () {
          (this.itemGUID = 0),
            (this._sorters = {}),
            this._getSorters(),
            t.prototype._create.call(this),
            (this.modes = {}),
            (this.filteredItems = this.items),
            (this.sortHistory = ["original-order"]);
          for (var e in h.modes) this._initLayoutMode(e);
        }),
        (d.prototype.reloadItems = function () {
          (this.itemGUID = 0), t.prototype.reloadItems.call(this);
        }),
        (d.prototype._itemize = function () {
          for (
            var e = t.prototype._itemize.apply(this, arguments),
              i = 0,
              o = e.length;
            o > i;
            i++
          ) {
            var n = e[i];
            n.id = this.itemGUID++;
          }
          return this._updateItemsSortData(e), e;
        }),
        (d.prototype._initLayoutMode = function (t) {
          var i = h.modes[t],
            o = this.options[t] || {};
          (this.options[t] = i.options ? e(i.options, o) : o),
            (this.modes[t] = new i(this));
        }),
        (d.prototype.layout = function () {
          return !this._isLayoutInited && this.options.isInitLayout
            ? (this.arrange(), void 0)
            : (this._layout(), void 0);
        }),
        (d.prototype._layout = function () {
          var t = this._getIsInstant();
          this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(this.filteredItems, t),
            (this._isLayoutInited = !0);
        }),
        (d.prototype.arrange = function (t) {
          this.option(t),
            this._getIsInstant(),
            (this.filteredItems = this._filter(this.items)),
            this._sort(),
            this._layout();
        }),
        (d.prototype._init = d.prototype.arrange),
        (d.prototype._getIsInstant = function () {
          var t =
            void 0 !== this.options.isLayoutInstant
              ? this.options.isLayoutInstant
              : !this._isLayoutInited;
          return (this._isInstant = t), t;
        }),
        (d.prototype._filter = function (t) {
          function e() {
            f.reveal(n), f.hide(r);
          }
          var i = this.options.filter;
          i = i || "*";
          for (
            var o = [],
              n = [],
              r = [],
              s = this._getFilterTest(i),
              a = 0,
              u = t.length;
            u > a;
            a++
          ) {
            var p = t[a];
            if (!p.isIgnored) {
              var h = s(p);
              h && o.push(p),
                h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p);
            }
          }
          var f = this;
          return this._isInstant ? this._noTransition(e) : e(), o;
        }),
        (d.prototype._getFilterTest = function (t) {
          return s && this.options.isJQueryFiltering
            ? function (e) {
                return s(e.element).is(t);
              }
            : "function" == typeof t
              ? function (e) {
                  return t(e.element);
                }
              : function (e) {
                  return r(e.element, t);
                };
        }),
        (d.prototype.updateSortData = function (t) {
          this._getSorters(), (t = o(t));
          var e = this.getItems(t);
          (e = e.length ? e : this.items), this._updateItemsSortData(e);
        }),
        (d.prototype._getSorters = function () {
          var t = this.options.getSortData;
          for (var e in t) {
            var i = t[e];
            this._sorters[e] = l(i);
          }
        }),
        (d.prototype._updateItemsSortData = function (t) {
          for (var e = 0, i = t.length; i > e; e++) {
            var o = t[e];
            o.updateSortData();
          }
        });
      var l = (function () {
        function t(t) {
          if ("string" != typeof t) return t;
          var i = a(t).split(" "),
            o = i[0],
            n = o.match(/^\[(.+)\]$/),
            r = n && n[1],
            s = e(r, o),
            u = d.sortDataParsers[i[1]];
          return (t = u
            ? function (t) {
                return t && u(s(t));
              }
            : function (t) {
                return t && s(t);
              });
        }
        function e(t, e) {
          var i;
          return (i = t
            ? function (e) {
                return e.getAttribute(t);
              }
            : function (t) {
                var i = t.querySelector(e);
                return i && p(i);
              });
        }
        return t;
      })();
      (d.sortDataParsers = {
        parseInt: function (t) {
          return parseInt(t, 10);
        },
        parseFloat: function (t) {
          return parseFloat(t);
        },
      }),
        (d.prototype._sort = function () {
          var t = this.options.sortBy;
          if (t) {
            var e = [].concat.apply(t, this.sortHistory),
              i = f(e, this.options.sortAscending);
            this.filteredItems.sort(i),
              t !== this.sortHistory[0] && this.sortHistory.unshift(t);
          }
        }),
        (d.prototype._mode = function () {
          var t = this.options.layoutMode,
            e = this.modes[t];
          if (!e) throw Error("No layout mode: " + t);
          return (e.options = this.options[t]), e;
        }),
        (d.prototype._resetLayout = function () {
          t.prototype._resetLayout.call(this), this._mode()._resetLayout();
        }),
        (d.prototype._getItemLayoutPosition = function (t) {
          return this._mode()._getItemLayoutPosition(t);
        }),
        (d.prototype._manageStamp = function (t) {
          this._mode()._manageStamp(t);
        }),
        (d.prototype._getContainerSize = function () {
          return this._mode()._getContainerSize();
        }),
        (d.prototype.needsResizeLayout = function () {
          return this._mode().needsResizeLayout();
        }),
        (d.prototype.appended = function (t) {
          var e = this.addItems(t);
          if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i);
          }
        }),
        (d.prototype.prepended = function (t) {
          var e = this._itemize(t);
          if (e.length) {
            var i = this.items.slice(0);
            (this.items = e.concat(i)),
              this._resetLayout(),
              this._manageStamps();
            var o = this._filterRevealAdded(e);
            this.layoutItems(i),
              (this.filteredItems = o.concat(this.filteredItems));
          }
        }),
        (d.prototype._filterRevealAdded = function (t) {
          var e = this._noTransition(function () {
            return this._filter(t);
          });
          return this.layoutItems(e, !0), this.reveal(e), t;
        }),
        (d.prototype.insert = function (t) {
          var e = this.addItems(t);
          if (e.length) {
            var i,
              o,
              n = e.length;
            for (i = 0; n > i; i++)
              (o = e[i]), this.element.appendChild(o.element);
            var r = this._filter(e);
            for (
              this._noTransition(function () {
                this.hide(r);
              }),
                i = 0;
              n > i;
              i++
            )
              e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
            this.reveal(r);
          }
        });
      var c = d.prototype.remove;
      return (
        (d.prototype.remove = function (t) {
          t = o(t);
          var e = this.getItems(t);
          if ((c.call(this, t), e && e.length))
            for (var i = 0, r = e.length; r > i; i++) {
              var s = e[i];
              n(s, this.filteredItems);
            }
        }),
        (d.prototype.shuffle = function () {
          for (var t = 0, e = this.items.length; e > t; t++) {
            var i = this.items[t];
            i.sortData.random = Math.random();
          }
          (this.options.sortBy = "random"), this._sort(), this._layout();
        }),
        (d.prototype._noTransition = function (t) {
          var e = this.options.transitionDuration;
          this.options.transitionDuration = 0;
          var i = t.call(this);
          return (this.options.transitionDuration = e), i;
        }),
        (d.prototype.getFilteredItemElements = function () {
          for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++)
            t.push(this.filteredItems[e].element);
          return t;
        }),
        d
      );
    }
    var s = t.jQuery,
      a = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      u = document.documentElement,
      p = u.textContent
        ? function (t) {
            return t.textContent;
          }
        : function (t) {
            return t.innerText;
          },
      h = Object.prototype.toString,
      f = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, o = t.length; o > i; i++) if (t[i] === e) return i;
            return -1;
          };
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          r,
        )
      : (t.Isotope = r(
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.Isotope.Item,
          t.Isotope.LayoutMode,
        ));
  })(window);

/* Video cover */
var coverVid = function (a, b, c) {
  function d(a, b) {
    var c = null;
    return function () {
      var d = this,
        e = arguments;
      window.clearTimeout(c),
        (c = window.setTimeout(function () {
          a.apply(d, e);
        }, b));
    };
  }
  function e() {
    var d = a.parentNode.offsetHeight,
      e = a.parentNode.offsetWidth,
      f = b,
      g = c,
      h = d / g,
      i = e / f;
    i > h
      ? ((a.style.height = "auto"), (a.style.width = e + "px"))
      : ((a.style.height = d + "px"), (a.style.width = "auto"));
  }
  document.addEventListener("DOMContentLoaded", e),
    (window.onresize = function () {
      d(e(), 50);
    }),
    (a.style.position = "absolute"),
    (a.style.top = "50%"),
    (a.style.left = "50%"),
    (a.style["-webkit-transform"] = "translate(-50%, -50%)"),
    (a.style["-ms-transform"] = "translate(-50%, -50%)"),
    (a.style.transform = "translate(-50%, -50%)"),
    (a.parentNode.style.overflow = "hidden");
};
window.jQuery &&
  jQuery.fn.extend({
    coverVid: function () {
      return coverVid(this[0], arguments[0], arguments[1]), this;
    },
  });

/* Ariona Compass Starter Bootstrap */

+(function () {
  /* Data background image generator */
  var elBgImg = "[data-bg-image]";
  $(elBgImg).each(function () {
    var image = $(this).data("bg-image");
    $(this).css("background-image", "url(" + image + ")");
  });

  /* Data background color generator */
  var elBgClr = "[data-bg-color]";
  $(elBgClr).each(function () {
    var color = $(this).data("bg-color");
    $(this).css("background-color", color);
  });

  $(window).load(function () {
    /* Filterable Items */
    var $container = $(".filterable-items");
    $container.isotope({
      filter: "*",
      layoutMode: "fitRows",
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    $(".filterable-nav a").click(function (e) {
      e.preventDefault();
      $(".filterable-nav .current").removeClass("current");
      $(this).addClass("current");

      var selector = $(this).attr("data-filter");
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });

    $(".mobile-filter").change(function () {
      var selector = $(this).val();
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });
  });
})(jQuery);
