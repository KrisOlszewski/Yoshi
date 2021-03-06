/**
 * Yoshi v0.0.1
 * Saturday, March 21st, 2015, 10:54:25 AM
 * 
 * 2014 Kris Olszewski | http://www.kolszewski.com/yoshi
 */

/**
 * Tiny Pub/Sub - v0.7.0 - 2013-01-29
 * https://github.com/cowboy/jquery-tiny-pubsub
 * Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

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

    this.config               = config || {};
    this.config.container     = config.container || 'body';
    this.config.withBang      = (config.withBang === false) ? false : true;
    this.config.pageExt       = config.pageExt || '.html';
    this.config.transitionIn  = 'transition.' + (config.transitionIn || 'slideDownBigIn');
    this.config.transitionOut = 'transition.' + (config.transitionOut || 'slideUpBigOut');
    this.config.activeNav     = config.activeNav || 'is-active';
    this.config.defaultView   = (this.config.withBang ? '!' : '') + (config.defaultView || 'welcome');
    this.config.missingView   = (this.config.withBang ? '!' : '') + (config.missingView || 'not-found');

    if (typeof config.onBeforeChange === 'function') {
      $.subscribe('yoshi.currentView', function(name, view) {
        view = (typeof view === 'undefined') ? null : view;
        config.onBeforeChange(view);
      });
    }

    if (typeof config.onAfterChange === 'function') {
      $.subscribe('yoshi.getView', function(name, html, view) {
        config.onAfterChange(view);
      });
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
    var view = $('[data-view]:visible').data('view');

    if (!route.length) {
      _this.setHash(_this.config.defaultView);
      return;
    }

    if (route !== view) {
      $.publish('yoshi.currentView', view);
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
    var $section = $('[data-view].is-active');

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
    var $section = $('[data-view].is-active');

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
    var $section = $('[data-view="' + view + '"]').addClass('is-active');

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
    $('[data-height]').css('height', winHeight);
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
