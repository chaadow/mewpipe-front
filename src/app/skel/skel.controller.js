'use strict';

angular.module('mewpipe')
  .controller('SkelCtrl', function ($scope, LocalService, VideoService, $state, AuthService) {

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
      VideoService.getMostViewed().success(function (data) {

        var total_count = 0;

        _.forEach(data.videos, function (n, key) {
          total_count += n.view_count;

        });

        _.forEach(data.videos, function (n, key) {
          data.videos[key].progress = n.view_count / total_count * 100;
        });

        $scope.mostVieweds = data.videos;

      });

      VideoService.getBestShared(3).success(function (data) {
        var total_count = 0;

        _.forEach(data.videos, function (n, key) {
          total_count += n.view_count;

        });

        _.forEach(data.videos, function (n, key) {
          data.videos[key].progress = n.view_count / total_count * 100;
        });

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

    $scope.connectGenomeSpace = function () {
      var toSend = {
        identity_url: 'https://identity.genomespace.org/identityServer/xrd.jsp'
        };

      AuthService.login(toSend).success(function (data) {
        console.log('genome', data);
      }).error(function (data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });
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
