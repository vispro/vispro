vispro.model.Widget = Backbone.Model.extend({
    
    init: function (options) {

        var descriptor = options.descriptor,
            container = options.container,
            attributes = options.attributes || {},
            name = descriptor.name;

        this.descriptor = descriptor;
        this.container = container;
        this.name = name;
        this.id = vispro.guid(name);

        this.attributes.id = this.id;       

        $.each(descriptor.properties, $.proxy(function (name, item) {
            if (typeof this.attributes[name] === 'undefined') {
                this.attributes[name] = attributes[name] || item.value;
            }
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
        
        var descriptor = this.descriptor,
            properties = descriptor.properties,
            setter = {};

        $.each(properties, $.proxy(function (name, property) {
            if (property.type === 'widget' && property.widget === widget.name) {
                setter[property.name] = widget.get('id');
                this.set(setter);
            }  
        }, this));

        return this;
    },

    removeLink: function (widget) {
        
        var descriptor = this.descriptor,
            properties = descriptor.properties,
            setter = {};
        
        $.each(properties, $.proxy(function (name, property) {
            if (property.type === 'widget' && property.widget === widget.name) {
                setter[property.name] = undefined;
                this.set(setter);
            }
        }, this));

        return this;
    },

    getLinkedWidgetList: function () {
        
        var descriptor = this.descriptor,
            properties = descriptor.properties,
            container = this.container,
            widgetList = container.widgetList,
            linkedWidgetlist = [];
        
        $.each(properties, $.proxy(function (name, property) {
    
            var linkedWidgetId,
                linkedWidget;
    
            if (property.type === 'widget') {
                linkedWidgetId = this.get(property.name);
                if (typeof linkedWidgetId !== 'undefined') {
                    linkedWidget = widgetList.getById(linkedWidgetId);
                    if (typeof linkedWidget !== 'undefined') {
                        linkedWidgetlist.push(linkedWidget);
                    }
                }
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
            properties = descriptor.properties,
            valid = true;
        
        $.each(properties, $.proxy(function (name, property) {
            if (property.type === 'widget' && !this.get(property.name)) {
                valid = false;
            }
        }, this));

        return valid;
    },

    compile: function () {
        
        var descriptor = this.descriptor,
            properties = descriptor.properties,
            templates = descriptor.templates,
            sources = {};
        
        $.each(templates, $.proxy(function (name, template) {

            var template_engine = _.template(template.code),
                values = {};

            $.each(template.parameters, $.proxy(function (i, parameter) {
                values[parameter] = this.get(parameter);
            }, this));

            sources[name] = template_engine(values);
        }, this));

        return sources;
    }
    
});