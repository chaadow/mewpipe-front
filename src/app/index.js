'use strict';

angular.module('mewpipe', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ngResource', 'ui.router', 'mm.foundation' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('homeOld', {
        url: '/homeold',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('skel', {
        url: '',
        templateUrl: 'app/skel/skel.html',
        controller: 'SkelCtrl'
      })
      .state('skel.home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
