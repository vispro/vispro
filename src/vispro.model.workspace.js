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

    zIndex: 1,

    initialize: function (options) {
        
        _.extend(this, this.defaults, options, {
            widgetList: new vispro.model.WidgetList()       
        });
        
        return this;
    },

    getMaxZIndex: function () {
        return this.widgetList.models.length - 1;
    },

    createWidget: function (descriptor) {
        
        var widget = new vispro.model.Widget();

        widget.init({ 
            descriptor: descriptor,
            workspace: this,
            zIndex: this.getMaxZIndex() + 1
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

    bringWidgetToFront: function (widget) {
        
        var maxZIndex = this.getMaxZIndex(),
            currentZIndex = widget.getZIndex(),
            sortedWidgets = this.widgetList.sortByZIndex(),
            zIndex;


        _.each(sortedWidgets, function(current_widget, i) {
            if (i > currentZIndex) {
                zIndex = current_widget.getZIndex();
                zIndex--;
                current_widget.setZIndex(zIndex);
            }
        });

        widget.setZIndex(maxZIndex);

        return this;
    },

    sendWidgetToBack: function (widget) {

        var minZIndex = 0,
            currentZIndex = widget.getZIndex(),
            sortedWidgets = this.widgetList.sortByZIndex(),
            zIndex;

        
        _.each(sortedWidgets, function(current_widget, i) {
            if (i < currentZIndex) {
                zIndex = current_widget.getZIndex();
                zIndex++;
                current_widget.setZIndex(zIndex);
            }
        });

        widget.setZIndex(minZIndex);

        return this;
    },

    sendWidgetBackward: function (widget) {

        var currentZIndex = widget.zIndex,
            minZIndex = 0,
            newZIndex = currentZIndex - 1,
            switchWidget;

        if ( currentZIndex != minZIndex) {
            
             switchWidget = this.widgetList.getByZIndex(newZIndex);
             switchWidget.setZIndex(currentZIndex);

             widget.setZIndex(newZIndex);
        }

        return this;

    },

    bringWidgetForward: function (widget) {

        var currentZIndex = widget.zIndex,
            maxZIndex = this.getMaxZIndex(),
            newZIndex = currentZIndex + 1,
            switchWidget;

        if ( currentZIndex != maxZIndex) {
            
             switchWidget = this.widgetList.getByZIndex(newZIndex);
             switchWidget.setZIndex(currentZIndex);

             widget.setZIndex(newZIndex);
        }

        return this;
    },

    save: function () {
        var state = {};

        state.dimensions = this.dimensions;
        state.grid = this.grid;

        state.widgetList = this.widgetList.save();

        return state;
    },

    restore: function (state) {
        
        this.dimensions = state.dimensions
        this.trigger('resize');
        // this.grid = state.grid;
        // this.trigger('...');

        return this;
    },
    
    restoreWidget: function (resWidget, descriptor) {
        var widget = this.createWidget(descriptor), 
            widgetList = this.widgetList,
            resDependencies = resWidget.dependencies,
            dependencies = [];
        
        this.addWidget(widget);
        
        _.each(resDependencies, function (cid, type) {
            dependencies.push(widgetList._byCid[cid]);
        });
            
        widget.restore(resWidget, dependencies);
        
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

        _.each(matches, function (match) {
            sources[match] = '';

        }); 
                
        _.each(widgetList, function (widget) {
            _.each(widget.compile(), function (insert, match) {
                sources[match] += insert + '\n';

            }, this);
        }, this);

        source = engine(sources);

        return source;
    }
    
});