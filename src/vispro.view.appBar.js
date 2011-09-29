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

        $('body')[0]
            .onbeforeunload = function () {
                return 'Unsaved changes will be lost.'    
            };

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
                'Unsaved changes will be lost.\n' +
                'Continue anyway?'
            )) {
                
                $('body').cover('enable');
                window.location.reload();
                return;
            }

            workspace.remode('code');
        }

        function save () {
            
            workspace.remode('code');;
        }

        function load () {

            var state_string,
                state;

            state_string = window.prompt('Paste your saved state here');
            
            if (state_string === null) {
                return;
            }

            try {
                state = $.secureEvalJSON(state_string);
            } catch (error) {
                alert('Unvalid state');
                return;
            }

            $('body').cover('enable');            
            workspace.load(state);
            $('body').cover('disable');
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