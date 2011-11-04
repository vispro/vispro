/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.model.DescriptorList = Backbone.Collection.extend({

    localStorage: new Store("vispro.model.DescriptorList"),
    
    model: vispro.model.Descriptor,

    initialize: function (attributes, options) {
        
        _.extend(this, options);

        return this;
    },

    empty: function () {
        
        this.remove(_.extend([], this.models));

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
    },

    save: function () {

        var states = [];

        _(this.models)
            .each(function(descriptor) {
                states.push(descriptor.save());
            }, this);

        return states;
    },

    restore: function (state) {
        this.addAll(state);
    }

});