'use strict';

angular.module('mewpipe')
  .controller('RedirectCtrl', ['$scope', 'LocalService', 'UserService', '$state',
    'AuthService', '$stateParams',
    function ($scope, LocalService, UserService, $state, AuthService, $stateParams) {
      var userId = $stateParams.userId;
      var userToken = $stateParams.userToken;

      console.log(userId);
      console.log(userToken);
      if (userId && userToken) {
        UserService.getOne(userId, function (err, result) {

          if (err) {
            console.log(err);
          }


          if (result) {
            console.log(result);
            LocalService.set('user_id', userId);
            LocalService.set('user_email', result.user.email);
            LocalService.set('user_firstname', result.user.firstname);
            LocalService.set('user_lastname', result.user.lastname);
            LocalService.set('user_avatar', result.user.avatar);
            LocalService.set('mewpipe_token', userToken);
            LocalService.set('isLogged', true);
            LocalService.set('admin', result.user.admin);
            $scope.$parent.isLogged = true;
          }


        });
      }





    }]);

