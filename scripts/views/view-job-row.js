define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-job-row",
		"../views/view-context-menu-job",
		"../models/model-job"
	],
	function($, App, Utils, Marionette, Template, ContextMenuJob, ModelJob){
	"use strict";

	var JobRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "",
		template: Template,
		events : {
			"click div.column.more" : "showContextMenu"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Job row view initialized...");
		},

		showContextMenu : function(event){
			var offset = $(event.target).offset();
			var xPosition ="14px";
			var yPosition = offset.top - 10 + "px";

			var isPosted = this.model.status == "POSTED";
			var container = $("#app-content .content");

			var options = new Object();
				options.xPosition = xPosition;
				options.yPosition = yPosition;
				options.isPosted = isPosted;

			Utils.RemoveExistingContextMenus();

			var contextMenu = new ContextMenuJob({model : options});
				$(container).append(contextMenu.render().el);

				this.listenTo(contextMenu, "contextMenuAction", this.contextMenuAction);
		},

		contextMenuAction : function(action){
			switch(action){
				case "post-job":
					this.postJob();
				break;
				case "unpost-job": 
					this.unpostJob()
				break;
				case "edit-job": 
					this.editJob()
				break;
				case "copy-job-link": 
					this.copyJobLink();
				break;
				case "share-with-connections": 
					this.shareWithConnections();
				break;
				case "share-with-employees": 
					this.shareWithEmployees();
				break;
				case "share-with-followers": 
					this.shareWithFollowers();
				break;
				case "delete-job": 
					this.deleteJob();
				break;
			};
		},

		postJob : function(){
			var jobGUID = this.model.guid;
			var job = new ModelJob();
			var that = this;
				job.updateStatus(jobGUID,0,function(){
					that.model.status = "POSTED";
					that.render();
					Utils.ShowToast({message : "Job status changed to Posted"});
				});
		},

		unpostJob : function(){
			var jobGUID = this.model.guid;
			var job = new ModelJob();
			var that = this;
				job.updateStatus(jobGUID,1,function(){
					that.model.status = "UNPOSTED";
					that.render();
					Utils.ShowToast({message : "Job status changed to Unposted"});
				});
		},

		editJob : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		copyJobLink : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		shareWithConnections : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		shareWithEmployees : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		shareWithFollowers : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		deleteJob : function(){
			var jobGUID = this.model.guid;
			console.log(jobGUID);
		},

		
		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.job = this.model;
			return jsonObject;
		}
		
	});

	return JobRow;
});