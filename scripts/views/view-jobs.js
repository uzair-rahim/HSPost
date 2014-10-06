define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-jobs",
		"../views/view-job-row",
	],
	function($, App, Utils, Marionette, Template, JobRow){
	"use strict";

	var ViewJobs = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Jobs view initialized...");
		},

		onShow : function(){
			var jobs = this.options.models;
			var container = $(this.el).find("ul.grid-list");
			if(this.hasJobs()){
				$.each(jobs,function(){
					var job = new JobRow({model : this});
						$(container).append(job.render().el);
				});
			}
		},

		hasJobs : function(){
			var jobs = this.options.models;
			return jobs.length > 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Jobs";
				jsonObject.hasJobs = this.hasJobs();
			return jsonObject;
		}
		
	});

	return ViewJobs;
});