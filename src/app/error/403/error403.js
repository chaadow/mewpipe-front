(function() {
	'use strict';

	/**
	 * @name  config
	 * @description config block
	 */
	function config($stateProvider) {
		$stateProvider
			.state('root.error403', {
				url: '403',
				views: {
					'@': {
						templateUrl: 'src/app/error/403/error403.tpl.html',
						controller: 'Error403Ctrl as 403'
					}
				}
			});
	}

	/**
	 * @name  error404Ctrl
	 * @description Controller
	 */
	function Error403Ctrl() {

	}

	angular.module('error403', [])
		.config(config)
		.controller('Error403Ctrl', Error403Ctrl);
})();
