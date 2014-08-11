define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-candidates"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewCandidates = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Candidates view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Candidates"
			return jsonObject;
		}
		
	});

	return ViewCandidates;
});