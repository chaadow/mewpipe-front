(function() {
  'use strict';

  function capitalize() {
    return function(input, all) {

      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';


    };
  }

  angular.module('common.filters.capitalize', [])
    .filter('capitalize', capitalize);
})();
