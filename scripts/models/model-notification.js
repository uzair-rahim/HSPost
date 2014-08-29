define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Notification = Backbone.Model.extend({

			defaults : {
				title				: null,
				description			: null,
				imageURL			: null,
				secondaryImageURL	: null
			},

			initialize : function(options){
				console.log("Notification model initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/notification");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			}

		});

		return Notification;
	}
);