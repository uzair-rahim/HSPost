define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-user-row",
		"../views/view-context-menu-user",
	],
	function($, App, Utils, Marionette, Template, ContextMenuUser){
	"use strict";

	var UserRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "tall",
		template: Template,
		events : {
			"click" 				: "viewProfile",
			"click div.column.more"	: "showContextMenu"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("User row view initialized...");
		},

		viewProfile : function(){
			App.router.navigate("profile/"+this.model.user.guid, true);
		},

		showContextMenu : function(event){
			var offset = $(event.target).offset();
			var xPosition ="14px";
			var yPosition = offset.top - 10 + "px";

			var container = $("#app-content .content");

			var options = new Object();
				options.xPosition = xPosition;
				options.yPosition = yPosition;
				options.userType = this.model.userType;

			Utils.RemoveExistingContextMenus();

			var contextMenu = new ContextMenuUser({model : options});
				$(container).append(contextMenu.render().el);

				this.listenTo(contextMenu, "contextMenuAction", this.contextMenuAction);

			event.stopPropagation();	
		},

		contextMenuAction : function(action){
			switch(action){
				case "archive-user":
					this.archiveUser();
				break;
				case "connect": 
					this.connect();
				break;
				case "see-connections": 
					this.seeConnections();
				break;
				case "see-endorsements": 
					this.seeEndorsements();
				break;
				case "see-referrals": 
					this.seeReferrals();
				break;
				case "send-message": 
					this.sendMessage();
				break;
			};
		},

		archiveUser : function(){
			var user = this.model;
			console.log(user);
		},

		connect : function(){
			var user = this.model;
			console.log(user);
		},

		seeConnections : function(){
			var user = this.model;
			console.log(user);
		},

		seeEndorsements : function(){
			var user = this.model;
			console.log(user);
		},

		seeReferrals : function(){
			var user = this.model;
			console.log(user);
		},

		sendMessage : function(){
			var user = this.model;
			console.log(user);
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.user = this.model.user;
			return jsonObject;
		}
		
	});

	return UserRow;
});