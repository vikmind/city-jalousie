(function () {
	'use strict';
	angular.module('texturesService', ['configService']).
	factory('TexturesService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		texturesService
	]);

	function texturesService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getTextures: getTextures,
			getConstructorTextures: getConstructorTextures,
			getTextureById: getTextureById,
			getTextureBySlug: getTextureBySlug,
			filterTextures: filterTextures
		};
		return service;

		function getConstructorTextures(params) {
			var url = API_PATH + ConfigService.constructorTexturesPath,
				defer = $q.defer();

			$http.get(url, {params: params})
				.success(function (data) {
					service.textures = data;
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

		function getTextures(params) {
			var url = API_PATH + ConfigService.texturesPath,
				defer = $q.defer();

			$http.get(url, {params: params})
				.success(function (data) {
					service.textures = data;
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		};

		function filterTextures(fn) {
			return _.filter(service.textures, fn);
		};

		function getTextureById(id) {
			return _.findWhere(service.textures, {
				'id': id
			});
		}

		function getTextureBySlug(slug) {
			return _.findWhere(service.textures, {
				'slug': slug
			});
		}
	}
})();
