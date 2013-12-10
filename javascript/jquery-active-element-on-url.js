$(function(){	
    var url = window.location.href;
	var baseUrl = $4p.glob('url');
	var rgx  = new RegExp(baseUrl);
    url = decodeURI(url.replace(rgx,'').replace(/\/$/,''));
    $('[data-active-on]').each(function(){       
        var rgx = new RegExp($(this).attr('data-active-on'));
        if ( rgx.test(url) ) {
           $(this).addClass('active');
           $(this).trigger('active',[ $(this) ]);
        }
    });   
});
