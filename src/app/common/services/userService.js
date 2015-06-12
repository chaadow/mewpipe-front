(function() {
	'use strict';

	function userService($http,Upload) {
		return {


			//TODO
			get: function() {
				var user = $http.get(CONFIG.api_url + 'user/');

				var res = {};

				user.
					success(function (data) {
						res = data;
					})
					.error(function (err, data) {
						res = {err: err, data: data};
					});

				return user;
			},
			set: function(user, profilePicture, callback) {



        //var create = $http.post(CONFIG.api_url + 'users/', user);


        var create = Upload.upload({
                    url: CONFIG.api_url + 'users/',
                    method: 'POST',
                    fields: user,
                    file: profilePicture,
                    fileFormDataName: 'avatar'
                });

        create.success(function(data, status, headers, config) {
					callback(null, data);
				})
					.error(function(data, error) {
						callback(data, null);
					});

			},
			update: function(toSend, profilePicture, callback) {

				var updateUser = Upload.upload({
					url: CONFIG.api_url + 'users/'+ toSend.id,
					method: 'PUT',
					fields: toSend,
					file: profilePicture,
          fileFormDataName: 'avatar'
				});

				updateUser.success(function(data, status, headers, config) {
					callback(null, data);
				})
					.error(function(data, error) {
						callback(data, null);
					});

			},
			destroy: function(userId) {
        return $http.delete(CONFIG.api_url + 'users/' + userId);
      },
			getOne: function(userId, callback) {
				var user = $http.get(CONFIG.api_url + 'users/' + userId);

				var res = {};

				user.
					success(function (data) {
						res = data;
						callback(null, data);
					})
					.error(function (err, data) {
						res = {err: err, data: data};
						callback(data, null);
					});

			}
		};
	}

	angular.module('common.services.user', ['ngFileUpload'])
		.factory('UserService', ['$http', 'Upload', userService]);
})();
