'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', function ($scope) {

    $scope.latestUploadVideos = [
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      }
    ];

  });
