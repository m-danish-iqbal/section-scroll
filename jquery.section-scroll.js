/*
 *  jQuery Section Scroll v2
 *  Contributor: https://github.com/sylvainbaronnet
 *
 *  Copyright (c) 2016 Danish Iqbal
 *  http://plugins.imdanishiqbal.com/section-scroll
 *
 *  Licensed under MIT
 *
 */
(function ($) {
    'use strict';

    $.fn.sectionScroll = function (options) {
      var $container = this,
          $window = $(window),
          $section_number = 1,
          lastId,
          settings = $.extend({
            bulletsClass: 'section-bullets',
            sectionsClass: 'scrollable-section',
            scrollDuration: 1000,
            titles: true,
            topOffset: 0,
            easing: ''
          }, options);

      var $sections = $('.' + settings.sectionsClass);
      var $bullets  = $('<div class="bullets-container"><ul class="'+ settings.bulletsClass +'"></ul></div>')
                      .prependTo($container)
                      .find('ul');

      /* Build navigation */
      var bullets_html = '';
      $sections.each(function () {

          var $this = $(this);
          var title = $this.data('section-title') || '';

          $this.attr('id', 'scrollto-section-' + $section_number);

          var bullet_title = settings.titles ? '<span>' + title + '</span>' : '';

          bullets_html += '<li><a title="' + title + '" href="#scrollto-section-' + $section_number + '">' + bullet_title + '</a></li>';
          
          $section_number++;
      });
      
      var $bullets_items = $(bullets_html).appendTo($bullets);

      var scrollItems = $bullets_items.map(function () {
          var item = $($(this).find('a').attr('href'));
          if (item[0]) {
              return item;
          }
      });

      $bullets_items.on('click', function (e) {

          var href = $(this).find('a').attr('href'),
              offsetTop = href === '#' ? 0 : $(href).offset().top;

          $('html, body').stop().animate({

              scrollTop: offsetTop - settings.topOffset
          }, settings.scrollDuration, settings.easing, function(){
              $container.trigger('scrolled-to-section').stop();
          });
          e.preventDefault();
      });

      $window.on('scroll', function () {
          var fromTop = $window.scrollTop() + ($window.height() / 2.5);

          var cur = scrollItems.map(function () {

              if ($(this).offset().top < fromTop) {
                  return this;
              }
          });
          cur = cur.length > 0 ? cur[cur.length - 1] : [];
          var id = cur[0] ? cur[0].id : '';

          if (lastId !== id) {
              $sections.removeClass('active-section');
              
              $(cur).addClass('active-section');
              $bullets_items
                  .removeClass('active')
                  .find('a[href="#' + id + '"]')
                  .parent()
                  .addClass('active');

              lastId = id;
              $.fn.sectionScroll.activeSection = cur;
              $container.trigger('section-reached');
          }
      });

      $(function() {
          $window.scroll();
      });

      return $container;
    };
}(jQuery));
