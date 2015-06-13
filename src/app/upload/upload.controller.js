'use strict';

angular.module('mewpipe')
  .controller('UploadCtrl', ['$scope', '$sce', 'LocalService', 'VideoService', 'FileReader', '$state',
    function ($scope, $sce, LocalService, VideoService, FileReader, $state) {
      $scope.confidentiality = 'Public';
      var userId = LocalService.get('user_id');
      $scope.uploadFormat = ['3gp', '3g2', '3gp2', 'asf',
                              'mts', 'm2ts', 'avi', 'mod',
                                'dv', 'ts', 'vob', 'xesc', 'mp4',
                                'mpeg', 'mpg','m2v', 'ismv', 'wmv', 'mov', 'qt'];
      $scope.stringUploadFormat = $scope.uploadFormat.join(', ');
      $scope.uploadFilename = 'Choose a video';
      $scope.confidentiality = 'public';
      $scope.progressPercentage = 0;
      $scope.noTitle = false;
      $scope.noFile = false;
      $scope.wrongFormat = false;
      $scope.wrongSize = false;



      $scope.getFile = function () {
        $scope.progressVal = 0;
        FileReader.readAsDataUrl($scope.file, $scope)

          .then(function(result) {
            $scope.videoUploaded = result;
            console.log(result);
          });
      };

    /*  $scope.loadTags = function (query) {

        return TagService.get(company.id, query).success(function (data) {});
      };*/


      $scope.$watch('file', function (data) {
        if (data) {
         var type = data.type.split("/").pop();
          console.log(type);
          if ($scope.uploadFormat.indexOf(type) < 0 ) {
            $scope.file = null;
            $scope.wrongFormat = true;
            console.log($scope.file);
          }else if ($scope.file.size > 500000000) {
            $scope.file = null;
            $scope.wrongSize = true;
          }
        }
      });

      var voidForm = function () {
        $scope.title = undefined;
        $scope.description = undefined;
        $scope.confidentiality = 'public';
        $scope.file = undefined;
        $scope.tags = undefined;
        $scope.progressPercentage = 0;
      };


      $scope.uploadVideo = function () {

        if (!$scope.file) {
          $scope.noFile = true;
        }
        else if (!$scope.title) {
          $scope.noTitle = true;
        }
        else {

          var tagsList = _.pluck($scope.tags, "text");
          tagsList = tagsList.join(', ');

          var toSend = {
            title: $scope.title,
            description: $scope.description,
            user_id: userId,
            confidentiality: $scope.confidentiality,
            tag_list: tagsList
          };

          console.log(toSend);

          var progressBarCallback = function (data) {
            $scope.progressPercentage = data;
          };

          VideoService.set(toSend, $scope.file, function (err, data) {
            if (err) {
              console.log(err);
            }

            if (data) {
              console.log(data);

              voidForm();

              swal({   title: "Your video is uploaded !",
                  type: "success",
                  showCancelButton: true,
                  confirmButtonText: "Show my video" },
                function () {
                  $state.go('skel.video', {videoId: data.id});
                });
            }

          }, progressBarCallback);

        }
      }
    }
  ]);
