 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a, .contactus", function(e) {
			e.preventDefault();
			
      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top
      }, 600, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
	OnePageNavigation();
	
	let animating = false;
  var siteScroll = function() {
  	$(window).scroll(function() {
  		var st = $(this).scrollTop();
  		if (st > 100) {
				$('.js-sticky-header').addClass('shrink');
				if (!animating && $('.whatsapp').css('right') === '-215px') {
					animating = true;
					$('.whatsapp').animate({
						'right': '+=225px'
					}, 'fast', 'easeInOutCirc', function () {
						animating = false;
					});
				};
				
  		} else {
				$('.js-sticky-header').removeClass('shrink');
				if (!animating && $('.whatsapp').css('right') === '10px') {
					animating = true;
					$('.whatsapp').animate({
						'right': '-=225px'
					}, 'fast', function() {
						animating = false;
					});
				}
			}
  	}) 

  };
	siteScroll();

	$('[data-toggle="popover"]').popover({
		container: 'body',
		placement: 'top',
		trigger: 'manual'
	});

	$('.whatsapp a').click(function(e){
		e.preventDefault();
		let href = this.href;
		$.ajax({
			type: "POST",
			url: "whatsapp.php",
			dataType: "json",
			success: function(data){
				let url = href + '/' + data['number'];
				window.open(url, '_blank');
			}
		});
	});


	$(".footer-subscribe").validate({
		errorPlacement: $.noop
	});
	$("#contactus").validate({
		errorPlacement: $.noop
	});
	
	$('#contact').prop('disabled', 'disabled');
	$('#cemail').on('blur keyup', function() {
    if ($("#contactus").valid()) {
        $('#contact').prop('disabled', false);  
    } else {
        $('#contact').prop('disabled', 'disabled');
    }
	});

	$('#contact-footer').prop('disabled', 'disabled');
	$('#lead-email-footer').on('blur keyup', function() {
    if ($(".footer-subscribe").valid()) {
        $('#contact-footer').prop('disabled', false);  
    } else {
        $('#contact-footer').prop('disabled', 'disabled');
    }
	});
});