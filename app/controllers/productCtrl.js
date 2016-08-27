(function () {
	'use strict';
	angular.module('productCtrl', ['cartService'])
		.controller('ProductCtrl', [
			'$scope',
			'$log',
			'CartService',
			'$location',
			'$route',
			productCtrl
		]);

	function productCtrl($scope, $log, CartService, $location, $route) {
		/*$log.log('product ctrl');*/
		$scope.init = function(){
			$scope.product.texture_id = -1;

		};

		$scope.addProductToCart = function(product){
			CartService.addProduct(product);
		};

		$scope.$watch('product.texture_id', function(){
			if ($scope.product.texture_id !== -1){
				var texture = _.findWhere($scope.product.textures, {id: $scope.product.texture_id});
				$scope.product.price = texture.price;
				$scope.product.texture = texture.model;
				$scope.product.url = texture.url && texture.url.length > 0 ? '?texture=' + texture.url: '';
				$scope.product.texture_link = texture.url && texture.url.length > 0 ? '?texture=' + texture.url: '';
			}
		});

		$scope.go = function (path) {
			$location.path(path, true);
		};

		$scope.declOfNum = function(number, titles){
			var cases = [2, 0, 1, 1, 1, 2];
			return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
		};

		$scope.actionUrl = function(e, url){
			if ($route.current.controller === "ProductPageCtrl"){
				e.stopPropagation();
				$location.path(url, false);
			}
		};

		$scope.init();
	}

})();
