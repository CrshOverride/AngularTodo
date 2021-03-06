define(['faye'], function() {
	var TodoController;

	TodoController = (function() {
		function TodoController($scope, $http, $window) {
			$scope.createTodo = function() {
				$http.post('/api/todos', { todo: { text: $scope.newTodo } })
					.success(function(res) {
						$scope.newTodo = '';
						$scope.getData();
					})
					.error(function(err) {
						console.log("Error: " + JSON.stringify(err));
					})
			};

			$scope.deleteTodo = function(todo) {
				$http.delete('/api/todos/' + todo)
					.success(function(res) {
						$scope.getData();
					})
					.error(function(err) {
						console.log("Error: " + JSON.stringify(err));
					})
			};

			$scope.getData = function() {
				$http.get('/api/todos')
					.success(function(res) {
						$scope.todos = res;
					})
					.error(function(err) {
						console.log("Error: " + JSON.stringify(err));
					});
			};

			// Wire up Faye to listen for new tasks
			var fayeClient = new Faye.Client('/faye');

			fayeClient.subscribe('/' + $window.sessionStorage.email.replace(/[@\\.]/g, ''), function(message) {
				$scope.$apply($scope.getData);
			});

			$scope.getData();
		}

		return TodoController;
	})();

	return TodoController;
});
