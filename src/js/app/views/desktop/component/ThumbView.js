(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'controllers/AppState', 'libs/tweenlite', 'libs/easepack', 'libs/preloadjs', 'libs/jquery.transit'], function($, _b, _u, PageView, AppState, _t, _e, _p, _tr) {
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
        this.transitionOut = __bind(this.transitionOut, this);
        this.transitionIn = __bind(this.transitionIn, this);
        this.deselected = __bind(this.deselected, this);
        this.selected = __bind(this.selected, this);
        this.setPosition = __bind(this.setPosition, this);
        this.onFileProgress = __bind(this.onFileProgress, this);
        this.onFileLoad = __bind(this.onFileLoad, this);
        this.built = __bind(this.built, this);        _ref = ThumbView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbView.THUMB_UPDATE = 'THUMB_UPDATE';

      ThumbView.THUMB_SELECTED = 'THUMB_SELECTED';

      ThumbView.TWEEN_END = 'TWEEN_END';

      ThumbView.OBJ_WIDTH = 150;

      ThumbView.OBJ_PADDING = 20;

      ThumbView.prototype.image = null;

      ThumbView.prototype.clicked = null;

      ThumbView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      ThumbView.prototype.built = function(obj, id) {
        this.obj = obj;
        this.id = Number(id);
        return "<div id='thumbsnails-" + id + "'>\n    <div class=\"thumbsnails-title\"><p>" + this.obj.phototitle + "</p></div>\n    <a href='./#thumbnails/" + id + "' target='_self' title='" + this.obj.phototitle + "'><img src='" + this.obj.thumb + "' width='150px' height='150px' /></a>\n</div>";
      };

      ThumbView.prototype.onFileLoad = function(e) {
        var _this = this;

        this.jel = $("#thumbsnails-" + this.id);
        return this.jel.on("click", function() {
          return _this.clicked = true;
        });
      };

      ThumbView.prototype.onFileProgress = function() {};

      ThumbView.prototype.setPosition = function(initX, endX) {
        this.clicked = false;
        if (this.image == null) {
          this.onFileLoad();
        }
        this.w = (this.width - ThumbView.OBJ_WIDTH) / 2;
        this.el = document.getElementById('thumbsnails-' + this.id);
        this.title = $("#thumbsnails-" + this.id + " > div");
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
        this.title.transition({
          opacity: 1,
          y: -70,
          delay: 1000
        }, 500, "easeOutBack");
        return TweenLite.to(this, d, {
          onUpdate: this.arbitrary,
          x: this.center,
          ease: Expo.easeInOut,
          onComplete: function() {
            _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END);
            if (_this.clicked) {
              return _this.transitionOut();
            }
          }
        });
      };

      ThumbView.prototype.deselected = function(id) {
        if (this.id !== Number(id)) {
          if (Number(this.title.css("opacity")) === 1) {
            return this.title.transition({
              opacity: 0,
              y: 0
            }, 500, "easeInOutExpo");
          }
        }
      };

      ThumbView.prototype.transitionIn = function() {};

      ThumbView.prototype.transitionOut = function() {
        return window.location.href = "./#gallery/" + this.id;
      };

      ThumbView.prototype.getCenterNormal = function() {
        return Math.abs(this.x - this.w) / this.w;
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
