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
        '</li>' + 
        '<li class="toolbar-item app">' + 
            '<div class="toolbar-item-button app" data-action="help">Help</div>' + 
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

    onClick: function (event) {
        
        var workspace = this.workspace,
            target = $(event.target),
            action = target.attr('data-action');
        
        function reset () {
        
            if (window.confirm(
                'Le modifiche non salvate andranno perdute.\n' +
                'Creare un nuovo progetto comunque?'
            )) {
                $('body').cover();
                return window.location.reload();
            }

            return workspace.remode('code');
        }

        function save () {
            
            return workspace.remode('code');;
        }

        function load () {

            var state = window.prompt('Paste your saved state here');
            app.restore_from_string(state);
        }

        if (action === 'new') {

            return reset();
        }

        if (action === 'save') {
            
            return save();
        }

        if (action === 'load') {
            
            return load();
        }
    },

    events: {
        'click .toolbar-item-button': 'onClick'
    }
    
});