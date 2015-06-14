'use strict';

angular.module('mewpipe')
  .controller('EditVideoCtrl', ['$scope', 'LocalService', '$sce', '$stateParams', 'VideoService', '$state',
    function ($scope, LocalService, $sce, $stateParams, VideoService, $state) {

      $scope.videoId = $stateParams.videoId;
      var userId = LocalService.get('user_id');

      console.log($scope.videoId);

      VideoService.getOne($scope.videoId).success(function (data) {
        console.log(data);
        console.log('userId', userId);
        console.log('data.video.user.id', data.video.user.id);

        if (userId != data.video.user.id) {
          $state.go('skel.error403');
        }


        var video = data.video;
        $scope.tags = [];


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
        $scope.confidentiality = video.confidentiality;

        _.forEach(video.tag_list, function (n, key) {
            $scope.tags.push({text: video.tag_list[key]});
        });

      });

      $scope.deleteVideo = function () {

        swal({   title: "Are you sure?",
            text: "You will not be able to recover your video!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false },
          function () {

            VideoService.destroy($scope.videoId).success(function () {
              $state.go('skel.home');
              swal("Deleted!", "Your video has been deleted.", "success");

            });
          });



      }


      $scope.videoUpdate = function () {

        var tagsList = _.pluck($scope.tags, "text");
        tagsList = tagsList.join(', ');


        var toSend = {
          title: $scope.title,
          description: $scope.description,
          confidentiality: $scope.confidentiality,
          tag_list: tagsList
        };


        VideoService.update(toSend, $scope.videoId).success(function (data) {
            if (data) {
              console.log(data);

              swal({
                title: "Your video is updated !",
                type: "success",
                  showCancelButton: true,
                  confirmButtonText: "Show my video" },
                function () {
                  $state.go('skel.video', {videoId: data.id});
                });

            }
        })
          .error(function (err) {
              console.log(err);

          });




      }

  }]);
