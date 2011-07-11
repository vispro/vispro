vispro.model.WidgetList = Backbone.Collection.extend({
    
    localStorage: new Store("vispro.model.WidgetList"),
    
    model: vispro.model.Widget,

    getById: function (id) {
        
        var result = this.detect(function (widget) {
            return widget.attributes.id === id;
        });

        return result;
    },

    getByType: function (type) {

        var list = this.filter(function (widget) {
            return widget.type === type;
        });

        return list;
    },

    sortByLinks: function () {
    
        var models = this.models,
            widget2links = {},
            widget2sort = {},
            result = [];
        
        _.each(models, function (widget) {
            widget2links[widget.id] = widget.getLinkList();
            widget2sort[widget.id] = false;
        });

        while (!_.isEmpty(widget2sort)) {

            _.chain(widget2sort)
                .filter(function (id, widget) { 
                    return _.any(widget2link[id], function (link) {
                        return link.id in widget2sort;
                    })
                })
                .each(function (id, widget) {
                    result.push(widget);
                    delete widget2sort[id];
                });
        }

        return result;
    }
    
});