vispro.view.Descriptor = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            model = options.model,
            i = model.collection.indexOf(model),
            helper = $('<img>');

            properties = model.properties,
            name = model.name,
            src = properties.img.value,
            width = Number(properties.width.value),
            height = Number(properties.height.value);
        
        helper
            .attr({
                src: src,
                alt: name
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
                top: 121 * i + 'px',
                height: '120px',
                textAlign: 'center',
                backgroundImage: 'url(' + src + ')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 
                    Math.min(100, width) + 'px' + ' ' + 
                    Math.min(80, height) + 'px',
            })
            .data('descriptor', model)
            .text(name)
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
        
        $(this.el).addClass('selected');
    },

    unselect: function () {
        
        $(this.el).removeClass('selected');
    },

    events: {
        mouseenter: 'select',
        mouseleave: 'unselect'
    }

});