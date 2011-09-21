var vispro = (function (context, undefined) {

    var list,
        doc = context.document;

    if (window.console === undefined) {
        window.console = {};
        _(['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 
            'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'])
            .each(function (i, name) {
                window.console[name] = empty;
            });
    }

    if (window.localStorage === undefined) {
        window.localStorage = {};
        _(['clear', 'Storage', 'getItem', 'key', 'removeItem', 'setItem'])
            .each(list, function (i, name) {
                window.localStorage[name] = empty;
            }); 
    }

    function empty () {
        // ...nothing...
    }
    
    return {
        model: {},
        view: {},
        parser: {},
        data: {}
    };

}(this));