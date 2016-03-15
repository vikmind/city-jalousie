(function () {
	'use strict';
	angular.module('articleService', ['configService']).
	factory('ArticleService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		articleService
	]);

	function articleService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getArticle: getArticle,
			getTrend: getTrend
		};
		return service;

		function getArticle(slug) {
			var url = API_PATH + ConfigService.articlePath,
				defer = $q.defer();

			$http.get(url, {params: {slug: slug}})
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

		function getTrend(slug) {
			var url = API_PATH + ConfigService.homeArticlePath,
				defer = $q.defer();

			$http.get(url, {params: {slug: slug}})
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
