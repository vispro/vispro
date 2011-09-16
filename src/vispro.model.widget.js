vispro.model.Widget = Backbone.Model.extend({
    
    initialize: function (attributes, options) {

        var descriptor = options.descriptor,
            workspace = options.workspace,
            label = descriptor.label,
            type = descriptor.type,
            name = descriptor.name || type,
            image = descriptor.image.src,
            position = {},
            dimensions = {},
            dependencies = {},
            attributes = attributes || {},
            id = vispro.guid(type),
            zIndex = 10000, //workspace.widgetList.size(),
            snap = workspace.snap,
            snapped = workspace.snap,
            grid = workspace.grid;
            
        _(descriptor.dimensions).each(function (dimension, name) {
            dimensions[name] = dimension.value;
        });

        _(descriptor.dependencies).each(function (dependency, type) {
            dependencies[type] = _({}).extend(dependency);
            dependencies[type].value = undefined;
        });

        _(descriptor.properties).each(function (property, name) {
            if (property.type === 'bool') {
                attributes[name] = property.value === 'true';
            } else if (property.type === 'number') {
                attributes[name] = +property.value;
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
        this.snap = snap;
        this.snapped = snapped;
        this.grid = grid;
        this.workspace = workspace;

        return this;
    },

    setId: function (id) {
        
        this.id = id;
        this.trigger('change_id', id);

        return this;
    },

    setProperty: function (name, value) {

        this.attributes[name] = value;

        return this;
    },

    select: function () {

        this.workspace.unselect();

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

    addLink: function (type, cid) {

        if (typeof type === 'undefined') {
            return;
        }

        var dependencies = this.dependencies;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = cid;
        this.trigger('addlink', dependencies);

        return this;
    },

    removeLink: function (type) {
        
        if (typeof type === 'undefined') {
            return;
        }

        var dependencies = this.dependencies;

        if (!(type in dependencies)) {
            return this;
        }

        dependencies[type].value = undefined;
        this.trigger('removelink', dependencies);

        return this;
    },

    getLinkList: function () {
        
        var list = [],
            collection = this.collection;
        
        _(this.dependencies)
            .chain()
            .filter(function (dependency) {
                return dependency.value !== undefined;
            })
            .filter(function (dependency) {
                return collection.getByCid(dependency.value) !== undefined;
            })
            .each(function (dependency) {
                list.push(collection.getByCid(dependency.value));
            });

        return list;
    },

    getEffectiveLinks: function () {
        
        var map = {},
            collection = this.collection;
        
        _(this.dependencies)
            .chain()
            .filter(function (dependecy) {
                return collection.getByCid(dependecy.value) !== undefined;
            })
            .each(function (dependency) {
                map[dependency.name] = collection.getByCid(dependecy.value);
            });

        return map;
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
        
        test = !(
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

    resnapped: function () {
        
        this.snapped = false;

        return this;
    },

    resnap: function (snap) {
        
        this.snap = snap;

        return this;
    },

    regrid: function (grid) {
        
        this.grid = grid;

        return this;
    },

    move: function (position) {

        var grid = this.grid,
            snap = this.snap,
            snapped = this.snapped,
            newPositionLeft = position.left, 
            newPositionTop = position.top
            oldPosition = this.position,
            oldPositionLeft = oldPosition.left,
            oldPositionTop = oldPosition.top,
            modLeft = newPositionLeft % grid,
            modTop = newPositionTop % grid,
            deltaLeft = newPositionLeft - oldPositionLeft,
            deltaTop = newPositionTop - oldPositionTop,
            signDeltaLeft = (deltaLeft > 0) * 2 - 1,
            signDeltaTop = (deltaTop > 0) * 2 -1;

        if (snap) {
            if (snapped) {
                this.position = {
                    left: newPositionLeft - modLeft,
                    top: newPositionTop - modTop
                };
            }
            else {
                this.position = {
                    left: signDeltaLeft == 1 ? newPositionLeft + deltaLeft : newPositionLeft - (grid - deltaLeft),
                    top: signDeltaTop == 1 ? newPositionTop + deltaTop : newPositionTop - (grid - deltaTop)
                };
                this.snapped = true;
            }       
        } else {
            this.position = {
                left: newPositionLeft,
                top: newPositionTop
            };
        }
        
        this.trigger('move', this.position);
        this.collection.overlap();

        return this;
    },

    resize: function (bottom_left_corner_pos) {
        
        var i = this.descriptor.dimensions,
            i_width = i.width,
            i_height = i.height,
            grid = this.grid,
            snap = this.snap,
            widget_dimensions = this.dimensions,
            x = bottom_left_corner_pos.left,
            y = bottom_left_corner_pos.top,
            modWidth = x % grid,
            modHeight = y % grid,
            width = (x || widget_dimensions.width) - (snap && x ? modWidth : 0),
            height = (y || widget_dimensions.height) - (snap && y ? modHeight : 0);

        if (i_width.resizable 
                && i_width.min <= width 
                && width <= i_width.max) {
               
            this.dimensions.width = width;
        }
        if (i_height.resizable
                && i_height.min <= height
                && height <= i_height.max) {
            
            this.dimensions.height = height;            
        }

        this.trigger('resize', this.dimensions);
        this.collection.overlap();

        return this;
    },

    isValid: function () {
        
        return true;
    },

    sendToBack: function () {

        var zIndex = this.zIndex;

        this.collection
            .chain()
            .filter(function (widget) {
                return widget.zIndex < zIndex;
            })
            .each(function (widget) {
                widget.zIndex += 1;
            });
        
        this.zIndex = 0;
        this.trigger('zorder', 0, this);

        return this;
    },

    sendBackward: function () {

        var zIndex = this.zIndex;

        if (zIndex === 0) {
            return this;
        }

        this.collection
            .chain()
            .filter(function (widget) {
                return widget.zIndex = zIndex - 1;
            })
            .each(function (widget) {
                widget.zIndex += 1;
            });

        zIndex = this.zIndex -= 1;
        this.trigger('zorder', zIndex, this);
        
        return this;

    },

    bringWidgetForward: function () {

        var zIndex = this.zIndex;

        if (zIndex === this.collection.size() - 1) {
            return this;
        }

        this.collection
            .chain()
            .filter(function (widget) {
                return widget.zIndex = zIndex + 1;
            })
            .each(function (widget) {
                widget.zIndex -= 1;
            });

        zIndex = this.zIndex += 1;
        this.trigger('zorder', zIndex, this);
        
        return this;    
    },

    bringToFront: function () {

        var zIndex = this.zIndex;

        this.collection
            .chain()
            .filter(function (widget) {
                return widget.zIndex > zIndex;
            })
            .each(function (widget) {
                widget.zIndex -= 1;
            });
        
        zIndex = this.zIndex = this.collection.size() - 1;
        this.trigger('zorder', zIndex, this);

        return this;
    },

    save: function () {

        var state = {},
            dependencies = this.dependencies,
            linkList = this.getLinkList();

        _(linkList).each(function (dependency) {
            dependencies[dependency.type] = dependency.cid;
        });

        state.name = this.name;
        state.cid = this.cid;
        state.id = this.id;
        state.dimensions = this.dimensions;
        state.position = this.position;
        state.zIndex = this.zIndex;
        state.properties = this.attributes;        
        state.dependencies = dependencies;

        return state;
    },

    restore: function (state) {

        this.name = state.name;
        this.cid = state.cid;
        this.id = state.id;
        this.dimensions = state.dimensions;
        this.position = state.position;
        this.zIndex = state.zIndex;
        this.attributes = state.properties;

        _(state.dependencies).each(function (id, type) {
            this.addLink(type, id);
        }, this);

        return this;
    },

    compile: function () {
        
        var descriptor = this.descriptor,
            templates = descriptor.templates,
            position = this.position, 
            dimensions = this.dimensions,
            properties = this.attributes,
            dependencies = this.dependencies,
            links = this.getEffectiveLinks(),
            values = {},
            sources = {},
            props = { 
                id: this.id, 
                cid: this.cid, 
                zIndex: this.zIndex
            };
                
        _(templates).each(function (template, name) {

            var code = template.code,
                parameters = template.parameters,
                engine = _.template(code),
                values = {};

            _(parameters).each(function (parameter) {

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