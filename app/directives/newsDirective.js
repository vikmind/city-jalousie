(function () {
	'use strict';

	angular.module('newsDirective', ['newsCtrl'])
		.directive('news', [
			newsDirective
		]);

	function newsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/news.html',
			controller: 'NewsCtrl',
			scope: {
				title: '@',
				url: '@'
			},
			replace: true,
			link: newsDirectiveLink
		};
	}

	function newsDirectiveLink(scope, el, attr) {
		setInterval(function(){
			angular.element('.news__item').eq(scope.currentNews).removeClass('active');
			scope.currentNews = (scope.news.length == (scope.currentNews +1)) ? 0 : scope.currentNews +1;
			angular.element('.news__item').eq(scope.currentNews).addClass('active');
		}, 10000);
	}
})();