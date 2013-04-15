/*
* Make link with block (div)
*/
$(function(){
	var base = $("base");
	$('.clickIt, .clickit').each(function() {
	    var link = $(this).attr('data-href');
	    if( !link ) link = $(this).find('[href]').first().attr('href');
	    if ( link ) {	        
	        $(this).click(function () {
		        if( link.indexOf('http') === 0 ) window.location.href = link;
		        else window.location.href = (base ? base.attr("href") : "")+link;
	        });
	    }
	});
});

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

for i8 and older if you use <base > fix the base bug:
var base = $("base");
$(this).click(function () {
	window.location.href = (base ? base.attr("href") : "")+link;
});
