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
			"click #menu-jobs"		 	: "jobs",
			"click #menu-candidates" 	: "candidates",
			"click #menu-network"	 	: "network",
			"click #menu-messages"	 	: "messages",
			"click #menu-settings"	 	: "settings",
			"click #menu-logout"	 	: "logout"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Menu view initialized...");

			var appSession = this.options.app.session;
			this.listenTo(appSession, "employerChanged", this.render);
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

		jobs : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("jobs", true);
		},
		
		candidates : function(){
			this.hideMenuAndNotification();
			this.options.app.router.navigate("candidates", true);
		},

		network : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("network", true);
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

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.user = new Object();
				jsonObject.user = this.options.app.session.attributes;
				jsonObject.selectedEmployer = this.options.app.session.attributes.selectedEmployer;
			return jsonObject;
		}
		
	});

	return ViewMenu;
});