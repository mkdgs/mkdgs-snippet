$(function(){
	$('.eform input.help').each(function () {  				
	     	  var txt = $(this).attr('title');
		      var onClick = function () {  if ( $(this).val() == txt ) $(this).val(''); };    			      
		      var onOut = function () { if ( $(this).val() == '' ) $(this).val(txt); };
		      
		      $(this).bind('click', onClick );
	      	  $(this).bind('blur', onOut );
	      	  $(this).bind('change', onOut );
	      	  onOut.call(this);			      	  		      	
	});
});


$(function(){
	$('input.welcome.first').each(function () {    
	     	  var txt = $(this).attr('title');
		      if ( $(this).val() == '' ) {
		         $(this).val(txt).click(function () {
			         $(this).val('').removeClass('first').unbind('click'); });               
			  }
	});
});


//input First vide ou est égale a val() 
$(function() {
	$('input.start').each(function () {
		var $el = $(this);    
   	  	var txt = $(this).attr('title');
   	    $el.removeClass('empty');
   		if ( $el.val() == '' ) {
   	   		$el.val(txt)
   	   		   .addClass('empty');
   		}
   		//else 
   		
   		$el.click(function () {
	    	 if ( $el.hasClass('empty') ) {
		    	 $el.val('')
	    		    .removeClass('empty');
	    	 }
	    });               
   		$el.parents('form').submit(function(ev) {
	    	if ( $el.hasClass('empty') ) $el.val('');
		});

   		$el.blur(function() {
	    	if ( $el.val() == '' ) {
		    	$el.val(txt)
	    		   .addClass('empty');
	    	}
		});
	});
});

