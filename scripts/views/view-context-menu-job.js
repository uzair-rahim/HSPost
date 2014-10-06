define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-context-menu-job",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ContextMenuJob = Marionette.ItemView.extend({
		tagName : "ul",
		className : "context-menu",
		template: Template,
		events : {
			"click li" : "selectAction"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Context Menu Job view initialized...");
		},

		onRender : function(){
			var that = this;

			$(this.el).css("right", this.model.xPosition).css("top", this.model.yPosition);
			if(!this.model.isPosted){
				$(this.el).find("#unpost-job").addClass("disabled");
				$(this.el).find("#copy-job-link").addClass("disabled");
				$(this.el).find("#share-with-connections").addClass("disabled");
				$(this.el).find("#share-with-employees").addClass("disabled");
				$(this.el).find("#share-with-followers").addClass("disabled");
			}else{
				$(this.el).find("#post-job").addClass("disabled");
			}
		},

		selectAction : function(event){
			var isDisabled = $(event.target).hasClass("disabled");
			if(!isDisabled){
				var action = $(event.target).attr("id");
				this.trigger("contextMenuAction",action);
				this.closeView();
			}
		},

		closeView : function(){
			this.remove();
			this.unbind();
		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return ContextMenuJob;
});