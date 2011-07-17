vispro.model.Workspace = Backbone.Model.extend({
    
    defaults: {
        type: 'workspace',
        name: 'Workspace',
        dimensions: {
            width: 800,
            height: 450
        },
        grid: 15
    },

    initialize: function (options) {
        
        _.extend(this, this.defaults, options, {
            widgetList: new vispro.model.WidgetList()       
        });
        
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

    setTemplate: function (template) {
        this.template = template;

        return this;
    },

    compile: function () {
        
        var widgetList = this.widgetList.sortByLinks(),
            template = this.template,
            code = template.code,
            matches = template.parameters,
            engine = _.template(code),
            sources = {},
            source;

        console.log(matches);

        _.each(matches, function (match) {
            sources[match] = '';

            console.log(match);

        }); 
                
        _.each(widgetList, function (widget) {
            _.each(widget.compile(), function (insert, match) {
                sources[match] += insert + '\n';

                // console.log(widget.name, match, insert);
                console.log(match);

            }, this);
        }, this);

        source = engine(sources);

        return source;
    }
    
});