/**
 * @author mickael desgranges
 * @desc http://mkdgs.fr
 * @version 1.3
 */
(function( $ ){	
	"use strict";
	var methods = {};   
	var pluginName = 'myPlugin'; // set plugin name
	
	/* see	
	 * http://stackoverflow.com/questions/984510/what-is-my-script-src-url/984656#984656
	 * http://www.glennjones.net/Post/809/getAttributehrefbug.htm
	 * 
	 * iterate all script to find script with right filename
	 * this work with async and defer (but your script MUST have a unique filemane)
	 * mozilla support document.currentScript and we use it, if is set
	 */
	var scriptFilename = 'jquery.plugins.template.js'; // don't forget to set the filename 
	var scriptUrl = (function() {
		if( document.currentScript ) { // support defer & async (mozilla only)
			return document.currentScript.src; 
		}
		else {
			var i,ls=document.getElementsByTagName('script'),l=ls.length,nf,s;
			for (i=0;i<l;i++) {
				s=null;
				if (ls[i].getAttribute.length !== undefined) s=ls[i].src 
				else s = ls[i].getAttribute('src', -1); // ie odd's
				if ( !s ) continue; // tag with no src
				nf = s; 
				nf = nf.split('?')[0].split('/').pop();	// get script filename		
				if ( nf === scriptFilename ) {
					return s;					
				}
			} 
		}
		return '';
	})();
		
	var scriptPath =  scriptUrl.substring(0, scriptUrl.lastIndexOf('/'))+"/";
	
	methods.init = function(params) {	    
	    return this.each(function() { 
	    		// an instance already exist ?
	 		var op = $(this).data(pluginName);
			if (!op) return true; //IHAZ ONE CONTINUE
			
			// set + config
			var options = {
						'default'	: 'option'
			};
		        op = jQuery.extend(options, params);				
			op.$el = $(this);
		        			    
			// awesome code here
			
		   	// set data instance
		   	$(this).data(pluginName, op);		   		   	
	    });	
	};
	
	methods.myMethod = function(arg) {		
		 var op = $(this).data(pluginName);		
		 // code here
		 
		 // set data instance
		 // if any change inside $(this).data(pluginName, op);	
	};
	
	$.fn[pluginName] = function(m) {
			if (methods[m]) { return methods[m].apply(this, Array.prototype.slice.call(arguments, 1)); } 
			else if (typeof m === 'object' || !m) return methods.init.apply(this, arguments);
			else $.error(pluginName+' Method ' + m + ' fail ');
	};
		    
})( jQuery );
