vispro.view.DescriptorList = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            viewList = [];

        this.model = model;
        this.viewList = viewList;
        
        element
            .cover();
                
        model
            .each(function (item) {
                this.add(item);
            }, this);
        
        model
            .bind('add', $.proxy(this.add, this));

        return this;
    },

    add: function (descriptor) {

        var element = $(this.el),
            viewList = this.viewList,
            view = new vispro.view.Descriptor();

        view.init({ model: descriptor });
        element.append(view.el);
        viewList.push(view);

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
                
        $(this.el)
            .cover('disable');
        
        return this;
    },

    disable: function () {
        
        $(this.el)
            .cover('enable');
        
        return this;
    }
    
});