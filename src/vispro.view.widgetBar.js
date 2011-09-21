vispro.view.WidgetBar = Backbone.View.extend({

    tagName: 'div',

    className: 'widget-bar',

    template: _.template(
        '<input type="button" class="widget-bar-item" data-action="send-back" value="--" />' + 
        '<input type="button" class="widget-bar-item" data-action="send-backward" value="-" />' + 
        '<input type="button" class="widget-bar-item" data-action="bring-forward" value="+" />' + 
        '<input type="button" class="widget-bar-item" data-action="bring-front" value="++" />' + 
        '<input type="button" class="widget-bar-item" data-action="delete" value="x" />'
    ),

    initialize: function (attributes, options) {

        var element = $(this.el),
            template = this.template,
            model = options.model;
        
        element
            .html(template());
        
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
        'click .widget-bar-item[data-action="send-back"]': 'onClickSendBack',
        'click .widget-bar-item[data-action="send-backward"]': 'onClickSendBackward',
        'click .widget-bar-item[data-action="bring-forward"]': 'onClickBringForward',
        'click .widget-bar-item[data-action="bring-front"]': 'onClickBringFront',
        'click .widget-bar-item[data-action="delete"]': 'onClickDelete'
    }
});