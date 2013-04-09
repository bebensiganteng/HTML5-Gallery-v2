(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'text!templates/desktop/gallery.html'], function($, _b, _u, PageView, template) {
    var GalleryView, _ref;

    return GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        this.unrender = __bind(this.unrender, this);
        this.render = __bind(this.render, this);        _ref = GalleryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GalleryView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      GalleryView.prototype.render = function() {
        return $(this.el).append(template);
      };

      GalleryView.prototype.unrender = function() {
        return $(this.el).remove(template);
      };

      return GalleryView;

    })(PageView);
  });

}).call(this);
