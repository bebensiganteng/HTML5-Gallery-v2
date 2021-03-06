(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/stately', 'controllers/AppState', 'views/desktop/DesktopView', 'json!php/temp.json', 'libs/pixi'], function($, _b, _u, Stately, AppState, DesktopView, json, pixi) {
    var AppView, _ref;

    return AppView = (function(_super) {
      __extends(AppView, _super);

      function AppView() {
        this.scrollUp = __bind(this.scrollUp, this);
        this.onHashChanged = __bind(this.onHashChanged, this);
        this.onAssetsLoaded = __bind(this.onAssetsLoaded, this);
        this.animate = __bind(this.animate, this);
        this.render = __bind(this.render, this);
        this.initMachine = __bind(this.initMachine, this);        _ref = AppView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AppView.prototype.el = null;

      AppView.prototype.json = null;

      AppView.prototype.platform = null;

      AppView.prototype.machine = null;

      AppView.prototype.subid = null;

      AppView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        this.el = $("#content");
        this.json = json;
        this.initMachine();
        this.render();
        this.machine.bind(this.platform.onStateChange);
        return $(window).resize(this.platform.onResize);
      };

      AppView.prototype.initMachine = function() {
        return this.machine = Stately.machine({
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
      };

      AppView.prototype.render = function() {
        if (AppState.isDesktop) {
          return this.platform = new DesktopView({
            el: this.el,
            json: this.json
          }).setDesktopInteraction();
        } else {
          return this.platform = new DesktopView({
            el: this.el,
            json: this.json
          }).setMobileInteraction();
        }
      };

      AppView.prototype.animate = function() {
        if (this.subid === "thumbnails" && !AppState.isPaused) {
          this.platform.animate();
          return requestAnimationFrame(this.animate);
        }
      };

      AppView.prototype.onAssetsLoaded = function() {
        return this.platform.playIntro();
      };

      AppView.prototype.onHashChanged = function(subid, id) {
        var _base;

        this.platform.setIds({
          subid: subid,
          id: id
        });
        this.subid = subid;
        if (this.subid === "thumbnails") {
          AppState.isPaused = false;
          this.animate();
        }
        if (this.machine.getMachineState().toLowerCase() === subid) {
          return this.platform.updatePage();
        } else {
          if (!(typeof (_base = this.machine)[subid] === "function" ? _base[subid]() : void 0)) {
            return window.location.href = "./#thumbnails/0";
          }
        }
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
