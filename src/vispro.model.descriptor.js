vispro.model.Descriptor = Backbone.Model.extend({
    
    localStorage: new Store("vispro.model.Descriptor"),

    // state_properties: [
    //     'dependencies', 
    //     'description', 
    //     'dimensions', 
    //     'icon',
    //     'image',
    //     'label',
    //     'name',
    //     'properties',
    //     'templates',
    //     'type'
    // ],

    initialize: function (attributes, options) {
        
        _.extend(this, options);

        return this;
    },

    // save: function () {

    //     var that = this,
    //         state = {};

    //     _(this.state_properties)
    //         .each(function(property) {
    //             state[property] = that[property] ;
    //         }, this);

    //     return state;
    // }

});