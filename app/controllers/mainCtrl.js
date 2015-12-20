(function () {
	'use strict';
	angular.module('mainCtrl', ['benefitsDirective'])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout) {
		$log.log('main ctrl');
		$log.log($scope);
		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

	}

})();
