(function () {
	'use strict';

	var CONFIG = {
		dev: {
			api_url: 'http://localhost:1337/'
		},
		devIE8: {
			api_url: 'http://192.168.0.149:1337/'
		},
		preprod: {
			api_url: ''
		},
		prod: {
			api_url: ''
		}
	};

	//Overriding with the desired config
	CONFIG = CONFIG['dev'];

	angular.module('common.constants.config', [])
		.constant('CONFIG', CONFIG);

})();
