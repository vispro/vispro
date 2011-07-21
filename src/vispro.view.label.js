vispro.view.Label = Backbone.View.extend({

    init: function (options) {
                
        var model = options.model,
            element = $(this.el),
            template = this.template;

        element
            .addClass('label');

        model
            .bind('selected', _.bind(this.select, this))
            .bind('change_id', _.bind(this.render, this))
            .bind('remove', _.bind(this.remove, this));

        this.model = model;
        this.element = element;

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