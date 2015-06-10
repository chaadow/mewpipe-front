'use strict';

angular.module('mewpipe')
  .controller('UploadCtrl', ['$scope', '$sce', 'LocalService', 'VideoService', 'FileReader',
    function ($scope, $sce, LocalService, VideoService, FileReader) {
      $scope.confidentiality = 'Public';
      var userId = LocalService.get('user_id');
      $scope.uploadFormat = ['.3gp', '.3g2', '.3gp2', '.asf',
                              '.mts', '.m2ts', '.avi', '.mod',
                                '.dv', '.ts', '.vob', '.xesc', '.mp4',
                                '.mpeg', '.mpg','.m2v', '.ismv', '.wmv', '.mov', '.qt'];
      $scope.uploadFilename = 'Choose a video';

      /*$scope.$watch('file', function () {
        if ($scope.file && $scope.file.length) {
          $scope.uploadFilename = $scope.file.name;
          $scope.noFile = 0;
          FileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
              $scope.videoUploaded = result;
              console.log(result)
            });
        }
      });*/

      $scope.getFile = function () {
        $scope.progressVal = 0;
        console.log('test');
        FileReader.readAsDataUrl($scope.file, $scope)

          .then(function(result) {
            $scope.videoUploaded = result;
            console.log(result);
          });
      };

    /*  $scope.loadTags = function (query) {

        return TagService.get(company.id, query).success(function (data) {});
      };*/

      var voidForm = function () {
        $scope.title = undefined;
        $scope.description = undefined;
        $scope.confidentiality = 'Public';
        $scope.file = undefined;
        $scope.tags = undefined;
      };


      $scope.uploadVideo = function () {
        console.log($scope.tags);

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

        VideoService.set(toSend, $scope.file, function (err, data) {
          if (err) {
            console.log(err);
          }

          if (data) {
            console.log(data);
            voidForm();
          }

          });

      }

    }
  ]);
