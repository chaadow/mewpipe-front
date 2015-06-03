'use strict';

angular.module('mewpipe')
  .controller('UploadCtrl', ['$scope', '$sce', 'LocalService', 'VideoService',
    function ($scope, $sce, LocalService, VideoService) {

      var userId = LocalService.get('user_id');

      $scope.$watch('file', function () {
        if ($scope.file && $scope.file.length) {
          console.log('test2');
          $scope.uploadFilename = $scope.file[0].name;
          $scope.noFile = 0;

          FileReader.readAsDataUrl($scope.file[0], $scope)
            .then(function(result) {
              $scope.preview_upload = result;
            });
        }
      });

    /*  $scope.loadTags = function (query) {

        return TagService.get(company.id, query).success(function (data) {});
      };*/

      var voidForm = function () {
        $scope.title = undefined;
        $scope.description = undefined;
        $scope.confidentiality = undefined;
        $scope.file = undefined;
        $scope.tags = undefined;
      };


      $scope.uploadVideo = function () {
        //var tagsList = _.pluck($scope.tags, "text");
        console.log($scope.tags);
        var toSend = {
          title: $scope.title,
          description: $scope.description,
          user_id: userId,
          confidentiality: $scope.confidentiality,
          tags: $scope.tags,
          attached_file: $scope.file
        };

        console.log(toSend);

       /* VideoService.set(toSend).success(function (data) {
          if (data) {
            voidForm();
          }
        });*/

      }

    }
  ]);
