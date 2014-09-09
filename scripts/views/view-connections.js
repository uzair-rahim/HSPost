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
			"click #tab-places" 		: "showPlaces"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Connections view initialized...");
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
			return endorsements.length !== 0;
		},

		hasConnections : function(){
			var connections = this.options.models.connections;
			return connections.length !== 0;
		},

		hasPlaces : function(){
			var places = this.options.models.places;
			return places.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEndorsements = this.hasEndorsements();
				jsonObject.endorsements = this.options.models.endorsements
				jsonObject.hasConnections = this.hasConnections();
				jsonObject.connections = this.options.models.connections
				jsonObject.hasPlaces = this.hasPlaces();
				jsonObject.places = this.options.models.places
			return jsonObject;
		}
		
	});

	return Connections;
});