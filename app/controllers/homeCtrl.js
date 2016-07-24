(function () {
	'use strict';
	angular.module('homeCtrl', ['benefitsDirective', 'productService', 'productCtrl', 'newsDirective', 'configService', 'catalogHashService', 'ngMeta'])
		.controller('HomeCtrl', [
			'$rootScope',
			'$scope',
			'$location',
			'$log',
			'ProductService',
			'ConfigService',
			'ResponsiveService',
			'CatalogHashService',
			homeCtrl
		]);

	function homeCtrl($rootScope, $scope, $location, $log, ProductService, ConfigService, ResponsiveService, CatalogHashService) {
		/*$log.log('home ctrl');*/
		$scope.colorCollection = [];
		$scope.init = function() {
			$scope.$parent.titleHeaderClass = 'home';
			$scope.$parent.headerImage = '';
			$scope.$parent.constructorHeader = false;
			$scope.$parent.productHeader = false;
			$scope.showLoadMoreBtn = true;
			$scope.catalogItems = [];
			$scope.featuredProduct = [];
			$scope.featuredArticle = ConfigService.homeArticleSlug;
			$scope.desktop = ResponsiveService.getState('desktop');
			$scope.getFeaturedProduct();
			$scope.getProductList();
			$scope.colorHash = [];
			$scope.colorCollection = JSON.parse(JSON.stringify(window.oStaticData['colors']));
		};

		$scope.getProductList = function () {
			ProductService.getHomeList({skip: $scope.catalogItems.length, count: 8, mainPage: true})
				.then(function (data) {
					// Success
					if (data.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						Array.prototype.push.apply($scope.catalogItems, data.items);
					}
					$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.getFeaturedProduct = function() {
			ProductService.getFeatured()
				.then(function(data) {
					$scope.featuredProduct = data;
				}, function(err) {
					$log.log(err)
				});
		};

		$scope.$on('ResponsiveService.updateState', function(){
			$scope.$apply(function(){
				$scope.desktop = ResponsiveService.getState('desktop');
			});
		});

		$scope.baseValueChange = function(baseValue) {
			$scope.selectedColors = CatalogHashService.getColors($scope.colorCollection);
			if (!_.isEmpty($scope.selectedColors))
			{
				$scope.colorHash = '/colors=(' + $scope.selectedColors.toString() + ');';
			} else {
				$scope.colorHash = '';
			}
		};

		$scope.goToHref = function(e, link){
			e.preventDefault();
			$location.url('/catalog' + link);
		};

		$scope.init();
	}

})();
