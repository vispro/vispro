vispro.view.Descriptor = Backbone.View.extend({

    tagName: 'div',

    className: 'descriptor',

    template: _.template(
        '<span class="descriptor-label"><%= name %></span>' +
        '<img class="descriptor-image" src="<%= src %>" alt="<%= alt %>"' +
        '     style="width:<%= width %>px; height:<%= height %>px" />'
    ),
    
    template_helper: _.template(
        '<img class="descriptor-helper" src="<%= src %>" alt="<%= alt %>"' +
        '    style="width:<%= width %>px; height:<%= height %>px; z-index:10000" />'
    ),

    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
            template = this.template,
            template_helper = this.template_helper,
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
            .html(template_helper({
                src: image,
                alt: name,
                width: width,
                height: height
            }));
            
        element
            .html(template({
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
                zIndex: 40000,
                cursorAt: {
                    top: 0,
                    left: 0
                }
            })
            .appendTo(root);
            
                
        model
            .bind('remove', this.remove, this);

        this.element = element;
        this.model = model;

        return this;
    },

    render: function () {
        
        return this;
    },

    remove: function () {
        
        this.element.remove();

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