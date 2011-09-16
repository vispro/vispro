vispro.view.Workspace = Backbone.View.extend({

    el: $(
        '<div id="workspace" class="panel grid-15"></div>'
    ),

    initialize: function (attributes, options) {
        
        var element = this.el,
            root = $(options.root),
            model = options.model,
            dimensions = model.dimensions,
            widgetList = model.widgetList;

        element
            .css({
                width: dimensions.width + 'px',
                height: dimensions.height + 'px'
            })
            .resizable({ autoHide: true })
            .droppable({ accept: '.descriptor' })
            .appendTo(root);

        model
            .bind('selected', this.select, this)
            .bind('resize', this.resize, this)
            .bind('change_grid', _.bind(this.change_grid, this))

        widgetList
            .bind('add', this.addWidget, this)
            .bind('remove', this.removeWidget, this);

        this.model = model;
        this.element = element;
        this.root = root;

        return this;
    },

    enable: function () {

        this.element
            .cover('disable')
            .resizable('enable');
        
        _(this.widgetList)
            .each(function (widget) {
                widget.element.cover('disable');
            });
                
        return this;
    },

    disable: function () {

        this.element
            .cover('enable')
            .resizable('disable');
        
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

    resize: function () {
        
        var element = this.element;
        
        if (element.hasClass('ui-resizable-resizing')) {
            return;
        }

        element.animate(this.model.dimensions, 'fast');

        return this;
    },

    change_grid: function (grid) {
        
        var element = this.el,
            classes = element.attr('class').split(/\s+/),
            classPrefix = 'grid-',
            classToRemove = _.detect(classes, function(el) {return el.indexOf(classPrefix) == 0}),
            classToAdd = classPrefix + grid;
        
        element.removeClass(classToRemove);
        element.addClass(classToAdd);
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

    events: {
        mousedown: 'onClick',
        resizestart: 'onResizeStart',
        resize: 'onResize',
        drop: 'onDrop'
    }

});