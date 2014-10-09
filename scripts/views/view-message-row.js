define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-message-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var MessageRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Message row view initialized...");
		},

		onRender : function(){
			var userGUID = App.session.get("guid");
			if(this.model.sender.guid === userGUID){
				$(this.el).addClass("right");
			}

			var role = this.model.role;
			switch(role){
				case "user" :
					if(!this.model.candidateSeen){
						$(this.el).addClass("new");
					}
				break;
				default : 
					if(!this.model.employerSeen){
						$(this.el).addClass("new");
					}	
				break;
			}
			
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.message = this.model;
			return jsonObject;
		}
		
	});

	return MessageRow;
});