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
        this.linkList = {};

        this.attributes.id = this.id;       

        $.each(descriptor.properties, $.proxy(function (name, item) {
            if (typeof this.attributes[name] === 'undefined') {
                this.attributes[name] = attributes[name] || item.value;
            }
        }, this));
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
                setter[property.name] = widget.id;
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
                    linkedWidget = widgetList.get(linkedWidgetId);
                    if (typeof linkedWidget !== 'undefined') {
                        linkedWidgetlist.push(linkedWidget);
                    }
                }
            }
        }, this));

        return linkedWidgetlist;
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

            $.each(template.parameters, $.proxy(function (name, parameter) {
                
                values[name] = this.get(parameter.ref);
            }, this));

            sources[name] = template_engine(values);
        }, this));

        return sources;
    }
    
});