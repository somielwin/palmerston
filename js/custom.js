//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();

	if($('.banner-slider').length > 0) {

		if($('.top-header').length > 0 ) {
			$('.banner-slider').css({'height' : windowHeight -  ( headerHeight + 48 )});
			$('.flexslider, .ban-slider-img').css({'height' : windowHeight - (headerHeight + 48)});
		} else {
			$('.banner-slider').css({'height' : windowHeight - headerHeight});
			$('.flexslider, .ban-slider-img').css({'height' : windowHeight - headerHeight});
		}
		
	}

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.pc-img').css({minHeight: 0});
	var productList = get_biggest($('.pc-img'));
	$('.pc-img').css({minHeight: productList});


	$('.pcarousel-item').css({minHeight: 0});
	var productList = get_biggest($('.pcarousel-item'));
	$('.pcarousel-item').css({minHeight: productList});

}

$(window).resize(function() {
	resize();
	doCoverImage();

	if($('.header-hamburger').width() < 992) {
    	$('.sub-nav').click(function(e){
    		e.preventDefault();
    		$(this).find('ul').stop(true, false).slideToggle();
	    });
    }
});

$(document).ready(function() {
	var isBusy = false

	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	} 

	$('.animated').appear(function() {
        var element = $(this);
        var animation = element.data('animation');
        var animationDelay = element.data('delay');
        if(animationDelay) {
          setTimeout(function(){
              element.addClass( animation + " visible" );
              element.removeClass('hiding');
          }, animationDelay);
        } else {
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
        }               
    }, {accY: -90});

	resize();
	doCoverImage();
	initCustomForm();

	

	// Footer Mobile Accordion
	$('.product-accordion h6 a').click(function(e){

		if($(this).hasClass('active')) {
			return true;
		} else {
			$('.product-accordion activated').stop(true, false).slideUp();
			$('.product-accordion h6 a').removeClass('active');
			$('.product-accordion ul').stop(true, false).slideUp();
			$(this).addClass('active').closest('.product-accordion').find('ul').stop(true, false).slideDown();

			e.preventDefault();
		}
	});
	
	// Home FlexSlider
	$('.banner-slider .flexslider').flexslider({
    	animation: "slide",
    	start: function(){
    		doCoverImage();
    	}
  	});

	// Product Sale Carousel
  	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:15,
	    responsiveClass:true,
	    navigationText: false,
	    pullDrag: false,
	    responsive:{
	        0:{
	            items:2,
	            nav:true
	        },
	        481:{
	            items:2,
	            nav:false
	        },
	        600:{
	            items:3,
	            nav:false
	        },
	        810:{
	            items:4,
	            nav:true,
	        },
	        992:{
	            items:4,
	            nav:true,
	        }
	    }
	});

  	// Mobile Hamburger
	$('.header-hamburger').click(function(){
        var _this = $(this);

        if(isBusy == false) {
    		
    		isBusy = true;
    	
	    	$('#main-container').toggleClass('slide-left');
	    	$('.menu').toggleClass('slide-left');
	    	$('header').toggleClass('slide-left');
	    	$('.mobile-filter-btn, .mobile-filter-btn a').toggleClass('slide-left');

		    setTimeout(function(){
	            _this.toggleClass('active');

	            if($('header').hasClass('slide-left')) {
	            	$('header').append('<a href="#" class="ho-left">overlay</a>');
	            	
	            } else {
	            	$('.ho-left').remove();
	            }
            
        		isBusy = false;
        		
	        }, 400);
    	} 

    });	


	// 
    $(document).on('click','.ho-right', function(e){
    	e.preventDefault();

    	if(isBusy == false) {
    		
    		isBusy = true;
    		console.log(isBusy);
	    	$('#main-container').toggleClass('slide-right');
	    	$('.filter-wrap').toggleClass('slide-right');
	    	$('header').toggleClass('slide-right');
	    	$('.mobile-filter-btn, .mobile-filter-btn a').toggleClass('slide-right');

	    	setTimeout(function(){

	            if($('header').hasClass('slide-right')) {
	            	$('header').append('<a href="#" class="ho-right">overlay</a>');
	            	
	            } else {
	            	$('.ho-right').remove();
	            }
	         isBusy = false;
	        }, 400);
    	} 
    });

    $(document).on('click','.ho-left', function(e){
    	e.preventDefault();

    	if(isBusy == false) {
    		
    		isBusy = true;
	    	$('#main-container').toggleClass('slide-left');
	    	$('.menu').toggleClass('slide-left');
	    	$('header').toggleClass('slide-left');
	    	$('.mobile-filter-btn, .mobile-filter-btn a').toggleClass('slide-left');

    	
    		setTimeout(function(){
	            $('.header-hamburger').toggleClass('active');

	            if($('header').hasClass('slide-left')) {
	            	$('header').append('<a href="#" class="ho-left">overlay</a>');
	            	
	            } else {
	            	$('.ho-left').remove();
	            }

	            isBusy = false;
	        }, 400);
    	} 
    });

    $('.mobile-filter-btn a').click(function(e){
    	e.preventDefault();

    	$('#main-container').toggleClass('slide-right');
    	$('header').toggleClass('slide-right');
    	$('.filter-wrap').toggleClass('slide-right');
    	$('.mobile-filter-btn, .mobile-filter-btn a').toggleClass('slide-right');

    	setTimeout(function(){
    		if($('header').hasClass('slide-right')) {
            	$('header').append('<a href="#" class="ho-right">overlay</a>');
            	
            } else {
            	$('.ho-right').remove();
            }
    	}, 400);
    });

    $('.btn-learnmore').click(function(e){
    	e.preventDefault();

    	var _this = ($(this).attr('href'));

    	$('html, body').animate({
	        scrollTop: $(_this).offset().top
	    }, 600);
    });

    $('.mobile-bottom-close').click(function(){
    	$(this).closest('.top-header').addClass('removed');
    	$('footer').addClass('removed-space');
    });

    // Product Inquiry 
    $('.pd-desc-wrap .btn-enquire').click(function(e){
    	e.preventDefault();
    	$(this).addClass('active');
    	$('.product-enquiry').stop(true, false).slideDown(300);

    	setTimeout(function(){
    		var offset = $('.product-enquiry').offset().top + $('.product-enquiry').outerHeight(false) - $(window).height();
    		console.log(offset);
    		$("html, body").animate({ scrollTop: offset });
    	}, 400);
    });

    $('.bloglinks-accordion h6').click(function(){
		
		if($(this).hasClass('active')) {
			$('.bloglinks-accordion h6').removeClass('active').next('ul').stop(true, false).slideUp();
		} else {
			$('.bloglinks-accordion h6').removeClass('active');
			$('.bloglinks-accordion ul').stop(true, false).slideUp();
			$(this).addClass('active').next('ul').stop(true, false).slideDown();
		}
	});

    // Close Product Inquiry 
    $('.p-enquiry-backbtn').click(function(e){
    	e.preventDefault();
    	console.log('test');
    	$('.product-enquiry').css({'display' : 'none'});
    });

    if( $('.noUiSlider').length > 0) {

    	$('.noUiSlider').noUiSlider({
			start: [ 0, 100000 ],
			margin: 20,
			connect: true,
			step: 100,
			format: wNumb({
				decimals: 0,
				thousand: ','
			}),
			range: {
				'min': 0,
				'max': 100000
			}
		}).on({
			slide: function() {
				assignSliderVal();
			}
		})
    }

    if($('.header-hamburger').width() < 992) {
    	$('.sub-nav').click(function(e){
    		e.preventDefault();
    		$(this).find('>ul').stop(true, false).slideToggle();
	    });
    }
    
    
	function assignSliderVal() {
		var newVal = $('.noUiSlider').val();
		var newValFirst = newVal[0].replace(/,/g, "");
		var newValSecond = newVal[1].replace(/,/g, "");

		$('.ps-min-price').html(( (newValFirst <= 10000000) ?  ('$ ' +newVal[0])  : '10M+' ));
		//$('.noUi-handle-lower').html('<span>' + 'P' + newVal[0] + '</span>');
		$('.ps-max-price').html(( (newValSecond > 10000000) ? '10M+' : ('$ '+newVal[1]) ));
		$('input[name="price_fm"]').val( newValFirst);
		$('input[name="price_to"]').val( (newValSecond > 10000000) ? 10050000 : newValSecond );
	}

	$('.close-text').click(function(e){
		e.preventDefault();
		$('.popup-wrap').removeClass('active');
	});

	$('.btn-enquiry-product').click(function(e){
		e.preventDefault();
		$('.popup-wrap').addClass('active');
	});
});

