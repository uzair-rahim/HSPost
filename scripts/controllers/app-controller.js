define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/views/view-loading",
		"../scripts/views/view-login",
		"../scripts/views/view-dashboard",
		"../scripts/views/view-jobs",
		"../scripts/views/view-search-jobs",
		"../scripts/views/view-candidates",
		"../scripts/views/view-user-network",
		"../scripts/views/view-employer-network",
		"../scripts/views/view-profile",
		"../scripts/views/view-messages",
		"../scripts/views/view-user-settings",
		"../scripts/views/view-employer-settings",
		"../scripts/models/model-employer",
		"../scripts/collections/collection-employers",
		"../scripts/collections/collection-jobs"
	],
	function($, App, Utils, Marionette, Loading, Login, Dashboard, Jobs, SearchJobs, Candidates, UserNetwork, EmployerNetwork, Profile, Messages, UserSettings, EmployerSettings, ModelEmployer, CollectionEmployers, CollectionJobs){
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
				// If user is logged in and verified then go to...	
				}else if(App.session.isLoggedIn() && App.session.isVerified()){
					switch(App.session.getRole()){
						case "user":
							// ...search jobs screen if user is user
							App.router.navigate("searchJobs", true);
						break;
						case "employerAdmin":
							// ...dashboard screen if user is admin
							App.router.navigate("dashboard", true);
						break;
						case "support":
							// ...dashboard screen if user is support
							App.router.navigate("dashboard", true);
						break;
					}
				}
			},

			login : function(){
				console.log("Login route...");
				// If user is not logged in go to login screen
				if(!App.session.isLoggedIn()){
					var view = new Login();
					App.layout.content.show(view);
				// If user is logged in and verified then go to...
				}else if(App.session.isLoggedIn() && App.session.isVerified()){
					switch(App.session.getRole()){
						case "user":
							// ...search jobs screen if user is user
							App.router.navigate("searchJobs", true);
						break;
						case "employerAdmin":
							// ...screen if user is admin
							App.router.navigate("dashboard", true);
						break;
						case "support":
							// ...dashboard screen if user is support
							App.router.navigate("dashboard", true);
						break;
					}
				}
			},

			dashboard : function(){
				console.log("Dashboard route...");
				// If user is logged in and verified then...
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// ...go to search jobs page screen if user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						// ...show loading animation and clear out the current content
						this.showLoadingView();
						// Append candidates view
						var view = new Dashboard();
						App.layout.content.show(view);	
					}
					
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			jobs : function(){
				console.log("Jobs route...");
				// If user is logged in and verified then...
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// ...go to search jobs screen if user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						// ...show loading animation and clear out the current content
						this.showLoadingView();
						// Append jobs view
						var guid = this.getEmployerGuid(); 
						var jobs = new CollectionJobs();
						jobs.getJobs(guid, function(data){
							var view = new Jobs({models : data});
							App.layout.content.show(view);
						});
					}
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			searchJobs : function(){
				console.log("Search jobs route...");
				// If user is logged in and verified go to jobs screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					if(!App.session.isUser()){
						App.router.navigate("dashboard", true);
					}else{
						// ...show loading animation and clear out the current content
						this.showLoadingView();
						// Append jobs view
						var view = new SearchJobs();
						App.layout.content.show(view);
					}
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			candidates : function(){
				console.log("Candidates route...");
				// If user is logged in and verified then...
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// ...go to search jobs screen if user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						// ...show loading animation and clear out the current content
						this.showLoadingView();
						// Append candidates view
						var guid = this.getEmployerGuid(); 
						var jobs = new CollectionJobs();
						jobs.getJobs(guid, function(data){
							var view = new Candidates({models : data});
							App.layout.content.show(view);
						});
					}
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
					// If user is user
					if(App.session.isUser()){
						// Append View
						var view = new UserNetwork();
						App.layout.content.show(view);
					// If user is admin or support
					}else{
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
									var view = new EmployerNetwork({model : model});
									App.layout.content.show(view);
								});
							});
						});
					}
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			profile : function(){
				console.log("Profile route...");
				// If user is logged in and verified go to jobs screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show loading animation and clear out the current content
					this.showLoadingView();
					// Append jobs view
					var view = new Profile();
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
					if(App.session.isUser()){
						// Append user settings view
						var view = new UserSettings();
						App.layout.content.show(view);
					}else{
						// Append employer settings view
						var view = new EmployerSettings();
						App.layout.content.show(view);
					}
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			logout : function(){
				console.log("Logout route...");
				Utils.HideModal();
				Utils.HideReloginDialog();
				// Set logged to false and redirect to login screen
				App.session.set({logged : false, expired : false});
				App.router.navigate("login", true);
			},

			// Processes

			redirectOnLogin : function(){
				if(App.session.isVerified()){
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						var userEmployers = App.session.getEmployers();
						var collection = new CollectionEmployers();
							collection.getEmployers(userEmployers, function(){
								App.session.set({employers : collection.models});
								App.menu.render();
								App.router.navigate("dashboard", true);
							});
					}
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