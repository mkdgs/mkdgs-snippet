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