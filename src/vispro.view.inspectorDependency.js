vispro.view.InspectorDependency = Backbone.View.extend({
    
    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            dependency = options.dependency,
            label = $('<div>'),
            input = $('<select>');
            
        label
            .addClass('inspector-label')
            .text(dependency.label)
            .attr({
                'for': dependency.name
            });

        element
            .addClass('inspector-dependency')
            .append(label)
            .append(input);

        model
            .bind('addlink', $.proxy(this.render, this))
            .bind('removelink', $.proxy(this.render, this))
            .bind('remove', $.proxy(this.remove, this));

        this.model = model;
        this.label = label;
        this.input = input;
        this.dependency = dependency;

        return this;
    },

    render: function () {
    
        var element = $(this.el),
            model = this.model,
            container = model.container,
            widgetList,
            input = this.input,
            dependency = this.dependency,
            type = dependency.type,
            name = dependency.name,
            value = dependency.value;
            
        input
            .empty()
            .append($('<option>'));

        widgetList = container.getWidgetListByType(type);

        $.each(widgetList, function (i, widget) {

            var option = $('<option>');

            option
                .attr({ value: widget.id })
                .data('widget', widget)
                .text(widget.get('id'));

            input.append(option);
        });

        if (value !== undefined) {
            input.val(value.id)
        }

        return this;
    },

    remove: function () {
        
        $(this.el).remove();

        delete this;
    },

    onChange: function (event) {

        var model = this.model, 
            input = this.input,
            selected = $('option:selected', input),
            widget;

        if (selected.val() !== '') {
            widget = selected.data('widget');
            model.addLink(widget);
        }
    },

    events: {
        'change': 'onChange'
    }

});