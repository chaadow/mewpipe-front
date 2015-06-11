'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', ['$scope', 'LocalService', 'VideoService', function ($scope, LocalService, VideoService) {

    var isLogged = LocalService.get('isLogged');
    $scope.apiUrl = CONFIG.api_url;

    console.log('isLogged', isLogged);
    if (!isLogged) {
      console.log("public");
      VideoService.getPublic().success(function (data) {
        console.log(data);
        $scope.videos = data.videos;
      });
    }else {
      VideoService.get().success(function (data) {
        console.log(data);
        $scope.videos = data.videos;
      });
    }



  }]);
