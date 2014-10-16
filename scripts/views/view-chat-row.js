define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-chat-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ChatRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "",
		template: Template,
		events : {
			"click" : "selectChat"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Chat row view initialized...");
		},

		onRender : function(){
			var role = this.model.role;
			switch(role){
				case "user" :
					if(!this.model.latestMessage.candidateSeen){
						$(this.el).addClass("new");
					}
				break;
				default : 
					if(!this.model.latestMessage.employerSeen){
						$(this.el).addClass("new");
					}	
				break;
			}
		},

		selectChat : function(){
			this.trigger("selectChat", this.model.guid);
		},

		getChatSummary : function(){
			var userGUID = App.session.get("guid");
			var summary = new Object();
				summary.photo = new Object();
			var chat = this.model;
			var participants = chat.participants;
			$.each(participants,function(){
				summary.message = chat.latestMessage.chatMessageContent.text;
				summary.type = chat.latestMessage.sender.guid === userGUID ? "outgoing" : "incoming";
				switch(chat.role){
					case "user" :
						if(this.employer !== null){
							summary.photo = this.employer.logo;
							summary.name = this.employer.name;
						}
					break;
					default : 
						if(this.user !== null){
							summary.photo = this.user.photo;
							summary.name = this.user.firstname + " " + this.user.lastname;
						}
					break;
				}
			});
			return summary;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.summary = this.getChatSummary();
			return jsonObject;
		}
		
	});

	return ChatRow;
});