(function () {
	'use strict';
	angular.module('reviewsService', ['configService']).
	factory('ReviewsService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		reviewsService
	]);

	function reviewsService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getReviews: getReviews,
			loadReviews: loadReviews,
			submitReview: submitReview
		};
		return service;

		function getReviews(params, limit) {
			var url = API_PATH + ConfigService.reviewsPath,
				defer = $q.defer();
			if (service.product === params.product){
				defer.resolve(angular.extend({}, service.data, {list: service.list.slice(0, limit)}));
			} else {
				$http.get(url, {params: params})
					.success(function (data) {
						service.list = data.list;
						service.data = data;
						service.data.total = data.list.length;
						service.data.list = null;
						defer.resolve(angular.extend({}, service.data, {list: service.list.slice(0, limit)}));
					})
					.error(function (res, errCode) {
						defer.reject({
							code: errCode,
							text: 'api access [%s] error!'.replace('%s', url)
						});
					});
			}
			service.product = params.product;

			return defer.promise;
		};

		function loadReviews(skip, limit) {
			return service.list.slice(skip, limit+skip);
		};

		function submitReview(params) {
			var url = API_PATH + ConfigService.newReviewPath,
				defer = $q.defer();
			$http.post(url, params)
				.success(function (data) {
					defer.resolve(data);
				}, function(err){
					$log.log(err);
				});

			return defer.promise;
		};
	}
})();
