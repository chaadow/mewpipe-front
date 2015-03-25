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
      controller: 'HomeCtrl',
        views: {
          "connected": {
            templateUrl: 'app/user-sidebar/user-sidebar.html',
            controller: 'UserSidebarCtrl'
          },
          "notConnected":{
            templateUrl: 'app/signup/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })
      .state('skel.video', {
        url: '/video',
        templateUrl: 'app/video/video.html',
        controller: 'VideoCtrl',
        views: {
          "connected": {
            templateUrl: 'app/user-sidebar/user-sidebar.html',
            controller: 'UserSidebarCtrl'
          },
          "notConnected":{
            templateUrl: 'app/signup/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })
      /*.state('skel.login', {
        views: {
          'third-container':{
            url: '',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('skel.signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
      })*/
    ;

    $urlRouterProvider.otherwise('/');
  })
;
