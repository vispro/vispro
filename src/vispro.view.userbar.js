vispro.view.Userbar = Backbone.View.extend({

    el: $(
        '<div id="userbar">' + 
        '    <ul>' +
        '        <li class="userbar-item"><a><span>Vispro</span></a></li>' + 
        '        <li class="userbar-item"><a><span>Help</span></a></li>' +
        '    </ul>' +
        '    <ul id="loginbar">' +
        '        <li class="userbar-item"><a><span id="span_login" data-type="login" class="logel">Login</span></a></li>' +
        '        <li class="userbar-item"><a><span id="span_logout" data-type="logout" class="logel">Logout</span></a></li>' +
        '    </ul>' +
        '</div>'
    ),

    init: function (options) {

        var element = this.el,
            span_login = element.find('#span_login'),
            span_logout = element.find('#span_logout');

        this.element = element;

        span_logout.hide(); 

        this.span_logout = span_logout;
        this.span_login = span_login;

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
        
        if (type == 'login') {
            this.login();
        }

        if (type == 'logout') {
            this.logout();
        }

    },

    events: {
        click: 'onClick'
    }
    
});
