(function() {
  requirejs.config({
    waitSeconds: 0,
    baseUrl: '.',
    paths: {
      libs: 'js/libs',
      app: 'js/app',
      models: 'js/app/models',
      views: 'js/app/views',
      controllers: 'js/app/controllers'
    },
    map: {
      '*': {
        'text': 'libs/text',
        'json': 'libs/json',
        'libs/backbone': 'libs/backbone-min',
        'libs/underscore': 'libs/underscore-min',
        'libs/jquery.transit': 'libs/jquery.transit.min',
        'libs/stately': 'libs/Stately',
        'libs/preloadjs': 'libs/preloadjs-0.3.0.min'
      }
    },
    shim: {
      'libs/jquery.transit': {
        deps: ['jquery']
      },
      'libs/backbone': {
        deps: ['libs/underscore', 'jquery'],
        exports: 'Backbone'
      },
      'libs/underscore': {
        exports: '_'
      }
    }
  });

  requirejs(['app/app', 'libs/underscore']);

}).call(this);
