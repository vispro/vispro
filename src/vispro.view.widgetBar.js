vispro.view.WidgetBar = Backbone.View.extend({

    tagName: 'ul',

    className: 'toolbar widget',

    template: _.template(
        '<li class="toolbar-item widget">' +
            '<div class="toolbar-item-button widget" data-action="send-back" ' +
                'style="background-image: url(css/images/widget_move_back.png); ' + 
                    'background-repeat:no-repeat;"></div>' + 
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="send-backward" ' +
                'style="background-image: url(css/images/widget_move_backward.png);' + 
                    'background-repeat:no-repeat;"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="bring-forward" ' +
                'style="background-image: url(css/images/widget_move_forward.png);' + 
                    'background-repeat:no-repeat;"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="bring-front" ' +
                'style="background-image: url(css/images/widget_move_front.png);' + 
                    'background-repeat:no-repeat;"></div>' +
        '</li>' +
        '<li class="toolbar-item widget">' + 
            '<div class="toolbar-item-button widget" data-action="delete" ' +
                'style="background-image: url(css/images/widget_delete.png);' + 
                    'background-repeat:no-repeat;"></div>' +
        '</li>'
    ),

    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
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
        
        var model = this.model;

        if (window.confirm('Eliminare ' + model.label + ' ' + model.id + '?')) {
            model.destroy({});
        }
    },
    
    events: {
        'click .toolbar-item-button[data-action="send-back"]': 'onClickSendBack',
        'click .toolbar-item-button[data-action="send-backward"]': 'onClickSendBackward',
        'click .toolbar-item-button[data-action="bring-forward"]': 'onClickBringForward',
        'click .toolbar-item-button[data-action="bring-front"]': 'onClickBringFront',
        'click .toolbar-item-button[data-action="delete"]': 'onClickDelete'
    }
});