define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-activity-indicator"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewActivityIndicator = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Activity Indicator view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
			return jsonObject;
		}
		
	});

	return ViewActivityIndicator;
});