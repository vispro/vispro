vispro.model.Workspace = Backbone.Model.extend({
    
    init: function (options) {
        
        var descriptor = options.descriptor,
            type = descriptor.type,
            name = descriptor.type || type,
            template = descriptor.template,
            dimensions = {},
            attributes = {},
            widgetList = new vispro.model.WidgetList(),
            id = vispro.guid(type);

        _.each(descriptor.dimensions, function (dimension, name) {
            dimensions[name] = dimension.value;
        });

        _.each(descriptor.properties, function (property, name) {
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

    createWidget: function (descriptor) {
        
        var widget = new vispro.model.Widget();

        widget.init({ descriptor: descriptor });

        return widget;
    },

    addWidget: function (widget) {
        
        this.widgetList.add(widget);

        return this;
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
        
        this.unselect();
        widget.select();

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

    overlap: function () {
        
        this.widgetList.each(function (widget) {
            widget.overlap();
        });

        return this;
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

            _.each(widget_sources, function (insert, match) {
                sources[match] += insert + '\n';
            });

        }, this);

        source = template_engine(sources);

        return source;
    }
    
});