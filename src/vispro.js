var vispro = (function () {

    var ids = {};

    function guid(type) {
        
        if (typeof ids[type] == 'undefined') {
            ids[type] = 0;
        }

        var id = ids[type] += 1;

        return type + '_' + id;
    }
    
    return {
        guid: guid,
        data: {},
        model: {},
        view: {}
    };

}());

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