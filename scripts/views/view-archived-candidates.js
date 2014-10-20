define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-archived-candidates",
		"../views/view-user-row"
	],
	function($, App, Utils, Marionette, Template, UserRow){
	"use strict";

	var ViewArchivedCandidates = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-recent" : "showRecentCandidates"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Archived Candidates view initialized...");
		},

		onShow : function(){
			var candidates = this.options.models;
			var container = $(this.el).find(".grid-list");
			if(this.hasCandidates()){
				$.each(candidates,function(){
					var user = new UserRow({model : this});
					$(container).append(user.render().el);
				});
			}
		},

		showRecentCandidates : function(event){
			App.router.navigate("candidates", true);
		},

		hasCandidates : function(){
			var candidates = this.options.models;
			return candidates.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Archived Candidates";
				jsonObject.hasCandidates = this.hasCandidates();
			return jsonObject;
		}
		
	});

	return ViewArchivedCandidates;
});