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
        if (AppState.isMobile || AppState.isTablet) {
          this.setMobile();
        }
        if (AppState.isDesktop) {
          this.setDesktop();
        }
      }

      AppState.prototype.setDesktop = function() {
        return this.html.addClass('desktop');
      };

      AppState.prototype.setMobile = function() {
        return this.html.addClass('mobile');
      };

      return AppState;

    })();
  });

}).call(this);
