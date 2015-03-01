/**
 * @author mickael desgranges
 * @desc http://mkdgs.fr
 * @version 1.4
 */
(function( $ ){	
	"use strict";
	var methods    = {};   
	var pluginName = 'myPlugin'; 	// set plugin name
	var options = { 		// set efault options
		'default'	: 'option'
	};
	
	/* Lazy Loader get script path 
	 * see	
	 * http://stackoverflow.com/questions/984510/what-is-my-script-src-url/984656#984656
	 * http://www.glennjones.net/Post/809/getAttributehrefbug.htm
	 * 
	 * iterate all script to find script with right filename
	 * this work with async and defer (but your script MUST have a unique filemane)
	 * mozilla support document.currentScript and we use it, if is set
	 *
	 * this will not work with local script loaded by jQuery.getScript(),
	 * since there is no script tag added into the dom. the script is only evaluated in global space.
	 * http://api.jquery.com/jQuery.getScript/
	 *  
	 * to fix this odd, you can add a reference in meta ( meta[name=srcipt][content=url] )
	 * when you load the script
	 */
	var scriptFilename = 'jquery.plugins.template.js'; // don't forget to set the filename 
	var scriptUrl = (function() {
		if ( document.currentScript ) { // support defer & async (mozilla only)
			return document.currentScript.src;
		} else {
			var ls,s;
			var getSrc = function (ls, attr) {
				var i, l = ls.length, nf, s;
				for (i = 0; i < l; i++) {
					s = null;
					if (ls[i].getAttribute.length !== undefined) { 
						s = ls[i].getAttribute(attr, 2); 					
					}				
					if (!s)	continue; // tag with no src
					nf = s;
					nf = nf.split('?')[0].split('/').pop(); // get script filename
					if (nf === scriptFilename) {
						return s;
					}
				}
			};			
			ls = document.getElementsByTagName('script');
			s = getSrc(ls, 'src');
			if ( !s ) { // search reference of script loaded by jQuery.getScript() in meta[name=srcipt][content=url]
				ls = document.getElementsByTagName('meta');				
				s = getSrc(ls, 'content');
			}			
			if ( s ) return s;
		}
		return '';
	})();
		
	var scriptPath =  scriptUrl.substring(0, scriptUrl.lastIndexOf('/'))+"/";
	
	methods.init = function(params) {	    
	    return this.each(function() { 
	    		// an instance already exist ?
	 		var op = $(this).data(pluginName);
			if (op) return true; //IHAZ ONE CONTINUE
			
			op = jQuery.extend({}, options, params);
        		this[pluginName]=op;	// reference for accessing an instance inside a method
        		op.$el = $(this); 	// reference to this DOM object
        		op.that = this; 	// reference to this object
		        			    
			// awesome code here
			
		   	// set data instance
		   	$(this).data(pluginName, op);	
		   	
		   	// start to work here 
		   	methods.myMethod.apply(this, [args]); // how to accessing a public method
	    });	
	};
	
	
	/*
	* public method 
	* call outside by: $(element).pluginName('method', args... )
	* call inside by: methods.myMethod.apply(this, [args]); 
	*/
	methods.myMethod = function(args) {	
		 var op = this[pluginName]; // get instance 
		 		
		 // code here
		 
		 // get/set data instance
		 // var op = $(this).data(pluginName);
		 // if any change inside $(this).data(pluginName, op);	
	};
	
	var privateMethod = function(args) {
			
	};
	
	$.fn[pluginName] = function(m) {
			if (methods[m]) { return methods[m].apply(this, Array.prototype.slice.call(arguments, 1)); } 
			else if (typeof m === 'object' || !m) return methods.init.apply(this, arguments);
			else $.error(pluginName+' Method ' + m + ' fail ');
	};
		    
})( jQuery );
