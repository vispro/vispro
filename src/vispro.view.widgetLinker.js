vispro.view.WidgetLinker = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            container = options.container,
            model = options.model,
            position = model.position,
            dimensions = model.dimensions,
            top = position.top,
            left = position.left,
            width = dimensions.width,
            height = dimensions.height;
            x = left + width / 2,
            y = top + height / 2,
            radius = 6,
            position = {left: x, top: y};
        
        element
            .addClass('linker')
            .data('linker', this)
            .css({
                position: 'absolute',
                top: y - radius,
                left: x - radius,
                width: 2 * radius,
                height: 2 * radius,
                'z-index': '1000000'
            })
            .draggable({
                helper: function () {
                    return $('<div>');
                },
                cursorAt: {
                    top: 0,
                    left: 0
                }
            })
            .droppable({
                accept: '.linker',
                tolerance: 'touch'
            });

        this.container = container;
        this.model = model;
        this.position = position;
        this.dimensions = 
        this.radius = radius;

        return this;
    },

    onDragstart: function (event, ui) {
        
    },
    
    onDragstop: function (event, ui) {

        this.container.render();
    },

    onDrag: function (event, ui) {
        
        this.container.drawLink(this.position, ui.position);
    },

    onDrop: function (event, ui) {
        
        var model = this.model,
            draggable = ui.draggable,
            linker = draggable.data('linker'),
            widget = linker.model;
        
        widget.addLink(model.type, model.cid);
        this.container.render();
    },

    onClick: function (event) {
        
        console.log('ME STANNO A CLICCA');
    },

    events: {
        click: 'onClick',
        dragstart: 'onDragstart',
        dragstop: 'onDragstop',
        drag: 'onDrag',
        drop: 'onDrop'
    }

});