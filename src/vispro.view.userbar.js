vispro.view.Userbar = Backbone.View.extend({

    el: $(
        '<div id="bar">' +
        '   <div id="userbar">' + 
        '       <ul>' +
        '           <li class="userbar-item"><a><span>Vispro</span></a></li>' + 
        '           <li class="userbar-item"><a><span>Help</span></a></li>' +
        '       </ul>' +
        '       <ul id="loginbar">' +
        '           <li class="userbar-item"><a><span id="span_login" data-type="login" class="logel">Login</span></a></li>' +
        '           <li class="userbar-item"><a><span id="span_logout" data-type="logout" class="logel">Logout</span></a></li>' +
        '       </ul>' +
        '   </div>' +
        '   <div id="controlbar">' + 
        '       <span id="logo">VisPro</span>' +
        '       <div id="bar_slot"></div>' + 
        '   </div>' +
        '</div>'
    ),

    init: function (options) {

        var element = this.el,
            root = options.root;
            span_login = element.find('#span_login'),
            span_logout = element.find('#span_logout');

        root.append(element);
        
        this.element = element;

        span_logout.hide(); 

        this.span_logout = span_logout;
        this.span_login = span_login;

        return this;
    },

    initBars: function(options) {
        var toolbar = new vispro.view.Toolbar(),
            buttonbarList = new vispro.view.ButtonbarList(),
            element = this.element,
            bar_slot = element.find('#bar_slot');

        

        toolbar
            .init({
                states: options.states,
                root: bar_slot
            });

        buttonbarList
            .init({
                model: options.widgetList,
                root: bar_slot
            });

        this.toolbar = toolbar;
        this.buttonbarList = buttonbarList;

        return this;
    },    

    render: function () {
        
        return this;
    },

    login: function () {
        this.span_logout.show();
        this.span_login.hide();
        vispro.load();

        return this;
    },

    logout: function () {
        this.span_logout.hide();
        this.span_login.show();
        vispro.unload();

        return this;
    },

    onClick: function (event) {
        var target = $(event.target),
            type = target.attr('data-type');
        
        if (type === 'login') {
            this.login();
        }

        if (type === 'logout') {
            this.logout();
        }

    },

    enable: function () {
                
        this.buttonbarList.show();
        
        return this;
    },

    disable: function () {
        
        this.buttonbarList.hide();
        
        return this;
    },

    events: {
        click: 'onClick'
    }
    
});
