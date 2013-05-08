/*
* récupérer l'url du script (pour autoload)
*
* http://stackoverflow.com/questions/2976651/javascript-how-do-i-get-the-url-of-script-being-called
*/
var getScriptURL = (function() {
    var scripts = document.getElementsByTagName('script');
    var index = scripts.length - 1;
    var myScript = scripts[index];
    return function() { return myScript.src; };
})();
