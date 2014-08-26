define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-jobs",
		"../collections/collection-jobs"
	],
	function($, App, Utils, Marionette, Template, Collection){
	"use strict";

	var ViewJobs = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		jobs : null,
		events : {
			"click .column.more" : "showContextMenu",
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Jobs view initialized...");
		},

		onShow : function(){
			var that = this;
			this.jobs = new Collection(this.options.models);

			$(document).delegate(".context-menu li:not('.disabled')", "click", function(){
				var action = $(this).attr("id");
				var jobID = $(this).attr("data-jobID");

				switch(action){
					case "post-job":
						that.postJob(jobID);
					break;
					case "unpost-job":
						that.unpostJob(jobID);
					break;
					case "edit-job":
						that.editJob(jobID);
					break;
					case "copy-job-link":
						that.copyJobLink(jobID);
					break;
					case "share-with-employees":
						that.shareWithEmployees(jobID);
					break;
					case "share-with-followers":
						that.shareWithFollowers(jobID);
					break;
					case "delete-job":
						that.deleteJob(jobID);
					break;
				}

			});
		},

		showContextMenu : function(event){
			var offset =$(event.target).offset();
			var xPosition ="14px";
			var yPosition = offset.top - 10 + "px";

			var jobID = $(event.target).closest("li").attr("id");
			var job = this.jobs.get(jobID);
			var isPosted = job.get("status") == "POSTED";

			$.get("templates/template-context-menu-job.tpl", function(data){
				$(document).find("#app-content .content").append(data);
				
				$(".context-menu").css("right", xPosition).css("top", yPosition);
				$(".context-menu li").each(function(){
					$(this).attr("data-jobID", jobID);
				});

				if(!isPosted){
					var menu = $(".context-menu");
						menu.find("#copy-job-link").addClass("disabled");
						menu.find("#share-with-employees").addClass("disabled");
						menu.find("#share-with-followers").addClass("disabled");
				}
			});

		},

		postJob : function(jobID){
			console.log(jobID);
		},

		unpostJob : function(jobID){
			console.log(jobID);
		},

		editJob : function(jobID){
			console.log(jobID);
		},

		copyJobLink : function(jobID){
			console.log(jobID);
		},

		shareWithEmployees : function(jobID){
			console.log(jobID);
		},

		shareWithFollowers : function(jobID){
			console.log(jobID);
		},

		deleteJob : function(jobID){
			console.log(jobID);
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Jobs";
				jsonObject.jobs = this.options.models;
			return jsonObject;
		}
		
	});

	return ViewJobs;
});