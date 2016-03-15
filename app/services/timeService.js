(function () {
	'use strict';
	angular.module('timeService', ['configService']).
	factory('TimeService', [
		'$rootScope',
		'ConfigService',
		'API_PATH',
		'$http',
		'$q',
		timeService
	]);

	function timeService($rootScope, ConfigService, API_PATH, $http, $q) {
		var 
			time,
			storeTime = new Date()
		;
			
		getServerTime().then(function(data) {
			storeTime = new Date(data);
		});

		var logCurrentTime = function(){
			time = new Date();
		};

		var getStoreTime = function(){
			var current = new Date();
			var diff = current - time;
			return new Date(storeTime.getTime() + diff);
		};

		var isWorkingTime = function(){
			var time = getStoreTime();
			if (time.getHours() < ConfigService.closeHour && time.getHours() >= ConfigService.openHour){
				return true;
			} else {
				return false;
			}
		}

		var getWorkingHours = function(){
			return ConfigService.openHour + '-' + ConfigService.closeHour + 'ч';
		}

		var service = {
			logCurrentTime: logCurrentTime,
			getStoreTime: getStoreTime,
			isWorkingTime: isWorkingTime,
			getWorkingHours: getWorkingHours
		};

		function getServerTime() {
			var url = API_PATH + ConfigService.serverTime,
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
		return service;

	}
})();
