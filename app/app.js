var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
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
