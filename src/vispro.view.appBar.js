vispro.view.AppBar = Backbone.View.extend({

    el: $(
        '<div class="appbar">' +
        '    <ul class="appbar-list">' +
        '        <li class="appbar-item" data-action="new">' + 
        '            <a class="appbar-item-label" href="#new">New</a>' +
        '        </li>' +
        '        <li class="appbar-item" data-action="save">' + 
        '            <a class="appbar-item-label" href="#save">Save</a>' +
        '        </li>' +
        '        <li class="appbar-item" data-action="load">' + 
        '            <a class="appbar-item-label" href="#load" data-action="load">Load</a>' + 
        '        </li>' +
        '    </ul>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = $(options.root),
            workspace = options.workspace;

        element.appendTo(root);

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
        
        var exit = window.confirm("Le modifiche non salvate andranno perdute.\n Creare un nuovo progetto comunque?")
        
        console.log(this);

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
        'click .appbar-item[data-action="new"]': 'onClickNew',
        'click .appbar-item[data-action="save"]': 'onClickSave',
        'click a.appbar-item-label[data-action="load"]': 'onClickLoad'
    }
    
});