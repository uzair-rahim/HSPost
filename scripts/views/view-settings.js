define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-settings"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewSettings = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Settings view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Settings"
			return jsonObject;
		}
		
	});

	return ViewSettings;
});