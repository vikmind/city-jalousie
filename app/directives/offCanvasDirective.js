(function () {
	'use strict';

	angular.module('offCanvasDirective', [])
		.directive('offCanvas', [
			offCanvasDirective
		]);

	function offCanvasDirective() {
		return {
			restrict: 'A',
			scope: false,
			replace: true,
			link: offCanvasDirectiveLink
		};
	}

	function offCanvasDirectiveLink(scope, el, attr) {
		scope.$watch('offCanvasSide', function(newVal){
			if (newVal){
				el.addClass('move-' + scope.offCanvasSide);
			} else {
				el.removeClass('move-left move-right');
			}
		});
	}
})();
