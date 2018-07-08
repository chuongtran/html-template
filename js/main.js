$('document').ready(function () {
  $(function() {
    $('a[href*=\\#]:not([href=\\#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

    $('a[href=\\#]').click(function() {
      $('html,body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  });


  var btnContactTop = $('.btn-contact').offset().top;
  var menuTop = $('header nav').offset().top;
  var toTop = $('html,body').scrollTop();
  if (toTop > menuTop) {
    $('header nav').addClass('fixed');
  }
  else {
    $('header nav').removeClass('fixed');
  }
  if (toTop > btnContactTop) {
    $('.btn-contact').removeClass('active');
    $('#side-buttons').addClass('active');
    
  }
  else {
    $('.btn-contact').addClass('active');
    $('#side-buttons').removeClass('active');
  }


  $(window).on('scroll', function () {
    var toTop = $('html,body').scrollTop();
    if (toTop > menuTop) {
      $('header nav').addClass('fixed');
    }
    else {
      $('header nav').removeClass('fixed');
    }

    if (toTop > btnContactTop) {
      $('.btn-contact').removeClass('active');
      $('#side-buttons').addClass('active');
      
    }
    else {
      $('.btn-contact').addClass('active');
      $('#side-buttons').removeClass('active');
    }

    $('.section').each(function () {
      var sectionElem = $(this);
      var sectionTop = sectionElem.offset().top;
      var sectionHeight = sectionElem.innerHeight();
      
      if (sectionTop <= (toTop+60) && (toTop+60) <= sectionTop + sectionHeight) {
        $('header nav a[href="#'+this.id+'"]').addClass('active');
      }
      else {
        $('header nav a[href="#'+this.id+'"]').removeClass('active');
      }
    });
  });

  $('.slider').each(function () {
    var element = $(this);
    var attrs = element.getAttributes();
    var owlOptions = {
        items: attrs.items || 1,
        margin: attrs.margin && Number(attrs.margin) || 0,
        stagePadding: attrs.padding && Number(attrs.padding) || 0,
        smartSpeed: 1000,
        autoplayTimeout: 3000,
        nav: true,
        navText: ['<i class="flaticon-arrows-1"></i>','<i class="flaticon-right-chevron"></i>'],
        dots: !!attrs.dot || false,
        responsive: {
          768: {
            items: attrs.items || 1,
          },
          480: {
            items: attrs['items-on-mobile'] || 1
          },
          0: {
            items: 1
          }
        }
      };
      if (attrs['no-nav']) {
        owlOptions.nav = false; 
      }
      if (element.find('.slide').length > 1 && !attrs['no-loop']) {
        owlOptions.loop = true;
      }
      if (attrs['no-drag']) {
        owlOptions.mouseDrag = false;
        owlOptions.touchDrag = false;
      }
      if (attrs['thumbnail-of']) {
        setTimeout(function () {
          element.find('.slide').on('click', function () {

            var index = $(this).parents('.owl-item').index();
            $('.brand-slider .slider.slider-'+attrs['thumbnail-of']).trigger('to.owl.carousel', index);
            return false;
          })
        })
      }
      if (attrs['autoplay']) {
        owlOptions.autoplay = true;
      }
      element.owlCarousel(owlOptions);  
  });
});


(function($) {
  $.fn.getAttributes = function() {
    var attributes = {}; 

    if( this.length ) {
        $.each( this[0].attributes, function( index, attr ) {
            attributes[ attr.name ] = attr.value;
        } ); 
    }

    return attributes;
  };
})(jQuery);