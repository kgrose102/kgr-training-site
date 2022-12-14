/**
 * @file
 * Wrap table elements in a container 
 */

(function ($, Drupal) {
  $(function() {
    // Wrap tables in a container in order to implement horizontal
    // scrolling on overflow
    $('.block-system-main-block table').wrap('<div class="table-container"></div>');
  });
})(jQuery, Drupal);