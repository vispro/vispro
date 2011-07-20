vispro.model.Widget = Backbone.Model.extend({
    
    init: function (options) {

        var descriptor = options.descriptor,
            label = descriptor.label,
            type = descriptor.type,
            name = descriptor.name || type,
            image = descriptor.image.src,
            position = options.position || { top: 0, left: 0 },
            dimensions = {},
            dependencies = {},
            attributes = {},
            id = vispro.guid(type),
            workspace = options.workspace,
            zIndex = options.zIndex;
        
        _.each(descriptor.dimensions, function (dimension, name) {
            dimensions[name] = dimension.value;
        });

        _.each(descriptor.dependencies, function (dependency, type) {
            dependencies[type] = _.extend({}, dependency);
            dependencies[type].value = undefined;
        });

        _.each(descriptor.properties, function (property, name) {
            if (property.type === 'bool') {
                attributes[name] = property.value === 'true';
            } else if (property.type === 'number') {
                attributes[name] = Number(property.value);
            } else {
                attributes[name] = property.value;
            }
        });

        this.type = type;
        this.name = name;
        this.label = label;
        this.image = image;
        this.snap = 15;
        this.id = id;
        this.cid = id;
        this.descriptor = descriptor;
        this.position = position;
        this.dimensions = dimensions;
        this.dependencies = dependencies;
        this.attributes = attributes;
        this.workspace = workspace;
        this.zIndex = zIndex;

        return this;
    },

    setId: function (id) {
        
        this.id = id;
        this.trigger('change_id', id);

        return this;
    },

    setProperty: function (name, value) {
        console.log(name, value);
        this.attributes[name] = value;

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

        if (typeof widget === 'undefined') {
            return;
        }

        var dependencies = this.dependencies,
            type = widget.type;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = widget;
        this.trigger('addlink', dependencies);

        return this;
    },

    removeLink: function (widget) {
        
        if (typeof widget === 'undefined') {
            return;
        }

        var dependencies = this.dependencies,
            type = widget.type;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = undefined;
        this.trigger('removelink', dependencies);

        return this;
    },

    getLinkList: function () {
        
        var list = [];
        
        _(this.dependencies)
            .chain()
            .filter(function (dependency) {
                return dependency.value !== undefined;
            })
            .each(function (dependency) {
                list.push(dependency.value);
            });

        return list;
    },

    isOverlappedOn: function (widget) {
        
        if (this === widget) {
            return false;
        }

        var a_position = this.position, 
            a_dimensions = this.dimensions,
            a_x = a_position.left,
            a_y = a_position.top,
            a_w = a_dimensions.width,
            a_h = a_dimensions.height,
            
            a_min_x = a_x,
            a_min_y = a_y,
            a_max_x = a_x + a_w,
            a_max_y = a_y + a_h,              

            b_position = widget.position,
            b_dimensions = widget.dimensions,
            b_x = b_position.left,
            b_y = b_position.top,
            b_w = b_dimensions.width,
            b_h = b_dimensions.height,

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

    isOverlapped: function () {
        
        var overlapped;
        
        overlapped = this.collection.any(function (widget) {
            return this.isOverlappedOn(widget);
        }, this);
        
        return overlapped;
    },

    overlap: function () {
        
        this.collection.overlap();
        
        return this;
    },

    move: function (position) {

        this.position = {
            left: position.left,
            top: position.top
        };

        this.trigger('move', position);
        this.collection.overlap();

        return this;
    },

    resize: function (dimensions) {
        
        this.dimensions = {
            width: dimensions.width,
            height: dimensions.height
        };

        this.trigger('resize', dimensions);
        this.collection.overlap();

        return this;
    },

    isValid: function () {
        
        return true;
    },

    bringToFront: function () {
        
        this.workspace.bringWidgetToFront(this);

        return this;
    },

    sendToBack: function () {

        this.workspace.sendWidgetToBack(this);

        return this;
    },

    sendBackward: function () {

        this.workspace.sendWidgetBackward(this);

        return this;

    },

    bringForward: function () {

        this.workspace.bringWidgetForward(this);

        return this;
    },

    getZIndex: function () {
        return this.zIndex;
    },

    setZIndex: function (zIndex) {
        this.zIndex = zIndex;
        this.trigger('zReordering', zIndex);

        return this;
    },

    save: function () {
        var dependencies = {},
            state = {dependencies: dependencies},
            dep_value;

        state.name = this.name;
        state.cid = this.cid;
        state.id = this.id;
        state.dimensions = this.dimensions;
        state.position = this.position;
        state.zIndex = this.zIndex;
        state.properties = this.attributes;
        _.each(this.dependencies, function (dependency, type) {
            dep_value = dependency.value;
            if (dep_value) {
                dependencies[type] = dependency.value.cid;
            }
        });

        return state;
    },

    restore: function (state, dependencies) {
        // var obj = {};

        this.cid = state.cid;

        this.move(state.position);
        this.resize(state.dimensions);
        this.setId(state.id);
        this.setZIndex(state.zIndex);

        // _.each(state.properties, function(value, name) {
        //     obj[name] = value;
        // });
        this.set(state.properties);

        _.each(dependencies, function (widget) {
            this.addLink(widget);
        }, this);


    },

    compile: function () {
        
        var descriptor = this.descriptor,
            templates = descriptor.templates,
            position = this.position, 
            dimensions = this.dimensions,
            properties = this.attributes,
            dependencies = this.dependencies,
            props = { id: this.id, cid: this.cid, zIndex: this.zIndex},
            links = {},
            values = {},
            sources = {};

        _.each(dependencies, function (dependency) {
            links[dependency.name] = (dependency.value !== undefined)
                ? dependency.value.id : 'undefined';
        });
                
        _.each(templates, function (template, name) {

            var code = template.code,
                parameters = template.parameters,
                engine = _.template(code),
                values = {};

            _.each(parameters, function (parameter) {

                var value,
                    dependency;

                if (parameter in props) {
                    value = props[parameter];
                }
                else if (parameter in properties) {
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