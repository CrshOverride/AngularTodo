define(['require','angular','angularApp','routes','faye'], function(require, angular, app, routes, faye) {
	require(['domReady!'], function(document) {
		angular.bootstrap(document.getElementById('todo-app-container'), ['todoApp']);
	});
});
