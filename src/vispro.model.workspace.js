vispro.model.Workspace = Backbone.Model.extend({
    
    initialize: function (attributes, options) {
        
        this.type = 'workspace';
        this.name = 'Workspace';
        this.dimensions = { width: 800, height: 450 };
        this.grid = 15;
        this.snap = true;
        this.zIndex = 0;
        this.widgetList = new vispro.model.WidgetList();
        this.descriptorList = new vispro.model.DescriptorList();
        
        return this;
    },
    
    createWidget: function (descriptor) {
        
        var widget;
        
        widget = new vispro.model.Widget({}, {
            descriptor: descriptor,
            workspace: this
        });

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
        this.trigger('selected', true, this);
                
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

    resnap: function (snap) {
        
        this.snap = snap;

        this.widgetList.each(function (widget) {
            widget.resnap(snap);
        });

        return this;
    },

    regrid: function (grid) {

        this.grid = grid;

        this.widgetList.each(function (widget) {
            widget.regrid(grid);
        });

        this.trigger('change_grid', grid);
        
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

        test = this.widgetList.all(function (widget) {
            return widget.isValid();
        });

        return test;
    },

    setTemplate: function (template) {

        this.template = template;

        return this;
    },

    save: function () {

        var state = {};

        state.widgetList = this.widgetList.save();
        state.descriptorList = this.descriptorList.save();

        return state;
    },

    restore: function (state) {
        
        _(state.descriptor).each(function (value, property) {
            this[property] = value;
        }, this);

        this.descriptorList.addAll(state.descriptorList);

        _(state.widgetList).each(function (widget_state) {
            this.restoreWidget(widget_state);
        }, this);

        return this;
    },
    
    restoreWidget: function (widget_state, descriptor) {

        var widget = this.createWidget(descriptor), 
            widgetList = this.widgetList,
            resDependencies = resWidget.dependencies,
            dependencies = [];

        this.addWidget(widget);
        
        widget.restore(widget_state);
        
        return widget;  
    },

    compile: function () {
        
        var widgetList = this.widgetList.sortByLinks(),
            template = this.template,
            code = template.code,
            matches = template.parameters,
            engine = _.template(code),
            sources = {},
            source;

        _(matches).each(function (match) {
            sources[match] = '';
        }); 
        
        _(widgetList).each(function (widget) {
            var compiled = widget.compile();
            _(compiled).each(function (insert, match) {
                sources[match] += insert + '\n';
            }, this);
        }, this);

        source = engine(sources);

        return source;
    },
    
    restate: function (state) {
        
        if (this.state === state) {
            return;
        }

        this.state = state;
        this.trigger('restate', state, this);

        return this;
    }
    
});