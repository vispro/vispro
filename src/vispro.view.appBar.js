vispro.view.AppBar = Backbone.View.extend({

    el: $(
        '<div class="app-bar">' +
        '    <ul class="app-bar-list">' +
        '        <li class="app-bar-item" data-action="home"><a href="#app/home">Home</a></li>' + 
        '        <li class="app-bar-item" data-action="help"><a href="#app/help">Help</a></li>' +
        '        <li class="app-bar-item" data-action="save"><a href="#app/save">Save</a></li>' +
        '        <li class="app-bar-item" data-action="load"><a href="#app/load">Load</a></li>' +
        '        <li class="app-bar-item" data-action="login"><a href="#app/login">Login</a></li>' +
        '        <li class="app-bar-item" data-action="logout"><a href="#app/logout">Logout</a></li>' +
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

    onClick: function (event) {
        
        var model = this.model,
            target = $(event.target),
            action = target.attr('data-action');

        model[action]();
    },

    events: {
        'click a': 'onClick'
    }
    
});