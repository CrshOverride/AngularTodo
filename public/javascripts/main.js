require.config({
	paths: {
		'domReady': '/javascripts/lib/domReady',
		'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.min',
		'ngRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular-route',
		'ngResource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular-resource',
		'faye': '/faye/client'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'ngRoute': {
			deps: ['angular'],
			exports: 'ngRoute'
		},
		'ngResource': {
			deps: ['angular'],
			exports: 'ngResource'
		},
		'faye': {
			exports: 'faye'
		}
	},
	deps: ['./bootstrap']
});
