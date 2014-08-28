define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-employer-network"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewEmployerNetwork = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Employer Network view initialized...");
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.employees = new Object();
				jsonObject.followers = new Object();
				jsonObject.endorsers = new Object();
				jsonObject.template.title = "Network"
				jsonObject.employees = this.model.employees;
				jsonObject.followers = this.model.followers;
				jsonObject.endorsers = this.model.endorsers;
			return jsonObject;
		}
		
	});

	return ViewEmployerNetwork;
});