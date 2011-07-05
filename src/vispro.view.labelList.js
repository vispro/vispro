vispro.view.LabelList = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            model = options.model,
            label = $('<div>'),
            widgetList = model.widgetList;

        label
            .addClass('labelList-label')
            .text('Browser');
        
        element
            .append(label)
            .cover();

        widgetList
            .bind('add', $.proxy(this.add, this))
            .bind('refresh', $.proxy(this.refresh, this));

        this.model = model;

        return this;
    },
    
    add: function (widget) {
        
        var element = $(this.el),
            view = new vispro.view.Label();
        
        view.init({ model: widget });
        element.append(view.el);

        return this;
    },

    refresh: function (widgetList) {
        
        $(this.el).empty();
        widgetList.each(this.add, this);

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