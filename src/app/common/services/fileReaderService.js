(function() {
	'use strict';

	function fileReader ($q, $log) {

		var onLoad = function(reader, deferred, scope) {
			return function () {
				scope.$apply(function () {
					deferred.resolve(reader.result);
				});
			};
		};

		var onError = function (reader, deferred, scope) {
			return function () {
				scope.$apply(function () {
					deferred.reject(reader.result);
				});
			};
		};

		var onProgress = function(reader, scope) {
			return function (event) {
				scope.$broadcast('fileProgress',
					{
						total: event.total,
						loaded: event.loaded
					});
			};
		};

		var getReader = function(deferred, scope) {
			var reader = new FileReader();
			reader.onload = onLoad(reader, deferred, scope);
			reader.onerror = onError(reader, deferred, scope);
			reader.onprogress = onProgress(reader, scope);
			return reader;
		};

		var readAsDataURL = function (file, scope) {
			var deferred = $q.defer();

			var reader = getReader(deferred, scope);
			reader.readAsDataURL(file);

			return deferred.promise;
		};

		var dataURItoBlob = function(dataURI) {
			var byteString = atob(dataURI.split(',')[1]);
			var ab = new ArrayBuffer(byteString.length);
			var ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: 'image/jpeg' });
		};

		return {
			readAsDataUrl: readAsDataURL,
			dataURIToBlob: dataURItoBlob
		};

	}

	angular.module('common.services.filereader', [])
		.factory('FileReader', fileReader);

})();
