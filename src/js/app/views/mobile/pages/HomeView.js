(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore'], function($, _b, _u) {
    var HomeView, _ref;

    return HomeView = (function(_super) {
      __extends(HomeView, _super);

      function HomeView() {
        _ref = HomeView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      HomeView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        return console.log("HomeView.initialize");
      };

      HomeView.prototype.show = function() {};

      HomeView.prototype.hide = function() {};

      return HomeView;

    })(Backbone.View);
  });

}).call(this);
