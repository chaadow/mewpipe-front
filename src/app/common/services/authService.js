(function() {
	'use strict';

	function authService($http, $state, LocalService, $rootScope) {
		return {
			login: function (credentials) {

				var login = $http.post(CONFIG.api_url + 'login', credentials);
				login.success(function (result) {

					LocalService.set('user_id', result.session.user_id);
					LocalService.set('user_email', result.session.email);
					LocalService.set('user_firstname', result.session.firstname);
					LocalService.set('user_lastname', result.session.lastname);
          LocalService.set('user_avatar', result.session.avatar);
          LocalService.set('mewpipe_token', result.session.token);
          LocalService.set('isLogged', true);
          LocalService.set('admin', result.session.admin);
				});

				return login;

			},
			logout: function() {
				LocalService.clear();
			}
		};
	}

	angular.module('common.services.auth', [])
		.factory('AuthService',['$http', '$state', 'LocalService', '$rootScope', authService]);
})();
