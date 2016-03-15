(function () {
	'use strict';
	angular.module('questionCtrl', ['questionService'])
		.controller('QuestionCtrl', [
			'$scope',
			'$log',
			'QuestionService',
			questionCtrl
		]);

	function questionCtrl($scope, $log, QuestionService) {
		/*$log.log('question ctrl');*/

		$scope.init = function () {
			$scope.getQuestion();
		};

		$scope.getQuestion = function (number) {
			QuestionService.getQuestion({number:number})
				.then(function (data) {
					// Success
					$scope.question = data;
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.init();
	}

})();
