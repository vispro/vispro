vispro.view.Toolbar = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            states = options.states;

        $.each(states, $.proxy(function (name, state) {
            var button = $('<button>');

            button
                .text(name)
                .click(state);

            element
                .append(button);
        }, this));

        return this;
    },

    render: function () {
        
    }
    
});
