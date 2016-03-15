(function () {
	'use strict';
	angular.module('configService', []).
	factory('ConfigService', [
		configService
	]);

	function configService() {
		var config = angular.extend({}, {
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productHomeListPath: 'productList.json',
			productSeeAlsoListPath: 'similarGoods.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			catalogPath: 'catalog.json',
			constructorTexturesPath: 'textures.json',
			texturesPath: 'textures.json',
			reviewsPath: 'reviews.json',
			newReviewPath: 'review-post-response.json',
			newsPath: 'news.json',
			searchPath: 'search.json',
			minPrice: 0,
			maxPrice: 99999,
			serverTime: 'serverTime.json',
			openHour: 9,
			closeHour: 21,
			callMe: 'call-me.json',
			orderPath: 'order.json',
			feedbackPath: 'feedback.json',
			structurePath: 'structure.json',
			homeArticleSlug: 'trends',
			homeArticlePath: 'mainPageAds.json',
			
		}, window.appLicationConfig);
		return config;
	}
})();
