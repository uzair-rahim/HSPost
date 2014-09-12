define([
		"jquery",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-layout-app",
		"../models/model-authenticate"
	],
	function($, Utils, Marionette, Template, Authenticate){
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
				"click #app-head .icon" : "showHideMenu",
				"click #relogin" 		: "relogin",
				"click #cancel-relogin" : "cancelRelogin"
			},

			initialize : function(){
				_.bindAll.apply(_, [this].concat(_.functions(this)));
				console.log("App layout initialized...");
			},

			onShow : function(){
				if(this.options.app.session.isRememberMe()){
					$("#relogin-email").val(this.options.app.session.getEmail());
				}
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

			relogin : function(){
				var dialog = $("#app-relogin");
				var formEmail = $("#relogin-email").val();
				var formPassword = $("#relogin-password").val();

				var credentials = {
					emailaddress : formEmail,
					password 	 : formPassword
				}

				var that = this;

				var options = {
					success : function(response){
						var user = new Object();
							user = auth.getUser();
							user.logged = true;
							user.expired = false;
							
						that.options.app.session.set(user);
						that.options.app.router.controller.redirectOnLogin();
						Utils.HideModal();
						Utils.HideReloginDialog();
						$("#relogin-password").val("");
						dialog.removeClass("load");
					},
					error : function(model, errors){
						if(typeof(errors.responseJSON) !== "undefined"){
							var error = errors.responseJSON;
							Utils.ShowToast({message : error.errorMsg});
							dialog.removeClass("load");
						}
					}
				}

				var auth = new Authenticate();
				auth.set(credentials, {validate:true});
				
				if(auth.validationError){
					Utils.ShowToast({message : auth.validationError[0].message});
				}else{
					dialog.addClass("load");
					auth.save(credentials, options);
				}

			},

			cancelRelogin : function(){
				this.options.app.router.navigate("logout", true);
			},

			serializeData : function(){
				var jsonObject = new Object();
				return jsonObject;
			}
		});

		return LayoutApp;
	}
);