(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/tweenlite', 'libs/easepack', 'libs/jquery.transit', 'libs/preloadjs', 'controllers/AppState', 'views/PageView', 'views/desktop/component/ThumbView', 'text!templates/desktop/thumbnails.html'], function($, _b, _u, _t, _e, _tr, _p, AppState, PageView, ThumbView, template) {
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
        this.updatePage = __bind(this.updatePage, this);
        this.onThumbUpdate = __bind(this.onThumbUpdate, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = ThumbnailsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbnailsView.prototype.acc = .5;

      ThumbnailsView.prototype.dec = .2;

      ThumbnailsView.prototype.outOfBounds = null;

      ThumbnailsView.prototype.onTween = true;

      ThumbnailsView.prototype.initialize = function() {
        ThumbnailsView.__super__.initialize.call(this);
        this.json = this.options.json;
        return this.jsonlength = _.size(this.json);
      };

      ThumbnailsView.prototype.unrender = function() {
        return this.th.remove();
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
        list.push("<div id='thumbnails-black'></div>");
        list.push("</div>");
        this.th.append(list.join(''));
        this.drag = false;
        this.d0 = this.d1 = 0;
        this.x0 = this.x1 = 0;
        this.speed = 0;
        this.outOfBounds = false;
        this.black = $("#thumbnails-black");
        this.black.hide();
        this.onResize();
        return this.updatePage();
      };

      ThumbnailsView.prototype.onResize = function() {
        var _this = this;

        ThumbnailsView.__super__.onResize.call(this);
        this.th.css({
          width: this.width,
          height: this.height
        });
        this.black.css({
          width: this.width,
          height: this.height
        });
        this.initX = (this.width - 150) / 2;
        this.initY = this.height * 0.6;
        this.endX = (this.jsonlength - 1) * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING);
        return _.each(this.thumb, function(obj) {
          if (obj.initX == null) {
            obj.onResize();
            obj.setPosition(_this.initX, _this.endX);
            obj.on(ThumbView.THUMB_UPDATE, _this.onThumbUpdate);
          }
          return obj.update(_this.initY);
        });
      };

      ThumbnailsView.prototype.onThumbUpdate = function(e, sel) {
        var _this = this;

        switch (e) {
          case ThumbView.THUMB_SELECTED:
            this.onTween = true;
            return _.each(this.thumb, function(obj) {
              if (obj.id !== sel.id) {
                return obj.follow(sel.id, sel.x);
              }
            });
          case ThumbView.TWEEN_END:
            this.onTween = false;
            if (AppState.isIntro) {
              return AppState.isIntro = false;
            }
            break;
          case ThumbView.THUMB_CLICKED:
            this.black.show().transition({
              opacity: 1
            }, 1000, "ease-in-out");
            return sel.id;
        }
      };

      ThumbnailsView.prototype.updatePage = function() {
        var _this = this;

        _.each(this.thumb, function(obj) {
          return obj.deselected(_this.ids.id);
        });
        return this.thumb[this.ids.id].selected(.8);
      };

      ThumbnailsView.prototype.animate = function() {
        var distance;

        if (this.x0) {
          distance = Math.abs(this.x1 - this.x0);
          if (distance > 0) {
            this.speed += this.acc;
          }
          if (distance === 0) {
            this.speed -= this.dec;
          }
          if (this.speed < 0 || this.d1 !== this.d0) {
            this.speed = 0;
          }
          this.x0 = this.x1;
          return this.d1 = this.d0;
        }
      };

      ThumbnailsView.prototype.onMouseDown = function(e) {
        if (!AppState.isIntro && !this.onTween) {
          this.drag = true;
          this.x0 = this.x1 = e.pageX;
          return this.speed = 0;
        }
      };

      ThumbnailsView.prototype.onMouseMove = function(e) {
        if (this.drag) {
          this.d0 = (e.pageX > this.x1 ? 1 : -1);
          return this.x1 = e.pageX;
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
