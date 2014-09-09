define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-employer-settings"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewEmployerSettings = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-account-settings"	: "showAccountSettings",
			"click #tab-employer-settings"	: "showEmployerSettings"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Employer Settings view initialized...");
		},

		showAccountSettings : function(event){
			this.hidePanels();
			var panel = $("#panel-account-settings");
				panel.addClass("show");
			var tab = $(event.target).closest("ul.tabs li");
				tab.addClass("selected");
		},

		showEmployerSettings : function(event){
			this.hidePanels();
			var panel = $("#panel-employer-settings");
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

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Settings"
			return jsonObject;
		}
		
	});

	return ViewEmployerSettings;
});