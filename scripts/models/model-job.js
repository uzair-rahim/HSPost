define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Job = Backbone.Model.extend({

			defaults : {
				candidates				: null,
				created					: null,
				createdBy				: null,
				currentUserIsCandidate	: null,
				description				: null,
				employer				: null,
				guid					: null,
				id						: null,
				jobName					: null,
				jobType					: null,
				referralBonus			: null,
				referrals				: null,
				shares					: null,
				shifts					: null,
				status					: null,
				tinyurl					: null,
				updated					: null,
				updatedBy				: null,
				wage					: null,
				wageType				: null

			},

			initialize : function(options){
				console.log("Job model initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/job");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getUnarchivedCandidates : function(callback){
				var guid = this.attributes.guid;
				var url = this.urlRoot() + "/"+ guid + "/candidates";
				console.log(url);
			},
		
		});

		return Job;
	}
);