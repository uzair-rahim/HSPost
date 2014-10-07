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

			// App Configurations
			AppConfig : {
				// Menu
				notification	: true,
				dashboard		: false,
				candidates		: true,
				jobs			: true,
				network			: true,
				profile			: true,
				messages		: true,
				settings		: true
			},

			// Get Default Route
			GetDefaultRoute : function(){
				if(this.AppConfig.dashboard){
					return "dashboard";
				}else{
					return 	"candidates";
				}
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
			},

			// Get Activity Indicator
			GetActivityIndicator : function(){
				return '<div class="activity-indicator"><div class="dot1"></div>  <div class="dot2"></div>  <div class="dot3"></div> </div>';
			},

			// Get Inline Activity Indicator
			GetInlineActivityIndicator : function(){
				return '<div class="activity-indicator inline"><div class="dot1"></div>  <div class="dot2"></div>  <div class="dot3"></div>  </div>';
			},

			GetDateTime : function(given){
				var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				var givenDate = new Date(given);
				var date = months[givenDate.getUTCMonth()] + " " + givenDate.getUTCDate();
				var hours = givenDate.getHours();
				var minutes = givenDate.getMinutes();
				var ampm = hours >= 12 ? 'pm' : 'am';
					hours = hours % 12;
					hours = hours ? hours : 12;
					minutes = minutes < 10 ? '0'+minutes : minutes;
				var time = hours+":"+minutes+ampm;
				
				return date + " - " + time;	
			},

			RemoveExistingContextMenus : function(){
				var contextMenus = $(document).find(".context-menu");
				$.each(contextMenus, function(){
					$(this).remove();
					$(this).unbind();
				});
			},

			GetFromUserFromConnectionRequest : function(data){
				var job = new Object();
					job.jobName = data.fromUserPrimaryWorkHistoryJob;

				var user = new Object();
					user.guid = data.fromUserGuid;
					user.firstname = data.fromUserFirstname;
					user.lastname = data.fromUserLastname;
					user.photo = new Object();
					user.photo.url = data.fromUserPhotoUrl;
					user.primaryWorkHistory = new Object();
					user.primaryWorkHistory.jobs = new Array();
					user.primaryWorkHistory.jobs.push(job);
					user.primaryWorkHistory.employer = new Object();
					user.primaryWorkHistory.employer.name = data.fromUserPrimaryWorkHistoryName;
				return user;
			},

			GetToUserFromConnectionRequest : function(data){
				var job = new Object();
					job.jobName = data.toUserPrimaryWorkHistoryJob;

				var user = new Object();
					user.guid = data.toUserGuid;
					user.firstname = data.toUserFirstname;
					user.lastname = data.toUserLastname;
					user.photo = new Object();
					user.photo.url = data.toUserPhotoUrl;
					user.primaryWorkHistory = new Object();
					user.primaryWorkHistory.jobs = new Array();
					user.primaryWorkHistory.jobs.push(job);
					user.primaryWorkHistory.employer = new Object();
					user.primaryWorkHistory.employer.name = data.toUserPrimaryWorkHistoryName;
				return user;
			},

		});

		var Utils = new AppUtils();

		return Utils;
	}
);