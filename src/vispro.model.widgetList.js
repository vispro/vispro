vispro.model.WidgetList = Backbone.Collection.extend({
    
    localStorage: new Store("vispro.model.WidgetList"),
    
    model: vispro.model.Widget,

    getByType: function (type) {

        var list = this.filter(function (widget) {
            return widget.name === type;
        });

        return list;
    },

    sortByDeps: function () {
    
        var depsMap = {},
            sortedMap = {},
            widgetList = [],
            sortedWidgetList = [],
            sorted = false;
        
        this.each(function (widget) {
            depsMap[widget.id] = widget.getLinkedWidgetList();
            sortedMap[widget.id] = false;
        });

        while (this.any(function (widget) {
            return sortedMap[widget.id] === false;
        })) {
            
            widgetList = this.filter(function (widget) {
                return sortedMap[widget.id] === false;
            });

            _.each(widgetList, function (widget) {

                if (_.any(depsMap[widget.id], function (linkedWidget) {
                    return sortedMap[linkedWidget.id] === false;
                })) {
                    return;
                }

                sortedMap[widget.id] = true;
                sortedWidgetList.push(widget);
            });

        }

        return sortedWidgetList;
    }
    
});