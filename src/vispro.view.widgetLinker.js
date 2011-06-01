vispro.view.WidgetLinker = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            container = options.container,
            model = options.model,
            top = model.get('top'),
            left = model.get('left'),
            width = model.get('width'),
            height = model.get('height');
            x = left + width / 2,
            y = top + height / 2,
            radius = 10,
            position = {left: x, top: y};
        
        element
            .addClass('linker')
            .data('linker', this)
            .css({
                position: 'absolute',
                border: '1px solid black',
                top: y - radius,
                left: x - radius,
                width: 2 * radius,
                height: 2 * radius
            })
            .draggable({
                helper: 'clone',
                cursor: 'move'
            })
            .droppable({
                accept: '.linker',
                tolerance: 'touch'
            });

        this.container = container;
        this.model = model;
        this.position = position;
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
        
        widget.addLink(model);
        this.container.render();
    },

    events: {
        dragstart: 'onDragstart',
        dragstop: 'onDragstop',
        drag: 'onDrag',
        drop: 'onDrop'
    }

});