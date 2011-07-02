vispro.view.InspectorPropertyList = Backbone.View.extend({
    
    init: function (options) {

        var element = $(this.el),
            model = options.model,
            descriptor = model.descriptor,
            properties = descriptor.properties,
            viewList = [];

        $.each(properties, function (name, property) {
            var view = new vispro.view.InspectorProperty();
            
            if (property.writable) {
                
                view.init({ 
                    model: model, 
                    property: property 
                });
                
                element.append(view.render().el);
                viewList.push(view);
            }
        });

        this.model = model;
        this.viewList = viewList;

        return this;
    },

    render: function () {
        
        var viewList = this.viewList;

        $.each(viewList, function (i, view) {
            view.render();
        });

        return this;
    },

    remove: function () {
        
        $(this.el).remove();
        delete this;
    }

});