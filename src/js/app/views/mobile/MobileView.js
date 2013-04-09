(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView'], function($, _b, _u, PageView) {
    var MobileView, _ref;

    return MobileView = (function(_super) {
      __extends(MobileView, _super);

      function MobileView() {
        this.render = __bind(this.render, this);        _ref = MobileView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MobileView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        return this.render();
      };

      MobileView.prototype.render = function() {
        return console.log("DesktopView.RENDER");
      };

      return MobileView;

    })(PageView);
  });

}).call(this);
