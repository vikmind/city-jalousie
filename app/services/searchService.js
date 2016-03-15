(function () {
	'use strict';
	angular.module('searchService', ['configService']).
	factory('SearchService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		searchService
	]);

	function searchService(API_PATH, $http, $q, ConfigService) {
		var service = {
			find: find
		};
		return service;

		function find(term) {
			var url = API_PATH + ConfigService.searchPath,
				defer = $q.defer();

			$http.get(url, {params: {term: term}})
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
