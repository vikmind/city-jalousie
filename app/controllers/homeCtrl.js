(function () {
	'use strict';
	angular.module('homeCtrl', ['benefitsDirective'])
		.controller('HomeCtrl', [
			'$scope',
			'$log',
			homeCtrl
		]);

	function homeCtrl($scope, $log) {
		$log.log('home ctrl');

		$scope.bigSliderItems = [
			'img/slide-1.jpg'
		];

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.catalogData = {};
	}

})();
