'use strict';

angular.module('mewpipe')
  .controller('LoginCtrl', ['$scope', 'AuthService', 'LocalService', function ($scope, AuthService, LocalService) {

    //LocalService.set('stateSidebar', 'login');

    $scope.submit = function() {

      var toSend = {
        email: $scope.email,
        password: $scope.password
      };

      AuthService.login(toSend)
        .success(function (data) {
          console.debug("DATA", data);
          $state.go('skell.home');
        })
        .error(function (data, err) {

          if(err === 403) {


            if(data.error === 'Invalid email or password') {


            }
            if(data.error === 'user not found') {



            }

          }

        });
    };

  }]);
