define([
        "Handlebars"
	], function (Handlebars) {
	
		function log(data) {
			console.log(data)
		}
	
	Handlebars.registerHelper("log", log);
	return log;
});