'use strict';

var measureModule = angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'MeasurementController'
  });
}])

.controller('MeasurementController', ['$scope', '$interval', 'dataService', function($scope, $interval, dataService) {
    $scope.xValue = Math.random();
    $scope.randomIn = function(min, max) {
        return Math.random() * (max - min) + min;
    };
    //console.log("$scope.xValue = " + $scope.xValue);

    $scope.Data = {};
    $interval(function(){
        $scope.Data = dataService.pollData().data;
    },1000);
    //dataService.start($scope.Data);
}]);

measureModule.service('randomDataFactory', function(){
    this.data = function (){
        var data = {x: 0, y: 0, z: 0};
        data.x = Math.random();
        data.y = Math.random();
        data.z = Math.random();
        console.log("randomDataFactory data.x = " + data.x );

        return data;
    }
});

measureModule.service('dataService', ['$timeout', 'randomDataFactory', function($timeout, randomDataFactory){
    this.start = function start(model) {
        console.log("dataService.start, input.x = " + model.x);
        (function tick() {
            model = pollData().data;
            console.log("timeout model.Data.x = " + model.x);
            $timeout(tick, 2000);
        })();
    }

    this.pollData = function pollData() {
        var model = randomDataFactory.data();
        console.log("pollData model.x = " + model.x);
        return {data: model};
    }
}]);