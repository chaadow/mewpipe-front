'use strict';

angular.module('mewpipe')
  .controller('SearchCtrl', ['$scope', 'LocalService', 'VideoService', '$stateParams',
    function ($scope, LocalService, VideoService, $stateParams) {
      $scope.videos = [];
      $scope.apiUrl = CONFIG.api_url;


      $scope.search = function () {
        VideoService.getByTags($scope.tags).success(function (data) {
          $scope.videos = data.videos;
        });
      };

      if ($stateParams.tag) {
        $scope.tags = $stateParams.tag;
        $scope.search();

      }



  }]);
