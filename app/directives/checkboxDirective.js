(function () {
	'use strict';

	angular.module('checkboxDirective', [])
		.directive('checkbox', [
			checkboxDirective
		]);

	function checkboxDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/checkbox.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				name: '@',
				label: '@',
				value: '@'
			},
			replace: true,
			link: checkboxDirectiveLink
		};
	}

	function checkboxDirectiveLink(scope, el, attr) {

	}
})();
