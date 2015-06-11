'use strict';

angular.module('mewpipe')
  .controller('SkelCtrl', function ($scope, LocalService, VideoService) {
    //swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });

    $scope.sidebarState = 'login';


    $scope.goToLogin = function () {
      $scope.sidebarState = 'signup';
      console.log($scope.sidebarState);
    };

    $scope.goToSignup = function () {
      $scope.sidebarState = 'login';
      console.log($scope.sidebarState);
    };

    $scope.isLogged = LocalService.get('isLogged');
    $scope.apiUrl = CONFIG.api_url;

    if (Modernizr.mq('only screen and (min-width: 64.063em)') == true) {
      $(document).ready( function(){
        var heightwindow = $(document).height();
        $('.full-height').css('min-height', heightwindow+'px');
      });
      $( window ).load( function(){
        var mainContainerHeight = $( ".full-height-stalker").height();
        $('.full-height').css('min-height', mainContainerHeight+'px');
      });

      $(window).resize(function() {
        var heightwindow = $(document).height();
        $('.full-height').css('min-height', heightwindow+'px');
      });
    }

    VideoService.getMostViewed(3).success(function (data) {
      console.log('mostviewed', data);
      $scope.mostVieweds = data.videos;
    });

    VideoService.getBestShared(3).success(function (data) {
      console.log('mostshared ', data);
      $scope.topRateds = data.videos;
    });

    $scope.topRateds= [
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default1.jpg',
        'rate': 124,
        'pourcent': 100
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.video',
        'creator': "User's name",
        'thumbnail': 'default3.jpg',
        'rate': 124,
        'pourcent': 80
      },
      {
        'title': 'Titre de la video',
        'url': 'skel.videoo',
        'creator': "User's name",
        'thumbnail': 'default4.jpg',
        'rate': 124,
        'pourcent': 67
      }
    ];


  });
