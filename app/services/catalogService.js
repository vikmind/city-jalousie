(function () {
	'use strict';
	angular.module('catalogService', ['configService']).
	factory('CatalogService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		catalogService
	]);

	function catalogService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getCatalog: getCatalog
		};
		return service;

		function getCatalog(params) {
			var url = API_PATH + ConfigService.catalogPath,
				defer = $q.defer();

			$http.get(url, {params: params})
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}
	}
})();
