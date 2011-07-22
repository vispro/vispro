vispro.model.Log = Backbone.Model.extend({
    
    defaults: {
    	message: ''
    },

    initialize: function (attributes, options) {

    	_.defaults(this.attributes, this.defaults);

    	return this;
    }

});