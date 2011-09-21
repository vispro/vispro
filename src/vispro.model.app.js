vispro.model.App = Backbone.Model.extend({

    initialize: function (attributes, options) {
        
        this.workspace = new vispro.model.Workspace();
        this.parser = new vispro.parser.XML();
        
        return this;
    },

    create: function (url, state) {
        
        var parser = this.parser;

        this.url = url;

        function onSuccess (xml) {
            
            parser.parse(xml, function (descriptor) {
                this.load(descriptor, state);
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

    remode: function (mode) {
        
        this.workspace.remode(mode);

        return this;
    },

    restore_from_string: function (state_str) {
        var state;

        try {
            state = $.secureEvalJSON(state_str);
        } catch (error) {
            alert("Stato non valido.");
            throw error;
        }

        this.restore(state);

        return this;
    },

    save_to_string: function () {
        return $.toJSON(this.save());  
    },

    restore: function (state) {

        this.unload();
        this.create(state.url, state.app);

        return this;
    },

    save: function () {
        
        var state = {};

        state.app = this.workspace.save();
        state.url = this.url;

        return state;
    },

    load: function (descriptor, state) {
        
        this.workspace.load(descriptor, state);

        return this;
    },

    unload: function () {

        this.workspace.unload();  
    },

    close: function () {
        
        window.location.reload();
    }

});