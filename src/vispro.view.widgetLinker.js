vispro.view.WidgetLinker = Backbone.View.extend({
    
    tagName: 'div',

    className: 'linker',

    initialize: function (attributes, options) {
        
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
            highlighted_radius = 9,
            position = {left: x, top: y},
            helper = $('<div>');
        
        function draggable () {
            return helper;
        }

        element
            .data('linker', this)
            .css({
                position: 'absolute',
                top: y - radius - 1,
                left: x - radius - 1,
                width: 2 * radius,
                height: 2 * radius,
                'z-index': '1000000'
            })
            .draggable({
                helper: draggable,
                cursorAt: {
                    top: 0,
                    left: 0
                }
            })
            .droppable({
                accept: '.linker',
                tolerance: 'touch'
            });
        
        this.element = element;
        this.container = container;
        this.model = model;
        this.position = position;
        this.dimensions = 
        this.radius = radius;
        this.highlighted_radius = highlighted_radius;

        return this;
    },

    highlight: function (types) {
        
        var element = this.element,
            position, highlighted_radius,
            widget_type = this.model.type,
            test = _(types).any(function (type) {
                return widget_type === type;
            });

        if (test) {
            position = this.position;
            highlighted_radius = this.highlighted_radius;

            element.css({
                left: position.left - highlighted_radius - 1,
                top: position.top - highlighted_radius - 1,
                width: 2 * highlighted_radius,
                height: 2 * highlighted_radius
            });

            element.addClass('linker-highlight');
        }

        return this;  
    },

    unhighlight: function () {

        var element = this.element,
            position = this.position,
            radius = this.radius;

        element.css({
                left: position.left - radius - 1,
                top: position.top - radius - 1,
                width: 2 * radius,
                height: 2 * radius
            });

        this.element.removeClass('linker-highlight');

        return this;
    },

    onDragstart: function (event, ui) {
        
        var types = _(this.model.dependencies).keys();

        this.container.startLink(types);
    },
    
    onDragstop: function (event, ui) {

        this.container.stopLink();
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
        
    },

    events: {
        click: 'onClick',
        dragstart: 'onDragstart',
        dragstop: 'onDragstop',
        drag: 'onDrag',
        drop: 'onDrop'
    }

});