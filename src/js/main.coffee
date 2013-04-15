requirejs.config
	
	waitSeconds: 0
	baseUrl: '.'

	paths:
		libs: 'js/libs'
		app: 'js/app'
		utils: 'js/app/utils'
		models: 'js/app/models'
		views: 'js/app/views'
		controllers: 'js/app/controllers'

	map:
		'*':
			'text': 'libs/text'
			'json': 'libs/json'
			'libs/pixi': 'libs/pixi'
			'libs/backbone': 'libs/backbone-min'
			'libs/underscore': 'libs/underscore-min'
			'libs/jquery.transit': 'libs/jquery.transit'
			'libs/stately': 'libs/Stately'
			'libs/preloadjs': 'libs/preloadjs-0.3.0.min'
			'libs/jquery.lazyload': 'libs/jquery.lazyload.min'
			'libs/tweenlite': 'libs/TweenLite.min'
			'libs/easepack': 'libs/EasePack.min'
			'libs/jquery.keyframes': 'libs/jquery.keyframes'

	shim:
		'libs/jquery.keyframes': deps: ['jquery']
		'libs/jquery.transit': deps: ['jquery']
		'libs/jquery.lazyload': deps: ['jquery']
		'libs/tweenlite': deps: ['jquery']
		'libs/backbone':
			deps: ['libs/underscore', 'jquery']
			exports: 'Backbone'
		'libs/underscore': exports: '_'

requirejs ['app/app', 'libs/underscore']