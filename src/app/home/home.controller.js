'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', function ($scope) {

    $scope.latestUploadVideos = [
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default1.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default2.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default3.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default4.jpg'
      }
    ];

  });
