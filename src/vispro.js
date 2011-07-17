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
        app;

    function guid(type) {
        
        if (typeof ids[type] == 'undefined') {
            ids[type] = 0;
        }

        var id = ids[type] += 1;

        return type + '_' + id;
    }

    function load() {
        $.ajax({
            url: "descriptors/descriptor.xml",
            context: document.body,
            dataType: "xml",
            success: function(vispro_descriptor_xml){
                vispro.parseXML(vispro_descriptor_xml, function (parsed_obj) {
                    app.load(parsed_obj);
                });
            }
        }); 
    }

    function unload() {
        app.unload(); 
    }

    function init () {        
        doc.ready(function () {
            app = new vispro.App();
            
            app
                .init();
        });
    }
    
    return {
        guid: guid,
        init: init,
        load: load,
        unload: unload,
        data: {},
        model: {},
        view: {}
    };

}());