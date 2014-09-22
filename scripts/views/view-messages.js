define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"../models/model-chat",
		"../collections/collection-chats",
		"hbs!/HSPost/templates/template-view-messages"
	],
	function($, App, Utils, Marionette, ModelChat, CollectionChats, Template){
	"use strict";

	var ViewMessages = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		chats : null,
		events : {
			"click .threads-list > li"	: "showThreadMessages",
			"click .thread-info"		: "showThreadList",
			"click #reply-button"		: "sendReply"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages view initialized...");
		},

		onShow : function(){
			this.chats = new CollectionChats(this.options.model);
			var container = $(".messages-container");
				container.height($(window).height() - 110);

			$(document.body).undelegate("#reply-field","keyup");
			$(document.body).delegate("#reply-field","keyup",function(){
				var maxCharacterLength = 1000;
				if($(this).val().length > maxCharacterLength) {  
	            	$(this).val($(this).val().substring(0, maxCharacterLength));
	        	}

	        	var replyButton = $(document).find("#reply-button");
	        	if($(this).val().length > 0){
	        		replyButton.prop("disabled", false);
	        	}else{
	        		replyButton.prop("disabled", true);
	        	}
			});
		},

		showThreadMessages : function(event){
			var threads = $(".threads-list > li");
				threads.removeClass("selected");
			var selectedThread = $(event.target).closest("li");
				selectedThread.addClass("selected");
			var chatID = selectedThread.attr("id");
			var chat = this.chats.get(chatID);
			var chatGUID = chat.getChatGUID();
			var userGUID = App.session.get("guid");
			var jobName = chat.getJobName();
			var employerName = chat.getEmployerName();
			var container = $(".messages-container");
			var threadInfo = $(".thread-info");
				threadInfo.html('<span>'+jobName+'</span> @ '+employerName);
				container.animate({scrollLeft : container.width()}, 150);
			var threadView = $(".thread-view");
				threadView.html(Utils.GetInlineLoadingAnimationTemplate());

			var that = this;
			chat.getUserChat(chatGUID,userGUID,function(data){
				threadView.html(that.GetMessagesTemplate(data));
				$(document).find(".messages-list").scrollTop($(".messages-list").prop("scrollHeight"));

				if(selectedThread.hasClass("new")){
					if(that.options.model.role == "user"){
						chat.updateChatMessageAsSeenByUser(chatGUID, function(){
							selectedThread.removeClass("new");
						});
					}else{
						chat.updateChatMessageAsSeenByEmployer(chatGUID, function(){
							selectedThread.removeClass("new");
						});
					}
				}

			});
		},

		appendThreadMessage : function(data){

		},

		showThreadList : function(){
			var threads = $(".threads-list > li");
				threads.removeClass("selected");
			var container = $(".messages-container");
				container.animate({scrollLeft : -container.width()}, 150, function(){
					var html = '<div class="blank-view">This blank message helps protect your privacy. Select a thread from the list to view messages.</div>';	
					var threadView = $(".thread-view");	
						threadView.html(html);
				});
		},

		GetMessagesTemplate : function(data){
			var that = this;
			var html  = '<ul class="messages-list">';
				$.each(data.messages, function(){
					var status = "";
					var align = "";
					var date = Utils.GetDateTime(this.chatMessageContent.created);
					if(that.options.model.role == "user"){
						if(!this.candidateSeen){
							status = "new";
						}
					}else{
						if(!this.employerSeen){
							status = "new";
						}
					}
					if(App.session.get("guid") !== this.sender.guid){
						align = "right";
					}
					html += '<li class="'+status+' '+align+'">';
						html += '<div class="picture">';
							if(this.sender.photo !== null){
								html += '<img src="'+this.sender.photo.url+'"/>';
							}
						html += '</div>';
						html += '<div class="text">';
							html += '<div class="name">'+this.sender.firstname+' '+this.sender.lastname+'</div>';
							html += '<div class="message">'+this.chatMessageContent.text+'</div>';
							html += '<div class="date">'+date+'</div>';
						html += '</div>';
					html += '</li>';
				});
				html += '</ul>';
				html += '<div class="reply-view"><textarea id="reply-field" placeholder="Send a message..."></textarea><button id="reply-button" class="primary" data-guid="'+data.guid+'" disabled="true">Send</button></div>';
			return html;	
		},

		GetAppendMessageTemplate : function(data){
			var date = Utils.GetDateTime(data.chatMessageContent.updated);
			var html = '<li>';
					html += '<div class="picture">';
						if(data.sender.photo !== null){
							html += '<img src="'+data.sender.photo.url+'"/>';
						}
					html += '</div>';
					html += '<div class="text">';
						html += '<div class="name">'+data.sender.firstname+' '+data.sender.lastname+'</div>';
						html += '<div class="message">'+data.chatMessageContent.text+'</div>';
						html += '<div class="date">'+date+'</div>';
					html += '</div>';
				html += '</li>';
			return html;
		},

		sendReply : function(event){
			var chatGUID = $(event.target).attr("data-guid");
			var senderGUID = App.session.get("guid");
			var senderRole = this.options.model.role;
			var chatMessage = $("#reply-field").val();

			var message = new Object();
				message.sender = new Object();
				message.sender.guid = senderGUID;
				message.chatMessageContent = new Object();
				message.chatMessageContent.text = chatMessage;
				if(senderRole == "user"){
					message.candidateSeen = new Object();
					message.candidateSeen = true;
				}else{
					message.employerSeen = new Object();
					message.employerSeen = true;
				}

			$("#reply-button").prop("disabled", true);

			var that = this;
			var chat = new ModelChat();
				chat.addChat(message,chatGUID, function(data){
					var messagesList = $(document).find(".messages-list");	
						messagesList.find("li").removeClass("new");
						messagesList.append(that.GetAppendMessageTemplate(data));
						messagesList.scrollTop($(".messages-list").prop("scrollHeight"));
					$("#reply-field").val("");
				});

		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Messages"
				jsonObject.chatList = new Object();
				jsonObject.chatList = this.options.model;
				jsonObject.role = this.options.model.role;
			return jsonObject;
		}
		
	});

	return ViewMessages;
});