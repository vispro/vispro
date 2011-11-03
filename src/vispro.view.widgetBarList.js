/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.WidgetBarList = Backbone.View.extend({

    tagName: 'span',

    className: 'toolbar-list widget',

    initialize: function (attributes, options) {

        var element = $(this.el),
            root = $(options.root),
            workspace = options.model,
            widgetList = workspace.widgetList;
                
        element.appendTo(root);

        workspace
            .bind('select', this.select, this);

        widgetList
            .bind('add', this.add, this);
                
        this.element = element;
        this.workspace = workspace;
        this.root = root;

        return this;
    },

    appendTo: function (root) {
        
        this.root = root;
        this.element.appendTo(root);

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.WidgetBar({}, {
            model: widget,
            workspace: this.workspace,
            root: this.element
        });

        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.render().element.show();
        }
        else {
            this.element.hide();
        }

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