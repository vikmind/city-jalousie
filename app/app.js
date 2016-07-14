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
						description: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg',
					}
				})
				.when('/article/:slug', {
					controller: 'ArticleCtrl',
					templateUrl: 'views/article.html',
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/search/:term', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/catalog', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/catalog/:category', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/catalog/:category/:subcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/catalog/:category/:subcategory/:searchtype', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/product/:category/:subcategory/:product', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/product/:category/:subcategory/:product/:texture', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html',
					reloadOnSearch: false,
					meta: {
						ogUrl: 'https://city-jaluzi.ru',
						ogTitle: 'Сити Жалюзи: Производство и продажа жалюзи, штор, ворот.',
						ogDescription: 'Все, что вы бы хотели спросить о жалюзи: где купить жалюзи в Москве на 18% дешевле?',
						ogImage: 'https://city-jaluzi.ru/img/fb.jpg'
					}
				})
				.when('/constructor', {
					controller: 'ConstructorPageCtrl',
					templateUrl: 'views/constructor.html',
					meta: {
						title: 'Конструктор жалюзи и штор онлайн. Сити Жалюзи.',
						description: 'При помощи нашего конструктора вы можете легко подобрать шторы или жалюзи не выходя из дома.',
						ogUrl: 'https://design-okna.ru/#!/constructor',
						ogTitle: 'Онлайн конструктор жалюзи и штор',
						ogDescription: 'Приложите жалюзи и шторы к вашему окну в реальном времени, выберите цвет и материал.',
						ogImage: 'https://design-okna.ru/img/fbcon.jpg'
					}
				})
				.otherwise({
					redirectTo: '/'
				});
		}
	]).run(['ngMeta', function(ngMeta) { ngMeta.init(); }])
	.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
		var original = $location.path;
		$location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};
	}]);

app.constant('API_PATH', 'data/');