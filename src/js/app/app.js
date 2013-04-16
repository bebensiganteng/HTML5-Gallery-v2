(function() {
  define(['jquery', 'controllers/AppState', 'controllers/AppRouter', 'models/AssetsLoader', 'views/AppView'], function($, AppState, AppRouter, AssetsLoader, AppView) {
    var App;

    App = (function() {
      function App() {
        var approuter, appstate, appview;

        appstate = new AppState();
        appview = new AppView();
        approuter = new AppRouter();
        approuter.on(AppRouter.EVENT_HASH_CHANGED, appview.onHashChanged);
        approuter.start();
        appview.onAssetsLoaded();
      }

      return App;

    })();
    return $(function() {
      (function() {
        var lastTime, vendors, x;

        lastTime = 0;
        vendors = ["ms", "moz", "webkit", "o"];
        x = 0;
        while (x < vendors.length && !window.requestAnimationFrame) {
          window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
          window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
          ++x;
        }
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(callback, element) {
            var currTime, id, timeToCall;

            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            return id = window.setTimeout(function() {
              return callback(currTime + timeToCall);
            }, timeToCall);
          };
          lastTime = currTime + timeToCall;
          id;
        }
        if (!window.cancelAnimationFrame) {
          return window.cancelAnimationFrame = function(id) {
            return clearTimeout(id);
          };
        }
      })();
      return new App();
    });
  });

}).call(this);
