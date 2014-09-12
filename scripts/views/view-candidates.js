define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-candidates"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var ViewCandidates = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			"click .column.more"	: "showContextMenu",
			"click .grid-list > li" : "viewProfile"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Candidates view initialized...");
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

		hasCandidates : function(){
			var jobs = this.options.models;

			if(jobs.length === 0){
				return false;
			}

			var totalCandidates = 0;

			$.each(jobs, function(){
				totalCandidates += this.candidates.length;
			});

			return totalCandidates !== 0;
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
				jsonObject.template.title = "Candidates";
				jsonObject.hasCandidates = this.hasCandidates();
				jsonObject.jobs = this.options.models;
			return jsonObject;
		}
		
	});

	return ViewCandidates;
});