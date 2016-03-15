(function () {
	'use strict';
	angular.module('hiderCtrl', [])
		.controller('HiderCtrl', [
			'$scope',
			'$log',
			'$window',
			hiderCtrl
		]);

	function hiderCtrl($scope, $log, $window) {
		/*$log.log('hider ctrl');*/

		$scope.$window = $window;
	}

})();
