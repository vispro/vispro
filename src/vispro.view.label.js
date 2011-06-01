vispro.view.Label = Backbone.View.extend({
    
    init: function (options) {
                
        var element = $(this.el),
            model = options.model;
        
        element
            .addClass('label')
            .text(model.id);

        model
            .bind('change:selected', $.proxy(this.select, this))
            .bind('change:id', $.proxy(this.render, this))
            .bind('remove', $.proxy(this.remove, this));

        this.model = model;

        return this;
    },

    render: function () {
        
        $(this.el)
            .text(this.model.get('id'));

        return this;
    },

    remove: function () {
        
        $(this.el).remove();

        delete this;
    },

    select: function (model, selected) {

        if (selected) {
            $(this.el).addClass('selected');
        }
        else {
            $(this.el).removeClass('selected');
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
        
        $(this.el).addClass('over');
    },

    onMouseout: function (event) {
    
        $(this.el).removeClass('over'); 
    },

    events: {
        click: 'onClick',
        dblclick: 'onDoubleclick',
        mouseover: 'onMouseover',
        mouseout: 'onMouseout'
    }

});