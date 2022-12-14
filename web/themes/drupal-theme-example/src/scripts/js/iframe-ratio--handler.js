
/**
 * @file
 * Handle setting the ratio for embedded iframes
 */

(function ($, Drupal) {
  $(function() {
    $('iframe').wrap('<div class="iframe-container"></div>');

    $('iframe').each(function(i) {
      var iframeWidth = $(this).attr('width');
      var iframeHeight = $(this).attr('height');
      var ratioPercentage = ((iframeHeight / iframeWidth) * 100).toFixed(2) + '%';
      var iframeAlignment = $(this).attr('align');

      $(this).parent('.iframe-container').addClass('align-' + iframeAlignment);
      $(this).parent('.iframe-container').append('<div class="iframe-ratio-setter" style="padding-top: '+ ratioPercentage +';"></div>')
    });
  });
})(jQuery, Drupal);
