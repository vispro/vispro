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
            link = linkLayer.path(this.createLine(from, to)),
            arrow_path = this.createArrow(from, to),
            arrow = linkLayer.path(arrow_path),
            overlay_info = this.getOverlayInfo(from, to),
            overlay = linkLayer.circle(overlay_info.x, overlay_info.y, overlay_info.r),
            ics_path = this.getXPath(overlay_info);

        link
            .attr({
                'stroke-width': 3
            });
        arrow
            .attr({
                'stroke-width': 3,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'bevel'
            });
        overlay
            .attr({
                opacity: 0.0,
                'stroke-width': 2,
                fill: 'grey'
            })
            .mouseover(function () {
                arrow.attr({ 'stroke': 'red' });
                overlay.attr({ opacity: 0.3 });
                arrow.animate({ path: ics_path }, 500, "bounce");
            })
            .mouseout(function () {
                arrow.attr({ 'stroke': 'black' });
                overlay.attr({opacity: 0.0,});
                if (arrow.attr('path')) {
                    arrow.animate({ path: arrow_path }, 500, "bounce");
                }
            })
            .click(function () {
                widgetFrom.removeLink(widgetTo);
                arrow.attr({path: ''});
                link.attr({path: ''});
                arrow.remove();
                overlay.remove();
            });

        return this;
    },

    drawLink: function (from, to) {

        var linkLayer = this.linkLayer,
            path = this.createLine(from, to);

        this.tempLink
            .attr({
                'stroke-width': 3,
                path: path 
            });

        return this;
    },

    createArrow: function (from, to) {

        var startX = from.left,
            startY = from.top,
            endX = to.left,
            endY = to.top, 
            l = 10,
            m = (startY - endY) / (startX - endX),
            rep_m = -1 / m,
            alpha = Math.atan(m),
            beta = Math.atan(rep_m),
            alpha_m_90 = (endX > startX) ? 1 : -1,
            cos_alpha = alpha_m_90 * Math.cos(alpha),
            sin_alpha = alpha_m_90 * Math.sin(alpha),
            cos_beta = Math.cos(beta),
            sin_beta = Math.sin(beta),
            Mx = (endX + startX) / 2 + l/2 * cos_alpha,
            My = (endY + startY) / 2 + l/2 * sin_alpha,
            Hx = Mx - l * cos_alpha,
            Hy = My - l * sin_alpha,
            Ax = Hx - l * cos_beta,
            Ay = Hy - l * sin_beta,
            Bx = Hx + l * cos_beta,
            By = Hy + l * sin_beta;
        
        return " M" + Ax + "," + Ay + 
               " L" + Mx + "," + My +
               " M" + Bx + "," + By + 
               " L" + Mx + "," + My; 
    },

    createLine: function (from, to) {
        
        var startX = from.left,
            startY = from.top,
            endX = to.left,
            endY = to.top;
        
        return "M" + startX + "," + startY +
            "L" + endX + "," + endY;
    }, 

    getOverlayInfo: function (from, to) {
        var startX = from.left,
            startY = from.top,
            endX = to.left,
            endY = to.top,
            mx = (endX + startX) / 2,
            my = (endY + startY) / 2;

        return {x: mx, y: my, r: 15};
    },

    getXPath: function(overlay_info) {
        var x = overlay_info.x,
            y = overlay_info.y,
            r = overlay_info.r - 5,
            _PI_4 = Math.PI/4,
            _3_PI_4 = 3*Math.PI/4,
            _5_PI_4 = 5*Math.PI/4,
            _7_PI_4 = 7*Math.PI/4,
            pp_x = x + r * Math.cos(_PI_4),
            pp_y = y + r * Math.sin(_PI_4),
            np_x = x + r * Math.cos(_3_PI_4),
            np_y = y + r * Math.sin(_3_PI_4),
            nn_x = x + r * Math.cos(_5_PI_4),
            nn_y = y + r * Math.sin(_5_PI_4),
            pn_x = x + r * Math.cos(_7_PI_4),
            pn_y = y + r * Math.sin(_7_PI_4);

        return " M" + pp_x + "," + pp_y + 
           " L" + nn_x + "," + nn_y +
           " M" + pn_x + "," + pn_y + 
           " L" + np_x + "," + np_y;
    }




/*
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
            link = linkLayer.path(this.createPath(from, to)),
            overlay = linkLayer.path(this.createLine(from, to));

        link
            .attr({
                'stroke-width': 3,
                fill: 'green'
            });

        overlay
            .attr({
                'stroke-width': 10,
                opacity: 0
            })
            .mouseover(function () {
                overlay.attr({ opacity: .5 });
            })
            .mouseout(function () {
                overlay.attr({ opacity: 0 });
            })
            .dblclick(function () {
                widgetFrom.removeLink(widgetTo);
                overlay.attr({path: ''});
                link.attr({path: ''});
            });

        return this;
    },

    drawLink: function (from, to) {

        var linkLayer = this.linkLayer,
            path = this.createLine(from, to);

        this.tempLink
            .attr({
                'stroke-width': 3,
                path: path 
            });

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
    },

    createLine: function (from, to) {
        
        var startX = from.left,
            startY = from.top,
            endX = to.left,
            endY = to.top;
        
        return "M" + startX + "," + startY +
            "L" + endX + "," + endY;
    }
*/

});