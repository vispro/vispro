vispro.view.InspectorProperty = Backbone.View.extend({
    
    init: function (options) {
        
        var model = options.model,
            property = options.property,
            element = $(this.el),
            label = $('<label>'),
            input = $('<input>'),
            type = property.type,
            name = property.name;
            
        label
            .addClass('inspector-label')
            .text(property.label)
            .attr({
                'for': property.name
            });

        if (type === 'boolean') {
            input.attr({ type: 'checkbox' });
        }
        else if (type === 'number') {       
            input.attr({ type: 'number' });
        }
        else {
            input.attr({ type: 'text' });
        }

        input
            .addClass('inspector-input');

        element
            .addClass('inspector-property')
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
    
        var model = this.model,
            input = this.input,
            property = this.property,
            type = property.type,
            name = property.name,
            value = model.get(name);
        
        if (type === 'boolean') {
            input.attr({ checked: value });
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