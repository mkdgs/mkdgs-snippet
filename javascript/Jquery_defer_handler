// this is a POC
<script>
            (function (w, d) {                
                var jq = function (f) {
                     o.defered.push(f);
                     console.log('push: '+f);
                };
                var h = {
                    apply: function (cible, thisArg, listeArguments) {
                        //if ( typeof thisArg !== 'undefined' ) {                            
                            o.defered.push(listeArguments[0]);                            
                        //}                        
                        return w.jQuery; 
                    },
                    get: function (obj, prop) {
                        if ( prop !== 'holdReady') {
                            console.log(prop);
                            try {
                                return prop in obj ? obj[prop] : function() {  console.log('call udefined prop: '+prop) };
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                };
                var p = new Proxy(jq, h);
                var o = {
                    defered: [],
                    _timeout: null,
                    _timer: function () {
                        clearTimeout(d._timeout);
                        if (this._isJq()) {
                            return jQuery.each(this.defered, function (i, f) {
                                try {
                                    console.log('exec', f);
                                     f();
                                } catch (e) {
                                    console.log(e, f);
                                }
                            });
                        }
                        this._timeout = setTimeout(function () {
                            o._timer();
                        }, 50);
                    },
                    _isJq: function () {
                        return (typeof jQuery !== 'undefined' && typeof jQuery.holdReady !== 'undefined') ? true : false;
                    },
                    _init: function () {
                        if (!this._isJq()) {
                            w.$ = w.jQuery = p;                          
                            d.addEventListener("DOMContentLoaded", this._timer());
                            if (d.readyState === "interactive" || d.readyState === "complete") {
                                this._timer();
                            }
                        }
                        return this;
                    }
                };
                return o._init();
            })(window, document);            
        </script>
