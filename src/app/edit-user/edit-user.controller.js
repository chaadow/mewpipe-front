'use strict';

angular.module('mewpipe')
  .controller('EditUserCtrl', ['$scope', 'LocalService', 'UserService',
    '$stateParams', 'FileReader', 'AuthService', '$state',
    function ($scope, LocalService, UserService, $stateParams, FileReader, $state) {

    $scope.apiUrl = CONFIG.api_url;
    $scope.userId = $stateParams.userId;



      UserService.getOne($scope.userId, function (err, data) {
        if (err) {
          console.log('get user err:', err);
        }

        if (data) {
          console.log('get user :', err);
          $scope.user = data.user;

        }

      });



      $scope.getFile = function () {
        FileReader.readAsDataUrl($scope.file, $scope)

          .then(function(result) {
            $scope.profilePicture = result;
            $scope.preview_upload = result;

          });
      };




      $scope.editUser = function () {
        var toSend = {
          email: $scope.email,
          password: $scope.password,
          firstname: $scope.firstname,
          lastname: $scope.lastname,
          id: $scope.userId
        };

        var file = {};


        if($scope.preview_upload !== undefined) {
          file = FileReader.dataURIToBlob($scope.preview_upload);
          file.name = $scope.file.name;
        }else {
          file = null;
        }


        UserService.update(toSend, file, function (err, data) {
            if (err) {
              console.log(err);
            }

            if (data) {
              console.log('updata user: ', data);
              $scope.user = data.user;
            }
        });
      };

      $scope.deleteVideo = function () {
          LocalService.clear();
          $state.go('skell.home');
      }

  }]);

