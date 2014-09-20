define([
		"backbone",
		"utils",
		"../models/model-chat"
	],
	function(Backbone, Utils, Chat){
		"use strict";

		var Chats = Backbone.Collection.extend({
			model : Chat,

			initialize : function(options){
				console.log("Chats collection initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/chat");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			}
			
		});

		return Chats;

	}
);