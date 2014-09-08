define([
		"marionette",
		"appcontroller"
	],
	function(Marionette, AppController){
		"use strict";
	
		var AppRouter = Marionette.AppRouter.extend({
			
			controller : new AppController(),
			
			appRoutes : {
				""		 	 		: "main",
				"dashboard"	 		: "dashboard",
				"login"	 	 		: "login",
				"jobs"	 	 		: "jobs",
				"searchJobs" 		: "searchJobs",
				"candidates" 		: "candidates",
				"network"	 		: "network",
				"profile/:userGUID"	: "profile",
				"connections"		: "connections",
				"messages"	 		: "messages",
				"settings"	 		: "settings",
				"logout" 	 		: "logout"
			}

		});
		
		return AppRouter;
	}
);