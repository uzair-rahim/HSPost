define([
		"jquery",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-menu"
	],
	function($, Utils, Marionette, Template){
	"use strict";

	var ViewMenu = Marionette.ItemView.extend({
		tagName : "div",
		className : "",
		template: Template,
		events : {
			"click .employer-name"		: "showSwitchEmployer",
			"click .employers-list li"	: "switchEmployer",
			"click #menu-notifications" : "notifications",
			"click #menu-dashboard"		: "dashboard",
			"click #menu-jobs"		 	: "jobs",
			"click #menu-search-jobs"	: "searchJobs",
			"click #menu-candidates" 	: "candidates",
			"click #menu-connections"	: "connections",
			"click #menu-network"	 	: "network",
			"click #menu-profile"		: "profile",
			"click #menu-messages"	 	: "messages",
			"click #menu-settings"	 	: "settings",
			"click #menu-logout"	 	: "logout"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Menu view initialized...");

			var appSession = this.options.app.session;
			this.listenTo(appSession, "photoChanged", this.render);
			this.listenTo(appSession, "employerChanged", this.render);
			this.listenTo(appSession, "notificationsChanged", this.render);
		},

		showSwitchEmployer : function(){
			var employers = this.options.app.session.attributes.employers;
			if(employers.length > 1){
				var employersList = $(".employers-list");
				var isVisible = $(employersList).hasClass("show")
				if(isVisible){
					$(employersList).removeClass("show");
					$(employersList).addClass("no-transition");
					$(employersList).animate({scrollTop : 0});
				}else{
					$(employersList).addClass("show");
					$(employersList).removeClass("no-transition");
				}
			}
		},

		switchEmployer : function(event){
			var index = $(event.target).index();
			var selectedEmployer = this.options.app.session.get("selectedEmployer");

			if(index !== selectedEmployer){
				this.options.app.session.set({selectedEmployer : index});
				this.hideMenuAndNotification();
				this.options.app.router.navigate("", true);
			}

		},

		notifications : function(){
			this.hideMenuAndAutoNotifaction();
		},

		dashboard : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("dashboard", true);
		},

		jobs : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("jobs", true);
		},

		searchJobs : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("searchJobs", true);
		},
		
		candidates : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("candidates", true);
		},

		connections : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("connections", true);
		},

		network : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("network", true);
	
		},

		profile : function(){
			this.hideMenuAndNotification();
			var userGUID = this.options.app.session.get("guid");
			this.options.app.router.navigate("profile/"+userGUID, true);
		},

		messages : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("messages", true);
		},

		settings : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("settings", true);
		},

		logout : function(){
			this.options.app.router.navigate("logout", true);
		},

		// Helper

		hideMenuAndNotification : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
		},

		hideMenuAndAutoNotifaction : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.showHideNotifications();
		},

		getNotificationsCount : function(){
			var count = this.options.app.session.attributes.notificationsCount;
			
			if(count > 99){
				count = "99+";
			}

			if(count == 0){
				count = "";
			}

			return count;
		},

		getUser : function(){
			return this.options.app.session.attributes;
		},

		getUserRole : function(){
			var roles = this.options.app.session.attributes.roles;
			var levels = ["user", "employerAdmin", "support"];
			
			var previousLevel = 0;
			var currentLevel = 0;
			var currentRole = "user";
			var role = currentRole;

			$.each(roles, function(){
				currentRole = this.role;
				$.each(levels, function(index){
					if(currentRole === this){
						currentLevel = index;
					}
					if(currentLevel > previousLevel){
						previousLevel = currentLevel;
						role = currentRole;
					}
				})
			});

			return role;
		},

		getSelectedEmployer : function(){
			return this.options.app.session.attributes.selectedEmployer;
		},

		setSelection : function(item){
			$(".menu-list li").removeClass("selected");
			$(item).addClass("selected");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.config = new Object;
				jsonObject.config = Utils.AppConfig;
				jsonObject.user = new Object();
				jsonObject.user = this.getUser();
				jsonObject.user.type = this.getUserRole();
				jsonObject.selectedEmployer = this.getSelectedEmployer();
				jsonObject.notificationsCount = this.getNotificationsCount();
			return jsonObject;
		}
		
	});

	return ViewMenu;
});