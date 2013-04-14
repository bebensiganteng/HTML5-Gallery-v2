(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'controllers/AppState', 'libs/tweenlite', 'libs/easepack'], function($, _b, _u, PageView, AppState, _t, _e) {
    var ThumbView, _ref;

    return ThumbView = (function(_super) {
      __extends(ThumbView, _super);

      function ThumbView() {
        this.update = __bind(this.update, this);
        this.follow = __bind(this.follow, this);
        this.arbitrary = __bind(this.arbitrary, this);
        this.getZ = __bind(this.getZ, this);
        this.getY = __bind(this.getY, this);
        this.getScale = __bind(this.getScale, this);
        this.getCenterNormal = __bind(this.getCenterNormal, this);
        this.selected = __bind(this.selected, this);
        this.setPosition = __bind(this.setPosition, this);
        this.built = __bind(this.built, this);        _ref = ThumbView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbView.THUMB_UPDATE = 'THUMB_UPDATE';

      ThumbView.THUMB_SELECTED = 'THUMB_SELECTED';

      ThumbView.TWEEN_END = 'TWEEN_END';

      ThumbView.OBJ_WIDTH = 150;

      ThumbView.OBJ_PADDING = 20;

      ThumbView.prototype.initialize = function() {
        return ThumbView.__super__.initialize.call(this);
      };

      ThumbView.prototype.built = function(obj, id) {
        this.obj = obj;
        this.id = Number(id);
        return "<div id='thumbsnails-" + id + "'>\n    <a href='./#thumbnails/" + id + "' target='_self' title='" + this.obj.phototitle + "'><img src='" + this.obj.thumb + "' width='150px' height='150px' /></a>\n</div>";
      };

      ThumbView.prototype.setPosition = function(initX, endX) {
        this.w = (this.width - ThumbView.OBJ_WIDTH) / 2;
        this.el = document.getElementById('thumbsnails-' + this.id);
        this.center = initX;
        this.initX = initX + this.id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING);
        this.endX = this.initX - endX;
        return this.x = (AppState.isIntro ? this.endX : this.initX);
      };

      ThumbView.prototype.selected = function(d) {
        var _this = this;

        if (d == null) {
          d = 1.2;
        }
        return TweenLite.to(this, d, {
          onUpdate: this.arbitrary,
          x: this.center,
          ease: Expo.easeInOut,
          onComplete: function() {
            return _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END);
          }
        });
      };

      ThumbView.prototype.getCenterNormal = function() {
        return Math.abs(this.x - this.w) / this.w;
      };

      ThumbView.prototype.getScale = function() {
        return 1 - this.getCenterNormal() * 0.3;
      };

      ThumbView.prototype.getY = function() {
        return this.y;
      };

      ThumbView.prototype.getZ = function() {
        return this.getCenterNormal() * -100;
      };

      ThumbView.prototype.arbitrary = function() {
        this.transform(this.el, this.x, this.getY(), this.getZ(), 0, 1);
        return this.trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_SELECTED, this);
      };

      ThumbView.prototype.follow = function(id, posX) {
        this.x = posX + (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING) * (this.id - id);
        return this.transform(this.el, this.x, this.getY(), this.getZ(), 0, 1);
      };

      ThumbView.prototype.update = function(y, distance, direction, speed) {
        this.y = y;
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
        return this.transform(this.el, this.x, this.getY(), this.getZ(), 0, 1);
      };

      return ThumbView;

    })(PageView);
  });

}).call(this);
