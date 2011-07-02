vispro.view.InspectorDependencyList = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            dependencies = model.dependencies,
            viewList = [];

        $.each(dependencies, function (name, dependency) {
            var view = new vispro.view.InspectorDependency();
                
            view.init({ 
                model: model, 
                dependency: dependency 
            });
            
            element.append(view.render().el);
            viewList.push(view);
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