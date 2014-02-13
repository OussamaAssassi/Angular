var customerManager = angular.module('customerController',[]);

customerManager.factory('customerFactory',function($http){

	return {
	      getCustomers: function(callback) {
	          $http.get('customers.json').success(callback);
	      }
	  };
});


customerManager.controller('customerCtrl', function($scope,customerFactory){

	customerFactory.getCustomers(function(results) {
	  $scope.customers = results;
	});

   
	$scope.addCustomer = function(){
	$scope.customers.push({firstname:$scope.newCustomer.firstname, lastname:$scope.newCustomer.lastname, city:$scope.newCustomer.city});
	}
});