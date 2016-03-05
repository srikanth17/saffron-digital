var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http) {
	$http.get('sample.json').then(function(response) {
		$scope.wins = response.data; 
	});

    $scope.addWindow = function() {
        
    };
	
	$scope.removeWindow = function(id) {
		
	};
}]);