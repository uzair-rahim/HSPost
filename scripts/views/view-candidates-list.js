define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-candidates-list",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var CandidatesList = Marionette.ItemView.extend({
		tagName : "div",
		className : "",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Candidates list view initialized...");
		},

		onRender : function(){
			var container = $(this.el).find("ul.grid-list");
			$.each(this.model.candidates, function(){
				if(!this.archived){
					this.userType = "candidate";
					var user = new UserRow({model : this});
					$(container).append(user.render().el);
				}
			});
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.job = this.model;
			return jsonObject;
		}
		
	});

	return CandidatesList;
});