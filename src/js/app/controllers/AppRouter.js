(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore'], function($, _b, _u) {
    var AppRouter, _ref;

    return AppRouter = (function(_super) {
      __extends(AppRouter, _super);

      function AppRouter() {
        this.hashChanged = __bind(this.hashChanged, this);        _ref = AppRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AppRouter.EVENT_HASH_CHANGED = 'EVENT_HASH_CHANGED';

      AppRouter.prototype.routes = {
        ':id/:subid': 'hashChanged',
        '/:id/:subid': 'hashChanged',
        ':id/:subid/': 'hashChanged',
        '/:id/:subid/': 'hashChanged',
        '*actions': 'default'
      };

      AppRouter.prototype.start = function() {
        return Backbone.history.start();
      };

      AppRouter.prototype.hashChanged = function(subid, id) {
        return this.trigger(AppRouter.EVENT_HASH_CHANGED, subid, id);
      };

      AppRouter.prototype["default"] = function(actions) {
        if (actions == null) {
          return this.navigate("thumbnails/0");
        }
      };

      return AppRouter;

    })(Backbone.Router);
  });

}).call(this);
