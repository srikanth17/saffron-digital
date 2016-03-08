var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http) {
	$http.get('sample.json').then(function(response) {
		$scope.wins = response.data; 
		$scope.width = [];
		availableColors = ['progress-bar progress-bar-success','progress-bar progress-bar-info','progress-bar progress-bar-warning','progress-bar progress-bar-danger'];
		startIndex = Math.floor(Math.random() * availableColors.length);
		$scope.colors = [];
		$scope.maxWidth = 0;
		$scope.maxIndex = 0;
		setAllWidth();
	});
	
	function getColorIndex(index) {
		return index % availableColors.length;
	}
	
	function setAllWidth() {
		for(var i=0;i<$scope.wins.length;i++) {
			setWidth(i);
			$scope.colors[i] = availableColors[getColorIndex(startIndex++)];
		}
	}
	
	function setWidth(index) {
		if($scope.wins[index].start === "" || $scope.wins[index].end === "") {
			$scope.width[index] = 0;
			return;
		}
		var startArray = $scope.wins[index].start.split('-');
		var endArray = $scope.wins[index].end.split('-');
		var startDate = new Date(startArray[2],startArray[1]-1,startArray[0]);
		var endDate = new Date(endArray[2],endArray[1]-1,endArray[0]);
		$scope.width[index] = endDate.getTime() - startDate.getTime();
		if($scope.maxWidth < $scope.width[index]) {
			$scope.maxWidth = $scope.width[index];
			$scope.maxIndex = index;
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
		$scope.colors.splice(0,0,availableColors[getColorIndex(startIndex++)]);
		$scope.name = "";
		$scope.start = "";
		$scope.end = "";
    };
	
	$scope.removeWindow = function(index) {
		$scope.wins.splice(index,1);	
		$scope.width.splice(index,1);
		$scope.colors.splice(index,1);
		$scope.maxWidth = 0;
		$scope.maxIndex = 0;
		for(var i=0;i<$scope.width.length;i++) {
			setWidth(i);
		}
		$scope.$apply();
	};
	
	$scope.changeStartDate = function(index,date) {
		$scope.wins[index].start = date;
		$scope.maxWidth = 0;
		$scope.maxIndex = 0;
		for(var i=0;i<$scope.width.length;i++) {
			setWidth(i);
		}
		$scope.$apply();
	};
	
	$scope.changeEndDate = function(index,date) {
		$scope.wins[index].end = date;
		$scope.maxWidth = 0;
		$scope.maxIndex = 0;
		for(var i=0;i<$scope.width.length;i++) {
			setWidth(i);
		}	
		$scope.$apply();
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
myApp.directive("progressbar", function () {
    return {
        restrict: "A",
        scope: {
            total: "=",
            current: "="
        },
        link: function (scope, element) {

            scope.$watch("current", function (value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            });
            scope.$watch("total", function (value) {
                element.css("width", scope.current / scope.total * 100 + "%");
            })
        }
    };
});