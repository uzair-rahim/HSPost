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
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Connections view initialized...");
		},

		hasConnections : function(){
			var connections = this.options.models;
			return connections.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "My Connections"
				jsonObject.hasConnections = this.hasConnections();
				jsonObject.connections = this.options.models
			return jsonObject;
		}
		
	});

	return Connections;
});