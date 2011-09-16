vispro.view.Inspector = Backbone.View.extend({
    
    templates: {

        element: _.template(
            '<span class="inspector-label">Inspector</span>' + 
            
            '<div class="inspector-properties position">' + 
            '    <span class="inspector-properties-label">Position</span>' + 
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label">left</span>' +
            '        <input type="number" class="inspector-input" data-name="left" />' +
            '    </div>' +
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label">top</span>' +
            '        <input type="number" class="inspector-input" data-name="top" />' +
            '    </div>' +
            '</div>' + 
            
            '<div class="inspector-properties dimensions">' + 
            '    <span class="inspector-properties-label">Dimensions</span>' + 
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label">width</span>' +
            '        <input type="number" class="inspector-input" data-name="width" />' +
            '    </div>' +
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label">height</span>' +
            '        <input type="number" class="inspector-input" data-name="height" />' +
            '    </div>' +
            '</div>' +

            '<div class="inspector-properties properties">' + 
            '    <span class="inspector-properties-label">Properties</span>' + 
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label">id</span>' +
            '        <input type="text" class="inspector-input" data-name="id" />' +
            '    </div>' +

            '<% _.each(descriptor.properties, function (property, name) { %>' + 
            
            '    <div class="inspector-property">' +
            '        <span class="inspector-property-label"><%= name %></span>' +
            '        <input type="<%= (property.type === "bool" ? "checkbox" : property.type) %>" ' + 
            '            class="inspector-input property" data-name="<%= name %>" data-type="<%= property.type %>" />' +
            '    </div>' + 

            '<% }, this); %>' + 

            '</div>' + 

            '<div class="inspector-properties dependencies">' + 
            '    <span class="inspector-properties-label">Dependencies</span>' + 

            '<% _.each(dependencies, function (dependency, type) { %>' + 

            '    <span class="inspector-property-label"><%= type %></span>' +
            '    <select class="inspector-input dependency" data-type="<%= type %>" >' + 
            '        <option value="undefined"> - </option>' +
            '    </select>' + 

            '<% }); %>' + 

            '</div>'
        ),

        option: _.template(
            '<option value="<%= (id ? id : undefined) %>"><%= (id ? id : "-") %></option>'
        )

    },

    initialize: function (attributes, options) {

        var model = options.model,
            descriptor = model.descriptor,
            i_dimensions = descriptor.dimensions,
            i_dependencies = model.dependencies,
            i_properties = descriptor.properties,
            templates = this.templates,
            element = $(this.el),
            inputs = {},
            divs = {};

        element.html(templates.element(model));

        inputs.width = $(element.find('input[data-name="width"]'));
        inputs.height = $(element.find('input[data-name="height"]'));
        inputs.top = $(element.find('input[data-name="top"]'));
        inputs.left = $(element.find('input[data-name="left"]'));
        inputs.id = $(element.find('input[data-name="id"]'));
        inputs.properties = $(element.find('input.property'));
        inputs.dependencies = $(element.find('select.dependency'));

        divs.properties = $(element.find('.inspector-properties.properties'));
        divs.dependencies = $(element.find('.inspector-properties.dependencies'));

        if (i_dimensions.width.resizable === false) {
            inputs.width.attr({ readonly: true });
        }
        if (i_dimensions.height.resizable === false) {
            inputs.height.attr({ readonly: true });
        }
        if (_.isEmpty(i_dependencies)) {
            divs.dependencies.hide();
        }

        model
            .bind('selected', this.select, this)
            .bind('resize', this.render_dimensions, this)
            .bind('move', this.render_position, this)
            .bind('addlink', this.render_dependencies, this)
            .bind('removelink', this.render_dependencies, this)
            .bind('remove', this.remove, this)
            .bind('change', this.render_properties, this)
            .bind('change_id', this.render_properties, this);

        this.model = model;
        this.element = element;
        this.inputs = inputs;

        return this;
    },

        
    appendTo: function (root) {
        
        this.element.appendTo(root);

        return this;
    },

    remove: function () {
        
        this.element.remove();

        return this;
    },

    render: function () {

        this
            .render_position()
            .render_dimensions()
            .render_properties()
            .render_dependencies();
        
        return this;
    },

    render_position: function () {
        
        var model = this.model,
            inputs = this.inputs;
        
        inputs.top.val(model.position.top);
        inputs.left.val(model.position.left);            

        return this;
    },

    render_dimensions: function () {
      
        var model = this.model,
            inputs = this.inputs;

        inputs.width.val(model.dimensions.width);
        inputs.height.val(model.dimensions.height);        

        return this;  
    },

    render_properties: function () {
        
        var model = this.model,
            inputs = this.inputs;

        inputs.id.val(model.id);

        inputs.properties.each(function (i, input) {

            var input = $(input),
                name = input.attr('data-name'),
                type = input.attr('data-type'),
                value = model.get(name);
            
            if (type === 'bool') {
                input.attr({ checked: value});
            }

            input.val(value);
        });

        return this;
    },

    render_dependencies: function () {

        var model = this.model,
            templates = this.templates,
            collection = model.collection,
            inputs = this.inputs;
        
        inputs.dependencies.each(function (i, input) {
            
            var input = $(input),
                type = input.attr('data-type'),
                dependency = model.dependencies[type],
                value = dependency.value,
                widget = collection.getByCid(value),
                widgets = collection.getByType(type),
                option = $(templates.option({ id: undefined }));

            option.data('widget', undefined);
            
            input.empty();
            input.append(option);

            _(widgets).each(function (widget) {
                option = $(templates.option(widget));
                option.data('widget', widget);
                input.append(option);
            });

            input.val(widget ? widget.id : 'undefined');
        });
        
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

    change_width: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs,
            snap = model.snap,
            grid = model.grid,
            old_width = model.dimensions.width,
            val = +inputs.width.val();
        
        model.resize({
            width: val + (val > old_width ? grid : 0 ) - (val % grid)
        });

        return this;
    },

    change_height: function (event, ui) {
        
       var model = this.model,
            inputs = this.inputs,
            snap = model.snap,
            grid = model.grid,
            old_height = model.dimensions.height,
            val = +inputs.height.val();
        
        model.resize({
            height: val + (val > old_height ? grid : 0 ) - (val % grid)
        });

        return this;
    },

    change_position: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs;
        
        model.move({
            top: +inputs.top.val(),
            left: +inputs.left.val()
        });

        return this;
    },

    change_id: function (event, ui) {

        var model = this.model,
            inputs = this.inputs;
        
        model.setId(inputs.id.val());

        return this;        
    },

    change_property: function (event, ui) {
        
        var model = this.model,
            target = $(event.target),
            name = target.attr('data-name'),
            type = target.attr('data-type'),
            value = type === 'bool' ? target.is(':checked') : target.val(),
            obj = {};
        
        obj[name] = value;
        model.set(obj);

        return this;
    },

    change_dependency: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs,
            target = $(event.target),
            type = target.attr('data-type'),
            option = $(target.find('option:selected')),
            widget = option.data('widget');
        
        if (widget) {
            model.addLink(type, widget.cid);
        }
        else {
            model.removeLink(type);
        }

        return this;
    },

    events: {
        'change input[data-name="width"]': 'change_width',
        'change input[data-name="height"]': 'change_height',
        'change input[data-name="top"]': 'change_position',
        'change input[data-name="left"]': 'change_position',
        'change input[data-name="id"]': 'change_id',
        'change input.property': 'change_property',
        'change select.dependency': 'change_dependency'
    }

});