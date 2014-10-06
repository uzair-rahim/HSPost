define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-network-list",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var NetworkList = Marionette.ItemView.extend({
		tagName : "div",
		className : "",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Network list view initialized...");
		},

		onRender : function(){
			var container = $(this.el).find("ul.grid-list");
			var that = this.model;
			$.each(this.model.users, function(){
				var network = new Object();
					network.user = this;
					switch(that.name){
						case "Employees":
							network.userType = "employee";
						break;
						case "Followers":
							network.userType = "follower";
						break;
						case "Endorsers":
							network.userType = "endorser";
						break;
					}
				var user = new UserRow({model : network});
				$(container).append(user.render().el);
			});
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.network = this.model.name;
				jsonObject.users = this.model.users;
			return jsonObject;
		}
		
	});

	return NetworkList;
});