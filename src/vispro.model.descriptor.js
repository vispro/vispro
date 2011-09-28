vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    initialize: function (attributes, options) {
        
        _.extend(this, options);

        return this;
    }

});