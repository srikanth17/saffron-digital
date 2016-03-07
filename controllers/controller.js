var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http) {
	$http.get('sample.json').then(function(response) {
		$scope.wins = response.data; 
		$scope.width = [];
		for(var i=0;i<$scope.wins.length;i++) {
			setWidth(i);
		}
	});
	
	function setWidth(index) {
		if($scope.wins[index].start === "" || $scope.wins[index].end === "")
			return;
		var startArray = $scope.wins[index].start.split('-');
		var endArray = $scope.wins[index].end.split('-');
		var startDate = new Date(startArray[2],startArray[1]-1,startArray[0]);
		var endDate = new Date(endArray[2],endArray[1]-1,endArray[0]);
		var curDate = new Date();
		if(startDate.getTime() >= curDate.getTime())
			$scope.width[index] = 0;
		else if(curDate.getTime() >= endDate.getTime())
			$scope.width[index] = 100;
		else {
			var den = endDate.getTime() - startDate.getTime();
			var num = curDate.getTime() - startDate.getTime();
			$scope.width[index] = (num/den) * 100;
		}	
	}
	
	$scope.getData = function() {
		var temp = JSON.parse(angular.toJson($scope.wins));
		console.log(JSON.stringify(temp,null,2));
	}

    $scope.addWindow = function() {
		$scope.wins.splice(0,0,{
			name: $scope.name,
			start: $scope.start,
			end: $scope.end
		});
		$scope.width.splice(0,0,0);
		$scope.name = "";
		$scope.start = "";
		$scope.end = "";
    };
	
	$scope.removeWindow = function(index) {
		$scope.wins.splice(index,1);	
		$scope.width.splice(index,1);
	};
	
	$scope.changeStartDate = function(index,date) {
		$scope.wins[index].start = date;
		setWidth(index);
	};
	
	$scope.changeEndDate = function(index,date) {
		$scope.wins[index].end = date;
		setWidth(index);	
	};
}]);

myApp.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
		scope: {
            onChangeDate: '&',
			index: '='
        },
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd-mm-yy',
                onSelect: function (date) {
					scope.onChangeDate({
						'index': scope.index,
						'date': date
					});
                }
            });
        }
    };
});