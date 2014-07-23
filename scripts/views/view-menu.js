define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-menu"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewMenu = Marionette.ItemView.extend({
		tagName : "div",
		className : "",
		template: Template,
		events : {
			"click #menu-logout" : "logout"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Menu view initialized...");
		},

		logout : function(){
			App.router.navigate("logout", true);
		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return ViewMenu;
});