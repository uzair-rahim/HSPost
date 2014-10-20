define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-people",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var People = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-endorsements"	: "showEndorsements",
			"click #tab-places" 		: "showPlaces"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("People view initialized...");
		},

		onShow : function(){

			if(this.hasReceivedRequests()){
				var received = this.options.models.received;
				var receivedContainer = $(this.el).find("ul#received.grid-list");
				$.each(received,function(){
					var data = new Object();
						data.user = Utils.GetFromUserFromConnectionRequest(this);
						data.user.userType = "connection";
						data.user.selectable = false;
					var user = new UserRow({model : data});
						$(receivedContainer).append(user.render().el);
				});
			}

			if(this.hasSentRequests()){
				var sent = this.options.models.sent;
				var sentContainer = $(this.el).find("ul#sent.grid-list");
				$.each(sent,function(){
					var data = new Object();
						data.user = Utils.GetToUserFromConnectionRequest(this);
						data.user.userType = "connection";
						data.user.selectable = false;
					var user = new UserRow({model : data});
						$(sentContainer).append(user.render().el);
				});
			}

			if(this.hasConnections()){
				var connections = this.options.models.connections;
				var connectionsContainer = $(this.el).find("ul#connections.grid-list");
				$.each(connections,function(){
					var data = new Object();
						data.user = this;
						data.user.userType = "connection";
						data.user.selectable = false;
					var user = new UserRow({model : data});
						$(connectionsContainer).append(user.render().el);
				});
			}

		},

		showEndorsements : function(event){
			App.router.navigate("connections", true);
		},

		showPlaces : function(event){
			App.router.navigate("places", true);
		},

		hasConnections : function(){
			var connections = this.options.models.connections;
			return connections.length > 0;
		},

		hasSentRequests : function(){
			var sent = this.options.models.sent;
			return sent.length > 0;
		},

		hasReceivedRequests : function(){
			var received = this.options.models.received;
			return received.length > 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasConnections = this.hasConnections();
				jsonObject.hasSentRequests = this.hasSentRequests();
				jsonObject.hasReceivedRequests = this.hasReceivedRequests();
				jsonObject.hasAnyConnections = this.hasConnections() || this.hasSentRequests() || this.hasReceivedRequests();
			return jsonObject;
		}
		
	});

	return People;
});