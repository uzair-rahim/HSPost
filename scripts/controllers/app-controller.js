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
			},

			// Routes

			main : function(){
				console.log("Main route...");
				if(!App.session.isLoggedIn()){
					App.router.navigate("login", true);
				}else{
					App.router.navigate("jobs", true);
				}
			},

			login : function(){
				console.log("Login route...");
				if(App.session.isLoggedIn()){
					App.router.navigate("jobs", true);
				}else{
					var view = new Login();
					App.layout.body.show(view);
				}
			},

			jobs : function(){
				console.log("Jobs route...");
				if(!App.session.isLoggedIn()){
					App.router.navigate("login", true);
				}else{
					var view = new Jobs();
					App.layout.body.show(view);
				}
			},

			logout : function(){
				console.log("Logout route...");
				App.session.set({logged : false});
				App.router.navigate("login", true);
			},

			// Processes

			redirectOnLogin : function(){
				if(App.session.isVerified()){
					App.router.navigate("jobs", true);
				}
			}			
		});

		return AppController;
	}
);