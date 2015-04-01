'use strict';

angular.module('mewpipe')
  .controller('SkelCtrl', function ($scope) {


    if (Modernizr.mq('only screen and (min-width: 64.063em)') == true) {
      $(document).ready( function(){
        var heightwindow = $(document).height();
        $('.full-height').css('min-height', heightwindow+'px');
      });

      $(window).resize(function() {
        var heightwindow = $(document).height();
        $('.full-height').css('min-height', heightwindow+'px');
      });
    }

    $scope.mostVieweds= [
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'numbviews': 124,
        'pourcent': 100
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'numbviews': 95,
        'pourcent': 77
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'numbviews': 60,
        'pourcent': 48
      }
    ];

    $scope.topRateds= [
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'rate': 124,
        'pourcent': 100
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'rate': 124,
        'pourcent': 80
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default.jpg',
        'rate': 124,
        'pourcent': 67
      }
    ];


  });
