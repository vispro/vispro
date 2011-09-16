vispro.model.App = Backbone.Model.extend({

    initialize: function (attributes, options) {
        
        this.workspace = new vispro.model.Workspace();
        this.parser = new vispro.parser.XML();
        
        return this;
    },

    create: function (url) {
        
        var parser = this.parser;

        function onSuccess (xml) {
            
            parser.parse(xml, function (state) {
                this.restore(state);
            }, this);
        }

        function onFailure (error) {

            console.error(error);
        }

        $.ajax({
            url: url,
            context: this,
            dataType: 'xml',
            success: onSuccess,
            failure: onFailure
        });

        return this;
    },

    restate: function (state) {
        
        this.workspace.restate(state);

        return this;
    },

    restore: function (state) {
        
        this.workspace.restore(state);

        return this;
    },

    save: function () {
        
        var state;

        state = this.workspace.save();

        return state;
    },

    close: function () {
        
        window.location.reload();
    }

});