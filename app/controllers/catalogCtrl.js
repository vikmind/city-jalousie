(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService', 'catalogService', 'configService', 'catalogResponsiveDirective'])
		.controller('CatalogCtrl', [
			'ngMeta',
			'$scope',
			'$log',
			'$routeParams',
			'$location',
			'ProductService',
			'CatalogService',
			'ConfigService',
			'ResponsiveService',
			'$timeout',
			catalogCtrl
		]);

	function catalogCtrl(ngMeta, $scope, $log, $routeParams, $location, ProductService, CatalogService, ConfigService, ResponsiveService, $timeout) {
		/*$log.log('catalog ctrl');*/
		$scope.init = function(){
			$scope.responsive = ResponsiveService;
			$scope.$parent.constructorHeader = false;
			$scope.$parent.productHeader = false;
			$scope.catalogItems = [];
			$scope.categoryChecks = {};
			$scope.priceSlider = null;
			$scope.maxPrice = ConfigService.maxPrice;
			if ($routeParams.subcategory){
				$scope.categoryChecks[$routeParams.subcategory] = true;
			}
			$scope.searchOptions = {
				sort: 'date',
				count: 9,
				min_price: ConfigService.minPrice,
				max_price: ConfigService.maxPrice,
				category: $routeParams.category,
				'subcategory[]': $routeParams.subcategory ? [$routeParams.subcategory] : []
			};
			$scope.$watchCollection('searchOptions', function(oldVal, newVal){
				$scope.getProductList();
			});
			$scope.$watchCollection('categoryChecks', function(oldVal, newVal){
				if (!_.isEqual(oldVal, newVal)){
					var arr = [];
					angular.forEach($scope.categoryChecks, function(item, key){
						if (item){
							arr.push(key);
						}
					});
					$scope.searchOptions['subcategory[]'] = arr;
					if ($scope.searchOptions['subcategory[]'].length === 1){
						$location.path('catalog/' + $scope.searchOptions.category + '/' +
							$scope.searchOptions['subcategory[]'], false);
					} else {
						$location.path('catalog/' + $scope.searchOptions.category, false);
					}
				}
			});
			$scope.getCatalog();
		};

		$scope.getCatalog = function(){
			$scope.$parent.showLoader = true;
			CatalogService.getCatalog({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory
			}).then(function(data){
				$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
				$scope.pageOptions = data;
				angular.forEach($scope.pageOptions.subcategories, function(item){
					item.checked = (item.slug === $routeParams.subcategory)?true:null;
				});
				$scope.$parent.showLoader = false;
			}, function(err){
				$log.log(err);
			});
		};

		$scope.addProductList = function () {
			ProductService.getList(angular.extend({}, $scope.searchOptions, {skip: $scope.catalogItems.length}))
				.then(function (data) {
					var items = data.items;
					
					// Success
					if (items.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						$scope.showLoadMoreBtn = true;
						Array.prototype.push.apply($scope.catalogItems, items);
					}
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.getProductList = function() {
			ProductService.getList($scope.searchOptions)
				.then(function (data) {
					// Success
					console.log(data.title);
					ngMeta.setTag('description', data.description);
					ngMeta.setTitle(data.title + '. Сити жалюзи.');
					var maxPrice = parseInt(data.maxPrice);
					if (maxPrice !== $scope.maxPrice){
						$scope.priceSlider = null;
						$scope.maxPrice = maxPrice;
						$scope.resetSlider();
					}
					var items = data.items;
					if (items.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						$scope.showLoadMoreBtn = true;
						$scope.catalogItems = items;
					}
					
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.toggleSort = function(sortTerm){
			if ($scope.searchOptions.sort === sortTerm){
				$scope.searchOptions.sort = null
			} else {
				$scope.searchOptions.sort = sortTerm;
			}
		};

		$scope.resetSlider = function(){
			$timeout(function () {
				$scope.priceSlider = {
					min: ConfigService.minPrice,
					max: $scope.maxPrice,
					options: {
						floor: ConfigService.minPrice,
						ceil: $scope.maxPrice
					}
				};
			}, 10);
			
			$scope.$on('rangeDirective.updateRangeSlider', function(e){
				$scope.searchOptions.min_price = $scope.priceSlider.min;
				$scope.searchOptions.max_price = $scope.priceSlider.max;
			});
		};

		$scope.init();
	}

})();
