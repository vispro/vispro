vispro.model.WidgetList = Backbone.Collection.extend({
    
    localStorage: new Store("vispro.model.WidgetList"),
    
    model: vispro.model.Widget,

    getByCid: function (cid) {
        
        var result;

        result = this.detect(function (widget) {
            return widget.cid === cid;
        });

        return result;
    },

    getById: function (id) {
        
        var result;

        result = this.detect(function (widget) {
            return widget.id === id;
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
            return _.indexOf(sorted, widget) == -1;
        })) {

            this
                .chain()
                .filter(function (widget) {
                    return _.indexOf(sorted, widget) == -1;
                })
                .filter(function (widget) {
                    return _.all(widget.getLinkList(), function (link) {
                        return _.indexOf(sorted, link) >= 0;
                    });
                })
                .each(function (widget) {
                    sorted.push(widget);
                });
        }

        return sorted;
    },

    overlap: function () {
        
        this.each(function (widget) {
            widget.overlapped = widget.isOverlapped();
            widget.trigger('overlapped', widget.overlapped);
        });
        
        return this;
    },

    save: function () {

        var states = [],
            sortedWidget = this.sortByLinks();
            
        _(sortedWidget).each(function (widget) {
            var state = widget.save();
            states.push(state);
        });

        return states;
    },

    restore: function (widgetList_list) {
        
        // _(state).each(function (widget_state) {
        //     var widget = this.add({});
        //     widget.restore(widget_state);
        // });
    }
    
});