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
			this.listenTo(appSession, "stateChange", this.sessionChanged);
		},

		notifications : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.showHideNotifications();
		},

		jobs : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("jobs", true);
		},
		
		candidates : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("candidates", true);
		},

		network : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("network", true);
		},

		messages : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("messages", true);
		},

		settings : function(){
			this.options.app.layout.hideMenu();
			this.options.app.layout.hideNotifications();
			this.options.app.router.navigate("settings", true);
		},

		logout : function(){
			this.options.app.router.navigate("logout", true);
		},

		sessionChanged : function(){
			this.render();
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.user = new Object();
				jsonObject.user = this.options.app.session.attributes;
			return jsonObject;
		}
		
	});

	return ViewMenu;
});