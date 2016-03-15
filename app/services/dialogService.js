(function () {
	'use strict';
	angular.module('dialogService', []).
	factory('DialogService', [
		'$rootScope',
		dialogService
	]);

	function dialogService($rootScope) {
		var opened = false;
		var image = '';

		var setState = function(newState){
			opened = newState;
			$rootScope.$broadcast('DialogService.updateState');
		};

		var getState = function(){
			return opened;
		};

		var setImage = function(picture) {
			image = picture;
		}
		var getImage = function(){
			return image;
		};

		var service = {
			getState: getState,
			setState: setState,
			getImage: getImage,
			setImage: setImage
		};

		return service;
	}
})();