$(window).load(function() {
	resize();
	doCoverImage();


	$('.pd-big-img #carousel').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 122,
		itemMargin: 3,
		asNavFor: '#slider'
	});
 
	$('.pd-big-img #slider').flexslider({
		animation: "slide",
		controlNav: true,
		directionNav: false,
		animationLoop: false,
		slideshow: false,
		sync: "#carousel"
	});

});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
	}, 500);
});

$(window).on('scroll load', function(){
    var _cur_top = $(window).scrollTop();
    var topH = $('.top-header').outerHeight(false);
    if($('.top-header').length > 0 ) {
    	if(  _cur_top >=  topH) {
    		$('header').addClass('is-fixed');

    	} else {
    		$('header').removeClass('is-fixed');
    	}

    } else {
    	$('header').addClass('is-fixed');
    }
});

function doCoverImage() {	

	$('.ban-slider-img img, .banner-img-wrap img').each(function() {
		coverImage( $(this) );
	});

}



function coverImage( image ) {

	var imgObj = image;
	var iW = imgObj.attr('width');//width(); //width of image ratio
	var iH = imgObj.attr('height');//.height(); //height of image ratio

	imgObj.width(0).height(0);

	var imgContainer = image.parent();
	var cW = imgContainer.width(); //width of container or browser
	var cH = imgContainer.height(); //height of container or browser

	if ( cH > 1 ) {
		var cP = cW/cH; //ratio of container or browser
		var iP = iW/iH; //ratio of image

		if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
			iH = cH; //set image height from container height
			iW = cH * iP; //set image width using container height and image ratio

			imgObj.css({
				'margin-top': 0,
				'margin-left': Math.ceil((cW-iW)/2),
				'width': Math.ceil(iW),
				'height': Math.ceil(iH),

			}); //center the image and set dimensions

		} else { //if image ratio is less than container ratio (if image height is more than container height)
			iW = cW; //set image width from container width
			iH = cW / iP; //set image height from container width and ratio

			imgObj.css({
				'margin-top': Math.ceil((cH-iH)/2),
				'margin-left': 0,
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		}
	} else {
		imgObj.css({
			'margin-top': 0,
			'margin-left': 0,
			'width': 'auto',
			'height': 'auto'

		});
	}

}

function initCustomForm() {
    $('select.custom-select').each(function() {
        $(this).wrap('<div class="custom-select-wrapper" />');
        $(this).before('<div class="custom-select-display" />');
        $(this).change(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).keyup(function() {
            $(this).siblings('.custom-select-display').text( $(this).find('option:selected').text() );
        });
        $(this).change();
    });
}
