define([
        "Handlebars"
	], function (Handlebars) {
	
		function lessThan(lvalue, rvalue, options) {
			if (lvalue < rvalue) {
				return options.fn(this);
			}else {
				return options.inverse(this);
			}
		}
	
	Handlebars.registerHelper("if_lt", lessThan);
	return lessThan;
});