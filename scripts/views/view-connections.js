define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-connections"
	],
	function($, App, Utils, Marionette, Template){
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

		showContextMenu : function(event){
			var offset =$(event.target).offset();
			var xPosition ="14px";
			var yPosition = offset.top - 10 + "px";

			$.get("templates/template-context-menu-user.tpl", function(data){
				$(document).find("#app-content .content").append(data);
				$(".context-menu").css("right", xPosition).css("top", yPosition);
				$(".context-menu li#archive-user").remove();
				$(".context-menu li#see-referrals").remove();
			});

			event.stopPropagation();

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

		viewProfile : function(event){
			var guid = $(event.target).closest("li").attr("data-guid");
			if(typeof(guid) !== "undefined"){
				App.router.navigate("profile/"+guid, true);
			}
		},

		hasEndorsements : function(){
			var endorsements = this.options.models.endorsements;
			return endorsements.length !== 0;
		},

		hasConnections : function(){
			var connections = this.options.models.connections;
			return connections.length !== 0;
		},

		hasSentRequests : function(){
			var sent = this.options.models.sent;
			return sent.length !== 0;
		},

		hasReceivedRequests : function(){
			var received = this.options.models.received;
			return received.length !== 0;
		},

		hasPlaces : function(){
			var places = this.options.models.places;
			return places.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEndorsements = this.hasEndorsements();
				jsonObject.endorsements = this.options.models.endorsements;
				jsonObject.hasConnections = this.hasConnections();
				jsonObject.connections = this.options.models.connections;
				jsonObject.hasSentRequests = this.hasSentRequests();
				jsonObject.sent = this.options.models.sent;
				jsonObject.hasReceivedRequests = this.hasReceivedRequests();
				jsonObject.received = this.options.models.received;
				jsonObject.hasAnyConnections = this.hasConnections() || this.hasSentRequests() || this.hasReceivedRequests();
				jsonObject.hasPlaces = this.hasPlaces();
				jsonObject.places = this.options.models.places;
			return jsonObject;
		}
		
	});

	return Connections;
});