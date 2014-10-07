define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-employer-row"
	],
	function($, App, Utils, Marionette, Template){
	"use strict";

	var EmployerRow = Marionette.ItemView.extend({
		tagName : "li",
		className : "tall",
		template: Template,
		events : {
			"click div.column.more" : "showContextMenu"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Employer row view initialized...");
		},

		showActivityIndicator : function(){
			$(this.el).html(Utils.GetInlineActivityIndicator());
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.employer = this.model;
			return jsonObject;
		}
		
	});

	return EmployerRow;
});