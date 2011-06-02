vispro.view.Widget = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            descriptor = model.descriptor,
            container = model.container,
            image = $('<img>');
        
        image
            .attr({
                src: model.get('img')
            })
            .css({
                position:'absolute',
                width: model.get('width'),
                height: model.get('height')
            });

        element
            .addClass('widget')
            .append(image)
            .css({
                position:'absolute',
                border: 'none',
                top: model.get('top'),
                left: model.get('left'),
                width: model.get('width'),
                height: model.get('height'),
                zIndex: model.get('z_index')
            })
            .draggable({
                containment: 'parent',
                cursor: 'move',
                grid: [
                    container.get('grid'), 
                    container.get('grid')
                ],
                zIndex: container.get('z_index')
            });

        if (model.get('resizable')) {
            
            element
                .resizable({
                    containment: 'parent',
                    aspectRatio: false,
                    alsoResize: image,
                    autoHide: true
                });
        }

        model
            .bind('change:top', $.proxy(this.drag, this))
            .bind('change:left', $.proxy(this.drag, this))
            .bind('change:width', $.proxy(this.resize, this))
            .bind('change:height', $.proxy(this.resize, this))
            .bind('change:selected', $.proxy(this.select, this))
            .bind('remove', $.proxy(this.remove, this));

        container
            .bind('change:grid', $.proxy(this.snap, this))
            .bind('change:covered', $.proxy(this.overlay, this));

        this.model = model;

        return this;
    },

    render: function () {
        
        return this;
    },

    enable: function () {
        
        $(this.el).cover('disable');

        return this;
    },

    disable: function () {
        
        $(this.el).cover('enable');

        return this;
    },

    remove: function () {
    
        $(this.el).remove();
        delete this;
    },

    resize: function () {
        
        console.log('view.widget resize');

        var element = $(this.el);
                
        if (element.hasClass('ui-resizable-resizing')) {
            return;
        }

        var model = this.model,
            width = model.get('width'),
            height = model.get('height');

        element.animate({
            width: width,
            height: height
        }, 'fast');
    },

    drag: function () {
        
        var element = $(this.el);

        if (element.hasClass('ui-draggable-dragging')) {
            return;
        }

        var model = this.model,
            top = model.get('top'),
            left = model.get('left');

        element.animate({
            top: top,
            left: left
        }, 'fast');
    },

    snap: function () {
      
        return this;
    },

    select: function (model, selected) {
        
        if (selected) {
            $(this.el).addClass('selected');
        }
        else {
            $(this.el).removeClass('selected');
        }

        return this;
    },

    onClick: function (event, ui) {

        event.stopPropagation();

        this.model.select();
    },

    onResize: function (event, ui) {
        
        event.stopPropagation();

        this.model.set({
            width: ui.size.width,
            height: ui.size.height
        });
    },

    onDrag: function (event, ui) {
        
        this.model.set({
            left: ui.position.left,
            top: ui.position.top
        });
    },

    onMouseover: function (event) {
        
        $(this.el).addClass('over');
    },

    onMouseout: function (event) {
    
        $(this.el).removeClass('over'); 
    },

    events: {
        mousedown: 'onClick',
        mouseover: 'onMouseover',
        mouseout: 'onMouseout',
        resize: 'onResize',
        drag: 'onDrag'
    }
    
});