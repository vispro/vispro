vispro.view.DescriptorList = Backbone.View.extend({

    el: $(
        '<div class="collection-descriptor panel">' + 
        '   <div class="collection-descriptor-label panel-label ui-layout-north">Widgets</div>' + 
        '   <div class="collection-descriptor-list panel-list ui-layout-center"></div>' + 
        '</div>'
    ),

    initialize: function (attributes, options) {

        var root = $(options.root) || $('<div>'),
            workspace = options.model,
            collection = workspace.descriptorList,
            element = this.el,
            viewList = $(element.find('.collection-descriptor-list'));
        
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

        workspace
            .bind('change_state', this.setState, this)
            .bind('remode', this.remode, this);
        
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
        
        this.viewList.cover('disable');
        
        return this;
    },

    disable: function () {
        
        this.viewList.cover('enable');
        
        return this;
    },

    remode: function (mode) {
        
        if (mode === 'view') {
            this.enable();
        } else {
            this.disable();
        }

        return this;
    }
    
});