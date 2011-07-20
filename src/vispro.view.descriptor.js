vispro.view.Descriptor = Backbone.View.extend({

    templates: {
        element: _.template(
            '<span class="descriptor-label"><%= name %></span>' +
            '<img class="descriptor-image" src="<%= src %>" alt="<%= alt %>" ' +
            '    style="width:<%= width %>px; height:<%= height %>px" />'
        ),
    
        helper: _.template(
            '<img class="descriptor-helper" src="<%= src %>" alt="<%= alt %>" ' +
            '    style="width:<%= width %>px; height:<%= height %>px" />'
        )
    },

    init: function (options) {

        var descriptor = options.descriptor,
            label = descriptor.label,
            name = descriptor.name,
            image = descriptor.image.src,
            dimensions = descriptor.dimensions,
            width = dimensions.width.value,
            height = dimensions.height.value,
            templates = this.templates,
            element = $(this.el),
            helper,
            img,
            min = Math.min;

        helper = $(templates.helper({
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
            .data('descriptor', descriptor)
            .draggable({
                cursor: 'move',
                helper: function () { 
                    return helper.appendTo('body'); 
                },
                cursorAt: {
                    top: 0,
                    left: 0
                }
            });

        this.element = element;

        return this;
    },

    appendTo: function (root) {
        
        root.append(this.element);

        return this;
    },

    render: function () {
        
        return this;
    },

    focus: function () {
        
        this.element.addClass('focus');
    },

    blur: function () {
        
        this.element.removeClass('focus');
    },

    events: {
        mouseenter: 'focus',
        mouseleave: 'blur'
    }

});