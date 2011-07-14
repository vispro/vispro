vispro.model.DescriptorList = Backbone.Collection.extend({

    localStorage: new Store("vispro.model.DescriptorList"),
    
    model: vispro.model.Descriptor,

    init: function (options) {
        
        return this;
    },

    addAll: function (descriptorList) {
        
        _.each(descriptorList, function (descriptor) {
            var model = new this.model();
            model.init(descriptor);
            this.add(model);
        }, this);

        return this;
    },

    getByType: function (type) {
        
        return this.filter(function (descriptor) {
            return descriptor.type === type;
        });
    }

});