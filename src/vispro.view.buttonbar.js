vispro.view.Buttonbar = Backbone.View.extend({

    templates: {

        positions: _.template(
            '<div class="buttonset">' + 
            '    <button class="action bottom">bottom</button>' + 
            '    <button class="action down">down</button>' + 
            '    <button class="action up">up</button>' + 
            '    <button class="action top">top</button>' + 
            '</div>'
        ),

        trash: _.template(
            '<button class="action trash">trash</button>'
        )
    },

    init: function (options) {

        var element = $(this.el),
            root = options.root,
            model = options.model,
            templates = this.templates,
            positions = $(templates.positions()).buttonset(),
            trash = $(templates.trash()).button({
                icons: {
                    primary: "ui-icon-trash"
                },
                text: false
            });


        element
            .addClass('buttonbar')
            .append(positions)
            .append(trash)
            .appendTo(root);

         model
            .bind('selected', _.bind(this.select, this))
            .bind('remove', _.bind(this.remove, this));

        this.element = element;
        this.model = model;

        return this;
    },

    render: function () {
        
        return this;
    },

    select: function (selected) {
        
        if (selected) {
            this.render().element.show();
        }
        else {
            this.element.hide();
        }

        return this;
    }, 
    
    remove: function () {

        this.element.remove();

    },

    onClickBottom: function (event) {

        this.model.sendToBack();
    },

    onClickDown: function (event) {
        
        this.model.sendBackward();
    },

    onClickUp: function (event) {
        
        this.model.bringForward();
    },

    onClickTop: function (event) {
        
        this.model.bringToFront();
    },

    onClickTrash: function (event) {
        
        var model = this.model;

        if (window.confirm ('Eliminare ' + model.label + ' ' + model.id + '?')) {
            
            model.destroy();
        }
        
    },
    
    events: {
        'click button.action.bottom': 'onClickBottom',
        'click button.action.down': 'onClickDown',
        'click button.action.up': 'onClickUp',
        'click button.action.top': 'onClickTop',
        'click button.action.trash': 'onClickTrash'
    }  
    
});
