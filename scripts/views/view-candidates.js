define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-candidates",
		"../views/view-candidates-list",
	],
	function($, App, Utils, Marionette, Template, ViewCandidatesList){
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

		onShow : function(){
			var jobs = this.options.models;
			var container = this.el;
			if(this.hasCandidates()){
				$.each(jobs,function(){
					var candidatesList = new ViewCandidatesList({model : this});
						$(container).append(candidatesList.render().el);
				});
			}
		},

		hasCandidates : function(){
			var jobs = this.options.models;

			if(jobs.length === 0){
				return false;
			}else{
				var totalCandidates = 0;
				$.each(jobs, function(){
					totalCandidates += this.candidates.length;
				});
				return totalCandidates !== 0;
			}

		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Candidates";
				jsonObject.hasCandidates = this.hasCandidates();
			return jsonObject;
		}
		
	});

	return ViewCandidates;
});