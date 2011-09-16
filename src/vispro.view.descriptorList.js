vispro.view.DescriptorList = Backbone.View.extend({

    el: $(
        '<div id="descriptorList" class="panel">' +
        '   <div class="panel-label">Widgets</div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var root = $(options.root) || $('<div>'),
            workspace = options.model,
            collection = workspace.descriptorList,
            element = this.el;
        
        element.appendTo(root).cover();
        
        collection.bind('add', this.add, this);

        workspace.bind('change_state', this.setState, this);
        
        this.collection = collection;
        this.workspace = workspace;
        this.element = element;
        this.root = root;
        
        return this;
    },

    appendTo: function (root) {
        
        this.root = root;
        this.element.appendTo(root);

        return this;
    },

    add: function (descriptor) {

        var view = new vispro.view.Descriptor({}, { model: descriptor });

        view.appendTo(this.element);

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