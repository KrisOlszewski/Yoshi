if (typeof jQuery === 'undefined') {
  throw new Error('Yoshi requires jQuery');
}

;(function($, window, document, undefined) {

  'use strict';

  /**
   * @title Yoshi
   * @overview Low level single page application using URL hash and Ajax.
   * @author Kris Olszewski
   */

  /**
   * The top-level namespace.
   * @namespace Yoshi
   */

  var Yoshi = {};

  /**
   * Initialize Guide
   * @param {object} config Custom settings
   */

  Yoshi.init = function(config) {

    this.cache(config);
    this.bind();

  }; // init()

  /**
   * Cache reusable stuff
   * @param {object} config Custom settings
   */

  Yoshi.cache = function(config) {

    config = config || {};

    this.config               = {};
    this.config.container     = config.container || 'body';
    this.config.withBang      = (config.withBang === false) ? false : true;
    this.config.pageExt       = config.pageExt || '.html';
    this.config.transitionIn  = config.transitionIn || 'transition.slideDownBigIn';
    this.config.transitionOut = config.transitionOut || 'transition.slideUpBigOut';
    this.config.activeNav     = config.activeNav || 'is-active';

    if (this.config.withBang) {
      this.config.defaultView = '!' + (config.defaultView || 'welcome');
      this.config.missingView = '!' + (config.missingView || 'not-found');
    } else {
      this.config.defaultView = config.defaultView || 'welcome';
      this.config.missingView = config.missingView || 'not-found';
    }

    this.$win = $(window);

  }; // cache()

  /**
   * Bind event listeners
   */

  Yoshi.bind = function() {

    var _this = this;

    _this.$win.on('hashchange.yoshi', function() {
       _this.routeManager();
    });

    _this.$win.on('load.yoshi', function() {
       _this.routeManager();
    });

    _this.$win.on('resize.yoshi', _this.throttle(function() {
       _this.setHeight();
    }));

    $.subscribe('yoshi.getView', function(name, html, view) {
      _this.viewManager(html, view);
    });

    $.subscribe('yoshi.notFound', function(name) {
      _this.setHash(_this.config.missingView);
    });

  }; // bind()

  /**
   * Handle stuff based on URL hash
   */

  Yoshi.routeManager = function() {

    var _this   = this;
    var route   = _this.getHash();
    var section = $('[data-view]:visible').data('view');

    if (!route.length) {
      _this.setHash(_this.config.defaultView);
      return;
    }

    if (route !== section) {
      _this.getView(route);
    }

  }; // routeManager()

  /**
   * Handle view display
   * @param {string} html View HTML
   * @param {string} view View name
   */

  Yoshi.viewManager = function(html, view) {

    var _this    = this;
    var $section = $('[data-view]:visible');

    $(_this.config.container).prepend(html);
    _this.setHeight();
    _this.setNavState(view);

    if ($section.length) {
      _this.animateOut(view);
    } else {
      _this.animateIn(view);
    }

  }; // viewManager()

  /**
   * Animate out view
   * @param {string} view View name
   */

  Yoshi.animateOut = function(view) {

    var _this    = this;
    var $section = $('[data-view]:visible');

    $section.velocity(_this.config.transitionOut, {
      complete: function() {
        $section.remove();
        _this.animateIn(view);
      }
    });

  };

  /**
   * Animate in view
   * @param {string} view View name
   */

  Yoshi.animateIn = function(view) {

    var _this    = this;
    var $section = $('[data-view="' + view + '"]');

    $section.velocity(_this.config.transitionIn);

  };

  /**
   * Update navigation UI state
   * @param {string} view View name
   */

  Yoshi.setNavState = function(view) {

    $('[data-href]').removeClass(this.config.activeNav);
    $('[data-href="' + view + '"]').addClass(this.config.activeNav);

  };

  /**
   * Set minimum height for view
   * @param {string} view View name
   */

  Yoshi.setHeight = function() {
    var winHeight = $(window).height();
    $('[data-height]').css('min-height', winHeight);
  };

  /**
   * Get view using Ajax
   * @param {string} route View route
   */

  Yoshi.getView = function(route) {

    var view = route;

    $.ajax({
      url: view + this.config.pageExt,
      cache: false
    }).done(function(html) {
      $.publish('yoshi.getView', [html, view]);
    }).fail(function(jqXHR, textStatus) {
      $.publish('yoshi.notFound');
    });

  };

  /**
   * Get current URL hash
   */

  Yoshi.getHash = function() {
    return window.location.hash.substring(this.config.withBang ? 2 : 1).replace(/^\/|\/$/g, '');
  };

  /**
   * Set URL hash
   */

  Yoshi.setHash = function(hash) {
    window.location.hash = hash;
  };

  /**
   * Throttle function execution
   */

  Yoshi.throttle = function(func, delay) {
    var timer = null;

    return function () {
      var context = this;
      var args = arguments;

      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay || 500);
    };
  };

  /**
   * Expose to global scope
   */

  window.Yoshi = Yoshi;

})(jQuery, window, document);
