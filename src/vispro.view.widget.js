/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.Widget = Backbone.View.extend({

    tagName: 'div',

    className: 'paper widget',
    
    initialize: function (attributes, options) {
        
        var model = options.model,
            descriptor = model.descriptor,
            dimensions = model.dimensions,
            position = model.position,
            src = model.image,
            element = $(this.el),
            image = $('<img>'),
            i_dimensions = descriptor.dimensions,
            width_resizable = i_dimensions.width.resizable,
            height_resizable = i_dimensions.height.resizable,
            resizable = width_resizable || height_resizable,
            drag_helper = $('<div>'),
            resize_helper = $('<div>'),
            resize_handler = $('<div>'),
            resize_handler_dimensions = {
                width: 0,
                height: 0
            };

        image
            .attr({
                src: src
            })
            .css({
                position: 'absolute',
                width: '100%',
                height: '100%'
            });

        element 
            .addClass('dragging-anchor')
            .append(image)
            .css({
                position: 'absolute',
                left: position.left + 'px',
                top: position.top + 'px',
                width: dimensions.width + 'px',
                height: dimensions.height + 'px',
                'z-index': model.zIndex + ''
            })
            .draggable({
                cursor: 'move',
                helper: function () { return drag_helper; }
            });
        
        if (resizable) {
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
        }

        model
            .bind('resize', this.resize, this)
            .bind('move', this.move, this)
            .bind('selected', this.select, this)
            .bind('overlapped', this.overlap, this)
            .bind('remove', this.remove, this)
            .bind('zorder', this.zReordering, this);
        
        this.model = model;
        this.element = element;
        this.resizable = resizable;
        this.resize_handler = resize_handler;
        this.resize_handler_dimensions = resize_handler_dimensions;

        return this;
    },

    render: function () {
        
        return this;
    },

    enable: function () {
        
        this.element.cover('disable');

        return this;
    },

    disable: function () {
        
        this.element.cover('enable');

        return this;
    },

    remove: function () {
    
        this.element.remove();  
    },

    resize: function (dimensions) {
        
        this.element.css(dimensions);

        return this;
    },

    move: function (position) {
        
        this.element.css(position);

        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.element.addClass('selected');
            if (this.resizable) {
                this.resize_handler.addClass('display-resize-anchor-selected');
            }
        }
        else {
            this.element.removeClass('selected');
            if (this.resizable) {
                this.resize_handler.removeClass('display-resize-anchor-selected');  
            }
        }

        return this;
    },

    zReordering: function (zIndex) {
        
        this.element.css('z-index', zIndex + '');

        return this;
    },

    overlap: function (overlapped) {
        
        if (overlapped) {
            this.element.addClass('overlapped');
        }
        else {
            this.element.removeClass('overlapped');
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

    onDrag: function (event, ui) {

        var target = $(event.target);
             
        if (target.hasClass('resizing-anchor')) {
            return;
        }
            
        event.stopPropagation();

        this.model.move(ui.position);
    },

    onDragstart: function (event, ui) {

        var target = $(event.target);
             
        if (target.hasClass('resizing-anchor')) {
            return;
        }
            
        event.stopPropagation();

        this.element.addClass('dragging');
    },

    onDragstop: function (event, ui) {

        var target = $(event.target);
             
        if (target.hasClass('resizing-anchor')) {
            return;
        }
            
        event.stopPropagation();

        this.element.removeClass('dragging');
    },

    onMouseenter: function (event) {

        // event.stopPropagation();

        this.element.addClass('over');
        if (this.resizable) {
            this.resize_handler.addClass('display-resize-anchor-over');
        }
    },

    onMouseleave: function (event) {
    
        // event.stopPropagation();

        this.element.removeClass('over');
        if (this.resizable) {
            this.resize_handler.removeClass('display-resize-anchor-over');
        }
    },

    events: {
        mousedown: 'onClick',
        mouseenter: 'onMouseenter',
        mouseleave: 'onMouseleave',
        resize: 'onResize',
        drag: 'onDrag',
        dragstart: 'onDragstart',
        dragstop: 'onDragstop',
        'drag div.resizing-anchor': 'onResize'
    }
    
});