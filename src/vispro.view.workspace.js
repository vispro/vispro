vispro.view.Workspace = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            widgetList = model.widgetList,
            viewList = [];

        element
            .addClass('grid-15')
            .css({
                position: 'absolute',
                width: model.get('width'),
                height: model.get('height'),
            })
            .resizable({
                autoHide: true
            })
            .droppable({
                accept: '.descriptor'
            });
                
        model
            .bind('change:selected', $.proxy(this.select, this))
            .bind('change:width', $.proxy(this.resize, this))
            .bind('change:height', $.proxy(this.resize, this));

        widgetList
            .bind('add', $.proxy(this.addWidget, this))
            .bind('remove', $.proxy(this.removeWidget, this));

        this.model = model;

        return this;
    },

    enable: function () {

        $(this.el)
            .cover('disable')
            .resizable('enable');
        
        $('.widget', this.el)
            .cover('disable');
        
        return this;
    },

    disable: function () {

        $(this.el)
            .cover('enable')
            .resizable('disable');

        $('.widget', this.el)
            .cover('enable');
        
        return this;
    },

    show: function () {
        
        $(this.el).show();
        return this;
    },

    hide: function () {

        $(this.el).hide();
        return this;        
    },

    addWidget: function (widget) {
        
        var element = $(this.el),
            model = this.model,
            view = new vispro.view.Widget();

        view.init({ model: widget });
        element.append(view.el);

        model.overlap();

        return this;
    },

    removeWidget: function (widget) {
        
        this.model.select();

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

    resize: function () {
        
        var element = $(this.el);
                
        if (element.hasClass('ui-resizable-resizing')) {
            return;
        }

        var model = this.model,
            width = model.get('width'),
            height = model.get('height');
        
        element
            .animate({
                width: width,
                height: height
            }, 'fast');

    },

    onClick: function (event, ui) {

        event.stopPropagation();

        this.model.select();
    },

    onResize: function (event, ui) {
        
        event.stopPropagation();

        // prevent a bug 
        // if the contenitor of the workspace has a scrollbar
        // resizing the workspace change its position
        $(this.el)
            .css({
                top: '0px',
                left: '0px'
            });

        this.model.set({
            width: ui.size.width,
            height: ui.size.height
        });
    },

    onDrop: function (event, ui) {

        var element = $(this.el),
            dropped = ui.draggable,
            descriptor = dropped.data('descriptor'),
            model = this.model,
            left = ui.offset.left - element.offset().left,
            top = ui.offset.top - element.offset().top,
            grid = model.get('grid');
        
        left -= left % grid;
        top -= top % grid;

        model.createWidget({
            descriptor: descriptor,
            attributes: {
                top: top,
                left: left,
                z_index: model.get('z_index')
            }
        });
    },

    events: {
        mousedown: 'onClick',
        resize: 'onResize',
        drop: 'onDrop'
    }

});