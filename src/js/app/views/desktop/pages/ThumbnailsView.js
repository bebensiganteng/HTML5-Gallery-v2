(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/tweenlite', 'libs/easepack', 'views/PageView', 'views/desktop/component/ThumbView', 'text!templates/desktop/thumbnails.html'], function($, _b, _u, _t, _e, PageView, ThumbView, template) {
    var ThumbnailsView, _ref;

    return ThumbnailsView = (function(_super) {
      __extends(ThumbnailsView, _super);

      function ThumbnailsView() {
        this.onTouchEnd = __bind(this.onTouchEnd, this);
        this.onTouchMove = __bind(this.onTouchMove, this);
        this.onTouchStart = __bind(this.onTouchStart, this);
        this.onMouseUp = __bind(this.onMouseUp, this);
        this.onMouseMove = __bind(this.onMouseMove, this);
        this.onMouseDown = __bind(this.onMouseDown, this);
        this.animate = __bind(this.animate, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);        _ref = ThumbnailsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbnailsView.prototype.dirX = 0;

      ThumbnailsView.prototype.tolerance = 1;

      ThumbnailsView.prototype.initDrag = null;

      ThumbnailsView.prototype.v = null;

      ThumbnailsView.prototype.initialize = function() {
        ThumbnailsView.__super__.initialize.call(this);
        this.json = this.options.json;
        return this.jsonlength = _.size(this.json);
      };

      ThumbnailsView.prototype.render = function(ids) {
        var list,
          _this = this;

        this.ids = ids;
        ThumbnailsView.__super__.render.call(this, this.ids);
        $(this.el).append(template);
        this.th = $("#thumbnails");
        list = ["<div id='thumbnails-group'>"];
        this.thumb = [];
        _.each(this.json, function(obj, id) {
          var thumb;

          thumb = new ThumbView();
          list.push(thumb.built(obj, id));
          return _this.thumb.push(thumb);
        });
        list.push("</div>");
        this.th.append(list.join(''));
        this.tg = $("#thumbnails-group");
        return this.onResize();
      };

      ThumbnailsView.prototype.onResize = function() {
        ThumbnailsView.__super__.onResize.call(this);
        this.th.css({
          width: this.width,
          height: this.height
        });
        this.initX = (this.width - 150) / 2;
        this.initY = (this.height - 150) / 2;
        this.endX = -((this.jsonlength * 165) - (this.width / 2) - (150 / 2));
        this.transform(this.tg, this.initX, this.initY);
        return this.tx = this.initX;
      };

      ThumbnailsView.prototype.animate = function() {
        var d;

        if (this.v) {
          d = Math.abs(this.initDrag - this.v);
          if (d >= 0) {
            this.v += this.dirX * (d * 0.15);
            this.tx += this.dirX * d * this.tolerance;
            this.transform(this.tg, this.tx, this.initY);
          }
        }
        return _.each(this.thumb, function(obj) {
          return obj.animate();
        });
      };

      ThumbnailsView.prototype.onMouseDown = function(e) {
        this.drag = true;
        this.v = this.initDrag = e.pageX;
        return this.tolerance = 1;
      };

      ThumbnailsView.prototype.onMouseMove = function(e) {
        if (this.drag) {
          if (e.pageX > this.initDrag) {
            this.dirX = 1;
          } else {
            this.dirX = -1;
          }
          return this.initDrag = e.pageX;
        }
      };

      ThumbnailsView.prototype.onMouseUp = function(e) {
        return this.drag = false;
      };

      ThumbnailsView.prototype.onTouchStart = function(e) {};

      ThumbnailsView.prototype.onTouchMove = function(e) {};

      ThumbnailsView.prototype.onTouchEnd = function(e) {};

      return ThumbnailsView;

    })(PageView);
  });

}).call(this);
