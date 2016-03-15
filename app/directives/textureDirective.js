(function () {
	'use strict';

	angular.module('textureDirective', [])
		.directive('texture', [
			colorDirective
		]);

	function colorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/texture.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				fill: '@',
				name: '@',
				value: '@'
			},
			replace: true,
			link: textureDirectiveLink
		};
	}

	function textureDirectiveLink(scope, el, attr) {

	}
})();
