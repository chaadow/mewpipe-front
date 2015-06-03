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
    "com.2fdevs.videogular.plugins.poster",
    "common.services.localstorage",
    "common.services.fileservice",
    "common.directives.ngfileselect",
    "common.services.filereader"
    ]
  )
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('skel', {
        url: '',
        abstract: true,
        views : {
          '':{
            templateUrl: 'app/skel/skel.html',
            controller: 'SkelCtrl'
          },
          'connected@skel': {
            templateUrl: 'app/user-sidebar/user-sidebar.html',
            controller: 'UserSidebarCtrl'
          },
          'notConnected@skel':{
            templateUrl: 'app/signup/signup.html',
            controller: 'SignupCtrl'
          }
        }
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
      .state('homeOld', {
        url: '/homeold',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  })
;
