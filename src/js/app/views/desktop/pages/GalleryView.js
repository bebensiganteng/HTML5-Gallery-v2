(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'text!templates/desktop/gallery.html'], function($, _b, _u, PageView, template) {
    var GalleryView, _ref;

    return GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        this.onResize = __bind(this.onResize, this);
        this.onRight = __bind(this.onRight, this);
        this.onUp = __bind(this.onUp, this);
        this.onLeft = __bind(this.onLeft, this);
        this.render = __bind(this.render, this);        _ref = GalleryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GalleryView.prototype.events = {
        "click a#gallery-left": "onLeft",
        "click a#gallery-up": "onUp",
        "click a#gallery-right": "onRight"
      };

      GalleryView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'unrender', 'onLeft', 'onUp', 'onRight');
        this.json = this.options.json;
        return this.jsonlength = _.size(this.json);
      };

      GalleryView.prototype.render = function(ids) {
        var selected,
          _this = this;

        this.ids = ids;
        GalleryView.__super__.render.call(this, this.ids);
        $(this.el).append(template);
        selected = _.find(this.json, function(obj, id) {
          return id === _this.ids.id;
        });
        return $("#gallery-content").append("<img title='" + selected.phototitle + "' src='" + selected.original + "' />");
      };

      GalleryView.prototype.onLeft = function(e) {
        var page;

        e.preventDefault();
        page = Number(this.ids.id);
        if (this.ids.id === 0) {
          page = this.jsonlength - 1;
        } else {
          page--;
        }
        return window.location.href = './#gallery/' + page;
      };

      GalleryView.prototype.onUp = function(e) {
        e.preventDefault();
        return window.location.href = './#thumbnails/' + this.ids.id;
      };

      GalleryView.prototype.onRight = function(e) {
        var page;

        e.preventDefault();
        page = Number(this.ids.id);
        if (this.ids.id === 99) {
          page = 0;
        } else {
          page++;
        }
        return window.location.href = './#gallery/' + page;
      };

      GalleryView.prototype.onResize = function() {
        GalleryView.__super__.onResize.call(this);
        return console.log('GalleryView.onResize:', this.width, this.height);
      };

      return GalleryView;

    })(PageView);
  });

}).call(this);
