vispro.view.LabelList = Backbone.View.extend({

    el: $(
        '<div id="labelList" class="panel">' + 
            '<div class="panel-label">Browser</div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = options.root,
            workspace = options.model,
            widgetList = workspace.widgetList;
        
        element.appendTo(root).cover();

        widgetList.bind('add', this.add, this);
        this.element = element;
        this.workspace = workspace;
        this.widgetList = widgetList;

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.Label({}, { model: widget });
        
        view.appendTo(this.element);
        
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