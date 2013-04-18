(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'libs/backbone', 'libs/pixi', 'views/PageView', 'controllers/appState'], function($, _b, _p, PageView, AppState) {
    var RainGenerator, _ref;

    return RainGenerator = (function(_super) {
      __extends(RainGenerator, _super);

      function RainGenerator() {
        this.animate = __bind(this.animate, this);
        this.onResize = __bind(this.onResize, this);
        this.render = __bind(this.render, this);
        this.unrender = __bind(this.unrender, this);
        this.onAssetsLoaded = __bind(this.onAssetsLoaded, this);        _ref = RainGenerator.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RainGenerator.prototype.loader = null;

      RainGenerator.prototype.initialize = function() {
        _.bindAll(this, 'render', 'unrender');
        this.drops = [];
        this.dropFrames = ["drop_1.png", "drop_2.png", "drop_3.png", "drop_4.png"];
        this.stage = new PIXI.Stage(0xffffff);
        this.renderer = PIXI.autoDetectRenderer(800, 600, null, true);
        return $(this.el).append(this.renderer.view);
      };

      RainGenerator.prototype.onAssetsLoaded = function() {
        var drop, frameName, i, m, _i, _results;

        m = (AppState.isDesktop ? 20 : 10);
        _results = [];
        for (i = _i = 0; 0 <= m ? _i <= m : _i >= m; i = 0 <= m ? ++_i : --_i) {
          frameName = this.dropFrames[i % 4];
          drop = PIXI.Sprite.fromFrame(frameName);
          drop.position.x = Math.random() * this.width - 100;
          drop.position.y = Math.random() * -this.height;
          drop.anchor.x = 0.5;
          drop.anchor.y = 0.5;
          drop.scale.y = drop.scale.x = Math.random();
          this.drops.push(drop);
          _results.push(this.stage.addChild(drop));
        }
        return _results;
      };

      RainGenerator.prototype.unrender = function() {
        return console.log("RainGenerator.unrender");
      };

      RainGenerator.prototype.render = function() {
        if (this.loader == null) {
          this.loader = new PIXI.AssetLoader(["images/bg/drops.json"]);
          this.loader.onComplete = this.onAssetsLoaded;
          return this.loader.load();
        }
      };

      RainGenerator.prototype.onResize = function() {
        RainGenerator.__super__.onResize.call(this);
        return this.renderer.resize(this.width, this.height);
      };

      RainGenerator.prototype.animate = function() {
        var drop, i, _i, _len, _ref1;

        _ref1 = this.drops;
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          drop = _ref1[i];
          drop.position.y += drop.scale.x * 5;
          drop.position.x += drop.scale.x;
          drop.rotation = -drop.scale.x * 0.2;
          if (drop.position.y > this.height) {
            drop.position.x = Math.random() * this.width;
            drop.position.y = -20;
          }
        }
        return this.renderer.render(this.stage);
      };

      return RainGenerator;

    })(PageView);
  });

}).call(this);
