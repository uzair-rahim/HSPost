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
			"click #menu-logout" : "logout"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Menu view initialized...");

			var appSession = this.options.app.session;
			this.listenTo(appSession, "stateChange", this.sessionChanged);
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