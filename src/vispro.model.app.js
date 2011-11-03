/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.model.App = Backbone.Model.extend({

    initialize: function (attributes, options) {
        
        this.workspace = new vispro.model.Workspace();
        
        return this;
    },

    create: function (url) {
        
        this.workspace.create(url);

        return this;
    },

    load_from_string: function (state_string) {
        
        this.workspace.load_from_string(state_string);

        return this;
    }

});