var app = angular.module('myApp', [
		'ngMeta',
		'ngRoute',
		'ngTouch',
		'ngSVGAttributes',
		'mainCtrl',
		'homeCtrl',
		'dialogCtrl',
		'articleCtrl',
		'catalogCtrl',
		'searchCtrl',
		'orderCtrl',
		'feedbackCtrl',
		'trendCtrl',
		'constructorPageCtrl',
		'productPageCtrl',
		'cartDirective',
		'constructorPreviewDirective',
		'checkboxDirective',
		'textureDirective',
		'hiderDirective',
		'offCanvasDirective',
		'responsiveDirective',
		'parallaxDirective',
		'questionDirective',
		'articlePreviewDirective',
		'dialogDirective',
		'colorDirective',
		'rangeDirective',
		'seoDirective',
		'youtube-embed',
		'ngDropdowns',
		'angular-input-stars',
		'angular-owl-carousel',
		'LocalStorageModule'
	])
	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider, ngMeta) {
			'use strict';
			$locationProvider.html5Mode(false);
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/', {
					controller: 'HomeCtrl',
					templateUrl: 'views/home.html',
					meta: {
						title: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						description: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?'
					}
				})
				.when('/article/:slug', {
					controller: 'ArticleCtrl',
					templateUrl: 'views/article.html'
				})
				.when('/search/:term', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false
				})
				.when('/catalog/:category', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false
				})
				.when('/catalog/:category/:subcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false
				})
				.when('/product/:category/:subcategory/:product', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html',
					reloadOnSearch: false
				})
				.when('/product/:category/:subcategory/:product/:texture', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html',
					reloadOnSearch: false
				})
				.when('/constructor', {
					controller: 'ConstructorPageCtrl',
					templateUrl: 'views/constructor.html',
					meta: {
						title: 'Конструктор жалюзи и штор онлайн. Сити Жалюзи.',
						description: 'При помощи нашего конструктора вы можете легко подобрать шторы или жалюзи не выходя из дома.'
					}
				})
				.otherwise({
					redirectTo: '/'
				});
		}
	]).run(['ngMeta', function(ngMeta) { ngMeta.init(); }]);

app.constant('API_PATH', 'data/');