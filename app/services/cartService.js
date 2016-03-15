(function () {
	'use strict';
	angular.module('cartService', ['configService']).
	factory('CartService', [
		'$rootScope',
		'API_PATH',
		'$http',
		'$q',
		'$interpolate',
		'localStorageService',
		'ConfigService',
		cartService
	]);

	function cartService($rootScope, API_PATH, $http, $q, $interpolate, localStorageService, ConfigService) {
		var products = JSON.parse(localStorageService.get('cart_products')) || [];
		var oneClickProduct = {};
		var service = {
			addProduct: addProduct,
			removeProduct: removeProduct,
			getProducts: getProducts,
			getOneClick: getOneClick,
			addOneClick: addOneClick,
			submitOrder: submitOrder,
			submitCallMe: submitCallMe,
			submitFeedback: submitFeedback
		};
		return service;

		function addProduct(product) {
			var clone = _.cloneDeep(product);
			products.push(clone);
			localStorageService.set('cart_products', JSON.stringify(products));
		}

		function removeProduct(idx) {
			products.splice(idx, 1);
			localStorageService.set('cart_products', JSON.stringify(products));
		}

		function getProducts(){
			return products;
		}

		function addOneClick(product){
			oneClickProduct = _.cloneDeep(product);
		}

		function getOneClick(){
			return oneClickProduct;
		}



		function formatProduct(product){
			if (!!product.allowHeight && product.dimensions){
				return $interpolate('{{product.title}}' +
				       (product.texture ? " модель {{product.texture}}" : " ") +
				       ((!!product.dimensions.width && !!product.dimensions.height) ?
				          " ({{product.dimensions.width}} м x {{product.dimensions.height}} м)" : "") +
				       (product.withCornice? " + {{product.cornice.cartText}}" : "")
				)({product:product});
			} else if (!product.allowHeight && product.dimensions) {
				return $interpolate('{{product.title}}' +
				       (product.texture ? " модель {{product.texture}}" : " ") +
				       ((!!product.dimensions.width) ?
				          " ({{product.dimensions.width}} м)" : "") +
				       (product.withCornice? " + {{product.cornice.cartText}}" : "")
				)({product:product});
			} else {
				return $interpolate('{{product.title}}' +
				       (product.texture ? " модель {{product.texture}}" : " ") +
				       (product.withCornice? " + {{product.cornice.cartText}}" : "")
				)({product:product});
			}
			
		};

		function submitOrder(params){
			var url = API_PATH + ConfigService.orderPath;
			var defer = $q.defer();
			var data = {};
			if (params.context === 'oneclick'){
				data.text = formatProduct(oneClickProduct);

			} else if (params.context === 'order'){
				data.text = _.reduce(products, function(result, product, key){
					result += (key+1) + '. ' + formatProduct(product) + '\n';
					console.log(formatProduct(product));
					return result;
				}, '');

			}
			data.time = params.hour.label + ' ' + params.min.label;
			angular.extend(data, params);
			delete data.context;
			delete data.hour;
			delete data.min;
			$http.post(url, data)
				.success(function(response){
					defer.resolve(response);
				}, function(err){
					$log.log(err);
				});

			return defer.promise;
		};

		function submitCallMe(params){
			var url = API_PATH + ConfigService.callMe;
			var defer = $q.defer();
			var data = {};
			data.text = 'Перезвоните мне';
			data.time = params.hour.label + ' ' + params.min.label;
			angular.extend(data, params);
			delete data.context;
			delete data.hour;
			delete data.min;
			$http.post(url, data)
				.success(function(response){
					defer.resolve(response);
				}, function(err){
					$log.log(err);
				});
			return defer.promise;
		};

		function submitFeedback(params){
			var url = API_PATH + ConfigService.feedbackPath;
			var defer = $q.defer();
			$http.post(url, params)
				.success(function(response){
					defer.resolve(response);
				}, function(err){
					$log.log(err);
				});
			return defer.promise;
		};
	}
})();
