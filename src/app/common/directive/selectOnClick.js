(function() {
  'use strict';

  function selectOnClickDirective() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          if (!window.getSelection().toString()) {
            // Required for mobile Safari
            this.setSelectionRange(0, this.value.length)
          }
        });
      }
    };
  }

  angular.module('common.directives.selectOnClick', [])
    .directive('selectOnClick', selectOnClickDirective);
})();
