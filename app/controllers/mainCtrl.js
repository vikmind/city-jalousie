(function () {
	'use strict';
	angular.module('mainCtrl', ['dialogService', 'timeService'])
		.controller('MainCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'$timeout',
			'$sce',
			'DialogService',
			'TimeService',
			'ResponsiveService',
			mainCtrl
		]);

	function mainCtrl($rootScope, $scope, $log, $timeout, $sce, DialogService, TimeService, ResponsiveService) {
		/*$log.log('main ctrl');*/
		$scope.filterOpened = false;
		$scope.showLoader = true;
		$scope.constructorHeader = false;
		$scope.productHeader = false;
		$scope.titleHeaderClass = '';
		$scope.workingHours = TimeService.getWorkingHours();
		$scope.blockContent = '';
		$scope.touchElement = ResponsiveService.getState('tabletPortrait');
		$scope.blockContentHtml = '';
		$scope.$watch('blockContent', function(){
			$scope.blockContentHtml = $sce.trustAsHtml($scope.blockContent);
		});

		$scope.init = function(){
			$(function () {
				svg4everybody({
					fallback: function (src, svg, use) {
						var className = $(svg).attr('class');
						$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
					}
				});
			});
			TimeService.logCurrentTime();
			$scope.showLoader = false;
		};

		$scope.openSearch = function(){
			DialogService.setState('search');
		};
		$scope.openFeedback = function(){
			DialogService.setState('feedback');
		};
		$scope.openCallme = function(){
			DialogService.setState('callme');
		};

		$scope.toggleOffCanvas = function(side){
			side = side || 'left';
			if ($scope.offCanvasSide !== side){
				$scope.offCanvasSide = side;
			} else {
				$scope.offCanvasSide = null;
			}
		};

		$scope.refreshRange = function () {
			$timeout(function () {
				$scope.$broadcast('rzSliderForceRender');
			});
		};

		$scope.onClickRange = function(){
			$scope.togglePricePopup = !$scope.togglePricePopup;
			$scope.toggleColorsPopup = false;
			$scope.refreshRange();
		};

		$scope.onClickColor = function(){
			$scope.toggleColorsPopup = !$scope.toggleColorsPopup;
			$scope.togglePricePopup = false;
		}

		$scope.$on('ResponsiveService.updateState', function(){
			if ($scope.offCanvasSide){
				if (ResponsiveService.getState('tablet') || ResponsiveService.getState('desktop')){
					$scope.$apply(function(){
						$scope.toggleOffCanvas($scope.offCanvasSide);
					});
				}
			}
			if (ResponsiveService.getState('tabletPortrait'))
			{
				$scope.touchElement = true;
			} else {
				$scope.touchElement = false;
			}
		});

		$rootScope.$on('$locationChangeStart', function (){
			$scope.showLoader = true;
		});

		$rootScope.$on('$locationChangeSuccess', function () {
			if ($scope.offCanvasSide){
				$scope.toggleOffCanvas($scope.offCanvasSide);
			}
			$scope.showLoader = false;
		});

		$scope.$on('$routeChangeSuccess', function () {
		    window.scrollTo(0, 0);
		});

		$scope.init();
	}

})();
