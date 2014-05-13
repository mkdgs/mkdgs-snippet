/**
 * @author mickael desgranges
 * @desc http://mkdgs.fr
 * @version 1.1
 *
 *  usage:
 *  <div id="btt">my top button</div>
 *
 *  $("#btt").backToTop();
 */
 
(function($){	
	"use strict";
	var methods    = {};   
	var pluginName = 'backToTop'; 
		
	methods.init = function(params) {	    
	    return this.each(function() { 
	    		// an instance already exist ?
	 		var op = $(this).data(pluginName);
			if (op) return true; 
			
			// set + config
			var options = {
                            scrollTop: 0,
                            speed    : 300,
                            effect   : 'swing', 
                            show     : function (op) { $(this).fadeIn();  },
                            hide     : function (op) { $(this).fadeOut(); }                            
                        };
		        op = jQuery.extend(options, params);				
			op.$el = $(this);
                        op.that = this;
                        op.viewportHeight = $(window).height();
                                               
                        // set data instance
		   	$(this).data(pluginName, op);
                        
                        // go !   	               
                        $(this).hide();
                        $(this).on('click', function() {
                             $(this).fadeOut();
                             $("html, body").animate({scrollTop: op.scrollTop }, op.speed, op.effect, function() { 
                                $(window).trigger('finish.backToTop');
                             });
                        });
                        
                        $(window).on('resize', function() {
                            op.viewportHeight = $(window).height();
                        });

                        $(window).on('scroll touchmove', function() {                            
                            methods.show.apply(op.that);                            
                        });
	    });	
	};
	
	methods.show = function() {            
		var op = $(this).data(pluginName);                
                if ( $(window).scrollTop() > op.viewportHeight ) {
                     if ( $(this).filter(":visible").length ) return;
                     $(window).trigger('show.backToTop');
                     op.show.apply(this, [op]);
                }
                else {
                     methods.hide.apply(op.that); 
                }
	};
        
        methods.hide = function() {		
		var op = $(this).data(pluginName);
                if ( $(this).filter(":hidden").length ) return;
                    
                if ( $(window).scrollTop() < op.viewportHeight ) {
                     $(window).trigger('hide.backToTop');
                     op.hide.apply(this, [op]);                    
                }
        };
	
	$.fn[pluginName] = function(m) {
			if (methods[m]) { return methods[m].apply(this, Array.prototype.slice.call(arguments, 1)); } 
			else if (typeof m === 'object' || !m) return methods.init.apply(this, arguments);
			else $.error(pluginName+' Method ' + m + ' fail ');
	};
        
})(jQuery);
