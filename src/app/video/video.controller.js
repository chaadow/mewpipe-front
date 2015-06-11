'use strict';

angular.module('mewpipe')
  .controller('VideoCtrl', ['$scope', '$sce', '$stateParams', 'VideoService',
                            'LocalService', '$state',
    function ($scope, $sce, $stateParams, VideoService, LocalService, $state) {

      $scope.videoId = $stateParams.videoId;
      $scope.shareVideo = false;

      console.log($scope.videoId);

      VideoService.getOne($scope.videoId).success(function (data) {
        console.log(data);
        var video = data.video;

        console.log(CONFIG.api_url + video.mp4);

        $scope.videoConfig = {
          title: video.title,
          description: video.description,
          sources: [
            {src: $sce.trustAsResourceUrl(CONFIG.api_url + video.mp4), type: "video/mp4"},
            {src: $sce.trustAsResourceUrl(CONFIG.api_url + video.webm), type: "video/webm"},
            {src: $sce.trustAsResourceUrl(CONFIG.api_url + video.ogg), type: "video/ogg"}
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
            //poster: CONFIG.api_url + video.poster
          },
          tags: video.tag_list,
          views: video.view_count,
          shares: video.page_views
        };

        $scope.slug = 'http://localhost:3000/#/video/' + video.slug;

        console.log(CONFIG.api_url + video.poster);

      });

      $scope.showSlug = function () {
        $scope.shareVideo = true;
      };



      $scope.onComplete = function () {
        VideoService.viewed($scope.videoId, viewedCallback);
      };

      var viewedCallback = function (err, data) {
        if (err) {
          console.log(err);
        }

        if (data) {
          $scope.videoConfig.views = data.count;
          console.log(data.count);
          $state.go($state.current, {}, {reload: true});

        }
      };





  }]);
