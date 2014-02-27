$(function(){	
    var url = window.location.href;
    var baseUrl = ''; // url du site ( $4p.glob('url'); )
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

/************************************************************
Utilisation 

- nécessite jQuery http://jquery.com/
- précisez l'url du site

tout les éléménents contenant la propriété data-active-on sont testés,
si l'url courante correspond à l'expression régulière la classe active est ajoutée.

<a data-active-on="expression régulière" >

<a data-active-on="/mon/url*" > tout les url qui contienne /mon/url/quelquechose

<a data-active-on="/mon/url/fichier.html$" > tout les url qui se termine par /mon/url/fichier.html

<a data-active-on="^/mon/url/fichier.html$" > tout les url qui commence ET se termine par /mon/url/fichier.html

<a data-active-on="/foo|/bar" > tout les url qui contienne /foo ou /bar


*/
