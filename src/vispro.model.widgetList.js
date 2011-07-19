vispro.model.WidgetList = Backbone.Collection.extend({
    
    localStorage: new Store("vispro.model.WidgetList"),
    
    model: vispro.model.Widget,

    getById: function (id) {
        
        var result;

        result = this.detect(function (widget) {
            return widget.attributes.id === id;
        });

        return result;
    },

    getByType: function (type) {

        var list = [];
        
        list = this.filter(function (widget) {
            return widget.type === type;
        });

        return list;
    },

    getByZIndex: function (zIndex) {

        var list = [];
        
        list = this.filter(function (widget) {
            return widget.zIndex === zIndex;
        });

        return list[0];
    },

    sortByLinks: function () {
    
        var sorted = [];
        
        while (this.any(function (widget) {
            return sorted.indexOf(widget) == -1;
        })) {

            this
                .chain()
                .filter(function (widget) {
                    return sorted.indexOf(widget) == -1;
                })
                .filter(function (widget) {
                    return _.all(widget.getLinkList(), function (link) {
                        return sorted.indexOf(link) >= 0;
                    });
                })
                .each(function (widget) {
                    sorted.push(widget);
                });
        }

        return sorted;
    },

    sortByZIndex: function () {
    
        var unsorted = [];
        
        this.each(function (widget){
            unsorted.push(widget);
        });

        return unsorted.sort(function (widget_a, widget_b) {
            return widget_a.zIndex - widget_b.zIndex;
        });
    },

    overlap: function () {
        
        this.each(function (widget) {
            widget.overlapped = widget.isOverlapped();
            widget.trigger('overlapped', widget.overlapped);
        });
        
        return this;
    },

    save: function () {
        var state = [];

        _.each(this.sortByLinks(), function (widget) {
            state.push(widget.save());
        });

        return state;
    }
    
});














