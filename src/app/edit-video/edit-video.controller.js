'use strict';

angular.module('mewpipe')
  .controller('EditVideoCtrl', ['$scope', 'LocalService', '$sce', '$stateParams', 'VideoService',
    function ($scope, LocalServic, $sce, $stateParams, VideoService) {

      $scope.videoId = $stateParams.videoId;

      console.log($scope.videoId);

      VideoService.getOne($scope.videoId).success(function (data) {
        console.log(data);
        var video = data.video;

        console.log(CONFIG.api_url + video.file);

        var videoConfig = {
          title: video.title,
          description: video.description,
          sources: [
            {src: $sce.trustAsResourceUrl(CONFIG.api_url + video.file), type: "video/mp4"}/*,
             {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
             {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}*/
          ],
          tracks: {
            src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
            kind: "subtitles",
            srclang: "en",
            label: "English",
            default: ""
          },
          theme: "../../../bower_components/videogular-themes-default/videogular.css",
          plugins: {
            //poster: "http://www.videogular.com/assets/images/videogular.png"
          }
        };

        $scope.title = videoConfig.title;
        $scope.description = videoConfig.description;
        $scope.confidentiality = videoConfig.confidentiality;
        $scope.tags = videoConfig.tags;

        console.log($scope.title);

      });




  }]);
