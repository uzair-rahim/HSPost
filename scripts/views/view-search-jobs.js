define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-search-jobs"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewSearchJobs = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Search jobs view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Jobs"
			return jsonObject;
		}
		
	});

	return ViewSearchJobs;
});