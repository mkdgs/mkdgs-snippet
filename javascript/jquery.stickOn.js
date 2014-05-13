/**
 * @author mickael desgranges
 * @desc http://mkdgs.fr
 * @version 1.3
 */
(function($) {
    "use strict";
    var methods = {};
    var pluginName = 'stickOn'; 

    methods.init = function(params) {
        return this.each(function() {
            // an instance already exist ?
            var op = $(this).data(pluginName);
            if (op) return true; 

            // set + config
            var options = {};
            op = jQuery.extend(options, params);
            op.$el = $(this);
            op.position = $(this).position();

            op.hold = {};
            op.hold.position = op.$el.css("position");
            op.hold.top = op.$el.css("top");
            op.hold.height = op.$el.outerHeight(true);
            op.hold.display = 'none';

            op.$el.css('z-index', 999);
            op.$mask = $('<div />').css(op.hold);
            op.$el.after(op.$mask);
            op.that = this;

            // set data instance
            $(this).data(pluginName, op);

            // go !          
            methods.setOffset.apply(this);

            $(window).on('resize', function() {
                methods.restore.apply(op.that);
                methods.setOffset.apply(op.that);
                $(window).trigger('scroll');
            });

            $(window).on('scroll touchmove', function() {
                if ($(this).scrollTop() >= (op.position.top - op.offsetTop)) {
                    methods.stick.apply(op.that);
                }
                else {
                    methods.restore.apply(op.that);
                }
            });
        });
    };

    methods.restore = function() {
        var op = $(this).data(pluginName);
        op.$mask.hide();
        op.$el.css("position", op.hold.position);
        op.$el.css("top", op.hold.top);
    };

    methods.stick = function() {
        var op = $(this).data(pluginName);
        op.$el.css("position", 'fixed');
        op.$el.css("top", op.offsetTop + "px");
        op.$mask.show();
    };

    methods.setOffset = function() {
        var op = $(this).data(pluginName);
        var offsetTop = op.$el.attr('data-offset-top');
        op.offsetTop = 0;
        if (offsetTop) {
            op.offsetTop = parseInt(offsetTop);
            if (isNaN(op.offsetTop)) {
                op.offsetTop = 0;
                var $elOffset = $(offsetTop);
                if ($elOffset.length) {
                    op.offsetTop = $elOffset.position().top + $elOffset.outerHeight(true);
                }
            }
        }
        $(op.$el).data(pluginName, op);
    };

    $.fn[pluginName] = function(m) {
        if (methods[m]) {
            return methods[m].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof m === 'object' || !m)
            return methods.init.apply(this, arguments);
        else
            $.error(pluginName + ' Method ' + m + ' fail ');
    };
})(jQuery);


