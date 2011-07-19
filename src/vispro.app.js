vispro.App = Backbone.View.extend({

    el: $(
        'body'
    ),

    panels: {
        north: $('#panel-north'),
        west: $('#panel-west'),
        center: $('#panel-center'),
        east: $('#panel-east'),
        east_center: $('#panel-east-center'),
        east_south: $('#panel-east-south')
    },

    models: {
        descriptorList: new vispro.model.DescriptorList(),
        workspace: new vispro.model.Workspace()
    },

    views: {
        descriptorList: new vispro.view.DescriptorList(),
        workspace: new vispro.view.Workspace(),
        link: new vispro.view.WidgetLinkerLayer(),
        code: new vispro.view.Code(),
        labelList: new vispro.view.LabelList(),
        inspectorList: new vispro.view.InspectorList(),
        userbar: new vispro.view.Userbar()
    },

    init: function (options) {
        var element = this.el,
            views = this.views,
            panels = this.panels;
        
        views.userbar
            .init({root: panels.north});

        element
            .layout({ 
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 0,
                west__spacing_open: 0,
                east__spacing_open: 0
            });
        
        panels.east
            .layout({
                south__size: .6,
                south__spacing_open: 2
            });

        panels.west.hide();
        panels.center.hide();
        panels.east.hide();


        $.beautyOfCode.init({
            brushes: ['Xml', 'JScript', 'Plain', 'Css']
        });
    },

    load: function (parsed_obj) {
        var element = this.el,
            panels = this.panels,
            models = this.models,
            views = this.views,
            states = this.states,
            workspace = models.workspace,
            widgetList = workspace.widgetList;

        views.userbar
            .initBars({
                workspace: workspace,
                widgetList: widgetList,
                states: {
                    normal: _.bind(this.normal, this),
                    link: _.bind(this.link, this),
                    code: _.bind(this.code, this)
                }    
            });

        views.descriptorList
            .init({ model: models.descriptorList })
            .element
                .appendTo(panels.west);

        views.workspace
            .init({ model: models.workspace })
            .element
                .appendTo(panels.center);
        
        views.link
            .init({ model: models.workspace })
            .element
                .appendTo(panels.center);

        views.code
            .init({ model: models.workspace })
            .element
                .appendTo(panels.center);
        
        views.labelList
            .init({ model: models.workspace })
            .element
                .appendTo(panels.east_center);

        views.inspectorList
            .init({ model: models.workspace })
            .element
                .appendTo(panels.east_south);


        models.descriptorList
            .addAll(parsed_obj.descriptors);

        models.workspace
            .setTemplate(parsed_obj.template);
                    
        this.normal();

        models.workspace.select();

        panels.west.show();
        panels.center.show();
        panels.east.show();
                
        return this;
    },

    unload: function () {
        panels.west.hide();
        panels.center.hide();
        panels.east.hide();
    },

    normal: function () {
        
        var views = this.views;

        views.descriptorList.enable();
        views.workspace.enable();
        views.labelList.enable();
        views.inspectorList.enable();

        views.link.hide();
        views.workspace.show();
        views.code.hide();
    },

    link: function () {
        
        var views = this.views;

        views.descriptorList.disable();
        views.workspace.disable();
        views.labelList.disable();
        views.inspectorList.disable();

        views.link.show();
        views.workspace.show();
        views.code.hide();
    },

    code: function () {
        
        var views = this.views;

        views.descriptorList.disable();
        views.workspace.disable();
        views.labelList.disable();
        views.inspectorList.disable();
        
        views.link.hide();
        views.workspace.hide();
        views.code.show();
    },

    states: {
        normal: 'normal',
        link: 'link',
        code: 'code'
    }

});