(function () {
	'use strict';
	angular.module('menuService', ['configService']).
	factory('MenuService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		menuService
	]);

	function menuService(API_PATH, $http, $q, ConfigService) {
		var menu = {};
		var service = {
			getMenu: getMenu
		};
		return service;

		function getMenu() {
			var url = API_PATH + ConfigService.structurePath,
				defer = $q.defer();
			if (_.isEmpty(menu)){
				$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});
			} else {
				defer.resolve(menu);
			}

			return defer.promise;
		}
	}
})();
