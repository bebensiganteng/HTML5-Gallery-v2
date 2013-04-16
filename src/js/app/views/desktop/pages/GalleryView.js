(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/jquery.transit', 'views/PageView', 'text!templates/desktop/gallery.html'], function($, _b, _u, _t, PageView, template) {
    var GalleryView, _ref;

    return GalleryView = (function(_super) {
      __extends(GalleryView, _super);

      function GalleryView() {
        this.updatePage = __bind(this.updatePage, this);
        this.removeSelected = __bind(this.removeSelected, this);
        this.builtAll = __bind(this.builtAll, this);
        this.builtThumb = __bind(this.builtThumb, this);
        this.onResize = __bind(this.onResize, this);
        this.getNext = __bind(this.getNext, this);
        this.getPrevious = __bind(this.getPrevious, this);
        this.onUp = __bind(this.onUp, this);
        this.onHoverRightOff = __bind(this.onHoverRightOff, this);
        this.onHoverRightOn = __bind(this.onHoverRightOn, this);
        this.onHoverLeftOff = __bind(this.onHoverLeftOff, this);
        this.onHoverLeftOn = __bind(this.onHoverLeftOn, this);
        this.onRight = __bind(this.onRight, this);
        this.onLeft = __bind(this.onLeft, this);
        this.onFileProgress = __bind(this.onFileProgress, this);
        this.onFileLoad = __bind(this.onFileLoad, this);
        this.initPreloader = __bind(this.initPreloader, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = GalleryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GalleryView.prototype.tween = false;

      GalleryView.prototype.preload = null;

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
        this.lthumb = $("#gallery-thumbleft");
        this.rthumb = $("#gallery-thumbright");
        this.ptext = $("#gallery-preload");
        this.left.hover(this.onHoverLeftOn, this.onHoverLeftOff);
        this.right.hover(this.onHoverRightOn, this.onHoverRightOff);
        if (this.preload == null) {
          this.initPreloader();
        }
        this.onResize();
        return this.updatePage();
      };

      GalleryView.prototype.initPreloader = function() {
        this.preload = new createjs.LoadQueue(false);
        this.preload.addEventListener("fileload", this.onFileLoad);
        this.preload.addEventListener("progress", this.onFileProgress);
        return this.preload.setMaxConnections(1);
      };

      GalleryView.prototype.onFileLoad = function(e) {
        this.builtAll(e.result);
        return this.ptext.hide();
      };

      GalleryView.prototype.onFileProgress = function(e) {};

      GalleryView.prototype.onLeft = function(e) {
        e.preventDefault();
        this.onHoverLeftOff();
        this.tween = true;
        return window.location.href = './#gallery/' + this.getPrevious();
      };

      GalleryView.prototype.onRight = function(e) {
        e.preventDefault();
        this.onHoverRightOff();
        this.tween = true;
        return window.location.href = './#gallery/' + this.getNext();
      };

      GalleryView.prototype.onHoverLeftOn = function(e) {
        if (!this.tween) {
          return this.lthumb.stop().transition({
            scale: 1,
            opacity: 1
          }, 200, "easeOutExpo");
        }
      };

      GalleryView.prototype.onHoverLeftOff = function(e) {
        if (!this.tween) {
          return this.lthumb.stop().transition({
            scale: 0.5,
            opacity: 0,
            delay: 500
          }, 100, "ease-in-out");
        }
      };

      GalleryView.prototype.onHoverRightOn = function(e) {
        if (!this.tween) {
          return this.rthumb.stop().transition({
            scale: 1,
            opacity: 1
          }, 200, "easeOutExpo");
        }
      };

      GalleryView.prototype.onHoverRightOff = function(e) {
        if (!this.tween) {
          return this.rthumb.stop().transition({
            scale: 0.5,
            opacity: 0,
            delay: 500
          }, 100, "ease-in-out");
        }
      };

      GalleryView.prototype.onUp = function(e) {
        e.preventDefault();
        return window.location.href = './#thumbnails/' + this.ids.id;
      };

      GalleryView.prototype.getPrevious = function() {
        var id;

        id = Number(this.ids.id);
        if (id === 0) {
          return this.jsonlength - 1;
        }
        return --id;
      };

      GalleryView.prototype.getNext = function() {
        var id;

        id = Number(this.ids.id);
        if (id === this.jsonlength - 1) {
          return 0;
        }
        return ++id;
      };

      GalleryView.prototype.onResize = function() {
        var hcenter, vcenter;

        GalleryView.__super__.onResize.call(this);
        vcenter = (this.height - 54) / 2;
        hcenter = (this.width - 54) / 2;
        this.gal.css({
          width: this.width,
          height: this.height
        });
        this.right.css({
          right: "20px",
          top: vcenter
        });
        this.left.css({
          left: "20px",
          top: vcenter
        });
        this.lthumb.css({
          left: "80px",
          top: vcenter
        });
        this.rthumb.css({
          right: "80px",
          top: vcenter
        });
        return this.close.css({
          left: hcenter,
          top: "10px"
        });
      };

      GalleryView.prototype.builtThumb = function(id) {
        var obj;

        obj = this.collection[id];
        return "<img title='" + obj.phototitle + "' src='" + obj.thumb + "' />";
      };

      GalleryView.prototype.builtAll = function(img) {
        var _this = this;

        this.content.append(img);
        this.lthumb.append(this.builtThumb(this.getPrevious()));
        this.rthumb.append(this.builtThumb(this.getNext()));
        return this.content.fadeIn('slow', function() {
          return _this.tween = false;
        });
      };

      GalleryView.prototype.removeSelected = function() {
        var _this = this;

        return this.content.fadeOut('slow', function() {
          _this.ptext.show();
          $(_this.content.children()).remove();
          $(_this.lthumb.children()).remove();
          $(_this.rthumb.children()).remove();
          return _this.preload.loadFile(_this.collection[_this.ids.id].original);
        });
      };

      GalleryView.prototype.updatePage = function() {
        this.preload.close();
        if (this.content.children().length > 0) {
          return this.removeSelected();
        } else {
          this.ptext.show();
          return this.preload.loadFile(this.collection[this.ids.id].original);
        }
      };

      return GalleryView;

    })(PageView);
  });

}).call(this);
