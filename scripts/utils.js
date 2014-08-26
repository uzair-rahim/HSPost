define([
		"jquery",
		"jquerycookie",
		"backbone"
	],
	function($, Cookie, Backbone){
		var AppUtils = Backbone.Model.extend({

			// Regular Expressions
			RegularExpressions : {
				alpha 			: /^[A-Za-z]/,
				alphanumeric 	: /^[A-Za-z0-9]/,
				date 			: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
				email 			: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
				numeric 		: /^[0-9]+$/,
				phone 			: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
				wholenumber 	: /^\d+$/,
				zip 			: /(^\d{5}$)|(^\d{5}-\d{4}$)/
			},

			// Get URL
			GetURL : function(url){
				//return this.CONTEXT + url;
				return "../services" + url;
			},

			// Show toast message
			ShowToast : function(options){
				var defaults = {
					message : "An error occured"
				}

				if(typeof(options) === "undefined"){
					options = {};
				}

				for(var key in defaults){
					if(typeof(options[key]) === "undefined"){
						options[key] = defaults[key];
					}
				}

				$("#app-toast").addClass("show").find(".message").text(options.message);

				var remove = setTimeout(function(){
					$(document).find("#app-toast").removeClass("show");
				}, 4000);

			},

			HideToast : function(){
				$(document).find("#app-toast").removeClass("show");
				$(document).find("#app-toast .message").text("");
			},

			// Show modal overlay
			ShowModal : function(){
				var modal = $("#app-modal");
				var isVisible = modal.hasClass("show");
				if(!isVisible){
					modal.addClass("show");
				}
			},

			// Hide modal overlay
			HideModal : function(){
				var modal = $("#app-modal");
				var isVisible = modal.hasClass("show");
				if(isVisible){
					modal.removeClass("show");	
				}
			},

			// Show relogin dialog
			ShowReloginDialog : function(){
				var dialog = $("#app-relogin");
				var isVisible = $(dialog).hasClass("show");
				if(!isVisible){
					dialog.addClass("show");
				}
			},

			// Hide relogin dialog
			HideReloginDialog : function(){
				var dialog = $("#app-relogin");
				var isVisible = $(dialog).hasClass("show");
				if(isVisible){
					dialog.removeClass("show");
				}
			}

		});

		var Utils = new AppUtils();

		return Utils;
	}
);