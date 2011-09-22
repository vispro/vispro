vispro.view.Workspace = Backbone.View.extend({

    tagName: 'div',

    className: 'workspace',

    initialize: function (attributes, options) {
        
        var element = $(this.el),
            root = $(options.root),
            model = options.model,
            dimensions = model.dimensions,
            widgetList = model.widgetList,
            resize_helper = $('<div>'),
            resize_handler = $('<div>'),
            resize_handler_dimensions = {
                width: 0,
                height: 0
            };;

        element
            .attr({
                id: 'workspace'
            })
            .addClass('grid-15')
            .css({
                width: dimensions.width + 'px',
                height: dimensions.height + 'px'
            })
            .droppable({ accept: '.descriptor' })
            .appendTo(root);

        resize_handler_dimensions.width = 18;
        resize_handler_dimensions.height = 18;
        
        resize_handler
            .addClass('resizing-anchor')
            .css({
                'background-image': 'url("css/images/resize.png")',
                'border': '1px solid lightgray',
                'background-color': 'rgba(192,192,192,0.5)',
                '-o-background-size': 'contain',
                '-moz-background-size': 'contain',
                '-webkit-background-size': 'contain', 
                'background-size': 'contain',
                'cursor': 'se-resize',
                'position': 'absolute',
                'width': resize_handler_dimensions.width + 'px',
                'height': resize_handler_dimensions.height + 'px',
                'bottom': '0px',
                'right': '0px',
            })
            .draggable({
                cursor: 'se-resize',
                helper: function () {
                    return resize_helper;
                }
            })
            .appendTo(element);

        model
            .bind('selected', this.select, this)
            .bind('resize', this.resize, this)
            .bind('change_grid', this.change_grid, this)
            .bind('remode', this.remode, this);

        widgetList
            .bind('add', this.addWidget, this)
            .bind('remove', this.removeWidget, this);

        this.model = model;
        this.element = element;
        this.root = root;
        this.resize_handler = resize_handler;
        this.resize_handler_dimensions = resize_handler_dimensions;

        return this;
    },

    enable: function () {

        this.element
            .cover('disable');
        
        _(this.widgetList)
            .each(function (widget) {
                widget.element.cover('disable');
            });
                
        return this;
    },

    disable: function () {

        this.element
            .cover('enable');
        
        _(this.widgetList)
            .each(function (widget) {
                widget.element.cover('disable');
            });
        
        return this;
    },

    show: function () {
        
        this.element.show();

        return this;
    },

    hide: function () {

        this.element.hide();

        return this;        
    },

    addWidget: function (widget) {
        
        var view = new vispro.view.Widget({}, { model: widget });

        this.element.append(view.element);
        widget.overlap();
        
        return this;
    },

    removeWidget: function (widget) {
        
        this.model.select();

        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.element.addClass('selected');
        }
        else {
            this.element.removeClass('selected');
        }

        return this;
    },

    resize: function (dimensions) {
        
        this.element.css(dimensions);

        return this;
    },

    change_grid: function (grid) {
        
        var element = this.element,
            classes = element.attr('class').split(/\s+/),
            classPrefix = 'grid-',
            classToRemove = _.detect(classes, function(el) {return el.indexOf(classPrefix) == 0}),
            classToAdd = classPrefix + grid;
        
        element.removeClass(classToRemove);
        element.addClass(classToAdd);
    },

    remode: function (mode) {        

        if (mode === 'view') {
            this.show();
            this.enable();
        } else if (mode === 'link') {
            this.show();
            this.disable();
        } else {
            this.hide();
        }

        return this;
    },

    onClick: function (event, ui) {

        event.stopPropagation();

        this.model.select();
    },

    onResize: function (event, ui) {
        
        var resize_handler_dimensions = this.resize_handler_dimensions,
            dimensions = {
              width: ui.position.left + resize_handler_dimensions.width,
              height: ui.position.top + resize_handler_dimensions.height
            };

        event.stopPropagation();

        this.model.resize(dimensions);
    },

    onDrop: function (event, ui) {

        var element = this.element,
            dropped = ui.draggable,
            descriptor = dropped.data('descriptor'),
            model = this.model,
            widget = model.createWidget(descriptor),
            e_offset = element.offset(),
            ui_offset = ui.offset,
            position = {
                left: ui_offset.left - e_offset.left,
                top: ui_offset.top - e_offset.top
            };
                
        model
            .addWidget(widget)
            .selectWidget(widget);
        
        widget
            .move(position);
    },

    onMouseenter: function (event) {

        // event.stopPropagation();

        this.element.addClass('over');
        this.resize_handler.addClass('display-resize-anchor-over');
    },

    onMouseleave: function (event) {
    
        // event.stopPropagation();

        this.element.removeClass('over');
        this.resize_handler.removeClass('display-resize-anchor-over');
    },

    events: {
        mousedown: 'onClick',
        mouseenter: 'onMouseenter',
        mouseleave: 'onMouseleave',
        'drag div.resizing-anchor': 'onResize',
        drop: 'onDrop'
    }

});