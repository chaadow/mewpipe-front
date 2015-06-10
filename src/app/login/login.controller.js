'use strict';

angular.module('mewpipe')
  .controller('LoginCtrl', ['$scope', 'AuthService', 'LocalService', '$state',
    function ($scope, AuthService, LocalService, $state) {

    //LocalService.set('stateSidebar', 'login');

      console.log('islogged', $scope.$parent.isLogged);


      $scope.goToSignup = function () {
        //$rootScope.stateSidebar = 'signup';
       console.log($scope.$parent.stateSidebar);
      };

    $scope.submit = function() {

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
    };

  }]);
