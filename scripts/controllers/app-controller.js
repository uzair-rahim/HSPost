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
				// If user is not logged in go to login screen
				if(!App.session.isLoggedIn()){
					App.router.navigate("login", true);
				// If user is logged in and verified go to jobs screen	
				}else if(App.session.isLoggedIn() && App.session.isVerified()){
					App.router.navigate("jobs", true);
				}
			},

			login : function(){
				console.log("Login route...");
				// If user is not logged in go to login screen
				if(!App.session.isLoggedIn()){
					var view = new Login();
					App.layout.body.show(view);
				// If user is logged in and verified go to jobs screen	
				}else if(App.session.isLoggedIn() && App.session.isVerified()){
					App.router.navigate("jobs", true);
				}
			},

			jobs : function(){
				console.log("Jobs route...");
				// If user is logged in and verified go to jobs screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					var view = new Jobs();
					App.layout.body.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			logout : function(){
				console.log("Logout route...");
				// Set logged to false and redirect to login screen
				App.session.set({logged : false, role : null, employers : null});
				App.router.navigate("login", true);
			},

			// Processes

			redirectOnLogin : function(){
				if(App.session.isVerified()){
					App.router.navigate("jobs", true);
				}else{
					alert("User is not verified");
				}
			}			
		});

		return AppController;
	}
);