'use strict';

angular.module('mewpipe', ['ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'mm.foundation',
    'ngTagsInput',
    'angular-loading-bar',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "common.services.localstorage",
    "common.services.fileservice",
    "common.directives.ngfileselect",
    "common.services.filereader",
    "common.services.video",
    "common.services.user",
    "common.services.auth",
    "common.interceptors.auth",
    "common.interceptors.http",
    "common.directives.selectOnClick"

    ]
  )
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');



    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common.accept = 'application/json';
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // LOADING BAR
    cfpLoadingBarProvider.latencyThreshold = 100;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;


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
          ,
          'notConnectedLogin@skel':{
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('skel.home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('skel.video', {
        url: '/video/:videoId',
        templateUrl: 'app/video/video.html',
        controller: 'VideoCtrl'
      })
      .state('skel.upload', {
        url: '/upload',
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadCtrl',
        onEnter: ['$state', 'LocalService', function ($state, LocalService) {
          var isLogged = LocalService.get('isLogged');
          if (!isLogged) {
            $state.go('skel.error403');
          }
        }]
      })
      .state('skel.search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      })
      .state('skel.editVideo', {
        url: '/edit-video/:videoId',
        templateUrl: 'app/edit-video/edit-video.html',
        controller: 'EditVideoCtrl',
        onEnter: ['$state', 'LocalService', function ($state, LocalService) {
          var isLogged = LocalService.get('isLogged');
          if (!isLogged) {
            $state.go('skel.error403');
          }
        }]
      })
      .state('skel.pipe', {
        url: '/pipe/:userId',
        templateUrl: 'app/pipe/pipe.html',
        controller: 'PipeCtrl',
        onEnter: ['$state', 'LocalService', function ($state, LocalService) {
          var isLogged = LocalService.get('isLogged');
          if (!isLogged) {
            $state.go('skel.error403');
          }
        }]
      })
      .state('skel.editUser', {
        url: '/edit-user',
        templateUrl: 'app/edit-user/edit-user.html',
        controller: 'EditUserCtrl',
        onEnter: ['$state', 'LocalService', function ($state, LocalService) {
          var isLogged = LocalService.get('isLogged');
          if (!isLogged) {
            $state.go('skel.error403');
          }
        }]
      })
      .state('skel.error403', {
        url: '/403',
        templateUrl: 'app/error/403/error403.html',
        controller: 'Error403Ctrl'
      })
      .state('skel.error404', {
        url: '/404',
        templateUrl: 'app/error/404/error404.html',
        controller: 'Error404Ctrl'
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
