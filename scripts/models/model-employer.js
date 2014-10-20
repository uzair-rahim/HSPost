define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Employer = Backbone.Model.extend({

			defaults : {
				id			: null,
				guid		: null,
				name		: null,
				location	: null,
				phone		: null,
				url 		: null,
				email 		: null,
				logo		: null,
				about		: null,
				ppa 		: null,
				hours		: null,
				preferences	: null,
				externaIDs	: null,
				admins		: null,
				currency	: null,
				claimed		: null
			},

			initialize : function(options){
				console.log("Employer model initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/employer");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getEmployees : function(callback){
				var that = this;
				var url = this.urlRoot() + "/" + this.attributes.guid + "/employees";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getFollowers : function(callback){
				var that = this;
				var url = this.urlRoot() + "/" + this.attributes.guid + "/followers";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getEndorsers : function(callback){
				var that = this;
				var url = this.urlRoot() + "/" + this.attributes.guid + "/endorsements";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getCandidatesByEmployer : function(employerGUID,start,rows,archived,callback){
				var that = this;
				var url = this.urlRoot() + "/" + employerGUID + "/candidates?start=" + start + "&rows=" + rows + "&archived=" + archived;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching candidates");
					}
				});
			}
		
		});

		return Employer;
	}
);