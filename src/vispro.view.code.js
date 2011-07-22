vispro.view.Code = Backbone.View.extend({

    el: $('<div class="panel"></div>'),
    
    init: function (options) {
                
        var element = this.el,
            code = $('<code>'),
            model = options.model;
        
        code
            .addClass('JScript')
            .css({
                position: 'absolute'
            });

        element
            .css({
                position: 'absolute',
                width: '100%',
                height: '100%'
            })
            .append(code);

        this.model = model;
        this.code = code;
        this.element = element;

        return this;
    },
    
    render: function () {
        
        var el = $(this.el),
            code = this.code,
            model = this.model,
            source = '';
        
        vispro.logger.clear();
        
        if (model.isValid() === true) {
            source = model.compile();
        }
        else {
            source = vispro.logger.print();
        }

        el.empty();

        code = $('<code>');
        code
            .addClass('JScript')
            .css({
                position: 'absolute'
            })
            .appendTo(el)
            .text(source)
            .beautifyCode('javascript');

        return this;
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();

        return this;
    }
});