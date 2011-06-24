vispro.model.Workspace = Backbone.Model.extend({
    
    init: function (options) {
        
        var descriptor = options.descriptor,
            attributes = options.attributes || {},
            name = descriptor.name,
            template = descriptor.template;

        this.descriptor = descriptor;
        this.widgetList = new vispro.model.WidgetList();
        this.name = name;
        this.id = vispro.guid(name);
        this.template = template;

        this.attributes.id = this.id;
        
        $.each(descriptor.properties, $.proxy(function (name, item) {
            if (typeof this.attributes[name] === 'undefined') {
                this.attributes[name] = attributes[name] || item.value;
            }
        }, this));

    },

    createWidget: function (options) {
        
        var descriptor = options.descriptor,
            attributes = options.attributes,
            widget = new vispro.model.Widget();

        widget.init({
            descriptor: descriptor,
            attributes: attributes,
            container: this
        });
        
        this.widgetList.add(widget);

        widget.select();

        return widget;
    },

    selectWidget: function (widget) {
        
        var widgetList = this.widgetList;
        
        widget.set({ selected: true });

        this.set({ selected: false });

        this.widgetList
            .each(function (item) {
                if (item.id !== widget.id) {
                    item.set({ selected: false });
                }
            });
        
        return this;
    },

    select: function () {
        
        this.set({ selected: true });
        
        this.widgetList
            .each(function (item) {
                item.set({ selected: false });
            });
        
        return this;
    },

    overlap: function () {
        
        var widgetList = this.widgetList;
        
        widgetList.each(function (widget) {
            
            widget.overlapped = widget.isOverlapped();

        }, this);

        widgetList.each(function (widget) {
            
            widget.set({ overlapped: widget.overlapped });
        });
    },

    getWidgetListByType: function (type) {
        
        var list = this.widgetList.getByType(type);

        return list;
    },

    isValid: function () {
        
        var valid = true;

        widgetList.each(function (widget) {
            valid = valid && widget.isValid();
        });

        return valid;
    },

    compile: function () {
        
        var widgetList = this.widgetList.sortByDeps(),
            template = this.template,
            code = template.code,
            parameters = template.parameters,
            template_engine = _.template(code),
            sources = {},
            source;

        $.each(parameters, function (i, parameter) {
            sources[parameter] = '';
        });      
        
        $.each(widgetList, $.proxy(function (i, widget) {

            var widget_sources = widget.compile();

            $.each(widget_sources, function (match, insert) {
                sources[match] += insert + '\n';
            });

        }, this));

        source = template_engine(sources);

        return source;
    }
    
});