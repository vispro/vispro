vispro.view.Inspector = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            label = $('<div>'),
            propertyList = new vispro.view.InspectorPropertyList(),
            dependencyList = new vispro.view.InspectorDependencyList();
            
        label
            .addClass('inspector-name')
            .text(model.get('label'));
                    
        propertyList
            .init({ 
                model: model 
            });

        dependencyList
            .init({
                model: model
            });

        element
            .addClass('inspector')
            .append(label)
            .append(propertyList.render().el)
            .append(dependencyList.render().el);
        
        model
            .bind('change:selected', $.proxy(this.select, this))
            .bind('remove', $.proxy(this.remove, this));

        this.model = model;
        this.label = label;
        this.propertyList = propertyList;
        this.dependencyList = dependencyList;

        return this;
    },

    remove: function () {
        
        $(this.el).remove();
        delete this;
    },

    render: function () {
        
        this.propertyList.render();
        this.dependencyList.render();

        return this;
    },

    select: function (model, selected) {
        
        if (selected) {
            $(this.el).show();
            this.render();
        }
        else {
            $(this.el).hide();
        }

        return this;
    }

});