(function () {
	'use strict';
	angular.module('catalogHashService', []).
	factory('CatalogHashService', [
		'API_PATH',
		'$http',
		'$q',
		catalogHashService
	]);

	function catalogHashService() {
		function getColors(aColors) {
			var colorsIds = [];
			_.each(aColors, function(oColor, index){
				if (oColor === true || oColor.checked){
					colorsIds.push(window.oStaticData['colors'][index]['id'].toString());
				}
			});
			return colorsIds
		};

		function getSelectedColors(shash) {
			var newHash = shash.split('colors=(')[1] ? shash.split('colors=(')[1].split(');')[0].split(',') : [];
			return newHash;
		};

		function setColors(id) {
			return _.findWhere(service.colorCollection, {
				'id': id
			});
		};

		var service = {
			getColors: getColors,
			getSelectedColors: getSelectedColors,
			setColors: setColors
		};
		return service;
	}
})();
