(function () {
	'use strict';

	angular.module('reviewsDirective', ['reviewsCtrl'])
		.directive('reviews', [
			reviewsDirective
		]);

	function reviewsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/reviews.html',
			controller: 'ReviewsCtrl',
			scope: {
				productId: '@'
			},
			replace: true,
			link: reviewsLink
		};
	}

	function reviewsLink(scope, el, attr) {
		scope.productId = attr.productId;
	}
})();
