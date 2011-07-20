vispro.view.Label = Backbone.View.extend({

    init: function (options) {
                
        var model = options.model,
            element = $(this.el),
            template = this.template,
            label = $('<span class="label"></span>'),
            button = $('<span class="label button">x</span>');

        element
            .addClass('label')
            .append(label)
            .append(button);

        model
            .bind('selected', _.bind(this.select, this))
            .bind('change_id', _.bind(this.render, this))
            .bind('remove', _.bind(this.remove, this));

        this.model = model;
        this.element = element;
        this.label = label;
        this.button = button;

        return this;
    },

    render: function () {
        
        this.label.text(this.model.id);

        return this;
    },

    remove: function () {
        
        this.element.remove();

    },

    select: function (model, selected) {

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

        var target = $(event.target);

        if (target.hasClass('button')) {
            this.model.destroy();
        }
        else {
            this.model.select();
        }
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