(function() {
	'use strict';

	/**
	 * @name  config
	 * @description config block
	 */
	function config($stateProvider) {
		$stateProvider
			.state('root.error404', {
				url: '404',
				views: {
					'@': {
						templateUrl: 'src/app/error/404/error404.tpl.html',
						controller: 'Error404Ctrl as 404'
					}
				}
			});
	}

	/**
	 * @name  error404Ctrl
	 * @description Controller
	 */
	function Error404Ctrl($log) {

	}

	angular.module('error404', [])
		.config(config)
		.controller('Error404Ctrl', Error404Ctrl);
})();
