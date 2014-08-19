define([
        "Handlebars"
	], function (Handlebars) {
	
		function formatWageType(type) {
			switch(type){
				case "ANNUALLY":
					return "Anually";
				break;
				case "BI-WEEKLY":
					return "Bi-Weekly";
				break;
				case "HOURLY":
					return "Hourly";
				break;
				case "MONTHLY":
					return "Monthly";
				break;
				case "WEEKLY":
					return "Weekly";
				break;
			}
		}
	
	Handlebars.registerHelper("formatWageType", formatWageType);
	return formatWageType;
});