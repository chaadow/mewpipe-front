'use strict';

angular.module('mewpipe')
  .controller('UserSidebarCtrl', function ($scope) {

    $( ".addvideo" ).click(function() {
      $( this ).toggleClass( "activ" );
      $( "#fastUpload" ).toggleClass( "open" );

    });

  });
