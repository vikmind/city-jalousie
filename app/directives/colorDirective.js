(function () {
	'use strict';

	angular.module('colorDirective', [])
		.directive('color', [
			colorDirective
		]);

	function colorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/color.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				fill: '@',
				name: '@',
				value: '@'
			},
			replace: true,
			link: colorDirectiveLink
		};
	}

	function colorDirectiveLink(scope, el, attr) {

	}
})();
