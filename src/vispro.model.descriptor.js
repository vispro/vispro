vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    init: function (options) {
        
        var name = options.name,
            properties = options.properties,
            templates = options.templates;

        this.name = options.name;
        this.properties = options.properties;
        this.templates = options.templates;
    }

});