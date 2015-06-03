(function() {
	'use strict';

	function ngFileSelectDirective(FileService) {
		return {
			link: function ($scope, el, attrs) {

				el.bind("change", function (e) {

					$scope.file = (e.srcElement || e.target).files[0];

					FileService.setFile((e.srcElement || e.target).files[0]);


					$scope.getFile(attrs.needCrop);
				})

			}
		};
	}

	angular.module('common.directives.ngfileselect', [])
		.directive('ngFileSelect', ngFileSelectDirective);
})();
