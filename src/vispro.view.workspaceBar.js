vispro.view.WorkspaceBar = Backbone.View.extend({

    el: $(
        '<div class="workspacebar">' + 
        '    <div class="workspacebar-item">' + 
        '        <span class="workspacebar-item-label">grid</span>' +
        '        <select class="workspacebar-item-input" data-name="grid">' + 
        '            <option value="15"> 15px </option>' +
        '            <option value="16"> 16px </option>' +
        '            <option value="17"> 17px </option>' +
        '            <option value="18"> 18px </option>' +
        '            <option value="19"> 19px </option>' +
        '            <option value="20"> 20px </option>' +
        '            <option value="21"> 21px </option>' +
        '            <option value="22"> 22px </option>' +
        '            <option value="23"> 23px </option>' +
        '            <option value="24"> 24px </option>' +
        '            <option value="25"> 25px </option>' +
        '        </select>' +
        '    </div>' +
        '    <div class="workspacebar-item">' +
        '        <span class="workspacebar-item-label">snap</span>' +
        '        <input type="checkbox" class="workspacebar-item-input" data-name="snap" />' +
        '    </div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            workspace = options.model,
            root = options.root;
        
        element.appendTo(root);

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

    events: {
        'click a': 'onClick'
    }
    
});