(function() {
	'use strict';

	function authService($http, $state, LocalService, $rootScope) {
		return {
			login: function (credentials) {

				var login = $http.post(CONFIG.api_url + 'auths/login', credentials);
				login.success(function (result) {

					// Store user's informations on localstorage
					LocalService.set('user_id', result.id);
					LocalService.set('user_email', result.auth.email);
					LocalService.set('user_firstname', result.firstname);
					LocalService.set('user_lastname', result.lastname);
					LocalService.set('user_country', result.country);

					$http.post(CONFIG.api_url + 'users/jwt', {withCredentials: true, data: credentials})
						.success(function (data) {
							LocalService.set('cnco_token', data.token);
							$rootScope.$broadcast('login-success-event', data);
							$state.go('root.homepage');

						})
						.error(function (data, err) {
							console.log(data);
							alert(err);
						});


				});

				return login;

			},
			resetPassword : function(toSend, callback) {

				var reset = $http.post(CONFIG.api_url + 'auths/reset', toSend);

				console.log(CONFIG.api_url + 'auths/reset');
				console.log(toSend);

				reset.success(function (data) {
					callback(null, data);
				})
					.error(function (data, err) {

						var error = {
							data: data,
							err : err
						};
						callback(error, null);

					})

			},
			logout: function() {

				LocalService.clear();

			}
		};
	}

	angular.module('common.services.auth', [])
		.factory('AuthService',['$http', '$state', 'LocalService', '$rootScope', authService]);
})();
