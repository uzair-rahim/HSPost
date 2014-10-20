define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-followers",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ViewFollowers = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-employees" : "showEmployees",
			"click #tab-endorsers" : "showEndorsers"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Followers view initialized...");
		},

		onShow : function(){
			var follower = this.options.model;
			var container = $(this.el).find(".grid-list");
			if(this.hasFollowers()){
				$.each(follower,function(){
					var user = new Object();
						user.user = this;
						user.user.userType = "follower";
						user.user.selectable = true;
					var row = new UserRow({model : user});
					$(container).append(row.render().el);
				});
			}
		},

		showEmployees : function(event){
			App.router.navigate("network", true);
		},

		showEndorsers : function(event){
			App.router.navigate("endorsers", true);
		},

		hasFollowers : function(){
			return this.options.model.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasFollowers = this.hasFollowers();
			return jsonObject;
		}
		
	});

	return ViewFollowers;
});