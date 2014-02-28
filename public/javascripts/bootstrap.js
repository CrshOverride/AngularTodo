define(['require','angular','app','routes'], function(require, angular, app, routes) {
	require(['domReady!'], function(document) {
		angular.bootstrap(document.getElementById('todo-app-container'), ['todoApp']);
	});
});