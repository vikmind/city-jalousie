(function () {
	'use strict';
	angular.module('parallaxCtrl', [])
		.controller('ParallaxCtrl', [
			'$scope',
			'$log',
			'$window',
			parallaxCtrl
		]);

	function parallaxCtrl($scope, $log, $window) {
		/*$log.log('parallax ctrl');*/

		$scope.$window = $window;
	}

})();
