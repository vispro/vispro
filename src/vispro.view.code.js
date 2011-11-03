/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.Code = Backbone.View.extend({

    el: $(
        '<div class="panel code">' +
            '<div class="ui-layout-north panel-list code">' + 
                '<div id="paper-code-output" class="paper code shadow"></div>' + 
            '</div>' +
            '<div class="ui-layout-center panel-list code">' + 
                '<div id="paper-code-state" class="paper code shadow"></div>' +
            '</div>' +
        '</div>'
    ),
        
    initialize: function (attributes, options) {
                
        var element = this.el,
            root = $(options.root),
            workspace = options.model,
            papers = {};

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

        papers.output = $(element.find('#paper-code-output'));
        papers.state = $(element.find('#paper-code-state'));

        $(element.find('.panel-list'))
            .css({
                width: '100%'
            });

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
        state = $.toJSON(workspace.save());

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