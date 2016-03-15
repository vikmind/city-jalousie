(function () {
	'use strict';
	angular.module('feedbackCtrl', ['cartService'])
		.controller('FeedbackCtrl', [
			'$scope',
			'$log',
			'CartService',
			feedbackCtrl
		]);

	function feedbackCtrl($scope, $log, CartService) {
		/*$log.log('feedback ctrl');*/

		$scope.init = function() {
			$scope.message = {
				name: '',
				email: '',
				text: ''
			};
			$scope.state = {
				complete: false,
				loading: false
			};
		};

		$scope.submitForm = function() {
			$scope.state.loading = true;
			CartService.submitFeedback($scope.message)
				.then(function(data){
					$scope.state.loading = false;
					$scope.state.complete = true;
				}, function(err){
					$scope.state.loading = false;
				});
		};

		$scope.init();
	}

})();
