define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/views/view-login",
		"../scripts/views/view-dashboard",
		"../scripts/views/view-jobs",
		"../scripts/views/view-search-jobs",
		"../scripts/views/view-candidates",
		"../scripts/views/view-archived-candidates",
		"../scripts/views/view-connections",
		"../scripts/views/view-employees",
		"../scripts/views/view-followers",
		"../scripts/views/view-endorsers",
		"../scripts/views/view-profile",
		"../scripts/views/view-messages",
		"../scripts/views/view-user-settings",
		"../scripts/views/view-employer-settings",
		"../scripts/models/model-employer",
		"../scripts/models/model-user",
		"../scripts/models/model-network",
		"../scripts/models/model-chat",
		"../scripts/collections/collection-employers",
		"../scripts/collections/collection-jobs",
		"../scripts/collections/collection-notifications"
	],
	function($, App, Utils, Marionette, Login, Dashboard, Jobs, SearchJobs, Candidates, ArchivedCandidates, Connections, Employees, Followers, Endorsers, Profile, Messages, UserSettings, EmployerSettings, ModelEmployer, ModelUser, ModelNetwork, ModelChat, CollectionEmployers, CollectionJobs, CollectionNotifications){
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
					var route = Utils.GetDefaultRoute();
					switch(App.session.getRole()){
						case "user":
							// ...search jobs screen if user is user
							App.router.navigate("searchJobs", true);
						break;
						case "employerAdmin":
							// ...default screen if user is admin
							App.router.navigate(route, true);
						break;
						case "support":
							// ...default screen if user is support
							App.router.navigate(route, true);
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
					var route = Utils.GetDefaultRoute();
					switch(App.session.getRole()){
						case "user":
							// ...search jobs screen if user is user
							App.router.navigate("searchJobs", true);
						break;
						case "employerAdmin":
							// ...default screen if user is admin
							App.router.navigate(route, true);
						break;
						case "support":
							// ...default screen if user is support
							App.router.navigate(route, true);
						break;
					}
				}
			},

			dashboard : function(){
				console.log("Dashboard route...");
				// If user is logged in and verified then...
				if(Utils.AppConfig.dashboard && App.session.isLoggedIn() && App.session.isVerified()){
					// ...go to search jobs page screen if user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						// ...show Activity Indicator and clear out the current content
						this.showActivityIndicator();
						// Append candidates view
						var view = new Dashboard();
						App.layout.content.show(view);	
					}

					// Get Notifications
					this.getNotifications();
					
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
						// ...show Activity Indicator and clear out the current content
						this.showActivityIndicator();
						// Append jobs view
						var guid = this.getEmployerGuid(); 
						var jobs = new CollectionJobs();
						jobs.getJobs(guid, function(data){
							var view = new Jobs({models : data});
							App.layout.content.show(view);
						});
					}
					
					// Get Notifications
					this.getNotifications();

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
						var route = Utils.GetDefaultRoute();
						App.router.navigate(route, true);
					}else{
						// ...show Activity Indicator and clear out the current content
						this.showActivityIndicator();
						// Append jobs view
						var view = new SearchJobs();
						App.layout.content.show(view);
					}

					// Get Notifications
					this.getNotifications();

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
						// ...show Activity Indicator and clear out the current content
						this.showActivityIndicator();
						// Append candidates view
						var guid = this.getEmployerGuid(); 
						var employer = new ModelEmployer();
						employer.getCandidatesByEmployer(guid, 0, 15, 0, function(data){
							var view = new Candidates({models : data});
							App.layout.content.show(view);
						});
					}

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			archivedCandidates : function(){
				console.log("Archived candidates route...");
				// If user is logged in and verified then...
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// ...go to search jobs screen if user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					}else{
						// ...show Activity Indicator and clear out the current content
						this.showActivityIndicator();
						// Append candidates view
						var guid = this.getEmployerGuid(); 
						var employer = new ModelEmployer();
						employer.getCandidatesByEmployer(guid, 0, 15, 1, function(data){
							var view = new ArchivedCandidates({models : data});
							App.layout.content.show(view);
						});
					}

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			employees : function(){
				console.log("Network route...");
				// If user is logged in and verified go to network screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
					// If user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					// If user is admin or support
					}else{
						// Append networks view
						var guid = this.getEmployerGuid();
						var employer = new ModelEmployer();
						var model = new Object();
						employer.set({guid : guid});

						// Get Employees
						employer.getEmployees(function(data){
							// Append View
							var view = new Employees({model : data});
							App.layout.content.show(view);
						});
					}

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			followers : function(){
				console.log("Followers route...");
				// If user is logged in and verified go to network screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
					// If user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					// If user is admin or support
					}else{
						// Append networks view
						var guid = this.getEmployerGuid();
						var employer = new ModelEmployer();
						var model = new Object();
						employer.set({guid : guid});

						// Get Employees
						employer.getFollowers(function(data){
							// Append View
							var view = new Followers({model : data});
							App.layout.content.show(view);
						});
					}

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			endorsers : function(){
				console.log("Endorsers route...");
				// If user is logged in and verified go to network screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
					// If user is user
					if(App.session.isUser()){
						App.router.navigate("searchJobs", true);
					// If user is admin or support
					}else{
						// Append networks view
						var guid = this.getEmployerGuid();
						var employer = new ModelEmployer();
						var model = new Object();
						employer.set({guid : guid});

						// Get Employees
						employer.getEndorsers(function(data){
							// Append View
							var view = new Endorsers({model : data});
							App.layout.content.show(view);
						});
					}

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			connections : function(){
				console.log("Connections route...");
				// If user is logged in and verified go to connections screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
						var model = new Object();
						var userGUID = App.session.get("guid");
						var user = new ModelUser();
							// Get Endorsements
							user.getEndorsingUsers(userGUID, function(data){
								model.endorsements = new Object();
								model.endorsements = data;
								// Get Connections
								user.getNetworkUsers(userGUID, function(data){
									model.connections = new Object();
									model.connections = data;
									// Get Sent Requests
									var network = new ModelNetwork();
										network.getSentRequests(userGUID,function(data){
											model.sent = new Object();
											model.sent = data;
											// Get Received Requests
											network.getReceivedRequests(userGUID,function(data){
												model.received = new Object();
												model.received = data;
												// Get Places
												user.getFollowedEmployers(userGUID,function(data){
													model.places = new Object();
													model.places = data;
													//Append View
													var view = new Connections({models : model});
													App.layout.content.show(view);
												});
											});
										});
								});
							});

					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			profile : function(userGUID){
				console.log("Profile route...");
				// If user is logged in and verified go to jobs screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
					
					var model = new Object();
					var user = new ModelUser({guid : userGUID});
						// Get user
						user.getUser(function(data){
							model.user = new Object();
							model.user = data;
							// Get primary work history
							user.getPrimaryWorkHistory(function(data){
								model.user.primaryWorkHistory = data;
								// Get work history
								user.getWorkHistory(function(data){
									model.user.workHistory = new Object();
									model.user.workHistory = data.history;	
									// Get endorsements
									user.getEndorsingUsers(userGUID, function(data){
										model.endorsements = new Object();
										model.endorsements = data;
										// Get connections
										user.getNetworkUsers(userGUID, function(data){
											model.connections = new Object();
											model.connections = data;
											// Append profile view
											var view = new Profile({model : model});
											App.layout.content.show(view);	
										});
									});
										
								});
							});
						});
					
					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			messages : function(){
				console.log("Messages route...");
				// If user is logged in and verified go to messages screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();

					var role = App.session.getRole();

					if(role === "user"){
						// Get User Chat
						var userGUID = App.session.get("guid");
						var chat = new ModelChat();
							chat.getUserChatList(userGUID,0,function(data){
								// Append messages view
								data.role = App.session.getRole();
								var view = new Messages({model : data});
								App.layout.content.show(view);
							});
					}else{
						// Get Employer Chat
						var employerGUID = this.getEmployerGuid();
						var chat = new ModelChat();
							chat.getEmployerChatList(employerGUID,0,function(data){
								// Append messages view
								data.role = App.session.getRole();
								var view = new Messages({model : data});
								App.layout.content.show(view);
							});
					}
					// Get Notifications
					this.getNotifications();

				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			settings : function(){
				console.log("Settings route...");
				// If user is logged in and verified go to settings screen
				if(App.session.isLoggedIn() && App.session.isVerified()){
					// Show Activity Indicator and clear out the current content
					this.showActivityIndicator();
					if(App.session.isUser()){
						// Append user settings view
						var view = new UserSettings();
						App.layout.content.show(view);
					}else{
						// Append employer settings view
						var view = new EmployerSettings();
						App.layout.content.show(view);
					}

					// Get Notifications
					this.getNotifications();
					
				// If user is not logged in or is not verified go to login screen	
				}else{
					App.router.navigate("login", true);
				}
			},

			logout : function(){
				console.log("Logout route...");
				Utils.HideModal();
				Utils.HideReloginDialog();
				App.abortAllRequests();
				// Set logged to false and redirect to login screen
				App.session.set({logged : false, expired : false});
				App.router.navigate("login", true);
			},

			clean : function(){
				console.log("Clean route...");
				App.router.navigate("logout", true);
				App.session.removeUserSession();
			},

			// Processes

			redirectOnLogin : function(){
				if(App.session.isVerified()){
					var userGUID = App.session.get("guid");
					var user = new ModelUser({guid : userGUID});
						user.getProfilePhoto(function(data){
							// Set photo in session
							App.session.set("photo", data);
							// If user is user then...
							if(App.session.isUser()){
								// ...go to search jobs screen
								App.router.navigate("searchJobs", true);
							}else{
								// ...get all employers and go to default
								var userEmployers = App.session.getEmployers();
								var collection = new CollectionEmployers();
									collection.getEmployers(userEmployers, function(){
										App.session.set({employers : collection.models});
										App.menu.render();
										var route = Utils.GetDefaultRoute();
										App.router.navigate(route, true);
									});
							}
						});

					this.getNotifications();

				}else{
					alert("User is not verified");
				}
			},

			// Helpers
			showActivityIndicator : function(){
				$(App.layout.content.el).html(Utils.GetActivityIndicator());
			},

			getNotifications : function(){
				//var userGUID = App.session.get("guid");
				//var notifications = new CollectionNotifications();
				//	notifications.getUserNotifications(userGUID, function(data){
				//		App.session.set("notificationsCount", data.totalNotifications);
				//	});
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