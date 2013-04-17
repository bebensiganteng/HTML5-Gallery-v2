(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'controllers/AppState', 'libs/tweenlite', 'libs/easepack', 'libs/preloadjs', 'libs/jquery.transit'], function($, _b, _u, PageView, AppState, _t, _e, _p, _tr) {
    var ThumbView, _ref;

    return ThumbView = (function(_super) {
      __extends(ThumbView, _super);

      function ThumbView() {
        this.follow = __bind(this.follow, this);
        this.gotoCenter = __bind(this.gotoCenter, this);
        this.getZ = __bind(this.getZ, this);
        this.getY = __bind(this.getY, this);
        this.getScale = __bind(this.getScale, this);
        this.getCenterNormal = __bind(this.getCenterNormal, this);
        this.update = __bind(this.update, this);
        this.hideAll = __bind(this.hideAll, this);
        this.onHoverOff = __bind(this.onHoverOff, this);
        this.onHoverOn = __bind(this.onHoverOn, this);
        this.setPosition = __bind(this.setPosition, this);
        this.onFileLoad = __bind(this.onFileLoad, this);
        this.init = __bind(this.init, this);
        this.built = __bind(this.built, this);        _ref = ThumbView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbView.THUMB_UPDATE = 'THUMB_UPDATE';

      ThumbView.THUMB_SELECTED = 'THUMB_SELECTED';

      ThumbView.THUMB_CLICKED = 'THUMB_CLICKED';

      ThumbView.TWEEN_END = 'TWEEN_END';

      ThumbView.OBJ_WIDTH = 150;

      ThumbView.OBJ_PADDING = 20;

      ThumbView.prototype.clicked = false;

      ThumbView.prototype.selected = false;

      ThumbView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      ThumbView.prototype.built = function(obj, id) {
        this.obj = obj;
        this.id = Number(id);
        return "<div id='thumbsnails-" + id + "'>\n    <div class=\"thumbsnails-title\"><p>" + this.obj.phototitle + "</p></div>\n    <div class=\"thumbnails-arrow\"></div>\n    <a href='./#thumbnails/" + id + "' target='_self' title='" + this.obj.phototitle + "'></a>\n    <div class='thumbsnails-selected'></div>\n</div>";
      };

      ThumbView.prototype.init = function() {
        var name;

        name = "thumbsnails-" + this.id;
        this.dom = document.getElementById(name);
        this.thumb = $("#" + name);
        this.href = $("a", this.thumb);
        this.title = $(".thumbsnails-title", this.thumb);
        this.bg = $(".thumbsnails-selected", this.thumb);
        this.arrow = $(".thumbnails-arrow", this.thumb);
        this.preload = new createjs.LoadQueue(false);
        this.preload.addEventListener("fileload", this.onFileLoad);
        this.preload.setMaxConnections(1);
        return this.preload.loadFile(this.obj.thumb);
      };

      ThumbView.prototype.onFileLoad = function(e) {
        var _this = this;

        this.href.append(e.result);
        this.href.hover(this.onHoverOn, this.onHoverOff);
        return this.href.on("click", function(e) {
          e.preventDefault;
          _this.clicked = true;
          if (_this.selected) {
            return _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, _this);
          } else {
            return window.location.href = "./#thumbnails/" + _this.id;
          }
        });
      };

      ThumbView.prototype.setPosition = function(center, y, endX) {
        this.center = center;
        this.y = y;
        this.initX = this.center + this.id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING);
        this.endX = this.initX - endX;
        this.halfWidth = (this.width - ThumbView.OBJ_WIDTH) / 2;
        return this.x = this.initX;
      };

      ThumbView.prototype.onHoverOn = function(e) {
        this.title.stop().transition({
          opacity: 1,
          y: -130
        }, 500, "easeOutBack");
        this.arrow.stop().transition({
          y: -80,
          opacity: 1
        }, 500, "easeOutBack");
        return this.bg.stop().transition({
          scale: 1,
          opacity: 1
        }, 500, "easeOutExpo");
      };

      ThumbView.prototype.onHoverOff = function(e) {
        if (!this.selected) {
          return this.hideAll();
        }
      };

      ThumbView.prototype.hideAll = function(bol) {
        var s;

        if (bol == null) {
          bol = false;
        }
        s = (bol ? 200 : 500);
        this.title.stop().transition({
          opacity: 0,
          y: 0
        }, s, "ease-in-out");
        this.arrow.stop().transition({
          y: 0,
          opacity: 0
        }, s, "ease-in-out");
        this.bg.stop().transition({
          scale: .5,
          opacity: 0
        }, s, "ease-in-out");
        if (bol) {
          return this.href.stop().transition({
            scale: .5,
            opacity: 0,
            delay: 500
          }, s, "ease-in-out");
        }
      };

      ThumbView.prototype.update = function(distance, direction, speed) {
        if (distance == null) {
          distance = 0;
        }
        if (direction == null) {
          direction = 0;
        }
        if (speed == null) {
          speed = 0;
        }
        this.x += direction * (distance + speed);
        return this.transform(this.dom, this.x, this.getY(), this.getZ());
      };

      ThumbView.prototype.getCenterNormal = function() {
        return Math.abs(this.x - this.halfWidth) / this.halfWidth;
      };

      ThumbView.prototype.getScale = function() {
        return this.getCenterNormal() * 0.3;
      };

      ThumbView.prototype.getY = function() {
        return this.y + Math.cos(this.getCenterNormal() * 1.5) * -80;
      };

      ThumbView.prototype.getZ = function() {
        return this.getCenterNormal() * -100;
      };

      ThumbView.prototype.gotoCenter = function(selected, e) {
        var d,
          _this = this;

        this.selected = selected != null ? selected : false;
        if (e == null) {
          e = 1;
        }
        if (e === 1) {
          e = Expo.easeInOut;
          d = 1.2;
        } else {
          e = Back.easeOut;
          d = 0.4;
        }
        return TweenLite.to(this, d, {
          x: this.center,
          ease: e,
          onUpdate: function() {
            _this.update();
            return _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_SELECTED, _this);
          },
          onComplete: function() {
            if (_this.selected) {
              _this.onHoverOn();
            }
            _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END);
            if (_this.clicked) {
              return _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, _this);
            }
          }
        });
      };

      ThumbView.prototype.follow = function(id, posX) {
        this.x = posX + (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING) * (this.id - id);
        return this.update();
      };

      return ThumbView;

    })(PageView);
  });

}).call(this);
