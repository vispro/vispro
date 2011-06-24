vispro.model.DescriptorList = Backbone.Collection.extend({

    localStorage: new Store("vispro.model.DescriptorList"),
    
    model: vispro.model.Descriptor,

    init: function (options) {
        
        var collection = options.collection;

        $.each(collection, $.proxy(function (i, item) {
            var descriptor = new vispro.model.Descriptor();
            descriptor.init(item);
            this.add(descriptor);
        }, this));

    },

    getByName: function (name) {
        
        var collection = this.models,
            descriptor;

        descriptor = $.filter(collection, function (item) {
            return item.name === name;
        });

        return descriptor;
    }

});