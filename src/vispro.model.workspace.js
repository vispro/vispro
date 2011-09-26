 vispro.model.Workspace = Backbone.Model.extend({
    
    initialize: function (attributes, options) {
        
        this.type = 'workspace';
        this.name = 'Workspace';
        this.ids = {};
        this.dimensions = { width: 800, height: 450 };
        this.grid = 15;
        this.snap = false;
        this.zIndex = 0;
        this.widgetList = new vispro.model.WidgetList();
        this.descriptorList = new vispro.model.DescriptorList();
        this.modes = ['view', 'link', 'code'];

        return this;
    },

    guid: function (type) {
        
        if (typeof this.ids[type] == 'undefined') {
            this.ids[type] = 0;
        }

        var id = this.ids[type] += 1;

        return type + '_' + id;
    },
    
    createWidget: function (descriptor) {
        
        var widget;
        
        widget = new vispro.model.Widget({}, {
            descriptor: descriptor,
            workspace: this,
            zIndex: this.widgetList.size()
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
        
        var grid = this.grid,
            snap = this.snap,
            widget_dimensions = this.dimensions,
            width = dimensions.width || 0,
            height = dimensions.height || 0,
            halfGrid = Math.floor(grid / 2),
            preSnappedWidth = width + halfGrid,
            preSnappedHeight = height + halfGrid,
            modWidth = preSnappedWidth % grid,
            modHeight = preSnappedHeight % grid,
            snappedWidth = preSnappedWidth - modWidth,
            snappedHeight = preSnappedHeight - modHeight;

        this.dimensions.width = snap ? snappedWidth : (width || widget_dimensions.width);
        this.dimensions.height = snap ? snappedHeight : (height || widget_dimensions.height);

        this.trigger('resize', this.dimensions);

        return this;
    },

    getWidgetListByType: function (type) {
        
        return this.widgetList.getByType(type);
    },

    isValid: function () {
        
        var test = true;

        this.widgetList.each(function (widget) {
            test &= widget.isValid();
        });

        return test;
    },

    getLog: function () {
        var log = '';

        this.widgetList.each(function (widget) {
            log += widget.getLog();
        });

        return log;
    },

    load: function (descriptor, state) {
        
        this.descriptorList.addAll(descriptor.descriptorList);
        this.template = descriptor.template;

        if (state) {
            this.restore(state);
        }

        return this;
    },

    unload: function () {

        var wl = this.widgetList,
            dl = this.descriptorList;

        wl.remove(_.extend([], wl.models));
        dl.remove(_.extend([], dl.models));

        return this;
    },

    save: function () {

        var that = this,
            state = {
                workspace: {},
                widgetList: null
            },
            widgetList = state.widgetList,
            workspace = state.workspace,
            state_properties = ['dimensions', 'grid', 'ids', 'snap'];

        _(state_properties)
            .each(function(property) {
                workspace[property] = that[property] ;
            }, this);

        state.widgetList = this.widgetList.save();
        
        return state;
    },

    restore: function (state) {

        var workspace = state.workspace,
            descriptorList = this.descriptorList,
            descriptor;

        this.ids = {};
        this.snap = false;

        _(state.widgetList)
            .each(function (widget_state) {
                descriptor = descriptorList.getByName(widget_state.name);
                this.restoreWidget(widget_state, descriptor[0]);
            }, this);

        this.ids = workspace.ids
        this.resize(workspace.dimensions);
        this.regrid(workspace.grid);
        this.resnap(workspace.snap);

        this.select();

        return this;
    },
    
    restoreWidget: function (widget_state, descriptor) {

        var widget = this.createWidget(descriptor);

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
    
    remode: function (mode) {
        
        if (this.mode === mode) {
            return;
        }

        if (_(this.modes).indexOf(mode) < 0) {
            return;
        }

        console.log(mode);

        this.mode = mode;
        this.trigger('remode', mode, this);

        return this;
    }
    
});