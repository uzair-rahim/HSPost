define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"../collections/collection-chats",
		"hbs!/HSPost/templates/template-view-messages"
	],
	function($, App, Utils, Marionette, CollectionChats, Template){
	"use strict";

	var ViewMessages = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		chats : null,
		events : {
			"click .threads-list > li" : "showThreadMessages",
			"click .thread-info" 		: "showThreadList"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages view initialized...");
		},

		onShow : function(){
			this.chats = new CollectionChats(this.options.model);
			var container = $(".messages-container");
				container.height($(window).height() - 110);
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
			});
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
			var html  = '<ul class="messages-list">';
				$.each(data.messages, function(){
					var status = "";
					var align = "";
					var date = Utils.GetDateTime(this.chatMessageContent.created);
					if(!this.candidateSeen){
						status = "new";
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
				html += '<div class="reply-view"><textarea id="reply-field" placeholder="Send a message..."></textarea><button id="reply-button" class="primary" data-guid="'+data.guid+'">Send</button></div>';
			return html;	
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Messages"
				jsonObject.chatList = new Object();
				jsonObject.chatList = this.options.model;
				jsonObject.role = this.options.model.role;
				console.log(jsonObject);
			return jsonObject;
		}
		
	});

	return ViewMessages;
});