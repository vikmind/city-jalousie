(function () {
	'use strict';
	angular.module('benefitsCtrl', ['benefitsService'])
		.controller('BenefitsCtrl', [
			'$scope',
			'$log',
			'BenefitsService',
			benefitsCtrl
		]);

	function benefitsCtrl($scope, $log, BenefitsService) {
		$log.log('benefits ctrl');

		var url = $scope.url;

		$scope.init = function () {
			$scope.getBenefits(url);
		};

		$scope.getBenefits = function (url) {
			BenefitsService.getBenefits(url)
				.then(function (data) {
					// Success
					$scope.benefits = data;
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.init();
	}

})();
