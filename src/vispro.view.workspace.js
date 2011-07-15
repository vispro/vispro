vispro.view.Workspace = Backbone.View.extend({

    el: $(
        '<div id="workspace" class="panel grid-15"></div>'
    ),

    init: function (options) {
        
        var model = options.model,
            dimensions = model.dimensions,
            widgetList = model.widgetList,
            element = this.el;

        element
            .css({
                width: dimensions.width + 'px',
                height: dimensions.height + 'px'
            })
            .resizable({ autoHide: true })
            .droppable({ accept: '.descriptor' });

        model
            .bind('selected', _.bind(this.select, this))
            .bind('resize', _.bind(this.resize, this))

        widgetList
            .bind('add', _.bind(this.addWidget, this))
            .bind('remove', _.bind(this.removeWidget, this));

        this.model = model;
        this.element = element;

        return this;
    },

    enable: function () {

        this.element
            .cover('disable')
            .resizable('enable');
        
        _.each(this.widgetList, function (widget) {
            widget.element.cover('disable');
        });
                
        return this;
    },

    disable: function () {

        this.element
            .cover('enable')
            .resizable('disable');
        
        _.each(this.widgetList, function (widget) {
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
        
        var view = new vispro.view.Widget();

        view.init({ model: widget });
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

    resize: function () {
        
        var element = this.element;
                
        if (element.hasClass('ui-resizable-resizing')) {
            return;
        }

        element.animate(this.model.dimensions, 'fast');

        return this;
    },

    onClick: function (event, ui) {

        event.stopPropagation();

        this.model.select();
    },

    onResizeStart: function (event, ui) {
        
        event.stopPropagation();
    },

    onResize: function (event, ui) {
        
        event.stopPropagation();

        this.model.resize(ui.size);
    },

    onDrop: function (event, ui) {

        var element = this.element,
            dropped = ui.draggable,
            descriptor = dropped.data('descriptor'),
            model = this.model,
            left = ui.offset.left - element.offset().left,
            top = ui.offset.top - element.offset().top,
            grid = model.attributes.grid,
            widget = model.createWidget(descriptor);
        
        left -= left % grid;
        top -= top % grid;

        widget.position.left = left;
        widget.position.top = top;

        model
            .addWidget(widget)
            .selectWidget(widget);
    },

    events: {
        mousedown: 'onClick',
        resizestart: 'onResizeStart',
        resize: 'onResize',
        drop: 'onDrop'
    }

});