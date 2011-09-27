vispro.view.Code = Backbone.View.extend({

    el: $(
        '<div class="workspace-code">' +
        '    <div class="ui-layout-north panel-code">' + 
        '        <div id="paper-code-output" class="paper-code"></div>' + 
        '    </div>' +
        '    <div class="ui-layout-center panel-code">' + 
        '        <div id="paper-code-state" class="paper-code"></div>' +
        '    </div>' +
        '</div>'
    ),
        
    initialize: function (attributes, options) {
                
        var element = this.el,
            root = $(options.root),
            workspace = options.model,
            papers = {},
            panels = $(element.find('.panel-code'));

        element
            .appendTo(root)
            .layout({
                north__size: .7,
                north__closable: false,
                north__resizable: false,
                north__spacing_open: 5,
                north__spacing_close: 0,
                north__togglerLength_open: 0,
                north__togglerLength_close: 0,
                fxSpeed: 1
            });

        panels
            .css({ 
                width: '100%' 
            });

        papers.output = $(element.find('#paper-code-output'));
        papers.state = $(element.find('#paper-code-state'));

        this.workspace = workspace;
        this.element = element;
        this.root = root;
        this.papers = papers;

        return this;
    },
    
    render: function () {
        
        var element = this.element,
            workspace = this.workspace,
            papers = this.papers,
            paper_output = papers.output,
            paper_state = papers.state,
            code_output = $('<code>'),
            code_state = $('<code>'),
            output = '',
            state = '';
        
        if (workspace.isValid()) {
            output = workspace.compile();
        }
        else {
            output = workspace.getLog();
        }
        state = app.save_to_string();

        paper_output
            .empty()
            .append(code_output);

        paper_state
            .empty()
            .append(code_state);

        code_output
            .addClass('JScript')
            .text(output)
            .beautifyCode('javascript');
        
        code_state
            .addClass('boc-no-gutter')
            .text(state)
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