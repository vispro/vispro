vispro.view.DescriptorList = Backbone.View.extend({

    el: $(
        '<div class="panel descriptor">' + 
            '<div class="panel-label descriptor ui-layout-north gradient-silver">Widgets</div>' + 
            '<div class="panel-list descriptor ui-layout-center"></div>' + 
        '</div>'
    ),

    initialize: function (attributes, options) {

        var root = $(options.root) || $('<div>'),
            workspace = options.model,
            collection = workspace.descriptorList,
            element = this.el,
            viewList = $(element.find('.panel-list'));
        
        element
            .appendTo(root)
            .layout({
                north__size: 35,
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 0
            });
        
        collection
            .bind('add', this.add, this);
                
        this.collection = collection;
        this.workspace = workspace;
        this.element = element;
        this.root = root;
        this.viewList = viewList;
        
        return this;
    },

    appendTo: function (root) {
        
        this.root = root;
        this.element.appendTo(root);

        return this;
    },

    add: function (descriptor) {

        var viewList = this.viewList,
            view = new vispro.view.Descriptor({}, { 
                model: descriptor,
                root: viewList
            });

        return this;            
    },

    addAll: function (descriptorList) {
        
        _(descriptorList).each(function (descriptor) {
            this.add(descriptor);
        }, this);

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