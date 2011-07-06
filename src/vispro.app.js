vispro.App = Backbone.View.extend({

    el: $('body'),

    models: {
        descriptorList: new vispro.model.DescriptorList(),
        workspace: new vispro.model.Workspace()
    },

    views: {
        descriptorList: new vispro.view.DescriptorList({
            el: $('#descriptorList')
        }),
        workspace: new vispro.view.Workspace({
            el: $('#paper')
        }),
        link: new vispro.view.WidgetLinkerLayer({
            el: $('#link')
        }),
        code: new vispro.view.Code({
            el: $('#code') 
        }),
        labelList: new vispro.view.LabelList({
            el: $('#labelList')
        }),
        inspectorList: new vispro.view.InspectorList({
            el: $('#inspectorList')
        }),
        toolbar: new vispro.view.Toolbar({
            el: $('#viewbar')
        })
    },

    data: {
        descriptorList: vispro.data.descriptorList,
        workspace: vispro.data.workspace
    },

    init: function (options) {
        
        var element = $(this.el),
            models = this.models,
            views = this.views,
            states = this.states,
            data = this.data;

        models.descriptorList
            .init({
                collection: data.descriptorList
            });

        models.workspace
            .init({
                descriptor: data.workspace
            });
        
        views.descriptorList
            .init({
                model: models.descriptorList
            });

        views.workspace
            .init({
                model: models.workspace
            });
        
        views.link
            .init({
                model: models.workspace
            });

        views.labelList
            .init({
                model: models.workspace
            });

        views.inspectorList
            .init({
                model: models.workspace
            });

        views.code
            .init({
                model: models.workspace
            });
            
        views.toolbar
            .init({
                states: {
                    normal: $.proxy(this.normal, this),
                    link: $.proxy(this.link, this),
                    code: $.proxy(this.code, this)
                }
            });
        
        this.normal();

        models.workspace.select();

        $.beautyOfCode.init({
            brushes: ['Xml', 'JScript', 'CSharp', 'Plain', 'Php', 'Css']
        });

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