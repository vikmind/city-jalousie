(function () {
	'use strict';

	angular.module('questionDirective', ['questionCtrl'])
		.directive('question', [
			questionDirective
		]);

	function questionDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/question.html',
			controller: 'QuestionCtrl',
			scope: {
				number: '@',
				title: '@',
				description: '@',
				link: '@'
			},
			replace: true,
			link: questionDirectiveLink
		};
	}

	function questionDirectiveLink(scope, el, attr) {
		attr.link = attr.link || '#';
	}
})();
