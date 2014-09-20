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
			"click .messages-list > li" : "showThreadMessages",
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
			var chatID = $(event.target).closest("li").attr("id");
			var chat = this.chats.get(chatID);
			var chatGUID = chat.getChatGUID();
			var userGUID = App.session.get("guid");
			var jobName = chat.getJobName();
			var employerName = chat.getEmployerName();
			var container = $(".messages-container");
			var threadInfo = $(".thread-info");

				threadInfo.html('<span>'+jobName+'</span> @ '+employerName);
				container.animate({scrollLeft : container.width()}, 150);

			chat.getUserChat(chatGUID,userGUID,function(data){
				console.log(data);
			});
		},

		showThreadList : function(){
			var container = $(".messages-container");
			container.animate({scrollLeft : -container.width()}, 150);
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Messages"
				jsonObject.chatList = new Object();
				jsonObject.chatList = this.options.model;
			return jsonObject;
		}
		
	});

	return ViewMessages;
});