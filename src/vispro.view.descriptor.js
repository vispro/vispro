vispro.view.Descriptor = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            model = options.model,
            i = model.collection.indexOf(model),
            helper = $('<img>'),
            image = $('<img>'),
            label = $('<div>'),

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

        label
            .addClass('descriptor-label')
            .text(name);

        image
            .attr({
                src: src,
                alt: name
            })
            .css({
                width: Math.min(100, width) + 'px',
                height: Math.min(80, height) + 'px'
            });

        element
            .addClass('descriptor')
            .data('descriptor', model)
            .append(label)
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