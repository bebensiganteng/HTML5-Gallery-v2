(function() {
  requirejs.config({
    waitSeconds: 0,
    baseUrl: '.',
    paths: {
      libs: 'js/libs',
      app: 'js/app',
      models: 'js/app/models',
      views: 'js/app/views',
      controller: 'js/app/controller'
    },
    map: {
      '*': {
        'text': 'libs/text',
        'libs/jquery.transit': 'libs/jquery.transit.min',
        'libs/backbone': 'libs/backbone-min',
        'libs/underscore': 'libs/underscore-min',
        'libs/stately': 'libs/Stately'
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

  requirejs(['app/app']);

}).call(this);
