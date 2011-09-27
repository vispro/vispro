vispro.view.ToolBar = Backbone.View.extend({

    tagName: 'div',

    className: 'toolbar',

    initialize: function (attributes, options) {

        var element = $(this.el),
            workspace = options.model,
            root = options.root,
            bars = {};
        
        bars.workspace = new vispro.view.WorkspaceBar({}, {
            model: workspace,
            root: element
        });

        bars.widgetList = new vispro.view.WidgetBarList({}, {
            model: workspace,
            root: element
        });

        element
            .appendTo(root);

        this.element = element;
        this.workspace = workspace;
        this.root = root;
        this.bars = bars;

        return this;
    },

    appendTo: function (root) {
        
        this.render().element.appendTo(root);

        return this;
    },

    render: function () {
        
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