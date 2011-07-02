vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    init: function (options) {
        
        this.type = options.type;
        this.name = options.name;
        this.dependencies = options.dependencies;
        this.properties = options.properties;
        this.templates = options.templates;
    }

});