(function () {
	'use strict';
	angular.module('reviewsCtrl', ['reviewsService'])
		.controller('ReviewsCtrl', [
			'$scope',
			'$log',
			'ReviewsService',
			reviewsCtrl
		]);

	function reviewsCtrl($scope, $log, ReviewsService) {
		/*$log.log('reviews ctrl');*/

		$scope.init = function () {
			$scope.reviews = {};
			$scope.formData = {};
			$scope.formData.rating = 5;
			$scope.formData.product = $scope.productId;
			$scope.reviewFormVisible = false;
			$scope.formSubmitted = false;
			$scope.showLoadMoreBtn = true;
			$scope.getReviews($scope.productId);
			$scope.allReviews = 0;
		};

		$scope.getReviews = function (product) {
			ReviewsService.getReviews({product:product}, 5)
				.then(function (data) {
					// Success
					$scope.reviews = data;
					$scope.reviews.avg_rounded = Math.round(data.avg_rating);
					$scope.allReviews = data.total;
					if ($scope.allReviews === $scope.reviews.list.length){
						$scope.showLoadMoreBtn = false;
					}
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.toggleReviewForm = function(){
			$scope.reviewFormVisible = !$scope.reviewFormVisible;
		};

		$scope.loadMoreReviews = function(){
			Array.prototype.push.apply(
				$scope.reviews.list,
				ReviewsService.loadReviews($scope.reviews.list.length, 5));
			if ($scope.allReviews === $scope.reviews.list.length){
				$scope.showLoadMoreBtn = false;
			}
		};

		$scope.submitReview = function(){
			/*$log.log($scope.formData);*/
			ReviewsService.submitReview($scope.formData)
				.then(function(data){
					$scope.formSubmitted = true;
				}, function(err){
					$log.log(err);
				});
		};

		$scope.init();
	}

})();
