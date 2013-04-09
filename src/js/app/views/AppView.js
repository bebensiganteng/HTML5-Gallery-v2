(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'controllers/AppState', 'views/desktop/DesktopView', 'views/mobile/MobileView', 'libs/stately', 'json!php/temp.json'], function($, _b, _u, AppState, DesktopView, MobileView, Stately, json) {
    var AppView, _ref;

    return AppView = (function(_super) {
      __extends(AppView, _super);

      function AppView() {
        this.scrollUp = __bind(this.scrollUp, this);
        this.onHashChanged = __bind(this.onHashChanged, this);
        this.onAssetsLoaded = __bind(this.onAssetsLoaded, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);
        this.initMachine = __bind(this.initMachine, this);        _ref = AppView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AppView.prototype.el = null;

      AppView.prototype.json = null;

      AppView.prototype.platform = null;

      AppView.prototype.machine = null;

      AppView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        this.el = $("#content");
        this.json = json;
        $(window).resize(this.onResize);
        this.onResize();
        this.render();
        return this.initMachine();
      };

      AppView.prototype.initMachine = function() {
        this.machine = Stately.machine({
          PRELOADER: {
            thumbnails: function() {
              return this.THUMBNAILS;
            },
            gallery: function() {
              return this.GALLERY;
            }
          },
          THUMBNAILS: {
            gallery: function() {
              return this.GALLERY;
            }
          },
          GALLERY: {
            thumbnails: function() {
              return this.THUMBNAILS;
            }
          }
        });
        return this.machine.bind(this.platform.onStateChange);
      };

      AppView.prototype.render = function() {
        if (AppState.isDesktop) {
          return this.platform = new DesktopView({
            el: this.el,
            json: this.json
          });
        } else {
          return this.platform = new MobileView({
            el: this.el,
            json: this.json
          });
        }
      };

      AppView.prototype.onResize = function() {
        return console.log("AppView.onResize");
      };

      AppView.prototype.onAssetsLoaded = function() {
        return console.log("AppView.onAssetsLoaded");
      };

      AppView.prototype.onHashChanged = function(subid, id) {
        console.log("AppView.onHashChanged", subid, id);
        return this.machine[subid]();
      };

      AppView.prototype.scrollUp = function() {
        return $("html, body").animate({
          scrollTop: "0px"
        }, 500);
      };

      return AppView;

    })(Backbone.View);
  });

}).call(this);
