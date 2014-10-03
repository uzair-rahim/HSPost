define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-user-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var UserRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "tall",
		template: Template,
		events : {
			"click" : "viewProfile"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("User row view initialized...");
		},

		viewProfile : function(){
			App.router.navigate("profile/"+this.model.user.guid, true);
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.user = this.model.user;
			return jsonObject;
		}
		
	});

	return UserRow;
});