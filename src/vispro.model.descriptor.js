/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    initialize: function (attributes, options) {
        
        _.extend(this, options);

        return this;
    }

});