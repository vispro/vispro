vispro.view.Code = Backbone.View.extend({
    
    init: function (options) {
                
        var element = $(this.el),
            code = $('<pre>'),
            model = options.model;
        
        code
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

        return this;
    },
    
    render: function () {
        
        var code = this.code;
            model = this.model,
            source = model.compile();

        code
            .text(source);

        return this;
    },

    show: function () {
        
        this.render();
        $(this.el).show();
    },

    hide: function () {
        
        $(this.el).hide();
    }

});