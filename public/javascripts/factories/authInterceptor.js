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
					return config;
				},
				response: function(response) {
					if(response.status == 401) {
						return $location.path('/');
					}
					return response || $q.when(response);
				}
			};
		}

		return AuthInterceptor;
	}();

	return AuthInterceptor;
});