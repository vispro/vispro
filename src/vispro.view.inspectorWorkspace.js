vispro.view.InspectorWorkspace = Backbone.View.extend({

    el: $(
        '<div class="workspace-inspector">' +
        '    <span class="inspector-label">Workspace</span>' + 
        
        '    <div class="inspector-properties dimensions">' + 
        '        <span class="inspector-properties-label">Dimensions</span>' + 
        '        <div class="inspector-property">' +
        '            <span class="inspector-property-label">width</span>' +
        '            <input type="number" class="inspector-input" data-name="width" />' +
        '        </div>' +
        '        <div class="inspector-property">' +
        '            <span class="inspector-property-label">height</span>' +
        '            <input type="number" class="inspector-input" data-name="height" />' +
        '        </div>' +
        '    </div>' +
        '</div>'
    ),
    
    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
            element = $(this.el),
            inputs = {},
            divs = {};
        
        inputs.width = $(element.find('.inspector-input[data-name="width"]'));
        inputs.height = $(element.find('.inspector-input[data-name="height"]'));
        inputs.grid = $(element.find('.inspector-input[data-name="grid"]'));
        inputs.snap = $(element.find('.inspector-input[data-name="snap"]'));

        element.appendTo(root);

        model
            .bind('selected', this.select, this)
            .bind('resize', this.render_dimensions, this);

        this.model = model;
        this.element = element;
        this.root = root;
        this.inputs = inputs;

        return this;
    },
        
    appendTo: function (root) {
        
        this.element.appendTo(root);

        return this;
    },

    remove: function () {
        
        this.element.remove();

        return this;
    },

    render: function () {

        this
            .render_dimensions()
            .render_gridInfo();
        
        return this;
    },

    render_dimensions: function () {
      
        var model = this.model,
            inputs = this.inputs;

        inputs.width.val(model.dimensions.width);
        inputs.height.val(model.dimensions.height);        

        return this;  
    },

    render_gridInfo: function () {
        
        var model = this.model,
            inputs = this.inputs;
        
        inputs.snap.attr({ checked: model.snap });
        inputs.grid.val(model.grid);
        
        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();

        return this;
    },

    change_dimension: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs;
        
        model.resize({
            width: +inputs.width.val(),
            height: +inputs.height.val()
        });

        return this;
    },

    change_grid: function (event, ui) {
        
        var model = this.model,
            inputs = this.inputs,
            target = $(event.target),
            option = $(target.find('option:selected')),
            value = option.val();
        
        model.regrid(value);

        return this;
    },

    change_snap: function (event, ui) {
        
        var model = this.model,
            target = $(event.target),
            value = target.is(':checked');
                
        model.resnap(value);

        return this;
    },

    events: {
        'change input[data-name="width"]': 'change_dimension',
        'change input[data-name="height"]': 'change_dimension',
        'change select[data-name="grid"]': 'change_grid',
        'change input[data-name="snap"]': 'change_snap'
    }

});