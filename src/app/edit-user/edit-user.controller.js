'use strict';

angular.module('mewpipe')
  .controller('EditUserCtrl', ['$scope', 'LocalService', 'UserService',
    '$stateParams', 'FileReader', 'AuthService', '$state',
    function ($scope, LocalService, UserService, $stateParams, FileReader, AuthService, $state) {

    $scope.apiUrl = CONFIG.api_url;
    $scope.userId = LocalService.get('user_id');

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

              swal({
                title: "Your account is updated !",
                type: "success"
              });

            }
        });
      };



      $scope.deleteUser = function () {

        swal({   title: "Are you sure?",
            text: "You will not be able to recover you account!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false },
          function () {

            UserService.destroy($scope.userId).success(function () {
              LocalService.clear();
              $scope.$parent.isLogged = false;
              $state.go('skel.home');
              swal("Deleted!", "Your Account has been deleted.", "success");

            });
          });



      }

  }]);

