'use strict';

(function ($) {

  /**
   * Provides the off-canvas menu.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for the off-canvas menu.
   */
  Drupal.behaviors.responsive_menu_mmenu = {
    attach: function (context) {

      $(context).find('body').once('mm-menu').each(function () {
        if (typeof Mmenu !== "undefined") {
          var settings = drupalSettings.responsive_menu;
          var position = settings.position,
              theme = settings.theme,
              pagedim = settings.pagedim;
          var options = {
            extensions: [theme, 'fx-menu-slide', position === 'left' ? 'position-left' : 'position-right'],
            keyboardNavigation: {
              enable: true,
              enhance: true
            }
          };

          if (pagedim !== 'none') {
            options.extensions.push(pagedim);
          }

          var config = {
            classNames: {
              selected: 'menu__item--active-trail'
            }
          }; // Allow the settings and options to be extended or overridden.

          if (typeof settings.custom !== 'undefined') {
            if (typeof settings.custom.options !== 'undefined') {
              $.extend(options, drupalSettings.responsive_menu.custom.options);
            }

            if (typeof drupalSettings.responsive_menu.custom.config !== 'undefined') {
              $.extend(config, drupalSettings.responsive_menu.custom.config);
            }
          } // Set up the off canvas menu.


          var menu = new Mmenu('#off-canvas', options, config); // Add Custom Close Button

          // Wrap mobile menu in nav
          $('.mm-panels').wrap('<nav class="mm-panels-wrapper" aria-label="Mobile Menu"></nav>');

          // Change mobile menu title element
          $('.mm-panels .mm-navbar .mm-navbar__title').wrap('<h2 class="mm-navbar__title" tabindex="-1"></h2>');
          $('.mm-panels .mm-navbar .mm-navbar__title span').unwrap();

          // Add Custom Close Button
          $('.mm-panels .mm-navbar').append('<button href="#" class="mm-btn mm-navbar__btn close-menu"><span class="text">Close Menu</span><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path class="icon icon--close" fill="#000" fill-rule="nonzero" d="M11.82 1.36L7.18 6l4.64 4.64-1.18 1.18L6 7.18l-4.64 4.64-1.18-1.18L4.82 6 .18 1.36 1.36.18 6 4.82 10.64.18z"/></svg></button>'); // Handle close button and call close method


          $('#toggle-icon').on('click', function() {
            $(this).preventDefault;
            menu.API.open();
            $('#mm-1').find('.mm-navbar__title').focus();
            $('#toggle-icon').attr('aria-expanded', 'true');
          });

          // Handle close button and call close method
          $('.close-menu').click(function () {
            $(this).preventDefault;
            menu.API.close();
            $('#toggle-icon').attr('aria-expanded', 'false');
            $('#toggle-icon').focus();
          });

          $('.mm-tabstart').on('click', function() {
            $('#toggle-icon').attr('aria-expanded', 'false');
          });

          // Send focus to title when navigating through menu levels
          $('.mm-btn_next, .mm-btn_prev').on('click', function() {
            var menu_id = $(this).attr('href');
          });
        }
      });
    }
  };

  /**
   * Provides additional but optional functionality.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for superfish and hammerjs.
   */
  Drupal.behaviors.responsive_menu_optional = {
    attach: function (context, settings) {

      $(context).find('body').once('responsive-menu-optional').each(function () {
        // Apply the superfish library to the menu.
        if ($.fn.superfish && drupalSettings.responsive_menu.superfish.active) {
          // Get the superfish settings.
          var superfishDelay = drupalSettings.responsive_menu.superfish.delay,
              superfishSpeed = drupalSettings.responsive_menu.superfish.speed,
              superfishSpeedOut = drupalSettings.responsive_menu.superfish.speedOut; // Attach superfish to the responsive menu.

          $('#horizontal-menu').superfish({
            delay: parseInt(superfishDelay, 10),
            speed: parseInt(superfishSpeed, 10),
            speedOut: parseInt(superfishSpeedOut, 10)
          }).addClass('sf-menu');
        } // Add the Hammer config if needed.


        if (typeof Hammer !== 'undefined') {
          var mc = new Hammer($('body').get(0), {
            cssProps: {
              userSelect: true
            },
            // Reset the touchAction to auto as this allows pinch zooming.
            // mmenu handles the scrolling once open.
            touchAction: 'auto'
          });
          mc.get('swipe').set({
            velocity: 0.3,
            threshold: 5
          });
          mc.on("swipeleft swiperight", function (e) {
            // Only do something if we're below our breakpoint. The simplest
            // method is to check whether the horizontal desktop sized
            // responsive menu is hidden.
            if ($('.responsive-menu-block-wrapper').is(':hidden')) {
              hammerswipe(mc, e);
            }
          });
        }
      });
    }
  };

  /**
   * Opens or closes the mmenu based on swipe direction.
   *
   * @param mc
   *   Hammer object instance.
   * @param e
   *   Swipe event.
   */
  function hammerswipe(mc, e) {
    var position = drupalSettings.responsive_menu.position;
    var api = $('#off-canvas').data('mmenu'),
        $html = $('html');

    if (e.type == 'swiperight') {
      if (position == 'right' && $html.hasClass('mm-opened')) {
        // Close the menu.
        api.close();
      }

      if (position == 'left' && !$html.hasClass('mm-opened')) {
        // Open the menu.
        api.open();
      }
    }

    if (e.type == 'swipeleft') {
      if (position == 'right' && !$html.hasClass('mm-opened')) {
        // Open the menu.
        api.open();
      }

      if (position == 'left' && $html.hasClass('mm-opened')) {
        // Close the menu.
        api.close();
      }
    }
  }

})(jQuery);
