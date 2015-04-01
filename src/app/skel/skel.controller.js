'use strict';

angular.module('mewpipe')
  .controller('SkelCtrl', function ($scope) {


    if (Modernizr.mq('only screen and (min-width: 64.063em)') == true) {
      $(document).ready( function(){
        var heightwindow = $(document).height();
        $('.full-height').css('height', heightwindow+'px');
      });

      $(window).resize(function() {
        var heightwindow = $(document).height();
        $('.full-height').css('height', heightwindow+'px');
      });
    }


  });
