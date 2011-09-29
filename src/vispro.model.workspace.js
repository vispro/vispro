 vispro.model.Workspace = Backbone.Model.extend({
    
    initialize: function (attributes, options) {
        
        this.type = 'workspace';
        this.name = 'Workspace';
        this.ids = {};
        this.dimensions = { width: 800, height: 450 };
        this.grid = 15;
        this.snap = true;
        this.zIndex = 0;
        this.parser = new vispro.parser.XML();
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

    create: function (url) {
        
        var parser = this.parser;

        function onSuccess (xml) {
            
            var descriptor = parser.parse(xml);

            this.url = url;

            this
                .load_descriptor(descriptor)
                .remode('view');
        }

        function onFailure (error) {

            console.error(error);
        }

        $.ajax({
            url: url,
            context: this,
            dataType: 'xml',
            success: onSuccess,
            failure: onFailure
        });

        return this;
    },

    unload: function () {

        this.widgetList.empty();
        this.descriptorList.empty();

        return this;
    },

    load_descriptor: function (descriptor) {
        
        this.descriptorList.addAll(descriptor.descriptorList);
        this.template = descriptor.template;

        return this;
    },

    load_state: function (state) {

        var workspace = state.workspace,
            descriptorList = this.descriptorList;

        this.ids = {};
        this.snap = false;

        _(state.widgetList)
            .each(function (widget_state) {
                var descriptor = descriptorList.getByName(widget_state.name);
                this.load_widget(widget_state, descriptor[0]);
            }, this);

        this.ids = workspace.ids;
        this.resize(workspace.dimensions);
        this.regrid(workspace.grid);
        this.resnap(workspace.snap);
        this.remode('view');

        this.select();

        return this;
    },

    load_widget: function (widget_state, descriptor) {

        var widget = this.createWidget(descriptor);

        this.addWidget(widget);
        
        widget.restore(widget_state);
        
        return widget;  
    },

    load: function (state) {
        
        var parser = this.parser;
        
        function onSuccess (xml) {
            
            var descriptor = parser.parse(xml);

            this.url = state.url;
            
            this
                .load_descriptor(descriptor)
                .load_state(state.app)
                .remode('view');
        }

        function onFailure (error) {

            console.error(error);
        }

        this.unload();

        $.ajax({
            url: state.url,
            context: this,
            dataType: 'xml',
            success: onSuccess,
            failure: onFailure
        });

        return this;
    },

    load_from_string: function (state_string) {
        
        var state;

        try {
            state = $.secureEvalJSON(state_string);
        } catch (error) {
            alert("Stato non valido.");
            throw error;
        }

        this.load(state);

        return this;
    },

    save: function () {

        var app = {},
            workspace = {},
            widgetList,
            url = this.url,
            state_properties = ['dimensions', 'grid', 'ids', 'snap'];

        _(state_properties)
            .each(function(property) {
                workspace[property] = this[property] ;
            }, this);

        widgetList = this.widgetList.save();
        
        return {
            app: {
                workspace: workspace,
                widgetList: widgetList
            },
            url: url
        };
    },

    save_to_string: function () {
        
        var state = workspace.save(),
            state_string = $.toJSON(state);

        return state_string;
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

        this.mode = mode;
        this.trigger('remode', mode, this);

        return this;
    }
    
});