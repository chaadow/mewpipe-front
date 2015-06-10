(function() {
	'use strict';

	function authInterceptor($q, $injector) {
		return {
			request: function (config) {
				var LocalService = $injector.get('LocalService');
				var token;

				if (LocalService.get('mewpipe_token')) {
					//token = angular.fromJson(LocalService.get('cnco_token'));
					token = LocalService.get('mewpipe_token');
        }
				if (token) {
					config.headers.Authorization = token;
				}



        return config;
			},
			responseError: function (response) {
				if (response.status === 401 || response.status === 403) {
					//LocalService.unset('access_token');
					//$injector.get('$state').go('global-landing');
				}
				if (response.status === 404) {

				}
				return $q.reject(response);
			}
		};
	}

	angular.module('common.interceptors.auth', ['common.services.localstorage'])
		.factory('AuthInterceptor', ['$q', '$injector', authInterceptor]);
})();
