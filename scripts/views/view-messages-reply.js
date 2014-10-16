define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-messages-reply"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var MessagesReply = Marionette.ItemView.extend({
		tagName : "div",
		className : "reply-view",
		template: Template,
		message : null,
		events : {
			"keyup #reply-field" 	: "changeReplyField",
			"click #reply-button"	: "sendReply"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages Reply view initialized...");
		},

		onRender : function(){

		},

		changeReplyField : function(event){
			if($(event.target).val().length > Utils.MAX_CHAT_MESSAGE_LENGTH){
				$(event.target).val(this.message.substring(0,Utils.MAX_CHAT_MESSAGE_LENGTH));
			}
			this.message = $.trim($(event.target).val());
			this.message.length > 0 ? $("#reply-button").prop("disabled", false) : $("#reply-button").prop("disabled", true);
		},

		sendReply : function(){
			var chat = {
				"guid" : this.model.guid,
				"chatMessageContent" : { 
					"text" : this.message
				}
			}
			this.trigger("sendReply",chat);
			this.clearReplyField();
		},

		clearReplyField : function(){
			this.message = "";
			$("#reply-field").val("");
			$("#reply-button").prop("disabled", true);
		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return MessagesReply;
});