vispro.view.LabelList = Backbone.View.extend({

    el: $('<div id="labelList" class="panel"></div>'),

    templates: {
        element: _.template(
            '<div class="panel-label">Browser</div>' +
            '<div class="panel-list"></div>'
        )
    },

    init: function (options) {

        var model = options.model,
            widgetList = model.widgetList,
            element = this.el;
        
        element
            .html(this.templates.element())
            .cover();

        widgetList
            .bind('add', _.bind(this.add, this))

        this.element = element;
        this.model = model;
        this.widgetList = widgetList;

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.Label();
        
        view
            .init({ model: widget })
            .render()
            .element
                .appendTo(this.element);
        
        return this;
    },

    show: function () {
        
        this.render();
        this.element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();
        
        return this;
    },

    enable: function () {
                
        this.element.cover('disable');

        return this;
    },

    disable: function () {
        
        this.element.cover('enable');

        return this;
    }
    
});