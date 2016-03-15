(function () {
	'use strict';
	angular.module('socialShareService', []).
	factory('SocialShareService', [
		socialShareService
	]);

	function socialShareService() {
		var service = {
			getShareUrl: getShareUrl
		};
		return service;

		function getShareUrl(network, params) {
			var url = '';
			switch(network){
				case 'vk':
					url = 'https://vk.com/share.php' + 
						'?url=' + encodeURIComponent(params.url) +
						'&title=' + encodeURIComponent(params.title) +
						'&description=' + encodeURIComponent(params.description) +
						'&image=' + encodeURIComponent(params.image) +
						'&noparse=true';
				break;
				case 'ok':
					url = 'http://www.ok.ru/dk?st.cmd=addShare&st.s=1' +
						'&st.comments=' + encodeURIComponent(params.description) +
						'&st._surl=' + encodeURIComponent(params.url)
				break;
				case 'fb':
					url = 'http://www.facebook.com/sharer.php?s=100' +
						'&p[title]=' + encodeURIComponent(params.title) +
						'&p[summary]=' + encodeURIComponent(params.description) +
						'&p[url]=' + encodeURIComponent(params.url) +
						'&p[images][0]=' + encodeURIComponent(params.image)
				break;
				default:
				break
			}

			return url;
		}
	}
})();
