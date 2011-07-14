vispro.view.InspectorList = Backbone.View.extend({

    el: $(
        '<div id="inspectorList" class="panel">' +
        '   <span class="panel-label">Inspector</span>' +
        '</div>'
    ),

    init: function (options) {

        var element = this.el,
            model = options.model,
            widgetList = model.widgetList;

        element
            .cover();
                
        widgetList
            .bind('add', _.bind(this.add, this));
                
        this.model = model;
        this.element = element;

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.Inspector();

        view
            .init({ model: widget })
            .render()
            .appendTo(this.element);

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