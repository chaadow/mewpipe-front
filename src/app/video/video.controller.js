'use strict';

angular.module('mewpipe')
  .controller('VideoCtrl', ['$scope', '$sce', '$stateParams', 'VideoService',
                            'LocalService', '$state',
    function ($scope, $sce, $stateParams, VideoService, LocalService, $state) {

      $scope.videoId = $stateParams.videoId;
      $scope.shareVideo = false;
      var isLogged = LocalService.get('isLogged');
      $scope.apiUrl = CONFIG.api_url;


      VideoService.getOne($scope.videoId).success(function (data) {
        console.log(data);
        var video = data.video;

        if (!isLogged && video.confidentiality === 'private') {
          $state.go('skel.error403');
        }

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
          shares: video.page_views,
          user: video.user,
          id: video.id
        };

        console.log(video.id);
        console.log( $scope.apiUrl + video.user.avatar);
        $scope.slug = 'http://localhost:3000/#/video/' + video.slug;

        console.log(CONFIG.api_url + video.poster);

      })
        .error(function (data, status, headers, config) {
            if (status === 404) {
              $state.go('skel.error404');
            }
        })
      ;

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

        }
      };





  }]);
