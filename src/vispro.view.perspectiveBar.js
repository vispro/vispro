vispro.view.PerspectiveBar = Backbone.View.extend({

    el: $(
        '<div class="viewbar">' + 
        '    <div class="viewbar-item" data-state="view">' +
        '       <div class="viewbar-item-label">view</div>' +
        '    </div>' +
        '    <div class="viewbar-item" data-state="link">' +
        '        <div class="viewbar-item-label">link</div>' + 
        '    </div>' + 
        '    <div class="viewbar-item" data-state="code">' + 
        '       <div class="viewbar-item-label">code</div>' +
        '    </div>' +
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