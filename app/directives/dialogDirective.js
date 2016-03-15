(function () {
	'use strict';

	angular.module('dialogDirective', ['dialogCtrl'])
		.directive('dialog', [
			dialogDirective
		]);

	function dialogDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/dialog.html',
			controller: 'DialogCtrl',
			scope: {
				title: '@',
				url: '@'
			},
			replace: true,
			link: dialogDirectiveLink
		};
	}

	function dialogDirectiveLink(scope, el, attr) {
		scope.$watch('state', function(){
			if (scope.state == false){
				$('body').removeClass('modal-open');
			} else {
				$('body').addClass('modal-open');
			}
		});
	}
})();
