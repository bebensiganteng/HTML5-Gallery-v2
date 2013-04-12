(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'views/PageView', 'controllers/AppState', 'libs/jquery.keyframes'], function($, _b, _u, PageView, AppState, _k) {
    var CloudView, _ref;

    return CloudView = (function(_super) {
      __extends(CloudView, _super);

      function CloudView() {
        this.playIntro = __bind(this.playIntro, this);
        this.setPositions = __bind(this.setPositions, this);
        this.addKeyframe = __bind(this.addKeyframe, this);
        this.built = __bind(this.built, this);        _ref = CloudView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CloudView.prototype.built = function(id) {
        this.id = Number(id);
        return "<div id=\"cloud-" + this.id + "\">\n    <img src=\"images/bg/cloud.png\" width=\"256\" height=\"256\"></div>\n</div>";
      };

      CloudView.prototype.addKeyframe = function() {
        var browser, r, x, y, z;

        browser = $.keyframe.browserCode();
        x = Math.random() * this.width - 100;
        y = Math.random() * (this.height * 0.2) - 150;
        z = -500 * Math.random();
        r = Math.random() * 360;
        $.fn.addKeyframe([
          {
            name: "cloudkey-" + this.id,
            '0%': "opacity: 0;\n" + browser + "transform: translate3d(" + x + "px, " + y + "px, " + z + "px );",
            '10%': "opacity: 1;",
            '90%': "opacity: 1;",
            '100%': "opacity: 0;\n" + browser + "transform:translate3d(" + x + "px, " + y + "px, " + (z + 200) + "px );"
          }
        ]);
        return this.keyframe = true;
      };

      CloudView.prototype.setPositions = function() {
        $.keyframe.removeHead();
        this.addKeyframe();
        return $('#cloud-' + this.id).playKeyframe({
          name: "cloudkey-" + this.id,
          duration: Math.random() * 30000 + 10000,
          timingFunction: 'linear',
          delay: 0,
          repeat: 'infinite'
        });
      };

      CloudView.prototype.playIntro = function() {};

      return CloudView;

    })(PageView);
  });

}).call(this);
