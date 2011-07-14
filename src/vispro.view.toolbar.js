vispro.view.Toolbar = Backbone.View.extend({

    init: function (options) {

        var element = $(this.el),
            states = options.states;

        $.each(states, $.proxy(function (name, state) {

            var button = $('<input type="radio" id="state-'+name+'" name="radio_state"/><label for="state-'+name+'">'+name+'</label>');
            
            button.click(state);
            
            element.append(button);
                        
        }, this));

        element.buttonset();

        return this;
    },

    render: function () {
        
        return this;
    }
    
});
