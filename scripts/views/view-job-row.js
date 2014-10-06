define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-job-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var JobRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Job row view initialized...");
		},

		
		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.job = this.model;
				console.log(jsonObject)
			return jsonObject;
		}
		
	});

	return JobRow;
});