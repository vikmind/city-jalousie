(function () {
	'use strict';
	angular.module('searchCtrl', ['searchService', 'dialogService'])
		.controller('SearchCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'SearchService',
			'DialogService',
			searchCtrl
		]);

	function searchCtrl($rootScope, $scope, $log, SearchService, DialogService) {
		/*$log.log('search ctrl');*/

		$scope.init = function () {
			$scope.term = '';
			$scope.loading = false;
			$scope.nothing = false;
			$scope.$watch('term', function(){
				if ($scope.term.length > 3){
					$scope.search();
				} else {
					$scope.results = [];
				}
			});
		};

		$scope.search = function(e){
			if (e) e.preventDefault();
			$scope.loading = true;
			SearchService.find($scope.term)
				.then(function(data){
					$scope.results = data;
					$scope.nothing = !(data.length > 0);
					$scope.loading = false;
					$log.log(data);
				}, function(err){
					$log.log(err);
					$scope.nothing = true;
					$scope.loading = false;
				});
				return false;
		};

		$scope.clickResult = function(){
			DialogService.setState(false);
		};

		$scope.init();
	}

})();
