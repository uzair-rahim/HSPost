define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-profile"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewProfile = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Profile view initialized...");
		},

		getFirstName : function(){
			var firstname = this.options.model.firstname + "'";
			var lastCharacter = firstname.substr(firstname.length - 2, 1);
			if(lastCharacter !== "s"){
				firstname += "s"
			}
			return firstname;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = this.getFirstName() + " Profile"
				jsonObject.user = new Object();
				jsonObject.user = this.options.model;
			return jsonObject;
		}
		
	});

	return ViewProfile;
});