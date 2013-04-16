(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'controllers/AppState', 'libs/tweenlite', 'libs/easepack', 'libs/preloadjs', 'libs/jquery.transit'], function($, _b, _u, PageView, AppState, _t, _e, _p, _tr) {
    var ThumbView, _ref;

    return ThumbView = (function(_super) {
      __extends(ThumbView, _super);

      function ThumbView() {
        this.onResize = __bind(this.onResize, this);
        this.update = __bind(this.update, this);
        this.follow = __bind(this.follow, this);
        this.arbitrary = __bind(this.arbitrary, this);
        this.getZ = __bind(this.getZ, this);
        this.getY = __bind(this.getY, this);
        this.getScale = __bind(this.getScale, this);
        this.getCenterNormal = __bind(this.getCenterNormal, this);
        this.transitionOut = __bind(this.transitionOut, this);
        this.transitionIn = __bind(this.transitionIn, this);
        this.animateOut = __bind(this.animateOut, this);
        this.animateIn = __bind(this.animateIn, this);
        this.deselected = __bind(this.deselected, this);
        this.selected = __bind(this.selected, this);
        this.setPosition = __bind(this.setPosition, this);
        this.onHoverOff = __bind(this.onHoverOff, this);
        this.onHoverOn = __bind(this.onHoverOn, this);
        this.onFileLoad = __bind(this.onFileLoad, this);
        this.built = __bind(this.built, this);        _ref = ThumbView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbView.THUMB_UPDATE = 'THUMB_UPDATE';

      ThumbView.THUMB_SELECTED = 'THUMB_SELECTED';

      ThumbView.THUMB_CLICKED = 'THUMB_CLICKED';

      ThumbView.TWEEN_END = 'TWEEN_END';

      ThumbView.OBJ_WIDTH = 150;

      ThumbView.OBJ_PADDING = 20;

      ThumbView.prototype.image = null;

      ThumbView.prototype.clicked = null;

      ThumbView.prototype.tagged = null;

      ThumbView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      ThumbView.prototype.built = function(obj, id) {
        this.obj = obj;
        this.id = Number(id);
        return "<div id='thumbsnails-" + id + "'>\n    <div class=\"thumbsnails-title\"><p>" + this.obj.phototitle + "</p></div>\n    <div class=\"thumbnails-arrow\"></div>\n    <a href='./#thumbnails/" + id + "' target='_self' title='" + this.obj.phototitle + "'></a>\n    <div id='thumbsnails-bg' class='thumbsnails-selected'></div>\n</div>";
      };

      ThumbView.prototype.onFileLoad = function(e) {
        var _this = this;

        $("a", this.thumb).append(e.result).transition({
          opacity: 1
        }, 500, "ease-in-out");
        this.thumb.hover(this.onHoverOn, this.onHoverOff);
        return this.thumb.on("click", function(e) {
          e.preventDefault();
          _this.clicked = true;
          if (Number(_this.title.css("opacity"))) {
            return _this.transitionOut();
          } else {
            return window.location.href = "./#thumbnails/" + _this.id;
          }
        });
      };

      ThumbView.prototype.onHoverOn = function(e) {
        if (!this.tagged) {
          return this.animateIn(false, 0);
        }
      };

      ThumbView.prototype.onHoverOff = function(e) {
        if (!this.tagged) {
          return this.animateOut(500, 0);
        }
      };

      ThumbView.prototype.setPosition = function(initX, endX) {
        this.clicked = false;
        this.el = document.getElementById('thumbsnails-' + this.id);
        this.thumb = $("#thumbsnails-" + this.id);
        this.title = $(".thumbsnails-title", this.thumb);
        this.bg = $("#thumbsnails-bg", this.thumb);
        this.arrow = $(".thumbnails-arrow", this.thumb);
        this.center = initX;
        this.initX = initX + this.id * (ThumbView.OBJ_WIDTH + ThumbView.OBJ_PADDING);
        this.endX = this.initX - endX;
        if (this.image == null) {
          this.preload = new createjs.LoadQueue(false);
          this.preload.addEventListener("fileload", this.onFileLoad);
          this.preload.setMaxConnections(1);
          this.preload.loadFile(this.obj.thumb);
        }
        return this.x = (AppState.isIntro ? this.endX : this.initX);
      };

      ThumbView.prototype.selected = function(d, bol, tagged) {
        var _this = this;

        if (d == null) {
          d = 1.2;
        }
        if (bol == null) {
          bol = true;
        }
        if (tagged == null) {
          tagged = true;
        }
        this.tagged = tagged;
        if (bol) {
          this.animateIn(bol);
        }
        return TweenLite.to(this, d, {
          onUpdate: this.arbitrary,
          x: this.center,
          ease: Back.easeOut,
          onComplete: function() {
            if (!bol) {
              return _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END);
            }
          }
        });
      };

      ThumbView.prototype.deselected = function(id) {
        if (this.id !== Number(id)) {
          if (Number(this.title.css("opacity")) === 1) {
            this.animateOut();
          }
          return this.tagged = false;
        }
      };

      ThumbView.prototype.animateIn = function(bol, d) {
        var _this = this;

        if (bol == null) {
          bol = true;
        }
        if (d == null) {
          d = 1500;
        }
        this.title.stop().transition({
          opacity: 1,
          y: -130,
          delay: d + 100
        }, 500, "easeOutBack", function() {
          if (bol) {
            _this.trigger(ThumbView.THUMB_UPDATE, ThumbView.TWEEN_END);
          }
          if (_this.clicked) {
            return _this.transitionOut();
          }
        });
        this.bg.stop().transition({
          scale: 1,
          opacity: 1,
          delay: d
        }, 500, "easeOutBack");
        return this.arrow.stop().transition({
          y: -80,
          opacity: 1,
          delay: d
        }, 500, "easeOutBack");
      };

      ThumbView.prototype.animateOut = function(dur, d) {
        if (dur == null) {
          dur = 500;
        }
        if (d == null) {
          d = 1000;
        }
        this.title.stop().transition({
          opacity: 0,
          y: 0,
          delay: d
        }, dur, "ease-in-out");
        this.arrow.stop().transition({
          y: 0,
          opacity: 0,
          delay: d
        }, dur, "ease-in-out");
        return this.bg.stop().transition({
          scale: 0,
          opacity: 1,
          delay: d
        }, dur, "ease-in-out");
      };

      ThumbView.prototype.transitionIn = function() {};

      ThumbView.prototype.transitionOut = function() {
        this.trigger(ThumbView.THUMB_UPDATE, ThumbView.THUMB_CLICKED, this);
        return this.thumb.transition({
          opacity: 0,
          delay: 2000
        }, 500, "ease-in-out");
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
        if (!this.clicked) {
          this.x += direction * (distance + speed);
          return this.transform(this.el, this.x, this.getY(), this.getZ(), 0, 1);
        }
      };

      ThumbView.prototype.onResize = function() {
        ThumbView.__super__.onResize.call(this);
        return this.halfWidth = (this.width - ThumbView.OBJ_WIDTH) / 2;
      };

      return ThumbView;

    })(PageView);
  });

}).call(this);
