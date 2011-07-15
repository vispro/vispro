vispro.view.Inspector = Backbone.View.extend({
    
    templates: {
        element: _.template(
            '<span class="inspector-label"><%= name %></span>' + 
            '<div class="inspector-properties" data-properties="dimensions"></div>' + 
            '<div class="inspector-properties" data-properties="position"></div>' + 
            '<div class="inspector-properties" data-properties="dependencies"></div>' + 
            '<div class="inspector-properties" data-properties="properties"></div>'
        ),

        dimensions: _.template(
            '<span class="inspector-properties-label">Dimensions</span>' +
            
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">width</span>' +
            '    <input type="number" class="inspector-input" value="<%= dimensions.width %>" ' + 
            '        data-property-type="dimension" data-property-name="width" />' +
            '</div>' + 

            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">height</span>' +
            '    <input type="number" class="inspector-input" value="<%= dimensions.height %>" ' + 
            '        data-property-type="dimension" data-property-name="height" />' +
            '</div>'
        ),

        position: _.template(
            '<span class="inspector-properties-label">Position</span>' +
            
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">left</span>' +
            '    <input type="number" class="inspector-input" value="<%= position.left %>" ' + 
            '        data-property-type="position" data-property-name="left" />' +
            '</div>' + 

            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">top</span>' +
            '    <input type="number" class="inspector-input" value="<%= position.top %>" ' + 
            '        data-property-type="position" data-property-name="top" />' +
            '</div>'
        ),

        properties: _.template(
            '<span class="inspector-properties-label">Properties</span>' +

            '<div class="inspector-property">' + 
            '    <span class="inspector-property-label">id</span>' +
            '    <input type="text" class="inspector-input" value="<%= id %>" ' +
            '        data-property-type="property" data-property-name="id" />' +
            '</div>' +

            '<% _.each(attributes, function (property, name) { %>' +

            '    <div class="inspector-property">' + 
            '        <span class="inspector-property-label"><%= name %></span>' +

            '        <% var type = descriptor.properties[name].type; %> ' +
            '        <% if (type === "boolean") { %> ' +

            '            <input type="checkbox" class="inspector-input" <%= property ? "checked" : "" %> ' +
            '                data-property-type="property" data-property-name="<%= name %>" />' +

            '        <% } else { %>' +
            
            '            <input type="<%= type %>" class="inspector-input" value="<%= property %>" ' +
            '                data-property-type="property" data-property-name="<%= name %>" />' +

            '        <% } %>' +
            
            '    </div>' +

            '<% }); %>' + 

            '</div>'
        ),

        dependencies: _.template(
            '<span class="inspector-properties-label">Dependencies</span>' +

            '<% _.each(dependencies, function (dependency, type) { %>' +

            '   <div class="inspector-property">' + 
            '       <span class="inspector-property-label"><%= type %></span>' +
            '       <select class="inspector-input" ' + 
            '           data-property-type="dependency" data-property-name="<%= name %>" >' +
            '           <option value=""> - </option>' + 

            '           <% _.each(collection.getByType(type), function (widget) { %>' + 

            '               <option value="<%= widget.id %>"><%= widget.id %></option> ' + 
            
            '           <% }); %>' + 

            '       </select>' +
            '   </div>' +

            '<% }); %>'
        ),
    },

    init: function (options) {
        
        var model = options.model,
            templates = this.templates,
            element = $(this.el),
            elements = {},
            inputs = {};
        
        element
            .addClass('inspector')
            .html(templates.element(model));

        elements = {
            dimensions: element.find('.inspector-properties[data-properties="dimensions"]'),
            position: element.find('.inspector-properties[data-properties="position"]'),
            dependencies: element.find('.inspector-properties[data-properties="dependencies"]'),
            properties: element.find('.inspector-properties[data-properties="properties"]')           
        };

        elements.dimensions
            .html(templates.dimensions(model))
            .appendTo(element);
        
        elements.position
            .html(templates.position(model))
            .appendTo(element);

        elements.dependencies
            .html(templates.dependencies(model))
            .appendTo(element);

        elements.properties
            .html(templates.properties(model))
            .appendTo(element);

        inputs = {
            width: element.find('.inspector-input[data-property-name="width"]'),
            height: element.find('.inspector-input[data-property-name="height"]'),
            left: element.find('.inspector-input[data-property-name="left"]'),
            top: element.find('.inspector-input[data-property-name="top"]')
        };

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
        
        this.elements.dependencies
            .html(this.templates.dependencies(this.model));

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