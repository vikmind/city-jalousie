(function () {
	'use strict';
	angular.module('benefitsService', []).
	factory('BenefitsService', [
		'API_PATH',
		'$http',
		'$q',
		benefitsService
	]);

	function benefitsService(API_PATH, $http, $q) {
		var service = {
			getBenefits: getBenefits
		};
		return service;

		function getBenefits(apiUrl, params) {
			var url = API_PATH + apiUrl,
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
