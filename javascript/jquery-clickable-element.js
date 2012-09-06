$(function(){
	$('.clickIt').each(function() {
	    var link = $(this).find('[href]').first().attr('href');
	    if ( link ) {
	        $(this).click(function () {
	            window.location = link;
	        });
	    }
	});
});