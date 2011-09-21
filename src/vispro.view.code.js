vispro.view.Code = Backbone.View.extend({

    el: $(
        '<div class="workspace-code">' +
        '   <div class="output-code ui-layout-center"></div>' +
        '   <div class="output-state ui-layout-south"></div>' +
        '</div>'
    ),

    code: $(
        '<code class="JScript"></code>'
    ),
    
    initialize: function (attributes, options) {
                
        var element = this.el,
            root = $(options.root),
            workspace = options.model,
            output_code,
            output_state;

        
        element
            .appendTo(root)
            .css({
                position: 'absolute',
                width: '100%',
                height: '100%'
            })
            .layout({
                center__size: .75,
                south__size:.25,
                south__closable: false,
                south__resizable: false
            });


        output_code = $(element.find('.output-code'));
        output_state = $(element.find('.output-state'));

        workspace
            .bind('remode', this.remode, this);

        this.workspace = workspace;
        this.element = element;
        this.root = root;
        this.output_code = output_code;
        this.output_state = output_state;

        return this;
    },
    
    render: function () {
        
        var el = $(this.el),
            output_code = $(this.output_code),
            output_state = $(this.output_state),
            workspace = this.workspace,
            code,
            state,
            source;


        if (workspace.isValid()) {
            source = workspace.compile();
        }
        else {
            source = workspace.getLog();
        }

        output_code.empty();
        code = $('<code>');
        code
            .addClass('JScript')
            .appendTo(output_code)
            .text(source)
            .beautifyCode('javascript');



        output_state.empty();
        state = $('<code>');
        state
            .appendTo(output_state)
            .addClass('boc-no-gutter')
            .text(app.save_to_string())
            .beautifyCode('plain');


        return this;
    },

    render_code: function () {
        
    },

    render_state: function () {
        
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