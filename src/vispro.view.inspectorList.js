vispro.view.InspectorList = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            model = options.model,
            label = $('<div>'),
            widgetList = model.widgetList;

        label
            .addClass('inspectorList-label')
            .text('Inspector');

        element
            .append(label)
            .cover();
                
        widgetList
            .bind('add', $.proxy(this.add, this))
            .bind('refresh', $.proxy(this.refresh, this));

        this.add(model);

        this.model = model;

        return this;
    },
    
    add: function (widget) {
        
        var element = $(this.el),
            view = new vispro.view.Inspector();

        view.init({ model: widget });
        element.append(view.render().el);

        return this;
    },

    refresh: function (widgetList) {
        
        var label = $('<div>');

        label
            .addClass('inspectorList-label')
            .text('Inspector');

        $(this.el)
            .empty()
            .append(label);
        
        this.model.widgetList.each(this.add, this);

        return this;
    },

    show: function () {
        
        this.render();
        $(this.el).show();

        return this;
    },

    hide: function () {
        
        $(this.el).hide();
        
        return this;
    },

    enable: function () {
                
        $(this.el).cover('disable');
        
        return this;
    },

    disable: function () {
        
        $(this.el).cover('enable');
        
        return this;
    }

});