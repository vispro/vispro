vispro.view.Buttonbar = Backbone.View.extend({

    templates: {
        button: _.template(
            '<button><%= label %></button>'
        )
    },

    init: function (options) {

        var element = $(this.el),
            root = options.root,
            model = options.model,
            template = this.templates.button,
            b_sendToBack = $(template({label: 's2B'})),
            b_sendBackward = $(template({label: 'sb'})),
            b_bringToFront = $(template({label: 'b2F'})),
            b_bringForward = $(template({label: 'bf'}));

        element
            .addClass('buttonbar')
            .appendTo(root)
            .append(b_sendToBack
                // .attr('data-type', 'sendToBack')
                _.bind('click', model.sendToBack, model)
                .button()
            )
            .append(b_sendBackward
                // .attr('data-type', 'sendBackward')
                _.bind('click', model.sendBackward, model)
                .button()
            )
            .append(b_bringToFront
                // .attr('data-type', 'bringToFront')
                _.bind('click', model.bringToFront, model)
                .button()
            )
            .append(b_bringForward
                // .attr('data-type', 'bringForward')
                _.bind('click', model.bringForward, model)
                .button()
            );

         model
            .bind('selected', _.bind(this.select, this))
            .bind('remove', _.bind(this.remove, this));

        return this;
    },

    render: function () {
        
        return this;
    },

    select: function (selected) {
        
        var  element = $(this.el);

        if (selected) {
            element.show();
        }
        else {
            element.hide();
        }

        return this;
    }, 
    
    remove: function () {
        //...
    },

    // onClick: function (event) {

    //     console.log('sto a cliccà!');

    //     var target = $(event.target),
    //         type = target.attr('data-type'),
    //         model = this.model;

    //     console.log(target);
        
    //     if (type === 'sendToBack') {
    //         $.proxy(model.sendToBack, model);
    //     }

    //     if (type === 'sendBackward') {
    //         $.proxy(model.sendBackward, model);
    //     }

    //     if (type === 'bringToFront') {
    //         $.proxy(model.bringToFront, model);
    //     }

    //     if (type === 'bringForward') {
    //         $.proxy(model.bringForward, model);
    //     }
    // },
    
    
    // events: {
    //     click: 'onClick'
    // }  
    
});
