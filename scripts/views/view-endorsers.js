define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-endorsers",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ViewEndorsers = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-employees" : "showEmployees",
			"click #tab-followers" : "showFollowers"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Endorsers view initialized...");
		},

		onShow : function(){
			var endorser = this.options.model;
			var container = $(this.el).find(".grid-list");
			if(this.hasEndorsers()){
				$.each(endorser,function(){
					var user = new Object();
						user.userType = "endorser";
						user.user = this;
					var row = new UserRow({model : user});
					$(container).append(row.render().el);
				});
			}
		},

		showEmployees : function(event){
			App.router.navigate("network", true);
		},

		showFollowers : function(event){
			App.router.navigate("followers", true);
		},

		hasEndorsers : function(){
			return this.options.models !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEndorsers = this.hasEndorsers();
			return jsonObject;
		}
		
	});

	return ViewEndorsers;
});