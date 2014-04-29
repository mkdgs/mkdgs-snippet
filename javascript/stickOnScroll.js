/**
* @author		Desgranges Mickael
* @license	CeciLL-B
* 
* stick a box on scroll
* 
* test it: http://jsfiddle.net/5ABxL/4/
*
* use: <div id="sticked" data-stickOnScroll="20"> sticked at 20px from top</div>
* 
* voir peut être http://stackoverflow.com/questions/18753367/jquery-live-scroll-event-on-mobile-work-around
* 
*/

<script>
  $(function() {
    $('#sticked[data-stickOnScroll]').each(function() {
           var fixedTop = $(this).attr('data-stickOnScroll');
           var top = $(this).offset().top;
           var $el = $(this);
           var hold = {};
           hold.position = $el.css("position");
           hold.top = $el.css("top");
           hold.height = $el.css("height");
           hold.width = $el.css("width");
           hold.margin = $el.css("margin");
           hold.padding = $el.css("padding");
           hold.display = 'none';
           $el.css('z-index', 999);
           var $mask = $('<div />').css(hold);
           $el.after($mask);
           $(window).scroll(function() {
               if ($(this).scrollTop() >= (top - fixedTop)) {
                   // var pos = fixedTop - $(window).scrollTop();
                   $el.css("position", 'fixed');
                   $el.css("top", fixedTop + "px");
                   $mask.show();
               } else {
                   $mask.hide();
                   $el.css("position", hold.position);
                   $el.css("top", hold.top);
               }
           });
   });
 });
<script>
