define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-employees",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ViewEmployees = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-followers" : "showFollowers",
			"click #tab-endorsers" : "showEndorsers"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Employees view initialized...");
		},

		onShow : function(){
			var employee = this.options.model;
			var container = $(this.el).find(".grid-list");
			if(this.hasEmployees()){
				$.each(employee,function(){
					var user = new Object();
						user.user = this;
					var row = new UserRow({model : user});
					$(container).append(row.render().el);
				});
			}
		},

		showFollowers : function(event){
			App.router.navigate("followers", true);
		},

		showEndorsers : function(event){
			App.router.navigate("endorsers", true);
		},

		hasEmployees : function(){
			return this.options.models !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEmployees = this.hasEmployees();
			return jsonObject;
		}
		
	});

	return ViewEmployees;
});