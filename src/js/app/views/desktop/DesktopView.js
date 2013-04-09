(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'views/desktop/pages/ThumbnailsView', 'views/desktop/pages/GalleryView'], function($, _b, _u, PageView, ThumbnailsView, GalleryView) {
    var DesktopView, _ref;

    return DesktopView = (function(_super) {
      __extends(DesktopView, _super);

      function DesktopView() {
        this.onStateChange = __bind(this.onStateChange, this);
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

      DesktopView.prototype.onStateChange = function(event, oldState, newState) {
        return DesktopView.__super__.onStateChange.call(this, event, oldState, newState);
      };

      return DesktopView;

    })(PageView);
  });

}).call(this);
