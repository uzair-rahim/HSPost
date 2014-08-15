define([
        "Handlebars"
	], function (Handlebars) {
	
		function ifEmployersHasLogo(user, selected, options) {
			var employer = user.employers[selected];
			var logo = employer.logo;
			console.log(logo)
			if(logo === null || typeof(logo) === "undefined") {
				return options.inverse(this);
			}else{
				return options.fn(this);
			}
		}
	
	Handlebars.registerHelper("ifEmployersHasLogo", ifEmployersHasLogo);
	return ifEmployersHasLogo;
});