(function () {
	'use strict';

	angular.module('cartDirective', ['cartCtrl'])
		.directive('cart', [
			'$window',
			'$document',
			function($window, $document) {
				return {
					restrict: 'E',
					templateUrl: 'views/directives/cart.html',
					controller: 'CartCtrl',
					scope: {},
					replace: true,
					link: function(scope, el, attr) {
						var $dropdown = el.find('.cart__dropdown');
						$dropdown.appendTo(angular.element('header.site-header'));
						$('.js-customScroll').mCustomScrollbar({
							axis:"y",
							scrollbarPosition: "inside",
							theme: 'dark-3'
						});

						angular.element($document[0].body).on('touchend',function(e) {
							if (scope.dropdownVisible && !$(e.target).closest('.cart__dropdown')[0] && !$(e.target).closest('.cart')[0]) {
								scope.$apply(function(){
									scope.dropdownVisible = false;
								});
							}
						});
					}
				};
			}
		]);
})();
