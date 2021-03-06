define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-profile",
		"../models/model-user",
		"../models/model-network"
	],
	function($, App, Utils, Marionette, Template, ModelUser, ModelNetwork){
	"use strict";

	var ViewProfile = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click button#endorse"		: "endorseUser",
			"click button#retract"		: "retractEndorsement",
			"click button#connect"		: "connectUser",
			"click button#disconnect"	: "disconnectUser"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Profile view initialized...");
		},

		getFirstName : function(){
			var firstname = this.options.model.user.firstname + "'";
			var lastCharacter = firstname.substr(firstname.length - 2, 1);
			if(lastCharacter !== "s"){
				firstname += "s"
			}
			return firstname;
		},

		endorseUser : function(){
			var endorsedUserGUID = this.options.model.user.guid;
			var endorsingUser = new Object();
				endorsingUser.guid = App.session.get("guid");
			
			var user = new ModelUser();
				user.endorse(endorsedUserGUID,endorsingUser,function(data){
					Backbone.history.loadUrl(Backbone.history.fragment);
				});
		},

		retractEndorsement : function(){
			var endorsedUserGUID = this.options.model.user.guid;
			var	endorsingUserGUID = App.session.get("guid");
			
			var user = new ModelUser();
				user.retractEndorsement(endorsedUserGUID,endorsingUserGUID,function(data){
					Backbone.history.loadUrl(Backbone.history.fragment);
				});
		},

		connectUser : function(){
			var connection = new Object();
				connection.toUserGuid = this.options.model.user.guid;
				connection.fromUserGuid = App.session.get("guid");

			var network = new ModelNetwork();
				network.createConnection(connection,function(data){
					Backbone.history.loadUrl(Backbone.history.fragment);
				});	
		},

		disconnectUser : function(){

		},

		isEndorsed : function(){
			var returnValue = false;
			var endorsements = this.options.model.endorsements;
			var userGUID = App.session.get("guid");
			$.each(endorsements, function(){
				if(this.guid == userGUID){
					returnValue = true;
				}
			});

			return returnValue;
		},

		isConnected : function(){
			var returnValue = false;
			var connections = this.options.model.connections;
			var userGUID = App.session.get("guid");
			$.each(connections, function(){
				if(this.guid == userGUID){
					returnValue = true;
				}
			});

			return returnValue;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				if(App.session.get("guid") === this.options.model.user.guid){
					jsonObject.template.title = "My Profile"
					jsonObject.template.self = true;
				}else{
					jsonObject.template.title = this.getFirstName() + " Profile";
					jsonObject.template.self = false;
				}
				jsonObject.user = new Object();
				jsonObject.user = this.options.model.user;
				jsonObject.user.endorsements = new Object();
				jsonObject.user.endorsements = this.options.model.endorsements;
				jsonObject.user.isEndorsed = this.isEndorsed();
				jsonObject.user.connections = new Object();
				jsonObject.user.connections = this.options.model.connections;
				jsonObject.user.isConnected = this.isConnected();
			return jsonObject;
		}
		
	});

	return ViewProfile;
});