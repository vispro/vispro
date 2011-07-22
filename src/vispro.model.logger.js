vispro.logger = (function () {
	
	var logs = [];

	function clear () {

		logs = [];
	}

	function log (message) {

		logs.push(message);

		// console.log(logs);
	}

	function print () {
		
		var s = logs.join('\n');

		// console.log(s);

		return s;
	}

	return {
		clear: clear,
		log: log,
		print: print
	};

}());

vispro.model.Logger = Backbone.Collection.extend({

	localStorage: new Store("vispro.model.Logger"),

    model: vispro.model.Log,

    init: function (options) {

        this.logs = [];
    }
        
});