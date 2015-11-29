'use strict';

var measureModule = angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'MeasurementController'
    });


    // DISABLE HTTP GET CACHE
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}])

.controller('MeasurementController', ['$scope', '$interval', '$http', 'dataService', function($scope, $interval, $http, dataService) {
    $scope.$on("$destroy",function(){
        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
    });

    $scope.xValue = Math.random();
    $scope.randomIn = function(min, max) {
        return Math.random() * (max - min) + min;
    };
    //console.log("$scope.xValue = " + $scope.xValue);

    // $scope.pollData = function() {
    //     $http.get('/api/data')
    //         .success(function(data) {
    //             console.log(data.generatedDate + " pollData success data.x: " + data.x);
    //             $scope.Data = data;
    //         })
    //         .error(function(data) {
    //             console.log("pollData error: " + data);
    //         });
    //     };

    $scope.Data = {};

    var interval = null;

    $scope.startPoll = function() {
        console.log("Start to poll data from server");
        $http.post('/api/data', {"command":"START-POLL-DATA"})
            .success(function(data) {
                $scope.serverResponse = data;
            })
            .error(function(data) {
                $scope.serverResponse = "ERROR: " + data;
                console.log('Error: ' + data);
            });

        interval = $interval(function(){
            $scope.LocalData = dataService.localRandomData().data;
            dataService.pollData(function(data) {
                $scope.Data = data;
            });
        },100);
    };

    $scope.stopPoll = function() {
        console.log("Stop Poll");

        $http.post('/api/data', {"command":"STOP-POLL"})
            .success(function(data) {
                $scope.serverResponse = data;
            })
            .error(function(data) {
                $scope.serverResponse = "ERROR: " + data;
                console.log('Error: ' + data);
            });

        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
        }
    }
    
    //dataService.start($scope.Data);
}]);

measureModule.service('randomDataFactory', function(){
    this.data = function (){
        var data = {x: 0, y: 0, z: 0};
        data.x = Math.random();
        data.y = Math.random();
        data.z = Math.random();
        // console.log("randomDataFactory data.x = " + data.x );

        return data;
    }
});

measureModule.service('dataService', ['$timeout', '$http', 'randomDataFactory', function($timeout, $http, randomDataFactory){
    this.start = function start() {
        (function tick() {
            pollData();
            console.log("timeout pollData()");
            $timeout(tick, 1000);
        })();
    }

    this.localRandomData = function localRandomData() {
        var model = randomDataFactory.data();
        // console.log("localRandomData model.x = " + model.x);
        return {data: model};
    }

    this.pollData = function(callback) {
        // console.log("pollData start");
        $http.get('/api/data')
            .success(function(data) {
                // console.log(data.generatedDate + " pollData success data.x: " + data.x);
                callback(data);
            })
            .error(function(data) {
                console.log("pollData error: " + data);
            });
        // console.log("pollData after http GET");
    }
}]);