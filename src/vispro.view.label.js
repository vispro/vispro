vispro.view.Label = Backbone.View.extend({
    
    init: function (options) {
                
        var model = options.model,
            element = $(this.el);
        
        element
            .addClass('label')
            .text(model.id);

        model
            .bind('selected', _.bind(this.select, this))
            .bind('change:id', _.bind(this.render, this))
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

        this.model.select();
    },

    onDoubleclick: function (event) {
        
        event.stopPropagation();

        this.model.destroy();  
    },

    onMouseover: function (event) {
        
        this.element.addClass('over');
    },

    onMouseout: function (event) {
    
        this.element.removeClass('over'); 
    },

    events: {
        click: 'onClick',
        dblclick: 'onDoubleclick',
        mouseover: 'onMouseover',
        mouseout: 'onMouseout'
    }

});