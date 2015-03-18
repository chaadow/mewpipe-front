'use strict';

angular.module('mewpipe')
  .controller('HomeCtrl', function ($scope) {

    var BaseMenu = (function(){
      var el, trigger, menu, isMenuOpen;
      var _init,
        _initEvents,
        _openIconMenu,
        _closeIconMenu,
        _openMenu,
        _closeMenu,
        _setMenuElement;


      _init = function() {
        trigger = el.querySelector('a.gn-icon-menu');
        menu = el.querySelector('nav.gn-menu-wrapper');
        isMenuOpen = false;
        _initEvents();
        this._initEvents();

        var self = this;
        this.bodyClickFn = function() {
          self._closeMenu();
          this.removeEventListener( self.eventtype, self.bodyClickFn );
        };
      };

      _initEvents = function() {
        trigger.addEventListener( 'mouseover', function(ev) { _openIconMenu(); } );
        trigger.addEventListener( 'mouseout', function(ev) { _closeIconMenu(); } );
        menu.addEventListener('mouseover', function(ev) {
          _openMenu();
          console.log("add click to close");
          document.addEventListener('click',BaseMenu.bodyClickFn);
        });
      };

      _openIconMenu = function() {
        $(menu).addClass('gn-open-part');
      };

      _closeIconMenu = function() {
        $(menu).removeClass('gn-open-part');
      };

      _openMenu  = function() {
        if( isMenuOpen ) return;
        $(trigger).addClass('gn-selected');
        isMenuOpen = true;
        $(menu).addClass('gn-open-all');
        _closeIconMenu();
      };

      _closeMenu = function() {
        if( !isMenuOpen ) return;
        $(trigger).removeClass('gn-selected');
        isMenuOpen = false;
        $(menu).removeClass('gn-open-all');
        _closeIconMenu();
      };

      _setMenuElement = function(e) {
        el = e;
      };

      return {
        gnMenu: function(element) {
          _setMenuElement(element);
          _init();
        },
        bodyClickFn: function() {
          _closeMenu();
          console.log("click to close");
          document.removeEventListener('click',BaseMenu.bodyClickFn);
        }
      };
    })();

    $(document).ready(function() {
      BaseMenu.gnMenu(document.getElementById('gn-menu'));
    });

  });
