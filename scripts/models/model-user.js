define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var User = Backbone.Model.extend({

			defaults : {
				about : null,
				accountState : null,
				adminEmployers : null,
				email : null,
				emails : null,
				employerIDs : null,
				endorsedEmployerIDs : null,
				firstname : null,
				followedEmployerIDs : null,
				guid : null,
				id : null,
				lastname : null,
				location : null,
				photo : null,
				placesWorked : null,
				primaryWorkHistory : null,
				returning : null,
				roles : null,
				verified : null
			},

			initialize : function(options){
				console.log("User model initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/user");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getUser : function(callback){
				var url = this.urlRoot() + "/" + this.attributes.guid;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getProfilePhoto : function(callback){
				var url = this.urlRoot() + "/" + this.attributes.guid + "/profilePhoto" ;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(response){
						var error = response.responseJSON;
						switch(error.errorCode){
							case 4:
								callback(null);
							break;
						}

					}
				});
			},

			getPrimaryWorkHistory : function(callback){
				var url = this.urlRoot() + "/" + this.attributes.guid + "/workHistory/primary";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(response){
						var error = response.responseJSON;
						switch(error.errorCode){
							case 4:
								callback(null);
							break;
						}

					}
				});
			},

			getWorkHistory : function(callback){
				var url = this.urlRoot() + "/" + this.attributes.guid + "/workHistory";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(response){
						var error = response.responseJSON;
						switch(error.errorCode){
							case 4:
								callback(null);
							break;
						}

					}
				});
			},

			getNetworkUsers : function(guid,callback){
				var that = this;
				var url = this.urlRoot() + "/" + guid + "/network/users";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching user work history");
					}
				});
			},

			getEndorsingUsers : function(guid,callback){
				var that = this;
				var url = this.urlRoot() + "/" + guid + "/endorsements";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching user endorsements");
					}
				});
			},

			getFollowedEmployers : function(guid,callback){
				var that = this;
				var url = this.urlRoot() + "/" + guid + "/network/employers";
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching user places");
					}
				});
			},

		
		});

		return User;
	}
);