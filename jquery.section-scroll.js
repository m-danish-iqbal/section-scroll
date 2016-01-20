/*
 *  jQuery Section Scroll v1.0.0
 *
 *  Copyright (c) 2016 Danish Iqbal
 *  http://plugins.imdanishiqbal.com/section-scroll
 *
 *  Licensed under MIT
 *
 */
(function ($) {
    $.fn.sectionScroll = function (options) {
      var $parent_elem,
        $window,
        $section_elem,
        $section_number,
        $bullets,
        $sectionInView,
        totalSections,
        $sec_id,
        $bullets_class,
        $default_sections_class,
        $default_bullets_class,
        // Default options.
        settings = $.extend({
            bulletsClass: 'section-bullets',
            sectionsClass: 'scrollable-section',
            scrollDuration: 1000,
            titles: true,
            topOffset: 0,
            easing: ''
        }, options);
      $parent_elem = this;
      $section_number = 1;
      $window = $(window);
      $section_elem = settings.sectionsClass;
      $bullets_class = settings.bulletsClass;

      $bullets = '<div class="bullets-container"><ul class="'+ $bullets_class +'"></ul></div>';
      $parent_elem.prepend($bullets);

      totalSections = 0;
      $sec_id = 0;

      $('.' + $section_elem).each(function () {

          if (!($(this)).data('section-title')) {
              $(this).attr('data-section-title', '');
          }

          $(this).attr('id', 'scrollto-section-' + $section_number);
          $sec_id++;
          $('.' + $bullets_class).append('<li><a title="' + $(this).data('section-title') + '" href="#scrollto-section-' + $sec_id + '"><span>' + $(this).data('section-title') + '</span></a></li>');
          $section_number++;
          totalSections++;

      });


      if (!(settings.titles)) {
          $('.' + $bullets_class).find('span').remove();
      }

      var lastId,
          $bulletsMenuHeight = $('.' + $bullets_class).outerHeight() + 15,
          menuItems = $('.' + $bullets_class).find("li"),
          scrollItems = $(menuItems).map(function () {
              var item = $($(this).find('a').attr("href"));
              if ($(item).length) {
                  return item;
              }
          });


      menuItems.click(function (e) {

          var href = $(this).find('a').attr("href"),
              offsetTop = href === "#" ? 0 : $(href).offset().top;

          $('html, body').stop().animate({

              scrollTop: offsetTop - settings.topOffset
          }, settings.scrollDuration, settings.easing, function(){
              $parent_elem.trigger('scrolled-to-section').stop();
          });
          e.preventDefault();
      });

      $(document).ready(function () {
          $('html, body').stop().animate({
              scrollTop: 1
          }, 0);

          var fromTop = $(this).scrollTop();
          var cur = scrollItems.map(function () {
              if ($(this).offset().top < fromTop) return this;
          });
          cur = cur[cur.length - 1];
          var id = cur && cur.length ? cur[0].id : "";
          $.fn.sectionScroll.activeSection = cur;

          if (lastId !== id) {
              $('.' + $section_elem).removeClass('active-section');
              lastId = id;
              $parent_elem.trigger('section-reached');
              setTimeout(function () {

                  $(cur).addClass('active-section');
                  menuItems
                      .removeClass("active")
                      .end()
                      .find('a').filter("[href=#" + id + "]")
                      .parent()
                      .addClass("active");
              });
          }
      })
      $(window).scroll(function () {
          var fromTop = $(this).scrollTop() + ($window.height() / 2.5);

          var cur = scrollItems.map(function () {

              if ($(this).offset().top < fromTop) {

                  return this;
              }

          });
          cur = cur[cur.length - 1];
          var id = cur && cur.length ? cur[0].id : "";
          $.fn.sectionScroll.activeSection = cur;
          $activeSection = cur;
          if (lastId !== id) {
              $('.' + $section_elem).removeClass('active-section');
              lastId = id;
              $parent_elem.trigger('section-reached');
              setTimeout(function () {
                  $(cur).addClass('active-section');
                  menuItems
                      .removeClass("active")
                      .end()
                      .find('a').filter("[href=#" + id + "]")
                      .parent()
                      .addClass("active");
              });
          }
      });
      return $parent_elem;
    };
}(jQuery));
