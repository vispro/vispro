vispro.view.Descriptor = Backbone.View.extend({

    templates: {
        element: _.template(
            '<span class="descriptor-label"><%= name %></span>' +
            '<img class="descriptor-image" src="<%= src %>" alt="<%= alt %>"' +
            ' style="width:<%= width %>px; height:<%= height %>px" />'
        ),
    
        helper: _.template(
            '<img class="descriptor-helper" src="<%= src %>" alt="<%= alt %>"' +
            ' style="width:<%= width %>px; height:<%= height %>px" />'
        )
    },

    initialize: function (attributes, options) {

        var model = options.model,
            templates = this.templates,
            element = $(this.el),
            helper = $('<div>'),            
            label = model.label,
            name = model.name,
            image = model.image.src,
            dimensions = model.dimensions,
            width = dimensions.width.value,
            height = dimensions.height.value,
            min = Math.min;

        function draggable () {
            return helper.appendTo('body');
        }

        helper
            .html(templates.helper({
                src: image,
                alt: name,
                width: width,
                height: height
            }))
            .css('z-index', 1000000);
                    
        element
            .addClass('descriptor')
            .html(templates.element({
                name: label,
                src: image,
                alt: name,
                width: min(+width, 100),
                height: min(+height, 80)
            }))
            .data('descriptor', model)
            .draggable({
                cursor: 'move',
                helper: draggable,
                cursorAt: {
                    top: 0,
                    left: 0
                }
            });

        this.element = element;
        this.model = model;

        return this;
    },

    appendTo: function (element) {
        
        this.element.appendTo(element);

        return this;
    },

    render: function () {
        
        return this;
    },

    onMouseenter: function () {
        
        this.element.addClass('over');
    },

    onMouseleave: function () {
        
        this.element.removeClass('over');
    },

    events: {
        mouseenter: 'onMouseenter',
        mouseleave: 'onMouseleave'
    }

});