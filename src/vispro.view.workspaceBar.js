vispro.view.WorkspaceBar = Backbone.View.extend({

    el: $(
        '<div class="workspacebar">' + 
        '    <ul id="workspacebar-list">' + 
        '        <li><a href="#workspace/view" data-state="view">view</a></li>' +
        '        <li><a href="#workspace/link" data-state="link">link</a></li>' +
        '        <li><a href="#workspace/code" data-state="code">code</a></li>' +
        '    </ul>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            workspace = options.model,
            root = $(options.root) || $('<div>');
        
        element.appendTo(root);

        workspace.bind('remode', this.changeState, this);

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

    changeState: function (state) {
        
        

        return this;
    },

    onClickState: function (event) {
        
        var target = $(event.target),
            state = target.attr('data-state');

        this.workspace.remode(mode);
    },

    events: {
        'click a': 'onClickState'
    }
    
});