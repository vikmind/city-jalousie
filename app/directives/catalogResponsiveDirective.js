(function () {
	'use strict';

	angular.module('catalogResponsiveDirective', ['catalogCtrl'])
		.directive('catalogResponsive', [
			catalogResponsiveDirective
		]);

	function catalogResponsiveDirective() {
		return {
			restrict: 'A',
			replace: true,
			link: catalogResponsiveLink
		};
	}

	function catalogResponsiveLink(scope, el, attr) {
		var $parent = el.parent();
		function catalogResponsiveAction(){
			if (scope.responsive.getState('tabletPortrait')){
				angular.element('.mobile-aside__content.filters').html('');
				el.appendTo(angular.element('.mobile-aside__content.filters'));
			} else{
				el.prependTo($parent);
			}
		}
		scope.$on('ResponsiveService.updateState', catalogResponsiveAction);
		catalogResponsiveAction();
	}
})();
