vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    init: function (options) {
        
        _.extend(this, options);

        return this;
    }

});