vispro.view.PerspectiveBar = Backbone.View.extend({

    tagName: 'div',

    className: 'viewbar',

    template: _.template(
        '<div class="viewbar-list">' + 

        '<% _.each(modes, function (mode) { %>' + 
        '    <div class="viewbar-item" data-mode="<%= mode %>"><%= mode %></div>' +
        '<% }); %>' +

        '</div>'
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
            items = $(element.find('.viewbar-item')),
            item = $(element.find('.viewbar-item[data-mode="' + mode + '"]'));

        console.log(mode, items, item);

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
        'click .viewbar-item': 'onClick',
        'mouseenter .viewbar-item': 'onMouseenter',
        'mouseout .viewbar-item': 'onMouseout'
    }
    
});