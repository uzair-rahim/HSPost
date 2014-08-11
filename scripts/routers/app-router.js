define([
		"marionette",
		"appcontroller"
	],
	function(Marionette, AppController){
		"use strict";
	
		var AppRouter = Marionette.AppRouter.extend({
			
			controller : new AppController(),
			
			appRoutes : {
				""		 	 : "main",
				"login"	 	 : "login",
				"jobs"	 	 : "jobs",
				"candidates" : "candidates",
				"network"	 : "network",
				"messages"	 : "messages",
				"settings"	 : "settings",
				"logout" 	 : "logout"
			}

		});
		
		return AppRouter;
	}
);