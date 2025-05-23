!(function ($, n, o) {
  $(n).ready(function () {
    $(".mobile-navigation").append($(".main-navigation .menu").clone()),
      $(".menu-toggle").click(function () {
        $(".mobile-navigation").slideToggle();
      }),
      $(".hero").flexslider({ directionNav: !1, controlNav: !0 });
    var n = $(".map"),
      o = n.data("latitude"),
      e = n.data("longitude");
    n.length &&
      n.gmap3({
        map: { options: { center: [o, e], zoom: 15, scrollwheel: !1 } },
        marker: { latLng: [o, e] },
      });
  }),
    $(o).load(function () {});
})(jQuery, document, window);
