'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', function ($scope) {

    $scope.latestUploadVideos = [
      {
        'title': 'The coal-mining town of Bulli',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default1.jpg'
      },
      {
        'title': 'Orson Welles’ 1973 masterpiece, F for Fake',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default2.jpg'
      },
      {
        'title': 'Portrait of a dog walker',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default3.jpg'
      },
      {
        'title': 'La petite maison (2004)',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default4.jpg'
      }
    ];

  });
