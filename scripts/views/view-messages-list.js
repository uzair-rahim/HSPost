define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-messages-list",
		"../views/view-chat-row"
	],
	function($, App, Utils, Marionette, Template, ChatRow){
	"use strict";

	var MessagesList = Marionette.ItemView.extend({
		tagName : "div",
		className : "threads-list-container",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages list view initialized...");
		},

		onRender : function(){
			var that = this;
			var role = this.model.role;
			if(this.hasChats()){
				var container = $(this.el).find("ul.threads-list");
				var chats = this.model;
				$.each(chats,function(){
					var chatModel = this;
						chatModel.role = role
					var chat = new ChatRow({model : chatModel});
					$(container).append(chat.render().el);
					that.listenTo(chat, "selectChat", that.selectChat);
				});
			}
		},

		selectChat : function(chatGUID){
			this.trigger("selectChat", chatGUID);
		},

		hasChats : function(){
			var chats = this.model;
			return chats.length > 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasChats = this.hasChats();
			return jsonObject;
		}
		
	});

	return MessagesList;
});