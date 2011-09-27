vispro.view.AppBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'toolbar app',

    template: _.template(
        '<li class="toolbar-item app">' + 
            '<div class="toolbar-item-button app" data-action="new">New</div>' +
        '</li>' +
        '<li class="toolbar-item app">' + 
            '<div class="toolbar-item-button app" data-action="save">Save</div>' +
        '</li>' +
        '<li class="toolbar-item app">' + 
            '<div class="toolbar-item-button app" data-action="load">Load</div>' + 
        '</li>'
    ),

    initialize: function (attributes, options) {

        var element = $(this.el),
            template = this.template,
            root = $(options.root),
            workspace = options.workspace;

        element
            .html(template())
            .appendTo(root);

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

    onClickNew: function (event) {
        
        var exit = window.confirm(
            'Le modifiche non salvate andranno perdute.\n' +
            'Creare un nuovo progetto comunque?'
        );
        
        if (exit) {
            window.location.reload();
        } else {
            this.workspace.remode('code');
        }
    },

    onClickSave: function (event) {
        
        this.workspace.remode('code');
    },

    onClickLoad: function (event) {
        
        var state = window.prompt('Paste your saved state here');
        app.restore_from_string(state);
    },

    events: {
        'click .toolbar-item-button[data-action="new"]': 'onClickNew',
        'click .toolbar-item-button[data-action="save"]': 'onClickSave',
        'click .toolbar-item-button[data-action="load"]': 'onClickLoad'
    }
    
});