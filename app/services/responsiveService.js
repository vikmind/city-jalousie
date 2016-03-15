(function () {
	'use strict';
	angular.module('responsiveService', []).
	factory('ResponsiveService', [
		'$rootScope',
		responsiveService
	]);

	function responsiveService($rootScope) {
		var opened = false;
		var image = '';
		var scrollWidth = 30;
		var responsiveStatus = {
			desktop: false,
			talbet: false,
			tabletPortrait: false,
			mobile: false
		};
		var rules = {
			desktop: function(width) {
				return (width >= (1280 + scrollWidth));
			},
			tablet: function(width) {
				return (width < (1280 + scrollWidth) && width > (960 + scrollWidth));
			},
			tabletPortrait: function(width) {
				return (width <= (960 + scrollWidth));
			},
			mobileLandscape: function(width) {
				return (width <= (640 + scrollWidth));
			},
			mobile: function(width) {
				return (width <= (320 + scrollWidth));
			}
		};

		var setState = function(){
			$rootScope.$broadcast('ResponsiveService.updateState');
		};

		var getState = function(key) {
			return responsiveStatus[key];
		};

		var updateWidth = function(width){
			var update = false
			_.each(rules, function(fn, key){
				if (fn(width)!== responsiveStatus[key]){
					responsiveStatus[key] = fn(width);
					update = true;
				}
			});
			if (update){
				setState();
			};
		};

		var service = {
			updateWidth: updateWidth,
			getState: getState
		};

		return service;
	}
})();
