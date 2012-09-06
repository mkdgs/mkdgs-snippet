/**
 * @author mickael desgranges
 * @desc http://desgranges.biz
 * @version 1.0
 */
(function( $ ){	
	"use strict";
	var methods = {};   
	var pluginName = 'myPlugin';
	
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
