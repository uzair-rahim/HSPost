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

		hasCandidates : function(){
			var jobs = this.options.models;

			if(jobs.length === 0){
				return false;
			}

			var totalCandidates = 0;

			$.each(jobs, function(){
				totalCandidates += this.candidates.length;
			});

			return totalCandidates !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Candidates";
				jsonObject.hasCandidates = this.hasCandidates();
				jsonObject.jobs = this.options.models;
			return jsonObject;
		}
		
	});

	return ViewCandidates;
});