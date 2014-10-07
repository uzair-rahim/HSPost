define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-connections",
		"../views/view-user-row",
		"../views/view-employer-row"
	],
	function($, App, Utils, Marionette, Template, UserRow, EmployerRow){
	"use strict";

	var Connections = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-endorsements"	: "showEndorsements",
			"click #tab-people" 		: "showPeople",
			"click #tab-places" 		: "showPlaces",
			"click .column.more"		: "showContextMenu",
			"click .grid-list > li" 	: "viewProfile"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Connections view initialized...");
		},

		onShow : function(){
			if(this.hasEndorsements()){
				var endorsements = this.options.models.endorsements;
				var endorsementsContainer = $(this.el).find("#panel-endorsements ul.grid-list");
				$.each(endorsements,function(){
					var data = new Object();
						data.user = this;
					var user = new UserRow({model : data});
						$(endorsementsContainer).append(user.render().el);
				});
			}

			if(this.hasReceivedRequests()){
				var received = this.options.models.received;
				var receivedContainer = $(this.el).find("#panel-people ul#received.grid-list");
				$.each(received,function(){
					var data = new Object();
						data.user = Utils.GetFromUserFromConnectionRequest(this);
					var user = new UserRow({model : data});
						$(receivedContainer).append(user.render().el);
				});
			}

			if(this.hasSentRequests()){
				var sent = this.options.models.sent;
				var sentContainer = $(this.el).find("#panel-people ul#sent.grid-list");
				$.each(sent,function(){
					var data = new Object();
						data.user = Utils.GetToUserFromConnectionRequest(this);
					var user = new UserRow({model : data});
						$(sentContainer).append(user.render().el);
				});
			}

			if(this.hasConnections()){
				var connections = this.options.models.connections;
				var connectionsContainer = $(this.el).find("#panel-people ul#connections.grid-list");
				$.each(connections,function(){
					var data = new Object();
						data.user = this;
					var user = new UserRow({model : data});
						$(connectionsContainer).append(user.render().el);
				});
			}

			if(this.hasPlaces()){
				var places = this.options.models.places;
				var placesContainer = $(this.el).find("#panel-places ul.grid-list");
				$.each(places,function(){
					var employer = new EmployerRow({model : this});
						$(placesContainer).append(employer.render().el);
				});
			}

		},

		showEndorsements : function(event){
			this.hidePanels();
			var panel = $("#panel-endorsements");
				panel.addClass("show");
			var tab = $(event.target).closest("ul.tabs li");
				tab.addClass("selected");
		},

		showPeople : function(event){
			this.hidePanels();
			var panel = $("#panel-people");
				panel.addClass("show");
			var tab = $(event.target).closest("ul.tabs li");
				tab.addClass("selected");
		},

		showPlaces : function(event){
			this.hidePanels();
			var panel = $("#panel-places");
				panel.addClass("show");
			var tab = $(event.target).closest("ul.tabs li");
				tab.addClass("selected");
		},

		hidePanels : function(){
			var panels = $(".panel");
				panels.removeClass("show");
			var tabs = $("ul.tabs li");
				tabs.removeClass("selected");
		},

		hasEndorsements : function(){
			var endorsements = this.options.models.endorsements;
			return endorsements.length > 0;
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

		hasPlaces : function(){
			var places = this.options.models.places;
			return places.length > 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEndorsements = this.hasEndorsements();
				jsonObject.hasConnections = this.hasConnections();
				jsonObject.hasSentRequests = this.hasSentRequests();
				jsonObject.hasReceivedRequests = this.hasReceivedRequests();
				jsonObject.hasAnyConnections = this.hasConnections() || this.hasSentRequests() || this.hasReceivedRequests();
				jsonObject.hasPlaces = this.hasPlaces();
			return jsonObject;
		}
		
	});

	return Connections;
});