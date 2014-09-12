define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-network"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewNetwork = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click .column.more"	: "showContextMenu",
			"click .grid-list > li" : "viewProfile"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Network view initialized...");
		},

		showContextMenu : function(event){
			var offset =$(event.target).offset();
			var xPosition ="14px";
			var yPosition = offset.top - 10 + "px";

			$.get("templates/template-context-menu-user.tpl", function(data){
				$(document).find("#app-content .content").append(data);
				$(".context-menu").css("right", xPosition).css("top", yPosition);
			});

			event.stopPropagation();

		},

		viewProfile : function(event){
			var guid = $(event.target).closest("li").attr("data-guid");
			if(typeof(guid) !== "undefined"){
				App.router.navigate("profile/"+guid, true);
			}
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.employees = new Object();
				jsonObject.followers = new Object();
				jsonObject.endorsers = new Object();
				jsonObject.template.title = "Network"
				jsonObject.employees = this.model.employees;
				jsonObject.followers = this.model.followers;
				jsonObject.endorsers = this.model.endorsers;
			return jsonObject;
		}
		
	});

	return ViewNetwork;
});