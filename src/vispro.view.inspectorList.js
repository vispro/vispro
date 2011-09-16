vispro.view.InspectorList = Backbone.View.extend({

    el: $(
        '<div id="inspectorList" class="panel">' +
        '   <span class="panel-label">Inspector</span>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = options.root,
            model = options.model,
            widgetList = model.widgetList,
            inspectorWorkspace = new vispro.view.InspectorWorkspace({}, {
                model: model
            });
        
        element.appendTo(root).cover();
        inspectorWorkspace.appendTo(element);
        
        widgetList.bind('add', this.add, this);

        this.model = model;
        this.element = element;
        this.root = root;

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.Inspector({}, { model: widget });

        view.render().appendTo(this.element);

        return this;
    },

    show: function () {
        
        this.render().element.show();

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