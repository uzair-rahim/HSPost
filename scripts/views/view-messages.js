define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-messages",
		"../views/view-messages-list",
		"../views/view-messages-view",
		"../views/view-messages-reply",
		"../views/view-message-row",
		"../models/model-chat",
	],
	function($, App, Utils, Marionette, Template, ViewMessagesList, ViewMessagesView, ViewMessagesReply, ViewMessageRow, ModelChat){
	"use strict";

	var ViewMessages = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		messagesList : null,
		messagesView : null,
		messagesReply : null,
		template: Template,
		events : {
			"click .thread-info" : "slideViewLeft"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages view initialized...");
		},

		onShow : function(){
			var messagesContainer = $(".messages-container");
				messagesContainer.height($(window).height() - 110);

			var messagesBody = $(this.el).find(".body");
			this.messagesList = new ViewMessagesList({model : this.model});
			this.messagesView = new ViewMessagesView({model : this.model});
			
			$(messagesBody).append(this.messagesList.render().el);
			$(messagesBody).append(this.messagesView.render().el);

			this.listenTo(this.messagesList, "selectChat", this.selectChat);
		},

		selectChat : function(chatGUID){
			var threadInfoContainer = $(this.el).find(".head .thread-info");
			var that = this;
			var chat = new ModelChat();
			switch(this.model.role){
				case "user" :
					var userGUID = App.session.get("guid");
					chat.getUserChat(chatGUID,userGUID,function(response){
						$.each(response.participants, function(){
							if(this.employer !== null){
								threadInfoContainer.html("<span>"+this.employer.name+"</span>");
							}
						});
						that.showChatMessages(response.messages,chatGUID);
					})
				break;
				default :
					var employerGUID = this.getEmployerGUID();
					chat.getEmployerChat(chatGUID,employerGUID,function(response){
						$.each(response.participants, function(){
							if(this.user !== null){
								threadInfoContainer.html("<span>"+this.user.firstname + " " + this.user.lastname +"</span> ");
								if(this.user.primaryWorkHistory !== null){
									threadInfoContainer.append(this.user.primaryWorkHistory.jobs[0].jobName + " @ "+this.user.primaryWorkHistory.employer.name);
								}
							}
						});
						that.showChatMessages(response.messages,chatGUID);
					});
				break;
			}
			
		},

		sendReply : function(chat){
			var date = new Date();
			var chatGUID = chat.guid;
			delete chat.guid;
			chat.sender = new Object();
			chat.sender.guid = App.session.get("guid");
			chat.sender.photo = App.session.get("photo");
			chat.sender.firstname = App.session.get("firstname");
			chat.sender.lastname = App.session.get("lastname");
			chat.chatMessageContent.updated = date.getTime();
			this.model.role === "user" ? chat.candidateSeen = true :chat.employerSeen = true;

			var container = $(this.el).find(".body .thread-view");
			var messagesContainer = $(container).find("ul.messages-list");
			var message = new ViewMessageRow({model : chat});
				messagesContainer.append(message.render().el);

			var chatModel = new ModelChat();
				chatModel.addChat(chat,chatGUID,function(response){
					//
				});	

		},

		showChatMessages : function(messages,chatGUID){
			this.slideViewRight();
			var role = this.model.role;

			var container = $(this.el).find(".body .thread-view");
				container.html('<ul class="messages-list"></ul>');

				var chat = new Object();
					chat.guid = chatGUID;

			this.messagesReply = new ViewMessagesReply({model : chat});
				container.append(this.messagesReply.render().el);

			this.listenTo(this.messagesReply, "sendReply", this.sendReply);

			var messagesContainer = $(container).find("ul.messages-list");
			$.each(messages,function(){
				this.role = role;
				var message = new ViewMessageRow({model : this});
				messagesContainer.append(message.render().el);
			});
		},

		slideViewRight : function(){
			var container = $(".messages-container");
			var width = container.width();
				container.animate({scrollLeft : width}, 150);
		},

		slideViewLeft: function(){
			var container = $(".messages-container");
			var width = -container.width();
				container.animate({scrollLeft : width}, 150);
		},

		getEmployerGUID : function(){
			var selectedEmployer = App.session.get("selectedEmployer");
			var employers = App.session.get("employers");
			var guid = employers[selectedEmployer].guid;
			return guid;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Messages"
			return jsonObject;
		}
		
	});

	return ViewMessages;
});