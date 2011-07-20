vispro.view.Widget = Backbone.View.extend({

    init: function (options) {
        
        var model = options.model,
            descriptor = model.descriptor,
            dimensions = model.dimensions,
            position = model.position,
            src = model.image,
            element = $(this.el),
            img = $('<img>'),
            width_resizable = descriptor.dimensions.width.resizable,
            height_resizable = descriptor.dimensions.height.resizable
            handles_str = width_resizable ? 'e, ' + (height_resizable ? ', s, se' :  '') : height_resizable ? 's' : '';
        
        img
            .attr({
                src: src
            })
            .css({
                position: 'absolute',
                width: '100%',
                height: '100%'
            });

        element 
            .addClass('widget')
            .append(img)
            .css({
                position: 'absolute',
                left: position.left + 'px',
                top: position.top + 'px',
                width: dimensions.width + 'px',
                height: dimensions.height + 'px',
            //     'background-image': 'url(' + src + ')',
            //     'background-repeat': 'no-repeat',
            //     'background-position': 'center center',//'left top',
                'z-index': model.zIndex+''
            })
            .draggable({
                cursor: 'move',
                grid: [ model.snap, model.snap ]
            })
            .resizable({
                constrain: '#workspace',
                handles: handles_str
            });

        model
            .bind('resize', _.bind(this.resize, this))
            .bind('move', _.bind(this.move, this))
            .bind('selected', _.bind(this.select, this))
            .bind('overlapped', _.bind(this.overlap, this))
            .bind('remove', _.bind(this.remove, this))
            .bind('zReordering', _.bind(this.zReordering, this));
        
        this.model = model;
        this.element = element;

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
        
        var element = this.element;
                
        if (element.hasClass('ui-resizable-resizing')) {
            return;
        }

        element.animate(dimensions, 'fast');

        return this;
    },

    move: function (position) {
        
        var element = this.element;

        if (element.hasClass('ui-draggable-dragging')) {
            return;
        }

        element.animate(position, 'fast');

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

    zReordering: function (zIndex) {
        
        $(this.el)
            .css('z-index', zIndex+'');
    },

    overlap: function (overlapped) {
        
        if (overlapped) {
            this.element.addClass('overlapped');
        }
        else {
            this.element.removeClass('overlapped');
        }
    },

    onClick: function (event, ui) {

        event.stopPropagation();

        this.model.select();
    },

    onResize: function (event, ui) {
        
        event.stopPropagation();

        console.log(ui);

        this.model.resize(ui.size);
    },

    onDrag: function (event, ui) {

        event.stopPropagation();

        this.model.move(ui.position);
    },

    onMouseover: function (event) {

        // event.stopPropagation();

        this.element.addClass('over');
    },

    onMouseout: function (event) {
    
        // event.stopPropagation();

        this.element.removeClass('over');
    },

    events: {
        mousedown: 'onClick',
        mouseover: 'onMouseover',
        mouseout: 'onMouseout',
        resize: 'onResize',
        drag: 'onDrag'
    }
    
});