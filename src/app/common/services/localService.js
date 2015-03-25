(function() {
	'use strict';

	function localService () {
		return {
			get: function (key) {
				return localStorage.getItem(key);
			},
			set: function (key, val) {
				return localStorage.setItem(key, val);
			},
			unset: function (key) {
				return localStorage.removeItem(key);
			},
			clear: function () {
				return localStorage.clear();
			}
		};
	}

	angular.module('common.services.localstorage', [])
	.factory('LocalService', localService);

})();
