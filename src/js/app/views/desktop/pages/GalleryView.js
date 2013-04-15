(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'text!templates/desktop/gallery.html'], function($, _b, _u, PageView, template) {
    var GalleryView, _ref;

    return GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        this.updatePage = __bind(this.updatePage, this);
        this.removeSelected = __bind(this.removeSelected, this);
        this.built = __bind(this.built, this);
        this.onResize = __bind(this.onResize, this);
        this.getNext = __bind(this.getNext, this);
        this.getPrevious = __bind(this.getPrevious, this);
        this.onRight = __bind(this.onRight, this);
        this.onUp = __bind(this.onUp, this);
        this.onLeft = __bind(this.onLeft, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = GalleryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GalleryView.prototype.events = {
        "click a#gallery-left": "onLeft",
        "click a#gallery-close": "onUp",
        "click a#gallery-right": "onRight"
      };

      GalleryView.prototype.initialize = function() {
        var _this = this;

        _.bindAll(this, 'render', 'unrender', 'onLeft', 'onUp', 'onRight');
        this.json = this.options.json;
        this.jsonlength = _.size(this.json);
        this.collection = [];
        return _.each(this.json, function(obj, id) {
          return _this.collection.push(obj);
        });
      };

      GalleryView.prototype.unrender = function() {
        return this.gal.remove();
      };

      GalleryView.prototype.render = function(ids) {
        this.ids = ids;
        GalleryView.__super__.render.call(this, this.ids);
        $(this.el).append(template);
        this.gal = $("#gallery");
        this.left = $("#gallery-left");
        this.right = $("#gallery-right");
        this.close = $("#gallery-close");
        this.content = $("#gallery-content");
        this.onResize();
        return this.updatePage();
      };

      GalleryView.prototype.onLeft = function(e) {
        e.preventDefault();
        return window.location.href = './#gallery/' + this.getPrevious();
      };

      GalleryView.prototype.onUp = function(e) {
        e.preventDefault();
        return window.location.href = './#thumbnails/' + this.ids.id;
      };

      GalleryView.prototype.onRight = function(e) {
        e.preventDefault();
        return window.location.href = './#gallery/' + this.getNext();
      };

      GalleryView.prototype.getPrevious = function() {
        var id;

        id = Number(this.ids.id);
        if (this.ids.id === 0) {
          return this.jsonlength - 1;
        }
        return id--;
      };

      GalleryView.prototype.getNext = function() {
        var id;

        id = Number(this.ids.id);
        if (this.ids.id === this.jsonlength - 1) {
          return 0;
        }
        return id++;
      };

      GalleryView.prototype.onResize = function() {
        GalleryView.__super__.onResize.call(this);
        this.gal.css({
          width: this.width,
          height: this.height
        });
        this.right.css({
          right: "20px",
          top: (this.height - 46) / 2
        });
        this.left.css({
          left: "20px",
          top: (this.height - 46) / 2
        });
        return this.close.css({
          left: (this.width - 46) / 2,
          top: "10px"
        });
      };

      GalleryView.prototype.built = function() {
        var selected;

        selected = this.collection[this.ids.id];
        return "<img title='" + selected.phototitle + "' src='" + selected.original + "' />";
      };

      GalleryView.prototype.removeSelected = function() {
        var child,
          _this = this;

        child = this.content.children();
        return $(child).transition({
          opacity: 0
        }, 500, 'ease-in-out', function() {
          $(child).remove();
          return _this.content.append(_this.built());
        });
      };

      GalleryView.prototype.updatePage = function() {
        if (this.content.children().length > 0) {
          return this.removeSelected();
        } else {
          return this.content.append(this.built());
        }
      };

      return GalleryView;

    })(PageView);
  });

}).call(this);
