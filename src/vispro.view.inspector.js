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
            '    <input type="number" class="inspector-input" ' + 
            '        data-property="width" value="<%= dimensions.width %>" />' +
            '</div>' + 
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">height</span>' +
            '    <input type="number" class="inspector-input" ' +
            '        data-property="height" value="<%= dimensions.height %>" />' +
            '</div>'
        ),

        position: _.template(
            '<span class="inspector-properties-label">Position</span>' +
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">left</span>' +
            '    <input type="number" class="inspector-input" ' + 
            '        data-property="left" value="<%= position.left %>" />' +
            '</div>' + 
            '<div class="inspector-property"> ' +
            '    <span class="inspector-property-label">top</span>' +
            '    <input type="number" class="inspector-input" ' +
            '        data-property="top" value="<%= position.top %>" />' +
            '</div>'
        ),

        properties: _.template(
            '<span class="inspector-properties-label">Properties</span>' +

            '   <div class="inspector-property">' + 
            '       <span class="inspector-property-label">id</span>' +
            '       <input type="text" class="inspector-input" ' +
            '           data-property="id" value="<%= cid %>" />' +
            '   </div>' +

            '<% _.each(attributes, function (property, name) { %>' +

            '   <div class="inspector-property">' + 
            '       <span class="inspector-property-label"><%= name %></span>' +

            '       <% type = descriptor.properties[name].type; %> ' +
            '       <% bool = (type === "boolean"); %> ' + 

            '       <input type="<%= bool ? "checkbox" : type %>" class="inspector-input" ' +
            '           data-property="<%= name %>" <%= bool && property === true ? "checked" : "value" %>="<%= property %>" />' +
            '   </div>' +

            '<% }); %>' + 

            '</div>'
        ),

        dependencies: _.template(
            '<span class="inspector-properties-label">Dependencies</span>' +

            '<% _.each(dependencies, function (dependency, type) { %>' +

            '   <div class="inspector-property">' + 
            '       <span class="inspector-property-label"><%= type %></span>' +
            '       <select class="inspector-input" ' +
            '           data-property="<%= name %>" value="<%= dependency.value ? dependency.value.id : "" %>" >' +

            '           <option value=""></option>' + 

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
            width: element.find('.inspector-input[data-property="width"]'),
            height: element.find('.inspector-input[data-property="height"]'),
            left: element.find('.inspector-input[data-property="left"]'),
            top: element.find('.inspector-input[data-property="top"]')
        };

        model
            .bind('selected', _.bind(this.select, this))
            .bind('resize', _.bind(this.updateDimension, this))
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
            property = input.attr('data-property'),
            value = input.val(),
            model = this.model;

        console.log(input);

        if (property === "id") {
            model.setId(value);
        }
        else if (property === "top") {
            model.move({ top: value, left: model.position.left });
        }
        else if (property === "left") {
            model.move({ top: model.position.top, left: value });            
        }
        else if (property === "width") {
            model.move({ width: value, height: model.dimensions.height });            
        }
        else if (property === "height") {
            model.move({ width: model.dimensions.width, height: value });            
        }

    },

    events: {
        'change' : 'onChange'
    }

});