(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/underscore', 'libs/jquery.keyframes', 'views/PageView', 'views/desktop/component/CloudView', 'controllers/AppState', 'controllers/RainGenerator'], function($, _b, _u, _k, PageView, CloudView, AppState, RainGenerator) {
    var BackgroundView, _ref;

    return BackgroundView = (function(_super) {
      __extends(BackgroundView, _super);

      function BackgroundView() {
        this.animate = __bind(this.animate, this);
        this.playIntro = __bind(this.playIntro, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);        _ref = BackgroundView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BackgroundView.INTRO_COMPLETE = 'INTRO_COMPLETE';

      BackgroundView.prototype.numClouds = 50;

      BackgroundView.prototype.rain = null;

      BackgroundView.prototype.initialize = function() {
        return _.bindAll(this, 'render', 'unrender');
      };

      BackgroundView.prototype.unrender = function() {
        $(this.rainContainer).hide();
        return this.cloudContainer.children().remove();
      };

      BackgroundView.prototype.render = function(ids) {
        var cloud, i, list, _i, _ref1;

        this.ids = ids;
        BackgroundView.__super__.render.call(this, this.ids);
        if (this.rain == null) {
          $(this.el).append("<div id='background'>                    <div id='background-clouds'></div>                    <div id='background-rain'></div>                </div>");
          this.bg = $("#background");
          this.cloudContainer = $("#background-clouds");
          this.rainContainer = $("#background-rain");
          this.rain = new RainGenerator({
            el: this.rainContainer
          });
        } else {
          $(this.rainContainer).show();
        }
        list = [];
        this.clouds = [];
        for (i = _i = 0, _ref1 = this.numClouds; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          cloud = new CloudView();
          list.push(cloud.built(i));
          this.clouds.push(cloud);
        }
        this.cloudContainer.append(list.join(""));
        this.onResize();
        return this.rain.render();
      };

      BackgroundView.prototype.onResize = function() {
        var _this = this;

        BackgroundView.__super__.onResize.call(this);
        $.keyframe.removeHead();
        _.each(this.clouds, function(obj) {
          obj.onResize();
          return obj.addKeyframe();
        });
        $.keyframe.generate();
        _.each(this.clouds, function(obj) {
          return obj.playKeyframe();
        });
        return this.rain.onResize();
      };

      BackgroundView.prototype.playIntro = function() {
        return console.log("BackgroundView.playIntro:", AppState.isIntro);
      };

      BackgroundView.prototype.animate = function() {
        return this.rain.animate();
      };

      return BackgroundView;

    })(PageView);
  });

}).call(this);
