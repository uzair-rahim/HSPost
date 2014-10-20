define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-context-menu-user"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ContextMenuUser = Marionette.ItemView.extend({
		tagName : "ul",
		className : "context-menu",
		template: Template,
		events : {
			"click li" : "selectAction"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Context Menu User view initialized...");
		},

		onRender : function(){
			$(this.el).css("right", this.model.xPosition).css("top", this.model.yPosition);
			switch(this.model.userType){
				case "employee" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
				break;
				case "follower" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
				break;
				case "endorser" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#send-message").remove();
				break;
				case "user" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
				break;
				case "archived" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
				break;
				case "candidate" :
					$(this.el).find("#unarchive-user").remove();
				break;

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

	return ContextMenuUser;
});