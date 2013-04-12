(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore'], function($, _b, _u) {
    var GalleryView, _ref;

    return GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        _ref = GalleryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GalleryView.prototype.initialize = function() {
        return _.bindAll(this, 'render');
      };

      GalleryView.prototype.show = function() {};

      GalleryView.prototype.hide = function() {};

      return GalleryView;

    })(Backbone.View);
  });

}).call(this);
