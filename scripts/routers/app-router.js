define([
		"marionette",
		"appcontroller"
	],
	function(Marionette, AppController){
		"use strict";
	
		var AppRouter = Marionette.AppRouter.extend({
			controller : new AppController(),
			appRoutes : {
				""		: "main",
				"login" : "login",
				"jobs"	: "jobs",
				"logout" : "logout"
			}

		});
		
		return AppRouter;
	}
);