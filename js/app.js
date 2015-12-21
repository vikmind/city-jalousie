var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
		'colorDirective',
		'angular-owl-carousel'
	])
	.config([
		function(){
			console.log('config');
		}
	])
	.run([
		function(){
			console.log('run');
		}
	]);

app.constant('API_PATH', 'data/');

(function () {
	'use strict';
	angular.module('benefitsCtrl', ['benefitsService'])
		.controller('BenefitsCtrl', [
			'$scope',
			'$log',
			'BenefitsService',
			benefitsCtrl
		]);

	function benefitsCtrl($scope, $log, BenefitsService) {
		$log.log('benefits ctrl');

		var url = $scope.url;

		$scope.init = function () {
			$scope.getBenefits(url);
		};

		$scope.getBenefits = function (url) {
			BenefitsService.getBenefits(url)
				.then(function (data) {
					// Success
					$scope.benefits = data;
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.init();
	}

})();

(function () {
	'use strict';
	angular.module('homeCtrl', ['benefitsDirective'])
		.controller('HomeCtrl', [
			'$scope',
			'$log',
			homeCtrl
		]);

	function homeCtrl($scope, $log) {
		$log.log('home ctrl');

		$scope.bigSliderItems = [
			'img/slide-1.jpg'
		];

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.catalogData = {};
	}

})();

(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout) {
		$log.log('main ctrl');
		$log.log($scope);
		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

	}

})();

(function () {
	'use strict';

	angular.module('benefitsDirective', ['benefitsCtrl'])
		.directive('benefits', [
			benefitsDirective
		]);

	function benefitsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/benefits.html',
			controller: 'BenefitsCtrl',
			scope: {
				title: '@',
				url: '@',
				id: '@'
			},
			replace: true,
			link: benefitsDirectiveLink
		};
	}

	function benefitsDirectiveLink(scope, el, attr) {
		attr.url = attr.url || '#';
	}
})();

(function () {
	'use strict';

	angular.module('colorDirective', [])
		.directive('color', [
			colorDirective
		]);

	function colorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/color.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				fill: '@',
				name: '@',
				value: '@'
			},
			replace: true,
			link: colorDirectiveLink
		};
	}

	function colorDirectiveLink(scope, el, attr) {

	}
})();

(function () {
	'use strict';
	angular.module('benefitsService', []).
	factory('BenefitsService', [
		'API_PATH',
		'$http',
		'$q',
		benefitsService
	]);

	function benefitsService(API_PATH, $http, $q) {
		var service = {
			getBenefits: getBenefits
		};
		return service;

		function getBenefits(apiUrl) {
			var url = API_PATH + apiUrl,
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);

				})
				.error(function (res, errCode) {
					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}
	}
})();

//# sourceMappingURL=../js/app.js.map