(function () {
	'use strict';

	angular.module('benefitsDirective', ['benefitsCtrl'])
		.directive('benefits', [
			benefitsDirective
		]);

	function benefitsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/benefits.html',
			controller: 'BenefitsCtrl',
			scope: {
				title: '@',
				url: '@',
				id: '@'
			},
			replace: true,
			link: benefitsDirectiveLink
		};
	}

	function benefitsDirectiveLink(scope, el, attr) {
		attr.url = attr.url || '#';
	}
})();
