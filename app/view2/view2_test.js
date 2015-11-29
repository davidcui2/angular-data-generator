'use strict';



describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('MeasurementController function', function() {
    describe('MeasurementController', function() {
        var scope;

        beforeEach(module('myApp.view2'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('MeasurementController', {$scope: scope});
        }));

        it('should create "xValue" within range 0 and 1', function() {
            expect(scope.xValue > 0 && scope.xValue < 1).toBeTruthy();
        });
    });
});
});