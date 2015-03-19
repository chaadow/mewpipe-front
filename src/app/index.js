'use strict';

angular.module('mewpipe', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ngResource', 'ui.router', 'mm.foundation', 'angularify.semantic', ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('homeOld', {
        url: '/homeold',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('skel', {
<<<<<<< HEAD
        url: '',
=======
        url: '/skel',
>>>>>>> 528979956abda0c9a5a7476b5125356dffe2b826
        templateUrl: 'app/skel/skel.html',
        controller: 'SkelCtrl'
      })
      .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
