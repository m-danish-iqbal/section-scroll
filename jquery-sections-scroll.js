(function ( $ ) {
  
    $.fn.sectionScroll = function( options ) {

    	var $parent_elem,
            $section_elem,
    		$section_number,
            $bullets,
            totalSections,
            $sec_id,
            $bullets_class,
            $default_sections_class,
            $default_bullets_class,
            // Default options.
            settings = $.extend({
                customBulletsClass: '',
                customSectionsClass: '',
                duration: 300
            }, options );


    	$parent_elem = this;
		$section_number = 1;
        

		
        
        $default_bullets_class = 'section-bullets';
        $default_sections_class = 'scrollable-section';
        
        $section_elem = (settings.customSectionsClass === '') ? $default_sections_class : settings.customSectionsClass;
        $bullets_class = (settings.customBulletsClass === '') ? $default_bullets_class : settings.customBulletsClass;
        $bullets = '<ul class="' + $bullets_class + '"></ul>';
		$parent_elem.prepend($bullets);
        
        
		totalSections = 0;
		$sec_id = 0;

		  $('.' + $section_elem).each( function() {

			if(!($(this)).data('section-title')) {
				$(this).attr('data-section-title' , 'Untitled');
			}

		   	$(this).attr('id', 'scrollto-section-' + $section_number);
		    $sec_id++;
            
			$('.' + $bullets_class).append('<li><span>' + $(this).data('section-title') +'</span><a href="#scrollto-section-' + $sec_id +'"></a></li>');
		    $section_number++;
		    totalSections++;
			
		});
        
        
		function scrollToSection(targetSection) {
			$($parent_elem).animate({
		        scrollTop: $(targetSection).offset().top
		    }, settings.duration);
		}
        

		$('.' + $bullets_class + ' > li a').click(function(e){
			e.preventDefault();
			targetSectionID = $(this).attr('href');
			scrollToSection(targetSectionID);
		})

		return $parent_elem;

	};
    

}( jQuery ));
