define(function() {
	var TodoController;

	TodoController = (function() {
		function TodoController($scope, $http) {
			$scope.createTodo = function() {
				$http.post('/api/todos', { item: $scope.newTodo })
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

			$scope.getData();
		}

		return TodoController;
	})();

	return TodoController;
});
