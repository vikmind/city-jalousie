(function () {
	'use strict';
	angular.module('productService', ['configService']).
	factory('ProductService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		productService
	]);

	function productService(API_PATH, $http, $q, ConfigService) {

		var FetchPrototype = function(path, callback){
			return function(params) {
				var url = API_PATH + path,
					defer = $q.defer();
				$http.get(url, {params: params})
					.success(function (data) {
						callback(defer, data);
					})
					.error(function (res, errCode) {
						defer.reject({
							code: errCode,
							text: 'api access [%s] error!'.replace('%s', url)
						});
					});

				return defer.promise;
			};
		};

		var getProduct = FetchPrototype(
			ConfigService.productPagePath,
			function(defer, data){
				defer.resolve(data);
			}
		);

		var getList = FetchPrototype(
			ConfigService.productListPath,
			function(defer, data){
				service.products = data;
				defer.resolve(data);
			}
		);

		var getHomeList = FetchPrototype(
			ConfigService.productHomeListPath,
			function(defer, data){
				service.products = data;
				defer.resolve(data);
			}
		);

		var getSeeAlsoList = FetchPrototype(
			ConfigService.productSeeAlsoListPath,
			function(defer, data){
				service.products = data;
				defer.resolve(data);
			}
		);

		var getFeatured = FetchPrototype(
			ConfigService.featuredProductPath,
			function(defer, data){
				service.featuredProduct = data;
				defer.resolve(data);
			}
		);

		var service = {
			getProduct: getProduct,
			getList: getList,
			getHomeList: getHomeList,
			getSeeAlsoList: getSeeAlsoList,
			getFeatured: getFeatured
		};
		return service;
	}
})();
