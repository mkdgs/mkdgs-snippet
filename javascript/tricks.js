/*
* récupérer l'url du script (pour autoload)
*
* http://stackoverflow.com/questions/2976651/javascript-how-do-i-get-the-url-of-script-being-called
* http://stackoverflow.com/questions/984510/what-is-my-script-src-url
*/
var scriptUrl = (function() {
		if( s = document.currentScript ) {
			return s.src; 
		}
		else { 
			var ls = document.getElementsByTagName('script'),s = ls[ls.length - 1];
	    	if (s.getAttribute.length !== undefined) return s.src
		    return s.getAttribute('src', -1);
		}
})();
	
var scriptPath =  scriptUrl.substring(0, scriptUrl.lastIndexOf('/'))+"/";	
console.log(scriptPath);


