define([
        "Handlebars"
	], function (Handlebars) {
	
		function ifEmployerHasNoNetwork(data,options) {
			if (data.employees.length === 0 && data.followers.length === 0 && data.endorsers.length === 0) {
				return options.fn(this);
			}else {
				return options.inverse(this);
			}
		}
	
	Handlebars.registerHelper("ifEmployerHasNoNetwork", ifEmployerHasNoNetwork);
	return ifEmployerHasNoNetwork;
});