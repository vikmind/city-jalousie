(function () {
	'use strict';
	angular.module('constructorPreviewCtrl', [])
		.controller('ConstructorPreviewCtrl', [
			'$scope',
			'$log',
			constructorPreviewCtrl
		]);

	function constructorPreviewCtrl($scope, $log) {
		/*$log.log('Constructor preview ctrl');*/
		$scope.$log = $log;
	}

})();
