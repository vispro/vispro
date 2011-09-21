vispro.view.BrowserList = Backbone.View.extend({

    el: $(
        '<div id="collection-widget-browser">' + 
            '<div class="collection-widget-browser-label">Browser</div>' +
            '<div class="collection-widget-browser-list"></div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = options.root,
            workspace = options.model,
            widgetList = workspace.widgetList,
            viewList = $(element.find('.collection-browser-list'));
        
        element.appendTo(root).cover();

        widgetList.bind('add', this.add, this);
        this.element = element;
        this.workspace = workspace;
        this.widgetList = widgetList;
        this.viewList = viewList;

        return this;
    },
    
    add: function (widget) {
        
        var viewList = this.viewList,
            view = new vispro.view.Browser({}, { 
                model: widget,
                root: viewList
            });
                
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