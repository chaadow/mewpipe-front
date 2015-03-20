'use strict';

angular.module('mewpipe', ['ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'mm.foundation',
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.poster"
    ]
  )
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('homeOld', {
        url: '/homeold',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('skel', {
        url: '',
        abstract: true,
        templateUrl: 'app/skel/skel.html',
        controller: 'SkelCtrl'
      })
      .state('skel.home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
      })
      .state('skel.video', {
        url: '/video',
        templateUrl: 'app/video/video.html',
        controller: 'VideoCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  })
;
