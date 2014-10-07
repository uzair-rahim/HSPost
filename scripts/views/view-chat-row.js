define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-chat-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var EmployerRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Chat row view initialized...");
		},

		onRender : function(){
			if(!this.model.seen){
				$(this.el).addClass("new");
			}
		},

		showActivityIndicator : function(){
			$(this.el).html(Utils.GetInlineActivityIndicator());
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.chat = this.model;
			return jsonObject;
		}
		
	});

	return EmployerRow;
});