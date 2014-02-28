define(function(){
	var AuthInterceptor;

	AuthInterceptor = function(){
		function AuthInterceptor($q, $window, $location) {
			return {
				request: function(config) {
					config.headers = config.headers || {};
					if($window.sessionStorage.token) {
						config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
					}
					return config || $q.when(config);
				},
				response: function(response) {
					if(response.status == 401) {
						return $location.path('/');
					}
					return response || $q.when(response);
				},
				responseError: function(rejection) {
					if(rejection.status == 401 && rejection.config.url.indexOf('/api') === 0) {
						$location.path('/');
					}
					return $q.reject(rejection)
				}
			};
		}

		return AuthInterceptor;
	}();

	return AuthInterceptor;
});