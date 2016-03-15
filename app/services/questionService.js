(function () {
	'use strict';
	angular.module('questionService', ['configService']).
	factory('QuestionService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		questionService
	]);

	function questionService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getQuestion: getQuestion
		};
		return service;

		function getQuestion(params) {
			var url = API_PATH + ConfigService.questionPath,
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
