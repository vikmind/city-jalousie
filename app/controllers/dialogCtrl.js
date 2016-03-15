(function () {
	'use strict';
	angular.module('dialogCtrl', ['dialogService', 'cartService'])
		.controller('DialogCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'DialogService',
			dialogCtrl
		]);

	function dialogCtrl($rootScope, $scope, $log, DialogService) {
		/*$log.log('dialog ctrl');*/

		var url = $scope.url;

		$scope.init = function () {
			$scope.state = DialogService.getState();
		};

		$scope.CloseDialog = function () {
			$scope.state = false;
			DialogService.setState(false);
		};

		$rootScope.$on('DialogService.updateState', function(e){
			$scope.state = DialogService.getState();
			if ($scope.state === 'picture'){
				$scope.picture = DialogService.getImage();
			} else {
				$scope.picture = '';
			}
			if (($scope.state === 'feedback') &&
				($scope.state === 'order')){
				$scope.content = true;
			} else {
				$scope.content = false;
			}
		});

		$scope.init();
	}

})();
