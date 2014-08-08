define([
        "Handlebars"
	], function (Handlebars) {
	
		function notNull(lvalue, options) {
			if (lvalue !== null) {
				return options.fn(this);
			}else {
				return options.inverse(this);
			}
		}
	
	Handlebars.registerHelper("if_not_null", notNull);
	return notNull;
});