define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/views/view-login",
		"../scripts/views/view-jobs",
		"../scripts/views/view-candidates",
		"../scripts/views/view-network",
		"../scripts/views/view-messages",
		"../scripts/views/view-settings",
		"../scripts/collections/collection-employers"
	],
	function($, App, Utils, Marionette, Login, Jobs, Candidates, Network, Messages, Settings, CollectionEmployers){
		"use strict";

		var AppController = Marionette.Controller.extend({

			
			initialize : function(){
				console.log("App controller initialized...");
				this.listenTo(App.session, "employerChanged", this.jobs);
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
					App.layout.content.show(view);
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
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			candidates : function(){
				console.log("Candidates route...");
				// If user is logged in and verified go to candidates screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					var view = new Candidates();
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			network : function(){
				console.log("Network route...");
				// If user is logged in and verified go to network screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					var view = new Network();
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			messages : function(){
				console.log("Messages route...");
				// If user is logged in and verified go to messages screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					var view = new Messages();
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			settings : function(){
				console.log("Settings route...");
				// If user is logged in and verified go to settings screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					var view = new Settings();
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			logout : function(){
				console.log("Logout route...");
				// Set logged to false and redirect to login screen
				App.session.set({logged : false, expired : false});
				App.router.navigate("login", true);
			},

			// Processes

			redirectOnLogin : function(){
				if(App.session.isVerified()){
					var userEmployers = App.session.getEmployers();
					var collection = new CollectionEmployers();
						collection.getEmployers(userEmployers, function(){
							App.session.set({employers : collection.models});
							App.router.navigate("jobs", true);
						});
				}else{
					alert("User is not verified");
				}
			}			
		});

		return AppController;
	}
);