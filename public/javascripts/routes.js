define(function() {
	var Routes;

	Routes = (function() {
		function Routes($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', { controller: 'loginController', templateUrl: '/templates/login.html' })
				.when('/signup', { controller: 'signupController', templateUrl: '/templates/signup.html' })
				.when('/todo', { controller: 'todoController', templateUrl: '/templates/todo.html' })
				.otherwise({ redirectTo: '/' });

			$locationProvider.html5Mode(true);
		}

		return Routes;
	})();

	return Routes;
});