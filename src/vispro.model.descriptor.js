vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    init: function (options) {
        
        this.type = options.type;
        this.group = options.group;
        this.name = options.name;
        this.dependencies = options.dependencies;
        this.dimension = options.dimension;
        this.position = options.position;
        this.properties = options.properties;
        this.templates = options.templates;

        return this;
    }

});