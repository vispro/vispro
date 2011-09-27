vispro.view.App = Backbone.View.extend({

    el: $(
        'body'
    ),

    template: _.template(
        '<div id="panel-north" class="ui-layout-north"></div> \n' +

        '<div id="panel-west" class="panel ui-layout-west"></div> \n' + 

        '<div id="panel-center" class="ui-layout-center"> \n' +
        '    <div id="panel-center-north" class="ui-layout-north"></div> \n' +
        '    <div id="panel-center-center" class="ui-layout-center"></div> \n' +
        '</div> \n' +

        '<div id="panel-east" class="ui-layout-east"> \n' + 
        '    <div id="panel-east-north" class="panel ui-layout-north"></div> \n' + 
        '    <div id="panel-east-center" class="panel ui-layout-center"></div> \n' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            template = this.template,
            model = options.model,
            workspace = model.workspace,
            views = {},
            layouts = {},
            panels = {};
        
        element
            .html(template());
        
        panels.north = element.find('#panel-north');
        panels.west = element.find('#panel-west');
        panels.center = element.find('#panel-center');
        panels.center_north = element.find('#panel-center-north');
        panels.center_center = element.find('#panel-center-center');
        panels.east = element.find('#panel-east');
        panels.east_north = element.find('#panel-east-north');
        panels.east_center = element.find('#panel-east-center');

        layouts.app = element.layout({ 
                north__size: 70,
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 5,
                west__resizable: false,
                west__spacing_open: 5,
                west__spacing_closed: 0,
                west__togglerLength_open: 0,
                west__togglerLength_close: 0,
                east__resizable: false,
                east__spacing_open: 5,
                east__spacing_closed: 0,
                east__togglerLength_open: 0,
                east__togglerLength_close: 0,
                fxSpeed: 1
            });

        layouts.east = panels.east.layout({
                north__size: .4,
                north__resizable: false,
                north__closable: false, 
                north__spacing_open: 0,
                north__spacing_closed: 0,
                north__togglerLength_open: 0,
                north__togglerLength_close: 0,
                fxSpeed: 1
        });
        
        layouts.center = panels.center.layout({
                north__size: 35,
                north__resizable: false,
                north__spacing_open: 0,
                north__spacing_closed: 0,
                north__togglerLength_open: 0,
                north__togglerLength_close: 0,
                fxSpeed: 1
            });
        
        $.fx.off = true;

        views.appBar = new vispro.view.AppBar({}, {
            workspace: workspace,
            root: panels.north
        });

        views.descriptorList = new vispro.view.DescriptorList({}, { 
            model: workspace,
            root: panels.west
        });
        
        views.perspectiveBar = new vispro.view.PerspectiveBar({}, { 
            model: workspace,
            root: panels.north
        });

        views.toolbar = new vispro.view.ToolBar({}, {
            model: workspace,
            root: panels.center_north
        });

        views.workspace = new vispro.view.Workspace({}, { 
            model: workspace,
            root: panels.center_center
        });

        views.linkerLayer = new vispro.view.WidgetLinkerLayer({}, { 
            model: workspace,
            root: panels.center_center
        });
        
        views.code = new vispro.view.Code({}, { 
            model: workspace,
            root: panels.center
        });

        views.browserList = new vispro.view.BrowserList({}, { 
            model: workspace,
            root: panels.east_north
        });

        views.inspectorList = new vispro.view.InspectorList({}, { 
            model: workspace,
            root: panels.east_center
        });

        $.beautyOfCode.init({
            brushes: ['Xml', 'JScript', 'Plain', 'Css']
        });

        workspace
            .bind('remode', this.remode, this);

        this.views = views;
        this.layouts = layouts;
        this.panels = panels;
        this.model = model;

        return this;
    },

    remode: function (mode) {
        
        var layouts = this.layouts,
            views = this.views;

        if (mode === 'view') {
            
            views.workspace.show().enable();
            views.descriptorList.enable();
            views.toolbar.enable();
            views.code.hide();

            layouts.app.open('west');
            layouts.app.open('east');
            layouts.center.open('north');

            return;
        }

        if (mode === 'link') {

            views.workspace.show().disable();
            views.descriptorList.disable();
            views.toolbar.disable();
            views.code.hide();

            layouts.app.open('west');
            layouts.app.open('east');
            layouts.center.open('north');
            
            return;
        }

        if (mode === 'code') {

            views.workspace.hide();
            views.code.show();

            layouts.app.close('west');
            layouts.app.close('east');
            layouts.center.close('north');

            return;
        }
    }

});