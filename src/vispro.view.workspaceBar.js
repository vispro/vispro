/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.WorkspaceBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'toolbar workspace',

    template: _.template(
        '<li class="toolbar-item workspace">' + 
            '<div class="toolbar-item-label workspace">grid</div>' +
            '<select class="toolbar-item-input workspace" data-name="grid">' + 
                '<option value="15">15 px</option>' +
                '<option value="16">16 px</option>' +
                '<option value="17">17 px</option>' +
                '<option value="18">18 px</option>' +
                '<option value="19">19 px</option>' +
                '<option value="20">20 px</option>' +
                '<option value="21">21 px</option>' +
                '<option value="22">22 px</option>' +
                '<option value="23">23 px</option>' +
                '<option value="24">24 px</option>' +
                '<option value="25">25 px</option>' +
            '</select>' +
        '</li>' +
        '<li class="toolbar-item workspace">' +
            '<div class="toolbar-item-label workspace">snap</div>' +
            '<input type="checkbox" class="toolbar-item-input workspace" data-name="snap" ' +
            '   <%= (snap ? "checked" : "") %> />' +
        '</li>'
    ),

    initialize: function (attributes, options) {

        var element = $(this.el),
            template = this.template,
            workspace = options.model,
            root = options.root;
        
        element
            .html(template(workspace))
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

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();

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
        'change .toolbar-item-input[data-name="grid"]': 'onGrid',
        'change .toolbar-item-input[data-name="snap"]': 'onSnap'
    }
    
});