vispro.view.Toolbar = Backbone.View.extend({

    el: $(
        '<div id="toolbar">' + 
        '   <span id="logo">VisPro</span>' +
        '   <div id="buttonset"></div>' + 
        '</div>'
    ),

    templates: {
        button: _.template(
            '<input type="radio" id="state-<%= name %>" name="radio_state"/>' + 
            '<label for="state-<%= name %>"><%= name %></label>'
        )
    },

    init: function (options) {

        var element = this.el,
            buttonset = element.find('#buttonset'),
            template = this.templates.button;

        _.each(options.states, function (state, name) {
            var button = $(template({ name: name }));
            button.click(state).appendTo(buttonset);
        }, this);

        buttonset.buttonset();

        this.element = element;

        return this;
    },

    render: function () {
        
        return this;
    }
    
});
