'use strict';

angular.module('mewpipe')
  .controller('SkelCtrl', function ($scope, LocalService, VideoService, $state) {

    $scope.sidebarState = 'login';
    $scope.isLogged = LocalService.get('isLogged');

    if (!$scope.isLogged) {
      VideoService.getMostViewed(3, 'listed').success(function (data) {
        console.log('mostviewed', data);
        $scope.mostVieweds = data.videos;
      });

      VideoService.getBestShared(3, 'listed').success(function (data) {
        console.log('mostshared ', data);
        $scope.topRateds = data.videos;
      });
    }else {
      VideoService.getMostViewed(3).success(function (data) {
        console.log('mostviewed', data);
        $scope.mostVieweds = data.videos;
      });

      VideoService.getBestShared(3).success(function (data) {
        console.log('mostshared ', data);
        $scope.topRateds = data.videos;
      });
    }


    $scope.apiUrl = CONFIG.api_url;







    $scope.goToLogin = function () {
      $scope.sidebarState = 'signup';
    };

    $scope.goToSignup = function () {
      $scope.sidebarState = 'login';
    };



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


  });
