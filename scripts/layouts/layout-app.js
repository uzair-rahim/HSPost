define([
		"jquery",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-layout-app"
	],
	function($, Utils, Marionette, Template){
		"use strict";

		var LayoutApp = Marionette.Layout.extend({
			tagName : "div",
			className : "app portal",
			template : Template,
			regions : {
				menu 			: "#app-menu",
				main 			: "#app-main",
				head 			: "#app-head",
				body 			: "#app-body",
				content 		: "#app-content",
				notifications 	: "#app-notifications"
			},
			
			events : {
				"click #app-head .icon" : "showHideMenu"
			},

			initialize : function(){
				_.bindAll.apply(_, [this].concat(_.functions(this)));
				console.log("App layout initialized...");
			},

			showHideMenu : function(){
				var menu = $(document).find("#app-menu");
				var main = $(document).find("#app-main");
				var isVisible = $(menu).hasClass("show");
				if(isVisible){
					$(menu).removeClass("show");
					$(main).removeClass("collapse");
				}else{
					$(menu).addClass("show");
					$(main).addClass("collapse");
				}
			},

			hideMenu : function(){
				var menu = $(document).find("#app-menu");
				var main = $(document).find("#app-main");
				$(menu).removeClass("show");
				$(main).removeClass("collapse");
			},

			showHideNotifications : function(){
				var notifications = $(document).find("#app-notifications");
				var isVisible = $(notifications).hasClass("show");
				if(isVisible){
					$(notifications).removeClass("show");
				}else{
					$(notifications).addClass("show");
				}
			},

			hideNotifications : function(){
				var notifications = $(document).find("#app-notifications");
				$(notifications).removeClass("show");
			},

			toggleLayout : function(state){
				var app = $(document).find(".app");
				switch(state){
					case "app":
						$(app).removeClass("portal");
					break;
					case "portal":
						$(app).addClass("portal");
					break;
				}

				// Hide the notification flyout
				var notifications = $(document).find("#app-notifications");
				$(notifications).removeClass("show");
			},

			serializeData : function(){
				var jsonObject = new Object();
				return jsonObject;
			}
		});

		return LayoutApp;
	}
);