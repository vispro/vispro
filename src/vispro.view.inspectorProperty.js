vispro.view.InspectorProperty = Backbone.View.extend({
    
    init: function (options) {
        
        var model = options.model,
            property = options.property,
            element = $(this.el),
            label = $('<label>'),
            input,
            type = property.type,
            name = property.name;
            
        label
            .text(property.label)
            .css({
                float: 'left'
            })
            .attr({
                'for': property.name
            });

        if (type === 'string') {

            input = $('<input>');
            input.attr({ type: 'text' });
        }
        else if (type === 'number') {       

            input = $('<input>');
            input.attr({ type: 'number' });
        } 
        else if (type === 'boolean') {

            input = $('<input>');
            input.attr({ type: 'checkbox' });
        }
        else if (type === 'widget') {           

            input = $('<select>');
        }
        else { 
            
            input = $('<input>');
            input.attr({ type: 'text' });
        }

        element
            .addClass('inspectorProperty')
            .append(label)
            .append(input);

        model
            .bind('change:' + name, $.proxy(this.change, this))
            .bind('remove', $.proxy(this.remove, this));

        this.model = model;
        this.label = label;
        this.input = input;
        this.property = property;

        return this;
    },

    render: function () {
    
        var element = $(this.el),
            model = this.model,
            container = model.container,
            input = this.input,
            property = this.property,
            type = property.type,
            name = property.name,
            value = model.get(name),
            list;
        
        if (type === 'boolean') {
            
            input.attr({ checked: value });
        }
        else if (type === 'widget') {
            
            input
                .empty()
                .append($('<option>'));
            
            list = container.getWidgetListByType(property.widget);
            
            $.each(list, function (i, widget) {

                var option = $('<option>');

                option
                    .data('widget', widget)
                    .attr({ value: widget.id })
                    .text(widget.get('id'));

                input.append(option);
            });

            input.val(value);

        }
        else {

            input.val(value);
        }   

        return this;

    },

    remove: function () {
        
        $(this.el).remove();
        delete this;
    },

    change: function (model, value) {
        
        var input = this.input,
            property = this.property,
            type = property.type;
                
        input.val(value);

        return this;
    },

    onChange: function (event) {

        var model = this.model, 
            input = this.input,

            property = this.property,
            type = property.type,
            name = property.name,
            value = input.val(),

            obj = {};

        obj[name] = value;
        model.set(obj);
    },

    events: {
        'change': 'onChange'
    }

});