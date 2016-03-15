(function () {
	'use strict';
	angular.module('cartCtrl', ['cartService', 'dialogService'])
		.controller('CartCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'CartService',
			'DialogService',
			cartCtrl
		]);

	function cartCtrl($rootScope, $scope, $log, CartService, DialogService) {
		/*$log.log('cart ctrl');*/
		$scope.dropdownVisible = false;

		$scope.init = function() {
			$scope.items = CartService.getProducts();
		};

		$scope.showDropdown = function(){
			$scope.dropdownVisible = true;
		};

		$scope.hideDropdown = function(){
			$scope.dropdownVisible = false;
		};

		$scope.openOrder = function(){
			DialogService.setState('order');
		};

		$scope.removeProduct = function(key){
			CartService.removeProduct(key);
			if ($scope.items.length === 0){
				$scope.dropdownVisible = false;
			}
		};

		$scope.touchTogle = function(){
			$scope.dropdownVisible = !$scope.dropdownVisible;
		}

		$scope.init();
	}

})();
