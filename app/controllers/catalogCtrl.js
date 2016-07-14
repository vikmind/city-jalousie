(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService', 'catalogHashService', 'catalogService', 'configService', 'catalogResponsiveDirective'])
		.controller('CatalogCtrl', [
			'ngMeta',
			'$scope',
			'$log',
			'$routeParams',
			'$location',
			'CatalogHashService',
			'ProductService',
			'CatalogService',
			'ConfigService',
			'ResponsiveService',
			'$timeout',
			catalogCtrl
		]);

	function catalogCtrl(ngMeta, $scope, $log, $routeParams, $location, CatalogHashService, ProductService, CatalogService, ConfigService, ResponsiveService, $timeout) {
		/*$log.log('catalog ctrl');*/
		$scope.$parent.titleHeaderClass = 'catalog';
		$scope.init = function(){
			$scope.$parent.headerImage = '';
			$scope.responsive = ResponsiveService;
			$scope.$parent.constructorHeader = false;
			$scope.$parent.productHeader = false;
			$scope.catalogItems = [];
			$scope.categoryChecks = {};
			$scope.priceSlider = null;
			$scope.maxPrice = ConfigService.maxPrice;

			$scope.colorCollection = JSON.parse(JSON.stringify(window.oStaticData['colors']));
			if (!!$routeParams.category){
				$scope.selectedColors = CatalogHashService.getSelectedColors($location.path().split('/').pop());
			}
			// $scope.selectedColors = CatalogHashService.getSelectedColors($location.path().split('/').pop());
			if ($scope.selectedColors && !_.isEmpty($scope.selectedColors))
			{
				_.each($scope.colorCollection, function(oColor){
					if (_.contains($scope.selectedColors, oColor['id'].toString()))
					{
						oColor.checked = true;
					}
				});
			}
			
			if ($routeParams.subcategory){
				$scope.categoryChecks[$routeParams.subcategory] = true;
			}
			$scope.searchOptions = {
				sort: 'date',
				count: 9,
				min_price: ConfigService.minPrice,
				max_price: ConfigService.maxPrice,
				category: $routeParams.category.split('=')[1] ? [] : $routeParams.category,
				colors: $scope.selectedColors.toString(),
				room_type: $location.path().split('room=(')[1] ? $location.path().split('room=(')[1].split(');')[0] : '',
				'subcategory[]': !$routeParams.subcategory || $routeParams.subcategory && $routeParams.subcategory.split('=')[1] ? [] : [$routeParams.subcategory]
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
					var bLink = !!$location.path().split('='),
						sLink = $location.path().split('/').pop()
					;
					if ($scope.searchOptions['subcategory[]'].length === 1){
						$location.url('catalog/' + $scope.searchOptions.category + '/' +
							$scope.searchOptions['subcategory[]'] + (bLink ? '/' + sLink : ''));
					} else {
						$location.url('catalog/' + $scope.searchOptions.category + sLink);
					}
				}
			});

			$scope.getCatalog();
		};

		$scope.getCatalog = function(){
			$scope.$parent.showLoader = true;
			CatalogService.getCatalog({
				category: $routeParams.category && $routeParams.category.split('=')[1] ? [] : $routeParams.category,
				subcategory: $routeParams.subcategory && $routeParams.subcategory.split('=')[1] ? [] : $routeParams.subcategory
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

		$scope.baseValueChange = function(baseValue) {
			$scope.selectedColors = CatalogHashService.getColors($scope.colorCollection);
			$scope.searchOptions.colors = $scope.selectedColors.toString();
			var roomLink = $location.path().split('room=(')[1] ? 'room=(' + $location.path().split('room=(')[1].split(');')[0] + ');' : '';
			if (!_.isEmpty($scope.selectedColors))
			{
				$scope.hash = roomLink + 'colors=(' + $scope.selectedColors.toString() + ');';
			} else {
				$scope.hash = roomLink + '';
			}
			if ($location.path().split('=')[1])
			{
				var aLinks = $location.path().split('/'),
					fullLink = ''
				;
				aLinks.pop();
				_.each(aLinks, function(slink){
					fullLink += slink + '/';
				});
				$location.path(fullLink + $scope.hash);
			} else {
				$location.path($location.path() + '/' + $scope.hash);
			}
		}

		$scope.init();

		

		// if ($scope.selectedColors.length > 0){
		// 	_.each($scope.selectedColors, function(oColor){
		// 		$scope.filterColor[oColor]['selected'] = true;
		// 	});
		// }
	}

})();
