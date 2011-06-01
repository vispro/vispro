vispro.view.WidgetLinkerLayer = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            linkLayer = Raphael(element.get(0), 0, 0),
            canvas = $(linkLayer.canvas),
            linkerLayer = $('<div>');
        
        canvas
            .attr({
                id: 'linkLayer'
            })
            .css({
                position: 'absolute'
            });
        
        linkerLayer
            .attr({
                id: 'linkerLayer'
            })
            .css({
                position: 'absolute'
            });

        element
            .css({ 
                position: 'absolute' 
            })
            .append(linkerLayer);
        
        this.model = model;
        this.linkLayer = linkLayer;
        this.linkerLayer = linkerLayer;
        this.tempLink = linkLayer.path('');

        this.render();
        
        return this;
    },
    
    render: function () {
        
        var element = $(this.el),
            linkLayer = this.linkLayer,
            linkerLayer = this.linkerLayer,
            model = this.model,
            width = model.get('width'),
            height = model.get('height'),
            widgetList = model.widgetList; 

        linkLayer
            .setSize(width, height)
            .clear();
        
        this.tempLink = linkLayer.path('');
        
        linkerLayer
            .empty();
            
        widgetList.each(function (widget) {
            var linkedWidgetList = widget.getLinkedWidgetList();
            this.createLinker(widget);
            $.each(linkedWidgetList, $.proxy(function (i, linkedWidget) {
                this.createLink(widget, linkedWidget);
            }, this));
        }, this);

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

    createLinker: function (widget) {
        
        var linkLayer = this.linkLayer,
            linkerLayer = this.linkerLayer,
            linker = new vispro.view.WidgetLinker();
            
        linker
            .init({ 
                container: this,
                model: widget
            })
            .render();

        linkerLayer
            .append(linker.el);
        
        return this;
    },

    createLink: function (widgetFrom, widgetTo) {
        
        var linkLayer = this.linkLayer,
            from = {
                left: widgetFrom.get('left') + widgetFrom.get('width') / 2,
                top: widgetFrom.get('top') + widgetFrom.get('height') / 2
            },
            to = {
                left: widgetTo.get('left') + widgetTo.get('width') / 2,
                top: widgetTo.get('top') + widgetTo.get('height') / 2
            },
            path = this.createPath(from, to),
            link = linkLayer.path(path);
        
        link
            .mouseover(function () {
                console.log('mouseover');
            })
            .click(function () {
                console.log('click');
                widgetFrom.removeLink(widgetTo);
                link.attr({path: ''});
            });

        return this;
    },

    drawLink: function (from, to) {

        var linkLayer = this.linkLayer,
            path = this.createPath(from, to);

        this.tempLink.attr({ path: path });

        return this;
    },

    createPath: function (from, to) {

        var startX = from.left,
            startY = from.top,
            endX = to.left,
            endY = to.top, 
            l = 8,
            m = (startY - endY) / (startX - endX),
            rep_m = -1 / m,
            alpha = Math.atan(m),
            beta = Math.atan(rep_m),
            alpha_m_90 = (endX > startX) ? 1 : -1,
            cos_alpha = alpha_m_90 * Math.cos(alpha),
            sin_alpha = alpha_m_90 * Math.sin(alpha),
            cos_beta = Math.cos(beta),
            sin_beta = Math.sin(beta),
            Cx = endX - (8/2+1) * cos_alpha,
            Cy = endY - (8/2+1) * sin_alpha,
            Hx = Cx - l * cos_alpha,
            Hy = Cy - l * sin_alpha,
            Ax = Hx - l * cos_beta,
            Ay = Hy - l * sin_beta,
            Bx = Hx + l * cos_beta,
            By = Hy + l * sin_beta;
        
        return "M" + startX + "," + startY + 
              " L" + Hx + "," + Hy +
              " M" + Cx + "," + Cy + 
              " L" + endX + "," + endY +
              " M" + Ax + "," + Ay + 
              " L" + Cx + "," + Cy + 
              " L" + Bx + "," + By +
              " Z"; 
    }

});