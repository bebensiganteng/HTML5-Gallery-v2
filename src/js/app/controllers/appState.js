(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'libs/jquery.keyframes'], function($, _k) {
    var AppState;

    return AppState = (function() {
      AppState.STATE_READY = 'STATE_READY';

      AppState.isTablet = /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase());

      AppState.isMobile = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());

      AppState.isDesktop = false;

      AppState.isPaused = false;

      AppState.isIntro = true;

      AppState.browser = $.keyframe.browserCode();

      function AppState() {
        this.setMobile = __bind(this.setMobile, this);
        this.setDesktop = __bind(this.setDesktop, this);        AppState.isDesktop = !AppState.isTablet && !AppState.isMobile;
        this.html = $('html');
        this.setDesktop();
      }

      AppState.prototype.setDesktop = function() {
        return this.html.addClass('desktop');
      };

      AppState.prototype.setMobile = function() {
        return this.html.addClass('mobile');
      };

      AppState.has3d = function() {
        var el, has3d, t, transforms;

        el = document.createElement("p");
        has3d = void 0;
        transforms = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform"
        };
        document.body.insertBefore(el, null);
        for (t in transforms) {
          if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
          }
        }
        document.body.removeChild(el);
        return has3d !== undefined && has3d.length > 0 && has3d !== "none";
      };

      return AppState;

    }).call(this);
  });

}).call(this);
