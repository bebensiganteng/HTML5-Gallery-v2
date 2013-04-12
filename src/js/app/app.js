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
      return new App();
    });
  });

}).call(this);
