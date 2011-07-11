vispro.model.Workspace = Backbone.Model.extend({
    
    init: function (options) {
        
        var descriptor = options.descriptor,
            type = descriptor.type,
            name = descriptor.name || type,
            template = descriptror.template,
            dimensions = {},
            attributes = {},
            widgetList = new vispro.model.WidgetList(),
            id = vispro.guid(type);

        _.each(descriptor.dimensions, function (name, dimension) {
            dimensions[name] = dimension.value;
        });

        _.each(descriptor.properties, function (name, property) {
            attributes[name] = property.value;
        });

        this.type = type;
        this.name = name;
        this.id = id;
        this.cid = id;
        this.descriptor = descriptor;
        this.dimensions = dimensions;
        this.widgetList = widgetList;
        this.template = template;
        this.attributes = attributes;
        
        return this;
    },

    createWidget: function (options) {
        
        var widget = new vispro.model.Widget();

        widget.init({
            descriptor: options.descriptor,
            position: options.position
        });
        
        this.widgetList.add(widget);

        widget.select();

        return widget;
    },

    select: function () {
        
        this.widgetList.each(function (widget) {
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

    selectWidget: function (widget) {
        
        widget.select();
        this.unselect();

        return this;
    }

    overlap: function () {
        
        this.widgetList.each(function (widget) {
            widget.overlap();
        });
    },

    getWidgetListByType: function (type) {
        
        return this.widgetList.getByType(type);
    },

    isValid: function () {
        
        var test;

        test = _.all(widgetList, function (widget) {
            return widget.isValid();
        });

        return test;
    },

    compile: function () {
        
        var widgetList = this.widgetList.sortByLink(),
            template = this.template,
            code = template.code,
            matches = template.parameters,
            template_engine = _.template(code),
            sources = {},
            source;

        _.each(matches, function (match) {
            sources[match] = '';
        });      
        
        _.each(widgetList, function (widget) {

            var widget_sources = widget.compile();

            _.each(widget_sources, function (match, insert) {
                sources[match] += insert + '\n';
            });

        }, this);

        source = template_engine(sources);

        return source;
    }
    
});