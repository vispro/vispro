vispro.view.WidgetLinkerLayer = Backbone.View.extend({

    el: $(
        '<div id="workspace-link">' + 
        '    <div id="workspace-layer-linker" style="position:absolute"></div>' + 
        '</div>'
    ),

    initialize: function (attributes, options) {
        
        var element = this.el,
            root = $(options.root),
            model = options.model,
            linkerList= [],
            layerLinks = Raphael(element[0], 0, 0),
            layerLinkers = element.find('#workspace-layer-linker'),
            canvas = $(layerLinks.canvas);
        
        element
            .appendTo(root);
        
        model.
            bind('remode', this.remode, this);

        canvas
            .attr({ id: 'workspace-layer-link' })
            .css({ 
                position: 'absolute', 
                'z-index': '2001'
            });
        
        this.model = model;
        this.linkerList = linkerList;
        this.layerLinks = layerLinks;
        this.layerLinkers = layerLinkers;
        this.tempLink = layerLinks.path('');
        this.element = element;

        this.render();
        
        return this;
    },
    
    render: function () {
        
        var element = $(this.el),
            layerLinks = this.layerLinks,
            layerLinkers = this.layerLinkers,
            model = this.model,
            dimensions = model.dimensions,
            width = dimensions.width,
            height = dimensions.height,
            widgetList = model.widgetList;

        layerLinks
            .setSize(width, height)
            .clear();
        
        this.tempLink = layerLinks.path('');
        
        layerLinkers.empty();
            
        widgetList.each(function (widget) {

            var linkedWidgetList = widget.getLinkList();

            this.createLinker(widget);
            _(linkedWidgetList).each(function (linkedWidget) {
                this.createLink(widget, linkedWidget);
            }, this);
        }, this);

        return this;
    },

    remode: function (mode) {
        
        if (mode === 'link') {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();
        
        return this;
    },

    createLinker: function (widget) {
        
        var layerLinks = this.layerLinks,
            linkerList = this.linkerList,
            layerLinkers = this.layerLinkers,
            linker = new vispro.view.WidgetLinker({}, {
                container: this,
                model: widget //,
                //root: layerLinkers
            });
        
        linkerList.push(linker);

        linker
            .render();

        layerLinkers
            .append(linker.el);
        
        return this;
    },

    createLink: function (widgetFrom, widgetTo) {
        
        var layerLinks = this.layerLinks,
            positionFrom = widgetFrom.position,
            positionTo = widgetTo.position,
            dimensionsFrom = widgetFrom.dimensions,
            dimensionsTo = widgetTo.dimensions,
            from = {
                left: positionFrom.left + dimensionsFrom.width / 2,
                top: positionFrom.top + dimensionsFrom.height / 2
            },
            to = {
                left: positionTo.left + dimensionsTo.width / 2,
                top: positionTo.top + dimensionsTo.height / 2
            },
            link = layerLinks.path(this.createLine(from, to)),
            arrow_path = this.createArrow(from, to),
            arrow = layerLinks.path(arrow_path),
            overlay_info = this.getOverlayInfo(from, to),
            overlay = layerLinks.circle(overlay_info.x, overlay_info.y, overlay_info.r),
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
                overlay.attr({opacity: 0.0});
                if (arrow.attr('path')) {
                    arrow.animate({ path: arrow_path }, 500, "bounce");
                }
            })
            .click(function () {
                widgetFrom.removeLink(widgetTo.type);
                arrow.attr({path: ''});
                link.attr({path: ''});
                arrow.remove();
                overlay.remove();
            });

        return this;
    },

    drawLink: function (from, to) {

        var layerLinks = this.layerLinks,
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

    getXPath: function (overlay_info) {
        var x = overlay_info.x,
            y = overlay_info.y,
            r = overlay_info.r - 5,
            math = Math,
            pi = math.PI,
            sin = math.sin,
            cos = math.cos,
            _PI_4 = pi/4,
            _3_PI_4 = 3*_PI_4,
            _5_PI_4 = 5*_PI_4,
            _7_PI_4 = 7*_PI_4,
            pp_x = x + r * cos(_PI_4),
            pp_y = y + r * sin(_PI_4),
            np_x = x + r * cos(_3_PI_4),
            np_y = y + r * sin(_3_PI_4),
            nn_x = x + r * cos(_5_PI_4),
            nn_y = y + r * sin(_5_PI_4),
            pn_x = x + r * cos(_7_PI_4),
            pn_y = y + r * sin(_7_PI_4);

        return " M" + pp_x + "," + pp_y + 
           " L" + nn_x + "," + nn_y +
           " M" + pn_x + "," + pn_y + 
           " L" + np_x + "," + np_y;
    },

    startLink: function (types) {
        
        _(this.linkerList)
            .each(function (linker) {
                linker.enable(types);
                }, this);

        return this;
    },

    stopLink: function () {
        
        _(this.linkerList)
            .each(function (linker) {
                linker.disable();
            }, this);

        return this;
    }
});