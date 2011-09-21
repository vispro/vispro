vispro.view.PerspectiveBar = Backbone.View.extend({

    el: $(
        '<div class="perspective-bar">' + 
        '    <ul class="perspective-bar-list">' + 
        '        <li class="perspective-bar-item"><a href="#workspace/view" data-mode="view">view</a></li>' +
        '        <li class="perspective-bar-item"><a href="#workspace/link" data-mode="link">link</a></li>' +
        '        <li class="perspective-bar-item"><a href="#workspace/code" data-mode="code">code</a></li>' +
        '    </ul>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            workspace = options.model,
            root = options.root;
        
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
            mode = target.attr('data-mode');

        this.workspace.remode(mode);
    },

    events: {
        'click a': 'onClickState'
    }
    
});