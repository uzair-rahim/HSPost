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

			urlRoot : function(){
				return Utils.GetURL("/services/rest/user");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			initialize : function(options){
				console.log("User model initialized...");
			}
		
		});

		return User;
	}
);