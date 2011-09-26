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
                top: y - radius - 2,
                left: x - radius - 2,
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

    enable: function (types) {
        
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
                left: position.left - highlighted_radius - 2,
                top: position.top - highlighted_radius - 2,
                width: 2 * highlighted_radius,
                height: 2 * highlighted_radius
            });

            element.addClass('linker-enabled');
        } else {
            element.addClass('linker-disabled');
        }

        return this;  
    },

    disable: function () {

        var element = this.element,
            position = this.position,
            radius = this.radius;

        element
            .css({
                left: position.left - radius - 2,
                top: position.top - radius - 2,
                width: 2 * radius,
                height: 2 * radius
            })
            .removeClass('linker-enabled linker-disabled');

        return this;
    },

    onDragstart: function (event, ui) {
        
        var types = _(this.model.dependencies).keys();

        this.element.addClass('linker-linking');

        this.container.startLink(types);
    },
    
    onDragstop: function (event, ui) {

        this.element.removeClass('linker-linking');

        this.container
            .stopLink()
            .render();
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