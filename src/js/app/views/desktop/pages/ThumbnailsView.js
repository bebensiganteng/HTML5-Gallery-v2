(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/jquery.transit', 'libs/preloadjs', 'controllers/AppState', 'views/PageView', 'views/desktop/component/ThumbView', 'text!templates/desktop/thumbnails.html'], function($, _b, _u, _tr, _p, AppState, PageView, ThumbView, template) {
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
        this.snapBack = __bind(this.snapBack, this);
        this.onDown = __bind(this.onDown, this);
        this.onMove = __bind(this.onMove, this);
        this.animate = __bind(this.animate, this);
        this.updatePage = __bind(this.updatePage, this);
        this.onThumbUpdate = __bind(this.onThumbUpdate, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = ThumbnailsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbnailsView.prototype.acc = .2;

      ThumbnailsView.prototype.dec = .1;

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
        this.center = (this.width - 150) / 2;
        this.initY = this.height * 0.6;
        this.endX = (this.jsonlength - 1) * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING);
        return _.each(this.thumb, function(obj) {
          obj.onResize();
          obj.setPosition(_this.center, _this.initY, _this.endX);
          if (obj.dom == null) {
            obj.init();
            obj.on(ThumbView.THUMB_UPDATE, _this.onThumbUpdate);
          }
          return obj.update();
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
            AppState.isPaused = true;
            return this.black.show().transition({
              opacity: 1
            }, 1000, "ease-in-out", function() {
              sel.hideAll(true);
              return setTimeout(function() {
                return window.location.href = "./#gallery/" + sel.id;
              }, 1000);
            });
        }
      };

      ThumbnailsView.prototype.updatePage = function() {
        var _this = this;

        _.each(this.thumb, function(obj) {
          if (obj.selected) {
            obj.selected = false;
            return obj.onHoverOff();
          }
        });
        return this.thumb[this.ids.id].gotoCenter(true);
      };

      ThumbnailsView.prototype.animate = function() {
        var distance,
          _this = this;

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
          if (this.thumb[0].x > this.thumb[0].initX || this.thumb[0].x < this.thumb[0].endX) {
            this.speed = 0;
            distance *= 0.1;
          }
          _.each(this.thumb, function(obj) {
            return obj.update(distance, _this.d0, _this.speed);
          });
          this.x0 = this.x1;
          return this.d1 = this.d0;
        }
      };

      ThumbnailsView.prototype.onMove = function(e) {
        if (this.drag) {
          this.d0 = (e.pageX > this.x1 ? 1 : -1);
          return this.x1 = e.pageX;
        }
      };

      ThumbnailsView.prototype.onDown = function(e) {
        if (!AppState.isIntro && !this.onTween) {
          this.drag = true;
          this.x0 = this.x1 = e.pageX;
          return this.speed = 0;
        }
      };

      ThumbnailsView.prototype.snapBack = function() {
        this.drag = false;
        if (this.thumb[0].x > this.thumb[0].initX) {
          this.thumb[0].gotoCenter(false, 0);
        }
        if (this.thumb[0].x < this.thumb[0].endX) {
          return this.thumb[this.jsonlength - 1].gotoCenter(false, 0);
        }
      };

      ThumbnailsView.prototype.onMouseDown = function(e) {
        return this.onDown(e);
      };

      ThumbnailsView.prototype.onMouseMove = function(e) {
        return this.onMove(e);
      };

      ThumbnailsView.prototype.onMouseUp = function(e) {
        return this.snapBack();
      };

      ThumbnailsView.prototype.onTouchStart = function(e) {
        return this.onDown(e);
      };

      ThumbnailsView.prototype.onTouchMove = function(e) {
        this.onMove(e);
        return this.animate();
      };

      ThumbnailsView.prototype.onTouchEnd = function(e) {
        return this.snapBack();
      };

      return ThumbnailsView;

    })(PageView);
  });

}).call(this);
