define([
        "Handlebars"
	], function (Handlebars) {
	
		function getEmployersName(user, selected) {
			var employer = user.employers[selected];
			return employer.name;
		}
	
	Handlebars.registerHelper("getEmployersName", getEmployersName);
	return getEmployersName;
});