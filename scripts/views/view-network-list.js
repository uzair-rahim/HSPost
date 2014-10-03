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
			$.each(this.model.users, function(){
				var network = new Object();
					network.user = this;
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