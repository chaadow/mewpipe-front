'use strict';

angular.module('mewpipe')
  .controller('PipeCtrl', ['$scope', 'LocalService', 'UserService', '$stateParams',  function ($scope, LocalService, UserService, $stateParams) {
    $scope.apiUrl = CONFIG.api_url;
    $scope.userId = $stateParams.userId;
    $scope.myPipe = false;
    var myId = LocalService.get('user_id');

    if (myId == $scope.userId) {
      $scope.myPipe = true;
    }

    UserService.getOne($scope.userId, function (err, data) {
      if (err) {
        console.log('get user err:', err);
      }

      if (data) {
        console.log('get user :', data);
        $scope.user = data.user;

        $scope.nbVideos = data.user.videos.length;
        $scope.nbViews = 0;

        _.forEach(data.user.videos, function (n, key) {
          $scope.nbViews += data.user.videos[key].view_count;
        });
      }

    });


  }]);
