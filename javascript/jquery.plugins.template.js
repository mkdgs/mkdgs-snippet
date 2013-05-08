/**
 * @author mickael desgranges
 * @desc http://desgranges.biz
 * @version 1.0
 */
(function( $ ){	
	"use strict";
	var methods = {};   
	var pluginName = 'myPlugin';
	
	// répupère l'url du script (pour autoload)
	var scriptUrl = (function() {
		if( s = document.currentScript ) { // support defer & async (mozilla only)
			return s.src; 
		}
		else {
			var ls = document.getElementsByTagName('script'),s = ls[ls.length - 1];
		    	if (s.getAttribute.length !== undefined) return s.src
			return s.getAttribute('src', -1);
		}
	})();
	
	var scriptPath =  scriptUrl.substring(0, scriptUrl.lastIndexOf('/'))+"/";
	
	methods.init = function(params) {	    
	    return this.each(function() { 
	 		var op;
			if (!op) {
				var options = {
						'default'	: 'option'
				};
				op = jQuery.extend(options, params);				
			    op.$el = $(this);
			    // set + config
			    
			} else op = $(this).data(pluginName);

			// code here
			
		   	// set instance
		   	$(this).data(pluginName, op);	   	
	    });	
	};
	
	methods.myMethod = function(arg) {		
		 var op = $(this).data(pluginName);		
		 // code here
	};
	
	$.fn[pluginName] = function(m) {
			if (methods[m]) { return methods[m].apply(this, Array.prototype.slice.call(arguments, 1)); } 
			else if (typeof m === 'object' || !m) return methods.init.apply(this, arguments);
			else $.error(pluginName+' Method ' + m + ' fail ');
	};
		    
})( jQuery );
