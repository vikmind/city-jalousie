(function () {
	'use strict';
	angular.module('responsiveCtrl', ['responsiveService'])
		.controller('ResponsiveCtrl', [
			'$scope',
			'$log',
			'$window',
			'ResponsiveService',
			responsiveCtrl
		]);

	function responsiveCtrl($scope, $log, $window, ResponsiveService) {
		/*$log.log('responsive ctrl');*/
		$scope.$window = $window;
		$scope.checkWidth  = function(width){
			ResponsiveService.updateWidth(width);
		};
	}

})();
