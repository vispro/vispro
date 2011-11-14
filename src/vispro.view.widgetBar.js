/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.WidgetBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'toolbar widget',

    template: _.template(
        '<li class="toolbar-item widget">' +
            '<div class="toolbar-item-button widget" data-action="send-back" ' +
                'style="background-image: url(css/images/widget_move_back.png);"></div>' + 
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="send-backward" ' +
                'style="background-image: url(css/images/widget_move_backward.png);"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="bring-forward" ' +
                'style="background-image: url(css/images/widget_move_forward.png);"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="bring-front" ' +
                'style="background-image: url(css/images/widget_move_front.png);"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="delete" ' +
                'style="background-image: url(css/images/widget_delete.png);"></div>' +
        '</li>'
    ),

    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
            workspace = options.workspace,
            element = $(this.el),
            template = this.template;
        
        element
            .html(template())
            .appendTo(root);

        model
            .bind('selected', this.select, this)
            .bind('remove', this.remove, this);

        this.element = element;
        this.model = model;
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

    select: function (selected) {
                
        if (selected) {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    }, 
    
    remove: function () {

        this.element.remove();
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();
    },

    onClickSendBack: function (event) {

        this.model.sendToBack();
    },

    onClickSendBackward: function (event) {
        
        this.model.sendBackward();
    },

    onClickBringForward: function (event) {
        
        this.model.bringForward();
    },

    onClickBringFront: function (event) {
        
        this.model.bringToFront();
    },

    onClickDelete: function (event) {
        
        var model = this.model,
            workspace = this.workspace;

        if (window.confirm('Do you really want to remove ' + model.label + ' ' + model.id + '?')) {
            model.destroy({});
            workspace.overlap();
        }
    },

    onMouseenter: function (event) {
        
        var target = $(event.target);
        
        target.addClass('over');
    },

    onMouseout: function (event) {
        
        var target = $(event.target);

        target.removeClass('over');
    },
    
    events: {
        'click .toolbar-item-button[data-action="send-back"]': 'onClickSendBack',
        'click .toolbar-item-button[data-action="send-backward"]': 'onClickSendBackward',
        'click .toolbar-item-button[data-action="bring-forward"]': 'onClickBringForward',
        'click .toolbar-item-button[data-action="bring-front"]': 'onClickBringFront',
        'click .toolbar-item-button[data-action="delete"]': 'onClickDelete',
        'mouseenter .toolbar-item-button': 'onMouseenter',
        'mouseout .toolbar-item-button': 'onMouseout'
    }
});