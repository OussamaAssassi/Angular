var customerManager = angular.module('customerManagerApp',[
	'ngRoute',
	'customerController'
]);

customerManager.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/',{
			templateUrl:'Partials/view1.html',
			controller:'customerCtrl'
		}).
		otherwise({
			redirecTo:'/'
		});

	}]);