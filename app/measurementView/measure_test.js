'use strict';

describe('MeasurementController function', function() {
	describe('MeasurementController', function() {
		var scope;

		beforeEach(module('measurementView'));

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			$controller('MeasurementController', {$scope: scope});
		}));

		it('should create "xValue" within range 0 and 1', function() {
			expect(scope.xValue > 0 && scope.xValue < 1).toBeTruthy();
		});
	});
});