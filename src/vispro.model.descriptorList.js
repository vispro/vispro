vispro.model.DescriptorList = Backbone.Collection.extend({

    localStorage: new Store("vispro.model.DescriptorList"),
    
    model: vispro.model.Descriptor,

    init: function () {

        return this;
    },

    addAll: function (collection) {
        
        _.each(collection, function (item) {

            var model = new this.model();
            
            model.init(item);
            this.add(model);
        }, this);

        return this;
    },

    getByType: function (type) {
        
        var descriptor;

        descriptor = this.filter(function (item) {

            return item.type === type;
        });

        return descriptor;
    }

});