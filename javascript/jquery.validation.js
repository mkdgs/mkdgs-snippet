/**
* Copyright Desgranges Mickael
* mickael@4publish.com
*
* Ce logiciel est un programme informatique servant à la création d'application web.
*
* Ce logiciel est régi par la licence CeCILL-B soumise au droit français et
* respectant les principes de diffusion des logiciels libres. Vous pouvez
* utiliser, modifier et/ou redistribuer ce programme sous les conditions
* de la licence CeCILL-B telle que diffusée par le CEA, le CNRS et l'INRIA
* sur le site "http://www.cecill.info".
*
* En contrepartie de l'accessibilité au code source et des droits de copie,
* de modification et de redistribution accordés par cette licence, il n'est
* offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
* seule une responsabilité restreinte pèse sur l'auteur du programme,  le
* titulaire des droits patrimoniaux et les concédants successifs.
*
* A cet égard  l'attention de l'utilisateur est attirée sur les risques
* associés au chargement,  à l'utilisation,  à la modification et/ou au
* développement et à la reproduction du logiciel par l'utilisateur étant
* donné sa spécificité de logiciel libre, qui peut le rendre complexe à
* manipuler et qui le réserve donc à des développeurs et des professionnels
* avertis possédant  des  connaissances  informatiques approfondies.  Les
* utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
* logiciel à leurs besoins dans des conditions permettant d'assurer la
* sécurité de leurs systèmes et ou de leurs données et, plus généralement,
* à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
*
* Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
* pris connaissance de la licence CeCILL-B, et que vous en avez accepté les
* termes.
*
* @author		Desgranges Mickael
* @license		CeciLL-B
* @link			http://4publish.com
*/
(function( $ ){
	var methods = {};
	methods.add = function (element,type,rules,args,onError) {
		$(element).filter('input, textarea').each(function() {
			var validation;
			if ( validation = $(this).data('validation') ) {
				if ( typeof validation == 'undefined' ) {
					validation = [];
				}
				validation[type] = {
									'type' : type,
									'rules': rules,
									'args' : args,
									'onError' : onError
				};
			}
			$(this).data('validation',validation);
		});
	};

        methods.check = function () {
		$($(this)[0].that.events).trigger('validationForm', [ $(this) ]);
	};

	methods.init = function (params) {
		 return this.each(function() {
			 this.events = {};
			 var that  =  this;
                         this.that =  this;
			 this.validationError = 0;
			 var options = {
					 rules: $4p.invalidate,
					 debug: false,
					 onResetForm: function(ev,element) { },
					 onResetElement:function (ev,element) {}
			 };
			 var options = jQuery.extend(options, params);
			 var _log = function (txt) {
				 if ( options.debug ) {
					 if ( typeof console != 'undefined' ) {
						 console.log(txt);
					 }
				 }
			 };

			 $(that.events).on('validationError', function (ev,element,type,code) {
				_log('validation error '+type);
				that.validationError = 1;
				var v = $(element).data('validation');
				if( typeof v[type]['onError'] == 'function' ) {
 					v[type]['onError'](element,type,code);
 				}
 				else if( typeof options[type+'OnError'] == 'function' ) {
 					options[type+'OnError'](element,type,code);
 				}
			 });

			 $(that.events).on('resetForm', function (ev,element) {
				 _log('resetForm');
				 options.onResetForm(ev,element);
			 });
			 $(that.events).on('resetElement', function (ev,element) {
				 _log('resetElement');
				 options.onResetElement(ev,element);
			 });

			 $(that.events).on('validationElement', function (ev,element) {
				 	_log('validationElement ');
				 	$(that.events).trigger('resetElement',[ element ]);
				 	var x,e,method,args,v = $(element).data('validation');
				 	for ( x in v) {
				 			method = v[x]['rules'];
				 			if ( typeof method == 'function' ) {
					 			args   = v[x]['args'];
					 			if ( e = method($(element).val(),args) ) {
					 				_log('validationElement apply '+x+' : '+$(element).val());
					 				$(that.events).trigger('validationError',[ element, x , e ]);
					 			}
				 			}
				 	}
			 });
			 $(that.events).on('validationForm', function (ev,form) {
				    _log('validationForm');
				    $(that.events).trigger('resetForm',[ form ]);
					$(that).find('input, textarea').each(function() {
				 		var x,e,method,args,v = $(this).data('validation');
				 		for ( x in v) {
				 			method = v[x]['rules'];
				 			if ( typeof method == 'function' ) {
					 			args   = v[x]['args'];
					 			if ( e = method($(this).val(),args) ) {
				 					$(that.events).trigger('validationError',[ this , x , e ]);
					 			}
				 			}
				 		}
				  });
			 });

			 $(this).find('input, textarea').each(function() {
				 	var classes = $(this).attr('class') || '';
				 	classes = classes.split(/\s+/);
				 	var x, c, method,args;
				 	var validation = [];
				 	for ( x in classes ) {
				 		var c = classes[x].split('-');
				 		method = c[0];
				 		delete c[0];
				 		args = c;
				 		if ( /[a-z0-9]/i.test(method) ) {
					 		if ( typeof options.rules[method] == 'function' ) {
					 			var method_validation = options.rules[method];
					 			validation[method] = {
					 					'type' : method,
					 					'rules': method_validation,
					 					'args' : args,
					 					'onError' : null
 					 			};
					 		}
				 		}
				 	}
				 	$(this).data('validation',validation);
				 	$(this).change(function (ev) {

				 		ev.preventDefault();
				 		$(that.events).trigger('validationElement',[ $(this) ]);
				 	});
			 });
			 $(this).submit(function (ev) {
				 that.validationError =0;
				 $(that.events).trigger('validationForm',[ $(this) ]);
				 if ( that.validationError ) {                                     
					 ev.preventDefault();
				 }
			 });
			// return $(this);
		 });
	};



	$.fn.validation = function(method) {
	    if ( methods[method] ) {
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    }
	    else if ( typeof method === 'object' || !method ) {
	      return methods.init.apply( this, arguments );
	    }
	    else {
	      $.error( 'Method ' +  method + ' fail ' );
	    }
	};

})( jQuery );
