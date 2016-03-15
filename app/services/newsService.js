(function () {
	'use strict';
	angular.module('newsService', ['configService',]).
	factory('NewsService', [
		'API_PATH',
		'$http',
		'$q',
		'$sce',
		'ConfigService',
		newsService
	]);

	function newsService(API_PATH, $http, $q, $sce, ConfigService) {
		var service = {
			getNews: getNews
		};
		return service;

		function getNews() {
			var url = API_PATH + ConfigService.newsPath,
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					angular.forEach(data, function(item){
						item.trustedTitle = $sce.trustAsHtml(item.title);
					});
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
