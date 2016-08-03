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
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

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
});

$(document).ready(function() {
	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	$('.flexslider').flexslider({
    	animation: "slide"
  	});
	
	resize();
});

$(window).load(function() {
	resize();
});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
	}, 500);
});
