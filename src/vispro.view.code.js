vispro.view.Code = Backbone.View.extend({

    el: $(
        '<div class="workspace-code">' + 
        '   <code class="JScript"></code>' +
        '</div>'
    ),
    
    initialize: function (attributes, options) {
                
        var element = this.el,
            root = $(options.root),
            code = element.find('.JScript');
            workspace = options.model;
        
        element
            .appendTo(root);

        workspace
            .bind('remode', this.remode, this);

        this.workspace = workspace;
        this.code = code;
        this.element = element;
        this.root = root;

        return this;
    },
    
    render: function () {
        
        var code = this.code,
            workspace = this.workspace,
            source = workspace.compile();

        code.text(source).beautifyCode('javascript');

        return this;
    },

    remode: function (mode) {
        
        if (mode === 'code') {
            this.show();
        }
        else {
            this.hide();
        }
        
        return this;
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();

        return this;
    }
});