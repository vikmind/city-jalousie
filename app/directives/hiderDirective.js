(function () {
	'use strict';

	angular.module('hiderDirective', ['hiderCtrl'])
		.directive('hider', [
			menuHiderDirective
		]);

	function menuHiderDirective() {
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			controller: 'HiderCtrl',
			link: hiderDirectiveLink
		};
	}

	function hiderDirectiveLink(scope, el, attr) {
		var $window = scope.$window,
			hidePoint = attr.hiderPoint || 0,
			className = attr.hiderClass || 'hidden';

		angular.element($window).bind('scroll', function () {
			el.toggleClass(className, $window.scrollY > hidePoint);
		});
	}
})();
