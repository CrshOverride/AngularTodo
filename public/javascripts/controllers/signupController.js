define(function() {
	var SignupController;

	SignupController = (function() {
		function SignupController($scope, $routeParams, $http, $location) {
			$scope.signup = function() {
				$http.post('/add-user', { email: $scope.email, password: $scope.password })
					.success(function(res) {
						$location.path('/');
					})
					.error(function(res) {
						console.log('Error: ' + JSON.stringify(res));
					})
			};
		}

		return SignupController;
	})();

	return SignupController;
});