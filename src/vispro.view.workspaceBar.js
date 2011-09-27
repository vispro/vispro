vispro.view.WorkspaceBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'workspacebar',

    template: _.template(
        '<li class="workspacebar-item">' + 
        '    <span class="workspacebar-item-label">grid</span>' +
        '    <select class="workspacebar-item-input" data-name="grid">' + 
        '        <option value="15">15 px</option>' +
        '        <option value="16">16 px</option>' +
        '        <option value="17">17 px</option>' +
        '        <option value="18">18 px</option>' +
        '        <option value="19">19 px</option>' +
        '        <option value="20">20 px</option>' +
        '        <option value="21">21 px</option>' +
        '        <option value="22">22 px</option>' +
        '        <option value="23">23 px</option>' +
        '        <option value="24">24 px</option>' +
        '        <option value="25">25 px</option>' +
        '    </select>' +
        '</li>' +
        '<li class="workspacebar-item">' +
        '    <span class="workspacebar-item-label">snap</span>' +
        '    <input type="checkbox" class="workspacebar-item-input" data-name="snap" />' +
        '</li>'
    ),

    initialize: function (attributes, options) {

        var element = $(this.el),
            template = this.template,
            workspace = options.model,
            root = options.root;
        
        element
            .html(template())
            .appendTo(root);

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

        var target = $(event.target),
            state = target.attr('data-state');
    },

    onGrid: function (event, ui) {
        
        var workspace = this.workspace,
            target = $(event.target),
            option = $(target.find('option:selected')),
            value = option.val();
        
        workspace.regrid(value);

        return this;
    },

    onSnap: function (event, ui) {
        
        var workspace = this.workspace,
            target = $(event.target),
            value = target.is(':checked');
        
        workspace.resnap(value);

        return this;
    },

    events: {
        'click a': 'onClick',
        'change select[data-name="grid"]': 'onGrid',
        'change input[data-name="snap"]': 'onSnap'
    }
    
});