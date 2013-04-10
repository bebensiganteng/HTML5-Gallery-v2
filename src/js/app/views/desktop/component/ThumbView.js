(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView'], function($, _b, _u, PageView) {
    var ThumbView, _ref;

    return ThumbView = (function(_super) {
      __extends(ThumbView, _super);

      function ThumbView() {
        this.update = __bind(this.update, this);
        this.setPosition = __bind(this.setPosition, this);
        this.built = __bind(this.built, this);        _ref = ThumbView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ThumbView.prototype.initialize = function() {
        return ThumbView.__super__.initialize.call(this);
      };

      ThumbView.prototype.built = function(obj, id) {
        this.id = Number(id);
        return "<div id='thumbsnails-" + id + "'>\n    <a href='./#gallery/" + id + "' target='_self' title='" + obj.phototitle + "'><img src='" + obj.thumb + "' width='150px' height='150px' /></a>\n</div>";
      };

      ThumbView.prototype.setPosition = function(initX, initY) {
        this.initX = initX;
        this.initY = initY;
        this.el = $("#thumbsnails-" + this.id);
        this.x = this.initX + this.id * 165;
        this.y = this.initY;
        return this.transform(this.el, this.x, this.y);
      };

      ThumbView.prototype.update = function(tx) {
        this.x = tx + this.id * 165;
        return this.transform(this.el, this.x, this.y, 0, 0.5);
      };

      return ThumbView;

    })(PageView);
  });

}).call(this);
