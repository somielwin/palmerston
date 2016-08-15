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
		$('.banner-slider').css({'height' : windowHeight - (headerHeight + 48)});
		$('.flexslider, .ban-slider-img').css({'height' : windowHeight - (headerHeight + 48)});
	}

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
	var ClassName = get_biggest($('.classname'));
	$('.classname').css({minHeight: ClassName});

}

$(window).resize(function() {
	resize();
	doCoverImage();
});

$(document).ready(function() {
	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	resize();
	doCoverImage();
	initCustomForm();

	// Footer Mobile Accordion
	$('.product-accordion h6').click(function(){
		
		
		if($(this).hasClass('active')) {
			$('.product-accordion h6').removeClass('active').next('ul').stop(true, false).slideUp();
		} else {
			$('.product-accordion h6').removeClass('active');
			$('.product-accordion ul').stop(true, false).slideUp();
			$(this).addClass('active').next('ul').stop(true, false).slideDown();
		}
	});
	
	// Home FlexSlider
	$('.flexslider').flexslider({
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
	            items:1,
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
	            loop:false
	        },
	        992:{
	            items:4,
	            nav:true,
	            loop:false
	        }
	    }
	});

  	// Mobile Hamburger
	$('.header-hamburger').click(function(){
        var _this = $(this);
    	
    	$('#main-container').toggleClass('slide-left');
    	$('.menu').toggleClass('slide-left');
    	$('header').toggleClass('slide-left');

	    setTimeout(function(){
            _this.toggleClass('active');
        }, 400);

    });	

	// 
    $('#main-container.slide-left').click(function(){
    	console.log('testtt');
    	$('#main-container').removeClass('slide-left');
    	$('.menu').removeClass('slide-left');
    	$('header').removeClass('slide-left');

    	 setTimeout(function(){
            $('.header-hamburger').toggleClass('active');
        }, 400);
    });

    $('.mobile-bottom-close').click(function(){
    	$(this).closest('.top-header').addClass('removed');
    	$('footer').addClass('removed-space');
    });

    // Product Inquiry 
    $('.pd-desc-wrap .btn-enquire').click(function(e){
    	e.preventDefault();
    	$(this).addClass('active');
    	$('.product-enquiry').slideDown(300);

    	setTimeout(function(){
    		var offset = $('.product-enquiry').offset().top + $('.product-enquiry').outerHeight(false) - $(window).height();
    		console.log(offset);
    		$("html, body").animate({ scrollTop: offset });
    	}, 400);
    });

    // Close Product Inquiry 
    $('.p-enquiry-backbtn').click(function(e){
    	e.preventDefault();
    	console.log('test');
    	$('.product-enquiry').css({'display' : 'none'});
    });

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
	assignSliderVal();
});

$(window).load(function() {
	resize();
	doCoverImage();
});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
	}, 500);
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
