vispro.view.Code = Backbone.View.extend({

    el: $(
        '<div class="workspace-code">' +
        '    <div class="ui-layout-north panel-workspace-code">' + 
        '        <div class="output-code"></div>' +
        '    </div>' +
        '    <div class="ui-layout-center panel-workspace-state">' +
        '        <div class="output-state"></div>' +
        '    </div>' +
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
                north__size: .7,
                north__closable: false,
                north__resizable: false,
                north__spacing_open: 1
            });

        output_code = $(element.find('.output-code'));
        output_state = $(element.find('.output-state'));

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
            code = $('<code>'),
            state = $('<code>'),
            source = '';
        
        if (workspace.isValid()) {
            source = workspace.compile();
        }
        else {
            source = workspace.getLog();
        }

        output_code.empty();

        code
            .addClass('JScript')
            .text(source)
            .appendTo(output_code)
            .beautifyCode('javascript');
        
        output_state.empty();

        state
            .addClass('boc-no-gutter')
            .text(app.save_to_string())
            .appendTo(output_state)
            .beautifyCode('plain');
        
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