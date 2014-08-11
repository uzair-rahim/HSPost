define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-messages"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewMessages = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Messages"
			return jsonObject;
		}
		
	});

	return ViewMessages;
});