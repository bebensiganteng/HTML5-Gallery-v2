(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/jquery.transit', 'controllers/appState'], function($, _b, _u, transit, AppState) {
    var PageView, _ref;

    return PageView = (function(_super) {
      __extends(PageView, _super);

      function PageView() {
        this.transform = __bind(this.transform, this);
        this.onTouchEnd = __bind(this.onTouchEnd, this);
        this.onTouchMove = __bind(this.onTouchMove, this);
        this.onTouchStart = __bind(this.onTouchStart, this);
        this.onMouseUp = __bind(this.onMouseUp, this);
        this.onMouseMove = __bind(this.onMouseMove, this);
        this.onMouseDown = __bind(this.onMouseDown, this);
        this.setMobileInteraction = __bind(this.setMobileInteraction, this);
        this.setDesktopInteraction = __bind(this.setDesktopInteraction, this);
        this.playIntro = __bind(this.playIntro, this);
        this.setIds = __bind(this.setIds, this);
        this.onResize = __bind(this.onResize, this);
        this.animate = __bind(this.animate, this);
        this.updatePage = __bind(this.updatePage, this);
        this.onStateChange = __bind(this.onStateChange, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = PageView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PageView.prototype.pages = null;

      PageView.prototype.width = null;

      PageView.prototype.height = null;

      PageView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      PageView.prototype.unrender = function() {
        var child;

        child = $(this.el).children().first();
        if (child) {
          return $(child).transition({
            opacity: 0
          }, 500, 'ease-in-out', function() {
            return $(this).remove();
          });
        }
      };

      PageView.prototype.render = function(ids) {
        this.ids = ids;
        $(this.el).css({
          opacity: 0
        });
        return $(this.el).transition({
          opacity: 1
        }, 500, 'ease-in-out');
      };

      PageView.prototype.onStateChange = function(event, oldState, newState) {
        var _ref1, _ref2;

        if (oldState === newState) {
          return;
        }
        if ((_ref1 = this.pages[oldState]) != null) {
          if (typeof _ref1.unrender === "function") {
            _ref1.unrender();
          }
        }
        return (_ref2 = this.pages[newState]) != null ? typeof _ref2.render === "function" ? _ref2.render(this.ids) : void 0 : void 0;
      };

      PageView.prototype.updatePage = function() {
        return console.log("PageView.updatePage");
      };

      PageView.prototype.animate = function() {};

      PageView.prototype.onResize = function() {
        this.width = $(window).outerWidth();
        return this.height = $(window).outerHeight();
      };

      PageView.prototype.setIds = function(ids) {
        this.ids = ids;
      };

      PageView.prototype.playIntro = function() {};

      PageView.prototype.setDesktopInteraction = function() {
        $(document).on('mousedown', this.onMouseDown);
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
        return this;
      };

      PageView.prototype.setMobileInteraction = function() {
        $(document)[0].addEventListener("touchstart", this.onTouchStart, true);
        $(document)[0].addEventListener("touchmove", this.onTouchMove, true);
        $(document)[0].addEventListener("touchend", this.onTouchEnd, true);
        return this;
      };

      PageView.prototype.onMouseDown = function(e) {};

      PageView.prototype.onMouseMove = function(e) {};

      PageView.prototype.onMouseUp = function(e) {};

      PageView.prototype.onTouchStart = function(e) {};

      PageView.prototype.onTouchMove = function(e) {};

      PageView.prototype.onTouchEnd = function(e) {};

      PageView.prototype.transform = function(elem, x, y, z, r, s) {
        if (z == null) {
          z = 0;
        }
        if (r == null) {
          r = 0;
        }
        if (s == null) {
          s = 1;
        }
        return elem.style[AppState.browser + 'transform'] = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px) rotate(' + r + 'deg) scale(' + s + ')';
      };

      return PageView;

    })(Backbone.View);
  });

}).call(this);
