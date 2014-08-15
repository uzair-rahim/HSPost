define([
        "Handlebars"
	], function (Handlebars) {
	
		function getEmployersLogo(user, selected) {
			var employer = user.employers[selected];
			var logo = employer.logo;
			return logo.url;
		}
	
	Handlebars.registerHelper("getEmployersLogo", getEmployersLogo);
	return getEmployersLogo;
});