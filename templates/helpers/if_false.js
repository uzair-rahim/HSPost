define([
        "Handlebars"
	], function (Handlebars) {
	
		function ifFalse(lvalue, options) {
			if (lvalue === false) {
				return options.fn(this);
			}else {
				return options.inverse(this);
			}
		}
	
	Handlebars.registerHelper("if_false", ifFalse);
	return ifFalse;
});