'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', function ($scope) {

    $scope.latestUploadVideos = [
      {
        'title': 'Titre de la video',
        'url': 'Lien vers la video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'Lien vers la video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'Lien vers la video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      },
      {
        'title': 'Titre de la video',
        'url': 'Lien vers la video',
        'creator': "User's name",
        'thumbnail': 'default.jpg'
      }
    ];

  });
