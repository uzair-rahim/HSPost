define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/views/view-login",
		"../scripts/views/view-jobs"
	],
	function($, App, Utils, Marionette, Login, Jobs){
		"use strict";

		var AppController = Marionette.Controller.extend({

			
			initialize : function(){
				console.log("App controller initialized...");
				this.listenTo(App.session, "stateChange", this.stateChanged);
			},

			main : function(){
				console.log("Main route...");
				if(!App.userSession.logged){
					App.router.navigate("login", true);
				}else{
					App.router.navigate("jobs", true);
				}
			},

			login : function(){
				console.log("Login route...");
				var view = new Login();
				App.layout.body.show(view);
			},

			jobs : function(){
				console.log("Jobs route...");
				App.session.set({logged : true});
				var view = new Jobs();
				App.layout.body.show(view);
			},

			logout : function(){
				console.log("Logout route...");
				App.session.set({logged : false});
				App.router.navigate("login", true);
			},

			// Helper Methods

			changeToApp : function(){
				App.layout.toggleLayout("app");
				App.layout.menu.show(App.menu);
			},

			changeToPortal : function(){
				App.layout.toggleLayout("portal");
			},

			stateChanged : function(status){
				if(status){
					this.changeToApp();
				}else{
					this.changeToPortal();
				}
			},

			
		});

		return AppController;
	}
);