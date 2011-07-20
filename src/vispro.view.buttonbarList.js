vispro.view.ButtonbarList = Backbone.View.extend({

    el: $(
        '<div id="buttonbarList"></div>'
    ),

    init: function (options) {

        var element = this.el,
            model = options.model,
            root = options.root;

        element
            .cover()
            .appendTo(root);
                
        model
            .bind('add', _.bind(this.add, this));
                
        this.element = element;

        return this;
    },
    
    add: function (widget) {
        
        var view = new vispro.view.Buttonbar();

        view
            .init({ 
                model: widget,
                root: this.el
             })
            .render();

        return this;
    },

    show: function () {
        
        this.render();
        $(this.el).show();

        return this;
    },

    hide: function () {
        
        $(this.el).hide();
        
        return this;
    },

    enable: function () {
                
        $(this.el).cover('disable');
        
        return this;
    },

    disable: function () {
        
        $(this.el).cover('enable');
        
        return this;
    }

});