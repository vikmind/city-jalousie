(function () {
	'use strict';
	angular.module('productPageCtrl', ['texturesService', 'productService', 'cartService', 'dialogService', 'configService', 'reviewsDirective'])
		.controller('ProductPageCtrl', [
			'ngMeta',
			'$scope',
			'$log',
			'youtubeEmbedUtils',
			'$location',
			'$routeParams',
			'TexturesService',
			'ProductService',
			'CartService',
			'DialogService',
			'ConfigService',
			'$sce',
			'$timeout',
			'ResponsiveService',
			productPageCtrl
		]);

	function productPageCtrl(ngMeta, $scope, $log, youtubeEmbedUtils, $location, $routeParams,
		TexturesService, ProductService, CartService, DialogService, ConfigService,
		$sce, $timeout, ResponsiveService) {
		/*$log.log('product page ctrl');*/
		$scope.$parent.titleHeaderClass = 'product';
		$scope.init = function () {
			$scope.toggleMobilePopup = false;
			$scope.priceSlider = null;
			$scope.$parent.constructorHeader = false;
			$scope.$parent.productHeader = true;
			$scope.catalogItems = [];
			$scope.product = {};
			$scope.product.dimensions = {};
			$scope.product.allowHeight = true;
			$scope.product.withCornice = false;
			$scope.product.priceExactly = false;
			$scope.minPrice = ConfigService.minPrice;
			$scope.maxPrice = ConfigService.maxPrice;
			$scope.texturePrice = {
				min: $scope.minPrice,
				max: $scope.maxPrice,
			};
			$scope.textureColors = {};
			$scope.gallery = {};
			$scope.gallery.currentImage = -1;
			$scope.gallery.previewImage = '';
			$scope.textureModel = null;
			$scope.previewTextureModel = null;
			$scope.textures = [];
			$scope.desktop = ResponsiveService.getState('desktop');
			$scope.mobile = ResponsiveService.getState('mobileLandscape');
			$scope.getProduct();
		};

		$scope.calcPrice = function(){
			var p = $scope.product;
			if ($scope.currentTexture){
				if ($scope.product.allowHeight){
					if (!!p.dimensions.width && !!p.dimensions.height){
						p.priceExactly = true;
						if (p.withCornice){
							p.price = parseInt($scope.currentTexture.price) * p.dimensions.width * 0.0001 * p.dimensions.height + parseInt(p.cornice.price);
						} else {
							p.price = parseInt($scope.currentTexture.price) * p.dimensions.width * 0.0001 * p.dimensions.height;
						}
					} else {
						p.priceExactly = false;
						if (p.withCornice){
							p.price = parseInt($scope.currentTexture.price) + parseInt(p.cornice.price);
						} else {
							p.price = parseInt($scope.currentTexture.price);
						}
					}
				} else {
					if (!!p.dimensions.width){
						p.priceExactly = true;
						if (p.withCornice){
							p.price = parseInt($scope.currentTexture.price) * p.dimensions.width * 0.01 + parseInt(p.cornice.price);
						} else {
							p.price = parseInt($scope.currentTexture.price) * p.dimensions.width * 0.01;
						}
					} else {
						p.priceExactly = false;
						if (p.withCornice){
							p.price = parseInt($scope.currentTexture.price) + parseInt(p.cornice.price);
						} else {
							p.price = parseInt($scope.currentTexture.price);
						}
					}
				}
			}
		};

		var getTexturesPrices = function(list){
			var priceArray = _.pluck(list, 'price');
			$scope.minPrice = _.min(priceArray);
			$scope.maxPrice = _.max(priceArray);
			$scope.resetSlider();
			updateTextures(list);
		};

		var updateTextures = function(list){
			// Success
			if (list.length > 0){
				var category = $routeParams.category,
					subcategory = $routeParams.subcategory,
					product = $routeParams.product,
					texture = $routeParams.texture,
					oHash = $location.path().split('texture='),
					hash = !!oHash[1] ? oHash[1] : '',
					currentTexture = TexturesService.getTextureBySlug(hash) || {
						id: list[0].id
					},
					currentId = currentTexture.id
				;
				$scope.textures = list;
				$scope.textureModel = currentId;
				$scope.showAllTextures = false;


				$scope.$watch('textureModel', function (newVal) {
					if (newVal !== "-1") {
						$scope.getTextureById(newVal);
						var aLinks = $location.path().split('/'),
							fullLink = ''
						;
						aLinks.pop();
						_.each(aLinks, function(slink){
							fullLink += slink + '/';
						});
						$location.path(fullLink + 'texture=' + $scope.currentTexture.slug, false);
						$scope.gallery.previewImage = null;
						$scope.calcPrice();
					}
				});
				$scope.$watch('previewTextureModel', function (newVal) {
					if (newVal) {
						$scope.gallery.previewImage = TexturesService.getTextureById(newVal).img;
					} else {
						$scope.gallery.previewImage = null;
					}
				});
				$scope.$watch('product.withCornice', $scope.calcPrice);
			}
		};

		$scope.getProduct = function () {
			$scope.totalColors = 0;
			ProductService.getProduct({
				category: $routeParams.category && $routeParams.category.split('=')[1] ? '' : $routeParams.category,
				subcategory: $routeParams.subcategory && $routeParams.subcategory.split('=')[1] ? '' : $routeParams.subcategory,
				slug: $routeParams.product
				// hash: $location.path.split('=')[1] ? [0]$location.search(),
			}).then(function (data) {
				// Success
				$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
				$scope.product = data;
				ngMeta.setTag('description', data.description.text);
				ngMeta.setTitle(data.title + '. Сити жалюзи.');
				$scope.product.allowHeight = data.isHeightVisible;
				$scope.totalColors = data.colors;
				$scope.product.cornice.cartText = data.cornice.text;
				$scope.product.cornice.text = $sce.trustAsHtml(data.cornice.text);
				$scope.product.cornice.description = $sce.trustAsHtml(data.cornice.description);
				$scope.product.description.text = $sce.trustAsHtml(data.description.text);
				$scope.product.construction.text = $sce.trustAsHtml(data.construction.text);
				$scope.product.dimensions = {};
				$scope.product.withCornice = false;
				$scope.product.priceExactly = false;
				$scope.gallery.currentImage = 0;
				$scope.getTextures();
				$scope.$parent.headerImage = data['image_slider'];
			}, function (err) {
				// Error
				$log.log(err);
			});
		};

		$scope.addToCart = function(){
			$scope.product.texture = $scope.currentTexture.model;
			$scope.product.title = $scope.product.product_name;
			CartService.addProduct($scope.product);
		};

		$scope.buyOneClick = function() {
			$scope.product.texture = $scope.currentTexture.model;
			CartService.addOneClick($scope.product);
			DialogService.setState('oneclick');
		};

		$scope.getTextures = function () {
			TexturesService.getTextures({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				slug: $routeParams.product
			}).then(function (data) {
				getTexturesPrices(data);
				$scope.getProducts();
			}, function (err) {
				// Error
				$log.log(err);
			});
		};

		$scope.getProducts = function(){
			ProductService.getSeeAlsoList({
				productId: $scope.product.id
			}).then(function(data){
				$scope.catalogItems = data.slice(0, $scope.desktop ? 4 : 3);
			}, function(err){
				$log.log(err);
			});
		};

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};

		$scope.showConstruction = function(e) {
			DialogService.setImage($scope.product.construction.scheme);
			DialogService.setState('picture');
		};

		// Textures
		$scope.getTextureById = function (id) {
			$scope.currentTexture = TexturesService.getTextureById(id);
		};

		$scope.filterTextures = function(){
			if ($scope.textures.length > 0){
				var colors = $scope.textureColors2;
				var price_min = $scope.texturePrice.min
				var price_max = $scope.texturePrice.max
				var textures = TexturesService.filterTextures(function(item){
					return (item.price <= price_max) &&
						(item.price >= price_min) &&
						((colors.length) ? _.include(colors, item.color) : true);
				});
				updateTextures(textures);
			}
		};

		$scope.resetSlider = function(){
			$scope.priceSlider = {
				min: $scope.minPrice,
				max: $scope.maxPrice,
				options: {
					floor: $scope.minPrice,
					ceil: $scope.maxPrice
				}
			};
			$scope.texturePrice.min = $scope.priceSlider.min;
			$scope.texturePrice.max = $scope.priceSlider.max;
			$scope.filterTextures();
		};

		$scope.$on('rangeDirective.updateRangeSlider', function(e){
			$scope.texturePrice.min = $scope.priceSlider.min;
			$scope.texturePrice.max = $scope.priceSlider.max;
			$scope.filterTextures();
		});

		$scope.$on('ResponsiveService.updateState', function(){
			$scope.$apply(function(){
				$scope.desktop = ResponsiveService.getState('desktop');
				$scope.mobile = ResponsiveService.getState('mobileLandscape');
			});
		});

		$scope.$watchCollection('textureColors', function(){
			$scope.textureColors2 = _.reduce($scope.textureColors, function(result, n, key){
				if (n === true) result.push(key);
				return result;
			}, []);
			$scope.filterTextures();
		});

		$scope.moveGallery = function(direction){
			var position = $scope.gallery.currentImage + direction;
			if (position >= $scope.product.gallery.length){
				position = 0;
			} else if (position < 0){
				position = $scope.product.gallery.length - 1;
			}
			$scope.gallery.currentImage = position;
		};

		$scope.clearTextureColor = function(){
			$scope.textureColors = {};
			$scope.$parent.toggleColorsPopup = false;
		};

		$scope.clearMobileTextureColor = function(){
			$scope.textureColors = {};
			$scope.toggleMobilePopup = false;
		};

		$scope.mobileFilterMenu = function () {
			$scope.toggleMobilePopup = !$scope.toggleMobilePopup;
			$scope.$parent.filterOpened = !$scope.$parent.filterOpened;
		};

		$scope.init();
	}

})();
