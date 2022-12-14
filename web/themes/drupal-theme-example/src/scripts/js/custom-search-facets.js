/**
 * @file
 * Facets Toggle Script.
 */

(function ($, Drupal) {
  'use strict';

  // ===== Toggle and handle search input on mobile and mid screened devices

  Drupal.behaviors.facetsToggle = {
    attach: function (context, settings) {
      var $facetHeadings = $('button.facet-group-toggle');

      function toggleFacets(element) {
        $(element).toggleClass('open');
        var $facetList = $(element).parent().next();

        // Toggled Open
        if ($(element).hasClass('open')) {
          $(element).attr("aria-expanded", true);
          $facetList.show();
        }

        // Toggled Closed
        else {
          $(element).attr("aria-expanded", false);
          $facetList.hide();
        }
      }

      // Bind Click
      $facetHeadings.once('search-facets').on('click', function() {
        toggleFacets(this);
      });
    }
  };
})(jQuery, Drupal);
