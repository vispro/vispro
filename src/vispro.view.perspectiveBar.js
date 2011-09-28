vispro.view.PerspectiveBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'toolbar perspective',

    template: _.template(
        '<% _.each(modes, function (mode) { %>' + 

            '<li class="toolbar-item perspective">' + 
                '<div class="toolbar-item-button perspective" data-mode="<%= mode %>">' + 
                    '<%= mode %>' +
                '</div>' +
            '</li>' +
        
        '<% }); %>'
    ),

    initialize: function (attributes, options) {

        var element = $(this.el),
            template = this.template,
            workspace = options.model,
            root = options.root;
        
        element
            .html(template(workspace))
            .appendTo(root);

        workspace.bind('remode', this.remode, this);

        this.element = element;
        this.root = root;
        this.workspace = workspace;

        return this;
    },

    appendTo: function (root) {
        
        this.render().element.appendTo(root);

        return this;
    },

    render: function () {
        
        return this;
    },

    remode: function (mode) {
        
        var element = this.element,
            items = $(element.find('.toolbar-item-button')),
            item = $(element.find('.toolbar-item-button[data-mode="' + mode + '"]'));

        items.removeClass('selected');
        item.addClass('selected');

        return this;
    },

    onClick: function (event) {
        
        var target = $(event.target),
            mode = target.attr('data-mode');
        
        this.workspace.remode(mode);
    },

    onMouseenter: function (event) {
        
        var target = $(event.target);
        
        target.addClass('over');
    },

    onMouseout: function (event) {
        
        var target = $(event.target);

        target.removeClass('over');
    },

    events: {
        'click .toolbar-item-button': 'onClick',
        'mouseenter .toolbar-item-button': 'onMouseenter',
        'mouseout .toolbar-item-button': 'onMouseout'
    }
    
});