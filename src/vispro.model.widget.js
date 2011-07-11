vispro.model.Widget = Backbone.Model.extend({
    
    init: function (options) {

        var descriptor = options.descriptor,
            type = descriptor.type,
            name = descriptor.name || type,
            group = descriptor.group || type,
            position = options.position || { top: 0, left: 0 },
            dimensions = {},
            dependencies = {},
            attributes = {},
            id = vispro.guid(type);
        
        _.each(descriptor.dimensions, function (name, dimension) {
            dimensions[name] = dimension.value;
        });

        _.each(descriptor.dependencies, function (type, dependency) {
            dependencies[type] = _.extend({}, dependency);
        });

        _.each(descriptor.properties, function (name, property) {
            attributes[name] = property.value;
        });

        this.type = type;
        this.name = name;
        this.group = group;
        this.id = id;
        this.cid = id;
        this.descriptor = descriptor;
        this.position = position;
        this.dimensions = dimensions;
        this.dependencies = dependencies;
        this.attributes = attributes;

        return this;
    },

    select: function () {

        this.collection
            .chain()
            .filter(function (widget) {
                return widget !== this;
            }, this)
            .each(function (widget) {
                widget.unselect();
            });

        this.selected = true;
        this.trigger('selected', true);
        
        return this;
    },

    unselect: function () {
        
        this.selected = false;
        this.trigger('selected', false);

        return this;
    },

    addLink: function (widget) {

        var dependencies = this.dependencies,
            type = widget.type;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = widget;
        this.trigger('addlink', widget);

        return this;
    },

    removeLink: function (widget) {
        
        var dependencies = this.dependencies,
            type = widget.type;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = undefined;
        this.trigger('removelink', widget);

        return this;
    },

    getLinkList: function () {
        
        var dependencies = this.dependencies,
            linkList = [];
        
        linkList = _.select(dependencies, function (type, dependency) {
            return dependency.value !== undefined;
        }, this);

        return linkList;
    },

    isOverlap: function (widget) {
        
        if (this === widget) {
            return false;
        }

        var a_position = this.position, 
            a_dimension = this.dimension,
            a_x = a_position.left,
            a_y = a_position.top,
            a_w = a_dimension.width,
            a_h = a_dimension.height,
            
            a_min_x = a_x,
            a_min_y = a_y,
            a_max_x = a_x + a_w,
            a_max_y = a_y + a_h,              

            b_position = widget.position,
            b_dimension = widget.dimension,
            b_x = position.left,
            b_y = position.top,
            b_w = dimension.width,
            b_h = dimension.height,

            b_min_x = b_x,
            b_min_y = b_y,
            b_max_x = b_x + b_w,
            b_max_y = b_y + b_h, 

            test;
        
        test = 
            !(
                (a_max_x <= b_min_x) || // a is to the left of b 
                (a_min_x >= b_max_x) || // a is to the right of b 
                (a_max_y <= b_min_y) || // a is above b 
                (a_min_y >= b_max_y)    // a is below b
            ); 
        
        return test;
    },

    overlap: function () {
        
        var overlapped;

        overlapped = this.collection.some(function (widget) {
            return this.isOverlap(widget);
        }, this);

        this.overlapped = overlapped;
        this.trigger('overlapped', overlapped);
        
        return this;
    },

    move: function (position) {

        this.position = {
            left: position.left,
            top: position.top
        };

        this.trigger('move', position);

        return this;
    },

    resize: function (dimensions) {
        
        this.dimensions = {
            width: dimensions.width,
            height: dimensions.height
        };

        this.trigger('resize', dimensions);

        return this;
    },

    isValid: function () {
        
        return true;
    },

    compile: function () {
        
        var descriptor = this.descriptor,
            templates = descriptor.templates,
            position = this.position, 
            dimensions = this.dimensions,
            properties = this.attributes,
            dipendencies = this.dipendencies,
            links = {},
            values = {},
            sources = {};

        _.each(dependencies, function (type, dependency) {
            links[dependency.name] = (dependency.value !== undefined)
                ? dependency.value.id : 'undefined';
        });
                
        _.each(templates, function (name, template) {

            var code = template.code,
                parameters = template.parameters,
                engine = _.template(code),
                values = {};

            _.each(parameters, function (i, parameter) {

                var value,
                    dependency;

                if (parameter in properties) {
                    value = properties[parameter];
                }
                else if (parameter in links) {
                    value = links[parameter];
                }
                else if (parameter in position) {
                    value = position[parameter];
                }
                else if (parameter in dimensions) {
                    value = dimensions[parameter];
                }
                else {
                    value = 'undefined';
                }

                values[parameter] = value;
            }, this);

            sources[name] = engine(values);
        }, this);

        return sources;
    }
    
});