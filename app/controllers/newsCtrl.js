(function () {
	'use strict';
	angular.module('newsCtrl', ['newsService'])
		.controller('NewsCtrl', [
			'$scope',
			'$log',
			'NewsService',
			newsCtrl
		]);

	function newsCtrl($scope, $log, NewsService) {
		/*$log.log('news ctrl');*/

		var url = $scope.url;

		$scope.init = function () {
			$scope.news = [];
			$scope.currentNews = 0;
			$scope.getNews();
		};

		$scope.getNews = function(){
			NewsService.getNews()
				.then(function(data) {
					if (data.length > 0){
						$scope.news = data;
						$scope.news[0].active = true;
					}
				}, function(err) {
					$log.log(err)
				});
		};

		$scope.init();
	}

})();
