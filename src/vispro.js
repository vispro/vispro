(function ($) {
    $.fn.cover = function (option) {

        function coverElement (element) {
            
            function stopEvent (event) {

                event.stopPropagation();
            }

            var cover = $('<div>');
             
            cover
                .addClass('ui-cover')
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2001,
                    opacity: .5,
                    'background-color': 'black'
                })
                .click(stopEvent)
                // .dblclick(stopEvent)
                // .hover(stopEvent)
                .mousedown(stopEvent)
                // .mouseenter(stopEvent)
                // .mouseleave(stopEvent)
                // .mousemove(stopEvent)
                // .mouseout(stopEvent)
                // .mouseover(stopEvent)
                // .mouseup(stopEvent)
                // .scroll(stopEvent)
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
                element.addClass('ui-covered');
            }
            else {
                cover.hide();
                element.removeClass('ui-covered');
            }
        });

        return this;
    };
})(jQuery);

var vispro = (function () {

    var ids = {};

    if (!window.console) {
        window.console = {};
        $.each([
            "log", 
            "debug", 
            "info", 
            "warn", 
            "error", 
            "assert", 
            "dir", 
            "dirxml", 
            "group", 
            "groupEnd", 
            "time", 
            "timeEnd", 
            "count", 
            "trace", 
            "profile", 
            "profileEnd"
        ],
        function (i, name) {
            window.console[name] = function () {};
        });
    }

    if (!window.localStorage) {
        window.localStorage = {};
        $.each([
            "clear", 
            "Storage", 
            "getItem", 
            "key", 
            "removeItem", 
            "setItem"
        ], function (i, name) {
            window.localStorage[name] = function () {};
        });        
    }


    function guid(type) {
        
        if (typeof ids[type] == 'undefined') {
            ids[type] = 0;
        }

        var id = ids[type] += 1;

        return type + '_' + id;
    }
    
    return {
        guid: guid,
        data: {},
        model: {},
        view: {}
    };

}());