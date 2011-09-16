vispro.model.DescriptorList = Backbone.Collection.extend({

    localStorage: new Store("vispro.model.DescriptorList"),
    
    model: vispro.model.Descriptor,

    initialize: function (attributes, options) {
        
        _.extend(this, options);

        return this;
    },
    
    addAll: function (descriptorList) {
        
        _(descriptorList).each(function (descriptor) {
            var model = new this.model({}, descriptor);
            this.add(model);
        }, this);

        return this;
    },

    getByType: function (type) {
        
        var result; 

        result = this.filter(function (descriptor) {
            return descriptor.type === type;
        });

        return result;
    },

    getByName: function (name) {
        
        var result;

        result = this.filter(function (descriptor) {
            return descriptor.name === name;
        });

        return result;
    }

});