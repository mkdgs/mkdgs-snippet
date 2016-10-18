 /*
 * 
 * mickael desgranges 
 * return false if valide else return an error code
 * 
 * use some part of:
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 */
if (typeof $4p != 'object')
                $4p = {};
            $4p.invalidate = {
                _getValue: function (value) {
                    if (typeof value == 'undefined') {
                        return null;
                    }
                    return value;
                },
                checked: function (value, element) {     
                    var name =  element.getAttribute("name"); 
                    var x = document.getElementsByName(name);
                    var i;
                    for (i = 0; i < x.length; i++) {
                        if (x[i].type === "radio") {
                            if (x[i].checked === true) {
                                return false;
                            }
                        }
                    }
                    return 1;
                },
                required: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value) {
                        return false;
                    }
                    return 1;
                },
                email: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    var r = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                tel: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = /^[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}$/i.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                minlength: function (value, param) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    if (value.length >= param) {
                        return false;
                    }
                    return 1;
                },
                maxlength: function (value, param) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    if (value.length <= param) {
                        return false;
                    }
                    return 1;
                },
                url: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
                    var r = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                date: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = !/Invalid|NaN/.test(new Date(value));
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                dateISO: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                numberEU: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = /^([0-9]*)([,]{0,1})([0-9]*)$/.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                number: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = /^([0-9]*)([,]{0,1})([0-9]*)$/.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                },
                digits: function (value) {
                    value = $4p.invalidate._getValue(value);
                    value = jQuery.trim(value);
                    if (value === '') {
                        return false;
                    }
                    var r = /^\d+$/.test(value);
                    if (r) {
                        return false;
                    }
                    return 1;
                }
            };
