vispro.view.Label = Backbone.View.extend({
    
    template: _.template(
        '<span class="label-label"><%= id %></span>' + 
        '<span class="label-button">x</span>'
    ),

    init: function (options) {
                
        var model = options.model,
            element = $(this.el),
            template = this.template,
            label = $('<span class="label label">'),
            button = $('<span class="label button">x</span>');

        element
            .addClass('label')
            .append(label)
            .append(button);
        
        console.log(element, label, button);

        model
            .bind('selected', _.bind(this.select, this))
            .bind('change:id', _.bind(this.render, this))
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

        delete this;
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

    onMouseover: function (event) {
        
        this.element.addClass('over');
    },

    onMouseout: function (event) {
    
        this.element.removeClass('over'); 
    },

    events: {
        click: 'onClick',
        mouseover: 'onMouseover',
        mouseout: 'onMouseout'
    }

});