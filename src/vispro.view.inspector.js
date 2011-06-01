vispro.view.Inspector = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            properties = model.descriptor.properties,
            label = $('<div>'),
            viewList = [];
            
        label
            .addClass('inspector-label')
            .text(model.get('label'));
            
        element
            .addClass('inspector')
            .append(label);
        
        $.each(properties, function (name, property) {
            var view = new vispro.view.InspectorProperty();
            if (property.writable) {
                view.init({ model: model, property: property });
                element.append(view.render().el);
                viewList.push(view);
            }
        });

        model
            .bind('change:selected', $.proxy(this.select, this))
            .bind('remove', $.proxy(this.remove, this));

        this.model = model;
        this.label = label;
        this.viewList = viewList;

        //this.render();

        return this;
    },

    remove: function () {
        
        $(this.el).remove();
        delete this;
    },

    render: function () {
        
        $.each(this.viewList, function (i, view) {
            view.render();
        });

        var max = 0;

        $("label", this.el).each(function () {  
            if ($(this).width() > max) {
                max = $(this).width();
            }
        });
        
        $("label", this.el).width(max); 

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