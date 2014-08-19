define([
        "Handlebars"
	], function (Handlebars) {
	
		function formatDate(given) {
			var date = new Date(given);
			var	foramtedDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
			return foramtedDate;
		}
	
	Handlebars.registerHelper("formatDate", formatDate);
	return formatDate;
});