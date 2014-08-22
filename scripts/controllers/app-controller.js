define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/views/view-loading",
		"../scripts/views/view-login",
		"../scripts/views/view-dashboard",
		"../scripts/views/view-jobs",
		"../scripts/views/view-candidates",
		"../scripts/views/view-network",
		"../scripts/views/view-messages",
		"../scripts/views/view-settings",
		"../scripts/models/model-employer",
		"../scripts/collections/collection-employers",
		"../scripts/collections/collection-jobs"
	],
	function($, App, Utils, Marionette, Loading, Login, Dashboard, Jobs, Candidates, Network, Messages, Settings, ModelEmployer, CollectionEmployers, CollectionJobs){
		"use strict";

		var AppController = Marionette.Controller.extend({

			
			initialize : function(){
				console.log("App controller initialized...");
				this.listenTo(App.session, "employerChanged", function(){
					App.router.navigate("", true);
				});
			},

			// Routes

			main : function(){
				console.log("Main route...");
				// If user is not logged in go to login screen
				if(!App.session.isLoggedIn()){
					App.router.navigate("login", true);
				// If user is logged in and verified go to jobs screen	
				}else if(App.session.isLoggedIn() && App.session.isVerified()){
					App.router.navigate("dashboard", true);
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

			dashboard : function(){
				console.log("Dashboard route...");
				// If user is logged in and verified go to dashboard screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append candidates view
					var view = new Dashboard();
					App.layout.content.show(view);
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			jobs : function(){
				console.log("Jobs route...");
				// If user is logged in and verified go to jobs screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append jobs view
					var guid = this.getEmployerGuid(); 
					var jobs = new CollectionJobs();
					jobs.getJobs(guid, function(data){
						var view = new Jobs({models : data});
						App.layout.content.show(view);
					});
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			candidates : function(){
				console.log("Candidates route...");
				// If user is logged in and verified go to candidates screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append candidates view
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
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append networks view
					var guid = this.getEmployerGuid();
					var employer = new ModelEmployer();
					var model = new Object();
					employer.set({guid : guid});

					// Get Employees
					employer.getEmployees(function(data){
						model.employees = new Object();
						model.employees = data;
						// Get Followers
						employer.getFollowers(function(data){
							model.followers = new Object();
							model.followers = data;
							// Get Endorsers
							employer.getEndorsers(function(data){
								model.endorsers = new Object();
								model.endorsers = data;
								// Append View
								var view = new Network({model : model});
								App.layout.content.show(view);
							});
						});
					});
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			messages : function(){
				console.log("Messages route...");
				// If user is logged in and verified go to messages screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append messages view
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
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append settings view
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
							App.menu.render();
							App.router.navigate("dashboard", true);
						});
				}else{
					alert("User is not verified");
				}
			},

			// Helpers
			showLoadingView : function(){
				var view = new Loading();
				App.layout.content.show(view);
			},

			getEmployerGuid : function(){
				var selectedEmployer = App.session.get("selectedEmployer");
				var employers = App.session.get("employers");
				var guid = employers[selectedEmployer].guid;
				return guid;
			}
		});

		return AppController;
	}
);