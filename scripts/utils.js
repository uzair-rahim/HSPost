define([
		"jquery",
		"jquerycookie",
		"backbone"
	],
	function($, Cookie, Backbone){
		var AppUtils = Backbone.Model.extend({

			// Get URL
			GetURL : function(url){
				//return this.CONTEXT + url;
				return "../services" + url;
			},

		});

		var Utils = new AppUtils();

		return Utils;
	}
);