vispro.view.Inspector = Backbone.View.extend({
    
    templates: {
        element: _.template(
            '<span class="inspector-label"><%= name %></span>'
        ),

        properties: _.template(
            '<div class="inspector-properties" data-properties="<%= name %>">' + 
            '    <span class="inspector-properties-label"><%= label %></span>' +
            '</div>'
        ),

        property: _.template(
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label"><%= name %></span>' +
            '</div>'
        ),

        text: _.template(
            '<input type="text" class="inspector-input" value="<%= value %>" ' + 
            '    data-property-type="text" data-property-name="<%= name %>" />'
        ),

        bool: _.template(
            '<input type="checkbox" class="inspector-input" <%= value ? "checked" : "" %> ' + 
            '    data-property-type="bool" data-property-name="<%= name %>" />'
        ),

        number: _.template(
            '<input type="number" class="inspector-input" value="<%= value %>" ' + 
            '    data-property-type="number" data-property-name="<%= name %>" />'
        ),

        dependency: _.template(
            '<select class="inspector-input" ' + 
            '   data-property-type="dependency" data-property-name="<%= type %>" >' +
            '   <option value="undefined"> - </option>' +
            '</select>'
        )
    },

    init: function (options) {
        
        var model = options.model,
            templates = this.templates,
            element = $(this.el),
            elements = {},
            inputs = {},
            properties,
            property,
            input;
        
        element.html(templates.element({ name: model.type }));

        properties = $(templates.properties({ name: 'dimensions', label: 'Dimensions' }));
        element.append(properties);
        elements.dimensions = $(properties);
                
        property = $(templates.property({ name: 'width' }));
        input = $(templates.number({ name: 'width', value: model.dimensions.width }));
        inputs.width = $(input);
        properties.append(property);
        property.append(input);

        property = $(templates.property({ name: 'height' }));
        input = $(templates.number({ name: 'height', value: model.dimensions.height }));
        inputs.height = $(input);
        properties.append(property);
        property.append(input);

        properties = $(templates.properties({ name: 'position', label: 'Position' }));
        element.append(properties);
        elements.position = $(properties);

        property = $(templates.property({ name: 'left' }));
        input = $(templates.number({ name: 'left', value: model.position.left }));
        inputs.left = $(input);
        properties.append(property);
        property.append(input);

        property = $(templates.property({ name: 'top' }));
        input = $(templates.number({ name: 'top', value: model.position.top }));
        inputs.top = $(input);
        properties.append(property);
        property.append(input);

        properties = $(templates.properties({ name: 'dipendencies', label: 'Dependencies' }));
        element.append(properties);
        elements.dependencies = $(properties);

        _.each(model.dependencies, function (dependency, type) {
            input = $(templates.dependency({ type: type }));
            properties.append(input);
            inputs[type] = $(input);
        });

        properties = $(templates.properties({ name: 'properties', label: 'Properties' }));
        element.append(properties);
        elements.properties = $(properties);

        _.each(model.properties, function (property, name) {

            inputs[name] = input;
        });

        model
            .bind('selected', _.bind(this.select, this))
            .bind('resize', _.bind(this.updateDimensions, this))
            .bind('move', _.bind(this.updatePosition, this))
            .bind('addlink', _.bind(this.updateDependencies, this))
            .bind('removelink', _.bind(this.updateDependencies, this))
            .bind('remove', _.bind(this.remove, this));

        this.model = model;
        this.element = element;
        this.elements = elements;
        this.inputs = inputs;

        return this;
    },

    appendTo: function (root) {
        
        root.append(this.element);

        return this;
    },

    remove: function () {
        
        this.element.remove();

        delete this;
    },

    render: function () {

        var model = this.model;

        this
            .updatePosition(model.position)
            .updateDimensions(model.dimensions)
            .updateDependencies();
                
        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.render().element.show();
        }
        else {
            this.element.hide();
        }

        return this;
    },

    updatePosition: function (position) {
        
        var inputs = this.inputs;

        inputs.left.val(position.left);
        inputs.top.val(position.top);

        return this;
    },

    updateDimensions: function (dimensions) {
        
        var inputs = this.inputs;
        
        inputs.width.val(dimensions.width);
        inputs.height.val(dimensions.height);

        return this;
    },

    updateDependencies: function () {
        
        var inputs = this.inputs,
            widget = this.model;

        _.each(widget.dependencies, function (dependency, type) {

        });

        return this;
    },

    onChange: function (event) {
        
        var input = $(event.target),
            type = input.attr('data-property-type'),
            name = input.attr('data-property-name'),
            value = input.val(),
            model = this.model;

        console.log(input);

        if (type === "position") {
            model.move({ 
                top: (name === 'top') ? +value : model.position.top, 
                left: (name === 'left') ? +value : model.position.left 
            });
        }
        else if (type === "dimension") {
            model.resize({ 
                width: (name === 'width') ? +value : model.dimensions.width, 
                height: (name === 'height') ? +value : model.dimensions.height
            });
        }
        else if (type === "property") {
            model.setProperty(name, value);
        }
        else if (type === "dependency") {
            
        }

    },

    events: {
        'change' : 'onChange'
    }

});