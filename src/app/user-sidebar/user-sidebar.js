'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', ['$scope', 'FileReader', 'LocalService', function ($scope, FileReader, LocalService) {
    var userId = LocalService.get('user_id');
    console.log(userId);
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
      console.log('ahhaah');
      console.log($scope.file);
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
    $scope.description = undefined;
    $scope.file = undefined;
  };


    $scope.uploadVideo = function () {
      var toSend = {
          title: $scope.title,
          description: $scope.description,
          user_id: userId,
          confidentiality: $scope.confidentiality,
          attached_file: $scope.file
        },
        blob = {};

      console.log(toSend);

    }

  }]);
