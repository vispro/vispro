/*

jquery.cover

Copyright 2011 Enricò Marino

*/
(function ($) {
    $.fn.cover = function (option) {

        function coverElement (element) {
            
            var cover = $('<div>');
             
            cover
                .addClass('ui-cover')
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    'z-index': '1000',
                    opacity: .5,
                    'background-color': 'darkgrey'
                })
                .click(function (event) { 
                    event.stopPropagation()
                })
                .mousedown(function (event) { 
                    event.stopPropagation()
                })
                .show();
            
            element
                .addClass('ui-coverable')
                .append(cover);

            return cover;
        }
    
        this.each(function (i, item) {

            var element = $(item);

            if (!element.hasClass('ui-coverable')) {
                coverElement(element);
            }
            
            var cover = $('.ui-cover', element);

            if (option === 'enable') {
                cover.show();
                element.addClass('ui-covered')
            }
            
            if (option === 'disable') {
                cover.hide();
                element.removeClass('ui-covered');
            }
        });

        return this;
    };
})(jQuery);