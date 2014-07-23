define([
		"jquery",
        "app",
        "utils",
		"marionette",
		"../scripts/layouts/layout-app",
		"../scripts/views/view-menu"
	],
	function($, App, Utils, Marionette, Layout, Menu){
		"use strict";

		var AppController = Marionette.Controller.extend({

			layout : new Layout(),
			menu : new Menu(),

			initialize : function(){
				console.log("App controller initialized...");
				App.body.show(this.layout);
				this.layout.menu.show(this.menu);
			},

			main : function(){
				console.log("Main route...");
			},

			login : function(){
				console.log("Login route...");
				this.layout.toggleLayout("portal");
			},

			jobs : function(){
				console.log("Jobs route...");
				this.layout.toggleLayout("app");
			},

			logout : function(){
				console.log("Logout route...");
				App.router.navigate("login", true);
			},

		});

		return AppController;
	}
);