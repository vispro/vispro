vispro.view.Browser = Backbone.View.extend({

    tagName: 'div',

    className: 'widget-browser',

    initialize: function (attributes, options) {
                
        var model = options.model,
            root = options.root,
            element = $(this.el);

        element
            .text(model.id)
            .appendTo(root);

        model
            .bind('selected', this.select, this)
            .bind('change_id', this.render, this)
            .bind('remove', this.remove, this);

        this.model = model;
        this.element = element;
        this.root = root;

        return this;
    },

    appendTo: function (root) {
        
        this.render().element.appendTo(root);

        return this;
    },

    render: function () {
        
        this.element.text(this.model.id);

        return this;
    },

    remove: function () {
        
        this.element.remove();

    },

    select: function (selected) {

        if (selected) {
            this.element.addClass('selected');
        }
        else {
            this.element.removeClass('selected');
        }
        
        return this;
    },

    onClick: function (event) {

        event.stopPropagation();

        this.model.select();
    },

    onMouseenter: function (event) {

        this.element.addClass('over');
    },

    onMouseleave: function (event) {
    
        this.element.removeClass('over'); 
    },

    events: {
        click: 'onClick',
        mouseenter: 'onMouseenter',
        mouseleave: 'onMouseleave'
    }

});