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
        toolbar: new vispro.view.Toolbar(),
        userbar: new vispro.view.Userbar()
    },

    init: function (options) {
        
        var element = this.el,
            panels = this.panels,
            models = this.models,
            views = this.views,
            states = this.states,
            data = this.data;
        
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
        
        views.userbar
            .init({})
            .element
                .appendTo(panels.north);

        views.toolbar
            .init({
                states: {
                    normal: _.bind(this.normal, this),
                    link: _.bind(this.link, this),
                    code: _.bind(this.code, this)
                }
            })
            .element
                .appendTo(panels.north);
                    
        this.normal();

        models.workspace.select();

        $.beautyOfCode.init({
            brushes: ['Xml', 'JScript', 'CSharp', 'Plain', 'Php', 'Css']
        });

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
                
        return this;
    },

    load: function (descriptorList) {
        
        this.models.descriptorList.addAll(descriptorList);

        return this;
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