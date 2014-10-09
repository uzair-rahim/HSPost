define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-messages-view"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var MessagesView = Marionette.ItemView.extend({
		tagName : "div",
		className : "thread-view",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Messages view view initialized...");
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

	return MessagesView;
});