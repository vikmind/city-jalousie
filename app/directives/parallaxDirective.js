(function () {
	'use strict';

	angular.module('parallaxDirective', ['parallaxCtrl'])
		.directive('parallax', [
			parallaxDirective
		]);

	function parallaxDirective() {
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			controller: 'ParallaxCtrl',
			link: parallaxDirectiveLink
		};
	}

	function parallaxDirectiveLink(scope, el, attr) {
		var $window = scope.$window,
			start = attr.parallaxStart || 0,
			end = attr.parallaxEnd || 500;

		angular.element($window).bind('scroll', function () {
			if (($window.scrollY <= end) && ($window.scrollY > start)) {
				el.css('transform', 'translateY(' + $window.scrollY / 5 + 'px)');
			}
		});
	}
})();
