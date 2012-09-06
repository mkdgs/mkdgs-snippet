"use strict";
	var intiEaster = function () {
			var kkeys = [], kode = "38,38,40,40,37,39,37,39";
			$(document).keydown(function(e) {
			  kkeys.push( e.keyCode );
			  if ( kkeys.toString().indexOf(kode) >= 0 ){
			    //$(document).unbind('keydown',arguments.callee);
			    
			    var randColor = function () {
					return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
				};
				var playSound = function (audioURL) {
					$('body').append('<embed src="'+url+'" hidden=true autostart=true loop=1 />');
				};
				var fuzz = function ($el) {
				 	$el.css('color',randColor());
				};				
				$('a,div,p,h1').each(function() {	
					if ( $(this).css('color') ) {				
						 setInterval(fuzz, 400, $(this));
					}	
				});	
				var url = $4p.glob('url_static')+'/Pop_Muzik.mid';

				playSound(url);		
			    return false;		     
			  }
			});
	};
	$(document).ready(function() {
		setTimeout(function() { intiEaster(); }, 500); 
	});