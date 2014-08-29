define([
		"backbone",
		"utils",
		"../models/model-notification"
	],
	function(Backbone, Utils, Notification){
		"use strict";

		var Notifications = Backbone.Collection.extend({
			model : Notification,

			initialize : function(options){
				console.log("Notifications collection initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getUserNotifications : function(guid, callback){
				var that = this;
				var url = this.urlRoot() + "/user/" + guid + "/notifications";
				$.ajax({
					type: "GET",
					url : url,
					success : function(response){
						callback(response);
						// { totalNotifications : 0, totalTypes : 0, results: Array[0] }
					},
					error : function(){
						console.log("Error fetching notifications");
					}
				});
			},
			
		});

		return Notifications;

	}
);