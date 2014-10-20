define([
		"marionette",
		"appcontroller"
	],
	function(Marionette, AppController){
		"use strict";
	
		var AppRouter = Marionette.AppRouter.extend({
			
			controller : new AppController(),
			
			appRoutes : {
				""		 	 			: "main",
				"dashboard"	 			: "dashboard",
				"login"	 	 			: "login",
				"jobs"	 	 			: "jobs",
				"searchJobs" 			: "searchJobs",
				"candidates" 			: "candidates",
				"archivedCandidates" 	: "archivedCandidates",
				"network"	 			: "employees",
				"followers"	 			: "followers",
				"endorsers"	 			: "endorsers",
				"profile/:userGUID"		: "profile",
				"connections"			: "endorsements",
				"people"				: "people",
				"places"				: "places",
				"messages"	 			: "messages",
				"settings"	 			: "settings",
				"logout" 	 			: "logout",
				"clean"					: "clean"
			}

		});
		
		return AppRouter;
	}
);