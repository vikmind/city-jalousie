(function () {
	'use strict';

	angular.module('seoDirective', ['mainCtrl'])
		.directive('seo', [
			seoDirective
		]).filter('unsafe', function($sce) { return $sce.trustAsHtml; });

	function seoDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/seo.html',
			controller: 'MainCtrl',
			scope: {
				html: '@'
			},
			replace: true,
			link: seoLink
		};
	}

	function seoLink(scope, el, attr) {
		// console.log('seoDirective');
	}
})();
