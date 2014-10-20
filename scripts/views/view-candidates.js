define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-candidates",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ViewCandidates = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-archived" : "showArchivedCandidates"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Candidates view initialized...");
		},

		onShow : function(){
			var candidates = this.options.models;
			var container = $(this.el).find("ul.grid-list");
			if(this.hasCandidates()){
				$.each(candidates,function(){
					this.user.userType = "candidate";
					this.user.selectable = true;
					var user = new UserRow({model : this});
					$(container).append(user.render().el);
				});
			}
		},

		showArchivedCandidates : function(event){
			App.router.navigate("archivedCandidates", true);
		},

		hasCandidates : function(){
			var candidates = this.options.models;
			return candidates.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Candidates";
				jsonObject.hasCandidates = this.hasCandidates();
			return jsonObject;
		}
		
	});

	return ViewCandidates;
});