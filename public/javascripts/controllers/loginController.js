define(function() {
	var LoginController;

	LoginController = (function() {
		function LoginController($scope, $location, $http, $window) {
			$scope.authenticate = function() {
				$http.post('/authenticate', { email: $scope.email, password: $scope.password })
					.success(function(res) {
						if(res.success) {
							$window.sessionStorage.email = $scope.email;
							$window.sessionStorage.token = res.token;
							$location.path('/todo');
						} else {
							$scope.message = res.message;
						}
					})
					.error(function(err) {
						$scope.message = err.message.message;
					});
			}
		}

		return LoginController;
	})();

	return LoginController;
});
