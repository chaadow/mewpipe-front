'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', ['$scope', 'FileReader', 'LocalService', 'VideoService',
    '$state', 'UserService',
    function ($scope, FileReader, LocalService, VideoService, $state, UserService) {
    $scope.userId = LocalService.get('user_id');


      $scope.confidentiality = 'public';

      $scope.showFastUploadForm = false;

      var getOneUser = function () {
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
            $scope.username = data.user.username;
            $scope.nbVideos = data.user.videos.length;
            $scope.nbViews = 0;

            _.forEach(data.user.videos, function (n, key) {
              $scope.nbViews += data.user.videos[key].view_count;
            });

          }

        });

      };

      getOneUser();

    console.log($scope.$parent.isLogged);

      $scope.$parent.$watch('isLogged', function (val) {
        console.log(val);
        if (val) {
          console.log('tamere');
          getOneUser();
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
        //LocalService.set('isLogged', false);
        $scope.$parent.isLogged = false;

        if ($state.$current.name === 'skel.home') {
          $state.go($state.current, {}, {reload: true});
        }else {
          $state.go('skel.home');
        }

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
    $scope.confidentiality = 'public';
    $scope.file = undefined;
  };


    $scope.fastUploadVideo = function () {
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
