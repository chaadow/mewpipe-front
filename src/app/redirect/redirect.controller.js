'use strict';

angular.module('mewpipe')
  .controller('RedirectCtrl', ['$scope', 'LocalService', 'UserService', '$state',
    'AuthService', '$stateParams',
    function ($scope, LocalService, UserService, $state, AuthService, $stateParams) {
      var userId = $stateParams.userId;
      var userToken = $stateParams.userToken;

      var message = $stateParams.message;
      console.log('message ', message);

      if (message) {
        swal({   title: "Error",
          text: message,
          type: "error"
          },
          function(){
            $state.go('skel.home');
             });


      } else {
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
              LocalService.set('user_username', result.user.username);
              LocalService.set('mewpipe_token', userToken);
              LocalService.set('isLogged', true);
              LocalService.set('admin', result.user.admin);
              $scope.$parent.isLogged = true;
              $state.go('skel.pipe', {userId: userId});

              swal({   title: "Authentication succesfull !",
                type: 'success',
                timer: 2000,
                showConfirmButton: false });

            }


          });
        }

      }





    }]);

