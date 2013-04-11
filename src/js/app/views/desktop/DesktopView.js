(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'views/desktop/pages/ThumbnailsView', 'views/desktop/pages/GalleryView'], function($, _b, _u, PageView, ThumbnailsView, GalleryView) {
    var DesktopView, _ref;

    return DesktopView = (function(_super) {
      __extends(DesktopView, _super);

      function DesktopView() {
        this.onTouchEnd = __bind(this.onTouchEnd, this);
        this.onTouchMove = __bind(this.onTouchMove, this);
        this.onTouchStart = __bind(this.onTouchStart, this);
        this.onMouseUp = __bind(this.onMouseUp, this);
        this.onMouseMove = __bind(this.onMouseMove, this);
        this.onMouseDown = __bind(this.onMouseDown, this);
        this.animate = __bind(this.animate, this);
        this.onResize = __bind(this.onResize, this);
        this.onStateChange = __bind(this.onStateChange, this);
        this.setIds = __bind(this.setIds, this);
        this.updatePage = __bind(this.updatePage, this);
        this.render = __bind(this.render, this);        _ref = DesktopView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DesktopView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        return this.render();
      };

      DesktopView.prototype.render = function() {
        return this.pages = {
          THUMBNAILS: new ThumbnailsView({
            el: this.el,
            json: this.options.json
          }),
          GALLERY: new GalleryView({
            el: this.el,
            json: this.options.json
          })
        };
      };

      DesktopView.prototype.updatePage = function() {
        return _.each(this.pages, function(obj) {
          return obj.updatePage();
        });
      };

      DesktopView.prototype.setIds = function(ids) {
        var _this = this;

        this.ids = ids;
        return _.each(this.pages, function(obj) {
          return obj.setIds(_this.ids);
        });
      };

      DesktopView.prototype.onStateChange = function(event, oldState, newState) {
        return DesktopView.__super__.onStateChange.call(this, event, oldState, newState);
      };

      DesktopView.prototype.onResize = function() {
        DesktopView.__super__.onResize.call(this);
        return _.each(this.pages, function(obj) {
          return obj.onResize();
        });
      };

      DesktopView.prototype.animate = function() {
        DesktopView.__super__.animate.call(this);
        return _.each(this.pages, function(obj) {
          return obj.animate();
        });
      };

      DesktopView.prototype.onMouseDown = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onMouseDown(e);
        });
      };

      DesktopView.prototype.onMouseMove = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onMouseMove(e);
        });
      };

      DesktopView.prototype.onMouseUp = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onMouseUp(e);
        });
      };

      DesktopView.prototype.onTouchStart = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onTouchStart(e);
        });
      };

      DesktopView.prototype.onTouchMove = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onTouchMove(e);
        });
      };

      DesktopView.prototype.onTouchEnd = function(e) {
        return _.each(this.pages, function(obj) {
          return obj.onTouchEnd(e);
        });
      };

      return DesktopView;

    })(PageView);
  });

}).call(this);
