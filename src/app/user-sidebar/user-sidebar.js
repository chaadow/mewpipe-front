'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', ['$scope', 'FileReader', 'LocalService', 'VideoService',
    '$state', 'AuthService',
    function ($scope, FileReader, LocalService, VideoService, AuthService) {
    var userId = LocalService.get('user_id');
      $scope.avatar = CONFIG.api_url + LocalService.get('user_avatar');
      $scope.firstname = LocalService.get('user_firstname');
      $scope.lastname = LocalService.get('user_lastname');

      $scope.confidentiality = 'Public';

      $scope.showFastUploadForm = false;

      $scope.toggleUploadForm = function () {
        if ( !$scope.showFastUploadForm ) {
          $scope.showFastUploadForm = true;
        }else if ( $scope.showFastUploadForm ) {
          $scope.showFastUploadForm = false;
        }
      };

      $scope.logout = function() {

        AuthService.logout();
        $scope.isLogged = false;
        $state.go('skell.home');

      };


    $scope.getFile = function () {
      $scope.progressVal = 0;
      console.log('test');
      FileReader.readAsDataUrl($scope.file, $scope)

        .then(function(result) {
            $scope.videoUploaded = result;
            console.log(result);
        });
    };

 /*   $scope.$watch('file', function () {
      if ($scope.file && $scope.file.length) {
        console.log('test2');
        $scope.uploadFilename = $scope.file[0].name;
        $scope.noFile = 0;

        FileReader.readAsDataUrl($scope.file[0], $scope)
          .then(function(result) {
            $scope.preview_upload = result;
          });
      }else {
        console.log('testtttt');
      }
    });*/

  var voidForm = function () {
    $scope.title = undefined;
    $scope.confidentiality = 'Public';
    $scope.file = undefined;
  };


    $scope.uploadVideo = function () {
      var toSend = {
          title: $scope.title,
          user_id: userId,
          confidentiality: $scope.confidentiality
        };

      console.log(toSend);

      VideoService.set(toSend, $scope.file, function (err, data) {

        if (err) {
          console.log('err', err);
        }

        if (data) {
          console.log('data', data);
          voidForm();
        }
      });

    }

  }]);
