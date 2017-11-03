

function setWidth(){
	$('.border_round').each(function(){

		$(this).height($(this).width());
	});
};

$(document).ready(setWidth());
$(window).on('resize', setWidth);