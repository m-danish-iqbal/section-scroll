/*
 *  jQuery Section Scroll v1.0.1
 *
 *  Copyright (c) 2016 Danish Iqbal
 *  http://plugins.imdanishiqbal.com/section-scroll
 *
 *  Licensed under MIT
 *
 */
(function ($) {
    $.fn.sectionScroll = function (options) {
      var $container,
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
      $container = this;
      $section_number = 1;
      $window = $(window);
      $section_elem = settings.sectionsClass;
      $bullets_class = settings.bulletsClass;

      $sections = $('.' + $section_elem);
      $bullets = $('<div class="bullets-container"><ul class="'+ $bullets_class +'"></ul></div>')
                 .prependTo($container)
                 .find('ul');

      totalSections = 0;
      $sec_id = 0;

      /* Build navigation */
      var bullets_html = '';
      $sections.each(function () {

          var $this = $(this);
          var title = $this.data('section-title') || '';

          $this.attr('id', 'scrollto-section-' + $section_number);
          $sec_id++;

          var bullet_title = '';
          if(settings.titles) {
            bullet_title = '<span>' + title + '</span>';
          }
          bullets_html += '<li><a title="' + title + '" href="#scrollto-section-' + $sec_id + '">' + bullet_title + '</a></li>'
          
          $section_number++;
          totalSections++;
      });
      
      var $bullets_items = $(bullets_html).appendTo($bullets);


      var lastId,
          $bulletsMenuHeight = $bullets.outerHeight() + 15,
          scrollItems = $bullets_items.map(function () {
              var item = $($(this).find('a').attr("href"));
              if (item[0]) {
                  return item;
              }
          });

      $bullets_items.click(function (e) {

          var href = $(this).find('a').attr("href"),
              offsetTop = href === "#" ? 0 : $(href).offset().top;

          $('html, body').stop().animate({

              scrollTop: offsetTop - settings.topOffset
          }, settings.scrollDuration, settings.easing, function(){
              $container.trigger('scrolled-to-section').stop();
          });
          e.preventDefault();
      });

      $window.scroll(function () {
          var fromTop = $window.scrollTop() + ($window.height() / 2.5);

          var cur = scrollItems.map(function () {

              if ($(this).offset().top < fromTop) {
                  return this;
              }
          });
          cur = cur[cur.length - 1];
          var id = cur[0] ? cur[0].id : '';
          $.fn.sectionScroll.activeSection = cur;
          $activeSection = cur;
          if (lastId !== id) {
              $sections.removeClass('active-section');
              
              $(cur).addClass('active-section');
              $bullets_items
                  .removeClass('active')
                  .find('a[href="#' + id + '"]')
                  .parent()
                  .addClass('active');

              lastId = id;
              $container.trigger('section-reached');
          }
      }).scroll(); // trigger scroll event

      return $container;
    };
}(jQuery));
