vispro.view.DescriptorList = Backbone.View.extend({

    el: $(
        '<div id="descriptorList" class="panel">' +
        '   <div class="panel-label">Widgets</div>' +
        '</div>'
    ),

    init: function (options) {
        
        var model = options.model,
            element = $(this.el);
        
        element
            .cover();
        
        model
            .bind('add', _.bind(this.add, this));
        
        this.model = model;
        this.element = element;

        return this;
    },

    add: function (descriptor) {

        var view = new vispro.view.Descriptor();

        view
            .init({ descriptor: descriptor })
            .render()
            .appendTo($(this.element));

        return this;            
    },

    addAll: function (descriptorList) {
        
        _.each(descriptorList, function (descriptor) {
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