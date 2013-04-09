(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['libs/backbone', 'libs/preloadjs'], function(_b, _p) {
    var AssetsLoader;

    return AssetsLoader = (function() {
      AssetsLoader.EVENT_LOADED = 'EVENT_LOADED';

      function AssetsLoader() {
        this.load = __bind(this.load, this);
        this.handleFileError = __bind(this.handleFileError, this);
        this.handleOverallProgress = __bind(this.handleOverallProgress, this);
        this.handleFileLoad = __bind(this.handleFileLoad, this);
        this.start = __bind(this.start, this);        _.extend(this, Backbone.Events);
      }

      AssetsLoader.prototype.start = function(manifest) {
        var _results;

        this.manifest = manifest;
        this.preload = new createjs.LoadQueue(true);
        this.preload.addEventListener("fileload", this.handleFileLoad);
        this.preload.addEventListener("progress", this.handleOverallProgress);
        this.preload.addEventListener("error", this.handleFileError);
        this.preload.setMaxConnections(5);
        _results = [];
        while (this.manifest.length > 0) {
          _results.push(this.load());
        }
        return _results;
      };

      AssetsLoader.prototype.handleFileLoad = function(event) {
        if (this.preload._currentLoads.length === 0) {
          return this.trigger(AssetsLoader.EVENT_LOADED);
        }
      };

      AssetsLoader.prototype.handleOverallProgress = function(event) {
        return console.log("handleOverallProgress:", this.preload.progress);
      };

      AssetsLoader.prototype.handleFileError = function(event) {
        return alert("AssetsLoader.handleFileError");
      };

      AssetsLoader.prototype.load = function() {
        return this.preload.loadFile(this.manifest.shift());
      };

      return AssetsLoader;

    })();
  });

}).call(this);
