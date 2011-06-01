vispro.view.Grid = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            canvas = $('<canvas>');
        
        // test per excanvas
        try {
            canvas.getContext('2d');
        } catch (e) {
            //canvas = G_vmlCanvasManager.initElement(grid_canvas);
        }
        
        canvas
            .attr({
                id: 'grid',
                width: model.get('width'), 
                height: model.get('height')
            })
            .css({
                position: 'absolute'
            });
        
        element
            .append(canvas);

        model
            .bind('change:width', $.proxy(this.render, this))
            .bind('change:height', $.proxy(this.render, this))
            .bind('change:grid', $.proxy(this.render, this))
            .bind('change:pointsize', $.proxy(this.render, this))
            .bind('change:color', $.proxy(this.render, this));

        this.model = model;
        this.canvas = canvas;
        this.context = canvas[0].getContext('2d');

        this.render();

        return this;
    },
    
    render: function () {
        
        var model = this.model,
            canvas = this.canvas,
            context = this.context,
            color = model.get('color'),
            dim = model.get('pointsize'),
            grid = +model.get('grid'),
            width = model.get('width'),
            height = model.get('height');
            
        canvas.attr({'width': width, 'height': height});
        
        context.clearRect(0, 0, width, height);
        context.fillStyle = color;
    
        for (var i = 0; i < height; i += grid) {
            for (var j = 0; j < width; j += grid) {
                context.fillRect(j, i, dim, dim);
            }
        }
        
        return this;
    },

    show: function () {
        
        $(this.el).show();
        return this;
    },

    hide: function () {
        
        $(this.el).hide();
        return this;
    }
});