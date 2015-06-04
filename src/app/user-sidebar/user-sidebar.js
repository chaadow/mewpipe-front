'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', ['$scope', 'FileReader', 'LocalService', 'VideoService',
    function ($scope, FileReader, LocalService, VideoService) {
    var userId = LocalService.get('user_id');
      $scope.confidentiality = 'Public';

      $scope.showFastUploadForm = false;

      $scope.toggleUploadForm = function () {
        if ( !$scope.showFastUploadForm ) {
          $scope.showFastUploadForm = true;
        }else if ( $scope.showFastUploadForm ) {
          $scope.showFastUploadForm = false;
        }
      };


 /*   // Get video file
    $scope.getFile = function () {
      $scope.progressVal = 0;
      FileReader.readAsDataUrl($scope.file, $scope)

        .then(function(result) {
            $scope.videoUploaded = result;
            console.log(result);
        });
    };*/

    $scope.$watch('file', function () {
      if ($scope.file && $scope.file.length) {
        console.log('test2');
        $scope.uploadFilename = $scope.file[0].name;
        $scope.noFile = 0;

        FileReader.readAsDataUrl($scope.file[0], $scope)
          .then(function(result) {
            $scope.preview_upload = result;
          });
      }
    });

  var voidForm = function () {
    $scope.title = undefined;
    $scope.confidentiality = 'Public';
    $scope.file = undefined;
  };


    $scope.uploadVideo = function () {
      var toSend = {
          title: $scope.title,
          user_id: userId,
          confidentiality: $scope.confidentiality,
          attached_file: $scope.file
        };

      console.log(toSend);

      /*VideoService.set(toSend).success(function (data) {
        if (data) {
          voidForm();
        }
      });*/

    }

  }]);
