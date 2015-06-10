'use strict';

angular.module('mewpipe')
  .controller('SignupCtrl', ['$scope', 'UserService', 'FileReader', 'AuthService', '$state', '$rootScope',
    function ($scope, UserService, FileReader, AuthService, $state, $rootScope) {


      $scope.getFile = function () {
      FileReader.readAsDataUrl($scope.file, $scope)

        .then(function(result) {
            $scope.profilePicture = result;
          $scope.preview_upload = result;

        });
    };



    $scope.signup = function () {
      console.log($scope.file);

      var user = {
        email: $scope.email,
        password: $scope.password,
        firstname: $scope.firstname,
        lastname: $scope.lastname
      };


      var file = {};


      if($scope.preview_upload !== undefined) {
        file = FileReader.dataURIToBlob($scope.preview_upload);
        file.name = $scope.file.name;
      }else {
        file = null;
      }

      UserService.set(user, file, callbackSignup);

      //UserService.set(user, file, callbackSignup);
    };



    var callbackSignup = function (err, success) {
      if (err) {
        console.log('err ', err);
      }

      if (success) {
        var toSend = {
          email: $scope.email,
          password: $scope.password
        };

        AuthService.login(toSend)
          .success(function (data) {
            console.debug("DATA", data);
            $state.go($state.current, {}, {reload: true});
          })
          .error(function (data, err) {

            if(err === 403) {


              if(data.error === 'Invalid email or password') {


              }
              if(data.error === 'user not found') {



              }

            }

          });
      }

    }

  }]);
