'use strict';

angular.module('measurementView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/measurementView', {
    templateUrl: 'measurementView/measurementView.html',
    controller: 'measurementViewCtrl'
  });
}])

.controller('measurementViewCtrl', [function($scope) {
    
}]);

// var measureModule = angular.module('measurementView', ['ngRoute']);

// measureModule.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/measurementView', {
//     templateUrl: 'measurementView/measurementView.html',
//     controller: 'MeasurementController'
//   });
// }]);

// measureModule.controller('MeasurementController', ['$scope', '$interval', 'dataService', function($scope, $interval, dataService) {
//     $scope.xValue = Math.random();
//     $scope.randomIn = function(min, max) {
//         return Math.random() * (max - min) + min;
//     };
//     //console.log("$scope.xValue = " + $scope.xValue);

//     $scope.Data = {};
//     $interval(function(){
//         $scope.Data = dataService.pollData().data;
//     },1000);
//     //dataService.start($scope.Data);
// }]);

// measureModule.factory('randomDataFactory', function(){
//     var data = {x: 0, y: 0, z: 0};
//     data.x = Math.random();
//     data.y = Math.random();
//     data.z = Math.random();
//     console.log("randomDataFactory data.x = " + data.x );
//     return {data: data};
// });

// measureModule.factory('dataService', ['$timeout', 'randomDataFactory', function($timeout, randomDataFactory){
//     function start(model) {
//         console.log("dataService.start, input.x = " + model.x);
//         (function tick() {
//             model = pollData().data;
//             console.log("timeout model.Data.x = " + model.x);
//             $timeout(tick, 2000);
//         })();
//     }

//     function pollData() {
//         var model = randomDataFactory.data;
//         console.log("pollData model.x = " + model.x);
//         return {data: model};
//     }

//     return {
//         start: start,
//         pollData: pollData
//     };
// }]);