define([
		"backbone",
		"utils",
		"../models/model-job"
	],
	function(Backbone, Utils, Job){
		"use strict";

		var Jobs = Backbone.Collection.extend({
			model : Job,

			initialize : function(options){
				console.log("Jobs collection initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/job");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getJobs : function(guid, callback){
				var that = this;
				var url = this.urlRoot() + "/list/" + guid;
				$.ajax({
					type: "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching jobs");
					}
				});
			}
			
		});

		return Jobs;

	}
);