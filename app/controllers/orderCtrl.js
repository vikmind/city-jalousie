(function () {
	'use strict';
	angular.module('orderCtrl', ['cartService', 'dialogService', 'timeService', 'configService'])
		.controller('OrderCtrl', [
			'$scope',
			'$log',
			'CartService',
			'DialogService',
			'TimeService',
			'ConfigService',
			'ResponsiveService',
			orderCtrl
		]);

	function orderCtrl($scope, $log, CartService, DialogService, TimeService, ConfigService, ResponsiveService ) {
		/*$log.log('order ctrl');*/

		$scope.init = function() {
			$scope.context = DialogService.getState();
			$scope.mobile = ResponsiveService.getState('mobileLandscape');
			if ($scope.context === 'oneclick'){
				$scope.products = [CartService.getOneClick()];
			} else {
				$scope.products = CartService.getProducts();
			}
			$scope.hours = [];
			for (var i = ConfigService.openHour; i < ConfigService.closeHour; i++) {
				$scope.hours.push({
					id: i,
					label: ((i<10) ? ('0'+i) : i.toString()) + ' ч'
				});
			}
			$scope.minutes = [];
			for (var i = 0; i < 60; i+=15) {
				$scope.minutes.push({
					id: i,
					label: ((i<10) ? ('0'+i) : i.toString()) + ' м'
				});
			}
			$scope.order = {
				phone: '',
				name: '',
				hour: $scope.hours[0],
				min: $scope.minutes[0]
			};
			$scope.state = {
				complete: false,
				loading: false
			};
			$scope.workingTime = TimeService.isWorkingTime();
		};

		$scope.phoneFocus = function() {
			if ($scope.order.phone === ''){
				$scope.order.phone = '+7';
			}
		};

		$scope.$watch('order.phone', function(){
			if ($scope.order.phone.length > 12){
				$scope.order.phone = $scope.order.phone.substr(0, 12);
			}
		});

		$scope.submitForm = function() {
			var params = {};
			$scope.state.loading = true;
			angular.extend(params, {context: $scope.context}, $scope.order);
			if(params.context === 'callme'){
				CartService.submitCallMe(params)
					.then(function(data){
						$scope.state.loading = false;
						$scope.state.complete = true;
					}, function(err){
						$scope.state.loading = false;
					});
			} else {
				CartService.submitOrder(params)
					.then(function(data){
						$scope.state.loading = false;
						$scope.state.complete = true;
					}, function(err){
						$scope.state.loading = false;
					});
			}
			
		};

		$scope.$on('ResponsiveService.updateState', function(){
			$scope.$apply(function(){
				$scope.mobile = ResponsiveService.getState('mobileLandscape');
			});
		});

		$scope.init();
	}

})();
