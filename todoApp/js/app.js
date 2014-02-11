var app = angular.module('todo',[]);

app.directive('ngBlur', function(){
	return function(scope, elem, attrs){
		elem.bind('blur',function(){
			scope.$apply(attrs.ngBlur)
		})
	}
});

app.controller('todoCtrl', function($scope, $filter, $http, $location){
	$scope.todos = [];
	$scope.placeholder ="Chargement...";
	$scope.status = {};

	$http.get('todos.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = 'Ajouter une nouvelle tâche'
	});

	$scope.$watch('todos', function(){
		$scope.remaining = $filter('filter')($scope.todos,{completed:false}).length;

		$scope.allchecked = !$scope.remaining;
	}, true)

	if($location.path() == ''){ $location.path('/')}
	$scope.location = $location;
	$scope.$watch('location.path()', function(path){
		$scope.status = 
			(path == '/active') ? {completed : false} : 
			(path == '/done') ? {completed : true} : 
			null;
	});

	$scope.removeTodo = function(index){
		$scope.todos.splice(index,1);
	}

	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newtodo,
			completed : false
		});

		$scope.newtodo = '';
	}

	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
			todo.completed = allchecked;
		})
	}

	$scope.editTodo = function(todo){
		todo.editing =  false;
	}
});