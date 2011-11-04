/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.Inspector = Backbone.View.extend({
    
    tagName: 'div',

    className: 'panel-item inspector',

    template: _.template(
        '<div class="inspector-label"><%= label %></div>' + 
        
        '<div class="inspector-properties">' + 
            '<span class="inspector-properties-label">Position</span>' + 
            '<div class="inspector-property">' +
                '<span class="inspector-property-label">left</span>' +
                '<input type="number" class="inspector-input" data-name="left" />' +
            '</div>' +
            '<div class="inspector-property">' +
                '<span class="inspector-property-label">top</span>' +
                '<input type="number" class="inspector-input" data-name="top" />' +
            '</div>' +
        '</div>' + 
        
        '<div class="inspector-properties">' + 
            '<span class="inspector-properties-label">Dimensions</span>' + 
            '<div class="inspector-property">' +
                '<span class="inspector-property-label">width</span>' +
                '<input type="number" class="inspector-input" data-name="width" />' +
            '</div>' +
            '<div class="inspector-property">' +
                '<span class="inspector-property-label">height</span>' +
                '<input type="number" class="inspector-input" data-name="height" />' +
            '</div>' +
        '</div>' +

        '<div class="inspector-properties inspector-attributes">' + 
            '<span class="inspector-properties-label">Properties</span>' + 
            '<div class="inspector-property">' +
                '<span class="inspector-property-label">id</span>' +
                '<input type="text" class="inspector-input" data-name="id" />' +
            '</div>' +

        '<% _(descriptor.properties).each(function (property, name) { %>' + 
        
            '<div class="inspector-property">' +
                '<span class="inspector-property-label"><%= name %></span>' +
                '<input type="<%= (property.type === "bool" ? "checkbox" : property.type) %>" ' + 
                    'class="inspector-input inspector-property" ' + 
                    'data-name="<%= name %>" data-type="<%= property.type %>"' +
                    '<%= property.decimals ? "step=" + Math.pow(10,-1*property.decimals) : "" %> />' +
                '</div>' + 

        '<% }, this); %>' + 

        '</div>' + 

        '<div class="inspector-properties inspector-dependencies">' + 
            '<span class="inspector-properties-label">Dependencies</span>' + 

        '<% _(dependencies).each(function (dependency, type) { %>' + 

            '<span class="inspector-property-label"><%= type %></span>' +
            '<select class="inspector-input inspector-dependency" data-type="<%= type %>" >' + 
                '<option value="undefined"> - </option>' +
            '</select>' + 

        '<% }); %>' + 

        '</div>'
    ),

    template_option: _.template(
        '<option value="<%= (id ? id : undefined) %>"><%= (id ? id : "-") %></option>'
    ),

    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
            descriptor = model.descriptor,
            i_dimensions = descriptor.dimensions,
            i_dependencies = model.dependencies,
            i_properties = descriptor.properties,
            template = this.template,
            element = $(this.el),
            inputs = {},
            divs = {};

        element
            .html(template(model))
            .appendTo(root);

        inputs.width = $(element.find('input[data-name="width"]'));
        inputs.height = $(element.find('input[data-name="height"]'));
        inputs.top = $(element.find('input[data-name="top"]'));
        inputs.left = $(element.find('input[data-name="left"]'));
        inputs.id = $(element.find('input[data-name="id"]'));
        inputs.properties = $(element.find('.inspector-property'));
        inputs.dependencies = $(element.find('.inspector-dependency'));

        divs.properties = $(element.find('.inspector-attributes'));
        divs.dependencies = $(element.find('.inspector-dependencies'));

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
        this.root = root;
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
            template_option = this.template_option,
            collection = model.collection,
            inputs = this.inputs;
        
        inputs.dependencies.each(function (i, input) {
            
            var input = $(input),
                type = input.attr('data-type'),
                dependency = model.dependencies[type],
                value = dependency.value,
                widget = collection.getByCid(value),
                widgets = collection.getByType(type),
                option = $(template_option({ id: undefined }));

            option.data('widget', undefined);
            
            input.empty();
            input.append(option);

            _(widgets).each(function (widget) {
                option = $(template_option(widget));
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

    change_position: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs;
        
        model.move({
            left: +inputs.left.val(),
            top: +inputs.top.val()
        });

        return this;
    },

    change_dimension: function (event, ui) {
        
       var model = this.model,
            inputs = this.inputs;

        model.resize({
            width:  +inputs.width.val(),
            height:  +inputs.height.val()
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
            is_bool = type === 'bool',
            value =  is_bool ? target.is(':checked') : target.val();

        model.setProperty(name, value);

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
        'change .inspector-input[data-name="width"]': 'change_dimension',
        'change .inspector-input[data-name="height"]': 'change_dimension',
        'change .inspector-input[data-name="top"]': 'change_position',
        'change .inspector-input[data-name="left"]': 'change_position',
        'change .inspector-input[data-name="id"]': 'change_id',
        'change input.inspector-property': 'change_property',
        'change .inspector-dependency': 'change_dependency'
    }

});