(function() {
  'use strict';

  function fileService () {
    var file;
    var fileService = {};

    fileService.getFile = function () {
      return file;
    };

    fileService.setFile = function (newFile) {
      file = newFile;
    };

    return fileService;
  }

  angular.module('common.services.fileservice', [])
    .factory('FileService', fileService);

})();
