vispro.model.WidgetList = Backbone.Collection.extend({
    
    localStorage: new Store("vispro.model.WidgetList"),
    
    model: vispro.model.Widget,

    getByType: function (type) {

    	var list = this.filter(function (widget) {
            return widget.name === type;
        });

        return list;
    }
    
});