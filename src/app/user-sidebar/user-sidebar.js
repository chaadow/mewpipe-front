'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', ['$scope', 'FileReader', 'LocalService', 'VideoService',
    '$state', 'UserService',
    function ($scope, FileReader, LocalService, VideoService, $state, UserService) {
    $scope.userId = LocalService.get('user_id');


      $scope.confidentiality = 'public';

      $scope.showFastUploadForm = false;


      UserService.getOne($scope.userId, function (err, data) {
        if (err) {
          console.log('get user err:', err);
        }

        if (data) {
          console.log('get user :', data);
          $scope.user = data.user;

          $scope.avatar = CONFIG.api_url + data.user.avatar;
          $scope.firstname = data.user.firstname;
          $scope.lastname = data.user.lastname;

          $scope.nbVideos = data.user.videos.length;
          $scope.nbViews = 0;

          _.forEach(data.user.videos, function (n, key) {
            $scope.nbViews += data.user.videos[key].view_count;
          });

        }

      });

      $scope.toggleUploadForm = function () {
        if ( !$scope.showFastUploadForm ) {
          $scope.showFastUploadForm = true;
        }else if ( $scope.showFastUploadForm ) {
          $scope.showFastUploadForm = false;
        }
      };


      $scope.logout = function() {

        LocalService.clear();
        $scope.$parent.isLogged = false;
        $state.go($state.current, {}, {reload: true});
      };


    $scope.getFile = function () {
      $scope.progressVal = 0;
      console.log('test');
      FileReader.readAsDataUrl($scope.file, $scope)

        .then(function(result) {
            $scope.videoUploaded = result;
            console.log(result);
        });
    };

 /*   $scope.$watch('file', function () {
      if ($scope.file && $scope.file.length) {
        console.log('test2');
        $scope.uploadFilename = $scope.file[0].name;
        $scope.noFile = 0;

        FileReader.readAsDataUrl($scope.file[0], $scope)
          .then(function(result) {
            $scope.preview_upload = result;
          });
      }else {
        console.log('testtttt');
      }
    });*/

  var voidForm = function () {
    $scope.title = undefined;
    $scope.confidentiality = 'Public';
    $scope.file = undefined;
  };


    $scope.uploadVideo = function () {
      var toSend = {
          title: $scope.title,
          user_id: $scope.userId,
          confidentiality: $scope.confidentiality
        };

      console.log(toSend);

      VideoService.set(toSend, $scope.file, function (err, data) {

        if (err) {
          console.log('err', err);
        }

        if (data) {
          console.log('data', data);
          voidForm();


          swal({   title: "Your video is uploaded !",
              type: "success",
              showCancelButton: true,
              confirmButtonText: "Show my video" },
            function () {
              $state.go('skel.video', {videoId: data.id});
            });
        }
      });

    }

  }]);
