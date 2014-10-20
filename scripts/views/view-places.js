define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-places",
		"../views/view-employer-row"
	],
	function($, App, Utils, Marionette, Template, EmployerRow){
	"use strict";

	var Places = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click #tab-endorsements"	: "showEndorsements",
			"click #tab-people"			: "showPeople"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Places view initialized...");
		},

		onShow : function(){
			var places = this.options.model;
			var container = $(this.el).find("ul.grid-list");
			if(this.hasPlaces()){
				$.each(places,function(){
					var employer = new EmployerRow({model : this});
					$(container).append(employer.render().el);
				});
			}

		},

		showEndorsements : function(event){
			App.router.navigate("connections", true);
		},

		showPeople : function(event){
			App.router.navigate("people", true);
		},

		hasPlaces : function(){
			var places = this.options.model;
			return places.length !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.hasPlaces = this.hasPlaces();
			return jsonObject;
		}
		
	});

	return Places;
});