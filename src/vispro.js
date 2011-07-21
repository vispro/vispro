(function () {

    var empty = function () {},
        list;
    
    if (!window.console) {
        list = (
            "log debug info warn error assert dir dirxml group groupEnd" + 
            "time timeEnd count trace profile profileEnd"
        ).split(" "),

        window.console = {};
        $.each(list, function (i, name) {
            window.console[name] = empty;
        });
    }

    if (!window.localStorage) {
        list = ("clear Storage getItem key removeItem setItem").split(" ")

        window.localStorage = {};
        $.each(list, function (i, name) {
            window.localStorage[name] = empty;
        }); 
    }
     
}());

var vispro = (function () {

    var ids = {},
        doc = $(document),
        app,
        models,
        views;

    function guid(type) {
        
        if (typeof ids[type] == 'undefined') {
            ids[type] = 0;
        }

        var id = ids[type] += 1;

        return type + '_' + id;
    }

    function load(url, state) {

        var descriptor_url = url || "descriptors/descriptor.xml";

        $.ajax({
            url: descriptor_url,
            context: document.body,
            dataType: "xml",
            success: function(vispro_descriptor_xml){
                vispro.parseXML(vispro_descriptor_xml, function (parsed_obj) {
                    app.load(parsed_obj, state ? state.app : undefined);
                });
            }
        }); 
    }

    function unload() {
        window.location.reload(); 
    }

    function init (/* descriptor_url */) {        
        doc.ready(function () {
            app = new vispro.App();
            
            app
                .init(/* {descriptor_url: descriptor_url} */);
            
            models = vispro.models = app.models;
            views = vispro.views = app.views;
        });
    }

    function save () {
        var state = {};

        state.descriptor_url = "descriptors/descriptor.xml";
        state.app = app.save();

        // return $.quoteString(js_beautify($.toJSON(state)));
        return $.toJSON(state);
    }

    function restore (state_str) {
        var state;
        
        try {
            state = $.secureEvalJSON(state_str);
            load(state.descriptor_url, state);
        } catch (error) {
            throw error;
        }
    }
    
    return {
        guid: guid,
        init: init,
        load: load,
        unload: unload,
        save: save,
        restore: restore,
        data: {},
        model: {},
        view: {}
    };

}());