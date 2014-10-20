define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-endorsements",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var Endorsements = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-people" 		: "showPeople",
			"click #tab-places" 		: "showPlaces"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Endorsements view initialized...");
		},

		onShow : function(){
			var endorsements = this.options.model;
			var container = $(this.el).find("ul.grid-list");
			if(this.hasEndorsements()){
				$.each(endorsements,function(){
					var data = new Object();
						data.user = this;
						data.user.userType = "endorsement";
						data.user.selectable = false;
					var user = new UserRow({model : data});
					$(container).append(user.render().el);
				});
			}

		},

		showPeople : function(event){
			App.router.navigate("people", true);
		},

		showPlaces : function(event){
			App.router.navigate("places", true);
		},

		hasEndorsements : function(){
			var endorsements = this.options.model;
			return endorsements.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasEndorsements = this.hasEndorsements();
			return jsonObject;
		}
		
	});

	return Endorsements;
});