vispro.model.Widget = Backbone.Model.extend({
    
    init: function (options) {

        var descriptor = options.descriptor,
            container = options.container,
            attributes = options.attributes || {},
            type = descriptor.type;

        console.log(options);

        this.descriptor = descriptor;
        this.container = container;
        this.type = type;
        this.id = vispro.guid(type);
        this.dependencies = {};

        this.attributes.id = this.id;       

        $.each(descriptor.properties, $.proxy(function (name, item) {
            if (typeof this.attributes[name] === 'undefined') {
                this.attributes[name] = attributes[name] || item.value;
            }
        }, this));

        $.each(descriptor.dependencies, $.proxy(function (name, dependency) {
            this.dependencies[name] = {
                type: dependency.type,
                label: dependency.label,
                name: dependency.name
            };
            this.dependencies[name].value = undefined;
        }, this));
    },

    serialize: function () {
        
        var result = {};

        
        
        return result;
    },

    select: function () {
        
        this.container.selectWidget(this);
        
        return this;
    },

    addLink: function (widget) {
        
        var dependencies = this.dependencies,
            setter = {};
        
        $.each(dependencies, $.proxy(function (name, dependency) {
            if (dependency.type === widget.type) {
                dependency.value = widget;
            }  
        }, this));

        this.trigger('addlink');

        return this;
    },

    removeLink: function (widget) {
        
        var dependencies = this.dependencies,
            setter = {};
        
        $.each(dependencies, $.proxy(function (name, dependency) {
            if (dependency.type === widget.type) {
                dependency.value = undefined;
            }
        }, this));

        this.trigger('removelink');

        return this;
    },

    getLinkedWidgetList: function () {
        
        var dependencies = this.dependencies,
            linkedWidgetlist = [];
        
        $.each(dependencies, $.proxy(function (name, dependency) {
            if (typeof dependency.value !== 'undefined') {
                linkedWidgetlist.push(dependency.value);
            }
        }, this));

        return linkedWidgetlist;
    },

    isOverlappedOn: function (widget) {
        
        if (this === widget) {
            return;
        }

        var a_x = this.get('left'),
            a_y = this.get('top'),
            a_w = this.get('width'),
            a_h = this.get('height'),
            
            a_min_x = a_x,
            a_min_y = a_y,
            a_max_x = a_x + a_w,
            a_max_y = a_y + a_h,              

            b_x = widget.get('left'),
            b_y = widget.get('top'),
            b_w = widget.get('width'),
            b_h = widget.get('height'),

            b_min_x = b_x,
            b_min_y = b_y,
            b_max_x = b_x + b_w,
            b_max_y = b_y + b_h, 

            isOverlapped;
        
        isOverlapped = 
            !(
                (a_max_x <= b_min_x) || // a is to the left of b 
                (a_min_x >= b_max_x) || // a is to the right of b 
                (a_max_y <= b_min_y) || // a is above b 
                (a_min_y >= b_max_y)    // a is below b
            ); 
        
        return isOverlapped;
    },

    isOverlapped: function () {
        
        var container = this.container,
            widgetList = container.widgetList,
            isOverlapped = false;

        widgetList.each(function (widget) {

            if (this === widget) {
                return;
            }

            isOverlapped = isOverlapped || this.isOverlappedOn(widget);
        }, this);

        return isOverlapped;
    },

    isValid: function () {
        
        var descriptor = this.descriptor,
            dependencies = this.dependencies,
            properties = descriptor.properties,
            valid = true;
        
        $.each(dependencies, $.proxy(function (name, dependency) {
            valid = dependency.required === false 
                || dependency.value !== undefined;
        }, this));

        return valid;
    },

    compile: function () {
        
        var descriptor = this.descriptor,
            attributes = this.attributes,
            dependencies = this.dependencies,
            properties = descriptor.properties,
            templates = descriptor.templates,
            sources = {};
        
        $.each(templates, $.proxy(function (name, template) {

            var template_engine = _.template(template.code),
                values = {};

            $.each(template.parameters, $.proxy(function (i, parameter) {

                var value = 'undefined',
                    dependency;

                if (parameter in attributes) {
                    value = this.get(parameter);
                }
                else if (parameter in dependencies) {
                    dependency = dependencies[parameter].value;
                    if (dependency !== undefined) {
                        value = dependency.get('id');
                    }
                }

                values[parameter] = value;

            }, this));

            sources[name] = template_engine(values);
        }, this));

        return sources;
    }
    
});