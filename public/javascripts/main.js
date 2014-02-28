require.config({
	paths: {
		'domReady': '/javascripts/lib/domReady',
		'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.min',
		'ngRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular-route',
		'ngResource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular-resource'
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
		}
	},
	deps: ['./bootstrap']
});