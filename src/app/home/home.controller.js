'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', ['$scope', 'LocalService', function ($scope, LocalService) {
    var user = {
      email: 'hair.thon@gmail.com',
      username: 'Ayrton',
      admin: true,
      id: '1'
    };


    LocalService.set('user_id', user.id);
    LocalService.set('user_email', user.email);
    LocalService.set('user_username', user.username);
    LocalService.set('user_admin', true);




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

  }]);
