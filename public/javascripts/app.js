define(['routes', 
	'factories/authInterceptor',
	'controllers/loginController', 
	'controllers/signupController',
	'controllers/todoController', 
	'angular', 
	'ngResource', 
	'ngRoute'], 
	function(Routes, AuthInterceptor, LoginController, SignupController, TodoController) {
		var app;

		app = angular.module('todoApp', ['ngResource', 'ngRoute']);

		// Configure our routes
		app.config(['$routeProvider', '$locationProvider', Routes]);

		// Configure our factories
		app.factory('authInterceptor', ['$q', '$window', '$location', AuthInterceptor]);

		// Configure our Authentication Interceptor to properly redirect on 401
		app.config(['$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('authInterceptor');
		}]);

		// Add our controllers to the module
		app.controller('loginController', ['$scope', '$location', '$http', '$window', LoginController]);
		app.controller('signupController', ['$scope', '$routeParams', '$http', '$location', SignupController]);
		app.controller('todoController', ['$scope', '$http', TodoController]);

		return app;
	}
);