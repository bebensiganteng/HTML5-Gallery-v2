(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'text!templates/desktop/thumbnails.html'], function($, _b, _u, PageView, template) {
    var ThumbnailsView, _ref;

    return ThumbnailsView = (function(_super) {
      __extends(ThumbnailsView, _super);

      function ThumbnailsView() {
        this.unrender = __bind(this.unrender, this);
        this.render = __bind(this.render, this);        _ref = ThumbnailsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbnailsView.prototype.json = null;

      ThumbnailsView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'unrender');
        return this.json = this.options.json;
      };

      ThumbnailsView.prototype.render = function() {
        _.each(this.json, function(obj) {
          return console.log("ThumbnailsView.render:", obj);
        });
        return $(this.el).append(template);
      };

      ThumbnailsView.prototype.unrender = function() {
        return $(this.el).remove(template);
      };

      return ThumbnailsView;

    })(PageView);
  });

}).call(this);