vispro.view.Descriptor = Backbone.View.extend({

    tagName: 'div',

    className: 'panel-item descriptor',

    template: _.template(
        '<div class="descriptor-label"><%= name %></div>' +
        '<img class="descriptor-image" src="<%= src %>" alt="<%= alt %>"' +
        '        style="width:<%= width %>px; height:<%= height %>px" />'
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
            i_width = +dimensions.width.value,
            i_height = +dimensions.height.value,
            aspect = i_width / i_height,
            min = Math.min,
            m_width = 150,
            m_height = 75,
            width,
            height;        

        function draggable () {
            return helper.appendTo('body');
        }

        if (aspect > 1) {
            width = min(i_width, m_width);
            height = width / aspect;
        }
        // else {
        //     height = min(i_height, m_height);
        //     width = height * aspect;
        // }

        helper
            .html(template_helper({
                src: image,
                alt: name,
                width: i_width,
                height: i_height
            }));
            
        element
            .html(template({
                name: label,
                src: image,
                alt: name,
                width: width,
                height: height
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