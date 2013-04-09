(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/jquery.transit'], function($, _b, _u, transit) {
    var PageView, _ref;

    return PageView = (function(_super) {
      __extends(PageView, _super);

      function PageView() {
        this.onResize = __bind(this.onResize, this);
        this.onStateChange = __bind(this.onStateChange, this);
        this.hide = __bind(this.hide, this);
        this.show = __bind(this.show, this);        _ref = PageView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PageView.prototype.pages = null;

      PageView.prototype.initialize = function() {
        return _.bindAll(this, 'render');
      };

      PageView.prototype.show = function() {
        return $(this.el).transition({
          opacity: 0
        }, 500, 'ease-in-out', function() {
          return $(this).children().first().remove();
        });
      };

      PageView.prototype.hide = function() {
        return $(this.el).transition({
          opacity: 1
        }, 500, 'ease-in-out');
      };

      PageView.prototype.onStateChange = function(event, oldState, newState) {
        var _ref1, _ref2;

        if (oldState === newState) {
          return;
        }
        console.log("PageView.onStateChange:", event, "old:", oldState, "new:", newState);
        if ((_ref1 = this.pages[oldState]) != null) {
          if (typeof _ref1.unrender === "function") {
            _ref1.unrender();
          }
        }
        return (_ref2 = this.pages[newState]) != null ? typeof _ref2.render === "function" ? _ref2.render() : void 0 : void 0;
      };

      PageView.prototype.onResize = function() {};

      return PageView;

    })(Backbone.View);
  });

}).call(this);
