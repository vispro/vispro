vispro.view.Descriptor = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            model = options.model,
            i = model.collection.indexOf(model),
            image = $('<img>'),
            helper = $('<img>'),

            properties = model.properties,
            width = Number(properties.width.value),
            height = Number(properties.height.value);
        
        image
            .addClass('img-descriptor')
            .attr({
                src: properties.img.value,
                alt: properties.name.value
            })
            .css({
                position: 'absolute',
                width: Math.min(100, width) + 'px',
                height: Math.min(100, height) + 'px',
                left: ((120 - Math.min(100, width)) / 2) + 'px',
                top: ((120 - Math.min(100, height)) / 2) + 'px'
            });

        helper
            .attr({
                src: properties.img.value,
                alt: properties.name.value
            })
            .css({
                width: width,
                height: height,
                zIndex: 5
            });

        element
            .addClass('descriptor')
            .css({
                position: 'absolute',
                'border-radius': '10px',
                top: 121 * i + 'px',
                left: '0px',
                width: '120px',
                height: '120px',
                margin: '10px'
            })
            .data('descriptor', model)
            .append(image)
            .draggable({
                cursor: 'move',
                helper: function () { 
                    return helper.appendTo('body'); 
                },
                cursorAt: {
                    top: 0,
                    left: 0
                }
            });

        this.model = model;

        return this;
    },

    select: function () {
        
        $(this.el)
            .animate({
               backgroundColor: 'lightgrey' 
            }, 300);
    },

    unselect: function () {
        
        $(this.el)
            .animate({
               backgroundColor: 'white' 
            }, 300);
    },

    onMouseover: function (event) {
        
        event.stopPropagation();
        this.select();
    },

    events: {
        mouseenter: 'select',
        mouseleave: 'unselect'
    }

});