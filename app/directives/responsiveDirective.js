(function () {
	'use strict';

	angular.module('responsiveDirective', ['responsiveCtrl'])
		.directive('responsive', [
			responsiveDirective
		]);

	function responsiveDirective() {
		return {
			restrict: 'E',
			scope: {},
			replace: true,
			controller: 'ResponsiveCtrl',
			link: responsiveDirectiveLink
		};
	}

	function responsiveDirectiveLink(scope, el, attr) {
		var w = scope.$window;
		var timer = 0;
		w.onresize = function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				scope.checkWidth($(w).width());
			}, 300);
		};
		scope.checkWidth($(w).width());
	}
})();
