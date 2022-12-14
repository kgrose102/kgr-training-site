/**
 * @file
 * Menu Controls Handler
 */

(function ($, Drupal) {

  // ===== Add menu control to the custom close button in the mobile navigation panel
  $(function() {
    var $subMenuToExpand = $('.custom-simple-sidebar-menu .menu-item--expanded > ul');
    $subMenuToExpand.before('<button class="sub-menu--toggle" aria-expanded="false"><span class="text visually-hidden">Show Sub Menu</span><span class="icon icon-chevron-down"></span></button>');
    var $subMenuToggle = $('.sub-menu--toggle');

    // ===== Set sub menu toggles
    $subMenuToggle.each(function(i) {
      var subMenuItemText = $(this).prev('a').text();
      $(this).children('.text').text('Show ' + subMenuItemText + ' sub menu');

      if ($(this).parent().hasClass('menu-item--active-trail')) {
        toggleMenu($(this));
      }
    });

    // ===== Toggle Sub Menu
    function toggleMenu(e) {
      var subMenuItemText = e.prev('a').text();
      e.prev('a').toggleClass('show');
      e.next('ul').toggleClass('show');
      e.toggleClass('show');

      if (e.attr('aria-expanded', false)) {
        e.attr('aria-expanded', true);
        e.children('.text').text('Hide ' + subMenuItemText + ' sub menu');
      }
      else {
        e.attr('aria-expanded', false);
        e.children('.text').text('Show ' + subMenuItemText + ' sub menu');
      }
    }

    $subMenuToggle.click(function() {
      toggleMenu($(this));
    });
  });

})(jQuery, Drupal);
