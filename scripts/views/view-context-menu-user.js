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
				case "archived" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#connect").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "candidate" :
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "connection" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#connect").remove();
				break;
				case "employee" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "endorser" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#send-message").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "endorsement" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "follower" :
					$(this.el).find("#hire-user").remove();
					$(this.el).find("#archive-user").remove();
					$(this.el).find("#unarchive-user").remove();
					$(this.el).find("#see-referrals").remove();
					$(this.el).find("#disconnect").remove();
				break;
				case "user" :
					
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